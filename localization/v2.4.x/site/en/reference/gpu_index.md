---
id: gpu_index.md
related_key: gpu_index
summary: GPU index mechanism in Milvus.
title: GPU Index
---
<h1 id="GPU-Index" class="common-anchor-header">GPU Index<button data-href="#GPU-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus supports various GPU index types to accelerate search performance and efficiency, especially in high-throughput, and high-recall scenarios. This topic provides an overview of the GPU index types supported by Milvus, their suitable use cases, and performance characteristics. For information on building indexes with GPU, refer to <a href="/docs/v2.4.x/index-with-gpu.md">Index with GPU</a>.</p>
<p>It’s important to note that using a GPU index may not necessarily reduce latency compared to using a CPU index. If you want to fully maximize throughput, you will need extremely high request pressure or a large number of query vectors.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/gpu_index.png" alt="performance" class="doc-image" id="performance" />
    <span>performance</span>
  </span>
</p>
<p>Milvus’ GPU support is contributed by Nvidia <a href="https://rapids.ai/">RAPIDS</a> team. The following are the GPU index types currently supported by Milvus.</p>
<h2 id="GPUCAGRA" class="common-anchor-header">GPU_CAGRA<button data-href="#GPUCAGRA" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_CAGRA is a graph-based index optimized for GPUs, Using inference-grade GPUs to run the Milvus GPU version can be more cost-effective compared to using expensive training-grade GPUs.</p>
<ul>
<li><p>Index building parameters</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Default Value</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">intermediate_graph_degree</code></td><td>Affects recall and build time by determining the graph’s degree before pruning. Recommended values are <code translate="no">32</code> or <code translate="no">64</code>.</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">graph_degree</code></td><td>Affects search performance and recall by setting the graph’s degree after pruning. A larger difference between these two degrees results in a longer build time. Its value must be smaller than the value of <strong>intermediate_graph_degree</strong>.</td><td><code translate="no">64</code></td></tr>
<tr><td><code translate="no">build_algo</code></td><td>Selects the graph generation algorithm before pruning. Possible values:</br><code translate="no">IVF_PQ</code>: Offers higher quality but slower build time.</br> <code translate="no">NN_DESCENT</code>: Provides a quicker build with potentially lower recall.</td><td><code translate="no">IVF_PQ</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Decides whether to cache the original dataset in GPU memory. Possible values:</br><code translate="no">“true”</code>: Caches the original dataset to enhance recall by refining search results.</br> <code translate="no">“false”</code>: Does not cache the original dataset to save gpu memory.</td><td><code translate="no">“false”</code></td></tr>
</tbody>
</table>
</li>
<li><p>Search parameters</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Default Value</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">itopk_size</code></td><td>Determines the size of intermediate results kept during the search. A larger value may improve recall at the expense of search performance. It should be at least equal to the final top-k (limit) value and is typically a power of 2 (e.g., 16, 32, 64, 128).</td><td>Empty</td></tr>
<tr><td><code translate="no">search_width</code></td><td>Specifies the number of entry points into the CAGRA graph during the search. Increasing this value can enhance recall but may impact search performance（e.g. 1, 2, 4, 8, 16, 32).</td><td>Empty</td></tr>
<tr><td><code translate="no">min_iterations</code> / <code translate="no">max_iterations</code></td><td>Controls the search iteration process. By default, they are set to <code translate="no">0</code>, and CAGRA automatically determines the number of iterations based on <code translate="no">itopk_size</code> and <code translate="no">search_width</code>. Adjusting these values manually can help balance performance and accuracy.</td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">team_size</code></td><td>Specifies the number of CUDA threads used for calculating metric distance on the GPU. Common values are a power of 2 up to 32 (e.g. 2, 4, 8, 16, 32). It has a minor impact on search performance. The default value is <code translate="no">0</code>, where Milvus automatically selects the <code translate="no">team_size</code> based on the vector dimension.</td><td><code translate="no">0</code></td></tr>
</tbody>
</table>
</li>
</ul>
<ul>
<li><p>Limits on search</p>
<table>
<thead>
<tr><th>Parameter</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td><= 1024</td></tr>
<tr><td><code translate="no">limit</code> (top-K)</td><td><=max((<code translate="no">itopk_size</code> + 31)// 32, <code translate="no">search_width</code>) * 32</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFFLAT" class="common-anchor-header">GPU_IVF_FLAT<button data-href="#GPUIVFFLAT" class="anchor-icon" translate="no">
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
    </button></h2><p>Similar to <a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a>, GPU_IVF_FLAT also divides vector data into <code translate="no">nlist</code> cluster units, and then compares distances between the target input vector and the center of each cluster. Depending on the number of clusters the system is set to query (<code translate="no">nprobe</code>), similarity search results are returned based on comparisons between the target input and the vectors in the most similar cluster(s) only — drastically reducing query time.</p>
<p>By adjusting <code translate="no">nprobe</code>, an ideal balance between accuracy and speed can be found for a given scenario. Results from the <a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">IVF_FLAT performance test</a> demonstrate that query time increases sharply as both the number of target input vectors (<code translate="no">nq</code>), and the number of clusters to search (<code translate="no">nprobe</code>), increase.</p>
<p>GPU_IVF_FLAT is the most basic IVF index, and the encoded data stored in each unit is consistent with the original data.</p>
<p>When conducting searches, note that you can set the top-K up to 256 for any search against a GPU_IVF_FLAT-indexed collection.</p>
<ul>
<li><p>Index building parameters</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Range</th><th>Default Value</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Number of cluster units</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Decides whether to cache the original dataset in GPU memory. Possible values:</br><code translate="no">“true”</code>: Caches the original dataset to enhance recall by refining search results.</br> <code translate="no">“false”</code>: Does not cache the original dataset to save gpu memory.</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;flase&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>Search parameters</p>
<ul>
<li><p>Common search</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Range</th><th>Default Value</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Number of units to query</td><td>[1, nlist]</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>Limits on search</p>
<table>
<thead>
<tr><th>Parameter</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td><= <code translate="no">2048</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">PQ</code> (Product Quantization) uniformly decomposes the original high-dimensional vector space into Cartesian products of <code translate="no">m</code> low-dimensional vector spaces, and then quantizes the decomposed low-dimensional vector spaces. Instead of calculating the distances between the target vector and the center of all the units, product quantization enables the calculation of distances between the target vector and the clustering center of each low-dimensional space and greatly reduces the time complexity and space complexity of the algorithm.</p>
<p>IVF_PQ performs IVF index clustering before quantizing the product of vectors. Its index file is even smaller than IVF_SQ8, but it also causes a loss of accuracy during searching vectors.</p>
<div class="alert note">
<p>Index building parameters and search parameters vary with Milvus distribution. Select your Milvus distribution first.</p>
<p>When conducting searches, note that you can set the top-K up to 8192 for any search against a GPU_IVF_FLAT-indexed collection.</p>
</div>
<ul>
<li><p>Index building parameters</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Range</th><th>Default Value</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Number of cluster units</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">m</code></td><td>Number of factors of product quantization,</td><td><code translate="no">dim mod m or = 0</code></td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[Optional] Number of bits in which each low-dimensional vector is stored.</td><td>[1, 16]</td><td><code translate="no">8</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Decides whether to cache the original dataset in GPU memory. Possible values:</br><code translate="no">“true”</code>: Caches the original dataset to enhance recall by refining search results.</br> <code translate="no">“false”</code>: Does not cache the original dataset to save gpu memory.</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;false&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>Search parameters</p>
<ul>
<li><p>Common search</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Range</th><th>Default Value</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Number of units to query</td><td>[1, nlist]</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>Limits on search</p>
<table>
<thead>
<tr><th>Parameter</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td><= <code translate="no">1024</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUBRUTEFORCE" class="common-anchor-header">GPU_BRUTE_FORCE<button data-href="#GPUBRUTEFORCE" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_BRUTE_FORCE is tailored for cases where extremely high recall is crucial, guaranteeing a recall of 1 by comparing each query with all vectors in the dataset. It only requires the metric type (<code translate="no">metric_type</code>) and top-k (<code translate="no">limit</code>) as index building and search parameters.</p>
<p>For GPU_BRUTE_FORCE, no addition index building parameters or search parameters are required.</p>
<h2 id="Conclusion" class="common-anchor-header">Conclusion<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Currently, Milvus loads all indexes into GPU memory for efficient search operations. The amount of data that can be loaded depends on the size of the GPU memory:</p>
<ul>
<li><strong>GPU_CAGRA</strong>: Memory usage is approximately 1.8 times that of the original vector data.</li>
<li><strong>GPU_IVF_FLAT</strong> and <strong>GPU_BRUTE_FORCE</strong>: Requires memory equal to the size of the original data.</li>
<li><strong>GPU_IVF_PQ</strong>: Utilizes a smaller memory footprint, which depends on the compression parameter settings.</li>
</ul>
