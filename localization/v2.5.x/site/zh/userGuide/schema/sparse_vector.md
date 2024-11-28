---
id: sparse_vector.md
title: 稀疏向量
summary: >-
  稀疏向量是信息检索和自然语言处理中一种重要的数据表示方法。虽然稠密向量因其出色的语义理解能力而广受欢迎，但在涉及需要精确匹配关键词或短语的应用时，稀疏向量往往能提供更精确的结果。
---
<h1 id="Sparse-Vector​" class="common-anchor-header">稀疏向量<button data-href="#Sparse-Vector​" class="anchor-icon" translate="no">
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
    </button></h1><p>稀疏向量是信息检索和自然语言处理中一种重要的数据表示方法。虽然稠密向量因其出色的语义理解能力而广受欢迎，但在涉及需要精确匹配关键词或短语的应用时，稀疏向量往往能提供更精确的结果。</p>
<h2 id="Overview​" class="common-anchor-header">稀疏向量概述<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>稀疏向量是高维向量的一种特殊表示形式，其中大部分元素为零，只有少数维度的值不为零。这一特性使得稀疏向量在处理大规模、高维但稀疏的数据时特别有效。常见的应用包括</p>
<ul>
<li><p><strong>文本分析：</strong>将文档表示为词袋向量，其中每个维度对应一个单词，只有在文档中出现的单词才有非零值。</p></li>
<li><p><strong>推荐系统：</strong>用户-物品交互矩阵，其中每个维度代表用户对特定物品的评分，大多数用户只与少数物品交互。</p></li>
<li><p><strong>图像处理：</strong>局部特征表示，只关注图像中的关键点，从而产生高维稀疏向量。</p></li>
</ul>
<p>如下图所示，密集向量通常表示为连续数组，其中每个位置都有一个值（如<code translate="no">[0.3, 0.8, 0.2, 0.3, 0.1]</code> ）。相比之下，稀疏向量只存储非零元素及其索引，通常表示为键值对（如<code translate="no">[{2: 0.2}, ..., {9997: 0.5}, {9999: 0.7}]</code> ）。这种表示方法大大减少了存储空间，提高了计算效率，尤其是在处理极高维数据（如 10,000 维数据）时。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/sparse-vector.png" alt="Spare vector representation" class="doc-image" id="spare-vector-representation" />
   </span> <span class="img-wrapper"> <span>稀疏向量表示法</span> </span></p>
<p>稀疏向量可以使用多种方法生成，例如文本处理中的<a href="https://en.wikipedia.org/wiki/Tf%E2%80%93idf">TF-IDF</a>（词频-反向文档频率）和<a href="https://en.wikipedia.org/wiki/Okapi_BM25">BM25</a>。此外，Milvus 还提供了帮助生成和处理稀疏向量的便捷方法。详情请参阅<a href="/docs/zh/embeddings.md">Embeddings</a>。</p>
<p>对于文本数据，Milvus 还提供全文搜索功能，让您可以直接在原始文本数据上执行向量搜索，而无需使用外部嵌入模型来生成稀疏向量。更多信息，请参阅<a href="/docs/zh/full-text-search.md">全文搜索</a>。</p>
<p>矢量化后，数据可存储在 Milvus 中进行管理和矢量检索。下图说明了基本流程。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/use-sparse-vector.png" alt="Use sparse vector in Milvus" class="doc-image" id="use-sparse-vector-in-milvus" />
   </span> <span class="img-wrapper"> <span>在 Milvus 中使用稀疏向量</span> </span></p>
<div class="alert note">
<p>除了稀疏向量，Milvus 还支持密集向量和二进制向量。密集向量是捕捉深层语义关系的理想选择，而二进制向量则在快速相似性比较和内容重复数据删除等场景中表现出色。更多信息，请参阅<a href="/docs/zh/dense-vector.md">密集向量</a>和<a href="/docs/zh/binary-vector.md">二进制向量</a>。</p>
</div>
<h2 id="Use-sparse-vectors-in-Milvus​" class="common-anchor-header">在 Milvus 中使用稀疏向量<button data-href="#Use-sparse-vectors-in-Milvus​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支持以下列任何一种格式表示稀疏向量。</p>
<ul>
<li><p>稀疏矩阵（使用<code translate="no">scipy.sparse</code> 类）</p>
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
<li><p>字典列表（格式为<code translate="no">{dimension_index: value, ...}</code>)</p>
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
<li><p>元组迭代器列表（格式为<code translate="no">[(dimension_index, value)]</code> ）</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Represent sparse vector using a list of tuples​</span>
sparse_vector = [[(<span class="hljs-number">1</span>, <span class="hljs-number">0.5</span>), (<span class="hljs-number">100</span>, <span class="hljs-number">0.3</span>), (<span class="hljs-number">500</span>, <span class="hljs-number">0.8</span>), (<span class="hljs-number">1024</span>, <span class="hljs-number">0.2</span>), (<span class="hljs-number">5000</span>, <span class="hljs-number">0.6</span>)]]​

<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Add-vector-field​" class="common-anchor-header">添加向量场</h3><p>要在 Milvus 中使用稀疏向量，请在创建 Collections 时定义一个用于存储稀疏向量的字段。这个过程包括</p>
<ol>
<li><p>将<code translate="no">datatype</code> 设置为支持的稀疏向量数据类型，即<code translate="no">SPARSE_FLOAT_VECTOR</code> 。</p></li>
<li><p>无需指定维度。</p></li>
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
<p>在此示例中，添加了一个名为<code translate="no">sparse_vector</code> 的向量字段，用于存储稀疏向量。该字段的数据类型为<code translate="no">SPARSE_FLOAT_VECTOR</code> 。</p>
<h3 id="Set-index-params-for-vector-field​" class="common-anchor-header">为向量字段设置索引参数</h3><p>为稀疏向量创建索引的过程与为<a href="/docs/zh/dense-vector.md">密集向量</a>创建索引的过程类似，但在指定的索引类型 (<code translate="no">index_type</code>)、距离度量 (<code translate="no">metric_type</code>) 和索引参数 (<code translate="no">params</code>) 上有所不同。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()​
​
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,​
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>,​
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
    <span class="hljs-keyword">params</span>={<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>},​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;​
<span class="hljs-keyword">import</span> java.<span class="hljs-property">util</span>.*;​
​
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
extraParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;drop_ratio_build&quot;</span>, <span class="hljs-number">0.2</span>);​
indexes.<span class="hljs-title function_">add</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)​
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>)​
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">SPARSE_INVERTED_INDEX</span>)​
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">IP</span>)​
        .<span class="hljs-title function_">extraParams</span>(extraParams)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = <span class="hljs-keyword">await</span> client.createIndex({​
    index_name: <span class="hljs-string">&#x27;sparse_inverted_index&#x27;</span>,​
    field_name: <span class="hljs-string">&#x27;sparse_vector&#x27;</span>,​
    metric_type: MetricType.IP,​
    index_type: IndexType.SPARSE_WAND,​
    <span class="hljs-keyword">params</span>: {​
      drop_ratio_build: <span class="hljs-number">0.2</span>,​
    },​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;sparse_vector&quot;,​
            &quot;metricType&quot;: &quot;IP&quot;,​
            &quot;indexName&quot;: &quot;sparse_inverted_index&quot;,​
            &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;,​
            &quot;params&quot;:{&quot;drop_ratio_build&quot;: 0.2}​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>在上面的示例中。</p>
<ul>
<li><p>为稀疏向量创建了一个<code translate="no">SPARSE_INVERTED_INDEX</code> 类型的索引。对于稀疏向量，可以指定<code translate="no">SPARSE_INVERTED_INDEX</code> 或<code translate="no">SPARSE_WAND</code> 。有关详情，请参阅<a href="https://milvus.io/docs/index.md?tab=sparse">稀疏向量索引</a>。</p></li>
<li><p>对于稀疏向量，<code translate="no">metric_type</code> 只支持<code translate="no">IP</code> （内积），用于衡量两个稀疏向量之间的相似性。有关相似性的更多信息，请参阅 "<a href="/docs/zh/metric.md">度量类型</a>"。</p></li>
<li><p><code translate="no">drop_ratio_build</code> 是一个可选的索引参数，专门用于稀疏向量。它可以控制索引建立过程中排除小向量值的比例。例如，使用 时，最小的 20% 向量值将在索引创建过程中被排除，从而减少搜索过程中的计算量。<code translate="no">{&quot;drop_ratio_build&quot;: 0.2}</code></p></li>
</ul>
<h3 id="Create-collection​" class="common-anchor-header">创建 Collections</h3><p>完成稀疏向量和索引设置后，就可以创建包含稀疏向量的 Collections。下面的示例使用 <ins><code translate="no">create_collection</code></ins>方法创建一个名为<code translate="no">my_sparse_collection</code> 的 Collection。</p>
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
<h3 id="Insert-data​" class="common-anchor-header">插入数据</h3><p>创建集合后，插入包含稀疏向量的数据。</p>
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
<h3 id="Perform-similarity-search​" class="common-anchor-header">执行相似性搜索</h3><p>要使用稀疏向量执行相似性搜索，请准备好查询向量和搜索参数。</p>
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
<p>在本例中，<code translate="no">drop_ratio_search</code> 是专门用于稀疏向量的可选参数，允许在搜索过程中对查询向量中的小值进行微调。例如，使用<code translate="no">{&quot;drop_ratio_search&quot;: 0.2}</code> 时，查询向量中最小的 20% 值将在搜索过程中被忽略。</p>
<p>然后，使用<code translate="no">search</code> 方法执行相似性搜索。</p>
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
<p>有关相似性搜索参数的更多信息，请参阅<a href="/docs/zh/single-vector-search.md">基本 ANN 搜索</a>。</p>
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中使用稀疏向量时，请考虑以下限制：</p>
<ul>
<li><p>目前，稀疏向量只支持<strong>IP</strong>距离度量。稀疏向量的高维度使得 L2 和余弦距离不切实际。</p></li>
<li><p>对于稀疏向量场，只支持<strong>SPARSE_INVERTED_INDEX</strong>和<strong>SPARSE_WAND</strong>索引类型。</p></li>
<li><p>稀疏向量支持的数据类型：</p>
<ul>
<li>维数部分必须是无符号 32 位整数；</li>
<li>值部分可以是非负 32 位浮点数。</li>
</ul></li>
<li><p>稀疏向量在插入和搜索时必须满足以下要求：</p>
<ul>
<li>向量中至少有一个值为非零；</li>
<li>向量索引为非负。</li>
</ul></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">常见问题<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>能否解释 SPARSE_INVERTED_INDEX 和 SPARSE_WAND 之间的区别，以及如何在两者之间进行选择？</strong></p>
<p><strong>SPARSE_INVERTED_INDEX</strong>是一种传统的倒排索引，而<strong>SPARSE_WAND</strong>则使用<a href="https://dl.acm.org/doi/10.1145/956863.956944">弱-AND</a>算法来减少搜索过程中全 IP 距离评估的次数。<strong>SPARSE_WAND</strong>通常速度更快，但其性能会随着向量密度的增加而下降。要在它们之间做出选择，请根据您的特定数据集和使用案例进行实验和基准测试。</p></li>
<li><p><strong>如何选择 drop_ratio_build 和 drop_ratio_search 参数？</strong></p>
<p><strong>drop_ratio_build</strong>和<strong>drop_ratio_search</strong>的选择取决于数据的特性以及对搜索延迟/吞吐量和准确性的要求。</p></li>
<li><p><strong>稀疏嵌入的维度可以是 uint32 空间内的任何离散值吗？</strong></p>
<p>可以，但有一个例外。稀疏嵌入的维度可以是<code translate="no">[0, maximum of uint32)</code> 范围内的任何值。这意味着不能使用 uint32 的最大值。</p></li>
<li><p><strong>是通过索引还是蛮力来搜索不断增长的数据段？</strong></p>
<p>对增长的数据段的搜索是通过与密封数据段索引相同类型的索引进行的。对于索引建立前的新增长区段，则使用蛮力搜索。</p></li>
<li><p><strong>是否可以在一个 Collections 中同时包含稀疏向量和密集向量？</strong></p>
<p>可以，通过多向量类型支持，您可以创建既有稀疏向量列又有密集向量列的 Collections，并对它们执行混合搜索。</p></li>
</ul>
