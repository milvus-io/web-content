---
id: range-search-with-structarray.md
title: "Range Search with StructArray"
summary: "Use this page to run range search on StructArray vector subfields. Range search returns vector hits whose score or distance falls within a specified boundary. For StructArray fields, use range search with element-level vector search, where each Struct element is searched independently."
---
# Range Search with StructArray

Use this page to run range search on StructArray vector subfields. Range search returns vector hits whose score or distance falls within a specified boundary. For StructArray fields, use range search with element-level vector search, where each Struct element is searched independently.

This page uses the `tech_articles` collection from [Create a StructArray Field](create-structarray-field.md). The collection has a StructArray field named `chunks`. The `chunks[emb]` vector subfield is indexed for element-level search with a regular vector metric such as `COSINE`, `IP`, or `L2`.

## How range search applies to StructArray

| Search mode | Range search behavior | Result granularity |
| --- | --- | --- |
| EmbeddingList search | Not supported. | Not applicable. |
| Element-level search | Use a regular vector query with `radius` and, optionally, `range_filter`. | Struct element level. |
| Hybrid search | Supported when the StructArray request targets an element-level vector field. EmbeddingList-level requests do not support range search. | Element-level sub-search, then hybrid reranking. |

<div class="alert note">

If you only need the nearest Struct elements, start with [Basic Vector Search with StructArray](basic-vector-search-with-structarray.md). Use range search when the result must satisfy a score or distance boundary instead of only a top-K ranking.

</div>

## Before you begin

Prepare the collection, data, and indexes before running range search.

| Requirement | Details |
| --- | --- |
| StructArray field | The collection contains a StructArray field such as `chunks`. |
| Element-level vector subfield | The target vector subfield is `chunks[emb]`, not `chunks[emb_list_vector]`. |
| Index metric | The vector subfield is indexed with a regular vector metric, such as `COSINE`, `IP`, or `L2`. |
| Query data | The query is a regular vector, not an `EmbeddingList`. |

For index setup, see [Index StructArray Fields](index-structarray-fields.md).

## Use radius and range_filter

Set `radius` to define the search boundary. Set `range_filter` when you need an inner boundary as well. The direction depends on whether a smaller distance is better or a larger similarity score is better.

| Metric type | Higher score is better? | Range condition when `range_filter` is used |
| --- | --- | --- |
| `L2` | No. Smaller distance is better. | `range_filter <= distance < radius` |
| `IP`, `COSINE` | Yes. Larger score is better. | `radius < distance <= range_filter` |

When only `radius` is set, the range search returns hits that satisfy the outer boundary for the metric. Choose values according to the score or distance scale of your embeddings.

## Run element-level range search

The following example searches individual chunks whose `chunks[emb]` vectors are similar enough to the query vector. Each result hit represents a matched Struct element.

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
    search_params={
        "params": {
            "radius": 0.80,
            "range_filter": 0.95,
        },
    },
    limit=10,
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

In this example, `COSINE` is a similarity-style metric, so the result range is greater than `radius` and less than or equal to `range_filter`. The `offset` value identifies the matched Struct element in the `chunks` array when returned.

## Add scalar filters

You can combine element-level range search with StructArray scalar filtering. Use a top-level predicate for parent-entity fields, and use `element_filter` to constrain which Struct elements participate in the vector range search.

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
    search_params={
        "params": {
            "radius": 0.80,
            "range_filter": 0.95,
        },
    },
    filter=filter_expr,
    limit=10,
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

The top-level predicate selects candidate entities. The `element_filter` predicate restricts vector range search to matching Struct elements. For more filtering examples, see [Filtered Search with StructArray](filtered-search-with-structarray.md).

## Use range search in hybrid search

StructArray element-level vector fields support range search in hybrid search. Add `radius` and, optionally, `range_filter` to the `AnnSearchRequest` that targets the StructArray element-level vector field.

```python
from pymilvus import AnnSearchRequest, RRFRanker

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field="title_vector",
    limit=10,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field="chunks[emb]",
    param={
        "params": {
            "radius": 0.80,
            "range_filter": 0.95,
        },
    },
    limit=10,
    expr='element_filter(chunks, $[section] == "index")',
)

results = client.hybrid_search(
    collection_name="tech_articles",
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    limit=5,
    output_fields=[
        "doc_id",
        "title",
        "chunks[text]",
        "chunks[section]",
        "chunks[quality_score]",
    ],
)
```

In this example, only the `chunks[emb]` sub-request uses range-search parameters. The StructArray request still follows element-level semantics: the range boundary applies to Struct element hits before the hybrid search combines and reranks results.

## Interpret range results

| Result item | Meaning |
| --- | --- |
| `id` | Primary key of the entity that contains the matched Struct element. |
| `distance` or score | The score or distance between the query vector and the matched Struct element vector. |
| `offset` | Zero-based position of the matched Struct element in the StructArray field when returned. |
| Repeated primary keys | Possible. More than one Struct element in the same entity can fall within the specified range. |
| `limit` | Applies to element hits, not unique parent entities. |

## Limitations

- Do not use an `EmbeddingList` query or a `MAX_SIM*` metric for range search on StructArray vector subfields. EmbeddingList-level search does not support range search.

- Do not combine range search with grouping search. If you need one result per parent entity, run an element-level search without range parameters and use grouping where supported.

- Hybrid range search is supported for StructArray element-level vector fields. It is not supported for EmbeddingList-level StructArray requests.

## Common mistakes

- Running range search against `chunks[emb_list_vector]`, which is intended for EmbeddingList search.

- Using `MAX_SIM_COSINE` instead of a regular metric such as `COSINE` for element-level range search.

- Using an `EmbeddingList` query instead of a regular vector query.

- Expecting range search results to be unique by parent entity. Range search returns matching Struct element hits.

- Using `chunks.emb` instead of the required subfield path syntax `chunks[emb]`.

## Next steps

1. To learn the two basic StructArray vector search modes, read [Basic Vector Search with StructArray](basic-vector-search-with-structarray.md).

2. To add scalar filters to range search, read [Filtered Search with StructArray](filtered-search-with-structarray.md).

3. To return at most one result per parent entity where supported, read [Grouping Search with StructArray](grouping-search-with-structarray.md).

4. To check version-specific search limits, read [StructArray Limits](structarray-limits.md).
