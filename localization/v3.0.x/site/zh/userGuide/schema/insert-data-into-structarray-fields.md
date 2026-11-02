---
id: insert-data-into-structarray-fields.md
title: 将数据插入 StructArray 字段
summary: >-
  当每个实体包含一个有序的结构化元素列表时，将数据插入到 StructArray 字段中。在插入负载中，StructArray
  字段表示为一个对象数组。每个对象代表一个 Struct 元素，并使用 Schema 中定义的 Struct 子字段名称。
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
    </button></h1><p>当每个实体包含一个有序的结构化元素列表时，可将数据插入到 StructArray 字段中。在插入负载中，StructArray 字段表示为一个对象数组。每个对象代表一个 Struct 元素，并使用 Collection Schema 中定义的 Struct 子字段名称。</p>
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
<tr><td><code translate="no">chunks</code></td><td><code translate="no">ARRAY</code></td><td>一段代码。</td></tr>
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
<p>在插入有效载荷中，<code translate="no">chunks</code> 是一个常规字段，其值为一个 Struct 对象数组。在每个对象内部，请使用诸如<code translate="no">text</code> 和<code translate="no">emb</code> 之类的子字段名称。仅在插入之后，当您创建索引、运行搜索、构建过滤器或指定输出字段时，才使用路径语法，例如<code translate="no">chunks[text]</code> 或<code translate="no">chunks[emb]</code> 。</p>
</div>
<h2 id="Understand-the-insert-payload-shape" class="common-anchor-header">了解插入有效载荷的结构<button data-href="#Understand-the-insert-payload-shape" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">chunks</code> 的值是一个由Struct元素组成的数组。每个元素都是一个对象，其键为子字段名称。</p>
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
    </button></h2><p>使用插入操作写入以下三个实体。每个实体都包含所有必需的 Struct 子字段。Go 示例使用基于列的输入：每个映射将一个实体的子字段数组分组在一起。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;
<span class="hljs-keyword">import</span> com.google.gson.JsonArray;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> com.google.gson.JsonParser;
<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

List&lt;JsonObject&gt; data = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
{
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-number">1L</span>);
    row.addProperty(<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;StructArray indexing patterns&quot;</span>);
    row.addProperty(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;index&quot;</span>);
    row.add(<span class="hljs-string">&quot;title_vector&quot;</span>, JsonParser.parseString(<span class="hljs-string">&quot;[0.12, 0.08, 0.32, 0.48]&quot;</span>));
    <span class="hljs-type">JsonArray</span> <span class="hljs-variable">chunks</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonArray</span>();
    {
        <span class="hljs-type">JsonObject</span> <span class="hljs-variable">chunk</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
        chunk.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Create one index for each vector subfield.&quot;</span>);
        chunk.addProperty(<span class="hljs-string">&quot;section&quot;</span>, <span class="hljs-string">&quot;index&quot;</span>);
        chunk.addProperty(<span class="hljs-string">&quot;page&quot;</span>, <span class="hljs-number">1L</span>);
        chunk.addProperty(<span class="hljs-string">&quot;quality_score&quot;</span>, <span class="hljs-number">0.96</span>);
        chunk.addProperty(<span class="hljs-string">&quot;has_code&quot;</span>, <span class="hljs-literal">false</span>);
        chunk.add(<span class="hljs-string">&quot;emb_list_vector&quot;</span>, JsonParser.parseString(<span class="hljs-string">&quot;[0.1, 0.2, 0.3, 0.4]&quot;</span>));
        chunk.add(<span class="hljs-string">&quot;emb&quot;</span>, JsonParser.parseString(<span class="hljs-string">&quot;[0.1, 0.2, 0.3, 0.4]&quot;</span>));
        chunks.add(chunk);
    }
    {
        <span class="hljs-type">JsonObject</span> <span class="hljs-variable">chunk</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
        chunk.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Use MAX_SIM metrics for EmbeddingList search.&quot;</span>);
        chunk.addProperty(<span class="hljs-string">&quot;section&quot;</span>, <span class="hljs-string">&quot;index&quot;</span>);
        chunk.addProperty(<span class="hljs-string">&quot;page&quot;</span>, <span class="hljs-number">2L</span>);
        chunk.addProperty(<span class="hljs-string">&quot;quality_score&quot;</span>, <span class="hljs-number">0.91</span>);
        chunk.addProperty(<span class="hljs-string">&quot;has_code&quot;</span>, <span class="hljs-literal">true</span>);
        chunk.add(<span class="hljs-string">&quot;emb_list_vector&quot;</span>, JsonParser.parseString(<span class="hljs-string">&quot;[0.16, 0.24, 0.35, 0.45]&quot;</span>));
        chunk.add(<span class="hljs-string">&quot;emb&quot;</span>, JsonParser.parseString(<span class="hljs-string">&quot;[0.16, 0.24, 0.35, 0.45]&quot;</span>));
        chunks.add(chunk);
    }
    row.add(<span class="hljs-string">&quot;chunks&quot;</span>, chunks);
    data.add(row);
}
{
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-number">2L</span>);
    row.addProperty(<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;Filtered StructArray search&quot;</span>);
    row.addProperty(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;filter&quot;</span>);
    row.add(<span class="hljs-string">&quot;title_vector&quot;</span>, JsonParser.parseString(<span class="hljs-string">&quot;[0.2, 0.18, 0.22, 0.4]&quot;</span>));
    <span class="hljs-type">JsonArray</span> <span class="hljs-variable">chunks</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonArray</span>();
    {
        <span class="hljs-type">JsonObject</span> <span class="hljs-variable">chunk</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
        chunk.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Use element_filter to match scalar conditions within the same Struct element.&quot;</span>);
        chunk.addProperty(<span class="hljs-string">&quot;section&quot;</span>, <span class="hljs-string">&quot;filter&quot;</span>);
        chunk.addProperty(<span class="hljs-string">&quot;page&quot;</span>, <span class="hljs-number">1L</span>);
        chunk.addProperty(<span class="hljs-string">&quot;quality_score&quot;</span>, <span class="hljs-number">0.93</span>);
        chunk.addProperty(<span class="hljs-string">&quot;has_code&quot;</span>, <span class="hljs-literal">true</span>);
        chunk.add(<span class="hljs-string">&quot;emb_list_vector&quot;</span>, JsonParser.parseString(<span class="hljs-string">&quot;[0.21, 0.18, 0.33, 0.44]&quot;</span>));
        chunk.add(<span class="hljs-string">&quot;emb&quot;</span>, JsonParser.parseString(<span class="hljs-string">&quot;[0.21, 0.18, 0.33, 0.44]&quot;</span>));
        chunks.add(chunk);
    }
    {
        <span class="hljs-type">JsonObject</span> <span class="hljs-variable">chunk</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
        chunk.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;MATCH_LEAST checks how many elements satisfy a predicate.&quot;</span>);
        chunk.addProperty(<span class="hljs-string">&quot;section&quot;</span>, <span class="hljs-string">&quot;filter&quot;</span>);
        chunk.addProperty(<span class="hljs-string">&quot;page&quot;</span>, <span class="hljs-number">2L</span>);
        chunk.addProperty(<span class="hljs-string">&quot;quality_score&quot;</span>, <span class="hljs-number">0.88</span>);
        chunk.addProperty(<span class="hljs-string">&quot;has_code&quot;</span>, <span class="hljs-literal">false</span>);
        chunk.add(<span class="hljs-string">&quot;emb_list_vector&quot;</span>, JsonParser.parseString(<span class="hljs-string">&quot;[0.24, 0.22, 0.31, 0.39]&quot;</span>));
        chunk.add(<span class="hljs-string">&quot;emb&quot;</span>, JsonParser.parseString(<span class="hljs-string">&quot;[0.24, 0.22, 0.31, 0.39]&quot;</span>));
        chunks.add(chunk);
    }
    row.add(<span class="hljs-string">&quot;chunks&quot;</span>, chunks);
    data.add(row);
}
{
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-number">3L</span>);
    row.addProperty(<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;Element-level search with offsets&quot;</span>);
    row.addProperty(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;search&quot;</span>);
    row.add(<span class="hljs-string">&quot;title_vector&quot;</span>, JsonParser.parseString(<span class="hljs-string">&quot;[0.33, 0.11, 0.29, 0.37]&quot;</span>));
    <span class="hljs-type">JsonArray</span> <span class="hljs-variable">chunks</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonArray</span>();
    {
        <span class="hljs-type">JsonObject</span> <span class="hljs-variable">chunk</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
        chunk.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Element-level search can return the offset of the matched Struct element.&quot;</span>);
        chunk.addProperty(<span class="hljs-string">&quot;section&quot;</span>, <span class="hljs-string">&quot;search&quot;</span>);
        chunk.addProperty(<span class="hljs-string">&quot;page&quot;</span>, <span class="hljs-number">1L</span>);
        chunk.addProperty(<span class="hljs-string">&quot;quality_score&quot;</span>, <span class="hljs-number">0.95</span>);
        chunk.addProperty(<span class="hljs-string">&quot;has_code&quot;</span>, <span class="hljs-literal">false</span>);
        chunk.add(<span class="hljs-string">&quot;emb_list_vector&quot;</span>, JsonParser.parseString(<span class="hljs-string">&quot;[0.32, 0.14, 0.28, 0.41]&quot;</span>));
        chunk.add(<span class="hljs-string">&quot;emb&quot;</span>, JsonParser.parseString(<span class="hljs-string">&quot;[0.32, 0.14, 0.28, 0.41]&quot;</span>));
        chunks.add(chunk);
    }
    row.add(<span class="hljs-string">&quot;chunks&quot;</span>, chunks);
    data.add(row);
}

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .data(data)
        .build());
System.out.println(resp.getInsertCnt());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

    milvusclient <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

chunksSchema := entity.NewStructSchema().
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;text&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">500</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;section&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">50</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;page&quot;</span>).WithDataType(entity.FieldTypeInt64)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;quality_score&quot;</span>).WithDataType(entity.FieldTypeFloat)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;has_code&quot;</span>).WithDataType(entity.FieldTypeBool)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;emb_list_vector&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">4</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;emb&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">4</span>))

chunksRows := []<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    {
        <span class="hljs-string">&quot;text&quot;</span>:            []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Create one index for each vector subfield.&quot;</span>, <span class="hljs-string">&quot;Use MAX_SIM metrics for EmbeddingList search.&quot;</span>},
        <span class="hljs-string">&quot;section&quot;</span>:         []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;index&quot;</span>, <span class="hljs-string">&quot;index&quot;</span>},
        <span class="hljs-string">&quot;page&quot;</span>:            []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>},
        <span class="hljs-string">&quot;quality_score&quot;</span>:   []<span class="hljs-type">float32</span>{<span class="hljs-number">0.96</span>, <span class="hljs-number">0.91</span>},
        <span class="hljs-string">&quot;has_code&quot;</span>:        []<span class="hljs-type">bool</span>{<span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>},
        <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [][]<span class="hljs-type">float32</span>{{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>}, {<span class="hljs-number">0.16</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.35</span>, <span class="hljs-number">0.45</span>}},
        <span class="hljs-string">&quot;emb&quot;</span>:             [][]<span class="hljs-type">float32</span>{{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>}, {<span class="hljs-number">0.16</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.35</span>, <span class="hljs-number">0.45</span>}},
    },
    {
        <span class="hljs-string">&quot;text&quot;</span>:            []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Use element_filter to match scalar conditions within the same Struct element.&quot;</span>, <span class="hljs-string">&quot;MATCH_LEAST checks how many elements satisfy a predicate.&quot;</span>},
        <span class="hljs-string">&quot;section&quot;</span>:         []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-string">&quot;filter&quot;</span>},
        <span class="hljs-string">&quot;page&quot;</span>:            []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>},
        <span class="hljs-string">&quot;quality_score&quot;</span>:   []<span class="hljs-type">float32</span>{<span class="hljs-number">0.93</span>, <span class="hljs-number">0.88</span>},
        <span class="hljs-string">&quot;has_code&quot;</span>:        []<span class="hljs-type">bool</span>{<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>},
        <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [][]<span class="hljs-type">float32</span>{{<span class="hljs-number">0.21</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.33</span>, <span class="hljs-number">0.44</span>}, {<span class="hljs-number">0.24</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.31</span>, <span class="hljs-number">0.39</span>}},
        <span class="hljs-string">&quot;emb&quot;</span>:             [][]<span class="hljs-type">float32</span>{{<span class="hljs-number">0.21</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.33</span>, <span class="hljs-number">0.44</span>}, {<span class="hljs-number">0.24</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.31</span>, <span class="hljs-number">0.39</span>}},
    },
    {
        <span class="hljs-string">&quot;text&quot;</span>:            []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Element-level search can return the offset of the matched Struct element.&quot;</span>},
        <span class="hljs-string">&quot;section&quot;</span>:         []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;search&quot;</span>},
        <span class="hljs-string">&quot;page&quot;</span>:            []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>},
        <span class="hljs-string">&quot;quality_score&quot;</span>:   []<span class="hljs-type">float32</span>{<span class="hljs-number">0.95</span>},
        <span class="hljs-string">&quot;has_code&quot;</span>:        []<span class="hljs-type">bool</span>{<span class="hljs-literal">false</span>},
        <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [][]<span class="hljs-type">float32</span>{{<span class="hljs-number">0.32</span>, <span class="hljs-number">0.14</span>, <span class="hljs-number">0.28</span>, <span class="hljs-number">0.41</span>}},
        <span class="hljs-string">&quot;emb&quot;</span>:             [][]<span class="hljs-type">float32</span>{{<span class="hljs-number">0.32</span>, <span class="hljs-number">0.14</span>, <span class="hljs-number">0.28</span>, <span class="hljs-number">0.41</span>}},
    },
}

result, err := cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;tech_articles&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;doc_id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>}).
    WithVarcharColumn(<span class="hljs-string">&quot;title&quot;</span>, []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;StructArray indexing patterns&quot;</span>, <span class="hljs-string">&quot;Filtered StructArray search&quot;</span>, <span class="hljs-string">&quot;Element-level search with offsets&quot;</span>}).
    WithVarcharColumn(<span class="hljs-string">&quot;category&quot;</span>, []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;index&quot;</span>, <span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-string">&quot;search&quot;</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;title_vector&quot;</span>, <span class="hljs-number">4</span>, [][]<span class="hljs-type">float32</span>{{<span class="hljs-number">0.12</span>, <span class="hljs-number">0.08</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.48</span>}, {<span class="hljs-number">0.2</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.4</span>}, {<span class="hljs-number">0.33</span>, <span class="hljs-number">0.11</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.37</span>}}).
    WithStructArrayColumn(<span class="hljs-string">&quot;chunks&quot;</span>, chunksSchema, chunksRows))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
fmt.Printf(<span class="hljs-string">&quot;inserted %d rows\n&quot;</span>, result.InsertCount)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rows</span> = <span class="hljs-built_in">vec!</span>[
    json!({
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
                <span class="hljs-string">&quot;has_code&quot;</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
                <span class="hljs-string">&quot;emb&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
            },
            {
                <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Use MAX_SIM metrics for EmbeddingList search.&quot;</span>,
                <span class="hljs-string">&quot;section&quot;</span>: <span class="hljs-string">&quot;index&quot;</span>,
                <span class="hljs-string">&quot;page&quot;</span>: <span class="hljs-number">2</span>,
                <span class="hljs-string">&quot;quality_score&quot;</span>: <span class="hljs-number">0.91</span>,
                <span class="hljs-string">&quot;has_code&quot;</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.35</span>, <span class="hljs-number">0.45</span>],
                <span class="hljs-string">&quot;emb&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.35</span>, <span class="hljs-number">0.45</span>],
            },
        ],
    }),
    json!({
        <span class="hljs-string">&quot;doc_id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Filtered StructArray search&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;filter&quot;</span>,
        <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.4</span>],
        <span class="hljs-string">&quot;chunks&quot;</span>: [
            {
                <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Use element_filter to match scalar conditions within the same Struct element.&quot;</span>,
                <span class="hljs-string">&quot;section&quot;</span>: <span class="hljs-string">&quot;filter&quot;</span>,
                <span class="hljs-string">&quot;page&quot;</span>: <span class="hljs-number">1</span>,
                <span class="hljs-string">&quot;quality_score&quot;</span>: <span class="hljs-number">0.93</span>,
                <span class="hljs-string">&quot;has_code&quot;</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [<span class="hljs-number">0.21</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.33</span>, <span class="hljs-number">0.44</span>],
                <span class="hljs-string">&quot;emb&quot;</span>: [<span class="hljs-number">0.21</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.33</span>, <span class="hljs-number">0.44</span>],
            },
            {
                <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;MATCH_LEAST checks how many elements satisfy a predicate.&quot;</span>,
                <span class="hljs-string">&quot;section&quot;</span>: <span class="hljs-string">&quot;filter&quot;</span>,
                <span class="hljs-string">&quot;page&quot;</span>: <span class="hljs-number">2</span>,
                <span class="hljs-string">&quot;quality_score&quot;</span>: <span class="hljs-number">0.88</span>,
                <span class="hljs-string">&quot;has_code&quot;</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [<span class="hljs-number">0.24</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.31</span>, <span class="hljs-number">0.39</span>],
                <span class="hljs-string">&quot;emb&quot;</span>: [<span class="hljs-number">0.24</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.31</span>, <span class="hljs-number">0.39</span>],
            },
        ],
    }),
    json!({
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
                <span class="hljs-string">&quot;has_code&quot;</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [<span class="hljs-number">0.32</span>, <span class="hljs-number">0.14</span>, <span class="hljs-number">0.28</span>, <span class="hljs-number">0.41</span>],
                <span class="hljs-string">&quot;emb&quot;</span>: [<span class="hljs-number">0.32</span>, <span class="hljs-number">0.14</span>, <span class="hljs-number">0.28</span>, <span class="hljs-number">0.41</span>],
            },
        ],
    }),
];

<span class="hljs-keyword">let</span> <span class="hljs-variable">rows</span> = rows.<span class="hljs-title function_ invoke__">into_iter</span>().<span class="hljs-title function_ invoke__">map</span>(|r| r.<span class="hljs-title function_ invoke__">as_object</span>().<span class="hljs-title function_ invoke__">cloned</span>().<span class="hljs-title function_ invoke__">unwrap</span>()).collect::&lt;<span class="hljs-type">Vec</span>&lt;_&gt;&gt;();
<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
    .<span class="hljs-title function_ invoke__">rows</span>(rows)
    .<span class="hljs-title function_ invoke__">build</span>()?;
<span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = client.<span class="hljs-title function_ invoke__">insert</span>(request).<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;insert count: {}&quot;</span>, resp.<span class="hljs-title function_ invoke__">insert_count</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;nlohmann/json.hpp&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/request/dml/InsertRequest.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

nlohmann::json rows = nlohmann::json::<span class="hljs-built_in">array</span>({
    {
        {<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-number">1</span>},
        {<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;StructArray indexing patterns&quot;</span>},
        {<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;index&quot;</span>},
        {<span class="hljs-string">&quot;title_vector&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.12f</span>, <span class="hljs-number">0.08f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.48f</span>}},
        {<span class="hljs-string">&quot;chunks&quot;</span>, nlohmann::json::<span class="hljs-built_in">array</span>({
            {
                {<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Create one index for each vector subfield.&quot;</span>},
                {<span class="hljs-string">&quot;section&quot;</span>, <span class="hljs-string">&quot;index&quot;</span>},
                {<span class="hljs-string">&quot;page&quot;</span>, <span class="hljs-number">1</span>},
                {<span class="hljs-string">&quot;quality_score&quot;</span>, <span class="hljs-number">0.96</span>},
                {<span class="hljs-string">&quot;has_code&quot;</span>, <span class="hljs-literal">false</span>},
                {<span class="hljs-string">&quot;emb_list_vector&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>}},
                {<span class="hljs-string">&quot;emb&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>}},
            },
            {
                {<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Use MAX_SIM metrics for EmbeddingList search.&quot;</span>},
                {<span class="hljs-string">&quot;section&quot;</span>, <span class="hljs-string">&quot;index&quot;</span>},
                {<span class="hljs-string">&quot;page&quot;</span>, <span class="hljs-number">2</span>},
                {<span class="hljs-string">&quot;quality_score&quot;</span>, <span class="hljs-number">0.91</span>},
                {<span class="hljs-string">&quot;has_code&quot;</span>, <span class="hljs-literal">true</span>},
                {<span class="hljs-string">&quot;emb_list_vector&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.16f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.35f</span>, <span class="hljs-number">0.45f</span>}},
                {<span class="hljs-string">&quot;emb&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.16f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.35f</span>, <span class="hljs-number">0.45f</span>}},
            },
        })},
    },
    {
        {<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-number">2</span>},
        {<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;Filtered StructArray search&quot;</span>},
        {<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;filter&quot;</span>},
        {<span class="hljs-string">&quot;title_vector&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.2f</span>, <span class="hljs-number">0.18f</span>, <span class="hljs-number">0.22f</span>, <span class="hljs-number">0.4f</span>}},
        {<span class="hljs-string">&quot;chunks&quot;</span>, nlohmann::json::<span class="hljs-built_in">array</span>({
            {
                {<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Use element_filter to match scalar conditions within the same Struct element.&quot;</span>},
                {<span class="hljs-string">&quot;section&quot;</span>, <span class="hljs-string">&quot;filter&quot;</span>},
                {<span class="hljs-string">&quot;page&quot;</span>, <span class="hljs-number">1</span>},
                {<span class="hljs-string">&quot;quality_score&quot;</span>, <span class="hljs-number">0.93</span>},
                {<span class="hljs-string">&quot;has_code&quot;</span>, <span class="hljs-literal">true</span>},
                {<span class="hljs-string">&quot;emb_list_vector&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.21f</span>, <span class="hljs-number">0.18f</span>, <span class="hljs-number">0.33f</span>, <span class="hljs-number">0.44f</span>}},
                {<span class="hljs-string">&quot;emb&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.21f</span>, <span class="hljs-number">0.18f</span>, <span class="hljs-number">0.33f</span>, <span class="hljs-number">0.44f</span>}},
            },
            {
                {<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;MATCH_LEAST checks how many elements satisfy a predicate.&quot;</span>},
                {<span class="hljs-string">&quot;section&quot;</span>, <span class="hljs-string">&quot;filter&quot;</span>},
                {<span class="hljs-string">&quot;page&quot;</span>, <span class="hljs-number">2</span>},
                {<span class="hljs-string">&quot;quality_score&quot;</span>, <span class="hljs-number">0.88</span>},
                {<span class="hljs-string">&quot;has_code&quot;</span>, <span class="hljs-literal">false</span>},
                {<span class="hljs-string">&quot;emb_list_vector&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.24f</span>, <span class="hljs-number">0.22f</span>, <span class="hljs-number">0.31f</span>, <span class="hljs-number">0.39f</span>}},
                {<span class="hljs-string">&quot;emb&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.24f</span>, <span class="hljs-number">0.22f</span>, <span class="hljs-number">0.31f</span>, <span class="hljs-number">0.39f</span>}},
            },
        })},
    },
    {
        {<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-number">3</span>},
        {<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;Element-level search with offsets&quot;</span>},
        {<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;search&quot;</span>},
        {<span class="hljs-string">&quot;title_vector&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.33f</span>, <span class="hljs-number">0.11f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.37f</span>}},
        {<span class="hljs-string">&quot;chunks&quot;</span>, nlohmann::json::<span class="hljs-built_in">array</span>({
            {
                {<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Element-level search can return the offset of the matched Struct element.&quot;</span>},
                {<span class="hljs-string">&quot;section&quot;</span>, <span class="hljs-string">&quot;search&quot;</span>},
                {<span class="hljs-string">&quot;page&quot;</span>, <span class="hljs-number">1</span>},
                {<span class="hljs-string">&quot;quality_score&quot;</span>, <span class="hljs-number">0.95</span>},
                {<span class="hljs-string">&quot;has_code&quot;</span>, <span class="hljs-literal">false</span>},
                {<span class="hljs-string">&quot;emb_list_vector&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.32f</span>, <span class="hljs-number">0.14f</span>, <span class="hljs-number">0.28f</span>, <span class="hljs-number">0.41f</span>}},
                {<span class="hljs-string">&quot;emb&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.32f</span>, <span class="hljs-number">0.14f</span>, <span class="hljs-number">0.28f</span>, <span class="hljs-number">0.41f</span>}},
            },
        })},
    },
});

milvus::InsertRequest request;
request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">auto</span>&amp; row : rows) {
    request.<span class="hljs-built_in">AddRowData</span>(std::<span class="hljs-built_in">move</span>(row));
}

milvus::InsertResponse response;
status = client-&gt;<span class="hljs-built_in">Insert</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span> });

<span class="hljs-keyword">const</span> data = [
  {
    <span class="hljs-attr">doc_id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;StructArray indexing patterns&#x27;</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">&#x27;index&#x27;</span>,
    <span class="hljs-attr">title_vector</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.08</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.48</span>],
    <span class="hljs-attr">chunks</span>: [
      {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Create one index for each vector subfield.&#x27;</span>, <span class="hljs-attr">section</span>: <span class="hljs-string">&#x27;index&#x27;</span>, <span class="hljs-attr">page</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">quality_score</span>: <span class="hljs-number">0.96</span>, <span class="hljs-attr">has_code</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">emb_list_vector</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-attr">emb</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
      },
      {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Use MAX_SIM metrics for EmbeddingList search.&#x27;</span>, <span class="hljs-attr">section</span>: <span class="hljs-string">&#x27;index&#x27;</span>, <span class="hljs-attr">page</span>: <span class="hljs-number">2</span>,
        <span class="hljs-attr">quality_score</span>: <span class="hljs-number">0.91</span>, <span class="hljs-attr">has_code</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">emb_list_vector</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.35</span>, <span class="hljs-number">0.45</span>], <span class="hljs-attr">emb</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.35</span>, <span class="hljs-number">0.45</span>],
      },
    ],
  },
  {
    <span class="hljs-attr">doc_id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Filtered StructArray search&#x27;</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">&#x27;filter&#x27;</span>,
    <span class="hljs-attr">title_vector</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.4</span>],
    <span class="hljs-attr">chunks</span>: [
      {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Use element_filter to match scalar conditions within the same Struct element.&#x27;</span>, <span class="hljs-attr">section</span>: <span class="hljs-string">&#x27;filter&#x27;</span>, <span class="hljs-attr">page</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">quality_score</span>: <span class="hljs-number">0.93</span>, <span class="hljs-attr">has_code</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">emb_list_vector</span>: [<span class="hljs-number">0.21</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.33</span>, <span class="hljs-number">0.44</span>], <span class="hljs-attr">emb</span>: [<span class="hljs-number">0.21</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.33</span>, <span class="hljs-number">0.44</span>],
      },
      {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;MATCH_LEAST checks how many elements satisfy a predicate.&#x27;</span>, <span class="hljs-attr">section</span>: <span class="hljs-string">&#x27;filter&#x27;</span>, <span class="hljs-attr">page</span>: <span class="hljs-number">2</span>,
        <span class="hljs-attr">quality_score</span>: <span class="hljs-number">0.88</span>, <span class="hljs-attr">has_code</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">emb_list_vector</span>: [<span class="hljs-number">0.24</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.31</span>, <span class="hljs-number">0.39</span>], <span class="hljs-attr">emb</span>: [<span class="hljs-number">0.24</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.31</span>, <span class="hljs-number">0.39</span>],
      },
    ],
  },
  {
    <span class="hljs-attr">doc_id</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Element-level search with offsets&#x27;</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">&#x27;search&#x27;</span>,
    <span class="hljs-attr">title_vector</span>: [<span class="hljs-number">0.33</span>, <span class="hljs-number">0.11</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.37</span>],
    <span class="hljs-attr">chunks</span>: [
      {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Element-level search can return the offset of the matched Struct element.&#x27;</span>, <span class="hljs-attr">section</span>: <span class="hljs-string">&#x27;search&#x27;</span>, <span class="hljs-attr">page</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">quality_score</span>: <span class="hljs-number">0.95</span>, <span class="hljs-attr">has_code</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">emb_list_vector</span>: [<span class="hljs-number">0.32</span>, <span class="hljs-number">0.14</span>, <span class="hljs-number">0.28</span>, <span class="hljs-number">0.41</span>], <span class="hljs-attr">emb</span>: [<span class="hljs-number">0.32</span>, <span class="hljs-number">0.14</span>, <span class="hljs-number">0.28</span>, <span class="hljs-number">0.41</span>],
      },
    ],
  },
];

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  data,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">status</span>.<span class="hljs-property">error_code</span>, res.<span class="hljs-property">insert_cnt</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System;
<span class="hljs-keyword">using</span> System.Collections.Generic;
<span class="hljs-keyword">using</span> System.Linq;
<span class="hljs-keyword">using</span> System.Text.Json;
<span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">var</span> data = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;[]
{
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
    {
        [<span class="hljs-string">&quot;doc_id&quot;</span>] = <span class="hljs-number">1L</span>,
        [<span class="hljs-string">&quot;title&quot;</span>] = <span class="hljs-string">&quot;StructArray indexing patterns&quot;</span>,
        [<span class="hljs-string">&quot;category&quot;</span>] = <span class="hljs-string">&quot;index&quot;</span>,
        [<span class="hljs-string">&quot;title_vector&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">float</span>[] { <span class="hljs-number">0.12f</span>, <span class="hljs-number">0.08f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.48f</span> },
        [<span class="hljs-string">&quot;chunks&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">object</span>[]
        {
            <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
            {
                [<span class="hljs-string">&quot;text&quot;</span>] = <span class="hljs-string">&quot;Create one index for each vector subfield.&quot;</span>,
                [<span class="hljs-string">&quot;section&quot;</span>] = <span class="hljs-string">&quot;index&quot;</span>,
                [<span class="hljs-string">&quot;page&quot;</span>] = <span class="hljs-number">1L</span>,
                [<span class="hljs-string">&quot;quality_score&quot;</span>] = <span class="hljs-number">0.96f</span>,
                [<span class="hljs-string">&quot;has_code&quot;</span>] = <span class="hljs-literal">false</span>,
                [<span class="hljs-string">&quot;emb_list_vector&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">float</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span> },
                [<span class="hljs-string">&quot;emb&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">float</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span> }
            },
            <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
            {
                [<span class="hljs-string">&quot;text&quot;</span>] = <span class="hljs-string">&quot;Use MAX_SIM metrics for EmbeddingList search.&quot;</span>,
                [<span class="hljs-string">&quot;section&quot;</span>] = <span class="hljs-string">&quot;index&quot;</span>,
                [<span class="hljs-string">&quot;page&quot;</span>] = <span class="hljs-number">2L</span>,
                [<span class="hljs-string">&quot;quality_score&quot;</span>] = <span class="hljs-number">0.91f</span>,
                [<span class="hljs-string">&quot;has_code&quot;</span>] = <span class="hljs-literal">true</span>,
                [<span class="hljs-string">&quot;emb_list_vector&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">float</span>[] { <span class="hljs-number">0.16f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.35f</span>, <span class="hljs-number">0.45f</span> },
                [<span class="hljs-string">&quot;emb&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">float</span>[] { <span class="hljs-number">0.16f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.35f</span>, <span class="hljs-number">0.45f</span> }
            }
        }
    },
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
    {
        [<span class="hljs-string">&quot;doc_id&quot;</span>] = <span class="hljs-number">2L</span>,
        [<span class="hljs-string">&quot;title&quot;</span>] = <span class="hljs-string">&quot;Filtered StructArray search&quot;</span>,
        [<span class="hljs-string">&quot;category&quot;</span>] = <span class="hljs-string">&quot;filter&quot;</span>,
        [<span class="hljs-string">&quot;title_vector&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">float</span>[] { <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.18f</span>, <span class="hljs-number">0.22f</span>, <span class="hljs-number">0.4f</span> },
        [<span class="hljs-string">&quot;chunks&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">object</span>[]
        {
            <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
            {
                [<span class="hljs-string">&quot;text&quot;</span>] = <span class="hljs-string">&quot;Use element_filter to match scalar conditions within the same Struct element.&quot;</span>,
                [<span class="hljs-string">&quot;section&quot;</span>] = <span class="hljs-string">&quot;filter&quot;</span>,
                [<span class="hljs-string">&quot;page&quot;</span>] = <span class="hljs-number">1L</span>,
                [<span class="hljs-string">&quot;quality_score&quot;</span>] = <span class="hljs-number">0.93f</span>,
                [<span class="hljs-string">&quot;has_code&quot;</span>] = <span class="hljs-literal">true</span>,
                [<span class="hljs-string">&quot;emb_list_vector&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">float</span>[] { <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.18f</span>, <span class="hljs-number">0.33f</span>, <span class="hljs-number">0.44f</span> },
                [<span class="hljs-string">&quot;emb&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">float</span>[] { <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.18f</span>, <span class="hljs-number">0.33f</span>, <span class="hljs-number">0.44f</span> }
            },
            <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
            {
                [<span class="hljs-string">&quot;text&quot;</span>] = <span class="hljs-string">&quot;MATCH_LEAST checks how many elements satisfy a predicate.&quot;</span>,
                [<span class="hljs-string">&quot;section&quot;</span>] = <span class="hljs-string">&quot;filter&quot;</span>,
                [<span class="hljs-string">&quot;page&quot;</span>] = <span class="hljs-number">2L</span>,
                [<span class="hljs-string">&quot;quality_score&quot;</span>] = <span class="hljs-number">0.88f</span>,
                [<span class="hljs-string">&quot;has_code&quot;</span>] = <span class="hljs-literal">false</span>,
                [<span class="hljs-string">&quot;emb_list_vector&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">float</span>[] { <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.22f</span>, <span class="hljs-number">0.31f</span>, <span class="hljs-number">0.39f</span> },
                [<span class="hljs-string">&quot;emb&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">float</span>[] { <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.22f</span>, <span class="hljs-number">0.31f</span>, <span class="hljs-number">0.39f</span> }
            }
        }
    },
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
    {
        [<span class="hljs-string">&quot;doc_id&quot;</span>] = <span class="hljs-number">3L</span>,
        [<span class="hljs-string">&quot;title&quot;</span>] = <span class="hljs-string">&quot;Element-level search with offsets&quot;</span>,
        [<span class="hljs-string">&quot;category&quot;</span>] = <span class="hljs-string">&quot;search&quot;</span>,
        [<span class="hljs-string">&quot;title_vector&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">float</span>[] { <span class="hljs-number">0.33f</span>, <span class="hljs-number">0.11f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.37f</span> },
        [<span class="hljs-string">&quot;chunks&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">object</span>[]
        {
            <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
            {
                [<span class="hljs-string">&quot;text&quot;</span>] = <span class="hljs-string">&quot;Element-level search can return the offset of the matched Struct element.&quot;</span>,
                [<span class="hljs-string">&quot;section&quot;</span>] = <span class="hljs-string">&quot;search&quot;</span>,
                [<span class="hljs-string">&quot;page&quot;</span>] = <span class="hljs-number">1L</span>,
                [<span class="hljs-string">&quot;quality_score&quot;</span>] = <span class="hljs-number">0.95f</span>,
                [<span class="hljs-string">&quot;has_code&quot;</span>] = <span class="hljs-literal">false</span>,
                [<span class="hljs-string">&quot;emb_list_vector&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">float</span>[] { <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.14f</span>, <span class="hljs-number">0.28f</span>, <span class="hljs-number">0.41f</span> },
                [<span class="hljs-string">&quot;emb&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">float</span>[] { <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.14f</span>, <span class="hljs-number">0.28f</span>, <span class="hljs-number">0.41f</span> }
            }
        }
    }
};

<span class="hljs-keyword">await</span> client.InsertAsync(<span class="hljs-keyword">new</span> InsertReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    RowsData = data
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;data&quot;: [
        {
            &quot;doc_id&quot;: 1,
            &quot;title&quot;: &quot;StructArray indexing patterns&quot;,
            &quot;category&quot;: &quot;index&quot;,
            &quot;title_vector&quot;: [
                0.12,
                0.08,
                0.32,
                0.48
            ],
            &quot;chunks&quot;: [
                {
                    &quot;text&quot;: &quot;Create one index for each vector subfield.&quot;,
                    &quot;section&quot;: &quot;index&quot;,
                    &quot;page&quot;: 1,
                    &quot;quality_score&quot;: 0.96,
                    &quot;has_code&quot;: false,
                    &quot;emb_list_vector&quot;: [
                        0.1,
                        0.2,
                        0.3,
                        0.4
                    ],
                    &quot;emb&quot;: [
                        0.1,
                        0.2,
                        0.3,
                        0.4
                    ]
                },
                {
                    &quot;text&quot;: &quot;Use MAX_SIM metrics for EmbeddingList search.&quot;,
                    &quot;section&quot;: &quot;index&quot;,
                    &quot;page&quot;: 2,
                    &quot;quality_score&quot;: 0.91,
                    &quot;has_code&quot;: true,
                    &quot;emb_list_vector&quot;: [
                        0.16,
                        0.24,
                        0.35,
                        0.45
                    ],
                    &quot;emb&quot;: [
                        0.16,
                        0.24,
                        0.35,
                        0.45
                    ]
                }
            ]
        },
        {
            &quot;doc_id&quot;: 2,
            &quot;title&quot;: &quot;Filtered StructArray search&quot;,
            &quot;category&quot;: &quot;filter&quot;,
            &quot;title_vector&quot;: [
                0.2,
                0.18,
                0.22,
                0.4
            ],
            &quot;chunks&quot;: [
                {
                    &quot;text&quot;: &quot;Use element_filter to match scalar conditions within the same Struct element.&quot;,
                    &quot;section&quot;: &quot;filter&quot;,
                    &quot;page&quot;: 1,
                    &quot;quality_score&quot;: 0.93,
                    &quot;has_code&quot;: true,
                    &quot;emb_list_vector&quot;: [
                        0.21,
                        0.18,
                        0.33,
                        0.44
                    ],
                    &quot;emb&quot;: [
                        0.21,
                        0.18,
                        0.33,
                        0.44
                    ]
                },
                {
                    &quot;text&quot;: &quot;MATCH_LEAST checks how many elements satisfy a predicate.&quot;,
                    &quot;section&quot;: &quot;filter&quot;,
                    &quot;page&quot;: 2,
                    &quot;quality_score&quot;: 0.88,
                    &quot;has_code&quot;: false,
                    &quot;emb_list_vector&quot;: [
                        0.24,
                        0.22,
                        0.31,
                        0.39
                    ],
                    &quot;emb&quot;: [
                        0.24,
                        0.22,
                        0.31,
                        0.39
                    ]
                }
            ]
        },
        {
            &quot;doc_id&quot;: 3,
            &quot;title&quot;: &quot;Element-level search with offsets&quot;,
            &quot;category&quot;: &quot;search&quot;,
            &quot;title_vector&quot;: [
                0.33,
                0.11,
                0.29,
                0.37
            ],
            &quot;chunks&quot;: [
                {
                    &quot;text&quot;: &quot;Element-level search can return the offset of the matched Struct element.&quot;,
                    &quot;section&quot;: &quot;search&quot;,
                    &quot;page&quot;: 1,
                    &quot;quality_score&quot;: 0.95,
                    &quot;has_code&quot;: false,
                    &quot;emb_list_vector&quot;: [
                        0.32,
                        0.14,
                        0.28,
                        0.41
                    ],
                    &quot;emb&quot;: [
                        0.32,
                        0.14,
                        0.28,
                        0.41
                    ]
                }
            ]
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-into-nullable-StructArray-fields" class="common-anchor-header">插入到可为空的 StructArray 字段中<button data-href="#Insert-into-nullable-StructArray-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>仅当父<code translate="no">chunks</code> 字段在创建时启用了可空属性时，才运行此可选示例。NULL 适用于整个字段，而非单个 Struct 元素或子字段。空数组被视为有效值，不被视为 NULL。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.JsonNull;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> com.google.gson.JsonParser;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row.addProperty(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-number">10L</span>);
row.addProperty(<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;Article without chunks yet&quot;</span>);
row.addProperty(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;draft&quot;</span>);
row.add(<span class="hljs-string">&quot;title_vector&quot;</span>, JsonParser.parseString(<span class="hljs-string">&quot;[0.05, 0.10, 0.15, 0.20]&quot;</span>));
row.add(<span class="hljs-string">&quot;chunks&quot;</span>, JsonNull.INSTANCE);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .data(Collections.singletonList(row))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

_, err = cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;tech_articles&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;doc_id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">10</span>}).
    WithVarcharColumn(<span class="hljs-string">&quot;title&quot;</span>, []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Article without chunks yet&quot;</span>}).
    WithVarcharColumn(<span class="hljs-string">&quot;category&quot;</span>, []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;draft&quot;</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;title_vector&quot;</span>, <span class="hljs-number">4</span>, [][]<span class="hljs-type">float32</span>{{<span class="hljs-number">0.05</span>, <span class="hljs-number">0.10</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.20</span>}}).
    WithStructArrayColumn(<span class="hljs-string">&quot;chunks&quot;</span>, chunksSchema, []<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-literal">nil</span>}))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">row</span> = json!({
    <span class="hljs-string">&quot;doc_id&quot;</span>: <span class="hljs-number">10</span>,
    <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Article without chunks yet&quot;</span>,
    <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;draft&quot;</span>,
    <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.05</span>, <span class="hljs-number">0.10</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.20</span>],
    <span class="hljs-string">&quot;chunks&quot;</span>: null,
});
<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
    .<span class="hljs-title function_ invoke__">rows</span>(<span class="hljs-built_in">vec!</span>[row.<span class="hljs-title function_ invoke__">as_object</span>().<span class="hljs-title function_ invoke__">cloned</span>().<span class="hljs-title function_ invoke__">unwrap</span>()])
    .<span class="hljs-title function_ invoke__">build</span>()?;
client.<span class="hljs-title function_ invoke__">insert</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json row = {
    {<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-number">10</span>},
    {<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;Article without chunks yet&quot;</span>},
    {<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;draft&quot;</span>},
    {<span class="hljs-string">&quot;title_vector&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.05f</span>, <span class="hljs-number">0.10f</span>, <span class="hljs-number">0.15f</span>, <span class="hljs-number">0.20f</span>}},
    {<span class="hljs-string">&quot;chunks&quot;</span>, <span class="hljs-literal">nullptr</span>},
};

milvus::InsertRequest request;
request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>);
request.<span class="hljs-built_in">AddRowData</span>(std::<span class="hljs-built_in">move</span>(row));

milvus::InsertResponse response;
status = client-&gt;<span class="hljs-built_in">Insert</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: [
    { <span class="hljs-attr">doc_id</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Article without chunks yet&quot;</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">&quot;draft&quot;</span>, <span class="hljs-attr">title_vector</span>: [<span class="hljs-number">0.05</span>, <span class="hljs-number">0.10</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.20</span>], <span class="hljs-attr">chunks</span>: <span class="hljs-literal">null</span> },
  ],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;

<span class="hljs-keyword">await</span> client.InsertAsync(<span class="hljs-keyword">new</span> InsertReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    RowsData =
    [
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
        {
            [<span class="hljs-string">&quot;doc_id&quot;</span>] = <span class="hljs-number">10L</span>,
            [<span class="hljs-string">&quot;title&quot;</span>] = <span class="hljs-string">&quot;Article without chunks yet&quot;</span>,
            [<span class="hljs-string">&quot;category&quot;</span>] = <span class="hljs-string">&quot;draft&quot;</span>,
            [<span class="hljs-string">&quot;title_vector&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.05f</span>, <span class="hljs-number">0.10f</span>, <span class="hljs-number">0.15f</span>, <span class="hljs-number">0.20f</span> },
            [<span class="hljs-string">&quot;chunks&quot;</span>] = <span class="hljs-literal">null</span>
        }
    ]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;data&quot;: [
        {
            &quot;doc_id&quot;: 10,
            &quot;title&quot;: &quot;Article without chunks yet&quot;,
            &quot;category&quot;: &quot;draft&quot;,
            &quot;title_vector&quot;: [0.05, 0.10, 0.15, 0.20],
            &quot;chunks&quot;: null
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>对于非NULL的 StructArray 值，请为每个必填子字段提供有效值。请勿在同一实体中将NULL子字段数组与非NULL子字段数组混合使用。</p>
<div class="alert note">
<p>有关版本和部署可用性，请参阅<a href="/docs/zh/structarray-limits.md">StructArray 限制</a>。添加到现有 Collection 中的 StructArray 字段必须为可空；现有实体中，所添加字段的整体值均为 NULL。</p>
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
    </button></h2><p>在加载 Collection 之前，请按照《<a href="/docs/zh/index-structarray-fields.md">索引 StructArray 字段</a>》中的说明创建所需的向量索引。以下示例会等待加载完成，然后查询选定的子字段。 对于 cURL，请安装<code translate="no">jq</code> 以检查加载状态响应。在有限过时一致性下，插入后立即执行的查询可能不包含新行；请在写入内容可见后重复查询，或在创建示例 Collection 时配置强一致性。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.load_collection(<span class="hljs-string">&quot;tech_articles&quot;</span>)

rows = client.query(
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;
<span class="hljs-keyword">import</span> java.util.Arrays;

client.loadCollection(LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .build());

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">queryResp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .filter(<span class="hljs-string">&quot;doc_id in [1, 2, 3]&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
        .build());
System.out.println(queryResp.getQueryResults());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

loadTask, err := cli.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;tech_articles&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">if</span> err := loadTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

rs, err := cli.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;tech_articles&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;doc_id in [1, 2, 3]&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
fmt.Printf(<span class="hljs-string">&quot;query returned %d rows\n&quot;</span>, rs.ResultCount)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client.<span class="hljs-title function_ invoke__">load_collection</span>(LoadCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
    .<span class="hljs-title function_ invoke__">sync</span>(<span class="hljs-literal">true</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = client.<span class="hljs-title function_ invoke__">query</span>(QueryRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
    .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;doc_id in [1, 2, 3]&quot;</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>])
    .<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;query rows: {}&quot;</span>, resp.<span class="hljs-title function_ invoke__">results</span>().<span class="hljs-title function_ invoke__">get_output_field</span>(<span class="hljs-string">&quot;doc_id&quot;</span>).<span class="hljs-title function_ invoke__">map</span>(|f| f.<span class="hljs-title function_ invoke__">len</span>()).<span class="hljs-title function_ invoke__">unwrap_or</span>(<span class="hljs-number">0</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">milvus::LoadCollectionRequest load_req;
load_req.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>);
status = client-&gt;<span class="hljs-built_in">LoadCollection</span>(load_req);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) { <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>()); }

milvus::QueryRequest query_req;
query_req.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
         .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;doc_id in [1, 2, 3]&quot;</span>)
         .<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>});
milvus::QueryResponse query_resp;
status = client-&gt;<span class="hljs-built_in">Query</span>(query_req, query_resp);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) { <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>()); }

milvus::EntityRows output_rows;
status = query_resp.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">OutputRows</span>(output_rows);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) { <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>()); }
<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows) { std::cout &lt;&lt; row &lt;&lt; std::endl; }
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span> });

<span class="hljs-keyword">const</span> rows = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;doc_id in [1, 2, 3]&quot;</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>],
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(rows.<span class="hljs-property">data</span>.<span class="hljs-property">length</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.LoadCollectionAsync(<span class="hljs-keyword">new</span> LoadCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>
});

QueryResp rows = <span class="hljs-keyword">await</span> client.QueryAsync(<span class="hljs-keyword">new</span> QueryReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    Expression = <span class="hljs-string">&quot;doc_id in [1, 2, 3]&quot;</span>,
    Parameters = <span class="hljs-keyword">new</span> QueryParameters { OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span> } }
});

Console.WriteLine(<span class="hljs-string">$&quot;rows: <span class="hljs-subst">{rows.FieldsData.FirstOrDefault()?.RowCount ?? <span class="hljs-number">0</span>}</span>&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">set</span> -euo pipefail

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --fail-with-body --silent --show-error --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{&quot;collectionName&quot;:&quot;tech_articles&quot;}&#x27;</span> | jq -e <span class="hljs-string">&#x27;.code == 0&#x27;</span> &gt;/dev/null

loaded=<span class="hljs-literal">false</span>
<span class="hljs-keyword">for</span> attempt <span class="hljs-keyword">in</span> $(<span class="hljs-built_in">seq</span> 1 60); <span class="hljs-keyword">do</span>
  state=$(curl --fail-with-body --silent --show-error --request POST \
    --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
    --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
    --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
    --data-raw <span class="hljs-string">&#x27;{&quot;collectionName&quot;:&quot;tech_articles&quot;}&#x27;</span> | jq -er <span class="hljs-string">&#x27;if .code == 0 then .data.loadState else error(&quot;load-state request failed&quot;) end&#x27;</span>)
  <span class="hljs-keyword">if</span> [ <span class="hljs-string">&quot;<span class="hljs-variable">$state</span>&quot;</span> = <span class="hljs-string">&quot;LoadStateLoaded&quot;</span> ]; <span class="hljs-keyword">then</span>
    loaded=<span class="hljs-literal">true</span>
    <span class="hljs-built_in">break</span>
  <span class="hljs-keyword">fi</span>
  <span class="hljs-built_in">sleep</span> 1
<span class="hljs-keyword">done</span>
[ <span class="hljs-string">&quot;<span class="hljs-variable">$loaded</span>&quot;</span> = <span class="hljs-literal">true</span> ] || { <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Collection did not finish loading&quot;</span> &gt;&amp;2; <span class="hljs-built_in">exit</span> 1; }

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;filter&quot;: &quot;doc_id in [1, 2, 3]&quot;,
    &quot;outputFields&quot;: [&quot;doc_id&quot;, &quot;title&quot;, &quot;chunks[text]&quot;, &quot;chunks[section]&quot;, &quot;chunks[quality_score]&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>仅在查询、搜索、过滤或创建索引时使用 StructArray 字段路径（例如<code translate="no">chunks[text]</code> ）。插入有效载荷仍应使用<code translate="no">chunks</code> 下的嵌套对象。</p>
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
<tr><td>向量维度必须匹配。</td><td>向量值必须与为其向量子字段配置的<code translate="no">dim</code> 相匹配。</td></tr>
<tr><td>遵守<code translate="no">max_capacity</code> 。</td><td>一个实体中的 Struct 元素数量不得超过 StructArray 字段的<code translate="no">max_capacity</code> 。</td></tr>
<tr><td>对于不同的搜索模式，请使用单独的向量子场。</td><td>如果同时需要 EmbeddingList 搜索和元素级搜索，请将向量值写入两个向量子字段。</td></tr>
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
<li><p>仅将一个子字段设置为<code translate="no">null</code> ，而同一StructArray值中的其他子字段却有效。</p></li>
<li><p>仅将向量写入<code translate="no">emb_list_vector</code> ，随后尝试在<code translate="no">chunks[emb]</code> 上执行元素级搜索。</p></li>
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
<li><p>要为<code translate="no">chunks[emb_list_vector]</code> 、<code translate="no">chunks[emb]</code> 和标量子字段创建索引，请参阅《<a href="/docs/zh/index-structarray-fields.md">索引StructArray字段》</a>。</p></li>
<li><p>要搜索 StructArray 向量子字段，请参阅《<a href="/docs/zh/basic-vector-search-with-structarray.md">使用 StructArray 进行基本向量搜索</a>》。</p></li>
<li><p>要了解可为空行为和特定版本的限制，请参阅《<a href="/docs/zh/structarray-limits.md">StructArray 限制</a>》。</p></li>
</ol>
