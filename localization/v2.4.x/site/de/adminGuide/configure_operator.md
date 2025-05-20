---
id: configure_operator.md
label: Milvus Operator
related_key: Milvus Operator
summary: 'Erfahren Sie, wie Sie Milvus mit Milvus Operator konfigurieren können.'
title: Konfigurieren Sie Milvus mit Milvus Operator
---
<h1 id="Configure-Milvus-with-Milvus-Operator" class="common-anchor-header">Konfigurieren Sie Milvus mit Milvus Operator<button data-href="#Configure-Milvus-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>In einer Produktionsumgebung müssen Sie dem Milvus-Cluster Ressourcen auf der Grundlage des Maschinentyps und der Arbeitslast zuweisen. Sie können die Konfiguration während der Bereitstellung vornehmen oder die Konfigurationen aktualisieren, während der Cluster läuft.</p>
<p>In diesem Thema wird beschrieben, wie Sie einen Milvus-Cluster bei der Installation mit Milvus Operator konfigurieren.</p>
<p>Dieses Thema setzt voraus, dass Sie Milvus Operator installiert haben. Weitere Informationen finden Sie unter <a href="/docs/de/v2.4.x/install_cluster-milvusoperator.md">Einsetzen von Milvus Operator</a>.</p>
<p>Das Konfigurieren eines Milvus-Clusters mit Milvus Operator umfasst:</p>
<ul>
<li>Globale Ressourcenkonfigurationen</li>
<li>Private Ressourcenkonfigurationen</li>
</ul>
<div class="alert note">
Private Ressourcenkonfigurationen überschreiben globale Ressourcenkonfigurationen. Wenn Sie die Ressourcen global konfigurieren und gleichzeitig die private Ressource einer bestimmten Komponente angeben, wird die Komponente priorisiert und reagiert zuerst auf die privaten Konfigurationen.</div>
<h2 id="Configure-global-resources" class="common-anchor-header">Globale Ressourcen konfigurieren<button data-href="#Configure-global-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie Milvus Operator verwenden, um einen Milvus-Cluster zu starten, müssen Sie eine Konfigurationsdatei angeben. In diesem Beispiel wird die Standardkonfigurationsdatei verwendet.</p>
<pre><code translate="no" class="language-yaml">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Die Details der Konfigurationsdatei lauten wie folgt:</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  mode: cluster
  dependencies: {}
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<p>Das Feld <code translate="no">spec.components</code> enthält sowohl die globale als auch die private Ressourcenkonfiguration aller Milvus-Komponenten. Im Folgenden werden vier häufig verwendete Felder zur Konfiguration der globalen Ressource aufgeführt.</p>
<ul>
<li><code translate="no">image</code>: Das verwendete Milvus-Docker-Image.</li>
<li><code translate="no">resources</code>: Die jeder Komponente zugewiesenen Rechenressourcen.</li>
<li><code translate="no">tolerations</code> und <code translate="no">nodeSelector</code>: Die Planungsregeln für jede Milvus-Komponente im K8s-Cluster. Siehe <a href="https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/">Toleranzen</a> und <a href="https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/">nodeSelector</a> für weitere Informationen.</li>
<li><code translate="no">env</code>: Die Umgebungsvariablen.</li>
</ul>
<p>Wenn Sie weitere Felder konfigurieren möchten, lesen Sie die Dokumentation <a href="https://pkg.go.dev/github.com/zilliztech/milvus-operator/apis/milvus.io/v1beta1#ComponentSpec">hier</a>.</p>
<p>Um globale Ressourcen für den Milvus-Cluster zu konfigurieren, erstellen Sie eine <code translate="no">milvuscluster_resource.yaml</code> Datei.</p>
<h3 id="Example" class="common-anchor-header">Beispiel</h3><p>Das folgende Beispiel konfiguriert die globale Ressource für einen Milvus-Cluster.</p>
<pre><code translate="no">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  mode: cluster
  components:
    nodeSelector: {}
    tolerations: {}
    <span class="hljs-built_in">env</span>: {}
    resources:
      limits:
        cpu: <span class="hljs-string">&#x27;4&#x27;</span>
        memory: 8Gi
      requests:
        cpu: 200m
        memory: 512Mi
<button class="copy-code-btn"></button></code></pre>
<p>Führen Sie den folgenden Befehl aus, um die neuen Konfigurationen anzuwenden:</p>
<pre><code translate="no">kubectl apply -f milvuscluster_resource.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Die Cluster-Ressourcen werden entsprechend der Konfigurationsdatei aktualisiert, wenn ein Milvus-Cluster namens <code translate="no">my-release</code> im K8s-Cluster vorhanden ist. Andernfalls wird ein neuer Milvus-Cluster erstellt.</div>
<h2 id="Configure-private-resources" class="common-anchor-header">Private Ressourcen konfigurieren<button data-href="#Configure-private-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Ursprünglich umfasst ein Milvus-Cluster in Milvus 2.0 sieben Komponenten: Proxy, Root Coord, Data Coord, Query Coord, Index Node, Data Node und Query Node. Mit Milvus 2.1.0 wird jedoch eine neue Komponente, Mix Coord, veröffentlicht. Mix Coord umfasst alle Koordinatorenkomponenten. Daher bedeutet das Starten eines Mix-Koordinators, dass Sie keine anderen Koordinatoren, einschließlich Root-Koordinator, Datenkoordinator und Abfragekoordinator, installieren und starten müssen.</p>
<p>Zur Konfiguration der einzelnen Komponenten werden die folgenden Felder verwendet:</p>
<ul>
<li><code translate="no">replica</code>: Die Anzahl der Replikate jeder Komponente.</li>
<li><code translate="no">port</code>: Die Nummer des Listen-Ports der einzelnen Komponenten.</li>
<li>Die vier in der globalen Ressourcenkonfiguration häufig verwendeten Felder: <code translate="no">image</code>, <code translate="no">env</code>, <code translate="no">nodeSelector</code>, <code translate="no">tolerations</code>, <code translate="no">resources</code> (siehe oben). Weitere konfigurierbare Felder finden Sie, wenn Sie auf die einzelnen Komponenten in <a href="https://pkg.go.dev/github.com/zilliztech/milvus-operator/apis/milvus.io/v1beta1#MilvusComponents">dieser Dokumentation</a> klicken.</li>
</ul>
<div class="alert note">
Außerdem gibt es bei der Konfiguration des Proxys ein zusätzliches Feld namens "serviceType". Dieses Feld definiert den Typ des Dienstes, den Milvus im K8s-Cluster bereitstellt.</div>
<p>Um die Ressourcen für eine bestimmte Komponente zu konfigurieren, fügen Sie zuerst den Komponentennamen in das Feld unter <code translate="no">spec.componets</code> ein und konfigurieren dann die privaten Ressourcen.</p>
<div class="filter">
<a href="#component">Komponenten oder Abhängigkeiten</a> <a href="#purpose">Konfigurationszwecke</a> </div>
<div class="filter-component table-wrapper">
<table id="component">
<thead>
  <tr>
    <th>Abhängigkeiten</th>
    <th>Komponenten</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
        <ul>
            <li><a href="/docs/de/v2.4.x/configure_etcd.md">etcd</a></li>
            <li><a href="/docs/de/v2.4.x/configure_minio.md">MinIO oder S3</a></li>
            <li><a href="/docs/de/v2.4.x/configure_pulsar.md">Pulsar</a></li>
            <li><a href="/docs/de/v2.4.x/configure_rocksmq.md">RocksMQ</a></li>
        </ul>
    </td>
    <td>
        <ul>
            <li><a href="/docs/de/v2.4.x/configure_rootcoord.md">Root-Koordinate</a></li>
            <li><a href="/docs/de/v2.4.x/configure_proxy.md">Proxy</a></li>
            <li><a href="/docs/de/v2.4.x/configure_querycoord.md">Abfrage-Koordinate</a></li>
            <li><a href="/docs/de/v2.4.x/configure_querynode.md">Abfrageknoten</a></li>
            <li><a href="/docs/de/v2.4.x/configure_indexnode.md">Index-Knoten</a></li>
            <li><a href="/docs/de/v2.4.x/configure_datacoord.md">Daten-Koordinate</a></li>
            <li><a href="/docs/de/v2.4.x/configure_datanode.md">Daten-Knoten</a></li>
            <li><a href="/docs/de/v2.4.x/configure_localstorage.md">Lokaler Speicher</a></li>
            <li><a href="/docs/de/v2.4.x/configure_log.md">Protokoll</a></li>
            <li><a href="/docs/de/v2.4.x/configure_msgchannel.md">Nachrichtenkanal</a></li>
            <li><a href="/docs/de/v2.4.x/configure_common.md">Gemeinsame</a></li>
            <li><a href="/docs/de/v2.4.x/configure_gpu.md">GPU</a></li>
            <li><a href="/docs/de/v2.4.x/configure_grpc.md">GRPC</a></li>
            <li><a href="/docs/de/v2.4.x/configure_indexcoord.md">Index-Koordinate</a></li>
            <li><a href="/docs/de/v2.4.x/configure_metastore.md">Metaspeicher</a></li>
            <li><a href="/docs/de/v2.4.x/configure_mq.md">Nachrichten-Warteschlange</a></li>
            <li><a href="/docs/de/v2.4.x/configure_natsmq.md">Natsmq</a></li>
            <li><a href="/docs/de/v2.4.x/configure_tikv.md">Tikv</a></li>
            <li><a href="/docs/de/v2.4.x/configure_trace.md">Trace</a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md">Quoten und Limits</a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-purpose table-wrapper">
<table id="purpose">
<thead>
  <tr>
    <th>Zweck</th>
    <th>Parameter</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Leistungsoptimierung</td>
    <td>
        <ul>
            <li><a href="/docs/de/v2.4.x/configure_querynode.md#queryNodegracefulTime"><code translate="no">queryNode.gracefulTime</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_rootcoord.md#rootCoordminSegmentSizeToEnableIndex"><code translate="no">rootCoord.minSegmentSizeToEnableIndex</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_datacoord.md#dataCoordsegmentmaxSize"><code translate="no">dataCoord.segment.maxSize</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_datacoord.md#dataCoordsegmentsealProportion"><code translate="no">dataCoord.segment.sealProportion</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_datanode.md#dataNodeflushinsertBufSize"><code translate="no">dataNode.flush.insertBufSize</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_querycoord.md#queryCoordautoHandoff"><code translate="no">queryCoord.autoHandoff</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_querycoord.md#queryCoordautoBalance"><code translate="no">queryCoord.autoBalance</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_localstorage.md#localStorageenabled"><code translate="no">localStorage.enabled</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Daten und Metadaten</td>
    <td>
        <ul>
            <li><a href="/docs/de/v2.4.x/configure_common.md#commonretentionDuration"><code translate="no">common.retentionDuration</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_rocksmq.md#rocksmqretentionTimeInMinutes"><code translate="no">rocksmq.retentionTimeInMinutes</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_datacoord.md#dataCoordenableCompaction"><code translate="no">dataCoord.enableCompaction</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_datacoord.md#dataCoordenableGarbageCollection"><code translate="no">dataCoord.enableGarbageCollection</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_datacoord.md#dataCoordgcdropTolerance"><code translate="no">dataCoord.gc.dropTolerance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Verwaltung</td>
    <td>
        <ul>
            <li><a href="/docs/de/v2.4.x/configure_log.md#loglevel"><code translate="no">log.level</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_log.md#logfilerootPath"><code translate="no">log.file.rootPath</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_log.md#logfilemaxAge"><code translate="no">log.file.maxAge</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_minio.md#minioaccessKeyID"><code translate="no">minio.accessKeyID</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_minio.md#miniosecretAccessKey"><code translate="no">minio.secretAccessKey</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Quoten und Limits</td>
    <td>
        <ul>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitsmaxCollectionNumPerDB"><code translate="no">quotaAndLimits.limits.maxCollectionNumPerDB</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlenabled"><code translate="no">quotaAndLimits.ddl.enabled</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlcollectionRate"><code translate="no">quotaAndLimits.ddl.collectionRate</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlpartitionRate"><code translate="no">quotaAndLimits.ddl.partitionRate</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsindexRateenabled"><code translate="no">quotaAndLimits.indexRate.enabled</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsindexRatemax"><code translate="no">quotaAndLimits.indexRate.max</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsflushRateenabled"><code translate="no">quotaAndLimits.flushRate.enabled</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsflushmax"><code translate="no">quotaAndLimits.flush.max</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitscompationenabled"><code translate="no">quotaAndLimits.compation.enabled</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitscompactionmax"><code translate="no">quotaAndLimits.compaction.max</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmlenabled"><code translate="no">quotaAndLimits.dml.enabled</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatemax"><code translate="no">quotaAndLimits.dml.insertRate.max</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatecollectionmax"><code translate="no">quotaAndLimits.dml.insertRate.collection.max</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatemax"><code translate="no">quotaAndLimits.dml.deleteRate.max</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatecollectionmax"><code translate="no">quotaAndLimits.dml.deleteRate.collection.max</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlenabled"><code translate="no">quotaAndLimits.dql.enabled</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatemax"><code translate="no">quotaAndLimits.dql.searchRate.max</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatecollectionmax"><code translate="no">quotaAndLimits.dql.searchRate.collection.max</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatemax"><code translate="no">quotaAndLimits.dql.queryRate.max</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatecollectionmax"><code translate="no">quotaAndLimits.dql.queryRate.collection.max</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuotaPerCollection"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuotaPerCollection</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingforceDeny"><code translate="no">quotaAndLimits.limitWriting.forceDeny</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionenabled"><code translate="no">quotaAndLimits.limitReading.queueProtection.enabled</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionnqInQueueThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionqueueLatencyThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingresultProtectionenabled"><code translate="no">quotaAndLimits.limitReading.resultProtection.enabled</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingresultProtectionmaxReadResultRate"><code translate="no">quotaAndLimits.limitReading.resultProtection.maxReadResultRate</code></a></li>
            <li><a href="/docs/de/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingforceDeny"><code translate="no">quotaAndLimits.limitReading.forceDeny</code></a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Example" class="common-anchor-header">Beispiel</h3><p>Das folgende Beispiel konfiguriert die Replikate und Rechenressourcen von Proxy und Datanode in der Datei <code translate="no">milvuscluster.yaml</code>.</p>
<pre><code translate="no">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  mode: cluster
  components:
    resources:
      limits:
        cpu: <span class="hljs-string">&#x27;4&#x27;</span>
        memory: 8Gi
      requests:
        cpu: 200m
        memory: 512Mi
    rootCoord: 
      replicas: 1
      port: 8080
      resources:
        limits:
          cpu: <span class="hljs-string">&#x27;6&#x27;</span>
          memory: <span class="hljs-string">&#x27;10Gi&#x27;</span>
    dataCoord: {}
    queryCoord: {}
    indexCoord: {}
    dataNode: {}
    indexNode: {}
    queryNode: {}
    proxy:
      replicas: 1
      serviceType: ClusterIP
      resources:
        limits:
          cpu: <span class="hljs-string">&#x27;2&#x27;</span>
          memory: 4Gi
        requests:
          cpu: 100m
          memory: 128Mi
  config: {}
  dependencies: {}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Dieses Beispiel konfiguriert nicht nur globale Ressourcen, sondern auch private Rechenressourcen für Root-Koordinator und Proxy. Wenn Sie diese Konfigurationsdatei zum Starten eines Milvus-Clusters verwenden, werden die Konfigurationen der privaten Ressourcen auf Root-Coord und Proxy angewendet, während die übrigen Komponenten der Konfiguration der globalen Ressourcen folgen.</div>
<p>Führen Sie den folgenden Befehl aus, um die neuen Konfigurationen anzuwenden:</p>
<pre><code translate="no">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Wie geht es weiter?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Erfahren Sie, wie Sie die folgenden Milvus-Abhängigkeiten mit Milvus Operator verwalten können:<ul>
<li><a href="/docs/de/v2.4.x/object_storage_operator.md">Konfigurieren Sie Objektspeicher mit Milvus Operator</a></li>
<li><a href="/docs/de/v2.4.x/meta_storage_operator.md">Konfigurieren Sie Meta-Speicher mit Milvus Operator</a></li>
<li><a href="/docs/de/v2.4.x/message_storage_operator.md">Konfigurieren Sie den Nachrichtenspeicher mit Milvus Operator</a></li>
</ul></li>
</ul>
