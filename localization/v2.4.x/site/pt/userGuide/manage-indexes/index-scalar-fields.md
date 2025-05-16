---
id: index-scalar-fields.md
order: 2
summary: >-
  Este guia irá orientá-lo na criação e configuração de índices escalares para
  campos como inteiros, cadeias de caracteres, etc.
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
    </button></h1><p>No Milvus, um índice escalar é usado para acelerar a metafiltragem por um valor de campo específico não-vetorial, semelhante a um índice de base de dados tradicional. Este guia irá guiá-lo na criação e configuração de índices escalares para campos como inteiros, strings, etc.</p>
<h2 id="Types-of-scalar-indexing" class="common-anchor-header">Tipos de indexação escalar<button data-href="#Types-of-scalar-indexing" class="anchor-icon" translate="no">
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
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Auto-indexing">Indexação automática</a></strong>: O Milvus decide automaticamente o tipo de índice com base no tipo de dados do campo escalar. Esta opção é adequada quando não é necessário controlar o tipo de índice específico.</p></li>
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Custom-indexing">Indexação personalizada</a></strong>: O utilizador especifica o tipo de índice exato, como um índice invertido. Isto proporciona um maior controlo sobre a seleção do tipo de índice.</p></li>
</ul>
<h2 id="Auto-indexing" class="common-anchor-header">Indexação automática<button data-href="#Auto-indexing" class="anchor-icon" translate="no">
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
<p>Para utilizar a indexação automática, omita o parâmetro <strong>index_type</strong> em <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>para que o Milvus possa inferir o tipo de índice com base no tipo de campo escalar.</p>
</div>
<div class="language-java">
<p>Para utilizar a indexação automática, omita o parâmetro <strong>indexType</strong> em <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>para que o Milvus possa inferir o tipo de índice com base no tipo de campo escalar.</p>
</div>
<div class="language-javascript">
<p>Para utilizar a indexação automática, omita o parâmetro <strong>index_type</strong> em <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>para que o Milvus possa inferir o tipo de índice com base no tipo de campo escalar.</p>
</div>
<p>Para mapeamentos entre tipos de dados escalares e algoritmos de indexação padrão, consulte <a href="https://milvus.io/docs/scalar_index.md#Scalar-field-indexing-algorithms">Algoritmos de indexação de campo escalar</a>.</p>
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
<h2 id="Custom-indexing" class="common-anchor-header">Indexação personalizada<button data-href="#Custom-indexing" class="anchor-icon" translate="no">
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
<p>Para usar a indexação personalizada, especifique um tipo de índice específico usando o parâmetro <strong>index_type</strong> em <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>.</p>
</div>
<div class="language-java">
<p>Para usar a indexação personalizada, especifique um tipo de índice específico usando o parâmetro <strong>indexType</strong> em <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>.</p>
</div>
<div class="language-javascript">
<p>Para utilizar a indexação personalizada, especifique um tipo de índice específico utilizando o parâmetro <strong>index_type</strong> em <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>.</p>
</div>
<p>O exemplo abaixo cria um índice invertido para o campo escalar <code translate="no">scalar_2</code>.</p>
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
<p><strong>Métodos e parâmetros</strong></p>
<ul>
<li><p><strong>prepare_index_params()</strong></p>
<p>Prepara um objeto <strong>IndexParams</strong>.</p></li>
<li><p><strong>add_index()</strong></p>
<p>Adiciona configurações de índice ao objeto <strong>IndexParams</strong>.</p>
<ul>
<li><p><strong>nome_do_campo</strong><em>(string</em>)</p>
<p>O nome do campo escalar a indexar.</p></li>
<li><p><strong>index_type</strong><em>(string</em>):</p>
<p>O tipo do índice escalar a ser criado. Para indexação implícita, deixe-o vazio ou omita este parâmetro.</p>
<p>Para indexação personalizada, os valores válidos são:</p>
<ul>
<li><p><strong>INVERTED</strong>: (Recomendado) Um índice invertido consiste num dicionário de termos que contém todas as palavras tokenizadas ordenadas alfabeticamente. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/scalar_index.md">Índice escalar</a>.</p></li>
<li><p><strong>STL_SORT</strong>: Classifica campos escalares usando o algoritmo de classificação da biblioteca de modelos padrão. Suporta apenas campos numéricos (por exemplo, INT8, INT16, INT32, INT64, FLOAT, DOUBLE).</p></li>
<li><p><strong>Trie</strong>: Uma estrutura de dados em árvore para pesquisas e recuperações rápidas de prefixos. Suporta campos VARCHAR.</p></li>
</ul></li>
<li><p><strong>nome_do_índice</strong><em>(string</em>)</p>
<p>O nome do índice escalar a ser criado. Cada campo escalar suporta um índice.</p></li>
</ul></li>
<li><p><strong>create_index()</strong></p>
<p>Cria o índice na coleção especificada.</p>
<ul>
<li><p><strong>nome_da_colecção</strong><em>(string</em>)</p>
<p>O nome da coleção para a qual o índice é criado.</p></li>
<li><p><strong>index_params</strong></p>
<p>O objeto <strong>IndexParams</strong> que contém as configurações do índice.</p></li>
</ul></li>
</ul>
</div>
<div class="language-java">
<p><strong>Métodos e parâmetros</strong></p>
<ul>
<li><strong>IndexParam</strong>Prepara um objeto IndexParam.<ul>
<li><strong>fieldName</strong><em>(String</em>) O nome do campo escalar a indexar.</li>
<li><strong>indexName</strong><em>(String</em>) O nome do índice escalar a criar. Cada campo escalar suporta um índice.</li>
<li><strong>indexType</strong><em>(String</em>) O tipo do índice escalar a criar. Para indexação implícita, deixe-o vazio ou omita este parâmetro. Para indexação personalizada, os valores válidos são:<ul>
<li><strong>INVERTED</strong>: (Recomendado) Um índice invertido consiste num dicionário de termos que contém todas as palavras tokenizadas ordenadas alfabeticamente. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/scalar_index.md">Índice escalar</a>.</li>
<li><strong>STL_SORT</strong>: Classifica campos escalares usando o algoritmo de classificação da biblioteca de modelos padrão. Suporta campos booleanos e numéricos (por exemplo, INT8, INT16, INT32, INT64, FLOAT, DOUBLE).</li>
<li><strong>Trie</strong>: Uma estrutura de dados em árvore para pesquisas e recuperações rápidas de prefixos. Suporta campos VARCHAR.</li>
</ul></li>
</ul></li>
<li><strong>CreateIndexReq</strong>Cria o índice na coleção especificada.<ul>
<li><strong>collectionName</strong><em>(String</em>) O nome da coleção para a qual o índice é criado.</li>
<li><strong>indexParams</strong><em>(List<IndexParam></em>) Uma lista de objectos IndexParam que contêm configurações de índice.</li>
</ul></li>
</ul>
</div>
<div class="language-javascript">
<p><strong>Métodos e parâmetros</strong></p>
<ul>
<li><p><strong>createIndex</strong></p>
<p>Cria o índice na coleção especificada.</p>
<ul>
<li><strong>nome_da_colecção</strong><em>(string</em>) O nome da coleção para a qual o índice é criado.</li>
<li><strong>field_name</strong><em>(string</em>) O nome do campo escalar a indexar.</li>
<li><strong>index_name</strong><em>(string</em>) O nome do índice escalar a criar. Cada campo escalar suporta um índice.</li>
<li><strong>index_type</strong><em>(string</em>) O tipo do índice escalar a criar. Para indexação implícita, deixe-o vazio ou omita este parâmetro. Para indexação personalizada, os valores válidos são:<ul>
<li><strong>INVERTED</strong>: (Recomendado) Um índice invertido consiste num dicionário de termos que contém todas as palavras tokenizadas ordenadas alfabeticamente. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/scalar_index.md">Índice escalar</a>.</li>
<li><strong>STL_SORT</strong>: Classifica campos escalares usando o algoritmo de classificação da biblioteca de modelos padrão. Suporta campos booleanos e numéricos (por exemplo, INT8, INT16, INT32, INT64, FLOAT, DOUBLE).</li>
<li><strong>Trie</strong>: Uma estrutura de dados em árvore para pesquisas e recuperações rápidas de prefixos. Suporta campos VARCHAR.</li>
</ul></li>
</ul></li>
</ul>
</div>
<h2 id="Verifying-the-result" class="common-anchor-header">Verificação do resultado<button data-href="#Verifying-the-result" class="anchor-icon" translate="no">
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
<p>Utilize o método <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/list_indexes.md"><code translate="no">list_indexes()</code></a> para verificar a criação de índices escalares:</p>
</div>
<div class="language-java">
<p>Utilizar o método <code translate="no">listIndexes()</code> para verificar a criação de índices escalares:</p>
</div>
<div class="language-javascript">
<p>Utilize o método <code translate="no">listIndexes()</code> para verificar a criação de índices escalares:</p>
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
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li>Atualmente, a indexação escalar suporta os tipos de dados INT8, INT16, INT32, INT64, FLOAT, DOUBLE, BOOL, VARCHAR e ARRAY, mas não o tipo de dados JSON.</li>
</ul>
