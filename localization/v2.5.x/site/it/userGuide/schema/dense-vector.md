---
id: dense-vector.md
title: Vettore denso
summary: >-
  I vettori densi sono rappresentazioni di dati numerici ampiamente utilizzati
  nell'apprendimento automatico e nell'analisi dei dati. Sono costituiti da
  array di numeri reali, in cui la maggior parte o tutti gli elementi sono non
  nulli. Rispetto ai vettori sparsi, i vettori densi contengono più informazioni
  allo stesso livello dimensionale, poiché ogni dimensione contiene valori
  significativi. Questa rappresentazione può catturare efficacemente modelli e
  relazioni complesse, rendendo più facile l'analisi e l'elaborazione dei dati
  in spazi ad alta densità. I vettori densi hanno in genere un numero fisso di
  dimensioni, che varia da poche decine a diverse centinaia o addirittura
  migliaia, a seconda dell'applicazione e dei requisiti specifici.
---
<h1 id="Dense-Vector​" class="common-anchor-header">Vettore denso<button data-href="#Dense-Vector​" class="anchor-icon" translate="no">
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
    </button></h1><p>I vettori densi sono rappresentazioni di dati numerici ampiamente utilizzati nell'apprendimento automatico e nell'analisi dei dati. Sono costituiti da array di numeri reali, in cui la maggior parte o tutti gli elementi sono non nulli. Rispetto ai vettori sparsi, i vettori densi contengono più informazioni allo stesso livello dimensionale, poiché ogni dimensione contiene valori significativi. Questa rappresentazione può catturare efficacemente modelli e relazioni complesse, rendendo più facile l'analisi e l'elaborazione dei dati in spazi ad alta densità. I vettori densi hanno in genere un numero fisso di dimensioni, che varia da poche decine a diverse centinaia o addirittura migliaia, a seconda dell'applicazione e dei requisiti specifici.</p>
<p>I vettori densi sono utilizzati principalmente in scenari che richiedono la comprensione della semantica dei dati, come la ricerca semantica e i sistemi di raccomandazione. Nella ricerca semantica, i vettori densi aiutano a catturare le connessioni sottostanti tra query e documenti, migliorando la rilevanza dei risultati della ricerca. Nei sistemi di raccomandazione, aiutano a identificare le somiglianze tra utenti e articoli, offrendo suggerimenti più personalizzati.</p>
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
    </button></h2><p>I vettori densi sono tipicamente rappresentati come array di numeri in virgola mobile di lunghezza fissa, come <code translate="no">[0.2, 0.7, 0.1, 0.8, 0.3, ..., 0.5]</code>. La dimensionalità di questi vettori varia solitamente da centinaia a migliaia, come 128, 256, 768 o 1024. Ogni dimensione cattura specifiche caratteristiche semantiche di un oggetto, rendendolo applicabile a vari scenari attraverso il calcolo della similarità.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/dense-vector.png" alt="Dense vectors in 2D space" class="doc-image" id="dense-vectors-in-2d-space" />
   </span> <span class="img-wrapper"> <span>Vettori densi nello spazio 2D</span> </span></p>
<p>L'immagine precedente illustra la rappresentazione di vettori densi in uno spazio 2D. Sebbene nelle applicazioni reali i vettori densi abbiano spesso dimensioni molto più elevate, questa illustrazione 2D trasmette efficacemente diversi concetti chiave.</p>
<ul>
<li><p><strong>Rappresentazione multidimensionale:</strong> Ogni punto rappresenta un oggetto concettuale (come <strong>Milvus</strong>, un <strong>database vettoriale</strong>, un <strong>sistema di reperimento</strong>, ecc.), la cui posizione è determinata dai valori delle sue dimensioni.</p></li>
<li><p><strong>Relazioni semantiche:</strong> Le distanze tra i punti riflettono la somiglianza semantica tra i concetti. I punti più vicini indicano concetti più correlati dal punto di vista semantico.</p></li>
<li><p><strong>Effetto clustering:</strong> I concetti correlati (come <strong>Milvus</strong>, <strong>database vettoriale</strong> e <strong>sistema di reperimento</strong>) sono posizionati vicini l'uno all'altro nello spazio, formando un cluster semantico.</p></li>
</ul>
<p>Di seguito è riportato un esempio di vettore denso che rappresenta il testo <code translate="no">&quot;Milvus is an efficient vector database&quot;</code>.</p>
<pre><code translate="no" class="language-JSON">[​
    -<span class="hljs-number">0.013052909</span>,​
    <span class="hljs-number">0.020387933</span>,​
    -<span class="hljs-number">0.007869</span>,​
    -<span class="hljs-number">0.11111383</span>,​
    -<span class="hljs-number">0.030188112</span>,​
    -<span class="hljs-number">0.0053388323</span>,​
    <span class="hljs-number">0.0010654867</span>,​
    <span class="hljs-number">0.072027855</span>,​
    <span class="hljs-comment">// ... more dimensions​</span>
]​
​

<button class="copy-code-btn"></button></code></pre>
<p>I vettori densi possono essere generati utilizzando vari modelli di <a href="https://en.wikipedia.org/wiki/Embedding">incorporamento</a>, come i modelli CNN (come <a href="https://pytorch.org/hub/pytorch_vision_resnet/">ResNet</a>, <a href="https://pytorch.org/vision/stable/models/vgg.html">VGG</a>) per le immagini e i modelli linguistici (come <a href="https://en.wikipedia.org/wiki/BERT_(language_model)">BERT</a>, <a href="https://en.wikipedia.org/wiki/Word2vec">Word2Vec</a>) per il testo. Questi modelli trasformano i dati grezzi in punti nello spazio ad alta dimensionalità, catturando le caratteristiche semantiche dei dati. Inoltre, Milvus offre metodi pratici per aiutare gli utenti a generare ed elaborare vettori densi, come descritto in Embeddings.</p>
<p>Una volta vettorializzati, i dati possono essere archiviati in Milvus per la gestione e il recupero dei vettori. Il diagramma seguente mostra il processo di base.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/use-dense-vector.png" alt="Use dense vecctors in Milvus" class="doc-image" id="use-dense-vecctors-in-milvus" />
   </span> <span class="img-wrapper"> <span>Utilizzare i vettori densi in Milvus</span> </span></p>
<div class="alert note">
<p>Oltre ai vettori densi, Milvus supporta anche vettori sparsi e vettori binari. I vettori sparsi sono adatti a corrispondenze precise basate su termini specifici, come la ricerca di parole chiave e la corrispondenza di termini, mentre i vettori binari sono comunemente usati per gestire in modo efficiente i dati binarizzati, come la corrispondenza di modelli di immagini e alcune applicazioni di hashing. Per ulteriori informazioni, consultare <a href="/docs/it/binary-vector.md">Vettori binari</a> e <a href="/docs/it/sparse_vector.md">vettori sparsi</a>.</p>
</div>
<h2 id="Use-dense-vectors-in-Milvus​" class="common-anchor-header">Utilizzare i vettori densi in Milvus<button data-href="#Use-dense-vectors-in-Milvus​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Add-vector-field​" class="common-anchor-header">Aggiungere un campo vettoriale</h3><p>Per utilizzare i vettori densi in Milvus, occorre innanzitutto definire un campo vettoriale per memorizzare i vettori densi quando si crea una collezione. Questo processo comprende.</p>
<ol>
<li><p>Impostare <code translate="no">datatype</code> su un tipo di dati vettoriali densi supportato. Per i tipi di dati vettoriali densi supportati, vedere Tipi di dati.</p></li>
<li><p>Specificare le dimensioni del vettore denso usando il parametro <code translate="no">dim</code>.</p></li>
</ol>
<p>Nell'esempio seguente, si aggiunge un campo vettoriale chiamato <code translate="no">dense_vector</code> per memorizzare vettori densi. Il tipo di dati del campo è <code translate="no">FLOAT_VECTOR</code>, con una dimensione di <code translate="no">4</code>.</p>
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
schema.add_field(field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)​

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
        .fieldName(<span class="hljs-string">&quot;dense_vector&quot;</span>)​
        .dataType(DataType.FloatVector)​
        .dimension(<span class="hljs-number">4</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
schema.<span class="hljs-title function_">push</span>({​
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;dense_vector&quot;</span>,​
  <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
  <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span>,​
});​
​

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
    &quot;fieldName&quot;: &quot;dense_vector&quot;,​
    &quot;dataType&quot;: &quot;FloatVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 4​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: true,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p><strong>Tipi di dati supportati per i campi vettoriali densi</strong>:</p>
<table>
<thead>
<tr><th><strong>Tipo</strong></th><th><strong>Descrizione</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">FLOAT_VECTOR</code></td><td>Memorizza numeri in virgola mobile a 32 bit, comunemente usati per rappresentare i numeri reali nei calcoli scientifici e nell'apprendimento automatico. Ideale per scenari che richiedono un'elevata precisione, come la distinzione di vettori simili.</td></tr>
<tr><td><code translate="no">FLOAT16_VECTOR</code></td><td>Memorizza numeri in virgola mobile a mezza precisione a 16 bit, utilizzati per l'apprendimento profondo e i calcoli delle GPU. Consente di risparmiare spazio di archiviazione in scenari in cui la precisione è meno critica, come nella fase di richiamo a bassa precisione dei sistemi di raccomandazione.</td></tr>
<tr><td><code translate="no">BFLOAT16_VECTOR</code></td><td>Memorizza numeri Brain Floating Point (bfloat16) a 16 bit, offrendo la stessa gamma di esponenti di Float32 ma con una precisione ridotta. È adatto a scenari che richiedono l'elaborazione rapida di grandi volumi di vettori, come il recupero di immagini su larga scala.</td></tr>
</tbody>
</table>
<h3 id="Set-index-params-for-vector-field​" class="common-anchor-header">Impostare i parametri dell'indice per il campo vettoriale</h3><p>Per accelerare le ricerche semantiche, è necessario creare un indice per il campo vettoriale. L'indicizzazione può migliorare significativamente l'efficienza di recupero dei dati vettoriali su larga scala.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()​
​
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>,​
    index_name=<span class="hljs-string">&quot;dense_vector_index&quot;</span>,​
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
    <span class="hljs-keyword">params</span>={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>}​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;​
<span class="hljs-keyword">import</span> java.<span class="hljs-property">util</span>.*;​
​
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
extraParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;nlist&quot;</span>,<span class="hljs-number">128</span>);​
indexes.<span class="hljs-title function_">add</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;dense_vector&quot;</span>)​
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">IVF_FLAT</span>)​
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">IP</span>)​
        .<span class="hljs-title function_">extraParams</span>(extraParams)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MetricType</span>, <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> indexParams = {​
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;dense_vector_index&#x27;</span>,​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;dense_vector&#x27;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">IVF_FLAT</span>,​
    <span class="hljs-attr">params</span>: {​
      <span class="hljs-attr">nlist</span>: <span class="hljs-number">128</span>​
    },​
};​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;dense_vector&quot;,​
            &quot;metricType&quot;: &quot;IP&quot;,​
            &quot;indexName&quot;: &quot;dense_vector_index&quot;,​
            &quot;indexType&quot;: &quot;IVF_FLAT&quot;,​
            &quot;params&quot;:{&quot;nlist&quot;: 128}​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Nell'esempio precedente, viene creato un indice chiamato <code translate="no">dense_vector_index</code> per il campo <code translate="no">dense_vector</code> utilizzando il tipo di indice <code translate="no">IVF_FLAT</code>. <code translate="no">metric_type</code> è impostato su <code translate="no">IP</code>, a indicare che il prodotto interno sarà usato come metrica di distanza.</p>
<p>Milvus supporta anche altri tipi di indice. Per maggiori dettagli, consultare la sezione <a href="https://milvus.io/docs/index.md?tab=floating">Indici vettoriali flottanti</a>. Inoltre, Milvus supporta altri tipi di metriche. Per ulteriori informazioni, consultare la sezione <a href="/docs/it/metric.md">Tipi di metriche</a>.</p>
<h3 id="Create-collection​" class="common-anchor-header">Creare la collezione</h3><p>Una volta completate le impostazioni dei parametri dei vettori densi e degli indici, è possibile creare una collezione contenente vettori densi. L'esempio seguente utilizza il metodo <code translate="no">create_collection</code> per creare un insieme chiamato <code translate="no">my_dense_collection</code>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&quot;my_dense_collection&quot;</span>,​
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
        .collectionName(<span class="hljs-string">&quot;my_dense_collection&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexes)​
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
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_dense_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data​" class="common-anchor-header">Inserire i dati</h3><p>Dopo aver creato la collezione, utilizzare il metodo <code translate="no">insert</code> per aggiungere dati contenenti vettori densi. Assicurarsi che la dimensionalità dei vettori densi inseriti corrisponda al valore <code translate="no">dim</code> definito durante l'aggiunta del campo vettoriale denso.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">data = [​
    {<span class="hljs-string">&quot;dense_vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>]},​
    {<span class="hljs-string">&quot;dense_vector&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.8</span>]},​
]​
​
client.<span class="hljs-title function_">insert</span>(​
    collection_name=<span class="hljs-string">&quot;my_dense_collection&quot;</span>,​
    data=data​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;​
​
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;dense_vector\&quot;: [0.1, 0.2, 0.3, 0.4]}&quot;</span>, JsonObject.class));​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;dense_vector\&quot;: [0.2, 0.3, 0.4, 0.5]}&quot;</span>, JsonObject.class));​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_dense_collection&quot;</span>)​
        .data(rows)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [​
  { <span class="hljs-attr">dense_vector</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>] },​
  { <span class="hljs-attr">dense_vector</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.8</span>] },​
];​
​
client.<span class="hljs-title function_">insert</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_dense_collection&quot;</span>,​
  <span class="hljs-attr">data</span>: data,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;data&quot;: [​
        {&quot;dense_vector&quot;: [0.1, 0.2, 0.3, 0.4]},​
        {&quot;dense_vector&quot;: [0.2, 0.3, 0.4, 0.5]}        ​
    ],​
    &quot;collectionName&quot;: &quot;my_dense_collection&quot;​
}&#x27;</span>​
​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:{&quot;insertCount&quot;:2,&quot;insertIds&quot;:[&quot;453577185629572531&quot;,&quot;453577185629572532&quot;]}}​</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search​" class="common-anchor-header">Eseguire la ricerca di similarità</h3><p>La ricerca semantica basata sui vettori densi è una delle caratteristiche principali di Milvus, che consente di trovare rapidamente i dati più simili a un vettore di interrogazione in base alla distanza tra i vettori. Per eseguire una ricerca di similarità, preparare il vettore di interrogazione e i parametri di ricerca, quindi chiamare il metodo <code translate="no">search</code>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">search_params = {​
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: 10}​
}​
​
query_vector = [0.1, 0.2, 0.3, 0.7]​
​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_dense_collection&quot;</span>,​
    data=[query_vector],​
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,​
    search_params=search_params,​
    <span class="hljs-built_in">limit</span>=5,​
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>]​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: &#x27;453718927992172271&#x27;, &#x27;distance&#x27;: 0.7599999904632568, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172271&#x27;}}, {&#x27;id&#x27;: &#x27;453718927992172270&#x27;, &#x27;distance&#x27;: 0.6299999952316284, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172270&#x27;}}]&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">data</span>.<span class="hljs-property">FloatVec</span>;​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
searchParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;nprobe&quot;</span>,<span class="hljs-number">10</span>);​
​
<span class="hljs-title class_">FloatVec</span> queryVector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> float[]{<span class="hljs-number">0.</span>1f, <span class="hljs-number">0.</span>3f, <span class="hljs-number">0.</span>3f, <span class="hljs-number">0.</span>4f});​
​
<span class="hljs-title class_">SearchResp</span> searchR = client.<span class="hljs-title function_">search</span>(<span class="hljs-title class_">SearchReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;my_dense_collection&quot;</span>)​
        .<span class="hljs-title function_">data</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(queryVector))​
        .<span class="hljs-title function_">annsField</span>(<span class="hljs-string">&quot;dense_vector&quot;</span>)​
        .<span class="hljs-title function_">searchParams</span>(searchParams)​
        .<span class="hljs-title function_">topK</span>(<span class="hljs-number">5</span>)​
        .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(<span class="hljs-string">&quot;pk&quot;</span>))​
        .<span class="hljs-title function_">build</span>());​
        ​
<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(searchR.<span class="hljs-title function_">getSearchResults</span>());​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">//​</span>
<span class="hljs-comment">// [[SearchResp.SearchResult(entity={pk=453444327741536779}, score=0.65, id=453444327741536779), SearchResp.SearchResult(entity={pk=453444327741536778}, score=0.65, id=453444327741536778)]]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">query_vector = [0.1, 0.2, 0.3, 0.7];​
​
client.search({​
    collection_name: my_dense_collection,​
    data: query_vector,​
    <span class="hljs-built_in">limit</span>: 5,​
    output_fields: [<span class="hljs-string">&#x27;pk&#x27;</span>],​
    params: {​
        nprobe: 10​
    }​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_dense_collection&quot;,​
    &quot;data&quot;: [​
        [0.1, 0.2, 0.3, 0.7]​
    ],​
    &quot;annsField&quot;: &quot;dense_vector&quot;,​
    &quot;limit&quot;: 5,​
    &quot;searchParams&quot;:{​
        &quot;params&quot;:{&quot;nprobe&quot;:10}​
    },​
    &quot;outputFields&quot;: [&quot;pk&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;distance&quot;:0.55,&quot;id&quot;:&quot;453577185629572532&quot;,&quot;pk&quot;:&quot;453577185629572532&quot;},{&quot;distance&quot;:0.42,&quot;id&quot;:&quot;453577185629572531&quot;,&quot;pk&quot;:&quot;453577185629572531&quot;}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni sui parametri di ricerca per similarità, consultare la sezione <a href="/docs/it/single-vector-search.md">Ricerca di base di RNA</a>.</p>
