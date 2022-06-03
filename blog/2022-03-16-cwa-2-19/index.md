---
page-title: "CWA 2.19 improves the assignment of certificates to persons"
page-description: "CWA 2.19 improves the assignment of certificates to persons"
page-name: cwa-2-19
page-name_de: cwa-2-19
author: CWA-Team, 10 am
layout: blog
---

The project team of the Robert Koch Institute, Deutsche Telekom, and SAP have released **version 2.19 of the Corona-Warn-App (CWA)**. The update enables a **more error-tolerant assignment of certificates to persons**. This means, for example, that minor differences in first and last names are ignored and name additions such as academic titles are filtered out so that certificates are still assigned to the same person.

<!-- overview -->

In the past, for the CWA to be able to assign different certificates to one person, the first and last names on the certificates had to match exactly. For example, if a user provided their middle name on one certificate and not on another, the CWA assigned the certificates to two different people. To correct this, users had to go to the pharmacy to get a new certificate.

With the update, this is no longer necessary, as the CWA can now break down the first and last names into their components when comparing two certificates. This allows it to **recognize that two certificates belong to one person if:**

1. the first and last names either match exactly or **at least one first name and at least one last name** match, and

2. the **dates of birth** match exactly. 

**To give you an example:** Jane Doe’s basic immunization certificate has her first name “Jane” and her last name “Doe”. In the certificate of her booster vaccination, she has indicated her **second name** Maria, so that “Jane Maria” now appears there under her first name. The CWA recognizes that at least one first name (Jane) and one last name (Doe), as well as the date of birth, match and groups the certificates under the same person. The matching also allows the CWA to filter out name suffixes such as **academic titles** and assign the certificates to the same person accordingly. 

**Important to note:** The precondition that the date of birth in both certificates must match has not changed. 

The CWA will inform the users for whom the adjustment changes something in the grouping of their certificates. 

Version 2.19, like previous versions, will be rolled out to all users in stages over 48 hours. iOS users can now download the latest app version manually from the Apple Store. The Google Play Store does not offer the option of triggering a manual update. The new version of the Corona-Warn-App will be available to users here within the next 48 hours. 

Up-to-date information on the status of the roll-out can be found on the **Twitter channel of [#coronawarnapp](https://twitter.com/coronawarnapp) (German only)**.
