---
id: index-explained.md
title: Index Explained
summary: >-
  An index is an additional structure built on top of data. Its internal
  structure depends on the approximate nearest neighbor search algorithm in use.
  An index speeds up the search, but incurs additional preprocessing time,
  space, and RAM during the search. Moreover, using an index typically lowers
  the recall rate (though the effect is negligible, it still matters).
  Therefore, this article explains how to minimize the costs of using an index
  while maximizing the benefits.
---
<h1 id="Index-Explained" class="common-anchor-header">Index Explained<button data-href="#Index-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>An index is an additional structure built on top of data. Its internal structure depends on the approximate nearest neighbor search algorithm in use. An index speeds up the search, but incurs additional preprocessing time, space, and RAM during the search. Moreover, using an index typically lowers the recall rate (though the effect is negligible, it still matters). Therefore, this article explains how to minimize the costs of using an index while maximizing the benefits.</p>
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
    </button></h2><p>In Milvus, indexes are specific to fields, and the applicable index types vary according to the data types of the target fields. As a professional vector database, Milvus focuses on enhancing both the performance of vector searches and scalar filtering, which is why it offers various index types.</p>
<p>The following table lists the mapping relationship between field data types and applicable index types.</p>
<table>
   <tr>
     <th><p>Field Data Type</p></th>
     <th><p>Applicable Index Types</p></th>
   </tr>
   <tr>
     <td><ul>
<li><p>FLOAT_VECTOR</p></li>
<li><p>FLOAT16_VECTOR</p></li>
<li><p>BFLOAT16_VECTOR</p></li>
<li><p>INT8_VECTOR</p></li>
</ul></td>
     <td><ul>
<li><p>FLAT</p></li>
<li><p>IVF_FLAT</p></li>
<li><p>IVF_SQ8</p></li>
<li><p>IVF_PQ</p></li>
<li><p>IVF_RABITQ</p></li>
<li><p>GPU_IVF_FLAT</p></li>
<li><p>GPU_IVF_PQ</p></li>
<li><p>HNSW</p></li>
<li><p>DISKANN</p></li>
</ul></td>
   </tr>
   <tr>
     <td><p>BINARY_VECTOR</p></td>
     <td><ul>
<li><p>BIN_FLAT</p></li>
<li><p>BIN_IVF_FLAT</p></li>
<li><p>MINHASH_LSH</p></li>
</ul></td>
   </tr>
   <tr>
     <td><p>SPARSE_FLOAT_VECTOR</p></td>
     <td><p>SPARSE_INVERTED_INDEX</p></td>
   </tr>
   <tr>
     <td><p>VARCHAR</p></td>
     <td><ul>
<li><p>INVERTED (Reommended)</p></li>
<li><p>BITMAP</p></li>
<li><p>Trie</p></li>
</ul></td>
   </tr>
   <tr>
     <td><p>BOOL</p></td>
     <td><ul>
<li>BITMAP (Recommended)</li>
<li>INVERTED</li>
</ul></td>
   </tr>
   <tr>
     <td><ul>
<li><p>INT8</p></li>
<li><p>INT16</p></li>
<li><p>INT32</p></li>
<li><p>INT64</p></li>
</ul></td>
     <td><ul>
<li>INVERTED</li>
<li>STL_SORT</li>
</ul></td>
   </tr>
   <tr>
     <td><ul>
<li>FLOAT</li>
<li>DOUBLE</li>
</ul></td>
     <td><p>INVERTED</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(elements of the BOOL, INT8/16/32/64, and VARCHAR types)</sup></p></td>
     <td><p>BITMAP (Recommended)</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(elements of the BOOL, INT8/16/32/64, FLOAT, DOUBLE, and VARCHAR types)</sup></p></td>
     <td><p>INVERTED</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>INVERTED</p></td>
   </tr>
</table>
<p>This article focuses on how to select appropriate vector indexes. For scalar fields, you can always use the recommended index type.</p>
<p>Selecting an appropriate index type for a vector search can significantly impact performance and resource usage. When choosing an index type for a vector field, it is essential to consider various factors, including the underlying data structure, memory usage, and performance requirements.</p>
<h2 id="Vector-Index-anatomy" class="common-anchor-header">Vector Index anatomy<button data-href="#Vector-Index-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>As demonstrated in the diagram below, an index type in Milvus consists of three core components, namely <strong>data structure</strong>, <strong>quantization</strong>, and <strong>refiner</strong>. Quantization and refiner are optional, but are widely used because of a significant gains-better-than-costs balance.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/vector-index-anatomy.png" alt="Vector Index Anatomy" class="doc-image" id="vector-index-anatomy" />
    <span>Vector Index Anatomy</span>
  </span>
</p>
<p>During index creation, Milvus combines the chosen data structure and quantization method to determine an optimal <strong>expansion rate</strong>. At query time, the system retrieves <code translate="no">topK × expansion rate</code> candidate vectors, applies the refiner to recalculate distances with higher precision, and finally returns the most accurate <code translate="no">topK</code> results. This hybrid approach balances speed and accuracy by restricting resource-intensive refinement to a filtered subset of candidates.</p>
<h3 id="Data-structure" class="common-anchor-header">Data structure</h3><p>The data structure forms the foundational layer of the index. Common types include:</p>
<ul>
<li><p><strong>Inverted File (IVF)</strong></p>
<p>IVF-series index types allow Milvus to cluster vectors into buckets through centroid-based partitioning. It is generally safe to assume that all vectors in a bucket are likely to be close to the query vector if the bucket centroid is close to the query vector. Based on this premise, Milvus scans only the vector embeddings in those buckets where the centroids are near the query vector, rather than examining the entire dataset. This strategy reduces computational costs while maintaining acceptable accuracy.</p>
<p>This type of index data structure is ideal for large-scale datasets requiring fast throughput.</p></li>
<li><p><strong>Graph-based structure</strong></p>
<p>A graph-based data structure for vector search, such as Hierarchical Navigable Small World (<a href="https://arxiv.org/abs/1603.09320">HNSW</a>), constructs a layered graph where each vector connects to its nearest neighbors. Queries navigate this hierarchy, starting from coarse upper layers and switching through lower layers, enabling efficient logarithmic-time search complexity.</p>
<p>This type of index data structure excels in high-dimensional spaces and scenarios demanding low-latency queries.</p></li>
</ul>
<h3 id="Quantization" class="common-anchor-header">Quantization</h3><p>Quantization reduces memory footprint and computational costs through a coarser representation:</p>
<ul>
<li><p><strong>Scalar Quantization</strong> (e.g. <strong>SQ8</strong>) enables Milvus to compress each vector dimension into a single byte (8-bit), reducing memory usage by 75% compared to 32-bit floats while preserving reasonable accuracy.</p></li>
<li><p><strong>Product Quantization</strong> (<strong>PQ</strong>) enables Milvus to split vectors into subvectors and encode them using codebook-based clustering. This achieves higher compression ratios (e.g., 4-32x) at the cost of marginally reduced recall, making it suitable for memory-constrained environments.</p></li>
</ul>
<h3 id="Refiner" class="common-anchor-header">Refiner</h3><p>Quantization is inherently lossy. To maintain the recall rate, quantization consistently produces more top-K candidates than necessary, allowing refiners to use higher precision to further select the top-K results from these candidates, enhancing the recall rate.</p>
<p>For instance, the FP32 refiner operates on the search result candidates returned by quantization by recalculating distances using FP32 precision rather than the quantized values.</p>
<p>This is critical for applications requiring a tradeoff between search efficiency and precision, such as semantic search or recommendation systems, where minor distance variations significantly impact result quality.</p>
<h3 id="Summary" class="common-anchor-header">Summary</h3><p>This tiered architecture – coarse filtering via data structures, efficient computation through quantization, and precision tuning via refinement – allows Milvus to optimize the accuracy-performance tradeoff adaptively.</p>
<h2 id="Performance-trade-offs" class="common-anchor-header">Performance trade-offs<button data-href="#Performance-trade-offs" class="anchor-icon" translate="no">
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
    </button></h2><p>When evaluating performance, it is crucial to balance <strong>build time</strong>, <strong>query per second (QPS)</strong>, and <strong>recall rate</strong>. The general rules are as follows:</p>
<ul>
<li><p><strong>Graph-based index types</strong> usually outperform <strong>IVF variants</strong> in terms of <strong>QPS</strong>.</p></li>
<li><p><strong>IVF variants</strong> particularly fit in the scenarios with <strong>a large topK (for example, over 2,000)</strong>.</p></li>
<li><p><strong>PQ</strong> typically offers a better recall rate at similar compression rates when compared to <strong>SQ</strong>, though the latter provides faster performance.</p></li>
<li><p>Using hard drives for part of the index (as in <strong>DiskANN</strong>) helps manage large datasets, but it also introduces potential IOPS bottlenecks.</p></li>
</ul>
<h3 id="Capacity" class="common-anchor-header">Capacity</h3><p>Capacity usually involves the relationship between data size and available RAM. When dealing with capacity, consider the following:</p>
<ul>
<li><p>If a quarter of your raw data fits into memory, consider DiskANN for its stable latency.</p></li>
<li><p>If all your raw data fits into memory, consider memory-based index types and mmap.</p></li>
<li><p>You can use the quantization-applied index types and mmap to trade accuracy for the maximum capacity.</p></li>
</ul>
<div class="alert note">
<p>Mmap is not always the solution. When most of your data is on disk, DiskANN provides better latency.</p>
</div>
<h3 id="Recall" class="common-anchor-header">Recall</h3><p>The recall usually involves the filter ratio, which refers to the data that is filtered out before searches. When dealing with recall, consider the following:</p>
<ul>
<li><p>If the filter ratio is less than 85%, graph-based index types outperform IVF variants.</p></li>
<li><p>If the filter ratio is between 85% and 95%, use IVF variants.</p></li>
<li><p>If the filter ratio is over 98%, use Brute-Force (FLAT) for the most accurate search results.</p></li>
</ul>
<div class="alert note">
<p>The above items are not always correct. You are advised to tune the recall with different index types to determine which index type works.</p>
</div>
<h3 id="Performance" class="common-anchor-header">Performance</h3><p>The performance of a search usually involves the top-K, which refers to the number of records that the search returns. When dealing with performance, consider the following:</p>
<ul>
<li><p>For a search with a small top-K (e.g., 2,000) requiring a high recall rate, graph-based index types outperform IVF variants.</p></li>
<li><p>For a search with a great top-K (compared with the total number of vector embeddings), IVF variants are a better choice than graph-based index types.</p></li>
<li><p>For a search with a medium-sized top-K and a high filter ratio, IVF variants are better choices.</p></li>
</ul>
<h3 id="Decision-Matrix-Choosing-the-most-appropriate-index-type" class="common-anchor-header">Decision Matrix: Choosing the most appropriate index type</h3><p>The following table is a decision matrix for you to refer to when choosing an appropriate index type.</p>
<table>
   <tr>
     <th><p>Scenario</p></th>
     <th><p>Recommended Index</p></th>
     <th><p>Notes</p></th>
   </tr>
   <tr>
     <td><p>Raw data fits in memory</p></td>
     <td><p>HNSW, IVF + Refinement</p></td>
     <td><p>Use HNSW for low-<code translate="no">k</code>/high recall.</p></td>
   </tr>
   <tr>
     <td><p>Raw data on disk, SSD</p></td>
     <td><p>DiskANN</p></td>
     <td><p>Optimal for latency-sensitive queries.</p></td>
   </tr>
   <tr>
     <td><p>Raw data on disk, limited RAM</p></td>
     <td><p>IVFPQ/SQ + mmap</p></td>
     <td><p>Balances memory and disk access.</p></td>
   </tr>
   <tr>
     <td><p>High filter ratio (&gt;95%)</p></td>
     <td><p>Brute-Force (FLAT)</p></td>
     <td><p>Avoids index overhead for tiny candidate sets.</p></td>
   </tr>
   <tr>
     <td><p>Large <code translate="no">k</code> (≥1% of dataset)</p></td>
     <td><p>IVF</p></td>
     <td><p>Cluster pruning reduces computation.</p></td>
   </tr>
   <tr>
     <td><p>Extremely high recall rate (&gt;99%)</p></td>
     <td><p>Brute-Force (FLAT) + GPUs</p></td>
     <td><p>--</p></td>
   </tr>
</table>
<h2 id="Memory-usage-estimation" class="common-anchor-header">Memory usage estimation<button data-href="#Memory-usage-estimation" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>This section focuses on calculating the memory consumption of a specific index type and includes many technical details. You can skip this section safely if it does not align with your interests.</p>
</div>
<p>The memory consumption of an index is influenced by its data structure, compression rate through quantization, and the refiner in use. Generally speaking, graph-based indices typically have a higher memory footprint due to the graph’s structure (e.g., <strong>HNSW</strong>), which usually implies a noticeable per-vector space overhead. In contrast, IVF and its variants are more memory-efficient because less per-vector space overhead applies. However, advanced techniques such as <strong>DiskANN</strong> allow parts of the index, like the graph or the refiner, to reside on disk, reducing memory load while maintaining performance.</p>
<p>Specifically, the memory usage of an index can be calculated as follows:</p>
<h3 id="IVF-index-memory-usage" class="common-anchor-header">IVF index memory usage</h3><p>IVF indexes balance memory efficiency with search performance by partitioning data into clusters. Below is a breakdown of the memory used by 1 million 128-dimensional vectors indexed using IVF variants.</p>
<ol>
<li><p><strong>Calculate the memory used by centroids.</strong></p>
<p>IVF-series index types enable Milvus to cluster vectors into buckets using centroid-based partitioning. Each centroid is included in the index in raw vector embedding. When you divide the vectors into 2,000 clusters, the memory usage can be calculated as follows:</p>
<pre><code translate="no" class="language-plaintext">2,000 clusters × 128 dimensions × 4 bytes = 1.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calculate the memory used by cluster assignments.</strong></p>
<p>Each vector embedding is assigned to a cluster and stored as integer IDs. For 2,000 clusters, a 2-byte integer suffices. The memory usage can be calculated as follows:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 2 bytes = 2.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calculate the compression caused by quantization.</strong></p>
<p>IVF variants typically use PQ and SQ8, and the memory usage can be estimated as follows:</p>
<ul>
<li><p>Using PQ with 8 subquantizers</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Using SQ8</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 1 byte = 128 MB 
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>The following table lists the estimated memory usage with different configurations:</p>
<p><table>
<tr>
<th><p>Configuration</p></th>
<th><p>Memory Estimation</p></th>
<th><p>Total Memory</p></th>
</tr>
<tr>
<td><p>IVF-PQ (no refinement)</p></td>
<td><p>1.0 MB + 2.0 MB + 8.0 MB</p></td>
<td><p>11.0 MB</p></td>
</tr>
<tr>
<td><p>IVF-PQ + 10% raw refinement</p></td>
<td><p>1.0 MB + 2.0 MB + 8.0 MB + 51.2 MB</p></td>
<td><p>62.2 MB</p></td>
</tr>
<tr>
<td><p>IVF-SQ8 (no refinement)</p></td>
<td><p>1.0 MB + 2.0 MB + 128 MB</p></td>
<td><p>131.0 MB</p></td>
</tr>
<tr>
<td><p>IVF-FLAT (full raw vectors)</p></td>
<td><p>1.0 MB + 2.0 MB + 512 MB</p></td>
<td><p>515.0 MB</p></td>
</tr>
</table></p></li>
<li><p><strong>Calculate the refinement overhead.</strong></p>
<p>IVF variants often pair with a refiner to re-rank candidates. For a search retrieving the top 10 results with an expansion rate of 5, the refinement overhead can be estimated as follows:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Graph-based-index-memory-usage" class="common-anchor-header">Graph-based index memory usage</h3><p>Graph-based index types like HNSW require significant memory to store both the graph structure and raw vector embeddings. Below is a detailed breakdown of the memory consumed by 1 million 128-dimensional vectors indexed using the HNSW index type.</p>
<ol>
<li><p><strong>Calculate the memory used by the graph structure.</strong></p>
<p>Each vector in HNSW maintains connections to its neighbors. With a graph degree (edges per node) of 32, the memory consumed can be calculated as follows:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 32 links × 4 bytes (for 32-bit integer storage) = 128 MB  
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calculate the memory used by the raw vector embeddings.</strong></p>
<p>The memory consumed by storing uncompressed FP32 vectors can be calculated as follows:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 4 bytes = 512 MB  
<button class="copy-code-btn"></button></code></pre>
<p>When you use HNSW to index the 1 million 128-dimensional vector embeddings, the total memory in use would be <strong>128 MB (graph) + 512 MB (vectors) = 640 MB</strong>.</p></li>
<li><p><strong>Calculate the compression caused by quantization.</strong></p>
<p>Quantization reduces vector size. For example, using PQ with 8 subquantizers (8 bytes per vector) leads to a drastic compression. The memory consumed by the compressed vector embeddings can be calculated as follows:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8 MB
<button class="copy-code-btn"></button></code></pre>
<p>This achieves a 64-times compression rate when compared to the raw vector embeddings, and the total memory used by the <strong>HNSWPQ</strong> index type would be <strong>128 MB (graph) + 8 MB (compressed vector) = 136 MB</strong>.</p></li>
<li><p><strong>Calculate the refinement overhead.</strong></p>
<p>Refinement, such as re-ranking with raw vectors, temporarily loads high-precision data into memory. For a search retrieving the top 10 results with an expansion rate of 5, the refinement overhead can be estimated as follows:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Other-considerations" class="common-anchor-header">Other considerations</h3><p>While IVF and graph-based indexes optimize memory usage through quantization, memory-mapped files (mmap) and DiskANN address scenarios where datasets exceed available random access memory (RAM).</p>
<h4 id="DiskANN" class="common-anchor-header">DiskANN</h4><p>DiskANN is a Vamana graph-based index that connects data points for efficient navigation during search while applying PQ to reduce the size of vectors and enable quick approximate distance calculation between vectors.</p>
<p>The Vamana graph is stored on disk, which allows DiskANN to handle large datasets that would otherwise be too big to fit in memory. This is particularly useful for billion-point datasets.</p>
<h4 id="Memory-mapped-files-mmap" class="common-anchor-header">Memory-mapped files (mmap)</h4><p>Memory mapping (Mmap) enables direct memory access to large files on disk, allowing Milvus to store indexes and data in both memory and hard drives. This approach helps optimize I/O operations by reducing the overhead of I/O calls based on access frequency, thereby expanding storage capacity for collections without significantly impacting search performance.</p>
<p>Specifically, you can configure Milvus to memory-map the raw data in certain fields instead of fully loading them into memory. This way, you can gain direct memory access to the fields without worrying about memory issues and extend the collection capacity.</p>
