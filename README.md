<p align="center">
 <a href="https://www.coronawarn.app/en/"><img src="https://raw.githubusercontent.com/corona-warn-app/cwa-documentation/main/images/CWA_title.png" width="400"></a>
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

You need the Node.js 18 (Active LTS) version of [Node.js](https://nodejs.org/en/) (which includes npm) to build the website.

In case you use a Mac computer with Apple Silicon, make sure that [Rosetta](https://support.apple.com/en-us/HT211861) is installed. 

### Getting started

Clone the repository and ensure you have the requirements (from above) installed. To build and display the website in a web browser, switch to the `cwa-website` base directory and execute the commands:

```bash
npm install
npm start
```

- `npm install` installs the necessary packages to build, display and test the website on your local system. You only need to run this once or if the packages defined in [package.json](package.json) are changed.

- The command `npm start` triggers the commands `npm run build` followed by `npm run start-server` described below and which can be used individually if desired. If you want to debug you can build the web and start the local server using the command `npm run dev` as an alternative to `npm start`.

#### Build

The command:
```bash
npm run build
```
builds the website and creates a new folder `public` in the repository's base directory. It contains the generated files for the complete website.

#### Start-Server

To view the generated content after using `npm run build`, execute the command:

```bash
npm run start-server
```

This command starts a local web server and a browser window is also automatically opened at `http://localhost:8000` so that the website can be viewed. The web server uses `public` as its base directory. It also watches for file changes and refreshes the browser contents if necessary.

Depending on your network setup, you may also be able to view the website on a connected mobile device using `http://<ip_address_of_localhost>:8000`, for example `http://192.168.0.100:8000`.

#### Start-Fast

The command `npm run start-fast` is similar to the command `npm run start`: it builds the web then starts a web server, displaying the web site in a browser. The difference is that `start-fast` disables image compression which can shorten the build time.

Check and compare the build log line `Finished 'build' after xx` showing the time taken to build if you are experiencing long build times to see if it is helpful in your own environment.

### Changing Things

Manuals for the most common use cases of updating website content are available in the [docs folder](./docs/).

### Testing

[Cypress](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell) is used to run End-To-End tests. Tests are located in the `cypress/e2e` folder and can be run with:

```bash
  npm run test
```
Alternatively, execute `npm run test:open` to select individual tests to run from the Cypress console.

To minimize the occurrence of errors we would ask you to perform all tests when contributing to our repository.

The production web https://www.coronawarn.app runs under the Ubuntu operating system with a case-sensitive file-system. To ensure gaps in testing are minimized, perform local tests preferably under Ubuntu.

Other operating systems, such as Microsoft Windows, which access files in a case-insensitive mode, may hide problems in testing if there is a mismatch between the upper/lower-case file naming and the reference to the file. This applies to Cypress tests and testing by hand.

#### Notes for test developers

Best practice is to use `data-e2e="your_test_id"` element attributes to select specific elements, e.g. `cy.get('[data-e2e="cta-button-1"]').click()` instead of `cy.get('.container .infobox a.button').contains('DOWNLOAD').click()`.

|                       | Included in Cypress Test Production?     |  What is it used for?                                                                |
|-----------------------|-|-------------------------------------------------------------------------------------------------------------------------------|
| check_links.js        |✘                                         | Detect broken links throughout the website. Result is saved in `logs` folder.        |
| app_to_web.js         |✓                                         | Check that all links to the website used by the Android and iOS apps are working and that content is correctly displayed.                |
| applink_spec.js       |✓                                         | Detect broken links or missing OS badges to download mobile app in home page.         |
| blog_spec.js          |✓                                         | Check if blog archive is accessible.                                                  |
| check_anchor_links.js |✓                                         | Detect broken anchor links throughout the website. Result is saved in `logs` folder.  |
| check_videos.js       |✓                                         | Detect broken videos throughout the website.                                          |
| eventRegistration.js  |✓                                         | Checks that all fields in event-registration exist and fill them to create a QR code. |
| faq.js                |✓                                         | Simulate a FAQ search and the result for mobile and desktop view.                     |
| hotline_spec.js       |✓                                         | Verify that Hotline APP and TAN data is correctly displayed on the home page.              |
| mime.js               |✓                                         | Check that CSS and JS files have the correct MIME type. See https://developer.mozilla.org/en-US/docs/Glossary/MIME_type                      |

To run all tests included in Cypress Test Production execute:

`npx cypress run -s 'cypress/e2e/*.js' -c baseUrl=https://coronawarn.app --headed` => test results are printed in the console, also you can see browser's movements

`npx cypress run -s 'cypress/e2e/*.js' -c baseUrl=https://coronawarn.app --headless --browser chrome` => test results are printed in the console, the browser is not displayed

### Updating coronawarn.app

Any direct commits and merged pull requests will automatically trigger follow-up actions to build and deploy the changes to [coronawarn.app](https://coronawarn.app). The respective [GitHub Actions](https://github.com/features/actions) are available in the [.github/workflows](.github/workflows) directory of this repository.

## Documentation

The full documentation for the Corona-Warn-App can be found in the [cwa-documentation](https://github.com/corona-warn-app/cwa-documentation) repository. The documentation repository contains technical documents, architecture information, and white papers related to this implementation.

## Support and Feedback

The following channels are available for discussions, feedback, and support requests:

| Type                     | Channel                                                |
| ------------------------ | ------------------------------------------------------ |
| **General discussion, issues, bugs**   | <a href="https://github.com/corona-warn-app/cwa-website/issues/new/choose" title="General Discussion"><img src="https://img.shields.io/github/issues/corona-warn-app/cwa-website?style=flat-square"></a> </a>   |
| **Other requests**    | <a href="mailto:corona-warn-app.opensource@sap.com" title="Email CWA Team"><img src="https://img.shields.io/badge/email-CWA%20team-green?logo=mail.ru&style=flat-square&logoColor=white"></a> |

## How to contribute

The German government has asked SAP and Deutsche Telekom AG to develop the Corona-Warn-App for Germany as open source software. Deutsche Telekom is providing the network and mobile technology and will operate and run the backend for the app in a safe, scalable and stable manner. SAP is responsible for the app development, its framework and the underlying platform. Therefore, development teams of SAP and Deutsche Telekom are contributing to this project. At the same time our commitment to open source means that we are enabling -in fact encouraging- all interested parties to contribute and become part of its developer community.

For more information about how to contribute, the project structure, as well as additional contribution information, see our [Contribution Guidelines](./CONTRIBUTING.md). By participating in this project, you agree to abide by its [Code of Conduct](./CODE_OF_CONDUCT.md) at all times.

## Repositories

A list of all public repositories from the Corona-Warn-App can be found [here](https://github.com/corona-warn-app/cwa-documentation/blob/main/README.md#repositories).

## Licensing

Copyright (c) 2020-2022 Deutsche Telekom AG and SAP SE or an SAP affiliate company.

Licensed under the **Apache License, Version 2.0** (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at https://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the [LICENSE](./LICENSE) for the specific language governing permissions and limitations under the License.

The "Corona-Warn-App" logo is a registered trademark of The Press and Information Office of the Federal Government. For more information please see [bundesregierung.de](https://www.bundesregierung.de/breg-en/federal-government/federal-press-office).
