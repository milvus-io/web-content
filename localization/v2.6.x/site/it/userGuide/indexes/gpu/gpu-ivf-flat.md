---
id: gpu-ivf-flat.md
title: GPU_IVF_FLAT
summary: >-
  The GPU_IVF_FLAT index is a GPU-accelerated version of the IVF_FLAT index,
  designed exclusively for GPU environments. It partitions vector data into
  nlist cluster units and computes similarity by first comparing the target
  query vector with the center of each cluster. By tuning the nprobe parameter,
  only the most promising clusters are searched, which reduces query time while
  maintaining a balance between accuracy and speed. For more information on
  foundational concepts, refer to IVF_FLAT.
---
<h1 id="GPUIVFFLAT" class="common-anchor-header">GPU_IVF_FLAT<button data-href="#GPUIVFFLAT" class="anchor-icon" translate="no">
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
    </button></h1><p>The <strong>GPU_IVF_FLAT</strong> index is a GPU-accelerated version of the IVF_FLAT index, designed exclusively for GPU environments. It partitions vector data into <code translate="no">nlist</code> cluster units and computes similarity by first comparing the target query vector with the center of each cluster. By tuning the <code translate="no">nprobe</code> parameter, only the most promising clusters are searched, which reduces query time while maintaining a balance between accuracy and speed. For more information on foundational concepts, refer to <a href="/docs/ivf-flat.md">IVF_FLAT</a>.</p>
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
    </button></h2><p>To build a <code translate="no">GPU_IVF_FLAT</code> index on a vector field in Milvus, use the <code translate="no">add_index()</code> method, specifying the <code translate="no">index_type</code>, <code translate="no">metric_type</code>, and additional parameters for the index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_IVF_FLAT&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>, <span class="hljs-comment"># Number of clusters for the index</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In this configuration:</p>
<ul>
<li><p><code translate="no">index_type</code>: The type of index to be built. In this example, set the value to <code translate="no">GPU_IVF_FLAT</code>.</p></li>
<li><p><code translate="no">metric_type</code>: The method used to calculate the distance between vectors. For details, refer to <a href="/docs/metric.md">Metric Types</a>.</p></li>
<li><p><code translate="no">params</code>: Additional configuration options for building the index.</p>
<ul>
<li><code translate="no">nlist</code>: Number of clusters to divide the dataset.</li>
</ul>
<p>To learn more building parameters available for the <code translate="no">GPU_IVF_FLAT</code> index, refer to <a href="/docs/gpu-ivf-flat.md#Index-building-params">Index building params</a>.</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In this configuration:</p>
<ul>
<li><p><code translate="no">params</code>: Additional configuration options for searching on the index.</p>
<ul>
<li><code translate="no">nprobe</code>: Number of clusters to search for.</li>
</ul>
<p>To learn more search parameters available for the <code translate="no">GPU_IVF_FLAT</code> index, refer to <a href="/docs/gpu-ivf-flat.md#Index-specific-search-params">Index-specific search params</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Index building params</h3><p>The following table lists the parameters that can be configured in <code translate="no">params</code> when <a href="/docs/gpu-ivf-flat.md#Build-index">building an index</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>The number of clusters to create using the k-means algorithm during index building.
 Each cluster, represented by a centroid, stores a list of vectors. Increasing this parameter reduces the number of vectors in each cluster, creating smaller, more focused partitions.</p></td>
     <td><p><strong>Type</strong>: Integer
 <strong>Range</strong>: [1, 65536]</p>
<p><strong>Default value</strong>: <code translate="no">128</code></p></td>
     <td><p>Larger <code translate="no">nlist</code> values improve recall by creating more refined clusters but increase index building time. Optimize based on dataset size and available resources.
 In most cases, we recommend you set a value within this range: [32, 4096].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Index-specific search params</h3><p>The following table lists the parameters that can be configured in <code translate="no">search_params.params</code> when <a href="/docs/gpu-ivf-flat.md#Search-on-index">searching on the index</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>The number of clusters to search for candidates.
 Higher values allow more clusters to be searched, improving recall by expanding the search scope but at the cost of increased query latency.</p></td>
     <td><p><strong>Type</strong>: Integer
 <strong>Range</strong>: [1, <em>nlist</em>]</p>
<p><strong>Default value</strong>: <code translate="no">8</code></p></td>
     <td><p>Increasing this value improves recall but may slow down the search.
 Set <code translate="no">nprobe</code> proportionally to <code translate="no">nlist</code> to balance speed and accuracy.</p>
<p>In most cases, we recommend you set a value within this range: [1, nlist].</p></td>
   </tr>
</table>
