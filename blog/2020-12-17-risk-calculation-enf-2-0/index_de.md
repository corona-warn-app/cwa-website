---
page-title: "Risikoberechnung unter Version 2 des Exposure Notification Frameworks"
page-description: "Risikoberechnung unter Version 2 des Exposure Notification Frameworks"
page-name: risk-calculation-exposure-notification-framework-2-0
page-name_de: risk-calculation-exposure-notification-framework-2-0
author: Hanna Heine
layout: blog
---
 
Bisher hat die Corona-Warn-App eine oder mehrere Begegnungen mit niedrigem Risiko angezeigt. Seit dem Update auf Version 1.9 sind diese verschwunden, beziehungsweise ist die Zahl niedriger geworden. Das liegt daran, dass sich die Berechnung des Risikos unter Version 2 des Exposure Notification Framework (ENF) erheblich verbessert hat. Mit der neuen Version der Schnittstelle kann nun präziser gesteuert werden, welche Begegnungen gezählt werden sollen. 
 
<!-- overview -->

## Weniger Begegnungen mit niedrigem Risiko

Mit Einführung der Version 1.9 der Corona-Warn-App wird eine neue Version des Exposure Notification Frameworks (ENF) von Apple/Google verwendet, die Version 2.0. Die Daten dieser Schnittstelle dienen als Grundlage zur Berechnung des individuellen Risikos.
 
Bisher konnte die in der App angezeigte Anzahl der unkritischen Begegnungen nicht weitergehend gefiltert werden. Das gilt bis zur Version 1.7.1. Das heißt: Auch Begegnungen mit später positiv getesteten Nutzer\*innen mit sehr kurzer Kontaktdauer wurden gezählt und angezeigt. Aufgrund der hinterlegten Kriterien für die Risikoberechnung wurden diese allerdings nur als Begegnung mit geringem Risiko angezeigt.

**Vereinfacht ausgedrückt**: Unter dem Exposure Notification Framework in Version 2 werden vom Betriebssystem Begegnungen erfasst, die ein geringeres Risiko als „niedriges Risiko“ (grün) aufweisen. Diese sind aus aktueller epidemiologischer Sicht nicht relevant und werden von der Corona-Warn-App herausgefiltert.

## Berechnung des Risikos unter ENF 2.0 

Während in der Version 1.0 der Schnittstelle Durchschnittswerte der Dämpfung für alle Begegnungen mit einem anderen Gerät im Laufe des Tages genutzt wurden, erfolgt die Betrachtung in der neuen Version 2.0 nun jeweils für 30-minütige Zeitfenster. 
 
Um als Begegnung berücksichtigt zu werden, müssen folgende Bedingungen innerhalb eines Zeitfensters von 30 Minuten erfüllt sein:
- Mindestens 10 Minuten innerhalb des 30-minütigen Fensters muss die Signaldämpfung unter 73dB gelegen haben
- Das Transmission Risk Level muss mindestens III (3) betragen. Es wird beim Teilen der Diagnoseschlüssel pro Tag gemäß definierter Kriterien wie Symptomstatus und/oder Symptombeginn festgelegt
 
Sind diese Kriterien **nicht** erfüllt, erfolgt **keine** Zählung innerhalb der App. Es handelt sich um eine „Nicht-Risiko-Begegnung“. Im Kontaktprotokoll des Betriebssystems hingegen erfolgt trotzdem eine Zählung. Dabei handelt es sich aber nicht um einen Fehler.
 
Sind aber die Bedingungen erfüllt, erfolgt eine Gewichtung der Kontaktzeiten, abhängig von der Signaldämpfung:
- Zeiten mit einer Dämpfung <55dB werden zu 100 Prozent berechnet
- Zeiten mit einer Dämpfung >= 55dB und <63dB werden zu 50 Prozent berechnet
 
Basierend auf dem Transmission Risk Level (III bis VIII) wird nur ein Faktor zwischen 0,6 und 1,6 ermittelt. Mit diesem Faktor wird die gewichtete Zeit aus dem vorherigen Schritt multipliziert, woraus sich dann die gewichtete Kontaktzeit ergibt.
 
Anhand dieser gewichteten Zeit wird nun entschieden, um was für eine Begegnung es sich bei diesem Zeitfenster handelt:
- Gewichtete Kontaktzeit <15 Minuten: Begegnung mit niedrigem Risiko (grün)
- Gewichtete Kontaktzeit >=15 Minuten: Begegnung mit erhöhtem Risiko (rot) 
 
Abschließend werden alle Zeitfenster eines Tages betrachtet (die gewichteten Kontaktzeiten) summiert. Ist deren Summe >= 15 Minuten, wird der Gesamtstatus rot, ansonsten ist dieser grün.
 
Letztlich bedeutet das: Mehrere „grüne“ Begegnungen (Zeitfenster) können in Summe zu einem roten Status führen.

Wer noch tiefer in die Materie einsteigen möchte:

- Die aktualisierten Diagramme stehen auf Github zur Verfügung: https://github.com/corona-warn-app/cwa-documentation/tree/main/images/risk_calculation

- Ein Übersichtsdiagramm zeigt, wie jetzt gefiltert wird: https://github.com/corona-warn-app/cwa-documentation/blob/main/images/risk_calculation/risk_calculation_enf_v2_overview.pdf 
 


