---
id: nullable-and-default.md
title: "Nullable Fields"
summary: "Configure nullable fields and default values, including schema, insert, index, search, and filter behavior."
---

# Nullable Fields

Milvus supports nullable fields, which allow a field value to be missing or explicitly set to NULL. Nullability is defined at the schema level and applies consistently across data ingestion, indexing, search, and query operations.

Use nullable fields when:

- Data is ingested from external systems that allow missing values.
- Some metadata is optional or only available for part of the dataset.
- Vector embeddings are generated asynchronously and inserted later.

## Limits

- Vector fields that allow NULL values do not support `IS NULL` or `IS NOT NULL` filter expressions. You cannot explicitly filter entities based on whether a vector field value is NULL.

- [Array of Structs](array-of-structs.md) fields do not support NULL values. You cannot mark an Array of Structs field or any field nested inside it as nullable.

- The nullable attribute is defined when a field is created and cannot be modified afterward. You cannot enable or disable nullability for an existing field.

- Fields marked as nullable cannot be used as partition keys. Partition key fields must always contain valid, non-null values. For more information, refer to [Use Partition Key](use-partition-key.md).

## What is a nullable field?

In Milvus, whether a field is allowed to store a NULL value is controlled by a schema-level field attribute named `nullable`.

When a field is defined with `nullable=True`, Milvus allows the field value to be missing during data ingestion. In practice, Milvus treats the following two inputs as equivalent and stores the field value as NULL:

- The field is omitted from the input entity.
- The field is explicitly set to NULL (for example, `None` in Python).

If a field is not defined as nullable (the default behavior), every entity must provide a valid value for that field. Omitting the field or explicitly assigning a NULL value will cause the insert or import operation to fail.

The nullable attribute is supported for both **scalar and vector fields** in a collection schema. However, Array of Structs fields do not support the nullable attribute.

<div class="alert note">

Nullability determines whether a field value may be missing; it does not define what value is used when a field is missing.

- If a nullable field is configured without a default value, omitting the field results in a stored NULL value.
- If a default value is configured, Milvus may store the default value instead. For details, see [Default Values](default-values.md).

</div>

## Define a nullable field in the collection schema

To use nullable fields, you must enable the nullable attribute when defining the collection schema.

In this example, the collection schema defines a vector field named `embedding` with `nullable=True`. This allows entities in the collection to omit the vector value or explicitly set it to NULL during data ingestion.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# Define schema fields
schema = client.create_schema()
schema.add_field("id", DataType.INT64, is_primary=True)  # Primary field
schema.add_field(
    field_name="embedding",
    datatype=DataType.FLOAT_VECTOR,
    dim=4,
    # highlight-next-line
    nullable=True,  # Enable the nullable attribute; defaults to False
)

client.create_collection(
    collection_name="my_collection",
    schema=schema,
)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

import java.util.Collections;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build());

CreateCollectionReq.CollectionSchema schema = client.createSchema();
schema.addField(AddFieldReq.builder()
        .fieldName("id")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("embedding")
        .dataType(DataType.FloatVector)
        .dimension(4)
        .isNullable(true)
        .build());

CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        .indexParams(Collections.emptyList())
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
  fields: [
    {
      name: "id",
      data_type: DataType.Int64,
      is_primary_key: true,
      autoID: false,
    },
    {
      name: "embedding",
      data_type: DataType.FloatVector,
      dim: 4,
      nullable: true,
    },
  ],
});
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "localhost:19530",
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
    WithName("embedding").
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(4).
    WithNullable(true),
)

err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption("my_collection", schema))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```bash
export TOKEN="root:Milvus"
export CLUSTER_ENDPOINT="http://localhost:19530"

export pkField='{
  "fieldName": "id",
  "dataType": "Int64",
  "isPrimary": true
}'

export embeddingField='{
  "fieldName": "embedding",
  "dataType": "FloatVector",
  "typeParams": {"dim": "4"},
  "nullable": true
}'

curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d "{
    \"collectionName\": \"my_collection\",
    \"schema\": {
      \"fields\": [
        $pkField,
        $embeddingField
      ]
    }
  }"
```

In this schema:

- The `embedding` field is explicitly marked as nullable.
- Entities may omit the `embedding` field or assign it a NULL value during insertion.
- The decision to allow NULL values is fixed at collection creation time.

For clarity, the following examples focus on a nullable vector field (`embedding`). Defining nullable scalar fields is optional and not required to follow the rest of this guide.

<details>
<summary>Optional: Define a nullable scalar field</summary>

Scalar fields can also be defined as nullable using the same `nullable` attribute and follow the same rules during ingestion. For example:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
schema.add_field(
    field_name="age",
    datatype=DataType.INT64,
    # highlight-next-line
    nullable=True,
)
```

```java
schema.addField(AddFieldReq.builder()
        .fieldName("age")
        .dataType(DataType.Int64)
        .isNullable(true)
        .build());
```

```javascript
// Add to the fields array when calling createCollection:
// { name: "age", data_type: DataType.Int64, nullable: true },
```

```go
schema.WithField(entity.NewField().
    WithName("age").
    WithDataType(entity.FieldTypeInt64).
    WithNullable(true),
)
```

```bash
# Add another field object to the schema "fields" array, for example:
# { "fieldName": "age", "dataType": "Int64", "nullable": true }
```

</details>

## Insert behavior with missing or NULL values

Once a field is defined as nullable in the collection schema, Milvus allows the field value to be missing or explicitly set to NULL during data ingestion.

The example below inserts three entities into the collection created in [Define a nullable field in the collection schema](#define-a-nullable-field-in-the-collection-schema), demonstrating these different cases.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
data = [
    {
        "id": 1,
        "embedding": [0.1, 0.2, 0.3, 0.4],
    },
    {
        "id": 2,
        "embedding": None,  # Explicitly set to NULL
    },
    {
        "id": 3,  # Field omitted → stored as NULL
    },
]

client.insert(
    collection_name="my_collection",
    data=data,
)
```

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;

import java.util.ArrayList;
import java.util.List;

List<JsonObject> rows = new ArrayList<>();
Gson gson = new Gson();
rows.add(gson.fromJson("{\"id\": 1, \"embedding\": [0.1, 0.2, 0.3, 0.4]}", JsonObject.class));
rows.add(gson.fromJson("{\"id\": 2, \"embedding\": null}", JsonObject.class));
rows.add(gson.fromJson("{\"id\": 3}", JsonObject.class));

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(rows)
        .build());
```

```javascript
const data = [
  { id: 1, embedding: [0.1, 0.2, 0.3, 0.4] },
  { id: 2, embedding: null },
  { id: 3 },
];

await client.insert({
  collection_name: "my_collection",
  data: data,
});
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

// Assumes `client` is the Milvus client from the Go schema example above.
ctx := context.Background()

rows := []any{
    map[string]any{"id": int64(1), "embedding": []float32{0.1, 0.2, 0.3, 0.4}},
    map[string]any{"id": int64(2), "embedding": nil},
    map[string]any{"id": int64(3)},
}

_, err := client.Insert(ctx, milvusclient.NewRowBasedInsertOption("my_collection", rows...))
if err != nil {
    fmt.Println(err.Error())
}
```

```bash
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{
    "collectionName": "my_collection",
    "data": [
      {"id": 1, "embedding": [0.1, 0.2, 0.3, 0.4]},
      {"id": 2, "embedding": null},
      {"id": 3}
    ]
  }'
```

In this example:

- Entity **id = 1** provides a valid vector value.
- Entity **id = 2** explicitly assigns a NULL value to the `embedding` field.
- Entity **id = 3** omits the `embedding` field entirely; Milvus stores it as NULL.

## Index behavior on nullable fields

After inserting data, you can build an index on a nullable field as usual. The key difference is how Milvus handles NULL values during index construction:

- Only entities with non-null values are added to the index.
- Entities with NULL values are skipped and do not participate in index building.

For a nullable vector field, this means only entities with valid vectors become searchable by vector similarity.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Set index parameters
index_params = client.prepare_index_params()
index_params.add_index(
    field_name="embedding",
    index_type="AUTOINDEX",
    metric_type="COSINE",
)

# Create index
client.create_index(
    collection_name="my_collection",
    index_params=index_params,
)

# Load collection for future search operations
client.load_collection(collection_name="my_collection")
```

```java
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.LoadCollectionReq;
import io.milvus.v2.service.index.request.CreateIndexReq;

import java.util.ArrayList;
import java.util.List;

List<IndexParam> indexes = new ArrayList<>();
indexes.add(IndexParam.builder()
        .fieldName("embedding")
        .indexName("embedding_idx")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());

client.createIndex(CreateIndexReq.builder()
        .collectionName("my_collection")
        .indexParams(indexes)
        .build());

LoadCollectionReq loadReq = LoadCollectionReq.builder()
        .collectionName("my_collection")
        .build();
client.loadCollection(loadReq);
```

```javascript
await client.createIndex({
  collection_name: "my_collection",
  field_name: "embedding",
  index_name: "embedding_idx",
  index_type: "AUTOINDEX",
  metric_type: "COSINE",
});

await client.loadCollection({
  collection_name: "my_collection",
});
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/index"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

// Assumes `client` is the Milvus client from the Go schema example above.
ctx := context.Background()

indexOption := milvusclient.NewCreateIndexOption("my_collection", "embedding",
    index.NewAutoIndex(entity.COSINE))

_, err := client.CreateIndex(ctx, indexOption)
if err != nil {
    fmt.Println(err.Error())
}

_, err = client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption("my_collection"))
if err != nil {
    fmt.Println(err.Error())
}
```

```bash
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{
    "collectionName": "my_collection",
    "indexParams": [
      {
        "fieldName": "embedding",
        "metricType": "COSINE",
        "indexType": "AUTOINDEX"
      }
    ]
  }'

curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/load" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{"collectionName": "my_collection"}'
```

At this point:

- Entities with valid embedding values are indexed and ready for search.
- Entities whose embedding is NULL remain in the collection, but they are not included in the vector index.

## Search behavior with nullable fields

When you perform search operations on a nullable field, Milvus evaluates only entities with non-null values for the field used in the search. Entities whose vector field is NULL are skipped automatically.

For a nullable vector field such as `embedding` in this example:

- Only entities with valid vector values are evaluated and ranked.
- Entities with NULL vectors do not cause errors.
- If the number of valid vectors is smaller than the requested `topK` (`limit`), Milvus may return fewer results than `limit`.

The following example performs a vector search on the nullable vector field `embedding`:

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
    data=[[0.1, 0.2, 0.3, 0.4]],
    anns_field="embedding",
    limit=3,
    search_params={"metric_type": "COSINE"},
    output_fields=["embedding"],
)

print(res)
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

Map<String, Object> searchParams = new HashMap<>();
searchParams.put("metric_type", "COSINE");

SearchResp resp = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .annsField("embedding")
        .data(Collections.singletonList(new FloatVec(new float[]{0.1f, 0.2f, 0.3f, 0.4f})))
        .topK(3)
        .searchParams(searchParams)
        .outputFields(Collections.singletonList("embedding"))
        .build());

System.out.println(resp.getSearchResults());
```

```javascript
const res = await client.search({
  collection_name: "my_collection",
  data: [[0.1, 0.2, 0.3, 0.4]],
  anns_field: "embedding",
  limit: 3,
  search_params: { metric_type: "COSINE" },
  output_fields: ["embedding"],
});

console.log(res);
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

// Assumes `client` is the Milvus client from the Go schema example above.
ctx := context.Background()

query := []float32{0.1, 0.2, 0.3, 0.4}
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection",
    3,
    []entity.Vector{entity.FloatVector(query)},
).WithANNSField("embedding").
    WithOutputFields("embedding"))
if err != nil {
    fmt.Println(err.Error())
}
fmt.Println(resultSets)
```

```bash
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{
    "collectionName": "my_collection",
    "data": [[0.1, 0.2, 0.3, 0.4]],
    "annsField": "embedding",
    "limit": 3,
    "searchParams": {"metricType": "COSINE"},
    "outputFields": ["embedding"]
  }'
```

In this search:

- Only entities with non-null `embedding` values are considered candidates.
- Entities with NULL values for `embedding` are excluded from evaluation.
- The number of returned results depends on how many valid vectors exist in the collection.

## Query and filtering implications

The previous examples focus on vector fields. This section describes how NULL values behave in **scalar filter expressions**.

Scalar fields can be defined with `nullable=True` and follow the same ingestion rules as vector fields. However, **NULL scalar values always evaluate to false in filter expressions**.

For example, given a nullable scalar field `age`, the following filter selects entities whose age is greater than 18:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
expr = "age > 18"
```

```java
String expr = "age > 18";
```

```javascript
const expr = "age > 18";
```

```go
filter := "age > 18"
```

```bash
# Use in query/search filter parameter, for example:
# "filter": "age > 18"
```

Entities where `age` is NULL are excluded from the results because a NULL value does not satisfy the filter condition.

Similarly, equality checks do not match NULL values. For example:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
expr = 'status == "active"'
```

```java
String expr = "status == \"active\"";
```

```javascript
const expr = 'status == "active"';
```

```go
filter := `status == "active"`
```

```bash
# "filter": "status == \"active\""
```

Entities where `status` is NULL are excluded from the results.

## Nullable fields and default values

When both `nullable` and `default_value` are configured for a field, the following rules determine how Milvus handles NULL input or missing field values during insertion.

| Nullable enabled | Default value | User input (NULL or omitted) | Result |
| ---------------- | ------------- | ---------------------------- | -------- |
| Yes | Yes (non-NULL) | NULL or omitted | Uses the default value |
| Yes | No | NULL or omitted | Stored as NULL |
| No | Yes (non-NULL) | NULL or omitted | Uses the default value |
| No | No | NULL or omitted | Throws an error |
| No | Yes (NULL default) | NULL or omitted | Throws an error |

**Key takeaways:**

- When a field has a non-NULL default value, that value is used regardless of whether `nullable` is enabled.
- When `nullable=True` but no default value is set, the field stores NULL.
- When `nullable=False` and no default value is set, insertion fails with an error.
- Setting a NULL default value on a non-nullable field is invalid and causes an error.

For full examples and API usage for defaults, see [Default Values](default-values.md).
