---
id: tiered-storage-overview.md
title: "Tiered Storage Overview"
summary: "In Milvus, the traditional full-load mode requires each QueryNode to load all data fields and indexes of a segment at initialization, even data that may never be accessed. This ensures immediate data availability but often leads to wasted resources, including high memory usage, heavy disk activity, and significant I/O overhead, especially when handling large-scale datasets."
beta: Milvus 2.6.4+
---

# Tiered Storage Overview

In Milvus, the traditional *full-load* mode requires each QueryNode to load all data fields and indexes of a [segment](glossary.md#Segment) at initialization, even data that may never be accessed. This ensures immediate data availability but often leads to wasted resources, including high memory usage, heavy disk activity, and significant I/O overhead, especially when handling large-scale datasets.

*Tiered Storage* addresses this challenge by decoupling data caching from segment loading. Instead of loading all data at once, the QueryNode now loads only lightweight *metadata* initially and dynamically pulls or evicts field data on demand. This significantly reduces load time, optimizes local resource utilization, and enables QueryNodes to process datasets that far exceed their physical memory or disk capacity.

Consider enabling Tiered Storage in scenarios such as:

- Collections that exceed the available memory or NVMe capacity of a single QueryNode

- Analytical or batch workloads where faster loading is more important than the first-query latency

- Mixed workloads that can tolerate occasional cache misses for less frequently accessed data

<div class="alert note">

- *Metadata* includes schema, index definitions, chunk maps, row counts, and references to remote objects. This type of data is small, always cached, and never evicted.

- For more details on segments and chunks, refer to [Segment](glossary.md#Segment).

</div>

## How it works

Tiered Storage changes how QueryNode manages segment data. Instead of caching every field and index at load time, QueryNode now loads metadata only and uses a caching layer to fetch and evict data dynamically.

### Full-load mode vs. Tiered Storage mode

While both full-load and Tiered Storage modes handle the same data, they differ in *when* and *how* QueryNode caches these components.

- **Full-load mode**: At load time, QueryNode caches full collection data, including metadata, field data, and indexes, from object storage.

- **Tiered Storage mode**: At load time, QueryNode caches metadata only. Field data is pulled on demand at chunk granularity. Index files remain remote until the first query needs them; then the entire per-segment index is fetched and cached.

The diagram below shows these differences.

![Full Load Mode Vs Tiered Storage Mode](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/full-load-mode-vs-tiered-storage-mode.png)

### QueryNode loading workflow

Under Tiered Storage, the workflow of Tiered Storage has these phases:

![Querynode Load Workflow](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/querynode-load-workflow.png)

#### Phase 1: Lazy load

At initialization, Milvus performs a lazy load, caching only segment-level metadata such as schema definitions, index information, and chunk mappings.

No actual field data or index files are cached at this stage. This allows collections to become queryable almost immediately after startup while keeping memory and disk consumption minimal.

Because field data and index files remain in remote storage until first accessed, the *first query* may experience additional latency as required data must be fetched on demand. To mitigate this effect for critical fields or indexes, you can use the [Warm Up](tiered-storage-overview.md#Phase-2-Warm-up) strategy to proactively preload them before the segment becomes queryable.

**Configuration**

Automatically applied when Tiered Storage is enabled. No manual setting is required.

#### Phase 2: Warm up

To reduce the first-hit latency introduced by [lazy load](tiered-storage-overview.md#Phase-1-Lazy-load), Milvus provides a *Warm Up* mechanism.

Before a segment becomes queryable, Milvus can proactively fetch and cache specific fields or indexes from object storage, ensuring that the first query directly hits cached data instead of triggering on-demand loading.

During warmup, fields will be preloaded at the chunk level, while indexes will be preloaded at the segment level.

**Configuration**

Warmup can be configured at three levels:

- **Cluster level**: Define defaults in `milvus.yaml` that apply to all collections.

- **Collection level**: Override cluster defaults for a specific collection using SDK methods (`create_collection`, `alter_collection_properties`).

- **Field/Index level**: Fine-tune individual fields or indexes using SDK methods (`add_field`, `alter_collection_field`, `add_index`, `alter_index_properties`).

Higher-level settings override lower-level ones (Field/Index > Collection > Cluster). See [Warm Up](warm-up.md) for detailed configurations.

#### Phase 3: Partial load

Once queries or searches begin, the QueryNode performs a *partial load*, fetching only the required data chunks or index files from object storage.

- **Fields**: Loaded on demand at the **chunk level**. Only data chunks that match the current query conditions are fetched, minimizing I/O and memory use.

- **Indexes**: Loaded on demand at the **segment level**. Index files must be fetched as complete units and cannot be split across chunks.

**Configuration**

Partial load is automatically applied when Tiered Storage is enabled. No manual setting is required. To minimize first-hit latency for critical data, combine with [Warm Up](warm-up.md).

#### Phase 4: Eviction

To maintain healthy resource usage, Milvus automatically releases unused cached data when specific thresholds are reached.

Eviction follows a [Least Recently Used (LRU)](https://en.wikipedia.org/wiki/Cache_replacement_policies) policy, ensuring that infrequently accessed data is removed first while active data remains in cache.

Eviction is governed by the following configurable items:

- **Watermarks**: Define memory or disk thresholds that trigger and stop eviction.

- **Cache TTL**: Removes stale cached data after a defined duration of inactivity.

**Configuration**

Enable and tune eviction parameters in **milvus.yaml**. See [Eviction](eviction.md) for detailed configuration.

## Getting started

### Prerequisites

- Milvus 2.6.4+

- QueryNodes with dedicated memory and disk resources

- Object storage backend (S3, MinIO, etc.)

<div class="alert warning">

QueryNode resources should not be shared with other workloads. Shared resources can cause Tiered Storage to misjudge available capacity, leading to crashes.

</div>

### Basic configuration template

Edit the Milvus configuration file (`milvus.yaml`) to configure cluster-level Tiered Storage settings:

```yaml
# milvus.yaml
queryNode:
  segcore:
    tieredStorage:
      # Warm Up Configuration
      warmup:
        scalarField: sync      # Preload scalar field data
        scalarIndex: sync      # Preload scalar indexes
        vectorField: disable   # Don't preload vector field data (large)
        vectorIndex: sync      # Preload vector indexes
      
      # Eviction Configuration
      evictionEnabled: true
      backgroundEvictionEnabled: true
      
      # Memory Watermarks
      memoryLowWatermarkRatio: 0.75   # Stop evicting at 75%
      memoryHighWatermarkRatio: 0.80  # Start evicting at 80%
      
      # Disk Watermarks  
      diskLowWatermarkRatio: 0.75
      diskHighWatermarkRatio: 0.80
      
      # Cache TTL (7 days)
      cacheTtl: 604800
```

<div class="alert note">

This template defines cluster-level defaults. You can override warmup settings for specific collections or individual fields/indexes using the SDK. See [Warm Up](warm-up.md) for details.

</div>

### Next steps

1. **Configure Warm Up** - Optimize preloading for your access patterns. See [Warm Up](warm-up.md).

1. **Tune Eviction** - Set appropriate watermarks and TTL for your resource constraints. See [Eviction](eviction.md).

1. **Monitor Performance** - Track cache hit rates, eviction frequency, and query latency patterns.

1. **Iterate Configuration** - Adjust settings based on observed workload characteristics.

## FAQ

### Can I change Tiered Storage parameters at runtime?

It depends on the parameter type:

- **Warmup settings**: Collection-level and field/index-level warmup can be configured via SDK before loading the collection. Once the collection is loaded, you must release it first, alter the settings, then reload.

- **Eviction and watermark settings**: These must be set in `milvus.yaml` before starting Milvus. Changes require a restart to take effect.

### Does Tiered Storage affect data durability?

No. Data persistence is still handled by remote object storage. Tiered Storage only manages caching on QueryNodes.

### Will queries always be faster with Tiered Storage?

Not necessarily. Tiered Storage reduces load time and resource usage, but queries that touch uncached (cold) data may see higher latency. For latency-sensitive workloads, full-load mode is recommended.

### Why does a QueryNode still run out of resources even with Tiered Storage enabled?

Two common causes:

- The QueryNode was configured with too few resources. Watermarks are relative to available resources, so under-provisioning amplifies misjudgment.

- QueryNode resources are shared with other workloads, so Tiered Storage cannot correctly assess actual available capacity.

To resolve this, we recommend you allocate dedicated resources for QueryNodes.

### Why do some queries fail under high concurrency?

If too many queries hit hot data at the same time, QueryNode resource limits may still be exceeded. Some threads may fail due to resource reservation timeouts. Retrying after the load decreases, or allocating more resources, can resolve this.

### Why does search/query latency increase after enabling Tiered Storage?

Possible causes include:

- Frequent queries to cold data, which must be fetched from storage.

- Watermarks set too close together, causing frequent synchronous eviction.

