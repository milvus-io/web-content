---
id: sparse_vector.md
title: Vettore sparso
summary: >-
  I vettori sparsi sono un metodo importante di rappresentazione dei dati nel
  reperimento delle informazioni e nell'elaborazione del linguaggio naturale.
  Mentre i vettori densi sono popolari per le loro eccellenti capacità di
  comprensione semantica, i vettori sparsi spesso forniscono risultati più
  accurati quando si tratta di applicazioni che richiedono una corrispondenza
  precisa di parole o frasi chiave.
---
<h1 id="Sparse-Vector​" class="common-anchor-header">Vettore sparso<button data-href="#Sparse-Vector​" class="anchor-icon" translate="no">
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
    </button></h1><p>I vettori sparsi sono un metodo importante di rappresentazione dei dati nell'information retrieval e nell'elaborazione del linguaggio naturale. Mentre i vettori densi sono popolari per le loro eccellenti capacità di comprensione semantica, i vettori sparsi spesso forniscono risultati più accurati quando si tratta di applicazioni che richiedono una corrispondenza precisa di parole o frasi chiave.</p>
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
    </button></h2><p>Un vettore rado è una rappresentazione speciale di vettori ad alta dimensione in cui la maggior parte degli elementi è pari a zero e solo alcune dimensioni hanno valori non nulli. Questa caratteristica rende i vettori sparsi particolarmente efficaci nella gestione di dati su larga scala, ad alta dimensionalità ma sparsi. Le applicazioni più comuni includono.</p>
<ul>
<li><p><strong>Analisi del testo:</strong> Rappresentazione di documenti come vettori bag-of-words, dove ogni dimensione corrisponde a una parola e solo le parole che compaiono nel documento hanno valori non nulli.</p></li>
<li><p><strong>Sistemi di raccomandazione:</strong> Matrici di interazione utente-elemento, in cui ogni dimensione rappresenta la valutazione di un utente per un particolare elemento, con la maggior parte degli utenti che interagiscono solo con alcuni elementi.</p></li>
<li><p><strong>Elaborazione di immagini:</strong> Rappresentazione locale delle caratteristiche, che si concentra solo sui punti chiave dell'immagine, dando luogo a vettori sparsi ad alta dimensione.</p></li>
</ul>
<p>Come mostrato nel diagramma seguente, i vettori densi sono tipicamente rappresentati come array continui in cui ogni posizione ha un valore (ad esempio, <code translate="no">[0.3, 0.8, 0.2, 0.3, 0.1]</code>). Al contrario, i vettori sparsi memorizzano solo gli elementi non nulli e i loro indici, spesso rappresentati come coppie chiave-valore (ad esempio, <code translate="no">[{2: 0.2}, ..., {9997: 0.5}, {9999: 0.7}]</code>). Questa rappresentazione riduce significativamente lo spazio di archiviazione e aumenta l'efficienza computazionale, soprattutto quando si tratta di dati ad altissima dimensionalità (ad esempio, 10.000 dimensioni).</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/sparse-vector.png" alt="Spare vector representation" class="doc-image" id="spare-vector-representation" />
   </span> <span class="img-wrapper"> <span>Rappresentazione vettoriale sparsa</span> </span></p>
<p>I vettori sparsi possono essere generati utilizzando vari metodi, come <a href="https://en.wikipedia.org/wiki/Tf%E2%80%93idf">TF-IDF</a> (Term Frequency-Inverse Document Frequency) e <a href="https://en.wikipedia.org/wiki/Okapi_BM25">BM25</a> nell'elaborazione dei testi. Inoltre, Milvus offre metodi pratici per aiutare a generare ed elaborare vettori sparsi. Per maggiori dettagli, consultare <a href="/docs/it/embeddings.md">Embeddings</a>.</p>
<p>Per i dati di testo, Milvus offre anche funzionalità di ricerca full-text, che consentono di eseguire ricerche vettoriali direttamente sui dati di testo grezzi senza utilizzare modelli di incorporamento esterni per generare vettori sparsi. Per ulteriori informazioni, consultare la sezione <a href="/docs/it/full-text-search.md">Ricerca a testo completo</a>.</p>
<p>Dopo la vettorizzazione, i dati possono essere archiviati in Milvus per la gestione e il recupero dei vettori. Il diagramma seguente illustra il processo di base.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/use-sparse-vector.png" alt="Use sparse vector in Milvus" class="doc-image" id="use-sparse-vector-in-milvus" />
   </span> <span class="img-wrapper"> <span>Utilizzo di vettori sparsi in Milvus</span> </span></p>
<div class="alert note">
<p>Oltre ai vettori sparsi, Milvus supporta anche vettori densi e vettori binari. I vettori densi sono ideali per catturare relazioni semantiche profonde, mentre i vettori binari eccellono in scenari come il confronto rapido delle somiglianze e la deduplicazione dei contenuti. Per ulteriori informazioni, consultare <a href="/docs/it/dense-vector.md">Vettori densi</a> e <a href="/docs/it/binary-vector.md">vettori binari</a>.</p>
</div>
<h2 id="Use-sparse-vectors-in-Milvus​" class="common-anchor-header">Utilizzare vettori sparsi in Milvus<button data-href="#Use-sparse-vectors-in-Milvus​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supporta la rappresentazione di vettori sparsi in uno dei seguenti formati.</p>
<ul>
<li><p>Matrice sparsa (usando la classe <code translate="no">scipy.sparse</code> )</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> scipy.sparse <span class="hljs-keyword">import</span> csr_matrix​
​
<span class="hljs-comment"># Create a sparse matrix​</span>
row = [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>]​
col = [<span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>]​
data = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>]​
sparse_matrix = csr_matrix((data, (row, col)), shape=(<span class="hljs-number">3</span>, <span class="hljs-number">3</span>))​
​
<span class="hljs-comment"># Represent sparse vector using the sparse matrix​</span>
sparse_vector = sparse_matrix.getrow(<span class="hljs-number">0</span>)​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Elenco di dizionari (formattato come <code translate="no">{dimension_index: value, ...}</code>)</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Represent sparse vector using a dictionary​</span>
sparse_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.5</span>, <span class="hljs-number">100</span>: <span class="hljs-number">0.3</span>, <span class="hljs-number">500</span>: <span class="hljs-number">0.8</span>, <span class="hljs-number">1024</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">5000</span>: <span class="hljs-number">0.6</span>}]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">SortedMap</span>&lt;<span class="hljs-title class_">Long</span>, <span class="hljs-title class_">Float</span>&gt; sparseVector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;&gt;();​
sparseVector.<span class="hljs-title function_">put</span>(1L, <span class="hljs-number">0.</span>5f);​
sparseVector.<span class="hljs-title function_">put</span>(100L, <span class="hljs-number">0.</span>3f);​
sparseVector.<span class="hljs-title function_">put</span>(500L, <span class="hljs-number">0.</span>8f);​
sparseVector.<span class="hljs-title function_">put</span>(1024L, <span class="hljs-number">0.</span>2f);​
sparseVector.<span class="hljs-title function_">put</span>(5000L, <span class="hljs-number">0.</span>6f);​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Elenco di iteratori di tuple (formattato come <code translate="no">[(dimension_index, value)]</code>)</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Represent sparse vector using a list of tuples​</span>
sparse_vector = [[(<span class="hljs-number">1</span>, <span class="hljs-number">0.5</span>), (<span class="hljs-number">100</span>, <span class="hljs-number">0.3</span>), (<span class="hljs-number">500</span>, <span class="hljs-number">0.8</span>), (<span class="hljs-number">1024</span>, <span class="hljs-number">0.2</span>), (<span class="hljs-number">5000</span>, <span class="hljs-number">0.6</span>)]]​

<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Add-vector-field​" class="common-anchor-header">Aggiungere un campo vettoriale</h3><p>Per utilizzare i vettori sparsi in Milvus, definire un campo per la memorizzazione dei vettori sparsi quando si crea una collezione. Questo processo comprende.</p>
<ol>
<li><p>Impostare <code translate="no">datatype</code> sul tipo di dati vettoriale sparse supportato, <code translate="no">SPARSE_FLOAT_VECTOR</code>.</p></li>
<li><p>Non è necessario specificare la dimensione.</p></li>
</ol>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
​
client.drop_collection(collection_name=<span class="hljs-string">&quot;my_sparse_collection&quot;</span>)​
​
schema = client.create_schema(​
    auto_id=<span class="hljs-literal">True</span>,​
    enable_dynamic_fields=<span class="hljs-literal">True</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)​

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
        .fieldName(<span class="hljs-string">&quot;sparse_vector&quot;</span>)​
        .dataType(DataType.SparseFloatVector)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> schema = [​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse_vector&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>,​
  }​
];​
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
    &quot;fieldName&quot;: &quot;sparse_vector&quot;,​
    &quot;dataType&quot;: &quot;SparseFloatVector&quot;​
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
<p>In questo esempio, viene aggiunto un campo vettoriale chiamato <code translate="no">sparse_vector</code> per memorizzare vettori sparsi. Il tipo di dati di questo campo è <code translate="no">SPARSE_FLOAT_VECTOR</code>.</p>
<h3 id="Set-index-params-for-vector-field​" class="common-anchor-header">Impostare i parametri dell'indice per il campo vettoriale</h3><p>Il processo di creazione di un indice per i vettori sparsi è simile a quello dei <a href="/docs/it/dense-vector.md">vettori densi</a>, ma con differenze nel tipo di indice specificato (<code translate="no">index_type</code>), nella metrica della distanza (<code translate="no">metric_type</code>) e nei parametri dell'indice (<code translate="no">params</code>).</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-keyword">params</span>={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>},
)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;
<span class="hljs-keyword">import</span> java.<span class="hljs-property">util</span>.*;

<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);
indexes.<span class="hljs-title function_">add</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>)
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">SPARSE_INVERTED_INDEX</span>)
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">IP</span>)
        .<span class="hljs-title function_">extraParams</span>(extraParams)
        .<span class="hljs-title function_">build</span>());

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = <span class="hljs-keyword">await</span> client.createIndex({
    index_name: <span class="hljs-string">&#x27;sparse_inverted_index&#x27;</span>,
    field_name: <span class="hljs-string">&#x27;sparse_vector&#x27;</span>,
    metric_type: MetricType.IP,
    index_type: IndexType.SPARSE_INVERTED_INDEX,
    <span class="hljs-keyword">params</span>: {
      inverted_index_algo: <span class="hljs-string">&#x27;DAAT_MAXSCORE&#x27;</span>,
    },
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;sparse_vector&quot;,
            &quot;metricType&quot;: &quot;IP&quot;,
            &quot;indexName&quot;: &quot;sparse_inverted_index&quot;,
            &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;,
            &quot;params&quot;:{&quot;inverted_index_algo&quot;: &quot;DAAT_MAXSCORE&quot;}
        }
    ]&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Nell'esempio precedente:</p>
<ul>
<li><p><code translate="no">index_type</code>: Il tipo di indice da creare per il campo vettoriale rado. Valori validi:</p>
<ul>
<li><code translate="no">SPARSE_INVERTED_INDEX</code>: Un indice invertito generico per vettori sparsi.</li>
</ul>
  <div class="alert note">
<p>A partire da Milvus 2.5.4, <code translate="no">SPARSE_WAND</code> viene deprecato. Si raccomanda invece di utilizzare <code translate="no">&quot;inverted_index_algo&quot;: &quot;DAAT_WAND&quot;</code> per equivalenza, pur mantenendo la compatibilità.</p>
  </div>
</li>
<li><p><code translate="no">metric_type</code>: La metrica utilizzata per calcolare la somiglianza tra vettori sparsi. Valori validi:</p>
<ul>
<li><p><code translate="no">IP</code> (Prodotto interno): Misura la somiglianza utilizzando il prodotto di punti.</p></li>
<li><p><code translate="no">BM25</code>: Utilizzata in genere per la ricerca full-text, che si concentra sulla somiglianza testuale.</p>
<p>Per ulteriori dettagli, fare riferimento a <a href="/docs/it/metric.md">Tipi di metriche</a> e <a href="/docs/it/full-text-search.md">ricerca full-text</a>.</p></li>
</ul></li>
<li><p><code translate="no">params.inverted_index_algo</code>: L'algoritmo usato per costruire e interrogare l'indice. Valori validi:</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code> (predefinito): Elaborazione ottimizzata delle query Document-at-a-Time (DAAT) con l'algoritmo MaxScore. MaxScore fornisce prestazioni migliori per valori elevati di k o per query con molti termini, saltando termini e documenti che potrebbero avere un impatto minimo. Ciò si ottiene suddividendo i termini in gruppi essenziali e non essenziali in base ai punteggi di impatto massimo, concentrandosi sui termini che possono contribuire ai risultati top-k.</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: Elaborazione ottimizzata delle query DAAT con l'algoritmo WAND. WAND valuta un minor numero di documenti trovati, sfruttando i punteggi di impatto massimo per saltare i documenti non competitivi, ma ha un overhead più elevato per ogni singolo colpo. Questo rende WAND più efficiente per le query con valori k piccoli o per le query brevi, dove il salto è più fattibile.</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: Elaborazione di query Basic Term-at-a-Time (TAAT). Pur essendo più lento rispetto a <code translate="no">DAAT_MAXSCORE</code> e <code translate="no">DAAT_WAND</code>, <code translate="no">TAAT_NAIVE</code> offre un vantaggio unico. A differenza degli algoritmi DAAT, che utilizzano punteggi di impatto massimo memorizzati nella cache che rimangono statici indipendentemente dalle modifiche al parametro globale della raccolta (avgdl), <code translate="no">TAAT_NAIVE</code> si adatta dinamicamente a tali modifiche.</p></li>
</ul></li>
</ul>
<h3 id="Create-collection​" class="common-anchor-header">Creare la raccolta</h3><p>Una volta completate le impostazioni dei vettori sparsi e degli indici, è possibile creare una collezione che contenga vettori sparsi. L'esempio seguente utilizza il metodo <ins><code translate="no">create_collection</code></ins> per creare un insieme chiamato <code translate="no">my_sparse_collection</code>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&quot;my_sparse_collection&quot;</span>,​
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
        .collectionName(<span class="hljs-string">&quot;my_sparse_collection&quot;</span>)​
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
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_sparse_collection&#x27;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-attr">index_params</span>: indexParams​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_sparse_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data​" class="common-anchor-header">Inserire i dati</h3><p>Dopo aver creato la collezione, inserire i dati contenenti vettori sparsi.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">sparse_vectors = [​
    {<span class="hljs-string">&quot;sparse_vector&quot;</span>: {<span class="hljs-number">1</span>: <span class="hljs-number">0.5</span>, <span class="hljs-number">100</span>: <span class="hljs-number">0.3</span>, <span class="hljs-number">500</span>: <span class="hljs-number">0.8</span>}},​
    {<span class="hljs-string">&quot;sparse_vector&quot;</span>: {<span class="hljs-number">10</span>: <span class="hljs-number">0.1</span>, <span class="hljs-number">200</span>: <span class="hljs-number">0.7</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.9</span>}},​
]​
​
client.<span class="hljs-title function_">insert</span>(​
    collection_name=<span class="hljs-string">&quot;my_sparse_collection&quot;</span>,​
    data=sparse_vectors​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;​
​
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
{​
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
    SortedMap&lt;Long, Float&gt; sparse = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;&gt;();​
    sparse.put(<span class="hljs-number">1L</span>, <span class="hljs-number">0.5f</span>);​
    sparse.put(<span class="hljs-number">100L</span>, <span class="hljs-number">0.3f</span>);​
    sparse.put(<span class="hljs-number">500L</span>, <span class="hljs-number">0.8f</span>);​
    row.add(<span class="hljs-string">&quot;sparse_vector&quot;</span>, gson.toJsonTree(sparse));​
    rows.add(row);​
}​
{​
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
    SortedMap&lt;Long, Float&gt; sparse = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;&gt;();​
    sparse.put(<span class="hljs-number">10L</span>, <span class="hljs-number">0.1f</span>);​
    sparse.put(<span class="hljs-number">200L</span>, <span class="hljs-number">0.7f</span>);​
    sparse.put(<span class="hljs-number">1000L</span>, <span class="hljs-number">0.9f</span>);​
    row.add(<span class="hljs-string">&quot;sparse_vector&quot;</span>, gson.toJsonTree(sparse));​
    rows.add(row);​
}​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_sparse_collection&quot;</span>)​
        .data(rows)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [​
  { <span class="hljs-attr">sparse_vector</span>: { <span class="hljs-string">&quot;1&quot;</span>: <span class="hljs-number">0.5</span>, <span class="hljs-string">&quot;100&quot;</span>: <span class="hljs-number">0.3</span>, <span class="hljs-string">&quot;500&quot;</span>: <span class="hljs-number">0.8</span> } },​
  { <span class="hljs-attr">sparse_vector</span>: { <span class="hljs-string">&quot;10&quot;</span>: <span class="hljs-number">0.1</span>, <span class="hljs-string">&quot;200&quot;</span>: <span class="hljs-number">0.7</span>, <span class="hljs-string">&quot;1000&quot;</span>: <span class="hljs-number">0.9</span> } },​
];​
client.<span class="hljs-title function_">insert</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_sparse_collection&quot;</span>,​
  <span class="hljs-attr">data</span>: data,​
});​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;data&quot;: [​
        {&quot;sparse_vector&quot;: {&quot;1&quot;: 0.5, &quot;100&quot;: 0.3, &quot;500&quot;: 0.8}},​
        {&quot;sparse_vector&quot;: {&quot;10&quot;: 0.1, &quot;200&quot;: 0.7, &quot;1000&quot;: 0.9}}        ​
    ],​
    &quot;collectionName&quot;: &quot;my_sparse_collection&quot;​
}&#x27;</span>​
​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:{&quot;insertCount&quot;:2,&quot;insertIds&quot;:[&quot;453577185629572534&quot;,&quot;453577185629572535&quot;]}}​</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search​" class="common-anchor-header">Eseguire la ricerca di similarità</h3><p>Per eseguire una ricerca di similarità utilizzando vettori sparsi, preparare il vettore di interrogazione e i parametri di ricerca.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare search parameters​</span>
search_params = {​
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>},  <span class="hljs-comment"># Additional optional search parameters​</span>
}​
​
<span class="hljs-comment"># Prepare the query vector​</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]​

<button class="copy-code-btn"></button></code></pre>
<p>In questo esempio, <code translate="no">drop_ratio_search</code> è un parametro opzionale specifico per i vettori sparsi, che consente di regolare con precisione i piccoli valori del vettore di interrogazione durante la ricerca. Ad esempio, con <code translate="no">{&quot;drop_ratio_search&quot;: 0.2}</code>, il 20% più piccolo dei valori nel vettore di interrogazione sarà ignorato durante la ricerca.</p>
<p>Quindi, eseguire la ricerca di similarità con il metodo <code translate="no">search</code>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_sparse_collection&quot;</span>,​
    data=query_vector,​
    <span class="hljs-built_in">limit</span>=3,​
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>],​
    search_params=search_params,​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: &#x27;453718927992172266&#x27;, &#x27;distance&#x27;: 0.6299999952316284, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172266&#x27;}}, {&#x27;id&#x27;: &#x27;453718927992172265&#x27;, &#x27;distance&#x27;: 0.10000000149011612, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172265&#x27;}}]&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">SearchReq</span>;​
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">data</span>.<span class="hljs-property">SparseFloatVec</span>;​
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">response</span>.<span class="hljs-property">SearchResp</span>;​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
searchParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0.2</span>);​
​
<span class="hljs-title class_">SortedMap</span>&lt;<span class="hljs-title class_">Long</span>, <span class="hljs-title class_">Float</span>&gt; sparse = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;&gt;();​
sparse.<span class="hljs-title function_">put</span>(10L, <span class="hljs-number">0.</span>1f);​
sparse.<span class="hljs-title function_">put</span>(200L, <span class="hljs-number">0.</span>7f);​
sparse.<span class="hljs-title function_">put</span>(1000L, <span class="hljs-number">0.</span>9f);​
​
<span class="hljs-title class_">SparseFloatVec</span> queryVector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SparseFloatVec</span>(sparse);​
​
<span class="hljs-title class_">SearchResp</span> searchR = client.<span class="hljs-title function_">search</span>(<span class="hljs-title class_">SearchReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;my_sparse_collection&quot;</span>)​
        .<span class="hljs-title function_">data</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(queryVector))​
        .<span class="hljs-title function_">annsField</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)​
        .<span class="hljs-title function_">searchParams</span>(searchParams)​
        .<span class="hljs-title function_">topK</span>(<span class="hljs-number">3</span>)​
        .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(<span class="hljs-string">&quot;pk&quot;</span>))​
        .<span class="hljs-title function_">build</span>());​
        ​
<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(searchR.<span class="hljs-title function_">getSearchResults</span>());​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">//​</span>
<span class="hljs-comment">// [[SearchResp.SearchResult(entity={pk=453444327741536759}, score=1.31, id=453444327741536759), SearchResp.SearchResult(entity={pk=453444327741536756}, score=1.31, id=453444327741536756), SearchResp.SearchResult(entity={pk=453444327741536753}, score=1.31, id=453444327741536753)]]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.search({​
    collection_name: <span class="hljs-string">&#x27;my_sparse_collection&#x27;</span>,​
    data: {1: 0.2, 50: 0.4, 1000: 0.7},​
    <span class="hljs-built_in">limit</span>: 3,​
    output_fields: [<span class="hljs-string">&#x27;pk&#x27;</span>],​
    params: {​
        drop_ratio_search: 0.2​
    }​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_sparse_collection&quot;,​
    &quot;data&quot;: [​
        {&quot;1&quot;: 0.2, &quot;50&quot;: 0.4, &quot;1000&quot;: 0.7}​
    ],​
    &quot;annsField&quot;: &quot;sparse_vector&quot;,​
    &quot;limit&quot;: 3,​
    &quot;searchParams&quot;:{​
        &quot;params&quot;:{&quot;drop_ratio_search&quot;: 0.2}​
    },​
    &quot;outputFields&quot;: [&quot;pk&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;distance&quot;:0.63,&quot;id&quot;:&quot;453577185629572535&quot;,&quot;pk&quot;:&quot;453577185629572535&quot;},{&quot;distance&quot;:0.1,&quot;id&quot;:&quot;453577185629572534&quot;,&quot;pk&quot;:&quot;453577185629572534&quot;}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni sui parametri di ricerca per similarità, consultare la sezione <a href="/docs/it/single-vector-search.md">Ricerca di base di RNA</a>.</p>
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
    </button></h2><p>Quando si utilizzano vettori sparsi in Milvus, si devono considerare i seguenti limiti:</p>
<ul>
<li><p>Attualmente, per i vettori sparsi sono supportate solo le metriche di distanza <strong>IP</strong> e <strong>BM25</strong> (per la ricerca full-text). L'elevata dimensionalità dei vettori sparsi rende impraticabili le distanze L2 e coseno.</p></li>
<li><p>Per i campi vettoriali sparsi è supportato solo il tipo di indice <strong>SPARSE_INVERTED_INDEX</strong>.</p></li>
<li><p>I tipi di dati supportati per i vettori sparsi:</p>
<ul>
<li>La parte della dimensione deve essere un intero a 32 bit senza segno;</li>
<li>La parte del valore può essere un numero non negativo a 32 bit in virgola mobile.</li>
</ul></li>
<li><p>I vettori sparsi devono soddisfare i seguenti requisiti per l'inserimento e la ricerca:</p>
<ul>
<li>Almeno un valore del vettore è diverso da zero;</li>
<li>Gli indici del vettore sono non negativi.</li>
</ul></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">DOMANDE FREQUENTI<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>La dimensione di un incorporamento sparse può essere un qualsiasi valore discreto all'interno dello spazio uint32?</strong></p>
<p>Sì, con un'eccezione. La dimensione di un incorporamento sparse può essere qualsiasi valore nell'intervallo <code translate="no">[0, maximum of uint32)</code>. Ciò significa che non è possibile utilizzare il valore massimo di uint32.</p></li>
<li><p><strong>Le ricerche sui segmenti crescenti vengono condotte attraverso un indice o con la forza bruta?</strong></p>
<p>Le ricerche sui segmenti crescenti vengono condotte attraverso un indice dello stesso tipo dell'indice del segmento sigillato. Per i nuovi segmenti crescenti prima che l'indice sia costruito, si usa una ricerca a forza bruta.</p></li>
<li><p><strong>È possibile avere vettori sparsi e densi in un'unica collezione?</strong></p>
<p>Sì, grazie al supporto di più tipi di vettore, è possibile creare collezioni con colonne di vettori sia sparse che dense ed eseguire ricerche ibride su di esse.</p></li>
</ul>
