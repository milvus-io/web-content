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
<h2 id="Coordinator-service" class="common-anchor-header">Koordinator-Dienst<button data-href="#Coordinator-service" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Koordinatordienst weist den Arbeitsknoten Aufgaben zu und fungiert als Gehirn des Systems. Zu den Aufgaben, die er übernimmt, gehören die Verwaltung der Clustertopologie, der Lastausgleich, die Erzeugung von Zeitstempeln, die Datendeklaration und die Datenverwaltung.</p>
<p>Es gibt drei Arten von Koordinatoren: Stammkoordinator (Root Coord), Datenkoordinator (Data Coord) und Abfragekoordinator (Query Coord).</p>
<h3 id="Root-coordinator-root-coord" class="common-anchor-header">Wurzelkoordinator (Root Coord)</h3><p>Der Root-Koordinator bearbeitet Data Definition Language (DDL)- und Data Control Language (DCL)-Anfragen, wie z. B. das Erstellen oder Löschen von Collections, Partitionen oder Indizes, und verwaltet TSO (Timestamp Oracle) und die Ausgabe von Zeittickern.</p>
<h3 id="Query-coordinator-query-coord" class="common-anchor-header">Abfragekoordinator (query coord)</h3><p>Der Abfragekoordinator verwaltet die Topologie und den Lastausgleich für die Abfrageknoten sowie die Weitergabe von wachsenden Segmenten an geschlossene Segmente.</p>
<h3 id="Data-coordinator-data-coord" class="common-anchor-header">Datenkoordinator (Datenkoordinator)</h3><p>Der Datenkoordinator verwaltet die Topologie der Daten- und Indexknoten, pflegt die Metadaten und stößt das Flushen, Verdichten und Erstellen von Indizes sowie andere Datenoperationen im Hintergrund an.</p>
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
    </button></h2><p>Worker-Knoten sind "stumme" Executors, die den Anweisungen des Coordinator-Dienstes folgen und DML-Befehle (Data Manipulation Language) des Proxys ausführen. Worker Nodes sind dank der Trennung von Speicherung und Berechnung zustandslos und können die Skalierung des Systems und die Wiederherstellung im Notfall erleichtern, wenn sie in Kubernetes eingesetzt werden. Es gibt drei Arten von Worker Nodes:</p>
<h3 id="Query-node" class="common-anchor-header">Abfrageknoten</h3><p>Abfrageknoten rufen inkrementelle Protokolldaten ab und verwandeln sie in wachsende Segmente, indem sie den Protokollbroker abonnieren, historische Daten aus dem Objektspeicher laden und eine hybride Suche zwischen Vektor- und Skalardaten durchführen.</p>
<h3 id="Data-node" class="common-anchor-header">Datenknoten</h3><p>Datenknoten rufen inkrementelle Protokolldaten ab, indem sie sich beim Log-Broker anmelden, Mutationsanforderungen verarbeiten und Protokolldaten in Protokoll-Snapshots packen und im Objektspeicher speichern.</p>
<h3 id="Index-node" class="common-anchor-header">Index-Knoten</h3><p>Indexknoten bauen Indizes auf. Sie müssen nicht speicherresident sein und können mit dem serverlosen Framework implementiert werden.</p>
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
<h3 id="Meta-storage" class="common-anchor-header">Metaspeicher</h3><p>Der Metaspeicher speichert Schnappschüsse von Metadaten wie Sammelschemata und Prüfpunkte für den Nachrichtenverbrauch. Die Speicherung von Metadaten erfordert extrem hohe Verfügbarkeit, starke Konsistenz und Transaktionsunterstützung, weshalb Milvus etcd für diesen Zweck ausgewählt hat. Milvus verwendet etcd auch für die Serviceregistrierung und Zustandsprüfungen.</p>
<h3 id="Object-storage" class="common-anchor-header">Objektspeicher</h3><p>Der Objektspeicher speichert Snapshot-Dateien von Protokollen, Indexdateien für skalare und Vektordaten sowie Zwischenergebnisse von Abfragen. Milvus verwendet MinIO als Objektspeicher und kann problemlos auf AWS S3 und Azure Blob eingesetzt werden, zwei der beliebtesten und kostengünstigsten Speicherdienste der Welt. Objektspeicher haben jedoch eine hohe Zugriffslatenz und werden nach der Anzahl der Abfragen berechnet. Um die Leistung zu verbessern und die Kosten zu senken, plant Milvus die Implementierung einer Cold-Hot-Datentrennung in einem speicher- oder SSD-basierten Cache-Pool.</p>
<h3 id="Log-broker" class="common-anchor-header">Log-Broker</h3><p>Der Log-Broker ist ein Pub-Sub-System, das Playback unterstützt. Er ist für die Persistenz der Streaming-Daten und die Ereignisbenachrichtigung zuständig. Er stellt auch die Integrität der inkrementellen Daten sicher, wenn sich die Arbeitsknoten von einem Systemausfall erholen. Milvus Distributed verwendet Pulsar als Log Broker, während Milvus Standalone RocksDB verwendet. Der Log-Broker kann ohne weiteres durch Streaming-Data-Storage-Plattformen wie Kafka ersetzt werden.</p>
<p>Milvus folgt dem "Log as Data"-Prinzip, d.h. Milvus unterhält keine physische Tabelle, sondern garantiert die Zuverlässigkeit der Daten durch Logging-Persistenz und Snapshot-Logs.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/log_mechanism.png" alt="Log_mechanism" class="doc-image" id="log_mechanism" />
   </span> <span class="img-wrapper"> <span>Log_Mechanismus</span> </span></p>
<p>Der Log-Broker ist das Rückgrat von Milvus. Er ist für die Persistenz der Daten und die Disaggregation von Lese- und Schreibzugriffen zuständig, dank seines eingebauten Pub-Sub-Mechanismus. Die obige Abbildung zeigt eine vereinfachte Darstellung des Mechanismus, bei dem das System in zwei Rollen unterteilt ist, den Log-Broker (zur Aufrechterhaltung der Log-Sequenz) und den Log-Subscriber. Ersterer zeichnet alle Operationen auf, die den Zustand der Sammlungen verändern; letzterer abonniert die Log-Sequenz, um die lokalen Daten zu aktualisieren, und bietet Dienste in Form von Nur-Lese-Kopien an. Der Pub-Sub-Mechanismus bietet auch Raum für die Erweiterbarkeit des Systems im Hinblick auf die Erfassung von Änderungsdaten (CDC) und die globale Verteilung.</p>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als nächstes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Lesen Sie <a href="/docs/de/v2.4.x/main_components.md">Hauptkomponenten</a> für weitere Details über die Milvus-Architektur.</li>
</ul>
