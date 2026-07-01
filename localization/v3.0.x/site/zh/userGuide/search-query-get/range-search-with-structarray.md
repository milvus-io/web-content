---
id: range-search-with-structarray.md
title: 使用 StructArray 进行范围搜索
summary: >-
  使用本页面对 StructArray 的向量子字段执行范围搜索。范围搜索会返回得分或距离落在指定范围内的向量匹配结果。对于 StructArray
  字段，请结合元素级向量搜索使用范围搜索，即对每个 Struct 元素进行独立搜索。
---
<h1 id="Range-Search-with-StructArray" class="common-anchor-header">使用 StructArray 进行范围搜索<button data-href="#Range-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>使用本页面对 StructArray 向量子字段执行范围搜索。范围搜索会返回得分或距离落在指定边界范围内的向量匹配结果。对于 StructArray 字段，请结合元素级向量搜索使用范围搜索，即对每个 Struct 元素进行独立搜索。</p>
<p>本页面使用<a href="/docs/zh/create-structarray-field.md">来自“创建 StructArray 字段”中的</a> <code translate="no">tech_articles</code> Collection。该 Collection 包含一个名为<code translate="no">chunks</code> 的 StructArray 字段。其<code translate="no">chunks[emb]</code> 向量已建立索引，支持使用常规向量度量（如<code translate="no">COSINE</code> 、<code translate="no">IP</code> 或<code translate="no">L2</code> ）进行元素级搜索。</p>
<h2 id="How-range-search-applies-to-StructArray" class="common-anchor-header">范围搜索在 StructArray 中的应用<button data-href="#How-range-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>搜索模式</th><th>范围搜索行为</th><th>结果粒度</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingList 搜索</td><td>不支持。</td><td>不适用。</td></tr>
<tr><td>元素级搜索</td><td>使用常规向量查询，配合 `<code translate="no">radius</code> ` 以及可选的 `<code translate="no">range_filter</code>`。</td><td>结构元素级别。</td></tr>
<tr><td>混合搜索</td><td>当 StructArray 请求针对元素级向量字段时支持。EmbeddingList 级请求不支持范围搜索。</td><td>先进行元素级子搜索，然后进行混合重新排序。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>如果您只需要最近的 Struct 元素，请先使用<a href="/docs/zh/basic-vector-search-with-structarray.md">StructArray 进行基本向量搜索</a>。当结果必须满足分数或距离边界（而非仅满足前 K 名排名）时，请使用范围搜索。</p>
</div>
<h2 id="Before-you-begin" class="common-anchor-header">开始之前<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>在运行范围搜索之前，请准备好Collection、数据和索引。</p>
<table>
<thead>
<tr><th>要求</th><th>详细信息</th></tr>
</thead>
<tbody>
<tr><td>StructArray 字段</td><td>Collection 包含一个 StructArray 字段，例如<code translate="no">chunks</code> 。</td></tr>
<tr><td>元素级向量子字段</td><td>目标量子向量是<code translate="no">chunks[emb]</code> ，而不是<code translate="no">chunks[emb_list_vector]</code> 。</td></tr>
<tr><td>索引度量</td><td>该向量子场采用常规向量度量进行索引，例如<code translate="no">COSINE</code> 、<code translate="no">IP</code> 或<code translate="no">L2</code> 。</td></tr>
<tr><td>查询数据</td><td>查询对象是一个常规向量，而非<code translate="no">EmbeddingList</code> 。</td></tr>
</tbody>
</table>
<p>有关索引设置，请参阅《<a href="/docs/zh/index-structarray-fields.md">索引 StructArray 字段</a>》。</p>
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
    </button></h2><p>设置 `<code translate="no">radius</code> ` 以定义搜索边界。若同时需要内部边界，请设置 `<code translate="no">range_filter</code> `。方向取决于“更小的距离”与“更高的相似度得分”何者更优。</p>
<table>
<thead>
<tr><th>度量类型</th><th>分数越高越好？</th><th>使用<code translate="no">range_filter</code> 时的范围条件</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">L2</code></td><td>不。距离越小越好。</td><td><code translate="no">range_filter &lt;= distance &lt; radius</code></td></tr>
<tr><td><code translate="no">IP</code>,<code translate="no">COSINE</code></td><td>是的。分数越大越好。</td><td><code translate="no">radius &lt; distance &lt;= range_filter</code></td></tr>
</tbody>
</table>
<p>当仅设置<code translate="no">radius</code> 时，范围搜索会返回满足该度量外边界条件的匹配结果。请根据Embeddings模型的分数或距离量表选择相应值。</p>
<h2 id="Run-element-level-range-search" class="common-anchor-header">执行元素级范围搜索<button data-href="#Run-element-level-range-search" class="anchor-icon" translate="no">
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
    </button></h2><p>以下示例搜索那些其<code translate="no">chunks[emb]</code> 向量与查询向量足够相似的单个片段。每个匹配结果代表一个匹配的Struct元素。</p>
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
<p>在此示例中，<code translate="no">COSINE</code> 是一种相似度型度量，因此结果范围大于<code translate="no">radius</code> 且小于或等于<code translate="no">range_filter</code> 。返回时，<code translate="no">offset</code> 值用于标识<code translate="no">chunks</code> 数组中匹配的 Struct 元素。</p>
<h2 id="Add-scalar-filters" class="common-anchor-header">添加标量过滤器<button data-href="#Add-scalar-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以将元素级范围搜索与 StructArray 标量过滤相结合。对父实体字段使用顶级谓词，并使用<code translate="no">element_filter</code> 来限制哪些 Struct 元素参与向量范围搜索。</p>
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
<p>顶级谓词用于筛选候选实体。<code translate="no">element_filter</code> 谓词则将向量范围搜索限制在匹配的Struct元素上。有关更多过滤示例，请参阅《<a href="/docs/zh/filtered-search-with-structarray.md">使用StructArray进行过滤搜索</a>》。</p>
<h2 id="Use-range-search-in-hybrid-search" class="common-anchor-header">在混合搜索中使用范围搜索<button data-href="#Use-range-search-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 元素级向量字段支持在混合搜索中进行范围搜索。请将 `<code translate="no">radius</code> ` 以及（可选）`<code translate="no">range_filter</code> ` 添加到针对 StructArray 元素级向量字段的 `<code translate="no">AnnSearchRequest</code> ` 中。</p>
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
<p>在此示例中，仅<code translate="no">chunks[emb]</code> 子请求使用了范围搜索参数。StructArray请求仍遵循元素级语义：范围边界适用于Struct元素的匹配结果，此后混合搜索才会合并并重新排序结果。</p>
<h2 id="Interpret-range-results" class="common-anchor-header">解析范围搜索结果<button data-href="#Interpret-range-results" class="anchor-icon" translate="no">
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
<tr><th>结果项</th><th>含义</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>包含匹配 Struct 元素的实体的主键。</td></tr>
<tr><td><code translate="no">distance</code> 或得分</td><td>查询向量与匹配的 Struct 元素向量之间的得分或距离。</td></tr>
<tr><td><code translate="no">offset</code></td><td>返回时，匹配的 Struct 元素在 StructArray 字段中的从零起算的位置。</td></tr>
<tr><td>重复的主键</td><td>可能出现。同一实体中的多个 Struct 元素可能落在指定范围内。</td></tr>
<tr><td><code translate="no">limit</code></td><td>适用于元素命中，而非唯一的父实体。</td></tr>
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
<li><p>请勿对 StructArray 向量子域使用<code translate="no">EmbeddingList</code> 查询或<code translate="no">MAX_SIM*</code> 指标进行范围搜索。EmbeddingList 级别的搜索不支持范围搜索。</p></li>
<li><p>请勿将范围搜索与分组搜索结合使用。若需为每个父实体返回一个结果，请执行不带范围参数的元素级搜索，并在支持的情况下使用分组功能。</p></li>
<li><p>StructArray 元素级向量字段支持混合范围搜索。但 EmbeddingList 级别的 StructArray 请求不支持此功能。</p></li>
</ul>
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
<li><p>对<code translate="no">chunks[emb_list_vector]</code> 执行范围搜索，而该指标专用于EmbeddingList搜索。</p></li>
<li><p>在元素级范围搜索中使用<code translate="no">MAX_SIM_COSINE</code> ，而非常规指标（如<code translate="no">COSINE</code> ）。</p></li>
<li><p>使用<code translate="no">EmbeddingList</code> 查询代替常规向量查询。</p></li>
<li><p>期望范围搜索结果按父实体唯一。范围搜索会返回匹配的 Struct 元素命中结果。</p></li>
<li><p>使用 `<code translate="no">chunks.emb</code> ` 代替必需的子字段路径语法 `<code translate="no">chunks[emb]</code>`。</p></li>
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
<li><p>要了解 StructArray 的两种基本向量搜索模式，请阅读《<a href="/docs/zh/basic-vector-search-with-structarray.md">使用 StructArray 进行基本向量搜索</a>》。</p></li>
<li><p>若要为范围搜索添加标量过滤器，请阅读《<a href="/docs/zh/filtered-search-with-structarray.md">使用 StructArray 进行过滤搜索</a>》。</p></li>
<li><p>如需在支持的情况下，为每个父实体最多返回一个结果，请参阅《<a href="/docs/zh/grouping-search-with-structarray.md">使用 StructArray 进行分组搜索</a>》。</p></li>
<li><p>要查看特定版本的搜索限制，请阅读《<a href="/docs/zh/structarray-limits.md">StructArray 限制</a>》。</p></li>
</ol>
