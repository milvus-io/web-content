---
id: warm-up.md
title: "Warm Up"
summary: "Warm Up complements Tiered Storage by preloading selected fields or indexes into the cache before a segment becomes queryable. You can configure warmup at the cluster, collection, or individual field/index level, allowing fine-grained control over first-query latency and resource usage."
beta: Milvus 2.6.4+
---

# Warm Up

**Warm Up** complements Tiered Storage by preloading selected fields or indexes into the cache before a segment becomes queryable. You can configure warmup at the cluster, collection, or individual field/index level, allowing fine-grained control over first-query latency and resource usage.

## Why warm up

[Lazy Load](tiered-storage-overview.md#Phase-1-Lazy-load) in Tiered Storage improves efficiency by loading only metadata initially. However, this can cause latency on the first query to cold data, since required chunks or indexes must be fetched from remote storage.

**Warm Up** solves this problem by proactively caching critical data during segment initialization.

It is especially beneficial when:

- Certain scalar indexes are frequently used in filter conditions.

- Vector indexes are essential for search performance and must be ready immediately.

- Cold-start latency after QueryNode restart or new segment load is unacceptable.

In contrast, Warm Up is **not recommended** for fields or indexes that are queried infrequently. Disabling Warm Up shortens segment load time and conserves cache space—ideal for large vector fields or non-critical scalar fields.

## Configuration levels

<table>
   <tr>
     <th><p><strong>Level</strong></p></th>
     <th><p><strong>Scope</strong></p></th>
     <th><p><strong>Configuration method</strong></p></th>
     <th><p><strong>Priority</strong></p></th>
   </tr>
   <tr>
     <td><p>Field/Index</p></td>
     <td><p>Single field or index</p></td>
     <td><p>SDK methods: </p><ul><li><p><code>add_field()</code></p></li><li><p><code>alter_collection_field()</code></p></li><li><p><code>add_index()</code></p></li><li><p><code>alter_index_properties()</code></p></li></ul></td>
     <td><p>Highest</p></td>
   </tr>
   <tr>
     <td><p>Collection</p></td>
     <td><p>All fields/indexes in a collection</p></td>
     <td><p>SDK methods:</p><ul><li><p><code>create_collection()</code></p></li><li><p><code>alter_collection_properties()</code></p></li></ul></td>
     <td><p>Medium</p></td>
   </tr>
   <tr>
     <td><p>Cluster</p></td>
     <td><p>All collections in the cluster</p></td>
     <td><p><code>milvus.yaml</code> config file</p></td>
     <td><p>Lowest (default)</p></td>
   </tr>
</table>

**Override behavior:**

- If a field has its own warmup setting, that setting takes precedence over collection-level and cluster-level settings.

- If no field- or index-level setting exists, the collection-level setting applies.

- If neither field- or index-level nor collection-level settings exist, the cluster-level applies.

- When using alter operations, the most recent alter value takes effect.

## Configure warmup at cluster level

Cluster-level warmup is configured in the Milvus configuration file `milvus.yaml` and applies to all collections in the cluster. This serves as the baseline default.

Each target type supports two settings:

<table>
   <tr>
     <th><p>Warmup Setting</p></th>
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
     <th><p>Warmup Setting</p></th>
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

## Configure warmup at collection level | Milvus 2.6.11+

Collection-level warmup allows you to override cluster defaults for a specific collection. This is useful when a collection has different access patterns than the cluster-wide baseline.

### Set warmup when creating a collection

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

client.create_collection(
    collection_name="my_collection",
    schema=schema,
    # highlight-start
    properties={
        "warmup.scalarField": "sync",
        "warmup.scalarIndex": "sync",
        "warmup.vectorField": "disable",
        "warmup.vectorIndex": "sync"
    }
    # highlight-end
)
```

### Alter warmup settings on an existing collection

You must alter collection properties before calling `load()`. Altering a loaded collection returns an error. Changes to warmup settings take effect the next time you load the collection.

```python
client.alter_collection_properties(
    collection_name="my_collection",
    properties={
        "warmup.vectorIndex": "disable",
        "warmup.scalarField": "sync"
    }
)
```

**Property reference**:

<table>
   <tr>
     <th><p><strong>Property</strong></p></th>
     <th><p><strong>Warmup Setting</strong></p></th>
     <th><p><strong>Description</strong></p></th>
   </tr>
   <tr>
     <td><p><code>warmup.scalarField</code></p></td>
     <td><p><code>sync</code> | <code>disable</code></p></td>
     <td><p>Warmup setting for all scalar fields in the collection.</p></td>
   </tr>
   <tr>
     <td><p><code>warmup.scalarIndex</code></p></td>
     <td><p><code>sync</code> | <code>disable</code></p></td>
     <td><p>Warmup setting for all scalar indexes in the collection.</p></td>
   </tr>
   <tr>
     <td><p><code>warmup.vectorField</code></p></td>
     <td><p><code>sync</code> | <code>disable</code></p></td>
     <td><p>Warmup setting for all vector fields in the collection.</p></td>
   </tr>
   <tr>
     <td><p><code>warmup.vectorIndex</code></p></td>
     <td><p><code>sync</code> | <code>disable</code></p></td>
     <td><p>Warmup setting for all vector indexes in the collection.</p></td>
   </tr>
</table>

## Configure warmup at field level | Milvus 2.6.11+

Field-level warmup provides the finest granularity, allowing you to control warmup behavior for individual fields. This is useful when specific fields have unique access patterns.

Field-level warmup applies to **field raw data only**, not to indexes on that field. To configure warmup for an index, use [index-level configuration](https://file+.vscode-resource.vscode-cdn.net/Users/liyun/writingLab/3.0-milvus/warm-up/output/warm-up.md#Configure-warmup-at-index-level).

### Set warmup when creating a field

```python
from pymilvus import MilvusClient, DataType

schema = MilvusClient.create_schema()

schema.add_field(
    field_name="id",
    datatype=DataType.INT64,
    is_primary=True
)

schema.add_field(
    field_name="category",
    datatype=DataType.VARCHAR,
    max_length=128,
    warmup="sync"  # Preload this field at load time
)

schema.add_field(
    field_name="embedding",
    datatype=DataType.FLOAT_VECTOR,
    dim=768,
    warmup="disable"  # Do not preload vector raw data
)
```

### Alter warmup settings on an existing field

You must alter field settings before calling `load()`. Altering a field on a loaded collection returns an error. Changes to warmup settings take effect the next time you load the collection.

```python
client.alter_collection_field(
    collection_name="my_collection",
    field_name="category",
    field_params={"warmup": "sync"}
)
```

## Configure warmup at index level | Milvus 2.6.11+

Index-level warmup allows you to control preloading for individual indexes, independent of the underlying field's warmup setting.

### Set warmup when creating an index

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

index_params = client.prepare_index_params()

index_params.add_index(
    field_name="embedding",
    index_type="HNSW",
    metric_type="COSINE",
    params={
        "M": 16,
        "efConstruction": 256,
        "warmup": "sync"  # Preload this index at load time
    }
)

index_params.add_index(
    field_name="category",
    index_type="AUTOINDEX",
    params={"warmup": "disable"}  # Do not preload this index
)

client.create_index(
    collection_name="my_collection",
    index_params=index_params
)
```

### Alter warmup settings on an existing index

You must alter index settings before calling `load()`. Altering an index on a loaded collection returns an error. Changes to warmup settings take effect the next time you load the collection.

```python
client.alter_index_properties(
    collection_name="my_collection",
    index_name="embedding",
    properties={"warmup": "sync"}
)
```

## Warmup behavior reference

The following table summarizes warmup behavior at different stages of the segment lifecycle.

<table>
   <tr>
     <th><p><strong>Warmup Setting</strong></p></th>
     <th><p><strong>Load Phase</strong></p></th>
     <th><p><strong>Search/Query Phase</strong></p></th>
     <th><p><strong>Release Phase</strong></p></th>
   </tr>
   <tr>
     <td><p><code>sync</code></p></td>
     <td><p>Data is loaded to local storage. Destination (disk or memory) depends on mmap setting.</p></td>
     <td><p>Query hits local cache directly.</p></td>
     <td><p>Local cached data is cleared.</p></td>
   </tr>
   <tr>
     <td><p><code>disable</code></p></td>
     <td><p>Data is not loaded to local storage.</p></td>
     <td><p>Data is fetched on demand from object storage, then cached locally based on mmap setting.</p></td>
     <td><p>Local cached data is cleared.</p></td>
   </tr>
</table>

**Interaction with mmap:**

<table>
   <tr>
     <th><p><strong>Warmup Setting</strong></p></th>
     <th><p><strong>Mmap Enabled</strong></p></th>
     <th><p><strong>Data Location</strong></p></th>
   </tr>
   <tr>
     <td><p><code>sync</code></p></td>
     <td><p><code>true</code></p></td>
     <td><p>Local disk (<code>localStorage.path/cache/...</code>)</p></td>
   </tr>
   <tr>
     <td><p><code>sync</code></p></td>
     <td><p><code>false</code></p></td>
     <td><p>Local memory</p></td>
   </tr>
   <tr>
     <td><p><code>disable</code></p></td>
     <td><p><code>true</code></p></td>
     <td><p>Fetched to local disk on first access</p></td>
   </tr>
   <tr>
     <td><p><code>disable</code></p></td>
     <td><p><code>false</code></p></td>
     <td><p>Fetched to local memory on first access</p></td>
   </tr>
</table>

**Local cache directory structure (when mmap is enabled):**

<table>
   <tr>
     <th><p><strong>Data Type</strong></p></th>
     <th><p><strong>Directory Path</strong></p></th>
   </tr>
   <tr>
     <td><p>Scalar/Vector field data</p></td>
     <td><p><code>localStorage.path/cache/&lt;collection_id&gt;/local_chunk/...</code></p></td>
   </tr>
   <tr>
     <td><p>Scalar/Vector index files</p></td>
     <td><p><code>localStorage.path/cache/&lt;collection_id&gt;/local_chunk/index_files/...</code></p></td>
   </tr>
</table>

## Best practices

Warm Up only affects the initial load. If cached data is later evicted, the next query will reload it on demand.

- Avoid overusing `sync`. Preloading too many fields increases load time and cache pressure.

- Start conservatively—enable Warm Up only for fields and indexes that are frequently accessed.

- Monitor query latency and cache metrics, then expand preloading as needed.

- For mixed workloads, apply `sync` to performance-sensitive collections and `disable` to capacity-oriented ones.

