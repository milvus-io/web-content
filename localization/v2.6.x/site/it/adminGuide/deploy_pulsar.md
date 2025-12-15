---
id: deploy_pulsar.md
title: Configurare l'archiviazione dei messaggi con Docker Compose o Helm
related_key: 'Pulsar, storage'
summary: Imparate a configurare l'archiviazione dei messaggi con Docker Compose o Helm.
---
<h1 id="Configure-Message-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Configurare l'archiviazione dei messaggi con Docker Compose o Helm<button data-href="#Configure-Message-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus utilizza Pulsar o Kafka per la gestione dei log delle modifiche recenti, l'output dei log dei flussi e la fornitura di sottoscrizioni ai log. Pulsar è il sistema di archiviazione dei messaggi predefinito. Questo argomento illustra come configurare l'archiviazione dei messaggi con Docker Compose o Helm.</p>
<p>È possibile configurare Pulsar con <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> o su K8s e configurare Kafka su K8s.</p>
<div class="alert note">
<p><strong>Limitazioni della coda di messaggi</strong>: Quando si effettua l'aggiornamento a Milvus v2.6.7, è necessario mantenere l'attuale scelta della coda di messaggi. Il passaggio da un sistema di code di messaggi all'altro durante l'aggiornamento non è supportato. Il supporto per il cambio di sistemi di code di messaggi sarà disponibile nelle versioni future.</p>
</div>
<h2 id="Configure-Pulsar-with-Docker-Compose" class="common-anchor-header">Configurazione di Pulsar con Docker Compose<button data-href="#Configure-Pulsar-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-Pulsar" class="common-anchor-header">1. Configurare Pulsar<button data-href="#1-Configure-Pulsar" class="anchor-icon" translate="no">
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
    </button></h3><p>Per configurare Pulsar con Docker Compose, fornire i valori della sezione <code translate="no">pulsar</code> nel file <code translate="no">milvus.yaml</code> nel percorso milvus/configs.</p>
<pre><code translate="no"><span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span> <span class="hljs-comment"># Address of pulsar</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of pulsar</span>
  <span class="hljs-attr">maxMessageSize:</span> <span class="hljs-number">5242880</span> <span class="hljs-comment"># 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni, vedere le <a href="/docs/it/configure_pulsar.md">configurazioni relative a Pulsar</a>.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. Eseguire Milvus<button data-href="#2-Run-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Eseguire il seguente comando per avviare Milvus che utilizza le configurazioni di Pulsar.</p>
<pre><code translate="no"><span class="hljs-attribute">docker</span> compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Le configurazioni diventano effettive solo dopo l'avvio di Milvus. Per ulteriori informazioni, vedere <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Avvio di Milvus</a>.</div>
<h2 id="Configure-Pulsar-with-Helm" class="common-anchor-header">Configurare Pulsar con Helm<button data-href="#Configure-Pulsar-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Per i cluster Milvus su K8, è possibile configurare Pulsar con lo stesso comando di avvio di Milvus. In alternativa, è possibile configurare Pulsar utilizzando il file <code translate="no">values.yml</code> nel percorso /charts/milvus nel repository <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> prima di avviare Milvus.</p>
<p>Per i dettagli su come configurare Milvus usando Helm, fare riferimento a <a href="/docs/it/configure-helm.md">Configurare Milvus con i grafici Helm</a>. Per i dettagli sulle voci di configurazione relative a Pulsar, consultare <a href="/docs/it/configure_pulsar.md">Configurazioni relative a Pulsar</a>. |</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Uso del file YAML<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Configurare la sezione <code translate="no">externalConfigFiles</code> nel file <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    pulsar:
      address: localhost # Address of pulsar
      port: 6650 # Port of Pulsar
      webport: 80 # Web port of pulsar, if you connect direcly without proxy, should use 8080
      maxMessageSize: 5242880 # 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.
      tenant: public
      namespace: default    
</span><button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Dopo aver configurato le sezioni precedenti e salvato il file <code translate="no">values.yaml</code>, eseguire il seguente comando per installare Milvus che utilizza le configurazioni di Pulsar.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Woodpecker-with-Helm" class="common-anchor-header">Configurare Woodpecker con Helm<button data-href="#Configure-Woodpecker-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Per i cluster Milvus su K8, è possibile configurare Woodpecker con lo stesso comando che avvia Milvus. In alternativa, è possibile configurare Woodpecker utilizzando il file <code translate="no">values.yml</code> nel percorso /charts/milvus nel repository <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> prima di avviare Milvus.</p>
<p>Per i dettagli su come configurare Milvus usando Helm, consultare <a href="/docs/it/configure-helm.md">Configurazione di Milvus con i grafici Helm</a>. Per i dettagli sulle voci di configurazione relative a Woodpecker, fare riferimento a <a href="/docs/it/use-woodpecker.md">Configurazioni relative a Woodpecker</a>. |</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Uso del file YAML<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Configurare la sezione <code translate="no">externalConfigFiles</code> nel file <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    woodpecker:
      meta:
        type: etcd # The Type of the metadata provider. currently only support etcd.
        prefix: woodpecker # The Prefix of the metadata provider. default is woodpecker.
      client:
        segmentAppend:
          queueSize: 10000 # The size of the queue for pending messages to be sent of each log.
          maxRetries: 3 # Maximum number of retries for segment append operations.
        segmentRollingPolicy:
          maxSize: 256M # Maximum size of a segment.
          maxInterval: 10m # Maximum interval between two segments, default is 10 minutes.
          maxBlocks: 1000 # Maximum number of blocks in a segment
        auditor:
          maxInterval: 10s # Maximum interval between two auditing operations, default is 10 seconds.
      logstore:
        segmentSyncPolicy:
          maxInterval: 200ms # Maximum interval between two sync operations, default is 200 milliseconds.
          maxIntervalForLocalStorage: 10ms # Maximum interval between two sync operations local storage backend, default is 10 milliseconds.
          maxBytes: 256M # Maximum size of write buffer in bytes.
          maxEntries: 10000 # Maximum entries number of write buffer.
          maxFlushRetries: 5 # Maximum size of write buffer in bytes.
          retryInterval: 1000ms # Maximum interval between two retries. default is 1000 milliseconds.
          maxFlushSize: 2M # Maximum size of a fragment in bytes to flush.
          maxFlushThreads: 32 # Maximum number of threads to flush data
        segmentCompactionPolicy:
          maxSize: 2M # The maximum size of the merged files.
          maxParallelUploads: 4 # The maximum number of parallel upload threads for compaction.
          maxParallelReads: 8 # The maximum number of parallel read threads for compaction.
        segmentReadPolicy:
          maxBatchSize: 16M # Maximum size of a batch in bytes.
          maxFetchThreads: 32 # Maximum number of threads to fetch data.
      storage:
        type: minio # The Type of the storage provider. Valid values: [minio, local]
        rootPath: /var/lib/milvus/woodpecker # The root path of the storage provider.    
</span><button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Dopo aver configurato le sezioni precedenti e salvato il file <code translate="no">values.yaml</code>, eseguire il seguente comando per installare Milvus che utilizza le configurazioni di Woodpecker.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka-with-Helm" class="common-anchor-header">Configurare Kafka con Helm<button data-href="#Configure-Kafka-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Per i cluster Milvus su K8s, è possibile configurare Kafka con lo stesso comando che avvia Milvus. In alternativa, è possibile configurare Kafka utilizzando il file <code translate="no">values.yml</code> nel percorso /charts/milvus nel repository <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> prima di avviare Milvus.</p>
<p>Per i dettagli su come configurare Milvus usando Helm, fare riferimento a <a href="/docs/it/configure-helm.md">Configurare Milvus con i grafici Helm</a>. Per i dettagli sulle voci di configurazione relative a Pulsar, fare riferimento a <a href="/docs/it/configure_pulsar.md">Configurazioni relative a Pulsar</a>.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Uso del file YAML<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Configurare la sezione <code translate="no">externalConfigFiles</code> nel file <code translate="no">values.yaml</code> se si desidera utilizzare Kafka come sistema di archiviazione dei messaggi.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    kafka:
      brokerList:
        -  &lt;your_kafka_address&gt;:&lt;your_kafka_port&gt;
      saslUsername:
      saslPassword:
      saslMechanisms: PLAIN
      securityProtocol: SASL_SSL    
</span><button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Dopo aver configurato le sezioni precedenti e salvato il file <code translate="no">values.yaml</code>, eseguire il seguente comando per installare Milvus che utilizza le configurazioni di Kafka.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-RocksMQ-with-Helm" class="common-anchor-header">Configurare RocksMQ con Helm<button data-href="#Configure-RocksMQ-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus standalone utilizza RocksMQ come archivio messaggi predefinito. Per i passi dettagliati su come configurare Milvus con Helm, fate riferimento a <a href="/docs/it/configure-helm.md">Configurare Milvus con i grafici di Helm</a>. Per i dettagli sulle voci di configurazione relative a RocksMQ, fate riferimento a <a href="/docs/it/configure_rocksmq.md">Configurazioni relative a RocksMQ</a>.</p>
<ul>
<li><p>Se si avvia Milvus con RocksMQ e si vogliono modificare le sue impostazioni, si può eseguire <code translate="no">helm upgrade -f</code> con le impostazioni modificate nel seguente file YAML.</p></li>
<li><p>Se avete installato Milvus standalone usando Helm con un message store diverso da RocksMQ e volete tornare a RocksMQ, eseguite <code translate="no">helm upgrade -f</code> con il seguente file YAML dopo aver scaricato tutte le collezioni e fermato Milvus.</p></li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    rocksmq:
      # The path where the message is stored in rocksmq
      # please adjust in embedded Milvus: /tmp/milvus/rdb_data
      path: /var/lib/milvus/rdb_data
      lrucacheratio: 0.06 # rocksdb cache memory ratio
      rocksmqPageSize: 67108864 # 64 MB, 64 * 1024 * 1024 bytes, The size of each page of messages in rocksmq
      retentionTimeInMinutes: 4320 # 3 days, 3 * 24 * 60 minutes, The retention time of the message in rocksmq.
      retentionSizeInMB: 8192 # 8 GB, 8 * 1024 MB, The retention size of the message in rocksmq.
      compactionInterval: 86400 # 1 day, trigger rocksdb compaction every day to remove deleted data
      # compaction compression type, only support use 0,7.
      # 0 means not compress, 7 will use zstd
      # len of types means num of rocksdb level.
      compressionTypes: [0, 0, 7, 7, 7]    
</span><button class="copy-code-btn"></button></code></pre>
<div class="alert warning">
<p>La modifica dell'archivio messaggi non è consigliata. Se si desidera farlo, interrompere tutte le operazioni DDL, quindi richiamare l'API FlushAll per eseguire il flush di tutte le collezioni e infine arrestare Milvus alla fine, prima di cambiare effettivamente l'archivio dei messaggi.</p>
</div>
<h2 id="Configure-NATS-with-Helm" class="common-anchor-header">Configurare NATS con Helm<button data-href="#Configure-NATS-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>NATS è un archivio di messaggi sperimentale alternativo a RocksMQ. Per informazioni dettagliate su come configurare Milvus con Helm, consultare <a href="/docs/it/configure-helm.md">Configurare Milvus con i grafici di Helm</a>. Per i dettagli sulle voci di configurazione relative a RocksMQ, fate riferimento a <a href="/docs/it/configure_natsmq.md">Configurazioni relative a NATS</a>.</p>
<ul>
<li><p>Se si avvia Milvus con NATS e si vogliono modificare le sue impostazioni, si può eseguire <code translate="no">helm upgrade -f</code> con le impostazioni modificate nel seguente file YAML.</p></li>
<li><p>Se avete installato Milvus standalone con un message store diverso da NATS e volete cambiarlo con NATS, eseguite <code translate="no">helm upgrade -f</code> con il seguente file YAML dopo aver scaricato tutte le collezioni e fermato Milvus.</p></li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    mq:
      type: natsmq
    natsmq:
      # server side configuration for natsmq.
      server: 
        # 4222 by default, Port for nats server listening.
        port: 4222 
        # /var/lib/milvus/nats by default, directory to use for JetStream storage of nats.
        storeDir: /var/lib/milvus/nats 
        # (B) 16GB by default, Maximum size of the &#x27;file&#x27; storage.
        maxFileStore: 17179869184 
        # (B) 8MB by default, Maximum number of bytes in a message payload.
        maxPayload: 8388608 
        # (B) 64MB by default, Maximum number of bytes buffered for a connection applies to client connections.
        maxPending: 67108864 
        # (√ms) 4s by default, waiting for initialization of natsmq finished.
        initializeTimeout: 4000 
        monitor:
          # false by default, If true enable debug log messages.
          debug: false 
          # true by default, If set to false, log without timestamps.
          logTime: true 
          # no log file by default, Log file path relative to.. .
          logFile: 
          # (B) 0, unlimited by default, Size in bytes after the log file rolls over to a new one.
          logSizeLimit: 0 
        retention:
          # (min) 3 days by default, Maximum age of any message in the P-channel.
          maxAge: 4320 
          # (B) None by default, How many bytes the single P-channel may contain. Removing oldest messages if the P-channel exceeds this size.
          maxBytes:
          # None by default, How many message the single P-channel may contain. Removing oldest messages if the P-channel exceeds this limit.    
          maxMsgs: 
</span><button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Scegliere tra RocksMQ e NATS?</strong></p>
<p>RockMQ usa CGO per interagire con RocksDB e gestisce la memoria da solo, mentre il NATS puro di Go incorporato nell'installazione di Milvus delega la gestione della memoria al garbage collector (GC) di Go.</p>
<p>Nello scenario in cui il pacchetto di dati è più piccolo di 64 kb, RocksDB ha prestazioni migliori in termini di utilizzo della memoria, della CPU e del tempo di risposta. D'altra parte, se il pacchetto di dati è superiore a 64 kb, NATS eccelle in termini di tempo di risposta con una memoria sufficiente e una pianificazione GC ideale.</p>
<p>Attualmente, si consiglia di utilizzare NATS solo per esperimenti.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Il prossimo passo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Scoprite come configurare le altre dipendenze di Milvus con Docker Compose o Helm:</p>
<ul>
<li><a href="/docs/it/deploy_s3.md">Configurazione dell'archiviazione degli oggetti con Docker Compose o Helm</a></li>
<li><a href="/docs/it/deploy_etcd.md">Configurazione del Meta Storage con Docker Compose o Helm</a></li>
</ul>
