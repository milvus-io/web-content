---
id: disk_index.md
related_key: disk_index
summary: Disk index mechanism in Milvus.
title: On-disk Index
---
<h1 id="On-disk-Index" class="common-anchor-header">On-disk Index<button data-href="#On-disk-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>This article introduces an on-disk indexing algorithm named DiskANN. Based on Vamana graphs, DiskANN powers efficient searches within large datasets.</p>
<p>To improve query performance, you can <a href="/docs/v2.4.x/index-vector-fields.md">specify an index type</a> for each vector field.</p>
<div class="alert note"> 
Currently, a vector field only supports one index type. Milvus automatically deletes the old index when switching the index type.
</div>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>To use DiskANN, note that</p>
<ul>
<li>DiskANN is disabled by default. If you prefer in-memory index over on-disk index, you are advised to disable this feature for a better performance.
<ul>
<li>To disable it, you can change <code translate="no">queryNode.enableDisk</code> to <code translate="no">false</code> in your milvus configuration file.</li>
<li>To enable it again, you can set <code translate="no">queryNode.enableDisk</code> to <code translate="no">true</code>.</li>
</ul></li>
<li>The Milvus instance runs on Ubuntu 18.04.6 or a later release.</li>
<li>The Milvus data path should be mounted to an NVMe SSD for full performance:
<ul>
<li>For a Milvus Standalone instance, the data path should be <strong>/var/lib/milvus/data</strong> in the container where the instance runs.</li>
<li>For a Milvus Cluster instance, the data path should be <strong>/var/lib/milvus/data</strong> in the containers where the QueryNodes and IndexNodes run.</li>
</ul></li>
</ul>
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
    </button></h2><p>To use DiskANN, ensure that you</p>
<ul>
<li>Use only float vectors with at least 1 dimensions in your data.</li>
<li>Use only Euclidean Distance (L2), Inner Product (IP), or COSINE to measure the distance between vectors.</li>
</ul>
<h2 id="Index-and-search-settings" class="common-anchor-header">Index and search settings<button data-href="#Index-and-search-settings" class="anchor-icon" translate="no">
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
<li><p>Index building parameters</p>
<p>When building a DiskANN index, use <code translate="no">DISKANN</code> as the index type. No index parameters are necessary.</p></li>
<li><p>Search parameters</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Range</th><th>Default Value</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_list</code></td><td>Size of the candidate list, a larger size offers a higher recall rate with degraded performance.</td><td>[topk, int32_max]</td><td>16</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="DiskANN-related-Milvus-configurations" class="common-anchor-header">DiskANN-related Milvus configurations<button data-href="#DiskANN-related-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>DiskANN is tunable. You can modify DiskANN-related parameters in <code translate="no">${MILVUS_ROOT_PATH}/configs/milvus.yaml</code> to improve its performance.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-string">...</span>
<span class="hljs-attr">DiskIndex:</span>
  <span class="hljs-attr">MaxDegree:</span> <span class="hljs-number">56</span>
  <span class="hljs-attr">SearchListSize:</span> <span class="hljs-number">100</span>
  <span class="hljs-attr">PQCodeBugetGBRatio:</span> <span class="hljs-number">0.125</span>
  <span class="hljs-attr">SearchCacheBudgetGBRatio:</span> <span class="hljs-number">0.125</span>
  <span class="hljs-attr">BeamWidthRatio:</span> <span class="hljs-number">4.0</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Value Range</th><th>Default Value</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MaxDegree</code></td><td>Maximum degree of the Vamana graph. <br/> A larger value offers a higher recall rate but increases the size of and time to build the index.</td><td>[1, 512]</td><td>56</td></tr>
<tr><td><code translate="no">SearchListSize</code></td><td>Size of the candidate list. <br/> A larger value increases the time spent on building the index but offers a higher recall rate. <br/> Set it to a value smaller than <code translate="no">MaxDegree</code> unless you need to reduce the index-building time.</td><td>[1, int32_max]</td><td>100</td></tr>
<tr><td><code translate="no">PQCodeBugetGBRatio</code></td><td>Size limit on the PQ code. <br/> A larger value offers a higher recall rate but increases memory usage.</td><td>(0.0, 0.25]</td><td>0.125</td></tr>
<tr><td><code translate="no">SearchCacheBudgetGBRatio</code></td><td>Ratio of cached node numbers to raw data. <br/> A larger value improves index-building performance with increased memory usage.</td><td>[0.0, 0.3)</td><td>0.10</td></tr>
<tr><td><code translate="no">BeamWidthRatio</code></td><td>Ratio between the maximum number of IO requests per search iteration and CPU number.</td><td>[1, max(128 / CPU number, 16)]</td><td>4.0</td></tr>
</tbody>
</table>
<h2 id="Troubleshooting" class="common-anchor-header">Troubleshooting<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
<li><p>How to deal with the <code translate="no">io_setup() failed; returned -11, errno=11:Resource temporarily unavailable</code> error?</p>
<p>The Linux kernel provides the Asynchronous non-blocking I/O (AIO) feature that allows a process to initiate multiple I/O operations simultaneously without having to wait for any of them to complete. This helps boost performance for applications that can overlap processing and I/O.</p>
<p>The performance can be tuned using the <code translate="no">/proc/sys/fs/aio-max-nr</code> virtual file in the proc file system. The <code translate="no">aio-max-nr</code> parameter determines the maximum number of allowable concurrent requests.</p>
<p>The <code translate="no">aio-max-nr</code> defaults to <code translate="no">65535</code>, you can set it up to <code translate="no">10485760</code>.</p></li>
</ul>
