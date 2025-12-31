---
id: sparse-inverted-index.md
title: "SPARSE_INVERTED_INDEX"
summary: "The SPARSE_INVERTED_INDEX index is an index type used by Milvus to efficiently store and search sparse vectors. This index type leverages the principles of inverted indexing to create a highly efficient search structure for sparse data."
---

# SPARSE_INVERTED_INDEX

The `SPARSE_INVERTED_INDEX` index is an index type used by Milvus to efficiently store and search sparse vectors. This index type leverages the principles of inverted indexing to create a highly efficient search structure for sparse data. For more information, refer to [INVERTED](inverted.md).

## Build index

To build a `SPARSE_INVERTED_INDEX` index on a sparse vector field in Milvus, use the `add_index()` method, specifying the `index_type`, `metric_type`, and additional parameters for the index.

```python
from pymilvus import MilvusClient

# Prepare index building params
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name="your_sparse_vector_field_name", # Name of the vector field to be indexed
    index_type="SPARSE_INVERTED_INDEX", # Type of the index to create
    index_name="sparse_inverted_index", # Name of the index to create
    metric_type="IP", # Metric type used to measure similarity
    params={"inverted_index_algo": "DAAT_MAXSCORE"}, # Algorithm used for building and querying the index
)
```

In this configuration:

- `index_type`: The type of index to be built. In this example, set the value to `SPARSE_INVERTED_INDEX`.

- `metric_type`: The metric used to calculate similarity between sparse vectors. Valid Values:

    - `IP` (Inner Product): Measures similarity using dot product.

    - `BM25`: Typically used for full-text search, focusing on textual similarity.

        For further details, refer to [Metric Types](metric.md) and [Full Text Search](full-text-search.md).

- `params.inverted_index_algo`: The algorithm used for building and querying the index. Valid values:

    - `"DAAT_MAXSCORE"` (default): Optimized Document-at-a-Time (DAAT) query processing using the MaxScore algorithm. MaxScore provides better performance for high *k* values or queries with many terms by skipping terms and documents likely to have minimal impact. It achieves this by partitioning terms into essential and non-essential groups based on their maximum impact scores, focusing on terms that can contribute to the top-k results.

    - `"DAAT_WAND"`: Optimized DAAT query processing using the WAND algorithm. WAND evaluates fewer hit documents by leveraging maximum impact scores to skip non-competitive documents, but it has a higher per-hit overhead. This makes WAND more efficient for queries with small *k* values or short queries, where skipping is more feasible.

    - `"TAAT_NAIVE"`: Basic Term-at-a-Time (TAAT) query processing. While it is slower compared to `DAAT_MAXSCORE` and `DAAT_WAND`, `TAAT_NAIVE` offers a unique advantage. Unlike DAAT algorithms, which use cached maximum impact scores that remain static regardless of changes to the global collection parameter (avgdl), `TAAT_NAIVE` dynamically adapts to such changes.

    To learn more building parameters available for the `SPARSE_INVERTED_INDEX` index, refer to [Index building params](sparse-inverted-index.md#Index-building-params).

Once the index parameters are configured, you can create the index by using the `create_index()` method directly or passing the index params in the `create_collection` method. For details, refer to [Create Collection](create-collection.md).

## Search on index

Once the index is built and entities are inserted, you can perform similarity searches on the index.

```python
# Prepare the query vector
query_vector = [{1: 0.2, 50: 0.4, 1000: 0.7}]

res = MilvusClient.search(
    collection_name="your_collection_name", # Collection name
    anns_field="vector_field",  # Vector field name
    data=query_vector,  # Query vector
    limit=3,  # TopK results to return
)
```

To learn more search parameters available for the `SPARSE_INVERTED_INDEX` index, refer to [Index-specific search params](ivf-flat.md#share-KDWodFEx6oCm2yxgEUAcXaUDnwg).

## Index params

This section provides an overview of the parameters used for building an index and performing searches on the index.

### Index building params

The following table lists the parameters that can be configured in `params` when [building an index](sparse-inverted-index.md#Build-index).

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p><code>inverted_index_algo</code></p></td>
     <td><p>The algorithm used for building and querying the index. It determines how the index processes queries.</p></td>
     <td><p><code>"DAAT_MAXSCORE"</code> (default), <code>"DAAT_WAND"</code>, <code>"TAAT_NAIVE"</code></p></td>
     <td><p>Use <code>"DAAT_MAXSCORE"</code> for scenarios with high k values or queries with many terms, which can benefit from skipping non-competitive documents. </p><p>Choose <code>"DAAT_WAND"</code> for queries with small k values or short queries to leverage more efficient skipping.</p><p>Use <code>"TAAT_NAIVE"</code> if dynamic adjustment to collection changes (e.g., avgdl) is required.</p></td>
   </tr>
</table>

### Index-specific search params

The following table lists the parameters that can be configured in `search_params.params` when [searching on the index](sparse-inverted-index.md#Search-on-index).

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p><code>drop_ratio_search</code></p></td>
     <td><p>The proportion of the smallest values to ignore during search, helping to reduce noise.</p></td>
     <td><p>Fraction between 0.0 and 1.0 (e.g., 0.2 ignores the smallest 20% of values)</p></td>
     <td><p>Tune this parameter based on the sparsity and noise level of your query vectors.</p><p>This parameter controls the proportion of low-magnitude values dropped during search. Increasing this value (for example, to <code>0.2</code>) can reduce noise and focus the search on more significant components, which may improve precision and efficiency. However, dropping more values can also reduce recall by excluding potentially relevant signals. Choose a value that balances recall and accuracy for your workload.</p></td>
   </tr>
</table>

