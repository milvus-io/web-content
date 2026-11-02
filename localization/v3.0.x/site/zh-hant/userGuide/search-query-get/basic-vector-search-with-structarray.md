---
id: basic-vector-search-with-structarray.md
title: 使用 StructArray 進行基本向量搜尋
summary: >-
  請使用此頁面，對 StructArray 欄位內的向量子欄位執行向量搜尋。StructArray
  支援兩種基本的向量搜尋模式：嵌入清單搜尋（EmbeddingList
  search），此模式會對儲存於每個實體中的嵌入清單進行評分；以及元素層級搜尋，此模式會獨立搜尋每個 Struct 元素。
---
<h1 id="Basic-Vector-Search-with-StructArray" class="common-anchor-header">使用 StructArray 進行基本向量搜尋<button data-href="#Basic-Vector-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>請使用此頁面對 StructArray 欄位內的向量子欄位執行向量搜尋。StructArray 支援兩種基本向量搜尋模式：嵌入清單搜尋（EmbeddingList search），此模式會對儲存於每個實體中的嵌入清單進行評分；以及元素層級搜尋，此模式會獨立搜尋每個 Struct 元素。</p>
<p>本頁面使用<a href="/docs/zh-hant/create-structarray-field.md">《建立 StructArray 欄位</a>》中的<code translate="no">tech_articles</code> 集合。該集合包含一個名為<code translate="no">chunks</code> 的 StructArray 欄位。每個區塊包含文字、標量元數據、一個名為<code translate="no">emb_list_vector</code> 的向量子欄位（其索引用於 EmbeddingList 搜尋），以及一個名為<code translate="no">emb</code> 的向量子欄位（其索引用於元素層級搜尋）。</p>
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
    </button></h2><p>請確保集合的架構、資料及索引均已準備就緒。範例向量具有四個維度。每個搜尋範例都會初始化一個客戶端，並在搜尋前等待<code translate="no">tech_articles</code> 載入完成。若使用 cURL，請安裝<code translate="no">jq</code> 以檢查載入狀態回應。</p>
<table>
<thead>
<tr><th>需求</th><th>準備位置</th></tr>
</thead>
<tbody>
<tr><td>建立一個 StructArray 欄位，例如<code translate="no">chunks</code> 。</td><td><a href="/docs/zh-hant/create-structarray-field.md">建立 StructArray 欄位</a></td></tr>
<tr><td>插入其<code translate="no">chunks</code> 欄位包含 Struct 物件的實體。</td><td><a href="/docs/zh-hant/insert-data-into-structarray-fields.md">將資料插入 StructArray 欄位</a></td></tr>
<tr><td>在<code translate="no">chunks[emb_list_vector]</code> 上建立<code translate="no">MAX_SIM*</code> 索引，以便進行EmbeddingList搜尋。</td><td><a href="/docs/zh-hant/index-structarray-fields.md">為 StructArray 欄位建立索引</a></td></tr>
<tr><td>在 `<code translate="no">chunks[emb]</code> ` 上建立常規向量度量索引，以供元素層級搜尋使用。</td><td><a href="/docs/zh-hant/index-structarray-fields.md">為 StructArray 欄位建立索引</a></td></tr>
</tbody>
</table>
<div class="alert note">
<p>警告</p>
<p>向量欄位或向量子欄位僅接受一個索引。若您同時需要 EmbeddingList 搜尋與元素層級搜尋，請建立兩個獨立的向量子欄位。在此頁面中，<code translate="no">chunks[emb_list_vector]</code> 已建立索引以供 EmbeddingList 搜尋使用，而<code translate="no">chunks[emb]</code> 則已建立索引以供元素層級搜尋使用。</p>
</div>
<h2 id="Choose-a-search-mode" class="common-anchor-header">選擇搜尋模式<button data-href="#Choose-a-search-mode" class="anchor-icon" translate="no">
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
<tr><th>方面</th><th>EmbeddingList 搜尋</th><th>元素層級搜尋</th></tr>
</thead>
<tbody>
<tr><td>目標子欄位</td><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>查詢資料</td><td>一個包含一個或多個向量的嵌入清單。</td><td>一個常規向量。</td></tr>
<tr><td>度量族</td><td><code translate="no">MAX_SIM*</code>，例如<code translate="no">MAX_SIM_COSINE</code> 。</td><td>常規向量度量，例如<code translate="no">COSINE</code> 、<code translate="no">IP</code> 或<code translate="no">L2</code> 。</td></tr>
<tr><td>一個搜尋結果代表什麼</td><td>一個與查詢嵌入清單相似的 StructArray 向量子欄位的匹配實體。</td><td>StructArray 欄位內的一個匹配 Struct 元素。</td></tr>
<tr><td>結果的粒度</td><td>實體層級。</td><td>Struct 元素層級。</td></tr>
<tr><td>偏移量</td><td>不適用。</td><td>識別在返回時，匹配的結構體元素以零為起點的位置。</td></tr>
<tr><td>典型用途</td><td>ColBERT、ColPali 及其他後期交互檢索模式。</td><td>塊級、段落級、片段級、補丁級或事實級檢索。</td></tr>
</tbody>
</table>
<h2 id="Run-EmbeddingList-search" class="common-anchor-header">執行 EmbeddingList 搜尋<button data-href="#Run-EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h2><p>當查詢本身包含多個向量，且目標 StructArray 向量子欄位採用<code translate="no">MAX_SIM*</code> 度量進行索引時，請使用 EmbeddingList 搜尋。搜尋結果為實體層級的匹配。</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

client.load_collection(collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>)

query = EmbeddingList()
query.add([<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
query.add([<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>])

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;doc_id&quot;</span>], hit[<span class="hljs-string">&quot;distance&quot;</span>], hit[<span class="hljs-string">&quot;entity&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddingList;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

client.loadCollection(LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .build());

<span class="hljs-type">EmbeddingList</span> <span class="hljs-variable">query</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddingList</span>();
query.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.12f</span>, <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.44f</span>)));
query.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span>)));

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .annsField(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
        .data(Collections.singletonList(query))
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>))
        .build());

<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; hits : resp.getSearchResults()) {
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult hit : hits) {
        System.out.println(hit.getId() + <span class="hljs-string">&quot; &quot;</span> + hit.getScore() + <span class="hljs-string">&quot; &quot;</span> + hit.getEntity());
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

loadTask, err := cli.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;tech_articles&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">if</span> err := loadTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

query := entity.FloatVectorArray{
    {<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>},
    {<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>},
}

results, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-number">3</span>,
    []entity.Vector{query},
).WithANNSField(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>).WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

<span class="hljs-keyword">for</span> _, result := <span class="hljs-keyword">range</span> results {
    <span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; result.ResultCount; i++ {
        id, err := result.IDs.Get(i)
        <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-built_in">panic</span>(err) }
        fmt.Println(id, result.Scores[i])
        <span class="hljs-keyword">for</span> _, field := <span class="hljs-keyword">range</span> result.Fields {
            value, err := field.Get(i)
            <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-built_in">panic</span>(err) }
            fmt.Println(field.Name(), value)
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

client.<span class="hljs-title function_ invoke__">load_collection</span>(LoadCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
    .<span class="hljs-title function_ invoke__">sync</span>(<span class="hljs-literal">true</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query</span> = EmbeddingList::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">vectors</span>(<span class="hljs-built_in">vec!</span>[
    <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>],
    <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>],
]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">EmbeddingLists</span>(<span class="hljs-built_in">vec!</span>[query]))
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>])
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">3</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">for</span> <span class="hljs-variable">result</span> <span class="hljs-keyword">in</span> response.<span class="hljs-title function_ invoke__">results</span>() {
    <span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> result.<span class="hljs-title function_ invoke__">rows</span>()? {
        <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, row.<span class="hljs-title function_ invoke__">to_entity_row</span>()?);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

status = client-&gt;<span class="hljs-built_in">LoadCollection</span>(milvus::<span class="hljs-built_in">LoadCollectionRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>).<span class="hljs-built_in">WithSync</span>(<span class="hljs-literal">true</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) { <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>()); }

milvus::EmbeddingList query;
query.<span class="hljs-built_in">AddFloatVector</span>({<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>});
query.<span class="hljs-built_in">AddFloatVector</span>({<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>});

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
                   .<span class="hljs-built_in">AddEmbeddingList</span>(std::<span class="hljs-built_in">move</span>(query))
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;title&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;category&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[text]&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[section]&quot;</span>);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">auto</span>&amp; result : response.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    milvus::EntityRows output_rows;
    status = result.<span class="hljs-built_in">OutputRows</span>(output_rows);
    <span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) { <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>()); }
    <span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows) {
        std::cout &lt;&lt; row &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span> });

<span class="hljs-keyword">const</span> query = [
  [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>],
  [<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>],
];

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: query,
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [
    <span class="hljs-string">&quot;doc_id&quot;</span>,
    <span class="hljs-string">&quot;title&quot;</span>,
    <span class="hljs-string">&quot;category&quot;</span>,
    <span class="hljs-string">&quot;chunks[text]&quot;</span>,
    <span class="hljs-string">&quot;chunks[section]&quot;</span>,
  ],
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(results.<span class="hljs-property">results</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System;
<span class="hljs-keyword">using</span> System.Linq;
<span class="hljs-keyword">using</span> System.Text.Json;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">await</span> client.LoadCollectionAsync(<span class="hljs-keyword">new</span> LoadCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    Sync = <span class="hljs-literal">true</span>
});

<span class="hljs-keyword">var</span> query = <span class="hljs-keyword">new</span> EmbeddingList();
query.Add(<span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.12f</span>, <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.44f</span> }));
query.Add(<span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span> }));

SearchResp results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    EmbeddingLists = <span class="hljs-keyword">new</span>[] { query },
    Limit = <span class="hljs-number">3</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span> }
    }
});
<span class="hljs-keyword">foreach</span> (<span class="hljs-keyword">var</span> result <span class="hljs-keyword">in</span> results.SingleResults!)
{
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">int</span> i = <span class="hljs-number">0</span>; i &lt; result.Scores.Count; i++)
        Console.WriteLine(JsonSerializer.Serialize(result.GetRow(i)));
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">set</span> -euo pipefail

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --fail-with-body --silent --show-error --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{&quot;collectionName&quot;:&quot;tech_articles&quot;}&#x27;</span> | jq -e <span class="hljs-string">&#x27;.code == 0&#x27;</span> &gt;/dev/null

loaded=<span class="hljs-literal">false</span>
<span class="hljs-keyword">for</span> attempt <span class="hljs-keyword">in</span> $(<span class="hljs-built_in">seq</span> 1 60); <span class="hljs-keyword">do</span>
  state=$(curl --fail-with-body --silent --show-error --request POST \
    --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
    --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
    --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
    --data-raw <span class="hljs-string">&#x27;{&quot;collectionName&quot;:&quot;tech_articles&quot;}&#x27;</span> | jq -er <span class="hljs-string">&#x27;if .code == 0 then .data.loadState else error(&quot;load-state request failed&quot;) end&#x27;</span>)
  <span class="hljs-keyword">if</span> [ <span class="hljs-string">&quot;<span class="hljs-variable">$state</span>&quot;</span> = <span class="hljs-string">&quot;LoadStateLoaded&quot;</span> ]; <span class="hljs-keyword">then</span>
    loaded=<span class="hljs-literal">true</span>
    <span class="hljs-built_in">break</span>
  <span class="hljs-keyword">fi</span>
  <span class="hljs-built_in">sleep</span> 1
<span class="hljs-keyword">done</span>
[ <span class="hljs-string">&quot;<span class="hljs-variable">$loaded</span>&quot;</span> = <span class="hljs-literal">true</span> ] || { <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Collection did not finish loading&quot;</span> &gt;&amp;2; <span class="hljs-built_in">exit</span> 1; }

curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;data&quot;: [
      [
        [0.12, 0.21, 0.32, 0.44],
        [0.18, 0.23, 0.29, 0.36]
      ]
    ],
    &quot;annsField&quot;: &quot;chunks[emb_list_vector]&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [
      &quot;doc_id&quot;,
      &quot;title&quot;,
      &quot;category&quot;,
      &quot;chunks[text]&quot;,
      &quot;chunks[section]&quot;
    ]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在此搜尋模式下，<code translate="no">limit</code> 會控制每個查詢所返回的實體數量。輸出結果可能包含 StructArray 的子欄位，但搜尋結果本身代表的是匹配到的父實體，而非某個特定的 Struct 元素。</p>
<div class="alert note">
<p>如需完整的 ColBERT 或 ColPali 風格操作指南，請參閱<a href="/docs/zh-hant/search-with-embedding-lists.md">《使用嵌入式清單進行搜尋</a>》。本頁面僅涵蓋 StructArray 的基本搜尋行為。</p>
</div>
<h2 id="Run-element-level-search" class="common-anchor-header">執行元素層級搜尋<button data-href="#Run-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>當每個 Struct 元素應獨立參與向量搜尋時，請使用元素層級搜尋。查詢為一般向量，且目標向量子欄位必須採用一般向量度量進行索引。</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

client.load_collection(collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>)

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(
            <span class="hljs-string">&quot;doc_id:&quot;</span>, hit[<span class="hljs-string">&quot;doc_id&quot;</span>],
            <span class="hljs-string">&quot;distance:&quot;</span>, hit[<span class="hljs-string">&quot;distance&quot;</span>],
            <span class="hljs-string">&quot;offset:&quot;</span>, hit.get(<span class="hljs-string">&quot;offset&quot;</span>),
            <span class="hljs-string">&quot;entity:&quot;</span>, hit[<span class="hljs-string">&quot;entity&quot;</span>],
        )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

client.loadCollection(LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .build());

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .annsField(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>))))
        .limit(<span class="hljs-number">5</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
        .build());

<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; hits : resp.getSearchResults()) {
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult hit : hits) {
        System.out.println(<span class="hljs-string">&quot;doc_id: &quot;</span> + hit.getId()
                + <span class="hljs-string">&quot; distance: &quot;</span> + hit.getScore()
                + <span class="hljs-string">&quot; offset: &quot;</span> + hit.getElementOffset()
                + <span class="hljs-string">&quot; entity: &quot;</span> + hit.getEntity());
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

loadTask, err := cli.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;tech_articles&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">if</span> err := loadTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

<span class="hljs-comment">// Go client/v3.0.0 does not expose element offsets in ResultSet.</span>
results, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-number">5</span>,
    []entity.Vector{entity.FloatVector{<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>}},
).WithANNSField(<span class="hljs-string">&quot;chunks[emb]&quot;</span>).WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

<span class="hljs-keyword">for</span> _, result := <span class="hljs-keyword">range</span> results {
    <span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; result.ResultCount; i++ {
        id, err := result.IDs.Get(i)
        <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-built_in">panic</span>(err) }
        fmt.Println(<span class="hljs-string">&quot;doc_id:&quot;</span>, id, <span class="hljs-string">&quot;distance:&quot;</span>, result.Scores[i])
        <span class="hljs-keyword">for</span> _, field := <span class="hljs-keyword">range</span> result.Fields {
            value, err := field.Get(i)
            <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-built_in">panic</span>(err) }
            fmt.Println(field.Name(), value)
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

client.<span class="hljs-title function_ invoke__">load_collection</span>(LoadCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
    .<span class="hljs-title function_ invoke__">sync</span>(<span class="hljs-literal">true</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector]))
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>])
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">for</span> <span class="hljs-variable">result</span> <span class="hljs-keyword">in</span> response.<span class="hljs-title function_ invoke__">results</span>() {
    <span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> result.<span class="hljs-title function_ invoke__">rows</span>()? {
        <span class="hljs-keyword">let</span> <span class="hljs-variable">entity</span> = row.<span class="hljs-title function_ invoke__">to_entity_row</span>()?;
        <span class="hljs-built_in">println!</span>(
            <span class="hljs-string">&quot;doc_id: {:?} distance: {:?} offset: {:?} entity: {:?}&quot;</span>,
            row.<span class="hljs-title function_ invoke__">get</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)?, row.<span class="hljs-title function_ invoke__">get</span>(<span class="hljs-string">&quot;score&quot;</span>)?, row.<span class="hljs-title function_ invoke__">element_offset</span>(), entity
        );
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

status = client-&gt;<span class="hljs-built_in">LoadCollection</span>(milvus::<span class="hljs-built_in">LoadCollectionRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>).<span class="hljs-built_in">WithSync</span>(<span class="hljs-literal">true</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) { <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>()); }

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
                   .<span class="hljs-built_in">WithFloatVectors</span>({{<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>}})
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;title&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[text]&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[section]&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[page]&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">auto</span>&amp; result : response.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    milvus::EntityRows output_rows;
    status = result.<span class="hljs-built_in">OutputRows</span>(output_rows);
    <span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) { <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>()); }
    <span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows) {
        std::cout &lt;&lt; row &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span> });

<span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: query_vector,
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">output_fields</span>: [
    <span class="hljs-string">&quot;doc_id&quot;</span>,
    <span class="hljs-string">&quot;title&quot;</span>,
    <span class="hljs-string">&quot;chunks[text]&quot;</span>,
    <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    <span class="hljs-string">&quot;chunks[page]&quot;</span>,
    <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
  ],
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(results.<span class="hljs-property">results</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System;
<span class="hljs-keyword">using</span> System.Linq;
<span class="hljs-keyword">using</span> System.Text.Json;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">await</span> client.LoadCollectionAsync(<span class="hljs-keyword">new</span> LoadCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    Sync = <span class="hljs-literal">true</span>
});

<span class="hljs-keyword">var</span> queryVector = <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span> });

SearchResp results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { queryVector },
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span> }
    }
});
<span class="hljs-keyword">foreach</span> (<span class="hljs-keyword">var</span> result <span class="hljs-keyword">in</span> results.SingleResults!)
{
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">int</span> i = <span class="hljs-number">0</span>; i &lt; result.Scores.Count; i++)
        Console.WriteLine(JsonSerializer.Serialize(result.GetRow(i)));
}
<span class="hljs-comment">// One query: ElementIndices aligns with its hit order.</span>
Console.WriteLine(JsonSerializer.Serialize(results.ElementIndices));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">set</span> -euo pipefail

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --fail-with-body --silent --show-error --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{&quot;collectionName&quot;:&quot;tech_articles&quot;}&#x27;</span> | jq -e <span class="hljs-string">&#x27;.code == 0&#x27;</span> &gt;/dev/null

loaded=<span class="hljs-literal">false</span>
<span class="hljs-keyword">for</span> attempt <span class="hljs-keyword">in</span> $(<span class="hljs-built_in">seq</span> 1 60); <span class="hljs-keyword">do</span>
  state=$(curl --fail-with-body --silent --show-error --request POST \
    --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
    --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
    --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
    --data-raw <span class="hljs-string">&#x27;{&quot;collectionName&quot;:&quot;tech_articles&quot;}&#x27;</span> | jq -er <span class="hljs-string">&#x27;if .code == 0 then .data.loadState else error(&quot;load-state request failed&quot;) end&#x27;</span>)
  <span class="hljs-keyword">if</span> [ <span class="hljs-string">&quot;<span class="hljs-variable">$state</span>&quot;</span> = <span class="hljs-string">&quot;LoadStateLoaded&quot;</span> ]; <span class="hljs-keyword">then</span>
    loaded=<span class="hljs-literal">true</span>
    <span class="hljs-built_in">break</span>
  <span class="hljs-keyword">fi</span>
  <span class="hljs-built_in">sleep</span> 1
<span class="hljs-keyword">done</span>
[ <span class="hljs-string">&quot;<span class="hljs-variable">$loaded</span>&quot;</span> = <span class="hljs-literal">true</span> ] || { <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Collection did not finish loading&quot;</span> &gt;&amp;2; <span class="hljs-built_in">exit</span> 1; }

curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;data&quot;: [
      [0.19, 0.24, 0.30, 0.37]
    ],
    &quot;annsField&quot;: &quot;chunks[emb]&quot;,
    &quot;limit&quot;: 5,
    &quot;outputFields&quot;: [
      &quot;doc_id&quot;,
      &quot;title&quot;,
      &quot;chunks[text]&quot;,
      &quot;chunks[section]&quot;,
      &quot;chunks[page]&quot;,
      &quot;chunks[quality_score]&quot;
    ]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在元素層級搜尋中，每個搜尋結果代表一個匹配的 Struct 元素。<code translate="no">offset</code> 的值為該元素在 StructArray 欄位中的零起始位置。若有多個 Struct 元素與查詢條件匹配，同一實體可能會出現多次。<code translate="no">limit</code> 的值適用於元素搜尋結果，而非唯一的父實體。</p>
<h2 id="Interpret-results" class="common-anchor-header">解讀結果<button data-href="#Interpret-results" class="anchor-icon" translate="no">
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
<tr><th>結果項目</th><th>EmbeddingList 搜尋</th><th>元素層級搜尋</th></tr>
</thead>
<tbody>
<tr><td>主鍵（在此模式中為<code translate="no">doc_id</code> ）</td><td>匹配實體的主鍵。</td><td>包含匹配 Struct 元素的實體的主鍵。</td></tr>
<tr><td><code translate="no">distance</code> 或分數</td><td>查詢嵌入向量列表與儲存的嵌入向量列表之間的分數或距離。</td><td>查詢向量與匹配的 Struct 元素向量之間的分數或距離。</td></tr>
<tr><td><code translate="no">offset</code></td><td>不適用。</td><td>回傳時，匹配 Struct 元素的從零開始計數的位置。</td></tr>
<tr><td>重複的主鍵</td><td>由於結果是實體層級的，因此單一查詢中不預期會出現此情況。</td><td>可能發生，因為同一實體中的多個 Struct 元素可能會匹配。</td></tr>
<tr><td>請求的 StructArray 輸出欄位</td><td>由匹配的實體返回。</td><td>會以目標 API 和 SDK 所支援的元素層級命中形狀一併回傳。</td></tr>
</tbody>
</table>
<p>Python 範例使用 PyMilvus 3.0.2，並透過其架構名稱<code translate="no">doc_id</code> 存取主鍵。結果存取器因 SDK 而異。Go 客戶端/v3.0.0 不會在<code translate="no">ResultSet</code> 中公開元素偏移量；其他範例僅透過其 SDK 所支援的結果介面顯示偏移量。</p>
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
<li><p>使用<code translate="no">chunks.emb</code> 代替所需的子欄位路徑語法<code translate="no">chunks[emb]</code> 。</p></li>
<li><p>針對使用一般向量度量進行索引的向量子欄位，使用 EmbeddingList 查詢。</p></li>
<li><p>對使用<code translate="no">MAX_SIM*</code> 度量進行索引的向量子欄位，使用一般向量查詢。</p></li>
<li><p>預期元素層級搜尋<code translate="no">limit</code> 會返回相應數量的唯一父實體。其實它返回的是元素搜尋結果。</p></li>
<li><p>預期 EmbeddingList 搜尋會返回一個特定的元素偏移量，但實際返回的是實體層級的匹配結果。</p></li>
<li><p>將同一個向量子欄位同時用於兩種搜尋模式。應使用獨立的向量子欄位，因為每個向量子欄位僅能接受一種索引。</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">後續步驟<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><p>若要透過標量條件限制元素層級搜尋，請參閱《<a href="/docs/zh-hant/filtered-search-with-structarray.md">使用 StructArray 進行篩選搜尋</a>》。</p></li>
<li><p>若要根據分數或距離範圍進行搜尋，請參閱《<a href="/docs/zh-hant/range-search-with-structarray.md">使用 StructArray 進行範圍搜尋</a>》。</p></li>
<li><p>若要在元素層級搜尋後，針對每個父實體最多返回一個結果，請參閱《<a href="/docs/zh-hant/grouping-search-with-structarray.md">使用 StructArray 進行分組搜尋</a>》。</p></li>
<li><p>若要將 StructArray 搜尋與其他向量搜尋結合使用，請參閱《<a href="/docs/zh-hant/hybrid-search-with-structarray.md">使用 StructArray 進行混合搜尋</a>》。</p></li>
<li><p>若要檢視受支援的資料類型、度量、篩選器及特定版本的限制，請參閱《<a href="/docs/zh-hant/structarray-limits.md">StructArray 限制</a>》。</p></li>
</ol>
