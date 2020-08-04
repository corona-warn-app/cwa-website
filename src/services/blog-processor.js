const { readdirSync, readFileSync, writeFileSync } = require('fs');
const path = require('path');
const frontmatter = require('frontmatter');
const marked = require('marked');

const languages = ['de', 'en'];
const rootFolder = __dirname + '/../../';
const data = require(path.resolve(rootFolder, 'src', 'data', 'blog.json'));
const blogMdPath = () => path.join(rootFolder, 'blog');
const blogHtmlPath = (lang) => path.join(rootFolder, 'src', 'pages', lang, data[lang].baseSlug);

/**
 * Format english date from YYYY-MM-DD
 * @returns string 1. Aug, 2020 or 01.08.2020
 */
const formatDate = (date, lang) => {
  const d = new Date(Date.parse(date));
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return d.toLocaleDateString(data[lang].dateLocale, options);
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
  const button = showButton ? `<p><a href="${blog.slug[lang]}" class="btn btn-lg btn-secondary">${data[lang].readMore}</a></p>` : '';
  return `

  <div class="blog-entry">
    <div class="title-2">
      ${blog.title}
    </div>
    <div class="sub-title"><span class="text">${getAuthors(blog.author)} on ${formatDate(blog.date, lang)}</span></div>
    ${content}
    ${button}
  </div>
  `
}

const getBlogEntries = (lang) => {
  return readdirSync(blogMdPath())
    .filter(fileName => hasValidDate(fileName))
    .sort()
    .reverse()
    .map(fileName => {
      const fileContent = readFileSync(path.join(blogMdPath(), fileName)).toString();
      const mdData = frontmatter(fileContent.split('<!-- Excerpt -->')[0]);
      const date = fileName.substr(0, 10); // 10 is length of the date

      const entry = {
        date,
        title: mdData.data['page-title'],
        fileName,
        pageDescription: mdData.data['page-description'],
        slug: {
          en: mdData.data['page-name'],
          de: mdData.data['page-name_de'],
        },
        author: mdData.data.author,
        htmlExcerpt: marked(mdData.content),
        htmlContent: marked(frontmatter(fileContent).content)
      };
      entry.blogExcerpt = generateBlogEntry(entry, entry.htmlExcerpt, lang, true);
      entry.blogContent = generateBlogEntry(entry, entry.htmlContent, lang);
      return entry;
    });
}

const writeBlogFiles = (blogEntries, lang) => {
  blogEntries.forEach(entry => {
    const blogHtml = `---
page-title: ${entry.title}
page-description: ${entry.pageDescription}
page-name: ${entry.slug.en}
page-name_de: ${entry.slug.de}
layout: blog
---
${entry.blogContent}`;
    writeFileSync(blogHtmlPath(lang) + `/${entry.slug[lang]}.html`, blogHtml);
  });
};

const processBlogFiles = () => {
  languages.forEach(lang => {
    const blogEntries = getBlogEntries(lang);
    writeBlogFiles(blogEntries, lang);
  });
};

module.exports = {
  getBlogEntries,
  processBlogFiles
};