---
id: json-shredding.md
title: "JSON Shredding"
summary: "Learn how JSON shredding accelerates queries on JSON fields, how to configure it, and which limitations apply."
beta: Milvus 2.6.2+
---

# JSON Shredding

JSON shredding accelerates queries on JSON fields by organizing JSON values into columnar data and building auxiliary indexes in the background. Queries can access the values they need without parsing each complete JSON document. You continue to use the same JSON fields and filter expressions.

JSON shredding supports JSON fields in both managed and external collections, using the same configuration. For external collection prerequisites and setup, see [Create an External Collection](create-an-external-collection.md).

JSON shredding is effective for most JSON query scenarios. The performance benefits become more pronounced with:

- **Larger, more complex JSON documents** - Greater performance gains as document size increases

- **Read-heavy workloads** - Frequent filtering, sorting, or searching on JSON keys

- **Mixed query patterns** - Queries across different JSON keys benefit from the hybrid storage approach

## How it works

The JSON shredding process happens in three distinct phases to optimize data for fast retrieval.

<a id="Phase-1-Ingestion--key-classification"></a>

### Phase 1: Key classification

Milvus analyzes JSON data in the background to build statistics for each JSON key. This analysis includes the key's occurrence ratio and type stability (whether its data type is consistent across documents).

Based on these statistics, JSON keys are categorized into the following for optimal storage.

#### Categories of JSON keys

<table>
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

#### Example classification

Consider the sample JSON data containing the following JSON keys:

```json
{"a": 10, "b": "str1", "f": 1}
{"a": 20, "b": "str2", "f": 2}  
{"a": 30, "b": "str3", "f": 3}
{"a": 40, "b": 1, "f": 4}       // b becomes mixed type
{"a": 50, "b": 2, "e": "rare"}  // e appears infrequently
```

Based on this data, the keys would be classified as follows:

- **Typed keys**: `a` and `f` (always an integer)

- **Dynamic keys**: `b` (mixed string/integer)

- **Shared keys**: `e` (infrequently appearing key)

### Phase 2: Storage optimization

The classification from [Phase 1](json-shredding.md#Phase-1-Key-classification) dictates the storage layout. Milvus uses a columnar format optimized for queries. The shredded data and auxiliary indexes require additional storage.

![Json Shredding Flow](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/json-shredding-flow.png)

- **Shredded columns**: For **typed** and **dynamic** **keys**, data is written to dedicated columns. This columnar storage allows for fast, direct scans during queries, as Milvus can read only the required data for a given key without processing the entire document.

- **Shared column**: All **shared keys** are stored together in a single, compact binary JSON column. A shared-key **inverted index** is built on this column. This index is crucial for accelerating queries on low-frequency keys by allowing Milvus to quickly prune the data, effectively narrowing down the search space to only those rows that contain the specified key.

### Phase 3: Query execution

The final phase leverages the optimized storage layout to intelligently select the fastest path for each query predicate.

- **Fast path**: Queries on typed/dynamic keys (e.g., `json['a'] < 100`) access dedicated columns directly

- **Optimized path**: Queries on shared keys (e.g., `json['e'] = 'rare'`) use inverted index to quickly locate relevant documents

JSON shredding does not accelerate values inside arrays. Use [JSON path indexes](json-indexing.md) with array cast types for those queries.

## Enable JSON shredding

JSON shredding is enabled by default in Milvus 3.0. The following settings in `milvus.yaml` control whether Milvus builds and loads shredded data, and whether queries use it:

```yaml
common:
  enabledJSONShredding: true       # Build and load JSON shredding data
  usingJSONShreddingForQuery: true # Use shredded data during queries
```

If your deployment has disabled either setting, set it to `true` and apply the change through the configuration-update workflow supported by your deployment. Editing the file alone does not ensure that the running deployment has received the change.

Milvus automatically builds shredding data for eligible segments in the background. Building and loading take time; enabling the feature does not mean that all JSON data is immediately accelerated. You do not need to create a JSON path index to use shredding or change your query syntax. For verification steps, see the [FAQ](json-shredding.md#FAQ).

## Parameter tuning

For most users, once JSON shredding is enabled, the default settings for other parameters are sufficient. However, you can fine-tune the behavior of JSON shredding using these parameters in `milvus.yaml`.

<table>
   <tr>
     <th><p>Parameter Name</p></th>
     <th><p>Description</p></th>
     <th><p>Default Value</p></th>
     <th><p>Tuning Advice</p></th>
   </tr>
   <tr>
     <td><p><code>common.enabledJSONShredding</code></p></td>
     <td><p>Controls whether the JSON shredding build and load processes are enabled.</p></td>
     <td><p>true</p></td>
     <td><p>Keep enabled to allow Milvus to build and load shredding data.</p></td>
   </tr>
   <tr>
     <td><p><code>common.usingJSONShreddingForQuery</code></p></td>
     <td><p>Controls whether Milvus uses shredded data for acceleration.</p></td>
     <td><p>true</p></td>
     <td><p>Set to <strong>false</strong> as a recovery measure if queries fail, reverting to the original query path.</p></td>
   </tr>
   <tr>
     <td><p><code>queryNode.mmap.jsonShredding</code></p></td>
     <td><p>Determines whether Milvus uses mmap when loading shredding data.</p><p>For details, refer to <a href="mmap.md">Use mmap</a>.</p></td>
     <td><p>true</p></td>
     <td><p>This setting is generally optimized for performance. Only adjust it if you have specific memory management needs or constraints on your system.</p></td>
   </tr>
   <tr>
     <td><p><code>dataCoord.jsonShreddingMaxColumns</code></p></td>
     <td><p>The maximum number of JSON keys that will be stored in shredded columns. </p><p>If the number of frequently appearing keys exceeds this limit, Milvus will prioritize the most frequent ones for shredding, and the remaining keys will be stored in the shared column.</p></td>
     <td><p>1024</p></td>
     <td><p>This is sufficient for most scenarios. For JSON with thousands of frequently appearing keys, you may need to increase this, but monitor storage usage.</p></td>
   </tr>
   <tr>
     <td><p><code>dataCoord.jsonShreddingRatioThreshold</code></p></td>
     <td><p>The minimum occurrence ratio a JSON key must have to be considered for shredding into a shredded column.</p><p>A key is considered frequently appearing if its ratio is above this threshold.</p></td>
     <td><p>0.3</p></td>
     <td><p><strong>Increase</strong> (e.g., to 0.5) if the number of keys that meet the shredding criteria exceeds the <code>dataCoord.jsonShreddingMaxColumns</code> limit. This makes the threshold stricter, reducing the number of keys that qualify for shredding.</p><p><strong>Decrease</strong> (e.g., to 0.1) if you want to shred more keys that appear less frequently than the default 30% threshold.</p></td>
   </tr>
</table>

## Performance benchmarks

The following benchmark measures JSON query performance with and without shredding for the dataset and environment described below. Results vary with the data, deployment, and query workload.

### Test environment and methodology

- **Hardware**: 1 core/8GB cluster

- **Dataset**: 1 million documents from [JSONBench](https://github.com/ClickHouse/JSONBench.git)

- **Average document size**: 478.89 bytes

- **Test duration**: 100 seconds measuring QPS and latency

### Results: typed keys

This test measured performance when querying a key present in most documents.

<table>
   <tr>
     <th><p>Query Expression</p></th>
     <th><p>Key Value Type</p></th>
     <th><p>QPS (without shredding)</p></th>
     <th><p>QPS (with shredding)</p></th>
     <th><p>Performance Boost</p></th>
   </tr>
   <tr>
     <td><p><code>json['time_us'] &gt; 0</code></p></td>
     <td><p>Integer</p></td>
     <td><p>8.69</p></td>
     <td><p>287.50</p></td>
     <td><p>33x</p></td>
   </tr>
   <tr>
     <td><p><code>json['kind'] == 'commit'</code></p></td>
     <td><p>String</p></td>
     <td><p>8.42</p></td>
     <td><p>126.1</p></td>
     <td><p>14.9x</p></td>
   </tr>
</table>

### Results: shared keys

This test focused on querying sparse, nested keys that fall into the "shared" category.

<table>
   <tr>
     <th><p>Query Expression</p></th>
     <th><p>Key Value Type</p></th>
     <th><p>QPS (without shredding)</p></th>
     <th><p>QPS (with shredding)</p></th>
     <th><p>Performance Boost</p></th>
   </tr>
   <tr>
     <td><p><code>json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>Nested Integer</p></td>
     <td><p>4.33</p></td>
     <td><p>385</p></td>
     <td><p>88.9x</p></td>
   </tr>
   <tr>
     <td><p><code>json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>Nested String</p></td>
     <td><p>7.6</p></td>
     <td><p>352</p></td>
     <td><p>46.3x</p></td>
   </tr>
</table>

### Key insights

- In this benchmark, **shared key queries** achieved up to 89x higher QPS.

- **Typed key queries** achieved approximately 15–33x higher QPS.

- Benchmark your own workload to evaluate the performance benefit and additional storage usage.

## FAQ

- **How do I verify if JSON shredding works properly?**

    Check both build and load status. A successful JSON query alone does not show whether it used shredded data. Use a [Birdwatcher](birdwatcher_usage_guides.md) version compatible with your Milvus deployment, connect to its etcd metadata, and run the following commands in Birdwatcher. Replace `<collection_id>` with the numeric collection ID.

    1. Check which segments have built JSON stats:

        ```text
        show json-stats --collection <collection_id>
        ```

        The output lists JSON stats for each field with built stats, including the version, file count, and memory size.

    1. After loading the collection, check whether query nodes have loaded the JSON stats:

        ```text
        show loaded-json-stats --collection <collection_id>
        ```

        The output reports loaded JSON stats by query node, segment, and field. Check that the expected segments and JSON fields have loaded stats.

- **What if I encounter an error?**

    If the build or load process fails, you can quickly disable the feature by setting `common.enabledJSONShredding=false`. To clear any remaining tasks, use the `remove stats-task <task_id>` command in [Birdwatcher](birdwatcher_usage_guides.md). If a query fails, set `common.usingJSONShreddingForQuery=false` to revert to the original query path, bypassing the shredded data.

- **How do I select between JSON shredding and JSON indexing?**

    - **JSON shredding** is ideal for keys that appear frequently in your documents, especially for complex JSON structures. It combines the benefits of columnar storage and inverted indexing, making it well-suited for read-heavy scenarios where you query many different keys. However, it is not recommended for very small JSON documents as the performance gain is minimal. The smaller the proportion of the key's value to the total size of the JSON document, the better the performance optimization from shredding.

    - **JSON indexing** is better for targeted optimization of specific key-based queries and has lower storage overhead. It's suitable for simpler JSON structures. Note that JSON shredding does not cover queries on keys inside arrays, so you need a JSON index to accelerate those.

    For details, refer to [JSON Field Overview](json-field-overview.md#Next-Accelerate-JSON-queries).
