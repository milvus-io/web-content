---
id: stl-sort.md
title: STL_SORT
summary: >-
  The STL_SORT index is an index type specifically designed to enhance query
  performance on numeric fields (INT8, INT16, etc.) or TIMESTAMPTZ fields within
  Milvus by organizing the data in a sorted order.
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
    </button></h1><p>The <code translate="no">STL_SORT</code> index is an index type specifically designed to enhance query performance on numeric fields (INT8, INT16, etc.) or <code translate="no">TIMESTAMPTZ</code> fields within Milvus by organizing the data in a sorted order.</p>
<p>Use the <code translate="no">STL_SORT</code> index if you frequently run queries with:</p>
<ul>
<li><p>Comparison filtering with <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, and <code translate="no">&lt;=</code> operators</p></li>
<li><p>Range filtering with <code translate="no">IN</code> and <code translate="no">LIKE</code> operators</p></li>
</ul>
<h2 id="Supported-data-types" class="common-anchor-header">Supported data types<button data-href="#Supported-data-types" class="anchor-icon" translate="no">
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
<li><p>Numeric fields (e.g., <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>). For details, refer to <a href="/docs/number.md">Boolean & Number</a>.</p></li>
<li><p><code translate="no">TIMESTAMPTZ</code> fields. For details, refer to <a href="/docs/timestamptz-field.md">TIMESTAMPTZ Field</a>.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">How it works<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus implements <code translate="no">STL_SORT</code> in two phases:</p>
<ol>
<li><p><strong>Build index</strong></p>
<ul>
<li><p>During ingestion, Milvus collects all values for the indexed field.</p></li>
<li><p>The values are sorted in ascending order using C++ STL’s <a href="https://en.cppreference.com/w/cpp/algorithm/sort.html">std::sort</a>.</p></li>
<li><p>Each value is paired with its entity ID, and the sorted array is persisted as the index.</p></li>
</ul></li>
<li><p><strong>Accelerate queries</strong></p>
<ul>
<li><p>At query time, Milvus uses <strong>binary search</strong> (<a href="https://en.cppreference.com/w/cpp/algorithm/lower_bound.html">std::lower_bound</a> and <a href="https://en.cppreference.com/w/cpp/algorithm/upper_bound.html">std::upper_bound</a>) on the sorted array.</p></li>
<li><p>For equality, Milvus quickly finds all matching values.</p></li>
<li><p>For ranges, Milvus locates the start and end positions and returns all values in between.</p></li>
<li><p>Matching entity IDs are passed to the query executor for final result assembly.</p></li>
</ul></li>
</ol>
<p>This reduces query complexity from <strong>O(n)</strong> (full scan) to <strong>O(log n + m)</strong>, where <em>m</em> is the number of matches.</p>
<h2 id="Create-an-STLSORT-index" class="common-anchor-header">Create an STL_SORT index<button data-href="#Create-an-STLSORT-index" class="anchor-icon" translate="no">
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
    </button></h2><p>You can create an <code translate="no">STL_SORT</code> index on a numeric or <code translate="no">TIMESTAMPTZ</code> field. No extra parameters are required.</p>
<p>The example below shows how to create an <code translate="no">STL_SORT</code> index on a <code translate="no">TIMESTAMPTZ</code> field:</p>
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
<h2 id="Usage-notes" class="common-anchor-header">Usage notes<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Field types:</strong> Works with numeric and <code translate="no">TIMESTAMPTZ</code> fields. For more information on data types, refer to <a href="/docs/number.md">Boolean & Number</a> and <a href="/docs/timestamptz-field.md">TIMESTAMPTZ Field</a>.</p></li>
<li><p><strong>Parameters:</strong> No index parameters are needed.</p></li>
<li><p><strong>Mmap not supported:</strong> Memory-mapped mode is not available for <code translate="no">STL_SORT</code>.</p></li>
</ul>
