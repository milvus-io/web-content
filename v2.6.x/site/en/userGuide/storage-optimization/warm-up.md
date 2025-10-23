---
id: warm-up.md
title: "Warm Up"
summary: "In Milvus, Warm Up complements Tiered Storage by alleviating first-hit latency that occurs when cold data is accessed for the first time. Once configured, Warm Up preloads selected types of fields or indexes into the cache before a segment becomes queryable, ensuring that frequently accessed data is available immediately after loading."
beta: Milvus 2.6.4+
---

# Warm Up

In Milvus, **Warm Up** complements Tiered Storage by alleviating first-hit latency that occurs when cold data is accessed for the first time. Once configured, Warm Up preloads selected types of fields or indexes into the cache before a segment becomes queryable, ensuring that frequently accessed data is available immediately after loading.

## Why warm up

[Lazy Load](tiered-storage-overview.md#Phase-1-Lazy-load) in Tiered Storage improves efficiency by loading only metadata initially. However, this can cause latency on the first query to cold data, since required chunks or indexes must be fetched from object storage.

**Warm Up** solves this problem by proactively caching critical data during segment initialization.

It is especially beneficial when:

- Certain scalar indexes are frequently used in filter conditions.

- Vector indexes are essential for search performance and must be ready immediately.

- Cold-start latency after QueryNode restart or new segment load is unacceptable.

In contrast, Warm Up is **not recommended** for fields or indexes queried infrequently. Disabling Warm Up shortens segment load time and conserves cache space—ideal for large vector fields or non-critical scalar fields.

## Configuration

Warm Up is controlled under `queryNode.segcore.tieredStorage.warmup` in `milvus.yaml`. You can configure it separately for scalar fields, scalar indexes, vector fields, and vector indexes. Each target supports two modes:

<table>
   <tr>
     <th><p>Mode</p></th>
     <th><p>Description</p></th>
     <th><p>Typical scenario</p></th>
   </tr>
   <tr>
     <td><p><code>sync</code></p></td>
     <td><p>Preload before the segment becomes queryable. Load time increases slightly, but the first query incurs no latency.</p></td>
     <td><p>Use for performance-critical data that must be immediately available, such as high-frequency scalar indexes or key vector indexes used in search.</p></td>
   </tr>
   <tr>
     <td><p><code>disable</code></p></td>
     <td><p>Skip preloading. The segment becomes queryable faster, but the first query may trigger on-demand loading.</p></td>
     <td><p>Use for infrequently accessed or large data such as raw vector fields or non-critical scalar fields.</p></td>
   </tr>
</table>

**Example YAML**:

```yaml
queryNode:
  segcore:
    tieredStorage:
      warmup:
        # options: sync, disable.
        # Specifies the timing for warming up the Tiered Storage cache.
        # - `sync`: data will be loaded into the cache before a segment is considered loaded.
        # - `disable`: data will not be proactively loaded into the cache, and loaded only if needed by search/query tasks.
        # Defaults to `sync`, except for vector field which defaults to `disable`.
        scalarField: sync
        scalarIndex: sync
        vectorField: disable # cache warmup for vector field raw data is by default disabled.
        vectorIndex: sync
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Values</p></th>
     <th><p>Description</p></th>
     <th><p>Recommended use case</p></th>
   </tr>
   <tr>
     <td><p><code>scalarField</code></p></td>
     <td><p><code>sync</code> | <code>disable</code></p></td>
     <td><p>Controls whether scalar field data is preloaded.</p></td>
     <td><p>Use <code>sync</code> only if scalar fields are small and accessed frequently in filters. Otherwise, <code>disable</code> to reduce load time.</p></td>
   </tr>
   <tr>
     <td><p><code>scalarIndex</code></p></td>
     <td><p><code>sync</code> | <code>disable</code></p></td>
     <td><p>Controls whether scalar indexes are preloaded.</p></td>
     <td><p>Use <code>sync</code> for scalar indexes involved in frequent filter conditions or range queries.</p></td>
   </tr>
   <tr>
     <td><p><code>vectorField</code></p></td>
     <td><p><code>sync</code> | <code>disable</code></p></td>
     <td><p>Controls whether vector field data is preloaded.</p></td>
     <td><p>Generally <code>disable</code> to avoid heavy cache use. Enable <code>sync</code> only when raw vectors must be retrieved immediately after search (for example, similarity results with vector recall).</p></td>
   </tr>
   <tr>
     <td><p><code>vectorIndex</code></p></td>
     <td><p><code>sync</code> | <code>disable</code></p></td>
     <td><p>Controls whether vector indexes are preloaded.</p></td>
     <td><p>Use <code>sync</code> for vector indexes that are critical to search latency. In batch or low-frequency workloads, <code>disable</code> for faster segment readiness.</p></td>
   </tr>
</table>

## Best practices

Warm Up only affects the initial load. If cached data is later evicted, the next query will reload it on demand.

- Avoid overusing `sync`. Preloading too many fields increases load time and cache pressure.

- Start conservatively—enable Warm Up only for fields and indexes that are frequently accessed.

- Monitor query latency and cache metrics, then expand preloading as needed.

- For mixed workloads, apply `sync` to performance-sensitive collections and `disable` to capacity-oriented ones.

