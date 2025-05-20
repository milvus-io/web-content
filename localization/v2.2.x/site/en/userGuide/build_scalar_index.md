---
id: build_scalar_index.md
related_key: create scalar index
summary: Learn how to build an index for scalar fields in Milvus.
title: ''
---
<h1 id="Build-an-Index-on-Scalars" class="common-anchor-header">Build an Index on Scalars<button data-href="#Build-an-Index-on-Scalars" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide describes how to build an index on scalar fields.</p>
<h2 id="Overview" class="common-anchor-header">Overview<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Unlike vectors, which have both magnitude and direction, scalars have only magnitude. Milvus regards single numbers and strings as scalars. <a href="/docs/v2.2.x/schema.md#Supported-data-type">Here</a> is a list of the available data types for scalar fields in Milvus.</p>
<p>To speed up <a href="/docs/v2.2.x/boolean.md">attribute filtering</a> in <a href="/docs/v2.2.x/hybridsearch.md">hybrid searches</a>, you can build indexes on scalar fields since Milvus v2.1.0. You can read more about scalar field indexing <a href="/docs/v2.2.x/scalar_index.md">here</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Build index<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>To build an index on scalar fields, you do not need to set any index parameters. The default value of a scalar field index name is <strong><em>default_idx</em></strong> followed by the name of the indexed field. You can set it to another value that seems fit.</p>
<p>The following code snippet assumes that a collection named <code translate="no">book</code> already exists and an index is to be created on the string field <code translate="no">book_name</code>.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#csharp">C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">Collection</span>

collection = <span class="hljs-title class_">Collection</span>(<span class="hljs-string">&quot;book&quot;</span>)   
collection.<span class="hljs-title function_">create_index</span>(
  field_name=<span class="hljs-string">&quot;book_name&quot;</span>, 
  index_name=<span class="hljs-string">&quot;scalar_index&quot;</span>,
)
collection.<span class="hljs-title function_">load</span>()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> collection = milvusClient.<span class="hljs-title class_">GetCollection</span>(<span class="hljs-string">&quot;book&quot;</span>);
<span class="hljs-keyword">await</span> collection.<span class="hljs-title class_">CreateIndexAsync</span>(<span class="hljs-string">&quot;book_name&quot;</span>, <span class="hljs-attr">indexName</span>: <span class="hljs-string">&quot;scalar_index&quot;</span>);
<span class="hljs-keyword">await</span> collection.<span class="hljs-title class_">LoadAsync</span>();
<button class="copy-code-btn"></button></code></pre>
<p>Once the index has been created, you can include a boolean expression on this string field in a vector similarity search as follows:</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#csharp">C#</a>
</div>
<pre><code translate="no" class="language-python">search_param = {
  <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>]],
  <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;book_intro&quot;</span>,
  <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
  <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>,
  <span class="hljs-string">&quot;expr&quot;</span>: <span class="hljs-string">&quot;book_name like \&quot;Hello%\&quot;&quot;</span>, 
}
res = collection.<span class="hljs-title function_">search</span>(**search_param)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp">
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>To learn more about scalar field indexing, read <a href="/docs/v2.2.x/scalar_index.md">Scalar Index</a>.</p></li>
<li><p>To learn more about the related terms and rules mentioned above, read</p>
<ul>
<li><a href="/docs/v2.2.x/bitset.md">Bitset</a></li>
<li><a href="/docs/v2.2.x/hybridsearch.md">Hybrid search</a></li>
<li><a href="/docs/v2.2.x/boolean.md">Boolean expression rules</a></li>
<li><a href="/docs/v2.2.x/schema.md#Supported-data-type">Supported data types</a></li>
</ul></li>
</ul>
