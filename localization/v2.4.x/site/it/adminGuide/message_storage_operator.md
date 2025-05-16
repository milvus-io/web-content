---
id: message_storage_operator.md
title: Configurazione dell'archiviazione dei messaggi con Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Scoprite come configurare l'archiviazione dei messaggi con Milvus Operator.
---
<h1 id="Configure-Message-Storage-with-Milvus-Operator" class="common-anchor-header">Configurazione dell'archiviazione dei messaggi con Milvus Operator<button data-href="#Configure-Message-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus utilizza RocksMQ, Pulsar o Kafka per la gestione dei log delle modifiche recenti, l'output dei log dei flussi e la fornitura di sottoscrizioni ai log. Questo argomento illustra come configurare le dipendenze dello storage dei messaggi quando si installa Milvus con Milvus Operator. Per maggiori dettagli, consultate <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/message-storage.md">Configurazione dell'archiviazione dei messaggi con Milvus Operator</a> nel repository di Milvus Operator.</p>
<p>Questo argomento presuppone che abbiate installato Milvus Operator.</p>
<div class="alert note">Per ulteriori informazioni, vedere <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Distribuzione di Milvus Operator</a>. </div>
<p>È necessario specificare un file di configurazione per utilizzare Milvus Operator per avviare un cluster Milvus.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>È sufficiente modificare il modello di codice in <code translate="no">milvus_cluster_default.yaml</code> per configurare le dipendenze di terzi. Le sezioni seguenti illustrano come configurare rispettivamente object storage, etcd e Pulsar.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Prima di iniziare<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>La tabella seguente mostra se RocksMQ, NATS, Pulsar e Kafka sono supportati in Milvus in modalità standalone e cluster.</p>
<table>
<thead>
<tr><th style="text-align:center"></th><th style="text-align:center">RocksMQ</th><th style="text-align:center">NATS</th><th style="text-align:center">Pulsar</th><th style="text-align:center">Kafka</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">Modalità standalone</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
<tr><td style="text-align:center">Modalità cluster</td><td style="text-align:center">✖️</td><td style="text-align:center">✖️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>Ci sono anche altre limitazioni per specificare l'archiviazione dei messaggi:</p>
<ul>
<li>È supportato un solo archivio messaggi per un'istanza Milvus. Tuttavia, esiste ancora una compatibilità con più archivi di messaggi impostati per un'istanza. La priorità è la seguente:<ul>
<li>modalità standalone:  RocksMQ (predefinito) &gt; Pulsar &gt; Kafka</li>
<li>modalità cluster: Pulsar (predefinito) &gt; Kafka</li>
<li>I nats introdotti nella versione 2.3 non partecipano a queste regole di priorità per compatibilità con il passato.</li>
</ul></li>
<li>L'archiviazione dei messaggi non può essere modificata mentre il sistema Milvus è in funzione.</li>
<li>È supportata solo la versione di Kafka 2.x o 3.x.</li>
</ul>
<h2 id="Configure-RocksMQ" class="common-anchor-header">Configurare RocksMQ<button data-href="#Configure-RocksMQ" class="anchor-icon" translate="no">
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
    </button></h2><p>RocksMQ è il deposito di messaggi predefinito in Milvus standalone.</p>
<div class="alert note">
<p>Attualmente è possibile configurare RocksMQ come archivio messaggi per Milvus standalone solo con Milvus Operator.</p>
</div>
<h4 id="Example" class="common-anchor-header">Esempio</h4><p>L'esempio seguente configura un servizio RocksMQ.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: milvus
spec:
  dependencies: {}
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-NATS" class="common-anchor-header">Configurare NATS<button data-href="#Configure-NATS" class="anchor-icon" translate="no">
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
    </button></h2><p>NATS è un archivio di messaggi alternativo per NATS.</p>
<h4 id="Example" class="common-anchor-header">Esempio</h4><p>L'esempio seguente configura un servizio NATS.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: milvus
spec:
  dependencies: 
    msgStreamType: <span class="hljs-string">&#x27;natsmq&#x27;</span>
    natsmq:
      <span class="hljs-comment"># server side configuration for natsmq.</span>
      server: 
        <span class="hljs-comment"># 4222 by default, Port for nats server listening.</span>
        port: <span class="hljs-number">4222</span> 
        <span class="hljs-comment"># /var/lib/milvus/nats by default, directory to use for JetStream storage of nats.</span>
        storeDir: /var/lib/milvus/nats 
        <span class="hljs-comment"># (B) 16GB by default, Maximum size of the &#x27;file&#x27; storage.</span>
        maxFileStore: <span class="hljs-number">17179869184</span> 
        <span class="hljs-comment"># (B) 8MB by default, Maximum number of bytes in a message payload.</span>
        maxPayload: <span class="hljs-number">8388608</span> 
        <span class="hljs-comment"># (B) 64MB by default, Maximum number of bytes buffered for a connection applies to client connections.</span>
        maxPending: <span class="hljs-number">67108864</span> 
        <span class="hljs-comment"># (√ms) 4s by default, waiting for initialization of natsmq finished.</span>
        initializeTimeout: <span class="hljs-number">4000</span> 
        monitor:
          <span class="hljs-comment"># false by default, If true enable debug log messages.</span>
          debug: false 
          <span class="hljs-comment"># true by default, If set to false, log without timestamps.</span>
          logTime: true 
          <span class="hljs-comment"># no log file by default, Log file path relative to.. .</span>
          logFile: 
          <span class="hljs-comment"># (B) 0, unlimited by default, Size in bytes after the log file rolls over to a new one.</span>
          logSizeLimit: <span class="hljs-number">0</span> 
        retention:
          <span class="hljs-comment"># (min) 3 days by default, Maximum age of any message in the P-channel.</span>
          maxAge: <span class="hljs-number">4320</span> 
          <span class="hljs-comment"># (B) None by default, How many bytes the single P-channel may contain. Removing oldest messages if the P-channel exceeds this size.</span>
          maxBytes:
          <span class="hljs-comment"># None by default, How many message the single P-channel may contain. Removing oldest messages if the P-channel exceeds this limit.    </span>
          maxMsgs: 
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<p>Per migrare lo storage dei messaggi da RocksMQ a NATS, procedere come segue:</p>
<ol>
<li><p>Interrompere tutte le operazioni DDL.</p></li>
<li><p>Chiamare l'API FlushAll e arrestare Milvus al termine dell'esecuzione della chiamata API.</p></li>
<li><p>Cambiare <code translate="no">msgStreamType</code> in <code translate="no">natsmq</code> e apportare le modifiche necessarie alle impostazioni NATS in <code translate="no">spec.dependencies.natsmq</code>.</p></li>
<li><p>Avviare nuovamente Milvus e verificare se:</p>
<ul>
<li>Nei registri è presente una voce di registro che riporta <code translate="no">mqType=natsmq</code>.</li>
<li>Una directory denominata <code translate="no">jetstream</code> è presente nella directory specificata in <code translate="no">spec.dependencies.natsmq.server.storeDir</code>.</li>
</ul></li>
<li><p>(Facoltativo) Eseguite il backup e la pulizia dei file di dati nella directory di archiviazione di RocksMQ.</p></li>
</ol>
<div class="alert note">
<p><strong>Scegliere tra RocksMQ e NATS?</strong></p>
<p>RockMQ usa CGO per interagire con RocksDB e gestisce la memoria da solo, mentre il NATS puro di Go incorporato nell'installazione Milvus delega la gestione della memoria al garbage collector (GC) di Go.</p>
<p>Nello scenario in cui il pacchetto di dati è più piccolo di 64 kb, RocksDB ha prestazioni migliori in termini di utilizzo della memoria, della CPU e del tempo di risposta. D'altra parte, se il pacchetto di dati è superiore a 64 kb, NATS eccelle in termini di tempo di risposta con una memoria sufficiente e una pianificazione GC ideale.</p>
<p>Attualmente, si consiglia di utilizzare NATS solo per gli esperimenti.</p>
</div>
<h2 id="Configure-Pulsar" class="common-anchor-header">Configurare Pulsar<button data-href="#Configure-Pulsar" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar gestisce i log delle modifiche recenti, produce i log dei flussi e fornisce sottoscrizioni ai log. La configurazione di Pulsar per l'archiviazione dei messaggi è supportata sia in Milvus standalone che in Milvus cluster. Tuttavia, con Milvus Operator, è possibile configurare Pulsar come archivio messaggi solo per Milvus cluster. Aggiungere i campi richiesti in <code translate="no">spec.dependencies.pulsar</code> per configurare Pulsar.</p>
<p><code translate="no">pulsar</code> supporta <code translate="no">external</code> e <code translate="no">inCluster</code>.</p>
<h3 id="External-Pulsar" class="common-anchor-header">Pulsar esterno</h3><p><code translate="no">external</code> indica l'utilizzo di un servizio Pulsar esterno. I campi utilizzati per configurare un servizio Pulsar esterno includono:</p>
<ul>
<li><code translate="no">external</code>:  Un valore <code translate="no">true</code> indica che Milvus utilizza un servizio Pulsar esterno.</li>
<li><code translate="no">endpoints</code>: Gli endpoint di Pulsar.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Esempio</h4><p>L'esempio seguente configura un servizio Pulsar esterno.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies: <span class="hljs-comment"># Optional</span>
    pulsar: <span class="hljs-comment"># Optional</span>
      <span class="hljs-comment"># Whether (=true) to use an existed external pulsar as specified in the field endpoints or </span>
      <span class="hljs-comment"># (=false) create a new pulsar inside the same kubernetes cluster for milvus.</span>
      external: true <span class="hljs-comment"># Optional default=false</span>
      <span class="hljs-comment"># The external pulsar endpoints if external=true</span>
      endpoints:
      - <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span>:<span class="hljs-number">6650</span>
  components: {}
  config: {}           
<button class="copy-code-btn"></button></code></pre>
<h3 id="Internal-Pulsar" class="common-anchor-header">Pulsar interno</h3><p><code translate="no">inCluster</code> indica che all'avvio di un cluster Milvus, un servizio Pulsar si avvia automaticamente nel cluster.</p>
<h4 id="Example" class="common-anchor-header">Esempio</h4><p>L'esempio seguente configura un servizio Pulsar interno.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies:
    pulsar:
      inCluster:
        values:
          components:
            autorecovery: <span class="hljs-literal">false</span>
          zookeeper:
            replicaCount: 1
          bookkeeper:
            replicaCount: 1
            resoureces:
              <span class="hljs-built_in">limit</span>:
                cpu: <span class="hljs-string">&#x27;4&#x27;</span>
              memory: 8Gi
            requests:
              cpu: 200m
              memory: 512Mi
          broker:
            replicaCount: 1
            configData:
              <span class="hljs-comment">## Enable `autoSkipNonRecoverableData` since bookkeeper is running</span>
              <span class="hljs-comment">## without persistence</span>
              autoSkipNonRecoverableData: <span class="hljs-string">&quot;true&quot;</span>
              managedLedgerDefaultEnsembleSize: <span class="hljs-string">&quot;1&quot;</span>
              managedLedgerDefaultWriteQuorum: <span class="hljs-string">&quot;1&quot;</span>
              managedLedgerDefaultAckQuorum: <span class="hljs-string">&quot;1&quot;</span>
          proxy:
            replicaCount: 1
  components: {}
  config: {}            
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Questo esempio specifica il numero di repliche di ciascun componente di Pulsar, le risorse di calcolo di Pulsar BookKeeper e altre configurazioni.</div>
<div class="alert note">Trovate gli elementi di configurazione completi per configurare un servizio Pulsar interno in <a href="https://artifacthub.io/packages/helm/apache/pulsar/2.7.8?modal=values">values.yaml</a>. Aggiungere le voci di configurazione necessarie in <code translate="no">pulsar.inCluster.values</code>, come mostrato nell'esempio precedente.</div>
<p>Supponendo che il file di configurazione sia denominato <code translate="no">milvuscluster.yaml</code>, eseguire il seguente comando per applicare la configurazione.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka" class="common-anchor-header">Configurare Kafka<button data-href="#Configure-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar è il sistema di archiviazione dei messaggi predefinito in un cluster Milvus. Se si desidera utilizzare Kafka, aggiungere il campo opzionale <code translate="no">msgStreamType</code> per configurare Kafka.</p>
<p><code translate="no">kafka</code> supporta <code translate="no">external</code> e <code translate="no">inCluster</code>.</p>
<h3 id="External-Kafka" class="common-anchor-header">Kafka esterno</h3><p><code translate="no">external</code> indica l'uso di un servizio Kafka esterno.</p>
<p>I campi utilizzati per configurare un servizio Kafka esterno includono:</p>
<ul>
<li><code translate="no">external</code>: Un valore <code translate="no">true</code> indica che Milvus utilizza un servizio Kafka esterno.</li>
<li><code translate="no">brokerList</code>: L'elenco dei broker a cui inviare i messaggi.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Esempio</h4><p>L'esempio seguente configura un servizio Kafka esterno.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  config:
    kafka:
      <span class="hljs-comment"># securityProtocol supports: PLAINTEXT, SSL, SASL_PLAINTEXT, SASL_SSL </span>
      securityProtocol: PLAINTEXT
      <span class="hljs-comment"># saslMechanisms supports: PLAIN, SCRAM-SHA-256, SCRAM-SHA-512</span>
      saslMechanisms: PLAIN
      saslUsername: <span class="hljs-string">&quot;&quot;</span>
      saslPassword: <span class="hljs-string">&quot;&quot;</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  dependencies:
    <span class="hljs-comment"># Omit other fields ...</span>
    msgStreamType: <span class="hljs-string">&quot;kafka&quot;</span>
    kafka:
      external: true
      brokerList: 
        - <span class="hljs-string">&quot;kafkaBrokerAddr1:9092&quot;</span>
        - <span class="hljs-string">&quot;kafkaBrokerAddr2:9092&quot;</span>
        <span class="hljs-comment"># ...</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Le configurazioni SASL sono supportate nella versione dell'operatore v0.8.5 o superiore.</p>
</blockquote>
<h3 id="Internal-Kafka" class="common-anchor-header">Kafka interno</h3><p><code translate="no">inCluster</code> indica che all'avvio di un cluster Milvus, un servizio Kafka si avvia automaticamente nel cluster.</p>
<h4 id="Example" class="common-anchor-header">Esempio</h4><p>L'esempio seguente configura un servizio Kafka interno.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec: 
  dependencies:
    msgStreamType: <span class="hljs-string">&quot;kafka&quot;</span>
    kafka:
      inCluster: 
        values: {} <span class="hljs-comment"># values can be found in https://artifacthub.io/packages/helm/bitnami/kafka</span>
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<p><a href="https://artifacthub.io/packages/helm/bitnami/kafka">Qui</a> si trovano gli elementi di configurazione completi per configurare un servizio Kafka interno. Aggiungere le voci di configurazione necessarie sotto <code translate="no">kafka.inCluster.values</code>.</p>
<p>Supponendo che il file di configurazione sia denominato <code translate="no">milvuscluster.yaml</code>, eseguire il comando seguente per applicare la configurazione.</p>
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
    </button></h2><p>Imparare a configurare altre dipendenze di Milvus con Milvus Operator:</p>
<ul>
<li><a href="/docs/it/v2.4.x/object_storage_operator.md">Configurare l'archiviazione degli oggetti con Milvus Operator</a></li>
<li><a href="/docs/it/v2.4.x/meta_storage_operator.md">Configurazione del metaconservazione con Milvus Operator</a></li>
</ul>
