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

```python
from pymilvus import MilvusClient, DataType

# Connect to your Milvus server
client = MilvusClient(
    uri="http://localhost:19530"  # Replace with your Milvus server URI
)
```

## Scenario 1: Quickly add nullable fields

The simplest way to extend your collection is by adding nullable fields. This is perfect when you need to quickly add new attributes to your data.

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

### What to expect

- **Existing entities** will have NULL for the new field

- **New entities** can have either NULL or actual values

- **Field availability** occurs almost immediately with minimal delay due to internal schema synchronization

- **Queryable immediately** after the brief synchronization period

```python
# Example query result
{
    'id': 1, 
    'created_timestamp': None  # New field shows NULL for existing entities
}
```

## Scenario 2: Add fields with default values

When you want existing entities to have a meaningful initial value instead of NULL, specify default values.

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

### What to expect

- **Existing entities** will have the default value (`"standard"`) for the newly added field

- **New entities** can override the default value or use it if no value is provided

- **Field availability** occurs almost immediately with minimal delay

- **Queryable immediately** after the brief synchronization period

```bash
# Example query result
{
    'id': 1,
    'priority_level': 'standard'  # Shows default value for existing entities
}
```

## FAQ

### Can I enable dynamic schema functionality by adding a `$meta` field?

No, you cannot use `add_collection_field` to add a `$meta` field to enable dynamic field functionality. Dynamic schema must be enabled when creating the collection by setting `enable_dynamic_field=True` in the schema.

```python
# ❌ This is NOT supported
client.add_collection_field(
    collection_name="existing_collection",
    field_name="$meta",
    data_type=DataType.JSON  # This operation will fail
)

# ✅ Dynamic field must be enabled during collection creation
client.create_collection(
    collection_name="my_collection",
    dimension=5,
    enable_dynamic_field=True
)
```

### What happens when I add a field with the same name as a dynamic field key?

When your collection has dynamic field enabled (`$meta` exists), you can add static fields that have the same name as existing dynamic field keys. The new static field will mask the dynamic field key, but the original dynamic data is preserved.

**Example scenario:**

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

**What to expect:**

- **Existing entities** will have NULL for the new static field `extra_info`

- **New entities** must use the static field's data type (`INT64`)

- **Original dynamic field key values** are preserved and accessible via `$meta` syntax

- **The static field masks the dynamic field key** in normal queries

**Accessing both static and dynamic values:**

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

### How long does it take for a new field to become available?

Added fields become available almost immediately, but there may be a brief delay due to internal schema change broadcasting across the Milvus cluster. This synchronization ensures all nodes are aware of the schema update before processing queries involving the new field.

