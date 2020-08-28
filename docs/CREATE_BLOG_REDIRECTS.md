# Creating Blog Redirects

If you plan to replace an old blog post with an updated version and make sure that the old links still work, use the following process

## Create a new blogpost

Just copy the old index.md and index_de.md files to a new folder with the right date (e.g., today).
Rewrite the blog post as needed.

## Update the old blog post

Your old blog post will still have the following structure at the top of the md files:

```md
---
page-title: "QR Code scanned but no test result in the Corona-Warn-App"
page-description: "QR Code scanned but no test result in the Corona-Warn-App"
page-name: notes-qr-codes
page-name_de: notes-qr-codes
author: Janina Hoerdt
layout: blog
---
```

replace this with the following:

```md
---
redirect: {date of new blogpost}-{page-name of new blogpost}
page-name: {page-name-of-old-blogpost}
---
```

For an example, see [here](../blog/2020-08-11-hinweise-qr-code/index.md).

It is important to keep the page name of the old blogpost (you can use the same one for the new post, though), otherwise the links will not be properly generated.
