module.exports = function (pageName) {
  /**
   * Handlebars block helper that renders the content inside of it based on the current page.
   * @param (object) options - Handlebars object.
   * @example
   * 
      {{#ifblog}}<p>this is part of the blog</p>{{/ifblog}}
   * @return The content inside the helper if a page matches, or an empty string if not.
   */
  var params = Array.prototype.slice.call(arguments);
  var options = params[params.length - 1];
  if (options.data.root.is_science_detail === true) {
    return options.fn(this);
  }

  return '';
}
