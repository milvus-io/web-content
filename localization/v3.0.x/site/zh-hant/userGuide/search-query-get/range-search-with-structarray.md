---
id: range-search-with-structarray.md
title: 使用 StructArray 進行範圍搜尋
summary: >-
  請使用此頁面對 StructArray 的向量子欄位執行範圍搜尋。範圍搜尋會回傳分數或距離落在指定範圍內的向量搜尋結果。對於 StructArray
  欄位，請將範圍搜尋與元素層級的向量搜尋結合使用，此時每個 Struct 元素都會獨立進行搜尋。
---
<h1 id="Range-Search-with-StructArray" class="common-anchor-header">使用 StructArray 進行範圍搜尋<button data-href="#Range-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>請使用此頁面對 StructArray 的向量子欄位執行範圍搜尋。範圍搜尋會回傳分數或距離落在指定範圍內的向量搜尋結果。對於 StructArray 欄位，請搭配元素層級向量搜尋使用範圍搜尋，此時每個 Struct 元素將獨立進行搜尋。</p>
<p>本頁面使用<a href="/docs/zh-hant/create-structarray-field.md">《建立 StructArray 欄位》</a>中的<code translate="no">tech_articles</code> 集合。該集合包含一個名為<code translate="no">chunks</code> 的 StructArray 欄位。其<code translate="no">chunks[emb]</code> 向量子欄位已建立索引，可透過標準向量度量（例如<code translate="no">COSINE</code> 、<code translate="no">IP</code> 或<code translate="no">L2</code> ）進行元素層級搜尋。</p>
<h2 id="How-range-search-applies-to-StructArray" class="common-anchor-header">範圍搜尋如何套用至 StructArray<button data-href="#How-range-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>搜尋模式</th><th>範圍搜尋行為</th><th>結果粒度</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingList 搜尋</td><td>不支援。</td><td>不適用。</td></tr>
<tr><td>元素層級搜尋</td><td>請使用帶有 `<code translate="no">radius</code> ` 的常規向量查詢，並可選擇性地使用 `<code translate="no">range_filter</code>`。</td><td>結構體元素層級。</td></tr>
<tr><td>混合搜尋</td><td>當 StructArray 請求針對元素層級向量欄位時，此功能受支援。EmbeddingList 層級的請求不支援範圍搜尋。</td><td>先進行元素層級子搜尋，再進行混合重新排序。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>若您僅需最接近的 Struct 元素，請先<a href="/docs/zh-hant/basic-vector-search-with-structarray.md">使用 StructArray 進行基本向量搜尋</a>。當結果必須滿足分數或距離邊界（而非僅限前 K 名排名）時，請使用範圍搜尋。</p>
</div>
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
    </button></h2><p>執行範圍搜尋前，請先準備好集合、資料及索引。</p>
<table>
<thead>
<tr><th>需求</th><th>詳細資訊</th></tr>
</thead>
<tbody>
<tr><td>StructArray 欄位</td><td>該集合包含一個 StructArray 欄位，例如<code translate="no">chunks</code> 。</td></tr>
<tr><td>元素層級的向量子欄位</td><td>目標向量子欄位應為<code translate="no">chunks[emb]</code> ，而非<code translate="no">chunks[emb_list_vector]</code> 。</td></tr>
<tr><td>索引度量</td><td>該向量子欄位採用標準向量度量進行索引，例如<code translate="no">COSINE</code> 、<code translate="no">IP</code> 或<code translate="no">L2</code> 。</td></tr>
<tr><td>查詢資料</td><td>查詢為一般向量，而非<code translate="no">EmbeddingList</code> 。</td></tr>
</tbody>
</table>
<p>有關索引設定，請參閱《<a href="/docs/zh-hant/index-structarray-fields.md">索引 StructArray 欄位</a>》。</p>
<h2 id="Use-radius-and-rangefilter" class="common-anchor-header">使用 radius 和 range_filter<button data-href="#Use-radius-and-rangefilter" class="anchor-icon" translate="no">
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
    </button></h2><p>設定 `<code translate="no">radius</code> ` 以定義搜尋邊界。若同時需要內側邊界，請設定 `<code translate="no">range_filter</code> `。方向取決於「較小的距離」與「較高的相似度分數」何者更為理想。</p>
<table>
<thead>
<tr><th>度量類型</th><th>分數越高越好？</th><th>使用 `<code translate="no">range_filter</code> ` 時的範圍條件</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">L2</code></td><td>否。距離越小越好。</td><td><code translate="no">range_filter &lt;= distance &lt; radius</code></td></tr>
<tr><td><code translate="no">IP</code>,<code translate="no">COSINE</code></td><td>是。分數越高越好。</td><td><code translate="no">radius &lt; distance &lt;= range_filter</code></td></tr>
</tbody>
</table>
<p>當僅設定 `<code translate="no">radius</code> ` 時，範圍搜尋會回傳符合該度量外界限的結果。請根據您的嵌入向量之分數或距離尺度來選擇數值。</p>
<h2 id="Run-element-level-range-search" class="common-anchor-header">執行元素層級範圍搜尋<button data-href="#Run-element-level-range-search" class="anchor-icon" translate="no">
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
    </button></h2><p>以下範例會搜尋那些其 `<code translate="no">chunks[emb]</code> ` 向量與查詢向量足夠相似的個別片段。每個搜尋結果皆代表一個匹配的 Struct 元素。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
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
            <span class="hljs-string">&quot;doc_id:&quot;</span>, hit[<span class="hljs-string">&quot;id&quot;</span>],
            <span class="hljs-string">&quot;distance:&quot;</span>, hit[<span class="hljs-string">&quot;distance&quot;</span>],
            <span class="hljs-string">&quot;offset:&quot;</span>, hit.get(<span class="hljs-string">&quot;offset&quot;</span>),
            <span class="hljs-string">&quot;entity:&quot;</span>, hit[<span class="hljs-string">&quot;entity&quot;</span>],
        )
<button class="copy-code-btn"></button></code></pre>
<p>在此範例中，<code translate="no">COSINE</code> 為相似度型指標，因此結果範圍大於<code translate="no">radius</code> 且小於或等於<code translate="no">range_filter</code> 。當結果返回時，<code translate="no">offset</code> 值可識別<code translate="no">chunks</code> 陣列中匹配的 Struct 元素。</p>
<h2 id="Add-scalar-filters" class="common-anchor-header">新增標量篩選條件<button data-href="#Add-scalar-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以將元素層級的範圍搜尋與 StructArray 標量篩選結合使用。針對父實體欄位使用頂層謂詞，並使用<code translate="no">element_filter</code> 來限制哪些 Struct 元素會參與向量範圍搜尋。</p>
<pre><code translate="no" class="language-python">filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">10</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>頂層謂詞用於篩選候選實體。<code translate="no">element_filter</code> 謂詞則將向量範圍搜尋限制在符合條件的 Struct 元素上。如需更多篩選範例，請參閱《<a href="/docs/zh-hant/filtered-search-with-structarray.md">使用 StructArray 進行篩選搜尋</a>》。</p>
<h2 id="Use-range-search-in-hybrid-search" class="common-anchor-header">在混合搜尋中使用範圍搜尋<button data-href="#Use-range-search-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 元素層級向量欄位在混合搜尋中支援範圍搜尋。請將 `<code translate="no">radius</code> ` 以及（若需）`<code translate="no">range_filter</code> ` 新增至針對 StructArray 元素層級向量欄位的 `<code translate="no">AnnSearchRequest</code> ` 中。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>在此範例中，僅有 `<code translate="no">chunks[emb]</code> ` 子請求會使用範圍搜尋參數。StructArray 請求仍遵循元素層級語義：範圍邊界適用於混合搜尋將結果合併並重新排序之前所找到的 Struct 元素命中項目。</p>
<h2 id="Interpret-range-results" class="common-anchor-header">解析範圍結果<button data-href="#Interpret-range-results" class="anchor-icon" translate="no">
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
<tr><th>結果項目</th><th>含義</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>包含匹配 Struct 元素之實體的主鍵。</td></tr>
<tr><td><code translate="no">distance</code> 或分數</td><td>查詢向量與匹配的 Struct 元素向量之間的分數或距離。</td></tr>
<tr><td><code translate="no">offset</code></td><td>回傳時，匹配的 Struct 元素在 StructArray 欄位中的零起始位置。</td></tr>
<tr><td>重複的主鍵</td><td>可能發生。同一實體中可能有超過一個 Struct 元素落在指定範圍內。</td></tr>
<tr><td><code translate="no">limit</code></td><td>此規則適用於元素命中，而非唯一的父實體。</td></tr>
</tbody>
</table>
<h2 id="Limitations" class="common-anchor-header">限制<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li><p>請勿對 StructArray 向量子欄位使用<code translate="no">EmbeddingList</code> 查詢或<code translate="no">MAX_SIM*</code> 指標進行範圍搜尋。EmbeddingList 層級的搜尋不支援範圍搜尋。</p></li>
<li><p>請勿將範圍搜尋與分組搜尋結合使用。若需針對每個父實體返回一個結果，請執行不包含範圍參數的元素層級搜尋，並在支援的情況下使用分組功能。</p></li>
<li><p>StructArray 元素層級的向量欄位支援混合範圍搜尋。但 EmbeddingList 層級的 StructArray 請求則不支援此功能。</p></li>
</ul>
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
<li><p>針對<code translate="no">chunks[emb_list_vector]</code> 執行範圍搜尋，該指標原本是為 EmbeddingList 搜尋所設計。</p></li>
<li><p>在元素層級範圍搜尋中，使用 `<code translate="no">MAX_SIM_COSINE</code> ` 取代常規指標（例如 `<code translate="no">COSINE</code> `）。</p></li>
<li><p>使用<code translate="no">EmbeddingList</code> 查詢，而非一般向量查詢。</p></li>
<li><p>預期範圍搜尋結果在父實體層級下是唯一的。範圍搜尋會返回符合條件的 Struct 元素搜尋結果。</p></li>
<li><p>使用 `<code translate="no">chunks.emb</code> ` 取代必需的子欄位路徑語法 `<code translate="no">chunks[emb]</code>`。</p></li>
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
<li><p>若要了解 StructArray 的兩種基本向量搜尋模式，請參閱《<a href="/docs/zh-hant/basic-vector-search-with-structarray.md">使用 StructArray 進行基本向量搜尋</a>》。</p></li>
<li><p>若要為範圍搜尋新增標量篩選條件，請參閱《<a href="/docs/zh-hant/filtered-search-with-structarray.md">使用 StructArray 進行篩選搜尋</a>》。</p></li>
<li><p>若要在支援的情況下，針對每個父實體最多返回一個結果，請參閱《<a href="/docs/zh-hant/grouping-search-with-structarray.md">使用 StructArray 進行分組搜尋</a>》。</p></li>
<li><p>若要查看特定版本的搜尋限制，請參閱《<a href="/docs/zh-hant/structarray-limits.md">StructArray 限制</a>》。</p></li>
</ol>
