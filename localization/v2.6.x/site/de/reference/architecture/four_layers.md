---
id: four_layers.md
summary: Disaggregationsstruktur für Speicherung und Datenverarbeitung in Milvus.
title: Disaggregation von Speicherung und Datenverarbeitung
---
<h1 id="StorageComputing-Disaggregation" class="common-anchor-header">Disaggregation von Speicherung und Datenverarbeitung<button data-href="#StorageComputing-Disaggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>Nach dem Prinzip der Disaggregation von Daten- und Steuerungsebene umfasst Milvus vier Schichten, die in Bezug auf Skalierbarkeit und Disaster Recovery voneinander unabhängig sind.</p>
<h2 id="Access-layer" class="common-anchor-header">Zugriffsschicht<button data-href="#Access-layer" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Zugriffsschicht besteht aus einer Gruppe von zustandslosen Proxys und ist die vorderste Schicht des Systems und der Endpunkt für die Benutzer. Sie validiert Client-Anfragen und reduziert die zurückgegebenen Ergebnisse:</p>
<ul>
<li>Der Proxy ist an sich zustandslos. Er bietet eine einheitliche Dienstadresse unter Verwendung von Lastausgleichskomponenten wie Nginx, Kubernetes Ingress, NodePort und LVS.</li>
<li>Da Milvus eine MPP-Architektur (Massively Parallel Processing) verwendet, aggregiert und verarbeitet der Proxy die Zwischenergebnisse, bevor er die endgültigen Ergebnisse an den Client zurückgibt.</li>
</ul>
<h2 id="Coordinator" class="common-anchor-header">Koordinator<button data-href="#Coordinator" class="anchor-icon" translate="no">
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
    </button></h2><p>Der <strong>Coordinator</strong> dient als Gehirn von Milvus. Zu jedem Zeitpunkt ist genau ein Coordinator im gesamten Cluster aktiv, der für die Aufrechterhaltung der Clustertopologie, die Planung aller Aufgabentypen und die Gewährleistung der Konsistenz auf Clusterebene verantwortlich ist.</p>
<p>Im Folgenden sind einige der Aufgaben aufgeführt, die vom <strong>Coordinator</strong> bearbeitet werden:</p>
<ul>
<li><strong>DDL/DCL/TSO-Verwaltung</strong>: Bearbeitung von Data Definition Language (DDL)- und Data Control Language (DCL)-Anfragen, wie z. B. das Erstellen oder Löschen von Sammlungen, Partitionen oder Indizes, sowie die Verwaltung von Timestamp Oracle (TSO) und die Ausgabe von Zeittickern.</li>
<li><strong>Verwaltung von Streaming-Diensten</strong>: Verbindet das Write-Ahead Log (WAL) mit Streaming Nodes und bietet eine Service Discovery für den Streaming Service.</li>
<li><strong>Abfrage-Management</strong>: Verwaltet die Topologie und den Lastausgleich für die Abfrageknoten und liefert und verwaltet die Abfrageansichten, um das Abfrage-Routing zu steuern.</li>
<li><strong>Verwaltung historischer Daten</strong>: Verteilt Offline-Aufgaben wie Verdichtung und Indexerstellung an Datenknoten und verwaltet die Topologie von Segmenten und Datenansichten.</li>
</ul>
<h2 id="Worker-nodes" class="common-anchor-header">Worker-Knoten<button data-href="#Worker-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Arme und Beine. Worker-Knoten sind stumme Ausführungseinheiten, die den Anweisungen des Koordinators folgen. Worker-Knoten sind dank der Trennung von Speicherung und Berechnung zustandslos und können die Skalierung des Systems und die Notfallwiederherstellung erleichtern, wenn sie in Kubernetes eingesetzt werden. Es gibt drei Arten von Worker Nodes:</p>
<h3 id="Streaming-node" class="common-anchor-header">Streaming-Knoten</h3><p>Der Streaming Node dient als "Mini-Gehirn" auf Shard-Ebene und bietet Konsistenzgarantien auf Shard-Ebene sowie Fehlerwiederherstellung auf der Grundlage des zugrunde liegenden WAL-Speichers. Gleichzeitig ist der Streaming Node auch für die Abfrage von wachsenden Daten und die Erstellung von Abfrageplänen zuständig. Darüber hinaus übernimmt er auch die Umwandlung wachsender Daten in versiegelte (historische) Daten.</p>
<h3 id="Query-node" class="common-anchor-header">Abfrageknoten</h3><p>Der Abfrageknoten lädt die historischen Daten aus dem Objektspeicher und ermöglicht die Abfrage der historischen Daten.</p>
<h3 id="Data-node" class="common-anchor-header">Datenknoten</h3><p>Der Datenknoten ist für die Offline-Verarbeitung historischer Daten zuständig, z. B. für die Verdichtung und den Indexaufbau.</p>
<h2 id="Storage" class="common-anchor-header">Speicherung<button data-href="#Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Speicher ist das Herzstück des Systems und für die Datenpersistenz verantwortlich. Er umfasst Metaspeicher, Log-Broker und Objektspeicher.</p>
<h3 id="Meta-storage" class="common-anchor-header">Metaspeicher</h3><p>Der Metaspeicher speichert Schnappschüsse von Metadaten wie Sammelschemata und Prüfpunkte für den Nachrichtenverbrauch. Die Speicherung von Metadaten erfordert extrem hohe Verfügbarkeit, starke Konsistenz und Transaktionsunterstützung, weshalb Milvus etcd als Metaspeicher gewählt hat. Milvus verwendet etcd auch für die Serviceregistrierung und Zustandsüberprüfung.</p>
<h3 id="Object-storage" class="common-anchor-header">Objektspeicher</h3><p>Der Objektspeicher speichert Snapshot-Dateien von Protokollen, Indexdateien für skalare und Vektordaten sowie Zwischenergebnisse von Abfragen. Milvus verwendet MinIO als Objektspeicher und kann problemlos auf AWS S3 und Azure Blob eingesetzt werden, zwei der beliebtesten und kostengünstigsten Speicherdienste der Welt. Der Objektspeicher hat jedoch eine hohe Zugriffslatenz und wird nach der Anzahl der Abfragen berechnet. Um die Leistung zu verbessern und die Kosten zu senken, plant Milvus die Implementierung einer Kalt-Warm-Datentrennung auf einem speicher- oder SSD-basierten Cache-Pool.</p>
<h3 id="WAL-storage" class="common-anchor-header">WAL-Speicher</h3><p>Die WAL-Speicherung (Write-Ahead Log) ist die Grundlage für die Haltbarkeit und Konsistenz von Daten in verteilten Systemen. Bevor eine Änderung übertragen wird, wird sie zunächst in einem Protokoll aufgezeichnet, um sicherzustellen, dass Sie im Falle eines Fehlers genau dort wiederhergestellt werden können, wo Sie aufgehört haben.</p>
<p>Zu den gängigen WAL-Implementierungen gehören Kafka, Pulsar und Woodpecker. Im Gegensatz zu herkömmlichen plattenbasierten Lösungen verwendet Woodpecker ein Cloud-natives Design ohne Platten, das direkt in den Objektspeicher schreibt. Dieser Ansatz lässt sich mühelos mit Ihren Anforderungen skalieren und vereinfacht den Betrieb, da der Overhead der Verwaltung lokaler Festplatten entfällt.</p>
<p>Indem jeder Schreibvorgang im Voraus protokolliert wird, garantiert die WAL-Schicht einen zuverlässigen, systemweiten Mechanismus für Wiederherstellung und Konsistenz - ganz gleich, wie komplex Ihre verteilte Umgebung wird.</p>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als Nächstes?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Lesen Sie <a href="/docs/de/v2.6.x/main_components.md">Hauptkomponenten</a> für weitere Details über die Milvus-Architektur.</li>
</ul>
