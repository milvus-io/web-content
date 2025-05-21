---
id: use-json-fields.md
title: "JSON Field"
summary: "A JSON field is a scalar field that stores additional information along with vector embeddings, in key-value pairs. Here's an example of how data is stored in JSON format:"
---

# JSON Field

A [JSON](https://en.wikipedia.org/wiki/JSON) field is a scalar field that stores additional information along with vector embeddings, in key-value pairs. Here's an example of how data is stored in JSON format:

```python
{
  "metadata": {
    "product_info": {
      "category": "electronics",
      "brand": "BrandA"
    },
    "price": 99.99,
    "in_stock": true,
    "tags": ["summer_sale", "clearance"]
  }
}
```

## Limits

- **Field Size**: JSON fields are limited to 65,536 bytes in size.

- **Nested Dictionaries**: Any nested dictionaries within JSON field values are treated as plain strings for storage.

- **Default Values**: JSON fields do not support default values. However, you can set the `nullable` attribute to `True` to allow null values. For details, refer to [Nullable & Default](nullable-and-default.md).

- **Type Matching**: If a JSON field’s key value is an integer or float, it can only be compared (via expression filters) with another numeric key of the same type.

- **Naming**: When naming JSON keys, it is recommended to use only letters, numbers, and underscores. Using other characters may cause issues when filtering or searching.

- **String Handling**: Milvus stores string values in JSON fields as entered, without semantic conversion. For example:

    - `'a"b'`, `"a'b"`, `'a\\'b'`, and `"a\\"b"` are stored exactly as they are.

    - `'a'b'` and `"a"b"` are considered invalid.

- **JSON Indexing**: When indexing a JSON field, you can specify one or more paths in the JSON field to accelerate filtering. Each additional path increases indexing overhead, so plan your indexing strategy carefully. For more considerations on indexing a JSON field, refer to [Considerations on JSON indexing](use-json-fields.md#Considerations-on-JSON-indexing).

## Add JSON field

To add this JSON field `metadata` to your collection schema, use `DataType.JSON`. The example below defines a JSON field `metadata` that allows null values:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
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

# Add a JSON field that supports null values
schema.add_field(field_name="metadata", datatype=DataType.JSON, nullable=True)
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
        .fieldName("metadata")
        .dataType(DataType.JSON)
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
    WithIsAutoID(true),
).WithField(entity.NewField().
    WithName("embedding").
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(3),
).WithField(entity.NewField().
    WithName("metadata").
    WithDataType(entity.FieldTypeJSON),
)
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";
const schema = [
  {
    name: "metadata",
    data_type: DataType.JSON,
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

```bash
export jsonField='{
    "fieldName": "metadata",
    "dataType": "JSON"
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
    \"enableDynamicField\": true,
    \"fields\": [
        $jsonField,
        $pkField,
        $vectorField
    ]
}"
```

<div class="alert note">

- Set `enable_dynamic_fields=True` if you need to insert additional, undefined fields in the future.

- Use `nullable=True` to allow missing or null JSON objects.

</div>

## Set index params

Indexing helps Milvus quickly filter or search across large volumes of data. In Milvus, indexing is:

- **Mandatory** for vector fields (to efficiently run similarity searches).

- **Optional** for JSON fields (to speed up scalar filters on specific JSON paths).

### Index a JSON field

By default, JSON fields are not indexed, so any filter queries (e.g., `metadata["price"] < 100`) must scan all rows. If you want to accelerate queries on specific paths within the `metadata` field, you can create an **inverted index** on each path you care about.

In this example, we will create two indexes on different paths inside the JSON field `metadata`:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
index_params = client.prepare_index_params()

# Example 1: Index the 'category' key inside 'product_info' as a string
index_params.add_index(
    field_name="metadata", # JSON field name to index
    index_type="INVERTED", # Index type. Set to INVERTED
    index_name="json_index_1", # Index name
    params={
        "json_path": "metadata[\"product_info\"][\"category\"]", # Path in JSON field to index
        "json_cast_type": "varchar" # Data type that the extracted JSON values will be cast to
    }
)

# Example 2: Index 'price' as a numeric type (double)
index_params.add_index(
    field_name="metadata",
    index_type="INVERTED",
    index_name="json_index_2",
    params={
        "json_path": "metadata[\"price\"]",
        "json_cast_type": "double"
    }
)
```

```java
import io.milvus.v2.common.IndexParam;

List<IndexParam> indexes = new ArrayList<>();

Map<String,Object> extraParams_1 = new HashMap<>();
extraParams_1.put("json_path", "metadata[\"product_info\"][\"category\"]");
extraParams_1.put("json_cast_type", "varchar");
indexes.add(IndexParam.builder()
        .fieldName("metadata")
        .indexName("json_index_1")
        .indexType(IndexParam.IndexType.INVERTED)
        .extraParams(extraParams_1)
        .build());

Map<String,Object> extraParams_2 = new HashMap<>();
extraParams_2.put("json_path", "metadata[\"price\"]");
extraParams_2.put("json_cast_type", "double");
indexes.add(IndexParam.builder()
        .fieldName("metadata")
        .indexName("json_index_2")
        .indexType(IndexParam.IndexType.INVERTED)
        .extraParams(extraParams_2)
        .build());
```

```go
jsonIndex1 := index.NewJSONPathIndex(index.Inverted, "varchar", `metadata["product_info"]["category"]`)
jsonIndex2 := index.NewJSONPathIndex(index.Inverted, "double", `metadata["price"]`)
indexOpt1 := milvusclient.NewCreateIndexOption("my_collection", "metadata", jsonIndex1)
indexOpt2 := milvusclient.NewCreateIndexOption("my_collection", "metadata", jsonIndex2)
```

```javascript
const indexParams = [
    {
        field_name: "metadata",
        index_type: "INVERTED",
        index_name: "json_index_1",
        params: {
            json_path: "metadata[\"product_info\"][\"category\"]",
            json_cast_type: "varchar"
        }
    },
    {
        field_name: "metadata",
        index_type: "INVERTED",
        index_name: "json_index_2",
        params: {
            json_path: "metadata[\"price\"]",
            json_cast_type: "double"
        }
    }
]

```

```bash
# restful
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "indexParams": [
        {
            "fieldName": "metadata",
            "indexName": "json_index_1",
            "indexType": "INVERTED",
            "params": {
                "json_path": "metadata[\"product_info\"][\"category\"]",
                "json_cast_type": "varchar"
            }
        }
    ]
}'

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "indexParams": [
        {
            "fieldName": "metadata",
            "indexName": "json_index_2",
            "indexType": "INVERTED",
            "params": {
                "json_path": "metadata[\"price\"]",
                "json_cast_type": "double"
            }
        }
    ]
}'
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Example Value</p></th>
   </tr>
   <tr>
     <td><p><code>field_name</code></p></td>
     <td><p>Name of the JSON field in your schema.</p></td>
     <td><p><code>"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code>index_type</code></p></td>
     <td><p>Index type to create; currently only <code>INVERTED</code> is supported for JSON path indexing.</p></td>
     <td><p><code>"INVERTED"</code></p></td>
   </tr>
   <tr>
     <td><p><code>index_name</code></p></td>
     <td><p>(Optional) A custom index name. Specify different names if you create multiple indexes on the same JSON field.</p></td>
     <td><p><code>"json_index_1"</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.json_path</code></p></td>
     <td><p>Specifies which JSON path to index. You can target nested keys, array positions, or both (e.g., <code>metadata["product_info"]["category"]</code> or <code>metadata["tags"][0]</code>). If the path is missing or the array element does not exist for a particular row, that row is simply skipped during indexing, and no error is thrown.</p></td>
     <td><p><code>"metadata[\"product_info\"][\"category\"]"</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.json_cast_type</code></p></td>
     <td><p>Data type that Milvus will cast the extracted JSON values to when building the index. Valid values:</p><ul><li><code>"bool"</code> or <code>"BOOL"</code></li><li><code>"double"</code> or <code>"DOUBLE"</code></li><li><code>"varchar"</code> or <code>"VARCHAR"</code><strong>Note</strong>: For integer values, Milvus internally uses double for the index. Large integers above 2^53 lose precision. If type casting fails (due to type mismatch), no error is thrown, and that row’s value is not indexed.</li></ul></td>
     <td><p><code>"varchar"</code></p></td>
   </tr>
</table>

#### Considerations on JSON indexing

- **Filtering logic**:

    - If you **create a double-type index** (`json_cast_type="double"`), only numeric-type filter conditions can use the index. If the filter compares a double index to a non-numeric condition, Milvus falls back to brute force search.

    - If you **create a varchar-type index** (`json_cast_type="varchar"`), only string-type filter conditions can use the index. Otherwise, Milvus falls back to brute force.

    - **Boolean** indexing behaves similarly to varchar-type.

- **Term expressions**:

    - You can use `json["field"] in [value1, value2, …]`. However, the index works only for scalar values stored under that path. If `json["field"]` is an array, the query falls back to brute force (array-type indexing is not yet supported).

- **Numeric precision**:

    - Internally, Milvus indexes all numeric fields as doubles. If a numeric value exceeds $2^{53}$, it loses precision, and queries on those out-of-range values may not match exactly.

- **Data integrity**:

    - Milvus does not parse or transform JSON keys beyond your specified casting. If the source data is inconsistent (for example, some rows store a string for key `"k"` while others store a number), some rows will not be indexed.

### Index a vector field

The following example creates an index on the vector field `embedding`, using the `AUTOINDEX` index type. With this type, Milvus automatically selects the most suitable index based on the data type. You can also customize the index type and params for each field. For details, refer to [Index Explained](index-explained.md).

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

# Index `embedding` with AUTOINDEX and specify similarity metric type
index_params.add_index(
    field_name="embedding",
    index_name="vector_index",
    index_type="AUTOINDEX",  # Use automatic indexing to simplify complex index settings
    metric_type="COSINE"  # Specify similarity metric type, options include L2, COSINE, or IP
)
```

```java
import io.milvus.v2.common.IndexParam;
import java.util.*;

List<IndexParam> indexes = new ArrayList<>();
indexes.add(IndexParam.builder()
        .fieldName("embedding")
        .indexName("vector_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());
```

```go
vectorIndex := index.NewAutoIndex(entity.COSINE)
indexOpt := milvusclient.NewCreateIndexOption("my_collection", "embedding", vectorIndex)
```

```javascript
indexParams.push({
    index_name: 'embedding_index',
    field_name: 'embedding',
    index_name: 'vector_index',
    metricType: MetricType.CONSINE,
    index_type: IndexType.AUTOINDEX,
));
```

```bash
export indexParams='[
        {
            "fieldName": "embedding",
            "indexName": "vector_index",
            "metricType": "COSINE",
            "indexType": "AUTOINDEX"
        }
    ]'
```

## Create collection

Once the schema and index are defined, create a collection that includes the JSON field.

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
    WithIndexOptions(indexOpt1, indexOpt2, indexOpt))
if err != nil {
    fmt.Println(err.Error())
    // handler err
}
```

```javascript
await client.create_collection({
    collection_name: "my_collection",
    schema: schema,
    index_params: indexParams
});
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

After creating the collection, insert entities that match the schema.

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
        "metadata": {
            "product_info": {"category": "electronics", "brand": "BrandA"},
            "price": 99.99,
            "in_stock": True,
            "tags": ["summer_sale"]
        },
        "pk": 1,
        "embedding": [0.12, 0.34, 0.56]
    },
    {
        "metadata": None,  # Entire JSON object is null
        "pk": 2,
        "embedding": [0.56, 0.78, 0.90]
    },
    {
        # JSON field is completely missing
        "pk": 3,
        "embedding": [0.91, 0.18, 0.23]
    },
    {
        # Some sub-keys are null
        "metadata": {
            "product_info": {"category": None, "brand": "BrandB"},
            "price": 59.99,
            "in_stock": None
        },
        "pk": 4,
        "embedding": [0.56, 0.38, 0.21]
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
rows.add(gson.fromJson("{\"metadata\":{\"product_info\":{\"category\":\"electronics\",\"brand\":\"BrandA\"},\"price\":99.99,\"in_stock\":True,\"tags\":[\"summer_sale\"]},\"pk\":1,\"embedding\":[0.12,0.34,0.56]}", JsonObject.class));
rows.add(gson.fromJson("{\"metadata\":null,\"pk\":2,\"embedding\":[0.56,0.78,0.90]}", JsonObject.class));
rows.add(gson.fromJson("{\"pk\":3,\"embedding\":[0.91,0.18,0.23]}", JsonObject.class));
rows.add(gson.fromJson("{\"metadata\":{\"product_info\":{\"category\":null,\"brand\":\"BrandB\"},\"price\":59.99,\"in_stock\":null},\"pk\":4,\"embedding\":[0.56,0.38,0.21]}", JsonObject.class));

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(rows)
        .build());
```

```go
_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithInt64Column("pk", []int64{1, 2, 3, 4}).
    WithFloatVectorColumn("embedding", 3, [][]float32{
        {0.12, 0.34, 0.56},
        {0.56, 0.78, 0.90},
        {0.91, 0.18, 0.23},
        {0.56, 0.38, 0.21},
    }).WithColumns(
    column.NewColumnJSONBytes("metadata", [][]byte{
        []byte(`{
    "product_info": {"category": "electronics", "brand": "BrandA"},
    "price": 99.99,
    "in_stock": True,
    "tags": ["summer_sale"]
}`),
        []byte(`null`),
        []byte(`null`),
        []byte(`"metadata": {
    "product_info": {"category": None, "brand": "BrandB"},
    "price": 59.99,
    "in_stock": None
}`),
    }),
))
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

```javascript
const data = [
    {
        "metadata": {
            "product_info": {"category": "electronics", "brand": "BrandA"},
            "price": 99.99,
            "in_stock": True,
            "tags": ["summer_sale"]
        },
        "pk": 1,
        "embedding": [0.12, 0.34, 0.56]
    },
    {
        "metadata": None,  # Entire JSON object is null
        "pk": 2,
        "embedding": [0.56, 0.78, 0.90]
    },
    {
        # JSON field is completely missing
        "pk": 3,
        "embedding": [0.91, 0.18, 0.23]
    },
    {
        # Some sub-keys are null
        "metadata": {
            "product_info": {"category": None, "brand": "BrandB"},
            "price": 59.99,
            "in_stock": None
        },
        "pk": 4,
        "embedding": [0.56, 0.38, 0.21]
    }
];

await client.insert({
    collection_name: "my_collection",
    data: data
});
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data '{
    "data": [
        {
             "metadata":  {
                   "product_info": {"category": "electronics", "brand": "BrandA"},
                  "price":  99.99,
                   "in_stock":  true,
                  "tags": ["summer_sale"]
              }, 
             "varchar_field2": "High quality product", 
             "pk": 1, 
             "embedding": [0.1, 0.2, 0.3]
          },
          {
              "metadata": null,
              "pk": 2,
              "embedding": [0.56, 0.78, 0.90]
          },
         {
               "pk": 3,
               "embedding": [0.91, 0.18, 0.23]
         },
        {
              "metadata": {
                     "product_info": {"category": null, "brand": "BrandB"},
                     "price": 59.99,
                     "in_stock": null
               },
              "pk": 4,
              "embedding": [0.56, 0.38, 0.21]
         }
    ],
    "collectionName": "my_collection"
}'
```

## Query with filter expressions

After inserting entities, use the `query` method to retrieve entities that match the specified filter expressions.

<div class="alert note">

For JSON fields that allow null values, the field will be treated as null if the entire JSON object is missing or set to `None`. For more information, refer to [JSON Fields with Null Values](basic-operators.md#JSON-Fields-with-Null-Values).

</div>

To retrieve entities where `metadata` is not null:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
# Query to filter out records with null metadata

filter = 'metadata is not null'

res = client.query(
    collection_name="my_collection",
    filter=filter,
    output_fields=["metadata", "pk"]
)

# Expected result:
# Rows with pk=1 and pk=4 have valid, non-null metadata.
# Rows with pk=2 (metadata=None) and pk=3 (no metadata key) are excluded.

print(res)

# Output:
# data: [
#     "{'metadata': {'product_info': {'category': 'electronics', 'brand': 'BrandA'}, 'price': 99.99, 'in_stock': True, 'tags': ['summer_sale']}, 'pk': 1}",
#     "{'metadata': {'product_info': {'category': None, 'brand': 'BrandB'}, 'price': 59.99, 'in_stock': None}, 'pk': 4}"
# ]
```

```java
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;

String filter = "metadata is not null";
QueryResp resp = client.query(QueryReq.builder()
        .collectionName("my_collection")
        .filter(filter)
        .outputFields(Arrays.asList("metadata", "pk"))
        .build());

System.out.println(resp.getQueryResults());

// Output
//
// [
//    QueryResp.QueryResult(entity={metadata={"product_info":{"category":"electronics","brand":"BrandA"},"price":99.99,"in_stock":true,"tags":["summer_sale"]}, pk=1}),
//    QueryResp.QueryResult(entity={metadata={"product_info":{"category":null,"brand":"BrandB"},"price":59.99,"in_stock":null}, pk=4})
// ]
```

```go
filter := "metadata is not null"
rs, err := client.Query(ctx, milvusclient.NewQueryOption("my_collection").
    WithFilter(filter).
    WithOutputFields("metadata", "pk"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

fmt.Println("pk", rs.GetColumn("pk").FieldData().GetScalars())
fmt.Println("metadata", rs.GetColumn("metadata").FieldData().GetScalars())
```

```javascript
await client.query({
    collection_name: 'my_scalar_collection',
    filter: 'metadata["category"] == "electronics" and metadata["price"] < 150',
    output_fields: ['metadata']
});
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "filter": "metadata is not null",
    "outputFields": ["metadata", "pk"]
}'

#{"code":0,"cost":0,"data":[{"metadata":"{\"product_info\": {\"category\": \"electronics\", \"brand\": \"BrandA\"}, \"price\": 99.99, \"in_stock\": true, \"tags\": [\"summer_sale\"]}","pk":1},{"metadata":"","pk":2},{"metadata":"","pk":3},{"metadata":"{\"product_info\": {\"category\": null, \"brand\": \"BrandB\"}, \"price\": 59.99, \"in_stock\": null}","pk":4}]}
```

To retrieve entities where `metadata["product_info"]["category"]` is `"electronics"`:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'metadata["product_info"]["category"] == "electronics"'

res = client.query(
    collection_name="my_collection",
    filter=filter,
    output_fields=["metadata", "pk"]
)

# Expected result:
# - Only pk=1 has "category": "electronics".
# - pk=4 has "category": None, so it doesn't match.
# - pk=2 and pk=3 have no valid metadata.

print(res)

# Output:
# data: [
#     "{'pk': 1, 'metadata': {'product_info': {'category': 'electronics', 'brand': 'BrandA'}, 'price': 99.99, 'in_stock': True, 'tags': ['summer_sale']}}"
# ]
```

```java
String filter = "metadata[\"product_info\"][\"category\"] == \"electronics\"";

QueryResp resp = client.query(QueryReq.builder()
        .collectionName("my_collection")
        .filter(filter)
        .outputFields(Arrays.asList("metadata", "pk"))
        .build());

System.out.println(resp.getQueryResults());

// Output
// [QueryResp.QueryResult(entity={metadata={"product_info":{"category":"electronics","brand":"BrandA"},"price":99.99,"in_stock":true,"tags":["summer_sale"]}, pk=1})]
```

```go
filter = `metadata["product_info"]["category"] == "electronics"`
rs, err := client.Query(ctx, milvusclient.NewQueryOption("my_collection").
    WithFilter(filter).
    WithOutputFields("metadata", "pk"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

fmt.Println("pk", rs.GetColumn("pk").FieldData().GetScalars())
fmt.Println("metadata", rs.GetColumn("metadata").FieldData().GetScalars())
```

```javascript
const filter = 'metadata["category"] == "electronics"';
const res = await client.query({
    collection_name: "my_collection",
    filter: filter,
    output_fields: ["metadata", "pk"]
});

// Example output:
// {
//.  data: [
//      {'pk': 1, 'metadata': {'category': 'electronics', 'price': 99.99, 'brand': 'BrandA'}}
// ]
// }
```

```bash
# restful
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
  "collectionName": "my_collection",
  "filter": "metadata[\"product_info\"][\"category\"] == \"electronics\"",
  "outputFields": ["metadata", "pk"]
}'

#{"code":0,"cost":0,"data":[{"metadata":"{\"product_info\": {\"category\": \"electronics\", \"brand\": \"BrandA\"}, \"price\": 99.99, \"in_stock\": true, \"tags\": [\"summer_sale\"]}","pk":1}]}
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
filter = 'metadata["product_info"]["brand"] == "BrandA"'

res = client.search(
    collection_name="my_collection",
    data=[[0.3, -0.6, 0.1]],
    limit=5,
    search_params={"params": {"nprobe": 10}},
    output_fields=["metadata"],
    filter=filter
)

# Expected result:
# - Only pk=1 has "brand": "BrandA" in metadata["product_info"].
# - pk=4 has "brand": "BrandB".
# - pk=2 and pk=3 have no valid metadata.
# Hence, only pk=1 matches the filter.

print(res)

# Output:
# data: [
#     "[{'id': 1, 'distance': -0.2479381263256073, 'entity': {'metadata': {'product_info': {'category': 'electronics', 'brand': 'BrandA'}, 'price': 99.99, 'in_stock': True, 'tags': ['summer_sale']}}}]"
# ]
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;

String filter = "metadata[\"product_info\"][\"brand\"] == \"BrandA\"";

SearchResp resp = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .annsField("embedding")
        .data(Collections.singletonList(new FloatVec(new float[]{0.3f, -0.6f, 0.1f})))
        .topK(5)
        .outputFields(Collections.singletonList("metadata"))
        .filter(filter)
        .build());

System.out.println(resp.getSearchResults());

// Output
//
// [
//   [
//     SearchResp.SearchResult(entity={metadata={"product_info":{"category":"electronics","brand":"BrandA"},"price":99.99,"in_stock":true,"tags":["summer_sale"]}}, score=-0.24793813, id=1)
//   ]
// ]

```

```go
queryVector := []float32{0.3, -0.6, -0.1}
filter = "metadata[\"product_info\"][\"brand\"] == \"BrandA\""

annParam := index.NewCustomAnnParam()
annParam.WithExtraParam("nprobe", 10)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", // collectionName
    5,               // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField("embedding").
    WithFilter(filter).
    WithOutputFields("metadata").
    WithAnnParam(annParam))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
    fmt.Println("metadata", resultSet.GetColumn("metadata").FieldData().GetScalars())
}
```

```javascript
await client.search({
    collection_name: 'my_collection',
    data: [0.3, -0.6, 0.1],
    limit: 5,
    output_fields: ['metadata'],
    filter: 'metadata["category"] == "electronics" and metadata["price"] < 150',
});
```

```bash

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
  "collectionName": "my_collection",
  "data": [
    [0.3, -0.6, 0.1]
  ],
  "annsField": "embedding",
  "limit": 5,
  "searchParams": {
    "params": {
      "nprobe": 10
    }
  },
  "outputFields": ["metadata"],
  "filter": "metadata[\"product_info\"][\"brand\"] == \"BrandA\""
}'

##{"code":0,"cost":0,"data":[{"metadata":"{\"product_info\": {\"category\": \"electronics\", \"brand\": \"BrandA\"}, \"price\": 99.99, \"in_stock\": true, \"tags\": [\"summer_sale\"]}","pk":1}]}
```

Additionally, Milvus supports advanced JSON filtering operators such as `JSON_CONTAINS`, `JSON_CONTAINS_ALL`, and `JSON_CONTAINS_ANY`, which can further enhance query capabilities. For more details, refer to [JSON Operators](json-operators.md).

