---
id: array-of-structs.md
title: "StructArray Overview"
summary: "Use StructArray when one entity needs to store an ordered list of structured elements, such as one document with many chunks, one page with many visual patches, or one video with many clips. StructArray keeps these elements inside the parent entity while still allowing vector search and scalar filtering on fields inside each element."
---
# StructArray Overview

Use StructArray when one entity needs to store an ordered list of structured elements, such as one document with many chunks, one page with many visual patches, or one video with many clips. StructArray keeps these elements inside the parent entity while still allowing vector search and scalar filtering on fields inside each element.

## What is StructArray?

A **StructArray**, also known as an array of structs, stores an ordered set of Struct elements in each entity. Every Struct element in the array follows the same schema. A Struct element can contain scalar subfields, vector subfields, or both.

For example, a collection can store one article as an entity and store its chunks in a StructArray field named `chunks`. Each chunk can include text, section metadata, quality scores, and one or more vector embeddings.

```json
{
  "doc_id": 1,
  "title": "Vector search tuning guide",
  "category": "search",
  "title_vector": [0.10, 0.20, 0.30, 0.40],
  "chunks": [
    {
      "text": "Use HNSW efSearch to trade recall for latency.",
      "section": "index",
      "page": 1,
      "quality_score": 0.92,
      "has_code": true,
      "emb_list_vector": [0.11, 0.21, 0.31, 0.41],
      "emb": [0.12, 0.20, 0.33, 0.39]
    },
    {
      "text": "Range search returns vectors within a distance boundary.",
      "section": "search",
      "page": 2,
      "quality_score": 0.86,
      "has_code": false,
      "emb_list_vector": [0.18, 0.23, 0.29, 0.36],
      "emb": [0.19, 0.24, 0.30, 0.37]
    }
  ]
}
```

<div class="alert note">

The two vector subfields in this example represent the same chunk from two search perspectives. `chunks[emb_list_vector]` is intended for EmbeddingList search with `MAX_SIM*` metrics, while `chunks[emb]` is intended for element-level search with regular vector metrics such as `COSINE`, `IP`, or `L2`.

</div>

## When to use StructArray

Use StructArray when the natural unit you want to return is larger than the natural unit you want to search or filter.

| Use case | Why StructArray helps | Typical StructArray field |
| --- | --- | --- |
| Document retrieval | Store one document as an entity while searching across its chunks. | `chunks` |
| Late-interaction retrieval | Store a document or page as an embedding list and score it with `MAX_SIM*`. | `chunks[emb_list_vector]` or `patches[emb]` |
| Element-level retrieval | Return the most relevant chunk, clip, patch, or observation, including its array offset. | `chunks[emb]` |
| Structured filtering | Filter by scalar subfields inside Struct elements, such as section, score, page, or flags. | `chunks[section]`, `chunks[quality_score]` |
| Reducing duplicate parent results | Keep child elements under the same parent entity instead of storing each child as a separate row. | `chunks`, `clips`, `patches` |

## Decision Matrix

Use the following matrix to choose the right StructArray path.

| Goal | Recommended path | Result granularity | Start here |
| --- | --- | --- | --- |
| Model one parent object with many structured children. | Create a StructArray field. | Entity contains ordered Struct elements. | [Create a StructArray Field](create-structarray-field.md) |
| Insert parent records with nested child data. | Insert entities whose StructArray field is a list of Struct objects. | Entity-level insert. | [Insert Data into StructArray Fields](insert-data-into-structarray-fields.md) |
| Run ColBERT, ColPali, or document-level late-interaction retrieval. | Use EmbeddingList search with a `MAX_SIM*` index. | Entity level. | [Search with Embedding Lists](search-with-embedding-lists.md) |
| Search individual chunks, clips, or patches. | Use element-level search with a regular vector metric. | Struct element level, with offset when available. | Basic Vector Search with StructArray |
| Restrict element-level vector search to elements that match scalar conditions. | Use `element_filter`. | Element-level filtering; result shape depends on the search type. | Filtered Search with StructArray |
| Select entities by how many Struct elements satisfy a condition. | Use `MATCH_ANY`, `MATCH_ALL`, `MATCH_LEAST`, `MATCH_MOST`, or `MATCH_EXACT`. | Entity level. | [StructArray Operators](struct-array-operators.md) |
| Use score or distance boundaries on StructArray vector subfields. | Use element-level range search. | Struct element level. | Range Search with StructArray |
| Return at most one result per parent entity after element-level search. | Use grouping search by primary key. | Entity level after grouping. | Grouping Search with StructArray |
| Combine StructArray element search with another vector field. | Use hybrid search with one AnnSearchRequest targeting a StructArray vector subfield. | Element-level sub-search, entity-level reranking. | Hybrid Search with StructArray |

## Understand the two search models

| ### EmbeddingList search EmbeddingList search treats the vectors inside a StructArray vector subfield as one embedding list for the parent entity. The query is also an embedding list. Milvus compares the query embedding list with the stored embedding list by using a `MAX_SIM*` metric and returns matching entities. - Query data: embedding list. - Metric family: `MAX_SIM*`. - Result granularity: entity level. - Best for: document-level or page-level late-interaction retrieval. | ### Element-level search Element-level search treats each Struct element as an independent vector-search candidate. Each hit represents a matched element inside the StructArray field, and ungrouped results can expose the element offset. - Query data: regular vector. - Metric family: regular vector metrics. - Result granularity: Struct element level. - Best for: chunk-level, clip-level, or patch-level retrieval. |
| --- | --- |

<div class="alert note">

Warning

If your collection needs both EmbeddingList search and element-level search, use two separate vector subfields. A vector field or vector subfield accepts only one index, and the two search modes require different metric families.

</div>

## Documentation map

StructArray documentation is split into modeling pages and search pages. Use the modeling pages to define and prepare data. Use the search pages to choose the right retrieval and filtering behavior.

| Area | Page | Use it for |
| --- | --- | --- |
| Modeling | [Create a StructArray Field](create-structarray-field.md) | Define Struct schema and add a StructArray field. |
| Modeling | [Insert Data into StructArray Fields](insert-data-into-structarray-fields.md) | Prepare and insert nested StructArray data. |
| Modeling | [Index StructArray Fields](index-structarray-fields.md) | Create vector and scalar indexes on StructArray subfields. |
| Reference | [StructArray Limits](structarray-limits.md) | Check schema, data type, index, search, filter, and version limits. |
| Search | Basic Vector Search with StructArray | Compare EmbeddingList search and element-level vector search. |
| Search | Range Search with StructArray | Use range constraints with StructArray vector subfields. |
| Search | Grouping Search with StructArray | Group element-level search results by primary key. |
| Search | Hybrid Search with StructArray | Combine StructArray element-level search with other vector searches. |
| Search | Filtered Search with StructArray | Use StructArray filters in search, query, and hybrid search. |
| Search | [Search with Embedding Lists](search-with-embedding-lists.md) | Build ColBERT and ColPali-style retrieval systems with StructArray. |
| Filter | [StructArray Operators](struct-array-operators.md) | Reference syntax for `element_filter` and `MATCH_*` operators. |

## Key limits to check first

- Struct can be used as the element type of an Array field. It is not used as a top-level collection field.

- All Struct elements in the same StructArray field share one predefined schema.

- Vector subfields require indexes. EmbeddingList search uses `MAX_SIM*` metrics, while element-level search uses regular vector metrics.

- `element_filter` and `MATCH_*` are for scalar subfields inside StructArray fields. Use `$[subfield]` only inside these operators.

- Some search combinations are version-gated or mode-specific. Check [StructArray Limits](structarray-limits.md) before relying on range search, grouping search, hybrid search, nullable fields, or dynamically added fields.

## Next steps

1. To design a schema, read [Create a StructArray Field](create-structarray-field.md).

2. To prepare data, read [Insert Data into StructArray Fields](insert-data-into-structarray-fields.md).

3. To choose indexes, read [Index StructArray Fields](index-structarray-fields.md).

4. To search StructArray vector subfields, start with Basic Vector Search with StructArray.

5. To filter StructArray scalar subfields, read [StructArray Operators](struct-array-operators.md) and Filtered Search with StructArray.
