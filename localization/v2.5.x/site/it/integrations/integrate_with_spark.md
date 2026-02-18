---
id: integrate_with_spark.md
summary: >-
  Apache Spark e Databricks si integrano con Milvus e Zilliz Cloud per combinare
  l'elaborazione dei big data con la ricerca vettoriale. Scoprite come costruire
  ricerche e analisi basate sull'intelligenza artificiale con il connettore
  Spark-Milvus.
title: Utilizzare Apache Spark™ con Milvus/Zilliz Cloud per le pipeline AI
---
<h1 id="Use-Apache-Spark™-with-MilvusZilliz-Cloud-for-AI-Pipelines" class="common-anchor-header">Utilizzare Apache Spark™ con Milvus/Zilliz Cloud per le pipeline AI<button data-href="#Use-Apache-Spark™-with-MilvusZilliz-Cloud-for-AI-Pipelines" class="anchor-icon" translate="no">
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
    </button></h1><p>Il <a href="https://github.com/zilliztech/spark-milvus">connettore Spark-Milvus</a> fornisce l'integrazione di Apache Spark e Databricks con Milvus e Zilliz Cloud. Il connettore collega le potenti funzioni di elaborazione dei big data e di apprendimento automatico (ML) di Apache Spark con le funzionalità di ricerca vettoriale all'avanguardia di Milvus. Questa integrazione consente un flusso di lavoro semplificato per la ricerca AI, l'analisi avanzata, la formazione ML e la gestione efficiente di dati vettoriali su larga scala.</p>
<p>Apache Spark è una piattaforma di elaborazione dati distribuita, progettata per gestire insiemi di dati enormi con calcoli ad alta velocità. Se abbinato a Milvus o Zilliz Cloud, apre nuove possibilità per casi d'uso come la ricerca semantica, i sistemi di raccomandazione e l'analisi dei dati guidata dall'intelligenza artificiale.</p>
<p>Ad esempio, Spark può elaborare in batch grandi insiemi di dati per generare embeddings tramite modelli ML, quindi utilizzare il connettore Spark-Milvus per memorizzare questi embeddings direttamente in Milvus o Zilliz Cloud. Una volta indicizzati, questi dati possono essere rapidamente ricercati o analizzati, creando una potente pipeline per flussi di lavoro di AI e big data.</p>
<p>Il connettore Spark-Milvus supporta attività come l'ingestione iterativa e massiva dei dati in Milvus, la sincronizzazione dei dati tra i sistemi e l'analisi avanzata dei dati vettoriali archiviati in Milvus. Questa guida illustra i passaggi per configurare e utilizzare efficacemente il connettore per casi d'uso quali:</p>
<ul>
<li>Caricare in modo efficiente i dati vettoriali in Milvus in grandi lotti,</li>
<li>Spostare i dati tra Milvus e altri sistemi di archiviazione o database,</li>
<li>analizzare i dati in Milvus sfruttando Spark MLlib e altri strumenti di intelligenza artificiale.</li>
</ul>
<h2 id="Quick-start" class="common-anchor-header">Avvio rapido<button data-href="#Quick-start" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Preparation" class="common-anchor-header">Preparazione<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h3><p>Il connettore Spark-Milvus supporta i linguaggi di programmazione Scala e Python. Gli utenti possono utilizzarlo con <strong>Pyspark</strong> o <strong>Spark-shell</strong>. Per eseguire questa demo, configurare un ambiente Spark contenente la dipendenza di Spark-Milvus Connector seguendo i seguenti passaggi:</p>
<ol>
<li><p>Installare Apache Spark (versione &gt;= 3.3.0)</p>
<p>Potete installare Apache Spark facendo riferimento alla <a href="https://spark.apache.org/docs/latest/">documentazione ufficiale</a>.</p></li>
<li><p>Scaricare il file jar <strong>spark-milvus</strong>.</p>
<pre><code translate="no">wget https://github.com/zilliztech/spark-milvus/raw/1.0.0-SNAPSHOT/output/spark-milvus-1.0.0-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Avviare il runtime di Spark con il jar <strong>spark-milvus</strong> come una delle dipendenze.</p>
<p>Per avviare il runtime di Spark con Spark-Milvus Connector, aggiungete <strong>spark-milvus</strong> scaricato come dipendenza al comando.</p>
<ul>
<li><p><strong>pyspark</strong></p>
<pre><code translate="no">./bin/pyspark --jars spark-milvus-1.0.0-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>spark-shell</strong></p>
<pre><code translate="no">./bin/spark-shell --jars spark-milvus-1.0.0-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
</ol>
<h3 id="Demo" class="common-anchor-header">Demo<button data-href="#Demo" class="anchor-icon" translate="no">
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
    </button></h3><p>In questa dimostrazione, creiamo un esempio di Spark DataFrame con dati vettoriali e lo scriviamo in Milvus attraverso lo Spark-Milvus Connector. Una collezione verrà creata automaticamente in Milvus in base allo schema e alle opzioni specificate.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#scala">Scala</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pyspark.sql <span class="hljs-keyword">import</span> SparkSession

columns = [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;vec&quot;</span>]
data = [(<span class="hljs-number">1</span>, <span class="hljs-string">&quot;a&quot;</span>, [<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>,<span class="hljs-number">6.0</span>,<span class="hljs-number">7.0</span>,<span class="hljs-number">8.0</span>]),
    (<span class="hljs-number">2</span>, <span class="hljs-string">&quot;b&quot;</span>, [<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>,<span class="hljs-number">6.0</span>,<span class="hljs-number">7.0</span>,<span class="hljs-number">8.0</span>]),
    (<span class="hljs-number">3</span>, <span class="hljs-string">&quot;c&quot;</span>, [<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>,<span class="hljs-number">6.0</span>,<span class="hljs-number">7.0</span>,<span class="hljs-number">8.0</span>]),
    (<span class="hljs-number">4</span>, <span class="hljs-string">&quot;d&quot;</span>, [<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>,<span class="hljs-number">6.0</span>,<span class="hljs-number">7.0</span>,<span class="hljs-number">8.0</span>])]
sample_df = spark.sparkContext.parallelize(data).toDF(columns)
sample_df.write \
    .mode(<span class="hljs-string">&quot;append&quot;</span>) \
    .option(<span class="hljs-string">&quot;milvus.host&quot;</span>, <span class="hljs-string">&quot;localhost&quot;</span>) \
    .option(<span class="hljs-string">&quot;milvus.port&quot;</span>, <span class="hljs-string">&quot;19530&quot;</span>) \
    .option(<span class="hljs-string">&quot;milvus.collection.name&quot;</span>, <span class="hljs-string">&quot;hello_spark_milvus&quot;</span>) \
    .option(<span class="hljs-string">&quot;milvus.collection.vectorField&quot;</span>, <span class="hljs-string">&quot;vec&quot;</span>) \
    .option(<span class="hljs-string">&quot;milvus.collection.vectorDim&quot;</span>, <span class="hljs-string">&quot;8&quot;</span>) \
    .option(<span class="hljs-string">&quot;milvus.collection.primaryKeyField&quot;</span>, <span class="hljs-string">&quot;id&quot;</span>) \
    .<span class="hljs-built_in">format</span>(<span class="hljs-string">&quot;milvus&quot;</span>) \
    .save()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-scala">import org.apache.spark.sql.{SaveMode, SparkSession}

object Hello extends App {

  val spark = SparkSession.builder().master(&quot;local[*]&quot;)
    .appName(&quot;HelloSparkMilvus&quot;)
    .getOrCreate()

  import spark.implicits._

  // Create DataFrame
  val sampleDF = Seq(
    (1, &quot;a&quot;, Seq(1.0,2.0,3.0,4.0,5.0)),
    (2, &quot;b&quot;, Seq(1.0,2.0,3.0,4.0,5.0)),
    (3, &quot;c&quot;, Seq(1.0,2.0,3.0,4.0,5.0)),
    (4, &quot;d&quot;, Seq(1.0,2.0,3.0,4.0,5.0))
  ).toDF(&quot;id&quot;, &quot;text&quot;, &quot;vec&quot;)

  // set milvus options
  val milvusOptions = Map(
      &quot;milvus.host&quot; -&gt; &quot;localhost&quot; -&gt; uri,
      &quot;milvus.port&quot; -&gt; &quot;19530&quot;,
      &quot;milvus.collection.name&quot; -&gt; &quot;hello_spark_milvus&quot;,
      &quot;milvus.collection.vectorField&quot; -&gt; &quot;vec&quot;,
      &quot;milvus.collection.vectorDim&quot; -&gt; &quot;5&quot;,
      &quot;milvus.collection.primaryKeyField&quot;, &quot;id&quot;
    )
    
  sampleDF.write.format(&quot;milvus&quot;)
    .options(milvusOptions)
    .mode(SaveMode.Append)
    .save()
}
</code></pre>
<p>Dopo aver eseguito il codice di cui sopra, è possibile visualizzare i dati inseriti in Milvus utilizzando l'SDK o Attu (una dashboard di Milvus). È possibile trovare una raccolta denominata <code translate="no">hello_spark_milvus</code> creata con 4 entità già inserite.</p>
<h2 id="Features--concepts" class="common-anchor-header">Caratteristiche e concetti<button data-href="#Features--concepts" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-options" class="common-anchor-header">Opzioni di Milvus<button data-href="#Milvus-options" class="anchor-icon" translate="no">
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
    </button></h3><p>Nella sezione <a href="#Quick-start">Avvio rapido</a>, abbiamo mostrato l'impostazione delle opzioni durante le operazioni con Milvus. Queste opzioni sono astratte come Opzioni Milvus. Vengono utilizzate per creare connessioni a Milvus e controllare altri comportamenti di Milvus. Non tutte le opzioni sono obbligatorie.</p>
<table>
<thead>
<tr><th>Opzione Chiave</th><th>Valore predefinito</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.host</code></td><td><code translate="no">localhost</code></td><td>Host del server Milvus. Vedere <a href="https://milvus.io/docs/manage_connection.md">Gestione delle connessioni Milvus</a> per maggiori dettagli.</td></tr>
<tr><td><code translate="no">milvus.port</code></td><td><code translate="no">19530</code></td><td>Porta del server Milvus. Vedere <a href="https://milvus.io/docs/manage_connection.md">Gestione delle connessioni Milvus</a> per maggiori dettagli.</td></tr>
<tr><td><code translate="no">milvus.username</code></td><td><code translate="no">root</code></td><td>Nome utente del server Milvus. Per maggiori dettagli, vedere <a href="https://milvus.io/docs/manage_connection.md">Gestione delle connessioni Milvus</a>.</td></tr>
<tr><td><code translate="no">milvus.password</code></td><td><code translate="no">Milvus</code></td><td>Password per il server Milvus. Per maggiori dettagli, vedere <a href="https://milvus.io/docs/manage_connection.md">Gestione delle connessioni Milvus</a>.</td></tr>
<tr><td><code translate="no">milvus.uri</code></td><td><code translate="no">--</code></td><td>URI del server Milvus. Vedere <a href="https://milvus.io/docs/manage_connection.md">Gestione delle connessioni Milvus</a> per maggiori dettagli.</td></tr>
<tr><td><code translate="no">milvus.token</code></td><td><code translate="no">--</code></td><td>Token del server Milvus. Per maggiori dettagli, vedere <a href="https://milvus.io/docs/manage_connection.md">Gestione delle connessioni Milvus</a>.</td></tr>
<tr><td><code translate="no">milvus.database.name</code></td><td><code translate="no">default</code></td><td>Nome del database Milvus da leggere o scrivere.</td></tr>
<tr><td><code translate="no">milvus.collection.name</code></td><td><code translate="no">hello_milvus</code></td><td>Nome della raccolta Milvus da leggere o scrivere.</td></tr>
<tr><td><code translate="no">milvus.secure</code></td><td><code translate="no">false</code></td><td>Abilita le connessioni sicure TLS/SSL.</td></tr>
<tr><td><code translate="no">milvus.secure.serverName</code></td><td><code translate="no">localhost</code></td><td>Nome host previsto per la verifica TLS.</td></tr>
<tr><td><code translate="no">milvus.secure.serverPemPath</code></td><td><code translate="no">--</code></td><td>Percorso del file PEM del server per TLS.</td></tr>
<tr><td><code translate="no">milvus.secure.caCert</code></td><td><code translate="no">--</code></td><td>Percorso del file del certificato CA per la verifica.</td></tr>
<tr><td><code translate="no">milvus.secure.clientCert</code></td><td><code translate="no">--</code></td><td>Percorso del certificato del client per l'autenticazione.</td></tr>
<tr><td><code translate="no">milvus.secure.clientKey</code></td><td><code translate="no">--</code></td><td>Percorso della chiave privata del client per l'autenticazione.</td></tr>
<tr><td><code translate="no">milvus.collection.primaryKeyField</code></td><td><code translate="no">None</code></td><td>Nome del campo della chiave primaria nella raccolta. Richiesto se la raccolta non esiste.</td></tr>
<tr><td><code translate="no">milvus.collection.vectorField</code></td><td><code translate="no">None</code></td><td>Nome del campo vettore dell'insieme. Richiesto se l'insieme non esiste.</td></tr>
<tr><td><code translate="no">milvus.collection.vectorDim</code></td><td><code translate="no">None</code></td><td>Dimensione del campo vettoriale dell'insieme. Richiesto se l'insieme non esiste.</td></tr>
<tr><td><code translate="no">milvus.collection.autoID</code></td><td><code translate="no">false</code></td><td>Se l'insieme non esiste, questa opzione specifica se generare automaticamente gli ID per le entità. Per ulteriori informazioni, vedere <a href="https://milvus.io/docs/create_collection.md">create_collection</a>.</td></tr>
<tr><td><code translate="no">milvus.bucket</code></td><td><code translate="no">a-bucket</code></td><td>Nome del secchio nello storage Milvus. Dovrebbe essere lo stesso di <code translate="no">minio.bucketName</code> in <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.rootpath</code></td><td><code translate="no">files</code></td><td>Percorso principale del deposito Milvus. Deve essere uguale a <code translate="no">minio.rootpath</code> in <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.fs</code></td><td><code translate="no">s3a://</code></td><td>File system del deposito Milvus. Il valore <code translate="no">s3a://</code> si applica a Spark open-source. Utilizzare <code translate="no">s3://</code> per Databricks.</td></tr>
<tr><td><code translate="no">milvus.storage.endpoint</code></td><td><code translate="no">localhost:9000</code></td><td>Endpoint dello storage Milvus. Dovrebbe essere uguale a <code translate="no">minio.address</code>:<code translate="no">minio.port</code> in <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.storage.user</code></td><td><code translate="no">minioadmin</code></td><td>Utente dello storage Milvus. Deve essere uguale a <code translate="no">minio.accessKeyID</code> in <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.storage.password</code></td><td><code translate="no">minioadmin</code></td><td>Password del deposito Milvus. Dovrebbe essere la stessa di <code translate="no">minio.secretAccessKey</code> in <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.storage.useSSL</code></td><td><code translate="no">false</code></td><td>Se utilizzare o meno l'SSL per il deposito Milvus. Deve essere uguale a <code translate="no">minio.useSSL</code> in <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
</tbody>
</table>
<h2 id="Milvus-data-format" class="common-anchor-header">Formato dei dati Milvus<button data-href="#Milvus-data-format" class="anchor-icon" translate="no">
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
    </button></h2><p>Il connettore Spark-Milvus supporta la lettura e la scrittura dei dati nei seguenti formati Milvus:</p>
<ul>
<li><code translate="no">milvus</code>: Formato dati Milvus per la conversione senza problemi da Spark DataFrame a entità Milvus.</li>
<li><code translate="no">milvusbinlog</code>: Formato dati Milvus per la lettura dei dati binlog incorporati in Milvus.</li>
<li><code translate="no">mjson</code>: Formato JSON di Milvus per l'inserimento di dati in massa in Milvus.</li>
</ul>
<h3 id="milvus" class="common-anchor-header">milvus<button data-href="#milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>In <a href="#Quick-start">Quick start</a>, utilizziamo il formato <strong>milvus</strong> per scrivere dati di esempio in un cluster Milvus. Il formato <strong>milvus</strong> è un nuovo formato di dati che supporta la scrittura di dati Spark DataFrame senza soluzione di continuità nelle collezioni Milvus. Questo si ottiene tramite chiamate batch all'API Insert dell'SDK Milvus. Se una raccolta non esiste in Milvus, verrà creata una nuova raccolta basata sullo schema del Dataframe. Tuttavia, la collezione creata automaticamente potrebbe non supportare tutte le caratteristiche dello schema della collezione. Pertanto, si consiglia di creare prima una raccolta tramite SDK e poi di utilizzare spark-milvus per la scrittura. Per ulteriori informazioni, consultare <a href="https://github.com/zilliztech/spark-milvus/blob/main/examples/src/main/scala/InsertDemo.scala">la demo</a>.</p>
<h3 id="milvusbinlog" class="common-anchor-header">milvusbinlog<button data-href="#milvusbinlog" class="anchor-icon" translate="no">
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
    </button></h3><p>Il nuovo formato di dati <strong>milvusbinlog</strong> serve a leggere i dati binlog integrati in Milvus. Binlog è il formato interno di Milvus per la memorizzazione dei dati, basato sul parquet. Sfortunatamente, non può essere letto da una normale libreria di parquet, quindi abbiamo implementato questo nuovo formato di dati per aiutare Spark a leggerlo. Non è consigliabile utilizzare direttamente <strong>milvusbinlog</strong> a meno che non si abbia familiarità con i dettagli della memorizzazione interna di Milvus. Si consiglia di utilizzare la funzione <a href="#MilvusUtils">MilvusUtils</a> che verrà introdotta nella prossima sezione.</p>
<pre><code translate="no" class="language-scalar">val df = spark.read
  .format(&quot;milvusbinlog&quot;)
  .load(path)
  .withColumnRenamed(&quot;val&quot;, &quot;embedding&quot;)
</code></pre>
<h3 id="mjson" class="common-anchor-header">mjson<button data-href="#mjson" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus fornisce la funzionalità <a href="https://milvus.io/docs/bulk_insert.md">Bulkinsert</a> per migliorare le prestazioni di scrittura quando si opera con grandi insiemi di dati. Tuttavia, il formato JSON utilizzato da Milvus è leggermente diverso dal formato di output JSON predefinito di Spark. Per risolvere questo problema, abbiamo introdotto il formato di dati <strong>mjson</strong> per generare dati che soddisfino i requisiti di Milvus. Ecco un esempio che mostra la differenza tra JSON-lines e <strong>mjson</strong>:</p>
<ul>
<li><p>Linee JSON:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">101</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">13</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">1.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">1.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">102</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">25</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">2.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">2.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">7</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">3.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">3.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">104</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">12</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">4.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">4.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">105</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">34</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">5.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">5.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>mjson (richiesto per Milvus Bulkinsert):</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;rows&quot;</span><span class="hljs-punctuation">:</span><span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">101</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">13</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">1.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">1.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">102</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">25</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">2.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">2.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">7</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">3.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">3.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">104</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">12</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">4.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">4.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">105</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">34</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">5.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">5.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Questo aspetto sarà migliorato in futuro. Si consiglia di utilizzare il formato parquet nell'integrazione spark-milvus se la versione di Milvus è la v2.3.7+ che supporta bulkinsert con il formato Parquet. Vedere la <a href="https://github.com/zilliztech/spark-milvus/blob/main/examples/src/main/scala/BulkInsertDemo.scala">demo</a> su Github.</p>
<h2 id="MilvusUtils" class="common-anchor-header">MilvusUtils<button data-href="#MilvusUtils" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusUtils contiene diverse utili funzioni util. Attualmente è supportato solo in Scala. Altri esempi di utilizzo sono nella sezione <a href="#Advanced-Usage">Uso avanzato</a>.</p>
<h3 id="MilvusUtilsreadMilvusCollection" class="common-anchor-header">MilvusUtils.readMilvusCollection<button data-href="#MilvusUtilsreadMilvusCollection" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>MilvusUtils.readMilvusCollection</strong> è una semplice interfaccia per caricare un'intera collezione Milvus in un Dataframe Spark. Comprende varie operazioni, tra cui la chiamata all'SDK Milvus, la lettura di <strong>milvusbinlog</strong> e le comuni operazioni di unione/congiunzione.</p>
<pre><code translate="no" class="language-scala">val collectionDF = MilvusUtils.readMilvusCollection(spark, milvusOptions)
</code></pre>
<h3 id="MilvusUtilsbulkInsertFromSpark" class="common-anchor-header">MilvusUtils.bulkInsertFromSpark<button data-href="#MilvusUtilsbulkInsertFromSpark" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>MilvusUtils.bulkInsertFromSpark</strong> fornisce un modo pratico per importare i file di output di Spark in Milvus in un grande lotto. Si basa sull'API <strong>Bullkinsert</strong> dell'SDK Milvus.</p>
<pre><code translate="no" class="language-scala">df.write.format(&quot;parquet&quot;).save(outputPath)
MilvusUtils.bulkInsertFromSpark(spark, milvusOptions, outputPath, &quot;parquet&quot;)
</code></pre>
<h2 id="Advanced-Usage" class="common-anchor-header">Uso avanzato<button data-href="#Advanced-Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>In questa sezione troverete esempi di utilizzo avanzato del connettore Spark-Milvus per l'analisi e la migrazione dei dati. Per ulteriori dimostrazioni, vedere gli <a href="https://github.com/zilliztech/spark-milvus/tree/main/examples/src/main/scala">esempi</a>.</p>
<h3 id="MySQL---embedding---Milvus" class="common-anchor-header">MySQL -&gt; incorporazione -&gt; Milvus<button data-href="#MySQL---embedding---Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>In questa demo</p>
<ol>
<li>Leggere i dati da MySQL attraverso il connettore Spark-MySQL,</li>
<li>generare embedding (usando Word2Vec come esempio) e</li>
<li>scrivere i dati incorporati in Milvus.</li>
</ol>
<p>Per abilitare il connettore Spark-MySQL, è necessario aggiungere la seguente dipendenza all'ambiente Spark:</p>
<pre><code translate="no">spark-shell <span class="hljs-attr">--jars</span> spark-milvus-<span class="hljs-number">1.0</span>.<span class="hljs-number">0</span>-SNAPSHOT<span class="hljs-selector-class">.jar</span>,mysql-connector-j-<span class="hljs-attribute">x</span><span class="hljs-selector-class">.x</span><span class="hljs-selector-class">.x</span><span class="hljs-selector-class">.jar</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-scala">import org.apache.spark.ml.feature.{Tokenizer, Word2Vec}
import org.apache.spark.sql.functions.udf
import org.apache.spark.sql.{SaveMode, SparkSession}
import zilliztech.spark.milvus.MilvusOptions._

import org.apache.spark.ml.linalg.Vector

object Mysql2MilvusDemo  extends App {

  val spark = SparkSession.builder().master(&quot;local[*]&quot;)
    .appName(&quot;Mysql2MilvusDemo&quot;)
    .getOrCreate()

  import spark.implicits._

  // Create DataFrame
  val sampleDF = Seq(
    (1, &quot;Milvus was created in 2019 with a singular goal: store, index, and manage massive embedding vectors generated by deep neural networks and other machine learning (ML) models.&quot;),
    (2, &quot;As a database specifically designed to handle queries over input vectors, it is capable of indexing vectors on a trillion scale. &quot;),
    (3, &quot;Unlike existing relational databases which mainly deal with structured data following a pre-defined pattern, Milvus is designed from the bottom-up to handle embedding vectors converted from unstructured data.&quot;),
    (4, &quot;As the Internet grew and evolved, unstructured data became more and more common, including emails, papers, IoT sensor data, Facebook photos, protein structures, and much more.&quot;)
  ).toDF(&quot;id&quot;, &quot;text&quot;)

  // Write to MySQL Table
  sampleDF.write
    .mode(SaveMode.Append)
    .format(&quot;jdbc&quot;)
    .option(&quot;driver&quot;,&quot;com.mysql.cj.jdbc.Driver&quot;)
    .option(&quot;url&quot;, &quot;jdbc:mysql://localhost:3306/test&quot;)
    .option(&quot;dbtable&quot;, &quot;demo&quot;)
    .option(&quot;user&quot;, &quot;root&quot;)
    .option(&quot;password&quot;, &quot;123456&quot;)
    .save()

  // Read from MySQL Table
  val dfMysql = spark.read
    .format(&quot;jdbc&quot;)
    .option(&quot;driver&quot;,&quot;com.mysql.cj.jdbc.Driver&quot;)
    .option(&quot;url&quot;, &quot;jdbc:mysql://localhost:3306/test&quot;)
    .option(&quot;dbtable&quot;, &quot;demo&quot;)
    .option(&quot;user&quot;, &quot;root&quot;)
    .option(&quot;password&quot;, &quot;123456&quot;)
    .load()

  val tokenizer = new Tokenizer().setInputCol(&quot;text&quot;).setOutputCol(&quot;tokens&quot;)
  val tokenizedDf = tokenizer.transform(dfMysql)

  // Learn a mapping from words to Vectors.
  val word2Vec = new Word2Vec()
    .setInputCol(&quot;tokens&quot;)
    .setOutputCol(&quot;vectors&quot;)
    .setVectorSize(128)
    .setMinCount(0)
  val model = word2Vec.fit(tokenizedDf)

  val result = model.transform(tokenizedDf)

  val vectorToArrayUDF = udf((v: Vector) =&gt; v.toArray)
  // Apply the UDF to the DataFrame
  val resultDF = result.withColumn(&quot;embedding&quot;, vectorToArrayUDF($&quot;vectors&quot;))
  val milvusDf = resultDF.drop(&quot;tokens&quot;).drop(&quot;vectors&quot;)

  milvusDf.write.format(&quot;milvus&quot;)
    .option(MILVUS_HOST, &quot;localhost&quot;)
    .option(MILVUS_PORT, &quot;19530&quot;)
    .option(MILVUS_COLLECTION_NAME, &quot;text_embedding&quot;)
    .option(MILVUS_COLLECTION_VECTOR_FIELD, &quot;embedding&quot;)
    .option(MILVUS_COLLECTION_VECTOR_DIM, &quot;128&quot;)
    .option(MILVUS_COLLECTION_PRIMARY_KEY, &quot;id&quot;)
    .mode(SaveMode.Append)
    .save()
}
</code></pre>
<h3 id="Milvus---Transform---Milvus" class="common-anchor-header">Milvus -&gt; Transform -&gt; Milvus<button data-href="#Milvus---Transform---Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>In questa dimostrazione</p>
<ol>
<li>Leggere i dati da una raccolta Milvus,</li>
<li>Applicheremo una trasformazione (usando PCA come esempio) e</li>
<li>scrivere i dati trasformati in un altro Milvus tramite l'API Bulkinsert.</li>
</ol>
<div class="alert notes">
<p>Il modello PCA è un modello di trasformazione che riduce la dimensionalità dei vettori incorporati, un'operazione comune nell'apprendimento automatico. È possibile aggiungere alla fase di trasformazione qualsiasi altra operazione di elaborazione, come filtrare, unire o normalizzare.</p>
</div>
<pre><code translate="no" class="language-scala">import org.apache.spark.ml.feature.PCA
import org.apache.spark.ml.linalg.{Vector, Vectors}
import org.apache.spark.SparkConf
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions.udf
import org.apache.spark.sql.util.CaseInsensitiveStringMap
import zilliztech.spark.milvus.{MilvusOptions, MilvusUtils}

import scala.collection.JavaConverters._

object TransformDemo extends App {
  val sparkConf = new SparkConf().setMaster(&quot;local&quot;)
  val spark = SparkSession.builder().config(sparkConf).getOrCreate()

  import spark.implicits._

  val host = &quot;localhost&quot;
  val port = 19530
  val user = &quot;root&quot;
  val password = &quot;Milvus&quot;
  val fs = &quot;s3a://&quot;
  val bucketName = &quot;a-bucket&quot;
  val rootPath = &quot;files&quot;
  val minioAK = &quot;minioadmin&quot;
  val minioSK = &quot;minioadmin&quot;
  val minioEndpoint = &quot;localhost:9000&quot;
  val collectionName = &quot;hello_spark_milvus1&quot;
  val targetCollectionName = &quot;hello_spark_milvus2&quot;

  val properties = Map(
    MilvusOptions.MILVUS_HOST -&gt; host,
    MilvusOptions.MILVUS_PORT -&gt; port.toString,
    MilvusOptions.MILVUS_COLLECTION_NAME -&gt; collectionName,
    MilvusOptions.MILVUS_BUCKET -&gt; bucketName,
    MilvusOptions.MILVUS_ROOTPATH -&gt; rootPath,
    MilvusOptions.MILVUS_FS -&gt; fs,
    MilvusOptions.MILVUS_STORAGE_ENDPOINT -&gt; minioEndpoint,
    MilvusOptions.MILVUS_STORAGE_USER -&gt; minioAK,
    MilvusOptions.MILVUS_STORAGE_PASSWORD -&gt; minioSK,
  )

  // 1, configurations
  val milvusOptions = new MilvusOptions(new CaseInsensitiveStringMap(properties.asJava))

  // 2, batch read milvus collection data to dataframe
  //  Schema: dim of `embeddings` is 8
  // +-+------------+------------+------------------+
  // | | field name | field type | other attributes |
  // +-+------------+------------+------------------+
  // |1|    &quot;pk&quot;    |    Int64   |  is_primary=True |
  // | |            |            |   auto_id=False  |
  // +-+------------+------------+------------------+
  // |2|  &quot;random&quot;  |    Double  |                  |
  // +-+------------+------------+------------------+
  // |3|&quot;embeddings&quot;| FloatVector|     dim=8        |
  // +-+------------+------------+------------------+
  val arrayToVectorUDF = udf((arr: Seq[Double]) =&gt; Vectors.dense(arr.toArray[Double]))
  val collectionDF = MilvusUtils.readMilvusCollection(spark, milvusOptions)
    .withColumn(&quot;embeddings_vec&quot;, arrayToVectorUDF($&quot;embeddings&quot;))
    .drop(&quot;embeddings&quot;)
  
  // 3. Use PCA to reduce dim of vector
  val dim = 4
  val pca = new PCA()
    .setInputCol(&quot;embeddings_vec&quot;)
    .setOutputCol(&quot;pca_vec&quot;)
    .setK(dim)
    .fit(collectionDF)
  val vectorToArrayUDF = udf((v: Vector) =&gt; v.toArray)
  // embeddings dim number reduce to 4
  // +-+------------+------------+------------------+
  // | | field name | field type | other attributes |
  // +-+------------+------------+------------------+
  // |1|    &quot;pk&quot;    |    Int64   |  is_primary=True |
  // | |            |            |   auto_id=False  |
  // +-+------------+------------+------------------+
  // |2|  &quot;random&quot;  |    Double  |                  |
  // +-+------------+------------+------------------+
  // |3|&quot;embeddings&quot;| FloatVector|     dim=4        |
  // +-+------------+------------+------------------+
  val pcaDf = pca.transform(collectionDF)
    .withColumn(&quot;embeddings&quot;, vectorToArrayUDF($&quot;pca_vec&quot;))
    .select(&quot;pk&quot;, &quot;random&quot;, &quot;embeddings&quot;)

  // 4. Write PCAed data to S3
  val outputPath = &quot;s3a://a-bucket/result&quot;
  pcaDf.write
    .mode(&quot;overwrite&quot;)
    .format(&quot;parquet&quot;)
    .save(outputPath)

  // 5. Config MilvusOptions of target table  
  val targetProperties = Map(
    MilvusOptions.MILVUS_HOST -&gt; host,
    MilvusOptions.MILVUS_PORT -&gt; port.toString,
    MilvusOptions.MILVUS_COLLECTION_NAME -&gt; targetCollectionName,
    MilvusOptions.MILVUS_BUCKET -&gt; bucketName,
    MilvusOptions.MILVUS_ROOTPATH -&gt; rootPath,
    MilvusOptions.MILVUS_FS -&gt; fs,
    MilvusOptions.MILVUS_STORAGE_ENDPOINT -&gt; minioEndpoint,
    MilvusOptions.MILVUS_STORAGE_USER -&gt; minioAK,
    MilvusOptions.MILVUS_STORAGE_PASSWORD -&gt; minioSK,
  )
  val targetMilvusOptions = new MilvusOptions(new CaseInsensitiveStringMap(targetProperties.asJava))
  
  // 6. Bulkinsert Spark output files into milvus
  MilvusUtils.bulkInsertFromSpark(spark, targetMilvusOptions, outputPath, &quot;parquet&quot;)
}
</code></pre>
<h3 id="Databricks---Zilliz-Cloud" class="common-anchor-header">Databricks -&gt; Zilliz Cloud<button data-href="#Databricks---Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h3><p>Se si utilizza Zilliz Cloud (il servizio gestito di Milvus), si può sfruttare la sua comoda API di importazione dei dati. Zilliz Cloud fornisce strumenti e documentazione completi per aiutarvi a spostare in modo efficiente i dati da varie fonti di dati, tra cui Spark e Databricks. È sufficiente impostare un bucket S3 come intermediario e aprirne l'accesso al vostro account Zilliz Cloud. L'API di importazione dei dati di Zilliz Cloud caricherà automaticamente l'intero batch di dati dal bucket S3 al vostro cluster Zilliz Cloud.</p>
<p><strong>Preparazione</strong></p>
<ol>
<li><p>Caricate il runtime Spark aggiungendo un file jar al vostro cluster Databricks.</p>
<p>È possibile installare una libreria in diversi modi. Questa schermata mostra il caricamento di un jar da locale al cluster. Per ulteriori informazioni, vedere <a href="https://docs.databricks.com/en/libraries/cluster-libraries.html">Librerie del cluster</a> nella documentazione di Databricks.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/install-databricks-library.png" alt="Install Databricks Library" class="doc-image" id="install-databricks-library" />
   </span> <span class="img-wrapper"> <span>Installare la libreria Databricks</span> </span></p></li>
<li><p>Creare un bucket S3 e configurarlo come spazio di archiviazione esterno per il cluster Databricks.</p>
<p>Bulkinsert richiede che i dati siano memorizzati in un bucket temporaneo, in modo che Zilliz Cloud possa importare i dati in un batch. È possibile creare un bucket S3 e configurarlo come posizione esterna di Databricks. Per maggiori dettagli, consultare la sezione <a href="https://docs.databricks.com/en/sql/language-manual/sql-ref-external-locations.html">Posizioni esterne</a>.</p></li>
<li><p>Proteggere le credenziali di Databricks.</p>
<p>Per maggiori dettagli, consultare le istruzioni sul blog <a href="https://www.databricks.com/blog/2018/06/04/securely-managing-credentials-in-databricks.html">Gestione sicura delle credenziali in Databricks</a>.</p></li>
</ol>
<p><strong>Demo</strong></p>
<p>Ecco un frammento di codice che illustra il processo di migrazione dei dati in batch. Come nell'esempio di Milvus, è sufficiente sostituire le credenziali e l'indirizzo del bucket S3.</p>
<pre><code translate="no" class="language-scala">// Write the data in batch into the Milvus bucket storage.
val outputPath = &quot;s3://my-temp-bucket/result&quot;
df.write
  .mode(&quot;overwrite&quot;)
  .format(&quot;mjson&quot;)
  .save(outputPath)
// Specify Milvus options.
val targetProperties = Map(
  MilvusOptions.MILVUS_URI -&gt; zilliz_uri,
  MilvusOptions.MILVUS_TOKEN -&gt; zilliz_token,
  MilvusOptions.MILVUS_COLLECTION_NAME -&gt; targetCollectionName,
  MilvusOptions.MILVUS_BUCKET -&gt; bucketName,
  MilvusOptions.MILVUS_ROOTPATH -&gt; rootPath,
  MilvusOptions.MILVUS_FS -&gt; fs,
  MilvusOptions.MILVUS_STORAGE_ENDPOINT -&gt; minioEndpoint,
  MilvusOptions.MILVUS_STORAGE_USER -&gt; minioAK,
  MilvusOptions.MILVUS_STORAGE_PASSWORD -&gt; minioSK,
)
val targetMilvusOptions = new MilvusOptions(new CaseInsensitiveStringMap(targetProperties.asJava))
  
// Bulk insert Spark output files into Milvus
MilvusUtils.bulkInsertFromSpark(spark, targetMilvusOptions, outputPath, &quot;mjson&quot;)
</code></pre>
<h2 id="Hands-on-Notebook" class="common-anchor-header">Quaderno pratico<button data-href="#Hands-on-Notebook" class="anchor-icon" translate="no">
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
    </button></h2><p>Per aiutarvi a iniziare rapidamente con il connettore Spark-Milvus, potete consultare il notebook che vi guida attraverso gli esempi di ingestione di dati in streaming e batch per Spark a Milvus e Zilliz Cloud.</p>
<ul>
<li><a href="https://zilliz.com/databricks_zilliz_demos">Spark-Milvus Connector Hands-on</a></li>
</ul>
