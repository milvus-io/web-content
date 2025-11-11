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
    </button></h1><p>AISAQ is a disk-based vector index that extends <a href="/docs/v2.6.x/diskann.md">DISKANN</a> to handle billion-scale datasets without exceeding RAM limits. Unlike DISKANN, which keeps compressed vectors in memory, AISAQ stores all data on disk—offering two modes to balance performance and storage costs.</p>
<p>Use AISAQ when your vector dataset is too large to fit comfortably in RAM, or when you need to optimize infrastructure costs by trading some query performance for reduced memory requirements.</p>
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
    <img translate="no" src="/docs/v2.6.x/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
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
<p>For a detailed explanation of these components and parameters, refer to <a href="/docs/v2.6.x/diskann.md">DISKANN</a>.</p>
<h3 id="AISAQ-modes" class="common-anchor-header">AISAQ modes<button data-href="#AISAQ-modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQ offers two disk-based storage strategies. The key difference is how PQ-compressed data is stored.</p>
<h4 id="AISAQ-performance" class="common-anchor-header">AISAQ-performance</h4><p><strong>AISAQ-performance</strong> achieves fully disk-based storage by moving PQ data from memory to disk while maintaining low IOPS through data colocation and redundancy.</p>
<p>In this mode:</p>
<ul>
<li><p>Each node’s raw vector, edge list, and its neighbors’ PQ data are stored together on disk.</p></li>
<li><p>This layout ensures that visiting a node (e.g., <em>vector 0</em>) still requires only a single disk I/O.</p></li>
<li><p>However, because PQ data is redundantly stored near multiple nodes, the index file size increases significantly, consuming more disk space.</p></li>
</ul>
<h4 id="AISAQ-scale" class="common-anchor-header">AISAQ-scale</h4><p><strong>AISAQ-scale</strong> focuses on <em>reducing disk space usage</em> while keeping all data on disk.</p>
<p>In this mode:</p>
<ul>
<li><p>PQ data is stored separately on disk, without redundancy.</p></li>
<li><p>This design minimizes index size but leads to more I/O operations during graph traversal.</p></li>
<li><p>To mitigate the IOPS overhead, AISAQ introduces two optimizations:</p>
<ul>
<li><p>A rearrange strategy that sorts PQ vectors by priority to improve data locality.</p></li>
<li><p>A PQ cache in DRAM (pq_cache_size) that caches frequently accessed PQ data.</p></li>
</ul></li>
</ul>
<p>As a result, AISAQ-scale achieves better storage efficiency but lower performance than DISKANN or AISAQ-Performance.</p>
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
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-specific-parameters" class="common-anchor-header">AISAQ-specific parameters<button data-href="#AISAQ-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQ inherits many parameters from DISKANN. To avoid redundancy, only AISAQ-specific parameters are detailed below. For descriptions of shared parameters such as <code translate="no">max_degree</code>, <code translate="no">pq_code_budget_gb_ratio</code>, <code translate="no">search_list_size</code>, and <code translate="no">beam_width_ratio</code>, refer to <a href="/docs/v2.6.x/diskann.md#DISKANN-params">DISKANN</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>Number of PQ vectors stored inline per node. Determines storage layout (Performance vs. Scale mode).</p></td>
     <td><p><strong>Type</strong>: Integer</p><p><strong>Range</strong>: [0, <em>max_degree</em>]</p><p><strong>Default value</strong>: <code translate="no">-1</code></p></td>
     <td><p>The closer <code translate="no">inline_pq</code> is to <em>max_degree</em>, the better the performance tends to be, but the index file size increases significantly.</p><p>When <code translate="no">inline_pq</code> approaches 0, performance decreases, and the index size becomes similar to that of DISKANN.</p><p><strong>Note</strong>: It's highly dependent on disk performance. If the disk performance is poor, it’s not advised to enable this option, as limited disk bandwidth may become a bottleneck and degrade overall performance.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>Enables PQ vector sorting by priority to improve I/O locality.</p></td>
     <td><p><strong>Type</strong>: Boolean</p><p><strong>Range</strong>: [true, false]</p><p><strong>Default value</strong>: <code translate="no">false</code></p></td>
     <td><p>Reduces query I/O but increases index build time.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>PQ cache size in DRAM (bytes).</p></td>
     <td><p><strong>Type</strong>: Integer</p><p><strong>Range</strong>: [0, 1&lt;&lt;30]</p><p><strong>Default value</strong>: <code translate="no">0</code></p></td>
     <td><p>Larger cache improves query performance but increases DRAM usage.</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">Considerations<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>Disk performance matters. AISAQ depends heavily on SSD IOPS; poor storage can reduce QPS.</p></li>
<li><p>AISAQ-performance mode ≈ DISKANN latency, but may require several times more disk space.</p></li>
<li><p>AISAQ-scale mode suits offline search or data archival workloads where QPS is less critical.</p></li>
</ul>
