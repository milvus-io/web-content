---
id: diskann.md
title: DISKANN
summary: >-
  In large-scale scenarios, where datasets can include billions or even
  trillions of vectors, standard in-memory indexing methods (e.g., HNSW,
  IVF_FLAT) often fail to keep pace due to memory limitations. DISKANN offers a
  disk-based approach that addresses these challenges by maintaining high search
  accuracy and speed when the dataset size exceeds available RAM.
---
<h1 id="DISKANN" class="common-anchor-header">DISKANN<button data-href="#DISKANN" class="anchor-icon" translate="no">
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
    </button></h1><p>In large-scale scenarios, where datasets can include billions or even trillions of vectors, standard in-memory indexing methods (e.g., <a href="/docs/hnsw.md">HNSW</a>, <a href="/docs/ivf-flat.md">IVF_FLAT</a>) often fail to keep pace due to memory limitations. <strong>DISKANN</strong> offers a disk-based approach that addresses these challenges by maintaining high search accuracy and speed when the dataset size exceeds available RAM.</p>
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
    </button></h2><p><strong>DISKANN</strong> combines two key techniques for efficient vector search:</p>
<ul>
<li><p><strong>Vamana Graph</strong> – A <strong>disk-based</strong>, <strong>graph-based</strong> index that connects data points (or vectors) for efficient navigation during search.</p></li>
<li><p><strong>Product Quantization (PQ)</strong> – An <strong>in-memory</strong> compression method that reduces the size of vectors, enabling quick approximate distance calculations between vectors.</p></li>
</ul>
<h3 id="Index-construction" class="common-anchor-header">Index construction<button data-href="#Index-construction" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Vamana-graph" class="common-anchor-header">Vamana graph</h4><p>The Vamana graph is central to DISKANN’s disk-based strategy. It can handle very large datasets because it does not need to fully reside in memory during or after construction.</p>
<p>The following figure shows how a Vamana graph is constructed.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/diskann.png" alt="Diskann" class="doc-image" id="diskann" />
    <span>Diskann</span>
  </span>
</p>
<ol>
<li><p><strong>Initial random connections:</strong> Each data point (vector) is represented as a node in the graph. These nodes are initially connected randomly, forming a dense network. Typically, a node starts with around 500 edges (or connections) for broad connectivity.</p></li>
<li><p><strong>Refining for efficiency:</strong> The initial random graph undergoes an optimization process to make it more efficient for searching. This involves two key steps:</p>
<ul>
<li><p><strong>Pruning redundant edges:</strong> The algorithm discards unnecessary connections based on distances between nodes. This step prioritizes higher-quality edges.</p>
<p>The <code translate="no">max_degree</code> parameter restricts the maximum number of edges per node. A higher <code translate="no">max_degree</code> results in a denser graph, potentially finding more relevant neighbors (higher recall) but also increasing memory usage and search time.</p></li>
<li><p><strong>Adding strategic shortcuts:</strong> Vamana introduces long-range edges, connecting data points that are far apart in the vector space. These shortcuts allow searches to quickly jump across the graph, bypassing intermediate nodes and significantly speeding up navigation.</p>
<p>The <code translate="no">search_list_size</code> parameter determines the breadth of the graph refinement process. A higher <code translate="no">search_list_size</code> extends the search for neighbors during construction and can improve final accuracy, but increases index-building time.</p></li>
</ul></li>
</ol>
<p>To learn more about parameter tuning, refer to <a href="/docs/diskann.md#DISKANN-params">DISKANN params</a>.</p>
<h4 id="PQ" class="common-anchor-header">PQ</h4><p>DISKANN uses <strong>PQ</strong> to compress high-dimensional vectors into smaller representations (<strong>PQ codes</strong>), which are stored in memory for rapid approximate distance calculations.</p>
<p>The <code translate="no">pq_code_budget_gb_ratio</code> parameter manages the memory footprint dedicated to storing these PQ codes. It represents a ratio between the total size of the vectors (in gigabytes) and the space allocated for storing the PQ codes. You can calculate the actual PQ code budget (in gigabytes) with this formula:</p>
<pre><code translate="no" class="language-plaintext">PQ Code Budget (GB) = vec_field_size_gb * pq_code_budget_gb_ratio
<button class="copy-code-btn"></button></code></pre>
<p>where:</p>
<ul>
<li><p><code translate="no">vec_field_size_gb</code> is the total size of the vectors (in gigabytes).</p></li>
<li><p><code translate="no">pq_code_budget_gb_ratio</code> is a user-defined ratio, representing the fraction of the total data size reserved for PQ codes. This parameter allows for a trade-off between search accuracy and memory resources. For more information on parameter tuning, refer to <a href="/docs/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">DISKANN configs</a>.</p></li>
</ul>
<p>For technical details on the underlying PQ method, refer to <a href="/docs/ivf-pq.md#share-MA6SdYG0io3EASxoSpyc7JW3nvc">IVF_PQ</a>.</p>
<h3 id="Search-process" class="common-anchor-header">Search process<button data-href="#Search-process" class="anchor-icon" translate="no">
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
    </button></h3><p>Once the index (the Vamana graph on disk and PQ codes in memory) is built, DISKANN performs ANN searches as follows:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/diskann-2.png" alt="Diskann 2" class="doc-image" id="diskann-2" />
    <span>Diskann 2</span>
  </span>
</p>
<ol>
<li><p><strong>Query and entry point:</strong> A query vector is provided to locate its nearest neighbors. DISKANN starts from a selected entry point in the Vamana graph, often a node near the global centroid of the dataset. The global centroid represents the average of all vectors, which helps to minimize the traversal distance through the graph to find desired neighbors.</p></li>
<li><p><strong>Neighborhood exploration:</strong> The algorithm gathers potential candidate neighbors (circles in red in the figure) from the edges of the current node, leveraging in-memory PQ codes to approximate the distances between these candidates and the query vector. These potential candidate neighbors are the nodes directly connected to the selected entry point through edges in the Vamana graph.</p></li>
<li><p><strong>Selecting nodes for accurate distance calculation:</strong> From the approximate results, a subset of the most promising neighbors (circles in green in the figure) are selected for precise distance evaluations using their original, uncompressed vectors. This requires reading data from disk, which can be time-consuming. DISKANN uses two parameters to control this delicate balance between accuracy and speed:</p>
<ul>
<li><p><code translate="no">beam_width_ratio</code>: A ration that controls the breadth of the search, determining how many candidate neighbors are selected in parallel to explore their neighbors. A larger <code translate="no">beam_width_ratio</code> results in a wider exploration, potentially leading to higher accuracy but also increasing computational cost and disk I/O. The beam width, or the number of nodes selected, is determined using the formula: <code translate="no">Beam width = Number of CPU cores * beam_width_ratio</code>.</p></li>
<li><p><code translate="no">search_cache_budget_gb_ratio</code>: The proportion of memory allocated for caching frequently accessed disk data. This caching helps to minimize disk I/O, making repeated searches faster as the data is already in memory.</p></li>
</ul>
<p>To learn more about parameter tuning, refer to <a href="/docs/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">DISKANN configs</a>.</p></li>
<li><p><strong>Iterative exploration:</strong> The search iteratively refines the set of candidates, repeatedly performing approximate evaluations (using PQ) followed by precise checks (using original vectors from disk) until a sufficient number of neighbors are found.</p></li>
</ol>
<h2 id="Enable-DISKANN-in-Milvus" class="common-anchor-header">Enable DISKANN in Milvus<button data-href="#Enable-DISKANN-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>By default, <strong>DISKANN</strong> is disabled in Milvus to prioritize the speed of in-memory indexes for datasets that fit comfortably in RAM. However, if you’re working with massive datasets or want to take advantage of <strong>DISKANN</strong>'s scalability and SSD optimization, you can easily enable it.</p>
<p>Here’s how to enable DISKANN in Milvus:</p>
<ol>
<li><p><strong>Update the Milvus Configuration File</strong></p>
<ol>
<li><p>Locate your Milvus configuration file<strong>.</strong> (Refer to the Milvus documentation on Configuration for details on finding this file.)</p></li>
<li><p>Find the <code translate="no">queryNode.enableDisk</code> parameter and set its value to <code translate="no">true</code>:</p>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">queryNode:</span>
     <span class="hljs-attr">enableDisk:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Enables query nodes to load and search using the on-disk index</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol></li>
<li><p><strong>Optimize Storage for DISKANN</strong></p></li>
</ol>
<p>To ensure the best performance with DISKANN, it’s recommended to store your Milvus data on a fast NVMe SSD. Here’s how to do this for both Milvus Standalone and Cluster deployments:</p>
<ul>
<li><p><strong>Milvus Standalone</strong></p>
<ul>
<li><p>Mount the Milvus data directory to an NVMe SSD within the Milvus container. You can do this in the <code translate="no">docker-compose.yml</code> file or using other container management tools.</p></li>
<li><p>For example, if your NVMe SSD is mounted at <code translate="no">/mnt/nvme</code>, you would update the <code translate="no">volumes</code>section of your <code translate="no">docker-compose.yml</code> like this:</p></li>
</ul>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/mnt/nvme/volumes/milvus:/var/lib/milvus</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Milvus Cluster</strong></p>
<ul>
<li><p>Mount the Milvus data directory to an NVMe SSD in both the QueryNode and IndexNode containers. You can achieve this through your container orchestration setup.</p></li>
<li><p>By mounting the data on an NVMe SSD in both node types, you ensure fast read and write speeds for both search and indexing operations.</p></li>
</ul></li>
</ul>
<p>Once you’ve made these changes, restart your Milvus instance for the settings to take effect. Now, Milvus will leverage DISKANN’s capabilities to handle large datasets, delivering efficient and scalable vector search.</p>
<h2 id="Configure-DISKANN" class="common-anchor-header">Configure DISKANN<button data-href="#Configure-DISKANN" class="anchor-icon" translate="no">
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
    </button></h2><p>DISKANN-related parameters can only be configured via your Milvus configuration file (<code translate="no">milvus.yaml</code>):</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">DiskIndex:</span>
    <span class="hljs-attr">MaxDegree:</span> <span class="hljs-number">56</span>  <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
    <span class="hljs-attr">SearchListSize:</span> <span class="hljs-number">100</span>  <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">PQCodeBudgetGBRatio:</span> <span class="hljs-number">0.125</span>  <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
    <span class="hljs-attr">SearchCacheBudgetGBRatio:</span> <span class="hljs-number">0.1</span> <span class="hljs-comment"># Ratio of cached node numbers to raw data</span>
    <span class="hljs-attr">BeamWidthRatio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<p>For details on parameter descriptions, refer to <a href="/docs/diskann.md#DISKANN-params">DISKANN params</a>.</p>
<h2 id="DISKANN-params" class="common-anchor-header">DISKANN params<button data-href="#DISKANN-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Fine-tuning DISKANN’s parameters allows you to tailor its behavior to your specific dataset and search workload, striking the right balance between speed, accuracy, and memory usage.</p>
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
    </button></h3><p>These parameters influence how the DISKANN index is constructed. Adjusting them can affect the index size, build time, and search quality.</p>
<div class="alert note">
<p>All the index building params in the list below can only be configured via your Milvus configuration file (<code translate="no">milvus.yaml</code>)</p>
</div>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">MaxDegree</code></p></td>
     <td><p>Controls the maximum number of connections (edges) each data point can have in the Vamana graph.</p></td>
     <td><p><strong>Type</strong>: Integer
 <strong>Range</strong>: [1, 512]</p>
<p><strong>Default value</strong>: <code translate="no">56</code></p></td>
     <td><p>Higher values create denser graphs, potentially increasing recall (finding more relevant results) but also increasing memory usage and build time. 
 In most cases, we recommend you set a value within this range: [10, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">SearchListSize</code></p></td>
     <td><p>During index construction, this parameter defines the size of the candidate pool used when searching for the nearest neighbors for each node. For every node being added to the graph, the algorithm maintains a list of the <code translate="no">search_list_size</code> best candidates found so far. The search for neighbors stops when this list can no longer be improved. From this final candidate pool, the top <code translate="no">max_degree</code> nodes are selected to form the final edges.</p></td>
     <td><p><strong>Type</strong>: Integer
 <strong>Range</strong>: [1, <em>int_max</em>]</p>
<p><strong>Default value</strong>: <code translate="no">100</code></p></td>
     <td><p>A larger <code translate="no">search_list_size</code> increases the likelihood of finding the true nearest neighbors for each node, which can lead to a higher-quality graph and better search performance (recall). However, this comes at the cost of a significantly longer index build time. It should always be set to a value greater than or equal to <code translate="no">max_degree</code>.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">SearchCacheBudgetGBRatio</code></p></td>
     <td><p>Controls the amount of memory allocated for caching frequently accessed parts of the graph during index construction.</p></td>
     <td><p><strong>Type</strong>: Float
 <strong>Range</strong>: [0.0, 0.3)</p>
<p><strong>Default value</strong>: <code translate="no">0.10</code></p></td>
     <td><p>A higher value allocates more memory for caching, significantly reducing disk I/O but consuming more system memory. A lower value uses less memory for caching, potentially increasing the need for disk access.
 In most cases, we recommend you set a value within this range: [0.0, 0.3).</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">PQCodeBudgetGBRatio</code></p></td>
     <td><p>Controls the size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data.</p></td>
     <td><p><strong>Type</strong>: Float
 <strong>Range</strong>: (0.0, 0.25]</p>
<p><strong>Default value</strong>: <code translate="no">0.125</code></p></td>
     <td><p>A higher ratio leads to more accurate search results by allocating a larger proportion of memory for PQ codes, effectively storing more information about the original vectors. However, this requires more memory, limiting the capacity for handling large datasets.
 A lower ratio reduces memory usage but potentially sacrifices accuracy, as smaller PQ codes retain less information. This approach is suitable for scenarios where memory constraints are a concern, potentially enabling the indexing of larger datasets.</p>
<p>In most cases, we recommend you set a value within this range: (0.0625, 0.25]</p></td>
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
    </button></h3><p>These parameters influence how DISKANN performs searches. Adjusting them can impact search speed, latency, and resource usage.</p>
<div class="alert note">
<p>The <code translate="no">BeamWidthRatio</code> in the list below can only be configured via your Milvus configuration file (<code translate="no">milvus.yaml</code>)</p>
<p>The <code translate="no">search_list</code> in the list below can only be configured in the search params in SDK.</p>
</div>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">BeamWidthRatio</code></p></td>
     <td><p>Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests relative to the number of available CPU cores.</p></td>
     <td><p><strong>Type</strong>: Float
 <strong>Range</strong>: [1, max(128 / CPU number, 16)]</p>
<p><strong>Default value</strong>: <code translate="no">4.0</code></p></td>
     <td><p>Higher values increase parallelism, which can speed up search on systems with powerful CPUs and SSDs. However, setting it too high might lead to excessive resource contention.
 In most cases, we recommend you set a value within this range: [1.0, 4.0].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_list</code></p></td>
     <td><p>During a search operation, this parameter determines the size of the candidate pool that the algorithm maintains as it traverses the graph. A larger value increases the chances of finding the true nearest neighbors (higher recall) but also increases search latency.</p></td>
     <td><p><strong>Type</strong>: Integer
 <strong>Range</strong>: [1, <em>int_max</em>]</p>
<p><strong>Default value</strong>: <code translate="no">100</code></p></td>
     <td><p>For a good balance between performance and accuracy, it is recommended to set this value to be equal to or slightly larger than the number of results you want to retrieve (top_k).</p></td>
   </tr>
</table>
