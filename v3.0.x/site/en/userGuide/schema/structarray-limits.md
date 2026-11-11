---
id: structarray-limits.md
title: "StructArray Limits"
summary: "StructArray support spans schema definition, insert payloads, indexing, search modes, and StructArray-specific filters. Use this page as the limits reference before you rely on StructArray behavior in production."
---
# StructArray Limits

StructArray support spans schema definition, insert payloads, indexing, search modes, and StructArray-specific filters. Use this page as the limits reference before you rely on StructArray behavior in production.

Most StructArray limits come from one of three places: the StructArray schema model, the search mode you choose for vector subfields, and the Milvus version that your collection runs on.

## Limits at a glance

The main StructArray limits are:

| Area | Limit |
| --- | --- |
| Schema shape | A Struct can be used only as the element type of an Array field. Struct is not supported as a top-level collection field. |
| Subfield schema | All Struct elements in the same StructArray field share one predefined Struct schema. |
| Nested subfields | Starting in Milvus 3.0.6, a Struct can contain scalar `ARRAY` subfields with one nesting level. Nested `Struct`, `ArrayOfStruct`, and JSON subfields are not supported in any version. |
| Capacity | `max_capacity` is required and limits how many Struct elements one entity can store in the StructArray field. |
| Subfield changes | Starting in Milvus 3.0.6, you can add an element-nullable subfield to an existing StructArray field or drop a subfield from it. Earlier versions require dropping and re-adding the whole StructArray field. |
| Subfield path | Use `structArray[subfield]` paths, such as `chunks[emb]`, for indexes, search targets, output fields, and filters. Do not use `chunks.emb`. |
| Insert shape | Insert a StructArray field as an array of objects. Do not use path syntax inside insert payloads. |
| Vector indexes | A vector field or vector subfield accepts only one index. Use separate vector subfields for EmbeddingList search and element-level search. |
| Functions | Field functions are not supported for fields or subfields inside a StructArray field. |
| Nullable fields | Nullable StructArray fields are version-gated. Row-level null applies to the whole StructArray field. Starting in Milvus 3.0.6, a subfield can additionally allow a null value in an individual Struct element: `nullable=True` on a scalar or vector subfield, `element_nullable=True` on an array subfield. A Struct element itself cannot be null. |
| Dynamic add field | Adding a StructArray field to an existing collection is version-gated and requires the added field to be nullable. |

## Schema limits

StructArray schemas have the following limits:

| Limit | Details |
| --- | --- |
| Struct is not a top-level field type. | Create a StructArray field as `datatype=DataType.ARRAY` with `element_type=DataType.STRUCT` and a `struct_schema`. |
| All elements share one schema. | Every Struct element in a StructArray field follows the same subfield list and subfield data types. |
| `max_capacity` is required. | The number of Struct elements in one entity must not exceed the `max_capacity` configured for the StructArray field. |
| Scalar `ARRAY` subfields have per-subfield `max_capacity`. | A scalar `ARRAY` subfield declares a `max_capacity` for its inner array, and Milvus rejects a Struct element whose inner array exceeds that subfield's declared capacity. Values do not need to match across subfields. The value must be greater than 0 and must not exceed `proxy.maxArrayCapacity`, which defaults to 4096. |
| Subfields can evolve in Milvus 3.0.6 and later. | Add an element-nullable subfield, or drop a subfield by its path, such as `chunks[lang]`. You cannot drop the last subfield of a StructArray field, the last vector field of the collection, or a subfield used by a Function. In earlier versions, drop the StructArray field and add it again with the updated schema. |
| Nested Struct is not supported. | A Struct cannot contain nested `Struct`, `ArrayOfStruct`, or JSON subfields. Starting in Milvus 3.0.6, a Struct can contain scalar `ARRAY` subfields with one nesting level. An `ARRAY` subfield cannot hold vectors. |
| Functions are not supported inside StructArray. | Do not define field functions for StructArray fields or their subfields. |
| Field properties are limited on StructArray fields. | Starting in Milvus 3.0.6, `alter_collection_field()` on a StructArray field or on a subfield path accepts only `mmap.enabled`, `field.description`, and `warmup`. Other properties, such as `max_capacity` and `max_length`, are rejected. |
| Text analysis is not supported on subfields. | Setting `enable_match` or `enable_analyzer` on a Struct subfield is rejected. Text indexes are built only for top-level fields. |

For schema creation examples, see [Create a StructArray Field](create-structarray-field.md).

## Supported subfield data types

StructArray subfields map to physical array-style storage. The following table lists supported and unsupported physical types:

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
| `Array` of `Array` | Supported in Milvus 3.0.6 and later | Define the subfield as `DataType.ARRAY` with a scalar `element_type` and a `max_capacity` for the inner array. Each Struct element then holds one inner array. Set `nullable=True` on the subfield to allow a null inner array and `element_nullable=True` to allow null values inside it. |
| `Array` of `Array` of `Array`, `Array` of vectors, `Struct`, or `ArrayOfStruct` | Not supported | Array nesting inside a Struct is limited to one level, the inner array cannot hold vectors, and nested Struct or Array-of-Struct subfields are not supported. |

## Nullable and dynamic schema limits

The following table describes nullable StructArray behavior and dynamic StructArray field addition, subject to the availability statement below:

| Capability | Limit |
| --- | --- |
| Nullable StructArray field | Subject to the availability statement below, set `nullable=True` on the StructArray parent; do not configure Struct subfields as nullable independently. |
| NULL value in Python | Use `None` to insert a null StructArray value in Python. Do not use `Null` or `null`. |
| Null scope | NULL applies to the whole StructArray field. For example, `chunks=None` is valid only when `chunks` is nullable. |
| Partially null StructArray value | When a StructArray field contains a valid array value, do not mix null subfield arrays with valid subfield arrays in the same value. |
| Element-level null | Supported in Milvus 3.0.6 and later. A scalar, vector, or `ARRAY` subfield can allow a null value in individual Struct elements: `nullable=True` on a scalar or vector subfield, `element_nullable=True` on an `ARRAY` subfield. The row-level `nullable` setting still comes from the StructArray parent; setting `nullable=True` on a subfield enables element-level null, not row-level null. |
| Null Struct element | A Struct element itself cannot be null, such as `[null, {...}]`. Set the subfield values of the element to null instead. |
| Omitted subfields | Starting in Milvus 3.0.6, you can omit an element-nullable subfield from a Struct element, and Milvus stores null for it. A subfield that is not element-nullable must be present in every Struct element. In earlier versions, every Struct element must provide every subfield. |
| Dynamic add StructArray field | Subject to the availability statement below. |
| Nullable requirement for dynamic add | A StructArray field added to an existing collection must be nullable because existing entities have no value for the new field. |
| Existing entities after dynamic add | Existing entities return `null` for the added StructArray field. |
| Dynamic add subfield | Supported in Milvus 3.0.6 and later. An added subfield must be created with `nullable=True`; an added `ARRAY` subfield additionally takes `element_nullable=True` for null values inside the inner array. Existing entities return null for the new subfield in each of their Struct elements, and entities whose StructArray field is null stay null. |


Milvus 3.0.0 and later releases support nullable StructArray fields, nullable vector arrays, and dynamic StructArray field addition in both Standalone and Distributed deployments. Earlier Milvus versions do not support these capabilities.


Milvus 3.0.6 and later releases additionally support element-level null values, scalar `ARRAY` subfields, and adding or dropping subfields of an existing StructArray field. These capabilities require Storage V2 and are not available in external collections.

In Zilliz Cloud, these capabilities are available on On-Demand Clusters running Milvus 3.0.0 or later. Serving Clusters do not support them.

For insert examples with nullable StructArray fields, see [Insert Data into StructArray Fields](insert-data-into-structarray-fields.md).

## Insert limits

StructArray insert payloads have the following limits:

| Limit | Details |
| --- | --- |
| Payload shape | Insert the StructArray field as an array of Struct objects, such as `chunks: [{"text": "...", "emb": [...]}]`. |
| Subfield names | Inside each Struct object, use subfield names such as `text` and `emb`, not paths such as `chunks[text]`. |
| Schema alignment | Each Struct element must match the Struct schema. Starting in Milvus 3.0.6, an element-nullable subfield can be omitted or set to `null` in a Struct element. |
| Capacity | The number of Struct elements in one entity must not exceed `max_capacity`. |
| Vector dimensions | Vector values must match the `dim` configured for their vector subfields. |
| Search-mode duplication | If you need both EmbeddingList search and element-level search, write vectors to two separate vector subfields. |

## Index and metric limits

A StructArray vector subfield can be indexed for either EmbeddingList search or element-level search. The same vector subfield cannot use both metric families because each vector field or vector subfield accepts only one index. The search modes use the following metric families:

| Search mode | Metric family | Result level |
| --- | --- | --- |
| EmbeddingList search | `MAX_SIM`, `MAX_SIM_COSINE`, `MAX_SIM_IP`, `MAX_SIM_L2`, or binary `MAX_SIM_*` metrics | Entity-level results. |
| Element-level search | Regular vector metrics such as `L2`, `IP`, `COSINE`, `HAMMING`, or `JACCARD` | Element-level results that can include the matched element offset. |

Use separate vector subfields when both modes are required. For example, use `chunks[emb_list_vector]` for EmbeddingList search and `chunks[emb]` for element-level search.

StructArray vector subfields count as vector fields toward the collection-level limit `proxy.maxVectorFieldNum`, which defaults to 10. A StructArray field whose vector subfields are the collection's only vector fields is valid, and dropping such a field is rejected when it would leave the collection without a vector field. Keep the total number of vector fields and vector subfields within the limits of your target version and service tier.

Starting in Milvus 3.0.6, an element-nullable vector subfield supports only element-level search with regular vector metrics. `MAX_SIM*` metrics, EmbeddingList indexes, and EmbeddingList search are rejected on element-nullable vector subfields, and `AUTOINDEX` does not select a `MAX_SIM*` metric for them. Null vectors do not participate in search. Scalar indexes are not supported on element-nullable subfields or on scalar `ARRAY` subfields.

For the supported index-type and metric-type matrix, see [Index StructArray Fields](index-structarray-fields.md).

## Search limits

StructArray search behavior has the following limits:

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

- Row-level filter expressions can also reference StructArray paths directly: `chunks[0][section]` for one element position, `array_length(chunks)` for the element count, `array_contains(chunks[section], ...)` for subfield values across elements, and `chunks is null` on a nullable StructArray field.

- Use scalar subfields for scalar predicates.

- Do not use vector subfields as `$[...]` scalar predicate inputs.

- JSON path syntax, JSON functions, text match functions, Geometry / GIS functions, and Timestamptz expressions are not supported for StructArray element-level predicates. Starting in Milvus 3.0.6, `array_contains`, `array_contains_any`, `array_contains_all`, and `array_length` are supported on `$[subfield]` for scalar `ARRAY` subfields, and `$[subfield] is null` / `is not null` is supported for every subfield type.

- Starting in Milvus 3.0.6, a null subfield value in a Struct element makes the element predicate unknown rather than false. `element_filter` keeps only elements whose predicate is true, and `MATCH_*` counts an unknown element as a miss. For details, see [StructArray Operators](struct-array-operators.md).

- Prefer explicit boolean comparisons such as `$[has_code] == true` instead of bare boolean expressions.

<a id="Import-limits"></a>

## Import and storage limits

| Limit | Details |
| --- | --- |
| Source file formats | JSON, JSONL, CSV, and Parquet files can carry StructArray fields. NumPy files hold one file per top-level field and cannot provide StructArray data; use JSON, CSV, or Parquet files for collections that have a StructArray field. For file shapes, see [Prepare Source Data](prepare-source-data.md#StructArray-fields-in-source-files). |
| Storage format | Element-nullable subfields and scalar `ARRAY` subfields require Storage V2. Storage V1 cannot be reached for collections that use these subfields: creating the collection and inserting data can appear to succeed, but the data fails at flush, which is not a supported state. Storage V3 with `common.storage.enableGrowingSourceFlush` set to `true` rejects requests that use element-nullable subfields or scalar `ARRAY` subfields. |
| External collections | Element-nullable subfields and scalar `ARRAY` subfields are not supported in external collections. |
| Backup and snapshot import | Binlog import, such as a backup restore, and snapshot-source import are rejected for collections that have element-nullable subfields or scalar `ARRAY` subfields. |
| Downgrade | Collections that have element-nullable subfields or scalar `ARRAY` subfields cannot run on a release earlier than Milvus 3.0.6. Replaying the write-ahead log on the older release panics. Re-upgrading to Milvus 3.0.6 or later recovers the data. |

## Related pages

1. To create a StructArray field, read [Create a StructArray Field](create-structarray-field.md).

2. To insert data, read [Insert Data into StructArray Fields](insert-data-into-structarray-fields.md).

3. To create vector and scalar indexes, read [Index StructArray Fields](index-structarray-fields.md).

4. To review StructArray filter syntax, read [StructArray Operators](struct-array-operators.md).
