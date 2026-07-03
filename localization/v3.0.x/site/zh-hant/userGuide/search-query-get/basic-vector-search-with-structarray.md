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
    </button></h1><p>請使用此頁面對 StructArray 欄位內的向量子欄位執行向量搜尋。StructArray 支援兩種基本向量搜尋模式：嵌入清單搜尋（EmbeddingList search），此模式會針對儲存於每個實體中的嵌入清單進行評分；以及元素層級搜尋，此模式會獨立搜尋每個 Struct 元素。</p>
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
    </button></h2><p>請確保集合的架構、資料及索引均已準備就緒。</p>
<table>
<thead>
<tr><th>需求</th><th>準備位置</th></tr>
</thead>
<tbody>
<tr><td>建立一個 StructArray 欄位，例如<code translate="no">chunks</code> 。</td><td><a href="/docs/zh-hant/create-structarray-field.md">建立 StructArray 欄位</a></td></tr>
<tr><td>插入其 `<code translate="no">chunks</code> ` 欄位包含 Struct 物件的實體。</td><td><a href="/docs/zh-hant/insert-data-into-structarray-fields.md">將資料插入 StructArray 欄位</a></td></tr>
<tr><td>在<code translate="no">chunks[emb_list_vector]</code> 上建立<code translate="no">MAX_SIM*</code> 索引，以便進行EmbeddingList搜尋。</td><td><a href="/docs/zh-hant/index-structarray-fields.md">為 StructArray 欄位建立索引</a></td></tr>
<tr><td>在 `<code translate="no">chunks[emb]</code> ` 上建立常規向量度量索引，以支援元素層級搜尋。</td><td><a href="/docs/zh-hant/index-structarray-fields.md">為 StructArray 欄位建立索引</a></td></tr>
</tbody>
</table>
<div class="alert note">
<p>警告</p>
<p>一個向量欄位或向量子欄位僅能接受一個索引。若您同時需要 EmbeddingList 搜尋與元素層級搜尋，請建立兩個獨立的向量子欄位。在此頁面中，<code translate="no">chunks[emb_list_vector]</code> 已建立索引以供 EmbeddingList 搜尋使用，而<code translate="no">chunks[emb]</code> 則已建立索引以供元素層級搜尋使用。</p>
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
<tr><td>結果的細粒度</td><td>實體層級。</td><td>Struct 元素層級。</td></tr>
<tr><td>偏移量</td><td>不適用。</td><td>識別在返回時，匹配的結構體元素以零為起點的位置。</td></tr>
<tr><td>典型用途</td><td>ColBERT、ColPali 及其他後期交互檢索模式。</td><td>塊級、段落級、片段級、區塊級或事實級檢索。</td></tr>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

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
        <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;id&quot;</span>], hit[<span class="hljs-string">&quot;distance&quot;</span>], hit[<span class="hljs-string">&quot;entity&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>在此搜尋模式下，<code translate="no">limit</code> 會控制每個查詢所返回的實體數量。輸出結果可能包含 StructArray 子欄位，但搜尋結果本身代表的是匹配的父實體，而非某個特定的 Struct 元素。</p>
<div class="alert note">
<p>如需完整的 ColBERT 或 ColPali 風格操作指南，請參閱<a href="/docs/zh-hant/search-with-embedding-lists.md">《使用嵌入式清單進行搜尋</a>》。本頁僅涵蓋 StructArray 的基本搜尋行為。</p>
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
    </button></h2><p>當每個 Struct 元素應獨立參與向量搜尋時，請使用元素層級搜尋。查詢為一般向量，且目標向量子欄位必須採用一般向量度量法進行索引。</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

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
            <span class="hljs-string">&quot;doc_id:&quot;</span>, hit[<span class="hljs-string">&quot;id&quot;</span>],
            <span class="hljs-string">&quot;distance:&quot;</span>, hit[<span class="hljs-string">&quot;distance&quot;</span>],
            <span class="hljs-string">&quot;offset:&quot;</span>, hit.get(<span class="hljs-string">&quot;offset&quot;</span>),
            <span class="hljs-string">&quot;entity:&quot;</span>, hit[<span class="hljs-string">&quot;entity&quot;</span>],
        )
<button class="copy-code-btn"></button></code></pre>
<p>在元素層級搜尋中，每個搜尋結果代表一個匹配的 Struct 元素。<code translate="no">offset</code> 的值即為該元素在 StructArray 欄位中的零起始位置。若有多個 Struct 元素與查詢相符，同一實體可能會出現多次。<code translate="no">limit</code> 的值適用於元素搜尋結果，而非唯一的父實體。</p>
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
<tr><td><code translate="no">id</code></td><td>匹配實體的主鍵。</td><td>包含匹配 Struct 元素之實體的主鍵。</td></tr>
<tr><td><code translate="no">distance</code> 或分數</td><td>查詢嵌入清單與儲存的嵌入清單之間的分數或距離。</td><td>查詢向量與匹配的 Struct 元素向量之間的分數或距離。</td></tr>
<tr><td><code translate="no">offset</code></td><td>不適用。</td><td>回傳時，匹配 Struct 元素的從零開始的索引位置。</td></tr>
<tr><td>重複的主鍵</td><td>由於結果是實體層級的，因此單一查詢中不預期會出現此情況。</td><td>可能發生，因為同一實體中的多個 Struct 元素可能會匹配。</td></tr>
<tr><td>請求的 StructArray 輸出欄位</td><td>由匹配的實體返回。</td><td>將依照目標 API 和 SDK 所支援的元素層級命中結構一併回傳。</td></tr>
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
<li><p>使用 `<code translate="no">chunks.emb</code> ` 代替所需的子欄位路徑語法 `<code translate="no">chunks[emb]</code>`。</p></li>
<li><p>對使用常規向量度量進行索引的向量子欄位，使用 EmbeddingList 查詢。</p></li>
<li><p>對使用<code translate="no">MAX_SIM*</code> 度量進行索引的向量子欄位，使用一般向量查詢。</p></li>
<li><p>預期元素層級搜尋<code translate="no">limit</code> 會返回相應數量的唯一父實體。其實它返回的是元素搜尋結果。</p></li>
<li><p>預期 EmbeddingList 搜尋會返回一個特定的元素偏移量，但實際返回的是實體層級的匹配結果。</p></li>
<li><p>將同一個向量子欄位同時用於兩種搜尋模式。應使用獨立的向量子欄位，因為每個向量子欄位僅接受一種索引。</p></li>
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
