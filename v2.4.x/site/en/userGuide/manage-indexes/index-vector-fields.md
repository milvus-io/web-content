---
id: index-vector-fields.md
order: 1
summary: This guide walks you through the basic operations on creating and managing indexes on vector fields in a collection.
---

# Index Vector Fields

This guide walks you through the basic operations on creating and managing indexes on vector fields in a collection. 

## Overview

Leveraging the metadata stored in an index file, Milvus organizes your data in a specialized structure, facilitating rapid retrieval of requested information during searches or queries.

Milvus provides [several index types](https://milvus.io/docs/index.md) to sort field values for efficient similarity searches. It also offers three [metric types](https://milvus.io/docs/metric.md#Similarity-Metrics): __Cosine Similarity__ (COSINE), __Euclidean Distance__ (L2), and __Inner Product__ (IP) to measure the distances between vector embeddings.

It is recommended to create indexes for both the vector field and scalar fields that are frequently accessed.

## Preparations

As explained in [Manage Collections](manage-collections.md), Milvus automatically generates an index and loads it into memory when creating a collection if any of the following conditions are specified in the collection creation request:

- The dimensionality of the vector field and the metric type, or

- The schema and the index parameters.

The code snippet below repurposes the existing code to establish a connection to a Milvus instance and create a collection without specifying its index parameters. In this case, the collection lacks an index and remains unloaded.



```python
from pymilvus import MilvusClient, DataType

CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT"
TOKEN = "YOUR_CLUSTER_TOKEN"

# 1. Set up a Milvus client
client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN 
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

String CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT";
String TOKEN = "YOUR_CLUSTER_TOKEN";

// 1. Connect to Milvus server
ConnectConfig connectConfig = ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .token(TOKEN)
    .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection

// 2.1 Create schema
CreateCollectionReq.CollectionSchema schema = client.createSchema(false, "");

// 2.2 Add fields to schema
schema.addPrimaryField("id", DataType.Int64, true, false);
schema.addVectorField("vector", DataType.FloatVector, 5);

// 2.3 Create a collection without schema and index parameters
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
await client.createCollection({
    collection_name: "customized_setup",
    fields: fields,
})
```

## Index a Collection

To create an index for a collection or index a collection, you need to set up the index parameters and call `create_index()`.



```python
# 4.1. Set up the index parameters
index_params = MilvusClient.prepare_index_params()

# 4.2. Add an index on the vector field.
index_params.add_index(
    field_name="vector",
    metric_type="COSINE",
    index_type=,
    index_name="vector_index"
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

// 4.1 Add an index for the vector field "vector"
IndexParam indexParamForVectorField = IndexParam.builder()
    .fieldName("vector")
    .indexName("vector_index")
    .indexType(IndexParam.IndexType.)
    .metricType(IndexParam.MetricType.COSINE)
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
await client.createIndex({
    collection_name: "customized_setup",
    field_name: "vector",
    index_type: ,
    metric_type: "COSINE",   
    index_name: "vector_index",
    params: { nprobe: 10 }
})

// 4.2 Add an index on a scalar field.
await client.createIndex({
    collection_name: "customized_setup",
    field_name: "id",
    index_name: "primary_field_index",
    index_type: "STL_SORT"
})
```

<div class="admonition note">

<p><b>notes</b></p>

<p>Currently, you can create only one index file for each field in a collection.</p>

</div>

## Check Index Details

Once you have created an index, you can check its details.



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
//     "indexType": ,
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
//         "key": "params",
//         "value": "{\"nprobe\":10}"
//       },
//       {
//         "key": "index_type",
//         "value": 
//       },
//       {
//         "key": "metric_type",
//         "value": "COSINE"
//       }
//     ],
//     "index_name": "vector_index",
//     "indexID": "448162378879954423",
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
await client.dropIndex({
    collection_name: "customized_setup",
    index_name: "vector_index"
})
```

