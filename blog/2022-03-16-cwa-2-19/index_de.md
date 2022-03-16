---
page-title: "CWA 2.19 verbessert die Zuordnung von Zertifikaten zu Personen"
page-description: "CWA 2.19 verbessert die Zuordnung von Zertifikaten zu Personen"
page-name: cwa-2-19
page-name_de: cwa-2-19
author: CWA-Team, 10 Uhr
layout: blog
---

Das Projektteam aus Robert Koch-Institut, Deutscher Telekom und SAP hat **Version 2.19 der Corona-Warn-App (CWA)** veröffentlicht. Das Update ermöglicht eine **fehlertolerantere Zuordnung** von Zertifikaten zu Personen. Damit werden beispielsweise kleinere Unterschiede bei Vor- und Nachnamen ignoriert und Namenszusätze wie Doktor-Titel herausgefiltert, sodass die Zertifikate trotzdem derselben Person zugeordnet werden.

<!-- overview -->

Damit die CWA verschiedene Zertifikate einer Person zuordnen kann, mussten in der Vergangenheit die Vor- und Nachnamen auf den Zertifikaten exakt übereinstimmen. Bei Nutzer\*innen, die auf einem Zertifikat beispielsweise ihren Zweitnamen angegeben haben und auf einem anderen nicht, hat die CWA die Zertifikate zwei verschiedenen Personen zugeordnet. Um das zu korrigieren, mussten Nutzer\*innen sich in der Apotheke ein neues Zertifikat ausstellen lassen.

Mit dem Update ist das nicht mehr nötig, da die CWA nun beim Vergleich von zwei Zertifikaten jeweils den Vor- und Nachnamen in seine Bestandteile zerlegen kann. Dadurch erkennt sie, dass **zwei Zertifikate zu einer Person gehören, wenn:**

1.	Vor- und Nachnamen entweder exakt übereinstimmen oder **mindestens ein Vorname und mindestens ein Nachname** übereinstimmen und

2.	die **Geburtsdaten** exakt übereinstimmen. 

**Ein Beispiel:** Im Impfzertifikat der Grundimmunisierung von Erika Mustermann steht ihr Vorname Erika und ihr Nachname Mustermann. Im Zertifikat ihrer Auffrischimpfung hat sie ihren **Zweitnamen** Maria angegeben, sodass dort unter ihrem Vornamen nun Erika Maria steht. Die CWA erkennt, dass mindestens ein Vorname (Erika) und ein Nachname (Mustermann) sowie das Geburtsdatum übereinstimmen und gruppiert die Zertifikate unter derselben Person. Durch die Anpassung kann die CWA auch Namenszusätze wie **akademische Titel** herausfiltern und die Zertifikate entsprechend derselben Person zuordnen. 

**Weiterhin wichtig zu beachten:** Die Vorbedingung, dass die Geburtsdaten in den Zertifikaten exakt übereinstimmen müssen, bleibt bestehen. 

Die CWA informiert die Nutzer\*innen, bei denen sich durch die Anpassung etwas an der Gruppierung ihrer Zertifikate ändert. 

Version 2.19 wird, wie vorherige Versionen auch, schrittweise über 48 Stunden an alle Nutzer\*innen ausgerollt. iOS-Nutzer\*innen können sich die aktuelle App-Version ab sofort aus dem Store von Apple manuell herunterladen. Der Google Play Store bietet keine Möglichkeit, ein manuelles Update anzustoßen. Hier steht Nutzer\*innen die neue Version der Corona-Warn-App innerhalb der nächsten 48 Stunden zur Verfügung. 

Aktuelle Informationen zum Stand des Roll-Outs erhalten Sie auf dem **Twitter-Kanal der [#coronawarnapp](https://twitter.com/coronawarnapp)**.
