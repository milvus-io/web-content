---
id: hybrid-search-with-structarray.md
title: "Hybrid Search with StructArray"
summary: "Use this page to combine StructArray vector search with other vector searches in one hybrid search request. StructArray hybrid search can produce either entity-level results or element-level results, depending on the AnnSearchRequest objects you combine."
---
# Hybrid Search with StructArray

Use this page to combine StructArray vector search with other vector searches in one hybrid search request. StructArray hybrid search can produce either entity-level results or element-level results, depending on the `AnnSearchRequest` objects you combine.

This page uses the `tech_articles` collection from [Create a StructArray Field](create-structarray-field.md). The collection has a top-level vector field named `title_vector` and a StructArray field named `chunks`. The `chunks[emb_list_vector]` subfield is indexed for EmbeddingList search, and `chunks[emb]` is indexed for element-level search.

## How hybrid search applies to StructArray

| `AnnSearchRequest` combination | Final candidate scope | Result behavior | `element_scope` |
| --- | --- | --- | --- |
| Collection-level vector field + StructArray EmbeddingList subfield | Entity level | Final candidates are keyed by primary key. | Do not use. |
| Collection-level vector field + StructArray element-level subfield | Entity level | Element-level hits are collapsed to entity-level candidates before hybrid reranking. | Optional collapse config on the StructArray element-level `AnnSearchRequest`. |
| Multiple element-level subfields under the same StructArray field | Element level | Final candidates are keyed by primary key plus Struct element offset. | Do not use. |
| Element-level subfields under different StructArray fields | Entity level | Element offsets do not share identity, so each StructArray element-level `AnnSearchRequest` is collapsed before reranking. | Optional collapse config on each StructArray element-level `AnnSearchRequest`. |

<div class="alert note">

Warning

Use `element_scope` only to configure collapse for StructArray element-level `AnnSearchRequest` objects in a non-same-struct element-level hybrid search. Do not use it for EmbeddingList requests, collection-level vector requests, or same-StructArray element-level hybrid search.

</div>

## Before you begin

Prepare the collection, data, and indexes before running hybrid search.

| Requirement | Details |
| --- | --- |
| StructArray field | The collection contains a StructArray field such as `chunks`. |
| Vector subfields | Use separate vector subfields for EmbeddingList search and element-level search. |
| Indexes | `chunks[emb_list_vector]` uses a `MAX_SIM*` metric. `chunks[emb]` uses a regular vector metric such as `COSINE`, `IP`, or `L2`. |
| Reranker | Choose a hybrid reranker such as `RRFRanker` or another reranker supported by your application. |

For index setup, see [Index StructArray Fields](index-structarray-fields.md).

## Run hybrid search with an EmbeddingList request

EmbeddingList search on a StructArray vector subfield is entity-level in hybrid search. It behaves like an entity-level vector search request and does not return one matched Struct element offset.

```
from pymilvus import AnnSearchRequest, MilvusClient, RRFRanker
from pymilvus.client.embedding_list import EmbeddingList

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

query_vector = [0.19, 0.24, 0.30, 0.37]

query_list = EmbeddingList()
query_list.add([0.12, 0.21, 0.32, 0.44])
query_list.add([0.18, 0.23, 0.29, 0.36])

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field="title_vector",
    limit=10,
)

chunk_list_req = AnnSearchRequest(
    data=[query_list],
    anns_field="chunks[emb_list_vector]",
    limit=10,
)

results = client.hybrid_search(
    collection_name="tech_articles",
    reqs=[title_req, chunk_list_req],
    ranker=RRFRanker(),
    limit=5,
    output_fields=[
        "doc_id",
        "title",
        "category",
        "chunks[text]",
        "chunks[section]",
    ],
)
```

In this example, both `AnnSearchRequest` objects produce entity-level candidates. The final result is keyed by the parent entity primary key. Do not add `element_scope` to the EmbeddingList request.

## Run same-StructArray element-level hybrid search

When all `AnnSearchRequest` objects target element-level vector subfields under the same StructArray field, hybrid search can keep element-level candidates through reranking. This is the only StructArray hybrid mode where final results remain element-level.

The following example assumes the `chunks` StructArray field has two element-level vector subfields, `chunks[emb]` and `chunks[code_emb]`, and both use regular vector metrics.

```
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
    output_fields=[
        "doc_id",
        "title",
        "chunks[text]",
        "chunks[section]",
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

Both `AnnSearchRequest` objects search vector subfields under `chunks`. The same zero-based offset refers to the same Struct element, so the hybrid reranker can rank element candidates directly. Do not set `element_scope` in this mode because no entity-level collapse is performed.

## Collapse element-level hits for entity-level hybrid search

If a hybrid search mixes a StructArray element-level `AnnSearchRequest` with a collection-level vector request, an EmbeddingList request, or an element-level request under a different StructArray field, the final candidate scope is entity-level. In this case, each StructArray element-level `AnnSearchRequest` is collapsed to entity-level candidates before hybrid reranking.

Use `element_scope` inside the `params` of the StructArray element-level `AnnSearchRequest` when you need to control how multiple matched elements from the same entity are collapsed.

```
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
            "element_scope": {
                "collapse": {
                    "strategy": "topk_sum",
                    "topk": 3,
                },
            },
        },
    },
    limit=30,
    expr='element_filter(chunks, $[quality_score] > 0.8)',
)

results = client.hybrid_search(
    collection_name="tech_articles",
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    limit=5,
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

In this example, `title_req` is entity-level, so the final hybrid result is also entity-level. The `chunk_req` request first returns element hits from `chunks[emb]`, then collapses the returned elements from the same entity by summing the best three element scores. If `element_scope` is omitted when entity-level collapse is needed, the collapse strategy defaults to `max`.

## Choose a collapse strategy

| Strategy | Behavior | `topk` | Metric requirement |
| --- | --- | --- | --- |
| `max` | Keep the best returned element score for the entity. | Not allowed. | Any supported regular vector metric. |
| `sum` | Sum all returned element scores for the entity. | Not allowed. | Positive-correlation metrics only, such as `IP` or `COSINE`. |
| `avg` | Average all returned element scores for the entity. | Not allowed. | Any supported regular vector metric. |
| `topk_sum` | Sum the best `K` returned element scores for the entity. | Required and must be positive. | Positive-correlation metrics only, such as `IP` or `COSINE`. |
| `topk_avg` | Average the best `K` returned element scores for the entity. | Required and must be positive. | Any supported regular vector metric. |

Collapse uses only the element hits returned by that StructArray element-level `AnnSearchRequest`. It does not scan every Struct element in the entity after ANN search. Set the request `limit` high enough to provide the elements you want available for collapse.

## Add filters, range search, and grouping

You can attach `element_filter` to a StructArray element-level `AnnSearchRequest` when scalar conditions should apply to the same Struct elements that participate in vector search. You can also use a top-level `filter` on `hybrid_search()` for parent-entity conditions.

StructArray element-level vector fields support range search in hybrid search. Add `radius` and, optionally, `range_filter` to the element-level `AnnSearchRequest`. EmbeddingList-level StructArray requests do not support range search.

Element-level hybrid grouping is supported only when all `AnnSearchRequest` objects target element-level vector fields under the same StructArray field, and `group_by_field` must be the primary key. Hybrid grouping is not supported when the request mixes collection-level vector fields, different StructArray fields, or EmbeddingList-level requests. Do not combine range search with grouping.

## Interpret hybrid results

| Final candidate scope | Result key | Offset behavior | When it happens |
| --- | --- | --- | --- |
| Entity level | Primary key. | No element offset in the final result. | The hybrid request includes a collection-level vector field, an EmbeddingList request, or element-level requests under different StructArray fields. |
| Element level | Primary key plus parent StructArray field plus element offset. | The selected element offset can be returned when exposed by the API or SDK. | All `AnnSearchRequest` objects are element-level and under the same StructArray field. |

## Limitations

- Use `element_scope` only for StructArray element-level `AnnSearchRequest` objects that must be collapsed to entity-level candidates in hybrid search.

- Do not use `element_scope` for EmbeddingList requests, collection-level vector requests, or same-StructArray element-level hybrid search.

- `sum` and `topk_sum` collapse strategies require positive-correlation metrics, such as `IP` or `COSINE`. Do not use them with `L2`.

- `topk_sum` and `topk_avg` require a positive `topk` value. Other collapse strategies must not include `topk`.

- EmbeddingList-level StructArray requests do not support range search or group-by.

- Hybrid group-by is supported only for same-StructArray element-level hybrid search and only by primary key.

- Do not combine range search with group-by.

## Common mistakes

- Adding `element_scope` to a same-StructArray element-level hybrid request. That request remains element-level and does not perform entity-level collapse.

- Adding `element_scope` to `chunks[emb_list_vector]`. EmbeddingList search is already entity-level.

- Assuming two StructArray fields share element offsets. Offset `3` in `chunks` and offset `3` in another StructArray field are different elements, so the hybrid request becomes entity-level.

- Using `topk_sum` with `L2`. Use `max`, `avg`, or `topk_avg` for negative distance metrics.

- Expecting entity-level hybrid results to include the selected Struct element offset after collapse.

## Next steps

1. To learn the two basic StructArray vector search modes, read [Basic Vector Search with StructArray](basic-vector-search-with-structarray.md).

1. To add scalar filters to hybrid search, read [Filtered Search with StructArray](filtered-search-with-structarray.md).

1. To use score or distance boundaries in hybrid search, read [Range Search with StructArray](range-search-with-structarray.md).

1. To group element-level hybrid results by parent entity, read [Grouping Search with StructArray](grouping-search-with-structarray.md).

1. To check StructArray search limits, read [StructArray Limits](structarray-limits.md).
