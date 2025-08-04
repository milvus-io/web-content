---
id: streaming_service.md
title: Streaming-Dienst
summary: >-
  Der Streaming Service ist ein Konzept für das interne Streaming-Systemmodul
  von Milvus, das auf dem Write-Ahead Log (WAL) aufbaut, um verschiedene
  Streaming-bezogene Funktionen zu unterstützen.
---
<h1 id="Streaming-Service" class="common-anchor-header">Streaming-Dienst<button data-href="#Streaming-Service" class="anchor-icon" translate="no">
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
    </button></h1><p>Der <strong>Streaming Service</strong> ist ein Konzept für das interne Streaming-Systemmodul von Milvus, das auf dem Write-Ahead Log (WAL) aufbaut, um verschiedene Streaming-bezogene Funktionen zu unterstützen. Dazu gehören die Aufnahme/Abonnement von Streaming-Daten, die Wiederherstellung des Cluster-Zustands im Fehlerfall, die Umwandlung von Streaming-Daten in historische Daten und die Abfrage wachsender Datenmengen. Architektonisch setzt sich der Streaming Service aus drei Hauptkomponenten zusammen:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_distributed_arch.png" alt="Streaming Distributed Arc" class="doc-image" id="streaming-distributed-arc" />
   </span> <span class="img-wrapper"> <span>Verteilter Streaming-Bogen</span> </span></p>
<ul>
<li><p><strong>Streaming-Koordinator</strong>: Eine logische Komponente im Koordinator-Knoten. Er verwendet Etcd für die Service-Erkennung, um verfügbare Streaming-Knoten zu finden, und ist für die Bindung von WAL an die entsprechenden Streaming-Knoten verantwortlich. Außerdem registriert er Dienste, um die WAL-Verteilungstopologie offenzulegen, so dass Streaming-Clients den geeigneten Streaming-Knoten für eine bestimmte WAL kennen.</p></li>
<li><p><strong>Streaming-Knoten-Cluster</strong>: Ein Cluster von Streaming-Worker-Nodes, die für alle Streaming-Verarbeitungsaufgaben zuständig sind, z. B. für das Anhängen von WALs, die Wiederherstellung von Zuständen und die Abfrage von wachsenden Daten.</p></li>
<li><p><strong>Streaming-Client</strong>: Ein intern entwickelter Milvus-Client, der grundlegende Funktionalitäten wie Service Discovery und Readiness Checks kapselt. Er wird verwendet, um Vorgänge wie das Schreiben von Nachrichten und Abonnements zu initiieren.</p></li>
</ul>
<h2 id="Message" class="common-anchor-header">Nachricht<button data-href="#Message" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Streaming Service ist ein loggesteuertes Streaming-System, daher werden alle Schreiboperationen in Milvus (wie DML und DDL) als <strong>Nachrichten</strong> abstrahiert.</p>
<ul>
<li><p>Jeder Nachricht wird vom Streaming Service ein <strong>Timestamp Oracle (TSO)</strong> Feld zugewiesen, das die Reihenfolge der Nachricht im WAL angibt. Die Reihenfolge der Nachrichten bestimmt die Reihenfolge der Schreiboperationen in Milvus. Dadurch ist es möglich, den letzten Clusterzustand aus den Protokollen zu rekonstruieren.</p></li>
<li><p>Jede Nachricht gehört zu einem bestimmten <strong>VChannel</strong> (Virtual Channel) und behält bestimmte invariante Eigenschaften innerhalb dieses Kanals bei, um die Konsistenz der Operationen zu gewährleisten. So muss beispielsweise eine Insert-Operation immer vor einer DropCollection-Operation auf demselben Kanal erfolgen.</p></li>
</ul>
<p>Die Nachrichtenreihenfolge in Milvus kann wie folgt aussehen:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/message_order.png" alt="Message Order" class="doc-image" id="message-order" />
   </span> <span class="img-wrapper"> <span>Reihenfolge der Nachrichten</span> </span></p>
<h2 id="WAL-Component" class="common-anchor-header">WAL-Komponente<button data-href="#WAL-Component" class="anchor-icon" translate="no">
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
    </button></h2><p>Um eine große horizontale Skalierbarkeit zu unterstützen, ist die WAL von Milvus keine einzelne Protokolldatei, sondern ein Verbund aus mehreren Protokollen. Jedes Protokoll kann unabhängig voneinander die Streaming-Funktionalität für mehrere VChannels unterstützen. Zu jedem Zeitpunkt darf eine WAL-Komponente auf <strong>genau einem Streaming-Knoten</strong> arbeiten. Diese Einschränkung wird sowohl durch einen Fencing-Mechanismus des zugrunde liegenden WAL-Speichers als auch durch den Streaming-Koordinator gewährleistet.</p>
<p>Weitere Merkmale der WAL-Komponente sind:</p>
<ul>
<li><p><strong>Segment Lifecycle Management</strong>: Die WAL verwaltet den Lebenszyklus der einzelnen Segmente auf der Grundlage von Richtlinien wie Speicherbedingungen, Segmentgröße und Leerlaufzeit.</p></li>
<li><p><strong>Unterstützung von Basistransaktionen</strong>: Da jede Nachricht eine Größenbeschränkung hat, unterstützt die WAL-Komponente einfache Transaktionen, um atomare Schreibvorgänge auf VChannel-Ebene zu ermöglichen.</p></li>
<li><p><strong>Ferngesteuertes Schreiben von Protokollen mit hoher Parallelität</strong>: Milvus unterstützt Remote-Message-Queues von Drittanbietern als WAL-Speicher. Um die Round-Trip-Latenz (RTT) zwischen dem Streaming-Knoten und dem Remote-WAL-Speicher zu verringern und den Schreibdurchsatz zu verbessern, unterstützt der Streaming-Dienst gleichzeitige Protokollschreibvorgänge. Die Nachrichtenreihenfolge wird durch TSO und TSO-Synchronisierung beibehalten, und die Nachrichten in der WAL werden in TSO-Reihenfolge gelesen.</p></li>
<li><p><strong>Vorausschauender Schreibpuffer</strong>: Nachdem Nachrichten in die WAL geschrieben wurden, werden sie vorübergehend in einem Write-Ahead Buffer gespeichert. Dies ermöglicht das Lesen von Protokollen im Nachhinein, ohne dass Nachrichten aus einem entfernten WAL-Speicher abgerufen werden müssen.</p></li>
<li><p><strong>Mehrere WAL-Speicher werden unterstützt</strong>: Woodpecker, Pulsar, Kafka. Wenn Sie Woodpecker im Zero-Disk-Modus verwenden, können Sie die Abhängigkeit vom entfernten WAL-Speicher aufheben.</p></li>
</ul>
<h2 id="Recovery-Storage" class="common-anchor-header">Wiederherstellungsspeicher<button data-href="#Recovery-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Komponente <strong>Recovery Storage</strong> läuft immer auf dem Streaming-Knoten, auf dem sich die entsprechende WAL-Komponente befindet.</p>
<ul>
<li><p>Sie ist für die Umwandlung von Streaming-Daten in persistente historische Daten und deren Speicherung im Objektspeicher verantwortlich.</p></li>
<li><p>Außerdem übernimmt sie die Wiederherstellung des Speicherzustands für die WAL-Komponente auf dem Streaming-Knoten.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/recovery_storage.png" alt="Recovery Storage" class="doc-image" id="recovery-storage" />
   </span> <span class="img-wrapper"> <span>Wiederherstellungsspeicher</span> </span></p>
<h2 id="Query-Delegator" class="common-anchor-header">Abfrage-Delegator<button data-href="#Query-Delegator" class="anchor-icon" translate="no">
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
    </button></h2><p>Der <strong>Query Delegator</strong> läuft auf jedem Streaming-Knoten und ist für die Ausführung <strong>inkrementeller Abfragen</strong> auf einem einzelnen Shard zuständig. Er generiert Abfragepläne, leitet sie an die entsprechenden Abfrageknoten weiter und aggregiert die Ergebnisse.</p>
<p>Darüber hinaus ist der Abfragedelegator für die Weiterleitung von <strong>Löschvorgängen</strong> an andere Abfrageknoten zuständig.</p>
<p>Der Abfragedelegator arbeitet immer zusammen mit der WAL-Komponente auf demselben Streaming-Knoten. Wenn die Sammlung jedoch mit Mehrfachvervielfältigung konfiguriert ist, werden <strong>N-1</strong> Delegatoren auf den anderen Streaming Nodes eingesetzt.</p>
<h2 id="WAL-Lifetime-and-Wait-for-Ready" class="common-anchor-header">WAL-Lebensdauer und Warten auf Bereitschaft<button data-href="#WAL-Lifetime-and-Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>Durch die Trennung von Rechenknoten und Speicher kann Milvus die WAL leicht von einem Streaming-Knoten auf einen anderen übertragen und so eine hohe Verfügbarkeit des Streaming-Dienstes erreichen.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/wal_lifetime.png" alt="wal lifetime" class="doc-image" id="wal-lifetime" />
   </span> <span class="img-wrapper"> <span>WAL-Lebensdauer</span> </span></p>
<h2 id="Wait-for-Ready" class="common-anchor-header">Warten auf Bereitschaft<button data-href="#Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn die Wal auf einen neuen Streaming-Knoten übertragen wird, wird der Client feststellen, dass der alte Streaming-Knoten einige Anfragen zurückweist. In der Zwischenzeit wird die WAL auf dem neuen Streaming-Knoten wiederhergestellt, und der Client wartet darauf, dass die WAL auf dem neuen Streaming-Knoten bereit für den Dienst ist.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_wait_for_ready.png" alt="wait for ready" class="doc-image" id="wait-for-ready" />
   </span> <span class="img-wrapper"> <span>Warten auf Bereitschaft</span> </span></p>
