---
id: index-scalar-fields.md
order: 2
summary: このガイドでは、整数や文字列などのフィールドに対するスカラー・インデックスの作成と設定について説明します。
title: スカラーフィールドのインデックス
---
<h1 id="Index-Scalar-Fields" class="common-anchor-header">スカラーフィールドのインデックス<button data-href="#Index-Scalar-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusでは、スカラーインデックスは、従来のデータベースインデックスと同様に、特定の非ベクトルフィールド値によるメタフィルタリングを高速化するために使用されます。このガイドでは、整数や文字列などのフィールドに対するスカラーインデックスの作成と設定について説明します。</p>
<h2 id="Types-of-scalar-indexing" class="common-anchor-header">スカラーインデックスの種類<button data-href="#Types-of-scalar-indexing" class="anchor-icon" translate="no">
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
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Auto-indexing">オートインデックス</a></strong>：Milvusはスカラーフィールドのデータ型に基づいてインデックスタイプを自動的に決定します。特定のインデックスタイプを制御する必要がない場合に適しています。</p></li>
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Custom-indexing">カスタムインデックス</a></strong>：転置インデックスなど、正確なインデックスタイプを指定します。これは、インデックス・タイプの選択をより制御しやすくします。</p></li>
</ul>
<h2 id="Auto-indexing" class="common-anchor-header">オートインデックス<button data-href="#Auto-indexing" class="anchor-icon" translate="no">
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
<p>オートインデックスを使用するには、<strong>index_type</strong>パラメータを <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>でindex_typeパラメータを省略し、milvusがスカラーフィールドの型に基づいてインデックス型を推測できるようにします。</p>
</div>
<div class="language-java">
<p>で<strong>indexType</strong>パラメータを省略します。 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>の indexType パラメータを省略し、 Milvus がスカラーフィールドの型に基づいてインデックスタイプを推測できるようにします。</p>
</div>
<div class="language-javascript">
<p>で<strong>index_type</strong>パラメータを省略する。 <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>の index_type パラメータを省略すると、Milvus はスカラーフィールドの型に基づいてインデックスタイプを推測することができます。</p>
</div>
<p>スカラーデータ型とデフォルトのインデックス作成アルゴリズムのマッピングについては、<a href="https://milvus.io/docs/scalar_index.md#Scalar-field-indexing-algorithms">スカラーフィールドのインデックス作成</a>アルゴリズムを参照してください。</p>
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
<h2 id="Custom-indexing" class="common-anchor-header">カスタム・インデックス<button data-href="#Custom-indexing" class="anchor-icon" translate="no">
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
<p>カスタム・インデックスを使用するには、インデックス<strong>・</strong>タイプの指定に <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>.</p>
</div>
<div class="language-java">
<p>カスタム・インデックスを使用するには、.NET の<strong>indexType</strong>パラメータで特定のインデックス・タイプを指定します。 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>.</p>
</div>
<div class="language-javascript">
<p>カスタム・インデックスを使用するには、 . <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>.</p>
</div>
<p>以下の例では、スカラー・フィールド<code translate="no">scalar_2</code> に対して転置インデックスを作成しています。</p>
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
<p><strong>メソッドとパラメータ</strong></p>
<ul>
<li><p><strong>prepare_index_params()</strong></p>
<p><strong>IndexParams</strong>オブジェクトを準備します。</p></li>
<li><p><strong>add_index()</strong></p>
<p><strong>IndexParams</strong>オブジェクトにインデックス設定を追加します。</p>
<ul>
<li><p><strong>field_name</strong><em>(string</em>)</p>
<p>インデックスを作成するスカラー・フィールドの名前。</p></li>
<li><p><strong>index_type</strong><em>(文字列</em>)：</p>
<p>作成するスカラー・インデックスの型。暗黙的インデックス作成の場合は、このパラメータを空にするか省略します。</p>
<p>カスタム・インデックスの場合、有効な値は以下のとおりです：</p>
<ul>
<li><p><strong>INVERTED</strong>: (推奨) 転置インデックスは、すべてのトークン化された単語をアルファベット順に並べた用語辞書で構成されます。詳細については、「<a href="/docs/ja/v2.4.x/scalar_index.md">スカラー・インデックス</a>」を参照してください。</p></li>
<li><p><strong>STL_SORT</strong>：標準テンプレート・ライブラリのソート・アルゴリズムを使用して、スカラー・フィールドをソートします。数値フィールド（INT8、INT16、INT32、INT64、FLOAT、DOUBLEなど）のみをサポート。</p></li>
<li><p><strong>トライ</strong>：高速なプレフィックス検索と取得のためのツリーデータ構造。VARCHAR フィールドをサポート。</p></li>
</ul></li>
<li><p><strong>index_name</strong><em>(string</em>)</p>
<p>作成するスカラインデックスの名前。各スカラフィールドは 1 つのインデックスをサポートします。</p></li>
</ul></li>
<li><p><strong>create_index()</strong></p>
<p>指定したコレクションにインデックスを作成します。</p>
<ul>
<li><p><strong>collection_name</strong><em>(string</em>)</p>
<p>インデックスを作成するコレクションの名前。</p></li>
<li><p><strong>index_params</strong></p>
<p>インデックス設定を含む<strong>IndexParams</strong>オブジェクト。</p></li>
</ul></li>
</ul>
</div>
<div class="language-java">
<p><strong>メソッドとパラメータ</strong></p>
<ul>
<li><strong>IndexParam</strong>IndexParam オブジェクトを準備します。<ul>
<li><strong>fieldName</strong><em>(String</em>) インデックスを作成するスカラー・フィールドの名前。</li>
<li><strong>indexName</strong><em>(String</em>) 作成するスカラー・インデックスの名前。各スカラー・フィールドは1つのインデックスをサポートする。</li>
<li><strong>indexType</strong><em>(String</em>) 作成するスカラーインデックスのタイプ。暗黙的インデックス作成の場合は、このパラメータを空にするか省略します。 カスタム・インデックス作成の場合は、以下の値が有効です：<ul>
<li><strong>INVERTED</strong>: (推奨) 転置インデックスは、すべてのトークン化された単語をアルファベット順に並べた用語辞書で構成されます。詳細については、「<a href="/docs/ja/v2.4.x/scalar_index.md">スカラー・インデックス</a>」を参照してください。</li>
<li><strong>STL_SORT</strong>：標準テンプレート・ライブラリのソート・アルゴリズムを使用して、スカラー・フィールドをソートします。ブール値と数値フィールド（INT8、INT16、INT32、INT64、FLOAT、DOUBLEなど）をサポート。</li>
<li><strong>トライ</strong>：高速なプレフィックス検索と取得のためのツリーデータ構造。VARCHAR フィールドをサポート。</li>
</ul></li>
</ul></li>
<li><strong>CreateIndexReq</strong>指定したコレクションにインデックスを作成します。<ul>
<li><strong>collectionName</strong><em>(String</em>) インデックスを作成するコレクションの名前。</li>
<li><strong>indexParams</strong><em>(List<IndexParam></em>) インデッ クス構成を含む IndexParam オブジ ェ ク ト の リ ス ト 。</li>
</ul></li>
</ul>
</div>
<div class="language-javascript">
<p><strong>メソッドとパラメータ</strong></p>
<ul>
<li><p><strong>createIndex</strong></p>
<p>指定 し た コ レ ク シ ョ ンの イ ンデ ッ ク ス を作成 し ます。</p>
<ul>
<li><strong>collection_name</strong><em>（文字列</em>） イ ンデ ッ ク ス を作成す る コ レ ク シ ョ ンの名前。</li>
<li><strong>field_name</strong><em>(string</em>) インデックスを作成するスカラー・フィールドの名前。</li>
<li><strong>index_name</strong><em>(string</em>) 作成するスカラー・インデックスの名前。各スカラー・フィールドは1つのインデックスをサポートします。</li>
<li><strong>index_type</strong><em>(string</em>) 作成するスカラー・インデックスのタイプ。暗黙的インデックスの場合は、このパラメータを空にするか省略します。 カスタムインデックスの場合は、以下の値が有効です：<ul>
<li><strong>INVERTED</strong>: (推奨) 転置インデックスは、すべてのトークン化された単語をアルファベット順に並べた用語辞書で構成されます。詳細については、「<a href="/docs/ja/v2.4.x/scalar_index.md">スカラー・インデックス</a>」を参照してください。</li>
<li><strong>STL_SORT</strong>：標準テンプレート・ライブラリのソート・アルゴリズムを使用して、スカラー・フィールドをソートします。ブール値と数値フィールド（INT8、INT16、INT32、INT64、FLOAT、DOUBLEなど）をサポート。</li>
<li><strong>トライ</strong>：高速なプレフィックス検索と取得のためのツリーデータ構造。VARCHAR フィールドをサポート。</li>
</ul></li>
</ul></li>
</ul>
</div>
<h2 id="Verifying-the-result" class="common-anchor-header">結果の検証<button data-href="#Verifying-the-result" class="anchor-icon" translate="no">
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
<p>結果を検証するには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/list_indexes.md"><code translate="no">list_indexes()</code></a>メソッドを使用して、スカラー・インデックスの作成を検証する：</p>
</div>
<div class="language-java">
<p><code translate="no">listIndexes()</code> メソッドを使用して、スカラー・インデックスの作成を検証する：</p>
</div>
<div class="language-javascript">
<p>スカラー・インデックスの作成を検証するには、<code translate="no">listIndexes()</code> メソッドを使用する：</p>
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
<h2 id="Limits" class="common-anchor-header">制限<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li>現在、スカラー・インデックスはINT8、INT16、INT32、INT64、FLOAT、DOUBLE、BOOL、VARCHAR、ARRAYデータ型をサポートしているが、JSONデータ型はサポートしていない。</li>
</ul>
