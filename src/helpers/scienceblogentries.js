const { getScienceBlogEntries } = require('../services/science-blog-processor');

module.exports = (lang) => {
  // get only blog entries that are not redirects and for each entry have an overview
  return getScienceBlogEntries(lang).filter(entry => {return entry.redirect === undefined}).map(entry => entry.blogOverview).join('\r\n');
}
