---
id: index-with-gpu.md
order: 3
summary: >-
  This guide explains how to build an index with GPU support in Milvus to
  enhance search performance.
title: Index with GPU
---
<h1 id="Index-with-GPU" class="common-anchor-header">Index with GPU<button data-href="#Index-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide outlines the steps to build an index with GPU support in Milvus, which can significantly improve search performance in high-throughput and high-recall scenarios. For details on the types of GPU indexes supported by Milvus, refer to <a href="/docs/v2.4.x/gpu_index.md">GPU Index</a>.</p>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">Configure Milvus settings for GPU memory control<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus uses a global graphics memory pool to allocate GPU memory.</p>
<p>It supports two parameters <code translate="no">initMemSize</code> and <code translate="no">maxMemSize</code> in <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">Milvus config file</a>. The pool size is initially set to <code translate="no">initMemSize</code>, and will be automatically expanded to <code translate="no">maxMemSize</code> after exceeding this limit.</p>
<p>The default <code translate="no">initMemSize</code> is 1/2 of the available GPU memory when Milvus starts, and the default <code translate="no">maxMemSize</code> is equal to all available GPU memory.</p>
<p>Up until Milvus 2.4.1( including version 2.4.1), Milvus used a unified GPU memory pool. For versions prior to 2.4.1( including version 2.4.1), it was recommended to set both of the value to 0.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>From Milvus 2.4.1 onwards, the GPU memory pool is only used for temporary GPU data during searches. Therefore, it is recommended to set it to 2048 and 4096.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-an-index" class="common-anchor-header">Build an index<button data-href="#Build-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>The following examples demonstrate how to build GPU indexes of different types.</p>
<h3 id="Prepare-index-parameters" class="common-anchor-header">Prepare index parameters</h3><p>When setting up GPU index parameters, define <strong>index_type</strong>, <strong>metric_type</strong>, and <strong>params</strong>:</p>
<ul>
<li><p><strong>index_type</strong> (<em>string</em>): The type of index used to accelerate vector search. Valid options include <strong>GPU_CAGRA</strong>, <strong>GPU_IVF_FLAT</strong>, <strong>GPU_IVF_PQ</strong>, and <strong>GPU_BRUTE_FORCE</strong>.</p></li>
<li><p><strong>metric_type</strong> (<em>string</em>): The type of metrics used to measure the similarity of vectors. Valid options are <strong>IP</strong> and <strong>L2</strong>.</p></li>
<li><p><strong>params</strong>(<em>dict</em>): The index-specific building parameters. The valid options for this parameter depend on the index type.</p></li>
</ul>
<p>Here are example configurations for different index types:</p>
<ul>
<li><p><strong>GPU_CAGRA</strong> index</p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_CAGRA&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&#x27;intermediate_graph_degree&#x27;</span>: <span class="hljs-number">64</span>,
        <span class="hljs-string">&#x27;graph_degree&#x27;</span>: <span class="hljs-number">32</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Possible options for <strong>params</strong> include:</p>
<ul>
<li><p><strong>intermediate_graph_degree</strong> (<em>int</em>): Affects recall and build time by determining the graph’s degree before pruning. Recommended values are <strong>32</strong> or <strong>64</strong>.</p></li>
<li><p><strong>graph_degree</strong> (<em>int</em>): Affects search performance and recall by setting the graph’s degree after pruning. Typically, it is half of the <strong>intermediate_graph_degree</strong>. A larger difference between these two degrees results in a longer build time. Its value must be smaller than the value of <strong>intermediate_graph_degree</strong>.</p></li>
<li><p><strong>build_algo</strong> (<em>string</em>): Selects the graph generation algorithm before pruning. Possible options:</p>
<ul>
<li><p><strong>IVF_PQ</strong>: Offers higher quality but slower build time.</p></li>
<li><p><strong>NN_DESCENT</strong>: Provides a quicker build with potentially lower recall.</p></li>
</ul></li>
<li><p><strong>cache_dataset_on_device</strong> (<em>string</em>, <strong>“true”</strong> | <strong>“false”</strong>): Decides whether to cache the original dataset in GPU memory. Setting this to <strong>“true”</strong> enhances recall by refining search results, while setting it to <strong>“false”</strong> conserves GPU memory.</p></li>
</ul></li>
<li><p><strong>GPU_IVF_FLAT</strong> or <strong>GPU_IVF_PQ</strong> index</p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_IVF_FLAT&quot;</span>, <span class="hljs-comment"># Or GPU_IVF_PQ</span>
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>The <strong>params</strong> options are identical to those used in <strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a></strong> and <strong><a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong>.</p></li>
<li><p><strong>GPU_BRUTE_FORCE</strong> index</p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&#x27;index_type&#x27;</span>: <span class="hljs-string">&#x27;GPU_BRUTE_FORCE&#x27;</span>,
    <span class="hljs-string">&#x27;metric_type&#x27;</span>: <span class="hljs-string">&#x27;L2&#x27;</span>,
    <span class="hljs-string">&#x27;params&#x27;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>No additional <strong>params</strong> configurations are required.</p></li>
</ul>
<h3 id="Build-index" class="common-anchor-header">Build index</h3><p>After configuring the index parameters in <strong>index_params</strong>, call the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/create_index.md"><code translate="no">create_index()</code></a> method to build the index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get an existing collection</span>
collection = Collection(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)

collection.create_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field on which an index is built</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search" class="common-anchor-header">Search<button data-href="#Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Once you have built your GPU index, the next step is to prepare the search parameters before conducting a search.</p>
<h3 id="Prepare-search-parameters" class="common-anchor-header">Prepare search parameters</h3><p>Below are example configurations for different index types:</p>
<ul>
<li><p><strong>GPU_BRUTE_FORCE</strong> index</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>No additional <strong>params</strong> configurations are required.</p></li>
<li><p><strong>GPU_CAGRA</strong> index</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;itopk_size&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;search_width&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;min_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;max_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;team_size&quot;</span>: <span class="hljs-number">0</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Key search parameters include:</p>
<ul>
<li><p><strong>itopk_size</strong>: Determines the size of intermediate results kept during the search. A larger value may improve recall at the expense of search performance. It should be at least equal to the final top-k (<strong>limit</strong>) value and is typically a power of 2 (e.g., 16, 32, 64, 128).</p></li>
<li><p><strong>search_width</strong>: Specifies the number of entry points into the CAGRA graph during the search. Increasing this value can enhance recall but may impact search performance.</p></li>
<li><p><strong>min_iterations</strong> / <strong>max_iterations</strong>: These parameters control the search iteration process. By default, they are set to <strong>0</strong>, and CAGRA automatically determines the number of iterations based on <strong>itopk_size</strong> and <strong>search_width</strong>. Adjusting these values manually can help balance performance and accuracy.</p></li>
<li><p><strong>team_size</strong>: Specifies the number of CUDA threads used for calculating metric distance on the GPU. Common values are a power of 2 up to 32 (e.g. 2, 4, 8, 16, 32). It has a minor impact on search performance. The default value is <strong>0</strong>, where Milvus automatically selects the <strong>team_size</strong> based on the vector dimension.</p></li>
</ul></li>
<li><p><strong>GPU_IVF_FLAT</strong> or <strong>GPU_IVF_PQ</strong> index</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, 
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
}
<button class="copy-code-btn"></button></code></pre>
<p>Search parameters for these two index types are similar to those used in <strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a> and <a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong>. For more information, refer to <a href="https://milvus.io/docs/search.md#Prepare-search-parameters">Conduct a Vector Similarity Search</a>.</p></li>
</ul>
<h3 id="Conduct-a-search" class="common-anchor-header">Conduct a search</h3><p>Use the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/search.md"><code translate="no">search()</code></a> method to perform a vector similarity search on the GPU index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Load data into memory</span>
collection.load()

collection.search(
    data=[[query_vector]], <span class="hljs-comment"># Your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field</span>
    param=search_params,
    limit=<span class="hljs-number">100</span> <span class="hljs-comment"># Number of the results to return</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Limits<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>When using GPU indexes, be aware of certain constraints:</p>
<ul>
<li><p>For <strong>GPU_IVF_FLAT</strong>, the maximum value for <strong>limit</strong> is 1024.</p></li>
<li><p>For <strong>GPU_IVF_PQ</strong> and <strong>GPU_CAGRA</strong>, the maximum value for <strong>limit</strong> is 1024.</p></li>
<li><p>While there is no set limit for <strong>limit</strong> on <strong>GPU_BRUTE_FORCE</strong>, it is recommended not to exceed 4096 to avoid potential performance issues.</p></li>
<li><p>Currently, GPU indexes do not support COSINE distance. If COSINE distance is required, data should be normalized first, and then inner product (IP) distance can be used as a substitute.</p></li>
<li><p>Loading OOM protection for GPU indexes is not fully supported, too much data might lead to QueryNode crashes.</p></li>
<li><p>GPU indexes do not support search functions like <a href="https://milvus.io/docs/single-vector-search.md#Range-search">range search</a> and <a href="https://milvus.io/docs/single-vector-search.md#Grouping-searchh">grouping search</a>.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>When is it appropriate to utilize a GPU index?</strong></p>
<p>A GPU index is particularly beneficial in situations that demand high throughput or high recall. For instance, when dealing with large batches, the throughput of GPU indexing can surpass that of CPU indexing by as much as 100 times. In scenarios with smaller batches, GPU indexes still significantly outshine CPU indexes in terms of performance. Furthermore, if there’s a requirement for rapid data insertion, incorporating a GPU can substantially speed up the process of building indexes.</p></li>
<li><p><strong>In which scenarios are GPU indexes like CAGRA, GPU_IVF_PQ, GPU_IVF_FLAT, and GPU_BRUTE_FORCE most suitable?</strong></p>
<p>CAGRA indexes are ideal for scenarios that demand enhanced performance, albeit at the cost of consuming more memory. For environments where memory conservation is a priority, the <strong>GPU_IVF_PQ</strong> index can help minimize storage requirements, though this comes with a higher loss in precision. The <strong>GPU_IVF_FLAT</strong> index serves as a balanced option, offering a compromise between performance and memory usage. Lastly, the <strong>GPU_BRUTE_FORCE</strong> index is designed for exhaustive search operations, guaranteeing a recall rate of 1 by performing traversal searches.</p></li>
</ul>
