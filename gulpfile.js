'use strict';
const plugins = require('gulp-load-plugins');
const yargs = require('yargs');
const browser = require('browser-sync');
const gulp = require('gulp');
const replace = require('gulp-replace');
const panini = require('panini');
const yaml = require('js-yaml');
const fs = require('fs');
const webpackStream = require('webpack-stream');
const webpack2 = require('webpack');
const named = require('vinyl-named');
const autoprefixer = require('autoprefixer');
const sitemap = require('gulp-sitemap');
const rimraf = require('rimraf');
const webp = require('gulp-webp');
const jsonTransform = require('gulp-json-transform');
const { processBlogFiles } = require('./src/services/blog-processor');
var rename = require("gulp-rename");

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --develop or --dev flag
const PRODUCTION = !(yargs.argv.develop || yargs.argv.dev);

// Load config from config.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

function isCI() {
  return !!process.env.CI;
}

// Build the "dist" folder by running all of the below tasks
// Sass must be run later so UnCSS can search for used classes in the others assets.
gulp.task(
  'build',
  gulp.series(
    clean,
    cleanBlogs,
    buildBlogFiles,
    gulp.parallel(
      pages, javascript, images_minify, copy, copyFAQs, copyFAQRedirects
    ),
    images_webp,
    sass,
    build_sitemap,
    createFaqRedirects,
    replaceVersionNumbers
  )
);

gulp.task('blog', gulp.series(cleanBlogs, buildBlogFiles));

// Build the site, run the server, and watch for file changes
gulp.task('default', gulp.series('build', server, watch));

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, done);
}

function cleanBlogs(done) {
  rimraf(PATHS.blogOutputs, done);
}

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
function copy() {
  gulp.src(PATHS.rootAssets).pipe(gulp.dest(PATHS.dist));
  return gulp.src(PATHS.assets).pipe(gulp.dest(PATHS.dist + '/assets'));
}

function copyBlogImgs() {
  return gulp.src([
    'blog/**/*',
    '!blog/**/*.md'
  ])
  .pipe(gulp.dest(PATHS.dist + '/assets/img/blog/'));
}
// Prepare blog .md files to be used as HTML
function buildBlogFiles(done) {
  copyBlogImgs();
  processBlogFiles();
  done();
}

// Copy page templates into finished HTML files
function pages() {
  return gulp
    .src('src/pages/**/*.{html,hbs,handlebars}')
    .pipe(
      panini({
        root: 'src/pages/',
        layouts: 'src/layouts/',
        partials: 'src/partials/',
        data: 'src/data/',
        helpers: 'src/helpers/'
      })
    )
    .pipe(gulp.dest(PATHS.dist));
}

// Load updated HTML templates and partials into Panini
function resetPages(done) {
  panini.refresh();
  done();
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
  const postCssPlugins = [
    // Autoprefixer
    autoprefixer({ overrideBrowserslist: COMPATIBILITY })

    // UnCSS - Uncomment to remove unused styles in production
    // PRODUCTION && uncss.postcssPlugin(UNCSS_OPTIONS),
  ].filter(Boolean);

  return gulp
    .src('src/assets/scss/style.scss')
    .pipe($.sourcemaps.init())
    .pipe(
      $.sass({
        includePaths: PATHS.sass
      }).on('error', $.sass.logError)
    )
    .pipe($.postcss(postCssPlugins))
    .pipe($.if(PRODUCTION, $.cleanCss({ compatibility: 'ie9' })))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/css'))
    .pipe(browser.reload({ stream: true }));
}

let webpackConfig = {
  mode: PRODUCTION ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            compact: false
          }
        }
      }
    ]
  },
  devtool: !PRODUCTION && 'source-map'
};

// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
  return gulp
    .src(PATHS.entries)
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(webpackConfig, webpack2))
    .pipe(
      $.if(
        PRODUCTION,
        $.uglify().on('error', e => {
          console.error('Uglify error', e);
        })
      )
    )
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/js'));
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images_minify() {
  return gulp
    .src('src/assets/img/**/*')
    .pipe(
      $.if(PRODUCTION, $.imagemin([$.imagemin.mozjpeg({ progressive: true })]))
    )
    .pipe(gulp.dest(PATHS.dist + '/assets/img'));
}

function images_webp() {
  return gulp
    .src('src/assets/img/**/*')
    .pipe(webp())
    .pipe(gulp.dest(PATHS.dist + '/assets/img'));
}

function copyFAQs(done){
  copyFAQ("de");
  copyFAQ("en");
  done();
}

function copyFAQ(lang) {
  return gulp
    .src(`src/data/faq${(lang === "en" ? "" : ("_" + lang))}.json`)
    .pipe(jsonTransform(function (data, file) {
      let faq = {}
      data['section-main'].sections.forEach((section) => {
        section.accordion.forEach((faqEntry) => {
          let searchEntry = faqEntry.title + " " + faqEntry.textblock.join(" ");
          faq[faqEntry.anchor] = searchEntry.toLowerCase().replace( /(<([^>]+)>)/ig, ' ');
        })
      });
      return faq;
    }))
    .pipe(rename('faq.json'))
    .pipe(gulp.dest(PATHS.dist + `/${lang}/faq/`));
}

function copyFAQRedirects() {
  return gulp.src("src/data/faq_redirects.json").pipe(gulp.dest(PATHS.dist + "/assets/data"));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init(
    {
      server: {
        baseDir: PATHS.dist,
        serveStaticOptions: {
          extensions: ['html']
        }
      },
      port: PORT,
      open: !isCI() // do not open webbrowser if running in CI
    },
    done
  );
}

// Reload the browser with BrowserSync
function reload(done) {
  browser.reload();
  done();
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch(done) {
  if (isCI()) {
    console.log('Running in CI, skipping watch task.');
    done();
    return;
  }
  gulp.watch(PATHS.assets, copy);
  gulp
    .watch('blog/**/*')
    .on('all', gulp.series(buildBlogFiles, pages));
  gulp
    .watch('src/pages/**/*.html')
    .on('all', gulp.series(pages, reload));
  gulp
    .watch('src/{layouts,partials}/**/*.html')
    .on('all', gulp.series(resetPages, pages, reload));
  gulp
    .watch('src/data/**/*.{js,json,yml}')
    .on('all', gulp.series(resetPages, pages, reload));
  gulp
    .watch('src/helpers/**/*.js')
    .on('all', gulp.series(resetPages, pages, reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', sass);
  gulp
    .watch('src/assets/js/**/*.js')
    .on('all', gulp.series(javascript, reload));
  gulp
    .watch('src/assets/img/**/*')
    .on('all', gulp.series(images_minify, images_webp, reload));
  done();
}

// generate an up-to-date sitemap
function build_sitemap() {
  return gulp
    .src([PATHS.dist + "/**/*.html", "!" + PATHS.dist + '/error.html'])
    .pipe(sitemap({
      siteUrl: "https://coronawarn.app",
      priority: function (siteUrl, loc, entry) {
        // Reduce priority by 0.2 per level
        return 1.0 - (entry.file.split('/').length - 1) * 0.2
      }
    }))
    .pipe(gulp.dest(PATHS.dist))
}

// Just takes the properly build .html files and removes the ending
function createFaqRedirects() {
  return gulp
    .src([PATHS.dist + "/**/faq/*.html", "!" + PATHS.dist + '/**/faq/index.html'])
    .pipe(rename(function (path) {
      // Returns a completely new object, make sure you return all keys needed!
      return {
        dirname: path.dirname,
        basename: path.basename,
        extname: ""
      };
    }))
    .pipe(gulp.dest(PATHS.dist))
}

// replaces some values inside json that cant be replaced with handlebars exprerssion since they are inside json
function replaceVersionNumbers() {
  return gulp
    .src([PATHS.dist + "/**/*.html"])
    .pipe(replace('[ios.latest-os-version]', '14.0.1'))
    .pipe(replace('[ios.minimum-required-os-version]', '13.6'))
    .pipe(replace('[ios.current-app-version]', '1.5.3'))
    .pipe(replace('[android.latest-os-version]', '11'))
    .pipe(replace('[android.minimum-required-os-version]', '6'))
    .pipe(replace('[android.current-app-version]', '1.5.1'))
    .pipe(replace('[last-update]', new Date().toISOString().split('T')[0]))
    .pipe(gulp.dest(PATHS.dist))
}
