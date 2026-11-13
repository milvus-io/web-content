---
id: scalar_index.md
related_key: scalar_index
summary: Scalar indexes accelerate filtering on non-vector fields. This reference explains how Milvus selects scalar indexes, which index types you can specify, and the data types each index supports.
title: Scalar Index
---

# Scalar Index

Scalar indexes accelerate filtering on non-vector fields, such as categories, prices, timestamps, and locations. When a filter expression narrows a search, a scalar index lets Milvus locate matching entities without scanning the field.

If you are unsure which index to choose, use `AUTOINDEX`. Specify an index type manually only when you need a particular behavior.

## Choosing a scalar index

The following table lists the index Milvus selects by default when you use `AUTOINDEX`, together with the index types you can specify manually for each data type.

| Data type | AUTOINDEX default | Manual index types |
| --- | --- | --- |
| `BOOL` | `BITMAP` | `INVERTED`, `BITMAP` |
| `INT8`, `INT16`, `INT32`, `INT64` | `HYBRID` | `INVERTED`, `BITMAP`, `STL_SORT` |
| `FLOAT`, `DOUBLE` | `HYBRID` | `INVERTED`, `STL_SORT` |
| `VARCHAR` | `HYBRID` | `INVERTED`, `BITMAP`, `STL_SORT`, `TRIE`, `NGRAM`, `FMINDEX` |
| `TIMESTAMPTZ` | `STL_SORT` | `STL_SORT` |
| `GEOMETRY` | `RTREE` | `RTREE` |
| `JSON` with a typed scalar or array cast | `HYBRID` | Depends on `json_cast_type`; see [JSON field indexing](#JSON-field-indexing). |
| `ARRAY<BOOL>` | `BITMAP` | `INVERTED`, `BITMAP`, `STL_SORT` |
| `ARRAY<INT8>` through `ARRAY<INT64>` | `HYBRID` | `INVERTED`, `BITMAP`, `STL_SORT` |
| `ARRAY<FLOAT>`, `ARRAY<DOUBLE>` | `HYBRID` | `INVERTED`, `STL_SORT` |
| `ARRAY<VARCHAR>` | `HYBRID` | `INVERTED`, `BITMAP`, `STL_SORT` |
| `TEXT` | Not supported | None |

`HYBRID` is an internal strategy, not a type you can specify directly. See [How AUTOINDEX selects](#How-AUTOINDEX-selects).

The following restrictions apply:

- **Primary keys:** `BITMAP` is unavailable on primary-key fields.
- **Arrays:** Recursive arrays and arrays with nullable elements do not support scalar indexing, including `AUTOINDEX`. Ordinary arrays support Boolean, integer, floating-point, and VARCHAR elements.
- **Struct arrays:** Index scalar subfields individually. Their support can differ from ordinary arrays; for example, a Boolean struct subfield does not support explicit `STL_SORT`.
- **TEXT:** User-created scalar indexes, including `AUTOINDEX`, are unavailable. Text analysis and BM25 search use separate mechanisms.

## Index types

| Index type | What it's for |
| --- | --- |
| `INVERTED` | General-purpose equality, membership, and range filters. |
| `BITMAP` | Fields with few distinct values; compact bitwise filtering. |
| `STL_SORT` | Sorted value lookups and range filtering. |
| `TRIE` | String equality and prefix matching. |
| `NGRAM` | LIKE and regex on strings by narrowing candidates. |
| `FMINDEX` | Exact prefix, suffix, and infix substring matching. |
| `RTREE` | Spatial filtering on GEOMETRY fields. |

For creation examples, index parameters, and supported queries, refer to [BITMAP](bitmap.md), [INVERTED](inverted.md), [NGRAM](ngram.md), [STL_SORT](stl-sort.md), [TRIE](trie.md), [FMINDEX](fmindex.md), and [RTREE](rtree.md).

## How AUTOINDEX selects

With `AUTOINDEX`, Milvus selects an index using the field type, server configuration, and, for some fields, the number of distinct values (cardinality). The default selections are listed in [Choosing a scalar index](#Choosing-a-scalar-index).

For most fields, `AUTOINDEX` uses an internal `HYBRID` strategy that picks an index by cardinality:

- **`BITMAP`** when a build contains fewer than 100 distinct values.
- **`STL_SORT`** when a build contains 100 or more distinct values.

Array indexes use a separate compatibility policy: their high-cardinality branch uses `STL_SORT` when the cluster supports it, and `INVERTED` otherwise. See [Version compatibility](#Version-compatibility).

`HYBRID` is internal only — you cannot specify it directly. An internal selection can also use an index that is unavailable as an explicit choice for that field, such as bitmap indexing for floating-point values.

> These selections are defaults. Administrators can change them through `scalarAutoIndex.params.build`. The `scalarAutoIndex.enable` setting defaults to `false`, which still allows explicit `AUTOINDEX` and selection when the index type is omitted; setting it to `true` also applies automatic selection to otherwise valid manual requests.

## JSON field indexing

To index JSON values, specify `json_cast_type` to indicate the type of values to index. This parameter is required for both automatic and manual indexing. Use `json_path` to identify the path; if omitted, Milvus uses the field name supplied in the request.

| json_cast_type | AUTOINDEX default | Manual index types |
| --- | --- | --- |
| `BOOL` | `HYBRID` | `INVERTED`, `BITMAP` |
| `DOUBLE` | `HYBRID` | `INVERTED`, `STL_SORT` |
| `VARCHAR` | `HYBRID` | `INVERTED`, `BITMAP`, `STL_SORT`, `NGRAM` |
| `ARRAY_BOOL` | `HYBRID` | `INVERTED`, `STL_SORT` |
| `ARRAY_DOUBLE` | `HYBRID` | `INVERTED`, `STL_SORT` |
| `ARRAY_VARCHAR` | `HYBRID` | `INVERTED`, `STL_SORT` |

The optional `json_cast_function="STRING_TO_DOUBLE"` converts string values for a `DOUBLE` cast. It cannot be used with other cast types. Neither `TRIE` nor `FMINDEX` supports JSON fields.

## Supported predicates

The following tables show which predicates each index can help evaluate. **Index support does not guarantee that Milvus will use the index for every query.** Milvus can scan field data when the index is unsuitable for a particular expression or pattern.

### Comparisons and membership

Equality and membership include `==`, `!=`, `in`, and `not in`. Range comparisons include `<`, `<=`, `>`, `>=`, and expressions such as `10 <= price < 50`.

| Index type | Field data types | Predicates supported by the index |
| --- | --- | --- |
| `INVERTED` | `BOOL` | Equality and membership |
| `INVERTED` | Integers, `FLOAT`, `DOUBLE`, `VARCHAR` | Equality, membership, and ranges |
| `BITMAP` | `BOOL` | Equality and membership |
| `BITMAP` | Integers, `VARCHAR` | Equality, membership, and ranges |
| `STL_SORT` | Integers, `FLOAT`, `DOUBLE`, `TIMESTAMPTZ`, `VARCHAR` | Equality, membership, and ranges |
| `TRIE` | `VARCHAR` | Equality, membership, and ranges; range evaluation may visit multiple indexed strings |
| `NGRAM` | `VARCHAR` | String patterns only; no direct equality, membership, or range lookup |
| `FMINDEX` | `VARCHAR` | String patterns only; no direct equality, membership, or range lookup |
| `RTREE` | `GEOMETRY` | Spatial predicates, listed below |
| `AUTOINDEX` | Supported scalar types | Depends on the selected index. Internal `HYBRID` selections use the capabilities of their bitmap, sorted, or inverted index. |

VARCHAR ranges compare string values rather than interpreting them as numbers. The table describes comparisons against literal values only; it does not imply that arithmetic expressions or comparisons between two fields receive the same index acceleration.

### String patterns

This table applies to VARCHAR fields. For JSON string paths, use an index and `VARCHAR` cast supported by the JSON indexing table; the corresponding string behavior applies.

- **Yes:** The index returns exact matches.
- **Check indexed values:** Milvus evaluates the pattern against strings stored in the index, which can require visiting many distinct strings.
- **Candidates:** The index narrows down possible matches, then Milvus checks the original values.
- **Scan:** The index does not serve the predicate; Milvus uses another eligible path or scans the field.

| Index type | Prefix `like "abc%"` | Suffix `like "%abc"` | Substring `like "%abc%"` | General LIKE `like "a%b_c"` | Regex `=~ "a.*b"` |
| --- | --- | --- | --- | --- | --- |
| `INVERTED` | Yes | Scan | Scan | Yes | Scan |
| `BITMAP` | Check indexed values | Check indexed values | Check indexed values | Check indexed values | Check indexed values |
| `STL_SORT` | Yes | Check indexed values | Check indexed values | Check indexed values | Check indexed values |
| `TRIE` | Yes | Check indexed values | Check indexed values | Check indexed values | Check indexed values |
| `NGRAM` | Candidates | Candidates | Candidates; exact for a literal within the configured gram-length range | Candidates | Candidates |
| `FMINDEX` | Yes | Yes | Yes | Candidates | Candidates |

These entries describe the operator after query planning. Milvus can simplify a literal LIKE pattern to equality, and a simple anchored regex to equality, prefix, or suffix matching; for example, `name =~ "^abc$"` becomes an equality test and follows the equality table.

`INVERTED` treats simple suffix and substring forms as scans even though more complex LIKE patterns can use the index. `NGRAM` requires literal text at least `min_gram` characters long; general LIKE requires each non-empty literal fragment to meet that minimum, and regex acceleration depends on extracting suitable literals. Otherwise, Milvus scans the data. `FMINDEX` can also choose a scan when a pattern provides little useful filtering or is too expensive to resolve through the index.

These are string-value predicates. Token-based functions such as `TEXT_MATCH` and `PHRASE_MATCH` use text-match indexing configured through field properties; choosing a scalar `INVERTED` index does not enable those functions.

### Array, JSON, and spatial predicates

| Index type | Data type or cast | Predicates that can use the index | Notes |
| --- | --- | --- | --- |
| `INVERTED`, `BITMAP`, `STL_SORT`, or an eligible `AUTOINDEX` selection | Ordinary arrays with supported element types | `ARRAY_CONTAINS`, `ARRAY_CONTAINS_ANY`, `ARRAY_CONTAINS_ALL` | Matches elements regardless of their position. Index/type restrictions still apply. |
| `INVERTED`, `STL_SORT` | Ordinary arrays of Boolean, integer, or VARCHAR values | Whole-array `==` and `!=` | Can use index candidates followed by checks of the original arrays. Floating-point arrays fall back to scanning; bitmap indexes do not serve this candidate path. |
| `INVERTED`, `BITMAP`, `STL_SORT`, or an eligible `AUTOINDEX` selection | JSON paths cast to `BOOL`, `DOUBLE`, or `VARCHAR` | Comparisons and membership appropriate to the cast type | The indexed path and cast must match the query. String patterns follow the preceding table. |
| `NGRAM` | JSON paths cast to `VARCHAR` | LIKE and regex patterns | Uses the same pattern eligibility rules as VARCHAR NGRAM indexes. |
| `INVERTED`, `STL_SORT`, or an eligible `AUTOINDEX` selection | JSON paths cast to `ARRAY_BOOL`, `ARRAY_DOUBLE`, or `ARRAY_VARCHAR` | `JSON_CONTAINS`, `JSON_CONTAINS_ANY`, `JSON_CONTAINS_ALL` | Requires compatible element types. Mixed-type or nested-array operands can fall back to scanning. |
| JSON path indexes | Indexed JSON paths | `exists` | Tests whether the path exists, which is different from testing its value or whether the whole field is null. |
| `RTREE` | `GEOMETRY` | `ST_EQUALS`, `ST_INTERSECTS`, `ST_CONTAINS`, `ST_WITHIN`, `ST_TOUCHES`, `ST_OVERLAPS`, `ST_CROSSES`, `ST_DWITHIN` | Uses bounding boxes to find candidates, then checks the exact spatial relation. `ST_ISVALID` does not use RTREE. |

Array containment support does not imply index lookup for an element at a specific position, such as `values[0]`, or for array length. Whole-array equality must also check order and length, which element membership alone cannot establish.

`IS NULL` and `IS NOT NULL` use validity information and do not require a particular scalar index type. You can combine predicates with `and`, `or`, and `not`; each part can use its own eligible execution path.

## Version compatibility

Most scalar indexes — `BITMAP`, `INVERTED`, `STL_SORT`, `TRIE`, and `NGRAM` on ordinary scalar fields — have no version requirement. The requirements below apply only to the newer combinations: indexes on array fields, JSON-path indexes, and `FMINDEX`.

These requirements use scalar index engine version numbers, an internal capability counter that is distinct from Milvus software release numbers.

| Capability | Requirement |
| --- | --- |
| Explicit `FMINDEX` | Scalar index engine version 5 or newer |
| Explicit `STL_SORT` on ordinary arrays | Scalar index engine version 3 or newer, with array sort support enabled |
| `HYBRID` selecting `STL_SORT` for ordinary arrays | Scalar index engine version 5 or newer, with array sort support enabled |
| `BITMAP`, `STL_SORT`, or `HYBRID` on JSON scalar paths | Scalar index engine version 4 or newer |
| `STL_SORT` or `HYBRID` on typed JSON array paths | Scalar index engine version 3 or newer, with array sort support enabled |

If an array or JSON compatibility requirement is not met, affected automatic requests can fall back to `INVERTED`, and explicit requests for unsupported combinations fail. For ordinary-array `HYBRID`, the high-cardinality branch continues to use `INVERTED` until sorted indexing is available.

## Performance considerations

Index performance depends on the data distribution and the filters your application uses. Cardinality, string length, array length, and the number of matching entities can all affect memory usage and query latency. Compare indexes using representative data and filter expressions, and measure memory use, build time, and query latency together.

### Estimating memory requirements

The following formulas give a rough idea of the memory needed by a scalar index after loading, with memory mapping disabled. The `STL_SORT` formulas assume ordinary scalar fields with no null values.

- `N`: number of entities.
- `D`: number of distinct values.
- `l`: average length of distinct strings, in **bytes**.
- `S`: size of the built index before storage compression, in **bytes**.

| Index type | Rough memory estimate in bytes | Intuition |
| --- | --- | --- |
| `STL_SORT` on `INT8`, `INT16`, `INT32`, or `FLOAT` | `12 * N` | About 12 bytes per entity. |
| `STL_SORT` on `INT64`, `DOUBLE`, or `TIMESTAMPTZ` | `20 * N` | About 20 bytes per entity for larger values. |
| `STL_SORT` on `VARCHAR` | `8 * N + (l + 16) * D` | Repeated strings share storage, so fewer distinct strings usually means less memory. |
| `BITMAP`, using dense bitmaps | `(D + 1) * N / 8` | Each distinct value needs roughly one bit per entity, plus one bitmap to track valid entities. |
| `INVERTED` or `NGRAM` | `S` | Start with approximately the size of the built index. |
| `FMINDEX` | `2 * S` | Allow approximately twice the built index size. |

Divide the result by `1024 * 1024` to convert bytes to **MiB**. For example, an `STL_SORT` index on one million non-null `INT64` values needs roughly **19 MiB** for its main data structures. For VARCHAR fields where every string is unique, the estimate simplifies to `(l + 24) * N`; one million unique strings averaging 32 bytes gives roughly **53 MiB**.

The BITMAP formula describes dense bitmap storage; enabling the optional offset cache adds approximately `8 * N` bytes on a 64-bit system. For `INVERTED`, `NGRAM`, and `FMINDEX`, build an index on representative data to obtain `S` — raw data size is not a substitute for built index size. For `AUTOINDEX`, use the formula for the index actually selected, and apply estimates per segment, then add them across loaded segments and replicas.

These are approximate planning figures, not memory limits. They omit temporary memory used during building, loading, and queries, and they are more sensitive to distinct values and data distribution for string and bitmap indexes than for numeric `STL_SORT`. No fixed percentage of accuracy is guaranteed. Memory mapping, older index formats, arrays, and JSON fields require separate measurement. Before sizing a deployment, check actual memory use with representative data and queries, and leave headroom for peak usage.

## What's next

- For index creation and configuration examples, refer to [BITMAP](bitmap.md), [INVERTED](inverted.md), [NGRAM](ngram.md), [STL_SORT](stl-sort.md), [TRIE](trie.md), [FMINDEX](fmindex.md), and [RTREE](rtree.md).
- For field definitions and collection schemas, refer to [Schema Explained](schema.md).
