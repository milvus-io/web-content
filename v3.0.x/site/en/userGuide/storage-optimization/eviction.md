---
id: eviction.md
title: "Eviction"
summary: "Eviction manages the cache resources of each QueryNode in Milvus. When enabled, it automatically removes cached data once resource thresholds are reached, ensuring stable performance and preventing memory or disk exhaustion."
beta: Milvus 2.6.4+
---

# Eviction

Eviction manages the cache resources of each QueryNode in Milvus. When enabled, it automatically removes cached data once resource thresholds are reached, ensuring stable performance and preventing memory or disk exhaustion.

Eviction uses a [Least Recently Used (LRU)](https://en.wikipedia.org/wiki/Cache_replacement_policies) policy to reclaim cache space. Metadata is always cached and never evicted, as it is essential for query planning and typically small.

<div class="alert note">

Eviction must be explicitly enabled. Without configuration, cached data will continue to accumulate until resources are depleted.

</div>

## Eviction types

Milvus supports two complementary eviction modes (**sync** and **async**) that work together for optimal resource management:

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
     <td><p>Enabled via <code>evictionEnabled: true</code></p></td>
     <td><p>Enabled via <code>backgroundEvictionEnabled: true</code> (requires <code>evictionEnabled: true</code> at the same time)</p></td>
   </tr>
</table>

**Recommended setup**:

- Both eviction modes can be enabled together for optimal balance, provided your workload benefits from Tiered Storage and can tolerate eviction-related fetch latency.

- For performance testing or latency-critical scenarios, consider disabling eviction entirely to avoid network fetch overhead after eviction.

<div class="alert note">

For evictable fields and indexes, the eviction unit matches the loading granularity—scalar/vector fields are evicted by chunk, and scalar/vector indexes are evicted by segment.

</div>

## Enable eviction

Configure eviction under `queryNode.segcore.tieredStorage` in `milvus.yaml`:

```yaml
queryNode:
  segcore:
    tieredStorage:
      evictionEnabled: true             # Enables synchronous eviction
      backgroundEvictionEnabled: true   # Enables background (asynchronous) eviction
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Type</p></th>
     <th><p>Values</p></th>
     <th><p>Description</p></th>
     <th><p>Recommended use case</p></th>
   </tr>
   <tr>
     <td><p><code>evictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code>true</code>/<code>false</code></p></td>
     <td><p>Master switch for eviction strategy. Defaults to <code>false</code>. Enables sync eviction mode.</p></td>
     <td><p>Always set to <code>true</code> in Tiered Storage.</p></td>
   </tr>
   <tr>
     <td><p><code>backgroundEvictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code>true</code>/<code>false</code></p></td>
     <td><p>Run eviction asynchronously in the background. Requires <code>evictionEnabled: true</code>. Defaults to <code>false</code>.</p></td>
     <td><p>Use <code>true</code> for smoother query performance; it reduces sync eviction frequency.</p></td>
   </tr>
</table>

## Configure watermarks

Watermarks define when cache eviction begins and ends for both memory and disk. Each resource type has two thresholds:

- **High watermark**: Eviction starts when usage exceeds this value.

- **Low watermark**: Eviction continues until usage falls below this value.

<div class="alert note">

This configuration takes effect only when [eviction is enabled](eviction.md#Enable-eviction).

</div>

**Example YAML**:

```yaml
queryNode:
  segcore:
    tieredStorage:
      # Memory watermarks
      memoryLowWatermarkRatio: 0.75    # Eviction stops below 75% memory usage
      memoryHighWatermarkRatio: 0.8    # Eviction starts above 80% memory usage

      # Disk watermarks
      diskLowWatermarkRatio: 0.75      # Eviction stops below 75% disk usage
      diskHighWatermarkRatio: 0.8      # Eviction starts above 80% disk usage
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Type</p></th>
     <th><p>Range</p></th>
     <th><p>Description</p></th>
     <th><p>Recommended use case</p></th>
   </tr>
   <tr>
     <td><p><code>memoryLowWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Memory usage level where eviction stops.</p></td>
     <td><p>Start at <code>0.75</code>. Lower slightly if QueryNode memory is limited.</p></td>
   </tr>
   <tr>
     <td><p><code>memoryHighWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Memory usage level where async eviction starts.</p></td>
     <td><p>Start at <code>0.8</code>. Keep a sensible gap from low watermark (e.g., 0.05–0.10) to prevent frequent triggers.</p></td>
   </tr>
   <tr>
     <td><p><code>diskLowWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Disk usage level where eviction stops.</p></td>
     <td><p>Start at <code>0.75</code>. Adjust lower if disk I/O is limited.</p></td>
   </tr>
   <tr>
     <td><p><code>diskHighWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Disk usage level where async eviction starts.</p></td>
     <td><p>Start at <code>0.8</code>. Keep a sensible gap from low watermark (e.g., 0.05–0.10) to prevent frequent triggers.</p></td>
   </tr>
</table>

**Best practices**:

- Do not set high or low watermarks above ~0.80 to leave headroom for QueryNode static usage and query-time bursts.

- Avoid large gaps between high and low watermarks; big gaps prolong each eviction cycle and can add latency.

## Configure cache TTL

**Cache Time-to-Live (TTL)** automatically removes cached data after a set duration, even if resource thresholds are not reached. It works alongside LRU eviction to prevent stale data from occupying cache indefinitely.

<div class="alert note">

Cache TTL requires `backgroundEvictionEnabled: true`, as it runs on the same background thread.

</div>

**Example YAML**:

```yaml
queryNode:
  segcore:
    tieredStorage:
      evictionEnabled: true
      backgroundEvictionEnabled: true
      # Set the cache expiration time to 604,800 seconds (7 days),
      # and expired caches will be cleaned up by a background thread.
      cacheTtl: 604800
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Type</p></th>
     <th><p>Unit</p></th>
     <th><p>Description</p></th>
     <th><p>Recommended use case</p></th>
   </tr>
   <tr>
     <td><p><code>cacheTtl</code></p></td>
     <td><p>integer</p></td>
     <td><p>seconds</p></td>
     <td><p>Duration before cached data expires. Expired items are removed in the background.</p></td>
     <td><p>Use a short TTL (hours) for highly dynamic data; use a long TTL (days) for stable datasets. Set 0 to disable time-based expiration.</p></td>
   </tr>
</table>
