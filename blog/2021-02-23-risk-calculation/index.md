---
page-title: "Corona-Warn-App’s risk calculation further adjusted after detailed tests"
page-description: "Corona-Warn-App’s risk calculation further adjusted after detailed tests"
page-name: corona-warn-app-risk-calculation-optimization
page-name_de: corona-warn-app-risk-calculation-optimization
author: Hanna Heine
layout: blog
---
 
Deutsche Telekom and SAP’s project team continue to adapt the Corona-Warn-App’s risk calculation in collaboration with the Robert Koch-Institut (RKI) following extensive tests by the Fraunhofer Institute for Integrated Circuits (IIS). As a result, the app can now identify encounters with increased risk even better. and will show even more precisely when users have had encounters with people who later tested positive for COVID-19. 

Now, the app considers short contacts between two people that lasted at least 5 minutes, not 10 minutes as it was the case before. The relevant data for this adjustment is only available because Apple and Google developed their interface further. Measurements based on version 2 of the interface confirmed that warnings can be better and more accurate through the adjustment. 

<!-- overview -->

Since the end of 2020, the Corona-Warn-App has been using version 2 of the interface developed by Apple and Google, the so-called [Exposure Notification Framework Version 2](/en/blog/2020-12-16-corona-warn-app-version-1-9/) (ENF V2). This allowed the developers to improve the risk calculation as encounters with low risk (green tile) can be filtered better. As a result, the number of days with exposures decreased for many users. 

In recent weeks, the Fraunhofer Institute has conducted extensive tests as part of its investigations accompanying the development of the Corona-Warn-App. In this context, the details of time recording and distance estimation via Bluetooth LE (Low Energy) - on which the Corona-Warn-App’s risk calculation is based - were tested under ENF V2 **in various situations**. Based on the investigations and evaluations by the project members, the app’s risk calculation will be adapted so that risk encounters can be recorded even more precisely in the future.


### What adjustments are planned and what does this mean for users?

Experts from Deutsche Telekom, SAP, RKI and Fraunhofer are reducing the time required to filter out short contacts that are not relevant from an epidemiological perspective **from 10 to 5 minutes**. This means: So far, the app only took a contact between two people into account if it lasted at least 10 minutes. Now, the app also considers contacts that lasted for at least 5 minutes. As a result, the number of low-risk encounters (green tile) increases again depending on the users’ behavior.

That also means that the encounters that actually represent a **relevant contact with a COVID-19 infected person** can be identified even more accurately and displayed accordingly in the app as days with increased risks (red tile). That’s because the app no longer uses average attenuation values for all encounters with another device during the course of the day (as it was the case under ENF V1), but instead considers 30-minute time windows. Several "green" encounters (= time windows) can therefore lead to a red status overall. A basic explanation of the technical background of the risk calculation under ENF V2 can be found [here](/en/blog/2020-12-17-risk-calculation-exposure-notification-framework-2-0/). 

The project participants are continuously working on improving the measurements and the resulting configuration parameters. For example, the experts also discuss **new findings** on the spread and infectivity of newly emerging virus mutations (so-called "variants of concern"). As soon as the project members further develop and adapt the risk calculation with regard to distances and signal attenuation, you will find more information here. 
