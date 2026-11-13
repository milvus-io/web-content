---
id: index-scalar-fields.md
order: 2
summary: 本指南将引导您逐步创建和配置整数、字符串等字段的标量索引。
title: 标量字段索引
---
<h1 id="Index-Scalar-Fields" class="common-anchor-header">标量字段索引<button data-href="#Index-Scalar-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 中，标量索引用于根据特定的非向量字段值加速元过滤，这与传统数据库中的索引类似。本指南将引导您创建和配置整数、字符串等字段的标量索引。</p>
<div class="alert warning">
<p>此页面已弃用。有关最新实现，请参阅<a href="/docs/zh/bitmap.md">BITMAP</a>、<a href="/docs/zh/inverted.md">INVERTED</a>、<a href="/docs/zh/ngram.md">NGRAM</a>、<a href="/docs/zh/rtree.md">RTREE</a>、<a href="/docs/zh/stl-sort.md">STL_SORT</a>、<a href="/docs/zh/trie.md">TRIE</a> 和<a href="/docs/zh/fmindex.md">FMINDEX</a>。</p>
</div>
<h2 id="Types-of-scalar-indexing" class="common-anchor-header">标量索引的类型<button data-href="#Types-of-scalar-indexing" class="anchor-icon" translate="no">
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
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Auto-indexing">自动索引</a></strong>：Milvus 会根据标量字段的数据类型自动决定索引类型。当您无需控制具体索引类型时，此方式较为适用。</p></li>
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Custom-indexing">自定义索引</a></strong>：您指定确切的索引类型，例如倒排索引或<a href="/docs/zh/bitmap.md">位图索引</a>。这能让您对索引类型的选择拥有更大的控制权。</p></li>
</ul>
<h2 id="Auto-indexing" class="common-anchor-header">自动索引<button data-href="#Auto-indexing" class="anchor-icon" translate="no">
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
<p><strong>要</strong>使用自动索引，请在 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>中省略 index_type 参数，以便 Milvus 能根据标量字段类型推断出索引类型。</p>
</div>
<div class="language-java">
<p><strong>要</strong>使用自动索引，请在 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>中省略 index_type 参数，以便 Milvus 能根据标量字段类型推断索引类型。</p>
</div>
<div class="language-javascript">
<p><strong>要</strong>使用自动索引，请在 <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>，以便 Milvus 能根据标量字段类型推断索引类型。</p>
</div>
<p>有关标量数据类型与默认索引算法之间的映射关系，请参阅《<a href="/docs/zh/scalar_index.md#Choosing-a-scalar-index">选择标量索引</a>》。</p>
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
<h2 id="Custom-indexing" class="common-anchor-header">自定义索引<button data-href="#Custom-indexing" class="anchor-icon" translate="no">
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
<p><strong>要</strong>使用自定义索引，请通过 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>中指定特定的索引类型。</p>
</div>
<div class="language-java">
<p>要使用自定义索引，请通过中的<strong>indexType</strong>参数指定特定的索引类型。 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>中。</p>
</div>
<div class="language-javascript">
<p>要使用自定义索引，请通过<strong>index_type</strong>参数指定特定的索引类型，该参数位于 <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>中。</p>
</div>
<p>下面的示例为标量字段<code translate="no">scalar_2</code> 创建了一个倒排索引。</p>
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
<p><strong>方法和参数</strong></p>
<ul>
<li><p><strong>prepare_index_params()</strong></p>
<p>准备一个<strong>IndexParams</strong>对象。</p></li>
<li><p><strong>add_index()</strong></p>
<p>向<strong>IndexParams</strong>对象添加索引配置。</p>
<ul>
<li><p><strong>field_name</strong>(<em>字符串</em>)</p>
<p>要建立索引的标量字段的名称。</p></li>
<li><p><strong>index_type</strong>(<em>字符串</em>)：</p>
<p>要创建的标量索引的类型。对于隐式索引，请留空或省略此参数。</p>
<p>对于自定义索引，有效值为：</p>
<ul>
<li><p><strong>INVERTED</strong>：（推荐）倒排索引由一个术语词典组成，其中包含按字母顺序排序的所有分词后的单词。详情请参阅《<a href="/docs/zh/scalar_index.md">标量索引》</a>。</p></li>
<li><p><strong>BITMAP</strong>：一种索引类型，用于存储字段中所有唯一值的位图。详情请参阅<a href="/docs/zh/bitmap.md">“BITMAP”</a>。</p></li>
<li><p><strong>STL_SORT</strong>：使用标准模板库（STL）的排序算法对标量字段进行排序。支持数值型、VARCHAR 和 TIMESTAMPTZ 字段。详情请参阅<a href="/docs/zh/stl-sort.md">STL_SORT</a>。</p></li>
<li><p><strong>TRIE</strong>：一种用于快速前缀搜索和检索的树形数据结构。支持 VARCHAR 字段。详情请参阅<a href="/docs/zh/trie.md">TRIE</a>。</p></li>
<li><p><strong>NGRAM</strong>：一种可加速 VARCHAR 字段上 LIKE 和正则表达式过滤操作的索引。详情请参阅<a href="/docs/zh/ngram.md">NGRAM</a>。</p></li>
<li><p><strong>FMINDEX</strong>：用于 VARCHAR 字段的精确字节级子字符串索引。详情请参阅<a href="/docs/zh/fmindex.md">FMINDEX</a>。</p></li>
<li><p><strong>RTREE</strong>：用于 GEOMETRY 字段的索引。详情请参阅<a href="/docs/zh/rtree.md">RTREE</a>。</p></li>
</ul></li>
<li><p><strong>index_name</strong>(<em>字符串</em>)</p>
<p>要创建的标量索引的名称。每个标量字段支持一个索引。</p></li>
</ul></li>
<li><p><strong>create_index()</strong></p>
<p>在指定的 Collection 中创建索引。</p>
<ul>
<li><p><strong>collection_name</strong>(<em>字符串</em>)</p>
<p>要为其创建索引的Collection名称。</p></li>
<li><p><strong>index_params</strong></p>
<p>包含索引配置的<strong>IndexParams</strong>对象。</p></li>
</ul></li>
</ul>
</div>
<div class="language-java">
<p><strong>方法和参数</strong></p>
<ul>
<li><strong>IndexParam</strong>
准备一个 IndexParam 对象。
<ul>
<li><strong>fieldName</strong>(<em>字符串</em>)
要建立索引的标量字段名称。</li>
<li><strong>indexName</strong>(<em>字符串</em>)
要创建的标量索引的名称。每个标量字段支持一个索引。</li>
<li><strong>indexType</strong>(<em>String</em>)
要创建的标量索引的类型。对于隐式索引，请留空或省略此参数。
对于自定义索引，有效值包括：
<ul>
<li><strong>INVERTED</strong>：（推荐）倒排索引由一个术语词典组成，其中包含按字母顺序排序的所有分词后的单词。详情请参阅<a href="/docs/zh/scalar_index.md">“标量索引”</a>。</li>
<li><strong>BITMAP</strong>：一种索引类型，用于存储字段中所有唯一值的位图。详情请参阅<a href="/docs/zh/bitmap.md">BITMAP</a>。</li>
<li><strong>STL_SORT</strong>：使用标准模板库（STL）的排序算法对标量字段进行排序。支持数值型、VARCHAR 和 TIMESTAMPTZ 字段。详情请参阅<a href="/docs/zh/stl-sort.md">STL_SORT</a>。</li>
<li><strong>TRIE</strong>：一种用于快速前缀搜索和检索的树形数据结构。支持 VARCHAR 字段。详情请参阅<a href="/docs/zh/trie.md">TRIE</a>。</li>
<li><strong>NGRAM</strong>：一种可加速 VARCHAR 字段上 LIKE 和正则表达式过滤操作的索引。详情请参阅<a href="/docs/zh/ngram.md">NGRAM</a>。</li>
<li><strong>FMINDEX</strong>：用于 VARCHAR 字段的精确字节级子字符串索引。详情请参阅<a href="/docs/zh/fmindex.md">FMINDEX</a>。</li>
<li><strong>RTREE</strong>：用于 GEOMETRY 字段的索引。有关详细信息，请参阅<a href="/docs/zh/rtree.md">RTREE</a>。</li>
</ul></li>
</ul></li>
<li><strong>CreateIndexReq</strong>
在指定的 Collection 中创建索引。
<ul>
<li><strong>collectionName</strong>(<em>字符串</em>)
要为其创建索引的Collection名称。</li>
<li><strong>indexParams</strong>（<em>列表<IndexParam></em> ）
包含索引配置的 IndexParam 对象列表。</li>
</ul></li>
</ul>
</div>
<div class="language-javascript">
<p><strong>方法和参数</strong></p>
<ul>
<li><p><strong>createIndex</strong></p>
<p>在指定的 Collection 中创建索引。</p>
<ul>
<li><strong>collection_name</strong>(<em>字符串</em>)
要为其创建索引的Collection名称。</li>
<li><strong>field_name</strong>(<em>字符串</em>)
要建立索引的标量字段名称。</li>
<li><strong>index_name</strong>(<em>字符串</em>)
要创建的标量索引的名称。每个标量字段支持一个索引。</li>
<li><strong>index_type</strong>(<em>字符串</em>)
要创建的标量索引的类型。对于隐式索引，请留空或省略此参数。
对于自定义索引，有效值包括：
<ul>
<li><strong>INVERTED</strong>：（推荐）倒排索引由一个术语词典组成，其中包含按字母顺序排序的所有分词后的单词。详情请参阅<a href="/docs/zh/scalar_index.md">“标量索引”</a>。</li>
<li><strong>BITMAP</strong>：一种索引类型，用于存储字段中所有唯一值的位图。详情请参阅<a href="/docs/zh/bitmap.md">BITMAP</a>。</li>
<li><strong>STL_SORT</strong>：使用标准模板库（STL）的排序算法对标量字段进行排序。支持数值型、VARCHAR 和 TIMESTAMPTZ 字段。详情请参阅<a href="/docs/zh/stl-sort.md">STL_SORT</a>。</li>
<li><strong>TRIE</strong>：一种用于快速前缀搜索和检索的树形数据结构。支持 VARCHAR 字段。详情请参阅<a href="/docs/zh/trie.md">TRIE</a>。</li>
<li><strong>NGRAM</strong>：一种可加速 VARCHAR 字段上 LIKE 和正则表达式过滤操作的索引。详情请参阅<a href="/docs/zh/ngram.md">NGRAM</a>。</li>
<li><strong>FMINDEX</strong>：用于 VARCHAR 字段的精确字节级子字符串索引。详情请参阅<a href="/docs/zh/fmindex.md">FMINDEX</a>。</li>
<li><strong>RTREE</strong>：用于 GEOMETRY 字段的索引。详情请参阅<a href="/docs/zh/rtree.md">RTREE</a>。</li>
</ul></li>
</ul></li>
</ul>
</div>
<h2 id="Verifying-the-result" class="common-anchor-header">验证结果<button data-href="#Verifying-the-result" class="anchor-icon" translate="no">
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
<p>使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/list_indexes.md"><code translate="no">list_indexes()</code></a> 方法验证标量索引的创建情况：</p>
</div>
<div class="language-java">
<p>使用<code translate="no">listIndexes()</code> 方法验证标量索引的创建情况：</p>
</div>
<div class="language-javascript">
<p>使用<code translate="no">listIndexes()</code> 方法验证标量索引的创建情况：</p>
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
