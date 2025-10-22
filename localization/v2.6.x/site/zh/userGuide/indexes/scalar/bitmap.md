---
id: bitmap.md
title: 位图
summary: >-
  位图索引是一种高效的索引技术，旨在提高低 Cardinal 标量字段的查询性能。Cardinal 指的是字段中不同值的数量。具有较少不同元素的字段被视为低
  Cardinal。
---
<h1 id="BITMAP" class="common-anchor-header">位图<button data-href="#BITMAP" class="anchor-icon" translate="no">
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
    </button></h1><p>位图索引是一种高效的索引技术，旨在提高低 Cardinal 标量字段的查询性能。Cardinal 指的是字段中不同值的数量。具有较少不同元素的字段被视为低 Cardinal。</p>
<p>这种索引类型以紧凑的二进制格式表示字段值，并对其执行高效的位操作符，有助于缩短标量查询的检索时间。与其他类型的索引相比，位图索引在处理低奇数字段时通常具有更高的空间效率和更快的查询速度。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>位图</strong>一词由两个词组合而成：<strong>位</strong>（<strong>Bit</strong>）和映射（<strong>Map</strong>）。比特是计算机中最小的数据单位，只能保存<strong>0</strong>或<strong>1 的</strong>值。在这里，映射指的是根据 0 和 1 的赋值对数据进行转换和组织的过程。</p>
<p>位图索引由两个主要部分组成：位图和键。键代表索引字段中的唯一值。每个唯一值都有一个对应的位图。这些位图的长度等于 Collections 中的记录数。位图中的每个位对应集合中的一条记录。如果记录中索引字段的值与键相匹配，相应的位就会被设置为<strong>1</strong>，否则就会被设置为<strong>0</strong>。</p>
<p>考虑一个带有 "<strong>类别</strong>"和 "<strong>公共</strong>"字段的文档 Collections。我们想检索属于<strong>Tech</strong>类别并对<strong>公众</strong>开放的文档。在这种情况下，位图索引的键就是<strong>Tech</strong>和<strong>Public</strong>。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/bitmap.png" alt="Bitmap" class="doc-image" id="bitmap" />
   </span> <span class="img-wrapper"> <span>位图</span> </span></p>
<p>如图所示，"<strong>类别</strong>"和<strong>"公开</strong> <strong>"</strong>的位图索引是</p>
<ul>
<li><p><strong>Tech</strong>：[1，0，1，0，0]，这表明只有第 1 和第 3 个文档属于<strong>Tech</strong>类别。</p></li>
<li><p><strong>公共</strong>：[1，0，0，1，0]，表明只有第 1 和第 4 个文档对<strong>公众</strong>开放。</p></li>
</ul>
<p>为了找到符合这两个标准的文档，我们对这两个位图进行位和操作：</p>
<ul>
<li><strong>Tech</strong>AND<strong>Public</strong>：[1, 0, 0, 0, 0]</li>
</ul>
<p>得到的位图 [1, 0, 0, 0, 0] 表明只有第一个文档<strong>（ID</strong> <strong>1</strong>）同时满足这两个条件。通过使用位图索引和高效的位操作符，我们可以快速缩小搜索范围，无需扫描整个数据集。</p>
<h2 id="Create-a-bitmap-index" class="common-anchor-header">创建位图索引<button data-href="#Create-a-bitmap-index" class="anchor-icon" translate="no">
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
    </button></h2><p>要在 Milvus 中创建位图索引，请使用<code translate="no">create_index()</code> 方法，并将<code translate="no">index_type</code> 参数设置为<code translate="no">&quot;BITMAP&quot;</code> 。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>在本例中，我们在<code translate="no">my_collection</code> Collections 的<code translate="no">category</code> 字段上创建位图索引。<code translate="no">add_index()</code> 方法用于指定字段名称、索引类型和索引名称。</p>
<p>位图索引创建后，您可以在查询操作中使用<code translate="no">filter</code> 参数，根据索引字段执行标量过滤。这样就可以使用位图索引有效地缩小搜索结果的范围。有关详细信息，请参阅<a href="/docs/zh/boolean.md">过滤说明</a>。</p>
<h2 id="Drop-an-index" class="common-anchor-header">删除索引<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>使用<code translate="no">drop_index()</code> 方法从 Collections 中删除现有索引。</p>
<div class="alert note">
<ul>
<li><p>在<strong>v2.6.3</strong>或更早版本中，删除标量索引前必须释放 Collections。</p></li>
<li><p>从<strong>v2.6.4</strong>或更高版本开始，一旦不再需要标量索引，就可以直接删除，而无需先释放 Collections。</p></li>
</ul>
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>位图索引仅支持非主键的标量字段。</p></li>
<li><p>字段的数据类型必须是以下类型之一：</p>
<ul>
<li><p><code translate="no">BOOL</code>,<code translate="no">INT8</code>,<code translate="no">INT16</code>,<code translate="no">INT32</code>,<code translate="no">INT64</code> 、<code translate="no">VARCHAR</code></p></li>
<li><p><code translate="no">ARRAY</code> (元素必须是以下之一：<code translate="no">BOOL</code>,<code translate="no">INT8</code>,<code translate="no">INT16</code>,<code translate="no">INT32</code>,<code translate="no">INT64</code>,<code translate="no">VARCHAR</code>)</p></li>
</ul></li>
<li><p>位图索引不支持以下数据类型：</p>
<ul>
<li><p><code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code>: 浮点类型与位图索引的二进制性质不兼容。</p></li>
<li><p><code translate="no">JSON</code>:JSON 数据类型结构复杂，无法使用位图索引有效表示。</p></li>
</ul></li>
<li><p>位图索引不适用于高 Cardinality 字段（即具有大量不同值的字段）。</p>
<ul>
<li><p>一般来说，当字段的 Cardinality 小于 500 时，位图索引最为有效。</p></li>
<li><p>当 Cardinality 超过这个临界值时，位图索引的性能优势就会减弱，存储开销也会变得很大。</p></li>
<li><p>对于高 Cardinality 字段，可根据具体使用情况和查询要求，考虑使用其他索引技术，如倒排索引。</p></li>
</ul></li>
</ul>
