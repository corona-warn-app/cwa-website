const { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, exists, writeFile } = require('fs');
const path = require('path');
const frontmatter = require('frontmatter');
const marked = require('marked');
const moment = require('moment');

const languages = ['de', 'en'];
const rootFolder = __dirname + '/../../';
const dataFolder = path.resolve(rootFolder, 'src', 'data');
const data = require(path.resolve(dataFolder, 'blog.json'));
const blogMdPath = () => path.join(rootFolder, 'blog');
const blogHtmlPath = (lang) => path.join(rootFolder, 'src', 'pages', lang, data[lang].baseSlug);

/**
 * Format English date from YYYY-MM-DD
 * @returns string 1. Aug, 2020 or 01.08.2020
 */
const formatDate = (date, lang) => {
  const mom = moment(date);
  mom.locale(lang);
  return mom.format('LL');
}

const hasValidDate = (dateStr) => {
  // Tests YYYY-MM-DD
  const dateRegExp = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g;
  return dateRegExp.test(dateStr);
};

const getAuthors = (authors) => {
  if (!authors) {
    return '';
  } else if (authors instanceof Array) {
    return authors.join(' and ');
  } else {
    return authors;
  }
}

const generateBlogEntry = (blog, content, lang, showButton = false) => {
  let button = '', headline = '';
  if (showButton) {
    button = `<p><a href="${lang}/blog/${blog.slug}" class="btn btn-lg btn-secondary blog-read-more">${data[lang].readMore}</a></p>`;
    headline = `<h2 class="headline">${blog.title}</h2>`;
  } else {
    headline = `<h1 class="headline headline-heavy">${blog.title}</h1>`;
  }

  return `

  <div class="blog-entry">
    ${headline}
    <div class="sub-title"><span class="text">${getAuthors(blog.author)}, ${blog.dateFormatted}</span></div>
    ${content}
    ${button}
  </div>
  `
}

const replaceImagePaths = (content, folderName) => {
  return content.replace(new RegExp(/src=".\//, 'g'), `src="assets/img/blog/${folderName}/`);
}

const replaceVideo = (content, folderName) => {
  videoHtml = '<div class="row justify-content-md-center justify-content-center"><div class="col-6 col-md-6" id="player-overlay"><video controls preload="metadata" poster="$2.jpg"><source src="$2.mp4" type="video/mp4"></source><source src="$2.webm" type="video/webm"></source></video></div></div>'
  const c = content.replace(/({{)([^>]*?)(}})/gi, videoHtml);
  return c
}

const validatePageName = (folderName, name) => {
    const isValid = new RegExp('^[a-z-_0-9]+$', 'g').test(name);
    if (!isValid) {
      throw new Error(`Error processing ${folderName}: Invalid page-name (${name}). It can only contain lowercase a-z 0-9 - or _ as valid characters.`);
    }
}

const getBlogEntries = (lang) => {
  return readdirSync(blogMdPath())
    .filter(folderName => hasValidDate(folderName))
    .sort()
    .reverse()
    .map(folderName => {
      // figure out which language file to use - default is 'en', others added with _{lang} to filename
      const fn = lang === "en" ? 'index.md' : 'index_' + lang + '.md';
      const fileContent = (() => {
        try {
          return readFileSync(path.join(blogMdPath(), folderName, fn)).toString();
        } catch(e) {
          throw new Error("You need to create a file '" + fn + "', too!");
        }
      })();
      const mdData = frontmatter(replaceVideo(fileContent, folderName));
      return createPageEntry(folderName, mdData, lang)
    });
}

const createPageEntry =  (folderName, mdData, lang) => {
  const date = folderName.substr(0, 10); // 10 is length of the date in format YYYY-MM-DD
  const pageName = mdData.data['page-name'];
  validatePageName(folderName, pageName);

  const entry = {
    date,
    dateFormatted: formatDate(date, lang),
    title: mdData.data['page-title'],
    folderName,
    pageDescription: mdData.data['page-description'],
    slug: `${date}-${pageName}`,
    author: mdData.data.author,
    redirect: mdData.data.redirect,
    htmlOverview: replaceImagePaths(marked(mdData.content.split('<!-- overview -->')[0]), folderName),
    htmlContent: replaceImagePaths(marked(mdData.content), folderName)
  };

  entry.blogOverview = generateBlogEntry(entry, entry.htmlOverview, lang, true);
  entry.blogContent = generateBlogEntry(entry, entry.htmlContent, lang);
  return entry;
}

const writeBlogJson = (blogEntries, lang) => {
  const entriesFile = path.join(dataFolder, 'blogentries.json');
  const entries = existsSync(entriesFile) ? require(entriesFile) : {};

  entries[lang] = blogEntries.map(entry => {
    return {
      "title": entry.title,
      "author": getAuthors(entry.author),
      "date": `on ${moment(entry.date).locale('en').format('MMM D')}`,
      "date_de": moment(entry.date).locale('de').format('DD.MM.YYYY'),
      "source": {
        "title": "Blog",
        "external": false,
        "url": `blog/${entry.slug}`
      }
    }
  });
  writeFileSync(entriesFile, JSON.stringify(entries, null, 2));
};

const writeBlogFiles = (blogEntries, lang) => {
  blogEntries.forEach(entry => {
    const fileContent = `---
lang_de: ${lang === 'de'}
page-title: "${entry.title}"
page-description: "${entry.pageDescription}"
page-name: "${entry.slug}"
layout: blog
is_blog_detail: true
---
${entry.blogContent}`;

    writeBlogFile(lang, entry.slug, fileContent);
  });
};

// writes a blog entry file with a given body to the slug
const writeBlogFile = (lang, slug, fileContent) => {
  const blogFolder = path.join(blogHtmlPath(lang), slug);
  if (!existsSync(blogFolder)) {
    mkdirSync(blogFolder);
  }
  writeFileSync(path.join(blogFolder, 'index.html'), fileContent);
}

// this writes files that redirect to new blogposts in case an old one is substituted
const writeBlogRedirects = (redirectEntries, lang) => {
  redirectEntries.forEach(entry => {
    const fileContent = `---
lang_de: ${lang === 'de'}
page-name: "${entry.slug}"
---
{{> page-redirect target-path="${entry.redirect}"}}`;
    writeBlogFile(lang, entry.slug, fileContent);
  })
}

const processBlogFiles = () => {
  languages.forEach(lang => {
    const blogEntries = getBlogEntries(lang);
    const redirects = blogEntries.filter(entry => {return entry.redirect !== undefined});
    const activeEntries = blogEntries.filter(entry => {return entry.redirect === undefined});
    writeBlogFiles(activeEntries, lang);
    writeBlogRedirects(redirects, lang);
    writeBlogJson(activeEntries, lang);
  });
};

module.exports = {
  getBlogEntries,
  processBlogFiles
};
