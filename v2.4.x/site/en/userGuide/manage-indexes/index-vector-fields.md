---
id: index-vector-fields.md
order: 1
summary: This guide walks you through the basic operations on creating and managing indexes on vector fields in a collection.
title: Index Vector Fields
---

# Index Vector Fields

This guide walks you through the basic operations on creating and managing indexes on vector fields in a collection. 

## Overview

Leveraging the metadata stored in an index file, Milvus organizes your data in a specialized structure, facilitating rapid retrieval of requested information during searches or queries.

Milvus provides several index types and metrics to sort field values for efficient similarity searches. The following table lists the supported index types and metrics for different vector field types. For details, refer to [In-memory Index](index.md) and [Similarity Metrics](metric.md).

<div class="filter">
  <a href="#floating">Floating point embeddings</a>
  <a href="#binary">Binary embeddings</a>
  <a href="#sparse">Sparse embeddings</a>
</div>

<div class="filter-floating table-wrapper" markdown="block">

<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Metric Types</th>
    <th class="tg-0pky">Index Types</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Euclidean distance (L2)</li><li>Inner product (IP)</li><li>Cosine similarity (COSINE)</li></td>
    <td class="tg-0pky" rowspan="2"><ul><li>FLAT</li><li>IVF_FLAT</li><li>IVF_SQ8</li><li>IVF_PQ</li><li>GPU_IVF_FLAT</li><li>GPU_IVF_PQ</li><li>HNSW</li><li>DISKANN</li></ul></td>
  </tr>
</tbody>
</table>

</div>

<div class="filter-binary table-wrapper" markdown="block">

<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Metric Types</th>
    <th class="tg-0pky">Index Types</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Jaccard</li><li>Hamming</li></ul></td>
    <td class="tg-0pky"><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
  </tr>
</tbody>
</table>

</div>

<div class="filter-sparse table-wrapper" markdown="block">

<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Metric Types</th>
    <th class="tg-0pky">Index Types</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">IP</td>
    <td class="tg-0pky"><ul><li>SPARSE_INVERTED_INDEX</li><li>SPARSE_WAND</li></ul></td>
  </tr>
</tbody>
</table>

</div>

It is recommended to create indexes for both the vector field and scalar fields that are frequently accessed.

## Preparations

As explained in [Manage Collections](manage-collections.md), Milvus automatically generates an index and loads it into memory when creating a collection if any of the following conditions are specified in the collection creation request:

- The dimensionality of the vector field and the metric type, or

- The schema and the index parameters.

The code snippet below repurposes the existing code to establish a connection to a Milvus instance and create a collection without specifying its index parameters. In this case, the collection lacks an index and remains unloaded.

<div class="language-python">

To prepare for indexing, use [`MilvusClient`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md) to connect to the Milvus server and set up a collection by using [`create_schema()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md), [`add_field()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md), and [`create_collection()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md).

</div>

<div class="language-java">

To prepare for indexing, use [`MilvusClientV2`](https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md) to connect to the Milvus server and set up a collection by using [`createSchema()`](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md), [`addField()`](https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md), and [`createCollection()`](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md).

</div>

<div class="language-javascript">

To prepare for indexing, use [`MilvusClient`](https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md) to connect to the Milvus server and set up a collection by using [`createCollection()`](https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md).

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
from pymilvus import MilvusClient, DataType

# 1. Set up a Milvus client
client = MilvusClient(
    uri="http://localhost:19530"
)

# 2. Create schema
# 2.1. Create schema
schema = MilvusClient.create_schema(
    auto_id=False,
    enable_dynamic_field=True,
)

# 2.2. Add fields to schema
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=5)

# 3. Create collection
client.create_collection(
    collection_name="customized_setup", 
    schema=schema, 
)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

String CLUSTER_ENDPOINT = "http://localhost:19530";

// 1. Connect to Milvus server
ConnectConfig connectConfig = ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection

// 2.1 Create schema
CreateCollectionReq.CollectionSchema schema = client.createSchema();

// 2.2 Add fields to schema
schema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(true).autoID(false).build());
schema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(5).build());

// 3 Create a collection without schema and index parameters
CreateCollectionReq customizedSetupReq = CreateCollectionReq.builder()
.collectionName("customized_setup")
.collectionSchema(schema)
.build();

client.createCollection(customizedSetupReq);
```

```javascript
// 1. Set up a Milvus Client
client = new MilvusClient({address, token});

// 2. Define fields for the collection
const fields = [
    {
        name: "id",
        data_type: DataType.Int64,
        is_primary_key: true,
        auto_id: false
    },
    {
        name: "vector",
        data_type: DataType.FloatVector,
        dim: 5
    },
]

// 3. Create a collection
res = await client.createCollection({
    collection_name: "customized_setup",
    fields: fields,
})

console.log(res.error_code)  

// Output
// 
// Success
// 
```

## Index a Collection

<div class="language-python">

To create an index for a collection or index a collection, use [`prepare_index_params()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/prepare_index_params.md) to prepare index parameters and [`create_index()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md) to create the index.

</div>

<div class="language-java">

To create an index for a collection or index a collection, use [`IndexParam`](https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md) to prepare index parameters and [`createIndex()`](https://milvus.io/api-reference/java/v2.4.x/v2/Management/createIndex.md) to create the index.

</div>

<div class="language-javascript">

To create an index for a collection or index a collection, use [`createIndex()`](https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md).

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# 4.1. Set up the index parameters
index_params = MilvusClient.prepare_index_params()

# 4.2. Add an index on the vector field.
index_params.add_index(
    field_name="vector",
    metric_type="COSINE",
    index_type="IVF_FLAT",
    index_name="vector_index",
    params={ "nlist": 128 }
)

# 4.3. Create an index file
client.create_index(
    collection_name="customized_setup",
    index_params=index_params
)
```

```java
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.index.request.CreateIndexReq;

// 4 Prepare index parameters

// 4.2 Add an index for the vector field "vector"
IndexParam indexParamForVectorField = IndexParam.builder()
    .fieldName("vector")
    .indexName("vector_index")
    .indexType(IndexParam.IndexType.IVF_FLAT)
    .metricType(IndexParam.MetricType.COSINE)
    .extraParams(Map.of("nlist", 128))
    .build();

List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(indexParamForVectorField);

// 4.3 Crate an index file
CreateIndexReq createIndexReq = CreateIndexReq.builder()
    .collectionName("customized_setup")
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
```

```javascript
// 4. Set up index for the collection
// 4.1. Set up the index parameters
res = await client.createIndex({
    collection_name: "customized_setup",
    field_name: "vector",
    index_type: "AUTOINDEX",
    metric_type: "COSINE",   
    index_name: "vector_index",
    params: { "nlist": 128 }
})

console.log(res.error_code)

// Output
// 
// Success
// 
```

<div class="admonition note">

<p><b>notes</b></p>

<p>Currently, you can create only one index file for each field in a collection.</p>

</div>

## Check Index Details

Once you have created an index, you can check its details.

<div class="language-python">

To check the index details, use [`list_indexes()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/list_indexes.md) to list the index names and [`describe_index()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md) to get the index details.

</div>

<div class="language-java">

To check the index details, use [`describeIndex()`](https://milvus.io/api-reference/java/v2.4.x/v2/Management/describeIndex.md) to get the index details.

</div>

<div class="language-javascript">

To check the index details, use [`describeIndex()`](https://milvus.io/api-reference/node/v2.4.x/Management/describeIndex.md) to get the index details.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# 5. Describe index
res = client.list_indexes(
    collection_name="customized_setup"
)

print(res)

# Output
#
# [
#     "vector_index",
# ]

res = client.describe_index(
    collection_name="customized_setup",
    index_name="vector_index"
)

print(res)

# Output
#
# {
#     "index_type": ,
#     "metric_type": "COSINE",
#     "field_name": "vector",
#     "index_name": "vector_index"
# }
```

```java
import io.milvus.v2.service.index.request.DescribeIndexReq;
import io.milvus.v2.service.index.response.DescribeIndexResp;

// 5. Describe index
// 5.1 List the index names
ListIndexesReq listIndexesReq = ListIndexesReq.builder()
    .collectionName("customized_setup")
    .build();

List<String> indexNames = client.listIndexes(listIndexesReq);

System.out.println(indexNames);

// Output:
// [
//     "vector_index"
// ]

// 5.2 Describe an index
DescribeIndexReq describeIndexReq = DescribeIndexReq.builder()
    .collectionName("customized_setup")
    .indexName("vector_index")
    .build();

DescribeIndexResp describeIndexResp = client.describeIndex(describeIndexReq);

System.out.println(JSONObject.toJSON(describeIndexResp));

// Output:
// {
//     "metricType": "COSINE",
//     "indexType": "AUTOINDEX",
//     "fieldName": "vector",
//     "indexName": "vector_index"
// }
```

```javascript
// 5. Describe the index
res = await client.describeIndex({
    collection_name: "customized_setup",
    index_name: "vector_index"
})

console.log(JSON.stringify(res.index_descriptions, null, 2))

// Output
// 
// [
//   {
//     "params": [
//       {
//         "key": "index_type",
//         "value": "AUTOINDEX"
//       },
//       {
//         "key": "metric_type",
//         "value": "COSINE"
//       }
//     ],
//     "index_name": "vector_index",
//     "indexID": "449007919953063141",
//     "field_name": "vector",
//     "indexed_rows": "0",
//     "total_rows": "0",
//     "state": "Finished",
//     "index_state_fail_reason": "",
//     "pending_index_rows": "0"
//   }
// ]
// 
```

You can check the index file created on a specific field, and collect the statistics on the number of rows indexed using this index file.

## Drop an Index

You can simply drop an index if it is no longer needed.

<div class="language-python">

To drop an index, use [`drop_index()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/drop_index.md).

</div>

<div class="language-java">

To drop an index, use [`dropIndex()`](https://milvus.io/api-reference/java/v2.4.x/v2/Management/dropIndex.md).

</div>

<div class="language-javascript">

To drop an index, use [`dropIndex()`](https://milvus.io/api-reference/node/v2.4.x/Management/dropIndex.md).

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# 6. Drop index
client.drop_index(
    collection_name="customized_setup",
    index_name="vector_index"
)
```

```java
// 6. Drop index

DropIndexReq dropIndexReq = DropIndexReq.builder()
    .collectionName("customized_setup")
    .indexName("vector_index")
    .build();

client.dropIndex(dropIndexReq);
```

```javascript
// 6. Drop the index
res = await client.dropIndex({
    collection_name: "customized_setup",
    index_name: "vector_index"
})

console.log(res.error_code)

// Output
// 
// Success
// 
```
