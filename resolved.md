# Resolved FAQ entries

This file contains FAQ entries for issues which were either resolved or no longer relavant for the app.

## English

### My exposure log shows multiple, simultaneous checks for exposures. Is that an error?

anchor: multiple_exposure_checks

<b>UPDATE</b><br/>As of version 1.6.0 of the Corona Warn App, there are no longer separate checks for each day. Instead, the app performs a single check on all available diagnosis keys from the past 14 days when an update is downloaded from the server.<hr/>

When the app downloads the current diagnosis keys from the server, a check of the exposure log is performed. During that process, a separate check is performed for each of the last 14 days, for which diagnosis keys are available. It is therefore not an error that multiple, seemingly simultaneous entries are visible in the exposure check history. You can further click on the details of each check to see that different amounts of keys were provided for each of them.


### [Apple/iOS] 'ExposureDetectionIsAlreadyRunning' in CWA version 1.6.1

anchor: ExposureDetectionIsAlreadyRunning

<b>UPDATE</b><br/>This issue has been fixed in version 1.7.1.<hr/>

The notification <a href='https://github.com/corona-warn-app/cwa-app-ios/issues/1497'>'ExposureDetectionIsAlreadyRunning'</a> <a href='https://github.com/corona-warn-app/cwa-app-ios/issues/1512#issuecomment-727206633'>can be ignored</a>. The CWA is still working correctly and this issue will be solved with a <a href='https://github.com/corona-warn-app/cwa-app-ios/pull/1510'>future release</a>.


### [Apple/iOS]: Exposure Check Failed after updating to version 1.6.0

anchor: expcheck_160

<b>UPDATE</b><br/>This issue has been fixed in version 1.6.1.<hr/>
After an update to app version 1.6.0, you might get the error 'Exposure Check Failed', even though there was a successful check in the past 24 hours. We are working on a solution for this error. In the meantime, try restarting your app. This helps in most cases.


### [Apple/iOS]: Migrating to new phone and backup and restore - app does not work

anchor: migration_Apple

<b>UPDATE</b><br/>This problem has been solved with version 1.5.0.<hr/> If you transfer your data to a new iPhone using iTunes, or restore a backup, the app does not work properly. On the start screens, you end up in a loop, or the exposure logging cannot be activated. The risk status is not displayed.

This is a known problem with backing up the random IDs, see also <a href='https://www.coronawarn.app/en/faq/#backup' target='_blank' rel='noopener noreferrer'>https://www.coronawarn.app/en/faq/#backup.</a>

Please reinstall the Corona-Warn-App on your new iPhone.


### [Apple/iOS]: 'COVID-19 exposure logging... - Weekly Update'

anchor: notif_weekly_update


<b>UPDATE</b><br/>The behaviour of the iOS notification regarding exposure notifications has been changed with iOS version 13.7. A notification is now displayed in a monthly interval. It can be deactivated in the iOS settings:<br/>

<ol><li>'Settings' -> 'Exposure Notifications'</li><li>Deactivate 'Monthly Update'.</li></ol>

We therefore ask you to update to the newest iOS release.<hr/>

This is a general notification, which does not mean that risk encounters have been identified. It is <b>not</b> a message or function of the Corona-Warn-App. Apple's Exposure Notification System (ENS) sends this notification and displays the icon. Apple's ENS provides information about any encounters with app users who were tested positive - without making a statement as to whether or not it was a critical encounter according to the Robert Koch Institute's algorithm. For example, encounters are also displayed in case the distance was more than 8 meters or in case it only lasted a few minutes. This means that the 'Weekly Update' only provides information about technical procedures of the ENS that are insufficient for an actual risk calculation. A reliable risk calculation takes place exclusively in the Corona-Warn-App under the scientific framework of the Robert Koch Institute. You can view your current risk status directly in the Corona-Warn-App.

### [Google/Android]: Error when communicating with Google API (39508)

anchor: API39508

<b>UPDATE</b><br/>This bug has been fixed in version 1.5 of the Corona Warn App. We therefore ask you to update the app accordingly.<br/><b>IMPORTANT:</b><br/><b>After updating to version 1.5 it will take up to 24 hours until the error is gone.</b>

If you are still receiving the error after updating to 1.5 and waiting 24 hours, please report it in the <a href='https://github.com/corona-warn-app/cwa-app-android/issues/1459' target='_blank' rel='noopener noreferrer'>associated GitHub issue</a>.<hr/>

The notification indicates that the Corona-Warn-App has called the Exposure Notification System too often to downloaded the keys from the server and match them with the locally stored random IDs. This is how it can be determined if there were exposures to persons who reported positive.

It can be triggered by various other errors, but is always a consequence of them, not the root cause. The error should disappear after 24 hours. Please keep your app closed for this timeframe.

If it still occurs afterwards, please comment in the <a href='https://github.com/corona-warn-app/cwa-app-android/issues/1459' target='_blank' rel='noopener noreferrer'>associated GitHub issue</a> and provide the following information about your phone: <ul><li>Device name</li><li>Android version</li><li>CWA App version</li></ul>

We ask you to not de-install the app or to reset the data of Google Play Services, because this can remove <a href='#delete_random_ids' target='_blank' rel='noopener'>the logged exposures</a>, and it will not resolve this issue. Additionally, we ask you to not delete the app data of Corona-Warn-App, as this will also not resolve the issue in this case, but you might lose other important data, like a formerly registered COVID-19 test.

### [Google/Android]: Cause: 9002 Something went wrong (timeout)

anchor: cause9002_timeout

<b>UPDATE</b><br/>This bug has been fixed in version 1.5 of the Corona Warn App. We therefore ask you to update the app accordingly.<br/><hr/>

If, when opening Corona-Warn-App, the current keys of positively tested users are to be downloaded from the server (because automatic data synchronization was not yet carried out on that day) and no internet connection can be established, you may receive the following error message: 'Cause: 9002, Something went wrong. timeout'. A 'java.net.SocketTimeoutException' is given as the cause under 'Details'. There are two different known causes that can lead to this error:

<ol><li><b>The internet connection is still being established.</b> If you have just switched on previously deactivated data connections (Wi-Fi or mobile) or restarted your phone and immediately open Corona-Warn-App, the internet connection may not have been fully established yet. There are also special apps that only enable data connections when the screen is switched on. In these cases the error message can occur. <b>Solution:</b> If the internet connection was deactivated or interrupted, wait a few seconds after switching on the internet connection before opening Corona-Warn-App. If you use an app to control data connections, set it up so that data connections in the background are enabled for Corona-Warn-App.</li><li><b>The internet connection is blocked.</b> This can be the case if you have either manually restricted data connections in your phone’s settings or if data connections for Corona-Warn-App have been automatically deactivated by your antivirus app and/or  firewall. <b>Solution:</b> Enable data usage in general as well as background data and unrestricted data usage in the settings of your phone for Corona-Warn-App. If you use an antivirus app and/or firewall on your phone, set it up so that there are no data usage restrictions for Corona-Warn-App.</li></ol>

Please refer to <a href='https://github.com/corona-warn-app/cwa-app-android/issues/998' target='_blank' rel='noopener noreferrer'>GitHub issue 998</a> for more information.


### [Google/Android]: Cause: 9002 Something went wrong (sqlite)

anchor: cause9002

<b>UPDATE</b><br/>This bug has been fixed in version 1.5 of the Corona Warn App. We therefore ask you to update the app accordingly.<br/><hr/>

On some phones (for example, Huawei P20 Pro), there could be problems when accessing the encrypted area of the app database, where the info for the risk status and the last updates are stored. Usually, this error displays a Cause: 9002 message with hints to the database used, SQLite, sqlite_master, a security exception, or an error with the decryption. It can sometimes be that you can't open the app.

We're working on identifying the cause and fixing it then. For details, see <a href='https://github.com/corona-warn-app/cwa-app-android/issues/642' target='_blank' rel='noopener noreferrer'>https://github.com/corona-warn-app/cwa-app-android/issues/642</a>. There, we will keep you updated for fixing the error and additional hints.

If your phone type is not yet covered in the GitHub issue, write us the type in a comment. This helps us to determine the cause. If the GitHub issue doesn't cover your cause 9002 error, create a <a href='https://github.com/corona-warn-app/cwa-app-android/issues/new?labels=bug&template=01_bugs.md' target='_blank' rel='noopener noreferrer'>new issue</a>.

<b>If you can no longer open the app, please read the section <a href='#app_crash' target='_blank' rel='noopener'>'Corona-Warn-App is closed immediately after starting'</a>.</b>


### [Google/Android]: Corona-Warn-App is closed immediately after starting
anchor: app_crash

<b>UPDATE</b><br/>This bug has been fixed in version 1.5 of the Corona Warn App. We therefore ask you to update the app accordingly.<br/><hr/>

If Corona-Warn-App is unexpectedly terminated due to an error in the operating system or aggressive energy-saving measures taken by the phone, it may happen that the Corona-Warn-App can no longer access its encrypted databases when it is restarted. In this case, it is closed immediately on start. Sometimes the <a href='#cause9002' target='_blank' rel='noopener'>error Cause: 9002 Something went wrong (sqlite)</a> was displayed before.

We are working flat out to find a solution to the problem.

The GitHub community has developed an emergency solution that brings the Corona-Warn-App up and running again without uninstalling it. However, since data can be lost in this case (e.g. registered COVID-19 tests for online querying of the test results), you should only use this emergency solution if no other measures were helpful (in particular suggestions from the technical telephone hotline or from supervisors of the Corona-Warn-App in the Google Play Store), and you have fully taken note of the information on the emergency solution in the GitHub issue.

<a href='https://github.com/corona-warn-app/cwa-app-android/issues/1053#issuecomment-690615473' target='_blank' rel='noopener noreferrer'>Find the emergency solution in the GitHub issue here</a>.


### [Google/Android]: Exposures are displayed for more than 14 days

anchor: status_14

UPDATE: This Issue was resolved in version 1.2 of the Corona Warn App. Exposures are displayed for up to 14 days after you encountered the user who then uploaded a diagnosis key using the Corona-Warn-App.

For some phones running Android, the exposures currently are displayed for more than 14 days. We're working on fixing this display error. You'll find up-to-date information in <a href='https://github.com/corona-warn-app/cwa-app-android/issues/911' target='_blank' rel='noopener noreferrer'>GitHub issue 911</a>.


### [Google/Android]: 0 keys displayed

anchor: keys0

UPDATE: This display error was resolved by a Google Play Services update, see <a href='https://github.com/corona-warn-app/cwa-app-android/issues/744#issuecomment-659255917' target='_blank' rel='noopener noreferrer'>this GitHub comment</a>.

This is a known display error. The app still works as intended. We're currently working to solve this problem together with Google.


### When will the app be ready?

anchor: when_ready

The app is available since June 16, 2020. You can download it from Google Play Store and Apple App Store. The development progress can still be tracked in the code repositories.


### [Apple/iOS]: Problems after updating to iOS 13.6

anchor: iOS_136

UPDATE: Apple has now released iOS version 13.6.1, which fixes this error. Please update your phone to iOS 13.6.1.

After updating to the iOS version 13.6, exposure logging couldn't be activated on some iPhones because exposure logging was seemingly not available in their region. For details, see GitHub issue <a href='https://github.com/corona-warn-app/cwa-app-ios/issues/911' target='_blank' rel='noopener noreferrer'>https://github.com/corona-warn-app/cwa-app-ios/issues/911</a>.


### [Apple/iOS] I cannot open the app

anchor: app_does_not_open

UPDATE: App version 1.2.1 is now available and resolves this issue. Please update your app.

Unfortunately, an error was introduced with the latest update (1.2.0): Many users were not able to open the app.


### [Google/Android] The explanation for a risk encounter on the low risk card is contradictory

anchor: low_risk_text

UPDATE: This error has already been corrected. The correction is available with app version 1.2.1. Please update the app.

With the latest update (1.2.0), a misleading explanatory text was introduced for a low risk of infection. If there was an exposure and the app still shows a low risk for you, the risk of infection is still ranked as 'low' and not as 'increased' (as described in the current text).


### [Apple/iOS]: Wrong number of active days

anchor: days_active_Apple

Update: This display error is resolved by now. Please update the Corona-Warn-App to the latest version. The app will now count up the number of active days, until the 14 active days are reached, as intended.

When counting the active days, an error is displayed currently: When '14 of 14 active days' is reached, the number of active days doesn't display 14 out of 14, but keeps displaying 13 out of 14 active days or fewer.

This is only a display error. The Corona-Warn-App continues to work as intended, that means, the IDs are still exchanged and the exposure logging still works. No data is lost. Technically, it is a rounding error that displays when the number of active days of the exposure logging does not increase any more, but stays 14 days. When the exposure logging was inactive in any way, even for a short amount of time, the counter stays at a lower number of days, for example, 13 active days.

Exposure logging can be deactivated, for example, by the following:

<ol><li>Bluetooth was deactivated, even for a short amount of time</li><li>Background updates for the app where not active, so that exposure logging was not done continuously</li><li>Flight mode was active, even for a short amount of time</li><li>The smartphone was turned off</li><li>The smartphone was restarted</li></ol>

For detailed information, see <a href='https://github.com/corona-warn-app/cwa-app-android/issues/796#issuecomment-653061512' target='_blank' rel='noopener noreferrer'>this comment on GitHub</a>.

### [Google/Android]: Wrong number of active days

anchor: days_active_Android

UPDATE: This display is updated in the meantime. If nonetheless another day count displays, see <a href='#exposure_check' target='_blank' rel='noopener'>My exposure log shows checks for less than 14 days</a>.

When counting the active days, an error is displayed currently: When '14 of 14 active days' is reached, the number of active days doesn't display 14 out of 14, but keeps displaying 13 out of 14 active days or fewer.

This is only a display error. The Corona-Warn-App continues to work as intended, that means, the IDs are still exchanged and the exposure logging still works. No data is lost. Technically, it is a rounding error that displays when the number of active days of the exposure logging does not increase any more, but stays 14 days. When the exposure logging was inactive in any way, even for a short amount of time, the counter stays at a lower number of days, for example, 13 active days.

Exposure logging can be deactivated, for example, by the following:

<ol><li>Bluetooth or the location service were deactivated, even for a short amount of time</li><li>Background updates for the app where not active, so that exposure logging was not done continously</li><li>Flight mode was active, even for a short amount of time</li><li>The smartphone was turned off</li><li>The smartphone was restarted</li></ol>

It is planned that this will be resolved with the next release.

For detailed information, see <a href='https://github.com/corona-warn-app/cwa-app-android/issues/796#issuecomment-653061512' target='_blank' rel='noopener noreferrer'>this comment on GitHub</a>


### Why does the app stop at 14 of 14 days saved? What does 14 of 14 days save actually mean?

anchor: days_active_explanation

UPDATE: This display is updated in the meantime. If nonetheless another day count displays, see <a href='#exposure_check' target='_blank' rel='noopener'>My exposure log shows checks for less than 14 days</a>.

The Corona-Warn-App logs exposures for the past 14 days. Older exposures are not relevant for the risk assessment and will therefore be discarded. Hence, the app will always show \"14 of 14 days saved\" if it was active for the entire time frame. The count does not start over after 14 days. If exposure logging is active and a risk status is being displayed, the app is working as expected.",
"If you temporarily deactivate the app after 14 days, the displayed number can jump back to 13 (or fewer) active days. This can be triggered by the following activities:<ul><li>Disabling bluetooth</li><li>Disabling the background app refresh so that risk assessment could not be performed</li><li>Enabling flight mode</li><li>Turning off your smartphone</li><li>Restarting your smartphone</li></ul>


### [Google/Android]: Error when communicating with Google API(10)

anchor: API10

<b>UPDATE 14.01.2021</b><br/>Should you experience this issue, please write a report here: <a href='https://github.com/corona-warn-app/cwa-app-android/issues/1962' target='_blank' rel='noopener'>cwa-app-android/issues/1962</a>.<hr/>

UPDATE: This error is resolved by version 1.5 of the Exposure Notification System. For details about your ENS version, see <a href='#ENF_version' target='_blank' rel='noopener'>Which version of the COVID-19 Exposure Notification System is currently installed?</a>

This error, in connection with missing risk identification, is currently fixed together with Google. Exposure logging works as intended. Please do not uninstall the app, because this can remove the logged exposures, see also <a href='#delete_random_ids' target='_blank' rel='noopener'>https://www.coronawarn.app/en/faq/#delete_random_ids</a>.


### [Apple/iOS]: ENErrorDomain-Error 11

anchor: ENError11

UPDATE: Although Apple stated that this Issue has been fixed with iOS 13.6, it's currently appearing again on devices which run iOS 14 or higher. To fix it please open the iOS settings and go to 'Exposure Notification', scroll down to the bottom and click 'Turn Off Exosure Notifications' and turn it back on again.

The ENErrorDomain 11 error is thrown by Apple's Exposure Notification System, which is used by the Corona-Warn-App.


### [Apple/iOS]: ENErrorDomain-Error 5

anchor: ENError5

UPDATE: The ENErrorDomain 5 error is thrown by Apple's Exposure Notification System, which is used by the Corona-Warn-App. According to Apple, the cause is already fixed, and therefore, it shouldn't occur any more. If the error still occurs, please be patient until the change reaches your device.


### [Apple/iOS]: I sometimes get the following notification: 'Exposure Notifications Region Changed. COVID-19 Exposure Notifications may not be supported by \"Corona-Warn\" in this region.'

anchor: iphone_region_change

UPDATE: After you updated to iOS version 13.6., this message is gone.

This message is issued directly by the Exposure Notification System of the operating system. You can choose 'OK' to confirm the message, exposure logging works as intended. To check this, you can also navigate to 'Settings' > 'Privacy' > 'Health' > 'COVID-19 Exposure Logging' (iOS 13.7 or higher: 'Settings' > 'Exposure Notifications' > 'Exposure Logging Status') on your device to check the status. This is an iOS bug and Apple is already working on a solution, which is expected to be delivered with the next iOS update. Please open the Corona-Warn-App once again to make sure that the background app refresh continues to work.


### [Apple/iOS]: Not enough memory for the contact protocol

anchor: memory

UPDATE: This error is raised by the operating system. After you updated to Apple iOS version 13.6., this error should be gone.

The Corona-Warn-App uses just about 20 MB of smartphone storage. The size can vary slightly due to updates. In addition, the app caches some data.


### [Google/Android]: While setting up the app, I’m getting the following error: 'CAUSE: 3. Something went wrong. Error when communication with Google API (17).' What does this mean?

anchor: cause_3

UPDATE: This error is fixed in the meantime.

This error can occur when you activate exposure logging for the first time or later in the settings or on the main screen of the app. It means that your device cannot log exposure for one or more of the following reasons:

<ul><li>Google Play Services are outdated.</li><li>The app is not available with Google Play for your country. See <a href='https://www.coronawarn.app/en/faq/#international' target='_blank' rel='noopener noreferrer'>this FAQ</a> for the supported country versions.</li><li>You haven’t installed Corona-Warn-App via the official Google Play Store.</li><li>Your device has been modified (e.g. by rooting).</li><li>You have multiple user accounts on your device and the user that you use Corona-Warn-App with doesn’t have administrator rights.</li><li>The manufacturer of your device hasn’t made Google Play Services and Google Play Store available for your device. This affects some models by Huawei und Xiaomi, for example.</li><li>Google Mobile Services are outdated.</li></ul>

<b>Troubleshooting</b>

Many affected users were able to get rid of this error through the following steps:

<ol><li>Update your Google Play Services to the latest version. See: <a href='https://play.google.com/store/apps/details?id=com.google.android.gms&hl=en' target='_blank' rel='noopener noreferrer'>Google Play Services</a>. In the device settings under 'Apps & notifications' > 'Google Play Services' > 'Advanced', you can check your version at the bottom. Please also see the note on Google Mobile Services at the bottom of this answer.</li><li>Clear the cache of the Google Play Services in the device settings under 'Apps & notifications' > 'Google Play Services' > 'Storage' > 'Clear cache'.</li><li>Change your Google Play country to Germany as described here: <a href='https://support.google.com/googleplay/answer/7431675?hl=de' target='_blank' rel='noopener noreferrer'>Change your Google Play country</a>.</li><li>Check if your device generally supports exposure logging in Germany. In the device settings under 'Google' > 'COVID-19 Exposure Notifications', Corona-Warn-App should be listed.</li><li>Make sure that the user account that you’re using on your device has administrator rights. In the device settings, go to 'System' > 'Advanced' > 'Multiple users'.</li><li>Before you install Corona-Warn-App make sure that you’re connected to the internet and that you have activated Bluetooth and Location (see also <a href='https://www.coronawarn.app/en/faq/#android_location' target='_blank' rel='noopener noreferrer'>here</a>).</li><li>Restart your device.</li><li>If nothing else worked, because doing so could remove the already collected random IDs (see <a href='#delete_random_ids' target='_blank' rel='noopener'>https://www.coronawarn.app/en/faq/#delete_random_ids</a>): Uninstall the Corona-Warn-App and reinstall it from the Google Play Store (<a href='https://play.google.com/store/apps/details?id=de.rki.coronawarnapp&hl=en&showAllReviews=true' target='_blank' rel='noopener noreferrer'>Corona-Warn-App</a>).</li></ol>

If the error persists even though you went through all steps listed above, Possibly a short wait is necessary for your device to activate Exposure Logging. Please close Corona-Warn-App and wait for two hours before trying again.

Note on Google Mobile Services: For Corona-Warn-App to work, Google Mobile Services has to be automatically updated on the device by Google. You cannot manually trigger this update. If you have already updated the Google Play Services as described above, you have to wait for the automatic update of Google Mobile Services. Try using the app again the next day.

We’re constantly improving the app and will try to remove possible app-related causes of this error.


### [Apple/iOS]: In my COVID-19 Exposure Logging settings it says: 'Corona-Warn has checked your log of collected random IDs 0 times over the past 24 hours.' Does this mean that exposure logging isn’t working?

anchor: no_log_check

UDPATE: This notification is no longer displayed since the diagnosis keys are available on the server.

Exposure logging is working, don’t worry. You can find this iOS note under 'Settings' > 'Privacy' > 'Health' > 'COVID-19 Exposure Logging' (iOS 13.7 or higher: 'Settings' > 'Exposure Notifications' > 'Exposure Logging Status'). It means that the back-end server has not sent any diagnosis keys to your device yet. Thus, the Corona-Warn-App hasn’t received any keys to check against the collected random IDs on your phone. As soon as persons diagnosed with COVID-19 have uploaded their diagnosis keys, this check is triggered.


### Exposure Notification Express (ENE)

anchor: ene

Exposure Notification Express (ENE) was additionally developed by Google and Apple to support health authorities worldwide who do not yet have an app and cannot or do not want to develop an app themselves. ENE simply provides standardized Covid-19 notifications, but does not digitize the process to the test result.

Although risk encounters can be displayed, the diagnostic keys cannot be transmitted without further verification if the test result is positive. Nor can test results be transmitted with ENE.

For the German Corona-Warn-App (CWA), the introduction of Exposure Notification Express does not currently change anything. Regions that operate an app adapted to their own needs will continue to receive the encounter notifications from the Exposure Notification System directly and exclusively. In Germany, all exposure notifications are routed exclusively to the CWA. The high German standards for data protection apply. Risk assessment in Germany is carried out exclusively according to the epidemiological guidelines of the Robert Koch Institute (RKI). Users receive personal support from the hotlines if required.

According to current knowledge, the own app instead of the standard solution ENE offers countries the following advantages:

<ul><li>Flexible verification process</li><li>Integrated laboratory connection, faster notification process</li><li>Data protection conformity</li><li>Legal conformity, e.g. age rating</li><li>EU interoperability with legal certainty and data protection</li><li>Integration of hotlines</li><li>Backend servers still have to be operated</li><li>Parameterization (e.g. when an encounter is evaluated as a risk does not come from Google/Apple, but can be defined by each country)</li></ul>


## German


### Meine Begegnungsüberprüfung zeigt mehrere zeitgleiche Einträge. Ist das ein Fehler?

anchor: multiple_exposure_checks

<b>AKTUELL</b><br/>Seit Version 1.6.0 der Corona-Warn-App gibt es keine separaten Überprüfungen für die einzelnen Tage mehr. Stattdessen wird nach dem Download der aktuellen Diagnoseschlüssel vom Server eine einzelne Überprüfung von allen vorhandenen Diagnoseschlüsseln durchgeführt.<hr/>

Sobald die App die aktuellen Diagnoseschlüssel vom Server lädt, wird eine Überprüfung der Begegnungsaufzeichnungen durchgeführt. Dabei wird für jeden der letzte 14 Tage, für den Diagnoseschlüssel vorhanden sind, eine separate Überprüfung der Begegnungsaufzeichnungen durchgeführt. Es ist also daher kein Fehler, dass pro Tag mehrere Einträge in der Überprüfungs-Historie vorhanden sind. Sie können zudem auf die Überprüfungseinträge klicken und sehen, dass immer unterschiedlich viele Schlüssel geprüft werden.


### [Apple/iOS] 'ExposureDetectionIsAlreadyRunning' in CWA version 1.6.1

anchor: ExposureDetectionIsAlreadyRunning

<b>AKTUELL</b><br/>Das Problem ist in Version 1.7.1 behoben worden.<hr/>

Die Meldung <a href='https://github.com/corona-warn-app/cwa-app-ios/issues/1497'>'ExposureDetectionIsAlreadyRunning'</a> <a href='https://github.com/corona-warn-app/cwa-app-ios/issues/1512#issuecomment-727206633'>kann ignoriert werden</a>. Die CWA funktioniert korrekt und dieses Problem wird in einem <a href='https://github.com/corona-warn-app/cwa-app-ios/pull/1510'> bevorstehenden Update korrigiert</a>.


### [Apple/iOS]: Risiko-Überprüfung fehlgeschlagen nach dem Update auf Version 1.6.0

anchor: expcheck_160

<b>AKTUELL</b><br/>Das Problem ist in Version 1.6.1 behoben worden.<hr/>

Nach einem Update auf Version 1.6.0 kann es vorkommen, dass Sie die Nachricht 'Risiko-Überprüfung fehlgeschlagen' erhalten, obwohl die letzte Überprüfung noch keine 24 Stunden her ist. Wir arbeiten gerade an einer Behebung dieses Problems. Bis das Update zur Verfügung steht, können Sie das Problem in den meisten Fällen mit einem Neustart Ihrer App beheben.


### [Apple/iOS]: Migration auf neues Gerät bzw. Backup/Restore - App funktioniert nicht

anchor: migration_Apple

<b>AKTUELL</b><br/> Dieses Problem wurde mit Version 1.5.0 behoben.<hr/> Wenn Sie Ihre Daten über iTunes auf ein neues Gerät übertragen oder ein Backup wiederhergestellt haben, funktioniert die App nicht richtig. Auf den Startseiten landen Sie in einer Endlosschleife und/oder die Risiko-Ermittlung lässt sich nicht einschalten. Der Risikostatus wird nicht angezeigt.

Das ist leider ein bekanntes Problem mit der Sicherung der Zufalls-IDs, siehe <a href='#backup' target='_blank' rel='noopener'>Werden die gesammelten Zufalls-IDs in meiner Smartphone-Datensicherung (Backup) berücksichtigt?</a>.

Bitte installieren Sie die Corona-Warn-App auf Ihrem neuen iPhone neu.


### [Apple/iOS]: 'COVID-19-Begegnungsaufzeichnungen' - Wöchentliches Update

anchor: notif_weekly_update

<b>AKTUELL</b><br/>Das Verhalten der iOS Benachrichtigung zur Begegnungsmitteilung wurde mit iOS Version 13.7 geändert. Eine Benachrichtigung wird jetzt nur noch monatlich angezeigt. Die Funktion kann in den iOS Einstellungen zudem vollständig deaktiviert werden:<br/>

<ol><li>'Einstellungen' -> 'Begegnungsmitteilungen'</li><li>'Monatliches Update' ausschalten.</li></ol>

Wir bitten Sie daher, ein Update auf die aktuelle iOS Version durchzuführen.<hr/>

Das ist eine allgemeine Benachrichtigung, die nicht bedeutet, dass Risiko-Begegnungen erkannt worden sind. Es handelt sich dabei <b>nicht</b> um eine Meldung oder Funktion der Corona-Warn-App. Das Exposure Notification System (ENS) von Apple sendet diese Benachrichtigung und zeigt das Icon an. Die ENS-Schnittstelle von Apple informiert an dieser Stelle über jegliche Begegnungen mit App-Nutzern, die positiv getestet wurden - ohne eine Aussage darüber zu treffen, ob es sich um eine nach dem Schema des Robert Koch-Instituts kritische Begegnung handelte oder nicht. Es werden beispielsweise auch Begegnungen angezeigt, bei denen der Abstand mehr als 8 Meter betrug oder die nur wenige Minuten dauerten. Das heißt: Das 'Wöchentliche Update' informiert lediglich über technische Vorgänge des ENS, die für eine tatsächliche Risiko-Ermittlung unzureichend sind. Eine zuverlässige Risiko-Ermittlung findet ausschließlich in der Corona-Warn-App unter den wissenschaftlichen Rahmenbedingungen des Robert Koch-Instituts statt. Sie können Ihren aktuellen Risikostatus direkt in der Corona-Warn-App einsehen.


### [Google/Android]: Fehler bei Kommunikation mit Google API (39508)

anchor: API39508

<b>AKTUELL</b><br/>Dieser Fehler wurde in Version 1.5 der Corona-Warn-App behoben. Wir bitten Sie daher, die App entsprechend zu aktualisieren.<br/><b>WICHTIG:</b><br/><b>Nach dem Aktualisieren auf die Version 1.5 kann es bis zu 24 Stunden dauern bis das Problem behoben ist.</b>

Falls der Fehler nach dem Update auf 1.5 und 24 Stunden Wartezeit immer noch auftritt, schreiben Sie bitte einen Kommentar in das <a href='https://github.com/corona-warn-app/cwa-app-android/issues/1459' target='_blank' rel='noopener noreferrer'>dazugehörige GitHub Issue</a>.<hr/>

Die Meldung besagt, dass die Corona-Warn-App das Exposure Notification System zu oft aufgerufen hat, um die vom Server geladenen Schlüssel mit den lokal eingesammelten Zufalls-IDs abzugleichen und damit festzustellen, ob es Risiko-Begegnungen mit positiv Gemeldeten gab.

Dieses Verhalten kann durch verschiedene andere Fehler ausgelöst werden, ist jedoch immer nur eine Folgeerscheinung. Die Meldung sollte nach 24 Stunden nicht mehr angezeigt werden. Bitte halten sie die App für diesen Zeitraum geschlossen.

Wenn der Fehler danach immer noch auftritt schreiben Sie bitte einen Kommentar in das <a href='https://github.com/corona-warn-app/cwa-app-android/issues/1459' target='_blank' rel='noopener noreferrer'>dazugehörige GitHub Issue</a> und geben Sie die folgenden Informationen zu Ihrem Telefon an: <ul><li>Device name</li><li>Android version</li><li>CWA App version</li></ul>

Wir bitten sie, die App nicht zu deinstallieren oder die Google Play Dienste zurückzusetzen, da hierbei ihre aufgezeichneten Kontaktereignisse <a href='#delete_random_ids' target='_blank' rel='noopener'>verloren gehen können</a>, und eine Neuinstallation den Fehler nicht lösen kann. Darüber hinaus bitten wir Sie, die App-Daten der Corona-Warn-App nicht zu löschen, da dies das Problem in diesem Fall ebenfalls nicht löst. Sie könnten jedoch andere wichtige Daten verlieren, z. B. einen zuvor registrierten COVID-19-Test.


### [Google/Android]: Ursache: 9002 Etwas ist schiefgelaufen (timeout)

anchor: cause9002_timeout

<b>UPDATE</b><br/>Dieser Fehler wurde in Version 1.5 der Corona-Warn-App behoben. Wir bitten Sie daher, die App entsprechend zu aktualisieren.<br/><hr/>

Wenn beim Öffnen der Corona-Warn-App aktuelle Schlüssel positiv getesteter Nutzer vom Server heruntergeladen werden sollen (weil an diesem Tag noch kein automatischer Datenabgleich erfolgt war) und dabei keine Internetverbindung hergestellt werden kann, wird Ihnen möglicherweise eine Fehlermeldung 'Ursache: 9002, Etwas ist schiefgelaufen. timeout' angezeigt. Unter 'Details' wird als Ursache eine 'java.net.SocketTimeoutException' angegeben. Es sind zwei unterschiedliche Ursachen bekannt, die zu diesem Fehler führen können:

<ol><li><b>Die Internetverbindung befindet sich noch im Aufbau.</b> Wenn Sie deaktivierte Datenverbindungen (WLAN oder mobil) gerade eingeschaltet oder Ihr Smartphone neu gestartet haben und sogleich die Corona-Warn-App öffnen, wurde die Internetverbindung möglicherweise noch nicht vollständig hergestellt. Zudem gibt es spezielle Apps, die Datenverbindungen erst dann freigeben, wenn der Bildschirm angeschaltet wird. In diesen Fällen ist das Auftreten des Fehlers möglich. <b>Lösung:</b> War die Internetverbindung deaktiviert oder unterbrochen, warten Sie nach dem Einschalten der Internetverbindung einige Sekunden, bevor Sie die Corona-Warn-App öffnen. Falls Sie eine App zur Kontrolle von Datenverbindungen nutzen, stellen Sie sie so ein, dass Datenverbindungen im Hintergrund für die Corona-Warn-App freigegeben sind.</li><li><b>Die Internetverbindung wird blockiert.</b> Dies kann der Fall sein, wenn Sie entweder Datenverbindungen in den Einstellungen Ihres Smartphones manuell eingeschränkt haben oder wenn Datenverbindungen für die Corona-Warn-App von einer Antivirus-App und/oder einer Firewall automatisch deaktiviert wurden. <b>Lösung:</b> Geben Sie in den Einstellungen Ihres Smartphones (Netzwerk und Internet, Mobile Daten und WLAN) für die Corona-Warn-App die Datennutzung im Allgemeinen, sowie Hintergrunddaten und uneingeschränkte Datennutzung frei. Falls Sie eine Antivirus-App und/oder eine Firewall auf Ihrem Smartphone nutzen, stellen Sie sie so ein, dass für die Corona-Warn-App keine Einschränkungen in der Datennutzung bestehen.</li></ol>

In dem <a href='https://github.com/corona-warn-app/cwa-app-android/issues/998' target='_blank' rel='noopener noreferrer'>GitHub-Issue 998</a> finden Sie weitere Informationen (englisch).


### [Google/Android]: Ursache: 9002 Etwas ist schiefgelaufen (sqlite)

anchor: cause9002

<b>AKTUELL</b><br/>Dieser Fehler wurde in Version 1.5 der Corona-Warn-App behoben. Wir bitten Sie daher, die App entsprechend zu aktualisieren.<br/><hr/>

Es kommt auf einzelnen Geräten (z.B. dem Huawei P20 Pro) zu Problemen beim Zugriff auf den verschlüsselten Bereich der App-Datenbank, in der Informationen zum Risiko-Status und der letzten Aktualisierung abgelegt sind. In der Regel zeigt sich dieser Fehler durch die Ursache 9002 und Hinweise auf die verwendete Datenbank (database), SQLite, sqlite_master, eine Security-Exception oder einen Fehler bei der Entschlüsselung (decryption). Das kann manchmal dazu führen, dass Sie die App nicht mehr öffnen können.

Wir arbeiten daran, die Ursache zu finden und zu beheben. Details dazu finden Sie im GitHub-Issue <a href='https://github.com/corona-warn-app/cwa-app-android/issues/642' target='_blank' rel='noopener noreferrer'>https://github.com/corona-warn-app/cwa-app-android/issues/642</a>. Dort werden wir auch Fehlerbehebungen und weitere Hinweise veröffentlichen.

Wenn Ihr Smartphone-Typ in diesem GitHub-Issue noch nicht genannt ist, schreiben Sie uns bitte den Typ in einem Kommentar. Das hilft uns, die Ursache zu bestimmen. Wenn das GitHub-Issue nicht auf Ihren Fehler mit der Ursache 9002 zutrifft, legen Sie gerne einen <a href='https://github.com/corona-warn-app/cwa-app-android/issues/new?labels=bug&template=01_bugs.md' target='_blank' rel='noopener noreferrer'>neuen Issue</a> an.

<b>Falls Sie die App nicht mehr öffnen können, lesen Sie bitte den Abschnitt <a href='#app_crash' target='_blank' rel='noopener'>'Die Corona-Warn-App schließt sich sofort nach dem Öffnen'</a>.</b>


### [Google/Android]: Die Corona-Warn-App schließt sich sofort nach dem Öffnen

anchor: app_crash

<b>AKTUELL</b><br/>Dieser Fehler wurde in Version 1.5 der Corona-Warn-App behoben. Wir bitten Sie daher, die App entsprechend zu aktualisieren.<br/><hr/>

Wenn die Corona-Warn-App durch einen Fehler im Betriebssystem oder durch aggressive Energiesparmaßnahmen des Telefons unerwartet beendet wird, kann es vorkommen, dass bei einem erneuten Start die Corona-Warn-App nicht mehr auf ihre verschlüsselten Datenbanken zugreifen kann. In diesem Fall schließt sie sich sofort wieder. Manchmal wurde vorher der <a href='#cause9002' target='_blank' rel='noopener'>Fehler Ursache: 9002 Etwas ist schiefgelaufen (sqlite)</a> angezeigt.

Wir arbeiten mit Hochdruck an einer Lösung des Problems.

Die GitHub-Community hat eine Notfall-Lösung erarbeitet, die die Corna-Warn-App ohne Deinstallation wieder zum Laufen bringt. Da hierbei jedoch Daten verloren gehen können (z. B. registrierte COVID-19-Tests zur Online-Abfrage der Testergebnisse), sollten Sie diese Notfall-Lösung nur dann anwenden, wenn keine anderen Maßnahmen (insbesondere Vorschläge von der technischen Telefon-Hotline oder von Betreuern der Corona-Warn-App im Google Play Store) geholfen haben, und Sie die Hinweise zur Notfall-Lösung im GitHub-Issue vollständig zur Kenntnis genommen haben.

<a href='https://github.com/corona-warn-app/cwa-app-android/issues/1053#issuecomment-690614975' target='_blank' rel='noopener noreferrer'>Hier geht es zur Notfall-Lösung im GitHub-Issue</a>.


### [Google/Android]: Risiko-Begegnungen werden länger als 14 Tage angezeigt

anchor: status_14

AKTUELL: Dieser Fehler wurde in Version 1.2 der Corona-Warn-App behoben. Risiko-Begegnungen werden Ihnen bis zu 14 Tage nach dem Zeitpunkt der Begegnung mit dem Nutzer, der dann ein positives COVID-19-Testergebnis in der Corona-Warn-App gemeldet hat, angezeigt.

Bei einigen Android-Smartphones kommt es aktuell vor, dass die Risiko-Begegnungen länger als 14 Tage angezeigt werden. Wir arbeiten an der Behebung dieses Anzeigefehlers. Aktuelle Informationen finden Sie auf Englisch im <a href='https://github.com/corona-warn-app/cwa-app-android/issues/911' target='_blank' rel='noopener noreferrer'>GitHub-Issue 911</a>.


### [Google/Android]: Anzahl der Schlüssel auf 0 zurückgesetzt

anchor: keys0

AKTUELL: Dieser Anzeigefehler wurde über ein Update der Google Play Services behoben, siehe <a href='https://github.com/corona-warn-app/cwa-app-android/issues/744#issuecomment-659255917' target='_blank' rel='noopener noreferrer'>diesen GitHub-Kommentar</a> in englischer Sprache.

Das ist ein bekannter Anzeigefehler. Die App funktioniert nach wie vor. Wir arbeiten gerade gemeinsam mit Google an der Lösung.


### Wann ist die App fertig?

anchor: when_ready

Die App steht seit dem 16. Juni 2020 im App Store von Apple bzw. im Google Play Store zum Download zur Verfügung. Der Entwicklungsfortschritt kann weiterhin in den einzelnen Code-Repositories verfolgt werden.


### [Apple/iOS]: Probleme nach Update auf iOS 13.6

anchor: iOS_136

AKTUELL: Mittlerweile hat Apple die iOS-Version 13.6.1 veröffentlicht, die dieses Problem behebt. Bitte aktualisieren Sie Ihr Smartphone auf iOS 13.6.1.

In der iOS-Version 13.6 konnte auf einigen Geräten die Risiko-Ermittlung nicht mehr aktiviert werden, da Begegnungsaufzeichnungen in ihrer Region nicht verfügbar seien. Details dazu finden Sie im GitHub-Issue <a href='https://github.com/corona-warn-app/cwa-app-ios/issues/911' target='_blank' rel='noopener noreferrer'>https://github.com/corona-warn-app/cwa-app-ios/issues/911</a>.


### [Apple/iOS] Nach dem Update auf 1.2.0 kann ich die App nicht mehr öffnen

anchor: app_does_not_open

AKTUELL: Inzwischen steht die App-Version 1.2.1 zur Verfügung, die dieses Problem behebt. Bitte aktualisieren Sie die App.

Mit dem Update auf 1.2.0 trat bei vielen Nutzern das Problem auf, dass sie die Corona-Warn-App nicht mehr öffnen konnten.


### [Google/Android] Der Text für das niedrige Risiko ist widersprüchlich

AKTUELL: Dieser Fehler ist bereits korrigiert. Die Korrektur ist ab App-Version 1.2.1 verfügbar. Bitte aktualisieren Sie die App.

In dem erklärenden Text für ein niedriges Infektionsrisiko wurde mit dem letzten Update eine sich widersprechende Beschreibung eingefügt. Wenn Sie eine Risiko-Begegnung hatten, die App aber weiter ein niedriges Risiko für Sie anzeigt, dann wird die Infektionswahrscheinlichkeit für Sie als niedrig eingestuft und nicht wie im Text derzeit geschrieben als erhöht.


### [Apple/iOS]: Falsche Anzeige der Zahl aktiver Tage

anchor: days_active_Apple

Aktuell: Dieser Anzeigefehler ist inzwischen behoben. Bitte aktualisieren Sie die Corona-Warn-App auf die neueste Version. Die App zählt jetzt die aktiven Tage weiter, bis sie, wie vorgesehen, 14 erreicht hat.

Bei der Zählung der aktiven Tage gibt es derzeit einen Fehler, der dazu führt, dass bei Erreichen von '14 von 14 Tagen aktiv' die Anzeige der Anzahl aktiver Tage nicht bei 14 von 14 Tagen bleibt, sondern statisch auf „13 von 14 Tagen aktiv“ oder weniger stehen bleibt.

Dieser Fehler betrifft nur die Anzeige der aktiven Tage in der Corona-Warn-App. Die Funktion selbst ist nicht eingeschränkt, das heißt, die Schlüssel werden weiterhin ausgetauscht und die Risiko-Ermittlung wird weiterhin durchgeführt. Es gehen keine Daten verloren. Technisch gesehen handelt es sich hier um einen Rundungsfehler, der auftritt, wenn die Anzahl aktiver Tage der Risiko-Ermittlung nicht mehr zunimmt, sondern statisch bei 14 Tagen bleibt. Wenn die Risiko-Ermittlung auch nur kurzfristig in irgendeiner Form nicht aktiv war, bleibt der Zähler bei einem niedrigeren Wert, also etwa bei 13 Tagen stehen.

Mögliche Ursachen für eine Deaktivierung der Risiko-Ermittlung:

<ol><li>Bluetooth wurden deaktiviert, auch nur für einen kurzen Zeitraum</li><li>Die Hintergrundaktualisierung für die App war nicht aktiv, so dass nicht immer eine Risiko-Ermittlung durchgeführt wurde</li><li>Der Flugmodus wurde eingeschaltet, auch nur für einen kurzen Zeitraum</li><li>Das Smartphone war ausgeschaltet</li><li>Das Smartphone wurde neu gestartet</li></ol>

Detaillierte Informationen dazu stehen <a href='https://github.com/corona-warn-app/cwa-app-android/issues/796#issuecomment-653061512' target='_blank' rel='noopener noreferrer'>in diesem Kommentar auf GitHub</a> (englisch).


### [Google/Android]: Falsche Anzeige der Zahl aktiver Tage

anchor: days_active_Android

AKTUELL: Diese Anzeige ist inzwischen aktualisiert. Sollte dennoch eine andere Zahl der Tagen angezeigt werden, siehe <a href='#exposure_check' target='_blank' rel='noopener'> Aufzeichnungen von weniger als 14 Tagen gespeichert</a>.

Bei der Zählung der aktiven Tage gibt es derzeit einen Fehler, der dazu führt, dass bei Erreichen von '14 von 14 Tagen aktiv' die Anzeige der Anzahl aktiver Tage nicht bei 14 von 14 Tagen bleibt, sondern statisch auf „13 von 14 Tagen aktiv“ oder weniger stehen bleibt.

Dieser Fehler betrifft nur die Anzeige der aktiven Tage in der Corona-Warn-App. Die Funktion selbst ist nicht eingeschränkt, das heißt, die Schlüssel werden weiterhin ausgetauscht und die Risiko-Ermittlung wird weiterhin durchgeführt. Es gehen keine Daten verloren. Technisch gesehen handelt es sich hier um einen Rundungsfehler, der auftritt, wenn die Anzahl aktiver Tage der Risiko-Ermittlung nicht mehr zunimmt, sondern statisch bei 14 Tagen bleibt. Wenn die Risiko-Ermittlung auch nur kurzfristig in irgendeiner Form nicht aktiv war, bleibt der Zähler bei einem niedrigeren Wert, also etwa bei 13 Tagen stehen.

Mögliche Ursachen für eine Deaktivierung der Risiko-Ermittlung:

<ol><li>Bluetooth und die Standortermittlung wurden deaktiviert, auch wenn es nur ein kurzer Zeitraum ist</li><li>Die Hintergrundaktualisierung für die App war nicht aktiv, so dass nicht immer eine Risiko-Ermittlung durchgeführt wurde</li><li>Der Flugmodus wurde eingeschaltet, auch wenn es nur über einen kurzen Zeitraum war</li><li>Das Smartphone war ausgeschaltet</li><li>Das Smartphone wurde neu gestartet</li></ol>

Es ist geplant, dass die Lösung im nächsten Release enthalten sein wird.

Detaillierte Informationen dazu stehen <a href='https://github.com/corona-warn-app/cwa-app-android/issues/796#issuecomment-653061512' target='_blank' rel='noopener noreferrer'>in diesem Kommentar auf GitHub</a> (englisch).


### Warum stoppt die Anzeige bei \"14 von 14 Tagen aktiv\"? Was bedeutet \"14 von 14 Tagen aktiv\" überhaupt?

anchor: days_active_explanation

AKTUELL: Diese Anzeige ist inzwischen aktualisiert. Sollte dennoch eine andere Zahl der Tagen angezeigt werden, siehe <a href='#exposure_check' target='_blank' rel='noopener'> Aufzeichnungen von weniger als 14 Tagen gespeichert</a>.

Die Corona-Warn-App sammelt immer die Kontakte der letzten 14 Tage. Alle älteren Kontakte sind für die Risiko-Ermittlung nicht relevant und werden daher auch gelöscht. Somit wird Ihnen immer \"14 von 14 Tagen aktiv\" angezeigt werden, wenn die App im gesamten Zeitraum aktiv war. Die Zählung beginnt nach 14 Tagen nicht von vorn. Sofern also Ihre Risiko-Ermittlung aktiv ist und auch ein Risiko-Status angezeigt wird, funktioniert die Corona-Warn-App so, wie sie soll.

Sollten sie die App nach Erreichen der 14 Tage deaktivieren, kann die Anzeige auch zurückspringen auf 13 (oder weniger) aktive Tage. Dies kann z.B. durch eine der folgenden Aktionen ausgelöst werden:<ul><li>Bluetooth deaktivieren</li><li>Hintergrundaktualisierung für die App abschalten, sodass nicht immer eine Risiko-Ermittlung durchgeführt wurde</li><li>Einschalten des Flugmodus</li><li>Ausschalten des Smartphones</li><li>Neustart des Smartphones</li></ul>


### [Google/Android]: URSACHE 3 – Etwas ist schiefgelaufen. Fehler bei Kommunikation mit Google API(10)

anchor: API10

<b>AKTUELL 14.01.2021</b><br/>Sollten Sie dieses Problem haben, schreiben Sie bitte Ihren Bericht hier: <a href='https://github.com/corona-warn-app/cwa-app-android/issues/1962' target='_blank' rel='noopener'>cwa-app-android/issues/1962</a>.<hr/>

AKTUELL: Dieser Fehler ist mit der Version 1.5 des Exposure Notification Systems behoben. So sehen Sie nach, welche Version Sie installiert haben: <a href='#ENF_version' target='_blank' rel='noopener'>Welche Version des COVID-19-Kontaktprotokolls habe ich?</a>

Der Fehler (10) in Zusammenhang mit der fehlenden Risiko-Überprüfung wird aktuell gemeinsam mit Google behoben. Wir können Ihnen aber bestätigen, dass Ihre Kontakte weiterhin aufgezeichnet werden. Daher würden wir Sie bitten, die App nicht zu löschen, da hierbei ihre aufgezeichneten Kontaktereignisse verloren gehen können, siehe auch <a href='#delete_random_ids' target='_blank' rel='noopener'>https://www.coronawarn.app/de/faq/#delete_random_ids</a>.


### [Apple/iOS]: ENErrorDomain-Fehler 5

anchor: ENError5

AKTUELL: Der Fehler ENErrorDomain 5 kommt vom Exposure Notification System, das von Apple bereitgestellt und von der App genutzt wird. Nach Angaben von Apple wurde die Ursache, die zu diesem Fehler führte, inzwischen behoben, sodass er in Zukunft nicht mehr vorkommen sollte. Falls der Fehler immer noch auftritt, bitten wir Sie um etwas Geduld, bis die Änderung auf Ihrem Gerät ankommt.


### [Apple/iOS]: ENErrorDomain-Fehler 11

anchor: ENError11

AKTUELL: Obwohl nach Apples Angaben dieser Fehler mit iOS 13.6 behoben wurde, taucht er nun wieder auf Geräten, welche iOS 14 oder neuer installiert haben, auf. Um den Fehler zu beheben, gehen Sie bitte in die iOS Einstellungen und klicken dort auf den Punkt: 'Begegnungsmitteilungen', scrollen ganz nach unten und klicken auf 'Begegnungsmitteilungen deaktivieren'. Warten Sie einen Moment und schalten Sie Begegnungsmitteilungen wieder an.

Der Fehler ENErrorDomain 11 kommt aus dem Exposure Notification System, das von Apple bereitgestellt und von der App genutzt wird.


### [Apple/iOS]: Ich bekomme folgende Benachrichtigung: 'Region für Kontaktmitteilung geändert. COVID-19-Kontaktmitteilungen werden von \"Corona-Warn\" in dieser Region möglicherweise nicht unterstützt'

anchor: iphone_region_change

AKTUELL: Wenn Sie auf iOS-Version 13.6. aktualisiert haben, ist diese Meldung behoben.",
"Diese Nachricht wird direkt vom Betriebssystem bzw. dem Exposure Notification System ausgelöst. Sie können die Meldung mit 'OK' bestätigen, die Kontaktermittlung funktioniert ganz normal. Um dies zu prüfen, können Sie in den Geräte-Einstellungen unter 'Datenschutz' > 'Health' > 'COVID-19-Kontaktprotokoll' (iOS 13.7 und höher: 'Einstellungen' > 'Begegnungsmitteilungen' > 'Status von Begegnungsaufzeichnungen') den Status der Kontaktermittlung überprüfen. Es handelt sich um einen iOS-Fehler. Apple arbeitet bereits an einer Lösung, die voraussichtlich mit dem nächsten iOS-Update ausgeliefert wird.

Bitte öffnen Sie die Corona-Warn-App noch ein Mal kurz, um sicherzustellen, dass die Hintergrundaktualisierung weiter arbeitet.


### [Apple/iOS]: Zu wenig Speicherplatz

anchor: memory

AKTUELL: Diese Fehlermeldung kommt aus dem Betriebssystem. Wenn Sie auf Apple iOS-Version 13.6. aktualisiert haben, sollte der Fehler weniger häufig auftreten.

Die Corona-Warn-App benötigt nur ca. 20 MB Speicherplatz auf dem Handy. Die Größe kann sich durch eventuelle Updates laufend verändern (wenn auch nur minimal). Zusätzlich fallen weitere Speicherkapazitäten durch die von der App zwischengespeicherten Daten an.


### [Google/Android]: Ich bekomme beim Einrichten der App folgenden Fehler: URSACHE: 3. Etwas ist schiefgelaufen. Fehler bei Kommunikation mit Google API(17). Was bedeutet das?

anchor: cause_3

AKTUELL: Dieser Fehler ist inzwischen behoben.

Dieser Fehler kann bei der ersten Aktivierung der Risiko-Ermittlung oder auch später in den App-Einstellungen oder auf dem Hauptbildschirm auftreten. Der Fehler bedeutet, dass Ihr Gerät aus einem oder mehreren der folgenden Gründe die Risiko-Ermittlung nicht durchführen kann:

<ul><li>Ihre Google Play-Dienste sind veraltet.</li><li>Die App ist nicht in der Landesversion Ihres Google Play verfügbar. <a href='https://www.coronawarn.app/de/faq/#international' target='_blank' rel='noopener noreferrer'>Diese FAQ</a> nennt die unterstützten Landesversionen.</li><li>Sie haben die Corona-Warn-App nicht über den offiziellen Google Play Store installiert.</li><li>Ihr Gerät wurde modifiziert (z. B. gerootet).</li><li>Sie haben mehrere Benutzerkonten auf Ihrem Gerät, und die App wird für einen nicht-primären Nutzer (ohne Administrationsrechte) ausgeführt.</li><li>Der Hersteller Ihres Geräts hat die Google Play-Dienste und den Google Play Store für Ihr Gerät nicht zur Verfügung gestellt (betrifft z. B. einige Modelle von Huawei und Xiaomi).</li><li>Die Google Mobile Services sind veraltet.</li></ul>

<b>Fehlerbehebung</b>

Viele betroffene Nutzer konnten den Fehler durch eine dieser Möglichkeiten beheben:

<ol><li>Aktualisieren der Google Play-Dienste auf die neueste Version. Siehe: <a href='https://play.google.com/store/apps/details?id=com.google.android.gms&hl=de' target='_blank' rel='noopener noreferrer'>Google Play-Dienste</a>. In den Geräte-Einstellungen unter 'Apps & Benachrichtigungen' > 'Google Play-Dienste' > 'Erweitert' können Sie ganz unten die Version überprüfen. Beachten Sie hierzu auch den Hinweis zu den Google Mobile Services unten in dieser Antwort.</li><li>Leeren des Cache der Google Play-Dienste in den Geräte-Einstellungen unter 'Apps & Benachrichtigungen' > 'Google Play-Dienste' > 'Speicher' > 'Cache leeren'.</li><li>Ändern der Landesversion von Google Play auf Deutschland wie hier beschrieben: <a href='https://support.google.com/googleplay/answer/7431675?hl=de' target='_blank' rel='noopener noreferrer'>Google Play-Landesversion ändern</a>.</li><li>Prüfen, ob das Gerät generell die Risiko-Ermittlung in Deutschland unterstützt: In den Geräte-Einstellungen unter 'Google' > 'Benachrichtigungen zu möglicher Begegnung mit COVID-19-Infizierten' sollte die Corona-Warn-App aufgeführt sein.</li><li>Sicherstellen, dass das Benutzerkonto, mit dem Sie das Gerät verwenden, Administratorrechte hat: Geräte-Einstellungen > 'System' > 'Erweitert' > 'Mehrere Nutzer'.</li><li>Vor der Installation sicherstellen, dass eine Internetverbindung besteht und Bluetooth sowie die allgemeine Standortverwendung aktiviert sind (siehe auch <a href='#android_location' target='_blank' rel='noopener noreferrer'>hier</a>).</li><li>Gerät neu starten.</li><li>Wenn alles andere nicht geholfen hat, weil so die bereits gesammelten Zufalls-IDs gelöscht werden können (<a href='#delete_random_ids' target='_blank' rel='noopener'>https://www.coronawarn.app/de/faq/#delete_random_ids</a>): Deinstallieren der Corona-Warn-App und neu installieren über den Google Play Store (<a href='https://play.google.com/store/apps/details?id=de.rki.coronawarnapp&hl=de&showAllReviews=true' target='_blank' rel='noopener noreferrer'>Corona-Warn-App</a>).</li></ol>

Wenn der Fehler weiterhin auftritt, obwohl Sie alle Schritte ausgeführt haben, aktiviert Ihr Gerät die Risiko-Ermittlung möglicherweise etwas zeitverzögert. Bitte schließen Sie die Corona-Warn-App, warten zwei Stunden und versuchen es dann erneut.

Hinweis zu den Google Mobile Services: Damit die Corona-Warn-App funktioniert, muss Google die Google Mobile Services auf Ihrem Gerät automatisch aktualisieren. Sie können das nicht tun. Wenn Sie die Google Play-Dienste auf die neueste Version aktualisiert haben, wie oben beschrieben, müssen Sie noch auf das automatische Update der Google Mobile Services warten. Versuchen Sie es in diesem Fall am nächsten Tag wieder.

Wir entwickeln die Corona-Warn-App ständig weiter und versuchen, mögliche Ursachen für diesen Fehler in der App zu beheben.


### [Apple/iOS]: In den Einstellungen für die COVID-19-Begegnungsaufzeichnungen steht: 'Corona-Warn hat dein Protokoll mit erfassten zufälligen IDs während der letzten 24 Stunden 0-mal überprüft'. Funktioniert die Risiko-Ermittlung nicht?

anchor: no_log_check

AKTUELL: Diese Meldung wird nicht mehr angezeigt, seitdem Positivkennungen auf dem Server verfügbar sind.

Doch, die Risiko-Ermittlung funktioniert. Dieser Hinweis steht unter 'Einstellungen' > 'Datenschutz' > 'Health' > 'COVID-19-Begegnungsaufzeichnungen' (iOS 13.7 und höher: 'Einstellungen' > 'Begegnungsmitteilungen' > 'Status von Begegnungsaufzeichnungen'). Er kommt von iOS und bedeutet, dass der Backend-Server noch keine Diagnoseschlüssel (Positivkennungen) an Ihr Gerät versendet hat. Die Corona-Warn-App hat deswegen noch keinen Abgleich mit den gesammelten Zufalls-IDs durchgeführt. Sobald Corona-positiv getestete Personen ihren Diagnoseschlüssel (Positivkennung) hochgeladen haben, wird dieser Abgleich ausgelöst.


### Exposure Notification Express (ENE)

anchor: ene

Exposure Notification Express (ENE) wurde von Google und Apple zusätzlich entwickelt, um Gesundheitsbehörden weltweit zu unterstützen, die noch keine App haben und eine App nicht selber entwickeln können oder wollen. ENE stellt standardisierte Covid-19-Benachrichtigungen einfach zur Verfügung, digitalisiert aber darüber hinaus nicht den Prozess bis zum Testergebnis.

So können zwar Risikobegegnungen angezeigt werden, bei einem positiven Testergebnis ohne weitere Verifikation die Diagnoseschlüssel aber nicht übermittelt werden. Auch lassen sich Testergebnisse mit ENE nicht übermitteln.

Für die deutsche Corona-Warn-App (CWA) ändert sich durch die Einführung von Exposure Notifications Express aktuell nichts. Regionen, die eine an den eigenen Bedarf angepasste App betreiben, erhalten die Begegnungsmitteilungen aus dem Exposure Notification System weiterhin direkt und exklusiv. Alle Begegnungsmitteilungen werden in Deutschland ausschließlich in die CWA geleitet. Die hohen deutschen Standards für Datenschutz greifen. Die Risikoermittlung erfolgt in Deutschland ausschließlich nach den epidemiologischen Vorgaben des Robert Koch-Instituts (RKI). Die Nutzer*innen erhalten bei Bedarf persönliche Unterstützung durch die Hotlines.

Die eigene App statt der Standardlösung ENE bietet Ländern nach aktuellem Kenntnisstand folgende Vorteile:

<ul><li>Flexibler Verifikationsprozess</li><li>Integrierte Laboranbindung, schnellerer Benachrichtigungsprozess</li><li>Datenschutzkonformität</li><li>Gesetzkonformität, z.B. Altersfreigabe</li><li>EU-Interoperabilität mit Rechtssicherheit und Datenschutz</li><li>Integration von Hotlines</li><li>Backend-Server müssen nach wie vor betrieben werden</li><li>Parametrisierung (z.B. wann eine Begegnung als Risiko bewertet wird, kommt nicht von Google/Apple, sondern kann jedes Land selbst definieren)</li></ul>
