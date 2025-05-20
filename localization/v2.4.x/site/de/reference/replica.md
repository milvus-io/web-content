---
id: replica.md
summary: Erfahren Sie mehr über die In-Memory-Replikation in Milvus.
title: In-Memory-Replikation
---
<h1 id="In-Memory-Replica" class="common-anchor-header">In-Memory-Replikation<button data-href="#In-Memory-Replica" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Thema wird der Mechanismus der In-Memory-Replikation (Replikation) in Milvus vorgestellt, der mehrere Segmentreplikationen im Arbeitsspeicher ermöglicht, um die Leistung und Verfügbarkeit zu verbessern.</p>
<p>Informationen zur Konfiguration von In-Memory-Replikaten finden Sie unter <a href="/docs/de/v2.4.x/configure_querynode.md#queryNodereplicas">Abfrageknotenbezogene Konfigurationen</a>.</p>
<h2 id="Overview" class="common-anchor-header">Übersicht<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/replica_availability.jpg" alt="Replica_Availiability" class="doc-image" id="replica_availiability" />
   </span> <span class="img-wrapper"> <span>Replica_Availiability</span> </span></p>
<p>Mit In-Memory-Replikaten kann Milvus das gleiche Segment auf mehrere Abfrageknoten laden. Wenn ein Abfrageknoten ausgefallen ist oder mit einer aktuellen Suchanfrage beschäftigt ist, kann das System neue Anfragen an einen inaktiven Abfrageknoten senden, der eine Replikation desselben Segments besitzt.</p>
<h3 id="Performance" class="common-anchor-header">Leistung</h3><p>Mit In-Memory-Replikationen können Sie zusätzliche CPU- und Speicherressourcen nutzen. Dies ist sehr nützlich, wenn Sie einen relativ kleinen Datensatz haben, aber den Lesedurchsatz mit zusätzlichen Hardwareressourcen erhöhen möchten. Die Gesamt-QPS (Abfrage pro Sekunde) und der Durchsatz können erheblich verbessert werden.</p>
<h3 id="Availability" class="common-anchor-header">Verfügbarkeit</h3><p>In-Memory-Replikate helfen Milvus, sich schneller zu erholen, wenn ein Abfrageknoten ausfällt. Wenn ein Abfrageknoten ausfällt, muss das Segment nicht auf einem anderen Abfrageknoten neu geladen werden. Stattdessen kann die Suchanfrage sofort an einen neuen Abfrageknoten weitergeleitet werden, ohne dass die Daten erneut geladen werden müssen. Da mehrere Segmentreplikationen gleichzeitig verwaltet werden, ist das System bei einem Failover widerstandsfähiger.</p>
<h2 id="Key-Concepts" class="common-anchor-header">Wichtige Konzepte<button data-href="#Key-Concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>In-Memory-Replikate sind als Replikatgruppen organisiert. Jede Replikatgruppe enthält <a href="https://milvus.io/docs/v2.1.x/glossary.md#Sharding">Shard-Replikate</a>. Jedes Shard-Replikat hat ein Streaming-Replikat und ein historisches Replikat, die den wachsenden und versiegelten <a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">Segmenten</a> im Shard entsprechen (d. h. DML-Kanal).</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/replica_group.png" alt="An illustration of how in-memory replica works" class="doc-image" id="an-illustration-of-how-in-memory-replica-works" />
   </span> <span class="img-wrapper"> <span>Ein Beispiel für die Funktionsweise der In-Memory-Replikation</span> </span></p>
<h3 id="Replica-group" class="common-anchor-header">Replikatgruppe</h3><p>Eine Replikatgruppe besteht aus mehreren <a href="https://milvus.io/docs/v2.1.x/four_layers.md#Query-node">Abfrageknoten</a>, die für die Verarbeitung historischer Daten und Replikate zuständig sind.</p>
<h3 id="Shard-replica" class="common-anchor-header">Shard-Replikat</h3><p>Ein Shard-Replikat besteht aus einem Streaming-Replikat und einem historischen Replikat, die beide zu demselben <a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Shard">Shard</a> gehören. Die Anzahl der Shard-Replikate in einer Replikatgruppe wird durch die Anzahl der Shards in einer bestimmten Sammlung bestimmt.</p>
<h3 id="Streaming-replica" class="common-anchor-header">Streaming-Replikat</h3><p>Ein Streaming-Replikat enthält alle <a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">wachsenden Segmente</a> desselben DML-Kanals. Technisch gesehen sollte ein Streaming-Replikat nur von einem Abfrageknoten in einem Replikat bedient werden.</p>
<h3 id="Historical-replica" class="common-anchor-header">Historisches Replikat</h3><p>Ein historisches Replikat enthält alle versiegelten Segmente aus demselben DML-Kanal. Die versiegelten Segmente eines historischen Replikats können auf mehrere Abfrageknoten innerhalb derselben Replikatgruppe verteilt werden.</p>
<h3 id="Shard-leader" class="common-anchor-header">Shard-Leader</h3><p>Ein Shard-Leader ist der Abfrageknoten, der das Streaming-Replikat in einem Shard-Replikat bedient.</p>
<h2 id="Design-Details" class="common-anchor-header">Entwurfsdetails<button data-href="#Design-Details" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Balance" class="common-anchor-header">Balance</h3><p>Ein neues Segment, das geladen werden muss, wird auf mehrere verschiedene Abfrageknoten verteilt. Eine Suchanfrage kann bearbeitet werden, sobald mindestens ein Replikat erfolgreich geladen wurde.</p>
<h3 id="Search" class="common-anchor-header">Suche</h3><h4 id="Cache" class="common-anchor-header">Cache</h4><p>Der Proxy unterhält einen Cache, der die Segmente den Abfrageknoten zuordnet, und aktualisiert ihn in regelmäßigen Abständen. Wenn der Proxy eine Anfrage erhält, holt Milvus alle versiegelten Segmente, die durchsucht werden müssen, aus dem Cache und versucht, sie gleichmäßig den Abfrageknoten zuzuordnen.</p>
<p>Für wachsende Segmente unterhält der Proxy auch einen Channel-to-Query-Node-Cache und sendet Anfragen an die entsprechenden Query-Nodes.</p>
<h4 id="Failover" class="common-anchor-header">Ausfallsicherung</h4><p>Die Caches des Proxys sind nicht immer auf dem neuesten Stand. Einige Segmente oder Kanäle können zu anderen Abfrageknoten verschoben worden sein, wenn eine Anfrage eingeht. In diesem Fall erhält der Proxy eine Fehlerantwort, aktualisiert den Cache und versucht, sie einem anderen Abfrageknoten zuzuordnen.</p>
<p>Ein Segment wird ignoriert, wenn der Proxy es auch nach der Aktualisierung des Caches nicht finden kann. Dies kann der Fall sein, wenn das Segment verdichtet wurde.</p>
<p>Wenn der Cache nicht genau ist, kann der Proxy einige Segmente übersehen. Abfrageknoten mit DML-Kanälen (wachsende Segmente) geben Suchantworten zusammen mit einer Liste zuverlässiger Segmente zurück, mit denen der Proxy vergleichen und den Cache aktualisieren kann.</p>
<h3 id="Enhancement" class="common-anchor-header">Erweiterung</h3><p>Der Proxy kann Suchanfragen nicht vollständig gleichmäßig auf die Abfrageknoten verteilen, und die Abfrageknoten verfügen möglicherweise über unterschiedliche Ressourcen zur Bedienung von Suchanfragen. Um eine langschwänzige Verteilung der Ressourcen zu vermeiden, weist der Proxy aktive Segmente auf anderen Abfrageknoten einem untätigen Abfrageknoten zu, der ebenfalls über diese Segmente verfügt.</p>
