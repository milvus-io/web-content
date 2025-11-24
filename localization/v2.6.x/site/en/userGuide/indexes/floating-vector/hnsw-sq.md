---
id: hnsw-sq.md
title: HNSW_SQ
summary: >-
  HNSW_SQ combines Hierarchical Navigable Small World (HNSW) graphs with Scalar
  Quantization (SQ), creating an advanced vector indexing method that offers a
  controllable size-versus-accuracy trade-off. Compared to standard HNSW, this
  index type maintains high query processing speed while introducing a slight
  increase in index construction time.
---
<h1 id="HNSWSQ" class="common-anchor-header">HNSW_SQ<button data-href="#HNSWSQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_SQ</strong> combines Hierarchical Navigable Small World (HNSW) graphs with Scalar Quantization (SQ), creating an advanced vector indexing method that offers a controllable size-versus-accuracy trade-off. Compared to standard <a href="/docs/v2.6.x/hnsw.md">HNSW</a>, this index type maintains high query processing speed while introducing a slight increase in index construction time.</p>
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
    </button></h2><p>HNSW_SQ combines two indexing techniques: <strong>HNSW</strong> for fast graph-based navigation and <strong>SQ</strong> for efficient vector compression.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW constructs a multi-layer graph where each node corresponds to a vector in the dataset. In this graph, nodes are connected based on their similarity, enabling rapid traversal through the data space. The hierarchical structure allows the search algorithm to narrow down the candidate neighbors, significantly accelerating the search process in high-dimensional spaces.</p>
<p>For more information, refer to <a href="/docs/v2.6.x/hnsw.md">HNSW</a>.</p>
<h3 id="SQ" class="common-anchor-header">SQ<button data-href="#SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>SQ is a method for compressing vectors by representing them with fewer bits. For instance:</p>
<ul>
<li><p><strong>SQ8</strong> uses 8 bits, mapping values into 256 levels.  For more information, refer to <a href="/docs/v2.6.x/ivf-sq8.md#SQ8">IVF_SQ8</a>.</p></li>
<li><p><strong>SQ6</strong> uses 6 bits to represent each floating-point value, resulting in 64 discrete levels.</p></li>
</ul>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/hnsw-sq.png" alt="Hnsw Sq" class="doc-image" id="hnsw-sq" />
    <span>Hnsw Sq</span>
  </span>
</p>
<p>This reduction in precision dramatically decreases the memory footprint and speeds up the computation while retaining the essential structure of the data.</p>
<h3 id="HNSW-+-SQ" class="common-anchor-header">HNSW + SQ<button data-href="#HNSW-+-SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW_SQ combines the strengths of HNSW and SQ to enable efficient approximate nearest neighbor search. Here’s how the process works:</p>
<ol>
<li><p><strong>Data Compression:</strong> SQ compresses the vectors using the <code translate="no">sq_type</code> (for example, SQ6 or SQ8), which reduces memory usage. This compression may lower precision, but it allows the system to handle larger datasets.</p></li>
<li><p><strong>Graph Construction:</strong> The compressed vectors are used to build an HNSW graph. Because the data is compressed, the resulting graph is smaller and faster to search.</p></li>
<li><p><strong>Candidate Retrieval:</strong> When a query vector is provided, the algorithm uses the compressed data to quickly identify a pool of candidate neighbors from the HNSW graph.</p></li>
<li><p><strong>(Optional) Result Refinement:</strong> The initial candidate results can be refined for better accuracy, based on the following parameters:</p>
<ul>
<li><p><code translate="no">refine</code>: Controls whether this refinement step is activated. When set to <code translate="no">true</code>, the system recalculates distances using higher-precision or uncompressed representations.</p></li>
<li><p><code translate="no">refine_type</code>: Specifies the precision level of data used during refinement (e.g., SQ6, SQ8, BF16). A higher-precision choice such as <code translate="no">FP32</code> can yield more accurate results but requires more memory. This must exceed the precision of the original compressed data set by <code translate="no">sq_type</code>.</p></li>
<li><p><code translate="no">refine_k</code>: Acts as a magnification factor. For instance, if your top <em>k</em> is 100 and <code translate="no">refine_k</code> is 2, the system re-ranks the top 200 candidates and returns the best 100, enhancing overall accuracy.</p></li>
</ul></li>
</ol>
<p>For a full list of parameters and valid values, refer to <a href="/docs/v2.6.x/hnsw-sq.md#Index-params">Index params</a>.</p>
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
    </button></h2><p>To build an <code translate="no">HNSW_SQ</code> index on a vector field in Milvus, use the <code translate="no">add_index()</code> method, specifying the <code translate="no">index_type</code>, <code translate="no">metric_type</code>, and additional parameters for the index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_SQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;sq_type&quot;</span>: <span class="hljs-string">&quot;SQ6&quot;</span>, <span class="hljs-comment"># Scalar quantizer type</span>
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In this configuration:</p>
<ul>
<li><p><code translate="no">index_type</code>: The type of index to be built. In this example, set the value to <code translate="no">HNSW_SQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: The method used to calculate the distance between vectors. Supported values include <code translate="no">COSINE</code>, <code translate="no">L2</code>, and <code translate="no">IP</code>. For details, refer to <a href="/docs/v2.6.x/metric.md">Metric Types</a>.</p></li>
<li><p><code translate="no">params</code>: Additional configuration options for building the index. For details, refer to <a href="/docs/v2.6.x/hnsw-sq.md#Index-building-params">Index building params</a>.</p></li>
</ul>
<p>Once the index parameters are configured, you can create the index by using the <code translate="no">create_index()</code> method directly or passing the index params in the <code translate="no">create_collection</code> method. For details, refer to <a href="/docs/v2.6.x/create-collection.md">Create Collection</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Search on index<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Once the index is built and entities are inserted, you can perform similarity searches on the index.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Parameter controlling query time/accuracy trade-off</span>
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">1</span> <span class="hljs-comment"># The magnification factor</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In this configuration:</p>
<ul>
<li><code translate="no">params</code>: Additional configuration options for searching on the index. For details, refer to <a href="/docs/v2.6.x/hnsw-sq.md#Index-specific-search-params">Index-specific search params</a>.</li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Index params<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>This section provides an overview of the parameters used for building an index and performing searches on the index.</p>
<h3 id="Index-building-params" class="common-anchor-header">Index building params<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>The following table lists the parameters that can be configured in <code translate="no">params</code> when <a href="/docs/v2.6.x/hnsw-sq.md#share-PRYPd4xBJonkoZxPpNWcdnebnNh">building an index</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Maximum number of connections （or edges) each node can have in the graph, including both outgoing and incoming edges.
 This parameter directly affects both index construction and search.</p></td>
     <td><p><strong>Type</strong>: Integer
 <strong>Range</strong>: [2, 2048]</p>
<p><strong>Default value</strong>: <code translate="no">30</code> (up to 30 outgoing and 30 incoming edges per node)</p></td>
     <td><p>A larger <code translate="no">M</code> generally leads to <strong>higher accuracy</strong> but <strong>increases memory overhead</strong> and <strong>slows down both index building and search</strong>.
 Consider increasing <code translate="no">M</code> for datasets with high dimensionality or when high recall is crucial.</p>
<p>Consider decreasing <code translate="no">M</code> when memory usage and search speed are primary concerns.</p>
<p>In most cases, we recommend you set a value within this range: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Number of candidate neighbors considered for connection during index construction.
 A larger pool of candidates is evaluated for each new element, but the maximum number of connections actually established is still limited by <code translate="no">M</code>.</p></td>
     <td><p><strong>Type</strong>: Integer
 <strong>Range</strong>: [1, <em>int_max</em>]</p>
<p><strong>Default value</strong>: <code translate="no">360</code></p></td>
     <td><p>A higher <code translate="no">efConstruction</code> typically results in a <strong>more accurate index</strong>, as more potential connections are explored. However, this also leads to <strong>longer indexing time and increased memory usage</strong> during construction.
 Consider increasing <code translate="no">efConstruction</code> for improved accuracy, especially in scenarios where indexing time is less critical.</p>
<p>Consider decreasing <code translate="no">efConstruction</code> to speed up index construction when resource constraints are a concern.</p>
<p>In most cases, we recommend you set a value within this range: [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">sq_type</code></p></td>
     <td><p>Specifies the scalar quantization method for compressing vectors. Each option offers a different balance between compression and accuracy:</p>
<ul>
<li><p><code translate="no">SQ6</code>: Encodes vectors using 6-bit integers.</p></li>
<li><p><code translate="no">SQ8</code>: Encodes vectors using 8-bit integers.</p></li>
<li><p><code translate="no">BF16</code>: Uses the Bfloat16 format.</p></li>
<li><p><code translate="no">FP16</code>: Uses the standard 16-bit floating-point format.</p></li>
</ul></td>
     <td><p><strong>Type</strong>: String
 <strong>Range</strong>: [ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code> ]</p>
<p><strong>Default value</strong>: <code translate="no">SQ8</code></p></td>
     <td><p>The choice of <code translate="no">sq_type</code> depends on the specific application's needs. If memory efficiency is a primary concern, <code translate="no">SQ6</code> or <code translate="no">SQ8</code> might be suitable. On the other hand, if accuracy is paramount, <code translate="no">BF16</code> or <code translate="no">FP16</code> could be preferred.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>A boolean flag that controls whether a refinement step is applied during search. Refinement involves reranking the initial results by computing exact distances between the query vector and candidates.</p></td>
     <td><p><strong>Type</strong>: Boolean
 <strong>Range</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p>
<p><strong>Default value</strong>: <code translate="no">false</code></p></td>
     <td><p>Set to <code translate="no">true</code> if high accuracy is essential and you can tolerate slightly slower search times. Use <code translate="no">false</code> if speed is a priority and a minor compromise in accuracy is acceptable.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Determines the precision of the data used for refinement.
 This precision must be higher than that of the compressed vectors (as set by <code translate="no">sq_type</code>), affecting both the accuracy of the re-ranked vectors and their memory footprint.</p></td>
     <td><p><strong>Type</strong>: String
 <strong>Range</strong>:[ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p>
<p><strong>Default value</strong>: None</p></td>
     <td><p>Use <code translate="no">FP32</code> for maximum precision at a higher memory cost, or <code translate="no">SQ6</code>/<code translate="no">SQ8</code> for better compression. <code translate="no">BF16</code> and <code translate="no">FP16</code> offer a balanced alternative.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Index-specific search params<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>The following table lists the parameters that can be configured in <code translate="no">search_params.params</code> when <a href="/docs/v2.6.x/hnsw-sq.md#share-DeFldzMQQoc2W4x2YiIcYUbqnne">searching on the index</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Controls the breadth of search during nearest neighbor retrieval. It determines how many nodes are visited and evaluated as potential nearest neighbors. 
 This parameter affects only the search process and applies exclusively to the bottom layer of the graph.</p></td>
     <td><p><strong>Type</strong>: Integer
 <strong>Range</strong>: [1, <em>int_max</em>]</p>
<p><strong>Default value</strong>: <em>limit</em> (TopK nearest neighbors to return)</p></td>
     <td><p>A larger <code translate="no">ef</code> generally leads to <strong>higher search accuracy</strong> as more potential neighbors are considered. However, this also <strong>increases search time</strong>.
 Consider increasing <code translate="no">ef</code> when achieving high recall is critical and search speed is less of a concern.</p>
<p>Consider decreasing <code translate="no">ef</code> to prioritize faster searches, especially in scenarios where a slight reduction in accuracy is acceptable.</p>
<p>In most cases, we recommend you set a value within this range: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>The magnification factor that controls how many extra candidates are examined during the refinement stage, relative to the requested top K results.</p></td>
     <td><p><strong>Type</strong>: Float
 <strong>Range</strong>: [1, <em>float_max</em>)</p>
<p><strong>Default value</strong>: 1</p></td>
     <td><p>Higher values of <code translate="no">refine_k</code> can improve recall and accuracy but will also increase search time and resource usage. A value of 1 means the refinement process considers only the initial top K results.</p></td>
   </tr>
</table>
