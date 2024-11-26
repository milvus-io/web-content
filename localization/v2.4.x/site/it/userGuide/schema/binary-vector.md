---
id: binary-vector.md
title: Vettore binario
summary: >-
  I vettori binari sono una forma speciale di rappresentazione dei dati che
  converte i tradizionali vettori in virgola mobile ad alta dimensione in
  vettori binari contenenti solo 0 e 1. Questa trasformazione non solo comprime
  le dimensioni dei vettori, ma riduce anche i costi di memorizzazione e
  conserva le informazioni semantiche. Questa trasformazione non solo comprime
  le dimensioni del vettore, ma riduce anche i costi di archiviazione e di
  calcolo, mantenendo le informazioni semantiche. Quando la precisione per le
  caratteristiche non critiche non è essenziale, i vettori binari possono
  effettivamente mantenere la maggior parte dell'integrità e dell'utilità dei
  vettori originali in virgola mobile.
---
<h1 id="Binary-Vector​" class="common-anchor-header">Vettore binario<button data-href="#Binary-Vector​" class="anchor-icon" translate="no">
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
    </button></h1><p>I vettori binari sono una forma speciale di rappresentazione dei dati che converte i tradizionali vettori in virgola mobile ad alta dimensione in vettori binari contenenti solo 0 e 1. Questa trasformazione non solo comprime le dimensioni del vettore, ma riduce anche i costi di archiviazione e di calcolo, mantenendo le informazioni semantiche. Questa trasformazione non solo comprime le dimensioni del vettore, ma riduce anche i costi di archiviazione e di calcolo, mantenendo le informazioni semantiche. Quando la precisione per le caratteristiche non critiche non è essenziale, i vettori binari possono effettivamente mantenere la maggior parte dell'integrità e dell'utilità dei vettori originali in virgola mobile.</p>
<p>I vettori binari hanno un'ampia gamma di applicazioni, in particolare in situazioni in cui l'efficienza computazionale e l'ottimizzazione della memorizzazione sono fondamentali. Nei sistemi di intelligenza artificiale su larga scala, come i motori di ricerca o i sistemi di raccomandazione, l'elaborazione in tempo reale di enormi quantità di dati è fondamentale. Riducendo le dimensioni dei vettori, i vettori binari aiutano a ridurre la latenza e i costi di calcolo senza sacrificare in modo significativo la precisione. Inoltre, i vettori binari sono utili in ambienti con risorse limitate, come i dispositivi mobili e i sistemi embedded, dove la memoria e la potenza di elaborazione sono limitate. Grazie all'uso dei vettori binari, è possibile implementare complesse funzioni di intelligenza artificiale in questi ambienti limitati, mantenendo alte le prestazioni.</p>
<h2 id="Overview​" class="common-anchor-header">Panoramica<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>I vettori binari sono un metodo per codificare oggetti complessi (come immagini, testo o audio) in valori binari di lunghezza fissa. In Milvus, i vettori binari sono tipicamente rappresentati come array di bit o array di byte. Ad esempio, un vettore binario a 8 dimensioni può essere rappresentato come <code translate="no">[1, 0, 1, 1, 0, 0, 1, 0]</code>.</p>
<p>Il diagramma seguente mostra come i vettori binari rappresentano la presenza di parole chiave nel contenuto del testo. In questo esempio, un vettore binario a 10 dimensioni viene utilizzato per rappresentare due testi diversi<strong>(Testo 1</strong> e <strong>Testo 2</strong>), dove ogni dimensione corrisponde a una parola del vocabolario: 1 indica la presenza della parola nel testo, mentre 0 indica la sua assenza.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/binary-vector.png" alt="Binary vector representation of text content" class="doc-image" id="binary-vector-representation-of-text-content" />
   </span> <span class="img-wrapper"> <span>Rappresentazione vettoriale binaria del contenuto del testo</span> </span></p>
<p>I vettori binari hanno le seguenti caratteristiche.</p>
<ul>
<li><p><strong>Memorizzazione efficiente:</strong> Ogni dimensione richiede solo 1 bit di memoria, riducendo in modo significativo lo spazio di archiviazione.</p></li>
<li><p><strong>Rapidità di calcolo:</strong> La somiglianza tra i vettori può essere calcolata rapidamente utilizzando operazioni bitwise come XOR.</p></li>
<li><p><strong>Lunghezza fissa:</strong> La lunghezza del vettore rimane costante indipendentemente dalla lunghezza del testo originale, facilitando l'indicizzazione e il recupero.</p></li>
<li><p><strong>Semplice e intuitivo:</strong> Riflette direttamente la presenza di parole chiave, rendendolo adatto ad alcuni compiti di ricerca specializzati.</p></li>
</ul>
<p>I vettori binari possono essere generati con diversi metodi. Nell'elaborazione del testo, si possono utilizzare vocabolari predefiniti per impostare i bit corrispondenti in base alla presenza delle parole. Per l'elaborazione delle immagini, gli algoritmi di hashing percettivo (come <a href="https://en.wikipedia.org/wiki/Perceptual_hashing">pHash</a>) possono generare caratteristiche binarie delle immagini. Nelle applicazioni di apprendimento automatico, i risultati dei modelli possono essere binarizzati per ottenere rappresentazioni vettoriali binarie.</p>
<p>Dopo la vettorizzazione binaria, i dati possono essere archiviati in Milvus per la gestione e il recupero dei vettori. Il diagramma seguente mostra il processo di base.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/use-binary-vector.png" alt="Use binary vectors in Milvus" class="doc-image" id="use-binary-vectors-in-milvus" />
   </span> <span class="img-wrapper"> <span>Utilizzare i vettori binari in Milvus</span> </span></p>
<div class="alert note">
<p>Sebbene i vettori binari siano eccellenti in scenari specifici, hanno dei limiti nella loro capacità espressiva, rendendo difficile catturare relazioni semantiche complesse. Pertanto, negli scenari reali, i vettori binari sono spesso utilizzati insieme ad altri tipi di vettori per bilanciare efficienza ed espressività. Per ulteriori informazioni, consultare <a href="/docs/it/dense-vector.md">Vettori densi</a> e <a href="/docs/it/sparse_vector.md">vettori sparsi</a>.</p>
</div>
<h2 id="Use-binary-vectors-in-Milvus​" class="common-anchor-header">Utilizzare i vettori binari in Milvus<button data-href="#Use-binary-vectors-in-Milvus​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Add-vector-field​" class="common-anchor-header">Aggiungere un campo vettoriale</h3><p>Per utilizzare i vettori binari in Milvus, occorre innanzitutto definire un campo vettoriale per memorizzare i vettori binari quando si crea una collezione. Questo processo comprende.</p>
<ol>
<li><p>Impostare <code translate="no">datatype</code> sul tipo di dati vettoriali binari supportati, cioè <code translate="no">BINARY_VECTOR</code>.</p></li>
<li><p>Specificare le dimensioni del vettore usando il parametro <code translate="no">dim</code>. Si noti che <code translate="no">dim</code> deve essere un multiplo di 8, poiché i vettori binari devono essere convertiti in array di byte al momento dell'inserimento. Ogni 8 valori booleani (0 o 1) saranno impacchettati in 1 byte. Ad esempio, se <code translate="no">dim=128</code>, per l'inserimento è necessario un array di 16 byte.</p></li>
</ol>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
​
schema = client.create_schema(​
    auto_id=<span class="hljs-literal">True</span>,​
    enable_dynamic_fields=<span class="hljs-literal">True</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>, datatype=DataType.BINARY_VECTOR, dim=<span class="hljs-number">128</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .build());​
        ​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)​
        .dataType(DataType.VarChar)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .autoID(<span class="hljs-literal">true</span>)​
        .maxLength(<span class="hljs-number">100</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;binary_vector&quot;</span>)​
        .dataType(DataType.BinaryVector)​
        .dimension(<span class="hljs-number">128</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
schema.<span class="hljs-title function_">push</span>({​
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;binary vector&quot;</span>,​
  <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">BinaryVector</span>,​
  <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;pk&quot;,​
    &quot;dataType&quot;: &quot;VarChar&quot;,​
    &quot;isPrimary&quot;: true,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 100​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;binary_vector&quot;,​
    &quot;dataType&quot;: &quot;BinaryVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 128​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: true,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>​
    ],​
    \&quot;enableDynamicField\&quot;: true​
}&quot;</span>​
​

<button class="copy-code-btn"></button></code></pre>
<p>In questo esempio, viene aggiunto un campo vettoriale chiamato <code translate="no">binary_vector</code> per memorizzare vettori binari. Il tipo di dati di questo campo è <code translate="no">BINARY_VECTOR</code>, con una dimensione di 128.</p>
<h3 id="Set-index-params-for-vector-field​" class="common-anchor-header">Impostare i parametri dell'indice per il campo vettoriale</h3><p>Per velocizzare le ricerche, è necessario creare un indice per il campo vettoriale binario. L'indicizzazione può migliorare significativamente l'efficienza di recupero dei dati vettoriali su larga scala.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()​
​
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>,​
    index_name=<span class="hljs-string">&quot;binary_vector_index&quot;</span>,​
    index_type=<span class="hljs-string">&quot;BIN_IVF_FLAT&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;HAMMING&quot;</span>,​
    <span class="hljs-keyword">params</span>={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>}​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;​
<span class="hljs-keyword">import</span> java.<span class="hljs-property">util</span>.*;​
​
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
extraParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;nlist&quot;</span>,<span class="hljs-number">128</span>);​
indexParams.<span class="hljs-title function_">add</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;binary_vector&quot;</span>)​
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">BIN_IVF_FLAT</span>)​
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">HAMMING</span>)​
        .<span class="hljs-title function_">extraParams</span>(extraParams)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MetricType</span>, <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> indexParams = {​
  <span class="hljs-attr">indexName</span>: <span class="hljs-string">&quot;binary_vector_index&quot;</span>,​
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;binary_vector&quot;</span>,​
  <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">HAMMING</span>,​
  <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">BIN_IVF_FLAT</span>,​
  <span class="hljs-attr">params</span>: {​
    <span class="hljs-attr">nlist</span>: <span class="hljs-number">128</span>,​
  },​
};​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;binary_vector&quot;,​
            &quot;metricType&quot;: &quot;HAMMING&quot;,​
            &quot;indexName&quot;: &quot;binary_vector_index&quot;,​
            &quot;indexType&quot;: &quot;BIN_IVF_FLAT&quot;,​
            &quot;params&quot;:{&quot;nlist&quot;: 128}​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Nell'esempio precedente, viene creato un indice chiamato <code translate="no">binary_vector_index</code> per il campo <code translate="no">binary_vector</code>, utilizzando il tipo di indice <code translate="no">BIN_IVF_FLAT</code>. <code translate="no">metric_type</code> è impostato su <code translate="no">HAMMING</code>, a indicare che la distanza di Hamming è utilizzata per la misurazione della similarità.</p>
<p>Oltre a <code translate="no">BIN_IVF_FLAT</code>, Milvus supporta altri tipi di indice per i vettori binari. Per maggiori dettagli, consultare la sezione <a href="https://milvus.io/docs/index.md?tab=binary">Indici di vettori binari</a>. Inoltre, Milvus supporta altre metriche di similarità per i vettori binari. Per ulteriori informazioni, consultare <a href="/docs/it/metric.md">Tipi di metriche</a>.</p>
<h3 id="Create-collection​" class="common-anchor-header">Creare la collezione</h3><p>Una volta completate le impostazioni dei vettori binari e degli indici, creare una collezione che contenga vettori binari. L'esempio seguente utilizza il metodo <code translate="no">create_collection</code> per creare un insieme chiamato <code translate="no">my_binary_collection</code>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&quot;my_binary_collection&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .build());​
​
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_binary_collection&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexParams)​
        .build();​
client.createCollection(requestCreate);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({​
    <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>​
});​
​
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_dense_collection&#x27;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-attr">index_params</span>: indexParams​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_binary_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data​" class="common-anchor-header">Inserire i dati</h3><p>Dopo aver creato la collezione, utilizzare il metodo <code translate="no">insert</code> per aggiungere dati contenenti vettori binari. Si noti che i vettori binari devono essere forniti sotto forma di array di byte, dove ogni byte rappresenta 8 valori booleani.</p>
<p>Ad esempio, per un vettore binario di 128 dimensioni, è necessario un array di 16 byte (poiché 128 bit ÷ 8 bit/byte = 16 byte). Di seguito è riportato un esempio di codice per l'inserimento di dati.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">convert_bool_list_to_bytes</span>(<span class="hljs-params">bool_list</span>):​
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(bool_list) % <span class="hljs-number">8</span> != <span class="hljs-number">0</span>:​
        <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;The length of a boolean list must be a multiple of 8&quot;</span>)​
​
    byte_array = <span class="hljs-built_in">bytearray</span>(<span class="hljs-built_in">len</span>(bool_list) // <span class="hljs-number">8</span>)​
    <span class="hljs-keyword">for</span> i, bit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(bool_list):​
        <span class="hljs-keyword">if</span> bit == <span class="hljs-number">1</span>:​
            index = i // <span class="hljs-number">8</span>​
            shift = i % <span class="hljs-number">8</span>​
            byte_array[index] |= (<span class="hljs-number">1</span> &lt;&lt; shift)​
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">bytes</span>(byte_array)​
​
​
bool_vectors = [​
    [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>] + [<span class="hljs-number">0</span>] * <span class="hljs-number">112</span>,​
    [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>] + [<span class="hljs-number">0</span>] * <span class="hljs-number">112</span>,​
]​
​
data = [{<span class="hljs-string">&quot;binary_vector&quot;</span>: convert_bool_list_to_bytes(bool_vector) <span class="hljs-keyword">for</span> bool_vector <span class="hljs-keyword">in</span> bool_vectors}]​
​
client.insert(​
    collection_name=<span class="hljs-string">&quot;my_binary_collection&quot;</span>,​
    data=data​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;​
​
<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-type">byte</span>[] convertBoolArrayToBytes(<span class="hljs-type">boolean</span>[] booleanArray) {​
    <span class="hljs-type">byte</span>[] byteArray = <span class="hljs-keyword">new</span> <span class="hljs-title class_">byte</span>[booleanArray.length / Byte.SIZE];​
    <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; booleanArray.length; i++) {​
        <span class="hljs-keyword">if</span> (booleanArray[i]) {​
            <span class="hljs-type">int</span> <span class="hljs-variable">index</span> <span class="hljs-operator">=</span> i / Byte.SIZE;​
            <span class="hljs-type">int</span> <span class="hljs-variable">shift</span> <span class="hljs-operator">=</span> i % Byte.SIZE;​
            byteArray[index] |= (<span class="hljs-type">byte</span>) (<span class="hljs-number">1</span> &lt;&lt; shift);​
        }​
    }​
​
    <span class="hljs-keyword">return</span> byteArray;​
}​
​
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
{​
    <span class="hljs-type">boolean</span>[] boolArray = {<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>};​
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
    row.add(<span class="hljs-string">&quot;binary_vector&quot;</span>, gson.toJsonTree(convertBoolArrayToBytes(boolArray)));​
    rows.add(row);​
}​
{​
    <span class="hljs-type">boolean</span>[] boolArray = {<span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>};​
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
    row.add(<span class="hljs-string">&quot;binary_vector&quot;</span>, gson.toJsonTree(convertBoolArrayToBytes(boolArray)));​
    rows.add(row);​
}​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_binary_collection&quot;</span>)​
        .data(rows)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [​
  { <span class="hljs-attr">binary_vector</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>] },​
  { <span class="hljs-attr">binary_vector</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>] },​
];​
​
client.<span class="hljs-title function_">insert</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_binary_collection&quot;</span>,​
  <span class="hljs-attr">data</span>: data,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;data\&quot;: <span class="hljs-variable">$data</span>,​
    \&quot;collectionName\&quot;: \&quot;my_binary_collection\&quot;​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search​" class="common-anchor-header">Eseguire la ricerca di similarità</h3><p>La ricerca per similarità è una delle caratteristiche principali di Milvus, che consente di trovare rapidamente i dati più simili a un vettore di interrogazione in base alla distanza tra i vettori. Per eseguire una ricerca di similarità utilizzando vettori binari, preparare il vettore di interrogazione e i parametri di ricerca, quindi chiamare il metodo <code translate="no">search</code>.</p>
<p>Durante le operazioni di ricerca, i vettori binari devono essere forniti anche sotto forma di array di byte. Assicurarsi che la dimensione del vettore di interrogazione corrisponda a quella specificata nella definizione di <code translate="no">dim</code> e che ogni 8 valori booleani siano convertiti in 1 byte.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">search_params = {​
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: 10}​
}​
​
query_bool_list = [1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0] + [0] * 112​
query_vector = convert_bool_list_to_bytes(query_bool_list)​
​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_binary_collection&quot;</span>,​
    data=[query_vector],​
    anns_field=<span class="hljs-string">&quot;binary_vector&quot;</span>,​
    search_params=search_params,​
    <span class="hljs-built_in">limit</span>=5,​
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>]​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: &#x27;453718927992172268&#x27;, &#x27;distance&#x27;: 10.0, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172268&#x27;}}]&quot;] ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">SearchReq</span>;​
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">data</span>.<span class="hljs-property">BinaryVec</span>;​
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">response</span>.<span class="hljs-property">SearchResp</span>;​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
searchParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;nprobe&quot;</span>,<span class="hljs-number">10</span>);​
​
boolean[] boolArray = {<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>};​
<span class="hljs-title class_">BinaryVec</span> queryVector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">BinaryVec</span>(<span class="hljs-title function_">convertBoolArrayToBytes</span>(boolArray));​
​
<span class="hljs-title class_">SearchResp</span> searchR = client.<span class="hljs-title function_">search</span>(<span class="hljs-title class_">SearchReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;my_binary_collection&quot;</span>)​
        .<span class="hljs-title function_">data</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(queryVector))​
        .<span class="hljs-title function_">annsField</span>(<span class="hljs-string">&quot;binary_vector&quot;</span>)​
        .<span class="hljs-title function_">searchParams</span>(searchParams)​
        .<span class="hljs-title function_">topK</span>(<span class="hljs-number">5</span>)​
        .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(<span class="hljs-string">&quot;pk&quot;</span>))​
        .<span class="hljs-title function_">build</span>());​
        ​
 <span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(searchR.<span class="hljs-title function_">getSearchResults</span>());​
 ​
 <span class="hljs-comment">// Output​</span>
 <span class="hljs-comment">//​</span>
 <span class="hljs-comment">// [[SearchResp.SearchResult(entity={pk=453444327741536775}, score=0.0, id=453444327741536775), SearchResp.SearchResult(entity={pk=453444327741536776}, score=7.0, id=453444327741536776)]]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">query_vector = [1,0,1,0,1,1,1,1,1,1,1,1];​
​
client.search({​
    collection_name: <span class="hljs-string">&#x27;my_binary_collection&#x27;</span>,​
    data: query_vector,​
    <span class="hljs-built_in">limit</span>: 5,​
    output_fields: [<span class="hljs-string">&#x27;pk&#x27;</span>],​
    params: {​
        nprobe: 10​
    }​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> searchParams=<span class="hljs-string">&#x27;{​
        &quot;params&quot;:{&quot;nprobe&quot;:10}​
    }&#x27;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_binary_collection\&quot;,​
    \&quot;data\&quot;: <span class="hljs-variable">$data</span>,​
    \&quot;annsField\&quot;: \&quot;binary_vector\&quot;,​
    \&quot;limit\&quot;: 5,​
    \&quot;searchParams\&quot;:<span class="hljs-variable">$searchParams</span>,​
    \&quot;outputFields\&quot;: [\&quot;pk\&quot;]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni sui parametri di ricerca della similarità, consultare la sezione <a href="/docs/it/single-vector-search.md">Ricerca di base di RNA</a>.</p>
<p></p>
