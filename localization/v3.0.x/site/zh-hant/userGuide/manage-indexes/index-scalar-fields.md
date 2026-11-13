---
id: index-scalar-fields.md
order: 2
summary: 本指南將引導您逐步建立並設定整數、字串等欄位的標量索引。
title: 標量欄位索引
---
<h1 id="Index-Scalar-Fields" class="common-anchor-header">標量欄位索引<button data-href="#Index-Scalar-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 中，標量索引用於透過特定的非向量欄位值來加速元過濾，其運作方式類似於傳統資料庫的索引。本指南將引導您建立並設定整數、字串等欄位的標量索引。</p>
<div class="alert warning">
<p>此頁面已不再使用。有關最新實作，請參閱<a href="/docs/zh-hant/bitmap.md">BITMAP</a>、<a href="/docs/zh-hant/inverted.md">INVERTED</a>、<a href="/docs/zh-hant/ngram.md">NGRAM</a>、<a href="/docs/zh-hant/rtree.md">RTREE</a>、<a href="/docs/zh-hant/stl-sort.md">STL_SORT</a>、<a href="/docs/zh-hant/trie.md">TRIE</a> 及<a href="/docs/zh-hant/fmindex.md">FMINDEX</a>。</p>
</div>
<h2 id="Types-of-scalar-indexing" class="common-anchor-header">標量索引的類型<button data-href="#Types-of-scalar-indexing" class="anchor-icon" translate="no">
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
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Auto-indexing">自動索引</a></strong>：Milvus 會根據標量欄位的資料類型自動決定索引類型。當您無需控制特定索引類型時，此方式相當適合。</p></li>
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Custom-indexing">自訂索引</a></strong>：您可指定確切的索引類型，例如反向索引或<a href="/docs/zh-hant/bitmap.md">位圖索引</a>。此方式能提供對索引類型選擇的更多控制權。</p></li>
</ul>
<h2 id="Auto-indexing" class="common-anchor-header">自動索引<button data-href="#Auto-indexing" class="anchor-icon" translate="no">
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
<p><strong>若</strong>要使用自動索引，請在 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>中省略 index_type 參數，以便 Milvus 能根據標量欄位的資料型別推斷索引類型。</p>
</div>
<div class="language-java">
<p><strong>若</strong>要使用自動索引，請在 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>中省略 index_type 參數，以便 Milvus 能根據標量欄位類型推斷索引類型。</p>
</div>
<div class="language-javascript">
<p>若<strong>要</strong>使用自動建立索引，請在 <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>，以便 Milvus 能根據標量欄位類型推斷索引類型。</p>
</div>
<p>關於標量資料型別與預設索引演算法的對應關係，請參閱<a href="/docs/zh-hant/scalar_index.md#Choosing-a-scalar-index">《選擇標量索引》</a>。</p>
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
<h2 id="Custom-indexing" class="common-anchor-header">自訂索引<button data-href="#Custom-indexing" class="anchor-icon" translate="no">
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
<p>若<strong>要</strong>使用自訂索引，請透過 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>中指定特定的索引類型。</p>
</div>
<div class="language-java">
<p>若要使用自訂索引，請透過 中的<strong>indexType</strong>參數指定特定的索引類型。 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>中。</p>
</div>
<div class="language-javascript">
<p>若要使用自訂索引，請透過<strong>index_type</strong>參數指定特定的索引類型，該參數位於 <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>中。</p>
</div>
<p>以下範例為標量欄位 `<code translate="no">scalar_2</code>` 建立一個反向索引。</p>
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
<p><strong>方法與參數</strong></p>
<ul>
<li><p><strong>prepare_index_params()</strong></p>
<p>準備一個<strong>IndexParams</strong>物件。</p></li>
<li><p><strong>add_index()</strong></p>
<p>將索引設定新增至<strong>IndexParams</strong>物件。</p>
<ul>
<li><p><strong>field_name</strong>(<em>字串</em>)</p>
<p>要建立索引的標量欄位名稱。</p></li>
<li><p><strong>index_type</strong>(<em>字串</em>)：</p>
<p>要建立的標量索引類型。若為隱式索引，請留空或省略此參數。</p>
<p>若要進行自訂索引，有效值如下：</p>
<ul>
<li><p><strong>INVERTED</strong>：（建議）反向索引由一個術語字典組成，其中包含所有按字母順序排序的詞元化單詞。詳細資訊請參閱「<a href="/docs/zh-hant/scalar_index.md">標量索引</a>」。</p></li>
<li><p><strong>BITMAP</strong>：一種索引類型，用於儲存欄位中所有唯一值的位圖。詳細資訊請參閱「<a href="/docs/zh-hant/bitmap.md">BITMAP</a>」。</p></li>
<li><p><strong>STL_SORT</strong>：使用標準範本函式庫 (STL) 的排序演算法對標量欄位進行排序。支援數值型、VARCHAR 及 TIMESTAMPTZ 欄位。詳情請參閱「<a href="/docs/zh-hant/stl-sort.md">STL_SORT</a>」。</p></li>
<li><p><strong>TRIE</strong>：一種用於快速前綴搜尋與檢索的樹狀資料結構。支援 VARCHAR 欄位。詳情請參閱<a href="/docs/zh-hant/trie.md">TRIE</a>。</p></li>
<li><p><strong>NGRAM</strong>：一種可加速 VARCHAR 欄位上 LIKE 及正規表達式篩選的索引。詳細資訊請參閱<a href="/docs/zh-hant/ngram.md">NGRAM</a>。</p></li>
<li><p><strong>FMINDEX</strong>：適用於 VARCHAR 欄位的精確位元組級子字串索引。詳細資訊請參閱<a href="/docs/zh-hant/fmindex.md">FMINDEX</a>。</p></li>
<li><p><strong>RTREE</strong>：適用於 GEOMETRY 欄位的索引。詳情請參閱<a href="/docs/zh-hant/rtree.md">RTREE</a>。</p></li>
</ul></li>
<li><p><strong>index_name</strong>(<em>字串</em>)</p>
<p>要建立的標量索引名稱。每個標量欄位支援一個索引。</p></li>
</ul></li>
<li><p><strong>create_index()</strong></p>
<p>在指定的集合中建立索引。</p>
<ul>
<li><p><strong>collection_name</strong>(<em>字串</em>)</p>
<p>要為其建立索引的集合名稱。</p></li>
<li><p><strong>index_params</strong></p>
<p>包含索引設定的<strong>IndexParams</strong>物件。</p></li>
</ul></li>
</ul>
</div>
<div class="language-java">
<p><strong>方法與參數</strong></p>
<ul>
<li><strong>IndexParam</strong>
建立一個 IndexParam 物件。
<ul>
<li><strong>fieldName</strong>(<em>字串</em>)
要建立索引的標量欄位名稱。</li>
<li><strong>indexName</strong>(<em>字串</em>)
要建立的標量索引名稱。每個標量欄位僅支援一個索引。</li>
<li><strong>indexType</strong>(<em>字串</em>)
要建立的標量索引類型。若為隱式索引，請留空或省略此參數。
若為自訂索引，有效值如下：
<ul>
<li><strong>INVERTED</strong>：（建議）反向索引由一個術語詞典組成，其中包含所有按字母順序排序的詞元化單字。詳細資訊請參閱「<a href="/docs/zh-hant/scalar_index.md">標量索引</a>」。</li>
<li><strong>BITMAP</strong>：一種索引類型，用於儲存欄位中所有唯一值的位圖。詳細資訊請參閱<a href="/docs/zh-hant/bitmap.md">BITMAP</a>。</li>
<li><strong>STL_SORT</strong>：使用標準範本函式庫 (STL) 的排序演算法對標量欄位進行排序。支援數值型、VARCHAR 及 TIMESTAMPTZ 欄位。詳情請參閱「<a href="/docs/zh-hant/stl-sort.md">STL_SORT</a>」。</li>
<li><strong>TRIE</strong>：一種用於快速前綴搜尋與檢索的樹狀資料結構。支援 VARCHAR 欄位。詳情請參閱<a href="/docs/zh-hant/trie.md">TRIE</a>。</li>
<li><strong>NGRAM</strong>：一種可加速 VARCHAR 欄位上 LIKE 及正規表達式篩選的索引。詳細資訊請參閱<a href="/docs/zh-hant/ngram.md">NGRAM</a>。</li>
<li><strong>FMINDEX</strong>：適用於 VARCHAR 欄位的精確位元組級子字串索引。詳細資訊請參閱<a href="/docs/zh-hant/fmindex.md">FMINDEX</a>。</li>
<li><strong>RTREE</strong>：適用於 GEOMETRY 欄位的索引。詳細資訊請參閱<a href="/docs/zh-hant/rtree.md">RTREE</a>。</li>
</ul></li>
</ul></li>
<li><strong>CreateIndexReq</strong>
在指定的集合中建立索引。
<ul>
<li><strong>collectionName</strong>(<em>字串</em>)
要為其建立索引的集合名稱。</li>
<li><strong>indexParams</strong>(<em>清單<IndexParam></em>)
包含索引設定的 IndexParam 物件清單。</li>
</ul></li>
</ul>
</div>
<div class="language-javascript">
<p><strong>方法與參數</strong></p>
<ul>
<li><p><strong>createIndex</strong></p>
<p>在指定的集合中建立索引。</p>
<ul>
<li><strong>collection_name</strong>(<em>字串</em>)
要為其建立索引的集合名稱。</li>
<li><strong>field_name</strong>(<em>字串</em>)
要建立索引的標量欄位名稱。</li>
<li><strong>index_name</strong>(<em>字串</em>)
要建立的標量索引名稱。每個標量欄位僅支援一個索引。</li>
<li><strong>index_type</strong>(<em>字串</em>)
要建立的標量索引類型。若為隱式索引，請留空或省略此參數。
若為自訂索引，有效值如下：
<ul>
<li><strong>INVERTED</strong>：（建議）反向索引由一個術語字典組成，其中包含所有經分詞處理且按字母順序排序的單字。詳細資訊請參閱「<a href="/docs/zh-hant/scalar_index.md">標量索引</a>」。</li>
<li><strong>BITMAP</strong>：一種索引類型，用於儲存欄位中所有唯一值的位圖。詳細資訊請參閱「<a href="/docs/zh-hant/bitmap.md">BITMAP</a>」。</li>
<li><strong>STL_SORT</strong>：使用標準範本函式庫 (STL) 的排序演算法對標量欄位進行排序。支援數值型、VARCHAR 及 TIMESTAMPTZ 欄位。詳細資訊請參閱「<a href="/docs/zh-hant/stl-sort.md">STL_SORT</a>」。</li>
<li><strong>TRIE</strong>：一種用於快速前綴搜尋與檢索的樹狀資料結構。支援 VARCHAR 欄位。詳情請參閱<a href="/docs/zh-hant/trie.md">TRIE</a>。</li>
<li><strong>NGRAM</strong>：一種可加速 VARCHAR 欄位上 LIKE 及正規表達式篩選的索引。詳細資訊請參閱<a href="/docs/zh-hant/ngram.md">NGRAM</a>。</li>
<li><strong>FMINDEX</strong>：適用於 VARCHAR 欄位的精確位元組級子字串索引。詳細資訊請參閱<a href="/docs/zh-hant/fmindex.md">FMINDEX</a>。</li>
<li><strong>RTREE</strong>：適用於 GEOMETRY 欄位的索引。詳情請參閱<a href="/docs/zh-hant/rtree.md">RTREE</a>。</li>
</ul></li>
</ul></li>
</ul>
</div>
<h2 id="Verifying-the-result" class="common-anchor-header">驗證結果<button data-href="#Verifying-the-result" class="anchor-icon" translate="no">
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
<p>使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/list_indexes.md"><code translate="no">list_indexes()</code></a> 方法來驗證標量索引是否已建立：</p>
</div>
<div class="language-java">
<p>使用<code translate="no">listIndexes()</code> 方法來驗證標量索引的建立：</p>
</div>
<div class="language-javascript">
<p>使用<code translate="no">listIndexes()</code> 方法來驗證標量索引的建立：</p>
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
