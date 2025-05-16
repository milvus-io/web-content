---
id: index.md
related_key: index
summary: Index mechanism in Milvus.
title: ''
---
<h1 id="In-memory-Index" class="common-anchor-header">In-memory Index<button data-href="#In-memory-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic lists various types of in-memory indexes Milvus supports, scenarios each of them best suits, and parameters users can configure to achieve better search performance. For on-disk indexes, see <strong><a href="/docs/v2.2.x/disk_index.md">On-disk Index</a></strong>.</p>
<p>Indexing is the process of efficiently organizing data, and it plays a major role in making similarity search useful by dramatically accelerating time-consuming queries on large datasets.</p>
<p>To improve query performance, you can <a href="/docs/v2.2.x/build_index.md">specify an index type</a> for each vector field.</p>
<div class="alert note"> 
Currently, a vector field only supports one index type. Milvus automatically deletes the old index when switching the index type.
</div>
<h2 id="ANNS-vector-indexes" class="common-anchor-header">ANNS vector indexes<button data-href="#ANNS-vector-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Most of the vector index types supported by Milvus use approximate nearest neighbors search (ANNS) algorithms. Compared with accurate retrieval, which is usually very time-consuming, the core idea of ANNS is no longer limited to returning the most accurate result, but only searching for neighbors of the target. ANNS improves retrieval efficiency by sacrificing accuracy within an acceptable range.</p>
<p>According to the implementation methods, the ANNS vector index can be divided into four categories:</p>
<ul>
<li>Tree-based index</li>
<li>Graph-based index</li>
<li>Hash-based index</li>
<li>Quantization-based index</li>
</ul>
<h2 id="Indexes-supported-in-Milvus" class="common-anchor-header">Indexes supported in Milvus<button data-href="#Indexes-supported-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>According to the suited data type, the supported indexes in Milvus can be divided into two categories:</p>
<ul>
<li>Indexes for floating-point embeddings:
<ul>
<li>For 128-dimensional floating-point embeddings, the storage they take up is 128 * the size of float = 512 bytes. And the <a href="/docs/v2.2.x/metric.md">distance metrics</a> used for float-point embeddings are Euclidean distance (L2) and Inner product.</li>
<li>This type of indexes include FLAT, IVF_FLAT, IVF_PQ, IVF_SQ8, ANNOY, and HNSW.</li>
</ul></li>
<li>Indexes for binary embeddings
<ul>
<li>For 128-dimensional binary embeddings, the storage they take up is 128 / 8 = 16 bytes. And the distance metrics used for binary embeddings are Jaccard, Tanimoto, Hamming, Superstructure, and Substructure.</li>
<li>This type of indexes include BIN_FLAT and BIN_IVF_FLAT.</li>
</ul></li>
</ul>
<p>The following table classifies the indexes that Milvus supports:</p>
<div class="filter">
<a href="#floating">Floating-point embeddings</a> <a href="#binary">Binary embeddings</a>
</div>
<div class="filter-floating table-wrapper" markdown="block">
<table>
<thead>
  <tr>
    <th>Supported index</th>
    <th>Classification</th>
    <th>Scenario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>FLAT</td>
    <td>N/A</td>
    <td>
      <ul>
        <li>Relatively small dataset</li>
        <li>Requires a 100% recall rate</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_FLAT</td>
    <td>Quantization-based index</td>
    <td>
      <ul>
        <li>High-speed query</li>
        <li>Requires a recall rate as high as possible</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_SQ8</td>
    <td>Quantization-based index</td>
    <td>
      <ul>
        <li>High-speed query</li>
        <li>Limited memory resources</li>
        <li>Accepts minor compromise in recall rate</li>
      </ul>
    </td>
  </tr>  
  <tr>
    <td>IVF_PQ</td>
    <td>Quantization-based index</td>
    <td>
      <ul>
        <li>Very high-speed query</li>
        <li>Limited memory resources</li>
        <li>Accepts substantial compromise in recall rate</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW</td>
    <td>Graph-based index</td>
    <td>
      <ul>
        <li>Very high-speed query</li>
        <li>Requires a recall rate as high as possible</li>
        <li>Large memory resources</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>ANNOY</td>
    <td>Tree-based index</td>
    <td>
      <ul>
        <li>Low-dimensional vectors</li>
        <li>Will be deprecated in new versions due to its low recall rate.</li>
      </ul>
    </td>
  </tr>
</tbody>
</table>
<h3 id="FLAT" class="common-anchor-header">FLAT</h3><p>For vector similarity search applications that require perfect accuracy and depend on relatively small (million-scale) datasets, the FLAT index is a good choice. FLAT does not compress vectors, and is the only index that can guarantee exact search results. Results from FLAT can also be used as a point of comparison for results produced by other indexes that have less than 100% recall.</p>
<p>FLAT is accurate because it takes an exhaustive approach to search, which means for each query the target input is compared to every set of vectors in a dataset. This makes FLAT the slowest index on our list, and poorly suited for querying massive vector data. There are no parameters required for the FLAT index in Milvus, and using it does not need data training.</p>
<ul>
<li><p>Search parameters</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[Optional] The chosen distance metric.</td><td>See <a href="/docs/v2.2.x/metric.md">Supported Metrics</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="IVFFLAT" class="common-anchor-header">IVF_FLAT</h3><p>IVF_FLAT divides vector data into <code translate="no">nlist</code> cluster units, and then compares distances between the target input vector and the center of each cluster. Depending on the number of clusters the system is set to query (<code translate="no">nprobe</code>), similarity search results are returned based on comparisons between the target input and the vectors in the most similar cluster(s) only — drastically reducing query time.</p>
<p>By adjusting <code translate="no">nprobe</code>, an ideal balance between accuracy and speed can be found for a given scenario. Results from the <a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">IVF_FLAT performance test</a> demonstrate that query time increases sharply as both the number of target input vectors (<code translate="no">nq</code>), and the number of clusters to search (<code translate="no">nprobe</code>), increase.</p>
<p>IVF_FLAT is the most basic IVF index, and the encoded data stored in each unit is consistent with the original data.</p>
<ul>
<li><p>Index building parameters</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Number of cluster units</td><td>[1, 65536]</td></tr>
</tbody>
</table>
</li>
</ul>
<ul>
<li><p>Search parameters</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Number of units to query</td><td>CPU: [1, nlist]</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="IVFSQ8" class="common-anchor-header">IVF_SQ8</h3><p>IVF_FLAT does not perform any compression, so the index files it produces are roughly the same size as the original, raw non-indexed vector data. For example, if the original 1B SIFT dataset is 476 GB, its IVF_FLAT index files will be slightly smaller (~470 GB). Loading all the index files into memory will consume 470 GB of storage.</p>
<p>When disk, CPU, or GPU memory resources are limited, IVF_SQ8 is a better option than IVF_FLAT. This index type can convert each FLOAT (4 bytes) to UINT8 (1 byte) by performing Scalar Quantization (SQ). This reduces disk, CPU, and GPU memory consumption by 70–75%. For the 1B SIFT dataset, the IVF_SQ8 index files require just 140 GB of storage.</p>
<ul>
<li><p>Index building parameters</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Number of cluster units</td><td>[1, 65536]</td></tr>
</tbody>
</table>
</li>
</ul>
<ul>
<li><p>Search parameters</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Number of units to query</td><td>CPU: [1, nlist]</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="IVFPQ" class="common-anchor-header">IVF_PQ</h3><p><code translate="no">PQ</code> (Product Quantization) uniformly decomposes the original high-dimensional vector space into Cartesian products of <code translate="no">m</code> low-dimensional vector spaces, and then quantizes the decomposed low-dimensional vector spaces. Instead of calculating the distances between the target vector and the center of all the units, product quantization enables the calculation of distances between the target vector and the clustering center of each low-dimensional space and greatly reduces the time complexity and space complexity of the algorithm.</p>
<p>IVF_PQ performs IVF index clustering before quantizing the product of vectors. Its index file is even smaller than IVF_SQ8, but it also causes a loss of accuracy during searching vectors.</p>
<div class="alert note">
Index building parameters and search parameters vary with Milvus distribution. Select your Milvus distribution first.
</div>
<ul>
<li><p>Index building parameters</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Number of cluster units</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">m</code></td><td>Number of factors of product quantization</td><td><code translate="no">dim mod m == 0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[Optional] Number of bits in which each low-dimensional vector is stored.</td><td>[1, 16] (8 by default)</td></tr>
</tbody>
</table>
</li>
<li><p>Search parameters</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Number of units to query</td><td>[1, nlist]</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>HNSW (Hierarchical Navigable Small World Graph) is a graph-based indexing algorithm. It builds a multi-layer navigation structure for an image according to certain rules. In this structure, the upper layers are more sparse and the distances between nodes are farther; the lower layers are denser and the distances between nodes are closer. The search starts from the uppermost layer, finds the node closest to the target in this layer, and then enters the next layer to begin another search. After multiple iterations, it can quickly approach the target position.</p>
<p>In order to improve performance, HNSW limits the maximum degree of nodes on each layer of the graph to <code translate="no">M</code>. In addition, you can use <code translate="no">efConstruction</code> (when building index) or <code translate="no">ef</code> (when searching targets) to specify a search range.</p>
<ul>
<li><p>Index building parameters</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>Maximum degree of the node</td><td>[4, 64]</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>Search scope</td><td>[8, 512]</td></tr>
</tbody>
</table>
</li>
</ul>
<ul>
<li><p>Search parameters</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Search scope</td><td>[<code translate="no">top_k</code>, 32768]</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="ANNOY" class="common-anchor-header">ANNOY</h3><p>ANNOY (Approximate Nearest Neighbors Oh Yeah) is an index that uses a hyperplane to divide a high-dimensional space into multiple subspaces, and then stores them in a tree structure.</p>
<p>There are just two main parameters needed to tune ANNOY: the number of trees <code translate="no">n_trees</code> and the number of nodes to inspect during searching <code translate="no">search_k</code>.</p>
<ul>
<li><p><code translate="no">n_trees</code> is provided during build time and affects the build time and the index size. A larger value will give more accurate results, but larger indexes.</p></li>
<li><p><code translate="no">search_k</code> is provided in runtime and affects the search performance. A larger value will give more accurate results, but will take longer time to return.</p></li>
</ul>
<p>If <code translate="no">search_k</code> is not provided, it will default to <code translate="no">n * n_trees</code> where <code translate="no">n</code> is the number of approximate nearest neighbors. Otherwise, <code translate="no">search_k</code> and <code translate="no">n_trees</code> are roughly independent, i.e. the value of <code translate="no">n_trees</code> will not affect search time if <code translate="no">search_k</code> is held constant and vice versa. Basically it’s recommended to set <code translate="no">n_trees</code> as large as possible given the amount of memory you can afford, and it’s recommended to set <code translate="no">search_k</code> as large as possible given the time constraints you have for the queries.</p>
<ul>
<li><p>Index building parameters</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">n_trees</code></td><td>The number of trees.</td><td>[1, 1024]</td></tr>
</tbody>
</table>
</li>
<li><p>Search parameters</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_k</code></td><td>The parameters that controls the search scope.</td><td>[k, inf]</td></tr>
</tbody>
</table>
</li>
</ul>
</div>
<div class="filter-binary table-wrapper" markdown="block">
<table>
<thead>
  <tr>
    <th>Supported index</th>
    <th>Classification</th>
    <th>Scenario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>BIN_FLAT</td>
    <td>N/A</td>
    <td>
      <ul>
        <li>Relatively small dataset</li>
        <li>Requires a 100% recall rate</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>BIN_IVF_FLAT</td>
    <td>Quantization-based index</td>
    <td>
      <ul>
        <li>High-speed query</li>
        <li>Requires a recall rate as high as possible</li>
      </ul>
    </td>
  </tr>
</tbody>
</table>
<h3 id="BINFLAT" class="common-anchor-header">BIN_FLAT</h3><p>This index is exactly the same as FLAT except that this can only be used for binary embeddings.</p>
<p>For vector similarity search applications that require perfect accuracy and depend on relatively small (million-scale) datasets, the BIN_FLAT index is a good choice. BIN_FLAT does not compress vectors, and is the only index that can guarantee exact search results. Results from BIN_FLAT can also be used as a point of comparison for results produced by other indexes that have less than 100% recall.</p>
<p>BIN_FLAT is accurate because it takes an exhaustive approach to search, which means for each query the target input is compared to vectors in a dataset. This makes BIN_FLAT the slowest index on our list, and poorly suited for querying massive vector data. There are no parameters for the BIN_FLAT index in Milvus, and using it does not require data training or additional storage.</p>
<ul>
<li><p>Search parameters</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[Optional] The chosen distance metric.</td><td>See <a href="/docs/v2.2.x/metric.md">Supported Metrics</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="BINIVFFLAT" class="common-anchor-header">BIN_IVF_FLAT</h3><p>This index is exactly the same as IVF_FLAT except that this can only be used for binary embeddings.</p>
<p>BIN_IVF_FLAT divides vector data into <code translate="no">nlist</code> cluster units, and then compares distances between the target input vector and the center of each cluster. Depending on the number of clusters the system is set to query (<code translate="no">nprobe</code>), similarity search results are returned based on comparisons between the target input and the vectors in the most similar cluster(s) only — drastically reducing query time.</p>
<p>By adjusting <code translate="no">nprobe</code>, an ideal balance between accuracy and speed can be found for a given scenario. Query time increases sharply as both the number of target input vectors (<code translate="no">nq</code>), and the number of clusters to search (<code translate="no">nprobe</code>), increase.</p>
<p>BIN_IVF_FLAT is the most basic BIN_IVF index, and the encoded data stored in each unit is consistent with the original data.</p>
<ul>
<li><p>Index building parameters</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Number of cluster units</td><td>[1, 65536]</td></tr>
</tbody>
</table>
</li>
</ul>
<ul>
<li><p>Search parameters</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Number of units to query</td><td>CPU: [1, nlist]</td></tr>
</tbody>
</table>
</li>
</ul>
</div>
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
    </button></h2><p><details>
<summary><font color="#4fc4f9">What is the difference between FLAT index and IVF_FLAT index?</font></summary></p>
<p>IVF_FLAT index divides a vector space into <code translate="no">nlist</code> clusters. If you keep the default value of <code translate="no">nlist</code> as 16384, Milvus compares the distances between the target vector and the centers of all 16384 clusters to get <code translate="no">nprobe</code> nearest clusters. Then Milvus compares the distances between the target vector and the vectors in the selected clusters to get the nearest vectors. Unlike IVF_FLAT, FLAT directly compares the distances between the target vector and each and every vector.
</p>
<p>
Therefore, when the total number of vectors approximately equals <code translate="no">nlist</code>, IVF_FLAT and FLAT has little difference in the way of calculation required and search performance. But as the number of vectors grows to two times, three times, or n times of <code translate="no">nlist</code>, IVF_FLAT index begins to show increasingly greater advantages.
</p>
<p>
See <a href="https://medium.com/unstructured-data-service/how-to-choose-an-index-in-milvus-4f3d15259212">How to Choose an Index in Milvus</a> for more information.
</p>
</details>
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
<li>Learn more about the <a href="/docs/v2.2.x/metric.md">Similarity Metrics</a> supported in Milvus.</li>
</ul>
