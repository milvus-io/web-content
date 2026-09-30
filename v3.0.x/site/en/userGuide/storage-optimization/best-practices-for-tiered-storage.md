---
id: best-practices-for-tiered-storage.md
title: "Best Practices for Tiered Storage"
summary: "Milvus provides Tiered Storage to help you efficiently handle large-scale data while balancing query latency, capacity, and resource usage. This guide summarizes recommended configurations for typical workloads and explains the reasoning behind each tuning strategy."
beta: Milvus 2.6.4+
---

# Best Practices for Tiered Storage

Milvus provides Tiered Storage to help you efficiently handle large-scale data while balancing query latency, capacity, and resource usage. This guide summarizes recommended configurations for typical workloads and explains the reasoning behind each tuning strategy.

## Before you start

- Milvus v2.6.4 or later

- QueryNodes must have dedicated local resources (memory and disk). Shared environments may distort cache estimation and lead to eviction misjudgment.

## Choose the right strategy

Tiered Storage offers flexible loading and caching strategies that can be combined to fit your workload.

<table>
   <tr>
     <th><p>Goal</p></th>
     <th><p>Recommended focus</p></th>
     <th><p>Key mechanism</p></th>
   </tr>
   <tr>
     <td><p>Minimize first-query latency</p></td>
     <td><p>Preload critical fields</p></td>
     <td><p>Warm Up</p></td>
   </tr>
   <tr>
     <td><p>Handle large-scale data efficiently</p></td>
     <td><p>Load on demand</p></td>
     <td><p>Lazy Load + Partial Load</p></td>
   </tr>
   <tr>
     <td><p>Maintain long-term stability</p></td>
     <td><p>Prevent cache overflow</p></td>
     <td><p>Eviction</p></td>
   </tr>
   <tr>
     <td><p>Balance performance and capacity</p></td>
     <td><p>Combine preload and dynamic caching</p></td>
     <td><p>Hybrid configuration</p></td>
   </tr>
</table>

## Scenario 1: real-time, low latency retrieval

**When to use**

- Query latency is critical (e.g., real-time recommendation or search ranking)

- Core vector indexes and scalar filters are accessed frequently

- Consistent performance matters more than startup speed

**Recommended configuration**

```yaml
# milvus.yaml
queryNode:
  segcore:
    tieredStorage:
      warmup:
        # scalar field/index warm-up to eliminate first-time latency
        scalarField: sync
        scalarIndex: sync
        # warm-up of vector fields is disabled (if the original vector is not required)
        vectorField: disable
        # vector indexes warm-up to elminate first-time latenct
        vectorIndex: sync
      # enable cache eviction, and also turn on background asynchronous eviction
      # to reduce the triggering of synchronous eviction.
      evictionEnabled: true
      backgroundEvictionEnabled: true
      memoryLowWatermarkRatio: 0.75
      memoryHighWatermarkRatio: 0.8
      diskLowWatermarkRatio: 0.75
      diskHighWatermarkRatio: 0.8
      # no expiration time, which avoids frequent reloading
      cacheTtl: 0
```

**Rationale**

- Warmup eliminates first-hit latency for high-frequency scalar and vector indexes.

- Background eviction maintains stable cache pressure without blocking queries.

- Disabling cache TTL avoids unnecessary reloads for hot data.

## Scenario 2: offline, batch analysis

**When to use**

- Query latency tolerance is high

- Workloads involve massive datasets or many segments

- Capacity and throughput are prioritized over responsiveness

**Recommended configuration**

```yaml
# milvus.yaml
queryNode:
  segcore:
    tieredStorage:
      enabled: true
      warmup:
        # disable scalar field/index warm-up to speed up loading
        scalarField: disable
        scalarIndex: disable
        # disable vector field/index warm-up to speed up loading
        vectorField: disable
        vectorIndex: disable
      # enable cache eviction, and also turn on background asynchronous eviction
      # to reduce the triggering of synchronous eviction.
      evictionEnabled: true
      backgroundEvictionEnabled: true
      memoryLowWatermarkRatio: 0.7
      memoryHighWatermarkRatio: 0.85
      diskLowWatermarkRatio: 0.7
      diskHighWatermarkRatio: 0.85
      # use 1 day expiration to clean unused cache
      cacheTtl: 86400
```

**Rationale**

- Disabling warm-up accelerates startup when initializing many segments.

- Higher watermarks allow denser cache usage, improving total load capacity.

- Cache TTL automatically cleans unused data to free local space.

## Scenario 3: hybrid deployment (mixed online + offline)

**When to use**

- A single cluster serves both online and analytical workloads

- Some collections require low latency, others prioritize capacity

**Recommended strategy**

- Apply **real-time configuration** to latency-sensitive collections

- Apply **offline configuration** to analytical or archival collections

- Adjust evictableMemoryCacheRatio, cacheTtl, and watermark ratios independently for each workload type

**Rationale**

Combining configurations allows fine-grained control of resource allocation.

Critical collections maintain low-latency guarantees, while secondary collections can handle more segments and data volume.

## Additional tuning tips

<table>
   <tr>
     <th><p>Aspect</p></th>
     <th><p>Recommendation</p></th>
     <th><p>Explanation</p></th>
   </tr>
   <tr>
     <td><p><strong>Warm Up scope</strong></p></td>
     <td><p>Only preload fields or indexes with high query frequency.</p></td>
     <td><p>Unnecessary preloading increases load time and resource use.</p></td>
   </tr>
   <tr>
     <td><p><strong>Eviction tuning</strong></p></td>
     <td><p>Start with default watermarks (75–80%) and adjust gradually.</p></td>
     <td><p>A small gap causes frequent eviction; a large gap delays resource release.</p></td>
   </tr>
   <tr>
     <td><p><strong>Cache TTL</strong></p></td>
     <td><p>Disable for stable hot datasets; enable (e.g., 1–3 days) for dynamic data.</p></td>
     <td><p>Prevents stale cache buildup while balancing cleanup overhead.</p></td>
   </tr>
   <tr>
     <td><p><strong>Overcommit ratio</strong></p></td>
     <td><p>Avoid values &gt; 0.7 unless resource headroom is large.</p></td>
     <td><p>Excessive overcommit may cause cache thrashing and unstable latency.</p></td>
   </tr>
   <tr>
     <td><p><strong>Monitoring</strong></p></td>
     <td><p>Track cache hit ratio, resource utilization, and eviction frequency.</p></td>
     <td><p>Frequent cold loads may indicate that warm-up or watermarks need adjustment.</p></td>
   </tr>
</table>

