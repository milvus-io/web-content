---
id: filtered-search-with-structarray.md
title: 使用 StructArray 進行篩選搜尋
summary: >-
  請使用此頁面，為 StructArray 欄位的向量搜尋新增標量篩選功能。StructArray
  的篩選分為兩個層級：列層級篩選用於選取父實體，而元素層級篩選則用於限制哪些 Struct 元素會參與元素層級的向量搜尋。
---
<h1 id="Filtered-Search-with-StructArray" class="common-anchor-header">使用 StructArray 進行篩選搜尋<button data-href="#Filtered-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>請使用此頁面，為 StructArray 欄位的向量搜尋新增標量篩選功能。StructArray 篩選分為兩個層級：列層級篩選用於選取父實體，而元素層級篩選則用於限制哪些 Struct 元素會參與元素層級的向量搜尋。</p>
<p>本頁面使用「<a href="/docs/zh-hant/create-structarray-field.md">建立 StructArray 欄位</a>」中的<code translate="no">tech_articles</code> 集合。該集合包含一個名為<code translate="no">chunks</code> 的 StructArray 欄位，其中包含<code translate="no">section</code> 、<code translate="no">page</code> 、<code translate="no">quality_score</code> 及<code translate="no">has_code</code> 等標量子欄位，以及用於搜尋的向量子欄位。</p>
<h2 id="Choose-a-filter-type" class="common-anchor-header">選擇篩選類型<button data-href="#Choose-a-filter-type" class="anchor-icon" translate="no">
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
<tr><th>目標</th><th>用途</th><th>結果行為</th></tr>
</thead>
<tbody>
<tr><td>根據頂層標量欄位（例如<code translate="no">category</code> ）進行篩選。</td><td>常規篩選表達式。</td><td>在搜尋之前或過程中選取父實體。</td></tr>
<tr><td>將元素層級向量搜尋限制為符合標量條件的 Struct 元素。</td><td><code translate="no">element_filter</code>.</td><td>僅搜尋符合條件的 Struct 元素，並可回傳匹配元素的偏移量。</td></tr>
<tr><td>根據是否有任何、所有或特定數量的 Struct 元素符合謂詞來選取實體。</td><td><code translate="no">MATCH_ANY</code>、<code translate="no">MATCH_ALL</code> 、<code translate="no">MATCH_LEAST</code> 、<code translate="no">MATCH_MOST</code> 或<code translate="no">MATCH_EXACT</code> 。</td><td>行級篩選。這些運算子本身不會回傳偏移量。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>本頁說明如何在搜尋工作流程中使用 StructArray 篩選器。有關完整的語法規則、受支援的謂詞類型以及不受支援的謂詞矩陣，請參閱<a href="/docs/zh-hant/struct-array-operators.md">StructArray 運算子</a>。</p>
</div>
<h2 id="Filter-by-top-level-fields" class="common-anchor-header">依頂層欄位篩選<button data-href="#Filter-by-top-level-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>當條件屬於父實體（而非個別 Struct 元素）時，請使用標準篩選表達式。此方法適用於 EmbeddingList 搜尋及元素層級搜尋。</p>
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
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>上述篩選條件僅選取頂層<code translate="no">category</code> 欄位為<code translate="no">&quot;search&quot;</code> 的實體。它不會識別出單一符合條件的Struct元素。</p>
<h2 id="Filter-element-level-vector-search" class="common-anchor-header">篩選元素層級向量搜尋<button data-href="#Filter-element-level-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>當標量條件必須套用至參與元素層級向量搜尋的同一 Struct 元素時，請使用 `<code translate="no">element_filter(structArrayField, predicate)</code> `。在謂詞內部，請使用 `<code translate="no">$[subfield]</code> ` 來引用當前 Struct 元素的標量子欄位。</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9 &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[has_code] == true)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
        <span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
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
<p>在此範例中，頂層謂詞<code translate="no">category == &quot;search&quot;</code> 會選取候選實體，而<code translate="no">element_filter</code> 則將元素層級向量搜尋限制在同時滿足<code translate="no">section</code> 、<code translate="no">quality_score</code> 及<code translate="no">has_code</code> 的區塊內，且這些條件皆須在同一個 Struct 元素中匹配。</p>
<div class="alert note">
<p>警告</p>
<p>當您將頂層謂詞與<code translate="no">element_filter</code> 結合使用時，請將<code translate="no">element_filter</code> 置於表達式的末尾。一個篩選表達式中僅能包含一個<code translate="no">element_filter</code> ，且不得將<code translate="no">element_filter</code> 或<code translate="no">MATCH_*</code> 嵌套在另一個 StructArray 運算子之中。</p>
</div>
<h2 id="Filter-entities-with-MATCH-operators" class="common-anchor-header">使用 MATCH 運算子篩選實體<button data-href="#Filter-entities-with-MATCH-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>當篩選條件需根據父實體的 Struct 元素來判定其是否符合資格時，請使用<code translate="no">MATCH_*</code> 運算子。這些運算子屬於列級篩選：它們會選取實體，但本身不會回傳元素偏移量。</p>
<table>
<thead>
<tr><th>運算子</th><th>適用於</th><th>範例</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY</code></td><td>至少有一個 Struct 元素必須滿足該謂詞。</td><td><code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code></td></tr>
<tr><td><code translate="no">MATCH_ALL</code></td><td>所有 Struct 元素都必須滿足該謂詞。</td><td><code translate="no">MATCH_ALL(chunks, $[quality_score] &gt; 0.5)</code></td></tr>
<tr><td><code translate="no">MATCH_LEAST</code></td><td>至少有<code translate="no">N</code> 個 Struct 元素必須滿足該謂詞。</td><td><code translate="no">MATCH_LEAST(chunks, $[has_code] == true, threshold=2)</code></td></tr>
<tr><td><code translate="no">MATCH_MOST</code></td><td>至多有<code translate="no">N</code> 個 Struct 元素必須滿足該謂詞。</td><td><code translate="no">MATCH_MOST(chunks, $[section] == &quot;appendix&quot;, threshold=1)</code></td></tr>
<tr><td><code translate="no">MATCH_EXACT</code></td><td>必須有恰好<code translate="no">N</code> 個 Struct 元素滿足該謂詞。</td><td><code translate="no">MATCH_EXACT(chunks, $[section] == &quot;summary&quot;, threshold=1)</code></td></tr>
</tbody>
</table>
<pre><code translate="no" class="language-python">filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;MATCH_ANY(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">3</span>,
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
<p>此處使用<code translate="no">MATCH_ANY</code> ，是因為 EmbeddingList 的搜尋結果是實體層級的。此篩選條件要求該實體中至少有一個片段為高品質的<code translate="no">&quot;index&quot;</code> 片段，但搜尋結果本身仍代表父實體。</p>
<h2 id="Use-filters-in-hybrid-search" class="common-anchor-header">在混合搜尋中使用篩選器<button data-href="#Use-filters-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>在混合搜尋中，應在條件需生效之處套用 StructArray 篩選器。頂層篩選器可由整個混合搜尋共用。若需元素層級的限制，應將 `<code translate="no">element_filter</code> ` 附加至需要元素層級限制的 StructArray 元素層級請求上。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">5</span>,
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
<p><code translate="no">filter</code> 參數會套用頂層實體條件，而針對<code translate="no">chunk_req</code> 的<code translate="no">expr</code> 則僅會限制 StructArray 元素層級的向量請求。有關受支援的混合搜尋組合及特定版本的限制，請參閱《<a href="/docs/zh-hant/hybrid-search-with-structarray.md">使用 StructArray 進行混合搜尋</a>》與《<a href="/docs/zh-hant/structarray-limits.md">StructArray 限制》</a>。</p>
<h2 id="Predicate-support-summary" class="common-anchor-header">謂詞支援摘要<button data-href="#Predicate-support-summary" class="anchor-icon" translate="no">
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
    </button></h2><p>請在 StructArray 謂詞中使用標量子欄位。向量子欄位不能作為標量謂詞的輸入。</p>
<table>
<thead>
<tr><th>子欄位類型</th><th>典型謂詞範例</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">$[has_code] == true</code>,<code translate="no">!($[has_code] == true)</code></td></tr>
<tr><td>整數類型</td><td><code translate="no">$[page] &gt;= 2</code>,<code translate="no">$[page] in [1, 2, 3]</code></td></tr>
<tr><td><code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code></td><td><code translate="no">$[quality_score] &gt; 0.9</code>,<code translate="no">0.7 &lt; $[quality_score] &lt; 0.95</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">$[section] == &quot;index&quot;</code>,<code translate="no">$[text] like &quot;range%&quot;</code></td></tr>
<tr><td>向量子域</td><td>不支援作為<code translate="no">$[...]</code> 標量判別式輸入。請改用向量搜尋來處理向量子欄位。</td></tr>
</tbody>
</table>
<p>關於不支援的情況（例如 JSON 路徑、陣列容器函式、文字比對函式、針對<code translate="no">$[...]</code> 的 null 判別式、幾何函式、Timestamptz 表達式以及泛型函式呼叫），請參閱<a href="/docs/zh-hant/struct-array-operators.md">StructArray 運算子</a>。</p>
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
<li><p>在 `<code translate="no">element_filter</code> ` 或 `<code translate="no">MATCH_*</code>` 之外使用 `<code translate="no">$[subfield]</code> `。</p></li>
<li><p>使用 `<code translate="no">chunks.section</code> ` 代替 `<code translate="no">element_filter(chunks, $[section] == &quot;index&quot;)</code>` 等 `StructArray` 運算子語法。</p></li>
<li><p>僅需進行行級篩選時卻使用 `<code translate="no">element_filter</code> `。若僅需選取實體，請改用 `<code translate="no">MATCH_ANY</code> `。</p></li>
<li><p>預期 `<code translate="no">MATCH_*</code> ` 會返回元素偏移量。這些運算子僅用於選取實體，本身並不會識別出單一符合條件的元素。</p></li>
<li><p>撰寫如<code translate="no">$[has_code]</code> 這類未加修飾的布林判別式。請改用明確的比較運算子，例如<code translate="no">$[has_code] == true</code> 。</p></li>
<li><p>將 `<code translate="no">element_filter</code> ` 置於同一篩選表達式中頂層判別式的前方。</p></li>
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
<li><p>若要檢視完整的 StructArray 篩選語法，請參閱《<a href="/docs/zh-hant/struct-array-operators.md">StructArray 運算子</a>》。</p></li>
<li><p>若要先執行未過濾的向量搜尋，請參閱《<a href="/docs/zh-hant/basic-vector-search-with-structarray.md">使用 StructArray 進行基本向量搜尋》</a>。</p></li>
<li><p>若要為常用 StructArray 篩選條件建立標量索引，請參閱《<a href="/docs/zh-hant/index-structarray-fields.md">索引 StructArray 欄位</a>》。</p></li>
<li><p>若要查看特定版本的篩選與搜尋限制，請參閱《<a href="/docs/zh-hant/structarray-limits.md">StructArray 限制》</a>。</p></li>
</ol>
