---
id: use-json-fields.md
title: "JSON Field"
summary: "Milvus allows you to store and index structured data within a single field using the JSON data type. This enables flexible schemas with nested attributes while still allowing efficient filtering via JSON path indexing."
---

# JSON Field

Milvus allows you to store and index structured data within a single field using the `JSON` data type. This enables flexible schemas with nested attributes while still allowing efficient filtering via JSON path indexing.

## What is a JSON field?

A JSON field is a schema-defined field in Milvus that stores structured key-value data. The values can include strings, numbers, booleans, arrays, or deeply nested objects.

Here’s an example of what a JSON field might look like in a document:

```json
{
  "metadata": {
    "category": "electronics",
    "brand": "BrandA",
    "in_stock": true,
    "price": 99.99,
    "string_price": "99.99",
    "tags": ["clearance", "summer_sale"],
    "supplier": {
      "name": "SupplierX",
      "country": "USA",
      "contact": {
        "email": "support@supplierx.com",
        "phone": "+1-800-555-0199"
      }
    }
  }
}
```

In this example:

- `metadata` is the JSON field defined in the schema.

- You can store flat values (e.g. `category`, `in_stock`), arrays (`tags`), and nested objects (`supplier`).

## Define a JSON field in the schema

To use a JSON field, explicitly define it in the collection schema by specifying the `DataType` as `JSON`.

The example below creates a collection with its schema containing these fields:

- The primary key (`product_id`)

- A `vector` field (mandatory for each collection)

- A `metadata` field of type `JSON`, which can store structured data like flat values, arrays, or nested objects

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(uri="http://localhost:19530")

# Create schema with a JSON field
schema = client.create_schema(auto_id=False, enable_dynamic_field=True)

schema.add_field(field_name="product_id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=5)
# highlight-next-line
schema.add_field(field_name="metadata", datatype=DataType.JSON, nullable=True)  # JSON field that allows null values

client.create_collection(
    collection_name="product_catalog",
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
        .fieldName("product_id")
        .dataType(DataType.Int64)
        .isPrimaryKey(Boolean.TRUE)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("vector")
        .dataType(DataType.FloatVector)
        .dimension(5)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("metadata")
        .dataType(DataType.JSON)
        .isNullable(true)
        .build());
        
CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("product_catalog")
        .collectionSchema(schema)
        .build();
client.createCollection(requestCreate);
```

```javascript
// nodejs
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
    WithName("product_id").pk
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(true),
).WithField(entity.NewField().
    WithName("vector").
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(5),
).WithField(entity.NewField().
    WithName("metadata").
    WithDataType(entity.FieldTypeJSON).
    WithNullable(true),
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("product_catalog", schema))
if err != nil {
    return err
}
```

```bash
# restful
```

<div class="alert note">

You can also enable the dynamic field feature to store undeclared fields flexibly, but it's not required for JSON fields to function. For more information, refer to [Dynamic Field](enable-dynamic-field.md).

</div>

## Insert entities with JSON data

Once the collection is created, insert entities that contain structured JSON objects in the `metadata` JSON field.

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
        "product_id": 1,
        "vector": [0.1, 0.2, 0.3, 0.4, 0.5],
        "metadata": {
            "category": "electronics",
            "brand": "BrandA",
            "in_stock": True,
            "price": 99.99,
            "string_price": "99.99",
            "tags": ["clearance", "summer_sale"],
            "supplier": {
                "name": "SupplierX",
                "country": "USA",
                "contact": {
                    "email": "support@supplierx.com",
                    "phone": "+1-800-555-0199"
                }
            }
        }
    }
]

client.insert(collection_name="product_catalog", data=entities)
```

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import io.milvus.v2.service.vector.request.InsertReq;

Gson gson = new Gson();
JsonObject row = new JsonObject();
row.addProperty("product_id", 1);
row.add("vector", gson.toJsonTree(Arrays.asList(0.1, 0.2, 0.3, 0.4, 0.5)));

JsonObject metadata = new JsonObject();
metadata.addProperty("category", "electronics");
metadata.addProperty("brand", "BrandA");
metadata.addProperty("in_stock", true);
metadata.addProperty("price", 99.99);
metadata.addProperty("string_price", "99.99");
metadata.add("tags", gson.toJsonTree(Arrays.asList("clearance", "summer_sale")));

JsonObject supplier = new JsonObject();
supplier.addProperty("name", "SupplierX");
supplier.addProperty("country", "USA");

JsonObject contact = new JsonObject();
contact.addProperty("email", "support@supplierx.com");
contact.addProperty("phone", "+1-800-555-0199");

supplier.add("contact", contact);
metadata.add("supplier", supplier);
row.add("metadata", metadata);

client.insert(InsertReq.builder()
        .collectionName("product_catalog")
        .data(Collections.singletonList(row))
        .build());
```

```javascript
// nodejs
```

```go
_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption("product_catalog").
    WithInt64Column("product_id", []int64{1}).
    WithFloatVectorColumn("vector", 5, [][]float32{
        {0.1, 0.2, 0.3, 0.4, 0.5},
    }).WithColumns(
    column.NewColumnJSONBytes("metadata", [][]byte{
        []byte(`{
            "category": "electronics",
            "brand": "BrandA",
            "in_stock": True,
            "price": 99.99,
            "string_price": "99.99",
            "tags": ["clearance", "summer_sale"],
            "supplier": {
                "name": "SupplierX",
                "country": "USA",
                "contact": {
                    "email": "support@supplierx.com",
                    "phone": "+1-800-555-0199"
                }
            }
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

## Index values inside the JSON field | Milvus 2.5.11+

To accelerate scalar filtering on JSON fields, Milvus supports indexing JSON fields using **JSON path indexing**. This allows you to filter by keys or nested values inside a JSON object without scanning the entire field.

<div class="alert note">

Indexing JSON fields is **optional**. You can still query or filter by JSON paths without an index, but it may result in slower performance due to brute-force search.

</div>

### JSON path indexing syntax

To create a JSON path index, specify:

- **JSON path** (`json_path`): The path to the key or nested field within your JSON object that you want to index.

    - Example: `metadata["category"]`

        This defines where the indexing engine should look inside the JSON structure.

- **JSON cast type** (`json_cast_type`): The data type that Milvus should use when interpreting and indexing the value at the specified path.

    - This type must match the actual data type of the field being indexed. If you want to convert the data type to another during indexing, consider [using a cast function](use-json-fields.md#Use-JSON-cast-functions-for-type-conversion).

    - For a complete list, see [below](use-json-fields.md#Supported-JSON-cast-types).

#### Supported JSON cast types

Cast types are case-insensitive. The following types are supported:

<table>
   <tr>
     <th><p>Cast Type</p></th>
     <th><p>Description</p></th>
     <th><p>Example JSON Value</p></th>
   </tr>
   <tr>
     <td><p><code>bool</code></p></td>
     <td><p>Boolean value</p></td>
     <td><p><code>true</code>, <code>false</code></p></td>
   </tr>
   <tr>
     <td><p><code>double</code></p></td>
     <td><p>Numeric value (integer or float)</p></td>
     <td><p><code>42</code>, <code>99.99</code>, <code>-15.5</code></p></td>
   </tr>
   <tr>
     <td><p><code>varchar</code></p></td>
     <td><p>String value</p></td>
     <td><p><code>"electronics"</code>, <code>"BrandA"</code></p></td>
   </tr>
   <tr>
     <td><p><code>array_bool</code></p></td>
     <td><p>Array of booleans</p></td>
     <td><p><code>[true, false, true]</code></p></td>
   </tr>
   <tr>
     <td><p><code>array_double</code></p></td>
     <td><p>Array of numbers</p></td>
     <td><p><code>[1.2, 3.14, 42]</code></p></td>
   </tr>
   <tr>
     <td><p><code>array_varchar</code></p></td>
     <td><p>Array of strings</p></td>
     <td><p><code>["tag1", "tag2", "tag3"]</code></p></td>
   </tr>
</table>

<div class="alert note">

Arrays should contain elements of the same type for optimal indexing. For more information, refer to [Array Field](array_data_type.md).

</div>

#### Example: Create JSON path indexes

Using the `metadata` JSON structure from our introduction, here are examples of how to create indexes on different JSON paths:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Index the category field as a string
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="AUTOINDEX", # Must be set to AUTOINDEX or INVERTEDfor JSON path indexing
    index_name="category_index",  # Unique index name
    # highlight-start
    params={
        "json_path": "metadata[\"category\"]", # Path to the JSON key to be indexed
        "json_cast_type": "varchar" # Data cast type
    }
    # highlight-end
)

# Index the tags array as string array
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="AUTOINDEX", # Must be set to AUTOINDEX or INVERTEDfor JSON path indexing
    index_name="tags_array_index", # Unique index name
    # highlight-start
    params={
        "json_path": "metadata[\"tags\"]", # Path to the JSON key to be indexed
        "json_cast_type": "array_varchar" # Data cast type
    }
    # highlight-end
)
```

```java
import io.milvus.v2.common.IndexParam;

Map<String,Object> extraParams1 = new HashMap<>();
extraParams1.put("json_path", "metadata[\"category\"]");
extraParams1.put("json_cast_type", "varchar");
indexParams.add(IndexParam.builder()
        .fieldName("metadata")
        .indexName("category_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams1)
        .build());

Map<String,Object> extraParams2 = new HashMap<>();
extraParams2.put("json_path", "metadata[\"tags\"]");
extraParams2.put("json_cast_type", "array_varchar");
indexParams.add(IndexParam.builder()
        .fieldName("metadata")
        .indexName("tags_array_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams2)
        .build());
```

```javascript
// nodejs
```

```go
import (
    "github.com/milvus-io/milvus/client/v2/index"
)

jsonIndex1 := index.NewJSONPathIndex(index.AUTOINDEX, "varchar", `metadata["category"]`)
    .WithIndexName("category_index")
jsonIndex2 := index.NewJSONPathIndex(index.AUTOINDEX, "array_varchar", `metadata["tags"]`)
    .WithIndexName("tags_array_index")

indexOpt1 := milvusclient.NewCreateIndexOption("product_catalog", "metadata", jsonIndex1)
indexOpt2 := milvusclient.NewCreateIndexOption("product_catalog", "metadata", jsonIndex2)
```

```bash
# restful
```

### Use JSON cast functions for type conversion | Milvus 2.5.14+

If your JSON field key contains values in an incorrect format (e.g., numbers stored as strings), you can use cast functions to convert values during indexing.

#### Supported cast functions

Cast functions are case-insensitive. The following types are supported:

<table>
   <tr>
     <th><p>Cast Function</p></th>
     <th><p>Converts From → To</p></th>
     <th><p>Use Case</p></th>
   </tr>
   <tr>
     <td><p><code>"STRING_TO_DOUBLE"</code></p></td>
     <td><p>String → Numeric (double)</p></td>
     <td><p>Convert <code>"99.99"</code> to <code>99.99</code></p></td>
   </tr>
</table>

#### Example: Cast string numbers to double

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Convert string numbers to double for indexing
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="AUTOINDEX", # Must be set to AUTOINDEX or INVERTEDfor JSON path indexing
    index_name="string_to_double_index", # Unique index name
    params={
        "json_path": "metadata[\"string_price\"]", # Path to the JSON key to be indexed
        "json_cast_type": "double", # Data cast type
        # highlight-next-line
        "json_cast_function": "STRING_TO_DOUBLE" # Cast function; case insensitive
    }
)
```

```java
Map<String,Object> extraParams3 = new HashMap<>();
extraParams3.put("json_path", "metadata[\"string_price\"]");
extraParams3.put("json_cast_type", "double");
extraParams3.put("json_cast_function", "STRING_TO_DOUBLE");
indexParams.add(IndexParam.builder()
        .fieldName("metadata")
        .indexName("string_to_double_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams3)
        .build());
```

```javascript
// nodejs
```

```go
jsonIndex3 := index.NewJSONPathIndex(index.AUTOINDEX, "double", `metadata["string_price"]`)
                    .WithIndexName("string_to_double_index")

indexOpt3 := milvusclient.NewCreateIndexOption("product_catalog", "metadata", jsonIndex3)

```

```bash
# restful
```

<div class="alert note">

- The `json_cast_type` parameter is mandatory and must be the same as the cast function's output type.

- If conversion fails (e.g., non-numeric string), the value is skipped and not indexed.

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
    collection_name="product_catalog",
    index_params=index_params
)
```

```java
import io.milvus.v2.service.index.request.CreateIndexReq;

client.createIndex(CreateIndexReq.builder()
        .collectionName("product_catalog")
        .indexParams(indexParams)
        .build());
```

```javascript
// nodejs
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
```

```bash
# restful
```

## Filter by JSON field values

After inserting and indexing JSON fields, you can filter on them using standard filter expressions with JSON path syntax.

For example:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'metadata["category"] == "electronics"'
filter = 'metadata["price"] > 50'
filter = 'json_contains(metadata["tags"], "featured")'
```

```java
String filter = 'metadata["category"] == "electronics"';
String filter = 'metadata["price"] > 50';
String filter = 'json_contains(metadata["tags"], "featured")';
```

```javascript
// nodejs
```

```go
filter := 'metadata["category"] == "electronics"'
filter := 'metadata["price"] > 50'
filter := 'json_contains(metadata["tags"], "featured")'
```

```bash
# restful
```

To use these expressions in a search or query, make sure:

- You have created an index on each vector field.

- The collection is loaded into memory.

For a full list of supported operators and expressions, refer to [JSON Operators](json-operators.md).

## Pull it all together

By now, you’ve learned how to define, insert, and optionally index structured values inside a JSON field.

To complete the workflow in a real-world application, you’ll also need to:

- **Create an index on your vector fields** (mandatory for each vector field in a collection)  

    Refer to [Set Index Parameters](create-collection.md#Optional-Set-Index-Parameters)

- **Load the collection**

    Refer to [Load & Release](load-and-release.md)

- **Search or query using JSON path filters**  

    Refer to [Filtered Search](filtered-search.md) and [JSON Operators](json-operators.md)

## FAQ

### What are the differences between a JSON field and the dynamic field?

- **JSON field** is schema-defined. You must explicitly declare the field in the schema.

- **Dynamic field** is a hidden JSON object (`$meta`) that automatically stores any field not defined in the schema.

Both support nested structures and JSON path indexing, but dynamic fields are more suitable for optional or evolving data structures.

Refer to [Dynamic Field](enable-dynamic-field.md) for details.

### Are there any limitations on the size of a JSON field?

Yes. Each JSON field is limited to 65,536 bytes.

### Does a JSON field support setting a default value?

No, JSON fields do not support default values. However, you can set `nullable=True` when defining the field to allow empty entries.

Refer to [Nullable & Default](nullable-and-default.md) for details.

### Are there any naming conventions for JSON field keys?

Yes. To ensure compatibility with queries and indexing:

- Use only letters, numbers, and underscores in JSON keys.

- Avoid using special characters, spaces, or dots (`.`, `/`, etc.).

- Incompatible keys may cause parsing issues in filter expressions.

### How does Milvus handle string values in JSON fields?

Milvus stores string values exactly as they appear in the JSON input—without semantic transformation. Improperly quoted strings may result in errors during parsing.

**Examples of valid strings**:

```plaintext
"a\"b", "a'b", "a\\b"
```

**Examples of invalid strings**:

```plaintext
'a"b', 'a\'b'
```

### What filtering logic does Milvus use for indexed JSON paths?

- **Numeric Indexing**:

    If an index is created with `json_cast_type="double"`, only numeric filter conditions (e.g., `>`, `<`, `== 42`) will leverage the index. Non-numeric conditions will force a brute-force scan.

- **String Indexing**:

    If an index uses `json_cast_type="varchar"`, only string filter conditions will benefit from the index; other types will fall back to brute-force search.

- **Boolean Indexing**:

    Boolean indexing behaves similarly to string indexing, with index usage only when the condition strictly matches true or false.

### How do term expressions work with JSON field indexing?

You can use term expressions like `json["field"] IN [value1, value2, …]` to filter entities.

- The index applies only if the targeted value is a scalar.

- If `json["field"]` is an array, the query will not use the index and will fall back to a brute-force search.

### What about numeric precision when indexing JSON fields?

Milvus stores all indexed numeric values as doubles.

If a numeric value exceeds **2^53**, it may lose precision. This loss of precision can result in filter queries not matching out-of-range values exactly.

### How does Milvus handle data integrity for JSON field indexing?

Milvus does not automatically convert or normalize inconsistent data types.

For example, if some rows store `"price": "99.99"` as a string and others store `"price": 99.99` as a number while the index is defined as a double, only the rows with numeric values will be indexed.

Inconsistencies will cause the affected rows to be skipped silently during indexing.

### What happens if type casting fails when indexing a JSON field?

If a value cannot be cast to the specified `json_cast_type` (e.g., a non-numeric string when expecting a `double`), that value is silently skipped and **not included in the index**. As a result, entities with casting failures will be **excluded from filter results** that rely on the index.

To avoid unexpected query behavior, ensure all values under the indexed JSON path are consistently typed.

### Can I create multiple indexes on the same JSON path with different cast types?

No, each JSON path supports **only one index**. You must choose a single `json_cast_type` that matches your data. Creating multiple indexes on the same path with different cast types is not supported.

### What if values at a JSON path have inconsistent types?

Inconsistent types across entities can lead to **partial indexing**. For example, if `metadata["price"]` is stored as both a number (`99.99`) and a string (`"99.99"`), and the index is defined with `json_cast_type="double"`, only the numeric values will be indexed. The string-form entries will be skipped and not appear in filter results.

### Can I use filters with a different type than the indexed cast type?

If your filter expression uses a different type than the index's `json_cast_type`, the system will **not use the index**, and may fall back to a slower brute-force scan—if the data allows. For best performance, always align your filter expression with the cast type of the index.