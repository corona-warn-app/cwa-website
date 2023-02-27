# Testing

This document provides testing information for contributors to this repository which hosts the source for the https://www.coronawarn.app/ production webserver.

- [Cypress](https://on.cypress.io/guides/overview/why-cypress.html#In-a-nutshell) is used to run End-To-End tests of the website contents in the `/public` directory after it is built from source.
- [markdown-link-check](https://github.com/tcort/markdown-link-check) is used to check Markdown documents, such as this one, which are used only on the GitHub repository.

## Test strategy

Tests are conducted in three locations:

1. Locally on a contributor's system using a cloned copy of the website (optional)
2. On GitHub where the source code of the web resides (automatic)
3. On the webserver https://www.coronawarn.app/. After the web is built on GitHub it is then deployed to this webserver (automatic)

Tests can be run locally and manually before submission. Automated tests, running in [GitHub Actions](https://docs.github.com/en/actions/learn-github-actions) workflows, are used to ensure quality of the website submissions from pull requests. As a final check, some tests are also applied to the production webserver https://www.coronawarn.app from a GitHub Actions workflow.

## Running tests

### Local tests

You can run tests locally using `npm` commands in the [Test modules](#test-modules) table below. You must have [Node.js](https://nodejs.org/en/download/) installed and have run `npm install` before running any tests. See the [Development](../README.md#development) section in the [README](../README.md) document for more details. You can run the full test suite using:

```bash
npm test
```

You can also interactively run individual tests through the Cypress app using:

```bash
npm run test:open
```

The production web https://www.coronawarn.app runs under the Ubuntu operating system with a case-sensitive file-system. Perform local tests preferably under Ubuntu, since other operating systems, such as Microsoft Windows, which access files in a case-insensitive mode, may not reveal problems in testing if there is a mismatch between the upper/lower-case file naming and the reference to the file.

The `npm run checklinks` script for checking Markdown documents uses Unix commands. On a Microsoft Windows operating system, the Unix commands can be provided by [git for Windows](https://gitforwindows.org/) with its embedded Git BASH emulation. If you are using Command Prompt or Windows PowerShell on Windows instead of the Git BASH shell, then you need to execute the following command:

```bash
npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe" --location user
```

otherwise you may see an error message similar to "'xargs' is not recognized as an internal or external command, operable program or batch file."

### GitHub tests

You can access [GitHub Actions](https://docs.github.com/en/actions/learn-github-actions) workflows containing tests in the table below from the Actions menu on GitHub. Refer to the GitHub documentation [Manually running a workflow](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow) for more information. The actions either run on the repository contents or on the production webserver as noted in the table.

## Test modules

| Test target       | Type     | Local manual test    | GitHub Actions (repository)                                       | GitHub Actions (production)                                     |
| ----------------- | -------- | -------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------- |
| All web           | Cypress  | `npm test`           | -                                                                 |                                                                 |
| General web       | Cypress  | `npm run test:short` | [build-and-test](../.github/workflows/build-and-test.yml)         | [cypress-test-prod](../.github/workflows/cypress-test-prod.yml) |
| Links in web      | Cypress  | `npm run test:links` | [test-check_links](../.github/workflows/test-check_links.yml)     |                                                                 |
| Links in Markdown | Markdown | `npm run checklinks` | [test-checklinks-md](../.github/workflows/test-checklinks-md.yml) |                                                                 |

### `npm test`

The command `npm test` runs all Cypress tests locally. It is the same as running both `npm run test:short` and `npm run test:links` (see below). There is no combined single equivalent GitHub Actions test.

### `npm run test:short`

The command `npm run test:short` runs all Cypress tests from the top level directory [cypress/e2e](../cypress/e2e) as in the following table. The equivalent GitHub test is [build-and-test](../.github/workflows/build-and-test.yml). The same set of tests is also included in [cypress-test-prod](../.github/workflows/cypress-test-prod.yml) which runs daily at 09:00 UTC and tests the production webserver https://www.coronawarn.app/.

| Cypress test name  | Purpose                                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| app_to_web         | Checks that all links to the website used by the Android and iOS apps are working.                                      |
| applink_spec       | Detects broken links or missing OS badges to download mobile app in home page.                                          |
| blog_spec          | Checks if the blog archive is accessible.                                                                               |
| check_anchor_links | Detects broken anchor links throughout the website.                                                                     |
| check_videos       | Detects broken videos throughout the website.                                                                           |
| eventRegistration  | Checks that all fields in event-registration exist and fills them to create a QR code.                                  |
| faq                | Simulates an FAQ search and checks the result for mobile and desktop view.                                              |
| hotline_spec       | Verify that Hotline App is correctly displayed on the home page.                                                        |
| mime               | Checks that CSS and JS files have the correct [MIME](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type) type. |

### `npm run test:links`

The command `npm run test:links` runs the Cypress test [cypress/e2e/hybrid/check_links](../cypress/e2e/hybrid/check_links.cy.js) which detects broken links throughout the website. The equivalent GitHub Actions test is [test-check_links](../.github/workflows/test-check_links.yml). This test is separated from the other Cypress test for two reasons:

- It may report link failures due to the unavailability of third party websites. The aim of testing is however to find out if there are errors in this website, not in others, unless they are permanent, in which case link changes may be necessary.
- `npm run test:links` takes about 10 minutes to run locally, which is significantly longer that the elapsed time for other tests. When [cypress/e2e/hybrid/check_links](../cypress/e2e/hybrid/check_links.cy.js) is run on GitHub it takes about 15 to 25 minutes to run.

[test-check_links](../.github/workflows/test-check_links.yml) runs weekly on Mondays at 03:15 UTC.

## Cypress

### Cypress cache

Executing `npm install`, as described in the [Getting started](../README.md#getting-started) section, caches a separate copy of Cypress on your local system. If the `cwa-website` later specifies a different Cypress version and `npm install` is executed again, then any previously cached Cypress versions remain on your system. Each cached version uses about 0.5 GB of storage. To  remove other versions, apart from the currently used version, execute:

```bash
npx cypress cache prune
```

For more detailed information refer to the [Cypress cache](https://on.cypress.io/guides/guides/command-line#cypress-cache-command) command documentation.
