---
id: structarray-limits.md
title: "StructArray Limits"
summary: "StructArray support spans schema definition, insert payloads, indexing, search modes, and StructArray-specific filters. Use this page as the limits reference before you rely on StructArray behavior in production."
---
# StructArray Limits

StructArray support spans schema definition, insert payloads, indexing, search modes, and StructArray-specific filters. Use this page as the limits reference before you rely on StructArray behavior in production.

Most StructArray limits come from one of three places: the StructArray schema model, the search mode you choose for vector subfields, and the Milvus version that your collection runs on.

## Limits at a glance

| Area | Limit |
| --- | --- |
| Schema shape | A Struct can be used only as the element type of an Array field. Struct is not supported as a top-level collection field. |
| Subfield schema | All Struct elements in the same StructArray field share one predefined Struct schema. |
| Capacity | `max_capacity` is required and limits how many Struct elements one entity can store in the StructArray field. |
| Subfield changes | After a StructArray field is created, you cannot add subfields to that existing StructArray field. |
| Subfield path | Use `structArray[subfield]` paths, such as `chunks[emb]`, for indexes, search targets, output fields, and filters. Do not use `chunks.emb`. |
| Insert shape | Insert a StructArray field as an array of objects. Do not use path syntax inside insert payloads. |
| Vector indexes | A vector field or vector subfield accepts only one index. Use separate vector subfields for EmbeddingList search and element-level search. |
| Functions | Field functions are not supported for fields or subfields inside a StructArray field. |
| Nullable fields | Nullable StructArray fields are version-gated. When supported, null applies to the whole StructArray field, not to an individual Struct element independently. |
| Dynamic add field | Adding a StructArray field to an existing collection is version-gated and requires the added field to be nullable. |

## Schema limits

| Limit | Details |
| --- | --- |
| Struct is not a top-level field type. | Create a StructArray field as `datatype=DataType.ARRAY` with `element_type=DataType.STRUCT` and a `struct_schema`. |
| All elements share one schema. | Every Struct element in a StructArray field follows the same subfield list and subfield data types. |
| `max_capacity` is required. | The number of Struct elements in one entity must not exceed the `max_capacity` configured for the StructArray field. |
| Existing subfields are fixed. | You cannot append new subfields to an existing StructArray field. To change the subfield schema, drop the StructArray field and add it again with the updated schema. |
| Nested StructArray is not supported. | A StructArray field cannot contain nested `Array`, `ArrayOfVector`, `Struct`, or `ArrayOfStruct` subfields. |
| Functions are not supported inside StructArray. | Do not define field functions for StructArray fields or their subfields. |

For schema creation examples, see [Create a StructArray Field](create-structarray-field.md).

## Supported subfield data types

StructArray subfields map to physical array-style storage. The following table lists supported and unsupported physical types.

| Struct subfield physical type | Support | Notes |
| --- | --- | --- |
| `Array` | Supported | Define the subfield as `DataType.BOOL`. |
| `Array` | Supported | Define the subfield as `DataType.INT8`, `DataType.INT16`, `DataType.INT32`, or `DataType.INT64`. |
| `Array` | Supported | Define the subfield as `DataType.FLOAT` or `DataType.DOUBLE`. |
| `Array` | Supported | Define the subfield as `DataType.VARCHAR` and set `max_length`. |
| `ArrayOfVector` | Supported | Define the subfield as `DataType.FLOAT_VECTOR` and set `dim`. |
| `ArrayOfVector` | Supported | Define the subfield as `DataType.FLOAT16_VECTOR` and set `dim`. |
| `ArrayOfVector` | Supported | Define the subfield as `DataType.BFLOAT16_VECTOR` and set `dim`. |
| `ArrayOfVector` | Supported | Define the subfield as `DataType.INT8_VECTOR` and set `dim`. |
| `ArrayOfVector` | Supported | Define the subfield as `DataType.BINARY_VECTOR` and set `dim`. |
| `ArrayOfVector` | Not supported | Sparse vector subfields are not supported in StructArray fields. |
| `Array` | Not supported | Use `VARCHAR`, not `String`. |
| `Array` | Not supported | JSON subfields are not supported in StructArray fields. |
| `Array` | Not supported | Geometry subfields and GIS functions are not supported in StructArray fields. |
| `Array` | Not supported | Text subfields are not supported in StructArray fields. |
| `Array` | Not supported | Timestamptz subfields and time-specific expressions are not supported in StructArray fields. |
| Nested `Array`, `ArrayOfVector`, `Struct`, or `ArrayOfStruct` | Not supported | StructArray fields do not support nested array, vector-array, Struct, or Array-of-Struct subfields. |

## Nullable and dynamic schema limits

Nullable StructArray behavior and dynamic StructArray field addition are version-gated.

| Capability | Limit |
| --- | --- |
| Nullable StructArray field | Supported only in versions that include nullable StructArray and nullable vector-array support. |
| Null value in Python | Use `None` to insert a null StructArray value in Python. Do not use `Null` or `null`. |
| Null scope | Null applies to the whole StructArray field. For example, `chunks=None` is valid only when `chunks` is nullable. |
| Partially null StructArray value | When a StructArray field contains a valid array value, do not mix null subfield arrays with valid subfield arrays in the same value. |
| Dynamic add StructArray field | Adding a StructArray field to an existing collection is supported only in versions that include dynamic StructArray field support. |
| Nullable requirement for dynamic add | A StructArray field added to an existing collection must be nullable because existing entities have no value for the new field. |
| Existing entities after dynamic add | Existing entities return `null` for the added StructArray field across its subfields. |

In Milvus v3.0.x, nullable StructArray fields, nullable vector arrays, and dynamic StructArray field addition are available.

For insert examples with nullable StructArray fields, see [Insert Data into StructArray Fields](insert-data-into-structarray-fields.md).

## Insert limits

| Limit | Details |
| --- | --- |
| Payload shape | Insert the StructArray field as an array of Struct objects, such as `chunks: [{"text": "...", "emb": [...]}]`. |
| Subfield names | Inside each Struct object, use subfield names such as `text` and `emb`, not paths such as `chunks[text]`. |
| Schema alignment | Each Struct element must match the Struct schema. |
| Capacity | The number of Struct elements in one entity must not exceed `max_capacity`. |
| Vector dimensions | Vector values must match the `dim` configured for their vector subfields. |
| Search-mode duplication | If you need both EmbeddingList search and element-level search, write vectors to two separate vector subfields. |

## Index and metric limits

A StructArray vector subfield can be indexed for either EmbeddingList search or element-level search. The same vector subfield cannot use both metric families because each vector field or vector subfield accepts only one index.

| Search mode | Metric family | Result level |
| --- | --- | --- |
| EmbeddingList search | `MAX_SIM`, `MAX_SIM_COSINE`, `MAX_SIM_IP`, `MAX_SIM_L2`, or binary `MAX_SIM_*` metrics | Entity-level results. |
| Element-level search | Regular vector metrics such as `L2`, `IP`, `COSINE`, `HAMMING`, or `JACCARD` | Element-level results that can include the matched element offset. |

Use separate vector subfields when both modes are required. For example, use `chunks[emb_list_vector]` for EmbeddingList search and `chunks[emb]` for element-level search.

StructArray vector subfields count as vector subfields when you plan your collection schema. Keep the total number of vector fields and vector subfields within the limits of your target version and service tier.

For the supported index-type and metric-type matrix, see [Index StructArray Fields](index-structarray-fields.md).

## Search limits

| Search behavior | Support and limits |
| --- | --- |
| Basic EmbeddingList search | Supported on StructArray vector subfields indexed with `MAX_SIM*` metrics. Returns entity-level results. |
| Basic element-level search | Supported on StructArray vector subfields indexed with regular vector metrics. Can return matched element offsets. |
| Range search | Supported according to the search mode and index/metric support of the target version. For hybrid search range behavior on element-level StructArray requests, check your target version. |
| Grouping search | Element-level grouping search can return offsets. Hybrid search group-by behavior for element-level StructArray requests is version-gated. |
| Hybrid search | A hybrid search request can include StructArray vector subfield requests only where the target version supports that search combination. Each request still follows the metric family of the indexed vector subfield. |
| Offset output | Offset is available for element-level search results. EmbeddingList search returns entity-level results and does not use element offsets as the primary result unit. |

## Filter and operator limits

StructArray scalar filtering is handled by StructArray operators, such as `element_filter` and the `MATCH_*` family. The detailed predicate support matrix belongs in [StructArray Operators](struct-array-operators.md).

At a high level:

- Use `$[subfield]` only inside StructArray operators.

- Use scalar subfields for scalar predicates.

- Do not use vector subfields as `$[...]` scalar predicate inputs.

- JSON path syntax, JSON functions, array container functions, text match functions, Geometry / GIS functions, and Timestamptz expressions are not supported for StructArray element-level predicates.

- Prefer explicit boolean comparisons such as `$[has_code] == true` instead of bare boolean expressions.

## Related pages

1. To create a StructArray field, read [Create a StructArray Field](create-structarray-field.md).

2. To insert data, read [Insert Data into StructArray Fields](insert-data-into-structarray-fields.md).

3. To create vector and scalar indexes, read [Index StructArray Fields](index-structarray-fields.md).

4. To review StructArray filter syntax, read [StructArray Operators](struct-array-operators.md).
