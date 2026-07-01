---
id: hybrid-search-with-structarray.md
title: 使用 StructArray 进行混合搜索
summary: >-
  使用此页面，可将 StructArray 向量搜索与其他向量搜索结合，形成一个混合搜索请求。StructArray
  混合搜索可返回实体级结果或元素级结果，具体取决于您组合的 AnnSearchRequest 对象。
---
<h1 id="Hybrid-Search-with-StructArray" class="common-anchor-header">使用 StructArray 进行混合搜索<button data-href="#Hybrid-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>使用本页面可将 StructArray 向量搜索与其他向量搜索结合，形成一个混合搜索请求。StructArray 混合搜索可返回实体级结果或元素级结果，具体取决于您组合的<code translate="no">AnnSearchRequest</code> 对象。</p>
<p>本页面<a href="/docs/zh/create-structarray-field.md">使用“创建 StructArray 字段</a>”中的<code translate="no">tech_articles</code> Collection。该 Collection 包含一个名为<code translate="no">title_vector</code> 的顶级向量字段，以及一个名为<code translate="no">chunks</code> 的 StructArray 字段。<code translate="no">chunks[emb_list_vector]</code> 子字段已为 EmbeddingList 搜索建立索引，而<code translate="no">chunks[emb]</code> 已为元素级搜索建立索引。</p>
<h2 id="How-hybrid-search-applies-to-StructArray" class="common-anchor-header">混合搜索如何应用于 StructArray<button data-href="#How-hybrid-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th><code translate="no">AnnSearchRequest</code> 组合</th><th>最终候选范围</th><th>结果行为</th><th><code translate="no">element_scope</code></th></tr>
</thead>
<tbody>
<tr><td>Collection 级向量字段 + StructArray 的 EmbeddingList 子字段</td><td>实体级别</td><td>最终候选项以主键为键。</td><td>请勿使用。</td></tr>
<tr><td>Collection级向量字段 + StructArray 元素级子字段</td><td>实体级别</td><td>在混合重新排序之前，元素级命中结果会被折叠为实体级候选结果。</td><td>StructArray 元素级<code translate="no">AnnSearchRequest</code> 上的可选折叠配置。</td></tr>
<tr><td>同一 StructArray 字段下的多个元素级子字段</td><td>元素级别</td><td>最终候选结果以主键加上 Struct 元素偏移量作为键。</td><td>请勿使用。</td></tr>
<tr><td>位于不同 StructArray 字段下的元素级子字段</td><td>实体级别</td><td>元素偏移量不共享标识，因此每个 StructArray 元素级别的<code translate="no">AnnSearchRequest</code> 都会在重新排序之前被折叠。</td><td>每个 StructArray 元素级<code translate="no">AnnSearchRequest</code> 上的可选折叠配置。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>警告</p>
<p>仅在非同结构元素级混合搜索中，使用 `<code translate="no">element_scope</code> ` 来配置 StructArray 元素级<code translate="no">AnnSearchRequest</code> 对象的折叠。请勿将其用于 EmbeddingList 请求、Collection 级向量请求或同 StructArray 元素级混合搜索。</p>
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
    </button></h2><p>在运行混合搜索之前，请准备好Collection、数据和索引。</p>
<table>
<thead>
<tr><th>要求</th><th>详细信息</th></tr>
</thead>
<tbody>
<tr><td>StructArray 字段</td><td>Collection 包含一个 StructArray 字段，例如<code translate="no">chunks</code> 。</td></tr>
<tr><td>向量子场</td><td>请为 EmbeddingList 搜索和元素级搜索分别使用独立的向量字段。</td></tr>
<tr><td>索引</td><td><code translate="no">chunks[emb_list_vector]</code> 使用<code translate="no">MAX_SIM*</code> 度量。<code translate="no">chunks[emb]</code> 使用常规向量度量，例如<code translate="no">COSINE</code> 、<code translate="no">IP</code> 或<code translate="no">L2</code> 。</td></tr>
<tr><td>Rerankers</td><td>请选择一种混合Reranker，例如<code translate="no">RRFRanker</code> 或您的应用程序支持的其他Rerankers。</td></tr>
</tbody>
</table>
<p>有关索引设置，请参阅《<a href="/docs/zh/index-structarray-fields.md">索引 StructArray 字段</a>》。</p>
<h2 id="Run-hybrid-search-with-an-EmbeddingList-request" class="common-anchor-header">使用 EmbeddingList 请求运行混合搜索<button data-href="#Run-hybrid-search-with-an-EmbeddingList-request" class="anchor-icon" translate="no">
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
    </button></h2><p>在混合搜索中，针对 StructArray 向量子字段的 EmbeddingList 搜索属于实体级搜索。其行为类似于实体级向量搜索请求，不会返回单个匹配的 Struct 元素偏移量。</p>
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
<p>在此示例中，两个<code translate="no">AnnSearchRequest</code> 对象均生成实体级候选结果。最终结果以父实体的主键作为键。请勿在 EmbeddingList 请求中添加<code translate="no">element_scope</code> 。</p>
<h2 id="Run-same-StructArray-element-level-hybrid-search" class="common-anchor-header">运行同一 StructArray 的元素级混合搜索<button data-href="#Run-same-StructArray-element-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>当所有 `<code translate="no">AnnSearchRequest</code> ` 对象都针对同一 `StructArray` 字段下的元素级向量子字段时，混合搜索可通过重新排序保留元素级候选结果。这是唯一一种最终结果仍保持为元素级的 `StructArray` 混合模式。</p>
<p>以下示例假设<code translate="no">chunks</code> 的 StructArray 字段包含两个元素级向量子字段：<code translate="no">chunks[emb]</code> 和<code translate="no">chunks[code_emb]</code> ，且两者均使用常规向量度量。</p>
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
<p>这两个<code translate="no">AnnSearchRequest</code> 对象均在<code translate="no">chunks</code> 下搜索向量字段。相同的零基偏移量指向同一个Struct元素，因此混合Reranker可以直接对元素候选项进行排序。在此模式下请勿设置<code translate="no">element_scope</code> ，因为不会执行实体级别的折叠。</p>
<h2 id="Collapse-element-level-hits-for-entity-level-hybrid-search" class="common-anchor-header">为实体级混合搜索折叠元素级命中结果<button data-href="#Collapse-element-level-hits-for-entity-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>如果混合搜索将 StructArray 元素级别的<code translate="no">AnnSearchRequest</code> 与 Collection 级别的向量请求、EmbeddingList 请求，或位于不同 StructArray 字段下的元素级请求混合使用，则最终的候选范围为实体级别。在这种情况下，每个 StructArray 元素级别的<code translate="no">AnnSearchRequest</code> 都会在混合重新排序之前被折叠为实体级别的候选项。</p>
<p>当需要控制同一实体中多个匹配元素的折叠方式时，请在 StructArray 元素级<code translate="no">AnnSearchRequest</code> 的<code translate="no">params</code> 中使用<code translate="no">element_scope</code> 。</p>
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
<p>在此示例中，<code translate="no">title_req</code> 属于实体级，因此最终的混合结果也是实体级的。<code translate="no">chunk_req</code> 请求首先从<code translate="no">chunks[emb]</code> 返回元素命中结果，然后通过汇总同一实体的三个最佳元素得分，将返回的元素进行合并。如果在需要实体级合并时省略了<code translate="no">element_scope</code> ，则合并策略将默认采用<code translate="no">max</code> 。</p>
<h2 id="Choose-a-collapse-strategy" class="common-anchor-header">选择聚合策略<button data-href="#Choose-a-collapse-strategy" class="anchor-icon" translate="no">
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
<tr><th>策略</th><th>行为</th><th><code translate="no">topk</code></th><th>指标要求</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max</code></td><td>保留该实体的最佳返回元素得分。</td><td>不允许。</td><td>任何受支持的常规向量度量。</td></tr>
<tr><td><code translate="no">sum</code></td><td>将该实体的所有返回元素得分相加。</td><td>不允许。</td><td>仅限正相关度量，例如<code translate="no">IP</code> 或<code translate="no">COSINE</code> 。</td></tr>
<tr><td><code translate="no">avg</code></td><td>对该实体的所有返回元素得分求平均值。</td><td>不允许。</td><td>任何受支持的常规向量指标。</td></tr>
<tr><td><code translate="no">topk_sum</code></td><td>将该实体的最佳<code translate="no">K</code> 返回元素得分相加。</td><td>必填项，且必须为正值。</td><td>仅限正相关度量，例如<code translate="no">IP</code> 或<code translate="no">COSINE</code> 。</td></tr>
<tr><td><code translate="no">topk_avg</code></td><td>对该实体返回的<code translate="no">K</code> 中最佳元素得分取平均值。</td><td>必填，且必须为正数。</td><td>任何受支持的常规向量度量。</td></tr>
</tbody>
</table>
<p>Collapse 仅使用该 StructArray 元素级<code translate="no">AnnSearchRequest</code> 返回的元素命中结果。它在 ANN 搜索后不会扫描实体中的每个 Struct 元素。请将请求的<code translate="no">limit</code> 设置得足够高，以确保提供您希望用于折叠的元素。</p>
<h2 id="Add-filters-range-search-and-grouping" class="common-anchor-header">添加过滤器、范围搜索和分组<button data-href="#Add-filters-range-search-and-grouping" class="anchor-icon" translate="no">
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
    </button></h2><p>当标量条件需应用于参与向量搜索的同一组 Struct 元素时，可将<code translate="no">element_filter</code> 附加到 StructArray 元素级别的<code translate="no">AnnSearchRequest</code> 上。您还可以使用<code translate="no">hybrid_search()</code> 上的顶级<code translate="no">filter</code> 来设置父实体条件。</p>
<p>StructArray 元素级向量字段在混合搜索中支持范围搜索。请在元素级<code translate="no">AnnSearchRequest</code> 中添加<code translate="no">radius</code> ，并可选地添加<code translate="no">range_filter</code> 。EmbeddingList 级别的 StructArray 请求不支持范围搜索。</p>
<p>仅当所有<code translate="no">AnnSearchRequest</code> 对象均指向同一StructArray字段下的元素级向量字段，且<code translate="no">group_by_field</code> 必须为主键时，才支持元素级混合分组。若请求混合了集合级向量字段、不同的StructArray字段或EmbeddingList级请求，则不支持混合分组。请勿将范围搜索与分组结合使用。</p>
<h2 id="Interpret-hybrid-results" class="common-anchor-header">解释混合结果<button data-href="#Interpret-hybrid-results" class="anchor-icon" translate="no">
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
<tr><th>最终候选范围</th><th>结果键</th><th>偏移量行为</th><th>发生条件</th></tr>
</thead>
<tbody>
<tr><td>实体级别</td><td>主键。</td><td>最终结果中不包含元素偏移量。</td><td>混合请求包含 Collection 级向量字段、EmbeddingList 请求，或位于不同 StructArray 字段下的元素级请求。</td></tr>
<tr><td>元素级别</td><td>主键加上父级 StructArray 字段加上元素偏移量。</td><td>当 API 或 SDK 公开时，可返回所选元素的偏移量。</td><td>所有<code translate="no">AnnSearchRequest</code> 对象均为元素级，且位于同一个StructArray字段下。</td></tr>
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
<li><p>仅将<code translate="no">element_scope</code> 用于 StructArray 元素级别的<code translate="no">AnnSearchRequest</code> 对象，这些对象在混合搜索中必须折叠为实体级别的候选结果。</p></li>
<li><p>请勿将<code translate="no">element_scope</code> 用于 EmbeddingList 请求、Collection 级向量请求或同一 StructArray 元素级的混合搜索。</p></li>
<li><p><code translate="no">sum</code> <code translate="no">topk_sum</code> 的折叠策略需要正相关度量，例如 或 。请勿将其与 配合使用。<code translate="no">IP</code> <code translate="no">COSINE</code> <code translate="no">L2</code></p></li>
<li><p><code translate="no">topk_sum</code> <code translate="no">topk_avg</code> 需要正的 值。其他折叠策略不得包含 。<code translate="no">topk</code> <code translate="no">topk</code></p></li>
<li><p>EmbeddingList 级别的 StructArray 请求不支持范围搜索或分组操作。</p></li>
<li><p>混合分组仅支持针对同一 StructArray 元素级别的混合搜索，且仅支持按主键进行。</p></li>
<li><p>请勿将范围搜索与分组操作结合使用。</p></li>
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
<li><p>在同一 StructArray 元素级混合请求中添加<code translate="no">element_scope</code> 。该请求仍为元素级，不会执行实体级折叠。</p></li>
<li><p>将<code translate="no">element_scope</code> 添加到<code translate="no">chunks[emb_list_vector]</code> 中。EmbeddingList搜索已经是实体级别的。</p></li>
<li><p>假设两个 StructArray 字段共享元素偏移量。<code translate="no">chunks</code> 中的偏移量<code translate="no">3</code> 与另一个 StructArray 字段中的偏移量<code translate="no">3</code> 对应的是不同的元素，因此该混合请求将变为实体级。</p></li>
<li><p>使用<code translate="no">topk_sum</code> 时，请配合<code translate="no">L2</code> 一起使用。若距离度量为负值，请使用<code translate="no">max</code> 、<code translate="no">avg</code> 或<code translate="no">topk_avg</code> 。</p></li>
<li><p>预期实体级混合结果在折叠后将包含所选 Struct 元素的偏移量。</p></li>
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
<li><p>要向混合搜索添加标量过滤器，请阅读《<a href="/docs/zh/filtered-search-with-structarray.md">使用 StructArray 进行过滤搜索</a>》。</p></li>
<li><p>要了解如何在混合搜索中使用得分或距离边界，请阅读《<a href="/docs/zh/range-search-with-structarray.md">使用 StructArray 进行范围搜索</a>》。</p></li>
<li><p>要按父实体对元素级混合搜索结果进行分组，请阅读《<a href="/docs/zh/grouping-search-with-structarray.md">使用 StructArray 进行分组搜索</a>》。</p></li>
<li><p>要查看 StructArray 的搜索限制，请阅读《<a href="/docs/zh/structarray-limits.md">StructArray 限制</a>》。</p></li>
</ol>
