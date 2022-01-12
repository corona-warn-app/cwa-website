---
page-title: "Wird die CWA an die Omikron-Variante angepasst?"
page-description: "Wird die CWA an die Omikron-Variante angepasst?"
page-name: cwa-omikron
page-name_de: cwa-omikron
author: CWA Team
layout: blog
---

*English Version coming soon*

Bisher gab es noch keine speziellen Testkampagnen für Omikron. Dies liegt nicht zuletzt daran, dass das Ziel der Testkampagnen war und ist, Alltagssituationen nachzustellen und die Auswirkungen auf die Signalstärken-Messwerte in der Praxis zu erfassen. Auf Basis dieser Messdaten können dann Parametersätze für die App für verschiedene epidemiologische Modelle angepasst und ausgewertet werden. 

Ein **neues epidemiologisches Modell** (z.&nbsp;B. für Omikron) macht nicht zwangsläufig neue Tests notwendig, zumindest solange die Annahmen über Zeit und Dauer eines kritischen Kontakts nicht grob von den ursprünglichen Testannahmen abweichen. 

Für die Definition/Anpassung des epidemiologischen Modells und einer möglichen Anpassung der Corona-Warn-App ist das Robert Koch-Institut (RKI) zusammen mit SAP zuständig. Das RKI beobachtet das **Infektionsgeschehen** kontinuierlich und prüft vor diesem Hintergrund regelmäßig mögliche Änderungen der Corona-Warn-App. 

<!-- overview -->

Das Projektteam orientiert sich bei der Risikoberechnung in der Corona-Warn-App an den [Handlungsempfehlungen für die analoge Kontaktpersonenermittlung](https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Kontaktperson/Management.html) der Gesundheitsämter. Sobald es hier Änderungen gibt, wird die Risikoberechnung in der Corona-Warn-App ebenfalls angepasst.

Bei der **Anpassung der Parameter für Risikobegegnungen** erreicht die Corona-Warn-App auch technische Grenzen. Durch die eingesetzte Bluetooth-Low-Energy-Technologie wird alle 2-5 Minuten nach Corona-Warn-Apps in der Nähe gesucht. Sollte die Risikoberechnung auf <5 Minuten runtergesetzt werden, besteht die Möglichkeit, dass Zufallstreffer (bspw. Spaziergänger, die nur kurz an einem vorbei laufen und in dem Moment ein Bluetooth-Signal versenden) zu einer Warnung mit erhöhtem Risiko führen.

Somit hätte die Anpassung der Risikobegegnung einen Einfluss auf die Anzahl der **falsch-positiven roten Warnungen**. Das Projektteam evaluiert aber zurzeit, wie eine zukünftige Anpassung aussehen könnte.

Wir beobachten in den vergangenen Wochen einen **Anstieg der empfangenen Warnungen über die Corona-Warn-App**, die wir mit der Omikron-Variante in Verbindung setzen. Dafür informieren wir mit der jüngsten App-Version 2.15 die Nutzerinnen und Nutzer umfassend, wie sie sich verhalten sollten, wenn die App eine rote Kachel zeigt. Lesen Sie dazu den Blog-Artikel "[Was tun bei einer roten Kachel?](/de/blog/2021-12-15-cwa-red-tile-guidance)" für mehr Informationen.
