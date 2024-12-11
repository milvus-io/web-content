---
id: deploy-cdc-server.md
order: 2
summary: >-
  Questa guida fornisce una procedura passo-passo per la distribuzione di un
  server Milvus-CDC.
title: Distribuzione del server CDC
---
<h1 id="Deploy-CDC-Server" class="common-anchor-header">Distribuzione del server CDC<button data-href="#Deploy-CDC-Server" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa guida fornisce una procedura passo-passo per la distribuzione di un server Milvus-CDC.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Prima di distribuire un server Milvus-CDC, assicuratevi che siano soddisfatte le seguenti condizioni:</p>
<ul>
<li><p><strong>Istanze Milvus</strong>: Sia il Milvus di origine che almeno un Milvus di destinazione devono essere distribuiti e operativi.</p>
<ul>
<li><p>Entrambe le versioni di Milvus di origine e di destinazione devono essere 2.3.2 o superiori, preferibilmente 2.4.x. Si consiglia di utilizzare la stessa versione per Milvus di origine e di destinazione per garantire la compatibilità.</p></li>
<li><p>Impostare la configurazione <code translate="no">common.ttMsgEnabled</code> del Milvus di destinazione su <code translate="no">false</code>.</p></li>
<li><p>Configurare il Milvus di origine e quello di destinazione con impostazioni distinte per la memorizzazione dei meta e dei messaggi, per evitare conflitti. Ad esempio, evitare di usare le stesse configurazioni etcd e rootPath, nonché servizi Pulsar e <code translate="no">chanNamePrefix</code> identici in più istanze Milvus.</p></li>
</ul></li>
<li><p><strong>Metastore</strong>: Preparare un database etcd o MySQL per il metastore Milvus-CDC.</p></li>
</ul>
<h2 id="Steps" class="common-anchor-header">Passi<button data-href="#Steps" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Obtain-the-Milvus-CDC-config-file" class="common-anchor-header">Ottenere il file di configurazione di Milvus-CDC</h3><p>Clonare il <a href="https://github.com/zilliztech/milvus-cdc">repo Milvus-CDC</a> e navigare nella directory <code translate="no">milvus-cdc/server/configs</code> per accedere al file di configurazione <code translate="no">cdc.yaml</code>.</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/milvus-cdc.git

<span class="hljs-built_in">cd</span> milvus-cdc/server/configs
<button class="copy-code-btn"></button></code></pre>
<h3 id="Edit-the-config-file" class="common-anchor-header">Modificare il file di configurazione</h3><p>Nella directory <code translate="no">milvus-cdc/server/configs</code>, modificare il file <code translate="no">cdc.yaml</code> per personalizzare le configurazioni relative al metastore Milvus-CDC e ai dettagli di connessione del Milvus di origine.</p>
<ul>
<li><p><strong>Configurazione del metastore</strong>:</p>
<ul>
<li><p><code translate="no">metaStoreConfig.storeType</code>: Tipo di metastore per Milvus-CDC. I valori possibili sono <code translate="no">etcd</code> o <code translate="no">mysql</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.etcdEndpoints</code>: Indirizzo per la connessione all'etcd di Milvus-CDC. Richiesto se <code translate="no">storeType</code> è impostato su <code translate="no">etcd</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.mysqlSourceUrl</code>: Indirizzo di connessione del database MySQL per il server Milvus-CDC. Richiesto se <code translate="no">storeType</code> è impostato su <code translate="no">mysql</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.rootPath</code>: Percorso radice del metastore Milvus-CDC. Questa configurazione consente la multi-tenancy, permettendo a più servizi CDC di utilizzare la stessa istanza etcd o MySQL, pur ottenendo l'isolamento attraverso percorsi radice diversi.</p></li>
</ul>
<p>Esempio di configurazione:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># cdc meta data config</span>
metaStoreConfig:
  <span class="hljs-comment"># the metastore type, available value: etcd, mysql</span>
  storeType: etcd
  <span class="hljs-comment"># etcd address</span>
  etcdEndpoints:
    - localhost:<span class="hljs-number">2379</span>
  <span class="hljs-comment"># mysql connection address</span>
  <span class="hljs-comment"># mysqlSourceUrl: root:root@tcp(127.0.0.1:3306)/milvus-cdc?charset=utf8</span>
  <span class="hljs-comment"># meta data prefix, if multiple cdc services use the same store service, you can set different rootPaths to achieve multi-tenancy</span>
  rootPath: cdc
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Configurazione Milvus di origine:</strong></p>
<p>Specificare i dettagli di connessione del Milvus di origine, compresi etcd e l'archiviazione dei messaggi, per stabilire una connessione tra il server Milvus-CDC e il Milvus di origine.</p>
<ul>
<li><p><code translate="no">sourceConfig.etcdAddress</code>: Indirizzo per la connessione all'etcd del Milvus di origine. Per ulteriori informazioni, fare riferimento a <a href="https://milvus.io/docs/configure_etcd.md#etcd-related-Configurations">Configurazioni relative a etcd</a>.</p></li>
<li><p><code translate="no">sourceConfig.etcdRootPath</code>: Prefisso radice della chiave in cui il Milvus di origine memorizza i dati in etcd. Il valore può variare in base al metodo di distribuzione dell'istanza Milvus:</p>
<ul>
<li><p><strong>Helm</strong> o <strong>Docker Compose</strong>: Valore predefinito: <code translate="no">by-dev</code>.</p></li>
<li><p><strong>Operatore</strong>: Valore predefinito: <code translate="no">&lt;release_name&gt;</code>.</p></li>
</ul></li>
<li><p><code translate="no">replicateChan</code>Nome del canale di replica di Milvus, che è <code translate="no">{msgChannel.chanNamePrefix.cluster}/{msgChannel.chanNamePrefix.replicateMsg}</code> nel file milvus.yaml.</p></li>
<li><p><code translate="no">sourceConfig.pulsar</code>: Configurazioni Pulsar per il Milvus di origine. Se il Milvus di origine utilizza Kafka per l'archiviazione dei messaggi, rimuovere tutte le configurazioni relative a Pulsar. Per ulteriori informazioni, fare riferimento a <a href="https://milvus.io/docs/configure_pulsar.md">Configurazioni relative a Pulsar</a>.</p></li>
<li><p><code translate="no">sourceConfig.kafka.address</code>: Indirizzo Kafka per il Milvus di origine. Togliere il commento a questa configurazione se il Milvus di origine usa Kafka per l'archiviazione dei messaggi.</p></li>
</ul></li>
</ul>
<p>Esempio di configurazione:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus-source config, these settings are basically the same as the corresponding configuration of milvus.yaml in milvus source.</span>
sourceConfig:
  <span class="hljs-comment"># etcd config</span>
  etcdAddress:
    - localhost:<span class="hljs-number">2379</span>
  etcdRootPath: by-dev
  etcdMetaSubPath: meta
  <span class="hljs-comment"># default partition name</span>
  defaultPartitionName: _default
  <span class="hljs-comment"># read buffer length, mainly used for buffering if writing data to milvus-target is slow.</span>
  readChanLen: <span class="hljs-number">10</span>
  replicateChan: by-dev-replicate-msg
  <span class="hljs-comment"># milvus-source mq config, which is pulsar or kafka</span>
  pulsar:
    address: pulsar://localhost:<span class="hljs-number">6650</span>
    webAddress: localhost:<span class="hljs-number">80</span>
    maxMessageSize: <span class="hljs-number">5242880</span>
    tenant: public
    namespace: default
<span class="hljs-comment">#    authPlugin: org.apache.pulsar.client.impl.auth.AuthenticationToken</span>
<span class="hljs-comment">#    authParams: token:xxx</span>
<span class="hljs-comment">#  kafka:</span>
<span class="hljs-comment">#    address: 127.0.0.1:9092</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Compile-the-Milvus-CDC-server" class="common-anchor-header">Compilazione del server Milvus-CDC</h3><p>Dopo aver salvato il file <code translate="no">cdc.yaml</code>, navigare nella directory <code translate="no">milvus-cdc</code> ed eseguire uno dei seguenti comandi per compilare il server:</p>
<ul>
<li><p>Per un file binario:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">make</span> build
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Per un'immagine Docker:</p>
<pre><code translate="no" class="language-bash">bash build_image.sh
<button class="copy-code-btn"></button></code></pre>
<p>Per un'immagine Docker, montare il file compilato su <code translate="no">/app/server/configs/cdc.yaml</code> all'interno del contenitore.</p></li>
</ul>
<h3 id="Start-the-server" class="common-anchor-header">Avviare il server</h3><ul>
<li><p>Utilizzando il file binario</p>
<p>Navigare nella directory contenente il binario <code translate="no">milvus-cdc</code> e nella directory <code translate="no">configs</code> con il file <code translate="no">cdc.yaml</code>, quindi avviare il server:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># dir tree</span>
.
├── milvus-cdc <span class="hljs-comment"># build from source code or download from release page</span>
├── configs
│   └── cdc.yaml <span class="hljs-comment"># config for cdc and source milvus</span>

<span class="hljs-comment"># start milvus cdc</span>
./milvus-cdc server
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Utilizzando Docker Compose:</p>
<pre><code translate="no" class="language-bash">docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ul>
