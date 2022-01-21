---
page-title: "Wird die CWA an die Omikron-Variante angepasst?"
page-description: "Wird die CWA an die Omikron-Variante angepasst?"
page-name: cwa-omikron
page-name_de: cwa-omikron
author: CWA Team
layout: blog
---

*Aktualisiert am 21. Januar 2022 um 08:30 Uhr; English version coming soon*

Omikron breitet sich auch in Deutschland extrem schnell aus, ist jetzt die dominierende Variante sein. Muss die Corona-Warn-App jetzt an Omikron angepasst werden? 

Bisher gab es noch keine speziellen Simulationskampagnen für Omikron. Dies liegt nicht zuletzt daran, dass das Ziel der Simulationen ist, Alltagssituationen nachzustellen und die Auswirkungen auf die Signalstärken-Messwerte in der Praxis zu erfassen. Auf Basis dieser Messdaten können dann Parametersätze für die App für verschiedene epidemiologische Modelle angepasst und ausgewertet werden.  
 

<!-- overview -->

Ein neues epidemiologisches Modell (z. B. für Omikron) macht nicht zwangsläufig neue Simulationen notwendig, zumindest solange die Annahmen über Zeit und Dauer eines kritischen Kontakts nicht grob von den ursprünglichen Simulationen abweichen.  

Für die Definition/Anpassung des epidemiologischen Modells und einer möglichen Anpassung der Corona-Warn-App ist das Robert Koch-Institut (RKI) zusammen mit SAP zuständig. Das RKI beobachtet das Infektionsgeschehen kontinuierlich und prüft vor diesem Hintergrund regelmäßig mögliche Änderungen der Corona-Warn-App.

Das Projektteam orientiert sich bei der Risikoberechnung in der Corona-Warn-App an den [Handlungsempfehlungen für die analoge Kontaktpersonenermittlung der Gesundheitsämter](https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Kontaktperson/Management.html). Sobald es hier Änderungen gibt, wird die Risikoberechnung in der Corona-Warn-App ebenfalls angepasst. 

### Anpassung der Parameter für Risikobegegnungen 

Bei der Anpassung der Parameter für Risikobegegnungen erreicht die Corona-Warn-App auch technische Grenzen. Durch die eingesetzte Bluetooth-Low-Energy-Technologie wird alle 2-5 Minuten nach Corona-Warn-Apps in der Nähe gesucht. Sollte die Risikoberechnung auf <5 Minuten heruntergesetzt werden, besteht die Möglichkeit, dass Zufallstreffer zu einer Warnung mit erhöhtem Risiko führen. Das könnte zum Beispiel ein Spaziergänger sein, der nur für eine sehr kurze Zeit an einer Person vorbeiläuft und in diesem Moment ein Bluetooth-Signal versendet. 

Somit hätte die Anpassung der Risikobegegnung einen Einfluss auf die Anzahl der falsch-positiven roten Warnungen. Das Projektteam evaluiert aber weiterhin, ob eine Anpassung notwendig ist und falls ja, wie eine zukünftige Anpassung aussehen könnte. 

### Rahmenbedingungen für eine schnelle Warnung 

Um eine schnelle und valide Warnung im Rahmen der Omikron-Welle gewährleisten zu können, gibt es weitere wichtige Faktoren neben einer möglichen Anpassung der Parameter für die Risikobegegnung. 

Erste wissenschaftliche Studien deuten auf eine kurze Inkubationszeit der Omikron-Variante hin. Vor diesem Hintergrund ist es wichtig, dass die Rahmenbedingungen der Simulationen sowie der Ergebnismitteilung effizient gestaltet sind und eine hohe Geschwindigkeit aufweisen. 

Ergebnisse aus der freiwilligen Datenspende „Privacy-Preserving-Analytics (PPA)“ zeigen, dass bereits eine hohe Geschwindigkeit in diesen Prozessen erreicht wird. Ein PCR-Testergebnis wird im Mittel 21 Stunden nach Testregistrierung übermittelt (die Hälfte der Testergebnisse bereits nach 12 Stunden). Auswertungen aus der Datenspende „Event-Driven-User-Survey (EDUS)“ zeigen, dass ein Großteil der Teilnehmenden an dieser Befragung nach einer roten Warnung anschließend weitere Verhaltensmaßnahmen umsetzen, um der Ausbreitung des Virus entgegenzuwirken.

Warnungen von nachweislich mit SARS-CoV-2 infizierten Personen werden in der Regel zwischen 2 und 24 Stunden nach dem Teilen eines positiven Testergebnisses ausgespielt (der zeitliche Verzug von 24 Stunden kommt zustande, wenn Personen sich nicht im WLAN befinden).

Das Projektteam wertet die Wirksamkeit und die Entwicklungsmöglichkeiten der Corona-Warn-App kontinuierlich aus mit dem Ziel, die Infektionsketten schnell zu beenden und die Pandemie einzudämmen. 

Wir beobachten in den vergangenen Wochen einen Anstieg der empfangenen Warnungen über die Corona-Warn-App, die wir mit der Omikron-Variante in Verbindung setzen. Dafür informieren wir seit der App-Version 2.15 die Nutzerinnen und Nutzer umfassend, wie sie sich verhalten sollten, wenn die App eine rote Kachel zeigt. 

Lesen Sie dazu den Blog-Artikel "[Was tun bei einer roten Kachel?](/de/blog/2021-12-15-cwa-red-tile-guidance)" für mehr Informationen. 
