---
id: index-scalar-fields.md
order: 2
summary: >-
  Esta guía te explicará paso a paso cómo crear y configurar índices escalares
  para campos como números enteros, cadenas de caracteres, etc.
title: Índices de campos escalares
---
<h1 id="Index-Scalar-Fields" class="common-anchor-header">Índices de campos escalares<button data-href="#Index-Scalar-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>En Milvus, un índice escalar se utiliza para acelerar el metafiltrado según un valor específico de un campo no vectorial, de forma similar a un índice de base de datos tradicional. Esta guía te guiará a través del proceso de creación y configuración de índices escalares para campos como números enteros, cadenas de caracteres, etc.</p>
<div class="alert warning">
<p>Esta página ha quedado obsoleta. Para conocer la implementación más reciente, consulta <a href="/docs/es/bitmap.md">BITMAP</a>, <a href="/docs/es/inverted.md">INVERTED</a>, <a href="/docs/es/ngram.md">NGRAM</a>, <a href="/docs/es/rtree.md">RTREE</a>, <a href="/docs/es/stl-sort.md">STL_SORT</a>, <a href="/docs/es/trie.md">TRIE</a> y <a href="/docs/es/fmindex.md">FMINDEX</a>.</p>
</div>
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
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Auto-indexing">Indexación automática</a></strong>: Milvus decide automáticamente el tipo de índice en función del tipo de datos del campo escalar. Esto resulta adecuado cuando no es necesario controlar el tipo de índice específico.</p></li>
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Custom-indexing">Indexación personalizada</a></strong>: se especifica el tipo de índice exacto, como un índice invertido o <a href="/docs/es/bitmap.md">un índice de mapa de bits</a>. Esto proporciona un mayor control sobre la selección del tipo de índice.</p></li>
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
<p>Para utilizar la indexación automática, omita el parámetro <strong>index_type</strong> en <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>, de modo que Milvus pueda deducir el tipo de índice en función del tipo de campo escalar.</p>
</div>
<div class="language-java">
<p>Para utilizar la indexación automática, omita el parámetro <strong>indexType</strong> en <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>, de modo que Milvus pueda deducir el tipo de índice en función del tipo de campo escalar.</p>
</div>
<div class="language-javascript">
<p>Para utilizar la indexación automática, omita el parámetro <strong>index_type</strong> en <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>, de modo que Milvus pueda deducir el tipo de índice en función del tipo de campo escalar.</p>
</div>
<p>Para conocer las correspondencias entre los tipos de datos escalares y los algoritmos de indexación predeterminados, consulte <a href="/docs/es/scalar_index.md#Choosing-a-scalar-index">«Elección de un índice escalar</a>».</p>
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
<p>Para utilizar la indexación personalizada, especifica un tipo de índice concreto mediante el parámetro <strong>index_type</strong> en <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>.</p>
</div>
<div class="language-java">
<p>Para utilizar la indexación personalizada, especifique un tipo de índice concreto mediante el parámetro <strong>indexType</strong> en <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>.</p>
</div>
<div class="language-javascript">
<p>Para utilizar la indexación personalizada, especifique un tipo de índice concreto mediante el parámetro <strong>index_type</strong> en <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>.</p>
</div>
<p>El ejemplo siguiente crea un índice invertido para el campo escalar <code translate="no">scalar_2</code>.</p>
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
<p><strong>Métodos y parámetros</strong></p>
<ul>
<li><p><strong>prepare_index_params()</strong></p>
<p>Prepara un objeto ` <strong>IndexParams</strong> `.</p></li>
<li><p><strong>add_index()</strong></p>
<p>Añade configuraciones de índice al objeto <strong>IndexParams</strong>.</p>
<ul>
<li><p><strong>field_name</strong> (<em>cadena</em>)</p>
<p>El nombre del campo escalar que se va a indexar.</p></li>
<li><p><strong>index_type</strong> (<em>cadena</em>):</p>
<p>El tipo de índice escalar que se va a crear. Para la indexación implícita, déjalo en blanco u omite este parámetro.</p>
<p>Para la indexación personalizada, los valores válidos son:</p>
<ul>
<li><p><strong>INVERTED</strong>: (Recomendado) Un índice invertido consiste en un diccionario de términos que contiene todas las palabras tokenizadas ordenadas alfabéticamente. Para más detalles, consulta <a href="/docs/es/scalar_index.md">Índice escalar</a>.</p></li>
<li><p><strong>BITMAP</strong>: un tipo de índice que almacena un mapa de bits de todos los valores únicos de un campo. Para más detalles, consulta <a href="/docs/es/bitmap.md">«BITMAP</a>».</p></li>
<li><p><strong>STL_SORT</strong>: Ordena los campos escalares utilizando el algoritmo de ordenación de la biblioteca de plantillas estándar. Admite campos numéricos, VARCHAR y TIMESTAMPTZ. Para más detalles, consulta <a href="/docs/es/stl-sort.md">STL_SORT</a>.</p></li>
<li><p><strong>TRIE</strong>: Una estructura de datos en forma de árbol para búsquedas y recuperaciones rápidas por prefijo. Admite campos VARCHAR. Para más detalles, consulta <a href="/docs/es/trie.md">TRIE</a>.</p></li>
<li><p><strong>NGRAM</strong>: Un índice que acelera los filtros LIKE y de expresiones regulares en campos VARCHAR. Para más detalles, consulta <a href="/docs/es/ngram.md">NGRAM</a>.</p></li>
<li><p><strong>FMINDEX</strong>: Un índice exacto de subcadenas a nivel de byte para campos VARCHAR. Para más detalles, consulta <a href="/docs/es/fmindex.md">FMINDEX</a>.</p></li>
<li><p><strong>RTREE</strong>: un índice para campos GEOMETRY. Para obtener más información, consulta <a href="/docs/es/rtree.md">RTREE</a>.</p></li>
</ul></li>
<li><p><strong>index_name</strong> (<em>cadena</em>)</p>
<p>El nombre del índice escalar que se va a crear. Cada campo escalar admite un índice.</p></li>
</ul></li>
<li><p><strong>create_index()</strong></p>
<p>Crea el índice en la colección especificada.</p>
<ul>
<li><p><strong>nombre_de_colección</strong> (<em>cadena</em>)</p>
<p>El nombre de la colección para la que se crea el índice.</p></li>
<li><p><strong>index_params</strong></p>
<p>El objeto <strong>IndexParams</strong> que contiene la configuración del índice.</p></li>
</ul></li>
</ul>
</div>
<div class="language-java">
<p><strong>Métodos y parámetros</strong></p>
<ul>
<li><strong>IndexParam</strong>
Prepara un objeto IndexParam.
<ul>
<li><strong>fieldName</strong> (<em>cadena</em>)
El nombre del campo escalar que se va a indexar.</li>
<li><strong>indexName</strong> (<em>cadena</em>)
El nombre del índice escalar que se va a crear. Cada campo escalar admite un índice.</li>
<li><strong>indexType</strong> (<em>cadena</em>)
El tipo de índice escalar que se va a crear. Para la indexación implícita, déjalo en blanco u omite este parámetro.
Para la indexación personalizada, los valores válidos son:
<ul>
<li><strong>INVERTED</strong>: (Recomendado) Un índice invertido consiste en un diccionario de términos que contiene todas las palabras tokenizadas ordenadas alfabéticamente. Para más detalles, consulta <a href="/docs/es/scalar_index.md">Índice escalar</a>.</li>
<li><strong>BITMAP</strong>: Un tipo de índice que almacena un mapa de bits de todos los valores únicos de un campo. Para más detalles, consulta <a href="/docs/es/bitmap.md">«BITMAP</a>».</li>
<li><strong>STL_SORT</strong>: Ordena los campos escalares utilizando el algoritmo de ordenación de la biblioteca de plantillas estándar. Admite campos numéricos, VARCHAR y TIMESTAMPTZ. Para más detalles, consulta <a href="/docs/es/stl-sort.md">STL_SORT</a>.</li>
<li><strong>TRIE</strong>: Una estructura de datos en forma de árbol para búsquedas y recuperaciones rápidas por prefijo. Admite campos VARCHAR. Para más detalles, consulta <a href="/docs/es/trie.md">TRIE</a>.</li>
<li><strong>NGRAM</strong>: Un índice que acelera los filtros LIKE y de expresiones regulares en campos VARCHAR. Para más detalles, consulte <a href="/docs/es/ngram.md">NGRAM</a>.</li>
<li><strong>FMINDEX</strong>: Un índice exacto de subcadenas a nivel de byte para campos VARCHAR. Para más detalles, consulta <a href="/docs/es/fmindex.md">FMINDEX</a>.</li>
<li><strong>RTREE</strong>: un índice para campos GEOMETRY. Para obtener más información, consulte <a href="/docs/es/rtree.md">RTREE</a>.</li>
</ul></li>
</ul></li>
<li><strong>CreateIndexReq</strong>
Crea el índice en la colección especificada.
<ul>
<li><strong>collectionName</strong> (<em>cadena</em>)
El nombre de la colección para la que se crea el índice.</li>
<li><strong>indexParams</strong> (<em>Lista<IndexParam></em>)
Una lista de objetos IndexParam que contienen configuraciones de índice.</li>
</ul></li>
</ul>
</div>
<div class="language-javascript">
<p><strong>Métodos y parámetros</strong></p>
<ul>
<li><p><strong>createIndex</strong></p>
<p>Crea el índice en la colección especificada.</p>
<ul>
<li><strong>collection_name</strong> (<em>cadena</em>)
El nombre de la colección para la que se crea el índice.</li>
<li><strong>field_name</strong> (<em>cadena</em>)
El nombre del campo escalar que se va a indexar.</li>
<li><strong>nombre_índice</strong> (<em>cadena</em>)
El nombre del índice escalar que se va a crear. Cada campo escalar admite un índice.</li>
<li><strong>tipo_de_índice</strong> (<em>cadena</em>)
El tipo de índice escalar que se va a crear. Para la indexación implícita, déjalo en blanco u omite este parámetro.
Para la indexación personalizada, los valores válidos son:
<ul>
<li><strong>INVERTED</strong>: (Recomendado) Un índice invertido consiste en un diccionario de términos que contiene todas las palabras tokenizadas ordenadas alfabéticamente. Para más detalles, consulta <a href="/docs/es/scalar_index.md">Índice escalar</a>.</li>
<li><strong>BITMAP</strong>: Un tipo de índice que almacena un mapa de bits de todos los valores únicos de un campo. Para más detalles, consulta <a href="/docs/es/bitmap.md">«BITMAP</a>».</li>
<li><strong>STL_SORT</strong>: Ordena los campos escalares utilizando el algoritmo de ordenación de la biblioteca de plantillas estándar. Admite campos numéricos, VARCHAR y TIMESTAMPTZ. Para más detalles, consulta <a href="/docs/es/stl-sort.md">STL_SORT</a>.</li>
<li><strong>TRIE</strong>: Una estructura de datos en forma de árbol para búsquedas y recuperaciones rápidas por prefijo. Admite campos VARCHAR. Para más detalles, consulta <a href="/docs/es/trie.md">TRIE</a>.</li>
<li><strong>NGRAM</strong>: Un índice que acelera los filtros LIKE y de expresiones regulares en campos VARCHAR. Para más detalles, consulte <a href="/docs/es/ngram.md">NGRAM</a>.</li>
<li><strong>FMINDEX</strong>: Un índice exacto de subcadenas a nivel de byte para campos VARCHAR. Para más detalles, consulta <a href="/docs/es/fmindex.md">FMINDEX</a>.</li>
<li><strong>RTREE</strong>: un índice para campos GEOMETRY. Para obtener más información, consulta <a href="/docs/es/rtree.md">RTREE</a>.</li>
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
<p>Utilice el <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/list_indexes.md"><code translate="no">list_indexes()</code></a> método para verificar la creación de índices escalares:</p>
</div>
<div class="language-java">
<p>Utilice el método ` <code translate="no">listIndexes()</code> ` para verificar la creación de índices escalares:</p>
</div>
<div class="language-javascript">
<p>Utilice el método ` <code translate="no">listIndexes()</code> ` para comprobar la creación de índices escalares:</p>
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
