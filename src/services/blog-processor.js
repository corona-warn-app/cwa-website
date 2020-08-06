const { existsSync, readdirSync, readFileSync, writeFileSync, exists } = require('fs');
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
 * Format english date from YYYY-MM-DD
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
    button = `<p><a href="${blog.slug[lang]}" class="btn btn-lg btn-secondary">${data[lang].readMore}</a></p>`;
    headline = `<h2 class="headline">${blog.title}</h2>`;
  } else {
    headline = `<h1 class="headline headline-heavy">${blog.title}</h1>`;
  }

  return `

  <div class="blog-entry">
    ${headline}
    <div class="sub-title"><span class="text">${getAuthors(blog.author)} on ${blog.dateFormatted}</span></div>
    ${content}
    ${button}
  </div>
  `
}

const replaceImagePaths = (content) => {
  return content.replace(new RegExp(/..\/img/, 'g'), '../../assets/img/blog');
}

const validatePageName = (fileName, ...names) => {
  for (let i = 0; i < names.length; i++) {
    const isValid = new RegExp('^[a-z-_0-9]+$', 'g').test(names[i]);
    if (!isValid) {
      throw new Error(`Error processing ${fileName}: Invalid page-name (${names[i]}). It can only contain lowercase a-z 0-9 - or _ as valid characters.`);
    }
  }
}

const getBlogEntries = (lang) => {
  return readdirSync(blogMdPath())
    .filter(fileName => hasValidDate(fileName))
    .sort()
    .reverse()
    .map(fileName => {
      const fileContent = readFileSync(path.join(blogMdPath(), fileName)).toString();
      const mdData = frontmatter(replaceImagePaths(fileContent.split('<!-- Excerpt -->')[0]));
      const date = fileName.substr(0, 10); // 10 is length of the date
      const pageName = mdData.data['page-name'];
      const pageNameDe = mdData.data['page-name_de'];

      validatePageName(fileName, pageName, pageNameDe);

      const entry = {
        date,
        dateFormatted: formatDate(date, lang),
        title: mdData.data['page-title'],
        fileName,
        pageDescription: mdData.data['page-description'],
        slug: {
          en: `${date}-${pageName}`,
          de: `${date}-${pageNameDe}`
        },
        author: mdData.data.author,
        htmlExcerpt: marked(mdData.content),
        htmlContent: marked(replaceImagePaths(frontmatter(fileContent).content))
      };
      entry.blogExcerpt = generateBlogEntry(entry, entry.htmlExcerpt, lang, true);
      entry.blogContent = generateBlogEntry(entry, entry.htmlContent, lang);
      return entry;
    });
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
        "url": `${lang}/blog/${entry.slug[lang]}`
      }
    }
  });
  writeFileSync(entriesFile, JSON.stringify(entries, null, 2));
};

const writeBlogFiles = (blogEntries, lang) => {
  blogEntries.forEach(entry => {
    const blogHtml = `---
lang_de: ${lang === 'de'}
page-title: ${entry.title}
page-description: ${entry.pageDescription}
page-name: ${entry.slug.en}
page-name_de: ${entry.slug.de}
layout: blog
is_blog_detail: true
---
${entry.blogContent}`;
    writeFileSync(blogHtmlPath(lang) + `/${entry.slug[lang]}.html`, blogHtml);
  });
};

const processBlogFiles = () => {
  languages.forEach(lang => {
    const blogEntries = getBlogEntries(lang);
    writeBlogFiles(blogEntries, lang);
    writeBlogJson(blogEntries, lang);
  });
};

module.exports = {
  getBlogEntries,
  processBlogFiles
};