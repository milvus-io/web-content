---
id: json-shredding.md
title: JSON Shredding
summary: >-
  JSON shredding accelerates JSON queries by converting traditional row-based
  storage into optimized columnar storage. While maintaining JSON's flexibility
  for data modeling, Milvus performs behind-the-scenes columnar optimization
  that dramatically improves access and query efficiency.
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">JSON Shredding<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>JSON shredding accelerates JSON queries by converting traditional row-based storage into optimized columnar storage. While maintaining JSON’s flexibility for data modeling, Milvus performs behind-the-scenes columnar optimization that dramatically improves access and query efficiency.</p>
<p>JSON shredding is effective for most JSON query scenarios. The performance benefits become more pronounced with:</p>
<ul>
<li><p><strong>Larger, more complex JSON documents</strong> - Greater performance gains as document size increases</p></li>
<li><p><strong>Read-heavy workloads</strong> - Frequent filtering, sorting, or searching on JSON keys</p></li>
<li><p><strong>Mixed query patterns</strong> - Queries across different JSON keys benefit from the hybrid storage approach</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">How it works<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>The JSON shredding process happens in three distinct phases to optimize data for fast retrieval.</p>
<h3 id="Phase-1-Ingestion--key-classification" class="common-anchor-header">Phase 1: Ingestion & key classification<button data-href="#Phase-1-Ingestion--key-classification" class="anchor-icon" translate="no">
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
    </button></h3><p>As new JSON documents are written, Milvus continuously samples and analyzes them to build statistics for each JSON key. This analysis includes the key’s occurrence ratio and type stability (whether its data type is consistent across documents).</p>
<p>Based on these statistics, JSON keys are categorized into the following for optimal storage.</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">Categories of JSON keys</h4><table>
   <tr>
     <th><p>Key Type</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p>Typed keys</p></td>
     <td><p>Keys that exist in most documents and always have the same data type (e.g., all integers or all strings).</p></td>
   </tr>
   <tr>
     <td><p>Dynamic keys</p></td>
     <td><p>Keys that appear frequently but have a mixed data type (e.g., sometimes a string, sometimes an integer).</p></td>
   </tr>
   <tr>
     <td><p>Shared keys</p></td>
     <td><p>Infrequently appearing or nested keys that fall below a configurable frequency threshold<strong>.</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">Example classification</h4><p>Consider the sample JSON data containing the following JSON keys:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>Based on this data, the keys would be classified as follows:</p>
<ul>
<li><p><strong>Typed keys</strong>: <code translate="no">a</code> and <code translate="no">f</code> (always an integer)</p></li>
<li><p><strong>Dynamic keys</strong>: <code translate="no">b</code> (mixed string/integer)</p></li>
<li><p><strong>Shared keys</strong>: <code translate="no">e</code> (infrequently appearing key)</p></li>
</ul>
<h3 id="Phase-2-Storage-optimization" class="common-anchor-header">Phase 2: Storage optimization<button data-href="#Phase-2-Storage-optimization" class="anchor-icon" translate="no">
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
    </button></h3><p>The classification from <a href="/docs/json-shredding.md#Phase-1-Ingestion--key-classification">Phase 1</a> dictates the storage layout. Milvus uses a columnar format optimized for queries.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" />
    <span>Json Shredding Flow</span>
  </span>
</p>
<ul>
<li><p><strong>Shredded columns</strong>: For <strong>typed</strong> and <strong>dynamic</strong> <strong>keys</strong>, data is written to dedicated columns. This columnar storage allows for fast, direct scans during queries, as Milvus can read only the required data for a given key without processing the entire document.</p></li>
<li><p><strong>Shared column</strong>: All <strong>shared keys</strong> are stored together in a single, compact binary JSON column. A shared-key <strong>inverted index</strong> is built on this column. This index is crucial for accelerating queries on low-frequency keys by allowing Milvus to quickly prune the data, effectively narrowing down the search space to only those rows that contain the specified key.</p></li>
</ul>
<h3 id="Phase-3-Query-execution" class="common-anchor-header">Phase 3: Query execution<button data-href="#Phase-3-Query-execution" class="anchor-icon" translate="no">
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
    </button></h3><p>The final phase leverages the optimized storage layout to intelligently select the fastest path for each query predicate.</p>
<ul>
<li><p><strong>Fast path</strong>: Queries on typed/dynamic keys (e.g., <code translate="no">json['a'] &lt; 100</code>) access dedicated columns directly</p></li>
<li><p><strong>Optimized path</strong>: Queries on shared keys (e.g., <code translate="no">json['e'] = 'rare'</code>) use inverted index to quickly locate relevant documents</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">Enable JSON shredding<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>To activate the feature, set <code translate="no">common.enabledJSONShredding</code> to <code translate="no">true</code> in your <code translate="no">milvus.yaml</code> configuration file. New data will automatically trigger the shredding process.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONShredding:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Once enabled, Milvus will begin analyzing and restructuring your JSON data upon ingestion without any further manual intervention.</p>
<h2 id="Parameter-tuning" class="common-anchor-header">Parameter tuning<button data-href="#Parameter-tuning" class="anchor-icon" translate="no">
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
    </button></h2><p>For most users, once JSON shredding is enabled, the default settings for other parameters are sufficient. However, you can fine-tune the behavior of JSON shredding using these parameters in <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p>Parameter Name</p></th>
     <th><p>Description</p></th>
     <th><p>Default Value</p></th>
     <th><p>Tuning Advice</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONShredding</code></p></td>
     <td><p>Controls whether the JSON shredding build and load processes are enabled.</p></td>
     <td><p>false</p></td>
     <td><p>Must be set to <strong>true</strong> to activate the feature.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingjsonShreddingForQuery</code></p></td>
     <td><p>Controls whether Milvus uses shredded data for acceleration.</p></td>
     <td><p>true</p></td>
     <td><p>Set to <strong>false</strong> as a recovery measure if queries fail, reverting to the original query path.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonShredding</code></p></td>
     <td><p>Determines whether Milvus uses mmap when loading shredding data.</p><p>For details, refer to <a href="/docs/mmap.md">Use mmap</a>.</p></td>
     <td><p>true</p></td>
     <td><p>This setting is generally optimized for performance. Only adjust it if you have specific memory management needs or constraints on your system.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingMaxColumns</code></p></td>
     <td><p>The maximum number of JSON keys that will be stored in shredded columns. </p><p>If the number of frequently appearing keys exceeds this limit, Milvus will prioritize the most frequent ones for shredding, and the remaining keys will be stored in the shared column.</p></td>
     <td><p>1024</p></td>
     <td><p>This is sufficient for most scenarios. For JSON with thousands of frequently appearing keys, you may need to increase this, but monitor storage usage.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingRatioThreshold</code></p></td>
     <td><p>The minimum occurrence ratio a JSON key must have to be considered for shredding into a shredded column.</p><p>A key is considered frequently appearing if its ratio is above this threshold.</p></td>
     <td><p>0.3</p></td>
     <td><p><strong>Increase</strong> (e.g., to 0.5) if the number of keys that meet the shredding criteria exceeds the <code translate="no">dataCoord.jsonShreddingMaxColumns</code> limit. This makes the threshold stricter, reducing the number of keys that qualify for shredding.</p><p><strong>Decrease</strong> (e.g., to 0.1) if you want to shred more keys that appear less frequently than the default 30% threshold.</p></td>
   </tr>
</table>
<h2 id="Performance-benchmarks" class="common-anchor-header">Performance benchmarks<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Our testing demonstrates significant performance improvements across different JSON key types and query patterns.</p>
<h3 id="Test-environment-and-methodology" class="common-anchor-header">Test environment and methodology<button data-href="#Test-environment-and-methodology" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>Hardware</strong>: 1 core/8GB cluster</p></li>
<li><p><strong>Dataset</strong>: 1 million documents from <a href="https://github.com/ClickHouse/JSONBench.git">JSONBench</a></p></li>
<li><p><strong>Average document size</strong>: 478.89 bytes</p></li>
<li><p><strong>Test duration</strong>: 100 seconds measuring QPS and latency</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">Results: typed keys<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>This test measured performance when querying a key present in most documents.</p>
<table>
   <tr>
     <th><p>Query Expression</p></th>
     <th><p>Key Value Type</p></th>
     <th><p>QPS (without shredding)</p></th>
     <th><p>QPS (with shredding)</p></th>
     <th><p>Performance Boost</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>Integer</p></td>
     <td><p>8.69</p></td>
     <td><p>287.50</p></td>
     <td><p>33x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['kind'] == 'commit'</code></p></td>
     <td><p>String</p></td>
     <td><p>8.42</p></td>
     <td><p>126.1</p></td>
     <td><p>14.9x</p></td>
   </tr>
</table>
<h3 id="Results-shared-keys" class="common-anchor-header">Results: shared keys<button data-href="#Results-shared-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>This test focused on querying sparse, nested keys that fall into the “shared” category.</p>
<table>
   <tr>
     <th><p>Query Expression</p></th>
     <th><p>Key Value Type</p></th>
     <th><p>QPS (without shredding)</p></th>
     <th><p>QPS (with shredding)</p></th>
     <th><p>Performance Boost</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>Nested Integer</p></td>
     <td><p>4.33</p></td>
     <td><p>385</p></td>
     <td><p>88.9x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>Nested String</p></td>
     <td><p>7.6</p></td>
     <td><p>352</p></td>
     <td><p>46.3x</p></td>
   </tr>
</table>
<h3 id="Key-insights" class="common-anchor-header">Key insights<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>Shared key queries</strong> show the most dramatic improvements (up to 89x faster)</p></li>
<li><p><strong>Typed key queries</strong> provide consistent 15-30x performance gains</p></li>
<li><p><strong>All query types</strong> benefit from JSON Shredding with no performance regressions</p></li>
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
<li><p><strong>How do I verify if JSON shredding works properly?</strong></p>
<ol>
<li><p>First, check if the data has been built by using the <code translate="no">show segment --format table</code> command in the <a href="/docs/birdwatcher_usage_guides.md">Birdwatcher</a> tool. If successful, the output will contain <code translate="no">shredding_data/</code> and <code translate="no">shared_key_index/</code> under the <strong>Json Key Stats</strong> field.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" />
    <span>Birdwatcher Output</span>
  </span>
</p></li>
<li><p>Next, verify that the data has been loaded by running <code translate="no">show loaded-json-stats</code> on the query node. The output will display details about the loaded shredded data for each query node.</p></li>
</ol></li>
<li><p><strong>What if I encounter an error?</strong></p>
<p>If the build or load process fails, you can quickly disable the feature by setting <code translate="no">common.enabledJSONShredding=false</code>. To clear any remaining tasks, use the <code translate="no">remove stats-task &lt;task_id&gt;</code> command in <a href="/docs/birdwatcher_usage_guides.md">Birdwatcher</a>. If a query fails, set <code translate="no">common.usingjsonShreddingForQuery=false</code> to revert to the original query path, bypassing the shredded data.</p></li>
<li><p><strong>How do I select between JSON shredding and JSON indexing?</strong></p>
<ul>
<li><p><strong>JSON shredding</strong> is ideal for keys that appear frequently in your documents, especially for complex JSON structures. It combines the benefits of columnar storage and inverted indexing, making it well-suited for read-heavy scenarios where you query many different keys. However, it is not recommended for very small JSON documents as the performance gain is minimal. The smaller the proportion of the key’s value to the total size of the JSON document, the better the performance optimization from shredding.</p></li>
<li><p><strong>JSON indexing</strong> is better for targeted optimization of specific key-based queries and has lower storage overhead. It’s suitable for simpler JSON structures. Note that JSON shredding does not cover queries on keys inside arrays, so you need a JSON index to accelerate those.</p></li>
</ul>
<p>For details, refer to <a href="/docs/json-field-overview.md#Next-Accelerate-JSON-queries">JSON Field Overview</a>.</p></li>
</ul>
