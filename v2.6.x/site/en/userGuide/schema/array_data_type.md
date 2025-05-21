---
id: array_data_type.md
title: "Array Field"
summary: "An ARRAY field stores an ordered set of elements of the same data type. Here's an example of how ARRAY fields store data:"
---

# Array Field

An ARRAY field stores an ordered set of elements of the same data type. Here's an example of how ARRAY fields store data:

```json
{
  "tags": ["pop", "rock", "classic"],
  "ratings": [5, 4, 3]
}
```

## Limits

- **Default Values**: ARRAY fields do not support default values. However, you can set the `nullable` attribute to `True` to allow null values. For details, refer to [Nullable & Default](nullable-and-default.md).

- **Data Type**: All elements in an Array field must have the same data type, as specified by the `element_type`. If you set `element_type` to `VARCHAR`, you should also set `max_length` for the array elements.

- **Array Capacity**: The number of elements in an Array field must be less than or equal to the maximum capacity defined when the Array was created, as specified by `max_capacity`. The value should be an integer within the range from **1** to **4096**.

- **String Handling**: String values in Array fields are stored as-is, without semantic escaping or conversion. For example, `'a"b'`, `"a'b"`, `'a\'b'`, and `"a\"b"` are stored as entered, while `'a'b'` and `"a"b"` are considered invalid values.

## Add ARRAY field

To use ARRAY fields Milvus, define the relevant field type when creating the collection schema. This process includes:

1. Setting `datatype` to the supported Array data type, `ARRAY`.

1. Using the `element_type` parameter to specify the data type of elements in the array. This can be any scalar data type supported by Milvus, such as `VARCHAR` or `INT64`. All elements in the same Array must be of the same data type.

1. Using the `max_capacity` parameter to define the maximum capacity of the array, i.e., the maximum number of elements it can contain.

Here’s how to define a collection schema that includes ARRAY fields:

<div class="alert note">

If you set `enable_dynamic_fields=True` when defining the schema, Milvus allows you to insert scalar fields that were not defined in advance. However, this may increase the complexity of queries and management, potentially impacting performance. For more information, refer to [Dynamic Field](enable-dynamic-field.md).

</div>

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#http">HTTP</a>
</div>

```python
# Import necessary libraries
from pymilvus import MilvusClient, DataType

# Define server address
SERVER_ADDR = "http://localhost:19530"

# Create a MilvusClient instance
client = MilvusClient(uri=SERVER_ADDR)

# Define the collection schema
schema = client.create_schema(
    auto_id=False,
    enable_dynamic_fields=True,
)

#  Add `tags` and `ratings` ARRAY fields with nullable=True
schema.add_field(field_name="tags", datatype=DataType.ARRAY, element_type=DataType.VARCHAR, max_capacity=10, max_length=65535, nullable=True)
schema.add_field(field_name="ratings", datatype=DataType.ARRAY, element_type=DataType.INT64, max_capacity=5, nullable=True)
schema.add_field(field_name="pk", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="embedding", datatype=DataType.FLOAT_VECTOR, dim=3)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .build());
        
CreateCollectionReq.CollectionSchema schema = client.createSchema();
schema.setEnableDynamicField(true);

schema.addField(AddFieldReq.builder()
        .fieldName("tags")
        .dataType(DataType.Array)
        .elementType(DataType.VarChar)
        .maxCapacity(10)
        .maxLength(65535)
        .isNullable(true)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("ratings")
        .dataType(DataType.Array)
        .elementType(DataType.Int64)
        .maxCapacity(5)
        .isNullable(true)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("pk")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("embedding")
        .dataType(DataType.FloatVector)
        .dimension(3)
        .build());
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/column"
    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/index"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "localhost:19530"

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName("pk").
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(true),
).WithField(entity.NewField().
    WithName("embedding").
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(3),
).WithField(entity.NewField().
    WithName("tags").
    WithDataType(entity.FieldTypeArray).
    WithElementType(entity.FieldTypeVarChar).
    WithMaxCapacity(10).
    WithMaxLength(65535).
    WithNullable(true),
).WithField(entity.NewField().
    WithName("ratings").
    WithDataType(entity.FieldTypeArray).
    WithElementType(entity.FieldTypeInt64).
    WithMaxCapacity(5).
    WithNullable(true),
)
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";
const schema = [
  {
    name: "tags",
    data_type: DataType.Array,
    element_type: DataType.VarChar,
    max_capacity: 10,
    max_length: 65535
  },
  {
    name: "rating",
    data_type: DataType.Array,
    element_type: DataType.Int64,
    max_capacity: 5,
  },
  {
    name: "pk",
    data_type: DataType.Int64,
    is_primary_key: true,
  },
  {
    name: "embedding",
    data_type: DataType.FloatVector,
    dim: 3,
  },
];
```

```http
export arrayField1='{
    "fieldName": "tags",
    "dataType": "Array",
    "elementDataType": "VarChar",
    "elementTypeParams": {
        "max_capacity": 10,
        "max_length": 65535
    }
}'

export arrayField2='{
    "fieldName": "ratings",
    "dataType": "Array",
    "elementDataType": "Int64",
    "elementTypeParams": {
        "max_capacity": 5
    }
}'

export pkField='{
    "fieldName": "pk",
    "dataType": "Int64",
    "isPrimary": true
}'

export vectorField='{
    "fieldName": "embedding",
    "dataType": "FloatVector",
    "elementTypeParams": {
        "dim": 3
    }
}'

export schema="{
    \"autoID\": false,
    \"fields\": [
        $arrayField1,
        $arrayField2,
        $pkField,
        $vectorField
    ]
}"
```

## Set index params

Indexing helps improve search and query performance. In Milvus, indexing is mandatory for vector fields but optional for scalar fields.

The following example creates indexes on the vector field `embedding` and the ARRAY field `tags`, both using the `AUTOINDEX` index type. With this type, Milvus automatically selects the most suitable index based on the data type. You can also customize the index type and params for each field. For details, refer to [Index Explained](index-explained.md).

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
# Set index params

index_params = client.prepare_index_params()

# Index `age` with AUTOINDEX
index_params.add_index(
    field_name="tags",
    index_type="AUTOINDEX",
    index_name="tags_index"
)

# Index `embedding` with AUTOINDEX and specify similarity metric type
index_params.add_index(
    field_name="embedding",
    index_type="AUTOINDEX",  # Use automatic indexing to simplify complex index settings
    metric_type="COSINE"  # Specify similarity metric type, options include L2, COSINE, or IP
)
```

```java
import io.milvus.v2.common.IndexParam;
import java.util.*;

List<IndexParam> indexes = new ArrayList<>();
indexes.add(IndexParam.builder()
        .fieldName("tags")
        .indexName("tags_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .build());
        
indexes.add(IndexParam.builder()
        .fieldName("embedding")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());
```

```go
indexOpt1 := milvusclient.NewCreateIndexOption("my_collection", "tags", index.NewInvertedIndex())
indexOpt2 := milvusclient.NewCreateIndexOption("my_collection", "embedding", index.NewAutoIndex(entity.COSINE))
```

```javascript
const indexParams = [{
    index_name: 'inverted_index',
    field_name: 'tags',
    index_type: IndexType.AUTOINDEX,
)];

indexParams.push({
    index_name: 'embedding_index',
    field_name: 'embedding',
    index_type: IndexType.AUTOINDEX,
});
```

```bash
export indexParams='[
        {
            "fieldName": "tags",
            "indexName": "inverted_index",
            "indexType": "AUTOINDEX"
        },
        {
            "fieldName": "embedding",
            "metricType": "COSINE",
            "indexType": "AUTOINDEX"
        }
    ]'
```

## Create collection

Once the schema and index are defined, create a collection that includes ARRAY fields.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
client.create_collection(
    collection_name="my_collection",
    schema=schema,
    index_params=index_params
)
```

```java
CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
```

```go
err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("my_collection", schema).
    WithIndexOptions(indexOpt1, indexOpt2))
if err != nil {
    fmt.Println(err.Error())
    // handler err
}
```

```javascript
client.create_collection({
    collection_name: "my_collection",
    schema: schema,
    index_params: indexParams
})
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d "{
    \"collectionName\": \"my_collection\",
    \"schema\": $schema,
    \"indexParams\": $indexParams
}"
```

## Insert data

After creating the collection, you can insert data that includes ARRAY fields.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
# Sample data
data = [
  {
      "tags": ["pop", "rock", "classic"],
      "ratings": [5, 4, 3],
      "pk": 1,
      "embedding": [0.12, 0.34, 0.56]
  },
  {
      "tags": None,  # Entire ARRAY is null
      "ratings": [4, 5],
      "pk": 2,
      "embedding": [0.78, 0.91, 0.23]
  },
  {  # The tags field is completely missing
      "ratings": [9, 5],
      "pk": 3,
      "embedding": [0.18, 0.11, 0.23]
  }
]

client.insert(
    collection_name="my_collection",
    data=data
)
```

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;

List<JsonObject> rows = new ArrayList<>();
Gson gson = new Gson();
rows.add(gson.fromJson("{\"tags\": [\"pop\", \"rock\", \"classic\"], \"ratings\": [5, 4, 3], \"pk\": 1, \"embedding\": [0.12, 0.34, 0.56]}", JsonObject.class));
rows.add(gson.fromJson("{\"tags\": null, \"ratings\": [4, 5], \"pk\": 2, \"embedding\": [0.78, 0.91, 0.23]}", JsonObject.class));
rows.add(gson.fromJson("{\"ratings\": [9, 5], \"pk\": 3, \"embedding\": [0.18, 0.11, 0.23]}", JsonObject.class));

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(rows)
        .build());
```

```go
column1, _ := column.NewNullableColumnVarCharArray("tags",
    [][]string{{"pop", "rock", "classic"}},
    []bool{true, false, false})
column2, _ := column.NewNullableColumnInt64Array("ratings",
    [][]int64{{5, 4, 3}, {4, 5}, {9, 5}},
    []bool{true, true, true})

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithInt64Column("pk", []int64{1, 2, 3}).
    WithFloatVectorColumn("embedding", 3, [][]float32{
        {0.12, 0.34, 0.56},
        {0.78, 0.91, 0.23},
        {0.18, 0.11, 0.23},
    }).WithColumns(column1, column2))
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

```javascript
const data = [
    {
        "tags": ["pop", "rock", "classic"],
        "ratings": [5, 4, 3],
        "pk": 1,
        "embedding": [0.12, 0.34, 0.56]
    },
    {
        "tags": ["jazz", "blues"],
        "ratings": [4, 5],
        "pk": 2,
        "embedding": [0.78, 0.91, 0.23]
    },
    {
        "tags": ["electronic", "dance"],
        "ratings": [3, 3, 4],
        "pk": 3,
        "embedding": [0.67, 0.45, 0.89]
    }
];

client.insert({
  collection_name: "my_collection",
  data: data,
});
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "data": [
        {
        "tags": ["pop", "rock", "classic"],
        "ratings": [5, 4, 3],
        "pk": 1,
        "embedding": [0.12, 0.34, 0.56]
    },
    {
        "tags": ["jazz", "blues"],
        "ratings": [4, 5],
        "pk": 2,
        "embedding": [0.78, 0.91, 0.23]
    },
    {
        "tags": ["electronic", "dance"],
        "ratings": [3, 3, 4],
        "pk": 3,
        "embedding": [0.67, 0.45, 0.89]
    }       
    ],
    "collectionName": "my_collection"
}'
```

## Query with filter expressions

After inserting entities, use the `query` method to retrieve entities that match the specified filter expressions.

To retrieve entities where the `tags` is not null:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
# Query to exclude entities where `tags` is not null

filter = 'tags IS NOT NULL'

res = client.query(
    collection_name="my_collection",
    filter=filter,
    output_fields=["tags", "ratings", "pk"]
)

print(res)

# Example output:
# data: [
#     "{'tags': ['pop', 'rock', 'classic'], 'ratings': [5, 4, 3], 'pk': 1}"
# ]
```

```java
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;

String filter = "tags IS NOT NULL";
QueryResp resp = client.query(QueryReq.builder()
        .collectionName("my_collection")
        .filter(filter)
        .outputFields(Arrays.asList("tags", "ratings", "pk"))
        .build());

System.out.println(resp.getQueryResults());

// Output
//
// [QueryResp.QueryResult(entity={ratings=[5, 4, 3], pk=1, tags=[pop, rock, classic]})]
```

```go
filter := "tags IS NOT NULL"
rs, err := client.Query(ctx, milvusclient.NewQueryOption("my_collection").
    WithFilter(filter).
    WithOutputFields("tags", "ratings", "pk"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

fmt.Println("pk", rs.GetColumn("pk").FieldData().GetScalars())
fmt.Println("tags", rs.GetColumn("tags").FieldData().GetScalars())
fmt.Println("ratings", rs.GetColumn("ratings").FieldData().GetScalars())
```

```javascript
client.query({
    collection_name: 'my_collection',
    filter: 'tags IS NOT NULL',
    output_fields: ['tags', 'ratings', 'embedding']
});
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "filter": "tags IS NOT NULL",
    "outputFields": ["tags", "ratings", "embedding"]
}'

```

To retrieve entities where the value of the first element of `ratings` is greater than 4:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'ratings[0] > 4'

res = client.query(
    collection_name="my_collection",
    filter=filter,
    output_fields=["tags", "ratings", "embedding"]
)

print(res)

# Example output:
# data: [
#     "{'tags': ['pop', 'rock', 'classic'], 'ratings': [5, 4, 3], 'embedding': [0.12, 0.34, 0.56], 'pk': 1}",
#     "{'tags': None, 'ratings': [9, 5], 'embedding': [0.18, 0.11, 0.23], 'pk': 3}"
# ]
```

```java
String filter = "ratings[0] > 4"

QueryResp resp = client.query(QueryReq.builder()
        .collectionName("my_collection")
        .filter(filter)
        .outputFields(Arrays.asList("tags", "ratings", "pk"))
        .build());

System.out.println(resp.getQueryResults());

// Output
// [
//    QueryResp.QueryResult(entity={ratings=[5, 4, 3], pk=1, tags=[pop, rock, classic]}), 
//    QueryResp.QueryResult(entity={ratings=[9, 5], pk=3, tags=[]})
// ]
```

```go
filter = "ratings[0] > 4"
rs, err = client.Query(ctx, milvusclient.NewQueryOption("my_collection").
    WithFilter(filter).
    WithOutputFields("tags", "ratings", "pk"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

fmt.Println("pk", rs.GetColumn("pk"))
fmt.Println("tags", rs.GetColumn("tags"))
fmt.Println("ratings", rs.GetColumn("ratings"))
```

```javascript
// node
const filter = 'ratings[0] > 4';

const res = await client.query({
    collection_name:"my_collection",
    filter:filter,
    output_fields: ["tags", "ratings", "embedding"]
});

console.log(res)

// Example output:
// data: [
//     "{'tags': ['pop', 'rock', 'classic'], 'ratings': [5, 4, 3], 'embedding': [0.12, 0.34, 0.56], 'pk': 1}",
//     "{'tags': None, 'ratings': [9, 5], 'embedding': [0.18, 0.11, 0.23], 'pk': 3}"
// ]
```

```bash
# restful
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
  "collectionName": "my_collection",
  "filter": "ratings[0] > 4",
  "outputFields": ["tags", "ratings", "embedding"]
}'
```

## Vector search with filter expressions

In addition to basic scalar field filtering, you can combine vector similarity searches with scalar field filters. For example, the following code shows how to add a scalar field filter to a vector search:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'tags[0] == "pop"'

res = client.search(
    collection_name="my_collection",
    data=[[0.3, -0.6, 0.1]],
    limit=5,
    search_params={"params": {"nprobe": 10}},
    output_fields=["tags", "ratings", "embedding"],
    filter=filter
)

print(res)

# Example output:
# data: [
#     "[{'id': 1, 'distance': -0.2479381263256073, 'entity': {'tags': ['pop', 'rock', 'classic'], 'ratings': [5, 4, 3], 'embedding': [0.11999999731779099, 0.3400000035762787, 0.5600000023841858]}}]"
# ]
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;

String filter = "tags[0] == \"pop\"";
SearchResp resp = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .annsField("embedding")
        .data(Collections.singletonList(new FloatVec(new float[]{0.3f, -0.6f, 0.1f})))
        .topK(5)
        .outputFields(Arrays.asList("tags", "ratings", "embedding"))
        .filter(filter)
        .build());

System.out.println(resp.getSearchResults());

// Output
//
// [[SearchResp.SearchResult(entity={ratings=[5, 4, 3], embedding=[0.12, 0.34, 0.56], tags=[pop, rock, classic]}, score=-0.24793813, id=1)]]
```

```go
queryVector := []float32{0.3, -0.6, 0.1}
filter = "tags[0] == \"pop\""

annParam := index.NewCustomAnnParam()
annParam.WithExtraParam("nprobe", 10)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", // collectionName
    5,               // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField("embedding").
    WithFilter(filter).
    WithOutputFields("tags", "ratings", "embedding").
    WithAnnParam(annParam))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
    fmt.Println("tags", resultSet.GetColumn("tags").FieldData().GetScalars())
    fmt.Println("ratings", resultSet.GetColumn("ratings").FieldData().GetScalars())
    fmt.Println("embedding", resultSet.GetColumn("embedding").FieldData().GetVectors())
}
```

```javascript
client.search({
    collection_name: 'my_collection',
    data: [0.3, -0.6, 0.1],
    limit: 5,
    output_fields: ['tags', 'ratings', 'embdding'],
    filter: 'tags[0] == "pop"'
});
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "data": [
        [0.3, -0.6, 0.1]
    ],
    "annsField": "embedding",
    "limit": 5,
    "filter": "tags[0] == \"pop\"",
    "outputFields": ["tags", "ratings", "embedding"]
}'

# {"code":0,"cost":0,"data":[{"distance":-0.24793813,"embedding":[0.12,0.34,0.56],"id":1,"ratings":{"Data":{"LongData":{"data":[5,4,3]}}},"tags":{"Data":{"StringData":{"data":["pop","rock","classic"]}}}}]}
```

Additionally, Milvus supports advanced Array filtering operators like `ARRAY_CONTAINS`, `ARRAY_CONTAINS_ALL`, `ARRAY_CONTAINS_ANY`, and `ARRAY_LENGTH` to further enhance query capabilities. For more details, refer to [ARRAY Operators](array-operators.md).