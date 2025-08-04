---
id: architecture_overview.md
summary: >-
  Milvus bietet eine schnelle, zuverlässige und stabile Vektordatenbank, die
  speziell für die Ähnlichkeitssuche und künstliche Intelligenz entwickelt
  wurde.
title: Milvus Architektur Übersicht
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Milvus Architektur Übersicht<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus ist eine <strong>quelloffene</strong>, <strong>Cloud-native</strong> Vektordatenbank, die für eine leistungsstarke Ähnlichkeitssuche in großen Vektordatensätzen entwickelt wurde. Sie basiert auf beliebten Vektorsuchbibliotheken wie Faiss, HNSW, DiskANN und SCANN und unterstützt KI-Anwendungen und unstrukturierte Datenabfrageszenarien. Bevor Sie fortfahren, machen Sie sich bitte mit den <a href="/docs/de/glossary.md">Grundprinzipien</a> der Einbettungssuche vertraut.</p>
<h2 id="Architecture-Diagram" class="common-anchor-header">Architektur-Diagramm<button data-href="#Architecture-Diagram" class="anchor-icon" translate="no">
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
    </button></h2><p>Das folgende Diagramm veranschaulicht die High-Level-Architektur von Milvus und zeigt das modulare, skalierbare und Cloud-native Design mit vollständig disaggregierten Speicher- und Berechnungsebenen.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus_architecture_2_6.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>Architektur_Diagramm</span> </span></p>
<h2 id="Architectural-Principles" class="common-anchor-header">Architektonische Grundsätze<button data-href="#Architectural-Principles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus folgt dem Prinzip der Disaggregation von Daten- und Steuerungsebene und umfasst vier Hauptschichten, die in Bezug auf Skalierbarkeit und Disaster Recovery voneinander unabhängig sind. Diese Shared-Storage-Architektur mit vollständig disaggregierten Speicher- und Rechenschichten ermöglicht die horizontale Skalierung von Rechenknoten, während Woodpecker als Zero-Disk-WAL-Schicht implementiert wird, um die Elastizität zu erhöhen und den betrieblichen Overhead zu reduzieren.</p>
<p>Durch die Trennung der Stream-Verarbeitung in Streaming Node und der Batch-Verarbeitung in Query Node und Data Node erreicht Milvus eine hohe Leistung bei gleichzeitiger Erfüllung der Echtzeitverarbeitungsanforderungen.</p>
<h2 id="Detailed-Layer-Architecture" class="common-anchor-header">Detaillierte Schichtenarchitektur<button data-href="#Detailed-Layer-Architecture" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Layer-1-Access-Layer" class="common-anchor-header">Schicht 1: Zugriffsschicht</h3><p>Die Zugriffsschicht besteht aus einer Gruppe von zustandslosen Proxys und ist die vorderste Schicht des Systems und der Endpunkt für die Benutzer. Sie validiert Client-Anfragen und reduziert die zurückgegebenen Ergebnisse:</p>
<ul>
<li>Der Proxy ist an sich zustandslos. Er bietet eine einheitliche Dienstadresse unter Verwendung von Lastausgleichskomponenten wie Nginx, Kubernetes Ingress, NodePort und LVS.</li>
<li>Da Milvus eine MPP-Architektur (Massively Parallel Processing) verwendet, aggregiert der Proxy die Zwischenergebnisse und verarbeitet sie nach, bevor er die endgültigen Ergebnisse an den Client zurückgibt.</li>
</ul>
<h3 id="Layer-2-Coordinator" class="common-anchor-header">Schicht 2: Koordinator</h3><p>Der Coordinator dient als das Gehirn von Milvus. Zu jedem Zeitpunkt ist genau ein Koordinator im gesamten Cluster aktiv, der für die Aufrechterhaltung der Clustertopologie, die Planung aller Aufgabentypen und die Gewährleistung der Konsistenz auf Clusterebene verantwortlich ist.</p>
<p>Im Folgenden sind einige der Aufgaben aufgeführt, die vom <strong>Coordinator</strong> bearbeitet werden:</p>
<ul>
<li><strong>DDL/DCL/TSO-Verwaltung</strong>: Bearbeitung von Data Definition Language (DDL)- und Data Control Language (DCL)-Anfragen, wie z. B. das Erstellen oder Löschen von Sammlungen, Partitionen oder Indizes, sowie die Verwaltung von Timestamp Oracle (TSO) und die Ausgabe von Zeittickern.</li>
<li><strong>Verwaltung von Streaming-Diensten</strong>: Verbindet das Write-Ahead Log (WAL) mit Streaming Nodes und bietet eine Service Discovery für den Streaming Service.</li>
<li><strong>Abfrage-Management</strong>: Verwaltet die Topologie und den Lastausgleich für die Abfrageknoten und liefert und verwaltet die Abfrageansichten, um das Abfrage-Routing zu steuern.</li>
<li><strong>Verwaltung historischer Daten</strong>: Verteilt Offline-Aufgaben wie Verdichtung und Indexerstellung an Datenknoten und verwaltet die Topologie von Segmenten und Datenansichten.</li>
</ul>
<h3 id="Layer-3-Worker-Nodes" class="common-anchor-header">Schicht 3: Arbeiterknoten</h3><p>Die Arme und Beine. Worker Nodes sind stumme Ausführungsknoten, die den Anweisungen des Koordinators folgen. Worker Nodes sind dank der Trennung von Speicherung und Berechnung zustandslos und können die Skalierung des Systems und die Wiederherstellung im Notfall erleichtern, wenn sie in Kubernetes eingesetzt werden. Es gibt drei Arten von Worker Nodes:</p>
<h3 id="Streaming-node" class="common-anchor-header">Streaming Node</h3><p>Der Streaming Node dient als "Mini-Gehirn" auf Shard-Ebene und bietet Konsistenzgarantien auf Shard-Ebene sowie Fehlerbehebung auf der Grundlage des zugrunde liegenden WAL-Speichers. Gleichzeitig ist der Streaming Node auch für die Abfrage wachsender Daten und die Erstellung von Abfrageplänen zuständig. Darüber hinaus übernimmt er auch die Umwandlung wachsender Daten in versiegelte (historische) Daten.</p>
<h3 id="Query-node" class="common-anchor-header">Abfrageknoten</h3><p>Der Abfrageknoten lädt die historischen Daten aus dem Objektspeicher und ermöglicht die Abfrage der historischen Daten.</p>
<h3 id="Data-node" class="common-anchor-header">Datenknoten</h3><p>Der Datenknoten ist für die Offline-Verarbeitung historischer Daten zuständig, z. B. für die Verdichtung und den Aufbau von Indizes.</p>
<h3 id="Layer-4-Storage" class="common-anchor-header">Schicht 4: Speicherung</h3><p>Die Speicherung ist das Herzstück des Systems und für die Datenpersistenz verantwortlich. Er umfasst Metaspeicher, Log-Broker und Objektspeicher.</p>
<h3 id="Meta-storage" class="common-anchor-header">Metaspeicher</h3><p>Der Metaspeicher speichert Schnappschüsse von Metadaten wie Sammelschemata und Prüfpunkte für den Nachrichtenverbrauch. Die Speicherung von Metadaten erfordert extrem hohe Verfügbarkeit, starke Konsistenz und Transaktionsunterstützung, weshalb Milvus etcd als Metaspeicher gewählt hat. Milvus verwendet etcd auch für die Dienstregistrierung und Zustandsprüfung.</p>
<h3 id="Object-storage" class="common-anchor-header">Objektspeicher</h3><p>Der Objektspeicher speichert Snapshot-Dateien von Protokollen, Indexdateien für skalare und Vektordaten sowie Zwischenergebnisse von Abfragen. Milvus verwendet MinIO als Objektspeicher und kann problemlos auf AWS S3 und Azure Blob eingesetzt werden, zwei der beliebtesten und kostengünstigsten Speicherdienste der Welt. Der Objektspeicher hat jedoch eine hohe Zugriffslatenz und wird nach der Anzahl der Abfragen berechnet. Um die Leistung zu verbessern und die Kosten zu senken, plant Milvus die Implementierung einer Kalt-Warm-Datentrennung auf einem speicher- oder SSD-basierten Cache-Pool.</p>
<h3 id="WAL-storage" class="common-anchor-header">WAL-Speicher</h3><p>Die WAL-Speicherung (Write-Ahead Log) ist die Grundlage für die Haltbarkeit und Konsistenz von Daten in verteilten Systemen. Bevor eine Änderung übertragen wird, wird sie zunächst in einem Protokoll aufgezeichnet, um sicherzustellen, dass Sie im Falle eines Fehlers genau dort wiederhergestellt werden können, wo Sie aufgehört haben.</p>
<p>Zu den gängigen WAL-Implementierungen gehören Kafka, Pulsar und Woodpecker. Im Gegensatz zu herkömmlichen plattenbasierten Lösungen verwendet Woodpecker ein Cloud-natives Design ohne Platten, das direkt in den Objektspeicher schreibt. Dieser Ansatz lässt sich mühelos mit Ihren Anforderungen skalieren und vereinfacht den Betrieb, da der Overhead der Verwaltung lokaler Festplatten entfällt.</p>
<p>Indem jeder Schreibvorgang im Voraus protokolliert wird, garantiert die WAL-Schicht einen zuverlässigen, systemweiten Mechanismus für Wiederherstellung und Konsistenz - egal wie komplex Ihre verteilte Umgebung wird.</p>
<h2 id="Data-Flow-and-API-Categories" class="common-anchor-header">Datenfluss und API-Kategorien<button data-href="#Data-Flow-and-API-Categories" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Milvus-APIs sind nach ihrer Funktion kategorisiert und folgen bestimmten Pfaden durch die Architektur:</p>
<table>
<thead>
<tr><th>API-Kategorie</th><th>Vorgänge</th><th>Beispiel-APIs</th><th>Architektur Fluss</th></tr>
</thead>
<tbody>
<tr><td><strong>DDL/DCL</strong></td><td>Schema &amp; Zugriffskontrolle</td><td><code translate="no">createCollection</code>, <code translate="no">dropCollection</code>, <code translate="no">hasCollection</code>, <code translate="no">createPartition</code></td><td>Zugriffsschicht → Koordinator</td></tr>
<tr><td><strong>DML</strong></td><td>Datenmanipulation</td><td><code translate="no">insert</code>, <code translate="no">delete</code>, <code translate="no">upsert</code></td><td>Zugriffsschicht → Streaming Worker Node</td></tr>
<tr><td><strong>DQL</strong></td><td>Datenabfrage</td><td><code translate="no">search</code>, <code translate="no">query</code></td><td>Zugriffsschicht → Batch-Worker-Knoten (Abfrageknoten)</td></tr>
</tbody>
</table>
<h3 id="Example-Data-Flow-Search-Operation" class="common-anchor-header">Beispiel Datenfluss: Suchvorgang</h3><ol>
<li>Client sendet eine Suchanfrage über SDK/RESTful API</li>
<li>Load Balancer leitet Anfrage an verfügbaren Proxy in der Zugriffsschicht weiter</li>
<li>Proxy verwendet Routing-Cache, um Zielknoten zu bestimmen; kontaktiert Koordinator nur, wenn Cache nicht verfügbar ist</li>
<li>Der Proxy leitet die Anfrage an die entsprechenden Streaming-Knoten weiter, die sich dann mit den Abfrageknoten für die Suche nach versiegelten Daten abstimmen, während die Suche nach wachsenden Daten lokal ausgeführt wird</li>
<li>Abfrageknoten laden bei Bedarf versiegelte Segmente aus dem Objektspeicher und führen eine Suche auf Segmentebene durch</li>
<li>Die Suchergebnisse werden auf mehreren Ebenen reduziert: Abfrageknoten reduzieren die Ergebnisse über mehrere Segmente hinweg, Streaming-Knoten reduzieren die Ergebnisse von Abfrageknoten und der Proxy reduziert die Ergebnisse von allen Streaming-Knoten, bevor er sie an den Client zurückgibt</li>
</ol>
<h3 id="Example-Data-Flow-Data-Insertion" class="common-anchor-header">Beispiel Datenfluss: Dateneinfügung</h3><ol>
<li>Client sendet eine Einfügeanforderung mit Vektordaten</li>
<li>Zugriffsschicht validiert und leitet Anfrage an Streaming Node weiter</li>
<li>Streaming Node protokolliert den Vorgang im WAL-Speicher, um ihn dauerhaft zu speichern</li>
<li>Die Daten werden in Echtzeit verarbeitet und für Abfragen zur Verfügung gestellt</li>
<li>Wenn Segmente die Kapazität erreichen, löst der Streaming Node die Konvertierung in versiegelte Segmente aus</li>
<li>Der Datenknoten führt die Verdichtung durch, erstellt Indizes auf den versiegelten Segmenten und speichert die Ergebnisse im Objektspeicher.</li>
<li>Abfrageknoten laden die neu erstellten Indizes und ersetzen die entsprechenden wachsenden Daten</li>
</ol>
<h2 id="Whats-Next" class="common-anchor-header">Was kommt als nächstes?<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Erkunden Sie die <a href="/docs/de/main_components.md">Hauptkomponenten</a> für detaillierte Implementierungsspezifika</li>
<li>Lernen Sie die Arbeitsabläufe der <a href="/docs/de/data_processing.md">Datenverarbeitung</a> und Optimierungsstrategien kennen</li>
<li>Verstehen Sie das <a href="/docs/de/consistency.md">Konsistenzmodell</a> und die Transaktionsgarantien in Milvus</li>
</ul>
