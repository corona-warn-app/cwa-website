const { getBlogEntries } = require('../services/blog-processor');

module.exports = (lang) => {
  return getBlogEntries(lang, true).map(entry => entry.blogOverview).join('\r\n');
}
