---
id: index-vector-fields.md
order: 1
summary: 本指南將引導您逐步了解如何在集合中的向量場上建立和管理索引的基本操作。
title: 向量場的索引
---
<h1 id="Index-Vector-Fields" class="common-anchor-header">向量場的索引<button data-href="#Index-Vector-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南將引導您了解如何在集合中建立及管理向量場索引的基本操作。</p>
<div class="alert warning">
<p>此頁面已停用。有關最新實作，請參閱<a href="/docs/zh-hant/ivf-flat.md">IVF_FLAT</a>、<a href="/docs/zh-hant/hnsw.md">HNSW</a> 等。</p>
</div>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 透過利用索引檔案中儲存的元資料，將您的資料組織成專用的結構，以便在搜尋或查詢時快速檢索所需資訊。</p>
<p>Milvus 提供多種索引類型和度量指標，用於對欄位值進行排序，以實現高效的相似度搜尋。下表列出了針對不同向量欄位類型所支援的索引類型和度量指標。 目前，Milvus 支援多種向量資料類型，包括浮點數嵌入（通常稱為浮點數向量或密集向量）、二進位嵌入（亦稱為二進位向量）以及稀疏嵌入（亦稱為稀疏向量）。詳細資訊請參閱《<a href="/docs/zh-hant/index.md">記憶體內索引與</a> <a href="/docs/zh-hant/metric.md">相似度指標</a>》。</p>
<div class="filter">
 <a href="#floating">浮點數嵌入</a>
 <a href="#binary"> 二進位嵌入</a>
 <a href="#sparse"> 稀疏嵌入</a>
</div>
<div class="filter-floating table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">相似度指標類型</th>
    <th class="tg-0pky">索引類型</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>歐幾里得距離 (L2)</li><li>內積 (IP)</li><li>餘弦相似度 (COSINE)</li></td>
    <td class="tg-0pky" rowspan="2"><ul><li>FLAT</li><li>IVF_FLAT</li><li>IVF_SQ8</li><li>IVF_PQ</li><li>GPU_IVF_FLAT</li><li>GPU_IVF_PQ</li><li>HNSW</li><li>DISKANN</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">度量類型</th>
    <th class="tg-0pky">索引類型</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>雅卡德 (JACCARD)</li><li>漢明 (HAMMING)</li></ul></td>
    <td class="tg-0pky"><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">度量類型</th>
    <th class="tg-0pky">索引類型</th>
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
<p>自 Milvus 2.5.4 起，<code translate="no">SPARSE_WAND</code> 已標記為過時。建議改用<code translate="no">&quot;inverted_index_algo&quot;: &quot;DAAT_WAND&quot;</code> 以維持相容性並達到同等效果。如需更多資訊，請參閱「<a href="/docs/zh-hant/sparse_vector.md#Set-index-params-for-vector-field">稀疏向量</a>」。</p>
</div>
</div>
<p>建議針對向量欄位與標量欄位中經常被存取的部分，皆建立索引。</p>
<h2 id="Preparations" class="common-anchor-header">準備工作<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>如《<a href="/docs/zh-hant/manage-collections.md">管理集合</a>》所述，當在集合建立請求中指定以下任一條件時，Milvus 會在建立集合時自動產生索引並將其載入記憶體：</p>
<ul>
<li><p>向量欄位的維數與度量類型，或</p></li>
<li><p>模式與索引參數。</p></li>
</ul>
<p>以下程式碼片段重新利用現有程式碼，用以建立與 Milvus 實例的連線，並建立一個未指定索引參數的集合。在此情況下，該集合沒有索引，且不會被載入記憶體。</p>
<div class="language-python">
<p>若要為建立索引做準備，請使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> 連線至 Milvus 伺服器，並透過 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a>, <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a>，以及 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a>來建立集合。</p>
</div>
<div class="language-java">
<p>為進行索引做準備，請使用 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a> 連線至 Milvus 伺服器，並使用 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md"><code translate="no">createSchema()</code></a>、 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md"><code translate="no">addField()</code></a>，以及 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code translate="no">createCollection()</code></a>。</p>
</div>
<div class="language-javascript">
<p>為進行索引做準備，請使用 <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> 連線至 Milvus 伺服器，並使用 <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a>。</p>
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
<h2 id="Index-a-Collection" class="common-anchor-header">為集合建立索引<button data-href="#Index-a-Collection" class="anchor-icon" translate="no">
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
<p>若要為集合建立索引或對集合進行索引，請使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/prepare_index_params.md"><code translate="no">prepare_index_params()</code></a> 來準備索引參數，並使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md"><code translate="no">create_index()</code></a> 來建立索引。</p>
</div>
<div class="language-java">
<p>若要為集合建立索引或對集合進行索引，請使用 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a> 來準備索引參數，並 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/createIndex.md"><code translate="no">createIndex()</code></a> 來建立索引。</p>
</div>
<div class="language-javascript">
<p>若要為集合建立索引或對集合進行索引，請使用來準備索引參數，並使用 <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>。</p>
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
      <th>參數</th>
      <th>說明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>此物件所套用的目標檔案名稱。</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>用於衡量向量之間相似度的演算法。可能的值包括<strong>IP</strong>、<strong>L2</strong>、<strong>COSINE</strong>、<strong>JACCARD</strong>、<strong>HAMMING</strong>。此參數僅在指定欄位為向量欄位時才可用。如需更多資訊，請參閱<a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Milvus 支援的索引</a>。</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>用於排列特定欄位中資料的演算法名稱。有關適用演算法，請參閱「<a href="https://milvus.io/docs/index.md">記憶體內索引</a>」與「<a href="https://milvus.io/docs/disk_index.md">磁碟上索引</a>」。</td>
    </tr>
    <tr>
      <td><code translate="no">index_name</code></td>
      <td>應用此物件後所產生的索引檔名稱。</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>指定索引類型的微調參數。有關可用鍵值與數值範圍的詳細資訊，請參閱「<a href="https://milvus.io/docs/index.md">記憶體內索引</a>」。</td>
    </tr>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>現有集合的名稱。</td>
    </tr>
    <tr>
      <td><code translate="no">index_params</code></td>
      <td>一個包含<strong>IndexParam</strong>物件清單的<strong>IndexParams</strong>物件。</td>
    </tr>
    <tr>
      <td><code translate="no">sync</code></td>
      <td>控制索引的建置方式與客戶端請求的關聯性。有效值：<br><ul><li><code translate="no">True</code> (預設)：客戶端會等待索引完全建置完畢後才返回。這表示在流程完成之前，您將無法收到回應。</li><li><code translate="no">False</code>：客戶端在收到請求後立即返回，而索引則在背景中進行建置。若要確認索引建置是否已完成，請使用<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md">describe_index()</a>方法。</li></ul></td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>參數</th>
      <th>說明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>此 IndexParam 物件所套用的目標欄位名稱。</td>
    </tr>
    <tr>
      <td><code translate="no">indexName</code></td>
      <td>套用此物件後所產生的索引檔名稱。</td>
    </tr>
    <tr>
      <td><code translate="no">indexType</code></td>
      <td>用於排列特定欄位中資料的演算法名稱。有關適用的演算法，請參閱「<a href="https://milvus.io/docs/index.md">記憶體內索引</a>」和「<a href="https://milvus.io/docs/disk_index.md">磁碟上索引</a>」。</td>
    </tr>
    <tr>
      <td><code translate="no">metricType</code></td>
      <td>索引所使用的距離度量。可能的值包括<strong>IP</strong>、<strong>L2</strong>、<strong>COSINE</strong>、<strong>JACCARD</strong>、<strong>HAMMING</strong>。</td>
    </tr>
    <tr>
      <td><code translate="no">extraParams</code></td>
      <td>額外的索引參數。詳細資訊請參閱「<a href="https://milvus.io/docs/index.md">記憶體內索引</a>」和「<a href="https://milvus.io/docs/disk_index.md">磁碟上索引</a>」。</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>參數</th>
      <th>說明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>現有集合的名稱。</td>
    </tr>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>要建立索引的欄位名稱。</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>要建立的索引類型。</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>用於測量向量距離的度量類型。</td>
    </tr>
    <tr>
      <td><code translate="no">index_name</code></td>
      <td>要建立的索引名稱。</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>其他與索引相關的參數。</td>
    </tr>
  </tbody>
</table>
<div class="admonition note">
<p><strong>備註</strong></p>
<p>目前，您只能為集合中的每個欄位建立一個索引檔。</p>
</div>
<h2 id="Check-Index-Details" class="common-anchor-header">檢查索引詳細資訊<button data-href="#Check-Index-Details" class="anchor-icon" translate="no">
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
    </button></h2><p>建立索引後，您可以查看其詳細資訊。</p>
<div class="language-python">
<p>要檢查索引詳細資訊，請使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/list_indexes.md"><code translate="no">list_indexes()</code></a> 來列出索引名稱，並使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md"><code translate="no">describe_index()</code></a> 來取得索引詳細資訊。</p>
</div>
<div class="language-java">
<p>若要檢視索引詳細資訊，請使用 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/describeIndex.md"><code translate="no">describeIndex()</code></a> 來取得索引的詳細資訊。</p>
</div>
<div class="language-javascript">
<p>若要查看索引詳細資訊，請使用 <a href="https://milvus.io/api-reference/node/v2.4.x/Management/describeIndex.md"><code translate="no">describeIndex()</code></a> 以取得索引詳細資訊。</p>
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
<p>您可以檢查特定欄位上所建立的索引檔案，並透過此索引檔案彙整已建立索引的資料列數統計資料。</p>
<h2 id="Drop-an-Index" class="common-anchor-header">刪除索引<button data-href="#Drop-an-Index" class="anchor-icon" translate="no">
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
    </button></h2><p>若不再需要某個索引，您可以直接刪除該索引。</p>
<div class="alert note">
<p>在刪除索引之前，請先確保該索引已釋放。</p>
</div>
<div class="language-python">
<p>要刪除索引，請使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/drop_index.md"><code translate="no">drop_index()</code></a>。</p>
</div>
<div class="language-java">
<p>要刪除索引，請使用 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/dropIndex.md"><code translate="no">dropIndex()</code></a>。</p>
</div>
<div class="language-javascript">
<p>若要刪除索引，請使用 <a href="https://milvus.io/api-reference/node/v2.4.x/Management/dropIndex.md"><code translate="no">dropIndex()</code></a>。</p>
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
