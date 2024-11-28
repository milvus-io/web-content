---
id: multi-vector-search.md
order: 2
summary: >-
  Questa guida illustra come eseguire una ricerca ibrida in Milvus e come
  comprendere il reranking dei risultati.
title: Ricerca ibrida
---
<h1 id="Hybrid-Search​" class="common-anchor-header">Ricerca ibrida<button data-href="#Hybrid-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>La ricerca ibrida si riferisce a un metodo di ricerca che conduce simultaneamente più ricerche di RNA, rielabora più serie di risultati da queste ricerche di RNA e alla fine restituisce una singola serie di risultati. L'uso della ricerca ibrida può migliorare l'accuratezza della ricerca. Zilliz supporta l'esecuzione di una ricerca ibrida su una collezione con più campi vettoriali. </p>
<p>La ricerca ibrida è più comunemente utilizzata in scenari che includono ricerche vettoriali rade e dense e ricerche multimodali. Questa guida illustra come condurre una ricerca ibrida in Zilliz con un esempio specifico.</p>
<h2 id="Scenarios​" class="common-anchor-header">Scenari<button data-href="#Scenarios​" class="anchor-icon" translate="no">
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
    </button></h2><p>La ricerca ibrida è adatta ai due scenari seguenti.</p>
<h3 id="Sparse-Dense-Vector-Search​" class="common-anchor-header">Ricerca vettoriale sparsa e densa</h3><p>Diversi tipi di vettori possono rappresentare informazioni diverse e l'uso di vari modelli di incorporazione può rappresentare in modo più completo diverse caratteristiche e aspetti dei dati. Ad esempio, l'uso di diversi modelli di incorporamento per la stessa frase può generare un vettore denso per rappresentare il significato semantico e un vettore rado per rappresentare la frequenza delle parole nella frase.</p>
<ul>
<li><p><strong>Vettori sparsi:</strong> I vettori sparsi sono caratterizzati da un'elevata dimensionalità del vettore e dalla presenza di pochi valori non nulli. Questa struttura li rende particolarmente adatti alle applicazioni tradizionali di information retrieval. Nella maggior parte dei casi, il numero di dimensioni utilizzate nei vettori sparsi corrisponde a diversi token in una o più lingue. A ogni dimensione viene assegnato un valore che indica l'importanza relativa di quel token all'interno del documento. Questa disposizione si rivela vantaggiosa per i compiti che prevedono la corrispondenza del testo.</p></li>
<li><p><strong>Vettori densi:</strong> I vettori densi sono incorporazioni derivate dalle reti neurali. Disposti in un array ordinato, questi vettori catturano l'essenza semantica del testo in ingresso. Si noti che i vettori densi non sono limitati all'elaborazione del testo; sono anche ampiamente utilizzati nella computer vision per rappresentare la semantica dei dati visivi. Questi vettori densi, di solito generati da modelli di incorporazione del testo, sono caratterizzati dalla maggior parte o da tutti gli elementi non nulli. Pertanto, i vettori densi sono particolarmente efficaci per le applicazioni di ricerca semantica, in quanto possono restituire i risultati più simili in base alla distanza vettoriale anche in assenza di corrispondenze testuali esatte. Questa capacità consente di ottenere risultati di ricerca più sfumati e consapevoli del contesto, spesso cogliendo relazioni tra concetti che potrebbero sfuggire agli approcci basati sulle parole chiave.</p></li>
</ul>
<p>Per maggiori dettagli, consultare <a href="/docs/it/sparse_vector.md">Sparse Vector</a> e <a href="/docs/it/dense-vector.md">Dense Vector</a>.</p>
<h3 id="Multimodal-Search​" class="common-anchor-header">Ricerca multimodale</h3><p>La ricerca multimodale si riferisce alla ricerca di similarità di dati non strutturati attraverso più modalità (come immagini, video, audio, testo, ecc.). Ad esempio, una persona può essere rappresentata utilizzando diverse modalità di dati, come le impronte digitali, le impronte vocali e i tratti del viso. La ricerca ibrida supporta più ricerche simultanee. Ad esempio, la ricerca di una persona con impronte digitali e impronte vocali simili.</p>
<h2 id="Workflow​" class="common-anchor-header">Flusso di lavoro<button data-href="#Workflow​" class="anchor-icon" translate="no">
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
    </button></h2><p>Il flusso di lavoro principale per condurre una ricerca ibrida è il seguente.</p>
<ol>
<li><p>Generare vettori densi attraverso modelli di embedding come <a href="https://zilliz.com/learn/explore-colbert-token-level-embedding-and-ranking-model-for-similarity-search#A-Quick-Recap-of-BERT">BERT</a> e <a href="https://zilliz.com/learn/NLP-essentials-understanding-transformers-in-AI">Transformers</a>.</p></li>
<li><p>Generare vettori radi attraverso modelli di embedding come <a href="https://zilliz.com/learn/mastering-bm25-a-deep-dive-into-the-algorithm-and-application-in-milvus">BM25</a>, <a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings#BGE-M3">BGE-M3</a>, <a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings#SPLADE">SPLADE</a>, ecc.</p></li>
<li><p>Creare una collezione in Zilliz e definire lo schema della collezione che include campi vettoriali densi e radi.</p></li>
<li><p>Inserire i vettori sparsi-densi nella collezione appena creata nel passaggio precedente.</p></li>
<li><p>Eseguire una ricerca ibrida: La ricerca ANN sui vettori densi restituirà un insieme di risultati top-K più simili, mentre la corrispondenza testuale sui vettori radi restituirà anch'essa un insieme di risultati top-K.</p></li>
<li><p>Normalizzazione: Normalizzare i punteggi delle due serie di risultati top-K, convertendo i punteggi in un intervallo compreso tra [0,1].</p></li>
<li><p>Scegliere una strategia di reranking appropriata per unire e rerankare i due insiemi di risultati top-K e restituire infine un insieme finale di risultati top-K.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/hybrid-search.png" alt="Hybrid Search Workflow" class="doc-image" id="hybrid-search-workflow" />
   </span> <span class="img-wrapper"> <span>Flusso di lavoro della ricerca ibrida</span> </span></p>
<h2 id="Examples​" class="common-anchor-header">Esempi<button data-href="#Examples​" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa sezione utilizzerà un esempio specifico per illustrare come condurre una ricerca ibrida su vettori sparsi e densi per migliorare l'accuratezza delle ricerche di testo.</p>
<h3 id="Create-a-collection-with-multiple-vector-fields​" class="common-anchor-header">Creare una raccolta con più campi vettoriali</h3><p>Il processo di creazione di una raccolta comprende tre parti: definizione dello schema della raccolta, configurazione dei parametri dell'indice e creazione della raccolta.</p>
<h4 id="Define-schema​" class="common-anchor-header">Definire lo schema</h4><p>In questo esempio, è necessario definire più campi vettoriali nello schema della collezione. Attualmente, ogni collezione può includere fino a 4 campi vettoriali per impostazione predefinita. Ma è possibile modificare il valore di  <a href="https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum"><code translate="no">proxy.maxVectorFieldNum</code></a>  per includere fino a 10 campi vettoriali in una collezione, se necessario.</p>
<p>L'esempio seguente definisce uno schema di collezione, dove <code translate="no">dense</code> e <code translate="no">sparse</code> sono i due campi vettoriali.</p>
<ul>
<li><p><code translate="no">id</code>: Questo campo serve come chiave primaria per memorizzare gli ID del testo. Il tipo di dati di questo campo è INT64.</p></li>
<li><p><code translate="no">text</code>: Questo campo è utilizzato per memorizzare il contenuto testuale. Il tipo di dati di questo campo è VARCHAR, con una lunghezza massima di 1000 caratteri.</p></li>
<li><p><code translate="no">dense</code>: Questo campo viene utilizzato per memorizzare i vettori densi dei testi. Il tipo di dati di questo campo è FLOAT_VECTOR, con una dimensione del vettore di 768.</p></li>
<li><p><code translate="no">sparse</code>: Questo campo viene utilizzato per memorizzare i vettori sparsi dei testi. Il tipo di dati di questo campo è SPARSE_FLOAT_VECTOR.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create a collection in customized setup mode​</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (​
    MilvusClient, DataType​
)​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
<span class="hljs-comment"># Create schema​</span>
schema = MilvusClient.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
    enable_dynamic_field=<span class="hljs-literal">True</span>,​
)​
<span class="hljs-comment"># Add fields to schema​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)​
schema.add_field(field_name=<span class="hljs-string">&quot;dense&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build());​
​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)​
        .dataType(DataType.Int64)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .autoID(<span class="hljs-literal">false</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)​
        .dataType(DataType.VarChar)​
        .maxLength(<span class="hljs-number">1000</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;dense&quot;</span>)​
        .dataType(DataType.FloatVector)​
        .dimension(<span class="hljs-number">768</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)​
        .dataType(DataType.SparseFloatVector)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// WIP​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-comment">// Create a collection in customized setup mode​</span>
<span class="hljs-comment">// Define fields​</span>
<span class="hljs-keyword">const</span> fields = [​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">false</span>​
    },​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>​
    },​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SPARSE_FLOAT_VECTOR</span>​
    },​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;dense&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>​
    }​
]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
        &quot;autoId&quot;: false,​
        &quot;enabledDynamicField&quot;: true,​
        &quot;fields&quot;: [​
            {​
                &quot;fieldName&quot;: &quot;id&quot;,​
                &quot;dataType&quot;: &quot;Int64&quot;,​
                &quot;isPrimary&quot;: true​
            },​
            {​
                &quot;fieldName&quot;: &quot;text&quot;,​
                &quot;dataType&quot;: &quot;VarChar&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;max_length&quot;: 1000​
                }​
            },​
            {​
                &quot;fieldName&quot;: &quot;sparse&quot;,​
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;​
            },​
            {​
                &quot;fieldName&quot;: &quot;dense&quot;,​
                &quot;dataType&quot;: &quot;FloatVector&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;dim&quot;: &quot;768&quot;​
                }​
            }​
        ]​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Durante le ricerche di vettori sparsi, è possibile semplificare il processo di generazione di vettori di incorporamento sparsi sfruttando le funzionalità di Full Text Search. Per maggiori dettagli, vedere <a href="/docs/it/full-text-search.md">Ricerca a testo completo</a>.</p>
<h4 id="Create-index​" class="common-anchor-header">Creare l'indice</h4><p>Dopo aver definito lo schema della collezione, è necessario impostare gli indici dei vettori e le metriche di somiglianza. In questo esempio, viene creato un indice IVF_FLAT per il campo vettoriale denso <code translate="no">dense</code>, e uno SPARSE_INVERTED_INDEX per il campo vettoriale rado <code translate="no">sparse</code>. Per conoscere i tipi di indici supportati, vedere <a href="https://milvus.io/docs/index.md?tab=floating">Indice spiegato</a>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
<span class="hljs-comment"># Prepare index parameters​</span>
index_params = client.prepare_index_params()​
​
<span class="hljs-comment"># Add indexes​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,​
    index_name=<span class="hljs-string">&quot;dense_index&quot;</span>,​
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
    params={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},​
)​
​
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,​
    index_name=<span class="hljs-string">&quot;sparse_index&quot;</span>,​
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,  <span class="hljs-comment"># Index type for sparse vectors​</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Currently, only IP (Inner Product) is supported for sparse vectors​</span>
    params={<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>},  <span class="hljs-comment"># The ratio of small vector values to be dropped during indexing​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;​
<span class="hljs-keyword">import</span> java.<span class="hljs-property">util</span>.*;​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; denseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
denseParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;nlist&quot;</span>, <span class="hljs-number">128</span>);​
<span class="hljs-title class_">IndexParam</span> indexParamForDenseField = <span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;dense&quot;</span>)​
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;dense_index&quot;</span>)​
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">IVF_FLAT</span>)​
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">IP</span>)​
        .<span class="hljs-title function_">extraParams</span>(denseParams)​
        .<span class="hljs-title function_">build</span>();​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; sparseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
sparseParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;drop_ratio_build&quot;</span>, <span class="hljs-number">0.2</span>);​
<span class="hljs-title class_">IndexParam</span> indexParamForSparseField = <span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;sparse&quot;</span>)​
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;sparse_index&quot;</span>)​
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">SPARSE_INVERTED_INDEX</span>)​
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">IP</span>)​
        .<span class="hljs-title function_">extraParams</span>(sparseParams)​
        .<span class="hljs-title function_">build</span>();​
​
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
indexParams.<span class="hljs-title function_">add</span>(indexParamForDenseField);​
indexParams.<span class="hljs-title function_">add</span>(indexParamForSparseField);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [{​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;dense&quot;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>​
},{​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>​
}]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;dense&quot;,​
            &quot;metricType&quot;: &quot;IP&quot;,​
            &quot;indexName&quot;: &quot;dense_index&quot;,​
            &quot;indexType&quot;:&quot;IVF_FLAT&quot;,​
            &quot;params&quot;:{&quot;nlist&quot;:128}​
        },​
        {​
            &quot;fieldName&quot;: &quot;sparse&quot;,​
            &quot;metricType&quot;: &quot;IP&quot;,​
            &quot;indexName&quot;: &quot;sparse_index&quot;,​
            &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-collection​" class="common-anchor-header">Creare una collezione</h4><p>Creare una collezione chiamata <code translate="no">demo</code> con lo schema della collezione e gli indici configurati nei due passi precedenti.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexParams)​
        .build();​
client.createCollection(createCollectionReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    <span class="hljs-attr">fields</span>: fields,​
    <span class="hljs-attr">index_params</span>: index_params,​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;hybrid_search_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data​" class="common-anchor-header">Inserire i dati</h3><p>Inserire i vettori sparsi e densi nella collezione <code translate="no">demo</code>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
data=[​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>:{<span class="hljs-number">9637</span>: <span class="hljs-number">0.30856525997853057</span>, <span class="hljs-number">4399</span>: <span class="hljs-number">0.19771651149001523</span>, ...}, <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, ...]},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>:{<span class="hljs-number">6959</span>: <span class="hljs-number">0.31025067641541815</span>, <span class="hljs-number">1729</span>: <span class="hljs-number">0.8265339135915016</span>, ...}, <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, ...]},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>:{<span class="hljs-number">1220</span>: <span class="hljs-number">0.15303302147479103</span>, <span class="hljs-number">7335</span>: <span class="hljs-number">0.9436728846033107</span>, ...}, <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, ...]}​
​
res = client.<span class="hljs-title function_">insert</span>(​
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    data=data​
)​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
row1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);​
row1.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>);​
row1.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense1));​
row1.add(<span class="hljs-string">&quot;sparse&quot;</span>, gson.toJsonTree(sparse1));​
​
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
row2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);​
row2.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>);​
row2.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense2));​
row2.add(<span class="hljs-string">&quot;sparse&quot;</span>, gson.toJsonTree(sparse2));​
​
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row3</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
row3.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">3</span>);​
row3.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>);​
row3.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense3));​
row3.add(<span class="hljs-string">&quot;sparse&quot;</span>, gson.toJsonTree(sparse3));​
​
List&lt;JsonObject&gt; data = Arrays.asList(row1, row2, row3);​
<span class="hljs-type">InsertReq</span> <span class="hljs-variable">insertReq</span> <span class="hljs-operator">=</span> InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>)​
        .data(data)​
        .build();​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertResp</span> <span class="hljs-operator">=</span> client.insert(insertReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">var</span> data = [​
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>, <span class="hljs-attr">sparse</span>:[<span class="hljs-number">9637</span>: <span class="hljs-number">0.30856525997853057</span>, <span class="hljs-number">4399</span>: <span class="hljs-number">0.19771651149001523</span>, ...] , <span class="hljs-attr">dense</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]},​
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>, <span class="hljs-attr">sparse</span>:[<span class="hljs-number">6959</span>: <span class="hljs-number">0.31025067641541815</span>, <span class="hljs-number">1729</span>: <span class="hljs-number">0.8265339135915016</span>, ...] , <span class="hljs-attr">dense</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>]},​
    {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span> , <span class="hljs-attr">sparse</span>:[<span class="hljs-number">1220</span>: <span class="hljs-number">0.15303302147479103</span>, <span class="hljs-number">7335</span>: <span class="hljs-number">0.9436728846033107</span>, ...] , <span class="hljs-attr">dense</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>]}       ​
]​
​
<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    <span class="hljs-attr">data</span>: data,​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;data&quot;: [​
        {&quot;id&quot;: 0, &quot;text&quot;: &quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;, &quot;sparse&quot;:{&quot;9637&quot;: 0.30856525997853057, &quot;4399&quot;: 0.19771651149001523}, &quot;dense&quot;: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, ...]},​
        {&quot;id&quot;: 1, &quot;text&quot;: &quot;Alan Turing was the first person to conduct substantial research in AI.&quot;, &quot;sparse&quot;:{&quot;6959&quot;: 0.31025067641541815, &quot;1729&quot;: 0.8265339135915016}, &quot;dense&quot;: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, ...]},​
        {&quot;id&quot;: 2, &quot;text&quot;: &quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;, &quot;sparse&quot;:{&quot;1220&quot;: 0.15303302147479103, &quot;7335&quot;: 0.9436728846033107}, &quot;dense&quot;: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, ...]}​
    ],​
    &quot;collectionName&quot;: &quot;hybrid_search_collection&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-multiple-AnnSearchRequest-instances​" class="common-anchor-header">Creare istanze multiple di AnnSearchRequest</h3><p>La ricerca ibrida è implementata creando più istanze <code translate="no">AnnSearchRequest</code> nella funzione <code translate="no">hybrid_search()</code>, dove ogni <code translate="no">AnnSearchRequest</code> rappresenta una richiesta di ricerca ANN di base per uno specifico campo vettoriale. Pertanto, prima di effettuare una ricerca ibrida, è necessario creare un <code translate="no">AnnSearchRequest</code> per ogni campo vettoriale.</p>
<div class="alert note">
<p>Nella Ricerca ibrida, ogni <code translate="no">AnnSearchRequest</code> supporta un solo vettore di interrogazione.</p>
</div>
<p>Supponiamo che il testo della query "Who started AI research?" sia già stato convertito in vettori sparsi e densi. Su questa base, vengono create due richieste di ricerca <code translate="no">AnnSearchRequest</code> per i campi vettoriali <code translate="no">sparse</code> e <code translate="no">dense</code> rispettivamente, come mostrato nell'esempio seguente.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">AnnSearchRequest</span>​
​
query_dense_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]​
​
search_param_1 = {​
    <span class="hljs-string">&quot;data&quot;</span>: [query_dense_vector],​
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;dense&quot;</span>,​
    <span class="hljs-string">&quot;param&quot;</span>: {​
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,​
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}​
    },​
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>​
}​
request_1 = <span class="hljs-title class_">AnnSearchRequest</span>(**search_param_1)​
​
query_sparse_vector = {<span class="hljs-number">3573</span>: <span class="hljs-number">0.34701499565746674</span>}, {<span class="hljs-number">5263</span>: <span class="hljs-number">0.2639375518635271</span>}​
search_param_2 = {​
    <span class="hljs-string">&quot;data&quot;</span>: [query_sparse_vector],​
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;sparse&quot;</span>,​
    <span class="hljs-string">&quot;param&quot;</span>: {​
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,​
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>}​
    },​
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>​
}​
request_2 = <span class="hljs-title class_">AnnSearchRequest</span>(**search_param_2)​
​
reqs = [request_1, request_2]​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">import io.milvus.v2.service.vector.request.AnnSearchReq;​
import io.milvus.v2.service.vector.request.data.BaseVector;​
import io.milvus.v2.service.vector.request.data.FloatVec;​
import io.milvus.v2.service.vector.request.data.SparseFloatVec;​
​
<span class="hljs-built_in">float</span>[] dense = <span class="hljs-keyword">new</span> <span class="hljs-built_in">float</span>[]{<span class="hljs-number">-0.0475336798f</span>,  <span class="hljs-number">0.0521207601f</span>,  <span class="hljs-number">0.0904406682f</span>, ...};​
SortedMap&lt;Long, Float&gt; sparse = <span class="hljs-keyword">new</span> TreeMap&lt;Long, Float&gt;() {{​
    put(<span class="hljs-number">3573L</span>, <span class="hljs-number">0.34701499f</span>);​
    put(<span class="hljs-number">5263L</span>, <span class="hljs-number">0.263937551f</span>);​
    ...​
}};​
​
​
List&lt;BaseVector&gt; queryDenseVectors = Collections.singletonList(<span class="hljs-keyword">new</span> FloatVec(dense));​
List&lt;BaseVector&gt; querySparseVectors = Collections.singletonList(<span class="hljs-keyword">new</span> SparseFloatVec(sparse));​
​
List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();​
searchRequests.<span class="hljs-keyword">add</span>(AnnSearchReq.builder()​
        .vectorFieldName(<span class="hljs-string">&quot;dense&quot;</span>)​
        .vectors(queryDenseVectors)​
        .metricType(IndexParam.MetricType.IP)​
        .<span class="hljs-keyword">params</span>(<span class="hljs-string">&quot;{\&quot;nprobe\&quot;: 10}&quot;</span>)​
        .topK(<span class="hljs-number">2</span>)​
        .build());​
searchRequests.<span class="hljs-keyword">add</span>(AnnSearchReq.builder()​
        .vectorFieldName(<span class="hljs-string">&quot;sparse&quot;</span>)​
        .vectors(querySparseVectors)​
        .metricType(IndexParam.MetricType.IP)​
        .<span class="hljs-keyword">params</span>(<span class="hljs-string">&quot;{\&quot;drop_ratio_build\&quot;: 0.2}&quot;</span>)​
        .topK(<span class="hljs-number">2</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> search_param_1 = {​
    <span class="hljs-string">&quot;data&quot;</span>: query_vector, ​
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;dense&quot;</span>, ​
    <span class="hljs-string">&quot;param&quot;</span>: {​
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment">// 参数值需要与 Collection Schema 中定义的保持一致​</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}​
    },​
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment">// AnnSearchRequest 返还的搜索结果数量​</span>
}​
​
<span class="hljs-keyword">const</span> search_param_2 = {​
    <span class="hljs-string">&quot;data&quot;</span>: query_sparse_vector, ​
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;sparse&quot;</span>, ​
    <span class="hljs-string">&quot;param&quot;</span>: {​
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment">// 参数值需要与 Collection Schema 中定义的保持一致​</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>}​
    },​
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment">// AnnSearchRequest 返还的搜索结果数量​</span>
}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> req=<span class="hljs-string">&#x27;[​
    {​
        &quot;data&quot;: [[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592,....]],​
        &quot;annsField&quot;: &quot;dense&quot;,​
        &quot;params&quot;: {​
            &quot;params&quot;: {​
                &quot;nprobe&quot;: 10​
             }​
        },​
        &quot;limit&quot;: 2​
    },​
    {​
        &quot;data&quot;: [{&quot;3573&quot;: 0.34701499565746674}, {&quot;5263&quot;: 0.2639375518635271}],​
        &quot;annsField&quot;: &quot;sparse&quot;,​
        &quot;params&quot;: {​
            &quot;params&quot;: {​
                &quot;drop_ratio_build&quot;: 0.2​
             }​
        },​
        &quot;limit&quot;: 2​
    }​
 ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Poiché il parametro <code translate="no">limit</code> è impostato su 2, ogni <code translate="no">AnnSearchRequest</code> restituisce 2 risultati di ricerca. In questo esempio, sono stati creati 2 <code translate="no">AnnSearchRequest</code>, quindi verranno restituiti in totale 4 risultati di ricerca.</p>
<h3 id="Configure-a-reranking-strategy​" class="common-anchor-header">Configurare una strategia di reranking</h3><p>Per unire e classificare i due gruppi di risultati di ricerca ANN, è necessario selezionare una strategia di reranking appropriata. Zilliz supporta due tipi di strategia di reranking: <strong>WeightedRanker</strong> e <strong>RRFRanker</strong>. Quando si sceglie una strategia di reranking, una cosa da considerare è se c'è un'enfasi per una o più ricerche RNA di base sui campi vettoriali.</p>
<ul>
<li><p><strong>WeightedRanker</strong>: Questa strategia è consigliata se si desidera che i risultati enfatizzino un particolare campo vettoriale. Il WeightedRanker consente di assegnare pesi maggiori a determinati campi vettoriali, enfatizzandoli maggiormente. Ad esempio, nelle ricerche multimodali, le descrizioni testuali di un'immagine potrebbero essere considerate più importanti dei colori presenti nell'immagine.</p></li>
<li><p><strong>RRFRanker (Reciprocal Rank Fusion Ranker)</strong>: Questa strategia è consigliata quando non c'è un'enfasi specifica. L'RRF può bilanciare efficacemente l'importanza di ciascun campo vettoriale.</p></li>
</ul>
<p>Per maggiori dettagli sui meccanismi di queste due strategie di reranking, consultare <a href="/docs/it/reranking.md">Reranking</a>.</p>
<p>I due esempi seguenti mostrano come utilizzare le strategie di reranking WeightedRanker e RRFRanker.</p>
<ol>
<li><p><strong>Esempio 1: Uso del WeightedRanker</strong></p>
<p>Quando si utilizza la strategia WeightedRanker, è necessario inserire i valori dei pesi nella funzione <code translate="no">WeightedRanker</code>. Il numero di ricerche della RNA di base in una ricerca ibrida corrisponde al numero di valori che devono essere immessi. I valori inseriti devono essere compresi nell'intervallo [0,1], con valori più vicini a 1 che indicano una maggiore importanza.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">WeightedRanker</span>​
​
rerank= <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>) ​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BaseRanker;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.WeightedRanker;​
​
<span class="hljs-type">BaseRanker</span> <span class="hljs-variable">reranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">WeightedRanker</span>(Arrays.asList(<span class="hljs-number">0.8f</span>, <span class="hljs-number">0.3f</span>));​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> rerank = <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{​
        &quot;strategy&quot;: &quot;ws&quot;,​
        &quot;params&quot;: {&quot;weights&quot;: [0.8,0.3]}​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Esempio 2: Utilizzo di RRFRanker</strong></p>
<p>Quando si utilizza la strategia RRFRanker, è necessario inserire il valore del parametro <code translate="no">k</code> nel RRFRanker. Il valore predefinito di <code translate="no">k</code> è 60. Questo parametro aiuta a determinare il modo in cui vengono combinati i ranghi delle diverse ricerche di RNA, con l'obiettivo di bilanciare e fondere l'importanza di tutte le ricerche.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">RRFRanker</span>​
​
ranker = <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BaseRanker;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;​
​
<span class="hljs-type">BaseRanker</span> <span class="hljs-variable">reranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> rerank = <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-string">&quot;100&quot;</span>);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{​
        &quot;strategy&quot;: &quot;rrf&quot;,​
        &quot;params&quot;: { &quot;k&quot;: 100}​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Perform-a-Hybrid-Search​" class="common-anchor-header">Eseguire una ricerca ibrida</h3><p>Prima di eseguire una ricerca ibrida, è necessario caricare la collezione in memoria. Se i campi vettoriali dell'insieme non hanno un indice o non sono caricati, si verificherà un errore durante la chiamata al metodo Hybrid Search. </p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
res = client.hybrid_search(​
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    reqs=reqs,​
    ranker=ranker,​
    limit=<span class="hljs-number">2</span>​
)​
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:​
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)​
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:​
        <span class="hljs-built_in">print</span>(hit)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;​
​
<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>)​
        .searchRequests(searchRequests)​
        .ranker(reranker)​
        .topK(<span class="hljs-number">2</span>)​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>​
})​
​
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">RRFRanker</span>, <span class="hljs-title class_">WeightedRanker</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;​
​
<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
  <span class="hljs-attr">data</span>: [search_param_1, search_param_2],​
  <span class="hljs-attr">limit</span>: <span class="hljs-number">2</span>,​
  <span class="hljs-attr">rerank</span>: <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>)​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/advanced_search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;hybrid_search_collection\&quot;,​
    \&quot;search\&quot;: <span class="hljs-variable">${req}</span>,​
    \&quot;rerank\&quot;: {​
        \&quot;strategy\&quot;:\&quot;rrf\&quot;,​
        \&quot;params\&quot;: {​
            \&quot;k\&quot;: 10​
        }​
    },​
    \&quot;limit\&quot;: 3,​
    \&quot;outputFields\&quot;: [​
        \&quot;user_id\&quot;,​
        \&quot;word_count\&quot;,​
        \&quot;book_describe\&quot;​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>L'output è il seguente.</p>
<pre><code translate="no" class="language-json">[<span class="hljs-string">&quot;[&#x27;id: 844, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 876, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]​

<button class="copy-code-btn"></button></code></pre>
<p>Dal momento che <code translate="no">limit=2</code> è specificato nella ricerca ibrida, Zilliz esegue un rerank dei quattro risultati di ricerca del passo 3 e restituisce solo i primi due risultati più simili. </p>
