---
page-title: "Risk calculation under Exposure Notification Framework Version 2"
page-description: "Risk calculation under Exposure Notification Framework Version 2"
page-name: risk-calculation-exposure-notification-framework-2-0
page-name_de: risk-calculation-exposure-notification-framework-2-0
author: Hanna Heine
layout: blog
---
 
Previously, the Corona-Warn-App displayed one or more low risk encounters. Since the update, these have disappeared or rather the number decreased, because the risk calculation improved significantly under Version 2 of the Exposure Notification Framework (ENF). With the interface's new version, it is now possible to control more precisely which encounters should be counted.
 
<!-- overview -->

## Less encounters with a low risk

With the introduction of Corona-Warn-App version 1.9, a new version of the Exposure Notification Framework (ENF) from Apple/Google is used, version 2.0. The data from this interface is used as the basis for calculating the individual risk.
 
Previously, the number of non-critical encounters displayed in the app could not be filtered. Up to version 1.7.1, very short encounters with users who later tested positive for COVID-19 were also counted and displayed in the app. However, due to the stored criteria for the risk calculation, these were only displayed as low-risk encounters.

**In simplified terms**: Under Exposure Notification Version 2.0, the operating system also logs encounters with a risk lower than "low risk" (green). However, since these encounters are not relevant from the current epidemiological perspective, the Corona-Warn-App filters them out.


## Risk calculation under ENF 2.0 

While the interface's first version 1.0 used average attenuation values for all encounters with another device during the course of the day, the new version 2.0 now considers 30-minute time windows.

To be considered as an encounter, the following conditions must be met within a 30-minute time window:
- The signal attenuation must have been below 73dB for at least 10 minutes within the 30-minute window
- The transmission risk level must be at least III (3). It is determined when sharing the diagnosis codes per day according to defined criteria such as symptom status and/or symptom onset.

If these criteria are **not** met, an encounter is **not counted** within the app. It is a "non-risk encounter". However, in the operating system's contact log, a count is performed. However, this is not an error.

However, if the conditions are met, the contact times are weighted depending on the signal attenuation:
- Times with an attenuation <55dB are calculated at 100%.
- Times with an attenuation >= 55dB and <63dB are calculated at 50%.

Based on the transmission risk level (III to VIII), only a factor between 0.6 and 1.6 is determined. The weighted time from the previous step is multiplied by this factor, which then results in the weighted contact time.
This weighted time is now used to decide what type of encounter this time slot is:
- Weighted contact time <15 minutes: Encounter with a low risk (green).
- Weighted contact time >=15 minutes: Encounter with increased risk (red).

Finally, all time windows of a day are considered (the weighted contact times) and added up. If the sum is >= 15 minutes, the overall status becomes red, otherwise it is green.

Ultimately, this means that several "green" encounters (time windows) can result in a red status in total.

For those who would like to dive even deeper into the subject:
- The updated diagrams are available on GitHub: https://github.com/corona-warn-app/cwa-documentation/tree/main/images/risk_calculation
- An overview diagram shows how filtering is done now: https://github.com/corona-warn-app/cwa-documentation/blob/main/images/risk_calculation/risk_calculation_enf_v2_overview.pdf
 

