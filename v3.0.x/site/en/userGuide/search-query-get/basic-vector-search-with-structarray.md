---
id: basic-vector-search-with-structarray.md
title: "Basic Vector Search with StructArray"
summary: "Use this page to run vector search on vector subfields inside a StructArray field. StructArray supports two basic vector search modes: EmbeddingList search, which scores an embedding list stored in each entity, and element-level search, which searches each Struct element independently."
---
# Basic Vector Search with StructArray

Use this page to run vector search on vector subfields inside a StructArray field. StructArray supports two basic vector search modes: EmbeddingList search, which scores an embedding list stored in each entity, and element-level search, which searches each Struct element independently.

This page uses the `tech_articles` collection from [Create a StructArray Field](create-structarray-field.md). The collection has a StructArray field named `chunks`. Each chunk contains text, scalar metadata, a vector subfield named `emb_list_vector` with an index for EmbeddingList search, and a vector subfield named `emb` with an index for element-level search.

## Before you begin

Make sure the collection schema, data, and indexes are already prepared.

| Requirement | Where to prepare it |
| --- | --- |
| Create a StructArray field, such as `chunks`. | [Create a StructArray Field](create-structarray-field.md) |
| Insert entities whose `chunks` field contains Struct objects. | [Insert Data into StructArray Fields](insert-data-into-structarray-fields.md) |
| Create a `MAX_SIM*` index on `chunks[emb_list_vector]` for EmbeddingList search. | [Index StructArray Fields](index-structarray-fields.md) |
| Create a regular vector-metric index on `chunks[emb]` for element-level search. | [Index StructArray Fields](index-structarray-fields.md) |

<div class="alert note">

Warning

A vector field or vector subfield accepts only one index. If you need both EmbeddingList search and element-level search, create two separate vector subfields. In this page, `chunks[emb_list_vector]` is indexed for EmbeddingList search, and `chunks[emb]` is indexed for element-level search.

</div>

## Choose a search mode

| Aspect | EmbeddingList search | Element-level search |
| --- | --- | --- |
| Target subfield | `chunks[emb_list_vector]` | `chunks[emb]` |
| Query data | An embedding list that contains one or more vectors. | A regular vector. |
| Metric family | `MAX_SIM*`, such as `MAX_SIM_COSINE`. | Regular vector metrics, such as `COSINE`, `IP`, or `L2`. |
| What one hit represents | A matched entity whose StructArray vector subfield is similar to the query embedding list. | A matched Struct element inside the StructArray field. |
| Result granularity | Entity level. | Struct element level. |
| Offset | Not applicable. | Identifies the zero-based position of the matched Struct element when returned. |
| Typical use | ColBERT, ColPali, and other late-interaction retrieval patterns. | Chunk-level, passage-level, clip-level, patch-level, or fact-level retrieval. |

## Run EmbeddingList search

Use EmbeddingList search when the query itself contains multiple vectors and the target StructArray vector subfield is indexed with a `MAX_SIM*` metric. The result is an entity-level match.

```python
from pymilvus import MilvusClient
from pymilvus.client.embedding_list import EmbeddingList

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

query = EmbeddingList()
query.add([0.12, 0.21, 0.32, 0.44])
query.add([0.18, 0.23, 0.29, 0.36])

results = client.search(
    collection_name="tech_articles",
    data=[query],
    anns_field="chunks[emb_list_vector]",
    limit=3,
    output_fields=[
        "doc_id",
        "title",
        "category",
        "chunks[text]",
        "chunks[section]",
    ],
)

for hits in results:
    for hit in hits:
        print(hit["id"], hit["distance"], hit["entity"])
```

In this search mode, `limit` controls how many entities are returned for each query. The output can include StructArray subfields, but the hit itself represents the matched parent entity rather than one specific Struct element.

<div class="alert note">

For a full ColBERT or ColPali-style walkthrough, see [Search with Embedding Lists](search-with-embedding-lists.md). This page only covers the basic StructArray search behavior.

</div>

## Run element-level search

Use element-level search when each Struct element should participate in vector search independently. The query is a regular vector, and the target vector subfield must be indexed with a regular vector metric.

```python
query_vector = [0.19, 0.24, 0.30, 0.37]

results = client.search(
    collection_name="tech_articles",
    data=[query_vector],
    anns_field="chunks[emb]",
    limit=5,
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

In element-level search, each hit represents a matched Struct element. The `offset` value is the zero-based position of that element in the StructArray field. The same entity can appear more than once if more than one Struct element matches the query. The `limit` value applies to element hits, not unique parent entities.

## Interpret results

| Result item | EmbeddingList search | Element-level search |
| --- | --- | --- |
| `id` | Primary key of the matched entity. | Primary key of the entity that contains the matched Struct element. |
| `distance` or score | Score or distance between the query embedding list and the stored embedding list. | Score or distance between the query vector and the matched Struct element vector. |
| `offset` | Not applicable. | Zero-based position of the matched Struct element when returned. |
| Repeated primary keys | Not expected for a single query because results are entity-level. | Possible, because multiple Struct elements in the same entity can match. |
| Requested StructArray output fields | Returned from the matched entity. | Returned with the element-level hit shape supported by the target API and SDK. |

## Common mistakes

- Using `chunks.emb` instead of the required subfield path syntax `chunks[emb]`.

- Using an EmbeddingList query against a vector subfield indexed with a regular vector metric.

- Using a regular vector query against a vector subfield indexed with a `MAX_SIM*` metric.

- Expecting element-level search `limit` to return that many unique parent entities. It returns element hits.

- Expecting EmbeddingList search to return one specific element offset. It returns entity-level matches.

- Reusing one vector subfield for both search modes. Use separate vector subfields because each vector subfield accepts only one index.

## Next steps

1. To restrict element-level search by scalar conditions, read [Filtered Search with StructArray](filtered-search-with-structarray.md).

2. To search by score or distance boundaries, read [Range Search with StructArray](range-search-with-structarray.md).

3. To return at most one result per parent entity after element-level search, read [Grouping Search with StructArray](grouping-search-with-structarray.md).

4. To combine StructArray search with other vector searches, read [Hybrid Search with StructArray](hybrid-search-with-structarray.md).

5. To review supported data types, metrics, filters, and version-specific limits, read [StructArray Limits](structarray-limits.md).
