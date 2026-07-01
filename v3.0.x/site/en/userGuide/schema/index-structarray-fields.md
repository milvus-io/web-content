---
id: index-structarray-fields.md
title: "Index StructArray Fields"
summary: "Create indexes on StructArray subfields before you run vector search or accelerate scalar filtering. For a StructArray field, the index target is a subfield path, such as chunks[emb_list_vector], chunks[emb], or chunks[section]."
---
# Index StructArray Fields

Create indexes on StructArray subfields before you run vector search or accelerate scalar filtering. For a StructArray field, the index target is a subfield path, such as `chunks[emb_list_vector]`, `chunks[emb]`, or `chunks[section]`.

This page uses the `tech_articles` collection from [Create a StructArray Field](create-structarray-field.md). The `chunks` StructArray field contains scalar subfields for filtering and vector subfields for search.

## Before you begin

Make sure the collection schema already contains the `chunks` StructArray field and data has been inserted.

| Subfield path | Type | Index purpose |
| --- | --- | --- |
| `chunks[emb_list_vector]` | `FLOAT_VECTOR` | EmbeddingList search with `MAX_SIM*` metrics. |
| `chunks[emb]` | `FLOAT_VECTOR` | Element-level search with regular vector metrics. |
| `chunks[section]` | `VARCHAR` | Categorical filtering. |
| `chunks[quality_score]` | `FLOAT` | Numeric filtering and range-style predicates. |
| `chunks[has_code]` | `BOOL` | Boolean filtering. |

<div class="alert note">

A vector field or vector subfield accepts only one index. If you need both EmbeddingList search and element-level search, create two separate vector subfields and index them separately. In this page, `chunks[emb_list_vector]` is indexed for EmbeddingList search, and `chunks[emb]` is indexed for element-level search.

</div>

## Choose indexes

Use the search mode to choose the vector metric family.

| Search or filter goal | Target path | What to choose |
| --- | --- | --- |
| EmbeddingList search | `chunks[emb_list_vector]` | A `MAX_SIM*` metric family. |
| Element-level vector search | `chunks[emb]` | A regular vector metric family, such as `COSINE`, `IP`, or `L2`. |
| Filter by string or category | `chunks[section]` | A scalar index supported by your target. |
| Filter by numeric range | `chunks[quality_score]`, `chunks[page]` | A scalar index supported by your target. |
| Filter by boolean value | `chunks[has_code]` | A scalar index supported by your target. |

EmbeddingList search treats the vectors in a StructArray vector subfield as an embedding list and returns entity-level results. Element-level search searches each Struct element independently and can return the matched element offset.

## Create vector indexes

The following example creates two vector indexes. The first index uses a `MAX_SIM*` metric for EmbeddingList search. The second index uses a regular vector metric for element-level search.

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

index_params = client.prepare_index_params()

# Index for EmbeddingList search.
index_params.add_index(
    field_name="chunks[emb_list_vector]",
    index_name="chunks_emb_list_max_sim",
    index_type="HNSW",
    metric_type="MAX_SIM_COSINE",
    params={
        "M": 16,
        "efConstruction": 200,
    },
)

# Index for element-level search.
index_params.add_index(
    field_name="chunks[emb]",
    index_name="chunks_emb_cosine",
    index_type="HNSW",
    metric_type="COSINE",
    params={
        "M": 16,
        "efConstruction": 200,
    },
)

client.create_index(
    collection_name="tech_articles",
    index_params=index_params,
)
```

<div class="alert note">

Warning
Do not create a `MAX_SIM*` index and a regular vector-metric index on the same vector subfield. If both search modes are required, write vectors to two separate vector subfields and create one index on each subfield.

</div>

## Create scalar indexes

Create scalar indexes on StructArray scalar subfields when you use them in filters. Use the same `structArray[subfield]` path syntax.

```python
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="chunks[section]",
    index_name="chunks_section_inverted",
    index_type="INVERTED",
)

index_params.add_index(
    field_name="chunks[has_code]",
    index_name="chunks_has_code_inverted",
    index_type="INVERTED",
)

index_params.add_index(
    field_name="chunks[quality_score]",
    index_name="chunks_quality_score_sort",
    index_type="STL_SORT",
)

index_params.add_index(
    field_name="chunks[page]",
    index_name="chunks_page_sort",
    index_type="STL_SORT",
)

client.create_index(
    collection_name="tech_articles",
    index_params=index_params,
)
```

Scalar indexes are optional but useful when StructArray scalar subfields appear frequently in filters, such as `element_filter(chunks, $[quality_score] > 0.9)` or `MATCH_ANY(chunks, $[section] == "index")`.

## Index metric compatibility

Use the following tables to choose an index type and metric type for a StructArray vector subfield. Start from the target, then choose the metric family by search mode.

Choose a Milvus index type and metric type from the following compatibility tables.

### EmbeddingList search

EmbeddingList search uses `MAX_SIM*` metrics. It treats the vectors in a StructArray vector subfield as an embedding list and returns entity-level results.

| Vector subfield data type | Index type | Metric type |
| --- | --- | --- |
| `FLOAT_VECTOR`, `FLOAT16_VECTOR`, `BFLOAT16_VECTOR` | `IVF_FLAT`, `IVF_FLAT_CC`, `HNSW`, `HNSW_SQ`, `HNSW_PQ`, `HNSW_PRQ`, `DISKANN` | `MAX_SIM`, `MAX_SIM_COSINE`, `MAX_SIM_IP`, `MAX_SIM_L2` |
| `INT8_VECTOR` | `HNSW`, `HNSW_SQ`, `HNSW_PQ`, `HNSW_PRQ` | `MAX_SIM`, `MAX_SIM_COSINE`, `MAX_SIM_IP`, `MAX_SIM_L2` |
| `BINARY_VECTOR` | `HNSW` | `MAX_SIM_HAMMING`, `MAX_SIM_JACCARD` |

### Element-level search

Element-level search uses regular vector metrics. It searches each Struct element independently and can return the matched element offset.

| Vector subfield data type | Index type | Metric type |
| --- | --- | --- |
| `FLOAT_VECTOR`, `FLOAT16_VECTOR`, `BFLOAT16_VECTOR` | `FLAT`, `IVF_FLAT`, `IVF_FLAT_CC`, `IVF_SQ8`, `IVF_SQ_CC`, `IVF_PQ`, `SCANN`, `IVF_RABITQ`, `IVF_RABITQ_FASTSCAN`, `HNSW`, `HNSW_SQ`, `HNSW_PQ`, `HNSW_PRQ`, `DISKANN` | `L2`, `IP`, `COSINE` |
| `INT8_VECTOR` | `HNSW`, `HNSW_SQ`, `HNSW_PQ`, `HNSW_PRQ` | `L2`, `IP`, `COSINE` |
| `BINARY_VECTOR` | `HNSW` | `HAMMING`, `JACCARD` |
| `BINARY_VECTOR` | `BIN_FLAT` | `HAMMING`, `JACCARD`, `SUBSTRUCTURE`, `SUPERSTRUCTURE`, `MHJACCARD` |
| `BINARY_VECTOR` | `BIN_IVF_FLAT` | `HAMMING`, `JACCARD` |

For version-specific support and other limits, see [StructArray Limits](structarray-limits.md).

## Verify indexes

After creating indexes, describe the collection or list indexes to confirm that the expected subfield paths are indexed.

```python
indexes = client.list_indexes(
    collection_name="tech_articles",
)

print(indexes)
```

You can also describe a specific index if your SDK version exposes index-description APIs.

```python
index = client.describe_index(
    collection_name="tech_articles",
    index_name="chunks_emb_cosine",
)

print(index)
```

## Index rules

| Rule | Explanation |
| --- | --- |
| Use path syntax for subfield indexes. | Index `chunks[emb]`, not `emb` or `chunks.emb`. |
| One vector subfield accepts one index. | Use separate vector subfields if you need different metric families. |
| Use `MAX_SIM*` metrics for EmbeddingList search. | EmbeddingList query data requires an index built with a `MAX_SIM*` metric. |
| Use regular vector metrics for element-level search. | Element-level search uses regular vector query data and metrics such as `COSINE`, `IP`, or `L2`. |
| Index scalar subfields that appear in filters. | Use scalar index types supported by your target. |
| Keep vector-field limits in mind. | The total number of vector fields and vector subfields is limited. See StructArray Limits before adding many vector subfields. |

## Common mistakes

- Creating an index on `chunks.emb` instead of `chunks[emb]`.

- Creating only a `MAX_SIM*` index and then trying to run element-level search on the same subfield.

- Creating only a regular vector index and then trying to run EmbeddingList search on the same subfield.

- Reusing one vector subfield for both `MAX_SIM*` and regular vector metrics.

- Forgetting scalar indexes for heavily used StructArray filters.

- Indexing a StructArray subfield that does not exist in the Struct schema.

## Next steps

1. To run entity-level EmbeddingList search or element-level vector search, read Basic Vector Search with StructArray.

2. To filter StructArray scalar subfields during search, read Filtered Search with StructArray.

3. To review index and metric limits, read [StructArray Limits](structarray-limits.md).
