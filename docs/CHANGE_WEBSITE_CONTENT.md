# Website Content Change

The Website is created from a set of pages, templates, and json data using [panini](https://github.com/foundation/panini).

## Finding the right page

In case you have to change some aspect of the page, a good approach is working your way back from the URL:

* In [the pages folder](../src/pages/), the URL path is directly reflected
* There's one folder for each language (en/de)
* Each folder contains further subfolders for individually addressable pages (/blog, /faq, etc.)

## The right template

The HTML files in the page folders are not really html but a mix of markdown and Panini templates.

The markdown entry "layout" refers to a file in the [layouts folder](../src/layouts/).

The entry below the header defines which page content is rendered how.
Let's consider the following example `{{> page-community page-contents=community_de}}`:

* page-community refers to a partial named `page-community.html` in the [partials folder](../src/partials/)
* page-contents will be a variable that can be used in the partial
* Its value is set to community_de, which refers to a file in the [data folder](../src/data/)

Within the partial, the different data elements become part of an HTML structure, e.g., by using it as a child (text) of an HTML tag, defining class names, etc.

Partials can also call other partials using a similar snippet as used above.

## Keep in mind

This is a rather random list of things to keep in mind when altering content:

* Partials are language independent, data is not
* For every change, you probably have to change two data files (one for each language)
* English is the "main" language, i.e., `{stuff}.json` should contain the English text, `{stuff}_de.json` the German text
* JSON files use 4 space-character soft-tab indentation
* Use a proper JSON formatter after making your changes (e.g. the format document option of VSCode) from time to time

## Links on FAQ pages

The following conventions should be followed for links in the FAQ sources [/src/data/faq.json](https://github.com/corona-warn-app/cwa-website/blob/master/src/data/faq.json) and [/src/data/faq_de.json](https://github.com/corona-warn-app/cwa-website/blob/master/src/data/faq_de.json):

- All internal and external links on the FAQ pages should use the HTML hyperlink attribute `target='_blank'` to open in a new frame. This provides a consistent user experience and works around an issue with the browser back arrow button in the FAQ Glossary.
- External links should use the HTML hyperlink attribute `rel='noopener noreferrer'` to avoid a cross-domain security issue in older browsers when the link also contains `target='_blank'`.
- Internal links should **not** contain the attribute `rel='noopener noreferrer'`. There is no security issue for internal links.

Examples:

- External link: `<a href='https://www.digitaler-impfnachweis-app.de/en/covpasscheck-app/' target='_blank' rel='noopener noreferrer'>Check EU COVID certificates directly via app</a>`
- Internal link: `<a href='#test_cert' target='_blank'>Test Certificate</a>`
