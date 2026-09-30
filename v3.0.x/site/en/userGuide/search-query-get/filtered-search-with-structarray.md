---
id: filtered-search-with-structarray.md
title: "Filtered Search with StructArray"
summary: "Use this page to add scalar filtering to vector search on StructArray fields. StructArray filtering has two levels: row-level filters select parent entities, while element-level filters constrain which Struct elements participate in element-level vector search."
---
# Filtered Search with StructArray

Use this page to add scalar filtering to vector search on StructArray fields. StructArray filtering has two levels: row-level filters select parent entities, while element-level filters constrain which Struct elements participate in element-level vector search.

This page uses the `tech_articles` collection from [Create a StructArray Field](create-structarray-field.md). The collection has a StructArray field named `chunks`, with scalar subfields such as `section`, `page`, `quality_score`, and `has_code`, plus vector subfields for search.

## Choose a filter type

| Goal | Use | Result behavior |
| --- | --- | --- |
| Filter by a top-level scalar field, such as `category`. | Regular filter expression. | Selects parent entities before or during search. |
| Constrain element-level vector search to Struct elements that match scalar conditions. | `element_filter`. | Searches only matching Struct elements and can return matched element offsets. |
| Select entities by whether any, all, or a specific number of Struct elements match a predicate. | `MATCH_ANY`, `MATCH_ALL`, `MATCH_LEAST`, `MATCH_MOST`, or `MATCH_EXACT`. | Row-level filtering. These operators do not return offsets by themselves. |

<div class="alert note">

This page explains how to use StructArray filters in search workflows. For the full syntax rules, supported predicate types, and unsupported predicate matrix, see [StructArray Operators](struct-array-operators.md).

</div>

## Filter by top-level fields

Use regular filter expressions when the condition belongs to the parent entity, not to an individual Struct element. This works with both EmbeddingList search and element-level search.

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
    filter='category == "search"',
    limit=3,
    output_fields=[
        "doc_id",
        "title",
        "category",
        "chunks[text]",
        "chunks[section]",
    ],
)
```

The filter above selects only entities whose top-level `category` field is `"search"`. It does not identify one matched Struct element.

## Filter element-level vector search

Use `element_filter(structArrayField, predicate)` when the scalar conditions must apply to the same Struct element that participates in element-level vector search. Inside the predicate, use `$[subfield]` to refer to scalar subfields of the current Struct element.

```python
query_vector = [0.19, 0.24, 0.30, 0.37]

filter_expr = (
    'category == "search" && '
    'element_filter(chunks, '
    '$[section] == "index" && '
    '$[quality_score] > 0.9 && '
    '$[has_code] == true)'
)

results = client.search(
    collection_name="tech_articles",
    data=[query_vector],
    anns_field="chunks[emb]",
    filter=filter_expr,
    limit=5,
    output_fields=[
        "doc_id",
        "title",
        "chunks[text]",
        "chunks[section]",
        "chunks[page]",
        "chunks[quality_score]",
        "chunks[has_code]",
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

In this example, the top-level predicate `category == "search"` selects candidate entities, and `element_filter` restricts element-level vector search to chunks where `section`, `quality_score`, and `has_code` all match in the same Struct element.

<div class="alert note">

Warning

When you combine a top-level predicate with `element_filter`, place `element_filter` at the end of the expression. A filter expression can contain only one `element_filter`, and you cannot nest `element_filter` or `MATCH_*` inside another StructArray operator.

</div>

## Filter entities with MATCH operators

Use `MATCH_*` operators when the filter should decide whether a parent entity qualifies based on its Struct elements. These operators are row-level filters: they select entities, but do not return element offsets by themselves.

| Operator | Use it when | Example |
| --- | --- | --- |
| `MATCH_ANY` | At least one Struct element must satisfy the predicate. | `MATCH_ANY(chunks, $[section] == "index")` |
| `MATCH_ALL` | All Struct elements must satisfy the predicate. | `MATCH_ALL(chunks, $[quality_score] > 0.5)` |
| `MATCH_LEAST` | At least `N` Struct elements must satisfy the predicate. | `MATCH_LEAST(chunks, $[has_code] == true, threshold=2)` |
| `MATCH_MOST` | At most `N` Struct elements must satisfy the predicate. | `MATCH_MOST(chunks, $[section] == "appendix", threshold=1)` |
| `MATCH_EXACT` | Exactly `N` Struct elements must satisfy the predicate. | `MATCH_EXACT(chunks, $[section] == "summary", threshold=1)` |

```python
filter_expr = (
    'category == "search" && '
    'MATCH_ANY(chunks, $[section] == "index" && $[quality_score] > 0.9)'
)

results = client.search(
    collection_name="tech_articles",
    data=[query],
    anns_field="chunks[emb_list_vector]",
    filter=filter_expr,
    limit=3,
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

Use `MATCH_ANY` here because the EmbeddingList search result is entity-level. The filter requires at least one chunk in the entity to be an `"index"` chunk with high quality, but the search result itself still represents the parent entity.

## Use filters in hybrid search

In hybrid search, apply StructArray filters where the condition should take effect. A top-level filter can be shared by the whole hybrid search. An `element_filter` should be attached to the StructArray element-level request that needs element-level constraints.

```python
from pymilvus import AnnSearchRequest, RRFRanker

query_vector = [0.19, 0.24, 0.30, 0.37]

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field="title_vector",
    limit=10,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field="chunks[emb]",
    limit=10,
    expr='element_filter(chunks, $[section] == "index" && $[quality_score] > 0.9)',
)

results = client.hybrid_search(
    collection_name="tech_articles",
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    filter='category == "search"',
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

The `filter` argument applies the top-level entity condition, while the `expr` on `chunk_req` constrains only the StructArray element-level vector request. For supported hybrid search combinations and version-specific limits, see [Hybrid Search with StructArray](hybrid-search-with-structarray.md) and [StructArray Limits](structarray-limits.md).

## Predicate support summary

Use scalar subfields in StructArray predicates. Vector subfields are not scalar predicate inputs.

| Subfield type | Typical predicate examples |
| --- | --- |
| `BOOL` | `$[has_code] == true`, `!($[has_code] == true)` |
| Integer types | `$[page] >= 2`, `$[page] in [1, 2, 3]` |
| `FLOAT`, `DOUBLE` | `$[quality_score] > 0.9`, `0.7 < $[quality_score] < 0.95` |
| `VARCHAR` | `$[section] == "index"`, `$[text] like "range%"` |
| Vector subfields | Not supported as `$[...]` scalar predicate inputs. Use vector subfields through vector search instead. |

For unsupported cases such as JSON paths, array container functions, text match functions, null predicates on `$[...]`, Geometry functions, Timestamptz expressions, and generic function calls, see [StructArray Operators](struct-array-operators.md).

## Common mistakes

- Using `$[subfield]` outside `element_filter` or `MATCH_*`.

- Using `chunks.section` instead of StructArray operator syntax such as `element_filter(chunks, $[section] == "index")`.

- Using `element_filter` when you only need row-level filtering. Use `MATCH_ANY` instead if you only need to select entities.

- Expecting `MATCH_*` to return element offsets. These operators select entities and do not identify one matched element by themselves.

- Writing bare boolean predicates such as `$[has_code]`. Use explicit comparisons such as `$[has_code] == true`.

- Putting `element_filter` before a top-level predicate in the same filter expression.

## Next steps

1. To review full StructArray filter syntax, read [StructArray Operators](struct-array-operators.md).

2. To run unfiltered vector searches first, read [Basic Vector Search with StructArray](basic-vector-search-with-structarray.md).

3. To create scalar indexes for frequently used StructArray filters, read [Index StructArray Fields](index-structarray-fields.md).

4. To check version-specific filter and search limits, read [StructArray Limits](structarray-limits.md).
