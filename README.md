<p align="center">
 <a href="https://www.coronawarn.app/en/"><img src="https://raw.githubusercontent.com/corona-warn-app/cwa-documentation/master/images/CWA_title.png" width="400"></a>
</p>

<hr />

<p align="center">
    <a href="https://observatory.mozilla.org/analyze/coronawarn.app" title="Latest Results"><img src="https://img.shields.io/mozilla-observatory/grade/coronawarn.app" alt="Mozilla HTTP Observatory Grade"></a>
</p>
<p align="center">
    <a href="#about-this-repository">About this Repository</a> •
    <a href="#development">Development</a> •
    <a href="#documentation">Documentation</a> •
    <a href="#support-and-feedback">Support and Feedback</a> •
    <a href="#how-to-contribute">How to contribute</a> •
    <a href="#licensing">Licensing</a> •
    <a href="https://www.coronawarn.app/en/">Web Site</a>
</p>
<hr />

# Corona-Warn-App: Website

## About this Repository

This repository contains the source files of the official website for the Corona-Warn-App as it is available at [coronawarn.app](https://coronawarn.app). For information about the project, please see our [documentation repository](https://github.com/corona-warn-app/cwa-documentation).

## Development

### Requirements

You need [Node.js](https://nodejs.org/en/) (which includes npm) to build the website. Optionally, you need an HTTP Server such as [http-server](https://github.com/http-party/http-server) to run and test it locally.

### Getting started

Clone the repository and ensure to have all requirements installed. To build the website, switch to the `cwa-website` base directory and execute the commands

```bash
npm install
npm run build
```

After a successful build, you'll have a new folder `public` in the repository's base directory. It contains the generated files for the complete website.

To test the generated content, simply use a local web server such as http-server by executing the command

```bash
npm start
```

It will automatically use `public` as base directory and watch for file changes. Go to `localhost:8000` to view the website.

### Changing Things

Manuals for the most common use cases of updating website content are available in the [docs folder](./docs/).

### Testing

[Cypress](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell) is used to run End-To-End tests. tests are located in the ```cypress/integration``` folder and can be run with:

```bash
  npm run test:prepare
  npm run test
```
Alternatively, run `npm run test:open` for simpler test development. Be aware that you should only run ony file after another and not click on _Run all specs_ since the screenshot test library has a bug which causes falsy tests for _Visual Comparison_.

`npm run test:prepare` copies fixtures from `./cypress/fixtures` that are required for e2e tests. Store your test assets there, if required.

> IMPORTANT: In case _Visual Comparison_ tests are failing after changes to css, header or footer, delete the `.png` files from `./cypress/integration/__image_screenshots__` and run the blog e2e tests with `npm run test` (without :open!) to recreate the screenshots. Additionally, apply the screenshots to the codebase.

Best practice is to use `data-e2e="your_test_id"` element attributes to select specific elements, eg `cy.get('[data-e2e="cta-button-1"]').click()` instead of `cy.get('.container .infobox a.button').contains('DOWNLOAD').click()`.

### Updating coronawarn.app

Any direct commits and merged pull requests will automatically trigger follow-up actions to build and deploy the changes to [coronawarn.app](https://coronawarn.app). The respective [GitHub Actions](https://github.com/features/actions) are available in the [.github/workflows](.github/workflows) directory of this repository.

## Documentation

The full documentation for the Corona-Warn-App can be found in the [cwa-documentation](https://github.com/corona-warn-app/cwa-documentation) repository. The documentation repository contains technical documents, architecture information, and white papers related to this implementation.

## Support and Feedback

The following channels are available for discussions, feedback, and support requests:

| Type                     | Channel                                                |
| ------------------------ | ------------------------------------------------------ |
| **General discussion, issues, bugs**   | <a href="https://github.com/corona-warn-app/cwa-website/issues/new/choose" title="General Discussion"><img src="https://img.shields.io/github/issues/corona-warn-app/cwa-website/question.svg?style=flat-square"></a> </a>   |
| **Other requests**    | <a href="mailto:corona-warn-app.opensource@sap.com" title="Email CWA Team"><img src="https://img.shields.io/badge/email-CWA%20team-green?logo=mail.ru&style=flat-square&logoColor=white"></a> |

## How to contribute

The German government has asked SAP and Deutsche Telekom AG to develop the Corona-Warn-App for Germany as open source software. Deutsche Telekom is providing the network and mobile technology and will operate and run the backend for the app in a safe, scalable and stable manner. SAP is responsible for the app development, its framework and the underlying platform. Therefore, development teams of SAP and Deutsche Telekom are contributing to this project. At the same time our commitment to open source means that we are enabling -in fact encouraging- all interested parties to contribute and become part of its developer community.

For more information about how to contribute, the project structure, as well as additional contribution information, see our [Contribution Guidelines](./CONTRIBUTING.md). By participating in this project, you agree to abide by its [Code of Conduct](./CODE_OF_CONDUCT.md) at all times.

## Licensing

Copyright (c) 2020 Deutsche Telekom AG and SAP SE or an SAP affiliate company.

Licensed under the **Apache License, Version 2.0** (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at https://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the [LICENSE](./LICENSE) for the specific language governing permissions and limitations under the License.

The "Corona-Warn-App" logo is a registered trademark of The Press and Information Office of the Federal Government. For more information please see [bundesregierung.de](https://www.bundesregierung.de/breg-en/federal-government/federal-press-office).
