---
id: search_with_svs_vamana.md
summary: Build and search in-memory SVS Vamana graph indexes in Milvus through the FAISS index passthrough, with optional LeanVec or LVQ compression on Intel CPUs.
title: "Search with SVS Vamana and Milvus"
---

# Search with SVS Vamana and Milvus

[SVS](https://github.com/intel/ScalableVectorSearch) (Scalable Vector Search) is Intel's high-performance vector-search library implementing the Vamana graph algorithm. In Milvus, you reach SVS Vamana through the [FAISS index passthrough](https://milvus.io/docs/faiss.md): set `index_type` to `FAISS` and supply an `SVSVamana` index-factory string, and Milvus builds and searches the index through Faiss's SVS integration.

Vamana is the graph structure that [DISKANN](https://milvus.io/docs/diskann.md) also uses, but SVS Vamana keeps the whole graph in memory. It can also compress vectors with **LeanVec** or **LVQ**, which reduces memory usage and speeds up search while still reaching very high recall.

## Prerequisites

- Milvus 3.0.0 or later, built from source with SVS enabled
- PyMilvus 3.0.0 or later
- An Intel CPU if you use `LVQ*` or `LeanVec*` storage; `FP32`, `FP16`, and `SQ8` storage run on any platform
- Familiarity with [FAISS index-factory strings](https://milvus.io/docs/faiss.md)

<div class="alert note">

SVS is not included in the default Milvus build. To use the `SVSVamana` factories, build Milvus from source with `make USE_SVS=ON`. In a build without SVS, index building fails because Faiss does not recognize the factory string.

</div>

LVQ and LeanVec compression run only on Intel CPUs, and run faster on CPUs with AVX-512. On other CPUs, index building fails for `LVQ*` and `LeanVec*` factory strings.

## How SVS Vamana works

### Vamana graph

SVS Vamana builds a single-layer proximity graph. Each vector is a node, and edges connect vectors that are likely to be close neighbors. To build the graph, SVS does the following for each node **x**:

1. **Greedy search**: SVS searches the graph built so far, keeping a candidate list of size `construction_window_size`.

2. **Neighbor pruning**: The visited nodes become candidate neighbors for **x**. SVS considers them in order of increasing distance from **x**. A candidate `c` is skipped if a closer neighbor `n` that has already been kept satisfies `alpha * distance(n, c) <= distance(x, c)`. This keeps long-range edges and drops redundant short-range ones, so a search can jump across the graph instead of moving through it one nearest neighbor at a time. Pruning stops once the graph degree is reached.

3. **Backward edges**: For each new neighbor of **x**, SVS adds a reverse edge back to **x** and prunes that neighbor's edge list if it exceeds the graph degree.

Pruning runs in two passes: first with `alpha = 1`, then with the configured `alpha`. A larger graph degree and `construction_window_size` produce a denser, higher-quality graph but use more memory and take longer to build.

At search time, SVS walks the graph greedily, keeping the `search_window_size` closest candidates seen so far. It always explores the closest unvisited candidate next. The search ends once every neighbor of the current node is farther from the query than the worst candidate in the window. A larger `search_window_size` explores more of the graph, which raises recall but also latency.

### LeanVec compression

[LeanVec](https://openreview.net/forum?id=wczqrpOrIc) reduces both the number of dimensions per vector and the number of bits per dimension. A LeanVec index keeps two representations of each vector:

- **Primary (reduced dimensionality)**: A linear projection of the vector down to a smaller number of dimensions. The graph search runs over this primary dataset, so most distance computations happen in the lower-dimensional space. This reduces both compute and memory-bandwidth requirements. By default, the reduced dimensionality is half the original dimensionality (`dim / 2`).

- **Secondary (full dimensionality)**: The vector at its original dimensionality. SVS re-ranks the candidates returned by the primary graph search against this secondary dataset to recover the accuracy lost to dimensionality reduction.

Both representations are quantized with [LVQ](https://vldb.org/pvldb/volumes/16/paper/Similarity%20search%20in%20the%20blink%20of%20an%20eye%20with%20compressed%20indices) (Locally-adaptive Vector Quantization). The storage component of the factory string selects the encoding. For example, `LeanVec4x8` uses 4 bits per dimension for the primary dataset and 8 bits per dimension for the secondary dataset. Even the re-ranking step never reads a full-precision vector.

By default, LeanVec learns separate projections for the indexed vectors and for the queries, to support queries that come from a different distribution than the indexed vectors (out-of-distribution, or OOD). This works especially well for cross-modal workloads such as text-to-image retrieval, and it also works well when queries come from the same distribution as the indexed vectors. Milvus does not yet support a way to pass queries for computing projections, so only the base vectors are currently used. OOD training adds build time. To build faster at some cost in query performance, set `ood_training` to `False`.

### LVQ compression

For datasets with fewer than about 512 dimensions, skipping dimensionality reduction and compressing only with LVQ quantization can work better. Like LeanVec, an LVQ index keeps a primary representation for fast search and a residual representation for re-ranking. For example, `LVQ4x4` uses 4 bits for the primary representation and 4 bits for the residual. `LVQ4x0` and `LVQ8x0` skip re-ranking, which speeds up queries if their recall is good enough for your workload.

## Choose a factory string

SVS Vamana factory strings have the form `SVSVamana<degree>[,<storage>]`, where `<degree>` is the maximum number of edges per node in the graph.

| Factory string | Storage | Notes |
| --- | --- | --- |
| `SVSVamana64` | `FP32` | Uncompressed vectors. |
| `SVSVamana64,FP16` | 16-bit floats | Half the vector memory of `FP32`, with minimal accuracy loss. |
| `SVSVamana64,SQ8` | 8-bit scalar quantization | A quarter of the vector memory of `FP32`. |
| `SVSVamana64,LVQ4x0`, `LVQ8x0` | LVQ primary, no residual | Intel CPUs only. No re-ranking. |
| `SVSVamana64,LVQ4x4`, `LVQ4x8` | LVQ primary and residual | Intel CPUs only. |
| `SVSVamana64,LeanVec4x4`, `LeanVec4x8`, `LeanVec8x8` | LeanVec primary and secondary | Intel CPUs only. Add the `_<dim>` suffix to set the reduced dimensionality. For example, `LeanVec4x8_128` reduces the primary dataset to 128 dimensions. Without the suffix, the reduced dimensionality is `dim / 2`. |

`SVSVamana64,LeanVec4x8` is a good starting point. From there:

- For **higher recall** at some memory cost, increase the LeanVec dimensionality with the `_<dim>` suffix.

- For a **smaller footprint** at some recall cost, lower the LeanVec dimensionality.

- For low-dimensionality vectors, try `LVQ8`.

- **On non-Intel CPUs**, use `FP16` or `SQ8`.

## Build the index

The following example builds an SVS Vamana index with graph degree 64 and LeanVec compression. Expand the setup block and run it before building the index.

<details>

<summary>Prepare the collection</summary>

```python
import random

from pymilvus import DataType, MilvusClient

client = MilvusClient(uri="http://localhost:19530")
collection_name = "svs_vamana_example"

if client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(42)
vectors = [[rng.random() for _ in range(256)] for _ in range(3000)]

schema = client.create_schema(auto_id=False, enable_dynamic_field=False)
schema.add_field("id", DataType.INT64, is_primary=True)
schema.add_field("vector", DataType.FLOAT_VECTOR, dim=256)

client.create_collection(collection_name=collection_name, schema=schema)

client.insert(
    collection_name=collection_name,
    data=[{"id": i, "vector": vector} for i, vector in enumerate(vectors)],
)
client.flush(collection_name=collection_name)
```

</details>

Set `index_type` to `FAISS`, and use `faiss_index_name` to select the SVS Vamana recipe.

```python
index_params = client.prepare_index_params()
index_params.add_index(
    field_name="vector",
    index_name="svs_vamana_index",
    index_type="FAISS",
    metric_type="L2",
    # highlight-start
    params={
        # SVSVamana64 -> Vamana graph degree 64
        # LeanVec4x8  -> 4-bit primary, 8-bit secondary
        # _128        -> LeanVec dim 128 (omit the suffix for dim / 2)
        "faiss_index_name": "SVSVamana64,LeanVec4x8_128",
        "construction_window_size": 200,  # build-time search width
        "ood_training": True,             # OOD on (default)
    },
    # highlight-end
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
```

## Search the index

`search_window_size` controls the trade-off between recall and latency, as `ef` does for [HNSW](https://milvus.io/docs/hnsw.md). Set `search_buffer_capacity` to at least the same value. The index defaults for both are 10, and SVS rejects a search whose `search_window_size` is larger than its `search_buffer_capacity`.

```python
# highlight-start
search_params = {
    "params": {
        "search_window_size": 100,      # wider = higher recall, lower QPS
        "search_buffer_capacity": 100,  # must be >= search_window_size
    }
}
# highlight-end

res = client.search(
    collection_name=collection_name,
    data=[vectors[0]],
    anns_field="vector",
    limit=10,
    # highlight-next-line
    search_params=search_params,
)
```

If `limit` is larger than `search_window_size`, SVS raises the window to `limit` for that search.

## SVS Vamana parameters

The following build parameters go in `params` in `add_index()`, next to `faiss_index_name`. You cannot change them after the index is built.

| Parameter | Default | Description |
| --- | --- | --- |
| `construction_window_size` | `40` | Size of the candidate list used to find each node's neighbors during graph construction. Larger values improve graph quality and recall but take longer to build. Set it to at least the graph degree. 200 is a common choice. |
| `alpha` | `1.2` for `L2`, `0.95` for `IP` and `COSINE` | Pruning strength. Values farther from 1 prune more aggressively, favoring long-range edges over redundant short-range ones. Use values above 1 for `L2` and below 1 for `IP` and `COSINE`. Keep the default unless you have measured a better value on your data. |
| `graph_max_degree` | Degree in the factory string or `32` | Maximum number of edges per node. Overrides the degree in the factory string. Values in the range [32, 128] suit most workloads. Higher values can raise recall but use more memory and take longer to build. |
| `prune_to` | Graph degree minus 4 | Number of edges a node keeps after pruning once it exceeds the graph degree. |
| `max_candidate_pool_size` | `200` | Maximum number of candidates considered when pruning a node's neighbors. Should be larger than `construction_window_size`. |
| `use_full_search_history` | `True` | Whether pruning considers every node visited during the construction search, not just the final candidates. |
| `leanvec_d` | `_<dim>` factory string suffix or `dim / 2` | LeanVec only. Reduced dimensionality of the primary dataset. Overrides the factory-string suffix. Smaller values reduce memory usage and speed up graph search, but lower recall. |
| `ood_training` | `True` for LeanVec | LeanVec only. Whether to learn separate projections for the indexed vectors and queries. Set `False` for faster builds. Setting `True` for any factory other than LeanVec fails. |

The following search parameters go in `search_params.params`. You can also set them as build parameters, which changes the defaults the index uses for searches that do not set them.

| Parameter | Default | Description |
| --- | --- | --- |
| `search_window_size` | `10` | Number of closest candidates kept while traversing the graph. Larger values raise recall and latency. |
| `search_buffer_capacity` | `10` | Capacity of the search buffer. Must be greater than or equal to `search_window_size`. In most cases, set it equal to `search_window_size`. For LeanVec, try 1.5 times `search_window_size`. |

## Learn more

- Read the [FAISS index passthrough](https://milvus.io/docs/faiss.md) reference for the general factory-string contract, limits, and error handling.
- Compare with the on-disk Vamana implementation in [DISKANN](https://milvus.io/docs/diskann.md).
- See the [SVS repository](https://github.com/intel/ScalableVectorSearch) for build details, performance tuning, and the underlying C++ API.
