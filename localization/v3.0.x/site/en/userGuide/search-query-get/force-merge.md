---
id: force-merge.md
title: Force Merge Compaction
summary: >-
  Use force merge compaction to consolidate small segments and improve query
  performance and storage efficiency.
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">Force Merge Compaction<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>Force Merge is designed to consolidate small and fragmented segments into fewer and larger ones to improve query performance and storage efficiency. This guide explains how to use force merge compaction.</p>
<div class="alert note">
<p>This feature is in public preview. Do not use it in production environments.</p>
</div>
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
    </button></h2><p>Standard <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">compaction</a> keeps segment sizes near the configured <code translate="no">maxSize</code> through many-to-one merges, but it can still leave mid-sized fragments that cannot be merged further without exceeding limits. For example, as illustrated below, if a collection has five 2 MB segments and <code translate="no">maxSize</code> is 3 MB, merging any two segments would exceed the limit, so standard compaction cannot further reduce the segment count and the fragmented layout remains.</p>
<p>Force merge adds a <code translate="no">target_size</code> parameter and supports reorganizing segments toward the desired size within a tight tolerance when possible. As illustrated below, if the specified <code translate="no">target_size</code> is 4 MB, the five 2 MB small segments can be further merged into fewer larger segments. This reduces excess segment counts, supports targets larger than the default <code translate="no">maxSize</code> settings, and, when the target is very large, lets the system choose a practical output size and segment count for the current hardware and QueryNode topology.</p>
<p>To understand which compaction method to use, see <a href="#faq">FAQ</a>.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" />
    <span>R8eow3kaqhktokblcmocnvxmnee</span>
  </span>
</p>
<p>Force merge compaction extends the existing <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> API with a <code translate="no">target_size</code> parameter. It is fully backward-compatible: existing compaction calls without <code translate="no">target_size</code> continue to work as before.</p>
<p>Force merge operates asynchronously. It does not block search or query operations, though it consumes I/O and memory resources during execution.</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">Use Force Merge Compaction<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p>Milvus version 2.6.15 or later</p></li>
<li><p>pymilvus 2.6.13 or later</p></li>
</ul>
<h3 id="Global-Configuration" class="common-anchor-header">Global Configuration<button data-href="#Global-Configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>The following configuration parameters control Force Merge behavior. Set them in the Milvus configuration file or via environment variables.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">segment:</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">512</span>         <span class="hljs-comment"># Default segment max size (MB).</span>
                         <span class="hljs-comment"># Used when target_size is 0 or omitted.</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">maxFullSegmentThreshold:</span> <span class="hljs-number">100</span>
                         <span class="hljs-comment"># When segment count exceeds this threshold,</span>
                         <span class="hljs-comment"># a faster greedy algorithm is used instead</span>
                         <span class="hljs-comment"># of the standard merge algorithm.</span>
    <span class="hljs-attr">forceMerge:</span>
      <span class="hljs-attr">datanodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># DataNode memory divided by this factor</span>
                         <span class="hljs-comment"># determines the the largest segment</span>
                         <span class="hljs-comment"># size the system can allow.</span>
      <span class="hljs-attr">querynodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># Minimum QueryNode memory divided by this</span>
                         <span class="hljs-comment"># factor. Used in automatic size calculation</span>
                         <span class="hljs-comment"># to ensure merged segments can be loaded.</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Default Value</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.segment.maxSize</code></p></td>
     <td><p>512</p></td>
     <td><p>Default segment max size in MB. Used as the target when <code translate="no">target_size</code> is 0 or omitted. Also serves as the minimum allowed value for explicit <code translate="no">target_size</code>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>Segment count threshold for algorithm selection. When the number of segments exceeds this value, Milvus uses a faster greedy algorithm for merge planning.</p><ul><li><p><strong>Standard algorithm</strong> (used when segment count &lt;= <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): produces more optimal merge results but takes longer to compute.</p></li><li><p><strong>Greedy algorithm</strong> (used when segment count &gt; <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): completes planning much faster at the cost of slightly less optimal segment grouping.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>DataNode memory is divided by this factor to calculate the largest segment size the system can allow.</p><ul><li><p>A larger value allocates less memory to merging but leaves more for other DataNode operations, improving  node stability.</p></li><li><p>A smaller value allows larger merges but increases memory pressure.</p></li><li><p>For example, with the default factor of 4.0 and a DataNode with 16 GB memory, the merge budget is 4 GB. This means the total size of segments being merged in a single operation cannot exceed 4 GB.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>The minimum QueryNode memory is divided by this factor. Used during automatic size calculation (<code translate="no">target_size=max_int64</code>) to ensure that merged segments can be loaded by QueryNodes.</p><ul><li><p>A larger value produces smaller segments that are easier for QueryNodes to load.</p></li><li><p>A smaller value allows larger segments but may cause load failures on memory-constrained QueryNodes.</p></li><li><p>For example, with the default factor of 4.0 and the smallest QueryNode having 16 GB memory, the auto-calculated target size will not exceed 4 GB. This prevents Force Merge from producing segments so large that QueryNodes cannot load them.</p></li></ul></td>
   </tr>
</table>
<p>To apply the above changes to your Milvus cluster, please follow the steps in <a href="/docs/configure-helm.md#Configure-Milvus-via-configuration-file">Configure Milvus with Helm</a> and <a href="/docs/configure_operator.md">Configure Milvus with Milvus Operators</a>.</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">Trigger Force Merge Compaction<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>You trigger Force Merge compaction by calling <code translate="no">compact()</code> with the <code translate="no">target_size</code> parameter. For parameter details, see <a href="#parameter-reference">Parameter reference</a> below.</p>
<p>Three force merge compaction modes are available:</p>
<pre><code translate="no" class="language-plaintext">compact(&quot;my_collection&quot;, target_size=?)
│
├─ Mode 1: target_size = 0 (or omitted)
│  Uses config maxSize (default 512 MB)
│  Equivalent to standard compaction
│
├─ Mode 2: target_size = 2048
│  Merges segments to ~2 GB each
│  Must be &gt;= config maxSize
│
└─ Mode 3: target_size = max_int64
   Auto-calculates optimal size based on
   segment distribution and node memory
<button class="copy-code-btn"></button></code></pre>
<p>The following are examples to show how to use each force merge compaction mode.</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">Default (standard compaction)</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 512 MB)</span>
job_id = client.compact(<span class="hljs-string">&quot;target_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Explicit-target-size" class="common-anchor-header">Explicit target size</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Merge segments to approximately 2 GB each</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=<span class="hljs-string">&quot;2048&quot;</span>  <span class="hljs-comment"># The unit is MB</span>
)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Automatic-size-calculation" class="common-anchor-header">Automatic size calculation</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Let Milvus determine the optimal segment size</span>
max_int64 = (<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">63</span>) - <span class="hljs-number">1</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=max_int64
)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Parameter-reference" class="common-anchor-header">Parameter reference</h4><p>The following table explains the parameters.</p>
<table>
   <tr>
     <th><p><strong>Parameter</strong></p></th>
     <th><p><strong>Type</strong></p></th>
     <th><p><strong>Description</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>Required. The name of the collection to compact.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>Optional. The target segment size in MB. There are 3 options of the parameter value:</p><ul><li><p><strong>0 or omitted</strong>: Uses the configured <code translate="no">dataCoord.segment.maxSize</code> (default: 512 MB). Equivalent to standard compaction.</p></li><li><p><strong>Explicit value</strong> : Merges segments to approximately the specified size in MB (eg. 2048). Must be greater than or equal to the configured <code translate="no">dataCoord.segment.maxSize</code>.</p></li><li><p><strong>max_int64 ((1 << 63) - 1)</strong>: Automatically calculates the optimal size based on current segment distribution and available node resources.</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>If the specified <code translate="no">target_size</code> is less than the configured <code translate="no">dataCoord.segment.maxSize</code>, the request is rejected with an error.</p>
</div>
<h3 id="Check-Compaction-Progress" class="common-anchor-header">Check Compaction Progress<button data-href="#Check-Compaction-Progress" class="anchor-icon" translate="no">
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
    </button></h3><p>Force Merge compaction runs asynchronously. Use the returned job ID to check progress:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Check compaction state</span>
state = client.get_compaction_state(job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">Best practices<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Do not use force merge compaction in production environments.</strong></p></li>
<li><p><strong>Use automatic size calculation mode for most cases.</strong> Setting <code translate="no">target_size</code> to <code translate="no">max_int64</code> lets Milvus analyze your segment distribution and node resources to determine the best size. This is the recommended approach unless you have specific sizing requirements.</p></li>
<li><p><strong>Consider the performance trade-off.</strong> Force Merge compaction is a resource-intensive operation. It reads, merges, and rewrites segment data. Schedule it during low-traffic periods to minimize impact on query latency.</p></li>
<li><p><strong>Monitor segment count before and after.</strong> Use <code translate="no">get_compaction_state()</code> and <code translate="no">list_persistent_segments</code> to verify that the compaction produced fewer, larger segments as expected.</p></li>
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
    </button></h2><p><strong>How is Force Merge different from standard compaction?</strong></p>
<p>These two types of compaction operations serve different purposes.</p>
<ul>
<li><p>Standard compaction (targetSize=0 or omitted) is a best-effort, incremental cleanup path.</p></li>
<li><p>Force merge (targetSize>0) is a collection-level repacking path to produce fewer, larger, near-target segments.</p></li>
</ul>
<p>The key difference is merge shape: standard compaction is effectively m → 1 per task, while force merge is m → n across grouped inputs. This is why force merge can solve segment layouts that standard compaction cannot. The following table compares the 2 types of operations.</p>
<table>
   <tr>
     <th><p><strong>Dimension</strong></p></th>
     <th><p><strong>Standard compaction (default)</strong></p></th>
     <th><p><strong>Force merge</strong></p></th>
   </tr>
   <tr>
     <td><p>API trigger</p></td>
     <td><p>targetSize=0 (or not set), no Major/L0 flag</p></td>
     <td><p>targetSize&gt;0 (MB)</p></td>
   </tr>
   <tr>
     <td><p>Primary goal</p></td>
     <td><p>Incremental cleanup of obvious fragments; routine maintenance</p></td>
     <td><p>Collection-wide consolidation for search and balance</p></td>
   </tr>
   <tr>
     <td><p>Segment size source</p></td>
     <td><p>Fixed dataCoord.segment.maxSize (server config)</p></td>
     <td><p>User targetSize, then safety-clamped by maxSafeSize</p></td>
   </tr>
   <tr>
     <td><p>Parameter validity</p></td>
     <td><p>No user size tuning</p></td>
     <td><p>User targetSize must be &gt;= dataCoord.segment.maxSize; otherwise rejected</p></td>
   </tr>
   <tr>
     <td><p>Safety upper bound</p></td>
     <td><p>Config cap only</p></td>
     <td><p>maxSafeSize = min(QueryNode mem, DataNode mem) / memory_factor (standalone non-pooling: further halved)</p></td>
   </tr>
   <tr>
     <td><p>Merge shape</p></td>
     <td><p>m → 1 per task, output &lt;= configMaxSize</p></td>
     <td><p>m → n, outputs near targetSize</p></td>
   </tr>
   <tr>
     <td><p>Medium-segment behavior</p></td>
     <td><p>Can get stuck permanently (for example, two 60% segments cannot legally become one 120% segment)</p></td>
     <td><p>Repack + split works; no “stuck at 60%” pattern</p></td>
   </tr>
   <tr>
     <td><p>Collection flattening ability</p></td>
     <td><p>Limited; repeated runs may still leave many medium segments</p></td>
     <td><p>Strong; designed to reduce segment count and push fullness higher</p></td>
   </tr>
   <tr>
     <td><p>Topology awareness</p></td>
     <td><p>None</p></td>
     <td><p>Yes; uses QueryNode/replica/shard layout</p></td>
   </tr>
   <tr>
     <td><p>Read-path parallelism tuning</p></td>
     <td><p>None</p></td>
     <td><p>Adjusts output count using queryNodeCount / (replicas × shards) when valid</p></td>
   </tr>
   <tr>
     <td><p>Typical use case</p></td>
     <td><p>High-churn daily cleanup after writes/deletes</p></td>
     <td><p>Benchmark prep, search optimization, load-parallelism alignment</p></td>
   </tr>
   <tr>
     <td><p>Scope expectation</p></td>
     <td><p>Do not expect full-collection repack</p></td>
     <td><p>Intended for collection-level repack outcome</p></td>
   </tr>
</table>
<p><strong>Selection guidance:</strong></p>
<ul>
<li><p>Choose standard compaction for low-risk, incremental cleanup.</p></li>
<li><p>Choose force merge when you explicitly want to reshape the collection into fewer, larger segments aligned with search and loading behavior.</p></li>
</ul>
<p><strong>How is Force Merge different from clustering compaction?</strong></p>
<p><a href="/docs/clustering-compaction.md">Clustering compaction</a> (<code translate="no">is_clustering=True</code>) reorganizes data within segments based on a clustering key to improve search pruning. Force Merge (<code translate="no">target_size=N</code>) optimizes segment sizes without changing data distribution. They serve different purposes and can be used together — run clustering compaction first to organize data, then Force Merge to consolidate the resulting segments.</p>
<p><strong>Can I run Force Merge on a collection that is being queried?</strong></p>
<p>Yes. Force Merge runs asynchronously and does not block queries. However, it consumes DataNode and disk I/O resources, so query latency may increase during compaction. Schedule Force Merge during low-traffic periods for best results.</p>
<p><strong>What happens if I set a target_size smaller than maxSize?</strong></p>
<p>The request is rejected with an error. The target size must be greater than or equal to the configured <code translate="no">dataCoord.segment.maxSize</code>.</p>
