---
id: kafka-connect-milvus.md
summary: >-
  Apache Kafka è integrato con Milvus e Zilliz Cloud per lo streaming di dati
  vettoriali. Scoprite come utilizzare il connettore Kafka-Milvus per creare
  pipeline in tempo reale per la ricerca semantica, i sistemi di raccomandazione
  e l'analisi guidata dall'intelligenza artificiale.
title: >-
  Connettere Apache Kafka® con Milvus/Zilliz Cloud per l'ingestione di dati
  vettoriali in tempo reale
---
<h1 id="Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="common-anchor-header">Connettere Apache Kafka® con Milvus/Zilliz Cloud per l'ingestione di dati vettoriali in tempo reale<button data-href="#Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="anchor-icon" translate="no">
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
    </button></h1><p>In questa guida rapida mostriamo come configurare kafka open source e Zilliz Cloud per ingerire dati vettoriali.</p>
<p>Questo tutorial spiega come utilizzare Apache Kafka® per lo streaming e l'ingestione di dati vettoriali nel database vettoriale Milvus e in Zilliz Cloud (Milvus completamente gestito), consentendo applicazioni avanzate in tempo reale come la ricerca semantica, i sistemi di raccomandazione e le analisi basate sull'intelligenza artificiale.</p>
<p>Apache Kafka è una piattaforma distribuita di streaming di eventi progettata per pipeline ad alta velocità e bassa latenza. È ampiamente utilizzata per raccogliere, archiviare ed elaborare flussi di dati in tempo reale da fonti quali database, dispositivi IoT, app mobili e servizi cloud. La capacità di Kafka di gestire grandi volumi di dati lo rende un'importante fonte di dati per database vettoriali come Milvus o Zilliz Cloud.</p>
<p>Ad esempio, Kafka può catturare flussi di dati in tempo reale, come le interazioni degli utenti, le letture dei sensori e le loro incorporazioni dai modelli di apprendimento automatico, e pubblicare questi flussi direttamente su Milvus o Zilliz Cloud. Una volta nel database vettoriale, questi dati possono essere indicizzati, ricercati e analizzati in modo efficiente.</p>
<p>L'integrazione di Kafka con Milvus e Zilliz Cloud offre un modo perfetto per creare potenti pipeline per i flussi di lavoro di dati non strutturati. Il connettore funziona sia per l'implementazione di Kafka open-source sia per servizi ospitati come <a href="https://www.confluent.io/hub/zilliz/kafka-connect-milvus">Confluent</a> e <a href="https://docs.streamnative.io/hub/connector-kafka-connect-milvus-sink-v0.1">StreamNative</a>.</p>
<p>In questo tutorial utilizziamo Zilliz Cloud come dimostrazione:</p>
<h2 id="Step-1-Download-the-kafka-connect-milvus-plugin" class="common-anchor-header">Passo 1: Scaricare il plugin kafka-connect-milvus<button data-href="#Step-1-Download-the-kafka-connect-milvus-plugin" class="anchor-icon" translate="no">
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
    </button></h2><p>Completare i seguenti passaggi per scaricare il plugin kafka-connect-milvus.</p>
<ol>
<li>scaricare l'ultimo file zip del plugin <code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> da <a href="https://github.com/zilliztech/kafka-connect-milvus/releases">qui</a>.</li>
</ol>
<h2 id="Step-2-Download-Kafka" class="common-anchor-header">Passo 2: Scaricare Kafka<button data-href="#Step-2-Download-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Scaricare l'ultima versione di kafka da <a href="https://kafka.apache.org/downloads">qui</a>.</li>
<li>Decomprimere il file scaricato e accedere alla directory kafka.</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">tar -xzf kafka_2.13-3.6.1.tgz</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> kafka_2.13-3.6.1</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STEP-3-Start-the-Kafka-Environment" class="common-anchor-header">FASE 3: Avviare l'ambiente Kafka<button data-href="#STEP-3-Start-the-Kafka-Environment" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>NOTA: L'ambiente locale deve avere installato Java 8+.</p>
</div>
<p>Eseguire i seguenti comandi per avviare tutti i servizi nell'ordine corretto:</p>
<ol>
<li><p>Avviare il servizio ZooKeeper</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bin/zookeeper-server-start.sh config/zookeeper.properties</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Avviare il servizio broker Kafka</p>
<p>Aprire un'altra sessione di terminale ed eseguire:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bin/kafka-server-start.sh config/server.properties</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Una volta che tutti i servizi sono stati avviati con successo, si avrà un ambiente Kafka di base funzionante e pronto all'uso.</p>
<ul>
<li>Per maggiori dettagli, consultare la guida rapida ufficiale di kafka: https://kafka.apache.org/quickstart.</li>
</ul>
<h2 id="Step-4-Configure-Kafka-and-Zilliz-Cloud" class="common-anchor-header">Passo 4: Configurare Kafka e Zilliz Cloud<button data-href="#Step-4-Configure-Kafka-and-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>Assicurarsi di aver impostato e configurato correttamente Kafka e Zilliz Cloud.</p>
<ol>
<li><p>Se non si dispone già di un argomento in Kafka, creare un argomento (ad esempio <code translate="no">topic_0</code>) in Kafka.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bin/kafka-topics.sh --create --topic topic_0 --bootstrap-server localhost:9092</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Se non si dispone già di una raccolta in Zilliz Cloud, creare una raccolta con un campo vettoriale (in questo esempio il vettore è <code translate="no">dimension=8</code>). È possibile utilizzare il seguente schema di esempio su Zilliz Cloud:</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/collection_schema.png" width="100%"  alt=""/></p>
<p><div class="alert note"></p>
<p>Nota: assicurarsi che gli schemi di entrambe le parti corrispondano. Nello schema c'è esattamente un campo vettoriale. I nomi di ciascun campo su entrambi i lati sono esattamente gli stessi.</p>
<p></div></p></li>
</ol>
<h2 id="Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="common-anchor-header">Passo 5: caricare il plugin kafka-connect-milvus sull'istanza Kafka<button data-href="#Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>decomprimere il file <code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> scaricato al passo 1.</p></li>
<li><p>copiare le directory <code translate="no">zilliz-kafka-connect-milvus</code> nella directory <code translate="no">libs</code> della propria installazione di Kafka.</p></li>
<li><p>modificare il file <code translate="no">connect-standalone.properties</code> nella directory <code translate="no">config</code> dell'installazione di Kafka.</p>
<pre><code translate="no" class="language-properties">key.converter.schemas.enable=false
value.converter.schemas.enable=false
plugin.path=libs/zilliz-kafka-connect-milvus-xxx
</code></pre></li>
<li><p>creare e configurare un file <code translate="no">milvus-sink-connector.properties</code> nella directory <code translate="no">config</code> dell'installazione di Kafka.</p>
<pre><code translate="no" class="language-properties">name=zilliz-kafka-connect-milvus
connector.class=com.milvus.io.kafka.MilvusSinkConnector
public.endpoint=https://&lt;public.endpoint&gt;:port
token=*****************************************
collection.name=topic_0
topics=topic_0
</code></pre></li>
</ol>
<h2 id="Step-6-Launch-the-connector" class="common-anchor-header">Passo 6: Avviare il connettore<button data-href="#Step-6-Launch-the-connector" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Avviare il connettore con il file di configurazione precedente</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bin/connect-standalone.sh config/connect-standalone.properties config/milvus-sink-connector.properties</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Provare a produrre un messaggio al topic Kafka appena creato in Kafka.</p>
<pre><code translate="no" class="language-shell">bin/kafka-console-producer.sh --topic topic_0 --bootstrap-server localhost:9092                        
<span class="hljs-meta prompt_">&gt;</span><span class="language-bash">{<span class="hljs-string">&quot;id&quot;</span>: 0, <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;The Reported Mortality Rate of Coronavirus Is Not Important&quot;</span>, <span class="hljs-string">&quot;title_vector&quot;</span>: [0.041732933, 0.013779674, -0.027564144, -0.013061441, 0.009748648, 0.00082446384, -0.00071647146, 0.048612226], <span class="hljs-string">&quot;link&quot;</span>: <span class="hljs-string">&quot;https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912&quot;</span>}</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verificare se l'entità è stata inserita nella raccolta in Zilliz Cloud. Ecco come appare su Zilliz Cloud se l'inserimento è riuscito:</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/insearted_entities.png" width="80%" /></p></li>
</ol>
<h3 id="Support" class="common-anchor-header">Assistenza</h3><p>Se avete bisogno di assistenza o avete domande sul connettore Kafka Connect Milvus, non esitate a contattare il manutentore del connettore: <strong>Email:</strong> <a href="mailto:support@zilliz.com">support@zilliz.com</a></p>
