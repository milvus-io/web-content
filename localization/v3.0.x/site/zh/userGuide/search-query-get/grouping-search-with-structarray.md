---
id: grouping-search-with-structarray.md
title: 使用 StructArray 进行分组搜索
summary: >-
  使用此页面可按父实体对 StructArray 的元素级搜索结果进行分组。当多个 Struct
  元素与查询条件匹配时，元素级搜索可能会返回来自同一实体的多个匹配结果。分组功能会将这些元素级匹配结果合并，从而确保每个父实体最多只出现一次。
---
<h1 id="Grouping-Search-with-StructArray" class="common-anchor-header">使用 StructArray 进行分组搜索<button data-href="#Grouping-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>使用本页面可按父实体对 StructArray 元素级搜索结果进行分组。当多个 Struct 元素匹配查询条件时，元素级搜索可能会返回来自同一实体的多个匹配结果。分组功能会将这些元素级匹配结果合并，确保每个父实体最多只出现一次。</p>
<p>本页面<a href="/docs/zh/create-structarray-field.md">使用“创建 StructArray 字段</a>”中的<code translate="no">tech_articles</code> Collection。该 Collection 包含一个名为<code translate="no">chunks</code> 的StructArray字段。其<code translate="no">chunks[emb]</code> 向量已通过常规向量度量标准进行索引，以支持元素级搜索。</p>
<h2 id="How-grouping-applies-to-StructArray" class="common-anchor-header">分组在 StructArray 中的应用<button data-href="#How-grouping-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>搜索模式</th><th>分组行为</th><th>结果行为</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingList 搜索</td><td>不支持。</td><td>不适用。</td></tr>
<tr><td>元素级搜索</td><td>支持按主键分组。</td><td>每个父实体最多返回一个结果。元素级元数据得以保留，因此当 API 或 SDK 公开时，可以返回所选元素的索引或偏移量。</td></tr>
<tr><td>混合搜索</td><td>仅当所有子搜索都针对同一 StructArray 字段下的元素级向量字段时才受支持。</td><td>在最终结果处理之前，元素级子搜索会按主键进行分组。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>当未分组的元素级搜索返回过多重复的父实体时，请使用分组功能。若希望将每个匹配的 Struct 元素作为单独的命中结果，请使用不带 `<code translate="no">group_by_field</code>`<a href="/docs/zh/basic-vector-search-with-structarray.md">的 StructArray 基本向量搜索</a>。</p>
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
    </button></h2><p>在运行分组搜索之前，请准备好Collection、数据和索引。</p>
<table>
<thead>
<tr><th>要求</th><th>详细信息</th></tr>
</thead>
<tbody>
<tr><td>元素级向量子字段</td><td>请使用 StructArray 向量子字段（例如<code translate="no">chunks[emb]</code> ），并使用常规向量度量进行索引。</td></tr>
<tr><td>常规向量查询</td><td>请使用常规查询向量，而非<code translate="no">EmbeddingList</code> 。</td></tr>
<tr><td>主键分组</td><td>将Collection主键作为<code translate="no">group_by_field</code> ，例如<code translate="no">doc_id</code> 。</td></tr>
<tr><td>不使用范围参数</td><td>请勿将分组搜索与范围搜索参数（如<code translate="no">radius</code> 或<code translate="no">range_filter</code> ）结合使用。</td></tr>
</tbody>
</table>
<p>有关索引设置，请参阅<a href="/docs/zh/index-structarray-fields.md">“Index StructArray Fields</a>”。</p>
<h2 id="Run-grouped-element-level-search" class="common-anchor-header">运行分组元素级搜索<button data-href="#Run-grouped-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>以下示例首先搜索各个数据块，然后根据父实体的主键对元素匹配结果进行分组。</p>
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
<p>如果不进行分组，当多个块匹配查询时，相同的<code translate="no">doc_id</code> 可能会出现多次。使用<code translate="no">group_by_field=&quot;doc_id&quot;</code> 时，每个父实体最多只出现一次。分组会保留元素级元数据，因此当API或SDK公开相关信息时，分组后的结果仍可包含所选的Struct元素索引或偏移量。</p>
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
    </button></h2><p>您可以将分组搜索与 StructArray 标量过滤相结合。当标量条件需要限制哪些 Struct 元素参与元素级向量搜索时，请使用 `<code translate="no">element_filter</code> `。</p>
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
<p>顶级谓词用于筛选候选实体。<code translate="no">element_filter</code> 谓词将元素级向量搜索限制在匹配的Struct元素范围内。随后，分组操作会根据主键将匹配的元素命中结果进行合并。</p>
<h2 id="Use-grouping-in-hybrid-search" class="common-anchor-header">在混合搜索中使用分组<button data-href="#Use-grouping-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>与 StructArray 结合使用的混合分组是一项元素级功能。仅当所有子搜索都针对同一 StructArray 字段下的元素级向量字段时，才支持此功能。请勿在分组的 StructArray 混合搜索中使用 EmbeddingList 级请求。</p>
<p>以下示例假设<code translate="no">chunks</code> 的StructArray字段包含两个元素级向量字段：<code translate="no">chunks[emb]</code> 和<code translate="no">chunks[code_emb]</code> ，且两者均使用常规向量度量进行索引。</p>
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
<p>在此示例中，两个子请求均针对同一 StructArray 字段（<code translate="no">chunks</code> ）下的元素级向量字段。如果混合了普通向量字段、不同的 StructArray 字段或 EmbeddingList 级请求，混合搜索将不支持元素级分组。</p>
<h2 id="Interpret-grouped-results" class="common-anchor-header">解析分组结果<button data-href="#Interpret-grouped-results" class="anchor-icon" translate="no">
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
<tr><td><code translate="no">id</code></td><td>分组父实体的主键。</td></tr>
<tr><td><code translate="no">distance</code> 或得分</td><td>该父实体的所选 Struct 元素的分数或距离。</td></tr>
<tr><td><code translate="no">offset</code></td><td>返回时所选 Struct 元素的从零开始的索引位置。</td></tr>
<tr><td>重复的主键</td><td>按主键分组时不应出现此情况。</td></tr>
<tr><td><code translate="no">limit</code></td><td>适用于按父实体分组的结果。</td></tr>
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
<li><p>分组搜索仅适用于元素级 StructArray 向量搜索。EmbeddingList 搜索和 EmbeddingList 级混合搜索不支持按组分组。</p></li>
<li><p>请将主键用作<code translate="no">group_by_field</code> 。StructArray 元素级分组并非针对任意标量字段的通用分组操作。</p></li>
<li><p>请勿将分组搜索与范围搜索结合使用。</p></li>
<li><p>请勿在分组搜索中使用<code translate="no">EmbeddingList</code> 查询或<code translate="no">MAX_SIM*</code> 度量。</p></li>
<li><p>仅当所有子搜索都针对同一 StructArray 字段下的元素级向量字段时，才支持混合分组。</p></li>
<li><p>当混合搜索混合了普通向量字段、不同的 StructArray 字段或 EmbeddingList 级请求时，不支持混合分组。</p></li>
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
<li><p>将分组与<code translate="no">chunks[emb_list_vector]</code> 结合使用，而该字段专用于 EmbeddingList 搜索。</p></li>
<li><p>按非主键标量字段进行分组。</p></li>
<li><p>按多个字段进行分组。元素级 StructArray 分组仅支持主键分组。</p></li>
<li><p>期望分组结果能代表每个匹配的 Struct 元素。分组每个父实体最多返回一个结果。</p></li>
<li><p>假设按元素级别分组的搜索会重新计算 EmbeddingList 风格的<code translate="no">MAX_SIM*</code> 得分。分组操作会合并元素级别的匹配结果，但不会改变评分模型。</p></li>
<li><p>将<code translate="no">group_by_field</code> 与<code translate="no">radius</code> 或<code translate="no">range_filter</code> 结合使用。</p></li>
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
<li><p>若要先了解未分组的元素级搜索，请阅读《<a href="/docs/zh/basic-vector-search-with-structarray.md">使用 StructArray 进行基础向量搜索</a>》。</p></li>
<li><p>若要为分组搜索添加标量过滤器，请阅读《<a href="/docs/zh/filtered-search-with-structarray.md">使用 StructArray 进行过滤搜索</a>》。</p></li>
<li><p>若要使用得分或距离边界代替分组，请阅读《<a href="/docs/zh/range-search-with-structarray.md">使用 StructArray 进行范围搜索</a>》。</p></li>
<li><p>要查看 StructArray 的搜索限制，请阅读《<a href="/docs/zh/structarray-limits.md">StructArray 限制</a>》。</p></li>
</ol>
