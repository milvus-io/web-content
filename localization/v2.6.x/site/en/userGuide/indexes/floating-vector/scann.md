---
id: scann.md
title: SCANN
summary: >-
  Powered by the ScaNN library from Google, the SCANN index in Milvus is
  designed to address scaling vector similarity search challenges, striking a
  balance between speed and accuracy, even on large datasets that would
  traditionally pose challenges for most search algorithms.
---
<h1 id="SCANN" class="common-anchor-header">SCANN<button data-href="#SCANN" class="anchor-icon" translate="no">
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
    </button></h1><p>Powered by the <a href="https://github.com/google-research/google-research/blob/master/scann%2FREADME.md">ScaNN</a> library from Google, the <code translate="no">SCANN</code> index in Milvus is designed to address scaling vector similarity search challenges, striking a balance between speed and accuracy, even on large datasets that would traditionally pose challenges for most search algorithms.</p>
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
    </button></h2><p>ScaNN is built to solve one of the biggest challenges in vector search: efficiently finding the most relevant vectors in high-dimensional spaces, even as datasets grow larger and more complex. Its architecture breaks down the vector search process into distinct stages:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/scann.png" alt="Scann" class="doc-image" id="scann" />
    <span>Scann</span>
  </span>
</p>
<ol>
<li><p><strong>Partitioning</strong>: Divides the dataset into clusters. This method narrows the search space by focusing only on relevant data subsets instead of scanning the entire dataset, saving time and processing resources. ScaNN often uses clustering algorithms, such as <a href="https://zilliz.com/blog/k-means-clustering">k-means</a>, to identify clusters, which allows it to perform similarity searches more efficiently.</p></li>
<li><p><strong>Quantization</strong>: ScaNN applies a quantization process known as <a href="https://arxiv.org/abs/1908.10396">anisotropic vector quantization</a> after partitioning. Traditional quantization focuses on minimizing the overall distance between original and compressed vectors, which isn’t ideal for tasks like <a href="https://papers.nips.cc/paper/5329-asymmetric-lsh-alsh-for-sublinear-time-maximum-inner-product-search-mips.pdf">Maximum Inner Product Search (MIPS)</a>, where similarity is determined by the inner product of vectors rather than direct distance. Anisotropic quantization instead prioritizes preserving parallel components between vectors, or the parts most important for calculating accurate inner products. This approach allows ScaNN to maintain high MIPS accuracy by carefully aligning compressed vectors with the query, enabling faster, more precise similarity searches.</p></li>
<li><p><strong>Re-ranking</strong>: The re-ranking phase is the final step, where ScaNN fine-tunes the search results from the partitioning and quantization stages. This re-ranking applies precise inner product calculations to the top candidate vectors, ensuring the final results are highly accurate. Re-ranking is crucial in high-speed recommendation engines or image search applications where the initial filtering and clustering serve as a coarse layer, and the final stage ensures that only the most relevant results are returned to the user.</p></li>
</ol>
<p>The performance of <code translate="no">SCANN</code> is controlled by two key parameters that let you fine-tune the balance between speed and accuracy:</p>
<ul>
<li><p><code translate="no">with_raw_data</code>: Controls whether original vector data is stored alongside quantized representations. Enabling this parameter improves accuracy during re-ranking but increases storage requirements.</p></li>
<li><p><code translate="no">reorder_k</code>: Determines how many candidates are refined during the final re-ranking phase. Higher values improve accuracy but increase search latency.</p></li>
</ul>
<p>For detailed guidance on optimizing these parameters for your specific use case, refer to <a href="/docs/scann.md#Index-params">Index params</a>.</p>
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
    </button></h2><p>To build a <code translate="no">SCANN</code> index on a vector field in Milvus, use the <code translate="no">add_index()</code> method, specifying the <code translate="no">index_type</code>, <code translate="no">metric_type</code>, and additional parameters for the index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;SCANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span></span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to hold raw data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In this configuration:</p>
<ul>
<li><p><code translate="no">index_type</code>: The type of index to be built. In this example, set the value to <code translate="no">SCANN</code>.</p></li>
<li><p><code translate="no">metric_type</code>: The method used to calculate the distance between vectors. Supported values include <code translate="no">COSINE</code>, <code translate="no">L2</code>, and <code translate="no">IP</code>. For details, refer to <a href="/docs/metric.md">Metric Types</a>.</p></li>
<li><p><code translate="no">params</code>: Additional configuration options for building the index.</p>
<ul>
<li><code translate="no">with_raw_data</code>: Whether to store the original vector data alongside the quantized representation.</li>
</ul>
<p>To learn more building parameters available for the <code translate="no">SCANN</code> index, refer to <a href="/docs/scann.md#Index-building-params">Index building params</a>.</p></li>
</ul>
<p>Once the index parameters are configured, you can create the index by using the <code translate="no">create_index()</code> method directly or passing the index params in the <code translate="no">create_collection</code> method. For details, refer to <a href="/docs/create-collection.md">Create Collection</a>.</p>
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
        <span class="hljs-string">&quot;reorder_k&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of candidates to refine</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In this configuration:</p>
<ul>
<li><p><code translate="no">params</code>: Additional configuration options for searching on the index.</p>
<ul>
<li><code translate="no">reorder_k</code>: Number of candidates to refine during the re-ranking phase.</li>
</ul>
<p>To learn more search parameters available for the <code translate="no">SCANN</code> index, refer to <a href="/docs/scann.md#Index-specific-search-params">Index-specific search params</a>.</p></li>
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
    </button></h3><p>The following table lists the parameters that can be configured in <code translate="no">params</code> when <a href="/docs/scann.md#Build-index">building an index</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>Whether to store the original vector data alongside the quantized representation. When enabled, this allows for more accurate similarity calculations during the re-ranking phase by using the original vectors instead of quantized approximations.</p></td>
     <td><p><strong>Type</strong>: Boolean
 <strong>Range</strong>: <code translate="no">true</code>, <code translate="no">false</code></p>
<p><strong>Default value</strong>: <code translate="no">true</code></p></td>
     <td><p>Set to <code translate="no">true</code> for <strong>higher search accuracy</strong> and when storage space is not a primary concern. The original vector data enables more precise similarity calculations during re-ranking.
 Set to <code translate="no">false</code> to <strong>reduce storage overhead</strong> and memory usage, especially for large datasets. However, this may result in slightly lower search accuracy as the re-ranking phase will use quantized vectors.</p>
<p><strong>Recommended</strong>: Use <code translate="no">true</code> for production applications where accuracy is critical.</p></td>
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
    </button></h3><p>The following table lists the parameters that can be configured in <code translate="no">search_params.params</code> when <a href="/docs/scann.md#Search-on-index">searching on the index</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reorder_k</code></p></td>
     <td><p>Controls the number of candidate vectors that are refined during the re-ranking phase. This parameter determines how many top candidates from the initial partitioning and quantization stages are re-evaluated using more precise similarity calculations.</p></td>
     <td><p><strong>Type</strong>: Integer
 <strong>Range</strong>: [1, <em>int_max</em>]</p>
<p><strong>Default value</strong>: None</p></td>
     <td><p>A larger <code translate="no">reorder_k</code> generally leads to <strong>higher search accuracy</strong> as more candidates are considered during the final refinement phase. However, this also <strong>increases search time</strong> due to additional computation.
 Consider increasing <code translate="no">reorder_k</code> when achieving high recall is critical and search speed is less of a concern. A good starting point is 2-5x your desired <code translate="no">limit</code> (TopK results to return).</p>
<p>Consider decreasing <code translate="no">reorder_k</code> to prioritize faster searches, especially in scenarios where a slight reduction in accuracy is acceptable.</p>
<p>In most cases, we recommend you set a value within this range: [<em>limit</em>, <em>limit</em> * 5].</p></td>
   </tr>
</table>
