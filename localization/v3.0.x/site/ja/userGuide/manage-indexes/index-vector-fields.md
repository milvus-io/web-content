---
id: index-vector-fields.md
order: 1
summary: このガイドでは、コレクション内のベクトルフィールドに対するインデックスの作成および管理に関する基本的な操作について解説します。
title: ベクトル場のインデックス
---
<h1 id="Index-Vector-Fields" class="common-anchor-header">ベクトル場のインデックス<button data-href="#Index-Vector-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、コレクション内のベクトル場に対するインデックスの作成および管理に関する基本的な操作について解説します。</p>
<div class="alert warning">
<p>このページは非推奨となりました。最新の実装については、<a href="/docs/ja/ivf-flat.md">IVF_FLAT</a>、<a href="/docs/ja/hnsw.md">HNSW</a> などを参照してください。</p>
</div>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは、インデックスファイルに格納されたメタデータを活用して、データを専用の構造で整理し、検索やクエリ実行時に必要な情報を迅速に取得できるようにします。</p>
<p>Milvus は、効率的な類似度検索のためにフィールド値をソートするための、いくつかのインデックスタイプとメトリクスを提供しています。以下の表は、さまざまなベクトルフィールドタイプでサポートされているインデックスタイプとメトリクスの一覧です。 現在、Milvus は、浮動小数点埋め込み（一般に浮動小数点ベクトルまたは密ベクトルと呼ばれる）、バイナリ埋め込み（バイナリベクトルとも呼ばれる）、および疎埋め込み（疎ベクトルとも呼ばれる）を含む、さまざまな種類のベクトルデータをサポートしています。詳細については、「<a href="/docs/ja/index.md">インメモリインデックスと</a> <a href="/docs/ja/metric.md">類似度メトリック</a>」を参照してください。</p>
<div class="filter">
 <a href="#floating">浮動小数点埋め込み</a>
 <a href="#binary"> バイナリ埋め込み</a>
 <a href="#sparse"> スパース埋め込み</a>
</div>
<div class="filter-floating table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">類似度指標の種類</th>
    <th class="tg-0pky">インデックス種別</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>ユークリッド距離 (L2)</li><li>内積 (IP)</li><li>コサイン類似度 (COSINE)</li></td>
    <td class="tg-0pky" rowspan="2"><ul><li>FLAT</li><li>IVF_FLAT</li><li>IVF_SQ8</li><li>IVF_PQ</li><li>GPU_IVF_FLAT</li><li>GPU_IVF_PQ</li><li>HNSW</li><li>DISKANN</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">メトリックタイプ</th>
    <th class="tg-0pky">インデックス・タイプ</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>ジャカード (JACCARD)</li><li>ハミング (HAMMING)</li></ul></td>
    <td class="tg-0pky"><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">メトリックの種類</th>
    <th class="tg-0pky">インデックスの種類</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">IP</td>
    <td class="tg-0pky">SPARSE_INVERTED_INDEX</td>
  </tr>
</tbody>
<tbody>
  <tr>
    <td class="tg-0pky">BM25</td>
    <td class="tg-0pky">SPARSE_INVERTED_INDEX</td>
  </tr>
</tbody>
</table>
<div class="alert note">
<p>Milvus 2.5.4 以降、<code translate="no">SPARSE_WAND</code> は非推奨となっています。代わりに、互換性を維持しつつ同等の機能を得るために、<code translate="no">&quot;inverted_index_algo&quot;: &quot;DAAT_WAND&quot;</code> を使用することを推奨します。詳細については、「<a href="/docs/ja/sparse_vector.md#Set-index-params-for-vector-field">Sparse Vector</a>」を参照してください。</p>
</div>
</div>
<p>頻繁にアクセスされるベクトルフィールドとスカラーフィールドの両方に対して、インデックスを作成することを推奨します。</p>
<h2 id="Preparations" class="common-anchor-header">準備<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>「<a href="/docs/ja/manage-collections.md">コレクションの管理</a>」で説明されているように、Milvus は、コレクション作成リクエストで以下の条件のいずれかが指定されている場合、コレクションの作成時に自動的にインデックスを生成し、メモリに読み込みます。</p>
<ul>
<li><p>ベクトルフィールドの次元数とメトリックタイプ、または</p></li>
<li><p>スキーマとインデックスパラメータ。</p></li>
</ul>
<p>以下のコードスニペットは、既存のコードを流用して、Milvus インスタンスへの接続を確立し、インデックスパラメータを指定せずにコレクションを作成するものです。この場合、コレクションにはインデックスがなく、メモリに読み込まれません。</p>
<div class="language-python">
<p>インデックス作成の準備として、 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> を使用してMilvusサーバーに接続し、 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a>、 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a>、および <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a>を使用してコレクションを設定します。</p>
</div>
<div class="language-java">
<p>インデックス作成の準備として、 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a> を使用してMilvusサーバーに接続し、 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md"><code translate="no">createSchema()</code></a>、 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md"><code translate="no">addField()</code></a>、および <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code translate="no">createCollection()</code></a>を使用してコレクションを設定します。</p>
</div>
<div class="language-javascript">
<p>インデックス作成の準備として、 <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> を使用してMilvusサーバーに接続し、 <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a>を使用してコレクションを設定します。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

<span class="hljs-comment"># 2. Create schema</span>
<span class="hljs-comment"># 2.1. Create schema</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># 2.2. Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

<span class="hljs-comment"># 3. Create collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup&quot;</span>, 
    schema=schema, 
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create a collection</span>

<span class="hljs-comment">// 2.1 Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

<span class="hljs-comment">// 2.2 Add fields to schema</span>
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;id&quot;</span>).dataType(DataType.Int64).isPrimaryKey(<span class="hljs-literal">true</span>).autoID(<span class="hljs-literal">false</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>).dataType(DataType.FloatVector).dimension(<span class="hljs-number">5</span>).build());

<span class="hljs-comment">// 3 Create a collection without schema and index parameters</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
.collectionName(<span class="hljs-string">&quot;customized_setup&quot;</span>)
.collectionSchema(schema)
.build();

client.createCollection(customizedSetupReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-comment">// 2. Define fields for the collection</span>
<span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>
    },
]

<span class="hljs-comment">// 3. Create a collection</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)  

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-a-Collection" class="common-anchor-header">コレクションのインデックス作成<button data-href="#Index-a-Collection" class="anchor-icon" translate="no">
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
<p>コレクションのインデックスを作成するか、コレクションをインデックス化するには、 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/prepare_index_params.md"><code translate="no">prepare_index_params()</code></a> を使用してインデックスパラメータを準備し、 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md"><code translate="no">create_index()</code></a> を使用してインデックスを作成します。</p>
</div>
<div class="language-java">
<p>コレクションのインデックスを作成したり、コレクションにインデックスを適用したりするには、 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a> を使用してインデックスパラメータを準備し、 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/createIndex.md"><code translate="no">createIndex()</code></a> を使用してインデックスを作成します。</p>
</div>
<div class="language-javascript">
<p>コレクションのインデックスを作成したり、コレクションにインデックスを付与したりするには、を使用してインデックスパラメータを準備し、 <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>を使用します。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4.1. Set up the index parameters</span>
index_params = MilvusClient.prepare_index_params()

<span class="hljs-comment"># 4.2. Add an index on the vector field.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>,
    params={ <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span> }
)

<span class="hljs-comment"># 4.3. Create an index file</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;customized_setup&quot;</span>,
    index_params=index_params,
    sync=<span class="hljs-literal">False</span> <span class="hljs-comment"># Whether to wait for index creation to complete before returning. Defaults to True.</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-comment">// 4 Prepare index parameters</span>

<span class="hljs-comment">// 4.2 Add an index for the vector field &quot;vector&quot;</span>
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForVectorField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
    .indexName(<span class="hljs-string">&quot;vector_index&quot;</span>)
    .indexType(IndexParam.IndexType.IVF_FLAT)
    .metricType(IndexParam.MetricType.COSINE)
    .extraParams(Map.of(<span class="hljs-string">&quot;nlist&quot;</span>, <span class="hljs-number">128</span>))
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForVectorField);

<span class="hljs-comment">// 4.3 Crate an index file</span>
<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup&quot;</span>)
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Set up index for the collection</span>
<span class="hljs-comment">// 4.1. Set up the index parameters</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,   
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_index&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span> }
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>このオブジェクトが適用される対象ファイルの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>ベクトル間の類似度を測定するために使用されるアルゴリズム。取り得る値は、<strong>IP</strong>、<strong>L2</strong>、<strong>COSINE</strong>、<strong>JACCARD</strong>、<strong>HAMMING</strong>です。これは、指定されたフィールドがベクトルフィールドである場合にのみ利用可能です。詳細については、「<a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Milvusでサポートされているインデックス</a>」を参照してください。</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>特定のフィールド内のデータを整理するために使用されるアルゴリズムの名前。適用可能なアルゴリズムについては、「<a href="https://milvus.io/docs/index.md">インメモリインデックス</a>」および「<a href="https://milvus.io/docs/disk_index.md">オンディスクインデックス</a>」を参照してください。</td>
    </tr>
    <tr>
      <td><code translate="no">index_name</code></td>
      <td>このオブジェクトの適用後に生成されるインデックスファイルの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>指定されたインデックスタイプの微調整パラメータ。使用可能なキーおよび値の範囲の詳細については、「<a href="https://milvus.io/docs/index.md">インメモリインデックス</a>」を参照してください。</td>
    </tr>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>既存のコレクションの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">index_params</code></td>
      <td><strong>IndexParam</strong>オブジェクトのリストを含む<strong>IndexParams</strong>オブジェクト。</td>
    </tr>
    <tr>
      <td><code translate="no">sync</code></td>
      <td>クライアントのリクエストに関連して、インデックスの構築方法を制御します。有効な値：<br><ul><li><code translate="no">True</code> (デフォルト): クライアントは、インデックスの構築が完全に完了するまで待機してから応答を返します。つまり、処理が完了するまで応答は得られません。</li><li><code translate="no">False</code>: クライアントはリクエストを受信後すぐに応答を返し、インデックスはバックグラウンドで構築されます。インデックスの作成が完了したかどうかを確認するには、<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md">describe_index()</a>メソッドを使用してください。</li></ul></td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>この IndexParam オブジェクトが適用される対象フィールドの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">indexName</code></td>
      <td>このオブジェクトが適用された後に生成されるインデックスファイルの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">indexType</code></td>
      <td>特定のフィールド内のデータを配置するために使用されるアルゴリズムの名前。適用可能なアルゴリズムについては、「<a href="https://milvus.io/docs/index.md">インメモリインデックス</a>」および「<a href="https://milvus.io/docs/disk_index.md">オンディスクインデックス</a>」を参照してください。</td>
    </tr>
    <tr>
      <td><code translate="no">metricType</code></td>
      <td>インデックスに使用する距離メトリック。指定可能な値は、<strong>IP</strong>、<strong>L2</strong>、<strong>COSINE</strong>、<strong>JACCARD</strong>、<strong>HAMMING</strong> です。</td>
    </tr>
    <tr>
      <td><code translate="no">extraParams</code></td>
      <td>追加のインデックスパラメータ。詳細については、「<a href="https://milvus.io/docs/index.md">インメモリインデックス</a>」および「<a href="https://milvus.io/docs/disk_index.md">オンディスクインデックス</a>」を参照してください。</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>既存のコレクションの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>インデックスを作成するフィールドの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>作成するインデックスのタイプ。</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>ベクトル距離の測定に使用されるメトリックタイプ。</td>
    </tr>
    <tr>
      <td><code translate="no">index_name</code></td>
      <td>作成するインデックスの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>その他のインデックス固有のパラメータ。</td>
    </tr>
  </tbody>
</table>
<div class="admonition note">
<p><strong>注</strong></p>
<p>現在、コレクション内の各フィールドに対して作成できるインデックスファイルは 1 つだけです。</p>
</div>
<h2 id="Check-Index-Details" class="common-anchor-header">インデックスの詳細を確認する<button data-href="#Check-Index-Details" class="anchor-icon" translate="no">
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
    </button></h2><p>インデックスの作成が完了したら、その詳細を確認できます。</p>
<div class="language-python">
<p>インデックスの詳細を確認するには、 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/list_indexes.md"><code translate="no">list_indexes()</code></a> を使用してインデックス名を一覧表示し、 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md"><code translate="no">describe_index()</code></a> を使用してインデックスの詳細を取得します。</p>
</div>
<div class="language-java">
<p>インデックスの詳細を確認するには、 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/describeIndex.md"><code translate="no">describeIndex()</code></a> を使用してインデックスの詳細を取得します。</p>
</div>
<div class="language-javascript">
<p>インデックスの詳細を確認するには、 <a href="https://milvus.io/api-reference/node/v2.4.x/Management/describeIndex.md"><code translate="no">describeIndex()</code></a> を使用してインデックスの詳細を取得します。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 5. Describe index</span>
res = client.list_indexes(
    collection_name=<span class="hljs-string">&quot;customized_setup&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     &quot;vector_index&quot;,</span>
<span class="hljs-comment"># ]</span>

res = client.describe_index(
    collection_name=<span class="hljs-string">&quot;customized_setup&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;index_type&quot;: ,</span>
<span class="hljs-comment">#     &quot;metric_type&quot;: &quot;COSINE&quot;,</span>
<span class="hljs-comment">#     &quot;field_name&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">#     &quot;index_name&quot;: &quot;vector_index&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DescribeIndexReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.response.DescribeIndexResp;

<span class="hljs-comment">// 5. Describe index</span>
<span class="hljs-comment">// 5.1 List the index names</span>
<span class="hljs-type">ListIndexesReq</span> <span class="hljs-variable">listIndexesReq</span> <span class="hljs-operator">=</span> ListIndexesReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup&quot;</span>)
    .build();

List&lt;String&gt; indexNames = client.listIndexes(listIndexesReq);

System.out.println(indexNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;vector_index&quot;</span>
<span class="hljs-comment">// ]</span>

<span class="hljs-comment">// 5.2 Describe an index</span>
<span class="hljs-type">DescribeIndexReq</span> <span class="hljs-variable">describeIndexReq</span> <span class="hljs-operator">=</span> DescribeIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup&quot;</span>)
    .indexName(<span class="hljs-string">&quot;vector_index&quot;</span>)
    .build();

<span class="hljs-type">DescribeIndexResp</span> <span class="hljs-variable">describeIndexResp</span> <span class="hljs-operator">=</span> client.describeIndex(describeIndexReq);

System.out.println(JSONObject.toJSON(describeIndexResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//     &quot;metricType&quot;: &quot;COSINE&quot;,</span>
<span class="hljs-comment">//     &quot;indexType&quot;: &quot;AUTOINDEX&quot;,</span>
<span class="hljs-comment">//     &quot;fieldName&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">//     &quot;indexName&quot;: &quot;vector_index&quot;</span>
<span class="hljs-comment">// }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. Describe the index</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_index&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res.<span class="hljs-property">index_descriptions</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>))

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &quot;params&quot;: [</span>
<span class="hljs-comment">//       {</span>
<span class="hljs-comment">//         &quot;key&quot;: &quot;index_type&quot;,</span>
<span class="hljs-comment">//         &quot;value&quot;: &quot;AUTOINDEX&quot;</span>
<span class="hljs-comment">//       },</span>
<span class="hljs-comment">//       {</span>
<span class="hljs-comment">//         &quot;key&quot;: &quot;metric_type&quot;,</span>
<span class="hljs-comment">//         &quot;value&quot;: &quot;COSINE&quot;</span>
<span class="hljs-comment">//       }</span>
<span class="hljs-comment">//     ],</span>
<span class="hljs-comment">//     &quot;index_name&quot;: &quot;vector_index&quot;,</span>
<span class="hljs-comment">//     &quot;indexID&quot;: &quot;449007919953063141&quot;,</span>
<span class="hljs-comment">//     &quot;field_name&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">//     &quot;indexed_rows&quot;: &quot;0&quot;,</span>
<span class="hljs-comment">//     &quot;total_rows&quot;: &quot;0&quot;,</span>
<span class="hljs-comment">//     &quot;state&quot;: &quot;Finished&quot;,</span>
<span class="hljs-comment">//     &quot;index_state_fail_reason&quot;: &quot;&quot;,</span>
<span class="hljs-comment">//     &quot;pending_index_rows&quot;: &quot;0&quot;</span>
<span class="hljs-comment">//   }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>特定のフィールドに対して作成されたインデックスファイルを確認し、そのインデックスファイルを使用してインデックス化された行数の統計情報を収集できます。</p>
<h2 id="Drop-an-Index" class="common-anchor-header">インデックスの削除<button data-href="#Drop-an-Index" class="anchor-icon" translate="no">
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
    </button></h2><p>インデックスが不要になった場合は、簡単に削除できます。</p>
<div class="alert note">
<p>インデックスを削除する前に、まずそのインデックスが解放されていることを確認してください。</p>
</div>
<div class="language-python">
<p>インデックスを削除するには、次のコマンドを使用します <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/drop_index.md"><code translate="no">drop_index()</code></a>を使用します。</p>
</div>
<div class="language-java">
<p>インデックスを削除するには、次のコマンドを使用します <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/dropIndex.md"><code translate="no">dropIndex()</code></a>を使用します。</p>
</div>
<div class="language-javascript">
<p>インデックスを削除するには、次のコマンドを使用します <a href="https://milvus.io/api-reference/node/v2.4.x/Management/dropIndex.md"><code translate="no">dropIndex()</code></a>。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 6. Drop index</span>
client.drop_index(
    collection_name=<span class="hljs-string">&quot;customized_setup&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 6. Drop index</span>

<span class="hljs-type">DropIndexReq</span> <span class="hljs-variable">dropIndexReq</span> <span class="hljs-operator">=</span> DropIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup&quot;</span>)
    .indexName(<span class="hljs-string">&quot;vector_index&quot;</span>)
    .build();

client.dropIndex(dropIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 6. Drop the index</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_index&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
