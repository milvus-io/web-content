---
id: hybrid-search-with-structarray.md
title: 使用 StructArray 進行混合搜尋
summary: >-
  請使用此頁面，將 StructArray 向量搜尋與其他向量搜尋結合，形成單一的混合搜尋請求。StructArray
  混合搜尋可產生實體層級的結果或元素層級的結果，具體取決於您所組合的 AnnSearchRequest 物件。
---
<h1 id="Hybrid-Search-with-StructArray" class="common-anchor-header">使用 StructArray 進行混合搜尋<button data-href="#Hybrid-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>請使用此頁面，將 StructArray 向量搜尋與其他向量搜尋結合，整合為單一的混合搜尋請求。StructArray 混合搜尋可產生實體層級或元素層級的結果，具體取決於您所組合的<code translate="no">AnnSearchRequest</code> 物件。</p>
<p>本頁面使用來自<a href="/docs/zh-hant/create-structarray-field.md">「建立 StructArray 欄位」</a>中的<code translate="no">tech_articles</code> 集合。該集合包含一個名為<code translate="no">title_vector</code> 的頂層向量欄位，以及一個名為<code translate="no">chunks</code> 的 StructArray 欄位。<code translate="no">chunks[emb_list_vector]</code> 子欄位已建立索引以供 EmbeddingList 搜尋使用，而<code translate="no">chunks[emb]</code> 則已建立索引以供元素層級搜尋使用。</p>
<h2 id="How-hybrid-search-applies-to-StructArray" class="common-anchor-header">混合搜尋如何應用於 StructArray<button data-href="#How-hybrid-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th><code translate="no">AnnSearchRequest</code> 組合</th><th>最終候選範圍</th><th>結果行為</th><th><code translate="no">element_scope</code></th></tr>
</thead>
<tbody>
<tr><td>集合層級向量欄位 + StructArray 的 EmbeddingList 子欄位</td><td>實體層級</td><td>最終候選項以主鍵作為索引。</td><td>請勿使用。</td></tr>
<tr><td>集合層級向量場 + StructArray 元素層級子欄位</td><td>實體層級</td><td>元素層級的命中結果會在混合重新排序之前，彙總為實體層級的候選結果。</td><td>StructArray 元素層級<code translate="no">AnnSearchRequest</code> 上的可選摺疊設定。</td></tr>
<tr><td>同一 StructArray 欄位下的多個元素層級子欄位</td><td>元素層級</td><td>最終候選項以主鍵加上 Struct 元素偏移量作為索引。</td><td>請勿使用。</td></tr>
<tr><td>位於不同 StructArray 欄位下的元素層級子欄位</td><td>實體層級</td><td>元素偏移量不共享標識，因此每個 StructArray 元素層級的<code translate="no">AnnSearchRequest</code> 都會在重新排序前被摺疊。</td><td>每個 StructArray 元素級別的<code translate="no">AnnSearchRequest</code> 皆可選用摺疊設定。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>警告</p>
<p>僅應在非同結構的元素層級混合搜尋中，使用 `<code translate="no">element_scope</code> ` 來配置 StructArray 元素層級 `<code translate="no">AnnSearchRequest</code> ` 物件的摺疊設定。請勿將其用於 EmbeddingList 請求、集合層級向量請求，或同結構的 StructArray 元素層級混合搜尋。</p>
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
    </button></h2><p>在執行混合搜尋之前，請先準備好集合、資料和索引。</p>
<table>
<thead>
<tr><th>需求</th><th>詳細資訊</th></tr>
</thead>
<tbody>
<tr><td>StructArray 欄位</td><td>該集合包含一個 StructArray 欄位，例如<code translate="no">chunks</code> 。</td></tr>
<tr><td>向量子欄位</td><td>請分別使用獨立的向量子欄位來執行 EmbeddingList 搜尋與元素層級搜尋。</td></tr>
<tr><td>索引</td><td><code translate="no">chunks[emb_list_vector]</code> 使用<code translate="no">MAX_SIM*</code> 度量。<code translate="no">chunks[emb]</code> 則使用常規向量度量，例如<code translate="no">COSINE</code> 、<code translate="no">IP</code> 或<code translate="no">L2</code> 。</td></tr>
<tr><td>重新排序器</td><td>請選擇混合型重新排序器，例如<code translate="no">RRFRanker</code> 或您應用程式所支援的其他重新排序器。</td></tr>
</tbody>
</table>
<p>有關索引設定，請參閱《<a href="/docs/zh-hant/index-structarray-fields.md">Index StructArray 欄位</a>》。</p>
<h2 id="Run-hybrid-search-with-an-EmbeddingList-request" class="common-anchor-header">使用 EmbeddingList 請求執行混合搜尋<button data-href="#Run-hybrid-search-with-an-EmbeddingList-request" class="anchor-icon" translate="no">
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
    </button></h2><p>在混合搜尋中，針對 StructArray 向量子欄位的 EmbeddingList 搜尋屬於實體層級。其運作方式類似實體層級的向量搜尋請求，且不會返回單一匹配的 Struct 元素偏移量。</p>
<pre><code translate="no">from pymilvus import AnnSearchRequest, MilvusClient, RRFRanker
from pymilvus.client.embedding_list import EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [0.19, 0.24, 0.30, 0.37]

query_list = EmbeddingList()
query_list.add([0.12, 0.21, 0.32, 0.44])
query_list.add([0.18, 0.23, 0.29, 0.36])

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=10,
)

chunk_list_req = AnnSearchRequest(
    data=[query_list],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    limit=10,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_list_req],
    ranker=RRFRanker(),
    limit=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>在此範例中，兩個<code translate="no">AnnSearchRequest</code> 物件均產生實體層級的候選結果。最終結果以父實體的主鍵作為索引。請勿將 `<code translate="no">element_scope</code> ` 加入 EmbeddingList 請求中。</p>
<h2 id="Run-same-StructArray-element-level-hybrid-search" class="common-anchor-header">執行同 StructArray 元素層級混合搜尋<button data-href="#Run-same-StructArray-element-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>當所有 `<code translate="no">AnnSearchRequest</code> ` 物件皆針對同一 `StructArray` 欄位下的元素層級向量子欄位時，混合搜尋可透過重新排序來保留元素層級候選結果。這是唯一一種最終結果仍維持在元素層級的 `StructArray` 混合模式。</p>
<p>以下範例假設<code translate="no">chunks</code> 的 StructArray 欄位有兩個元素級向量子欄位，分別為<code translate="no">chunks[emb]</code> 與<code translate="no">chunks[code_emb]</code> ，且兩者均使用標準向量度量標準。</p>
<pre><code translate="no">index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
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
<p>兩個<code translate="no">AnnSearchRequest</code> 物件皆在<code translate="no">chunks</code> 下搜尋向量子欄位。相同的以零為起點的偏移量指向同一個 Struct 元素，因此混合重新排序器可直接對元素候選項進行排序。請勿在此模式下設定<code translate="no">element_scope</code> ，因為不會執行實體層級的彙總。</p>
<h2 id="Collapse-element-level-hits-for-entity-level-hybrid-search" class="common-anchor-header">針對實體層級混合搜尋彙整元素層級的搜尋結果<button data-href="#Collapse-element-level-hits-for-entity-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>若混合搜尋同時包含 StructArray 元素層級的<code translate="no">AnnSearchRequest</code> ，以及集合層級的向量請求、EmbeddingList 請求，或位於不同 StructArray 欄位下的元素層級請求，則最終候選範圍為實體層級。在此情況下，每個 StructArray 元素層級的<code translate="no">AnnSearchRequest</code> 都會在混合重新排序前，彙總為實體層級的候選項目。</p>
<p>當您需要控制如何彙總來自同一實體的多個匹配元素時，請在 StructArray 元素層級<code translate="no">AnnSearchRequest</code> 的<code translate="no">params</code> 中使用<code translate="no">element_scope</code> 。</p>
<pre><code translate="no">title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;element_scope&quot;</span>: {
                <span class="hljs-string">&quot;collapse&quot;</span>: {
                    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;topk_sum&quot;</span>,
                    <span class="hljs-string">&quot;topk&quot;</span>: 3,
                },
            },
        },
    },
    <span class="hljs-built_in">limit</span>=30,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[quality_score] &gt; 0.8)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
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
<p>在此範例中，<code translate="no">title_req</code> 為實體層級，因此最終的混合結果亦為實體層級。<code translate="no">chunk_req</code> 請求會先從<code translate="no">chunks[emb]</code> 返回元素命中結果，接著透過將來自同一實體的返回元素中最佳的三個元素分數相加，來彙總這些元素。若在需要實體層級彙總時省略<code translate="no">element_scope</code> ，彙總策略將預設為<code translate="no">max</code> 。</p>
<h2 id="Choose-a-collapse-strategy" class="common-anchor-header">選擇彙總策略<button data-href="#Choose-a-collapse-strategy" class="anchor-icon" translate="no">
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
<tr><th>策略</th><th>行為</th><th><code translate="no">topk</code></th><th>指標要求</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max</code></td><td>保留該實體所返回的最佳元素分數。</td><td>不允許。</td><td>任何受支援的常規向量指標。</td></tr>
<tr><td><code translate="no">sum</code></td><td>將該實體所有回傳元素的分數相加。</td><td>不允許。</td><td>僅限正相關指標，例如<code translate="no">IP</code> 或<code translate="no">COSINE</code> 。</td></tr>
<tr><td><code translate="no">avg</code></td><td>將該實體所有回傳元素的評分求平均值。</td><td>不允許。</td><td>任何受支援的常規向量指標。</td></tr>
<tr><td><code translate="no">topk_sum</code></td><td>將該實體所返回的元素中最佳的<code translate="no">K</code> 分數相加。</td><td>此為必填項目，且數值必須為正數。</td><td>僅限正相關指標，例如<code translate="no">IP</code> 或<code translate="no">COSINE</code> 。</td></tr>
<tr><td><code translate="no">topk_avg</code></td><td>對該實體所返回的最佳<code translate="no">K</code> 元素分數求平均值。</td><td>此參數為必填且必須為正數。</td><td>任何受支援的常規向量指標。</td></tr>
</tbody>
</table>
<p>Collapse 僅使用該 StructArray 元素層級<code translate="no">AnnSearchRequest</code> 所回傳的元素命中結果。它在 ANN 搜尋後不會掃描實體中的每個 Struct 元素。請將請求的<code translate="no">limit</code> 設定得足夠高，以提供您希望用於 Collapse 的元素。</p>
<h2 id="Add-filters-range-search-and-grouping" class="common-anchor-header">新增篩選器、範圍搜尋與分組<button data-href="#Add-filters-range-search-and-grouping" class="anchor-icon" translate="no">
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
    </button></h2><p>當標量條件需套用至參與向量搜尋的相同 Struct 元素時，您可以將<code translate="no">element_filter</code> 附加至 StructArray 元素層級的<code translate="no">AnnSearchRequest</code> 。您亦可針對父實體條件，在<code translate="no">hybrid_search()</code> 上使用頂層的<code translate="no">filter</code> 。</p>
<p>StructArray 元素層級向量欄位在混合搜尋中支援範圍搜尋。請將<code translate="no">radius</code> 以及（若需）<code translate="no">range_filter</code> 新增至元素層級的<code translate="no">AnnSearchRequest</code> 中。EmbeddingList 層級的 StructArray 請求不支援範圍搜尋。</p>
<p>僅當所有<code translate="no">AnnSearchRequest</code> 物件皆針對同一 StructArray 欄位下的元素層級向量欄位，且<code translate="no">group_by_field</code> 必須為主鍵時，才支援元素層級的混合分組。若請求混合了集合層級的向量欄位、不同的 StructArray 欄位，或 EmbeddingList 層級的請求，則不支援混合分組。請勿將範圍搜尋與分組結合使用。</p>
<h2 id="Interpret-hybrid-results" class="common-anchor-header">解讀混合結果<button data-href="#Interpret-hybrid-results" class="anchor-icon" translate="no">
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
<tr><th>最終候選範圍</th><th>結果鍵</th><th>偏移量行為</th><th>發生時</th></tr>
</thead>
<tbody>
<tr><td>實體層級</td><td>主鍵。</td><td>最終結果中沒有元素偏移量。</td><td>混合請求包含集合層級的向量欄位、EmbeddingList 請求，或位於不同 StructArray 欄位下的元素層級請求。</td></tr>
<tr><td>元素層級</td><td>主鍵加上父級 StructArray 欄位，再加上元素偏移量。</td><td>當 API 或 SDK 公開時，可返回所選元素的偏移量。</td><td>所有<code translate="no">AnnSearchRequest</code> 物件均為元素層級，且位於同一個 StructArray 字段之下。</td></tr>
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
<li><p>僅將 `<code translate="no">element_scope</code> ` 用於 StructArray 元素層級的 `<code translate="no">AnnSearchRequest</code> ` 物件，這些物件在混合搜尋中必須摺疊為實體層級的候選項目。</p></li>
<li><p>請勿將 `<code translate="no">element_scope</code> ` 用於 `EmbeddingList` 請求、集合層級向量請求，或同一 `StructArray` 元素層級的混合搜尋。</p></li>
<li><p><code translate="no">sum</code> 此外，<code translate="no">topk_sum</code> 的收斂策略需要正相關指標，例如<code translate="no">IP</code> 或<code translate="no">COSINE</code> 。請勿將其與<code translate="no">L2</code> 搭配使用。</p></li>
<li><p><code translate="no">topk_sum</code> 且<code translate="no">topk_avg</code> 需要正的<code translate="no">topk</code> 值。其他彙總策略不得包含<code translate="no">topk</code> 。</p></li>
<li><p>嵌入式清單層級的 StructArray 請求不支援範圍搜尋或分組操作。</p></li>
<li><p>混合分組僅支援相同 StructArray 元素層級的混合搜尋，且僅限透過主鍵進行。</p></li>
<li><p>請勿將範圍搜尋與分組操作結合使用。</p></li>
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
<li><p>在同一個 StructArray 元素層級的混合請求中加入<code translate="no">element_scope</code> 。該請求仍維持在元素層級，不會執行實體層級的彙總。</p></li>
<li><p>將 `<code translate="no">element_scope</code> ` 加入 `<code translate="no">chunks[emb_list_vector]</code>` 中。`EmbeddingList` 搜尋本身已是實體層級的。</p></li>
<li><p>假設兩個 StructArray 欄位共享元素偏移量。<code translate="no">chunks</code> 中的偏移量<code translate="no">3</code> 與另一個 StructArray 欄位中的偏移量<code translate="no">3</code> 對應不同的元素，因此混合請求將轉為實體層級。</p></li>
<li><p>若使用<code translate="no">topk_sum</code> 搭配<code translate="no">L2</code> ，請使用<code translate="no">max</code> 、<code translate="no">avg</code> 或<code translate="no">topk_avg</code> 來處理負數距離度量值。</p></li>
<li><p>預期實體層級的混合結果在摺疊後將包含所選 Struct 元素的偏移量。</p></li>
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
<li><p>若要了解兩種基本的 StructArray 向量搜尋模式，請參閱《<a href="/docs/zh-hant/basic-vector-search-with-structarray.md">使用 StructArray 進行基本向量搜尋</a>》。</p></li>
<li><p>若要將標量篩選器新增至混合搜尋，請參閱《<a href="/docs/zh-hant/filtered-search-with-structarray.md">使用 StructArray 進行篩選搜尋</a>》。</p></li>
<li><p>若要在混合搜尋中使用分數或距離範圍，請參閱《<a href="/docs/zh-hant/range-search-with-structarray.md">使用 StructArray 進行範圍搜尋</a>》。</p></li>
<li><p>若要依父實體對元素層級的混合搜尋結果進行分組，請參閱《<a href="/docs/zh-hant/grouping-search-with-structarray.md">使用 StructArray 進行分組搜尋</a>》。</p></li>
<li><p>若要查看 StructArray 的搜尋限制，請參閱《<a href="/docs/zh-hant/structarray-limits.md">StructArray 限制》</a>。</p></li>
</ol>
