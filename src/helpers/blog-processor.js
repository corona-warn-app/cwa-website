const { readdirSync, readFileSync, writeFileSync } = require('fs');
const path = require('path');
const frontmatter = require('frontmatter');
const marked = require('marked');
const slugify = require('slugify');

let data, language;
const rootFolder = __dirname + '/../../';
const blogMdPath = () => path.join(rootFolder, 'blog', language);
const blogHtmlPath = () => path.join(blogBasePath(), data.baseSlug);

/**
 * Format english date from YYYY-MM-DD
 * @returns string 1. Aug, 2020 or 01.08.2020
 */
const formatDate = (date) => {
  const d = new Date(Date.parse(date));
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return d.toLocaleDateString(data.dateLocale, options);
}

const hasValidDate = (dateStr) => {
  // Tests YYYY-MM-DD
  const dateRegExp = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g;
  return dateRegExp.test(dateStr);
};

const getSlug = (fileName) => {
  return slugify(fileName.slice(0, -3)); // remove .md from the end
}

const getAuthors = (authors) => {
  if (!authors) {
    return '';
  } else if (authors instanceof Array) {
    return authors.join(' and ');
  } else {
    return authors;
  }
}

const generateBlogEntry = (blog, content, showButton = false) => {
  const button = showButton ? `<p><a href="/${data.baseSlug}/${blog.slug}" class="btn-primary">${data.readMore}</a></p>` : '';
  return `

  <div class="blog-entry">
    <div class="title-2">
      ${blog['page-title']}
    </div>
    <div class="sub-title"><span class="text">${getAuthors(blog.author)} @Luigi on ${formatDate(blog.date)}</span></div>
    ${content}
    ${button}
  </div>
  `
}

const getBlogEntries = (singleSlug = false) => {
  return readdirSync(blogMdPath())
    .filter(fileName => !singleSlug || singleSlug == getSlug(fileName))
    .filter(fileName => hasValidDate(fileName))
    .sort()
    .reverse()
    .map(fileName => {
      const fileContent = readFileSync(path.join(blogMdPath(), fileName)).toString();
      const mdData = frontmatter(fileContent.split('<!-- Excerpt -->')[0]);
      const date = fileName.substr(0, 10); // 10 is length of the date
      const slug = getSlug(fileName);

      const entry = {
        slug,
        date,
        title: mdData.data['page-title'],
        fileName,
        pageDescription: mdData.data['page-description'],
        author: mdData.data.author,
        htmlExcerpt: marked(mdData.content),
        htmlContent: marked(frontmatter(fileContent).content)
      };
      entry.blogExcerpt = generateBlogEntry(entry, entry.htmlExcerpt, true);
      entry.blogContent = generateBlogEntry(entry, entry.htmlContent);
      return entry;
    });
}

const writeBlogFiles = (blogEntries) => {
  blogEntries.forEach(entry => {
    const blogHtml = `---
lang_en: ${language == 'en' ? 'true' : 'false'}
page-title: ${entry.title}
page-description: ${entry.pageDescription}
page-name: ${entry.slug}
page-name_de: ${entry.slug}
layout: blog
---
${entry.blogContent}`;
    writeFileSync(blogHtmlPath() + `/${entry.slug}.html`, blogHtml);
  });
};

module.exports = (lang) => {
  if (['de', 'en'].includes(lang)) {
    language = lang;
    data = require(path.resolve(rootFolder, 'src', 'data', (language === 'en' ? 'news.json' : `news_${language}.json`)));
    const blogEntries = getBlogEntries();
    console.log('blogEntries', blogEntries)
    // writeBlogFiles(blogEntries);
  } else {
    console.error(`Blog language ${lang} not implemented.`);
  }
};
