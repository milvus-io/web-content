---
id: insert-data-into-structarray-fields.md
title: 将数据插入 StructArray 字段
summary: >-
  当每个实体包含一个有序的结构化元素列表时，将数据插入到 StructArray 字段中。在插入有效载荷中，StructArray
  字段表示为一个对象数组。每个对象代表一个 Struct 元素，并使用 Collection 模式中定义的 Struct 子字段名称。
---
<h1 id="Insert-Data-into-StructArray-Fields" class="common-anchor-header">将数据插入 StructArray 字段<button data-href="#Insert-Data-into-StructArray-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>当每个实体包含一个有序的结构化元素列表时，可将数据插入到 StructArray 字段中。在插入有效载荷中，StructArray 字段表示为一个对象数组。每个对象代表一个 Struct 元素，并使用 Schema 中定义的 Struct 子字段名称。</p>
<p>本页使用《<a href="/docs/zh/create-structarray-field.md">创建 StructArray 字段</a>》中的<code translate="no">tech_articles</code> Collection。每个实体都是一篇技术文章，而<code translate="no">chunks</code> 字段将文章片段作为 Struct 元素进行存储。</p>
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
    </button></h2><p>请确保Collection Schema中已包含<code translate="no">chunks</code> StructArray字段。</p>
<table>
<thead>
<tr><th>字段</th><th>类型</th><th>插入值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">doc_id</code></td><td><code translate="no">INT64</code></td><td>文章 ID。</td></tr>
<tr><td><code translate="no">title</code></td><td><code translate="no">VARCHAR</code></td><td>文章标题。</td></tr>
<tr><td><code translate="no">category</code></td><td><code translate="no">VARCHAR</code></td><td>文章分类。</td></tr>
<tr><td><code translate="no">title_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>文章级Embeddings。</td></tr>
<tr><td><code translate="no">chunks</code></td><td><code translate="no">ARRAY</code></td><td>一段对象列表。</td></tr>
</tbody>
</table>
<p><code translate="no">chunks</code> 中的每个对象都必须遵循 Struct Schema。</p>
<table>
<thead>
<tr><th>子字段</th><th>类型</th><th>插入值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">text</code></td><td><code translate="no">VARCHAR</code></td><td>块文本。</td></tr>
<tr><td><code translate="no">section</code></td><td><code translate="no">VARCHAR</code></td><td>部分名称，例如<code translate="no">index</code> 、<code translate="no">search</code> 或<code translate="no">filter</code> 。</td></tr>
<tr><td><code translate="no">page</code></td><td><code translate="no">INT64</code></td><td>页码或逻辑位置。</td></tr>
<tr><td><code translate="no">quality_score</code></td><td><code translate="no">FLOAT</code></td><td>段级评分。</td></tr>
<tr><td><code translate="no">has_code</code></td><td><code translate="no">BOOL</code></td><td>该片段是否包含代码。</td></tr>
<tr><td><code translate="no">emb_list_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>为 EmbeddingList 搜索编写的向量。</td></tr>
<tr><td><code translate="no">emb</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>为元素级搜索编写的向量。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>在插入型有效载荷中，<code translate="no">chunks</code> 是一个常规字段，其值为 Struct 对象的数组。在每个对象内部，请使用诸如<code translate="no">text</code> 和<code translate="no">emb</code> 之类的子字段名称。仅在插入完成后创建索引、运行搜索、构建过滤器或指定输出字段时，才使用路径语法，例如<code translate="no">chunks[text]</code> 或<code translate="no">chunks[emb]</code> 。</p>
</div>
<h2 id="Understand-the-insert-payload-shape" class="common-anchor-header">了解插入有效负载的结构<button data-href="#Understand-the-insert-payload-shape" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">chunks</code> 的值是一个由 Struct 元素组成的数组。每个元素都是一个对象，其键为子字段名称。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;doc_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;StructArray indexing patterns&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.12</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.08</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.32</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.48</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Create one index for each vector subfield.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.96</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.10</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.40</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.10</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.40</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Use MAX_SIM metrics for EmbeddingList search.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.91</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.16</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.35</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.45</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.16</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.35</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.45</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">emb_list_vector</code> 和<code translate="no">emb</code> 是独立的向量子字段，因为它们支持不同的搜索模式。EmbeddingList 搜索将 StructArray 字段中的所有向量视为一个嵌入列表，并返回带有<code translate="no">MAX_SIM*</code> 指标的实体级结果。元素级搜索则独立搜索每个 Struct 元素，并可返回匹配元素的偏移量。为简化起见，本示例在两个字段中存储了相同的向量值。 在生产应用中，当两种搜索模式使用相同的块Embeddings时，可以在这两个子字段中存储相同的Embeddings；当两种搜索模式使用不同的表示形式时，则可以存储不同的Embeddings。</p>
<h2 id="Insert-rows" class="common-anchor-header">插入行<button data-href="#Insert-rows" class="anchor-icon" translate="no">
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
    </button></h2><p>使用 `<code translate="no">client.insert()</code> ` 插入包含 StructArray 值的行。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

data = [
    {
        <span class="hljs-string">&quot;doc_id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;StructArray indexing patterns&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;index&quot;</span>,
        <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.08</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.48</span>],
        <span class="hljs-string">&quot;chunks&quot;</span>: [
            {
                <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Create one index for each vector subfield.&quot;</span>,
                <span class="hljs-string">&quot;section&quot;</span>: <span class="hljs-string">&quot;index&quot;</span>,
                <span class="hljs-string">&quot;page&quot;</span>: <span class="hljs-number">1</span>,
                <span class="hljs-string">&quot;quality_score&quot;</span>: <span class="hljs-number">0.96</span>,
                <span class="hljs-string">&quot;has_code&quot;</span>: <span class="hljs-literal">False</span>,
                <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.40</span>],
                <span class="hljs-string">&quot;emb&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.40</span>],
            },
            {
                <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Use MAX_SIM metrics for EmbeddingList search.&quot;</span>,
                <span class="hljs-string">&quot;section&quot;</span>: <span class="hljs-string">&quot;index&quot;</span>,
                <span class="hljs-string">&quot;page&quot;</span>: <span class="hljs-number">2</span>,
                <span class="hljs-string">&quot;quality_score&quot;</span>: <span class="hljs-number">0.91</span>,
                <span class="hljs-string">&quot;has_code&quot;</span>: <span class="hljs-literal">True</span>,
                <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.35</span>, <span class="hljs-number">0.45</span>],
                <span class="hljs-string">&quot;emb&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.35</span>, <span class="hljs-number">0.45</span>],
            },
        ],
    },
    {
        <span class="hljs-string">&quot;doc_id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Filtered StructArray search&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;filter&quot;</span>,
        <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.20</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.40</span>],
        <span class="hljs-string">&quot;chunks&quot;</span>: [
            {
                <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Use element_filter to match scalar conditions within the same Struct element.&quot;</span>,
                <span class="hljs-string">&quot;section&quot;</span>: <span class="hljs-string">&quot;filter&quot;</span>,
                <span class="hljs-string">&quot;page&quot;</span>: <span class="hljs-number">1</span>,
                <span class="hljs-string">&quot;quality_score&quot;</span>: <span class="hljs-number">0.93</span>,
                <span class="hljs-string">&quot;has_code&quot;</span>: <span class="hljs-literal">True</span>,
                <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [<span class="hljs-number">0.21</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.33</span>, <span class="hljs-number">0.44</span>],
                <span class="hljs-string">&quot;emb&quot;</span>: [<span class="hljs-number">0.21</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.33</span>, <span class="hljs-number">0.44</span>],
            },
            {
                <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;MATCH_LEAST checks how many elements satisfy a predicate.&quot;</span>,
                <span class="hljs-string">&quot;section&quot;</span>: <span class="hljs-string">&quot;filter&quot;</span>,
                <span class="hljs-string">&quot;page&quot;</span>: <span class="hljs-number">2</span>,
                <span class="hljs-string">&quot;quality_score&quot;</span>: <span class="hljs-number">0.88</span>,
                <span class="hljs-string">&quot;has_code&quot;</span>: <span class="hljs-literal">False</span>,
                <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [<span class="hljs-number">0.24</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.31</span>, <span class="hljs-number">0.39</span>],
                <span class="hljs-string">&quot;emb&quot;</span>: [<span class="hljs-number">0.24</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.31</span>, <span class="hljs-number">0.39</span>],
            },
        ],
    },
    {
        <span class="hljs-string">&quot;doc_id&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Element-level search with offsets&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;search&quot;</span>,
        <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.33</span>, <span class="hljs-number">0.11</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.37</span>],
        <span class="hljs-string">&quot;chunks&quot;</span>: [
            {
                <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Element-level search can return the offset of the matched Struct element.&quot;</span>,
                <span class="hljs-string">&quot;section&quot;</span>: <span class="hljs-string">&quot;search&quot;</span>,
                <span class="hljs-string">&quot;page&quot;</span>: <span class="hljs-number">1</span>,
                <span class="hljs-string">&quot;quality_score&quot;</span>: <span class="hljs-number">0.95</span>,
                <span class="hljs-string">&quot;has_code&quot;</span>: <span class="hljs-literal">False</span>,
                <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [<span class="hljs-number">0.32</span>, <span class="hljs-number">0.14</span>, <span class="hljs-number">0.28</span>, <span class="hljs-number">0.41</span>],
                <span class="hljs-string">&quot;emb&quot;</span>: [<span class="hljs-number">0.32</span>, <span class="hljs-number">0.14</span>, <span class="hljs-number">0.28</span>, <span class="hljs-number">0.41</span>],
            }
        ],
    },
]

result = client.insert(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=data,
)

<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-into-nullable-StructArray-fields" class="common-anchor-header">插入可为空的 StructArray 字段<button data-href="#Insert-into-nullable-StructArray-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>如果 `<code translate="no">chunks</code> ` 字段为可空类型，则实体可以将整个 `<code translate="no">chunks</code> ` 字段设置为空。在 Python 中，请使用 `<code translate="no">None</code> ` 来表示空值。</p>
<pre><code translate="no" class="language-python">client.insert(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[
        {
            <span class="hljs-string">&quot;doc_id&quot;</span>: <span class="hljs-number">10</span>,
            <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Article without chunks yet&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;draft&quot;</span>,
            <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.05</span>, <span class="hljs-number">0.10</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.20</span>],
            <span class="hljs-string">&quot;chunks&quot;</span>: <span class="hljs-literal">None</span>,
        }
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>当可为空的 StructArray 字段包含一个有效的 StructArray 值时，该值中的所有子字段应均为空或具有有效值。若插入的实体中部分子字段设为空而其他子字段设为有效值，则会引发错误。</p>
<div class="alert note">
<p>警告
可为空的 StructArray 字段仅在 Milvus v3.0.x 中可用。若向现有 Collection 动态添加 StructArray 字段，则该新增字段必须为可为空类型，且现有实体针对该新字段的所有子字段均应返回 `<code translate="no">null</code> `。</p>
</div>
<h2 id="Validate-inserted-data" class="common-anchor-header">验证插入的数据<button data-href="#Validate-inserted-data" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以查询 Collection 并返回 StructArray 字段或选定的子字段。</p>
<pre><code translate="no" class="language-python">rows = client.query(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;doc_id in [1, 2, 3]&quot;</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> rows:
    <span class="hljs-built_in">print</span>(row)
<button class="copy-code-btn"></button></code></pre>
<p>仅在查询、搜索、过滤或创建索引时使用 StructArray 字段路径（例如<code translate="no">chunks[text]</code> ）。插入有效负载时仍应使用<code translate="no">chunks</code> 下的嵌套对象。</p>
<h2 id="Insert-rules" class="common-anchor-header">插入规则<button data-href="#Insert-rules" class="anchor-icon" translate="no">
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
<tr><th>规则</th><th>说明</th></tr>
</thead>
<tbody>
<tr><td>对于 StructArray 字段，请使用对象数组。</td><td><code translate="no">chunks</code> 的值是一个列表，列表中的每个项目都是一个 Struct 元素。</td></tr>
<tr><td>在每个 Struct 元素内部使用子字段名称。</td><td>将<code translate="no">{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}</code> 插入<code translate="no">chunks</code> 中，而非<code translate="no">{&quot;chunks[text]&quot;: &quot;...&quot;}</code> 中。</td></tr>
<tr><td>需符合 Struct Schema。</td><td>每个 Struct 元素必须使用 Struct Schema 中定义的子字段。</td></tr>
<tr><td>匹配向量维度。</td><td>向量值必须与为其向量子字段配置的<code translate="no">dim</code> 相匹配。</td></tr>
<tr><td>遵守<code translate="no">max_capacity</code> 。</td><td>一个实体中的 Struct 元素数量不得超过 StructArray 字段的<code translate="no">max_capacity</code> 。</td></tr>
<tr><td>为不同的搜索模式使用单独的向量字段。</td><td>如果同时需要 EmbeddingList 搜索和元素级搜索，请将向量值写入两个向量子字段。</td></tr>
<tr><td>仅当字段允许为空时，才使用<code translate="no">null</code> 。</td><td>非可空的 StructArray 字段需要有效的 StructArray 值。</td></tr>
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
<li><p>在插入有效负载中使用诸如<code translate="no">chunks[text]</code> 之类的字段路径。</p></li>
<li><p>从 Struct 元素中省略必需的子字段。</p></li>
<li><p>插入维度错误的向量。</p></li>
<li><p>插入的 Struct 元素数量超过<code translate="no">max_capacity</code> 允许的数量。</p></li>
<li><p>仅将一个子字段设置为<code translate="no">null</code> ，而同一StructArray值中的其他子字段却是有效的。</p></li>
<li><p>仅将向量写入<code translate="no">emb_list_vector</code> ，随后却尝试在<code translate="no">chunks[emb]</code> 上执行元素级搜索。</p></li>
<li><p>仅将向量写入<code translate="no">emb</code> ，随后尝试在<code translate="no">chunks[emb_list_vector]</code> 上执行EmbeddingList搜索。</p></li>
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
<li><p>要为<code translate="no">chunks[emb_list_vector]</code> 、<code translate="no">chunks[emb]</code> 以及标量子字段创建索引，请参阅《<a href="/docs/zh/index-structarray-fields.md">索引 StructArray 字段</a>》。</p></li>
<li><p>要搜索 StructArray 向量子字段，请参阅《使用 StructArray 进行基本向量搜索》。</p></li>
<li><p>要了解可为空行为和特定版本的限制，请参阅《<a href="/docs/zh/structarray-limits.md">StructArray 限制</a>》。</p></li>
</ol>
