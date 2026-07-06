---
id: grouping-search-with-structarray.md
title: 使用 StructArray 進行分組搜尋
summary: >-
  請使用此頁面，將 StructArray 的元素層級搜尋結果依父實體進行分組。當多個 Struct
  元素符合查詢條件時，元素層級搜尋可能會從同一實體返回多個搜尋結果。透過分組功能，這些元素搜尋結果將被彙總，使每個父實體最多只出現一次。
---
<h1 id="Grouping-Search-with-StructArray" class="common-anchor-header">使用 StructArray 進行分組搜尋<button data-href="#Grouping-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>請使用此頁面，根據父實體對 StructArray 元素層級的搜尋結果進行分組。當多個 Struct 元素符合查詢條件時，元素層級搜尋可能會從同一實體中返回多個搜尋結果。分組功能會將這些元素搜尋結果合併，確保每個父實體最多只出現一次。</p>
<p>本頁面使用《<a href="/docs/zh-hant/create-structarray-field.md">建立 StructArray 欄位</a>》中的<code translate="no">tech_articles</code> 集合。該集合包含一個名為<code translate="no">chunks</code> 的 StructArray 欄位。其中<code translate="no">chunks[emb]</code> 向量子欄位已針對元素層級搜尋進行索引，並採用標準向量度量標準。</p>
<h2 id="How-grouping-applies-to-StructArray" class="common-anchor-header">分組機制如何套用至 StructArray<button data-href="#How-grouping-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>搜尋模式</th><th>分組行為</th><th>結果行為</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingList 搜尋</td><td>不支援。</td><td>不適用。</td></tr>
<tr><td>元素層級搜尋</td><td>透過主鍵分組可支援此功能。</td><td>每個父實體最多返回一個結果。元素層級的元資料會被保留，因此當 API 或 SDK 公開時，可返回所選元素的索引或偏移量。</td></tr>
<tr><td>混合搜尋</td><td>僅在所有子搜尋皆針對同一 StructArray 欄位下的元素層級向量欄位時才受支援。</td><td>元素層級的子搜尋會在最終結果處理前，依據主鍵進行分組。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>當未分組的元素層級搜尋會返回過多重複的父實體時，請使用分組功能。若您希望將每個符合條件的 Struct 元素視為獨立的搜尋結果，請使用不帶 `<code translate="no">group_by_field</code>`<a href="/docs/zh-hant/basic-vector-search-with-structarray.md">的 StructArray 基本向量搜尋</a>。</p>
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
    </button></h2><p>在執行分組搜尋之前，請先準備好集合、資料和索引。</p>
<table>
<thead>
<tr><th>需求</th><th>詳細資訊</th></tr>
</thead>
<tbody>
<tr><td>元素層級向量子欄位</td><td>請使用 StructArray 向量子欄位（例如<code translate="no">chunks[emb]</code> ），並以標準向量度量進行索引。</td></tr>
<tr><td>常規向量查詢</td><td>請使用一般查詢向量，而非<code translate="no">EmbeddingList</code> 。</td></tr>
<tr><td>主鍵分組</td><td>請將集合主鍵設定為 `<code translate="no">group_by_field</code>`，例如 `<code translate="no">doc_id</code>`。</td></tr>
<tr><td>不使用範圍參數</td><td>請勿將分組搜尋與範圍搜尋參數（例如<code translate="no">radius</code> 或<code translate="no">range_filter</code> ）結合使用。</td></tr>
</tbody>
</table>
<p>有關索引設定，請參閱「<a href="/docs/zh-hant/index-structarray-fields.md">Index StructArray 欄位</a>」。</p>
<h2 id="Run-grouped-element-level-search" class="common-anchor-header">執行分組元素層級搜尋<button data-href="#Run-grouped-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>以下範例會先搜尋個別區塊，然後根據父實體的主鍵將元素搜尋結果進行分組。</p>
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
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
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
<p>若未進行分組，當多個區塊符合查詢條件時，相同的 `<code translate="no">doc_id</code> ` 可能會出現多次。使用 `<code translate="no">group_by_field=&quot;doc_id&quot;</code>` 時，每個父實體最多只會出現一次。分組可保留元素層級的元資料，因此當 API 或 SDK 公開相關資訊時，分組後的結果仍可包含所選的 Struct 元素索引或偏移量。</p>
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
    </button></h2><p>您可以將分組搜尋與 StructArray 標量篩選結合使用。當標量條件需限制哪些 Struct 元素參與元素層級向量搜尋時，請使用 `<code translate="no">element_filter</code> `。</p>
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
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
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
<p>頂層謂詞用於篩選候選實體。<code translate="no">element_filter</code> 謂詞則將元素層級向量搜尋限制在符合條件的 Struct 元素上。隨後，分組功能會根據主鍵將符合條件的元素搜尋結果進行彙總。</p>
<h2 id="Use-grouping-in-hybrid-search" class="common-anchor-header">在混合搜尋中使用分組<button data-href="#Use-grouping-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>與 StructArray 結合的混合分組是一項元素層級功能。僅當所有子搜尋皆針對同一 StructArray 欄位下的元素層級向量欄位時，此功能才受支援。請勿在分組的 StructArray 混合搜尋中使用 EmbeddingList 層級的請求。</p>
<p>以下範例假設<code translate="no">chunks</code> 的 StructArray 欄位有兩個元素層級向量子欄位，分別為<code translate="no">chunks[emb]</code> 和<code translate="no">chunks[code_emb]</code> ，且兩者皆使用標準向量度量進行索引。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>在此範例中，兩個子請求皆針對同一 StructArray 欄位（<code translate="no">chunks</code> ）下的元素層級向量子欄位。若混合了一般向量欄位、不同的 StructArray 欄位或 EmbeddingList 層級的請求，混合搜尋將不支援元素層級的分組操作。</p>
<h2 id="Interpret-grouped-results" class="common-anchor-header">解析分組結果<button data-href="#Interpret-grouped-results" class="anchor-icon" translate="no">
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
<tr><td><code translate="no">id</code></td><td>分組父實體的主鍵。</td></tr>
<tr><td><code translate="no">distance</code> 或分數</td><td>該父實體所選 Struct 元素的分數或距離。</td></tr>
<tr><td><code translate="no">offset</code></td><td>選取之 Struct 元素在回傳時的零起始位置。</td></tr>
<tr><td>重複的主鍵</td><td>按主鍵分組時不應出現此情況。</td></tr>
<tr><td><code translate="no">limit</code></td><td>適用於已分組的父實體結果。</td></tr>
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
<li><p>分組搜尋僅適用於元素層級的 StructArray 向量搜尋。EmbeddingList 搜尋和 EmbeddingList 層級的混合搜尋不支援「group-by」。</p></li>
<li><p>請將主鍵用作 `<code translate="no">group_by_field</code>`。StructArray 元素層級的分組並非針對任意標量欄位的通用分組操作。</p></li>
<li><p>請勿將分組搜尋與範圍搜尋結合使用。</p></li>
<li><p>請勿在分組搜尋中使用<code translate="no">EmbeddingList</code> 查詢或<code translate="no">MAX_SIM*</code> 指標。</p></li>
<li><p>僅當所有子搜尋皆針對同一 StructArray 欄位下的元素層級向量欄位時，才支援混合分組。</p></li>
<li><p>當混合搜尋同時包含一般向量場、不同的 StructArray 場或 EmbeddingList 層級的請求時，則不支援混合分組。</p></li>
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
<li><p>將分組功能用於<code translate="no">chunks[emb_list_vector]</code> ，該功能原本是針對 EmbeddingList 搜尋設計的。</p></li>
<li><p>根據非主鍵的標量欄位進行分組。</p></li>
<li><p>根據多個欄位進行分組。元素層級的 StructArray 分組僅支援主鍵分組。</p></li>
<li><p>預期分組結果會代表每個匹配的 Struct 元素。分組每項父實體最多只會返回一個結果。</p></li>
<li><p>假設分組後的元素層級搜尋會重新計算 EmbeddingList 風格的<code translate="no">MAX_SIM*</code> 分數。分組會彙總元素層級的搜尋結果；它並不會改變評分模型。</p></li>
<li><p>將<code translate="no">group_by_field</code> 與<code translate="no">radius</code> 或<code translate="no">range_filter</code> 結合使用。</p></li>
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
<li><p>若要先了解未分組的元素層級搜尋，請閱讀《<a href="/docs/zh-hant/basic-vector-search-with-structarray.md">使用 StructArray 進行基本向量搜尋</a>》。</p></li>
<li><p>若要為分組搜尋新增標量篩選器，請參閱《<a href="/docs/zh-hant/filtered-search-with-structarray.md">使用 StructArray 進行篩選搜尋</a>》。</p></li>
<li><p>若要使用分數或距離邊界來取代分組，請參閱《<a href="/docs/zh-hant/range-search-with-structarray.md">使用 StructArray 進行範圍搜尋</a>》。</p></li>
<li><p>若要查看 StructArray 的搜尋限制，請閱讀《<a href="/docs/zh-hant/structarray-limits.md">StructArray 限制》</a>。</p></li>
</ol>
