---
id: grouping-search-with-structarray.md
title: "Grouping Search with StructArray"
summary: "Use this page to group StructArray element-level search results by the parent entity. Element-level search can return multiple hits from the same entity when several Struct elements match the query. Grouping collapses those element hits so each parent entity appears at most once."
---
# Grouping Search with StructArray

Use this page to group StructArray element-level search results by the parent entity. Element-level search can return multiple hits from the same entity when several Struct elements match the query. Grouping collapses those element hits so each parent entity appears at most once.

This page uses the `tech_articles` collection from [Create a StructArray Field](create-structarray-field.md). The collection has a StructArray field named `chunks`. The `chunks[emb]` vector subfield is indexed for element-level search with a regular vector metric.

## How grouping applies to StructArray

| Search mode | Grouping behavior | Result behavior |
| --- | --- | --- |
| EmbeddingList search | Not supported. | Not applicable. |
| Element-level search | Supported by grouping on the primary key. | Returns at most one result per parent entity. Element-level metadata is preserved, so the selected element index or offset can be returned when exposed by the API or SDK. |
| Hybrid search | Supported only when all sub-searches target element-level vector fields under the same StructArray field. | Element-level sub-searches are grouped by primary key before final result handling. |

<div class="alert note">

Use grouping when ungrouped element-level search returns too many duplicate parent entities. If you want every matching Struct element as an individual hit, use [Basic Vector Search with StructArray](basic-vector-search-with-structarray.md) without `group_by_field`.

</div>

## Before you begin

Prepare the collection, data, and indexes before running grouping search.

| Requirement | Details |
| --- | --- |
| Element-level vector subfield | Use a StructArray vector subfield such as `chunks[emb]`, indexed with a regular vector metric. |
| Regular vector query | Use a regular query vector, not an `EmbeddingList`. |
| Primary key grouping | Use the collection primary key as `group_by_field`, such as `doc_id`. |
| No range parameters | Do not combine grouping search with range-search parameters such as `radius` or `range_filter`. |

For index setup, see [Index StructArray Fields](index-structarray-fields.md).

## Run grouped element-level search

The following example searches individual chunks first, then groups the element hits by the parent entity's primary key.

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

query_vector = [0.19, 0.24, 0.30, 0.37]

results = client.search(
    collection_name="tech_articles",
    data=[query_vector],
    anns_field="chunks[emb]",
    limit=5,
    group_by_field="doc_id",
    output_fields=[
        "doc_id",
        "title",
        "chunks[text]",
        "chunks[section]",
        "chunks[page]",
        "chunks[quality_score]",
    ],
)

for hits in results:
    for hit in hits:
        print(
            "doc_id:", hit["id"],
            "distance:", hit["distance"],
            "offset:", hit.get("offset"),
            "entity:", hit["entity"],
        )
```

Without grouping, the same `doc_id` can appear multiple times if several chunks match the query. With `group_by_field="doc_id"`, each parent entity appears at most once. Grouping preserves element-level metadata, so the grouped result can still include the selected Struct element index or offset when the API or SDK exposes it.

## Add scalar filters

You can combine grouping search with StructArray scalar filtering. Use `element_filter` when the scalar condition should constrain which Struct elements participate in element-level vector search.

```python
filter_expr = (
    'category == "search" && '
    'element_filter(chunks, '
    '$[section] == "index" && '
    '$[quality_score] > 0.9)'
)

results = client.search(
    collection_name="tech_articles",
    data=[query_vector],
    anns_field="chunks[emb]",
    filter=filter_expr,
    limit=5,
    group_by_field="doc_id",
    output_fields=[
        "doc_id",
        "title",
        "category",
        "chunks[text]",
        "chunks[section]",
        "chunks[quality_score]",
    ],
)
```

The top-level predicate selects candidate entities. The `element_filter` predicate restricts element-level vector search to matching Struct elements. Grouping then collapses matching element hits by the primary key.

## Use grouping in hybrid search

Hybrid grouping with StructArray is an element-level feature. It is supported only when all sub-searches target element-level vector fields under the same StructArray field. Do not use EmbeddingList-level requests in a grouped StructArray hybrid search.

The following example assumes the `chunks` StructArray field has two element-level vector subfields, `chunks[emb]` and `chunks[code_emb]`, and both are indexed with regular vector metrics.

```python
from pymilvus import AnnSearchRequest, RRFRanker

index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field="chunks[emb]",
    limit=10,
    expr='element_filter(chunks, $[section] == "index")',
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field="chunks[code_emb]",
    limit=10,
    expr='element_filter(chunks, $[has_code] == true)',
)

results = client.hybrid_search(
    collection_name="tech_articles",
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    limit=5,
    group_by_field="doc_id",
    output_fields=[
        "doc_id",
        "title",
        "chunks[text]",
        "chunks[section]",
    ],
)
```

In this example, both sub-requests target element-level vector fields under the same StructArray field, `chunks`. A hybrid search does not support element-level group-by if it mixes normal vector fields, different StructArray fields, or EmbeddingList-level requests.

## Interpret grouped results

| Result item | Meaning |
| --- | --- |
| `id` | Primary key of the grouped parent entity. |
| `distance` or score | Score or distance of the selected Struct element for that parent entity. |
| `offset` | Zero-based position of the selected Struct element when returned. |
| Repeated primary keys | Not expected when grouping by the primary key. |
| `limit` | Applies to grouped parent-entity results. |

## Limitations

- Grouping search applies only to element-level StructArray vector search. EmbeddingList search and EmbeddingList-level hybrid search do not support group-by.

- Use the primary key as `group_by_field`. StructArray element-level grouping is not a general-purpose group-by over arbitrary scalar fields.

- Do not combine grouping search with range search.

- Do not use an `EmbeddingList` query or a `MAX_SIM*` metric for grouping search.

- Hybrid grouping is supported only when all sub-searches target element-level vector fields under the same StructArray field.

- Hybrid grouping is not supported when the hybrid search mixes a normal vector field, a different StructArray field, or an EmbeddingList-level request.

## Common mistakes

- Using grouping with `chunks[emb_list_vector]`, which is intended for EmbeddingList search.

- Grouping by a non-primary-key scalar field.

- Grouping by multiple fields. Element-level StructArray grouping supports only primary-key grouping.

- Expecting grouped results to represent every matched Struct element. Grouping returns at most one result per parent entity.

- Assuming grouped element-level search recomputes an EmbeddingList-style `MAX_SIM*` score. Grouping collapses element-level hits; it does not change the scoring model.

- Combining `group_by_field` with `radius` or `range_filter`.

## Next steps

1. To learn ungrouped element-level search first, read [Basic Vector Search with StructArray](basic-vector-search-with-structarray.md).

2. To add scalar filters to grouped search, read [Filtered Search with StructArray](filtered-search-with-structarray.md).

3. To use score or distance boundaries instead of grouping, read [Range Search with StructArray](range-search-with-structarray.md).

4. To check StructArray search limits, read [StructArray Limits](structarray-limits.md).
