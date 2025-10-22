---
id: stl-sort.md
title: STL_SORT
summary: >-
  STL_SORT 索引是一种专门设计用于提高数值字段（INT8、INT16 等）或 Milvus 中 TIMESTAMPTZ
  字段查询性能的索引类型，其方法是按排序顺序组织数据。
---
<h1 id="STLSORT" class="common-anchor-header">STL_SORT<button data-href="#STLSORT" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">STL_SORT</code> 索引是一种专门设计用于提高数值字段（INT8、INT16 等）或 Milvus 内<code translate="no">TIMESTAMPTZ</code> 字段查询性能的索引类型，其方法是按排序顺序组织数据。</p>
<p>如果您经常运行以下查询，请使用<code translate="no">STL_SORT</code> 索引：</p>
<ul>
<li><p>使用<code translate="no">==</code>,<code translate="no">!=</code>,<code translate="no">&gt;</code>,<code translate="no">&lt;</code>,<code translate="no">&gt;=</code> 和<code translate="no">&lt;=</code> 操作符进行比较过滤</p></li>
<li><p>使用<code translate="no">IN</code> 和<code translate="no">LIKE</code> 操作符进行范围过滤</p></li>
</ul>
<h2 id="Supported-data-types" class="common-anchor-header">支持的数据类型<button data-href="#Supported-data-types" class="anchor-icon" translate="no">
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
<li><p>数字字段（如<code translate="no">INT8</code>,<code translate="no">INT16</code>,<code translate="no">INT32</code>,<code translate="no">INT64</code>,<code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code> ）。有关详情，请参阅<a href="/docs/zh/number.md">布尔和数值</a>。</p></li>
<li><p><code translate="no">TIMESTAMPTZ</code> 字段。有关详细信息，请参阅<a href="/docs/zh/timestamptz-field.md">TIMESTAMPTZ 字段</a>。</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">工作原理<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 分两个阶段实现<code translate="no">STL_SORT</code> ：</p>
<ol>
<li><p><strong>建立索引</strong></p>
<ul>
<li><p>在采集过程中，Milvus 会收集索引字段的所有值。</p></li>
<li><p>这些值使用 C++ STL 的<a href="https://en.cppreference.com/w/cpp/algorithm/sort.html">std::sort</a> 按升序排序。</p></li>
<li><p>每个值与其实体 ID 配对，排序后的数组作为索引持久化。</p></li>
</ul></li>
<li><p><strong>加速查询</strong></p>
<ul>
<li><p>在查询时，Milvus 对排序数组使用<strong>二进制搜索</strong><a href="https://en.cppreference.com/w/cpp/algorithm/lower_bound.html">（std::lower_bound</a>和<a href="https://en.cppreference.com/w/cpp/algorithm/upper_bound.html">std::upper</a><a href="https://en.cppreference.com/w/cpp/algorithm/lower_bound.html">_</a> <a href="https://en.cppreference.com/w/cpp/algorithm/upper_bound.html">bound</a>）。</p></li>
<li><p>对于相等值，Milvus 能快速找到所有匹配值。</p></li>
<li><p>对于范围，Milvus 会定位开始和结束位置，并返回两者之间的所有值。</p></li>
<li><p>匹配的实体 ID 会被传递给查询执行器，以便组装最终结果。</p></li>
</ul></li>
</ol>
<p>这将查询复杂度从<strong>O(n)</strong>（全扫描）降低到<strong>O(log n + m)</strong>，其中<em>m</em>是匹配数。</p>
<h2 id="Create-an-STLSORT-index" class="common-anchor-header">创建 STL_SORT 索引<button data-href="#Create-an-STLSORT-index" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以在数字或<code translate="no">TIMESTAMPTZ</code> 字段上创建<code translate="no">STL_SORT</code> 索引。无需额外参数。</p>
<p>下面的示例显示了如何在<code translate="no">TIMESTAMPTZ</code> 字段上创建<code translate="no">STL_SORT</code> 索引：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a TIMESTAMPTZ field named &quot;tsz&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add RTREE index on the &quot;tsz&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;tsz&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,   <span class="hljs-comment"># Index for TIMESTAMPTZ</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;tsz_index&quot;</span>,  <span class="hljs-comment"># Optional, name your index</span></span>
<span class="highlighted-comment-line">    params={}                <span class="hljs-comment"># No extra params needed</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;tsz_demo&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">使用说明<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>字段类型：</strong>适用于数字字段和<code translate="no">TIMESTAMPTZ</code> 字段。有关数据类型的更多信息，请参阅<a href="/docs/zh/number.md">布尔和数字</a>以及<a href="/docs/zh/timestamptz-field.md">TIMESTAMPTZ 字段</a>。</p></li>
<li><p><strong>参数：</strong>不需要索引参数。</p></li>
<li><p><strong>不支持内存映射：</strong> <code translate="no">STL_SORT</code> 不支持内存映射模式。</p></li>
</ul>
