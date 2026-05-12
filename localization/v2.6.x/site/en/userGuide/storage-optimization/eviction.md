---
id: eviction.md
title: Eviction
summary: >-
  Eviction manages the cache resources of each QueryNode in Milvus. When
  enabled, it automatically removes cached data once resource thresholds are
  reached, ensuring stable performance and preventing memory or disk exhaustion.
beta: Milvus 2.6.4+
---
<h1 id="Eviction" class="common-anchor-header">Eviction<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Eviction" class="anchor-icon" translate="no">
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
    </button></h1><p>Eviction manages the cache resources of each QueryNode in Milvus. When enabled, it automatically removes cached data once resource thresholds are reached, ensuring stable performance and preventing memory or disk exhaustion.</p>
<p>Eviction uses a <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">Least Recently Used (LRU)</a> policy to reclaim cache space. Metadata is always cached and never evicted, as it is essential for query planning and typically small.</p>
<div class="alert note">
<p>Eviction must be explicitly enabled. Without configuration, cached data will continue to accumulate until resources are depleted.</p>
</div>
<h2 id="Eviction-types" class="common-anchor-header">Eviction types<button data-href="#Eviction-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supports two complementary eviction modes (<strong>sync</strong> and <strong>async</strong>) that work together for optimal resource management:</p>
<table>
   <tr>
     <th><p>Aspect</p></th>
     <th><p>Sync Eviction</p></th>
     <th><p>Async Eviction</p></th>
   </tr>
   <tr>
     <td><p>Trigger</p></td>
     <td><p>Occurs during query or search when memory or disk usage exceeds internal limits.</p></td>
     <td><p>Triggered by a background thread when usage exceeds the high watermark or when cached data reaches its time-to-live (TTL).</p></td>
   </tr>
   <tr>
     <td><p>Behavior</p></td>
     <td><p>Query or search operations pause temporarily while the QueryNode reclaims cache space. Eviction continues until usage drops below the low watermark or a timeout occurs. If timeout is reached and insufficient data can be reclaimed, the query or search may fail.</p></td>
     <td><p>Runs periodically in the background, proactively evicting cached data when usage exceeds the high watermark or when data expires based on TTL. Eviction continues until usage drops below the low watermark. Queries are not blocked.</p></td>
   </tr>
   <tr>
     <td><p>Best For</p></td>
     <td><p>Workloads that can tolerate brief latency spikes or temporary pauses during peak usage. Useful when async eviction cannot reclaim space fast enough.</p></td>
     <td><p>Latency-sensitive workloads that require smooth and predictable query performance. Ideal for proactive resource management.</p></td>
   </tr>
   <tr>
     <td><p>Cautions</p></td>
     <td><p>Can cause short query delays or timeouts if insufficient evictable data is available.</p></td>
     <td><p>Requires properly tuned high/low watermarks and TTL settings. Slight overhead from the background thread.</p></td>
   </tr>
   <tr>
     <td><p>Configuration</p></td>
     <td><p>Enabled via <code translate="no">evictionEnabled: true</code></p></td>
     <td><p>Enabled via <code translate="no">backgroundEvictionEnabled: true</code> (requires <code translate="no">evictionEnabled: true</code> at the same time)</p></td>
   </tr>
</table>
<p><strong>Recommended setup</strong>:</p>
<ul>
<li><p>Both eviction modes can be enabled together for optimal balance, provided your workload benefits from Tiered Storage and can tolerate eviction-related fetch latency.</p></li>
<li><p>For performance testing or latency-critical scenarios, consider disabling eviction entirely to avoid network fetch overhead after eviction.</p></li>
</ul>
<div class="alert note">
<p>For evictable fields and indexes, the eviction unit matches the loading granularity—scalar/vector fields are evicted by chunk, and scalar/vector indexes are evicted by segment.</p>
</div>
<h2 id="Enable-eviction" class="common-anchor-header">Enable eviction<button data-href="#Enable-eviction" class="anchor-icon" translate="no">
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
    </button></h2><p>Configure eviction under <code translate="no">queryNode.segcore.tieredStorage</code> in <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>             <span class="hljs-comment"># Enables synchronous eviction</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>   <span class="hljs-comment"># Enables background (asynchronous) eviction</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Type</p></th>
     <th><p>Values</p></th>
     <th><p>Description</p></th>
     <th><p>Recommended use case</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">evictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>Master switch for eviction strategy. Defaults to <code translate="no">false</code>. Enables sync eviction mode.</p></td>
     <td><p>Always set to <code translate="no">true</code> in Tiered Storage.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">backgroundEvictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>Run eviction asynchronously in the background. Requires <code translate="no">evictionEnabled: true</code>. Defaults to <code translate="no">false</code>.</p></td>
     <td><p>Use <code translate="no">true</code> for smoother query performance; it reduces sync eviction frequency.</p></td>
   </tr>
</table>
<h2 id="Configure-watermarks" class="common-anchor-header">Configure watermarks<button data-href="#Configure-watermarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Watermarks define when cache eviction begins and ends for both memory and disk. Each resource type has two thresholds:</p>
<ul>
<li><p><strong>High watermark</strong>: Eviction starts when usage exceeds this value.</p></li>
<li><p><strong>Low watermark</strong>: Eviction continues until usage falls below this value.</p></li>
</ul>
<div class="alert note">
<p>This configuration takes effect only when <a href="/docs/v2.6.x/eviction.md#Enable-eviction">eviction is enabled</a>.</p>
</div>
<p><strong>Example YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Memory watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>    <span class="hljs-comment"># Eviction stops below 75% memory usage</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>    <span class="hljs-comment"># Eviction starts above 80% memory usage</span>

      <span class="hljs-comment"># Disk watermarks</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>      <span class="hljs-comment"># Eviction stops below 75% disk usage</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>      <span class="hljs-comment"># Eviction starts above 80% disk usage</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Type</p></th>
     <th><p>Range</p></th>
     <th><p>Description</p></th>
     <th><p>Recommended use case</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">memoryLowWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Memory usage level where eviction stops.</p></td>
     <td><p>Start at <code translate="no">0.75</code>. Lower slightly if QueryNode memory is limited.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryHighWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Memory usage level where async eviction starts.</p></td>
     <td><p>Start at <code translate="no">0.8</code>. Keep a sensible gap from low watermark (e.g., 0.05–0.10) to prevent frequent triggers.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskLowWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Disk usage level where eviction stops.</p></td>
     <td><p>Start at <code translate="no">0.75</code>. Adjust lower if disk I/O is limited.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskHighWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Disk usage level where async eviction starts.</p></td>
     <td><p>Start at <code translate="no">0.8</code>. Keep a sensible gap from low watermark (e.g., 0.05–0.10) to prevent frequent triggers.</p></td>
   </tr>
</table>
<p><strong>Best practices</strong>:</p>
<ul>
<li><p>Do not set high or low watermarks above ~0.80 to leave headroom for QueryNode static usage and query-time bursts.</p></li>
<li><p>Avoid large gaps between high and low watermarks; big gaps prolong each eviction cycle and can add latency.</p></li>
</ul>
<h2 id="Configure-cache-TTL" class="common-anchor-header">Configure cache TTL<button data-href="#Configure-cache-TTL" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Cache Time-to-Live (TTL)</strong> automatically removes cached data after a set duration, even if resource thresholds are not reached. It works alongside LRU eviction to prevent stale data from occupying cache indefinitely.</p>
<div class="alert note">
<p>Cache TTL requires <code translate="no">backgroundEvictionEnabled: true</code>, as it runs on the same background thread.</p>
</div>
<p><strong>Example YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Set the cache expiration time to 604,800 seconds (7 days),</span>
      <span class="hljs-comment"># and expired caches will be cleaned up by a background thread.</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Type</p></th>
     <th><p>Unit</p></th>
     <th><p>Description</p></th>
     <th><p>Recommended use case</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">cacheTtl</code></p></td>
     <td><p>integer</p></td>
     <td><p>seconds</p></td>
     <td><p>Duration before cached data expires. Expired items are removed in the background.</p></td>
     <td><p>Use a short TTL (hours) for highly dynamic data; use a long TTL (days) for stable datasets. Set 0 to disable time-based expiration.</p></td>
   </tr>
</table>
