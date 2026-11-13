---
id: index-scalar-fields.md
order: 2
summary: >-
  Questa guida ti illustrerà come creare e configurare indici scalari per campi
  quali numeri interi, stringhe, ecc.
title: Campi scalari di indice
---
<h1 id="Index-Scalar-Fields" class="common-anchor-header">Campi scalari di indice<button data-href="#Index-Scalar-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus, un indice scalare viene utilizzato per velocizzare il metafiltraggio in base a un valore specifico di un campo non vettoriale, in modo simile a un indice di un database tradizionale. Questa guida illustra come creare e configurare indici scalari per campi quali numeri interi, stringhe, ecc.</p>
<div class="alert warning">
<p>Questa pagina è stata deprecata. Per l'implementazione più recente, fare riferimento a <a href="/docs/it/bitmap.md">BITMAP</a>, <a href="/docs/it/inverted.md">INVERTED</a>, <a href="/docs/it/ngram.md">NGRAM</a>, <a href="/docs/it/rtree.md">RTREE</a>, <a href="/docs/it/stl-sort.md">STL_SORT</a>, <a href="/docs/it/trie.md">TRIE</a> e <a href="/docs/it/fmindex.md">FMINDEX</a>.</p>
</div>
<h2 id="Types-of-scalar-indexing" class="common-anchor-header">Tipi di indicizzazione scalare<button data-href="#Types-of-scalar-indexing" class="anchor-icon" translate="no">
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
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Auto-indexing">Indicizzazione automatica</a></strong>: Milvus determina automaticamente il tipo di indice in base al tipo di dati del campo scalare. Questa opzione è indicata quando non è necessario controllare il tipo specifico di indice.</p></li>
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Custom-indexing">Indicizzazione personalizzata</a></strong>: si specifica il tipo esatto di indice, ad esempio un indice invertito o <a href="/docs/it/bitmap.md">un indice bitmap</a>. Ciò offre un maggiore controllo sulla scelta del tipo di indice.</p></li>
</ul>
<h2 id="Auto-indexing" class="common-anchor-header">Indicizzazione automatica<button data-href="#Auto-indexing" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>Per utilizzare l’indicizzazione automatica, ometti il parametro <strong>index_type</strong> in <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>, in modo che Milvus possa dedurre il tipo di indice in base al tipo del campo scalare.</p>
</div>
<div class="language-java">
<p>Per utilizzare l’indicizzazione automatica, omettere il parametro <strong>indexType</strong> in <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>, in modo che Milvus possa dedurre il tipo di indice in base al tipo del campo scalare.</p>
</div>
<div class="language-javascript">
<p>Per utilizzare l'indicizzazione automatica, omettere il parametro ` <strong>index_type</strong> ` in <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>, in modo che Milvus possa dedurre il tipo di indice in base al tipo del campo scalare.</p>
</div>
<p>Per le corrispondenze tra i tipi di dati scalari e gli algoritmi di indicizzazione predefiniti, consultare la sezione <a href="/docs/it/scalar_index.md#Choosing-a-scalar-index">Scelta di un indice scalare</a>.</p>
<div class="multipleCode">
   <a href="#python">Python 
 </a> <a href="#java">   Java</a>
 <a href="#javascript">   Node.js</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Auto indexing</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

index_params = MilvusClient.prepare_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>

index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;&quot;</span>, <span class="hljs-comment"># Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
    index_name=<span class="hljs-string">&quot;default_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
  collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
  index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForScalarField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;scalar_1&quot;</span>) <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    .indexName(<span class="hljs-string">&quot;default_index&quot;</span>) <span class="hljs-comment">// Name of the index to be created</span>
    .indexType(<span class="hljs-string">&quot;&quot;</span>) <span class="hljs-comment">// Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForVectorField);

<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>) <span class="hljs-comment">// Specify the collection name</span>
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment">// Specify the collection name</span>
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;default_index&quot;</span>, <span class="hljs-comment">// Name of the index to be created</span>
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment">// Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
})
<button class="copy-code-btn"></button></code></pre>
<h2 id="Custom-indexing" class="common-anchor-header">Indicizzazione personalizzata<button data-href="#Custom-indexing" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>Per utilizzare l'indicizzazione personalizzata, specificare un tipo di indice particolare utilizzando il parametro <strong>index_type</strong> in <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>.</p>
</div>
<div class="language-java">
<p>Per utilizzare l'indicizzazione personalizzata, specificare un tipo di indice specifico utilizzando il parametro <strong>indexType</strong> in <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>.</p>
</div>
<div class="language-javascript">
<p>Per utilizzare l'indicizzazione personalizzata, specificare un tipo di indice particolare utilizzando il parametro <strong>index_type</strong> in <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>.</p>
</div>
<p>L’esempio riportato di seguito crea un indice invertito per il campo scalare <code translate="no">scalar_2</code>.</p>
<div class="multipleCode">
   <a href="#python">Python 
 </a> <a href="#java">   Java</a>
 <a href="#javascript">   Node.js</a>
</div>
<pre><code translate="no" class="language-python">index_params = MilvusClient.prepare_index_params() <span class="hljs-comment">#  Prepare an IndexParams object</span>

index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_2&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
  collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
  index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForScalarField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;scalar_1&quot;</span>) <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    .indexName(<span class="hljs-string">&quot;inverted_index&quot;</span>) <span class="hljs-comment">// Name of the index to be created</span>
    .indexType(<span class="hljs-string">&quot;INVERTED&quot;</span>) <span class="hljs-comment">// Type of index to be created</span>
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForVectorField);

<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>) <span class="hljs-comment">// Specify the collection name</span>
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment">// Specify the collection name</span>
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;inverted_index&quot;</span>, <span class="hljs-comment">// Name of the index to be created</span>
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span> <span class="hljs-comment">// Type of index to be created</span>
})
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p><strong>Metodi e parametri</strong></p>
<ul>
<li><p><strong>prepare_index_params()</strong></p>
<p>Prepara un oggetto ` <strong>IndexParams</strong> `.</p></li>
<li><p><strong>add_index()</strong></p>
<p>Aggiunge le configurazioni dell'indice all'oggetto <strong>IndexParams</strong>.</p>
<ul>
<li><p><strong>field_name</strong> (<em>stringa</em>)</p>
<p>Il nome del campo scalare da indicizzare.</p></li>
<li><p><strong>index_type</strong> (<em>stringa</em>):</p>
<p>Il tipo di indice scalare da creare. Per l'indicizzazione implicita, lasciare vuoto o omettere questo parametro.</p>
<p>Per l'indicizzazione personalizzata, i valori validi sono:</p>
<ul>
<li><p><strong>INVERTED</strong>: (Consigliato) Un indice invertito è costituito da un dizionario di termini contenente tutte le parole tokenizzate ordinate alfabeticamente. Per ulteriori dettagli, consultare <a href="/docs/it/scalar_index.md">Indice scalare</a>.</p></li>
<li><p><strong>BITMAP</strong>: un tipo di indice che memorizza una bitmap di tutti i valori univoci presenti in un campo. Per ulteriori dettagli, consultare la sezione <a href="/docs/it/bitmap.md">BITMAP</a>.</p></li>
<li><p><strong>STL_SORT</strong>: ordina i campi scalari utilizzando l'algoritmo di ordinamento della libreria di modelli standard. Supporta campi numerici, VARCHAR e TIMESTAMPTZ. Per ulteriori dettagli, consultare <a href="/docs/it/stl-sort.md">STL_SORT</a>.</p></li>
<li><p><strong>TRIE</strong>: Una struttura dati ad albero per ricerche e recuperi rapidi di prefissi. Supporta i campi VARCHAR. Per ulteriori dettagli, consultare <a href="/docs/it/trie.md">TRIE</a>.</p></li>
<li><p><strong>NGRAM</strong>: un indice che accelera i filtri LIKE e regex sui campi VARCHAR. Per ulteriori dettagli, consultare <a href="/docs/it/ngram.md">NGRAM</a>.</p></li>
<li><p><strong>FMINDEX</strong>: un indice esatto di sottostringhe a livello di byte per i campi VARCHAR. Per ulteriori dettagli, consultare <a href="/docs/it/fmindex.md">FMINDEX</a>.</p></li>
<li><p><strong>RTREE</strong>: un indice per i campi GEOMETRY. Per ulteriori dettagli, consultare <a href="/docs/it/rtree.md">RTREE</a>.</p></li>
</ul></li>
<li><p><strong>index_name</strong> (<em>stringa</em>)</p>
<p>Il nome dell’indice scalare da creare. Ogni campo scalare supporta un solo indice.</p></li>
</ul></li>
<li><p><strong>create_index()</strong></p>
<p>Crea l’indice nella collezione specificata.</p>
<ul>
<li><p><strong>collection_name</strong> (<em>stringa</em>)</p>
<p>Il nome della collezione per la quale viene creato l'indice.</p></li>
<li><p><strong>index_params</strong></p>
<p>L'oggetto <strong>IndexParams</strong> contenente le configurazioni dell'indice.</p></li>
</ul></li>
</ul>
</div>
<div class="language-java">
<p><strong>Metodi e parametri</strong></p>
<ul>
<li><strong>IndexParam</strong>
Prepara un oggetto IndexParam.
<ul>
<li><strong>fieldName</strong> (<em>String</em>)
Il nome del campo scalare da indicizzare.</li>
<li><strong>indexName</strong> (<em>String</em>)
Il nome dell'indice scalare da creare. Ogni campo scalare supporta un solo indice.</li>
<li><strong>indexType</strong> (<em>String</em>)
Il tipo di indice scalare da creare. Per l’indicizzazione implicita, lasciare vuoto o omettere questo parametro.
Per l’indicizzazione personalizzata, i valori validi sono:
<ul>
<li><strong>INVERTED</strong>: (Consigliato) Un indice invertito è costituito da un dizionario di termini contenente tutte le parole tokenizzate ordinate in ordine alfabetico. Per ulteriori dettagli, consultare <a href="/docs/it/scalar_index.md">Indice scalare</a>.</li>
<li><strong>BITMAP</strong>: un tipo di indice che memorizza una bitmap di tutti i valori univoci presenti in un campo. Per ulteriori dettagli, consultare <a href="/docs/it/bitmap.md">BITMAP</a>.</li>
<li><strong>STL_SORT</strong>: ordina i campi scalari utilizzando l’algoritmo di ordinamento della libreria di modelli standard (STL). Supporta campi numerici, VARCHAR e TIMESTAMPTZ. Per ulteriori dettagli, consultare <a href="/docs/it/stl-sort.md">STL_SORT</a>.</li>
<li><strong>TRIE</strong>: Una struttura dati ad albero per ricerche e recuperi rapidi di prefissi. Supporta i campi VARCHAR. Per ulteriori dettagli, consultare <a href="/docs/it/trie.md">TRIE</a>.</li>
<li><strong>NGRAM</strong>: un indice che accelera i filtri LIKE e regex sui campi VARCHAR. Per ulteriori dettagli, consultare <a href="/docs/it/ngram.md">NGRAM</a>.</li>
<li><strong>FMINDEX</strong>: un indice esatto di sottostringhe a livello di byte per i campi VARCHAR. Per ulteriori dettagli, consultare <a href="/docs/it/fmindex.md">FMINDEX</a>.</li>
<li><strong>RTREE</strong>: un indice per i campi GEOMETRY. Per ulteriori dettagli, consultare <a href="/docs/it/rtree.md">RTREE</a>.</li>
</ul></li>
</ul></li>
<li><strong>CreateIndexReq</strong>
Crea l’indice nella raccolta specificata.
<ul>
<li><strong>collectionName</strong> (<em>Stringa</em>)
Il nome della raccolta per la quale viene creato l’indice.</li>
<li><strong>indexParams</strong> (<em>Elenco<IndexParam></em>)
Un elenco di oggetti IndexParam contenenti le configurazioni dell’indice.</li>
</ul></li>
</ul>
</div>
<div class="language-javascript">
<p><strong>Metodi e parametri</strong></p>
<ul>
<li><p><strong>createIndex</strong></p>
<p>Crea l'indice nella collezione specificata.</p>
<ul>
<li><strong>collection_name</strong> (<em>stringa</em>)
Il nome della collezione per la quale viene creato l'indice.</li>
<li><strong>field_name</strong> (<em>stringa</em>)
Il nome del campo scalare da indicizzare.</li>
<li><strong>index_name</strong> (<em>stringa</em>)
Il nome dell'indice scalare da creare. Ogni campo scalare supporta un solo indice.</li>
<li><strong>index_type</strong> (<em>stringa</em>)
Il tipo dell'indice scalare da creare. Per l'indicizzazione implicita, lasciare vuoto o omettere questo parametro.
Per l'indicizzazione personalizzata, i valori validi sono:
<ul>
<li><strong>INVERTED</strong>: (Consigliato) Un indice invertito è costituito da un dizionario di termini contenente tutte le parole tokenizzate ordinate alfabeticamente. Per ulteriori dettagli, consultare <a href="/docs/it/scalar_index.md">Indice scalare</a>.</li>
<li><strong>BITMAP</strong>: un tipo di indice che memorizza una bitmap di tutti i valori univoci presenti in un campo. Per ulteriori dettagli, consultare <a href="/docs/it/bitmap.md">BITMAP</a>.</li>
<li><strong>STL_SORT</strong>: ordina i campi scalari utilizzando l’algoritmo di ordinamento della libreria di modelli standard (STL). Supporta campi numerici, VARCHAR e TIMESTAMPTZ. Per ulteriori dettagli, consultare <a href="/docs/it/stl-sort.md">STL_SORT</a>.</li>
<li><strong>TRIE</strong>: Una struttura dati ad albero per ricerche e recuperi rapidi di prefissi. Supporta i campi VARCHAR. Per ulteriori dettagli, consultare <a href="/docs/it/trie.md">TRIE</a>.</li>
<li><strong>NGRAM</strong>: un indice che accelera i filtri LIKE e regex sui campi VARCHAR. Per ulteriori dettagli, consultare <a href="/docs/it/ngram.md">NGRAM</a>.</li>
<li><strong>FMINDEX</strong>: un indice esatto di sottostringhe a livello di byte per i campi VARCHAR. Per ulteriori dettagli, consultare <a href="/docs/it/fmindex.md">FMINDEX</a>.</li>
<li><strong>RTREE</strong>: un indice per i campi GEOMETRY. Per ulteriori dettagli, consultare <a href="/docs/it/rtree.md">RTREE</a>.</li>
</ul></li>
</ul></li>
</ul>
</div>
<h2 id="Verifying-the-result" class="common-anchor-header">Verifica del risultato<button data-href="#Verifying-the-result" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>Utilizzare il <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/list_indexes.md"><code translate="no">list_indexes()</code></a> metodo per verificare la creazione degli indici scalari:</p>
</div>
<div class="language-java">
<p>Utilizzare il metodo ` <code translate="no">listIndexes()</code> ` per verificare la creazione degli indici scalari:</p>
</div>
<div class="language-javascript">
<p>Utilizzare il metodo ` <code translate="no">listIndexes()</code> ` per verificare la creazione degli indici scalari:</p>
</div>
<div class="multipleCode">
   <a href="#python">Python 
 </a> <a href="#java">   Java</a>
 <a href="#javascript">   Node.js</a>
</div>
<pre><code translate="no" class="language-python">client.list_indexes(
    collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>  <span class="hljs-comment"># Specify the collection name</span>
)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [&#x27;default_index&#x27;,&#x27;inverted_index&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.ListIndexesReq;

<span class="hljs-type">ListIndexesReq</span> <span class="hljs-variable">listIndexesReq</span> <span class="hljs-operator">=</span> ListIndexesReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>)  <span class="hljs-comment">// Specify the collection name</span>
    .build();

List&lt;String&gt; indexNames = client.listIndexes(listIndexesReq);

System.out.println(indexNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;default_index&quot;,</span>
<span class="hljs-comment">//     &quot;inverted_index&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listIndexes</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;test_scalar_index&#x27;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">indexes</span>)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;default_index&quot;,</span>
<span class="hljs-comment">//     &quot;inverted_index&quot;</span>
<span class="hljs-comment">// ]   </span>
<button class="copy-code-btn"></button></code></pre>
