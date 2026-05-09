---
id: set-collection-ttl.md
title: Impostazione del TTL della raccolta
summary: >-
  Configurare i criteri TTL a livello di raccolta o di entità per far scadere
  automaticamente i dati obsoleti in Milvus.
---
<h1 id="Set-Collection-TTL" class="common-anchor-header">Impostazione del TTL della raccolta<button data-href="#Set-Collection-TTL" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus può far scadere automaticamente le entità attraverso una politica di <strong>Time-to-Live (TTL)</strong>. Le entità scadute smettono immediatamente di apparire nei risultati delle query e delle ricerche e vengono fisicamente rimosse dall'archivio al successivo ciclo di compattazione, in genere entro 24 ore.</p>
<p>Esistono due modalità di TTL:</p>
<ul>
<li><p><strong>TTL a livello di collezione</strong>: una finestra di conservazione condivisa da ogni entità, impostata tramite la proprietà <code translate="no">collection.ttl.seconds</code>.</p></li>
<li><p><strong>TTL a livello di entità</strong>: ogni entità ha il proprio tempo di scadenza assoluto in un campo dedicato <code translate="no">TIMESTAMPTZ</code>, contrassegnato come campo TTL dalla proprietà <code translate="no">ttl_field</code>.</p></li>
</ul>
<div class="alert note">
<p>Questa funzione si applica solo alle raccolte gestite.</p>
</div>
<h2 id="Limits" class="common-anchor-header">Limiti<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Le due modalità di TTL si escludono a vicenda. Una raccolta non può avere <code translate="no">collection.ttl.seconds</code> e <code translate="no">ttl_field</code> impostate contemporaneamente. Per cambiare, vedere <a href="/docs/it/set-collection-ttl.md#Migrate-between-the-two-modes">Migrazione tra le due modalità</a>.</p></li>
<li><p>Il TTL a livello di collezione applica una finestra all'intera collezione. Se una singola riga ha bisogno di una durata diversa, usare il TTL a livello di entità.</p></li>
<li><p>Il campo per il TTL a livello di entità deve essere <code translate="no">TIMESTAMPTZ</code>. Altri tipi vengono rifiutati.</p></li>
<li><p>Un campo TTL per collezione. Lo schema può contenere più campi <code translate="no">TIMESTAMPTZ</code>, ma solo uno può essere nominato in <code translate="no">ttl_field</code>.</p></li>
<li><p>L'eliminazione di <code translate="no">ttl_field</code> non fa riemergere entità scadute. Per ripristinare un'entità scaduta, occorre reinserirla con un <code translate="no">NULL</code> o un timestamp di scadenza futuro.</p></li>
</ul>
<h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p><details></p>
<p><summary>Espandere</summary></p>
<h3 id="When-to-use-TTL" class="common-anchor-header">Quando usare il TTL<button data-href="#When-to-use-TTL" class="anchor-icon" translate="no">
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
    </button></h3><p>Il TTL è lo strumento giusto quando la conservazione è una <strong>politica</strong>: si sa in anticipo che certe entità devono scomparire e si vuole che il cluster le applichi senza dover scrivere un cron job.</p>
<p>Scenari tipici:</p>
<ul>
<li><p><strong>Insiemi di dati con finestre temporali.</strong> Conservare solo gli ultimi N giorni di log, metriche, eventi o cache di funzionalità di breve durata.</p></li>
<li><p><strong>Raccolte multi-tenant.</strong> Diversi tenant hanno finestre di conservazione diverse nella stessa raccolta.</p></li>
<li><p><strong>Politiche di conservazione per record.</strong> Durata per documento nelle pipeline IoT, negli archivi di documenti o negli archivi di funzioni MLOps.</p></li>
<li><p><strong>Mix di dati caldi e freddi.</strong> Entità di breve durata coesistono con entità di lunga durata nella stessa raccolta.</p></li>
<li><p><strong>Scadenza orientata alla conformità.</strong> Minimizzazione dei dati in stile GDPR, in cui ogni record ha una propria data di cancellazione.</p></li>
<li><p><strong>Scadenza per motivi di lavoro.</strong> Un'entità rappresenta un record che è valido solo fino a un momento assoluto (la fine di una campagna, la scadenza di una sessione).</p></li>
</ul>
<div class="alert note">
<p>Le entità scadute non appariranno nei risultati delle ricerche o delle query. Tuttavia, possono rimanere nello storage fino alla successiva compattazione dei dati, che dovrebbe essere effettuata entro le 24 ore successive.</p>
<p>È possibile controllare quando attivare la compattazione dei dati impostando la voce di configurazione <code translate="no">dataCoord.compaction.expiry.tolerance</code> nel file di configurazione di Milvus.</p>
<p>Il valore predefinito di questa voce di configurazione è <code translate="no">-1</code>, che indica che si applica l'intervallo di compattazione dei dati esistente. Tuttavia, se si cambia il valore in un numero intero positivo, come <code translate="no">12</code>, la compattazione dei dati verrà attivata il numero di ore specificato dopo che le entità sono scadute.</p>
</div>
<h3 id="TTL-modes" class="common-anchor-header">Modalità TTL<button data-href="#TTL-modes" class="anchor-icon" translate="no">
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
    </button></h3><p>Le due modalità rispondono a domande di conservazione diverse:</p>
<ul>
<li><p>Il<strong>TTL a livello di raccolta</strong> applica una singola durata di conservazione a ogni entità. Ogni entità scade all'indirizzo <code translate="no">insert_ts + ttl_seconds</code>.</p></li>
<li><p>Il<strong>TTL a livello di entità</strong> consente a ogni entità di memorizzare il proprio tempo di scadenza assoluto in un campo <code translate="no">TIMESTAMPTZ</code>. Un <code translate="no">NULL</code> in quel campo significa che l'entità non scade mai.</p></li>
</ul>
<p>Una collezione utilizza <strong>una</strong> modalità alla volta: le due modalità si escludono a vicenda. Passare da una modalità all'altra è un'operazione in più fasi; vedere Migrazione tra le due modalità.</p>
<p>Usare questa tabella per scegliere una modalità:</p>
<table>
   <tr>
     <th><p><strong>Se la vostra situazione è...</strong></p></th>
     <th><p><strong>Utilizzare</strong></p></th>
   </tr>
   <tr>
     <td><p>Ogni entità della raccolta deve seguire la stessa finestra di conservazione</p></td>
     <td><p>TTL a livello di collezione</p></td>
   </tr>
   <tr>
     <td><p>La conservazione è "dal momento dell'inserimento, mantenere N secondi".</p></td>
     <td><p>TTL a livello di collezione</p></td>
   </tr>
   <tr>
     <td><p>Entità diverse hanno bisogno di tempi di vita diversi nella stessa raccolta (per tenant, hot/cold, per documento)</p></td>
     <td><p>TTL a livello di entità</p></td>
   </tr>
   <tr>
     <td><p>La conservazione è un tempo assoluto (ad esempio, 2027-01-01T00:00:00Z).</p></td>
     <td><p>TTL a livello di entità</p></td>
   </tr>
   <tr>
     <td><p>La conservazione è guidata da un timestamp aziendale, non dal timestamp di inserimento.</p></td>
     <td><p>TTL a livello di entità</p></td>
   </tr>
   <tr>
     <td><p>Si desidera aggiornare o estendere la durata di vita di un'entità dopo l'inserimento</p></td>
     <td><p>TTL a livello di entità</p></td>
   </tr>
   <tr>
     <td><p>Alcune entità non dovrebbero mai scadere, mentre altre dovrebbero</p></td>
     <td><p>TTL a livello di entità (usare NULL per quelle immortali)</p></td>
   </tr>
</table>
<p></details></p>
<h2 id="Set-collection-level-TTL" class="common-anchor-header">Impostare il TTL a livello di collezione<button data-href="#Set-collection-level-TTL" class="anchor-icon" translate="no">
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
    </button></h2><p>Usare il TTL a livello di collezione quando ogni entità della collezione deve seguire la stessa finestra di conservazione.</p>
<h3 id="Enable-on-a-new-collection" class="common-anchor-header">Abilitare su una nuova collezione<button data-href="#Enable-on-a-new-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Passare <code translate="no">collection.ttl.seconds</code> (intero, in secondi) attraverso la mappa <code translate="no">properties</code> al momento della creazione.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params,
<span class="highlighted-comment-line">    properties={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>  <span class="hljs-comment"># 14 days</span></span>
<span class="highlighted-comment-line">    },</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder().build();
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;id&quot;</span>).dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>).autoID(<span class="hljs-literal">false</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>).dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">128</span>).build());

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE).build();

<span class="highlighted-comment-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">properties.put(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>, <span class="hljs-string">&quot;1209600&quot;</span>); <span class="hljs-comment">// 14 days</span></span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.createCollection(CreateCollectionReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .collectionSchema(schema)</span>
<span class="highlighted-comment-line">        .indexParams(Collections.singletonList(indexParam))</span>
<span class="highlighted-comment-line">        .properties(properties)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">fields</span>: [
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span> },
  ],
  <span class="hljs-attr">index_params</span>: [
    { <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span> },
  ],
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>, <span class="hljs-comment">// 14 days</span></span>
<span class="highlighted-comment-line">  },</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
    WithProperty(common.CollectionTTLConfigKey, <span class="hljs-number">1209600</span>)) <span class="hljs-comment">//  TTL in seconds</span>
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;ttlSeconds&quot;: 1209600
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-on-an-existing-collection" class="common-anchor-header">Abilitazione su una raccolta esistente<button data-href="#Enable-on-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Chiamare <code translate="no">alter_collection_properties</code> con <code translate="no">collection.ttl.seconds</code> nella mappa <code translate="no">properties</code> per applicare il TTL a una collezione già in uso.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assumes &quot;my_collection&quot; was created earlier without TTL</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> client.has_collection(<span class="hljs-string">&quot;my_collection&quot;</span>):
    client.create_collection(
        collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
        schema=schema,
        index_params=index_params,
    )

<span class="highlighted-comment-line">client.alter_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    properties={<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>},</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; was created earlier without TTL.</span>

<span class="highlighted-comment-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">properties.put(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>, <span class="hljs-string">&quot;1209600&quot;</span>);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .properties(properties)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-comment">// Assumes &quot;my_collection&quot; was created earlier without TTL.</span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: { <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span> },</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithProperty(common.CollectionTTLConfigKey, <span class="hljs-number">60</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;properties\&quot;: {
        \&quot;collection.ttl.seconds\&quot;: 1209600
    }
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Drop-the-TTL-setting" class="common-anchor-header">Eliminare l'impostazione TTL<button data-href="#Drop-the-TTL-setting" class="anchor-icon" translate="no">
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
    </button></h3><p>Se si decide di mantenere i dati in una raccolta a tempo indeterminato, si può semplicemente eliminare l'impostazione TTL da quella raccolta.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    property_keys=[<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>],</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="highlighted-comment-line">client.dropCollectionProperties(DropCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionProperties</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: [<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropCollectionProperties(ctx, milvusclient.NewDropCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>, common.CollectionTTLConfigKey))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/drop_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;propertyKeys\&quot;: [
        \&quot;collection.ttl.seconds\&quot;
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-entity-level-TTL--Milvus-30x" class="common-anchor-header">Impostare il TTL a livello di entità<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Set-entity-level-TTL--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h2><p>Il TTL a livello di entità consente a ogni entità di avere un proprio tempo di scadenza assoluto. Il tempo è memorizzato in una colonna <code translate="no">TIMESTAMPTZ</code> dedicata, dichiarata nello schema, e contrassegnata come campo TTL attraverso la proprietà della collezione <code translate="no">ttl_field</code>.</p>
<h3 id="Enable-on-a-new-collection" class="common-anchor-header">Abilitazione su una nuova collezione<button data-href="#Enable-on-a-new-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>L'abilitazione del TTL a livello di entità al momento della creazione richiede due aggiunte nella stessa chiamata a <code translate="no">create_collection</code>: un campo <code translate="no">TIMESTAMPTZ</code> nello schema e la proprietà <code translate="no">ttl_field</code> che punta a quel campo.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
<span class="highlighted-wrapper-line">schema.add_field(<span class="hljs-string">&quot;expire_at&quot;</span>, DataType.TIMESTAMPTZ, nullable=<span class="hljs-literal">True</span>)</span>
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

index_params = client.prepare_index_params()
index_params.add_index(field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
                       metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params,
<span class="highlighted-wrapper-line">    properties={<span class="hljs-string">&quot;ttl_field&quot;</span>: <span class="hljs-string">&quot;expire_at&quot;</span>},</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder().build();
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;id&quot;</span>).dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>).autoID(<span class="hljs-literal">false</span>).build());
<span class="highlighted-wrapper-line">schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;expire_at&quot;</span>).dataType(DataType.Timestamptz)</span>
        .isNullable(<span class="hljs-literal">true</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>).dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">128</span>).build());

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE).build();

<span class="highlighted-wrapper-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-wrapper-line">properties.put(<span class="hljs-string">&quot;ttl_field&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>);</span>

client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(Collections.singletonList(indexParam))
        .properties(properties)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">fields</span>: [
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span> },
<span class="highlighted-wrapper-line">    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Timestamptz</span>, <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span> },</span>
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span> },
  ],
  <span class="hljs-attr">index_params</span>: [
    { <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span> },
  ],
<span class="highlighted-wrapper-line">  <span class="hljs-attr">properties</span>: { <span class="hljs-attr">ttl_field</span>: <span class="hljs-string">&quot;expire_at&quot;</span> },</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una volta che la collezione esiste, inserire le entità con stringhe di timestamp <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assumes &quot;my_collection&quot; was created earlier with `ttl_field`: &quot;expire_at&quot;</span>
<span class="highlighted-comment-line">rows = [</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Never expires</span></span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-literal">None</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)]},</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Expires at 2026-12-31 UTC midnight</span></span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)]},</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Shanghai local time — normalized to UTC internally</span></span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2027-01-01T00:00:00+08:00&quot;</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)]},</span>
<span class="highlighted-comment-line">]</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.insert(<span class="hljs-string">&quot;my_collection&quot;</span>, rows)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonNull;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; was created earlier with `ttl_field`: &quot;expire_at&quot;.</span>
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">Random</span> <span class="hljs-variable">rng</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();

List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">128</span>; i++) vector.add(rng.nextFloat());

<span class="highlighted-comment-line">List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Never expires</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">r1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">r1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);</span>
<span class="highlighted-comment-line">r1.add(<span class="hljs-string">&quot;expire_at&quot;</span>, JsonNull.INSTANCE);</span>
<span class="highlighted-comment-line">r1.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">rows.add(r1);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Expires at 2026-12-31 UTC midnight</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">r2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">r2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);</span>
<span class="highlighted-comment-line">r2.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>);</span>
<span class="highlighted-comment-line">r2.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">rows.add(r2);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Shanghai local time — normalized to UTC internally</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">r3</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">r3.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">3</span>);</span>
<span class="highlighted-comment-line">r3.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2027-01-01T00:00:00+08:00&quot;</span>);</span>
<span class="highlighted-comment-line">r3.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">rows.add(r3);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.insert(InsertReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .data(rows)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">const</span> vector = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">128</span> }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; was created earlier with `ttl_field`: &quot;expire_at&quot;.</span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">data</span>: [</span>
<span class="highlighted-comment-line">    <span class="hljs-comment">// Never expires</span></span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">expire_at</span>: <span class="hljs-literal">null</span>, vector },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment">// Expires at 2026-12-31 UTC midnight</span></span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">expire_at</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>, vector },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment">// Shanghai local time — normalized to UTC internally</span></span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">expire_at</span>: <span class="hljs-string">&quot;2027-01-01T00:00:00+08:00&quot;</span>, vector },</span>
<span class="highlighted-comment-line">  ],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>In ogni query e ricerca vettoriale, il server inserisce automaticamente il filtro TTL: non dovrete scriverne uno voi e le entità scadute non appariranno mai nei risultati:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.load_collection(<span class="hljs-string">&quot;my_collection&quot;</span>)

<span class="highlighted-comment-line"><span class="hljs-comment"># Expired rows are filtered out automatically</span></span>
<span class="highlighted-comment-line">results = client.query(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id &gt;= 0&quot;</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>],</span>
<span class="highlighted-comment-line">    limit=<span class="hljs-number">10</span>,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"><span class="hljs-built_in">print</span>(results)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

client.loadCollection(LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build());

<span class="highlighted-comment-line"><span class="hljs-comment">// Expired rows are filtered out automatically</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">QueryResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .filter(<span class="hljs-string">&quot;id &gt;= 0&quot;</span>)</span>
<span class="highlighted-comment-line">        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>))</span>
<span class="highlighted-comment-line">        .limit(<span class="hljs-number">10L</span>)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line">System.out.println(results.getQueryResults());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span> });

<span class="highlighted-comment-line"><span class="hljs-comment">// Expired rows are filtered out automatically</span></span>
<span class="highlighted-comment-line"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;id &gt;= 0&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>],</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,</span>
<span class="highlighted-comment-line">});</span>
<span class="highlighted-comment-line"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(results.<span class="hljs-property">data</span>);</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Lo stesso filtro automatico si applica a <code translate="no">client.search()</code>.</p>
<p>Per prolungare la vita di un'entità prima che la compattazione la rimuova fisicamente, si può fare un upsert con un timestamp di scadenza successivo - o <code translate="no">None</code> - per restituire l'entità all'insieme interrogabile.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.upsert(<span class="hljs-string">&quot;my_collection&quot;</span>, [</span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)],</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2028-01-01T00:00:00Z&quot;</span>},</span>
<span class="highlighted-comment-line">])</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">Random</span> <span class="hljs-variable">rng</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">128</span>; i++) vector.add(rng.nextFloat());

<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);</span>
<span class="highlighted-comment-line">row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2028-01-01T00:00:00Z&quot;</span>);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.upsert(UpsertReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .data(Collections.singletonList(row))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">const</span> vector = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">128</span> }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>());

<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">data</span>: [</span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, vector, <span class="hljs-attr">expire_at</span>: <span class="hljs-string">&quot;2028-01-01T00:00:00Z&quot;</span> },</span>
<span class="highlighted-comment-line">  ],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-on-an-existing-collection" class="common-anchor-header">Abilitazione su un insieme esistente<button data-href="#Enable-on-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Se la collezione esiste già e non ha <code translate="no">collection.ttl.seconds</code> impostato, aggiungere una colonna <code translate="no">TIMESTAMPTZ</code> con <code translate="no">add_collection_field</code>, quindi contrassegnarla come campo TTL con <code translate="no">alter_collection_properties</code>. Facoltativamente, inserire le righe storiche per riempire i loro timestamp di scadenza: le righe non riempite mantengono <code translate="no">NULL</code> e non scadono mai.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line"><span class="hljs-comment"># Step 1 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;expire_at&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.TIMESTAMPTZ,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 2 — mark the new column as the TTL field</span></span>
<span class="highlighted-comment-line">client.alter_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    properties={<span class="hljs-string">&quot;ttl_field&quot;</span>: <span class="hljs-string">&quot;expire_at&quot;</span>},</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 3 (optional) — backfill expiration timestamps for historical rows</span></span>
<span class="highlighted-comment-line">client.upsert(<span class="hljs-string">&quot;my_collection&quot;</span>, [</span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)],</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>},</span>
<span class="highlighted-comment-line">])</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="highlighted-comment-line"><span class="hljs-comment">// Step 1 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line">client.addCollectionField(AddCollectionFieldReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .fieldName(<span class="hljs-string">&quot;expire_at&quot;</span>)</span>
<span class="highlighted-comment-line">        .dataType(DataType.Timestamptz)</span>
<span class="highlighted-comment-line">        .isNullable(<span class="hljs-literal">true</span>)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 2 — mark the new column as the TTL field</span></span>
<span class="highlighted-comment-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">properties.put(<span class="hljs-string">&quot;ttl_field&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>);</span>
<span class="highlighted-comment-line">client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .properties(properties)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 3 (optional) — backfill expiration timestamps for historical rows</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();</span>
<span class="highlighted-comment-line"><span class="hljs-type">Random</span> <span class="hljs-variable">rng</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();</span>
<span class="highlighted-comment-line">List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();</span>
<span class="highlighted-comment-line"><span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">128</span>; i++) vector.add(rng.nextFloat());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);</span>
<span class="highlighted-comment-line">row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.upsert(UpsertReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .data(Collections.singletonList(row))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">const</span> vector = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">128</span> }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>());

<span class="highlighted-comment-line"><span class="hljs-comment">// Step 1 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">field</span>: { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Timestamptz</span>, <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span> },</span>
<span class="highlighted-comment-line">});</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 2 — mark the new column as the TTL field</span></span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: { <span class="hljs-attr">ttl_field</span>: <span class="hljs-string">&quot;expire_at&quot;</span> },</span>
<span class="highlighted-comment-line">});</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 3 (optional) — backfill expiration timestamps for historical rows</span></span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">data</span>: [</span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, vector, <span class="hljs-attr">expire_at</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span> },</span>
<span class="highlighted-comment-line">  ],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Drop-the-TTL-setting" class="common-anchor-header">Eliminare l'impostazione TTL<button data-href="#Drop-the-TTL-setting" class="anchor-icon" translate="no">
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
    </button></h3><p>Richiamare <code translate="no">drop_collection_properties</code> con <code translate="no">ttl_field</code> in <code translate="no">property_keys</code> per interrompere la scadenza per entità. La colonna <code translate="no">TIMESTAMPTZ</code> rimane nello schema: è ancora possibile eseguire query su di essa come un campo normale.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    property_keys=[<span class="hljs-string">&quot;ttl_field&quot;</span>],</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="highlighted-comment-line">client.dropCollectionProperties(DropCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;ttl_field&quot;</span>))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionProperties</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: [<span class="hljs-string">&quot;ttl_field&quot;</span>],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>L'abbandono di <code translate="no">ttl_field</code> disabilita il filtro automatico per le query future, ma le entità che erano già scadute non vengono più visualizzate automaticamente. Per rendere visibile un'entità scaduta in precedenza, è necessario inserirla con un timestamp di scadenza <code translate="no">None</code> o futuro: è l'unico modo per ripristinare l'accesso alle righe scadute all'interno della stessa sessione di caricamento.</p>
<h2 id="Migrate-between-the-two-modes" class="common-anchor-header">Migrare tra le due modalità<button data-href="#Migrate-between-the-two-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Le due modalità TTL si escludono a vicenda, quindi il passaggio da una all'altra è un'operazione in più fasi.</p>
<h3 id="Switch-from-collection-level-to-entity-level-TTL" class="common-anchor-header">Passare dal TTL a livello di collezione a quello a livello di entità<button data-href="#Switch-from-collection-level-to-entity-level-TTL" class="anchor-icon" translate="no">
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
    </button></h3><p>Se la collezione è stata creata con <code translate="no">collection.ttl.seconds</code> e si desidera passare alla scadenza per entità, seguire questi quattro passaggi. Saltando il passo 1, il passo 3 fallirà con <code translate="no">collection TTL is already set, cannot be set ttl field</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assumes &quot;my_collection&quot; already exists with `collection.ttl.seconds` set.</span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 1 — disable collection-level TTL (mandatory; the two modes are mutually exclusive)</span></span>
<span class="highlighted-comment-line">client.drop_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    property_keys=[<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>],</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 2 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;expire_at&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.TIMESTAMPTZ,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 3 — set the ttl_field property on the column you just added</span></span>
<span class="highlighted-comment-line">client.alter_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    properties={<span class="hljs-string">&quot;ttl_field&quot;</span>: <span class="hljs-string">&quot;expire_at&quot;</span>},</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 4 (optional) — backfill expiration timestamps for historical entities</span></span>
<span class="highlighted-comment-line">client.upsert(<span class="hljs-string">&quot;my_collection&quot;</span>, [</span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)],</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>},</span>
<span class="highlighted-comment-line">])</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; already exists with `collection.ttl.seconds` set.</span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 1 — disable collection-level TTL (mandatory; the two modes are mutually exclusive)</span></span>
<span class="highlighted-comment-line">client.dropCollectionProperties(DropCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>))</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 2 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line">client.addCollectionField(AddCollectionFieldReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .fieldName(<span class="hljs-string">&quot;expire_at&quot;</span>)</span>
<span class="highlighted-comment-line">        .dataType(DataType.Timestamptz)</span>
<span class="highlighted-comment-line">        .isNullable(<span class="hljs-literal">true</span>)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 3 — set the ttl_field property on the column you just added</span></span>
<span class="highlighted-comment-line">Map&lt;String, String&gt; ttlField = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">ttlField.put(<span class="hljs-string">&quot;ttl_field&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>);</span>
<span class="highlighted-comment-line">client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .properties(ttlField)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 4 (optional) — backfill expiration timestamps for historical entities</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();</span>
<span class="highlighted-comment-line"><span class="hljs-type">Random</span> <span class="hljs-variable">rng</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();</span>
<span class="highlighted-comment-line">List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();</span>
<span class="highlighted-comment-line"><span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">128</span>; i++) vector.add(rng.nextFloat());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);</span>
<span class="highlighted-comment-line">row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.upsert(UpsertReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .data(Collections.singletonList(row))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Le entità storiche per le quali non si effettua il backfill di <code translate="no">expire_at</code> avranno <code translate="no">NULL</code> in quella colonna, il che significa che non scadranno mai. Compilare solo le righe che dovrebbero avere una durata limitata.</p>
<h3 id="Switch-from-entity-level-to-collection-level-TTL" class="common-anchor-header">Passare dal TTL a livello di entità a quello a livello di collezione<button data-href="#Switch-from-entity-level-to-collection-level-TTL" class="anchor-icon" translate="no">
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
    </button></h3><p>Per muoversi nell'altra direzione, abbandonare <code translate="no">ttl_field</code> e impostare <code translate="no">collection.ttl.seconds</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assumes &quot;my_collection&quot; already exists with `ttl_field` set.</span>
<span class="highlighted-comment-line">client.drop_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    property_keys=[<span class="hljs-string">&quot;ttl_field&quot;</span>],</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line">client.alter_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    properties={<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>},  <span class="hljs-comment"># 14 days</span></span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; already exists with `ttl_field` set.</span>
<span class="highlighted-comment-line">client.dropCollectionProperties(DropCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;ttl_field&quot;</span>))</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">properties.put(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>, <span class="hljs-string">&quot;1209600&quot;</span>); <span class="hljs-comment">// 14 days</span></span>
<span class="highlighted-comment-line">client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .properties(properties)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="FAQs" class="common-anchor-header">Domande frequenti<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="When-does-data-expire-due-to-TTL-settings" class="common-anchor-header">Quando scadono i dati a causa delle impostazioni del TTL?<button data-href="#When-does-data-expire-due-to-TTL-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>Attualmente, i dati scadono in base al momento in cui sono stati inseriti o aggiornati. I dati scaduti non vengono visualizzati nei risultati della ricerca. Per maggiori dettagli, consultare la sezione <a href="/docs/it/set-collection-ttl.md#Dyq9dQUmwoAk9WxwEuEcSDkPnoc">Esempi</a>.</p>
<h3 id="When-will-the-expired-data-be-physically-deleted" class="common-anchor-header">Quando verranno eliminati fisicamente i dati scaduti?<button data-href="#When-will-the-expired-data-be-physically-deleted" class="anchor-icon" translate="no">
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
    </button></h3><p>Una volta scaduti, i dati non saranno più inclusi nei risultati di ricerca. Tuttavia, verranno eliminati fisicamente solo dopo la successiva compattazione del sistema, in base alle politiche di compattazione del cluster.</p>
