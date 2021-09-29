# Writing blog posts

Follow these steps to add a new post on the website:

1. Fork the `cwa-website` repository and create a new branch in your fork. If you have write permissions on the repo, you can also create a branch directly in CWA-website.
2. Create a folder in the `blog` folder with a name following the `{DATE}-{PAGE_NAME}` format.
3. Create a file named `index.md` (English) and a file `index_de.md` in the newly created directory.
4. Prepare the content in a Markdown file.
5. Make a pull request.
6. Wait for the review.
7. After the merge, the site rebuilds automatically and the blog post appears.

The blog post should have the following format:

``` yaml
---
page-title: {TITLE}
page-description: {SEO_DESCRIPTION}
page-name: {PAGE_NAME}
author: {AUTHOR}
layout: blog
---

{CONTENT}
```

Replace these parameters with real values:

- `{DATE}` is your blog post's publication date, in the `YYYY-MM-DD` format.
- `{TITLE}`
- `{DESCRIPTION}`
- `{PAGE_NAME}` is the last part of the English site's address in the location bar. For example, if you want your blog post to appear under `https://coronawarn.app/blog/{DATE}-{PAGE_NAME}`, the name of your blog post folder should end with `{ADDRESS}`. For example, name the folder **2019-08-01-corona-1-3** to point to the `https://coronawarn.app/blog/2019-08-01-corona-1-3` link on the website. It can only consist of digits, lowercase characters `a-z`, dash `-` or underscore `_`. **DO NOT** translate in the `index_de.md` file.
- `{AUTHOR}` is your name with an optional position name.
- `{CONTENT}` is written in Markdown and/or HTML. The content must include the `<!-- overview -->` comment which indicates the part of the blog post that will be displayed on the main page. The **Read more** button appears at the end of the paragraph.

>**NOTE:** The `<!-- overview -->` comment cannot be placed at the beginning of the blog post. In such a case, the **Read more** button appears straight after the title of the blog post and the content itself is not displayed.

Example:

``` yaml
---
page-title: Lorem Ipsum
page-description: Lorem ipsum dolor sit amet.
page-name: lorem-ipsum
title: "Latin's not dead"
author: "Cicero, Roman Philosopher"
layout: blog
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

<!-- overview -->

Integer volutpat interdum eros a malesuada. Proin porttitor, leo eu dignissim posuere, ante nibh aliquam ipsum, pharetra pharetra nunc libero eu massa.
```

---

## Add an image to content

To add the image to your blog post, copy the desired image to the folder with the `index.md` file and write:

``` Markdown
![{ALT_TITLE}](./{IMAGE_FILENAME} "{TEXT_WHILE_HOVERING}")
```

Replace these parameters with real values:

- `{ALT_TITLE}` is the text which appears if the image cannot appear for some reason.
- `{TEXT_WHILE_HOVERING}` is the text which appears when you move the mouse pointer over the image. This parameter is optional.

You can use a link instead of a relative path to the image.

Example:

``` Markdown
![CWA logo](https://raw.githubusercontent.com/corona-warn-app/cwa-documentation/master/images/CWA_title.png "Hover over me!")
```

![CWA logo](https://raw.githubusercontent.com/corona-warn-app/cwa-documentation/master/images/CWA_title.png "Hover over me!")

However, it is advised to download the image, put it into the folder where the `index.md` file is located, and refer to its relative path instead of an absolute link from the Internet.

You can also use HTML tags to show and position images:

``` HTML
<img src="{RELATIVE_PATH_OR_LINK}" />
```

See the example usage with mixed elements:

``` HTML
<p align="center">
  <img src="./logo.png" width="235">
</p>
```

<!-- markdownlint-disable MD033 -->
<p align="center">
<!-- markdownlint-disable MD033 -->
  <img src="./logo.png" width="235">
</p>

---

### Add a document to your blogpost

If you want to add, e.g. a PDF to your blog, the process is slightly different compared to images.

Upload your document to `/src/assets/documents`, first.
To then create a link in your blogpost, use the following snippet:
`[Link Text](assets/documents/yourdocumentname.pdf)`

If you need different files for different languages, just upload two versions and adapt the links in the index.md and index_de.md, accordingly.

If you need to later exchange the file, just replace it in `/src/assets/documents`.

---

### Link to blog posts

Use this pattern to add links to other blog posts:

``` Markdown
[Another blog post]({DATE}-{ADDRESS})
```

where:

- `{DATE}` is the blog post's publication date, in the `YYYY-MM-DD` format.
- `{ADDRESS}` is the last part of the site's address in the location bar.

Example:

``` Markdown
[Introduction](2018-08-01-introduction-to-cwa)
```
