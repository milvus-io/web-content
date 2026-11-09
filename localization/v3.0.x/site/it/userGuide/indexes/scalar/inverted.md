---
id: inverted.md
title: INVERTITI
summary: >-
  Quando è necessario eseguire frequenti query con filtri sui propri dati, gli
  indici INVERTITI possono migliorare notevolmente le prestazioni delle query.
  Anziché eseguire una scansione di tutti i documenti, un indice invertito
  individua rapidamente i record esatti che corrispondono alle condizioni di
  filtro specificate.
---
<h1 id="INVERTED" class="common-anchor-header">INVERTITI<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h1><p>Quando è necessario eseguire frequenti query di filtraggio sui dati, gli indici " <code translate="no">INVERTED</code> " possono migliorare notevolmente le prestazioni delle query. Anziché eseguire la scansione di tutti i documenti, Milvus utilizza gli indici invertiti per individuare rapidamente i record esatti che corrispondono alle condizioni di filtro specificate.</p>
<h2 id="When-to-use-INVERTED-indexes" class="common-anchor-header">Quando utilizzare gli indici INVERTITI<button data-href="#When-to-use-INVERTED-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizza gli indici INVERTITI quando devi:</p>
<ul>
<li><p><strong>Filtrare in base a valori specifici</strong>: trovare tutti i record in cui un campo è uguale a un valore specifico (ad es., <code translate="no">category == &quot;electronics&quot;</code>)</p></li>
<li><p><strong>Filtrare contenuti testuali</strong>: eseguire ricerche efficienti su campi <code translate="no">VARCHAR</code> </p></li>
<li><p><strong>Interrogare i valori dei campi JSON</strong>: filtrare in base a chiavi specifiche all’interno delle strutture JSON</p></li>
</ul>
<p><strong>Vantaggi in termini di prestazioni</strong>: gli indici INVERTED possono ridurre il tempo di esecuzione delle query da secondi a millisecondi su set di dati di grandi dimensioni, eliminando la necessità di eseguire scansioni complete delle raccolte.</p>
<h2 id="How-INVERTED-indexes-work" class="common-anchor-header">Come funzionano gli indici INVERTED<button data-href="#How-INVERTED-indexes-work" class="anchor-icon" translate="no">
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
    </button></h2><p>Un <strong>indice INVERTED</strong> in Milvus associa ogni valore univoco di un campo (termine) all’insieme di ID dei documenti in cui tale valore compare. Questa struttura consente ricerche veloci per campi con valori ripetuti o categorici.</p>
<p>Come mostrato nel diagramma, il processo si svolge in due fasi:</p>
<ol>
<li><p><strong>Mappatura diretta (ID → Termine):</strong> ogni ID documento punta al valore di campo che contiene.</p></li>
<li><p><strong>Mappatura inversa (Term → ID):</strong> Milvus raccoglie i termini univoci e costruisce una mappatura inversa da ciascun termine a tutti gli ID che lo contengono.</p></li>
</ol>
<p>Ad esempio, il valore <strong>“elettronica”</strong> è associato agli ID <strong>1</strong> e <strong>3</strong>, mentre <strong>“libri”</strong> è associato agli ID <strong>2</strong> e <strong>5</strong>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/how-inverted-index-works.png" alt="How Inverted Index Works" class="doc-image" id="how-inverted-index-works" /> 
   <span>Come funziona l’indice invertito</span>
  
 </span></p>
<p>Quando si filtra in base a un valore specifico (ad es., <code translate="no">category == &quot;electronics&quot;</code>), Milvus cerca semplicemente il termine nell’indice e recupera direttamente gli ID corrispondenti. Ciò evita di scansionare l’intero set di dati e consente un filtraggio veloce, specialmente per valori categoriali o ripetuti.</p>
<p>Gli indici INVERTED supportano tutti i tipi di campi scalari, quali <strong>BOOL</strong>, <strong>INT8</strong>, <strong>INT16</strong>, <strong>INT32</strong>, <strong>INT64</strong>, <strong>FLOAT</strong>, <strong>DOUBLE</strong>, <strong>VARCHAR</strong>, <strong>JSON</strong> e <strong>ARRAY</strong>. Tuttavia, i parametri di indicizzazione per un campo JSON sono leggermente diversi rispetto a quelli dei normali campi scalari.</p>
<h2 id="Create-indexes-on-non-JSON-fields" class="common-anchor-header">Creazione di indici su campi non JSON<button data-href="#Create-indexes-on-non-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Per creare un indice su un campo non JSON, procedere come segue:</p>
<ol>
<li><p>Preparare i parametri dell’indice:</p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#go">Go</a>
<a href="#rust">Rust</a>
<a href="#cpp">C++</a>
<a href="#javascript">NodeJS</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Create an empty index parameter object</span>
index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-comment">// Initialize Milvus client</span>
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment">// Replace with your server address</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

<span class="hljs-comment">// Initialize Milvus client</span>
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-comment">// Replace with your server address</span>
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// Initialize Milvus client</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>); <span class="hljs-comment">// Replace with your server address</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-comment">// Initialize Milvus client</span>
<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)); <span class="hljs-comment">// Replace with your server address</span>
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Initialize Milvus client</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-comment">// Replace with your server address</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Aggiungere l’indice <code translate="no">INVERTED</code>:</p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#go">Go</a>
<a href="#rust">Rust</a>
<a href="#cpp">C++</a>
<a href="#javascript">NodeJS</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,           <span class="hljs-comment"># Name of the field to index</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,          <span class="hljs-comment"># Specify INVERTED index type</span></span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>     <span class="hljs-comment"># Give your index a name</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-comment">// Add the INVERTED index</span>
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;category&quot;</span>) <span class="hljs-comment">// Name of the field to index</span>
        .indexType(IndexParam.IndexType.INVERTED) <span class="hljs-comment">// Specify INVERTED index type</span>
        .indexName(<span class="hljs-string">&quot;category_index&quot;</span>) <span class="hljs-comment">// Give your index a name</span>
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

<span class="hljs-comment">// Add the INVERTED index</span>
idx := index.NewInvertedIndex() <span class="hljs-comment">// Specify INVERTED index type</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Add the INVERTED index</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">index_params</span> = <span class="hljs-built_in">vec!</span>[
    IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;category&quot;</span>) <span class="hljs-comment">// Name of the field to index</span>
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Inverted) <span class="hljs-comment">// Specify INVERTED index type</span>
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;category_index&quot;</span>), <span class="hljs-comment">// Give your index a name</span>
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Add the INVERTED index</span>
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">index_desc</span><span class="hljs-params">(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;category_index&quot;</span>, milvus::IndexType::INVERTED)</span></span>; <span class="hljs-comment">// field name, index name, index type</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Add the INVERTED index</span>
<span class="hljs-keyword">const</span> indexParams = {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-comment">// Name of the field to index</span>
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">INVERTED</span>, <span class="hljs-comment">// Specify INVERTED index type</span>
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;category_index&quot;</span>, <span class="hljs-comment">// Give your index a name</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Add the INVERTED index</span>
<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;category&quot;,
        &quot;indexName&quot;: &quot;category_index&quot;,
        &quot;indexType&quot;: &quot;INVERTED&quot;
    }
]&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Crea l'indice:</p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#go">Go</a>
<a href="#rust">Rust</a>
<a href="#cpp">C++</a>
<a href="#javascript">NodeJS</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Replace with your collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-comment">// Create the index</span>
client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>) <span class="hljs-comment">// Replace with your collection name</span>
        .indexParams(Collections.singletonList(indexParam))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

<span class="hljs-comment">// Create the index</span>
_, err = client.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, idx).
    WithIndexName(<span class="hljs-string">&quot;category_index&quot;</span>)) <span class="hljs-comment">// Replace with your collection name</span>
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Create the index</span>
client
    .<span class="hljs-title function_ invoke__">create_index</span>(
        CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>) <span class="hljs-comment">// Replace with your collection name</span>
            .<span class="hljs-title function_ invoke__">index_params</span>(index_params)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Create the index</span>
status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(milvus::<span class="hljs-built_in">CreateIndexRequest</span>()
                                 .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>) <span class="hljs-comment">// Replace with your collection name</span>
                                 .<span class="hljs-built_in">WithIndexes</span>({std::<span class="hljs-built_in">move</span>(index_desc)}));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Create the index</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// Replace with your collection name</span>
    <span class="hljs-attr">field_name</span>: indexParams.<span class="hljs-property">field_name</span>,
    <span class="hljs-attr">index_type</span>: indexParams.<span class="hljs-property">index_type</span>,
    <span class="hljs-attr">index_name</span>: indexParams.<span class="hljs-property">index_name</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Create the index</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Create-indexes-on-JSON-fields" class="common-anchor-header">Creare indici sui campi JSON<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span><button data-href="#Create-indexes-on-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>È inoltre possibile creare indici INVERTITI su percorsi specifici all'interno dei campi JSON. Ciò richiede parametri aggiuntivi per specificare il percorso JSON e il tipo di dati:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Build index params</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,                    <span class="hljs-comment"># JSON field name</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>,    <span class="hljs-comment"># Path to the JSON key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>              <span class="hljs-comment"># Data type to cast to during indexing</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Create index</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Replace with your collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-comment">// Build index params</span>
Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>); <span class="hljs-comment">// Path to the JSON key</span>
extraParams.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>); <span class="hljs-comment">// Data type to cast to during indexing</span>

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">jsonIndexParam</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>) <span class="hljs-comment">// JSON field name</span>
        .indexType(IndexParam.IndexType.INVERTED)
        .indexName(<span class="hljs-string">&quot;metadata_category_index&quot;</span>)
        .extraParams(extraParams)
        .build();

<span class="hljs-comment">// Create index</span>
client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>) <span class="hljs-comment">// Replace with your collection name</span>
        .indexParams(Collections.singletonList(jsonIndexParam))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

<span class="hljs-comment">// Build index params</span>
jsonIdx := index.NewJSONPathIndex(index.Inverted, <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>) <span class="hljs-comment">// indexType, json_cast_type, json_path</span>
jsonIdx.WithIndexName(<span class="hljs-string">&quot;metadata_category_index&quot;</span>)

<span class="hljs-comment">// Create index</span>
_, err = client.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIdx)) <span class="hljs-comment">// Replace with your collection name</span>
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-comment">// Build index params</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">json_index_params</span> = <span class="hljs-built_in">vec!</span>[
    IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;metadata&quot;</span>) <span class="hljs-comment">// JSON field name</span>
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Inverted)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;metadata_category_index&quot;</span>)
        .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
            (<span class="hljs-string">&quot;json_path&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()), <span class="hljs-comment">// Path to the JSON key</span>
            (<span class="hljs-string">&quot;json_cast_type&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;varchar&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()), <span class="hljs-comment">// Data type to cast to during indexing</span>
        ])),
];

<span class="hljs-comment">// Create index</span>
client
    .<span class="hljs-title function_ invoke__">create_index</span>(
        CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>) <span class="hljs-comment">// Replace with your collection name</span>
            .<span class="hljs-title function_ invoke__">index_params</span>(json_index_params)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Build index params</span>
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">json_index_desc</span><span class="hljs-params">(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;metadata_category_index&quot;</span>, milvus::IndexType::INVERTED)</span></span>; <span class="hljs-comment">// JSON field name, index name, index type</span>
json_index_desc.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>); <span class="hljs-comment">// Path to the JSON key</span>
json_index_desc.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>); <span class="hljs-comment">// Data type to cast to during indexing</span>

<span class="hljs-comment">// Create index</span>
status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(milvus::<span class="hljs-built_in">CreateIndexRequest</span>()
                                 .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>) <span class="hljs-comment">// Replace with your collection name</span>
                                 .<span class="hljs-built_in">WithIndexes</span>({std::<span class="hljs-built_in">move</span>(json_index_desc)}));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Build index params</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// Replace with your collection name</span>
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-comment">// JSON field name</span>
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">INVERTED</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;metadata_category_index&quot;</span>,
    <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">json_path</span>: <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>, <span class="hljs-comment">// Path to the JSON key</span>
        <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-comment">// Data type to cast to during indexing</span>
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Build index params</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;metadata&quot;,
            &quot;indexName&quot;: &quot;metadata_category_index&quot;,
            &quot;indexType&quot;: &quot;INVERTED&quot;,
            &quot;params&quot;: {
                &quot;json_path&quot;: &quot;metadata[\&quot;category\&quot;]&quot;,
                &quot;json_cast_type&quot;: &quot;varchar&quot;
            }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per informazioni dettagliate sull'indicizzazione dei campi JSON, inclusi i percorsi supportati, i tipi di dati e le limitazioni, consultare <a href="/docs/it/json-indexing.md">Indicizzazione JSON</a>.</p>
<h2 id="Drop-an-index" class="common-anchor-header">Eliminare un indice<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare il metodo ` <code translate="no">drop_index()</code> ` per rimuovere un indice esistente da una collezione.</p>
<div class="alert note">
<ul>
<li><p>Nella <strong>versione 2.6.3</strong> o precedenti, è necessario liberare la collezione prima di eliminare un indice scalare.</p></li>
<li><p>A partire <strong>dalla versione 2.6.4</strong> o successive, è possibile eliminare direttamente un indice scalare una volta che non è più necessario, senza dover prima liberare la collezione.</p></li>
</ul>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DropIndexReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

client.dropIndex(DropIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .indexName(<span class="hljs-string">&quot;category_index&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = client.DropIndex(ctx, milvusclient.NewDropIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;category_index&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>)).<span class="hljs-keyword">await</span>?;

client
    .<span class="hljs-title function_ invoke__">drop_index</span>(
        DropIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;category_index&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">DropIndex</span>(milvus::<span class="hljs-built_in">DropIndexRequest</span>()
                           .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                           .<span class="hljs-built_in">WithIndexName</span>(<span class="hljs-string">&quot;category_index&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;category_index&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexName&quot;: &quot;category_index&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">Migliori pratiche<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Creare gli indici dopo aver caricato i dati</strong>: creare indici su collezioni che contengono già dati per ottenere prestazioni migliori</p></li>
<li><p><strong>Utilizzare nomi descrittivi per gli indici</strong>: scegliere nomi che indichino chiaramente il campo e lo scopo</p></li>
<li><p><strong>Monitorare le prestazioni degli indici</strong>: verificare le prestazioni delle query prima e dopo la creazione degli indici</p></li>
<li><p><strong>Considerare i modelli di query</strong>: creare indici sui campi in base ai quali si effettuano frequentemente i filtri</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Prossimi passi<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><p>Scopri <a href="/docs/it/index-explained.md">altri tipi</a> di <a href="/docs/it/index-explained.md">indici</a></p></li>
<li><p>Consulta la sezione " <a href="/docs/it/json-indexing.md">Indicizzazione JSON</a> " per scenari avanzati di indicizzazione JSON</p></li>
</ul>
