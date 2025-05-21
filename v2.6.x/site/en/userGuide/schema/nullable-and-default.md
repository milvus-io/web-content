---
id: nullable-and-default.md
title: "Nullable & Default"
summary: "Milvus allows you to set the nullable attribute and default values for scalar fields, except the primary field. For fields marked as nullable=True, you can skip the field when inserting data, or set it directly to a null value, and the system will treat it as null without causing an error. When a field has a default value, the system will automatically apply this value if no data is specified for the field during insertion."
---

# Nullable & Default

Milvus allows you to set the `nullable` attribute and default values for scalar fields, except the primary field. For fields marked as `nullable=True`, you can skip the field when inserting data, or set it directly to a null value, and the system will treat it as null without causing an error. When a field has a default value, the system will automatically apply this value if no data is specified for the field during insertion.

The default value and nullable attributes streamline data migration from other database systems to Milvus by allowing handling of datasets with null values and preserving default value settings. When creating a collection, you can also enable nullable or set default values for fields where values might be uncertain.

## Limits

- Only scalar fields, excluding the primary field, support default values and the nullable attribute.

- JSON and Array fields do not support default values.

- Default values or the nullable attribute can only be configured during collection creation and cannot be modified afterward.

- Scalar fields with the nullable attribute enabled cannot be used as `group_by_field` in Grouping Search. For more information about grouping search, refer to [Grouping Search](grouping-search.md).

- Fields marked as nullable cannot be used as partition keys. For more information about partition keys, refer to [Use Partition Key](use-partition-key.md).

- When creating an index on a scalar field with the nullable attribute enabled, null values will be excluded from the index.

- **JSON and ARRAY fields**: When using `IS NULL` or `IS NOT NULL` operators to filter on JSON or ARRAY fields, these operators work at the column level, which indicates they only evaluate whether the entire JSON object or array is null. For instance, if a key inside a JSON object is null, it will not be recognized by the `IS NULL` filter. For more information, refer to [Basic Operators](basic-operators.md).

## Nullable attribute

The `nullable` attribute allows you to store null values in a collection, providing flexibility when handling unknown data.

### Set the nullable attribute

When creating a collection, use `nullable=True` to define nullable fields (defaults to `False`). The following example creates a collection named `my_collection` and sets the `age` field as nullable:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(uri='http://localhost:19530')

# Define collection schema
schema = client.create_schema(
    auto_id=False,
    enable_dynamic_schema=True,
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=5)
schema.add_field(field_name="age", datatype=DataType.INT64, nullable=True) # Nullable field

# Set index params
index_params = client.prepare_index_params()
index_params.add_index(field_name="vector", index_type="AUTOINDEX", metric_type="L2")

# Create collection
client.create_collection(collection_name="my_collection", schema=schema, index_params=index_params)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

import java.util.*;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .build());
        
CreateCollectionReq.CollectionSchema schema = client.createSchema();
schema.setEnableDynamicField(true);

schema.addField(AddFieldReq.builder()
        .fieldName("id")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("vector")
        .dataType(DataType.FloatVector)
        .dimension(5)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("age")
        .dataType(DataType.Int64)
        .isNullable(true)
        .build());

List<IndexParam> indexes = new ArrayList<>();
Map<String,Object> extraParams = new HashMap<>();

indexes.add(IndexParam.builder()
        .fieldName("vector")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.L2)
        .build());

CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
  address: "http://localhost:19530",
  token: "root:Milvus",
});

await client.createCollection({
  collection_name: "my_collection",
  schema: [
    {
      name: "id",
      is_primary_key: true,
      data_type: DataType.int64,
    },
    { name: "vector", data_type: DataType.Int64, dim: 5 },

    { name: "age", data_type: DataType.FloatVector, nullable: true },
  ],

  index_params: [
    {
      index_name: "vector_inde",
      field_name: "vector",
      metric_type: MetricType.L2,
      index_type: IndexType.AUTOINDEX,
    },
  ],
});

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
    WithName("id").
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(true),
).WithField(entity.NewField().
    WithName("vector").
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(5),
).WithField(entity.NewField().
    WithName("age").
    WithDataType(entity.FieldTypeInt64).
    WithNullable(true),
)

indexOption := milvusclient.NewCreateIndexOption("my_collection", "vector",
    index.NewAutoIndex(index.MetricType(entity.L2)))

err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption("my_collection", schema).
        WithIndexOptions(indexOption))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```bash
export pkField='{
    "fieldName": "id",
    "dataType": "Int64",
    "isPrimary": true
}'

export vectorField='{
    "fieldName": "vector",
    "dataType": "FloatVector",
    "elementTypeParams": {
        "dim": 5
    }
}'

export nullField='{
    "fieldName": "age",
    "dataType": "Int64",
    "nullable": true
}'

export schema="{
    \"autoID\": false,
    \"fields\": [
        $pkField,
        $vectorField,
        $nullField
    ]
}"

export indexParams='[
        {
            "fieldName": "vector",
            "metricType": "L2",
            "indexType": "AUTOINDEX"
        }
    ]'

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

### Insert entities

When you insert data into a nullable field, insert null or directly omit this field:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
data = [
    {"id": 1, "vector": [0.1, 0.2, 0.3, 0.4, 0.5], "age": 30},
    {"id": 2, "vector": [0.2, 0.3, 0.4, 0.5, 0.6], "age": None},
    {"id": 3, "vector": [0.3, 0.4, 0.5, 0.6, 0.7]}
]

client.insert(collection_name="my_collection", data=data)
```

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;

List<JsonObject> rows = new ArrayList<>();
Gson gson = new Gson();
rows.add(gson.fromJson("{\"id\": 1, \"vector\": [0.1, 0.2, 0.3, 0.4, 0.5], \"age\": 30}", JsonObject.class));
rows.add(gson.fromJson("{\"id\": 2, \"vector\": [0.2, 0.3, 0.4, 0.5, 0.6], \"age\": null}", JsonObject.class));
rows.add(gson.fromJson("{\"id\": 3, \"vector\": [0.3, 0.4, 0.5, 0.6, 0.7]}", JsonObject.class));

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(rows)
        .build());
```

```javascript
const data = [
  { id: 1, vector: [0.1, 0.2, 0.3, 0.4, 0.5], age: 30 },
  { id: 2, vector: [0.2, 0.3, 0.4, 0.5, 0.6], age: null },
  { id: 3, vector: [0.3, 0.4, 0.5, 0.6, 0.7] },
];

client.insert({
  collection_name: "my_collection",
  data: data,
});

```

```go
column, _ := column.NewNullableColumnInt64("age",
    []int64{30},
    []bool{true, false, false})

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithInt64Column("id", []int64{1, 2, 3}).
    WithFloatVectorColumn("vector", 5, [][]float32{
        {0.1, 0.2, 0.3, 0.4, 0.5},
        {0.2, 0.3, 0.4, 0.5, 0.6},
        {0.3, 0.4, 0.5, 0.6, 0.7},
    }).
    WithColumns(column),
)
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "data": [
        {"id": 1, "vector": [0.1, 0.2, 0.3, 0.4, 0.5], "age": 30},
        {"id": 2, "vector": [0.2, 0.3, 0.4, 0.5, 0.6], "age": null}, 
        {"id": 3, "vector": [0.3, 0.4, 0.5, 0.6, 0.7]} 
    ],
    "collectionName": "my_collection"
}'
```

### Search and query with null values

When using the `search` method, if a field contains `null` values, the search result will return the field as null:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
res = client.search(
    collection_name="my_collection",
    data=[[0.1, 0.2, 0.4, 0.3, 0.128]],
    limit=2,
    search_params={"params": {"nprobe": 16}},
    output_fields=["id", "age"]
)

print(res)

# Output
# data: ["[{'id': 1, 'distance': 0.15838398039340973, 'entity': {'age': 30, 'id': 1}}, {'id': 2, 'distance': 0.28278401494026184, 'entity': {'age': None, 'id': 2}}]"] 
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;

Map<String,Object> params = new HashMap<>();
params.put("nprobe", 16);
SearchResp resp = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .annsField("vector")
        .data(Collections.singletonList(new FloatVec(new float[]{0.1f, 0.2f, 0.3f, 0.4f, 0.5f})))
        .topK(2)
        .searchParams(params)
        .outputFields(Arrays.asList("id", "age"))
        .build());

System.out.println(resp.getSearchResults());

// Output
//
// [[SearchResp.SearchResult(entity={id=1, age=30}, score=0.0, id=1), SearchResp.SearchResult(entity={id=2, age=null}, score=0.050000004, id=2)]]
```

```javascript
client.search({
    collection_name: 'my_collection',
    data: [0.3, -0.6, 0.1, 0.3, 0.5],
    limit: 2,
    output_fields: ['age', 'id'],
    params: {
        nprobe: 16
    }
});
```

```go
queryVector := []float32{0.1, 0.2, 0.4, 0.3, 0.128}

annParam := index.NewCustomAnnParam()
annParam.WithExtraParam("nprobe", 16)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", // collectionName
    2,                    // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField("vector").
    WithAnnParam(annParam).
    WithOutputFields("id", "age"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
    fmt.Println("age: ", resultSet.GetColumn("age").FieldData().GetScalars())
}
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "data": [
        [0.1, -0.2, 0.3, 0.4, 0.5]
    ],
    "annsField": "vector",
    "limit": 2,
    "outputFields": ["id", "age"]
}'

#{"code":0,"cost":0,"data":[{"age":30,"distance":0.16000001,"id":1},{"age":null,"distance":0.28999996,"id":2}]}
```

When you use the `query` method for scalar filtering, the filtering results for null values are all false, indicating that they will not be selected.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Reviewing previously inserted data:
# {"id": 1, "vector": [0.1, 0.2, ..., 0.128], "age": 30}
# {"id": 2, "vector": [0.2, 0.3, ..., 0.129], "age": None}
# {"id": 3, "vector": [0.3, 0.4, ..., 0.130], "age": None}  # Omitted age  column is treated as None

results = client.query(
    collection_name="my_collection",
    filter="age >= 0",
    output_fields=["id", "age"]
)

# Example output:
# [
#     {"id": 1, "age": 30}
# ]
# Note: Entities with `age` as `null` (id 2 and 3) will not appear in the result.
```

```java
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;

QueryResp resp = client.query(QueryReq.builder()
        .collectionName("my_collection")
        .filter("age >= 0")
        .outputFields(Arrays.asList("id", "age"))
        .build());

System.out.println(resp.getQueryResults());

// Output
//
// [QueryResp.QueryResult(entity={id=1, age=30})]
```

```javascript
const results = await client.query(
    collection_name: "my_collection",
    filter: "age >= 0",
    output_fields: ["id", "age"]
);
```

```go
resultSet, err := client.Query(ctx, milvusclient.NewQueryOption("my_collection").
    WithFilter("age >= 0").
    WithOutputFields("id", "age"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println("id: ", resultSet.GetColumn("id").FieldData().GetScalars())
fmt.Println("age: ", resultSet.GetColumn("age").FieldData().GetScalars())
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "filter": "age >= 0",
    "outputFields": ["id", "age"]
}'

# {"code":0,"cost":0,"data":[{"age":30,"id":1}]}
```

To return entities with `null` values, query without any scalar filtering condition as follows:

<div class="alert note">

The `query` method, when used without any filtering conditions, retrieves all entities in the collection, including those with null values. To restrict the number of returned entities, the `limit` parameter must be specified.

</div>

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
null_results = client.query(
    collection_name="my_collection",
    filter="",     # Query without any filtering condition
    output_fields=["id", "age"],
    limit=10
)

# Example output:
# [{"id": 2, "age": None}, {"id": 3, "age": None}]
```

```java
QueryResp resp = client.query(QueryReq.builder()
        .collectionName("my_collection")
        .filter("")
        .outputFields(Arrays.asList("id", "age"))
        .limit(10)
        .build());

System.out.println(resp.getQueryResults());
```

```javascript
const results = await client.query(
    collection_name: "my_collection",
    filter: "",
    output_fields: ["id", "age"],
    limit: 10
);
```

```go
resultSet, err = client.Query(ctx, milvusclient.NewQueryOption("my_collection").
    WithFilter("").
    WithLimit(10).
    WithOutputFields("id", "age"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println("id: ", resultSet.GetColumn("id"))
fmt.Println("age: ", resultSet.GetColumn("age"))
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "expr": "",
    "outputFields": ["id", "age"],
    "limit": 10
}'

# {"code":0,"cost":0,"data":[{"age":30,"id":1},{"age":null,"id":2},{"age":null,"id":3}]}
```

## Default values

Default values are preset values assigned to scalar fields. If you do not provide a value for a field with a default during insertion, the system automatically uses the default value.

### Set default values

When creating a collection, use the `default_value` parameter to define the default value for a field. The following example shows how to set the default value of `age` to `18` and `status` to `"active"`:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
schema = client.create_schema(
    auto_id=False,
    enable_dynamic_schema=True,
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=5)
schema.add_field(field_name="age", datatype=DataType.INT64, default_value=18)
schema.add_field(field_name="status", datatype=DataType.VARCHAR, default_value="active", max_length=10)

index_params = client.prepare_index_params()
index_params.add_index(field_name="vector", index_type="AUTOINDEX", metric_type="L2")

client.create_collection(collection_name="my_collection", schema=schema, index_params=index_params)
```

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

import java.util.*;

CreateCollectionReq.CollectionSchema schema = client.createSchema();
schema.setEnableDynamicField(true);

schema.addField(AddFieldReq.builder()
        .fieldName("id")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("vector")
        .dataType(DataType.FloatVector)
        .dimension(5)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("age")
        .dataType(DataType.Int64)
        .defaultValue(18L)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("status")
        .dataType(DataType.VarChar)
        .maxLength(10)
        .defaultValue("active")
        .build());

List<IndexParam> indexes = new ArrayList<>();
Map<String,Object> extraParams = new HashMap<>();

indexes.add(IndexParam.builder()
        .fieldName("vector")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.L2)
        .build());

CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
  address: "http://localhost:19530",
  token: "root:Milvus",
});

await client.createCollection({
  collection_name: "my_collection",
  schema: [
    {
      name: "id",
      is_primary_key: true,
      data_type: DataType.int64,
    },
    { name: "vector", data_type: DataType.FloatVector, dim: 5 },
    { name: "age", data_type: DataType.Int64, default_value: 18 },
    { name: 'status', data_type: DataType.VarChar, max_length: 30, default_value: 'active'},
  ],

  index_params: [
    {
      index_name: "vector_inde",
      field_name: "vector",
      metric_type: MetricType.L2,
      index_type: IndexType.AUTOINDEX,
    },
  ],
});

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

schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName("id").
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(true),
).WithField(entity.NewField().
    WithName("vector").
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(5),
).WithField(entity.NewField().
    WithName("age").
    WithDataType(entity.FieldTypeInt64).
    WithDefaultValueLong(18),
).WithField(entity.NewField().
    WithName("status").
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(10).
    WithDefaultValueString("active"),
)

indexOption := milvusclient.NewCreateIndexOption("my_collection", "vector",
    index.NewAutoIndex(index.MetricType(entity.L2)))

err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption("my_collection", schema).
        WithIndexOptions(indexOption))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```bash
export pkField='{
    "fieldName": "id",
    "dataType": "Int64",
    "isPrimary": true
}'

export vectorField='{
    "fieldName": "vector",
    "dataType": "FloatVector",
    "elementTypeParams": {
        "dim": 5
    }
}'

export defaultValueField1='{
    "fieldName": "age",
    "dataType": "Int64",
    "defaultValue": 18
}'

export defaultValueField2='{
    "fieldName": "status",
    "dataType": "VarChar",
    "defaultValue": "active",
    "elementTypeParams": {
        "max_length": 10
    }
}'

export schema="{
    \"autoID\": false,
    \"fields\": [
        $pkField,
        $vectorField,
        $defaultValueField1,
        $defaultValueField2
    ]
}"

export indexParams='[
        {
            "fieldName": "vector",
            "metricType": "L2",
            "indexType": "AUTOINDEX"
        }
    ]'

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

### Insert entities

When inserting data, if you omit fields with a default value or set their value to null, the system uses the default value:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
data = [
    {"id": 1, "vector": [0.1, 0.2, ..., 0.128], "age": 30, "status": "premium"},
    {"id": 2, "vector": [0.2, 0.3, ..., 0.129]},  # `age` and `status` use default values
    {"id": 3, "vector": [0.3, 0.4, ..., 0.130], "age": 25, "status": None},  # `status` uses default value
    {"id": 4, "vector": [0.4, 0.5, ..., 0.131], "age": None, "status": "inactive"}  # `age` uses default value
]

client.insert(collection_name="my_collection", data=data)
```

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;

List<JsonObject> rows = new ArrayList<>();
Gson gson = new Gson();
rows.add(gson.fromJson("{\"id\": 1, \"vector\": [0.1, 0.2, 0.3, 0.4, 0.5], \"age\": 30, \"status\": \"premium\"}", JsonObject.class));
rows.add(gson.fromJson("{\"id\": 2, \"vector\": [0.2, 0.3, 0.4, 0.5, 0.6]}", JsonObject.class));
rows.add(gson.fromJson("{\"id\": 3, \"vector\": [0.3, 0.4, 0.5, 0.6, 0.7], \"age\": 25, \"status\": null}", JsonObject.class));
rows.add(gson.fromJson("{\"id\": 4, \"vector\": [0.4, 0.5, 0.6, 0.7, 0.8], \"age\": null, \"status\": \"inactive\"}", JsonObject.class));

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(rows)
        .build());
```

```javascript
const data = [
    {"id": 1, "vector": [0.1, 0.2, 0.3, 0.4, 0.5], "age": 30, "status": "premium"},
    {"id": 2, "vector": [0.2, 0.3, 0.4, 0.5, 0.6]}, 
    {"id": 3, "vector": [0.3, 0.4, 0.5, 0.6, 0.7], "age": 25, "status": null}, 
    {"id": 4, "vector": [0.4, 0.5, 0.6, 0.7, 0.8], "age": null, "status": "inactive"}  
];

client.insert({
  collection_name: "my_collection",
  data: data,
});
```

```go
column1, _ := column.NewNullableColumnInt64("age",
    []int64{30, 25},
    []bool{true, false, true, false})
column2, _ := column.NewNullableColumnVarChar("status",
    []string{"premium", "inactive"},
    []bool{true, false, false, true})

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithInt64Column("id", []int64{1, 2, 3, 4}).
    WithFloatVectorColumn("vector", 5, [][]float32{
        {0.1, 0.2, 0.3, 0.4, 0.5},
        {0.2, 0.3, 0.4, 0.5, 0.6},
        {0.3, 0.4, 0.5, 0.6, 0.7},
        {0.4, 0.5, 0.6, 0.7, 0.8},
    }).
    WithColumns(column1, column2),
)
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "data": [
        {"id": 1, "vector": [0.1, 0.2, 0.3, 0.4, 0.5], "age": 30, "status": "premium"},
        {"id": 2, "vector": [0.2, 0.3, 0.4, 0.5, 0.6]},
        {"id": 3, "vector": [0.3, 0.4, 0.5, 0.6, 0.7], "age": 25, "status": null}, 
        {"id": 4, "vector": [0.4, 0.5, 0.6, 0.7, 0.8], "age": null, "status": "inactive"}      
    ],
    "collectionName": "my_collection"
}'
```

<div class="alert note">

For more information on how nullable and default value settings take effect, refer to [Applicable rules](nullable-and-default.md#Applicable-rules). 

</div>

### Search and query with default values

Entities that contain default values are treated the same as any other entities during vector searches and scalar filtering. You can include default values as part of your `search` and `query` operations.

For example, in a `search` operation, entities with `age` set to the default value of `18` will be included in the results:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
res = client.search(
    collection_name="my_collection",
    data=[[0.1, 0.2, 0.4, 0.3, 0.5]],
    search_params={"params": {"nprobe": 16}},
    filter="age == 18",  # 18 is the default value of the `age` field
    limit=10,
    output_fields=["id", "age", "status"]
)

print(res)

# Output
# data: ["[{'id': 2, 'distance': 0.050000004, 'entity': {'id': 2, 'age': 18, 'status': 'active'}}, {'id': 4, 'distance': 0.45000002, 'entity': {'id': 4, 'age': 18, 'status': 'inactive'}}]"] 

```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;

Map<String,Object> params = new HashMap<>();
params.put("nprobe", 16);
SearchResp resp = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .annsField("vector")
        .data(Collections.singletonList(new FloatVec(new float[]{0.1f, 0.2f, 0.3f, 0.4f, 0.5f})))
        .searchParams(params)
        .filter("age == 18")
        .topK(10)
        .outputFields(Arrays.asList("id", "age", "status"))
        .build());

System.out.println(resp.getSearchResults());

// Output
//
// [[SearchResp.SearchResult(entity={id=2, age=18, status=active}, score=0.050000004, id=2), SearchResp.SearchResult(entity={id=4, age=18, status=inactive}, score=0.45000002, id=4)]]
```

```javascript
client.search({
    collection_name: 'my_collection',
    data: [0.3, -0.6, 0.1, 0.3, 0.5],
    limit: 2,
    output_fields: ['age', 'id', 'status'],
    filter: 'age == 18',
    params: {
        nprobe: 16
    }
});
```

```go
queryVector := []float32{0.1, 0.2, 0.4, 0.3, 0.5}

annParam := index.NewCustomAnnParam()
annParam.WithExtraParam("nprobe", 16)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", // collectionName
    10,              // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField("vector").
    WithFilter("age == 18").
    WithAnnParam(annParam).
    WithOutputFields("id", "age", "status"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
    fmt.Println("age: ", resultSet.GetColumn("age").FieldData().GetScalars())
    fmt.Println("status: ", resultSet.GetColumn("status").FieldData().GetScalars())
}
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "data": [
        [0.1, 0.2, 0.3, 0.4, 0.5]
    ],
    "annsField": "vector",
    "limit": 10,
    "filter": "age == 18",
    "outputFields": ["id", "age", "status"]
}'

# {"code":0,"cost":0,"data":[{"age":18,"distance":0.050000004,"id":2,"status":"active"},{"age":18,"distance":0.45000002,"id":4,"status":"inactive"}]}
```

In a `query` operation, you can match or filter by default values directly:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Query all entities where `age` equals the default value (18)
default_age_results = client.query(
    collection_name="my_collection",
    filter="age == 18",
    output_fields=["id", "age", "status"]
)

# Query all entities where `status` equals the default value ("active")
default_status_results = client.query(
    collection_name="my_collection",
    filter='status == "active"',
    output_fields=["id", "age", "status"]
)
```

```java
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;

QueryResp ageResp = client.query(QueryReq.builder()
        .collectionName("my_collection")
        .filter("age == 18")
        .outputFields(Arrays.asList("id", "age", "status"))
        .build());

System.out.println(ageResp.getQueryResults());

// Output
//
// [QueryResp.QueryResult(entity={id=2, age=18, status=active}), QueryResp.QueryResult(entity={id=4, age=18, status=inactive})]

QueryResp statusResp = client.query(QueryReq.builder()
        .collectionName("my_collection")
        .filter("status == \"active\"")
        .outputFields(Arrays.asList("id", "age", "status"))
        .build());

System.out.println(statusResp.getQueryResults());

// Output
//
// [QueryResp.QueryResult(entity={id=2, age=18, status=active}), QueryResp.QueryResult(entity={id=3, age=25, status=active})]
```

```javascript
// Query all entities where `age` equals the default value (18)
const default_age_results = await client.query(
    collection_name: "my_collection",
    filter: "age == 18",
    output_fields: ["id", "age", "status"]
);
// Query all entities where `status` equals the default value ("active")
const default_status_results = await client.query(
    collection_name: "my_collection",
    filter: 'status == "active"',
    output_fields: ["id", "age", "status"]
)
```

```go
resultSet, err := client.Query(ctx, milvusclient.NewQueryOption("my_collection").
    WithFilter("age == 18").
    WithOutputFields("id", "age", "status"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println("id: ", resultSet.GetColumn("id").FieldData().GetScalars())
fmt.Println("age: ", resultSet.GetColumn("age").FieldData().GetScalars())
fmt.Println("status: ", resultSet.GetColumn("status").FieldData().GetScalars())

resultSet, err = client.Query(ctx, milvusclient.NewQueryOption("my_collection").
    WithFilter("status == \"active\"").
    WithOutputFields("id", "age", "status"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println("id: ", resultSet.GetColumn("id").FieldData().GetScalars())
fmt.Println("age: ", resultSet.GetColumn("age").FieldData().GetScalars())
fmt.Println("status: ", resultSet.GetColumn("status").FieldData().GetScalars())
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "filter": "age == 18",
    "outputFields": ["id", "age", "status"]
}'

# {"code":0,"cost":0,"data":[{"age":18,"id":2,"status":"active"},{"age":18,"id":4,"status":"inactive"}]}

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "filter": "status == \"active\"",
    "outputFields": ["id", "age", "status"]
}'

# {"code":0,"cost":0,"data":[{"age":18,"id":2,"status":"active"},{"age":25,"id":3,"status":"active"}]}
```

## Applicable rules

The following table summarizes the behavior of nullable columns and default values under different configuration combinations. These rules determine how Milvus handles data when attempting to insert null values or if field values are not provided.

<table>
   <tr>
     <th><p>Nullable</p></th>
     <th><p>Default Value</p></th>
     <th><p>Default Value Type</p></th>
     <th><p>User Input</p></th>
     <th><p>Result</p></th>
     <th><p>Example</p></th>
   </tr>
   <tr>
     <td><p>✅</p></td>
     <td><p>✅</p></td>
     <td><p>Non-null</p></td>
     <td><p>None/null</p></td>
     <td><p>Uses the default value</p></td>
     <td><p>Field: <code>age</code> Default value: <code>18</code></p><p>User input: null</p><p>Result: stored as <code>18</code></p></td>
   </tr>
   <tr>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>-</p></td>
     <td><p>None/null</p></td>
     <td><p>Stored as null</p></td>
     <td><p>Field: <code>middle_name</code> Default value: -</p><p>User input: null</p><p>Result: stored as null</p></td>
   </tr>
   <tr>
     <td><p>❌</p></td>
     <td><p>✅</p></td>
     <td><p>Non-null</p></td>
     <td><p>None/null</p></td>
     <td><p>Uses the default value</p></td>
     <td><p>Field: <code>status</code> Default value: <code>"active"</code></p><p>User input: null</p><p>Result: stored as <code>"active"</code></p></td>
   </tr>
   <tr>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>-</p></td>
     <td><p>None/null</p></td>
     <td><p>Throws an error</p></td>
     <td><p>Field: <code>email</code> Default value: -</p><p>User input: null</p><p>Result: Operation rejected, system throws an error</p></td>
   </tr>
   <tr>
     <td><p>❌</p></td>
     <td><p>✅</p></td>
     <td><p>Null</p></td>
     <td><p>None/null</p></td>
     <td><p>Throws an error</p></td>
     <td><p>Field: <code>username</code> Default value: null</p><p>User input: null</p><p>Result: Operation rejected, system throws an error</p></td>
   </tr>
</table>

