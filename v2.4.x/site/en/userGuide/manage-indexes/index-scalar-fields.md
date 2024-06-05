---
id: index-scalar-fields.md
order: 2
summary: This guide will walk you through creating and configuring scalar indexes for fields such as integers, strings, etc.
title: Index Scalar Fields
---

# Index Scalar Fields

In Milvus, a scalar index is used to speed up metafiltering by a specific non-vector field value, similar to a traditional database index. This guide will walk you through creating and configuring scalar indexes for fields such as integers, strings, etc.

## Types of scalar indexing

- __[Auto indexing](https://milvus.io/docs/index-scalar-fields.md#Auto-indexing)__: Milvus automatically decides the index type based on the data type of the scalar field. This is suitable when you do not need to control the specific index type.

- __[Custom indexing](https://milvus.io/docs/index-scalar-fields.md#Custom-indexing)__: You specify the exact index type, such as an inverted index. This provides more control over the index type selection.

## Auto indexing

<div class="language-python">

To use auto indexing, omit the __index_type__ parameter in [`add_index()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md), so that Milvus can infer the index type based on the scalar field type.

</div>

<div class="language-java">

To use auto indexing, omit the __indexType__ parameter in [`IndexParam`](https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md), so that Milvus can infer the index type based on the scalar field type.

</div>

<div class="language-javascript">

To use auto indexing, omit the __index_type__ parameter in [`createIndex()`](https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md), so that Milvus can infer the index type based on the scalar field type.

</div>

For mappings between scalar data types and default indexing algorithms, refer to [Scalar field indexing algorithms](https://milvus.io/docs/scalar_index.md#Scalar-field-indexing-algorithms).

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# Auto indexing
client = MilvusClient(
    uri="http://localhost:19530"
)

index_params = client.create_index_params() # Prepare an empty IndexParams object, without having to specify any index parameters

index_params.add_index(
    field_name="scalar_1", # Name of the scalar field to be indexed
    index_type="", # Type of index to be created. For auto indexing, leave it empty or omit this parameter.
    index_name="default_index" # Name of the index to be created
)

client.create_index(
  collection_name="test_scalar_index", # Specify the collection name
  index_params=index_params
)
```

```java
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.index.request.CreateIndexReq;

IndexParam indexParamForScalarField = IndexParam.builder()
    .fieldName("scalar_1") // Name of the scalar field to be indexed
    .indexName("default_index") // Name of the index to be created
    .indexType("") // Type of index to be created. For auto indexing, leave it empty or omit this parameter.
    .build();

List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(indexParamForVectorField);

CreateIndexReq createIndexReq = CreateIndexReq.builder()
    .collectionName("test_scalar_index") // Specify the collection name
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
```

```javascript
await client.createIndex({
    collection_name: "test_scalar_index", // Specify the collection name
    field_name: "scalar_1", // Name of the scalar field to be indexed
    index_name: "default_index", // Name of the index to be created
    index_type: "" // Type of index to be created. For auto indexing, leave it empty or omit this parameter.
})
```

## Custom indexing

<div class="language-python">

To use custom indexing, specify a particular index type using the __index_type__ parameter in [`add_index()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md).

</div>

<div class="language-java">

To use custom indexing, specify a particular index type using the __indexType__ parameter in [`IndexParam`](https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md).

</div>

<div class="language-javascript">

To use custom indexing, specify a particular index type using the __index_type__ parameter in [`createIndex()`](https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md).

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
index_params = client.create_index_params() #  Prepare an IndexParams object

index_params.add_index(
    field_name="scalar_2", # Name of the scalar field to be indexed
    index_type="INVERTED", # Type of index to be created
    index_name="inverted_index" # Name of the index to be created
)

client.create_index(
  collection_name="test_scalar_index", # Specify the collection name
  index_params=index_params
)
```

```java
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.index.request.CreateIndexReq;

IndexParam indexParamForScalarField = IndexParam.builder()
    .fieldName("scalar_1") // Name of the scalar field to be indexed
    .indexName("inverted_index") // Name of the index to be created
    .indexType("INVERTED") // Type of index to be created
    .build();

List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(indexParamForVectorField);

CreateIndexReq createIndexReq = CreateIndexReq.builder()
    .collectionName("test_scalar_index") // Specify the collection name
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
```

```javascript
await client.createIndex({
    collection_name: "test_scalar_index", // Specify the collection name
    field_name: "scalar_1", // Name of the scalar field to be indexed
    index_name: "inverted_index", // Name of the index to be created
    index_type: "INVERTED" // Type of index to be created
})
```

<div class="language-python">

__Methods and Parameters__

- __create_index_params()__

    Prepares an __IndexParams__ object.

- __add_index()__

    Adds index configurations to the __IndexParams__ object.

    - __field_name__ (_string_)

        The name of the scalar field to index.

    - __index_type__ (_string_): 

        The type of the scalar index to create. For implicit indexing, leave it empty or omit this parameter.

        For custom indexing, valid values are:

        - __INVERTED__: (Recommended) An inverted index consists of a term dictionary containing all tokenized words sorted alphabetically. For details, refer to Scalar Index.

        - __STL_SORT__: Sorts scalar fields using the standard template library sort algorithm. Supports Boolean and numeric fields (e.g., INT8, INT16, INT32, INT64, FLOAT, DOUBLE).

        - __Trie__: A tree data structure for fast prefix searches and retrievals. Supports VARCHAR fields.

    - __index_name__ (_string_)

        The name of the scalar index to create. Each scalar field supports one index.

- __create_index()__

    Creates the index in the specified collection.

    - __collection_name__ (_string_)

        The name of the collection for which the index is created.

    - __index_params__

        The __IndexParams__ object that contains index configurations.

</div>

<div class="language-java">

__Methods and Parameters__

- __IndexParam__
  Prepares an IndexParam object.
  - __fieldName__ (_String_)
    The name of the scalar field to index.
  - __indexName__ (_String_)
    The name of the scalar index to create. Each scalar field supports one index.
  - __indexType__ (_String_)
    The type of the scalar index to create. For implicit indexing, leave it empty or omit this parameter.
    For custom indexing, valid values are:
    - __INVERTED__: (Recommended) An inverted index consists of a term dictionary containing all tokenized words sorted alphabetically. For details, refer to Scalar Index.
    - __STL_SORT__: Sorts scalar fields using the standard template library sort algorithm. Supports Boolean and numeric fields (e.g., INT8, INT16, INT32, INT64, FLOAT, DOUBLE).
    - __Trie__: A tree data structure for fast prefix searches and retrievals. Supports VARCHAR fields.
- __CreateIndexReq__
  Creates the index in the specified collection.
  - __collectionName__ (_String_)
    The name of the collection for which the index is created.
  - __indexParams__ (_List<IndexParam>_)
    A list of IndexParam objects that contain index configurations.

</div>

<div class="language-javascript">

__Methods and Parameters__
- __createIndex__

  Creates the index in the specified collection.
  - __collection_name__ (_string_)
    The name of the collection for which the index is created.
  - __field_name__ (_string_)
    The name of the scalar field to index.
  - __index_name__ (_string_)
    The name of the scalar index to create. Each scalar field supports one index.
  - __index_type__ (_string_)
    The type of the scalar index to create. For implicit indexing, leave it empty or omit this parameter.
    For custom indexing, valid values are:
    - __INVERTED__: (Recommended) An inverted index consists of a term dictionary containing all tokenized words sorted alphabetically. For details, refer to [Scalar Index](scalar_index.md).
    - __STL_SORT__: Sorts scalar fields using the standard template library sort algorithm. Supports Boolean and numeric fields (e.g., INT8, INT16, INT32, INT64, FLOAT, DOUBLE).
    - __Trie__: A tree data structure for fast prefix searches and retrievals. Supports VARCHAR fields.

</div>

## Verifying the result

<div class="language-python">

Use the [`list_indexes()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/list_indexes.md) method to verify the creation of scalar indexes:

</div>

<div class="language-java">

Use the `listIndexes()` method to verify the creation of scalar indexes:

</div>

<div class="language-javascript">

Use the `listIndexes()` method to verify the creation of scalar indexes:

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
client.list_indexes(
    collection_name="test_scalar_index"  # Specify the collection name
)

# Output:
# ['default_index','inverted_index']
```

```java
import java.util.List;
import io.milvus.v2.service.index.request.ListIndexesReq;

ListIndexesReq listIndexesReq = ListIndexesReq.builder()
    .collectionName("test_scalar_index")  // Specify the collection name
    .build();

List<String> indexNames = client.listIndexes(listIndexesReq);

System.out.println(indexNames);

// Output:
// [
//     "default_index",
//     "inverted_index"
// ]
```

```javascript
res = await client.listIndexes({
    collection_name: 'test_scalar_index'
})

console.log(res.indexes)

// Output:
// [
//     "default_index",
//     "inverted_index"
// ]   
```

## Limits

- Currently, scalar indexing supports INT8, INT16, INT32, INT64, FLOAT, DOUBLE, BOOL, and VARCHAR data types, but not JSON and ARRAY types.

