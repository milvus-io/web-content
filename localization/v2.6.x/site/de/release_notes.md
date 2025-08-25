---
id: release_notes.md
summary: Milvus Versionshinweise
title: Hinweise zur Veröffentlichung
---
<h1 id="Release-Notes" class="common-anchor-header">Hinweise zur Veröffentlichung<button data-href="#Release-Notes" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>Finden Sie heraus, was es Neues in Milvus gibt! Auf dieser Seite werden neue Funktionen, Verbesserungen, bekannte Probleme und Fehlerbehebungen in jeder Version zusammengefasst. In diesem Abschnitt finden Sie die Versionshinweise für jede veröffentlichte Version nach v2.6.0. Wir empfehlen Ihnen, diese Seite regelmäßig zu besuchen, um sich über Updates zu informieren.</p>
<h2 id="v260" class="common-anchor-header">v2.6.0<button data-href="#v260" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Veröffentlichungsdatum: August 6, 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus-Version</th><th style="text-align:left">Python SDK Version</th><th style="text-align:left">Node.js SDK Version</th><th style="text-align:left">Java SDK Version</th><th style="text-align:left">Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0 ist offiziell freigegeben! Aufbauend auf der architektonischen Grundlage, die in <a href="#v260-rc1">2.6.0-rc1</a> gelegt wurde, behebt diese produktionsreife Version zahlreiche Stabilitäts- und Leistungsprobleme und führt gleichzeitig leistungsstarke neue Funktionen wie Storage Format V2, erweiterte JSON-Verarbeitung und verbesserte Suchfunktionen ein. Mit umfangreichen Fehlerkorrekturen und Optimierungen, die auf dem Feedback der Community während der RC-Phase basieren, ist Milvus 2.6.0 bereit, von Ihnen erforscht und übernommen zu werden.</p>
<div class="alert warning">
<p>Ein direktes Upgrade von einer Vorversion 2.6.0 wird aufgrund von Architekturänderungen nicht unterstützt. Bitte folgen Sie unserer <a href="/docs/de/upgrade_milvus_cluster-operator.md">Upgrade-Anleitung</a>.</p>
</div>
<h3 id="Whats-new-in-260-since-RC" class="common-anchor-header">Was ist neu in 2.6.0 (seit RC)<button data-href="#Whats-new-in-260-since-RC" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h3><h4 id="Optimized-storage-format-v2" class="common-anchor-header">Optimiertes Speicherformat v2</h4><p>Um die Herausforderungen der gemischten Skalar- und Vektordatenspeicherung zu bewältigen, insbesondere Punkt-Lookups auf unstrukturierten Daten, führt Milvus 2.6 das Speicherformat V2 ein. Dieses neue adaptive spaltenbasierte Speicherformat verwendet eine Layout-Strategie mit "enger Spaltenzusammenführung und breiter Spaltenunabhängigkeit", die die Leistungsengpässe bei der Verarbeitung von Punktnachschlagevorgängen und Abfragen in kleinen Mengen in Vektordatenbanken grundlegend behebt.</p>
<p>Das neue Format unterstützt nun einen effizienten Zufallszugriff ohne E/A-Verstärkung und erreicht eine bis zu 100-fache Leistungssteigerung im Vergleich zum bisherigen Vanilla-Parquet-Format, was es ideal für KI-Arbeitslasten macht, die sowohl analytische Verarbeitung als auch präzise Vektorabfragen erfordern. Darüber hinaus kann es die Anzahl der Dateien bei typischen Arbeitslasten um bis zu 98 % reduzieren. Der Speicherverbrauch für die Hauptkompaktierung wird um 300 % reduziert, und die E/A-Vorgänge werden um bis zu 80 % beim Lesen und um mehr als 600 % beim Schreiben optimiert.</p>
<h4 id="JSON-flat-index-beta" class="common-anchor-header">Flacher JSON-Index (Beta)</h4><p>Milvus 2.6 führt JSON Flat Index ein, um hochdynamische JSON-Schemata zu verarbeiten. Im Gegensatz zu JSON Path Index, bei dem bestimmte Pfade und ihre erwarteten Typen vorab deklariert werden müssen, entdeckt und indiziert JSON Flat Index automatisch alle verschachtelten Strukturen unter einem bestimmten Pfad. Bei der Indizierung eines JSON-Feldes wird der gesamte Teilbaum rekursiv abgeflacht, wobei für jedes gefundene Pfad-Wert-Paar invertierte Indexeinträge erstellt werden, unabhängig von der Tiefe oder dem Typ. Diese automatische Abflachung macht JSON Flat Index ideal für sich entwickelnde Schemata, in denen neue Felder ohne Vorwarnung erscheinen. Wenn Sie beispielsweise ein "Metadaten"-Feld indizieren, verarbeitet das System automatisch neue verschachtelte Felder wie "metadata.version2.features.experimental", sobald sie in den eingehenden Daten erscheinen, ohne dass eine neue Indexkonfiguration erforderlich ist.</p>
<h3 id="Core-260-features-recall" class="common-anchor-header">Core 2.6.0 Funktionen Rückruf<button data-href="#Core-260-features-recall" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h3><div class="alert note">
<p>Ausführliche Informationen zu den Änderungen an der Architektur und den in 2.6.0-RC eingeführten Funktionen finden Sie in der <a href="#v260-rc1">Release Note 2.6.0-rc1</a>.</p>
</div>
<h4 id="Architecture-simplification" class="common-anchor-header">Vereinfachung der Architektur</h4><ul>
<li>Streaming Node (GA) - Zentralisierte WAL-Verwaltung</li>
<li>Natives WAL mit Woodpecker - Entfernte Kafka/Pulsar-Abhängigkeit</li>
<li>Vereinheitlichte Koordinatoren (MixCoord); Zusammenlegung von IndexNode und DataNode - Reduzierte Komplexität der Komponenten</li>
</ul>
<h4 id="Search--analytics" class="common-anchor-header">Suche und Analytik</h4><ul>
<li>RaBitQ 1-Bit-Quantisierung mit hoher Wiedererkennung</li>
<li>Phrase Matching</li>
<li>MinHash LSH für Deduplizierung</li>
<li>Zeitabhängige Ranking-Funktionen</li>
</ul>
<h4 id="Developer-experience" class="common-anchor-header">Erfahrung für Entwickler</h4><ul>
<li>Einbettungsfunktionen für den "Data-in, Data-out"-Workflow</li>
<li>Online-Schema-Entwicklung</li>
<li>INT8-Vektor-Unterstützung</li>
<li>Verbesserte Tokenizer für globale Sprachunterstützung</li>
<li>Cache-Schicht mit "Lazy Loading" - Verarbeitung von Datensätzen, die größer als der Speicher sind</li>
</ul>
<h2 id="v260-rc1" class="common-anchor-header">v2.6.0-rc1<button data-href="#v260-rc1" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Veröffentlichungsdatum: Juni 18, 2025</p>
<table>
<thead>
<tr><th style="text-align:center">Milvus-Version</th><th style="text-align:center">Python SDK Version</th><th style="text-align:center">Node.js SDK Version</th><th style="text-align:center">Java SDK Version</th><th style="text-align:center">Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0b0</td><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0</td><td style="text-align:center">2.6.0-rc.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0-rc1 führt eine vereinfachte, Cloud-native Architektur ein, die darauf ausgelegt ist, die betriebliche Effizienz, die Ressourcennutzung und die Gesamtbetriebskosten zu verbessern, indem die Komplexität der Bereitstellung reduziert wird. Diese Version fügt neue Funktionalitäten hinzu, die sich auf Leistung, Suche und Entwicklung konzentrieren. Zu den wichtigsten Funktionen gehören die hochpräzise 1-Bit-Quantisierung (RaBitQ) und eine dynamische Cache-Schicht zur Leistungssteigerung, die Erkennung von Beinahe-Duplikaten mit MinHash und der präzise Abgleich von Phrasen für die erweiterte Suche sowie automatisierte Einbettungsfunktionen mit Online-Schemaänderung zur Verbesserung der Entwicklererfahrung.</p>
<div class="alert note">
<p>Dies ist eine Vorabversion von Milvus 2.6.0. Um die neuesten Funktionen auszuprobieren, installieren Sie diese Version als eine neue Bereitstellung. Ein Upgrade von Milvus v2.5.x oder früher auf 2.6.0-rc1 wird nicht unterstützt.</p>
</div>
<h3 id="Architecture-Changes" class="common-anchor-header">Änderungen an der Architektur<button data-href="#Architecture-Changes" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h3><p>Seit 2.6 führt Milvus bedeutende architektonische Änderungen ein, die auf eine Verbesserung der Leistung, Skalierbarkeit und Benutzerfreundlichkeit abzielen. Weitere Informationen finden Sie unter <a href="/docs/de/architecture_overview.md">Milvus-Architekturübersicht</a>.</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">Streaming-Knoten (GA)</h4><p>In früheren Versionen wurden Streaming-Daten vom Proxy in die WAL geschrieben und vom QueryNode und DataNode gelesen. Diese Architektur machte es schwierig, einen Konsens auf der Schreibseite zu erreichen, und erforderte eine komplexe Logik auf der Leseseite. Außerdem befand sich der Query-Delegator im QueryNode, was die Skalierbarkeit behinderte. Mit Milvus 2.5.0 wurde der Streaming Node eingeführt, der in Version 2.6.0 zu GA wird. Diese Komponente ist nun für alle WAL-Lese-/Schreiboperationen auf Shard-Ebene verantwortlich und dient auch als Abfrage-Delegator, wodurch die oben genannten Probleme gelöst und neue Optimierungen ermöglicht werden.</p>
<p><strong>Wichtiger Hinweis zum Upgrade</strong>: Streaming Node ist eine bedeutende architektonische Änderung, daher wird ein direktes Upgrade auf Milvus 2.6.0-rc1 von früheren Versionen nicht unterstützt.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">Woodpecker Native WAL</h4><p>Milvus war bisher auf externe Systeme wie Kafka oder Pulsar für sein WAL angewiesen. Diese Systeme waren zwar funktional, brachten aber eine erhebliche betriebliche Komplexität und einen erheblichen Ressourcen-Overhead mit sich, insbesondere bei kleinen bis mittelgroßen Implementierungen. In Milvus 2.6 werden diese Systeme durch Woodpecker ersetzt, ein speziell entwickeltes, Cloud-natives WAL-System. Woodpecker wurde für die Objektspeicherung entwickelt und unterstützt sowohl lokale als auch objektspeicherbasierte Zero-Disk-Modi, die den Betrieb vereinfachen und gleichzeitig die Leistung und Skalierbarkeit verbessern.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">DataNode und IndexNode verschmelzen</h4><p>In Milvus 2.6 werden Aufgaben wie Verdichtung, Massenimport, Statistiksammlung und Indexerstellung nun von einem einheitlichen Scheduler verwaltet. Die Funktion der Datenpersistenz, die zuvor vom DataNode ausgeführt wurde, wurde in den Streaming Node verlagert. Um die Bereitstellung und Wartung zu vereinfachen, wurden der IndexNode und der DataNode zu einer einzigen DataNode-Komponente zusammengeführt. Dieser konsolidierte Knoten führt nun all diese wichtigen Aufgaben aus, wodurch die betriebliche Komplexität reduziert und die Ressourcennutzung optimiert wird.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">Zusammenführung von Koordinatoren zu MixCoord</h4><p>Das vorherige Design mit separaten RootCoord-, QueryCoord- und DataCoord-Modulen führte zu einer komplexen Kommunikation zwischen den Modulen. Um das Systemdesign zu vereinfachen, wurden diese Komponenten zu einem einzigen, vereinheitlichten Koordinator namens MixCoord zusammengeführt. Diese Konsolidierung reduziert die Komplexität der verteilten Programmierung, indem die netzwerkbasierte Kommunikation durch interne Funktionsaufrufe ersetzt wird, was zu einem effizienteren Systembetrieb und einer vereinfachten Entwicklung und Wartung führt.</p>
<h3 id="Key-Features" class="common-anchor-header">Wesentliche Merkmale<button data-href="#Key-Features" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">RaBitQ 1-Bit-Quantisierung</h4><p>Bei der Verarbeitung großer Datensätze ist die 1-Bit-Quantisierung eine effektive Technik zur Verbesserung der Ressourcennutzung und der Suchleistung. Herkömmliche Methoden können sich jedoch negativ auf die Wiederauffindbarkeit auswirken. In Zusammenarbeit mit den ursprünglichen Forschungsautoren führt Milvus 2.6 RaBitQ ein, eine 1-Bit-Quantisierungslösung, die eine hohe Recall-Genauigkeit beibehält und gleichzeitig die Ressourcen- und Leistungsvorteile der 1-Bit-Kompression bietet.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/ivf-rabitq.md">IVF_RABITQ</a>.</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">Erweiterung der JSON-Fähigkeit</h4><p>Milvus 2.6 erweitert seine Unterstützung für den JSON-Datentyp mit den folgenden Verbesserungen:</p>
<ul>
<li><strong>Leistung</strong>: JSON Path Indexing wird nun offiziell unterstützt und ermöglicht die Erstellung von invertierten Indizes auf bestimmten Pfaden innerhalb von JSON-Objekten (z.B. <code translate="no">meta.user.location</code>). Dadurch werden vollständige Objekt-Scans vermieden und die Latenzzeit von Abfragen mit komplexen Filtern verbessert.</li>
<li><strong>Funktionsweise</strong>: Um eine komplexere Filterlogik zu unterstützen, bietet diese Version Unterstützung für die Funktionen <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_EXISTS</code>, <code translate="no">IS NULL</code> und <code translate="no">CAST</code>. Unsere Arbeit an der JSON-Unterstützung geht weiter. Wir freuen uns, Ihnen mitteilen zu können, dass die kommenden offiziellen Versionen noch leistungsfähigere Funktionen bieten werden, wie z. B. <strong>JSON Shredding</strong> und einen <strong>JSON FLAT Index</strong>, der die Leistung bei stark verschachtelten JSON-Daten erheblich verbessern soll.</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">Analyzer/Tokenizer Funktionserweiterung</h4><p>In dieser Version werden die Textverarbeitungsfunktionen durch mehrere Aktualisierungen des Analyzers und Tokenizers erheblich verbessert:</p>
<ul>
<li>Eine neue <a href="/docs/de/analyzer-overview.md#Example-use">Run Analyzer-Syntax</a> ist verfügbar, um Tokenizer-Konfigurationen zu validieren.</li>
<li>Der <a href="/docs/de/lindera-tokenizer.md">Lindera Tokenizer</a> wurde integriert, um asiatische Sprachen wie Japanisch und Koreanisch besser zu unterstützen.</li>
<li>Die Auswahl des Tokenizers auf Zeilenebene wird jetzt unterstützt, wobei der universelle <a href="/docs/de/icu-tokenizer.md">ICU-Tokenizer</a> als Fallback für mehrsprachige Szenarien zur Verfügung steht.</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">Dateneingabe, Datenausgabe mit Einbettungsfunktionen</h4><p>Milvus 2.6 führt eine "Data-in, Data-Out"-Funktion ein, die die Entwicklung von KI-Anwendungen durch die direkte Integration von Einbettungsmodellen von Drittanbietern (z. B. von OpenAI, AWS Bedrock, Google Vertex AI, Hugging Face) vereinfacht. Milvus ruft dann automatisch den angegebenen Modelldienst auf, um den Text in Echtzeit in Vektoren umzuwandeln. Damit entfällt die Notwendigkeit einer separaten Vektor-Konvertierungs-Pipeline.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/embedding-function-overview.md">Übersicht über die Einbettungsfunktion</a>.</p>
<h4 id="Phrase-Match" class="common-anchor-header">Phrasenabgleich</h4><p>Phrase Match ist eine Textsuchfunktion, die nur dann Ergebnisse liefert, wenn die exakte Abfolge von Wörtern in einer Abfrage nacheinander und in der richtigen Reihenfolge in einem Dokument vorkommt.</p>
<p><strong>Hauptmerkmale</strong>:</p>
<ul>
<li>Ordnungsabhängig: Die Wörter müssen in der gleichen Reihenfolge wie in der Abfrage erscheinen.</li>
<li>Aufeinanderfolgende Übereinstimmung: Die Wörter müssen direkt nebeneinander stehen, es sei denn, es wird ein Slop-Wert verwendet.</li>
<li>Slop (optional): Ein einstellbarer Parameter, der eine geringe Anzahl von Zwischenwörtern zulässt, um eine unscharfe Phrasenübereinstimmung zu ermöglichen.</li>
</ul>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/phrase-match.md">Phrase Match</a>.</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">MinHash LSH-Index (Beta)</h4><p>Um den Bedarf an Datendeduplizierung beim Modelltraining zu decken, bietet Milvus 2.6 Unterstützung für MINHASH_LSH-Indizes. Diese Funktion bietet eine rechnerisch effiziente und skalierbare Methode zur Schätzung der Jaccard-Ähnlichkeit zwischen Dokumenten, um Fast-Duplikate zu identifizieren. Benutzer können während der Vorverarbeitung MinHash-Signaturen für ihre Textdokumente erzeugen und den MINHASH_LSH-Index in Milvus verwenden, um ähnliche Inhalte in großen Datensätzen effizient zu finden und so die Datenbereinigung und Modellqualität zu verbessern.</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">Zeitabhängige Abklingfunktionen</h4><p>Milvus 2.6 führt zeitabhängige Abklingfunktionen ein, um Szenarien zu berücksichtigen, in denen sich der Informationswert im Laufe der Zeit ändert. Bei der Neueinstufung von Ergebnissen können Benutzer exponentielle, Gaußsche oder lineare Abklingfunktionen auf der Grundlage eines Zeitstempelfeldes anwenden, um die Relevanzbewertung eines Dokuments anzupassen. Dadurch wird sichergestellt, dass aktuellere Inhalte priorisiert werden können, was für Anwendungen wie Newsfeeds, E-Commerce und das Gedächtnis eines KI-Agenten entscheidend ist.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/decay-ranker-overview.md">Decay Ranker Übersicht</a>.</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">Feld für Online-Schema-Evolution hinzufügen</h4><p>Um eine größere Schema-Flexibilität zu bieten, unterstützt Milvus 2.6 jetzt das Hinzufügen eines neuen skalaren Feldes zum Schema einer bestehenden Sammlung online. Dadurch wird die Notwendigkeit vermieden, eine neue Sammlung zu erstellen und eine störende Datenmigration durchzuführen, wenn sich die Anwendungsanforderungen ändern.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/add-fields-to-an-existing-collection.md">Felder zu einer bestehenden Sammlung hinzufügen</a>.</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">INT8-Vektor-Unterstützung</h4><p>Als Reaktion auf die zunehmende Verwendung von quantisierten Modellen, die 8-Bit-Integer-Einbettungen erzeugen, bietet Milvus 2.6 native Datentypunterstützung für INT8-Vektoren. Dadurch können Benutzer diese Vektoren direkt ohne De-Quantisierung einlesen, was Berechnungen, Netzwerkbandbreite und Speicherkosten spart. Diese Funktion wird zunächst für Indizes der HNSW-Familie unterstützt.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/dense-vector.md">Dense Vector</a>.</p>
