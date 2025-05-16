---
id: index-scalar-fields.md
order: 2
summary: >-
  Esta guía le guiará a través de la creación y configuración de índices
  escalares para campos como enteros, cadenas, etc.
title: Índice de campos escalares
---
<h1 id="Index-Scalar-Fields" class="common-anchor-header">Índice de campos escalares<button data-href="#Index-Scalar-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>En Milvus, un índice escalar se utiliza para acelerar el metafiltrado por un valor de campo no vectorial específico, de forma similar a un índice de base de datos tradicional. Esta guía le guiará a través de la creación y configuración de índices escalares para campos como enteros, cadenas, etc.</p>
<h2 id="Types-of-scalar-indexing" class="common-anchor-header">Tipos de indexación escalar<button data-href="#Types-of-scalar-indexing" class="anchor-icon" translate="no">
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
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Auto-indexing">Indexación automática</a></strong>: Milvus decide automáticamente el tipo de índice basándose en el tipo de datos del campo escalar. Esto es adecuado cuando no necesita controlar el tipo de índice específico.</p></li>
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Custom-indexing">Indexación personalizada</a></strong>: Usted especifica el tipo de índice exacto, como un índice invertido. Esto proporciona un mayor control sobre la selección del tipo de índice.</p></li>
</ul>
<h2 id="Auto-indexing" class="common-anchor-header">Indexación automática<button data-href="#Auto-indexing" class="anchor-icon" translate="no">
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
<p>Para utilizar la indexación automática, omita el parámetro <strong>tipo_índice</strong> en <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>para que Milvus pueda deducir el tipo de índice basándose en el tipo de campo escalar.</p>
</div>
<div class="language-java">
<p>Para utilizar la indexación automática, omita el parámetro <strong>indexType</strong> en <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>para que Milvus pueda deducir el tipo de índice basándose en el tipo de campo escalar.</p>
</div>
<div class="language-javascript">
<p>Para utilizar la indexación automática, omita el parámetro <strong>index_type</strong> en <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>para que Milvus pueda deducir el tipo de índice basándose en el tipo de campo escalar.</p>
</div>
<p>Para mapeos entre tipos de datos escalares y algoritmos de indexación por defecto, consulte <a href="https://milvus.io/docs/scalar_index.md#Scalar-field-indexing-algorithms">Algoritmos de indexación de campos escalares</a>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
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
<h2 id="Custom-indexing" class="common-anchor-header">Indexación personalizada<button data-href="#Custom-indexing" class="anchor-icon" translate="no">
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
<p>Para utilizar la indexación personalizada, especifique un tipo de índice concreto utilizando el parámetro <strong>index_type</strong> en el archivo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>.</p>
</div>
<div class="language-java">
<p>Para utilizar la indexación personalizada, especifique un tipo de índice concreto utilizando el parámetro <strong>indexType</strong> en <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>.</p>
</div>
<div class="language-javascript">
<p>Para utilizar la indexación personalizada, especifique un tipo de índice concreto utilizando el parámetro <strong>index_type</strong> en <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>.</p>
</div>
<p>El siguiente ejemplo crea un índice invertido para el campo escalar <code translate="no">scalar_2</code>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
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
<p><strong>Métodos y parámetros</strong></p>
<ul>
<li><p><strong>preparar_parametros_de_índice()</strong></p>
<p>Prepara un objeto <strong>IndexParams</strong>.</p></li>
<li><p><strong>add_index()</strong></p>
<p>Añade configuraciones de índice al objeto <strong>IndexParams</strong>.</p>
<ul>
<li><p><strong>nombre_campo</strong><em>(cadena</em>)</p>
<p>El nombre del campo escalar a indexar.</p></li>
<li><p><strong>index_type</strong><em>(cadena</em>):</p>
<p>El tipo del índice escalar a crear. Para la indexación implícita, déjelo vacío u omita este parámetro.</p>
<p>Para la indexación personalizada, los valores válidos son:</p>
<ul>
<li><p><strong>INVERTED</strong>: (Recomendado) Un índice invertido consiste en un diccionario de términos que contiene todas las palabras tokenizadas ordenadas alfabéticamente. Para más detalles, consulte <a href="/docs/es/v2.4.x/scalar_index.md">Índice escalar</a>.</p></li>
<li><p><strong>STL_SORT</strong>: Ordena los campos escalares utilizando el algoritmo de ordenación estándar de la biblioteca de plantillas. Sólo admite campos numéricos (por ejemplo, INT8, INT16, INT32, INT64, FLOAT, DOUBLE).</p></li>
<li><p><strong>Trie</strong>: Una estructura de datos en árbol para búsquedas y recuperaciones rápidas de prefijos. Admite campos VARCHAR.</p></li>
</ul></li>
<li><p><strong>nombre_índice</strong><em>(cadena</em>)</p>
<p>Nombre del índice escalar que se va a crear. Cada campo escalar admite un índice.</p></li>
</ul></li>
<li><p><strong>crear_índice()</strong></p>
<p>Crea el índice en la colección especificada.</p>
<ul>
<li><p><strong>nombre_colección</strong><em>(cadena</em>)</p>
<p>Nombre de la colección para la que se crea el índice.</p></li>
<li><p><strong>parámetros_índice</strong></p>
<p>El objeto <strong>IndexParams</strong> que contiene las configuraciones del índice.</p></li>
</ul></li>
</ul>
</div>
<div class="language-java">
<p><strong>Métodos y parámetros</strong></p>
<ul>
<li><strong>IndexParam</strong>Prepara un objeto IndexParam.<ul>
<li><strong>fieldName</strong><em>(Cadena</em>) El nombre del campo escalar que se va a indexar.</li>
<li><strong>indexName</strong><em>(Cadena</em>) El nombre del índice escalar a crear. Cada campo escalar admite un índice.</li>
<li><strong>indexType</strong><em>(Cadena</em>) Tipo de índice escalar a crear. Para la indexación implícita, déjelo vacío u omita este parámetro. Para la indexación personalizada, los valores válidos son:<ul>
<li><strong>INVERTED</strong>: (Recomendado) Un índice invertido consiste en un diccionario de términos que contiene todas las palabras tokenizadas ordenadas alfabéticamente. Para más detalles, consulte <a href="/docs/es/v2.4.x/scalar_index.md">Índice escalar</a>.</li>
<li><strong>STL_SORT</strong>: Ordena los campos escalares utilizando el algoritmo de ordenación estándar de la biblioteca de plantillas. Admite campos booleanos y numéricos (por ejemplo, INT8, INT16, INT32, INT64, FLOAT, DOUBLE).</li>
<li><strong>Trie</strong>: Una estructura de datos en árbol para búsquedas y recuperaciones rápidas de prefijos. Admite campos VARCHAR.</li>
</ul></li>
</ul></li>
<li><strong>CreateIndexReq</strong>Crea el índice en la colección especificada.<ul>
<li><strong>collectionName</strong><em>(Cadena</em>) El nombre de la colección para la que se crea el índice.</li>
<li><strong>indexParams</strong><em>(Lista<IndexParam></em>) Una lista de objetos IndexParam que contienen configuraciones de índices.</li>
</ul></li>
</ul>
</div>
<div class="language-javascript">
<p><strong>Métodos y parámetros</strong></p>
<ul>
<li><p><strong>createIndex</strong></p>
<p>Crea el índice en la colección especificada.</p>
<ul>
<li><strong>nombre_colección</strong><em>(cadena</em>) El nombre de la colección para la que se crea el índice.</li>
<li><strong>nombre_campo</strong><em>(cadena</em>) El nombre del campo escalar que se va a indexar.</li>
<li><strong>nombre_índice</strong><em>(cadena</em>) Nombre del índice escalar que se va a crear. Cada campo escalar admite un índice.</li>
<li><strong>tipo_índice</strong><em>(cadena</em>) Tipo de índice escalar que se va a crear. Para la indexación implícita, déjelo vacío u omita este parámetro. Para la indexación personalizada, los valores válidos son:<ul>
<li><strong>INVERTED</strong>: (Recomendado) Un índice invertido consiste en un diccionario de términos que contiene todas las palabras tokenizadas ordenadas alfabéticamente. Para más detalles, consulte <a href="/docs/es/v2.4.x/scalar_index.md">Índice escalar</a>.</li>
<li><strong>STL_SORT</strong>: Ordena los campos escalares utilizando el algoritmo de ordenación estándar de la biblioteca de plantillas. Admite campos booleanos y numéricos (por ejemplo, INT8, INT16, INT32, INT64, FLOAT, DOUBLE).</li>
<li><strong>Trie</strong>: Una estructura de datos en árbol para búsquedas y recuperaciones rápidas de prefijos. Admite campos VARCHAR.</li>
</ul></li>
</ul></li>
</ul>
</div>
<h2 id="Verifying-the-result" class="common-anchor-header">Verificación del resultado<button data-href="#Verifying-the-result" class="anchor-icon" translate="no">
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
<p>Utilice el método <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/list_indexes.md"><code translate="no">list_indexes()</code></a> para verificar la creación de índices escalares:</p>
</div>
<div class="language-java">
<p>Utilice el método <code translate="no">listIndexes()</code> para verificar la creación de índices escalares:</p>
</div>
<div class="language-javascript">
<p>Utiliza el método <code translate="no">listIndexes()</code> para verificar la creación de índices escalares:</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
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
<h2 id="Limits" class="common-anchor-header">Límites<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li>Actualmente, la indexación escalar soporta los tipos de datos INT8, INT16, INT32, INT64, FLOAT, DOUBLE, BOOL, VARCHAR y ARRAY, pero no el tipo de datos JSON.</li>
</ul>
