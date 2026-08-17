---
id: array-of-structs.md
title: StructArray 概述
summary: >-
  当某个实体需要存储结构化元素的有序列表时，应使用
  StructArray，例如包含多个片段的文档、包含多个视觉片段的页面，或包含多个视频片段的视频。StructArray
  将这些元素保存在父实体内部，同时仍允许对每个元素内部的字段进行向量搜索和标量过滤。
---
<h1 id="StructArray-Overview" class="common-anchor-header">StructArray 概述<button data-href="#StructArray-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>当某个实体需要存储结构化元素的有序列表时，应使用 StructArray，例如包含多个片段的文档、包含多个视觉片段的页面，或包含多个视频片段的视频。StructArray 将这些元素保存在父实体内部，同时仍允许对每个元素内部的字段进行向量搜索和标量过滤。</p>
<h2 id="What-is-StructArray" class="common-anchor-header">什么是 StructArray？<button data-href="#What-is-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>StructArray</strong>（也称为结构体数组）在每个实体中存储一组有序的 Struct 元素。数组中的每个 Struct 元素都遵循相同的 Schema。一个 Struct 元素可以包含标量子字段、向量字段，或两者兼有。</p>
<p>例如，一个Collection可以将一篇文章作为实体存储，并将该文章的片段存储在名为<code translate="no">chunks</code> 的StructArray字段中。每个片段可以包含文本、章节元数据、质量评分以及一个或多个向量嵌入。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;doc_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Vector search tuning guide&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.10</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.40</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Use HNSW efSearch to trade recall for latency.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.11</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.21</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.31</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.41</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.12</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.33</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.39</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Range search returns vectors within a distance boundary.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.86</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.18</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.23</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.29</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.36</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.19</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.37</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>此示例中的两个向量字段分别从两种搜索视角表示同一个片段。<code translate="no">chunks[emb_list_vector]</code> 用于基于<code translate="no">MAX_SIM*</code> 指标的 EmbeddingList 搜索，而<code translate="no">chunks[emb]</code> 用于基于常规向量指标（如<code translate="no">COSINE</code> 、<code translate="no">IP</code> 或<code translate="no">L2</code> ）的元素级搜索。</p>
</div>
<h2 id="When-to-use-StructArray" class="common-anchor-header">何时使用 StructArray<button data-href="#When-to-use-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>当您希望返回的自然单位大于用于搜索或过滤的自然单位时，请使用 StructArray。</p>
<table>
<thead>
<tr><th>用例</th><th>StructArray 的优势</th><th>典型的 StructArray 字段</th></tr>
</thead>
<tbody>
<tr><td>文档检索</td><td>将一个文档作为实体存储，同时对其各分块进行搜索。</td><td><code translate="no">chunks</code></td></tr>
<tr><td>延迟交互检索</td><td>将文档或页面存储为Embeddings列表，并使用<code translate="no">MAX_SIM*</code> 进行评分。</td><td><code translate="no">chunks[emb_list_vector]</code> 或<code translate="no">patches[emb]</code></td></tr>
<tr><td>元素级检索</td><td>返回相关性最高的片段、剪辑、补丁或观测结果，并包含其数组偏移量。</td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>结构化过滤</td><td>根据 Struct 元素内的标量子字段（如 section、score、page 或 flags）进行过滤。</td><td><code translate="no">chunks[section]</code>,<code translate="no">chunks[quality_score]</code></td></tr>
<tr><td>减少重复的父级结果</td><td>将子元素保留在同一父实体下，而不是将每个子元素作为单独的一行存储。</td><td><code translate="no">chunks</code>,<code translate="no">clips</code>,<code translate="no">patches</code></td></tr>
</tbody>
</table>
<h2 id="Decision-Matrix" class="common-anchor-header">决策矩阵<button data-href="#Decision-Matrix" class="anchor-icon" translate="no">
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
    </button></h2><p>使用以下矩阵选择合适的 StructArray 路径。</p>
<table>
<thead>
<tr><th>目标</th><th>推荐路径</th><th>结果粒度</th><th>从这里开始</th></tr>
</thead>
<tbody>
<tr><td>模型一个具有多个结构化子对象的父对象。</td><td>创建一个 StructArray 字段。</td><td>实体包含有序的 Struct 元素。</td><td><a href="/docs/zh/create-structarray-field.md">创建 StructArray 字段</a></td></tr>
<tr><td>插入包含嵌套子数据的父记录。</td><td>插入其 StructArray 字段为 Struct 对象列表的实体。</td><td>实体级插入。</td><td><a href="/docs/zh/insert-data-into-structarray-fields.md">将数据插入 StructArray 字段</a></td></tr>
<tr><td>运行 ColBERT、ColPali 或文档级延迟交互检索。</td><td>使用<code translate="no">MAX_SIM*</code> 索引进行EmbeddingList搜索。</td><td>实体级别。</td><td><a href="/docs/zh/search-with-embedding-lists.md">使用Embeddings列表进行搜索</a></td></tr>
<tr><td>搜索单个片段、剪辑或片段。</td><td>使用常规向量度量进行元素级搜索。</td><td>结构元素级别，如有偏移量则包含偏移量。</td><td><a href="/docs/zh/basic-vector-search-with-structarray.md">使用 StructArray 进行基本向量搜索</a></td></tr>
<tr><td>将元素级向量搜索限制为满足标量条件的元素。</td><td>使用<code translate="no">element_filter</code> 。</td><td>元素级过滤；结果形状取决于搜索类型。</td><td><a href="/docs/zh/filtered-search-with-structarray.md">使用 StructArray 进行过滤搜索</a></td></tr>
<tr><td>根据满足条件的 Struct 元素数量来选择实体。</td><td>使用<code translate="no">MATCH_ANY</code> 、<code translate="no">MATCH_ALL</code> 、<code translate="no">MATCH_LEAST</code> 、<code translate="no">MATCH_MOST</code> 或<code translate="no">MATCH_EXACT</code> 。</td><td>实体级别。</td><td><a href="/docs/zh/struct-array-operators.md">StructArray 操作符</a></td></tr>
<tr><td>在 StructArray 向量上使用分数或距离边界。</td><td>使用元素级范围搜索。</td><td>结构元素级别。</td><td><a href="/docs/zh/range-search-with-structarray.md">使用 StructArray 进行范围搜索</a></td></tr>
<tr><td>在元素级搜索后，每个父实体最多返回一个结果。</td><td>使用主键进行分组搜索。</td><td>分组后的实体级别。</td><td><a href="/docs/zh/grouping-search-with-structarray.md">使用 StructArray 进行分组搜索</a></td></tr>
<tr><td>将 StructArray 元素搜索与另一个向量字段结合使用。</td><td>使用混合搜索，其中一个 AnnSearchRequest 针对 StructArray 的向量字段。</td><td>元素级子搜索，实体级重新排序。</td><td><a href="/docs/zh/hybrid-search-with-structarray.md">基于 StructArray 的混合搜索</a></td></tr>
</tbody>
</table>
<h2 id="Understand-the-two-search-models" class="common-anchor-header">了解两种搜索模型<button data-href="#Understand-the-two-search-models" class="anchor-icon" translate="no">
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
    <tr>
      <th scope="col"><h3>EmbeddingList 搜索</h3></th>
      <th scope="col"><h3>元素级搜索</h3></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <p>EmbeddingList搜索将StructArray向量子字段中的向量视为父实体的单一嵌入列表。查询同样是一个嵌入列表。Milvus通过<code translate="no">MAX_SIM*</code> 度量将查询嵌入列表与存储的嵌入列表进行比对，并返回匹配的实体。</p>
        <ul>
          <li>查询数据：嵌入列表。</li>
          <li>度量家族：<code translate="no">MAX_SIM*</code> 。</li>
          <li>结果粒度：实体级别。</li>
          <li>最适合：文档级或页面级的后期交互检索。</li>
        </ul>
      </td>
      <td>
        <p>元素级搜索将每个 Struct 元素视为独立的向量搜索候选项。每个命中结果代表 StructArray 字段中匹配的元素，且未分组的结果可显示该元素的偏移量。</p>
        <ul>
          <li>查询数据：常规向量。</li>
          <li>度量标准家族：常规向量度量标准。</li>
          <li>结果粒度：Struct 元素级别。</li>
          <li>最适合：片段级、剪辑级或补丁级检索。</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
<div class="alert note">
<p>警告</p>
<p>如果您的 Collection 同时需要 EmbeddingList 搜索和元素级搜索，请使用两个独立的向量字段。一个向量字段或向量子字段只能接受一个索引，而且这两种搜索模式需要不同的度量族。</p>
</div>
<h2 id="Documentation-map" class="common-anchor-header">文档地图<button data-href="#Documentation-map" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 文档分为建模页面和搜索页面。请使用建模页面来定义和准备数据，使用搜索页面来选择合适的检索和过滤行为。</p>
<table>
<thead>
<tr><th>Area</th><th>页面</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td>建模</td><td><a href="/docs/zh/create-structarray-field.md">创建 StructArray 字段</a></td><td>定义结构体 Schema 并添加一个 StructArray 字段。</td></tr>
<tr><td>建模</td><td><a href="/docs/zh/insert-data-into-structarray-fields.md">将数据插入 StructArray 字段</a></td><td>准备并插入嵌套的 StructArray 数据。</td></tr>
<tr><td>建模</td><td><a href="/docs/zh/index-structarray-fields.md">为 StructArray 字段建立索引</a></td><td>在 StructArray 子字段上创建向量和标量索引。</td></tr>
<tr><td>参考</td><td><a href="/docs/zh/structarray-limits.md">StructArray 限制</a></td><td>检查Schema、数据类型、索引、搜索、过滤和版本限制。</td></tr>
<tr><td>搜索</td><td><a href="/docs/zh/basic-vector-search-with-structarray.md">使用 StructArray 进行基本向量搜索</a></td><td>比较 EmbeddingList 搜索与元素级向量搜索。</td></tr>
<tr><td>搜索</td><td><a href="/docs/zh/range-search-with-structarray.md">使用 StructArray 进行范围搜索</a></td><td>在 StructArray 向量子字段中使用范围约束。</td></tr>
<tr><td>搜索</td><td><a href="/docs/zh/grouping-search-with-structarray.md">使用 StructArray 进行分组搜索</a></td><td>按主键对元素级搜索结果进行分组。</td></tr>
<tr><td>搜索</td><td><a href="/docs/zh/hybrid-search-with-structarray.md">结合 StructArray 进行混合搜索</a></td><td>将 StructArray 元素级搜索与其他向量搜索相结合。</td></tr>
<tr><td>搜索</td><td><a href="/docs/zh/filtered-search-with-structarray.md">使用 StructArray 进行过滤搜索</a></td><td>在搜索、查询和混合搜索中使用 StructArray 过滤器。</td></tr>
<tr><td>搜索</td><td><a href="/docs/zh/search-with-embedding-lists.md">使用Embeddings列表进行搜索</a></td><td>利用 StructArray 构建 ColBERT 和 ColPali 风格的检索系统。</td></tr>
<tr><td>筛选</td><td><a href="/docs/zh/struct-array-operators.md">StructArray 操作符</a></td><td><code translate="no">element_filter</code> 和<code translate="no">MATCH_*</code> 操作符的参考语法。</td></tr>
</tbody>
</table>
<h2 id="Key-limits-to-check-first" class="common-anchor-header">首先需检查的关键限制<button data-href="#Key-limits-to-check-first" class="anchor-icon" translate="no">
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
<li><p>Struct 可用作 Array 字段的元素类型，但不能用作顶级 Collection 字段。</p></li>
<li><p>同一 StructArray 字段中的所有 Struct 元素共享一个预定义的 Schema。</p></li>
<li><p>向量字段需要索引。EmbeddingList 搜索使用<code translate="no">MAX_SIM*</code> 度量，而元素级搜索则使用常规向量度量。</p></li>
<li><p><code translate="no">element_filter</code> <code translate="no">MATCH_*</code> 适用于 StructArray 字段内的标量子字段。请仅在这些操作符内部使用 。<code translate="no">$[subfield]</code> </p></li>
<li><p>某些搜索组合受版本限制或仅在特定模式下可用。在依赖范围搜索、分组搜索、混合搜索、可空字段或动态添加的字段之前，请先查阅<a href="/docs/zh/structarray-limits.md">StructArray 限制</a>。</p></li>
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
<li><p>要设计 Schema，请阅读《<a href="/docs/zh/create-structarray-field.md">创建 StructArray 字段》</a>。</p></li>
<li><p>要准备数据，请阅读《<a href="/docs/zh/insert-data-into-structarray-fields.md">将数据插入 StructArray 字段</a>》。</p></li>
<li><p>要选择索引，请阅读《为<a href="/docs/zh/index-structarray-fields.md">StructArray 字段建立索引》</a>。</p></li>
<li><p>若要搜索 StructArray 向量子字段，请从<a href="/docs/zh/basic-vector-search-with-structarray.md">《StructArray 的基本向量搜索》</a>开始。</p></li>
<li><p>若要过滤 StructArray 标量子字段，请参阅《<a href="/docs/zh/struct-array-operators.md">StructArray 操作符</a>》和《<a href="/docs/zh/filtered-search-with-structarray.md">使用 StructArray 进行过滤搜索</a>》。</p></li>
</ol>
