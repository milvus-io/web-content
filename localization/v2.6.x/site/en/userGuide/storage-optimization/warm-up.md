---
id: warm-up.md
title: Warm Up
summary: >-
  In Milvus, Warm Up complements Tiered Storage by alleviating first-hit latency
  that occurs when cold data is accessed for the first time. Once configured,
  Warm Up preloads selected types of fields or indexes into the cache before a
  segment becomes queryable, ensuring that frequently accessed data is available
  immediately after loading.
beta: Milvus 2.6.4+
---
<h1 id="Warm-Up" class="common-anchor-header">Warm Up<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Warm-Up" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus, <strong>Warm Up</strong> complements Tiered Storage by alleviating first-hit latency that occurs when cold data is accessed for the first time. Once configured, Warm Up preloads selected types of fields or indexes into the cache before a segment becomes queryable, ensuring that frequently accessed data is available immediately after loading.</p>
<h2 id="Why-warm-up" class="common-anchor-header">Why warm up<button data-href="#Why-warm-up" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/tiered-storage-overview.md#Phase-1-Lazy-load">Lazy Load</a> in Tiered Storage improves efficiency by loading only metadata initially. However, this can cause latency on the first query to cold data, since required chunks or indexes must be fetched from object storage.</p>
<p><strong>Warm Up</strong> solves this problem by proactively caching critical data during segment initialization.</p>
<p>It is especially beneficial when:</p>
<ul>
<li><p>Certain scalar indexes are frequently used in filter conditions.</p></li>
<li><p>Vector indexes are essential for search performance and must be ready immediately.</p></li>
<li><p>Cold-start latency after QueryNode restart or new segment load is unacceptable.</p></li>
</ul>
<p>In contrast, Warm Up is <strong>not recommended</strong> for fields or indexes queried infrequently. Disabling Warm Up shortens segment load time and conserves cache space—ideal for large vector fields or non-critical scalar fields.</p>
<h2 id="Configuration" class="common-anchor-header">Configuration<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Warm Up is controlled under <code translate="no">queryNode.segcore.tieredStorage.warmup</code> in <code translate="no">milvus.yaml</code>. You can configure it separately for scalar fields, scalar indexes, vector fields, and vector indexes. Each target supports two modes:</p>
<table>
   <tr>
     <th><p>Mode</p></th>
     <th><p>Description</p></th>
     <th><p>Typical scenario</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p>Preload before the segment becomes queryable. Load time increases slightly, but the first query incurs no latency.</p></td>
     <td><p>Use for performance-critical data that must be immediately available, such as high-frequency scalar indexes or key vector indexes used in search.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>Skip preloading. The segment becomes queryable faster, but the first query may trigger on-demand loading.</p></td>
     <td><p>Use for infrequently accessed or large data such as raw vector fields or non-critical scalar fields.</p></td>
   </tr>
</table>
<p><strong>Example YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># options: sync, disable.</span>
        <span class="hljs-comment"># Specifies the timing for warming up the Tiered Storage cache.</span>
        <span class="hljs-comment"># - `sync`: data will be loaded into the cache before a segment is considered loaded.</span>
        <span class="hljs-comment"># - `disable`: data will not be proactively loaded into the cache, and loaded only if needed by search/query tasks.</span>
        <span class="hljs-comment"># Defaults to `sync`, except for vector field which defaults to `disable`.</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span> <span class="hljs-comment"># cache warmup for vector field raw data is by default disabled.</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Values</p></th>
     <th><p>Description</p></th>
     <th><p>Recommended use case</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">scalarField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Controls whether scalar field data is preloaded.</p></td>
     <td><p>Use <code translate="no">sync</code> only if scalar fields are small and accessed frequently in filters. Otherwise, <code translate="no">disable</code> to reduce load time.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Controls whether scalar indexes are preloaded.</p></td>
     <td><p>Use <code translate="no">sync</code> for scalar indexes involved in frequent filter conditions or range queries.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Controls whether vector field data is preloaded.</p></td>
     <td><p>Generally <code translate="no">disable</code> to avoid heavy cache use. Enable <code translate="no">sync</code> only when raw vectors must be retrieved immediately after search (for example, similarity results with vector recall).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Controls whether vector indexes are preloaded.</p></td>
     <td><p>Use <code translate="no">sync</code> for vector indexes that are critical to search latency. In batch or low-frequency workloads, <code translate="no">disable</code> for faster segment readiness.</p></td>
   </tr>
</table>
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
    </button></h2><p>Warm Up only affects the initial load. If cached data is later evicted, the next query will reload it on demand.</p>
<ul>
<li><p>Avoid overusing <code translate="no">sync</code>. Preloading too many fields increases load time and cache pressure.</p></li>
<li><p>Start conservatively—enable Warm Up only for fields and indexes that are frequently accessed.</p></li>
<li><p>Monitor query latency and cache metrics, then expand preloading as needed.</p></li>
<li><p>For mixed workloads, apply <code translate="no">sync</code> to performance-sensitive collections and <code translate="no">disable</code> to capacity-oriented ones.</p></li>
</ul>
