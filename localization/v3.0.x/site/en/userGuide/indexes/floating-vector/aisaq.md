---
id: aisaq.md
title: AISAQ
summary: >-
  AISAQ is a disk-based vector index that extends DISKANN to handle
  billion-scale datasets without exceeding RAM limits. Unlike DISKANN, which
  keeps compressed vectors in memory, AISAQ stores all data on disk—offering two
  modes to balance performance and storage costs.
beta: Milvus 2.6.4+
---
<h1 id="AISAQ" class="common-anchor-header">AISAQ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#AISAQ" class="anchor-icon" translate="no">
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
    </button></h1><p>AISAQ is a disk-based vector index that extends <a href="/docs/diskann.md">DISKANN</a> to handle billion-scale datasets with a minimal DRAM footprint.</p>
<p>Unlike DISKANN, which keeps compressed vectors in memory, AISAQ is designed with a “Near-Zero DRAM Architecture” which means holding all data structures on SSD.</p>
<p>AISAQ enables running ultra-high scale databases using standard servers while offering operation modes to balance performance and storage costs.</p>
<h2 id="How-AISAQ-works" class="common-anchor-header">How AISAQ works<button data-href="#How-AISAQ-works" class="anchor-icon" translate="no">
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
    </button></h2><p>The diagram above compares the storage layouts of <strong>DISKANN</strong>, <strong>AISAQ-Performance</strong>, and <strong>AISAQ-Scale</strong>, showing how data (raw vectors, edge lists, and PQ codes) is distributed between RAM and disk.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
    <span>Aisaq Vs Diskann</span>
  </span>
</p>
<h3 id="Foundation-DISKANN-recap" class="common-anchor-header">Foundation: DISKANN recap<button data-href="#Foundation-DISKANN-recap" class="anchor-icon" translate="no">
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
    </button></h3><p>In DISKANN, the raw vectors and edge lists are stored on disk, while PQ-compressed vectors are kept in memory (DRAM).</p>
<p>When DISKANN traverses to a node (e.g., <em>vector 0</em>):</p>
<ul>
<li><p>It loads the raw vector (<strong>raw_vector_0</strong>) and its edge list (<strong>edgelist_0</strong>) from disk.</p></li>
<li><p>The edge list indicates which neighbors to visit next (nodes 2, 3, and 5 in this example).</p></li>
<li><p>The raw vector is used to calculate the exact distance to the query vector for ranking.</p></li>
<li><p>The PQ data in memory is used for approximate distance filtering to guide the next traversal.</p></li>
</ul>
<p>Because the PQ data is already cached in DRAM, each node visit requires only one disk I/O, achieving high query speed with moderate memory usage.</p>
<p>For a detailed explanation of these components and parameters, refer to <a href="/docs/diskann.md">DISKANN</a>.</p>
<h3 id="AISAQ-Operation-Modes" class="common-anchor-header">AISAQ Operation Modes<button data-href="#AISAQ-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQ offers two modes of operation to address two distinct use cases:</p>
<p>Performance mode: optimized for applications that require low latency and high throughput at scale, such as online semantic search.</p>
<p>Scale mode:  optimized for applications with more relaxed latency constraints, such as RAG and offline semantic search, while enabling cost-efficient expansion of datasets to ultra-high scale.</p>
<h4 id="AISAQ-performance-mode" class="common-anchor-header">AISAQ-performance mode</h4><p><strong>AISAQ-performance</strong> achieves “Near-Zero DRAM footprint” by moving PQ data from memory to disk while maintaining low IOPS through data colocation and redundancy.</p>
<ul>
<li><p>Each node’s raw vector, edge list, and its neighbors’ PQ data are stored together on disk.</p></li>
<li><p>This layout ensures that visiting a node (e.g., vector 0) still requires only a single disk I/O.</p></li>
<li><p>Since PQ data is redundantly stored near multiple nodes, the index file size increases significantly, consuming more disk space.</p></li>
</ul>
<h4 id="AISAQ-scale-mode" class="common-anchor-header">AISAQ-scale mode</h4><p><strong>AISAQ-scale</strong> focuses on reducing disk space usage while meeting the performance requirements of its target applications.</p>
<p>In this mode:</p>
<ul>
<li><p>PQ data is stored separately on disk, without redundancy.</p></li>
<li><p>This design minimizes index size but leads to more I/O operations during graph traversal.</p></li>
<li><p>To mitigate the IOPS overhead, AISAQ introduces two optimizations:</p>
<ul>
<li><p>A rearrange algorithm that sorts PQ vectors by priority to improve data locality.</p></li>
<li><p>A PQ cache in DRAM (pq_read_page_cache_size) that caches frequently accessed PQ data.</p></li>
</ul></li>
</ul>
<h2 id="Example-configuration" class="common-anchor-header">Example configuration<button data-href="#Example-configuration" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">AISAQ:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Controls the maximum number of connections (edges) each data point can have in the Vamana graph</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># During index construction, this parameter defines the size of the candidate pool used when searching for the nearest neighbors for each node. For every node being added to the graph, the algorithm maintains a list of the search_list_size best candidates found so far. The search for neighbors stops when this list can no longer be improved. From this final candidate pool, the top max_degree nodes are selected to form the final edges</span>
      <span class="hljs-attr">inline_pq:</span> <span class="hljs-number">-1</span> <span class="hljs-comment"># Number of PQ vectors stored inline per Index node (read when node is accessed, to reduce IO)</span>
      <span class="hljs-attr">rearrange:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Re-arrange the PQ vectors data structure to improve data locality and reduce disk accesses during search (ignored in performance mode)</span>
      <span class="hljs-attr">num_entry_points:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate entry points to optimize search entry-point selection</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Controls the size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
      <span class="hljs-attr">disk_pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.25</span> <span class="hljs-comment"># Controls the size of the PQ codes of the high precision vectors stored in the index (used for re-ranking), compared to the size of the uncompressed data</span>
      <span class="hljs-attr">pq_cache_size:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># PQ vectors cache size in DRAM (bytes). The PQ vectors cache is loaded during Index load and used during search to reduce IOs (ignored in performance mode)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># Controls the amount of DRAM to be used for caching frequently accessed index nodes. This cache is loaded during index load and used during search to reduce IOs</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">search_list:</span> <span class="hljs-number">16</span> <span class="hljs-comment"># During a search operation, this parameter determines the size of the candidate pool that the algorithm maintains as it traverses the graph. A larger value increases the chances of finding the true nearest neighbors (higher recall) but also increases search latency</span>
      <span class="hljs-attr">beamwidth:</span> <span class="hljs-number">8</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read the index nodes</span>
      <span class="hljs-attr">vectors_beamwidth:</span> <span class="hljs-number">1</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read groups of neighboring PQ vectors (ignored in performance mode)</span>
      <span class="hljs-attr">pq_read_page_cache_size:</span> <span class="hljs-number">5242880</span> <span class="hljs-string">(5MiB)</span> <span class="hljs-comment"># PQ read cache size in DRAM per search thread (bytes). It caches frequently accessed data pages containing PQ vectors (ignored in performance mode and applicable only when rearrange is true). The PQ read cache memory is reused across all AISAQ segments</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-parameters" class="common-anchor-header">AISAQ parameters<button data-href="#AISAQ-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQ inherits some parameters from DISKANN - <code translate="no">max_degree</code>, <code translate="no">search_list_size</code>, and <code translate="no">pq_code_budget_gb_ratio</code>.</p>
<h3 id="Index-building-params" class="common-anchor-header">Index-building params<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>These parameters influence how the AISAQ index is constructed. Adjusting them can affect the index size, build time, and search quality.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>Controls the maximum number of connections (edges) each data point can have in the Vamana graph.</p></td>
     <td><p><strong>Type</strong>: Integer</p><p><strong>Range</strong>: [1, 512]</p><p><strong>Default value</strong>: <code translate="no">56</code></p></td>
     <td><p>Higher values create denser graphs, potentially increasing recall (finding more relevant results) but also increasing memory usage and build time. In most cases, we recommend you set a value within this range: [10, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>During index construction, this parameter defines the size of the candidate pool used when searching for the nearest neighbors for each node. For every node being added to the graph, the algorithm maintains a list of the search_list_size best candidates found so far. The search for neighbors stops when this list can no longer be improved. From this final candidate pool, the top max_degree nodes are selected to form the final edges.</p></td>
     <td><p><strong>Type</strong>: Integer</p><p><strong>Range</strong>: [1, 512]</p><p><strong>Default value</strong>: <code translate="no">100</code></p></td>
     <td><p>A larger search_list_size increases the likelihood of finding the true nearest neighbors for each node, which can lead to a higher-quality graph and better search performance (recall). However, this comes at the cost of a significantly longer index build time. It should always be set to a value greater than or equal to max_degree.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>Number of PQ vectors stored inline per Index node (read when node is accessed, to reduce IO)</p></td>
     <td><p><strong>Type</strong>: Integer</p><p><strong>Range</strong>: [0, <em>max_degree</em>]</p><p><strong>Default value</strong>: <code translate="no">-1</code></p></td>
     <td><p>Higher values of <code translate="no">inline_pq</code> improve performance but increase disk space.</p><p>Set <code translate="no">inline_pq</code>=0 for AISAQ in scale mode.</p><p>Set <code translate="no">inline_pq</code>=-1 to automatically fill any unused space in the index with PQ vectors for further optimization of AISAQ in scale mode.</p><p>Set <code translate="no">inline_pq</code>=<em>max_degree</em> for AISAQ in performance mode.</p><p><code translate="no">inline_pq</code> settings in between 0 and <em>max_degree</em> enable an adjustable balance between performance and disk-space consumption.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>Re-arrange the PQ vectors data structure to improve data locality and reduce disk accesses during search (ignored in performance mode).</p></td>
     <td><p><strong>Type</strong>: Boolean</p><p><strong>Range</strong>: [true, false]</p><p><strong>Default value</strong>: <code translate="no">true</code></p></td>
     <td><p>When true, reduces IOs during search with only minor increase in memory and in index build time.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">num_entry_points</code></p></td>
     <td><p>Number of candidate entry points to optimize search entry-point selection.</p></td>
     <td><p><strong>Type</strong>: Integer</p><p><strong>Range</strong>: [0, 1000]</p><p><strong>Default value</strong>: <code translate="no">100</code></p></td>
     <td><p>High values may reduce the search time by starting the search from a closer entry point.</p><p>Set higher values for large segments (e.g. for 10M vectors and above use value of 1000).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>Controls the size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data.</p></td>
     <td><p><strong>Type</strong>: Float</p><p><strong>Range</strong>: (0.0, 0.25]</p><p><strong>Default value</strong>: <code translate="no">0.125</code></p></td>
     <td><p>A higher ratio leads to more accurate search results, effectively storing more information about the original vectors but increases computational complexity during search.</p><p>In most cases, we recommend you set a value within this range: (0.0417, 0.25].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disk_pq_code_budget_gb_ratio</code></p></td>
     <td><p>Controls the size of the PQ codes of the high precision vectors stored in the index (used for re-ranking), compared to the size of the uncompressed data.</p></td>
     <td><p><strong>Type</strong>: Float</p><p><strong>Range</strong>: [0, 0.25]</p><p><strong>Default value</strong>: <code translate="no">0.25</code></p></td>
     <td><p>With the default value of 0.25, vectors will be quantized to 25% of their original size (4× compression), reducing disk footprint with relatively minimal accuracy impact.</p><p>Set value of 0 to store full precision vectors in disk index for re-ranking. A larger value offers a higher recall rate but increases disk usage.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>PQ vectors cache size in DRAM (bytes). The PQ vectors cache is loaded during Index load and used during search to reduce IOs (ignored in performance mode).</p></td>
     <td><p><strong>Type</strong>: Integer</p><p><strong>Range</strong>: [0, 1073741824]</p><p><strong>Default value</strong>: <code translate="no">0</code></p></td>
     <td><p>Larger cache improves query performance but increases DRAM usage.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>Controls the amount of DRAM to be used for caching frequently accessed index nodes</p><p>This cache is loaded during index load and used during search to reduce IOs.</p></td>
     <td><p><strong>Type</strong>: Float</p><p><strong>Range</strong>: [0.0, 0.3)</p><p><strong>Default value</strong>: <code translate="no">0</code></p></td>
     <td><p>A higher value allocates more memory for caching, reducing disk IOs but consuming more system memory. A lower value uses less memory for caching, potentially increasing the need for disk access.</p></td>
   </tr>
</table>
<h3 id="Index-search-params" class="common-anchor-header">Index-search params<button data-href="#Index-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>These parameters influence how AISAQ performs searches. Adjusting them can impact search speed, latency, and resource usage.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">search_list</code></p></td>
     <td><p>During a search operation, this parameter determines the size of the candidate pool that the algorithm maintains as it traverses the graph. A larger value increases the chances of finding the true nearest neighbors (higher recall) but also increases search latency.</p></td>
     <td><p><strong>Type</strong>: Integer</p><p><strong>Range</strong>: [topk, int32_max]</p><p><strong>Default value</strong>: <code translate="no">16</code></p></td>
     <td><p>For a good balance between performance and accuracy, it is recommended to set this value to be equal to or slightly larger than the number of results you want to retrieve (top_k).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">beamwidth</code></p></td>
     <td><p>Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read the index nodes.</p></td>
     <td><p><strong>Type</strong>: Integer</p><p><strong>Range</strong>: [1, 16]</p><p><strong>Default value</strong>: <code translate="no">8</code></p></td>
     <td><p>Higher values increase parallelism, which can speed up search on systems with powerful CPUs and SSDs. However, setting it too high might lead to excessive resource contention.</p><p>In most cases, we recommend you set a value of 2.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectors_beamwidth</code></p></td>
     <td><p>Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read groups of neighboring PQ vectors (ignored in performance mode).</p></td>
     <td><p><strong>Type</strong>: Integer</p><p><strong>Range</strong>: [1, 4] must be <= <em>beamwidth</em></p><p><strong>Default value</strong>: <code translate="no">1</code></p></td>
     <td><p>Higher values increase parallelism, which can speed up search on systems with powerful CPUs and SSDs. However, setting it too high might lead to excessive resource contention, as each neighboring PQ vector group may contain up to max_degree vectors.</p><p>In most cases, we recommend you set a value of 1.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_read_page_cache_size</code></p></td>
     <td><p>PQ read cache size in DRAM per search thread (bytes). It caches frequently accessed data pages containing PQ vectors (ignored in performance mode and applicable only when rearrange is true).</p><p>The PQ read cache memory is reused across all AISAQ segments.</p></td>
     <td><p><strong>Type</strong>: Integer</p><p><strong>Range</strong>: [0, 33554432]</p><p><strong>Default value</strong>: <code translate="no">5242880 (5MiB)</code></p></td>
     <td><p>Larger cache improves query performance but increases DRAM usage.</p><p>Recommended values range from 2 MiB for small segments (1 M vectors), 5 MiB for medium segments (50 M vectors) and 10 MiB for large segments (250 M vectors).</p></td>
   </tr>
</table>
