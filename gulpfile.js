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
const { processScienceBlogFiles } = require('./src/services/science-blog-processor');
var rename = require("gulp-rename");
const analyseConfig = require("./src/data/analyse.json");
const fetch = require('node-fetch');
var pluginSass = require('gulp-sass')(require('node-sass'));

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --develop or --dev flag
const PRODUCTION = !(yargs.argv.develop || yargs.argv.dev);

// Check for --skip-compression flag
const SKIP_COMPRESSION = yargs.argv.skipCompression;

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
    cleanScienceBlogs,
    buildBlogFiles,
    buildScienceBlogFiles,
    analyseData,
    cwaaJs,
    javascript,
    gulp.parallel(
      pages, images_minify, copy, copyFAQs, copyFAQRedirects
    ),
    images_webp,
    sass,
    build_sitemap,
    createFaqRedirects,
    replaceVersionNumbers,
      AddEnglishSpecifier
  )
);

gulp.task('blog', gulp.series(cleanBlogs, buildBlogFiles));
gulp.task('science', gulp.series(cleanScienceBlogs, buildScienceBlogFiles));

// Run the server, and watch for file changes
gulp.task('start-server', gulp.series(server, watch));

// Build the site, run the server, and watch for file changes
gulp.task('default', gulp.series('build', 'start-server'));

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, done);
}

function cleanBlogs(done) {
  rimraf(PATHS.blogOutputs, done);
}

function cleanScienceBlogs(done) {
  rimraf(PATHS.blogScienceOutputs, done);
}
const folders = [
  PATHS.dist,
  PATHS.dist + '/.well-known'
];

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
function copy() {
  folders.forEach(dir => {
    if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        console.log('folder created:', dir);    
    }   
  });
  gulp.src(PATHS.rootAssets).pipe(gulp.dest(PATHS.dist));
  gulp.src(PATHS.wellKnown).pipe(gulp.dest(PATHS.dist + '/.well-known'));
  return gulp.src(PATHS.assets).pipe(gulp.dest(PATHS.dist + '/assets'));
}

function copyBlogImgs() {
  return gulp.src([
    'blog/**/*',
    '!blog/**/*.md'
  ])
  .pipe(gulp.dest(PATHS.dist + '/assets/img/blog/'));
}
function copyScienceBlogImgs() {
  return gulp.src([
    'science/**/*',
    '!science/**/*.md'
  ])
  .pipe(gulp.dest(PATHS.dist + '/assets/img/science/'));
}

// Prepare blog .md files to be used as HTML
function buildBlogFiles(done) {
  copyBlogImgs();
  processBlogFiles();
  done();
}
// Prepare science blog .md files to be used as HTML
function buildScienceBlogFiles(done) {
  copyScienceBlogImgs();
  processScienceBlogFiles();
  done();
}

function analyseData(){
  async function fallbackdataFn() {
    const response  = await fetch(analyseConfig.fetchUrl, {method: 'GET'})
    const data = await response.json();
    return JSON.stringify(data); 
  }

  return fallbackdataFn().then(e => {
    fs.writeFileSync('src/data/analyse-backup.json', e, {flag: 'w'});
    return fs.writeFileSync(`./public/${analyseConfig.fallbackFile}`, e);
  }).catch(e => {
    const data = fs.readFileSync('src/data/analyse-backup.json', 'utf8');
    if(!fs.existsSync("public")) fs.mkdirSync("public")
    return fs.writeFileSync(`./public/${analyseConfig.fallbackFile}`, data, {flag: 'w'});
  })
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
      pluginSass({
        includePaths: PATHS.sass
      }).on('error', pluginSass.logError)
    )
    .pipe($.postcss(postCssPlugins))
    .pipe($.if(PRODUCTION, $.cleanCss({ compatibility: 'ie9' })))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/css'))
    .pipe(browser.reload({ stream: true }));
}

function cwaaJs() {
  return gulp
    .src(PATHS.cwaa)
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream({
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
    }, webpack2))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/js'));
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
    .pipe(
        $.if(!SKIP_COMPRESSION, webp())
    )
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
    { // mirror server headers to dev env
      middleware: function (req, res, next) {

        let CSP = "default-src 'self' 'unsafe-inline' 'unsafe-eval' *.coronawarn.app; img-src 'self' *.coronawarn.app data:";
        if(req.url.indexOf("/science") != -1){
          CSP = "default-src 'self' 'unsafe-inline' 'unsafe-eval' *.coronawarn.app; img-src 'self' *.coronawarn.app data:";
        }else if(req.url.indexOf("/analysis") != -1){
          CSP = "default-src 'self' 'unsafe-inline' 'unsafe-eval' *.coronawarn.app; img-src 'self' *.coronawarn.app data:; connect-src 'self' https://obs.eu-de.otc.t-systems.com/";
        }

        res.setHeader("Content-Security-Policy", CSP);

        res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("X-Frame-Options", "DENY");
        res.setHeader("X-XSS-Protection", "1");
        

        next();
      },
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
    .watch('science/**/*')
    .on('all', gulp.series(buildScienceBlogFiles, pages));  
    //
    // exclude output of buildBlogFiles and buildScienceBlogFiles from watching of pages
  gulp
    .watch(['src/pages/**/*.html',
      '!' + PATHS.blogOutputs, '!' + PATHS.blogOutputs + '*',
      '!' + PATHS.blogScienceOutputs, '!' + PATHS.blogScienceOutputs + '*'])
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
    .watch(['src/assets/js/**/*.js', '!src/assets/js/analyse/**/*'])
    .on('all', gulp.series(javascript, reload));
  gulp
    .watch('src/assets/js/analyse/**/*.js')
    .on('all', gulp.series(cwaaJs, reload));
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

// replaces some values inside json that cant be replaced with handlebars expression since they are inside json
function replaceVersionNumbers() {
  return gulp
    .src([PATHS.dist + "/**/*.html"])
    .pipe(replace('[ios.latest-os-version]', '15.3.1'))
    .pipe(replace('[ios.minimum-required-os-version]', '12.5'))
    .pipe(replace('[ios.current-app-version]', '2.18.1'))
    .pipe(replace('[android.latest-os-version]', '12'))
    .pipe(replace('[android.minimum-required-os-version]', '6'))
    .pipe(replace('[android.current-app-version]', '2.18.1'))
    .pipe(replace('[last-update]', new Date().toISOString().split('T')[0]))
    .pipe(gulp.dest(PATHS.dist))
}

function AddEnglishSpecifier() {
  return gulp
      .src([PATHS.dist + "/**/*.html"])
      .pipe(replace('Android Security Bulletins', '<span lang="en">Android Security Bulletins</span>'))
      .pipe(replace('API', ' <span lang="en">API</span>'))
      .pipe(replace('APIs', ' <span lang="en">APIs</span>'))
      .pipe(replace('App-Identifier', ' <span lang="en">App-Identifier</span>'))
      .pipe(replace('Apple App Store', ' <span lang="en">Apple App Store</span>'))
      .pipe(replace('Apple Exposure Notifications API', ' <span lang="en">Apple Exposure Notifications API</span>'))
      .pipe(replace('BLE', ' <span lang="en">BLE</span>'))
      .pipe(replace('BLE-Messung', ' <span lang="en">BLE-Messung</span>'))
      .pipe(replace('Blog Posts', ' <span lang="en">Blog Posts</span>'))
      .pipe(replace('Bluetooth Low Energy', ' <span lang="en"></span>'))
      .pipe(replace('Bluetooth-Low-Energy-Technologie', ' <span lang="en">Bluetooth-Low-Energy-Technologie</span>'))
      .pipe(replace('Bootloaders', ' <span lang="en">Bootloaders</span>'))
      .pipe(replace('CDN', ' <span lang="en">CDN</span>'))
      .pipe(replace('Code of Conduct', ' <span lang="en">Code of Conduct</span>'))
      .pipe(replace('Code-Repositories', ' <span lang="en">Code-Repositories</span>'))
      .pipe(replace('Code-Reviews', ' <span lang="en">Code-Reviews</span>'))
      .pipe(replace('Contact-Tracing', ' <span lang="en">Contact-Tracing</span>'))
      .pipe(replace('Content Delivery Network', ' <span lang="en">Content Delivery Network</span>'))
      .pipe(replace('Contributor Covenant', ' <span lang="en">Contributor Covenant</span>'))
      .pipe(replace('Corona Validation Service', ' <span lang="en">Corona Validation Service</span>'))
      .pipe(replace('CWA-Community-Mailbox', ' <span lang="en">CWA-Community-Mailbox</span>'))
      .pipe(replace('Dashboard', ' <span lang="en">Dashboard</span>'))
      .pipe(replace('EFGS', ' <span lang="en">EFGS</span>'))
      .pipe(replace('eHealth Network', ' <span lang="en">eHealth Network</span>'))
      .pipe(replace('ENE', ' <span lang="en">ENE</span>'))
      .pipe(replace('ENF', ' <span lang="en">ENF</span>'))
      .pipe(replace('ENS', ' <span lang="en">ENS</span>'))
      .pipe(replace('ENS-Version', ' <span lang="en">ENS-Version</span>'))
      .pipe(replace('EU-Guideline', ' <span lang="en">EU-Guideline</span>'))
      .pipe(replace('European Federation Gateway Service', ' <span lang="en">European Federation Gateway Service</span>'))
      .pipe(replace('Exposure Notification API', ' <span lang="en">Exposure Notification API</span>'))
      .pipe(replace('Exposure Notification Express', ' <span lang="en">Exposure Notification Express</span>'))
      .pipe(replace('Exposure Notification Framework', ' <span lang="en">Exposure Notification Framework</span>'))
      .pipe(replace('Exposure Notification Frameworks', ' <span lang="en">Exposure Notification Frameworks</span>'))
      .pipe(replace('Exposure Notification System', ' <span lang="en">Exposure Notification System</span>'))
      .pipe(replace('Exposure Notifications Express', ' <span lang="en">Exposure Notifications Express</span>'))
      .pipe(replace('Exposure-Notification-API-Spezifikationen', ' <span lang="en">Exposure-Notification-API-Specifications</span>'))
      .pipe(replace('Exposure-Windows und Scan-Instances', ' <span lang="en">Exposure-Windows und Scan-Instances</span>'))
      .pipe(replace('ExposureWindow-Mode', ' <span lang="en">ExposureWindow-Mode</span>'))
      .pipe(replace('Features', ' <span lang="en">Features</span>'))
      .pipe(replace('Gateway', ' <span lang="en">Gateway</span>'))
      .pipe(replace('genuine' ,' <span lang="en">genuine</span>'))
      .pipe(replace('Rollout', ' <span lang="en">Rollout</span>'))
      .pipe(replace('Google Exposure Notification APIs', ' <span lang="en">Google Exposure Notification APIs</span>'))
      .pipe(replace('Google Exposure Notifications API', ' <span lang="en">Google Exposure Notifications API</span>'))
      .pipe(replace('Google Mobile Services', ' <span lang="en">Google Mobile Services</span>'))
      .pipe(replace('Google Play Services', ' <span lang="en">Google Play Services</span>'))
      .pipe(replace('Google Play Store', ' <span lang="en">Google Play Store</span>'))
      .pipe(replace('HTTPS', ' <span lang="en">HTTPS</span>'))
      .pipe(replace('In-App-Reset', ' <span lang="en">In-App-Reset</span>'))
      .pipe(replace('Interoperability Gateway', ' <span lang="en">Interoperability Gateway</span>'))
      .pipe(replace('Issue', ' <span lang="en">Issue</span>'))
      .pipe(replace('Layout', ' <span lang="en">Layout</span>'))
      .pipe(replace('Logfiles', ' <span lang="en">Logfiles</span>'))
      .pipe(replace('Monthly Active Users', ' <span lang="en">Monthly Active Users</span>'))
      .pipe(replace('Nowcasting', ' <span lang="en">Nowcasting</span>'))
      .pipe(replace('OHA', ' <span lang="en">OHA</span>'))
      .pipe(replace('on-the-fly', ' <span lang="en">on-the-fly</span>'))
      .pipe(replace('Onboarding', ' <span lang="en">Onboarding</span>'))
      .pipe(replace('Open Handset Alliance', ' <span lang="en">Open Handset Alliance</span>'))
      .pipe(replace('Open Telekom Cloud', ' <span lang="en">Open Telekom Cloud</span>'))
      .pipe(replace('Open-Source-Community', ' <span lang="en">Open-Source-Community</span>'))
      .pipe(replace('peripheral mode', ' <span lang="en">peripheral mode</span>'))
      .pipe(replace('Pop-Up', ' <span lang="en">Pop-Up</span>'))
      .pipe(replace('PPA', '<span lang="en">PPA</span>'))
      .pipe(replace('Presence-Tracing', ' <span lang="en">Presence-Tracing</span>'))
      .pipe(replace('Privacy Preserving Analytics', ' <span lang="en">Privacy Preserving Analytics</span>'))
      .pipe(replace('Privacy-Preserving-Analytics', ' <span lang="en">Privacy-Preserving-Analytics</span>'))
      .pipe(replace('proximity tracing', ' <span lang="en">proximity tracing</span>'))
      .pipe(replace('Proximity-Tracing', ' <span lang="en">Proximity-Tracing</span>'))
      .pipe(replace('Pull-Request-Checkliste', ' <span lang="en">Pull-Request-Checkliste</span>'))
      .pipe(replace('Pull-Requests', ' <span lang="en">Pull-Requests</span>'))
      .pipe(replace('Push-Notification', ' <span lang="en">Push-Notification</span>'))
      .pipe(replace('Releaseversion', ' <span lang="en">Releaseversion</span>'))
      .pipe(replace('Repository', ' <span lang="en">Repository</span>'))
      .pipe(replace('Reproducible Builds', ' <span lang="en">Reproducible Builds</span>'))
      .pipe(replace('Rolling Proximity Identifiern', ' <span lang="en">Rolling Proximity Identifiern</span>'))
      .pipe(replace('Rolling Proximity Identifiers', ' <span lang="en">Rolling Proximity Identifiers</span>'))
      .pipe(replace('Rolling Proximity IDs', ' <span lang="en">Rolling Proximity IDs</span>'))
      .pipe(replace('RPIs', ' <span lang="en">RPIs</span>'))
      .pipe(replace('SafetyNet', ' <span lang="en">SafetyNet</span>'))
      .pipe(replace('SARS-CoV-2-Exposition', ' <span lang="en">SARS-CoV-2-Exposition</span>'))
      .pipe(replace('Science', ' <span lang="en">Science</span>'))
      .pipe(replace('Science-Blog', ' <span lang="en">Science-Blog</span>'))
      .pipe(replace('Scoping-Document', ' <span lang="en">Scoping-Document</span>'))
      .pipe(replace('Screenshots', ' <span lang="en">Screenshots</span>'))
      .pipe(replace('Secure Software Development Lifecycle', ' <span lang="en">Secure Software Development Lifecycle</span>'))
      .pipe(replace('Security through obscurity', ' <span lang="en">Security through obscurity</span>'))
      .pipe(replace('Smartphones', ' <span lang="en">Smartphones</span>'))
      .pipe(replace('Smartwatches', ' <span lang="en">Smartwatches</span>'))
      .pipe(replace('Social Media', ' <span lang="en">Social Media</span>'))
      .pipe(replace('Solution-Architecture-Dokument', ' <span lang="en">Solution-Architecture-Document</span>'))
      .pipe(replace('Swipe-to-quit', ' <span lang="en">Swipe-to-quit</span>'))
      .pipe(replace('Temporary Exposure Keys', ' <span lang="en">Temporary Exposure Keys</span>'))
      .pipe(replace('Threat Modeling', ' <span lang="en">Threat Modeling</span>'))
      .pipe(replace('Tracing', ' <span lang="en"></span>'))
      .pipe(replace('Transmission Risk Level', ' <span lang="en">Transmission Risk Level</span>'))
      .pipe(replace('Validation Services', '<span lang="en">Validation Services</span>'))
      .pipe(replace('Wearables', ' <span lang="en">Wearables</span>'))
      .pipe(replace('WLAN', ' <span lang="en">WLAN</span>'))
      .pipe(replace('Zero-Rating', ' <span lang="en">Zero-Rating</span>'))
      .pipe(gulp.dest(PATHS.dist))
}
