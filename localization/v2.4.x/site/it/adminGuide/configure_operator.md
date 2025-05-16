---
id: configure_operator.md
label: Milvus Operator
related_key: Milvus Operator
summary: Imparate a configurare Milvus con Milvus Operator.
title: Configurare Milvus con Milvus Operator
---
<h1 id="Configure-Milvus-with-Milvus-Operator" class="common-anchor-header">Configurazione di Milvus con Milvus Operator<button data-href="#Configure-Milvus-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>In un ambiente di produzione, è necessario allocare le risorse al cluster Milvus in base al tipo di macchina e al carico di lavoro. È possibile configurare durante la distribuzione o aggiornare le configurazioni mentre il cluster è in funzione.</p>
<p>Questo argomento illustra come configurare un cluster Milvus quando lo si installa con Milvus Operator.</p>
<p>Questo argomento presuppone che sia stato distribuito Milvus Operator. Per ulteriori informazioni, vedere <a href="/docs/it/v2.4.x/install_cluster-milvusoperator.md">Distribuzione di Milvus Operator</a>.</p>
<p>La configurazione di un cluster Milvus con Milvus Operator comprende:</p>
<ul>
<li>Configurazioni globali delle risorse</li>
<li>Configurazioni di risorse private</li>
</ul>
<div class="alert note">
Le configurazioni delle risorse private sovrascrivono le configurazioni delle risorse globali. Se si configurano le risorse a livello globale e si specifica contemporaneamente la risorsa privata di un certo componente, il componente darà la priorità e risponderà prima alle configurazioni private.</div>
<h2 id="Configure-global-resources" class="common-anchor-header">Configurazione delle risorse globali<button data-href="#Configure-global-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando si usa Milvus Operator per avviare un cluster Milvus, è necessario specificare un file di configurazione. L'esempio qui riportato utilizza il file di configurazione predefinito.</p>
<pre><code translate="no" class="language-yaml">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>I dettagli del file di configurazione sono i seguenti:</p>
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
<p>Il campo <code translate="no">spec.components</code> include la configurazione delle risorse globali e private di tutti i componenti di Milvus. Di seguito sono riportati i quattro campi comunemente utilizzati per configurare le risorse globali.</p>
<ul>
<li><code translate="no">image</code>: L'immagine docker Milvus utilizzata.</li>
<li><code translate="no">resources</code>: Le risorse di calcolo assegnate a ciascun componente.</li>
<li><code translate="no">tolerations</code> e <code translate="no">nodeSelector</code>: le regole di pianificazione di ciascun componente Milvus nel cluster K8s. Per ulteriori informazioni, vedere <a href="https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/">tolleranze</a> e <a href="https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/">nodeSelector</a>.</li>
<li><code translate="no">env</code>: Le variabili d'ambiente.</li>
</ul>
<p>Se si desidera configurare altri campi, consultare la documentazione <a href="https://pkg.go.dev/github.com/zilliztech/milvus-operator/apis/milvus.io/v1beta1#ComponentSpec">qui</a>.</p>
<p>Per configurare una risorsa globale per il cluster Milvus, creare un file <code translate="no">milvuscluster_resource.yaml</code>.</p>
<h3 id="Example" class="common-anchor-header">Esempio</h3><p>L'esempio seguente configura la risorsa globale per un cluster Milvus.</p>
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
<p>Eseguire il comando seguente per applicare le nuove configurazioni:</p>
<pre><code translate="no">kubectl apply -f milvuscluster_resource.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Le risorse del cluster verranno aggiornate in base al file di configurazione se nel cluster K8s è presente un cluster Milvus chiamato <code translate="no">my-release</code>. Altrimenti, verrà creato un nuovo cluster Milvus.</div>
<h2 id="Configure-private-resources" class="common-anchor-header">Configurare le risorse private<button data-href="#Configure-private-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Originariamente, in Milvus 2.0, un cluster Milvus comprendeva sette componenti: proxy, root coord, data coord, query coord, index node, data node e query node. Tuttavia, con Milvus 2.1.0 viene rilasciato un nuovo componente, mix coord. Mix coord include tutti i componenti del coordinatore. Pertanto, avviare un mix coord significa che non è necessario installare e avviare altri coordinatori, tra cui root coord, data coord e query coord.</p>
<p>I campi comuni utilizzati per configurare ciascun componente includono:</p>
<ul>
<li><code translate="no">replica</code>: Il numero di repliche di ciascun componente.</li>
<li><code translate="no">port</code>: Il numero della porta di ascolto di ciascun componente.</li>
<li>I quattro campi comunemente usati nella configurazione globale delle risorse: <code translate="no">image</code>, <code translate="no">env</code>, <code translate="no">nodeSelector</code>, <code translate="no">tolerations</code>, <code translate="no">resources</code> (vedere sopra). Per ulteriori campi configurabili, fare clic su ciascun componente in <a href="https://pkg.go.dev/github.com/zilliztech/milvus-operator/apis/milvus.io/v1beta1#MilvusComponents">questa documentazione</a>.</li>
</ul>
<div class="alert note">
Inoltre, quando si configura il proxy, c'è un campo aggiuntivo chiamato `serviceType`. Questo campo definisce il tipo di servizio che Milvus fornisce nel cluster K8s.</div>
<p>Per configurare le risorse di un componente specifico, aggiungere prima il nome del componente nel campo <code translate="no">spec.componets</code> e poi configurare le sue risorse private.</p>
<div class="filter">
<a href="#component">Componenti o dipendenze</a> <a href="#purpose">Scopo della configurazione</a> </div>
<div class="filter-component table-wrapper">
<table id="component">
<thead>
  <tr>
    <th>Dipendenze</th>
    <th>Componenti</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
        <ul>
            <li><a href="/docs/it/v2.4.x/configure_etcd.md">etcd</a></li>
            <li><a href="/docs/it/v2.4.x/configure_minio.md">MinIO o S3</a></li>
            <li><a href="/docs/it/v2.4.x/configure_pulsar.md">Pulsar</a></li>
            <li><a href="/docs/it/v2.4.x/configure_rocksmq.md">RocksMQ</a></li>
        </ul>
    </td>
    <td>
        <ul>
            <li><a href="/docs/it/v2.4.x/configure_rootcoord.md">Coordinamento delle radici</a></li>
            <li><a href="/docs/it/v2.4.x/configure_proxy.md">Proxy</a></li>
            <li><a href="/docs/it/v2.4.x/configure_querycoord.md">Coordinamento dell'interrogazione</a></li>
            <li><a href="/docs/it/v2.4.x/configure_querynode.md">Nodo di interrogazione</a></li>
            <li><a href="/docs/it/v2.4.x/configure_indexnode.md">Nodo indice</a></li>
            <li><a href="/docs/it/v2.4.x/configure_datacoord.md">Coordinamento dati</a></li>
            <li><a href="/docs/it/v2.4.x/configure_datanode.md">Nodo dati</a></li>
            <li><a href="/docs/it/v2.4.x/configure_localstorage.md">Memorizzazione locale</a></li>
            <li><a href="/docs/it/v2.4.x/configure_log.md">Registro</a></li>
            <li><a href="/docs/it/v2.4.x/configure_msgchannel.md">Canale dei messaggi</a></li>
            <li><a href="/docs/it/v2.4.x/configure_common.md">Comune</a></li>
            <li><a href="/docs/it/v2.4.x/configure_gpu.md">GPU</a></li>
            <li><a href="/docs/it/v2.4.x/configure_grpc.md">GRPC</a></li>
            <li><a href="/docs/it/v2.4.x/configure_indexcoord.md">Indice coord</a></li>
            <li><a href="/docs/it/v2.4.x/configure_metastore.md">Metastore</a></li>
            <li><a href="/docs/it/v2.4.x/configure_mq.md">Coda di messaggi</a></li>
            <li><a href="/docs/it/v2.4.x/configure_natsmq.md">Natsmq</a></li>
            <li><a href="/docs/it/v2.4.x/configure_tikv.md">Tikv</a></li>
            <li><a href="/docs/it/v2.4.x/configure_trace.md">Traccia</a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md">Quote e limiti</a></li>
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
    <th>Scopo</th>
    <th>Parametri</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Messa a punto delle prestazioni</td>
    <td>
        <ul>
            <li><a href="/docs/it/v2.4.x/configure_querynode.md#queryNodegracefulTime"><code translate="no">queryNode.gracefulTime</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_rootcoord.md#rootCoordminSegmentSizeToEnableIndex"><code translate="no">rootCoord.minSegmentSizeToEnableIndex</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_datacoord.md#dataCoordsegmentmaxSize"><code translate="no">dataCoord.segment.maxSize</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_datacoord.md#dataCoordsegmentsealProportion"><code translate="no">dataCoord.segment.sealProportion</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_datanode.md#dataNodeflushinsertBufSize"><code translate="no">dataNode.flush.insertBufSize</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_querycoord.md#queryCoordautoHandoff"><code translate="no">queryCoord.autoHandoff</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_querycoord.md#queryCoordautoBalance"><code translate="no">queryCoord.autoBalance</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_localstorage.md#localStorageenabled"><code translate="no">localStorage.enabled</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Dati e meta</td>
    <td>
        <ul>
            <li><a href="/docs/it/v2.4.x/configure_common.md#commonretentionDuration"><code translate="no">common.retentionDuration</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_rocksmq.md#rocksmqretentionTimeInMinutes"><code translate="no">rocksmq.retentionTimeInMinutes</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_datacoord.md#dataCoordenableCompaction"><code translate="no">dataCoord.enableCompaction</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_datacoord.md#dataCoordenableGarbageCollection"><code translate="no">dataCoord.enableGarbageCollection</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_datacoord.md#dataCoordgcdropTolerance"><code translate="no">dataCoord.gc.dropTolerance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Amministrazione</td>
    <td>
        <ul>
            <li><a href="/docs/it/v2.4.x/configure_log.md#loglevel"><code translate="no">log.level</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_log.md#logfilerootPath"><code translate="no">log.file.rootPath</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_log.md#logfilemaxAge"><code translate="no">log.file.maxAge</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_minio.md#minioaccessKeyID"><code translate="no">minio.accessKeyID</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_minio.md#miniosecretAccessKey"><code translate="no">minio.secretAccessKey</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Quote e limiti</td>
    <td>
        <ul>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitsmaxCollectionNumPerDB"><code translate="no">quotaAndLimits.limits.maxCollectionNumPerDB</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlenabled"><code translate="no">quotaAndLimits.ddl.enabled</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlcollectionRate"><code translate="no">quotaAndLimits.ddl.collectionRate</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlpartitionRate"><code translate="no">quotaAndLimits.ddl.partitionRate</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsindexRateenabled"><code translate="no">quotaAndLimits.indexRate.enabled</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsindexRatemax"><code translate="no">quotaAndLimits.indexRate.max</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsflushRateenabled"><code translate="no">quotaAndLimits.flushRate.enabled</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsflushmax"><code translate="no">quotaAndLimits.flush.max</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitscompationenabled"><code translate="no">quotaAndLimits.compation.enabled</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitscompactionmax"><code translate="no">quotaAndLimits.compaction.max</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmlenabled"><code translate="no">quotaAndLimits.dml.enabled</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatemax"><code translate="no">quotaAndLimits.dml.insertRate.max</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatecollectionmax"><code translate="no">quotaAndLimits.dml.insertRate.collection.max</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatemax"><code translate="no">quotaAndLimits.dml.deleteRate.max</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatecollectionmax"><code translate="no">quotaAndLimits.dml.deleteRate.collection.max</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlenabled"><code translate="no">quotaAndLimits.dql.enabled</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatemax"><code translate="no">quotaAndLimits.dql.searchRate.max</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatecollectionmax"><code translate="no">quotaAndLimits.dql.searchRate.collection.max</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatemax"><code translate="no">quotaAndLimits.dql.queryRate.max</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatecollectionmax"><code translate="no">quotaAndLimits.dql.queryRate.collection.max</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuotaPerCollection"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuotaPerCollection</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingforceDeny"><code translate="no">quotaAndLimits.limitWriting.forceDeny</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionenabled"><code translate="no">quotaAndLimits.limitReading.queueProtection.enabled</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionnqInQueueThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionqueueLatencyThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingresultProtectionenabled"><code translate="no">quotaAndLimits.limitReading.resultProtection.enabled</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingresultProtectionmaxReadResultRate"><code translate="no">quotaAndLimits.limitReading.resultProtection.maxReadResultRate</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingforceDeny"><code translate="no">quotaAndLimits.limitReading.forceDeny</code></a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Example" class="common-anchor-header">Esempio</h3><p>L'esempio seguente configura le repliche e le risorse di calcolo del proxy e del datanode nel file <code translate="no">milvuscluster.yaml</code>.</p>
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
Questo esempio configura non solo le risorse globali ma anche le risorse di calcolo private per root coord e proxy. Quando si usa questo file di configurazione per avviare un cluster Milvus, le configurazioni delle risorse private saranno applicate a root coord e proxy, mentre il resto dei componenti seguirà la configurazione delle risorse globali.</div>
<p>Eseguire il seguente comando per applicare le nuove configurazioni:</p>
<pre><code translate="no">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Cosa succede dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Imparate a gestire le seguenti dipendenze di Milvus con Milvus Operator:<ul>
<li><a href="/docs/it/v2.4.x/object_storage_operator.md">Configurare l'archiviazione degli oggetti con Milvus Operator</a></li>
<li><a href="/docs/it/v2.4.x/meta_storage_operator.md">Configurare il Meta Storage con Milvus Operator</a></li>
<li><a href="/docs/it/v2.4.x/message_storage_operator.md">Configurare l'archiviazione dei messaggi con Milvus Operator</a></li>
</ul></li>
</ul>
