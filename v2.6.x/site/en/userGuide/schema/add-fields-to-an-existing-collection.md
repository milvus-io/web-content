---
id: add-fields-to-an-existing-collection.md
title: "Add Fields to an Existing Collection"
summary: "Milvus allows you to dynamically add new fields to existing collections, making it easy to evolve your data schema as your application needs change. This guide shows you how to add fields in different scenarios using practical examples."
beta: Milvus 2.6.x
---

# Add Fields to an Existing Collection

Milvus allows you to dynamically add new fields to existing collections, making it easy to evolve your data schema as your application needs change. This guide shows you how to add fields in different scenarios using practical examples.

## Considerations

Before adding fields to your collection, keep these important points in mind:

- You can add scalar fields (`INT64`, `VARCHAR`, `FLOAT`, `DOUBLE`, etc.). Vector fields cannot be added to existing collections.

- New fields must be nullable (nullable=True) to accommodate existing entities that don't have values for the new field.

- Adding fields to loaded collections increases memory usage.

- There's a maximum limit on total fields per collection. For details, refer to [Milvus Limits](limitations.md#Number-of-resources-in-a-collection).

- Field names must be unique among static fields.

- You cannot add a `$meta` field to enable dynamic field functionality for collections that weren't originally created with `enable_dynamic_field=True`.

## Prerequisites

This guide assumes you have:

- A running Milvus instance

- Milvus SDK installed

- An existing collection

<div class="alert note">

Refer to our [Create Collection](create-collection.md) for collection creation and basic operations.

</div>

## Basic usage

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient, DataType

# Connect to your Milvus server
client = MilvusClient(
    uri="http://localhost:19530"  # Replace with your Milvus server URI
)
```

```java
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.client.ConnectConfig;

ConnectConfig config = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .build();
MilvusClientV2 client = new MilvusClientV2(config);
```

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530'
});
```

```go
// go
```

```bash
# restful
export CLUSTER_ENDPOINT="localhost:19530"
```

## Scenario 1: Quickly add nullable fields

The simplest way to extend your collection is by adding nullable fields. This is perfect when you need to quickly add new attributes to your data.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Add a nullable field to an existing collection
# This operation:
# - Returns almost immediately (non-blocking)
# - Makes the field available for use with minimal delay
# - Sets NULL for all existing entities
client.add_collection_field(
    collection_name="product_catalog",
    field_name="created_timestamp",  # Name of the new field to add
    data_type=DataType.INT64,        # Data type must be a scalar type
    nullable=True                    # Must be True for added fields
    # Allows NULL values for existing entities
)
```

```java
import io.milvus.v2.service.collection.request.AddCollectionFieldReq;

client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName("product_catalog")
        .fieldName("created_timestamp")
        .dataType(DataType.Int64)
        .isNullable(true)
        .build());
```

```javascript
await client.addCollectionField({
    collection_name: 'product_catalog',
    field: {
        name: 'created_timestamp',
        dataType: 'Int64',
        nullable: true
     }
});
```

```go
// go
```

```bash
# restful
curl -X POST "http://localhost:19530/v2/vectordb/collections/fields/add" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "collectionName": "product_catalog",
    "schema": {
      "fieldName": "created_timestamp",
      "dataType": "Int64",
      "nullable": true
    }
  }'
```

Expected behavior:

- **Existing entities** will have NULL for the new field

- **New entities** can have either NULL or actual values

- **Field availability** occurs almost immediately with minimal delay due to internal schema synchronization

- **Queryable immediately** after the brief synchronization period

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Example query result
{
    'id': 1, 
    'created_timestamp': None  # New field shows NULL for existing entities
}
```

```java
// java
```

```javascript
// nodejs
{
    'id': 1, 
    'created_timestamp': None  # New field shows NULL for existing entities
}
```

```go
// go
```

```bash
# restful
{
  "code": 0,
  "data": {},
  "cost": 0
}
```

## Scenario 2: Add fields with default values

When you want existing entities to have a meaningful initial value instead of NULL, specify default values.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Add a field with default value
# This operation:
# - Sets the default value for all existing entities
# - Makes the field available with minimal delay
# - Maintains data consistency with the default value
client.add_collection_field(
    collection_name="product_catalog",
    field_name="priority_level",     # Name of the new field
    data_type=DataType.VARCHAR,      # String type field
    max_length=20,                   # Maximum string length
    nullable=True,                   # Required for added fields
    default_value="standard"         # Value assigned to existing entities
    # Also used for new entities if no value provided
)
```

```java
client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName("product_catalog")
        .fieldName("priority_level")
        .dataType(DataType.VarChar)
        .maxLength(20)
        .isNullable(true)
        .build());
```

```javascript
await client.addCollectionField({
    collection_name: 'product_catalog',
    field: {
        name: 'priority_level',
        dataType: 'VarChar',
        nullable: true,
        default_value: 'standard',
     }
});
```

```go
// go
```

```bash
# restful
curl -X POST "http://localhost:19530/v2/vectordb/collections/fields/add" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "collectionName": "product_catalog",
    "schema": {
      "fieldName": "priority_level",
      "dataType": "VarChar",
      "nullable": true,
      "defaultValue": "standard",
      "elementTypeParams": {
        "max_length": "20"
      }
    }
  }'
```

Expected behavior:

- **Existing entities** will have the default value (`"standard"`) for the newly added field

- **New entities** can override the default value or use it if no value is provided

- **Field availability** occurs almost immediately with minimal delay

- **Queryable immediately** after the brief synchronization period

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Example query result
{
    'id': 1,
    'priority_level': 'standard'  # Shows default value for existing entities
}
```

```java
// java
```

```javascript
{
    'id': 1,
    'priority_level': 'standard'  # Shows default value for existing entities
}
```

```go
// go
```

```bash
# restful
{
    'id': 1,
    'priority_level': 'standard'  # Shows default value for existing entities
}
```

## FAQ

### Can I enable dynamic schema functionality by adding a `$meta` field?

No, you cannot use `add_collection_field` to add a `$meta` field to enable dynamic field functionality. For example, the code below will not work:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# ❌ This is NOT supported
client.add_collection_field(
    collection_name="existing_collection",
    field_name="$meta",
    data_type=DataType.JSON  # This operation will fail
)
```

```java
// ❌ This is NOT supported
client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName("existing_collection")
        .fieldName("$meta")
        .dataType(DataType.JSON)
        .build());
```

```javascript
// ❌ This is NOT supported
await client.addCollectionField({
    collection_name: 'product_catalog',
    field: {
        name: '$meta',
        dataType: 'JSON',
     }
});
```

```go
// go
```

```bash
# restful
# ❌ This is NOT supported
curl -X POST "http://localhost:19530/v2/vectordb/collections/fields/add" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "collectionName": "existing_collection",
    "schema": {
      "fieldName": "$meta",
      "dataType": "JSON",
      "nullable": true
    }
  }'
```

To enable dynamic schema functionality:

- **New collection**: Set `enable_dynamic_field` to True when creating the collection. For details, refer to [Create Collection](create-collection.md#Create-Schema)

- **Existing collection**: Set the collection-level property `dynamicfield.enabled` to True. For details, refer to [Modify Collection](modify-collection.md#Example-4-Enable-dynamic-field).

### What happens when I add a field with the same name as a dynamic field key?

When your collection has dynamic field enabled (`$meta` exists), you can add static fields that have the same name as existing dynamic field keys. The new static field will mask the dynamic field key, but the original dynamic data is preserved.

To avoid possible conflicts in field names, consider the name for the field to add by referring to existing fields and dynamic field keys before actually adding it.

**Example scenario:**

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Original collection with dynamic field enabled
# Insert data with dynamic field keys
data = [{
    "id": 1,
    "my_vector": [0.1, 0.2, ...],
    "extra_info": "this is a dynamic field key",  # Dynamic field key as string
    "score": 99.5                                 # Another dynamic field key
}]
client.insert(collection_name="product_catalog", data=data)

# Add static field with same name as existing dynamic field key
client.add_collection_field(
    collection_name="product_catalog",
    field_name="extra_info",         # Same name as dynamic field key
    data_type=DataType.INT64,        # Data type can differ from dynamic field key
    nullable=True                    # Must be True for added fields
)

# Insert new data after adding static field
new_data = [{
    "id": 2,
    "my_vector": [0.3, 0.4, ...],
    "extra_info": 100,               # Now must use INT64 type (static field)
    "score": 88.0                    # Still a dynamic field key
}]
client.insert(collection_name="product_catalog", data=new_data)
```

```java
import com.google.gson.*;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;

Gson gson = new Gson();
JsonObject row = new JsonObject();
row.addProperty("id", 1);
row.add("my_vector", gson.toJsonTree(new float[]{0.1f, 0.2f, ...}));
row.addProperty("extra_info", "this is a dynamic field key");
row.addProperty("score", 99.5);

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName("product_catalog")
        .data(Collections.singletonList(row))
        .build());
        
client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName("product_catalog")
        .fieldName("extra_info")
        .dataType(DataType.Int64)
        .isNullable(true)
        .build());
        
JsonObject newRow = new JsonObject();
newRow.addProperty("id", 2);
newRow.add("my_vector", gson.toJsonTree(new float[]{0.3f, 0.4f, ...}));
newRow.addProperty("extra_info", 100);
newRow.addProperty("score", 88.0);

insertR = client.insert(InsertReq.builder()
        .collectionName("product_catalog")
        .data(Collections.singletonList(newRow))
        .build());
```

```javascript
// Original collection with dynamic field enabled
// Insert data with dynamic field keys
const data = [{
    "id": 1,
    "my_vector": [0.1, 0.2, ...],
    "extra_info": "this is a dynamic field key",  // Dynamic field key as string
    "score": 99.5                                 // Another dynamic field key
}]
await client.insert({
    collection_name: "product_catalog", 
    data: data
});

// Add static field with same name as existing dynamic field key
await client.add_collection_field({
    collection_name: "product_catalog",
    field_name: "extra_info",         // Same name as dynamic field key
    data_type: DataType.INT64,        // Data type can differ from dynamic field key
    nullable: true                   // Must be True for added fields
});

// Insert new data after adding static field
const new_data = [{
    "id": 2,
    "my_vector": [0.3, 0.4, ...],
    "extra_info": 100,               # Now must use INT64 type (static field)
    "score": 88.0                    # Still a dynamic field key
}];

await client.insert({
    collection_name:"product_catalog", 
    data: new_data
});
```

```go
// go
```

```bash
# restful
#!/bin/bash

export MILVUS_HOST="localhost:19530"
export AUTH_TOKEN="your_token_here"
export COLLECTION_NAME="product_catalog"

echo "Step 1: Insert initial data with dynamic fields..."
curl -X POST "http://${MILVUS_HOST}/v2/vectordb/entities/insert" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${AUTH_TOKEN}" \
  -d "{
    \"collectionName\": \"${COLLECTION_NAME}\",
    \"data\": [{
      \"id\": 1,
      \"my_vector\": [0.1, 0.2, 0.3, 0.4, 0.5],
      \"extra_info\": \"this is a dynamic field key\",
      \"score\": 99.5
    }]
  }"

echo -e "\n\nStep 2: Add static field with same name as dynamic field..."
curl -X POST "http://${MILVUS_HOST}/v2/vectordb/collections/fields/add" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${AUTH_TOKEN}" \
  -d "{
    \"collectionName\": \"${COLLECTION_NAME}\",
    \"schema\": {
      \"fieldName\": \"extra_info\",
      \"dataType\": \"Int64\",
      \"nullable\": true
    }
  }"

echo -e "\n\nStep 3: Insert new data after adding static field..."
curl -X POST "http://${MILVUS_HOST}/v2/vectordb/entities/insert" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${AUTH_TOKEN}" \
  -d "{
    \"collectionName\": \"${COLLECTION_NAME}\",
    \"data\": [{
      \"id\": 2,
      \"my_vector\": [0.3, 0.4, 0.5, 0.6, 0.7],
      \"extra_info\": 100,
      \"score\": 88.0
    }]
  }"
```

Expected behavior:

- **Existing entities** will have NULL for the new static field `extra_info`

- **New entities** must use the static field's data type (`INT64`)

- **Original dynamic field key values** are preserved and accessible via `$meta` syntax

- **The static field masks the dynamic field key** in normal queries

**Accessing both static and dynamic values:**

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# 1. Query static field only (dynamic field key is masked)
results = client.query(
    collection_name="product_catalog",
    filter="id == 1",
    output_fields=["extra_info"]
)
# Returns: {"id": 1, "extra_info": None}  # NULL for existing entity

# 2. Query both static and original dynamic values
results = client.query(
    collection_name="product_catalog", 
    filter="id == 1",
    output_fields=["extra_info", "$meta['extra_info']"]
)
# Returns: {
#     "id": 1,
#     "extra_info": None,                           # Static field value (NULL)
#     "$meta['extra_info']": "this is a dynamic field key"  # Original dynamic value
# }

# 3. Query new entity with static field value
results = client.query(
    collection_name="product_catalog",
    filter="id == 2", 
    output_fields=["extra_info"]
)
# Returns: {"id": 2, "extra_info": 100}  # Static field value
```

```java
// java
```

```javascript
// 1. Query static field only (dynamic field key is masked)
let results = client.query({
    collection_name: "product_catalog",
    filter: "id == 1",
    output_fields: ["extra_info"]
})
// Returns: {"id": 1, "extra_info": None}  # NULL for existing entity

// 2. Query both static and original dynamic values
results = client.query({
    collection_name:"product_catalog", 
    filter: "id == 1",
    output_fields: ["extra_info", "$meta['extra_info']"]
});
// Returns: {
//     "id": 1,
//     "extra_info": None,                           # Static field value (NULL)
//     "$meta['extra_info']": "this is a dynamic field key"  # Original dynamic value
// }

// 3. Query new entity with static field value
results = client.query({
    collection_name: "product_catalog",
    filter: "id == 2", 
    output_fields: ["extra_info"]
})
// Returns: {"id": 2, "extra_info": 100}  # Static field value
```

```go
// go
```

```bash
# restful
#!/bin/bash

export MILVUS_HOST="localhost:19530"
export AUTH_TOKEN="your_token_here"
export COLLECTION_NAME="product_catalog"

echo "Query 1: Static field only (dynamic field masked)..."
curl -X POST "http://${MILVUS_HOST}/v2/vectordb/entities/query" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${AUTH_TOKEN}" \
  -d "{
    \"collectionName\": \"${COLLECTION_NAME}\",
    \"filter\": \"id == 1\",
    \"outputFields\": [\"extra_info\"]
  }"

echo -e "\n\nQuery 2: Both static and original dynamic values..."
curl -X POST "http://${MILVUS_HOST}/v2/vectordb/entities/query" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${AUTH_TOKEN}" \
  -d "{
    \"collectionName\": \"${COLLECTION_NAME}\",
    \"filter\": \"id == 1\",
    \"outputFields\": [\"extra_info\", \"\$meta['extra_info']\"]
  }"

echo -e "\n\nQuery 3: New entity with static field value..."
curl -X POST "http://${MILVUS_HOST}/v2/vectordb/entities/query" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${AUTH_TOKEN}" \
  -d "{
    \"collectionName\": \"${COLLECTION_NAME}\",
    \"filter\": \"id == 2\",
    \"outputFields\": [\"extra_info\"]
  }"
```

### How long does it take for a new field to become available?

Added fields become available almost immediately, but there may be a brief delay due to internal schema change broadcasting across the Milvus cluster. This synchronization ensures all nodes are aware of the schema update before processing queries involving the new field.

