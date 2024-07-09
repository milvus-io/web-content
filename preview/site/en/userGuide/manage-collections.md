---
id: manage-collections.md
title: Manage Collections
---

# Manage Collections

This guide walks you through creating and managing collections using the SDK of your choice.

## Before you start

- You have installed [Milvus standalone](https://milvus.io/docs/install_standalone-docker.md) or [Milvus cluster](https://milvus.io/docs/install_cluster-milvusoperator.md).

- You have installed preferred SDKs. You can choose among various languages, including [Python](https://milvus.io/docs/install-pymilvus.md), [Java](https://milvus.io/docs/install-java.md), [Go](https://milvus.io/docs/install-go.md), and [Node.js](https://milvus.io/docs/install-node.md).

## Overview

In Milvus, you store your vector embeddings in collections. All vector embeddings within a collection share the same dimensionality and distance metric for measuring similarity. 

Milvus collections support dynamic fields (i.e., fields not pre-defined in the schema) and automatic incrementation of primary keys.

To accommodate different preferences, Milvus offers two methods for creating a collection. One provides a quick setup, while the other allows for detailed customization of the collection schema and index parameters.

Additionally, you can view, load, release, and drop a collection when necessary.

## Create Collection

You can create a collection in either of the following manners:

- __Quick setup__

    In this manner, you can create a collection by simply giving it a name and specifying the number of dimensions of the vector embeddings to be stored in this collection. For details, refer to [Quick setup](manage-collections.md).

- __Customized setup__

    Instead of letting In Milvus decide almost everything for your collection, you can determine the __schema__ and __index parameters__ of the collection on your own. For details, refer to [Customized setup](manage-collections.md).

### Quick setup

Against the backdrop of the great leap in the AI industry, most developers just need a simple yet dynamic collection to start with. Milvus allows a quick setup of such a collection with just three arguments: 

- Name of the collection to create,

- Dimension of the vector embeddings to insert, and

- Metric type used to measure similarities between vector embeddings.

<div class="language-python">

For quick setup, use the [`create_collection()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md) method of the [`MilvusClient`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md) class to create a collection with the specified name and dimension.

</div>

<div class="language-java">

For quick setup, use the [`createCollection()`](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md) method of the [`MilvusClientV2`](https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md) class to create a collection with the specified name and dimension.

</div>

<div class="language-javascript">

For quick setup, use the [`createCollection()`](https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md) method of the [`MilvusClient`](https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md) class to create a collection with the specified name and dimension.

</div>

<div class="language-shell">

For quick setup, use the [`POST /v2/vectordb/collections/create`](https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Create.md) API endpoint to create a collection with the specified name and dimension.

</div>

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">cURL</a>
</div>

```python
from pymilvus import MilvusClient, DataType

# 1. Set up a Milvus client
client = MilvusClient(
    uri="http://localhost:19530"
)

# 2. Create a collection in quick setup mode
client.create_collection(
    collection_name="quick_setup",
    dimension=5
)

res = client.get_load_state(
    collection_name="quick_setup"
)

print(res)

# Output
#
# {
#     "state": "<LoadState: Loaded>"
# }
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.GetLoadStateReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

String CLUSTER_ENDPOINT = "http://localhost:19530";

// 1. Connect to Milvus server
ConnectConfig connectConfig = ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection in quick setup mode
CreateCollectionReq quickSetupReq = CreateCollectionReq.builder()
    .collectionName("quick_setup")
    .dimension(5)
    .build();

client.createCollection(quickSetupReq);

// Thread.sleep(5000);

GetLoadStateReq quickSetupLoadStateReq = GetLoadStateReq.builder()
    .collectionName("quick_setup")
    .build();

Boolean res = client.getLoadState(quickSetupLoadStateReq);

System.out.println(res);

// Output:
// true
```

```javascript
address = "http://localhost:19530"

// 1. Set up a Milvus Client
client = new MilvusClient({address});

// 2. Create a collection in quick setup mode
let res = await client.createCollection({
    collection_name: "quick_setup",
    dimension: 5,
});  

console.log(res.error_code)

// Output
// 
// Success
// 

res = await client.getLoadState({
    collection_name: "quick_setup"
})

console.log(res.state)

// Output
// 
// LoadStateLoaded
// 
```

```shell
$ export MILVUS_URI="localhost:19530"

$ curl -X POST "http://${MILVUS_URI}/v2/vectordb/collections/create" \
-H "Content-Type: application/json" \
-d '{
  "collectionName": "quick_setup",
  "dimension": 5
}'

# Output
#
# {
#     "code": 0,
#     "data": {},
# }

$ curl -X POST "http://${MILVUS_URI}/v2/vectordb/collections/get_load_state" \
-H "Content-Type: application/json" \
-d '{
  "collectionName": "quick_setup"
}'

# {
#     "code": 0,
#     "data": {
#         "loadProgress": 100,
#         "loadState": "LoadStateLoaded"
#     }
# }
```

The collection generated in the above code contains only two fields: `id` (as the primary key) and `vector` (as the vector field), with `auto_id` and `enable_dynamic_field` settings enabled by default.

- `auto_id` 

    Enabling this setting ensures that the primary key increments automatically. There's no need for manual provision of primary keys during data insertion.

- `enable_dynamic_field`

    When enabled, all fields, excluding `id` and `vector` in the data to be inserted, are treated as dynamic fields. These additional fields are saved as key-value pairs within a special field named `$meta`. This feature allows the inclusion of extra fields during data insertion.

The automatically indexed and loaded collection from the provided code is ready for immediate data insertions.

### Customized setup

Instead of letting Milvus decide almost everything for your collection, you can determine the __schema__ and __index parameters__ of the collection on your own.

#### Step 1: Set up schema

A schema defines the structure of a collection. Within the schema, you have the option to enable or disable `enable_dynamic_field`, add pre-defined fields, and set attributes for each field. For a detailed explanation of the concept and available data types, refer to [Schema Explained](schema.md).

<div class="language-python">

To set up a schema, use [`create_schema()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md) to create a schema object and [`add_field()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md) to add fields to the schema.

</div>

<div class="language-java">

To set up a schema, use [`createSchema()`](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md) to create a schema object and [`addField()`](https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md) to add fields to the schema.

</div>

<div class="language-javascript">

To set up a schema, use [`createCollection()`](https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md).

</div>

<div class="language-shell">

To set up a schema, you need to define a JSON object that follows the schema format as displayed on the [`POST /v2/vectordb/collections/create`](https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Create.md) API endpoint reference page.

</div>

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">cURL</a>
</div>

```python
# 3. Create a collection in customized setup mode

# 3.1. Create schema
schema = MilvusClient.create_schema(
    auto_id=False,
    enable_dynamic_field=True,
)

# 3.2. Add fields to schema
schema.add_field(field_name="my_id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="my_vector", datatype=DataType.FLOAT_VECTOR, dim=5)
```

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

// 3. Create a collection in customized setup mode

// 3.1 Create schema
CreateCollectionReq.CollectionSchema schema = client.createSchema();

// 3.2 Add fields to schema
schema.addField(AddFieldReq.builder()
    .fieldName("my_id")
    .dataType(DataType.Int64)
    .isPrimaryKey(true)
    .autoID(false)
    .build());

schema.addField(AddFieldReq.builder()
    .fieldName("my_vector")
    .dataType(DataType.FloatVector)
    .dimension(5)
    .build());
```

```javascript
// 3. Create a collection in customized setup mode
// 3.1 Define fields
const fields = [
    {
        name: "my_id",
        data_type: DataType.Int64,
        is_primary_key: true,
        auto_id: false
    },
    {
        name: "my_vector",
        data_type: DataType.FloatVector,
        dim: 5
    },
]
```

```shell
export fields='[{ \
    "fieldName": "my_id", \
    "dataType": "Int64", \
    "isPrimary": true \
}, \
{ \
    "fieldName": "my_vector", \
    "dataType": "FloatVector", \
    "elementTypeParams": { \
        "dim": 5 \
    } \
}]'
```

<table class="language-python">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>auto_id</code></td>
      <td>Whether allows the primary field to automatically increment.<br>Setting this to <strong>True</strong> makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors.</td>
    </tr>
    <tr>
      <td><code>enable_dynamic_field</code></td>
      <td>Whether allows Milvus saves the values of undefined fields in a dynamic field if the data being inserted into the target collection includes fields that are not defined in the collection's schema.<br>When you set this to <strong>True</strong>, Milvus will create a field called <strong>$meta</strong> to store any undefined fields and their values from the data that is inserted.</td>
    </tr>
    <tr>
      <td><code>field_name</code></td>
      <td>The name of the field.</td>
    </tr>
    <tr>
      <td><code>datatype</code></td>
      <td>The data type of the field. For a list of available data types, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/DataType.md">DataType</a>.</td>
    </tr>
    <tr>
      <td><code>is_primary</code></td>
      <td>Whether the current field is the primary field in a collection.<br>Each collection has only one primary field. A primary field should be of either the <strong>DataType.INT64</strong> type or the <strong>DataType.VARCHAR</strong> type.</td>
    </tr>
    <tr>
      <td><code>dim</code></td>
      <td>The dimension of the vector embeddings.<br>This is mandatory for a field of the <strong>DataType.FLOAT_VECTOR</strong>, <strong>DataType.BINARY_VECTOR</strong>, <strong>DataType.FLOAT16_VECTOR</strong>, or <strong>DataType.BFLOAT16_VECTOR</strong> type. If you use <strong>DataType.SPARSE_FLOAT_VECTOR</strong>, omit this parameter.</td>
    </tr>
  </tbody>
</table>

<table class="language-java">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fieldName</code></td>
      <td>The name of the field.</td>
    </tr>
    <tr>
      <td><code>dataType</code></td>
      <td>The data type of the field. For a list of available data types, refer to <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/DataType.md">DataType</a>.</td>
    </tr>
    <tr>
      <td><code>isPrimaryKey</code></td>
      <td>Whether the current field is the primary field in a collection.<br>Each collection has only one primary field. A primary field should be of either the <strong>DataType.Int64</strong> type or the <strong>DataType.VarChar</strong> type.</td>
    </tr>
    <tr>
      <td><code>autoID</code></td>
      <td>Whether allows the primary field to automatically increment.<br>Setting this to <strong>true</strong> makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors.</td>
    </tr>
    <tr>
      <td><code>dimension</code></td>
      <td>The dimension of the vector embeddings.<br>This is mandatory for a field of the <strong>DataType.FloatVector</strong>, <strong>DataType.BinaryVector</strong>, <strong>DataType.Float16Vector</strong>, or <strong>DataType.BFloat16Vector</strong> type.</td>
    </tr>
  </tbody>
</table>

<table class="language-javascript">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>The name of the field.</td>
    </tr>
    <tr>
      <td><code>data_type</code></td>
      <td>The data type of the field. For an enumeration of all available data types, refer to <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/DataType.md">DataType</a>.</td>
    </tr>
    <tr>
      <td><code>is_primary_key</code></td>
      <td>Whether the current field is the primary field in a collection.<br>Each collection has only one primary field. A primary field should be of either the <strong>DataType.INT64</strong> type or the <strong>DataType.VARCHAR</strong> type.</td>
    </tr>
    <tr>
      <td><code>auto_id</code></td>
      <td>Whether the primary field automatically increments upon data insertions into this collection.<br>The value defaults to <strong>False</strong>. Setting this to <strong>True</strong> makes the primary field automatically increment. Skip this parameter if you need to set up a collection with a customized schema.</td>
    </tr>
    <tr>
      <td><code>dim</code></td>
      <td>The dimensionality of the collection field that holds vector embeddings.<br>The value should be an integer greater than 1 and is usually determined by the model you use to generate vector embeddings.</td>
    </tr>
  </tbody>
</table>

<table class="language-shell">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fieldName</code></td>
      <td>The name of the field to create in the target collection.</td>
    </tr>
    <tr>
      <td><code>dataType</code></td>
      <td>The data type of the field values.</td>
    </tr>
    <tr>
      <td><code>isPrimary</code></td>
      <td>Whether the current field is the primary field. Setting this to <code>True</code> makes the current field the primary field.</td>
    </tr>
    <tr>
      <td><code>elementTypeParams</code></td>
      <td>Extra field parameters.</td>
    </tr>
    <tr>
      <td><code>dim</code></td>
      <td>An optional parameter for FloatVector or BinaryVector fields that determines the vector dimension.</td>
    </tr>
  </tbody>
</table>

#### Step 2: Set up index parameters

Index parameters dictate how Milvus organizes your data within a collection. You can tailor the indexing process for specific fields by adjusting their `metric_type` and `index_type`. For the vector field, you have the flexibility to select `COSINE`, `L2`, `IP`, `HAMMING`, or `JACCARD` as the `metric_type`, depending on the type of vectors you are working with. For more information, refer to [Similarity Metrics](metric.md).

<div class="language-python">

To set up index parameters, use [`prepare_index_params()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/prepare_index_params.md) to prepare index parameters and [`add_index()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md) to add the index.

</div>

<div class="language-java">

To set up index parameters, use [IndexParam](https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md).

</div>

<div class="language-javascript">

To set up index parameters, use [`createIndex()`](https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md).

</div>

<div class="language-shell">

To set up index parameters, you need to define a JSON object that follows the index parameters format as displayed on the [`POST /v2/vectordb/collections/create`](https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Create.md) API endpoint reference page.

</div>

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">cURL</a>
</div>

```python
# 3.3. Prepare index parameters
index_params = client.prepare_index_params()

# 3.4. Add indexes
index_params.add_index(
    field_name="my_id",
    index_type="STL_SORT"
)

index_params.add_index(
    field_name="my_vector", 
    index_type="IVF_FLAT",
    metric_type="IP",
    params={ "nlist": 128 }
)
```

```java
import io.milvus.v2.common.IndexParam;

// 3.3 Prepare index parameters
IndexParam indexParamForIdField = IndexParam.builder()
    .fieldName("my_id")
    .indexType(IndexParam.IndexType.STL_SORT)
    .build();

IndexParam indexParamForVectorField = IndexParam.builder()
    .fieldName("my_vector")
    .indexType(IndexParam.IndexType.IVF_FLAT)
    .metricType(IndexParam.MetricType.L2)
    .extraParams(Map.of("nlist", 1024))
    .build();

List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(indexParamForIdField);
indexParams.add(indexParamForVectorField);
```

```javascript
// 3.2 Prepare index parameters
const index_params = [{
    field_name: "my_id",
    index_type: "STL_SORT"
},{
    field_name: "my_vector",
    index_type: "IVF_FLAT",
    metric_type: "IP",
    params: { nlist: 1024}
}]
```

```shell
export indexParams='[{ \
    "fieldName": "my_id", \
    "indexName": "my_id", \
    "params": { \
        "index_type": "SLT_SORT" \
  } \
}, { \
    "fieldName": "my_vector", \
    "metricType": "COSINE", \
    "indexName": "my_vector", \
    "params": { \
        "index_type": "IVF_FLAT", \
        "nlist": 1024 \
  } \
}]'
```

<table class="language-python">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>field_name</code></td>
      <td>The name of the target file to apply this object applies.</td>
    </tr>
    <tr>
      <td><code>index_type</code></td>
      <td>The name of the algorithm used to arrange data in the specific field. For applicable algorithms, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a> and <a href="https://milvus.io/docs/disk_index.md">On-disk Index</a>.</td>
    </tr>
    <tr>
      <td><code>metric_type</code></td>
      <td>The algorithm that is used to measure similarity between vectors. Possible values are <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. This is available only when the specified field is a vector field. For more information, refer to <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Indexes supported in Milvus</a>.</td>
    </tr>
    <tr>
      <td><code>params</code></td>
      <td>The fine-tuning parameters for the specified index type. For details on possible keys and value ranges, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a>.</td>
    </tr>
  </tbody>
</table>

<table class="language-java">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fieldName</code></td>
      <td>The name of the target field to apply this IndexParam object applies.</td>
    </tr>
    <tr>
      <td><code>indexType</code></td>
      <td>The name of the algorithm used to arrange data in the specific field. For applicable algorithms, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a> and <a href="https://milvus.io/docs/disk_index.md">On-disk Index</a>.</td>
    </tr>
    <tr>
      <td><code>metricType</code></td>
      <td>The distance metric to use for the index. Possible values are <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>.</td>
    </tr>
    <tr>
      <td><code>extraParams</code></td>
      <td>Extra index parameters. For details, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a> and <a href="https://milvus.io/docs/disk_index.md">On-disk Index</a>.</td>
    </tr>
  </tbody>
</table>

<table class="language-javascript">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>field_name</code></td>
      <td>The name of the target field on which an index is to be created.</td>
    </tr>
    <tr>
      <td><code>index_type</code></td>
      <td>The name of the algorithm used to arrange data in the specific field. For applicable algorithms, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a> and <a href="https://milvus.io/docs/disk_index.md">On-disk Index</a>.</td>
    </tr>
    <tr>
      <td><code>metric_type</code></td>
      <td>The algorithm that is used to measure similarity between vectors. Possible values are <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. This is available only when the specified field is a vector field. For more information, refer to <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Indexes supported in Milvus</a>.</td>
    </tr>
    <tr>
      <td><code>params</code></td>
      <td>The fine-tuning parameters for the specified index type. For details on possible keys and value ranges, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a>.</td>
    </tr>
  </tbody>
</table>

<table class="language-shell">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fieldName</code></td>
      <td>The name of the target field on which an index is to be created.</td>
    </tr>
    <tr>
      <td><code>indexName</code></td>
      <td>The name of the index to create. The value defaults to the target field name.</td>
    </tr>
    <tr>
      <td><code>metricType</code></td>
      <td>The algorithm that is used to measure similarity between vectors. Possible values are <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. This is available only when the specified field is a vector field. For more information, refer to <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Indexes supported in Milvus</a>.</td>
    </tr>
    <tr>
      <td><code>params</code></td>
      <td>The index type and related settings. For details, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a>.</td>
    </tr>
    <tr>
      <td><code>params.index_type</code></td>
      <td>The type of the index to create.</td>
    </tr>
    <tr>
      <td><code>params.nlist</code></td>
      <td>The number of cluster units. This applies to IVF-related index types.</td>
    </tr>
  </tbody>
</table>

The code snippet above demonstrates how to set up index parameters for the vector field and a scalar field, respectively. For the vector field, set both the metric type and the index type. For a scalar field, set only the index type. It is recommended to create an index for the vector field and any scalar fields that are frequently used for filtering.

#### Step 3: Create the collection

You have the option to create a collection and an index file separately or to create a collection with the index loaded simultaneously upon creation.

<div class="language-python">

Use [create_collection()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md) to create a collection with the specified schema and index parameters and [get_load_state()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md) to check the load state of the collection.

</div>

<div class="language-java">

Use [createCollection()](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md) to create a collection with the specified schema and index parameters and [getLoadState()](https://milvus.io/api-reference/java/v2.4.x/v2/Management/getLoadState.md) to check the load state of the collection.

</div>

<div class="language-javascript">

Use [createCollection()](https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md) to create a collection with the specified schema and index parameters and [getLoadState()](https://milvus.io/api-reference/node/v2.4.x/Management/getLoadState.md) to check the load state of the collection.

</div>

- __Create a collection with the index loaded simultaneously upon creation.__

    <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#shell">cURL</a>
    </div>

    ```python
    # 3.5. Create a collection with the index loaded simultaneously
    client.create_collection(
        collection_name="customized_setup_1",
        schema=schema,
        index_params=index_params
    )
    
    time.sleep(5)
    
    res = client.get_load_state(
        collection_name="customized_setup_1"
    )
    
    print(res)
    
    # Output
    #
    # {
    #     "state": "<LoadState: Loaded>"
    # }
    ```

    ```java
    import io.milvus.v2.service.collection.request.CreateCollectionReq;
    import io.milvus.v2.service.collection.request.GetLoadStateReq;

    // 3.4 Create a collection with schema and index parameters
    CreateCollectionReq customizedSetupReq1 = CreateCollectionReq.builder()
        .collectionName("customized_setup_1")
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build();

    client.createCollection(customizedSetupReq1);

    // Thread.sleep(5000);

    // 3.5 Get load state of the collection
    GetLoadStateReq customSetupLoadStateReq1 = GetLoadStateReq.builder()
        .collectionName("customized_setup_1")
        .build();

    res = client.getLoadState(customSetupLoadStateReq1);

    System.out.println(res);

    // Output:
    // true
    ```

    ```javascript
    // 3.3 Create a collection with fields and index parameters
    res = await client.createCollection({
        collection_name: "customized_setup_1",
        fields: fields,
        index_params: index_params,
    })

    console.log(res.error_code)  

    // Output
    // 
    // Success
    // 

    res = await client.getLoadState({
        collection_name: "customized_setup_1"
    })

    console.log(res.state)

    // Output
    // 
    // LoadStateLoaded
    //   
    ```

    ```shell
    $ curl -X POST "http://${MILVUS_URI}/v2/vectordb/collections/create" \
    -H "Content-Type: application/json" \
    -d '{
        "collectionName": "customized_setup_1",
        "schema": {
            "autoId": false,
            "enabledDynamicField": false,
            "fields": [
                {
                    "fieldName": "my_id",
                    "dataType": "Int64",
                    "isPrimary": true
                },
                {
                    "fieldName": "my_vector",
                    "dataType": "FloatVector",
                    "elementTypeParams": {
                        "dim": "5"
                    }
                }
            ]
        },
        "indexParams": [
            {
                "fieldName": "my_vector",
                "metricType": "COSINE",
                "indexName": "my_vector",
                "params": {
                    "index_type": "IVF_FLAT",
                    "nlist": "1024"
                }
            },
            {
                "fieldName": "my_id",
                "indexName": "my_id",
                "params": {
                    "index_type": "STL_SORT"
                }            
            }
        ]
    }'

    # Output
    #
    # {
    #     "code": 0,
    #     "data": {},
    # }

    $ curl -X POST "http://${MILVUS_URI}/v2/vectordb/collections/get_load_state" \
    -H "Content-Type: application/json" \
    -d '{
        "collectionName": "customized_setup_1"
    }'

    # {
    #     "code": 0,
    #     "data": {
    #         "loadProgress": 100,
    #         "loadState": "LoadStateLoaded"
    #     }
    # }
    ```

    The collection created above is loaded automatically. To learn more about loading and releasing a collection, refer to [Load & Release Collection](manage-collections.md#Load--Release-Collection). 

- __Create a collection and an index file separately.__

    <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#shell">cURL</a>
    </div>

    ```python
    # 3.6. Create a collection and index it separately
    client.create_collection(
        collection_name="customized_setup_2",
        schema=schema,
    )
    
    res = client.get_load_state(
        collection_name="customized_setup_2"
    )
    
    print(res)
    
    # Output
    #
    # {
    #     "state": "<LoadState: NotLoad>"
    # }
    ```
    
    ```java
    // 3.6 Create a collection and index it separately
    CreateCollectionReq customizedSetupReq2 = CreateCollectionReq.builder()
        .collectionName("customized_setup_2")
        .collectionSchema(schema)
        .build();

    client.createCollection(customizedSetupReq2);
    ```

    ```javascript
    // 3.4 Create a collection and index it seperately
    res = await client.createCollection({
        collection_name: "customized_setup_2",
        fields: fields,
    })

    console.log(res.error_code)

    // Output
    // 
    // Success
    // 

    res = await client.getLoadState({
        collection_name: "customized_setup_2"
    })

    console.log(res.state)

    // Output
    // 
    // LoadStateNotLoad
    // 
    ```

    ```shell
    $ curl -X POST "http://${MILVUS_URI}/v2/vectordb/collections/create" \
    -H "Content-Type: application/json" \
    -d '{
        "collectionName": "customized_setup_2",
        "schema": {
            "autoId": false,
            "enabledDynamicField": false,
            "fields": [
                {
                    "fieldName": "my_id",
                    "dataType": "Int64",
                    "isPrimary": true
                },
                {
                    "fieldName": "my_vector",
                    "dataType": "FloatVector",
                    "elementTypeParams": {
                        "dim": "5"
                    }
                }
            ]
            
        }
    }'

    # Output
    #
    # {
    #     "code": 0,
    #     "data": {},
    # }

    $ curl -X POST "http://${MILVUS_URI}/v2/vectordb/collections/get_load_state" \
    -H "Content-Type: application/json" \
    -d '{
        "collectionName": "customized_setup_2"
    }'

    # {
    #     "code": 0,
    #     "data": {
    #         "loadState": "LoadStateNotLoaded"
    #     }
    # }
    ```

    The collection created above is not loaded automatically. You can create an index for the collection as follows. Creating an index for the collection in a separate manner does not automatically load the collection. For details, refer to [Load & Release Collection](manage-collections.md#Load--Release-Collection).

    <table class="language-python">
    <thead>
        <tr>
        <th>Parameter</th>
        <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td><code>collection_name</code></td>
        <td>The name of the collection.</td>
        </tr>
        <tr>
        <td><code>schema</code></td>
        <td>The schema of this collection.<br>Setting this to <strong>None</strong> indicates this collection will be created with default settings.<br>To set up a collection with a customized schema, you need to create a <strong>CollectionSchema</strong> object and reference it here. In this case, Milvus ignores all other schema-related settings carried in the request.</td>
        </tr>
        <tr>
        <td><code>index_params</code></td>
        <td>The parameters for building the index on the vector field in this collection. To set up a collection with a customized schema and automatically load the collection to memory, you need to create an IndexParams object and reference it here.<br>You should at least add an index for the vector field in this collection. You can also skip this parameter if you prefer to set up the index parameters later on.</td>
        </tr>
    </tbody>
    </table>

    <table class="language-java">
    <thead>
        <tr>
        <th>Parameter</th>
        <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td><code>collectionName</code></td>
        <td>The name of the collection.</td>
        </tr>
        <tr>
        <td><code>collectionSchema</code></td>
        <td>The schema of this collection.<br>Leaving it empty indicates this collection will be created with default settings. To set up a collection with a customized schema, you need to create a <strong>CollectionSchema</strong> object and reference it here.</td>
        </tr>
        <tr>
        <td><code>indexParams</code></td>
        <td>The parameters for building the index on the vector field in this collection. To set up a collection with a customized schema and automatically load the collection to memory, create an <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md">IndexParams</a> object with a list of IndexParam objects and reference it here.</td>
        </tr>
    </tbody>
    </table>

    <table class="language-javascript">
    <thead>
        <tr>
        <th>Parameter</th>
        <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td><code>collection_name</code></td>
        <td>The name of the collection.</td>
        </tr>
        <tr>
        <td><code>fields</code></td>
        <td>The fields in the collection.</td>
        </tr>
        <tr>
        <td><code>index_params</code></td>
        <td>The index parameters for the collection to create.</td>
        </tr>
    </tbody>
    </table>

    <table class="language-shell">
    <thead>
        <tr>
        <th>Parameter</th>
        <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td><code>collectionName</code></td>
        <td>The name of the collection.</td>
        </tr>
        <tr>
        <td><code>schema</code></td>
        <td>The schema is responsible for organizing data in the target collection. A valid schema should have multiple fields, which must include a primary key, a vector field, and several scalar fields.</td>
        </tr>
        <tr>
        <td><code>schema.autoID</code></td>
        <td>Whether allows the primary field to automatically increment. Setting this to True makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors. Set this parameter in the field with is_primary set to True.</td>
        </tr>
        <tr>
        <td><code>schema.enableDynamicField</code></td>
        <td>Whether allows to use the reserved $meta field to hold non-schema-defined fields in key-value pairs.</td>
        </tr>
        <tr>
        <td><code>fields</code></td>
        <td>A list of field objects.</td>
        </tr>
        <tr>
        <td><code>fields.fieldName</code></td>
        <td>The name of the field to create in the target collection.</td>
        </tr>
        <tr>
        <td><code>fields.dataType</code></td>
        <td>The data type of the field values.</td>
        </tr>
        <tr>
        <td><code>fields.isPrimary</code></td>
        <td>Whether the current field is the primary field. Setting this to True makes the current field the primary field.</td>
        </tr>
        <tr>
        <td><code>fields.elementTypeParams</code></td>
        <td>Extra field parameters.</td>
        </tr>
        <tr>
        <td><code>fields.elementTypeParams.dim</code></td>
        <td>An optional parameter for FloatVector or BinaryVector fields that determines the vector dimension.</td>
        </tr>
    </tbody>
    </table>

    The collection created above is not loaded automatically. You can create an index for the collection as follows. Creating an index for the collection in a separate manner does not automatically load the collection. For details, refer to [Load & Release Collection](manage-collections.md).

    <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#shell">cURL</a>
    </div>

    ```python
    # 3.6 Create index
    client.create_index(
        collection_name="customized_setup_2",
        index_params=index_params
    )
    
    res = client.get_load_state(
        collection_name="customized_setup_2"
    )
    
    print(res)
    
    # Output
    #
    # {
    #     "state": "<LoadState: NotLoad>"
    # }
    ```

    ```java
    CreateIndexReq  createIndexReq = CreateIndexReq.builder()
        .collectionName("customized_setup_2")
        .indexParams(indexParams)
        .build();

    client.createIndex(createIndexReq);

    // Thread.sleep(1000);

    // 3.7 Get load state of the collection
    GetLoadStateReq customSetupLoadStateReq2 = GetLoadStateReq.builder()
        .collectionName("customized_setup_2")
        .build();

    res = client.getLoadState(customSetupLoadStateReq2);

    System.out.println(res);

    // Output:
    // false
    ```

    ```javascript
    // 3.5 Create index
    res = await client.createIndex({
        collection_name: "customized_setup_2",
        field_name: "my_vector",
        index_type: "IVF_FLAT",
        metric_type: "IP",
        params: { nlist: 1024}
    })

    res = await client.getLoadState({
        collection_name: "customized_setup_2"
    })

    console.log(res.state)

    // Output
    // 
    // LoadStateNotLoad
    //
    ```

    ```shell
    $ curl -X POST "http://${MILVUS_URI}/v2/vectordb/indexes/create" \
    -H "Content-Type: application/json" \
    -d '{
        "collectionName": "customized_setup_2",
        "indexParams": [
            {
                "metricType": "L2",
                "fieldName": "my_vector",
                "indexName": "my_vector",
                "indexConfig": {
                    "index_type": "IVF_FLAT",
                    "nlist": "1024"
                }
            }
        ]
    }'

    # Output
    #
    # {
    #     "code": 0,
    #     "data": {},
    # }

    $ curl -X POST "http://${MILVUS_URI}/v2/vectordb/collections/get_load_state" \
    -H "Content-Type: application/json" \
    -d '{
        "collectionName": "customized_setup_2"
    }'

    # {
    #     "code": 0,
    #     "data": {
    #         "loadState": "LoadStateNotLoaded"
    #     }
    # }
    ```

  <table class="language-python">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>collection_name</code></td>
      <td>The name of the collection.</td>
    </tr>
    <tr>
      <td><code>index_params</code></td>
      <td>An <strong>IndexParams</strong> object containing a list of <strong>IndexParam</strong> objects.</td>
    </tr>
  </tbody>
</table>

<table class="language-java">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>collectionName</code></td>
      <td>The name of the collection.</td>
    </tr>
    <tr>
      <td><code>indexParams</code></td>
      <td>A list of <strong>IndexParam</strong> objects.</td>
    </tr>
  </tbody>
</table>

<table class="language-javascript">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>collection_name</code></td>
      <td>The name of the collection.</td>
    </tr>
    <tr>
      <td><code>field_name</code></td>
      <td>The name of the field in which to create an index.</td>
    </tr>
    <tr>
      <td><code>index_type</code></td>
      <td>The name of the algorithm used to arrange data in the specific field. For applicable algorithms, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a> and <a href="https://milvus.io/docs/disk_index.md">On-disk Index</a>.</td>
    </tr>
    <tr>
      <td><code>metric_type</code></td>
      <td>The algorithm that is used to measure similarity between vectors. Possible values are <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. This is available only when the specified field is a vector field. For more information, refer to <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Indexes supported in Milvus</a>.</td>
    </tr>
    <tr>
      <td><code>params</code></td>
      <td>The fine-tuning parameters for the specified index type. For details on possible keys and value ranges, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a>.</td>
    </tr>
  </tbody>
</table>

<table class="language-shell">
    <thead>
        <tr>
        <th>Parameter</th>
        <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td><code>collectionName</code></td>
        <td>The name of the collection.</td>
        </tr>
        <tr>
        <td><code>indexParams</code></td>
        <td>The index parameters for the collection to create.</td>
        </tr>
        <tr>
        <td><code>indexParams.metricType</code></td>
        <td>The similarity metric type used to build the index. The value defaults to COSINE.</td>
        </tr>
        <tr>
        <td><code>indexParams.fieldName</code></td>
        <td>The name of the target field on which an index is to be created.</td>
        </tr>
        <tr>
        <td><code>indexParams.indexName</code></td>
        <td>The name of the index to create, the value defaults to the target field name.</td>
        </tr>
        <tr>
        <td><code>indexParams.indexConfig.index_type</code></td>
        <td>The type of the index to create.</td>
        </tr>
        <tr>
        <td><code>indexParams.indexConfig.nlist</code></td>
        <td>The number of cluster units. This applies to IVF-related index types.</td>
        </tr>
    </tbody>
</table>

## View Collections

<div class="language-python">

To check the details of an existing collection, use [describe_collection()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/describe_collection.md).

</div>

<div class="language-java">

To check the details of an existing collection, use [describeCollection()](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/describeCollection.md).

</div>

<div class="language-javascript">

To check the details of an existing collection, use [describeCollection()](https://milvus.io/api-reference/node/v2.4.x/Collections/describeCollection.md).

</div>

<div class="language-shell">

To view the definition of a collection, you can use the [`POST /v2/vectordb/collections/describe`](https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Describe.md) and the [`POST /v2/vectordb/collections/list`](https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/List.md) API endpoints.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#shell">cURL</a>
</div>

```python
# 5. View Collections
res = client.describe_collection(
    collection_name="customized_setup_2"
)

print(res)

# Output
#
# {
#     "collection_name": "customized_setup_2",
#     "auto_id": false,
#     "num_shards": 1,
#     "description": "",
#     "fields": [
#         {
#             "field_id": 100,
#             "name": "my_id",
#             "description": "",
#             "type": 5,
#             "params": {},
#             "element_type": 0,
#             "is_primary": true
#         },
#         {
#             "field_id": 101,
#             "name": "my_vector",
#             "description": "",
#             "type": 101,
#             "params": {
#                 "dim": 5
#             },
#             "element_type": 0
#         }
#     ],
#     "aliases": [],
#     "collection_id": 448143479230158446,
#     "consistency_level": 2,
#     "properties": {},
#     "num_partitions": 1,
#     "enable_dynamic_field": true
# }

```

```java
import io.milvus.v2.service.collection.request.DescribeCollectionReq;
import io.milvus.v2.service.collection.response.DescribeCollectionResp;

// 4. View collections
DescribeCollectionReq describeCollectionReq = DescribeCollectionReq.builder()
    .collectionName("customized_setup_2")
    .build();

DescribeCollectionResp describeCollectionRes = client.describeCollection(describeCollectionReq);

System.out.println(JSONObject.toJSON(describeCollectionRes));

// Output:
// {
//     "createTime": 449005822816026627,
//     "collectionSchema": {"fieldSchemaList": [
//         {
//             "autoID": false,
//             "dataType": "Int64",
//             "name": "my_id",
//             "description": "",
//             "isPrimaryKey": true,
//             "maxLength": 65535,
//             "isPartitionKey": false
//         },
//         {
//             "autoID": false,
//             "dataType": "FloatVector",
//             "name": "my_vector",
//             "description": "",
//             "isPrimaryKey": false,
//             "dimension": 5,
//             "maxLength": 65535,
//             "isPartitionKey": false
//         }
//     ]},
//     "vectorFieldName": ["my_vector"],
//     "autoID": false,
//     "fieldNames": [
//         "my_id",
//         "my_vector"
//     ],
//     "description": "",
//     "numOfPartitions": 1,
//     "primaryFieldName": "my_id",
//     "enableDynamicField": true,
//     "collectionName": "customized_setup_2"
// }
```

```javascript
// 5. View Collections
res = await client.describeCollection({
    collection_name: "customized_setup_2"
})

console.log(res)

// Output
// 
// {
//   virtual_channel_names: [ 'by-dev-rootcoord-dml_13_449007919953017716v0' ],
//   physical_channel_names: [ 'by-dev-rootcoord-dml_13' ],
//   aliases: [],
//   start_positions: [],
//   properties: [],
//   status: {
//     extra_info: {},
//     error_code: 'Success',
//     reason: '',
//     code: 0,
//     retriable: false,
//     detail: ''
//   },
//   schema: {
//     fields: [ [Object], [Object] ],
//     properties: [],
//     name: 'customized_setup_2',
//     description: '',
//     autoID: false,
//     enable_dynamic_field: false
//   },
//   collectionID: '449007919953017716',
//   created_timestamp: '449024569603784707',
//   created_utc_timestamp: '1712892797866',
//   shards_num: 1,
//   consistency_level: 'Bounded',
//   collection_name: 'customized_setup_2',
//   db_name: 'default',
//   num_partitions: '1'
// }
// 
```

```shell
curl -X POST "http://${MILVUS_URI}/v2/vectordb/collections/describe" \
-H "Content-Type: application/json" \
-d '{
    "dbName": "default",
    "collectionName": "test_collection"
}'

# {
#     "code": 0,
#     "data": {
#         "aliases": [],
#         "autoId": false,
#         "collectionID": 448707763883002014,
#         "collectionName": "test_collection",
#         "consistencyLevel": "Bounded",
#         "description": "",
#         "enableDynamicField": true,
#         "fields": [
#             {
#                 "autoId": false,
#                 "description": "",
#                 "id": 100,
#                 "name": "id",
#                 "partitionKey": false,
#                 "primaryKey": true,
#                 "type": "Int64"
#             },
#             {
#                 "autoId": false,
#                 "description": "",
#                 "id": 101,
#                 "name": "vector",
#                 "params": [
#                     {
#                         "key": "dim",
#                         "value": "5"
#                     }
#                 ],
#                 "partitionKey": false,
#                 "primaryKey": false,
#                 "type": "FloatVector"
#             }
#         ],
#         "indexes": [
#             {
#                 "fieldName": "vector",
#                 "indexName": "vector",
#                 "metricType": "COSINE"
#             }
#         ],
#         "load": "LoadStateLoaded",
#         "partitionsNum": 1,
#         "properties": [],
#         "shardsNum": 1
#     }
# }
```

To list all existing collections, you can do as follows:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#shell">cURL</a>
</div>

```python
# 6. List all collection names
res = client.list_collections()

print(res)

# Output
#
# [
#     "customized_setup_2",
#     "quick_setup",
#     "customized_setup_1"
# ]
```

```java
import io.milvus.v2.service.collection.response.ListCollectionsResp;

// 5. List all collection names
ListCollectionsResp listCollectionsRes = client.listCollections();

System.out.println(listCollectionsRes.getCollectionNames());

// Output:
// [
//     "customized_setup_2",
//     "quick_setup",
//     "customized_setup_1"
// ]
```

```javascript
// 5. List all collection names
ListCollectionsResp listCollectionsRes = client.listCollections();

System.out.println(listCollectionsRes.getCollectionNames());

// Output:
// [
//     "customized_setup_1",
//     "quick_setup",
//     "customized_setup_2"
// ]
```

```shell
$ curl -X POST "http://${MILVUS_URI}/v2/vectordb/collections/list" \
-H "Content-Type: application/json" \
-d '{
    "dbName": "default"
}'

# {
#   "code": 0,
#   "data": [
#     "quick_setup",
#     "customized_setup_1",
#     "customized_setup_2"
#   ]
# }
```

## Load & Release Collection

During the loading process of a collection, Milvus loads the collection's index file into memory. Conversely, when releasing a collection, Milvus unloads the index file from memory. Before conducting searches in a collection, ensure that the collection is loaded.

### Load a collection

<div class="language-python">

To load a collection, use the [`load_collection()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/load_collection.md) method, specifying the collection name. You can also set `replica_number` to determine how many in-memory replicas of data segments to create on query nodes when the collection is loaded.

- Milvus Standalone: The maximum allowed value for `replica_number` is 1.
- Milvus Cluster: The maximum value should not exceed the `queryNode.replicas` set in your Milvus configurations. For additional details, refer to [Query Node-related Configurations](https://milvus.io/docs/configure_querynode.md#Query-Node-related-Configurations).

</div>

<div class="language-java">

To load a collection, use the [`loadCollection()`](https://milvus.io/api-reference/java/v2.4.x/v2/Management/loadCollection.md) method, specifying the collection name.

</div>

<div class="language-javascript">

To load a collection, use the [`loadCollection()`](https://milvus.io/api-reference/node/v2.4.x/Management/loadCollection.md) method, specifying the collection name.

</div>

<div class="language-shell">

To load a collection, you can use the [`POST /v2/vectordb/collections/load`](https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Load.md) and the [`POST /v2/vectordb/collections/get_load_state`](https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/GetLoadState.md) API endpoints.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#shell">cURL</a>
</div>

```python
# 7. Load the collection
client.load_collection(
    collection_name="customized_setup_2",
    replica_number=1 # Number of replicas to create on query nodes. Max value is 1 for Milvus Standalone, and no greater than `queryNode.replicas` for Milvus Cluster.
)

res = client.get_load_state(
    collection_name="customized_setup_2"
)

print(res)

# Output
#
# {
#     "state": "<LoadState: Loaded>"
# }
```

```java
import io.milvus.v2.service.collection.request.LoadCollectionReq;

// 6. Load the collection
LoadCollectionReq loadCollectionReq = LoadCollectionReq.builder()
    .collectionName("customized_setup_2")
    .build();

client.loadCollection(loadCollectionReq);

// Thread.sleep(5000);

// 7. Get load state of the collection
GetLoadStateReq loadStateReq = GetLoadStateReq.builder()
    .collectionName("customized_setup_2")
    .build();

res = client.getLoadState(loadStateReq);

System.out.println(res);

// Output:
// true
```

```javascript
// 7. Load the collection
res = await client.loadCollection({
    collection_name: "customized_setup_2"
})

console.log(res.error_code)

// Output
// 
// Success
// 

await sleep(3000)

res = await client.getLoadState({
    collection_name: "customized_setup_2"
})

console.log(res.state)

// Output
// 
// LoadStateLoaded
// 
```

```shell
$ curl -X POST "http://${MILVUS_URI}/v2/vectordb/collections/load" \
-H "Content-Type: application/json" \
-d '{
    "collectionName": "customized_setup_2"
}'

# Output
#
# {
#     "code": 0,
#     "data": {},
# }

$ curl -X POST "http://${MILVUS_URI}/v2/vectordb/collections/get_load_state" \
-H "Content-Type: application/json" \
-d '{
  "collectionName": "customized_setup_2"
}'

# {
#     "code": 0,
#     "data": {
#         "loadProgress": 100,
#         "loadState": "LoadStateLoaded"
#     }
# }
```

### Release a collection

<div class="language-python">

To release a collection, use the [`release_collection()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/release_collection.md) method, specifying the collection name.

</div>

<div class="language-java">

To release a collection, use the [`releaseCollection()`](https://milvus.io/api-reference/java/v2.4.x/v2/Management/releaseCollection.md) method, specifying the collection name.

</div>

<div class="language-javascript">

To release a collection, use the [`releaseCollection()`](https://milvus.io/api-reference/node/v2.4.x/Management/releaseCollection.md) method, specifying the collection name.

</div>

<div class="language-shell">

To release a collection, you can use the [`POST /v2/vectordb/collections/release`](https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Release.md) and the [`POST /v2/vectordb/collections/get_load_state`](https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/GetLoadState.md) API endpoints.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#shell">cURL</a>
</div>

```python
# 8. Release the collection
client.release_collection(
    collection_name="customized_setup_2"
)

res = client.get_load_state(
    collection_name="customized_setup_2"
)

print(res)

# Output
#
# {
#     "state": "<LoadState: NotLoad>"
# }
```

```java
import io.milvus.v2.service.collection.request.ReleaseCollectionReq;

// 8. Release the collection
ReleaseCollectionReq releaseCollectionReq = ReleaseCollectionReq.builder()
    .collectionName("customized_setup_2")
    .build();

client.releaseCollection(releaseCollectionReq);

// Thread.sleep(1000);

res = client.getLoadState(loadStateReq);

System.out.println(res);

// Output:
// false
```

```javascript
// 8. Release the collection
res = await client.releaseCollection({
    collection_name: "customized_setup_2"
})

console.log(res.error_code)

// Output
// 
// Success
// 

res = await client.getLoadState({
    collection_name: "customized_setup_2"
})

console.log(res.state)

// Output
// 
// LoadStateNotLoad
// 
```

```shell
$ curl -X POST "http://${MILVUS_URI}/v2/vectordb/collections/release" \
-H "Content-Type: application/json" \
-d '{
    "collectionName": "customized_setup_2"
}'

# Output
#
# {
#     "code": 0,
#     "data": {},
# }


$ curl -X POST "http://${MILVUS_URI}/v2/vectordb/collections/get_load_state" \
-H "Content-Type: application/json" \
-d '{
  "collectionName": "customized_setup_2"
}'


# {
#     "code": 0,
#     "data": {
#         "loadState": "LoadStateNotLoad"
#     }
# }
```

## Set up aliases

You can assign aliases for collections to make them more meaningful in a specific context. You can assign multiple aliases for a collection, but multiple collections cannot share an alias.

### Create aliases

<div class="language-python">

To create aliases, use the [`create_alias()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_alias.md) method, specifying the collection name and the alias.

</div>

<div class="language-java">

To create aliases, use the [`createAlias()`](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createAlias.md) method, specifying the collection name and the alias.

</div>

<div class="language-javascript">

To create aliases, use the [`createAlias()`](https://milvus.io/api-reference/node/v2.4.x/Collections/createAlias.md) method, specifying the collection name and the alias.

</div>

<div class="language-shell">

To create aliases for a collection, you can use the [`POST /v2/vectordb/aliases/create`](https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/Create.md) API endpoint.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#shell">cURL</a>
</div>

```python
# 9.1. Create aliases
client.create_alias(
    collection_name="customized_setup_2",
    alias="bob"
)

client.create_alias(
    collection_name="customized_setup_2",
    alias="alice"
)
```

```java
import io.milvus.v2.service.utility.request.CreateAliasReq;

// 9. Manage aliases

// 9.1 Create alias
CreateAliasReq createAliasReq = CreateAliasReq.builder()
    .collectionName("customized_setup_2")
    .alias("bob")
    .build();

client.createAlias(createAliasReq);

createAliasReq = CreateAliasReq.builder()
    .collectionName("customized_setup_2")
    .alias("alice")
    .build();

client.createAlias(createAliasReq);
```

```javascript
// 9. Manage aliases
// 9.1 Create aliases
res = await client.createAlias({
    collection_name: "customized_setup_2",
    alias: "bob"
})

console.log(res.error_code)

// Output
// 
// Success
// 

res = await client.createAlias({
    collection_name: "customized_setup_2",
    alias: "alice"
})

console.log(res.error_code)

// Output
// 
// Success
// 
```

```shell
$ curl -X POST "http://${MILVUS_URI}/v2/vectordb/aliases/create" \
-H "Content-Type: application/json" \
-d '{
    "collectionName": "customized_setup_2",
    "aliasName": "bob"
}'

# Output
#
# {
#     "code": 0,
#     "data": {}
# }

$ curl -X POST "http://${MILVUS_URI}/v2/vectordb/aliases/create" \
-H "Content-Type: application/json" \
-d '{
    "collectionName": "customized_setup_2",
    "aliasName": "alice"
}'

# Output
#
# {
#     "code": 0,
#     "data": {}
# }
```

<table class="language-python">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>collection_name</code></td>
      <td>The name of the collection to create an alias for.</td>
    </tr>
    <tr>
      <td><code>alias</code></td>
      <td>The alias of the collection. Before this operation, ensure that the alias does not already exist. If it does, exceptions will occur.</td>
    </tr>
  </tbody>
</table>

<table class="language-java">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>collectionName</code></td>
      <td>The name of the collection to create an alias for.</td>
    </tr>
    <tr>
      <td><code>alias</code></td>
      <td>The alias of the collection. Before this operation, ensure that the alias does not already exist. If it does, exceptions will occur.</td>
    </tr>
  </tbody>
</table>

<table class="language-javascript">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>collection_name</code></td>
      <td>The name of the collection to create an alias for.</td>
    </tr>
    <tr>
      <td><code>alias</code></td>
      <td>The alias of the collection. Before this operation, ensure that the alias does not already exist. If it does, exceptions will occur.</td>
    </tr>
  </tbody>
</table>

<table class="language-shell">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>collectionName</code></td>
      <td>The name of the collection to create an alias for.</td>
    </tr>
    <tr>
      <td><code>aliasName</code></td>
      <td>The alias of the collection. Before this operation, ensure that the alias does not already exist. If it does, exceptions will occur.</td>
    </tr>
  </tbody>
</table>

### List aliases

<div class="language-python">

To list aliases, use the [`list_aliases()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_aliases.md) method, specifying the collection name.

</div>

<div class="language-java">

To list aliases, use the [`listAliases()`](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/listAliases.md) method, specifying the collection name.

</div>

<div class="language-javascript">

To list aliases, use the [`listAliases()`](https://milvus.io/api-reference/node/v2.4.x/Collections/listAliases.md) method, specifying the collection name.

</div>

<div class="language-shell">

To list aliases for a collection, you can use the [`POST /v2/vectordb/aliases/list`](https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/List.md) API endpoint.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#shell">cURL</a>
</div>

```python
# 9.2. List aliases
res = client.list_aliases(
    collection_name="customized_setup_2"
)

print(res)

# Output
#
# {
#     "aliases": [
#         "bob",
#         "alice"
#     ],
#     "collection_name": "customized_setup_2",
#     "db_name": "default"
# }
```

```java
import io.milvus.v2.service.utility.request.ListAliasesReq;
import io.milvus.v2.service.utility.response.ListAliasResp;

// 9.2 List alises
ListAliasesReq listAliasesReq = ListAliasesReq.builder()
    .collectionName("customized_setup_2")
    .build();

ListAliasResp listAliasRes = client.listAliases(listAliasesReq);

System.out.println(listAliasRes.getAlias());

// Output:
// [
//     "bob",
//     "alice"
// ]
```

```javascript
// 9.2 List aliases
res = await client.listAliases({
    collection_name: "customized_setup_2"
})

console.log(res.aliases)

// Output
// 
// [ 'bob', 'alice' ]
// 
```

```shell
$ curl -X POST "http://${MILVUS_URI}/v2/vectordb/aliases/list" \
-H "Content-Type: application/json" \
-d '{
    "collectionName": "customized_setup_2"
}'

# {
#     "code": 0,
#     "data": [
#         "bob",
#         "alice"
#     ]
# }
```

### Describe aliases

<div class="language-python">

To describe aliases, use the [`describe_alias()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/describe_alias.md) method, specifying the alias.

</div>

<div class="language-java">

To describe aliases, use the [`describeAlias()`](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/describeAlias.md) method, specifying the alias.

</div>

<div class="language-javascript">

To describe aliases, use the [`describeAlias()`](https://milvus.io/api-reference/node/v2.4.x/Collections/describeAlias.md) method, specifying the alias.

</div>

<div class="language-shell">

To describe aliases for a collection, you can use the [`POST /v2/vectordb/aliases/describe`](https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/Describe.md) API endpoint.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#shell">cURL</a>
</div>

```python
# 9.3. Describe aliases
res = client.describe_alias(
    alias="bob"
)

print(res)

# Output
#
# {
#     "alias": "bob",
#     "collection_name": "customized_setup_2",
#     "db_name": "default"
# }
```

```java
import io.milvus.v2.service.utility.request.DescribeAliasReq;
import io.milvus.v2.service.utility.response.DescribeAliasResp;

// 9.3 Describe alias
DescribeAliasReq describeAliasReq = DescribeAliasReq.builder()
    .alias("bob")
    .build();

DescribeAliasResp describeAliasRes = client.describeAlias(describeAliasReq);

System.out.println(JSONObject.toJSON(describeAliasRes));

// Output:
// {
//     "alias": "bob",
//     "collectionName": "customized_setup_2"
// }
```

```javascript
// 9.3 Describe aliases
res = await client.describeAlias({
    collection_name: "customized_setup_2",
    alias: "bob"
})

console.log(res)

// Output
// 
// {
//   status: {
//     extra_info: {},
//     error_code: 'Success',
//     reason: '',
//     code: 0,
//     retriable: false,
//     detail: ''
//   },
//   db_name: 'default',
//   alias: 'bob',
//   collection: 'customized_setup_2'
// }
// 
```

```shell
$ curl -X POST "http://${MILVUS_URI}/v2/vectordb/aliases/describe" \
-H "Content-Type: application/json" \
-d '{
    "aliasName": "bob"
}'

# {
#     "code": 0,
#     "data": {
#         "aliasName": "bob",
#         "collectionName": "quick_setup",
#         "dbName": "default"
#     }
# }
```

### Reassign aliases

<div class="language-python">

To reassign aliases to other collections, use the [`alter_alias()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/alter_alias.md) method, specifying the collection name and the alias.

</div>

<div class="language-java">

To reassign aliases to other collections, use the [`alterAlias()`](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/alterAlias.md) method, specifying the collection name and the alias.

</div>

<div class="language-javascript">

To reassign aliases to other collections, use the [`alterAlias()`](https://milvus.io/api-reference/node/v2.4.x/Collections/alterAlias.md) method, specifying the collection name and the alias.

</div>

<div class="language-shell">

To reassign aliases to other collections, you can use the [`POST /v2/vectordb/aliases/alter`](https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/Alter.md) API endpoint.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#shell">cURL</a>
</div>

```python
# 9.4 Reassign aliases to other collections
client.alter_alias(
    collection_name="customized_setup_1",
    alias="alice"
)

res = client.list_aliases(
    collection_name="customized_setup_1"
)

print(res)

# Output
#
# {
#     "aliases": [
#         "alice"
#     ],
#     "collection_name": "customized_setup_1",
#     "db_name": "default"
# }

res = client.list_aliases(
    collection_name="customized_setup_2"
)

print(res)

# Output
#
# {
#     "aliases": [
#         "bob"
#     ],
#     "collection_name": "customized_setup_2",
#     "db_name": "default"
# }
```

```java
import io.milvus.v2.service.utility.request.AlterAliasReq;

// 9.4 Reassign alias to other collections
AlterAliasReq alterAliasReq = AlterAliasReq.builder()
    .collectionName("customized_setup_1")
    .alias("alice")
    .build();

client.alterAlias(alterAliasReq);

listAliasesReq = ListAliasesReq.builder()
    .collectionName("customized_setup_1")
    .build();

listAliasRes = client.listAliases(listAliasesReq);

System.out.println(listAliasRes.getAlias());

// Output:
// ["alice"]

listAliasesReq = ListAliasesReq.builder()
    .collectionName("customized_setup_2")
    .build();

listAliasRes = client.listAliases(listAliasesReq);

System.out.println(listAliasRes.getAlias());

// Output:
// ["bob"]
```

```javascript
// 9.4 Reassign aliases to other collections
res = await client.alterAlias({
    collection_name: "customized_setup_1",
    alias: "alice"
})

console.log(res.error_code)

// Output
// 
// Success
// 

res = await client.listAliases({
    collection_name: "customized_setup_1"
})

console.log(res.aliases)

// Output
// 
// [ 'alice' ]
// 

res = await client.listAliases({
    collection_name: "customized_setup_2"
})

console.log(res.aliases)

// Output
// 
// [ 'bob' ]
// 
```

```shell
$ curl -X POST "http://${MILVUS_URI}/v2/vectordb/aliases/alter" \
-H "Content-Type: application/json" \
-d '{
     "collectionName": "customized_setup_1",
     "aliasName": "alice"
}'

# {
#     "code": 0,
#     "data": {}
# }


$ curl -X POST "http://${MILVUS_URI}/v2/vectordb/aliases/list" \
-H "Content-Type: application/json" \
-d '{
    "collectionName": "customized_setup_1"
}'


# {
#     "code": 0,
#     "data": [
#         "alice"
#     ]
# }


$ curl -X POST "http://${MILVUS_URI}/v2/vectordb/aliases/list" \
-H "Content-Type: application/json" \
-d '{
    "collectionName": "customized_setup_2"
}'


# {
#     "code": 0,
#     "data": [
#         "bob"
#     ]
# }
```

### Drop aliases

<div class="language-python">

To drop aliases, use the [`drop_alias()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/drop_alias.md) method, specifying the alias.

</div>

<div class="language-java">

To drop aliases, use the [`dropAlias()`](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/dropAlias.md) method, specifying the alias.

</div>

<div class="language-javascript">

To drop aliases, use the [`dropAlias()`](https://milvus.io/api-reference/node/v2.4.x/Collections/dropAlias.md) method, specifying the alias.

</div>

<div class="language-shell">

To drop aliases for a collection, you can use the [`POST /v2/vectordb/aliases/drop`](https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/Drop.md) API endpoint.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# 9.5 Drop aliases
client.drop_alias(
    alias="bob"
)

client.drop_alias(
    alias="alice"
)
```

```java
import io.milvus.v2.service.utility.request.DropAliasReq;

// 9.5 Drop alias
DropAliasReq dropAliasReq = DropAliasReq.builder()
    .alias("bob")
    .build();

client.dropAlias(dropAliasReq);

dropAliasReq = DropAliasReq.builder()
    .alias("alice")
    .build();

client.dropAlias(dropAliasReq);
```

```javascript
// 9.5 Drop aliases
res = await client.dropAlias({
    alias: "bob"
})

console.log(res.error_code)

// Output
// 
// Success
// 

res = await client.dropAlias({
    alias: "alice"
})

console.log(res.error_code)

// Output
// 
// Success
// 
```
```shell
$ curl -X POST "http://${MILVUS_URI}/v2/vectordb/aliases/drop" \
-H "Content-Type: application/json" \
-d '{
    "aliasName": "bob"
}'

# {
#     "code": 0,
#     "data": {}
# }


$ curl -X POST "http://${MILVUS_URI}/v2/vectordb/aliases/drop" \
-H "Content-Type: application/json" \
-d '{
    "aliasName": "alice"
}'


# {
#     "code": 0,
#     "data": {}
# }
```

## Set Properties

You can set properties for a collection, such as `ttl.seconds` and `mmap.enabled`. For more information, refer to [set_properties()](https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/set_properties.md).

<div class="alert note">

The code snippets in this section use the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">PyMilvus ORM module</a> to interact with Milvus. Code snippets with the new <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient SDK</a> will be available soon.

</div>

### Set TTL

Set the Time-To-Live (TTL) for the data in the collection, which specifies how long the data should be retained before it is automatically deleted.

```python
from pymilvus import Collection, connections

# Connect to Milvus server
connections.connect(host="localhost", port="19530") # Change to your Milvus server IP and port

# Get existing collection
collection = Collection("quick_setup")

# Set the TTL for the data in the collection
collection.set_properties(
    properties={
        "collection.ttl.seconds": 60
    }
)
```

### Set MMAP

Configure the memory mapping (MMAP) property for the collection, which determines whether data is mapped into memory to improve query performance. For more information, refer to [Configure memory mapping
](https://milvus.io/docs/mmap.md#Configure-memory-mapping).

<div class="alert note">

Before setting the MMAP property, release the collection first. Otherwise, an error will occur.

</div>

```python
from pymilvus import Collection, connections

# Connect to Milvus server
connections.connect(host="localhost", port="19530") # Change to your Milvus server IP and port

# Get existing collection
collection = Collection("quick_setup")

# Before setting memory mapping property, we need to release the collection first.
collection.release()

# Set memory mapping property to True or Flase
collection.set_properties(
    properties={
        "mmap.enabled": True
    }
)
```

## Drop a Collection

If a collection is no longer needed, you can drop the collection.

<div class="language-python">

To drop a collection, use the [`drop_collection()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/drop_collection.md) method, specifying the collection name.

</div>

<div class="language-java">

To drop a collection, use the [`dropCollection()`](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/dropCollection.md) method, specifying the collection name.

</div>

<div class="language-javascript">

To drop a collection, use the [`dropCollection()`](https://milvus.io/api-reference/node/v2.4.x/Collections/dropCollection.md) method, specifying the collection name.

</div>

<div class="language-shell">

To drop a collection, you can use the [`POST /v2/vectordb/collections/drop`](https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Drop.md) API endpoint.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#shell">cURL</a>
</div>

```python
# 10. Drop the collections
client.drop_collection(
    collection_name="quick_setup"
)

client.drop_collection(
    collection_name="customized_setup_1"
)

client.drop_collection(
    collection_name="customized_setup_2"
)
```

```java
import io.milvus.v2.service.collection.request.DropCollectionReq;

// 10. Drop collections

DropCollectionReq dropQuickSetupParam = DropCollectionReq.builder()
    .collectionName("quick_setup")
    .build();

client.dropCollection(dropQuickSetupParam);

DropCollectionReq dropCustomizedSetupParam = DropCollectionReq.builder()
    .collectionName("customized_setup_1")
    .build();

client.dropCollection(dropCustomizedSetupParam);

dropCustomizedSetupParam = DropCollectionReq.builder()
    .collectionName("customized_setup_2")
    .build();

client.dropCollection(dropCustomizedSetupParam);
```

```javascript
// 10. Drop the collection
res = await client.dropCollection({
    collection_name: "customized_setup_2"
})

console.log(res.error_code)

// Output
// 
// Success
// 

res = await client.dropCollection({
    collection_name: "customized_setup_1"
})

console.log(res.error_code)

// Output
// 
// Success
// 

res = await client.dropCollection({
    collection_name: "quick_setup"
})

console.log(res.error_code)

// Output
// 
// Success
// 
```

```shell
$ curl -X POST "http://${MILVUS_URI}/v2/vectordb/collections/drop" \
-H "Content-Type: application/json" \
-d '{
    "collectionName": "quick_setup"
}'

# {
#     "code": 0,
#     "data": {}
# }


$ curl -X POST "http://${MILVUS_URI}/v2/vectordb/collections/drop" \
-H "Content-Type: application/json" \
-d '{
    "collectionName": "customized_setup_1"
}'


# {
#     "code": 0,
#     "data": {}
# }


$ curl -X POST "http://${MILVUS_URI}/v2/vectordb/collections/drop" \
-H "Content-Type: application/json" \
-d '{
    "collectionName": "customized_setup_2"
}'


# {
#     "code": 0,
#     "data": {}
# }
```

