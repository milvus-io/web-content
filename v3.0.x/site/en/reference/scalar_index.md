---
id: scalar_index.md
related_key: scalar_index
summary: Compare scalar index types, check field compatibility, and understand automatic index selection.
title: Scalar Index
---

# Scalar Index

Scalar indexes can accelerate [filtering](boolean.md) on non-vector fields. Use this overview to choose an index, check field compatibility, and understand automatic selection.

Consider indexing fields used in frequent or slow filters. For each field you include in the index-creation request, choose one of two options:

- **Specify an index type:** Choose one compatible with the field's data type and your filters.
- **Use `AUTOINDEX`:** Set `index_type` to `AUTOINDEX` to let Milvus choose a type. See [AUTOINDEX behavior](#AUTOINDEX-behavior).

## Index types

<a id="Supported-predicates"></a>
<a id="Comparisons-and-membership"></a>
<a id="String-patterns"></a>

Open an index guide for its supported filters, parameters, and creation steps:

| Index type | Use for |
| --- | --- |
| [INVERTED](inverted.md) | Equality, membership, and range filters. |
| [BITMAP](bitmap.md) | Fields with few distinct values, such as status codes. |
| [STL_SORT](stl-sort.md) | Value lookups and range filters. |
| [TRIE](trie.md) | Exact string lookups and prefix matching on `VARCHAR` fields. |
| [NGRAM](ngram.md) | LIKE and eligible regex filters. |
| [RTREE](rtree.md) | Spatial filters on `GEOMETRY` fields. |

Check the field compatibility table below and the selected index's filter support before creating an index.

<details id="Filter-execution">
<summary><strong>How filters use indexes</strong></summary>

An index serves only eligible expressions; other filters can scan the data. Arithmetic and comparisons between fields do not inherit literal-lookup acceleration. For logical combinations and NULL tests, see [Basic Operators](basic-operators.md).

</details>

<a id="Choosing-a-scalar-index"></a>

## Supported field types

<a id="Array-JSON-and-spatial-predicates"></a>
<a id="JSON-field-indexing"></a>

Find your field's data type to see its supported explicit indexes. In array rows, `ARRAY<T>` means `ARRAY` with `element_type=T`:

| Field type | Explicit index types | Conditions |
| --- | --- | --- |
| `BOOL` | `INVERTED`, `BITMAP` | Scalar Boolean fields do not support `STL_SORT`. |
| `INT8`, `INT16`, `INT32`, `INT64` | `INVERTED`, `BITMAP`, `STL_SORT` | `BITMAP` is unavailable on primary-key fields. |
| `FLOAT`, `DOUBLE` | `INVERTED`, `STL_SORT` | Explicit `BITMAP` is unavailable. |
| `VARCHAR` | `INVERTED`, `BITMAP`, `STL_SORT`, `TRIE`, `NGRAM` | `BITMAP` is unavailable on primary-key fields. See [index selection by filter](#String-pattern-indexes). |
| `TIMESTAMPTZ` | `STL_SORT` | See [TIMESTAMPTZ Field](timestamptz-field.md). |
| `GEOMETRY` | `RTREE` | See [RTREE](rtree.md). |
| `ARRAY<BOOL>` | `INVERTED`, `BITMAP` | See [Array index support](array_data_type.md#Array-index-support). |
| `ARRAY<INT8>`, `ARRAY<INT16>`, `ARRAY<INT32>`, `ARRAY<INT64>` | `INVERTED`, `BITMAP` | See [Array index support](array_data_type.md#Array-index-support). |
| `ARRAY<FLOAT>`, `ARRAY<DOUBLE>` | `INVERTED` | See [Array index support](array_data_type.md#Array-index-support). |
| `ARRAY<VARCHAR>` | `INVERTED`, `BITMAP` | See [Array index support](array_data_type.md#Array-index-support). |
| `JSON` | Depends on the indexed path and cast type. | Check [JSON path compatibility and requirements](json-indexing.md#Understand-cast-types). |
| StructArray non-vector subfields | Depends on the subfield's data type. | Index subfields separately; `BOOL` subfields cannot use explicit `STL_SORT`. See [subfield rules](index-structarray-fields.md#Create-scalar-indexes). |
| `TEXT` | None | User-created scalar indexes, including `AUTOINDEX`, are unavailable. |

<div class="alert note">

> Scalar indexes, including `AUTOINDEX`, do not support recursive ARRAY fields or arrays with nullable elements. See [Array index support](array_data_type.md#Array-index-support) for ordinary-array filters and [Index StructArray Fields](index-structarray-fields.md#Create-scalar-indexes) for subfield rules.

</div>


<details id="String-pattern-indexes">
<summary><strong>Choose an index for VARCHAR filters</strong></summary>

For a `VARCHAR` field, compare compatible indexes based on your filters:

| Filtering need | Index guides and conditions |
| --- | --- |
| Exact string lookups and prefixes | [TRIE](trie.md#Queries-accelerated-by-TRIE), [STL_SORT](stl-sort.md#Queries-accelerated-by-STLSORT), or [INVERTED](inverted.md#Queries-accelerated-by-INVERTED). |
| Few distinct string values | [BITMAP](bitmap.md#Queries-accelerated-by-BITMAP); patterns are evaluated against indexed values. |
| LIKE or regex with suitable fixed literals | [NGRAM](ngram.md#Queries-accelerated-by-NGRAM) on `VARCHAR` fields or JSON string paths, subject to gram-length and recheck conditions. |
| Regex without usable fixed literals | The query can scan data or evaluate many indexed values; check the selected index's conditions. |

Ranges on `VARCHAR` use string ordering, even when strings contain numbers. Index use depends on query planning, extractable literals, cardinality, and data distribution. See [Pattern Matching](pattern-matching.md#Accelerate-pattern-matching-with-indexes) for planning rules. For JSON string paths, check the path and cast requirements in [JSON Indexing](json-indexing.md).

</details>

<a id="How-AUTOINDEX-selects"></a>

## AUTOINDEX behavior

Set `index_type` to `AUTOINDEX` in each selected field's index definition. Milvus chooses a type using the data type and, where applicable, the number of distinct values in each index build:

| Field type | Default selection |
| --- | --- |
| `BOOL`, `ARRAY<BOOL>` | `BITMAP` |
| `INT8`, `INT16`, `INT32`, `INT64`, `FLOAT`, `DOUBLE`, `VARCHAR` | `BITMAP` for fewer than 100 distinct values; otherwise `STL_SORT`. |
| `ARRAY` with `element_type` set to `INT8`, `INT16`, `INT32`, `INT64`, `FLOAT`, `DOUBLE`, or `VARCHAR` | `BITMAP` for fewer than 100 distinct elements; otherwise `INVERTED`. |
| `JSON` paths cast to `BOOL`, `DOUBLE`, or `VARCHAR` | `INVERTED` by default in 3.0. The [JSON opt-in setup](json-indexing.md#Index-requirements) enables the scalar bitmap/sorted strategy above. |
| `JSON` paths cast to `ARRAY_BOOL`, `ARRAY_DOUBLE`, or `ARRAY_VARCHAR` | Use explicit `INVERTED`; the default 3.0.6 mapping rejects automatic selection for these casts. |
| `TIMESTAMPTZ` | `STL_SORT` |
| `GEOMETRY` | `RTREE` |
| `TEXT` | Not supported. |

<div class="alert note">

> For a supported scalar field, an index definition that omits `index_type` also requests automatic selection. Fields not included in the request are not indexed.

</div>

<a id="Version-compatibility"></a>

<details>
<summary><strong>Selection details</strong></summary>

- **Internal layouts:** `AUTOINDEX` can select layouts unavailable as explicit choices, such as bitmap indexing for `FLOAT` and `DOUBLE`. The cardinality-based strategy is called `HYBRID` internally; you cannot specify it directly. The selected index determines which filters can use it.
- **Cardinality threshold:** <a id="Cardinality-threshold"></a>Set `bitmap_cardinality_limit` (range: 1–1000) to override the default threshold. Values below it use bitmap; at or above it, the data type's high-cardinality layout applies. Explicit `INVERTED`, `STL_SORT`, and `BITMAP` builds bypass cardinality-based selection and ignore this threshold.
- **Administrator overrides:** Change type mappings through `scalarAutoIndex.params.build`. `scalarAutoIndex.enable=false` (default) still allows explicit `AUTOINDEX`; `true` also applies automatic selection to valid manual requests.

</details>

## What's next

<a id="Performance-considerations"></a>
<a id="Estimating-memory-requirements"></a>

Choose a guide for your next task:

- **Create an index:** Use the [index guide](#Index-types) for parameters and creation examples.
- **Plan resources:** See memory guidance for [STL_SORT](stl-sort.md#Memory-considerations), [BITMAP](bitmap.md#Memory-considerations), [INVERTED](inverted.md#Memory-considerations), or [NGRAM](ngram.md#Memory-considerations). Compare memory use, build time, and query latency with representative data and filters.
- **Configure text search:** [Text Match](keyword-match.md) and [Full Text Search](full-text-search.md) cover text analysis, BM25, `TEXT_MATCH`, and `PHRASE_MATCH`. A scalar `INVERTED` index does not enable these mechanisms.

<details id="Drop-index-compatibility">
<summary><strong>Dropping scalar indexes on older Milvus releases</strong></summary>

In Milvus v2.6.3 or earlier, release the collection before dropping a scalar index. From v2.6.4 onward, you can drop it without releasing the collection.

</details>
