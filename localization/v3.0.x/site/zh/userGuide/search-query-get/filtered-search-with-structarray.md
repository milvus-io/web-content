---
id: filtered-search-with-structarray.md
title: 使用 StructArray 进行过滤搜索
summary: >-
  使用此页面可在 StructArray 字段的向量搜索中添加标量过滤。StructArray
  过滤分为两个层次：行级过滤器用于选择父实体，而元素级过滤器则用于限制哪些 Struct 元素参与元素级的向量搜索。
---
<h1 id="Filtered-Search-with-StructArray" class="common-anchor-header">使用 StructArray 进行过滤搜索<button data-href="#Filtered-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>使用本页面可在 StructArray 字段的向量搜索中添加标量过滤。StructArray 过滤分为两个层次：行级过滤器用于选择父实体，而元素级过滤器则用于限定哪些 Struct 元素参与元素级的向量搜索。</p>
<p>本页面<a href="/docs/zh/create-structarray-field.md">使用“创建 StructArray 字段”</a>中的<code translate="no">tech_articles</code> Collection。该 Collection 包含一个名为<code translate="no">chunks</code> 的 StructArray 字段，其中包含<code translate="no">section</code> 、<code translate="no">page</code> 、<code translate="no">quality_score</code> 和<code translate="no">has_code</code> 等标量子字段，以及用于搜索的向量字段。</p>
<h2 id="Choose-a-filter-type" class="common-anchor-header">选择过滤器类型<button data-href="#Choose-a-filter-type" class="anchor-icon" translate="no">
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
<tr><th>目标</th><th>用途</th><th>结果行为</th></tr>
</thead>
<tbody>
<tr><td>按顶级标量字段（例如<code translate="no">category</code> ）进行过滤。</td><td>常规筛选表达式。</td><td>在搜索之前或期间选择父实体。</td></tr>
<tr><td>将元素级向量搜索限制为符合标量条件的 Struct 元素。</td><td><code translate="no">element_filter</code>.</td><td>仅搜索匹配的 Struct 元素，并可返回匹配元素的偏移量。</td></tr>
<tr><td>根据任何、所有或特定数量的 Struct 元素是否匹配谓词来选择实体。</td><td><code translate="no">MATCH_ANY</code>、<code translate="no">MATCH_ALL</code> 、<code translate="no">MATCH_LEAST</code> 、<code translate="no">MATCH_MOST</code> 或<code translate="no">MATCH_EXACT</code> 。</td><td>行级过滤。这些操作符本身不会返回偏移量。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>本页说明如何在搜索工作流中使用 StructArray 过滤器。有关完整的语法规则、支持的谓词类型以及不支持的谓词矩阵，请参阅<a href="/docs/zh/struct-array-operators.md">StructArray 操作符</a>。</p>
</div>
<h2 id="Filter-by-top-level-fields" class="common-anchor-header">按顶级字段过滤<button data-href="#Filter-by-top-level-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>当条件属于父实体而非单个 Struct 元素时，请使用常规过滤表达式。这适用于 EmbeddingList 搜索和元素级搜索。</p>
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
<p>上述过滤器仅选择其顶级<code translate="no">category</code> 字段值为<code translate="no">&quot;search&quot;</code> 的实体。它不会识别出单个匹配的Struct元素。</p>
<h2 id="Filter-element-level-vector-search" class="common-anchor-header">过滤元素级向量搜索<button data-href="#Filter-element-level-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>当标量条件必须应用于参与元素级向量搜索的同一 Struct 元素时，请使用<code translate="no">element_filter(structArrayField, predicate)</code> 。在谓词内部，使用<code translate="no">$[subfield]</code> 来引用当前 Struct 元素的标量子字段。</p>
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
<p>在此示例中，顶级谓词<code translate="no">category == &quot;search&quot;</code> 用于选择候选实体，而<code translate="no">element_filter</code> 将元素级向量搜索限制在满足以下条件的块中：<code translate="no">section</code> 、<code translate="no">quality_score</code> 和<code translate="no">has_code</code> 在同一个 Struct 元素中均匹配。</p>
<div class="alert note">
<p>警告</p>
<p>当将顶级谓词与<code translate="no">element_filter</code> 结合使用时，请将<code translate="no">element_filter</code> 置于表达式的末尾。一个过滤表达式中只能包含一个<code translate="no">element_filter</code> ，且不能将<code translate="no">element_filter</code> 或<code translate="no">MATCH_*</code> 嵌套在另一个StructArray操作符内部。</p>
</div>
<h2 id="Filter-entities-with-MATCH-operators" class="common-anchor-header">使用 MATCH 操作符过滤实体<button data-href="#Filter-entities-with-MATCH-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>当筛选需根据父实体的 Struct 元素来决定其是否符合条件时，请使用<code translate="no">MATCH_*</code> 操作符。这些操作符属于行级筛选：它们用于选择实体，但本身不会返回元素偏移量。</p>
<table>
<thead>
<tr><th>操作符</th><th>适用场景</th><th>示例</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY</code></td><td>至少有一个 Struct 元素必须满足谓词。</td><td><code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code></td></tr>
<tr><td><code translate="no">MATCH_ALL</code></td><td>所有 Struct 元素都必须满足谓词。</td><td><code translate="no">MATCH_ALL(chunks, $[quality_score] &gt; 0.5)</code></td></tr>
<tr><td><code translate="no">MATCH_LEAST</code></td><td>至少有<code translate="no">N</code> 个 Struct 元素必须满足该谓词。</td><td><code translate="no">MATCH_LEAST(chunks, $[has_code] == true, threshold=2)</code></td></tr>
<tr><td><code translate="no">MATCH_MOST</code></td><td>至多有<code translate="no">N</code> 个Struct元素必须满足该谓词。</td><td><code translate="no">MATCH_MOST(chunks, $[section] == &quot;appendix&quot;, threshold=1)</code></td></tr>
<tr><td><code translate="no">MATCH_EXACT</code></td><td>必须有恰好<code translate="no">N</code> 个Struct元素满足该谓词。</td><td><code translate="no">MATCH_EXACT(chunks, $[section] == &quot;summary&quot;, threshold=1)</code></td></tr>
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
<p>此处使用<code translate="no">MATCH_ANY</code> ，因为EmbeddingList的搜索结果是实体级别的。该过滤器要求该实体中至少有一个片段是高质量的<code translate="no">&quot;index&quot;</code> 片段，但搜索结果本身仍代表父实体。</p>
<h2 id="Use-filters-in-hybrid-search" class="common-anchor-header">在混合搜索中使用过滤器<button data-href="#Use-filters-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>在混合搜索中，应在条件需生效的位置应用 StructArray 过滤器。顶级过滤器可由整个混合搜索共享。对于需要元素级约束的 StructArray 元素级请求，应附加<code translate="no">element_filter</code> 。</p>
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
<p><code translate="no">filter</code> 参数应用顶级实体条件，而<code translate="no">chunk_req</code> 上的<code translate="no">expr</code> 仅对StructArray元素级向量请求进行约束。有关受支持的混合搜索组合及特定版本的限制，请参阅<a href="/docs/zh/hybrid-search-with-structarray.md">《基于StructArray的混合搜索》</a>和<a href="/docs/zh/structarray-limits.md">《StructArray限制</a>》。</p>
<h2 id="Predicate-support-summary" class="common-anchor-header">谓词支持摘要<button data-href="#Predicate-support-summary" class="anchor-icon" translate="no">
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
    </button></h2><p>在 StructArray 谓词中使用向量子字段。向量子字段不能作为标量谓词的输入。</p>
<table>
<thead>
<tr><th>子字段类型</th><th>典型谓词示例</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">$[has_code] == true</code>,<code translate="no">!($[has_code] == true)</code></td></tr>
<tr><td>整数类型</td><td><code translate="no">$[page] &gt;= 2</code>,<code translate="no">$[page] in [1, 2, 3]</code></td></tr>
<tr><td><code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code></td><td><code translate="no">$[quality_score] &gt; 0.9</code>,<code translate="no">0.7 &lt; $[quality_score] &lt; 0.95</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">$[section] == &quot;index&quot;</code>,<code translate="no">$[text] like &quot;range%&quot;</code></td></tr>
<tr><td>向量子场</td><td>不支持作为<code translate="no">$[...]</code> 标量谓词的输入。请改用向量搜索来处理向量子字段。</td></tr>
</tbody>
</table>
<p>对于不支持的情况（例如 JSON 路径、数组容器函数、文本匹配函数、针对<code translate="no">$[...]</code> 的 null 谓词、几何函数、Timestamptz 表达式以及泛型函数调用），请参阅<a href="/docs/zh/struct-array-operators.md">StructArray 操作符</a>。</p>
<h2 id="Common-mistakes" class="common-anchor-header">常见错误<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>在<code translate="no">element_filter</code> 或<code translate="no">MATCH_*</code> 之外使用<code translate="no">$[subfield]</code> 。</p></li>
<li><p>使用<code translate="no">chunks.section</code> 代替StructArray操作符语法（如<code translate="no">element_filter(chunks, $[section] == &quot;index&quot;)</code> ）。</p></li>
<li><p>仅需行级过滤时却使用<code translate="no">element_filter</code> 。若仅需选择实体，请改用<code translate="no">MATCH_ANY</code> 。</p></li>
<li><p>期望 `<code translate="no">MATCH_*</code> ` 返回元素偏移量。这些操作符用于选择实体，本身并不能识别出单个匹配元素。</p></li>
<li><p>编写裸布尔谓词，例如<code translate="no">$[has_code]</code> 。请使用显式比较，例如<code translate="no">$[has_code] == true</code> 。</p></li>
<li><p>在同一过滤表达式中，将 `<code translate="no">element_filter</code> ` 置于顶级谓词之前。</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">后续步骤<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><p>要查看完整的 StructArray 过滤语法，请阅读《<a href="/docs/zh/struct-array-operators.md">StructArray 操作符</a>》。</p></li>
<li><p>若要先运行未过滤的向量搜索，请阅读《<a href="/docs/zh/basic-vector-search-with-structarray.md">使用 StructArray 进行基本向量搜索</a>》。</p></li>
<li><p>要为常用 StructArray 过滤器创建标量索引，请参阅《<a href="/docs/zh/index-structarray-fields.md">索引 StructArray 字段</a>》。</p></li>
<li><p>要查看特定版本的过滤和搜索限制，请参阅《<a href="/docs/zh/structarray-limits.md">StructArray 限制》</a>。</p></li>
</ol>
