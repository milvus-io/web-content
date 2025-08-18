---
id: gpu-cagra.md
title: GPU_CAGRA
summary: >-
  The GPU_CAGRA index is a graph-based index optimized for GPUs. Using
  inference-grade GPUs to run the Milvus GPU version can be more cost-effective
  compared to using expensive training-grade GPUs.
---
<h1 id="GPUCAGRA" class="common-anchor-header">GPU_CAGRA<button data-href="#GPUCAGRA" class="anchor-icon" translate="no">
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
    </button></h1><p>The <strong>GPU_CAGRA</strong> index is a graph-based index optimized for GPUs. Using inference-grade GPUs to run the Milvus GPU version can be more cost-effective compared to using expensive training-grade GPUs.</p>
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
    </button></h2><p>To build a <code translate="no">GPU_CAGRA</code> index on a vector field in Milvus, use the <code translate="no">add_index()</code> method, specifying the <code translate="no">index_type</code>, <code translate="no">metric_type</code>, and additional parameters for the index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_CAGRA&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;intermediate_graph_degree&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Affects recall and build time by determining the graph’s degree before pruning</span>
        <span class="hljs-string">&quot;graph_degree&quot;</span>: <span class="hljs-number">32</span>, <span class="hljs-comment"># Affets search performance and recall by setting the graph’s degree after pruning</span>
        <span class="hljs-string">&quot;build_algo&quot;</span>: <span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Selects the graph generation algorithm before pruning</span>
        <span class="hljs-string">&quot;cache_dataset_on_device&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>, <span class="hljs-comment"># Decides whether to cache the original dataset in GPU memory</span>
        <span class="hljs-string">&quot;adapt_for_cpu&quot;</span>: <span class="hljs-string">&quot;false&quot;</span>, <span class="hljs-comment"># Decides whether to use GPU for index-building and CPU for search</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In this configuration:</p>
<ul>
<li><p><code translate="no">index_type</code>: The type of index to be built. In this example, set the value to <code translate="no">GPU_CAGRA</code>.</p></li>
<li><p><code translate="no">metric_type</code>: The method used to calculate the distance between vectors. For details, refer to <a href="/docs/metric.md">Metric Types</a>.</p></li>
<li><p><code translate="no">params</code>: Additional configuration options for building the index. To learn more building parameters available for the <code translate="no">GPU_CAGRA</code> index, refer to <a href="/docs/gpu-cagra.md#Index-building-params">Index building params</a>.</p></li>
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
        <span class="hljs-string">&quot;itopk_size&quot;</span>: <span class="hljs-number">16</span>, <span class="hljs-comment"># Determines the size of intermediate results kept during the search</span>
        <span class="hljs-string">&quot;search_width&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Specifies the number of entry points into the CAGRA graph during the search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In this configuration:</p>
<ul>
<li><code translate="no">params</code>: Additional configuration options for searching on the index. To learn more search parameters available for the <code translate="no">GPU_CAGRA</code> index, refer to <a href="/docs/gpu-cagra.md#Index-specific-search-params">Index-specific search params</a>.</li>
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
<h3 id="Index-building-params" class="common-anchor-header">Index building params</h3><p>The following table lists the parameters that can be configured in <code translate="no">params</code> when <a href="/docs/gpu-cagra.md#Build-index">building an index</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Default Value</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">intermediate_graph_degree</code></p></td>
     <td><p>Affects recall and build time by determining the graph’s degree before pruning. Recommended values are <code translate="no">32</code> or <code translate="no">64</code>.</p></td>
     <td><p><code translate="no">128</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">graph_degree</code></p></td>
     <td><p>Affects search performance and recall by setting the graph’s degree after pruning. A larger difference between these two degrees results in a longer build time. Its value must be smaller than the value of <code translate="no">intermediate_graph_degree</code>.</p></td>
     <td><p><code translate="no">64</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">build_algo</code></p></td>
     <td><p>Selects the graph generation algorithm before pruning. Possible values:</p>
<ul>
<li><p><code translate="no">IVF_PQ</code>: Offers higher quality but slower build time.</p></li>
<li><p><code translate="no">NN_DESCENT</code>: Provides a quicker build with potentially lower recall.</p></li>
</ul></td>
     <td><p><code translate="no">IVF_PQ</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">cache_dataset_on_device</code></p></td>
     <td><p>Decides whether to cache the original dataset in GPU memory. Possible values:</p>
<ul>
<li><p><code translate="no">"true"</code>: Caches the original dataset to enhance recall by refining search results.</p></li>
<li><p><code translate="no">"false"</code>: Does not cache the original dataset to save gpu memory.</p></li>
</ul></td>
     <td><p><code translate="no">"false"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">adapt_for_cpu</code></p></td>
     <td><p>Decides whether to use GPU for index-building and CPU for search.
 Setting this parameter to <code translate="no">"true"</code> requires the presence of the <code translate="no">ef</code> parameter in the search requests.</p></td>
     <td><p><code translate="no">"false"</code></p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Index-specific search params</h3><p>The following table lists the parameters that can be configured in <code translate="no">search_params.params</code> when <a href="/docs/gpu-cagra.md#Search-on-index">searching on the index</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Default Value</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">itopk_size</code></p></td>
     <td><p>Determines the size of intermediate results kept during the search. A larger value may improve recall at the expense of search performance. It should be at least equal to the final top-k (limit) value and is typically a power of 2 (e.g., 16, 32, 64, 128).</p></td>
     <td><p>Empty</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_width</code></p></td>
     <td><p>Specifies the number of entry points into the CAGRA graph during the search. Increasing this value can enhance recall but may impact search performance（e.g. 1, 2, 4, 8, 16, 32).</p></td>
     <td><p>Empty</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">min_iterations</code> / <code translate="no">max_iterations</code></p></td>
     <td><p>Controls the search iteration process. By default, they are set to <code translate="no">0</code>, and CAGRA automatically determines the number of iterations based on <code translate="no">itopk_size</code> and <code translate="no">search_width</code>. Adjusting these values manually can help balance performance and accuracy.</p></td>
     <td><p><code translate="no">0</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">team_size</code></p></td>
     <td><p>Specifies the number of CUDA threads used for calculating metric distance on the GPU. Common values are a power of 2 up to 32 (e.g. 2, 4, 8, 16, 32). It has a minor impact on search performance. The default value is <code translate="no">0</code>, where Milvus automatically selects the <code translate="no">team_size</code> based on the vector dimension.</p></td>
     <td><p><code translate="no">0</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Specifies the query time/accuracy trade-off. A higher <code translate="no">ef</code> value leads to more accurate but slower search.
 This parameter is mandatory if you set <code translate="no">adapt_for_cpu</code> to <code translate="no">true</code> when you build the index.</p></td>
     <td><p><code translate="no">[top_k, int_max]</code></p></td>
   </tr>
</table>
