---
id: configure-helm.md
label: Helm
related_key: configure
summary: Configurare Milvus con le carte di Helm.
title: Configurare Milvus con i grafici di Helm
---
<h1 id="Configure-Milvus-with-Helm-Charts" class="common-anchor-header">Configurazione di Milvus con Helm Charts<button data-href="#Configure-Milvus-with-Helm-Charts" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento descrive come configurare i componenti di Milvus e le sue dipendenze di terze parti con Helm Charts.</p>
<div class="alert note">
Nella versione attuale, tutti i parametri hanno effetto solo dopo il riavvio di Milvus.</div>
<h2 id="Configure-Milvus-via-configuration-file" class="common-anchor-header">Configurazione di Milvus tramite file di configurazione<button data-href="#Configure-Milvus-via-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile configurare Milvus con un file di configurazione <code translate="no">values.yaml</code>.</p>
<h3 id="Download-a-configuration-file" class="common-anchor-header">Scaricare un file di configurazione</h3><p><a href="https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml">Scaricare</a> <code translate="no">values.yaml</code> direttamente o con il seguente comando.</p>
<pre><code translate="no">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Modify-the-configuration-file" class="common-anchor-header">Modificare il file di configurazione</h3><p>Configurate la vostra istanza di Milvus per adattarla ai vostri scenari applicativi regolando i parametri corrispondenti in <code translate="no">values.yaml</code>.</p>
<p>In particolare, cercate <code translate="no">extraConfigFiles</code> in <code translate="no">values.yaml</code> e inserite le vostre configurazioni in questa sezione come segue:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Extra configs for milvus.yaml</span>
<span class="hljs-comment"># If set, this config will merge into milvus.yaml</span>
<span class="hljs-comment"># Please follow the config structure in the milvus.yaml</span>
<span class="hljs-comment"># at https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml</span>
<span class="hljs-comment"># Note: this config will be the top priority which will override the config</span>
<span class="hljs-comment"># in the image and helm chart.</span>
extraConfigFiles:
  user.yaml: |+
    <span class="hljs-comment">#    For example to set the graceful time for query nodes</span>
    <span class="hljs-comment">#    queryNodes:</span>
    <span class="hljs-comment">#      gracefulTime: 10</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni su ciascun parametro, consultare i seguenti link.</p>
<p>Ordinati per:</p>
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
    <td>Quota e limiti</td>
    <td>
        <ul>
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
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatemax"><code translate="no">quotaAndLimits.dml.deleteRate.max</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlenabled"><code translate="no">quotaAndLimits.dql.enabled</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatemax"><code translate="no">quotaAndLimits.dql.searchRate.max</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatemax"><code translate="no">quotaAndLimits.dql.queryRate.max</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
            <li><a href="/docs/it/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
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
<p>Per altri parametri specifici dell'installazione di Kubernetes, vedere <a href="https://github.com/milvus-io/milvus-helm/tree/master/charts/milvus#configuration">Configurazione del diagramma di Milvus Helm</a>.</p>
<h3 id="Start-Milvus" class="common-anchor-header">Avviare Milvus</h3><p>Una volta terminata la modifica del file di configurazione, è possibile avviare Milvus con il file.</p>
<pre><code translate="no">$ helm upgrade my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Milvus-via-command-line" class="common-anchor-header">Configurare Milvus tramite riga di comando<button data-href="#Configure-Milvus-via-command-line" class="anchor-icon" translate="no">
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
    </button></h2><p>In alternativa, è possibile aggiornare le configurazioni di Milvus direttamente con il comando Helm.</p>
<h3 id="Check-the-configurable-parameters" class="common-anchor-header">Controllare i parametri configurabili</h3><p>Prima dell'aggiornamento, è possibile controllare i parametri configurabili con i grafici di Helm.</p>
<pre><code translate="no">$ helm show values milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h3 id="Start-Milvus" class="common-anchor-header">Avviare Milvus</h3><p>Configurare e avviare Milvus aggiungendo <code translate="no">--values</code> o <code translate="no">--set</code> al comando di aggiornamento.</p>
<pre><code translate="no"><span class="hljs-comment"># For instance, upgrade the Milvus cluster with compaction disabled</span>
$ helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> dataCoord.enableCompaction=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Cosa fare dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Se volete imparare a monitorare i servizi Milvus e a creare avvisi:</p>
<ul>
<li>Imparare a <a href="/docs/it/v2.4.x/monitor.md">monitorare Milvus con Prometheus Operator su Kubernetes</a>.</li>
<li>Imparare a <a href="/docs/it/v2.4.x/visualize.md">visualizzare le metriche di Milvus in Grafana</a>.</li>
</ul></li>
<li><p>Se cercate istruzioni su come allocare le risorse:</p>
<ul>
<li><a href="/docs/it/v2.4.x/allocate.md#standalone">Allocare le risorse su Kubernetes</a></li>
</ul></li>
</ul>
