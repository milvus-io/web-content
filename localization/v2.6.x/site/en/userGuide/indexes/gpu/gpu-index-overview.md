---
id: gpu-index-overview.md
title: GPU Index Overview
summary: >-
  Building an index with GPU support in Milvus can significantly improve search
  performance in high-throughput and high-recall scenarios.
---
<h1 id="GPU-Index-Overview" class="common-anchor-header">GPU Index Overview<button data-href="#GPU-Index-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Building an index with GPU support in Milvus can significantly improve search performance in high-throughput and high-recall scenarios.</p>
<p>The following figure compares query throughput (queries per second) across index configurations, hardware setups, vector datasets (Cohere and OpenAI), and search batch sizes, showing that <code translate="no">GPU_CAGRA</code> consistently outperforms other methods.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/gpu-index-performance.png" alt="Gpu Index Performance" class="doc-image" id="gpu-index-performance" />
    <span>Gpu Index Performance</span>
  </span>
</p>
<h2 id="Configure-GPU-memory-pool-for-Milvus" class="common-anchor-header">Configure GPU memory pool for Milvus<button data-href="#Configure-GPU-memory-pool-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supports a global GPU memory pool and provides two configuration parameters, <code translate="no">initMemSize</code> and <code translate="no">maxMemSize</code>, in <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">Milvus config file</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># sets the maximum memory usage limit. When the memory usage exceeds initMemSize, Milvus will attempt to expand the memory pool.</span>
<button class="copy-code-btn"></button></code></pre>
<p>The default <code translate="no">initMemSize</code> is usually half the GPU memory when Milvus starts, and <code translate="no">maxMemSize</code> defaults to the entire GPU memory. The GPU memory pool size is initially set to <code translate="no">initMemSize</code> and will automatically expand to <code translate="no">maxMemSize</code> as needed.</p>
<p>When a GPU-enabled index is specified, Milvus loads the target collection data into GPU memory before searches, so <code translate="no">maxMemSize</code> must be at least the data size.</p>
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
    </button></h2><ul>
<li><p>For <code translate="no">GPU_IVF_FLAT</code>, the maximum value for <code translate="no">limit</code> is 1,024.</p></li>
<li><p>For <code translate="no">GPU_IVF_PQ</code> and <code translate="no">GPU_CAGRA</code>, the maximum value for <code translate="no">limit</code> is 1,024.</p></li>
<li><p>While there is no set <code translate="no">limit</code> for <code translate="no">GPU_BRUTE_FORCE</code>, it is recommended not to exceed 4,096 to avoid potential performance issues.</p></li>
<li><p>Currently, GPU indexes do not support <code translate="no">COSINE</code> distance. If <code translate="no">COSINE</code> distance is required, data should be normalized first, and then inner product (IP) distance can be used as a substitute.</p></li>
<li><p>Loading OOM protection for GPU indexes is not fully supported, too much data might lead to QueryNode crashes.</p></li>
<li><p>GPU indexes do not support search functions like <a href="/docs/range-search.md">range search</a> and <a href="/docs/grouping-search.md">grouping search</a>.</p></li>
</ul>
<h2 id="Supported-GPU-index-types" class="common-anchor-header">Supported GPU index types<button data-href="#Supported-GPU-index-types" class="anchor-icon" translate="no">
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
    </button></h2><p>The following table lists the GPU index types supported by Milvus.</p>
<table>
   <tr>
     <th><p>Index Type</p></th>
     <th><p>Description</p></th>
     <th><p>Memory Usage</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/gpu-cagra.md">GPU_CAGRA</a></p></td>
     <td><p>GPU_CAGRA is a graph-based index optimized for GPUs, Using inference-grade GPUs to run the Milvus GPU version can be more cost-effective compared to using expensive training-grade GPUs.</p></td>
     <td><p>Memory usage is approximately 1.8 times that of the original vector data.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/gpu-ivf-flat.md">GPU_IVF_FLAT</a></p></td>
     <td><p>GPU_IVF_FLAT is the most basic IVF index, and the encoded data stored in each unit is consistent with the original data. When conducting searches, note that you can set the top-k (<code translate="no">limit</code>) up to 256 for any search against a GPU_IVF_FLAT-indexed collection.</p></td>
     <td><p>Requires memory equal to the size of the original data.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/gpu-ivf-pq.md">GPU_IVF_PQ</a></p></td>
     <td><p>GPU_IVF_PQ performs IVF index clustering before quantizing the product of vectors. When conducting searches, note that you can set the top-k (<code translate="no">limit</code>) up to 8,192 for any search against a GPU_IVF_FLAT-indexed collection.</p></td>
     <td><p>Utilizes a smaller memory footprint, which depends on the compression parameter settings.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/gpu-brute-force.md">GPU_BRUTE_FORCE</a></p></td>
     <td><p>GPU_BRUTE_FORCE is tailored for cases where extremely high recall is crucial, guaranteeing a recall of 1 by comparing each query with all vectors in the dataset. It only requires the metric type (<code translate="no">metric_type</code>) and top-k (<code translate="no">limit</code>) as index building and search parameters.</p></td>
     <td><p>Requires memory equal to the size of the original data.</p></td>
   </tr>
</table>
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
    </button></h2><p>Milvus uses a global graphics memory pool to allocate GPU memory. It supports two parameters <code translate="no">initMemSize</code> and <code translate="no">maxMemSize</code> in <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">Milvus config file</a>. The pool size is initially set to <code translate="no">initMemSize</code>, and will be automatically expanded to <code translate="no">maxMemSize</code> after exceeding this limit.</p>
<p>The default <code translate="no">initMemSize</code> is 1/2 of the available GPU memory when Milvus starts, and the default <code translate="no">maxMemSize</code> is equal to all available GPU memory.</p>
<p>Up until Milvus 2.4.1, Milvus uses a unified GPU memory pool. For versions prior to 2.4.1, it was recommended to set both of the value to 0.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>From Milvus 2.4.1 onwards, the GPU memory pool is only used for temporary GPU data during searches. Therefore, it is recommended to set it to 2048 and 4096.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>To learn how to build a GPU index, refer to the specific guide for each index type.</p>
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
<li><p><strong>In which scenarios are GPU indexes like GPU_CAGRA, GPU_IVF_PQ, GPU_IVF_FLAT, and GPU_BRUTE_FORCE most suitable?</strong></p>
<p><code translate="no">GPU_CAGRA</code> indexes are ideal for scenarios that demand enhanced performance, albeit at the cost of consuming more memory. For environments where memory conservation is a priority, the <code translate="no">GPU_IVF_PQ</code> index can help minimize storage requirements, though this comes with a higher loss in precision. The <code translate="no">GPU_IVF_FLAT</code> index serves as a balanced option, offering a compromise between performance and memory usage. Lastly, the <code translate="no">GPU_BRUTE_FORCE</code> index is designed for exhaustive search operations, guaranteeing a recall rate of 1 by performing traversal searches.</p></li>
</ul>
