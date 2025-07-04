---
id: enable-dynamic-field.md
title: "Dynamic Field"
summary: "Milvus allows you to insert entities with flexible, evolving structures through a special feature called the dynamic field. This field is implemented as a hidden JSON field named $meta, which automatically stores any fields in your data that are not explicitly defined in the collection schema."
---

# Dynamic Field

Milvus allows you to insert entities with flexible, evolving structures through a special feature called the **dynamic field**. This field is implemented as a hidden JSON field named `$meta`, which automatically stores any fields in your data that are **not explicitly defined** in the collection schema.

## How it works

When the dynamic field is enabled, Milvus adds a hidden `$meta` field to each entity. During data insertion, any field not declared in the schema is automatically stored as a key-value pair inside this dynamic field.

You don't need to manage `$meta` manually—Milvus handles it transparently.

For example, if your collection schema defines only `id` and `vector`, and you insert the following entity:

```json
{
  "id": 1,
  "vector": [0.1, 0.2, 0.3],
  "name": "Item A",    // Not in schema
  "category": "books"  // Not in schema
}
```

With the dynamic field feature enabled, Milvus stores it internally as:

```json
{
  "id": 1,
  "vector": [0.1, 0.2, 0.3],
  // highlight-start
  "$meta": {
    "name": "Item A",
    "category": "books"
  }
  // highlight-end
}
```

This allows you to evolve your data structure without altering the schema.

Common use cases include:

- Storing optional or infrequently retrieved fields

- Capturing metadata that varies by entity

- Supporting flexible filtering via indexes on specific dynamic field keys

## Supported data types

The dynamic field supports all scalar data types provided by Milvus, including both simple and complex values. These data types apply to the **values of keys stored in `$meta`.

**Supported types include:**

- String (`VARCHAR`)

- Integer (`INT8`, `INT32`, `INT64`)

- Floating point (`FLOAT`, `DOUBLE`)

- Boolean (`BOOL`)

- Array of scalar values (`ARRAY`)

- JSON objects (`JSON`)

**Example:**

```json
{
  "brand": "Acme",
  "price": 29.99,
  "in_stock": true,
  "tags": ["new", "hot"],
  "specs": {
    "weight": "1.2kg",
    "dimensions": { "width": 10, "height": 20 }
  }
}
```

Each of the above keys and values would be stored inside the `$meta` field.

## Enable dynamic field

To use the dynamic field feature, set `enable_dynamic_field=True` when creating the collection schema:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient, DataType

# Initialize client
client = MilvusClient(uri="http://localhost:19530")

# Create schema with dynamic field enabled
schema = client.create_schema(
    auto_id=False,
    # highlight-next-line
    enable_dynamic_field=True,
)

# Add explicitly defined fields
schema.add_field(field_name="my_id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="my_vector", datatype=DataType.FLOAT_VECTOR, dim=5)

# Create the collection
client.create_collection(
    collection_name="my_collection",
    schema=schema
)
```

```java
import io.milvus.v2.client.*;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.AddFieldReq;

ConnectConfig config = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .build();
MilvusClientV2 client = new MilvusClientV2(config);

CreateCollectionReq.CollectionSchema schema = CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(true)
        .build();
schema.addField(AddFieldReq.builder()
        .fieldName("my_id")
        .dataType(DataType.Int64)
        .isPrimaryKey(Boolean.TRUE)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("my_vector")
        .dataType(DataType.FloatVector)
        .dimension(5)
        .build());

CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        .build();
client.createCollection(requestCreate);
```

```javascript
import { MilvusClient, DataType, CreateCollectionReq } from '@zilliz/milvus2-sdk-node';

// Initialize client
const client = new MilvusClient({ address: 'localhost:19530' });

// Create collection
const res = await client.createCollection({
  collection_name: 'my_collection',
  schema:  [
      {
        name: 'my_id',
        data_type: DataType.Int64,
        is_primary_key: true,
        autoID: false,
      },
      {
        name: 'my_vector',
        data_type: DataType.FloatVector,
        type_params: {
          dim: '5',
      }
   ],
   enable_dynamic_field: true
});

```

```go
import (
    "context"

    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "localhost:19530",
})
if err != nil {
    return err
}

schema := entity.NewSchema().WithDynamicFieldEnabled(true)
schema.WithField(entity.NewField().
    WithName("my_id").pk
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(true),
).WithField(entity.NewField().
    WithName("my_vector").
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(5),
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("my_collection", schema))
if err != nil {
    return err
}
```

```bash
# restful
```

## Insert entities to the collection

The dynamic field allows you to insert extra fields not defined in the schema. These fields will be stored automatically in `$meta`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
entities = [
    {
        "my_id": 1, # Explicitly defined primary field
        "my_vector": [0.1, 0.2, 0.3, 0.4, 0.5], # Explicitly defined vector field
        "overview": "Great product",       # Scalar key not defined in schema
        "words": 150,                      # Scalar key not defined in schema
        "dynamic_json": {                  # JSON key not defined in schema
            "varchar": "some text",
            "nested": {
                "value": 42.5
            },
            "string_price": "99.99"        # Number stored as string
        }
    }
]

client.insert(collection_name="my_collection", data=entities)
```

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import io.milvus.v2.service.vector.request.InsertReq;

Gson gson = new Gson();
JsonObject row = new JsonObject();
row.addProperty("my_id", 1);
row.add("my_vector", gson.toJsonTree(Arrays.asList(0.1, 0.2, 0.3, 0.4, 0.5)));
row.addProperty("overview", "Great product");
row.addProperty("words", 150);

JsonObject dynamic = new JsonObject();
dynamic.addProperty("varchar", "some text");
dynamic.addProperty("string_price", "99.99");

JsonObject nested = new JsonObject();
nested.addProperty("value", 42.5);

dynamic.add("nested", nested);
row.add("dynamic_json", dynamic);

client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(row))
        .build());
```

```javascript

const entities = [
  {
    my_id: 1,
    my_vector: [0.1, 0.2, 0.3, 0.4, 0.5],
    overview: 'Great product',
    words: 150,
    dynamic_json: {
      varchar: 'some text',
      nested: {
        value: 42.5,
      },
      string_price: '99.99',
    },
  },
];
const res = await client.insert({
    collection_name: 'my_collection',
    data: entities,
});
```

```go
_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithInt64Column("my_id", []int64{1}).
    WithFloatVectorColumn("my_vector", 5, [][]float32{
        {0.1, 0.2, 0.3, 0.4, 0.5},
    }).WithColumns(
    column.NewColumnVarChar("overview", []string{"Great product"}),
    column.NewColumnInt32("words", []int32{150}),
    column.NewColumnJSONBytes("dynamic_json", [][]byte{
        []byte(`{
            varchar: 'some text',
            nested: {
                value: 42.5,
            },
            string_price: '99.99',
        }`),
    }),
))
if err != nil {
    return err
}
```

```bash
# restful
```

## Index keys in the dynamic field | Milvus 2.5.11+

Milvus allows you to use **JSON path indexing** to create indexes on specific keys inside the dynamic field. These can be scalar values or nested values in JSON objects.

<div class="alert note">

Indexing dynamic field keys is **optional**. You can still query or filter by dynamic field keys without an index, but it may result in slower performance due to brute-force search.

</div>

### JSON path indexing syntax

To create a JSON path index, specify:

- **JSON path** (`json_path`): The path to the key or nested field within your JSON object that you want to index.

    - Example: `metadata["category"]`

        This defines where the indexing engine should look inside the JSON structure.

- **JSON cast type** (`json_cast_type`): The data type that Milvus should use when interpreting and indexing the value at the specified path.

    - This type must match the actual data type of the field being indexed.

    - For a complete list, refer to [Supported JSON cast types](use-json-fields.md#Supported-JSON-cast-types).

### Index non-JSON keys in the dynamic field

You can index any non-JSON key (e.g., `overview`, `words`) by referencing its key name directly in `json_path`:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
index_params = client.prepare_index_params()

# Index a string key from $meta
index_params.add_index(
    field_name="overview",  # Key name in the dynamic field
    # highlight-next-line
    index_type="AUTOINDEX", # Must be set to AUTOINDEX or INVERTEDfor JSON path indexing
    index_name="overview_index",  # Unique index name
    # highlight-start
    params={
        "json_cast_type": "varchar",   # Data type that Milvus uses when indexing the values
        "json_path": "overview"        # Key name in the dynamic field
    }
    # highlight-end
)

# Index a numeric key from $meta
index_params.add_index(
    field_name="words",  # Key name in the dynamic field
    # highlight-next-line
    index_type="AUTOINDEX", # Must be set to AUTOINDEX or INVERTEDfor JSON path indexing
    index_name="words_index",  # Unique index name
    # highlight-start
    params={
        "json_cast_type": "double",  # Data type that Milvus uses when indexing the values
        "json_path": "words" # Key name in the dynamic field
    }
    # highlight-end
)
```

```java
import io.milvus.v2.common.IndexParam;

Map<String,Object> extraParams1 = new HashMap<>();
extraParams1.put("json_path", "overview");
extraParams1.put("json_cast_type", "varchar");
indexParams.add(IndexParam.builder()
        .fieldName("overview")
        .indexName("overview_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams1)
        .build());

Map<String,Object> extraParams2 = new HashMap<>();
extraParams2.put("json_path", "words");
extraParams2.put("json_cast_type", "double");
indexParams.add(IndexParam.builder()
        .fieldName("words")
        .indexName("words_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams2)
        .build());
```

```javascript
const indexParams = [
    {
      collection_name: 'my_collection',
      field_name: 'overview',
      index_name: 'overview_index',
      index_type: 'AUTOINDEX',
      metric_type: 'NONE',
      params: {
        json_path: 'overview',
        json_cast_type: 'varchar',
      },
    },
    {
      collection_name: 'my_collection',
      field_name: 'words',
      index_name: 'words_index',
      index_type: 'AUTOINDEX',
      metric_type: 'NONE',
      params: {
        json_path: 'words',
        json_cast_type: 'double',
      },
    },
  ];

```

```go
import (
    "github.com/milvus-io/milvus/client/v2/index"
)

jsonIndex1 := index.NewJSONPathIndex(index.AUTOINDEX, "varchar", "overview")
    .WithIndexName("overview_index")
jsonIndex2 := index.NewJSONPathIndex(index.AUTOINDEX, "double", "words")
    .WithIndexName("words_index")

indexOpt1 := milvusclient.NewCreateIndexOption("my_collection", "overview", jsonIndex1)
indexOpt2 := milvusclient.NewCreateIndexOption("my_collection", "words", jsonIndex2)
```

```bash
# restful
```

### Index JSON keys in the dynamic field

When a key in the dynamic field (`$meta`) stores a JSON object, you can index its internal keys using bracket notation in `json_path`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Index a top-level key inside a JSON object
index_params.add_index(
    field_name="dynamic_json", # JSON key name in the dynamic field
    # highlight-next-line
    index_type="AUTOINDEX", # Must be set to AUTOINDEX or INVERTEDfor JSON path indexing
    index_name="json_varchar_index", # Unique index name
    # highlight-start
    params={
        "json_cast_type": "varchar", # Data type that Milvus uses when indexing the values
        "json_path": "dynamic_json['varchar']" # Path to the key to be indexed
    }
    # highlight-end
)

# Index a nested key
index_params.add_index(
    field_name="dynamic_json",
    # highlight-next-line
    index_type="AUTOINDEX", # Must be set to AUTOINDEX or INVERTEDfor JSON path indexing
    index_name="json_nested_index", # Unique index name
    # highlight-start
    params={
        "json_cast_type": "double",
        "json_path": "dynamic_json['nested']['value']"
    }
    # highlight-end
)
```

```java
Map<String,Object> extraParams3 = new HashMap<>();
extraParams3.put("json_path", "dynamic_json['varchar']");
extraParams3.put("json_cast_type", "varchar");
indexParams.add(IndexParam.builder()
        .fieldName("dynamic_json")
        .indexName("json_varchar_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams3)
        .build());

Map<String,Object> extraParams4 = new HashMap<>();
extraParams4.put("json_path", "dynamic_json['nested']['value']");
extraParams4.put("json_cast_type", "double");
indexParams.add(IndexParam.builder()
        .fieldName("dynamic_json")
        .indexName("json_nested_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams4)
        .build());
```

```javascript
indexParams.push({
      collection_name: 'my_collection',
      field_name: 'dynamic_json',
      index_name: 'json_varchar_index',
      index_type: 'AUTOINDEX',
      metric_type: 'NONE',
      params: {
        json_cast_type: 'varchar',
        json_path: "dynamic_json['varchar']",
      },
    },
    {
      collection_name: 'my_collection',
      field_name: 'dynamic_json',
      index_name: 'json_nested_index',
      index_type: 'AUTOINDEX',
      metric_type: 'NONE',
      params: {
        json_cast_type: 'double',
        json_path: "dynamic_json['nested']['value']",
      },
    });
```

```go
jsonIndex3 := index.NewJSONPathIndex(index.AUTOINDEX, "varchar", `dynamic_json['varchar']`)
    .WithIndexName("json_varchar_index")
jsonIndex4 := index.NewJSONPathIndex(index.AUTOINDEX, "double", `dynamic_json['nested']['value']`)
    .WithIndexName("json_nested_index")

indexOpt3 := milvusclient.NewCreateIndexOption("my_collection", "dynamic_json", jsonIndex3)
indexOpt4 := milvusclient.NewCreateIndexOption("my_collection", "dynamic_json", jsonIndex4)
```

```bash
# restful
```

### Use JSON cast functions for type conversion | Milvus 2.5.14+

If a dynamic field key contains values in an incorrect format, (e.g. numbers stored as strings), you can use a cast function to convert it:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Convert a string to double before indexing
index_params.add_index(
    field_name="dynamic_json", # JSON key name
    index_type="AUTOINDEX",
    index_name="json_string_price_index",
    params={
        "json_path": "dynamic_json['string_price']",
        "json_cast_type": "double", # Must be the output type of the cast function
        # highlight-next-line
        "json_cast_function": "STRING_TO_DOUBLE" # Case insensitive; convert string to double
    }
)
```

```java
Map<String,Object> extraParams5 = new HashMap<>();
extraParams5.put("json_path", "dynamic_json['string_price']");
extraParams5.put("json_cast_type", "double");
indexParams.add(IndexParam.builder()
        .fieldName("dynamic_json")
        .indexName("json_string_price_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams5)
        .build());
```

```javascript
indexParams.push({
    collection_name: 'my_collection',
    field_name: 'dynamic_json',
    index_name: 'json_string_price_index',
    index_type: 'AUTOINDEX',
    metric_type: 'NONE',
    params: {
      json_path: "dynamic_json['string_price']",
      json_cast_type: 'double',
      json_cast_function: 'STRING_TO_DOUBLE',
    },
  });
```

```go
jsonIndex5 := index.NewJSONPathIndex(index.AUTOINDEX, "double", `dynamic_json['string_price']`)
    .WithIndexName("json_string_price_index")
indexOpt5 := milvusclient.NewCreateIndexOption("my_collection", "dynamic_json", jsonIndex5)
```

```bash
# restful
```

<div class="alert note">

- If type conversion fails (e.g. value `"not_a_number"` cannot be converted to a number), the value is skipped and unindexed.

- For details on cast function parameters, refer to [JSON Field](use-json-fields.md#Use-JSON-cast-functions-for-type-conversion).

</div>

### Apply indexes to the collection

After defining the index parameters, you can apply them to the collection using `create_index()`:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
client.create_index(
    collection_name="my_collection",
    index_params=index_params
)
```

```java
import io.milvus.v2.service.index.request.CreateIndexReq;

client.createIndex(CreateIndexReq.builder()
        .collectionName("my_collection")
        .indexParams(indexParams)
        .build());
```

```javascript
  await client.createIndex(indexParams);
```

```go
indexTask1, err := client.CreateIndex(ctx, indexOpt1)
if err != nil {
    return err
}
indexTask2, err := client.CreateIndex(ctx, indexOpt2)
if err != nil {
    return err
}
indexTask3, err := client.CreateIndex(ctx, indexOpt3)
if err != nil {
    return err
}
indexTask4, err := client.CreateIndex(ctx, indexOpt4)
if err != nil {
    return err
}
indexTask5, err := client.CreateIndex(ctx, indexOpt5)
if err != nil {
    return err
}
```

```bash
# restful
```

## Filter by dynamic field keys

After inserting entities with dynamic field keys, you can filter them using standard filter expressions.

- For non-JSON keys (e.g. strings, numbers, booleans), you can reference them by key name directly.

- For keys storing JSON objects, use JSON path syntax to access nested values.

Based on [the ](enable-dynamic-field.md#Insert-entities-to-the-collection)[example entity](enable-dynamic-field.md#Insert-entities-to-the-collection) from the previous section, valid filter expressions include:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'overview == "Great product"'                # Non-JSON key
filter = 'words >= 100'                               # Non-JSON key
filter = 'dynamic_json["nested"]["value"] < 50'       # JSON object key
```

```java
String filter = 'overview == "Great product"';
String filter = 'words >= 100';
String filter = 'dynamic_json["nested"]["value"] < 50';
```

```javascript
filter = 'overview == "Great product"'                # Non-JSON key
filter = 'words >= 100'                               # Non-JSON key
filter = 'dynamic_json["nested"]["value"] < 50'       # JSON object key
```

```go
filter := 'overview == "Great product"'
filter := 'words >= 100'
filter := 'dynamic_json["nested"]["value"] < 50'
```

```bash
# restful
```

For a full list of supported operators and filter expressions, refer to [Filtered Search](filtered-search.md).

## Put it all together

By now, you’ve learned how to use the dynamic field to flexibly store and index keys that are not defined in the schema. Once a dynamic field key is inserted, you can use it just like any other field in filter expressions—no special syntax required.

To complete the workflow in a real-world application, you’ll also need to:

- **Create an index on your vector field** (mandatory for each collection)  

    Refer to [Set Index Parameters](create-collection.md#Optional-Set-Index-Parameters)

- **Load the collection**

    Refer to [Load & Release](load-and-release.md)

- **Search or query using JSON path filters**  

    Refer to [Filtered Search](filtered-search.md) and [JSON Operators](json-operators.md)

## FAQ

### When should I define a field explicitly in the schema instead of using a dynamic field key?

You should define a field explicitly in the schema instead of using a dynamic field key when:

- **The field is frequently included in output_fields**: Only explicitly defined fields are guaranteed to be efficiently retrievable through `output_fields`. Dynamic field keys are not optimized for high-frequency retrieval and may incur performance overhead.

- **The field is accessed or filtered frequently**: While indexing a dynamic field key can provide similar filtering performance to fixed schema fields, explicitly defined fields offer clearer structure and better maintainability.

- **You need full control over field behavior**: Explicit fields support schema-level constraints, validations, and clearer typing, which can be useful for managing data integrity and consistency.

- **You want to avoid indexing inconsistencies**: Data in dynamic field keys is more prone to inconsistency in type or structure. Using a fixed schema helps ensure data quality, especially if you plan to use indexing or casting.

### Can I create multiple indexes on the same dynamic field key with different data types?

No, you can create **only one index per JSON path**. Even if a dynamic field key contains mixed-type values (e.g., some strings and some numbers), you must choose a single `json_cast_type` when indexing that path. Multiple indexes on the same key with different types are not supported at this time.

### When indexing a dynamic field key, what if the data casting fails?

If you’ve created an index on a dynamic field key and the data casting fails—e.g., a value meant to be cast to `double` is a non-numeric string like `"abc"`—those specific values will be **silently skipped during index creation**. They won’t appear in the index and therefore **won’t be returned in filter-based search or query results** that rely on the index.

This has a few important implications:

- **No fallback to full scan**: If the majority of entities are successfully indexed, filtering queries will rely entirely on the index. Entities with casting failures will be excluded from the result set—even if they logically match the filter condition.

- **Search accuracy risk**: In large datasets where data quality is inconsistent (especially in dynamic field keys), this behavior can lead to unexpected missing results. It’s critical to ensure consistent and valid data formatting before indexing.

- **Use cast functions cautiously**: If you use a `json_cast_function` to convert strings to numbers during indexing, ensure the string values are reliably convertible. A mismatch between `json_cast_type` and the actual converted type will result in errors or skipped entries.

### What happens if my query uses a different data type than the indexed cast type?

If your query compares a dynamic field key using a **different data type** than what was used in the index (e.g., querying with a string comparison when the index was cast to `double`), the system will **not use the index**, and may fall back to a full scan *only if possible*. For best performance and accuracy, ensure your query type matches the `json_cast_type` used during index creation.