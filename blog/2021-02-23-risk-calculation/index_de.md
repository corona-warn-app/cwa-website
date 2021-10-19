---
page-title: "Risikoberechnung der Corona-Warn-App nach detaillierten Tests weiter angepasst"
page-description: "Risikoberechnung der Corona-Warn-App nach detaillierten Tests weiter angepasst"
page-name: corona-warn-app-risk-calculation-optimization
page-name_de: corona-warn-app-risk-calculation-optimization
author: Hanna Heine
layout: blog
---
 
Das Projektteam der Deutschen Telekom und SAP passt die Risikoberechnung der Corona-Warn-App in Zusammenarbeit mit dem Robert Koch-Institut nach umfangreichen Tests durch das Fraunhofer Institut für Integrierte Schaltungen (IIS) weiter an. Begegnungen mit erhöhtem Risiko können dadurch noch besser erkannt und in der Corona-Warn-App entsprechend dargestellt werden. Kurzkontakte zwischen zwei Personen werden nun ab einer Dauer von mindestens 5 Minuten berücksichtigt, nicht wie vorher erst ab mindestens 10 Minuten. 

Mit dieser Umstellung können nun **mehrere Begegnungen kürzerer Dauer** mit einer später positiv getesteten Person besser erfasst werden. Die entsprechenden Daten für diese Umstellung sind erst durch die Weiterentwicklung der Schnittstelle von Google und Apple verfügbar. Die nun durchgeführten Messungen haben bestätigt, dass die App mit dieser Anpassung besser und genauer warnen kann.  
 
<!-- overview -->

Seit Ende 2020 greift die Corona-Warn-App auf die von Google und Apple weiterentwickelte Schnittstelle, das sogenannte [Exposure Notification Framework Version 2](/de/blog/2020-12-16-corona-warn-app-version-1-9/) (ENF V2) zurück. Dadurch konnten die Entwickler\*innen die Risikoberechnung verbessern: Begegnungen mit niedrigem Risiko (grüne Kachel) werden seitdem besser gefiltert. In der Konsequenz sank die Anzahl der Tage mit Risikobegegnungen bei vielen Nutzer\*innen.  

In den vergangenen Wochen hat das Fraunhofer Institut als Teil seiner begleitenden Untersuchungen umfangreiche Tests durchgeführt. Dabei haben die Expert\*innen die Details der Zeiterfassung und die Abstandsschätzung durch Bluetooth LE (Low Energy) – auf der die Risikoermittlung der Corona-Warn-App basiert – unter der weiterentwickelten Schnittstelle (ENF V2) in **verschiedenen Situationen getestet**. Auf Basis der Untersuchungen und Bewertungen durch die Projektteilnehmer\*innen wird die Risikoberechnung der Corona-Warn-App angepasst, sodass Risikobegegnungen künftig noch präziser erfasst werden können.


### Welche Anpassungen stehen an und was bedeutet das für die Nutzer\*innen?

Expert\*innen von Telekom, SAP, RKI und Fraunhofer senken die Zeitspanne für das Herausfiltern von Kurzkontakten, die aus epidemiologischer Sicht nicht relevant sind, **von 10 auf 5 Minuten**. Das bedeutet: Bislang wurde ein Kontakt zwischen zwei Personen nur berücksichtigt, wenn er mindestens 10 Minuten gedauert hat. Jetzt wird er bereits berücksichtigt, wenn die zwei Personen mindestens 5 Minuten Kontakt hatten. Dadurch steigt die Anzahl der Begegnungen mit niedrigem Risiko (grüne Kachel) in Abhängigkeit des Verhaltens der Nutzer\*innen wieder leicht an. 

Dies führt auch dazu, dass die Begegnungen, die einen **tatsächlich relevanten Kontakt mit COVID-19 infizierten Personen** darstellen, noch genauer erkannt und in der App entsprechend als Tage mit erhöhtem Risiko (rote Kachel) angezeigt werden können. Denn um das Risiko zu ermitteln, werden unter ENF V2 nicht mehr Durchschnittswerte für alle Begegnungen mit einem anderen Gerät im Laufe des Tages genutzt (wie es unter ENF V1 der Fall war), sondern 30-minütige Zeitfenster betrachtet. Mehrere „grüne“ Begegnungen (= Zeitfenster) können also insgesamt zu einem roten Status führen. Eine grundlegende Erklärung zum technischen Hintergrund der Risikoberechnung unter ENF V2 finden Sie [hier](/de/blog/2020-12-17-risk-calculation-exposure-notification-framework-2-0/). 

Die Projektbeteiligten arbeiten kontinuierlich an einer Verbesserung der Messungen und der daraus resultierenden Konfigurationsparameter. Dabei diskutieren die Experten beispielsweise auch **neue Erkenntnisse** über die Ausbreitung und Infektiosität neu auftretender Virusmutationen (sogenannte „Variants of Concern“). Bei einer weiteren Anpassung der Risikoberechnung im Hinblick auf Entfernungen und Signaldämpfungen werden die Projektbeteiligten darüber an dieser Stelle ebenfalls informieren.

Wer noch etwas tiefer in das Thema der Risikoberechnung einsteigen möchte, kann sich **Folge 11 des Corona-Warn-App-Podcasts** anhören. In der neuen Folge erklären Thomas Klingbeil, Software-Entwickler bei SAP und Dr. Justus Benzler, Epidemiologe am Robert Koch-Institut, die Risikoberechnung im Detail: [#CoronaWarnApp – Der digitale Virus-Wachhund - Folge 11 - YouTube](https://www.youtube.com/watch?v=OzGdXCl6Ozw&feature=youtu.be)
