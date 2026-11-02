---
id: index-structarray-fields.md
title: 為 StructArray 欄位建立索引
summary: >-
  在執行向量搜尋或加速標量篩選之前，請先在 StructArray 的子欄位上建立索引。對於 StructArray 欄位而言，索引目標為子欄位路徑，例如
  chunks[emb_list_vector]、chunks[emb] 或 chunks[section]。
---
<h1 id="Index-StructArray-Fields" class="common-anchor-header">為 StructArray 欄位建立索引<button data-href="#Index-StructArray-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>在執行向量搜尋或加速標量篩選之前，請先在 StructArray 子欄位上建立索引。對於 StructArray 欄位，索引目標為子欄位路徑，例如<code translate="no">chunks[emb_list_vector]</code> 、<code translate="no">chunks[emb]</code> 或<code translate="no">chunks[section]</code> 。</p>
<p>本頁使用《<a href="/docs/zh-hant/create-structarray-field.md">建立 StructArray 欄位</a>》中的<code translate="no">tech_articles</code> 集合。<code translate="no">chunks</code> StructArray 欄位包含用於篩選的標量子欄位，以及用於搜尋的向量子欄位。</p>
<h2 id="Before-you-begin" class="common-anchor-header">開始之前<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>請確保集合模式中已包含<code translate="no">chunks</code> StructArray 欄位。請重複使用「<a href="/docs/zh-hant/create-structarray-field.md">建立 StructArray 欄位</a>」中針對您所選語言所建立的已初始化客戶端（Go 語言請參閱<code translate="no">cli</code> 和<code translate="no">ctx</code> ，其他 SDK 請參閱<code translate="no">client</code> ）。您可以在插入資料之前建立索引。</p>
<table>
<thead>
<tr><th>子欄位路徑</th><th>類型</th><th>索引用途</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>使用<code translate="no">MAX_SIM*</code> 指標進行 EmbeddingList 搜尋。</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>使用常規向量指標進行元素層級搜尋。</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td><code translate="no">VARCHAR</code></td><td>類別篩選。</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td><code translate="no">FLOAT</code></td><td>數值篩選與範圍式謂詞。</td></tr>
<tr><td><code translate="no">chunks[has_code]</code></td><td><code translate="no">BOOL</code></td><td>布林篩選。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>向量欄位或向量子欄位僅接受一個索引。若您同時需要 EmbeddingList 搜尋與元素層級搜尋，請建立兩個獨立的向量子欄位，並分別為其建立索引。在此頁面中，<code translate="no">chunks[emb_list_vector]</code> 已建立索引以供 EmbeddingList 搜尋使用，而<code translate="no">chunks[emb]</code> 則已建立索引以供元素層級搜尋使用。</p>
</div>
<h2 id="Choose-indexes" class="common-anchor-header">選擇索引<button data-href="#Choose-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>請使用搜尋模式來選擇向量度量家族。</p>
<table>
<thead>
<tr><th>搜尋或篩選目標</th><th>目標路徑</th><th>應如何選擇</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingList 搜尋</td><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">MAX_SIM*</code> 度量族。</td></tr>
<tr><td>元素層級向量搜尋</td><td><code translate="no">chunks[emb]</code></td><td>常規向量度量族，例如<code translate="no">COSINE</code> 、<code translate="no">IP</code> 或<code translate="no">L2</code> 。</td></tr>
<tr><td>依字串或類別篩選</td><td><code translate="no">chunks[section]</code></td><td>目標所支援的標量索引。</td></tr>
<tr><td>依數值範圍篩選</td><td><code translate="no">chunks[quality_score]</code>,<code translate="no">chunks[page]</code></td><td>目標所支援的標量索引。</td></tr>
<tr><td>依布林值篩選</td><td><code translate="no">chunks[has_code]</code></td><td>您的目標所支援的標量索引。</td></tr>
</tbody>
</table>
<p>「嵌入清單」搜尋會將 StructArray 向量子欄位中的向量視為嵌入清單，並回傳實體層級的結果。「元素層級」搜尋則會獨立搜尋每個 Struct 元素，並可回傳匹配元素的偏移量。</p>
<h2 id="Create-vector-indexes" class="common-anchor-header">建立向量索引<button data-href="#Create-vector-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>以下範例建立兩個向量索引。第一個索引使用<code translate="no">MAX_SIM*</code> 度量進行 EmbeddingList 搜尋；第二個索引則使用一般向量度量進行元素層級搜尋。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

<span class="hljs-comment"># Index for EmbeddingList search.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span>,
    },
)

<span class="hljs-comment"># Index for element-level search.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span>,
    },
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Map;

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
                        .indexType(IndexParam.IndexType.HNSW)
                        .metricType(IndexParam.MetricType.MAX_SIM_COSINE)
                        .indexName(<span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>)
                        .extraParams(Map.of(<span class="hljs-string">&quot;M&quot;</span>, <span class="hljs-number">16</span>, <span class="hljs-string">&quot;efConstruction&quot;</span>, <span class="hljs-number">200</span>))
                        .build(),
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
                        .indexType(IndexParam.IndexType.HNSW)
                        .metricType(IndexParam.MetricType.COSINE)
                        .indexName(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>)
                        .extraParams(Map.of(<span class="hljs-string">&quot;M&quot;</span>, <span class="hljs-number">16</span>, <span class="hljs-string">&quot;efConstruction&quot;</span>, <span class="hljs-number">200</span>))
                        .build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>, index.NewHNSWIndex(entity.MaxSimCosine, <span class="hljs-number">16</span>, <span class="hljs-number">200</span>)).WithIndexName(<span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[emb]&quot;</span>, index.NewHNSWIndex(entity.COSINE, <span class="hljs-number">16</span>, <span class="hljs-number">200</span>)).WithIndexName(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_params</span>(<span class="hljs-built_in">vec!</span>[
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Hnsw)
                .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::MaxSimCosine)
                .<span class="hljs-title function_ invoke__">extra_params</span>(std::collections::HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;M&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;16&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()), (<span class="hljs-string">&quot;efConstruction&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;200&quot;</span>.<span class="hljs-title function_ invoke__">into</span>())])),
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Hnsw)
                .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Cosine)
                .<span class="hljs-title function_ invoke__">extra_params</span>(std::collections::HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;M&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;16&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()), (<span class="hljs-string">&quot;efConstruction&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;200&quot;</span>.<span class="hljs-title function_ invoke__">into</span>())])),
        ])
        .<span class="hljs-title function_ invoke__">build</span>()?;
client.<span class="hljs-title function_ invoke__">create_index</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">emb_list_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>, <span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>,
    milvus::IndexType::HNSW, milvus::MetricType::MAX_SIM_COSINE)</span></span>;
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">emb_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[emb]&quot;</span>, <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
    milvus::IndexType::HNSW, milvus::MetricType::COSINE)</span></span>;

emb_list_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;M&quot;</span>, <span class="hljs-string">&quot;16&quot;</span>);
emb_list_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;efConstruction&quot;</span>, <span class="hljs-string">&quot;200&quot;</span>);
emb_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;M&quot;</span>, <span class="hljs-string">&quot;16&quot;</span>);
emb_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;efConstruction&quot;</span>, <span class="hljs-string">&quot;200&quot;</span>);

milvus::CreateIndexRequest vector_request;
vector_request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>);
vector_request.<span class="hljs-built_in">WithIndexes</span>({emb_list_index, emb_index});

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(vector_request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;HNSW&quot;</span>,
  <span class="hljs-attr">params</span>: { <span class="hljs-attr">M</span>: <span class="hljs-number">16</span>, <span class="hljs-attr">efConstruction</span>: <span class="hljs-number">200</span> },
  <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;HNSW&quot;</span>,
  <span class="hljs-attr">params</span>: { <span class="hljs-attr">M</span>: <span class="hljs-number">16</span>, <span class="hljs-attr">efConstruction</span>: <span class="hljs-number">200</span> },
  <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    Indexes = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>, <span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>, IndexType.Hnsw, MetricType.MaxSimCosine) { ExtraParams = { [<span class="hljs-string">&quot;M&quot;</span>] = <span class="hljs-number">16</span>, [<span class="hljs-string">&quot;efConstruction&quot;</span>] = <span class="hljs-number">200</span> } },
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[emb]&quot;</span>, <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>, IndexType.Hnsw, MetricType.Cosine) { ExtraParams = { [<span class="hljs-string">&quot;M&quot;</span>] = <span class="hljs-number">16</span>, [<span class="hljs-string">&quot;efConstruction&quot;</span>] = <span class="hljs-number">200</span> } }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;chunks[emb_list_vector]&quot;,
            &quot;indexName&quot;: &quot;chunks_emb_list_max_sim&quot;,
            &quot;metricType&quot;: &quot;MAX_SIM_COSINE&quot;,
            &quot;params&quot;: { &quot;index_type&quot;: &quot;HNSW&quot;, &quot;M&quot;: &quot;16&quot;, &quot;efConstruction&quot;: &quot;200&quot; }
        },
        {
            &quot;fieldName&quot;: &quot;chunks[emb]&quot;,
            &quot;indexName&quot;: &quot;chunks_emb_cosine&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;params&quot;: { &quot;index_type&quot;: &quot;HNSW&quot;, &quot;M&quot;: &quot;16&quot;, &quot;efConstruction&quot;: &quot;200&quot; }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>警告
請勿在同一個向量子欄位上建立「<code translate="no">MAX_SIM*</code> 」索引與一般向量度量索引。若需同時使用這兩種搜尋模式，請將向量寫入兩個不同的向量子欄位，並分別針對每個子欄位建立一個索引。</p>
</div>
<h2 id="Create-scalar-indexes" class="common-anchor-header">建立標量索引<button data-href="#Create-scalar-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>當您在篩選器中使用 StructArray 標量子欄位時，請為其建立標量索引。請使用相同的<code translate="no">structArray[subfield]</code> 路徑語法。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[section]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_section_inverted&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>,
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[page]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_page_sort&quot;</span>,
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Arrays;

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[section]&quot;</span>).indexType(IndexParam.IndexType.INVERTED)
                        .indexName(<span class="hljs-string">&quot;chunks_section_inverted&quot;</span>).build(),
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[has_code]&quot;</span>).indexType(IndexParam.IndexType.INVERTED)
                        .indexName(<span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>).build(),
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>).indexType(IndexParam.IndexType.STL_SORT)
                        .indexName(<span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>).build(),
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[page]&quot;</span>).indexType(IndexParam.IndexType.STL_SORT)
                        .indexName(<span class="hljs-string">&quot;chunks_page_sort&quot;</span>).build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, index.NewInvertedIndex()).WithIndexName(<span class="hljs-string">&quot;chunks_section_inverted&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[has_code]&quot;</span>, index.NewInvertedIndex()).WithIndexName(<span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, index.NewSortedIndex()).WithIndexName(<span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, index.NewSortedIndex()).WithIndexName(<span class="hljs-string">&quot;chunks_page_sort&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_params</span>(<span class="hljs-built_in">vec!</span>[
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[section]&quot;</span>).<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_section_inverted&quot;</span>).<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Inverted),
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[has_code]&quot;</span>).<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>).<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Inverted),
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>).<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>).<span class="hljs-title function_ invoke__">index_type</span>(IndexType::StlSort),
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[page]&quot;</span>).<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_page_sort&quot;</span>).<span class="hljs-title function_ invoke__">index_type</span>(IndexType::StlSort),
        ])
        .<span class="hljs-title function_ invoke__">build</span>()?;
client.<span class="hljs-title function_ invoke__">create_index</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">section_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks_section_inverted&quot;</span>,
    milvus::IndexType::INVERTED)</span></span>;
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">has_code_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[has_code]&quot;</span>, <span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>,
    milvus::IndexType::INVERTED)</span></span>;
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">quality_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, <span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>,
    milvus::IndexType::STL_SORT)</span></span>;
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">page_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks_page_sort&quot;</span>,
    milvus::IndexType::STL_SORT)</span></span>;

milvus::CreateIndexRequest scalar_request;
scalar_request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>);
scalar_request.<span class="hljs-built_in">WithIndexes</span>({section_index, has_code_index, quality_index, page_index});

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(scalar_request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[section]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_section_inverted&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;STL_SORT&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[page]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_page_sort&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;STL_SORT&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    Indexes = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks_section_inverted&quot;</span>, IndexType.Inverted),
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[has_code]&quot;</span>, <span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>, IndexType.Inverted),
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, <span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>, IndexType.StlSort),
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks_page_sort&quot;</span>, IndexType.StlSort)
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;indexParams&quot;: [
        { &quot;fieldName&quot;: &quot;chunks[section]&quot;, &quot;indexName&quot;: &quot;chunks_section_inverted&quot;, &quot;params&quot;: { &quot;index_type&quot;: &quot;INVERTED&quot; } },
        { &quot;fieldName&quot;: &quot;chunks[has_code]&quot;, &quot;indexName&quot;: &quot;chunks_has_code_inverted&quot;, &quot;params&quot;: { &quot;index_type&quot;: &quot;INVERTED&quot; } },
        { &quot;fieldName&quot;: &quot;chunks[quality_score]&quot;, &quot;indexName&quot;: &quot;chunks_quality_score_sort&quot;, &quot;params&quot;: { &quot;index_type&quot;: &quot;STL_SORT&quot; } },
        { &quot;fieldName&quot;: &quot;chunks[page]&quot;, &quot;indexName&quot;: &quot;chunks_page_sort&quot;, &quot;params&quot;: { &quot;index_type&quot;: &quot;STL_SORT&quot; } }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>標量索引雖屬選用，但在 StructArray 標量子欄位頻繁出現在篩選器中時（例如<code translate="no">element_filter(chunks, $[quality_score] &gt; 0.9)</code> 或<code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code> ），此功能相當實用。</p>
<h2 id="Applicable-metric-types" class="common-anchor-header">適用指標類型<button data-href="#Applicable-metric-types" class="anchor-icon" translate="no">
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
    </button></h2><p>針對 EmbeddingList 搜尋，請選擇與向量間比較對應的<code translate="no">MAX_SIM*</code> 指標：<code translate="no">MAX_SIM_COSINE</code> （亦稱為<code translate="no">MAX_SIM</code> ）、<code translate="no">MAX_SIM_IP</code> 或<code translate="no">MAX_SIM_L2</code> （適用於密集向量），以及<code translate="no">MAX_SIM_HAMMING</code> 或<code translate="no">MAX_SIM_JACCARD</code> （適用於二進位向量）。這些指標會比較嵌入清單，並返回實體層級的結果。若要進行元素層級搜尋，請使用下方列出的對應常規指標。</p>
<h2 id="Index-metric-compatibility" class="common-anchor-header">索引指標相容性<button data-href="#Index-metric-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>請參閱以下表格，為 StructArray 向量子欄位選擇索引類型與度量類型。請先確定目標，再根據搜尋模式選擇度量家族。</p>
<p>請從以下相容性表格中選擇 Milvus 索引類型與度量類型。</p>
<h3 id="EmbeddingList-search" class="common-anchor-header">EmbeddingList 搜尋<button data-href="#EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h3><p>EmbeddingList 搜尋使用<code translate="no">MAX_SIM*</code> 指標。它將 StructArray 向量子欄位中的向量視為嵌入清單，並返回實體層級的結果。</p>
<table>
<thead>
<tr><th>向量子欄位資料型別</th><th>索引類型</th><th>度量類型</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">FLOAT_VECTOR</code>,<code translate="no">FLOAT16_VECTOR</code>,<code translate="no">BFLOAT16_VECTOR</code></td><td><code translate="no">IVF_FLAT</code>,<code translate="no">IVF_FLAT_CC</code>,<code translate="no">HNSW</code>,<code translate="no">HNSW_SQ</code>,<code translate="no">HNSW_PQ</code>,<code translate="no">HNSW_PRQ</code>,<code translate="no">DISKANN</code></td><td><code translate="no">MAX_SIM</code>,<code translate="no">MAX_SIM_COSINE</code>,<code translate="no">MAX_SIM_IP</code>,<code translate="no">MAX_SIM_L2</code></td></tr>
<tr><td><code translate="no">INT8_VECTOR</code></td><td><code translate="no">HNSW</code>,<code translate="no">HNSW_SQ</code>,<code translate="no">HNSW_PQ</code>,<code translate="no">HNSW_PRQ</code></td><td><code translate="no">MAX_SIM</code>,<code translate="no">MAX_SIM_COSINE</code>,<code translate="no">MAX_SIM_IP</code>,<code translate="no">MAX_SIM_L2</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HNSW</code></td><td><code translate="no">MAX_SIM_HAMMING</code>,<code translate="no">MAX_SIM_JACCARD</code></td></tr>
</tbody>
</table>
<h3 id="Element-level-search" class="common-anchor-header">元素層級搜尋<button data-href="#Element-level-search" class="anchor-icon" translate="no">
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
    </button></h3><p>元素層級搜尋採用標準向量度量。它會獨立搜尋每個 Struct 元素，並能回傳匹配元素的偏移量。</p>
<table>
<thead>
<tr><th>向量子欄位資料型別</th><th>索引類型</th><th>度量類型</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">FLOAT_VECTOR</code>,<code translate="no">FLOAT16_VECTOR</code>,<code translate="no">BFLOAT16_VECTOR</code></td><td><code translate="no">FLAT</code>,<code translate="no">IVF_FLAT</code>,<code translate="no">IVF_FLAT_CC</code>,<code translate="no">IVF_SQ8</code>,<code translate="no">IVF_SQ_CC</code>,<code translate="no">IVF_PQ</code>,<code translate="no">SCANN</code>,<code translate="no">IVF_RABITQ</code>,<code translate="no">IVF_RABITQ_FASTSCAN</code>,<code translate="no">HNSW</code>,<code translate="no">HNSW_SQ</code>,<code translate="no">HNSW_PQ</code>,<code translate="no">HNSW_PRQ</code>,<code translate="no">DISKANN</code></td><td><code translate="no">L2</code>,<code translate="no">IP</code>,<code translate="no">COSINE</code></td></tr>
<tr><td><code translate="no">INT8_VECTOR</code></td><td><code translate="no">HNSW</code>,<code translate="no">HNSW_SQ</code>,<code translate="no">HNSW_PQ</code>,<code translate="no">HNSW_PRQ</code></td><td><code translate="no">L2</code>,<code translate="no">IP</code>,<code translate="no">COSINE</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HNSW</code></td><td><code translate="no">HAMMING</code>,<code translate="no">JACCARD</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">BIN_FLAT</code></td><td><code translate="no">HAMMING</code>,<code translate="no">JACCARD</code>,<code translate="no">SUBSTRUCTURE</code>,<code translate="no">SUPERSTRUCTURE</code>,<code translate="no">MHJACCARD</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">BIN_IVF_FLAT</code></td><td><code translate="no">HAMMING</code>,<code translate="no">JACCARD</code></td></tr>
</tbody>
</table>
<p>有關特定版本的支援及其他限制，請參閱《<a href="/docs/zh-hant/structarray-limits.md">StructArray 限制</a>》。</p>
<h2 id="Verify-indexes" class="common-anchor-header">驗證索引<button data-href="#Verify-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>建立索引後，請描述集合或清單索引，以確認預期的子欄位路徑已建立索引。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">indexes = client.list_indexes(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
)

<span class="hljs-built_in">print</span>(indexes)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.ListIndexesReq;
<span class="hljs-keyword">import</span> java.util.List;

List&lt;String&gt; indexes = client.listIndexes(ListIndexesReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .build());
System.out.println(indexes);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

indexes, err := cli.ListIndexes(ctx, milvusclient.NewListIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Println(indexes)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = client.<span class="hljs-title function_ invoke__">list_indexes</span>(ListIndexesRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>).<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, resp.<span class="hljs-title function_ invoke__">index_names</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

milvus::ListIndexesResponse list_resp;
status = client-&gt;<span class="hljs-built_in">ListIndexes</span>(milvus::<span class="hljs-built_in">ListIndexesRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>),
                            list_resp);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; name : list_resp.<span class="hljs-built_in">IndexNames</span>()) {
    std::cout &lt;&lt; name &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexes = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listIndexes</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(indexes);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;

<span class="hljs-keyword">var</span> indexes = <span class="hljs-keyword">await</span> client.ListIndexesAsync(<span class="hljs-keyword">new</span> ListIndexesReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>
});
Console.WriteLine(<span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;, &quot;</span>, indexes.IndexNames));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/list&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在建立上述向量索引與標量索引後，清單回應應包含以下名稱（順序不限）。格式取決於 SDK：</p>
<pre><code translate="no" class="language-plaintext">chunks_emb_list_max_sim
chunks_emb_cosine
chunks_section_inverted
chunks_has_code_inverted
chunks_quality_score_sort
chunks_page_sort
<button class="copy-code-btn"></button></code></pre>
<p>描述上方建立的 `<code translate="no">chunks_emb_cosine</code> ` 索引，以檢查其目標欄位與設定。各 SDK 的回應結構與顯示格式各不相同。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index = client.describe_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
)

<span class="hljs-built_in">print</span>(index)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DescribeIndexReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.response.DescribeIndexResp;

<span class="hljs-type">DescribeIndexResp</span> <span class="hljs-variable">index</span> <span class="hljs-operator">=</span> client.describeIndex(DescribeIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .indexName(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>)
        .build());
System.out.println(index);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

indexDesc, err := cli.DescribeIndex(ctx, milvusclient.NewDescribeIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Println(indexDesc.IndexType())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = client.<span class="hljs-title function_ invoke__">describe_index</span>(DescribeIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>).<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>).<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;
<span class="hljs-keyword">for</span> <span class="hljs-variable">description</span> <span class="hljs-keyword">in</span> resp.<span class="hljs-title function_ invoke__">indexes</span>() {
    <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, description);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

milvus::DescribeIndexResponse desc_resp;
status = client-&gt;<span class="hljs-built_in">DescribeIndex</span>(milvus::<span class="hljs-built_in">DescribeIndexRequest</span>()
                                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                   .<span class="hljs-built_in">WithIndexName</span>(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>),
                               desc_resp);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; desc : desc_resp.<span class="hljs-built_in">Descs</span>()) {
    std::cout &lt;&lt; desc.<span class="hljs-built_in">FieldName</span>() &lt;&lt; <span class="hljs-string">&quot;: &quot;</span> &lt;&lt; desc.<span class="hljs-built_in">IndexName</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(index);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;

<span class="hljs-keyword">var</span> index = <span class="hljs-keyword">await</span> client.DescribeIndexAsync(<span class="hljs-keyword">new</span> DescribeIndexReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    IndexName = <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>
});
<span class="hljs-keyword">foreach</span> (<span class="hljs-keyword">var</span> description <span class="hljs-keyword">in</span> index.Indexes)
{
    Console.WriteLine(<span class="hljs-string">$&quot;<span class="hljs-subst">{description.FieldName}</span>: <span class="hljs-subst">{description.IndexName}</span>&quot;</span>);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;indexName&quot;: &quot;chunks_emb_cosine&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>清單回應包含索引名稱；描述回應則會標示<code translate="no">chunks[emb]</code> 及其索引設定。使用前請先檢查回應或狀態碼是否有錯誤。</p>
<h2 id="Index-rules" class="common-anchor-header">索引規則<button data-href="#Index-rules" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>規則</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td>子欄位索引請使用路徑語法。</td><td>請索引<code translate="no">chunks[emb]</code> ，而非<code translate="no">emb</code> 或<code translate="no">chunks.emb</code> 。</td></tr>
<tr><td>一個向量子欄位僅接受一個索引。</td><td>若需使用不同的指標家族，請使用獨立的向量子欄位。</td></tr>
<tr><td>請使用<code translate="no">MAX_SIM*</code> 指標進行 EmbeddingList 搜尋。</td><td>EmbeddingList 查詢資料需要使用<code translate="no">MAX_SIM*</code> 度量建立的索引。</td></tr>
<tr><td>請使用一般向量指標進行元素層級搜尋。</td><td>元素層級搜尋使用一般向量查詢資料，以及諸如<code translate="no">COSINE</code> 、<code translate="no">IP</code> 或<code translate="no">L2</code> 等指標。</td></tr>
<tr><td>請為出現在篩選器中的標量子欄位建立索引。</td><td>請使用目標所支援的標量索引類型。</td></tr>
<tr><td>請留意向量欄位的限制。</td><td>向量欄位和向量子欄位的總數受到限制。在新增大量向量子欄位之前，請參閱《StructArray 限制》。</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">常見錯誤<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>在 `<code translate="no">chunks.emb</code> ` 上建立索引，而非在 `<code translate="no">chunks[emb]</code>` 上建立索引。</p></li>
<li><p>僅建立<code translate="no">MAX_SIM*</code> 索引，然後嘗試在同一子場上執行元素層級搜尋。</p></li>
<li><p>僅建立一般向量索引，隨後卻嘗試在同一子場上執行 EmbeddingList 搜尋。</p></li>
<li><p>將同一個向量子欄位同時用於<code translate="no">MAX_SIM*</code> 和一般向量指標。</p></li>
<li><p>遺漏針對使用頻率極高的 StructArray 篩選條件所建立的標量索引。</p></li>
<li><p>為 Struct 模式中不存在的 StructArray 子欄位建立索引。</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">下一步<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>若要執行實體層級的 EmbeddingList 搜尋或元素層級的向量搜尋，請參閱《<a href="/docs/zh-hant/basic-vector-search-with-structarray.md">使用 StructArray 進行基本向量搜尋</a>》。</p></li>
<li><p>若要在搜尋過程中篩選 StructArray 的標量子欄位，請參閱《<a href="/docs/zh-hant/filtered-search-with-structarray.md">使用 StructArray 進行篩選搜尋</a>》。</p></li>
<li><p>若要檢視索引和指標限制，請參閱《<a href="/docs/zh-hant/structarray-limits.md">StructArray 限制》</a>。</p></li>
</ol>
