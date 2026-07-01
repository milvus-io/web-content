---
id: basic-vector-search-with-structarray.md
title: 使用 StructArray 进行基础向量搜索
summary: >-
  使用此页面可在 StructArray 字段内的向量字段上执行向量搜索。StructArray
  支持两种基本的向量搜索模式：嵌入列表搜索（对存储在每个实体中的嵌入列表进行评分）和元素级搜索（独立搜索每个 Struct 元素）。
---
<h1 id="Basic-Vector-Search-with-StructArray" class="common-anchor-header">使用 StructArray 进行基础向量搜索<button data-href="#Basic-Vector-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>使用本页面可在 StructArray 字段内的向量字段上执行向量搜索。StructArray 支持两种基本向量搜索模式：嵌入列表搜索（对存储在每个实体中的嵌入列表进行评分）和元素级搜索（独立搜索每个 Struct 元素）。</p>
<p>本页面<a href="/docs/zh/create-structarray-field.md">使用“创建 StructArray 字段</a>”中的<code translate="no">tech_articles</code> Collection。该 Collection 包含一个名为<code translate="no">chunks</code> 的 StructArray 字段。每个块包含文本、标量元数据、一个名为<code translate="no">emb_list_vector</code> 的向量字段（带有用于嵌入列表搜索的索引），以及一个名为<code translate="no">emb</code> 的向量字段（带有用于元素级搜索的索引）。</p>
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
    </button></h2><p>请确保Collection Schema、数据和索引已准备就绪。</p>
<table>
<thead>
<tr><th>要求</th><th>准备位置</th></tr>
</thead>
<tbody>
<tr><td>创建一个 StructArray 字段，例如<code translate="no">chunks</code> 。</td><td><a href="/docs/zh/create-structarray-field.md">创建 StructArray 字段</a></td></tr>
<tr><td>插入其<code translate="no">chunks</code> 字段包含Struct对象的实体。</td><td><a href="/docs/zh/insert-data-into-structarray-fields.md">将数据插入 StructArray 字段</a></td></tr>
<tr><td>在<code translate="no">chunks[emb_list_vector]</code> 上创建<code translate="no">MAX_SIM*</code> 索引，用于EmbeddingList搜索。</td><td><a href="/docs/zh/index-structarray-fields.md">为 StructArray 字段建立索引</a></td></tr>
<tr><td>在<code translate="no">chunks[emb]</code> 上创建常规向量度量索引，用于元素级搜索。</td><td><a href="/docs/zh/index-structarray-fields.md">为 StructArray 字段建立索引</a></td></tr>
</tbody>
</table>
<div class="alert note">
<p>警告</p>
<p>一个向量字段或向量子字段只能接受一个索引。如果您同时需要 EmbeddingList 搜索和元素级搜索，请创建两个独立的向量子字段。在此页面中，<code translate="no">chunks[emb_list_vector]</code> 被索引用于 EmbeddingList 搜索，而<code translate="no">chunks[emb]</code> 被索引用于元素级搜索。</p>
</div>
<h2 id="Choose-a-search-mode" class="common-anchor-header">选择搜索模式<button data-href="#Choose-a-search-mode" class="anchor-icon" translate="no">
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
<tr><th>方面</th><th>EmbeddingList 搜索</th><th>元素级搜索</th></tr>
</thead>
<tbody>
<tr><td>目标子字段</td><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>查询数据</td><td>一个包含一个或多个向量的嵌入列表。</td><td>一个常规向量。</td></tr>
<tr><td>度量族</td><td><code translate="no">MAX_SIM*</code>，例如<code translate="no">MAX_SIM_COSINE</code> 。</td><td>常规向量度量，例如<code translate="no">COSINE</code> 、<code translate="no">IP</code> 或<code translate="no">L2</code> 。</td></tr>
<tr><td>一个匹配结果代表什么</td><td>一个匹配的实体，其 StructArray 向量子场与查询嵌入列表相似。</td><td>StructArray 字段内的匹配 Struct 元素。</td></tr>
<tr><td>结果粒度</td><td>实体级别。</td><td>Struct 元素级别。</td></tr>
<tr><td>偏移量</td><td>不适用。</td><td>标识返回时匹配的结构体元素的零基位置。</td></tr>
<tr><td>典型用法</td><td>ColBERT、ColPali 及其他后期交互检索模式。</td><td>块级、段落级、片段级、补丁级或事实级检索。</td></tr>
</tbody>
</table>
<h2 id="Run-EmbeddingList-search" class="common-anchor-header">运行 EmbeddingList 搜索<button data-href="#Run-EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h2><p>当查询本身包含多个向量，且目标 StructArray 向量子字段使用<code translate="no">MAX_SIM*</code> 度量进行索引时，请使用 EmbeddingList 搜索。结果为实体级匹配。</p>
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
<p>在此搜索模式下，<code translate="no">limit</code> 控制每个查询返回的实体数量。输出可能包含 StructArray 子字段，但命中结果本身代表匹配的父实体，而非某个特定的 Struct 元素。</p>
<div class="alert note">
<p>如需完整的 ColBERT 或 ColPali 风格操作指南，请参阅《<a href="/docs/zh/search-with-embedding-lists.md">使用 Embeddings 进行搜索》</a>。本页面仅介绍 StructArray 的基本搜索行为。</p>
</div>
<h2 id="Run-element-level-search" class="common-anchor-header">运行元素级搜索<button data-href="#Run-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>当每个 Struct 元素应独立参与向量搜索时，请使用元素级搜索。查询是一个常规向量，且目标向量子字段必须使用常规向量度量进行索引。</p>
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
<p>在元素级搜索中，每个命中结果代表一个匹配的 Struct 元素。<code translate="no">offset</code> 值是该元素在 StructArray 字段中的零起始位置。如果多个 Struct 元素与查询匹配，同一实体可能会出现多次。<code translate="no">limit</code> 值适用于元素命中结果，而非唯一的父实体。</p>
<h2 id="Interpret-results" class="common-anchor-header">解读结果<button data-href="#Interpret-results" class="anchor-icon" translate="no">
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
<tr><th>结果项</th><th>EmbeddingList 搜索</th><th>元素级搜索</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>匹配实体的主键。</td><td>包含匹配的 Struct 元素的实体的主键。</td></tr>
<tr><td><code translate="no">distance</code> 或得分</td><td>查询Embeddings列表与存储的Embeddings列表之间的得分或距离。</td><td>查询向量与匹配的 Struct 元素向量之间的得分或距离。</td></tr>
<tr><td><code translate="no">offset</code></td><td>不适用。</td><td>返回时匹配的 Struct 元素的从零开始的索引位置。</td></tr>
<tr><td>重复的主键</td><td>由于结果是实体级别的，因此单个查询中不应出现这种情况。</td><td>可能出现，因为同一实体中的多个 Struct 元素可能会匹配。</td></tr>
<tr><td>请求的 StructArray 输出字段</td><td>从匹配的实体中返回。</td><td>将根据目标 API 和 SDK 支持的元素级命中结构进行返回。</td></tr>
</tbody>
</table>
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
<li><p>使用<code translate="no">chunks.emb</code> 代替必需的子字段路径语法<code translate="no">chunks[emb]</code> 。</p></li>
<li><p>对使用常规向量度量进行索引的向量子字段使用 EmbeddingList 查询。</p></li>
<li><p>对使用<code translate="no">MAX_SIM*</code> 度量进行索引的向量字段使用常规向量查询。</p></li>
<li><p>期望元素级搜索<code translate="no">limit</code> 返回相应数量的唯一父实体。它返回的是元素匹配结果。</p></li>
<li><p>预期 EmbeddingList 搜索会返回一个特定的元素偏移量，但实际返回的是实体级别的匹配结果。</p></li>
<li><p>将同一个向量子场同时用于两种搜索模式。应使用独立的向量子场，因为每个向量子场仅支持一种索引。</p></li>
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
<li><p>若要通过标量条件限制元素级搜索，请参阅《<a href="/docs/zh/filtered-search-with-structarray.md">使用 StructArray 进行过滤搜索</a>》。</p></li>
<li><p>若要按得分或距离阈值进行搜索，请参阅《<a href="/docs/zh/range-search-with-structarray.md">使用 StructArray 进行范围搜索</a>》。</p></li>
<li><p>若要在元素级搜索后，为每个父实体最多返回一个结果，请参阅《<a href="/docs/zh/grouping-search-with-structarray.md">使用 StructArray 进行分组搜索</a>》。</p></li>
<li><p>若要将 StructArray 搜索与其他向量搜索结合使用，请参阅《<a href="/docs/zh/hybrid-search-with-structarray.md">使用 StructArray 进行混合搜索</a>》。</p></li>
<li><p>要查看支持的数据类型、度量、过滤器以及特定版本的限制，请参阅《<a href="/docs/zh/structarray-limits.md">StructArray 限制</a>》。</p></li>
</ol>
