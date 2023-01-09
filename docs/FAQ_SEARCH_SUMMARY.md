# FAQ Search

FAQ search was introduced to allow users navigate the 80+ questions we collected over the last weeks.
It comprises two main parts that you need to alter, if you want to optimize or change the way the search behaves.

## Gulp Function

The `gulp build` tasks in the [gulpfile](../gulpfile.mjs) performs a step called `copyFAQs`. This takes the faq files ([en](../src/data/faq.json), [de](../src/data/faq_de.json)) and transforms them into a searchable structure.

Text blocks are merged into a single string and HTML tags are removed. Additionally, the question text is added. Indexes of the structure are the FAQ anchors. The resulting very straightforward JavaScript objects (one per language) are copied to the `{lang}/faq/faq.json` folders of the distribution.

## JavaScript

In [app.js](../src/assets/js/app.js), the file is loaded via an Ajax get call.
If the user enters something (that is longer than 2 characters) into the search field, a callback function runs through the loaded strings and checks whether the given words (split by space) are contained in an FAQ answer.

All anchors are returned, whose FAQ entry matches the search query.
All FAQs that do not match are hidden.

## URL parameters

If you search and press enter (i.e., submit the search form), you see that an URL parameter called `search` is added.
This way, you can also link to search results instead of just the entire FAQ list or a single entry.

If, in addition to the search parameter, a hash (e.g., #ios_136) is part of the url to address one entry directly, the search parameter is ignored.

If the hash cannot be found in the list of available FAQs (e.g., though an outdated, manually altered, or wrong link from the app), a search is performed instead of navigating to the respective FAQ entry.
