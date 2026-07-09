---
id: woodpecker.md
title: Woodpecker
related_key: Woodpecker
summary: >-
  Erfahren Sie, wie Woodpecker als Standard-Nachrichtenwarteschlange (WAL) in
  Milvus funktioniert und wie Sie es im Embedded- oder Service-Modus ausführen
  können.
---
<h1 id="Woodpecker" class="common-anchor-header">Woodpecker<button data-href="#Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>Woodpecker ist die <strong>Standard-Nachrichtenwarteschlange (Write-Ahead-Log, WAL)</strong> in Milvus 3.x. Es handelt sich um ein cloud-natives WAL, das für den Objektspeicher entwickelt wurde und einen hohen Durchsatz, geringen Betriebsaufwand sowie nahtlose Skalierbarkeit bietet. Details zur Architektur und zu Benchmarks finden Sie unter <a href="/docs/de/woodpecker_architecture.md">Woodpecker</a>.</p>
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
    </button></h2><ul>
<li>In Milvus 3.x ist Woodpecker die <strong>Standard-</strong> WAL/Nachrichtenwarteschlange, die als Protokollierungsdienst geordnete Schreibvorgänge und Wiederherstellung ermöglicht. Ein externer Nachrichtenwarteschlangendienst (wie Pulsar oder Kafka) ist nicht erforderlich.</li>
<li>Woodpecker kann <strong>eingebettet</strong> im Milvus-/Streaming-Knoten (Standard) oder als <strong>dedizierter Dienst</strong> mit eigenen Pods (nur verteilt/Cluster) ausgeführt werden.</li>
<li>Er unterstützt drei Bereitstellungsmodi ( <code translate="no">storage.type</code> ): Objektspeicher (<code translate="no">minio</code>, Standard), lokales Dateisystem (<code translate="no">local</code>) und den dedizierten <a href="#Deployment-modes">Modus</a>( <code translate="no">service</code>). Siehe <a href="#Deployment-modes">„Bereitstellungsmodi</a>“.</li>
</ul>
<h2 id="Quick-start" class="common-anchor-header">Schnellstart<button data-href="#Quick-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Um Woodpecker zu aktivieren, setzen Sie den MQ-Typ auf „Woodpecker“:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<p>Hinweis: Das Umschalten auf „ <code translate="no">mq.type</code> “ bei einem laufenden Cluster ist ein Upgrade-Vorgang. Befolgen Sie die Upgrade-Anleitung sorgfältig und testen Sie die Konfiguration zunächst auf einem neuen Cluster, bevor Sie die Umstellung in der Produktionsumgebung vornehmen.</p>
<h2 id="Configuration" class="common-anchor-header">Konfiguration<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachfolgend finden Sie den vollständigen Woodpecker-Konfigurationsblock (bearbeiten Sie „ <code translate="no">milvus.yaml</code> “ oder überschreiben Sie die Einstellungen in „ <code translate="no">user.yaml</code> “):</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of woodpecker, used to manage Milvus logs of recent mutation operations, output streaming log, and provide embedded log sequential read and write.</span>
<span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">meta:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">etcd</span> <span class="hljs-comment"># The Type of the metadata provider. currently only support etcd.</span>
    <span class="hljs-attr">prefix:</span> <span class="hljs-string">woodpecker</span> <span class="hljs-comment"># The Prefix of the metadata provider. default is woodpecker.</span>
  <span class="hljs-attr">client:</span>
    <span class="hljs-attr">segmentAppend:</span>
      <span class="hljs-attr">queueSize:</span> <span class="hljs-number">10000</span> <span class="hljs-comment"># The size of the queue for pending messages to be sent of each log.</span>
      <span class="hljs-attr">maxRetries:</span> <span class="hljs-number">3</span> <span class="hljs-comment"># Maximum number of retries for segment append operations.</span>
    <span class="hljs-attr">segmentRollingPolicy:</span>
      <span class="hljs-attr">maxSize:</span> <span class="hljs-string">256M</span> <span class="hljs-comment"># Maximum size of a segment.</span>
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-string">10m</span> <span class="hljs-comment"># Maximum interval between two segments, default is 10 minutes.</span>
      <span class="hljs-attr">maxBlocks:</span> <span class="hljs-number">1000</span> <span class="hljs-comment"># Maximum number of blocks in a segment</span>
    <span class="hljs-attr">auditor:</span>
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-string">10s</span> <span class="hljs-comment"># Maximum interval between two auditing operations, default is 10 seconds.</span>
  <span class="hljs-attr">logstore:</span>
    <span class="hljs-attr">segmentSyncPolicy:</span>
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-string">200ms</span> <span class="hljs-comment"># Maximum interval between two sync operations, default is 200 milliseconds.</span>
      <span class="hljs-attr">maxIntervalForLocalStorage:</span> <span class="hljs-string">10ms</span> <span class="hljs-comment"># Maximum interval between two sync operations local storage backend, default is 10 milliseconds.</span>
      <span class="hljs-attr">maxBytes:</span> <span class="hljs-string">256M</span> <span class="hljs-comment"># Maximum size of write buffer in bytes.</span>
      <span class="hljs-attr">maxEntries:</span> <span class="hljs-number">10000</span> <span class="hljs-comment"># Maximum entries number of write buffer.</span>
      <span class="hljs-attr">maxFlushRetries:</span> <span class="hljs-number">5</span> <span class="hljs-comment"># Maximum number of flush retries.</span>
      <span class="hljs-attr">retryInterval:</span> <span class="hljs-string">1000ms</span> <span class="hljs-comment"># Maximum interval between two retries. default is 1000 milliseconds.</span>
      <span class="hljs-attr">maxFlushSize:</span> <span class="hljs-string">2M</span> <span class="hljs-comment"># Maximum size of a fragment in bytes to flush.</span>
      <span class="hljs-attr">maxFlushThreads:</span> <span class="hljs-number">32</span> <span class="hljs-comment"># Maximum number of threads to flush data</span>
    <span class="hljs-attr">segmentCompactionPolicy:</span>
      <span class="hljs-attr">maxSize:</span> <span class="hljs-string">2M</span> <span class="hljs-comment"># The maximum size of the merged files.</span>
      <span class="hljs-attr">maxParallelUploads:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># The maximum number of parallel upload threads for compaction.</span>
      <span class="hljs-attr">maxParallelReads:</span> <span class="hljs-number">8</span> <span class="hljs-comment"># The maximum number of parallel read threads for compaction.</span>
    <span class="hljs-attr">segmentReadPolicy:</span>
      <span class="hljs-attr">maxBatchSize:</span> <span class="hljs-string">16M</span> <span class="hljs-comment"># Maximum size of a batch in bytes.</span>
      <span class="hljs-attr">maxFetchThreads:</span> <span class="hljs-number">32</span> <span class="hljs-comment"># Maximum number of threads to fetch data.</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span> <span class="hljs-comment"># The Type of the storage provider. Valid values: [minio, local]</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">/var/lib/milvus/woodpecker</span> <span class="hljs-comment"># The root path of the storage provider.</span>
<button class="copy-code-btn"></button></code></pre>
<p>Wichtige Hinweise:</p>
<ul>
<li><code translate="no">woodpecker.meta</code>
<ul>
<li><strong>type</strong>: Derzeit wird nur „ <code translate="no">etcd</code> “ unterstützt. Verwenden Sie denselben etcd wie für Milvus, um leichtgewichtige Metadaten zu speichern.</li>
<li><strong>prefix</strong>: Das Schlüsselpräfix für Metadaten. Standard: <code translate="no">woodpecker</code>.</li>
</ul></li>
<li><code translate="no">woodpecker.client</code>
<ul>
<li>Steuert das Verhalten beim Anhängen, Rollieren und Überwachen von Segmenten auf der Client-Seite, um einen Ausgleich zwischen Durchsatz und End-to-End-Latenz zu schaffen.</li>
</ul></li>
<li><code translate="no">woodpecker.logstore</code>
<ul>
<li>Steuert die Richtlinien für Synchronisierung, Flush, Komprimierung und Lesevorgänge bei Log-Segmenten. Dies sind die wichtigsten Einstellmöglichkeiten zur Optimierung von Durchsatz und Latenz.</li>
</ul></li>
<li><code translate="no">woodpecker.storage</code>
<ul>
<li><strong>type</strong>: „ <code translate="no">minio</code> “ für MinIO-/S3-kompatiblen Objektspeicher (MinIO/S3/GCS/OSS usw.); „ <code translate="no">local</code> “ für lokale/gemeinsam genutzte Dateisysteme.</li>
<li><strong>rootPath</strong>: Stammpfad für das Speicher-Backend (gilt für <code translate="no">local</code>; bei <code translate="no">minio</code> werden die Pfade durch Bucket/Präfix vorgegeben).</li>
</ul></li>
</ul>
<h2 id="Deployment-modes" class="common-anchor-header">Bereitstellungsmodi<button data-href="#Deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker unterstützt drei <code translate="no">storage.type</code> -Modi:</p>
<table>
<thead>
<tr><th><code translate="no">storage.type</code></th><th>So funktioniert Woodpecker</th><th>WAL-Backend</th><th>Milvus Standalone</th><th>Milvus Distributed (Cluster)</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio</code> (Standard)</td><td>In den Milvus-/Streaming-Knoten eingebettet</td><td>Objektspeicher (MinIO/S3-kompatibel)</td><td>Unterstützt</td><td>Unterstützt</td></tr>
<tr><td><code translate="no">local</code></td><td>In den Milvus-/Streaming-Knoten integriert</td><td>Lokales Dateisystem</td><td>Unterstützt</td><td>Eingeschränkt (alle Knoten benötigen ein gemeinsames Dateisystem, z. B. NFS)</td></tr>
<tr><td><code translate="no">service</code></td><td><strong>Dedizierter Woodpecker-Dienst</strong> (eigene Pods)</td><td>Objektspeicher (MinIO/S3-kompatibel)</td><td><strong>Nicht unterstützt</strong></td><td>Unterstützt</td></tr>
</tbody>
</table>
<p>Hinweise:</p>
<ul>
<li>Bei „ <code translate="no">minio</code> “ nutzt Woodpecker denselben Objektspeicher wie Milvus (MinIO/S3/GCS/OSS usw.).</li>
<li>Bei „ <code translate="no">local</code> “ ist eine lokale Festplatte mit einem einzigen Knoten nur für den Standalone-Modus geeignet. Wenn alle Pods auf ein gemeinsames Dateisystem (z. B. NFS) zugreifen können, kann im Cluster-Modus auch „ <code translate="no">local</code> “ verwendet werden.</li>
<li><strong><code translate="no">service</code> In diesem Modus wird Woodpecker als separater, unabhängig skalierbarer Dienst ausgeführt und ist nur für verteilte/Cluster-Bereitstellungen verfügbar.</strong> Standalone-Bereitstellungen nutzen die eingebetteten Modi (<code translate="no">minio</code> oder <code translate="no">local</code>).</li>
</ul>
<h2 id="Object-storage-compatibility-for-storagetypeminio" class="common-anchor-header">Kompatibilität mit Objektspeichern für <code translate="no">storage.type=minio</code><button data-href="#Object-storage-compatibility-for-storagetypeminio" class="anchor-icon" translate="no">
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
    </button></h2><p>Die folgende Matrix fasst die derzeit bekannte Kompatibilität von Objektspeicher-Backends zusammen, wenn Woodpecker mit „ <code translate="no">storage.type=minio</code> “ konfiguriert ist. Diese Informationen basieren auf <a href="https://github.com/zilliztech/woodpecker/discussions/150">der GitHub-Diskussion Nr. 150</a>.</p>
<table>
<thead>
<tr><th>Anbieter / Dienst</th><th>Status</th><th>Anmerkungen</th></tr>
</thead>
<tbody>
<tr><td>Azure Blob Storage</td><td>Unterstützt</td><td>Verwendet das native Azure-SDK.</td></tr>
<tr><td>AWS S3</td><td>Unterstützt</td><td>Natives S3 mit vollständiger Unterstützung für bedingtes Schreiben.</td></tr>
<tr><td>MinIO (<code translate="no">&gt;= 2024-12</code>)</td><td>Unterstützt</td><td>Volle Unterstützung für bedingtes Schreiben in S3.</td></tr>
<tr><td>Aliyun OSS</td><td>Unterstützt</td><td>Wird über die S3-kompatible Schnittstelle unterstützt.</td></tr>
<tr><td>Tencent COS</td><td>Unterstützt</td><td>Wird über die S3-kompatible Schnittstelle unterstützt.</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td>Unterstützt</td><td>Wird über den S3-Interoperabilitätsmodus unterstützt.</td></tr>
<tr><td>Huawei Cloud OBS</td><td>Nicht unterstützt</td><td>Die erforderliche Semantik für bedingtes Schreiben fehlt.</td></tr>
<tr><td>VAST Data</td><td>Unterstützt</td><td>Von der Community verifiziert; funktioniert nur mit nicht versionierten Buckets.</td></tr>
<tr><td>Andere S3-kompatible Speicher</td><td>Teilweise</td><td>Hängt von der vollständigen Unterstützung der S3-Semantik für bedingtes Schreiben ab.</td></tr>
</tbody>
</table>
<p>Hinweise:</p>
<ul>
<li>Die Kompatibilität hängt von der nativen SDK-Unterstützung oder der Unterstützung der S3-Semantik für bedingtes Schreiben ab.</li>
<li>Wenn Sie MinIO für Woodpecker selbst hosten, verwenden Sie „ <code translate="no">RELEASE.2024-12-18T13-15-44Z</code> “ oder eine neuere Version.</li>
<li>Diese Matrix spiegelt <a href="https://github.com/zilliztech/woodpecker/discussions/150">den aktuellen Stand der Diskussion</a> wider und kann sich weiterentwickeln, sobald die Backend-Unterstützung weiter validiert wird.</li>
</ul>
<h2 id="Deployment-guides" class="common-anchor-header">Bereitstellungsanleitungen<button data-href="#Deployment-guides" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Milvus-Operator-storageminio" class="common-anchor-header">Woodpecker für einen Milvus-Cluster auf Kubernetes aktivieren (Milvus Operator, storage=minio)<button data-href="#Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Milvus-Operator-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>Starten Sie nach der Installation des <a href="/docs/de/install_cluster-milvusoperator.md">Milvus Operators</a> einen Milvus-Cluster mit aktiviertem Woodpecker anhand des offiziellen Beispiels:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_woodpecker.yaml

<button class="copy-code-btn"></button></code></pre>
<p>Dieses Beispiel konfiguriert Woodpecker als Nachrichtenwarteschlange und aktiviert den Streaming-Knoten. Der erste Start kann einige Zeit in Anspruch nehmen, da Images abgerufen werden müssen; warten Sie, bis alle Pods bereit sind:</p>
<pre><code translate="no" class="language-bash">kubectl get pods
kubectl get milvus my-release -o yaml | grep -A2 status
<button class="copy-code-btn"></button></code></pre>
<p>Sobald alles bereit ist, sollten Sie Pods sehen, die in etwa so aussehen:</p>
<pre><code translate="no">NAME                                               READY   STATUS    RESTARTS   AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-0</span>                                  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-1</span>                                  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-2</span>                                  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datanode<span class="hljs-number">-7</span>f8f88499d<span class="hljs-operator">-</span>kc66r        <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>mixcoord<span class="hljs-number">-7</span>cd7998d<span class="hljs-operator">-</span>x59kg          <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy<span class="hljs-number">-5</span>b56cf8446<span class="hljs-operator">-</span>pbnjm           <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querynode<span class="hljs-number">-0</span><span class="hljs-number">-558</span>d9cdd57<span class="hljs-operator">-</span>sgbfx     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>streamingnode<span class="hljs-number">-58</span>fbfdfdd8<span class="hljs-operator">-</span>vtxfd   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-0</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-1</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-2</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-3</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
<button class="copy-code-btn"></button></code></pre>
<p>Führen Sie den folgenden Befehl aus, um den Milvus-Cluster zu deinstallieren.</p>
<pre><code translate="no" class="language-bash">kubectl delete milvus my-release
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Sie die Woodpecker-Parameter anpassen müssen, befolgen Sie die unter <a href="#Configuration">„Konfiguration“</a> beschriebenen Einstellungen.</p>
<h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Helm-Chart-storageminio" class="common-anchor-header">Woodpecker für einen Milvus-Cluster auf Kubernetes aktivieren (Helm-Chart, storage=minio)<button data-href="#Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Helm-Chart-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>Fügen Sie zunächst das Milvus-Helm-Chart hinzu und aktualisieren Sie es, wie unter <a href="/docs/de/install_cluster-helm.md">„Milvus in Kubernetes mit Helm ausführen“</a> beschrieben.</p>
<p>Führen Sie anschließend die Bereitstellung anhand eines der folgenden Beispiele durch:</p>
<p>– Cluster-Bereitstellung (empfohlene Einstellungen mit aktiviertem Woodpecker und Streaming Node):</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>– Standalone-Bereitstellung (Woodpecker aktiviert):</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> standalone.messageQueue=woodpecker \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Befolgen Sie nach der Bereitstellung die Anweisungen in der Dokumentation zur Portweiterleitung und zum Herstellen einer Verbindung. Um die Woodpecker-Parameter anzupassen, befolgen Sie die unter <a href="#Configuration">„Konfiguration“</a> beschriebenen Einstellungen.</p>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-in-Docker-storagelocal" class="common-anchor-header">Woodpecker für Milvus Standalone in Docker aktivieren (storage=local)<button data-href="#Enable-Woodpecker-for-Milvus-Standalone-in-Docker-storagelocal" class="anchor-icon" translate="no">
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
    </button></h3><p>In Milvus 3.x verwendet die Docker-Standalone-Bereitstellung <strong>standardmäßig</strong> Woodpecker mit dem <strong>lokalen Dateisystem</strong> als WAL-Backend – es ist keine zusätzliche Konfiguration erforderlich. Befolgen Sie die Anweisungen unter <a href="/docs/de/install_standalone-docker.md">„Milvus in Docker ausführen</a>“:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-wp &amp;&amp; <span class="hljs-built_in">cd</span> milvus-wp
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>Um Woodpecker anzupassen, bearbeiten Sie nach dem ersten Start die generierte Datei „ <code translate="no">user.yaml</code> “ und führen Sie „ <code translate="no">bash standalone_embed.sh restart</code> “ aus, um die Änderungen zu übernehmen (ein neuer „ <code translate="no">start</code> “-Befehl generiert „ <code translate="no">user.yaml</code> “ neu, wenden Sie die Änderungen daher mit „ <code translate="no">restart</code> “ an):</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml</span>
<span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">logstore:</span>
    <span class="hljs-attr">segmentSyncPolicy:</span>
      <span class="hljs-attr">maxFlushThreads:</span> <span class="hljs-number">16</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-with-Docker-Compose-storageminio" class="common-anchor-header">Woodpecker für Milvus Standalone mit Docker Compose aktivieren (storage=minio)<button data-href="#Enable-Woodpecker-for-Milvus-Standalone-with-Docker-Compose-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>Befolgen Sie die Anleitung <a href="/docs/de/install_standalone-docker-compose.md">„Milvus mit Docker Compose ausführen</a>“. Beispiel:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-wp-compose &amp;&amp; <span class="hljs-built_in">cd</span> milvus-wp-compose
wget https://github.com/milvus-io/milvus/releases/download/v3.0-beta/milvus-standalone-docker-compose.yml -O docker-compose.yml
<span class="hljs-comment"># By default, the Docker Compose standalone uses Woodpecker</span>
<span class="hljs-built_in">sudo</span> docker compose up -d
<span class="hljs-comment"># If you need to change Woodpecker parameters further, write an override:</span>
docker <span class="hljs-built_in">exec</span> -it milvus-standalone bash -lc <span class="hljs-string">&#x27;cat &gt; /milvus/configs/user.yaml &lt;&lt;EOF
mq:
  type: woodpecker
woodpecker:
  logstore:
    segmentSyncPolicy: 
      maxFlushThreads: 16
  storage:
    type: minio
EOF&#x27;</span>

<span class="hljs-comment"># Restart the container to apply the changes</span>
docker restart milvus-standalone
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-Woodpecker-service-mode-for-a-Milvus-Cluster-Helm" class="common-anchor-header">Woodpecker-Dienstmodus für einen Milvus-Cluster (Helm) aktivieren<button data-href="#Enable-Woodpecker-service-mode-for-a-Milvus-Cluster-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Der Woodpecker-Dienstmodus</strong> ist eine Funktion <strong>von Milvus 3.0</strong>. Bei verteilten/Cluster-Bereitstellungen können Sie Woodpecker als <strong>dedizierten Dienst</strong> (separate Pods) ausführen, anstatt ihn in den Streaming-Knoten einzubetten, indem Sie „ <code translate="no">streaming.woodpecker.embedded=false</code> “ festlegen:</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> woodpecker.image.tag=v0.1.34 \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.woodpecker.embedded=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dadurch wird Woodpecker als dediziertes StatefulSet (<code translate="no">my-release-milvus-woodpecker</code>, standardmäßig 4 Replikate) bereitgestellt, das von einem Headless-Service angeführt wird und über Gossip-Clustering auf den Ports <code translate="no">18080</code> (Service), <code translate="no">17946</code> (Gossip) und <code translate="no">9091</code> (Metriken) läuft, wobei MinIO als Speicher-Backend dient. Der Dienst benötigt ein Quorum von <strong>3</strong> Knoten; die Standardeinstellung von <strong>4</strong> Replikaten gewährleistet das Quorum und toleriert gleichzeitig den Ausfall eines einzelnen Knotens. Stellen Sie „ <code translate="no">woodpecker.replicaCount</code> “ daher nicht auf einen Wert unter 3 ein. Der Cluster umfasst dann einen separaten Satz von „ <code translate="no">woodpecker</code> “-Pods:</p>
<pre><code translate="no"><span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">0</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">1</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">2</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Der „ <code translate="no">service</code> “-Modus von Woodpecker ist ausschließlich für <strong>verteilte/Cluster-</strong> Bereitstellungen vorgesehen – bei eigenständigen Bereitstellungen wird Woodpecker eingebettet ausgeführt (<code translate="no">minio</code> oder <code translate="no">local</code>). Der Milvus Operator unterstützt den „ “-Modus von Woodpecker noch nicht.</p>
</div>
<h2 id="Throughput-tuning-tips" class="common-anchor-header">Tipps zur Durchsatzoptimierung<button data-href="#Throughput-tuning-tips" class="anchor-icon" translate="no">
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
    </button></h2><p>Das Durchsatz- und Latenzprofil von Woodpecker unterscheidet sich zwischen <strong>dem Embedded-Modus</strong> und <strong>dem Service-Modus</strong> (eine Funktion von Milvus 3.0). Die folgenden Hinweise sind nach Modus gegliedert.</p>
<h3 id="Embedded-mode" class="common-anchor-header">Embedded-Modus<button data-href="#Embedded-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Optimieren Sie den End-to-End-Schreibdurchsatz auf der Grundlage der Benchmarks und Backend-Grenzwerte in <a href="/docs/de/woodpecker_architecture.md">Woodpecker</a> unter Berücksichtigung der folgenden Aspekte:</p>
<ul>
<li>Speicherseitig
<ul>
<li><strong>Objektspeicher (MinIO/S3-kompatibel)</strong>: Erhöhen Sie die Parallelität und die Objektgröße (vermeiden Sie sehr kleine Objekte). Achten Sie auf die Bandbreitenbeschränkungen des Netzwerks und der Buckets. Ein einzelner MinIO-Knoten auf einer SSD erreicht lokal oft eine Obergrenze von etwa 100 MB/s; eine einzelne Verbindung von EC2 zu S3 kann GB/s erreichen.</li>
<li><strong>Lokale/gemeinsam genutzte Dateisysteme (lokal)</strong>: Bevorzugen Sie NVMe- oder schnelle Festplatten. Stellen Sie sicher, dass das Dateisystem kleine Schreibvorgänge und die fsync-Latenz gut bewältigt.</li>
</ul></li>
<li>Woodpecker-Einstellungen
<ul>
<li>Erhöhen Sie „ <code translate="no">logstore.segmentSyncPolicy.maxFlushSize</code> “ und „ <code translate="no">maxFlushThreads</code> “, um größere Flush-Vorgänge und eine höhere Parallelität zu erzielen.</li>
<li>Passen Sie „ <code translate="no">maxInterval</code> “ entsprechend den Medieneigenschaften an (tauschen Sie Latenz gegen Durchsatz bei längerer Aggregation ein).</li>
<li>Bei Objektspeichern sollten Sie erwägen, „ <code translate="no">segmentRollingPolicy.maxSize</code> “ zu erhöhen, um Segmentwechsel zu reduzieren.</li>
</ul></li>
<li>Client-/Anwendungsseite
<ul>
<li>Verwenden Sie größere Batch-Größen und mehr gleichzeitige Schreiber/Clients.</li>
<li>Steuern Sie den Zeitpunkt der Aktualisierung/des Indexaufbaus (Batch-Zusammenfassung vor dem Auslösen), um häufige kleine Schreibvorgänge zu vermeiden.</li>
</ul></li>
</ul>
<h3 id="Service-mode-Milvus-30+" class="common-anchor-header">Dienstmodus (Milvus 3.0+)<button data-href="#Service-mode-Milvus-30+" class="anchor-icon" translate="no">
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
    </button></h3><p>Der Dienstmodus bewahrt den hohen Schreibdurchsatz eines auf Objektspeicher basierenden WAL bei und bietet gleichzeitig eine geringe Latenz (siehe <a href="#Latency">„Latenz“</a>). Die oben genannten Optimierungen auf Speicher- und Client-Seite gelten weiterhin; da Woodpecker zudem als eigener Dienst läuft, skalieren Sie die Schreibkapazität horizontal durch Hinzufügen von Replikaten (<code translate="no">woodpecker.replicaCount</code>, Standardwert 4), und Schreibvorgänge profitieren von einer One-RTT-Quorum-Replikation sowie topologiebewussten Lesevorgängen, die eine Weiterleitung durch den Broker vermeiden.</p>
<p><strong>Demo zur Batch-Einfügung</strong> – verwenden Sie Folgendes, um den Schreibdurchsatz zu messen:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> time

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://&lt;Proxy Pod IP&gt;:19530&quot;</span>,
)

<span class="hljs-comment"># 2. Create a collection</span>
res = client.create_collection(
    collection_name=<span class="hljs-string">&quot;test_milvus_wp&quot;</span>,
    dimension=<span class="hljs-number">512</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
    shards_num=<span class="hljs-number">2</span>,
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># 3. Insert randomly generated vectors</span>
colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>]
data = []

batch_size = <span class="hljs-number">1000</span>
batch_count = <span class="hljs-number">2000</span>
<span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(batch_count):
    start_time = time.time()
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserting <span class="hljs-subst">{j}</span>th vectors <span class="hljs-subst">{j * batch_size}</span> startTime<span class="hljs-subst">{start_time}</span>&quot;</span>)
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(batch_size):
        current_color = random.choice(colors)
        data.append({
            <span class="hljs-string">&quot;id&quot;</span>: (j*batch_size + i),
            <span class="hljs-string">&quot;vector&quot;</span>: [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">512</span>) ],
            <span class="hljs-string">&quot;color&quot;</span>: current_color,
            <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">f&quot;<span class="hljs-subst">{current_color}</span>_<span class="hljs-subst">{<span class="hljs-built_in">str</span>(random.randint(<span class="hljs-number">1000</span>, <span class="hljs-number">9999</span>))}</span>&quot;</span>
        })
    res = client.insert(
        collection_name=<span class="hljs-string">&quot;test_milvus_wp&quot;</span>,
        data=data
    )
    data = []
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{j}</span>th vectors endTime:<span class="hljs-subst">{time.time()}</span> costTime:<span class="hljs-subst">{time.time() - start_time}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Latency" class="common-anchor-header">Latenz<button data-href="#Latency" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Embedded-mode" class="common-anchor-header">Embedded-Modus<button data-href="#Embedded-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Woodpecker ist ein cloud-natives WAL, das für Objektspeicher entwickelt wurde und Kompromisse zwischen Durchsatz, Kosten und Latenz eingeht. Der ressourcenschonende Embedded-Modus legt den Schwerpunkt auf Kosten- und Durchsatzoptimierung, da in den meisten Szenarien lediglich gefordert wird, dass Daten innerhalb einer bestimmten Zeit geschrieben werden, anstatt eine niedrige Latenz für einzelne Schreibanfragen zu verlangen. Daher nutzt Woodpecker Batch-Schreibvorgänge mit Standardintervallen von 10 ms für lokale Dateisystem-Speicher-Backends und 200 ms für MinIO-ähnliche Speicher-Backends. Bei langsamen Schreibvorgängen entspricht die maximale Latenz der Intervallzeit zuzüglich der Flush-Zeit.</p>
<p>Beachten Sie, dass das Einfügen von Batches nicht nur durch Zeitintervalle, sondern auch durch die Batchgröße ausgelöst wird, die standardmäßig 2 MB beträgt.</p>
<h3 id="Service-mode-Milvus-30+" class="common-anchor-header">Service-Modus (Milvus 3.0+)<button data-href="#Service-mode-Milvus-30+" class="anchor-icon" translate="no">
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
    </button></h3><p>Der Service-Modus bietet <strong>eine Schreiblatenz im Millisekundenbereich</strong> – in derselben Größenordnung wie ein herkömmliches WAL mit drei Replikaten auf lokalen Festplatten – bei gleichzeitig geringen Kosten. In einer typischen Bereitstellung mit drei Replikaten über mehrere AZs hinweg bleibt die Schreiblatenz im Millisekundenbereich. Dies wird erreicht durch:</p>
<ul>
<li><strong>Quorum-Schreibvorgänge mit einer RTT</strong> – die clientgesteuerte Replikation schließt einen Quorum-Schreibvorgang innerhalb einer einzigen Round-Trip-Zeit ab, wobei der AZ-übergreifende Datenverkehr auf das Datenvolumen von zwei Replikaten begrenzt ist (im Gegensatz zu dem zusätzlichen AZ-übergreifenden Datenverkehr von etwa einem Drittel, der für Broker-/Leader-basierte Replikation typisch ist).</li>
<li><strong>Topologiebewusste Single-Hop-Lesevorgänge</strong> – Jeder Lesevorgang erfolgt direkt an die nächstgelegene Replik, anstatt über einen Broker weitergeleitet zu werden, wodurch die zufälligen AZ-übergreifenden Lesevorgänge (≈2/3 des AZ-übergreifenden Lesedatenverkehrs) von Broker-basierten Systemen vermieden werden.</li>
<li><strong>Sofortiges Hochladen in den Objektspeicher nach Segmentrollover</strong> – jedes Segment verfolgt seinen gesamten Lebenszyklus und wird sofort nach dem Rollover in den Objektspeicher hochgeladen, wodurch der Speicherplatzbedarf auf der lokalen Festplatte und die Speicherkosten gering gehalten werden, ohne dass dabei Kompromisse bei der Latenz eingegangen werden müssen.</li>
<li><strong>Keine kontinuierliche Replikation von Knoten zu Knoten</strong> – Protokolle werden im Objektspeicher als gemeinsamer Speicher persistent gespeichert, sodass beim Failover nur die überlebenden Replikate erneut hochgeladen werden (keine Kopie des gesamten Knotens); die Skalierung ist nicht an die Bandbreite der Replikation zwischen den Knoten gebunden, und der groß angelegte Austausch von Knoten verursacht keine Replikationsstürme.</li>
</ul>
<p>Bei bereichsübergreifenden Bereitstellungen spart der Servicemodus im Vergleich zu Broker-basierten Protokollsystemen zudem etwa <strong>1/3 des Schreib-</strong> und <strong>2/3 des Lese-Netzwerkverkehrs</strong> zwischen den Verfügbarkeitszonen ein. Die vollständige Design- und Kostenanalyse finden Sie unter <a href="/docs/de/woodpecker_architecture.md">„Woodpecker-Architektur</a>“.</p>
<p>Einzelheiten zur Architektur, zu den Bereitstellungsmodi (MemoryBuffer / QuorumBuffer) und zur Leistung finden Sie unter <a href="/docs/de/woodpecker_architecture.md">„Woodpecker-Architektur</a>“.</p>
<p>Weitere Informationen zu den Parametern finden Sie im Woodpecker <a href="https://github.com/zilliztech/woodpecker">-GitHub-Repository</a>.</p>
