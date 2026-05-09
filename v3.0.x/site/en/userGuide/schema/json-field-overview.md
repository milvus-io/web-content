---
id: json-field-overview.md
title: "JSON Field Overview"
summary: "When building applications like product catalogs, content management systems, or user preference engines, you often need to store flexible metadata alongside your vector embeddings. Product attributes vary by category, user preferences evolve over time, and document properties have complex nested structures. JSON fields in Milvus solve this challenge by allowing you to store and query flexible structured data without sacrificing performance."
---

# JSON Field Overview

When building applications like product catalogs, content management systems, or user preference engines, you often need to store flexible metadata alongside your vector embeddings. Product attributes vary by category, user preferences evolve over time, and document properties have complex nested structures. JSON fields in Milvus solve this challenge by allowing you to store and query flexible structured data without sacrificing performance.

## What is a JSON field?

A JSON field is a schema-defined data type (`DataType.JSON`) in Milvus that stores structured key-value data. Unlike traditional rigid database columns, JSON fields accommodate nested objects, arrays, and mixed data types while providing multiple indexing options for fast queries.

Example JSON field structure:

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

In this example, `metadata` is a single JSON field that contains a mix of flat values (e.g. `category`, `in_stock`), arrays (`tags`), and nested objects (`supplier`).

<div class="alert note">

**Naming convention:** Use only letters, numbers, and underscores in JSON keys. Avoid special characters, spaces, or dots as they may cause parsing issues in queries.

</div>

## JSON field vs. dynamic field

A common point of confusion is the difference between a JSON field and the [dynamic field](enable-dynamic-field.md). While both are related to JSON, they serve different purposes.

The table below summarizes the key differences between a JSON field and the dynamic field:

<table>
   <tr>
     <th><p>Feature</p></th>
     <th><p>JSON Field</p></th>
     <th><p>Dynamic Field</p></th>
   </tr>
   <tr>
     <td><p>Schema definition</p></td>
     <td><p>A scalar field that must be explicitly declared in the collection schema with the <code>DataType.JSON</code> type.</p></td>
     <td><p>A hidden JSON field (named <code>$meta</code>) that automatically stores undeclared fields.</p></td>
   </tr>
   <tr>
     <td><p>Use case</p></td>
     <td><p>Stores structured data where the schema is known and consistent.</p></td>
     <td><p>Stores flexible, evolving, or semi-structured data that doesn't fit a fixed schema.</p></td>
   </tr>
   <tr>
     <td><p>Control</p></td>
     <td><p>You control the field name and structure.</p></td>
     <td><p>System-managed for undefined fields.</p></td>
   </tr>
   <tr>
     <td><p>Querying</p></td>
     <td><p>Query using your field name or target key inside the JSON field: <code>metadata["key"]</code>.</p></td>
     <td><p>Query directly using the dynamic field key: <code>"dynamic_key"</code> or via <code>$meta</code>: <code>$meta["dynamic_key"]</code></p></td>
   </tr>
</table>

## Basic operations

The fundamental workflow for using a JSON field involves defining it in your schema, inserting data, and then querying the data using specific filter expressions.

### Define a JSON field

To use a JSON field, explicitly define it in your collection schema when creating the collection. The following example demonstrates how to create a collection with a `metadata` field of type `DataType.JSON`:

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(uri="http://localhost:19530") # Replace with your server address 

# Create schema
schema = client.create_schema(auto_id=False, enable_dynamic_field=True)

schema.add_field(field_name="product_id", datatype=DataType.INT64, is_primary=True) # Primary field
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=5) # Vector field
# Define a JSON field that allows null values
# highlight-next-line
schema.add_field(field_name="metadata", datatype=DataType.JSON, nullable=True)

client.create_collection(
    collection_name="product_catalog",
    schema=schema
)
```

<div class="alert note">

In this example, the JSON field defined in the collection schema allows null values with `nullable=True`. For details, refer to [Nullable & Default](nullable-and-default.md).

</div>

### Insert data

Once the collection is created, insert entities that contain structured JSON objects in your designated JSON field. Your data should be formatted as a list of dictionaries.

```python
entities = [
    {
        "product_id": 1,
        "vector": [0.1, 0.2, 0.3, 0.4, 0.5],
        # highlight-start
        "metadata": { # JSON field
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
        # highlight-end
    }
]

client.insert(collection_name="product_catalog", data=entities)
```

### Filtering operations

Before you can perform filtering operations on JSON fields, make sure:

- You have created an index on each vector field.

- The collection is loaded into memory.

<details>

<summary>Show code</summary>

```python
index_params = client.prepare_index_params()
index_params.add_index(
    field_name="vector",
    index_type="AUTOINDEX",
    index_name="vector_index",
    metric_type="COSINE"
)

client.create_index(collection_name="product_catalog", index_params=index_params)

client.load_collection(collection_name="product_catalog")
```

</details>

Once these requirements are met, you can use the expressions below to filter on your collection based on the values within the JSON field. These filter expressions leverage specific JSON path syntax and dedicated operators.

#### Filtering with JSON path syntax

To query a specific key, use bracket notation to access JSON keys: `json_field_name["key"]`. For nested keys, chain them together: `json_field_name["key1"]["key2"]`.

To filter for entities where the `category` is `"electronics"`:

```python
# Define filter expression
filter = 'metadata["category"] == "electronics"'

client.search(
    collection_name="product_catalog",  # Collection name
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],               # Query vector (must match collection's vector dim)
    limit=5,                           # Max. number of results to return
    # highlight-next-line
    filter=filter,                    # Filter expression
    output_fields=["product_id", "metadata"]   # Fields to include in the search results
)
```

To filter for entities where the nested key `supplier["country"]` is `"USA"`:

```python
# Define filter expression
filter = 'metadata["supplier"]["country"] == "USA"'

res = client.search(
    collection_name="product_catalog",  # Collection name
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],               # Query vector (must match collection's vector dim)
    limit=5,                           # Max. number of results to return
    # highlight-next-line
    filter=filter,                    # Filter expression
    output_fields=["product_id", "metadata"]   # Fields to include in the search results
)

print(res)
```

#### Filtering with JSON-specific operators

Milvus also provides special operators for querying array values on specific JSON field keys. For example:

- `json_contains(identifier, expr)`: Checks if a specific element or sub-array exists within a JSON array

- `json_contains_all(identifier, expr)`: Ensures that all elements of the specified JSON expression are present in the field

- `json_contains_any(identifier, expr)`: Filters entities where at least one member of the JSON expression exists within the field

To find a product that has the `"summer_sale"` value under the `tags` key:

```python
# Define filter expression
filter = 'json_contains(metadata["tags"], "summer_sale")'

res = client.search(
    collection_name="product_catalog",  # Collection name
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],               # Query vector (must match collection's vector dim)
    limit=5,                           # Max. number of results to return
    # highlight-next-line
    filter=filter,                    # Filter expression
    output_fields=["product_id", "metadata"]   # Fields to include in the search results
)

print(res)
```

To find a product that has at least one of the `"electronics"`, `"new"`, or `"clearance"` values under the `tags` key:

```python
# Define filter expression
filter = 'json_contains_any(metadata["tags"], ["electronics", "new", "clearance"])'

res = client.search(
    collection_name="product_catalog",  # Collection name
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],               # Query vector (must match collection's vector dim)
    limit=5,                           # Max. number of results to return
    # highlight-next-line
    filter=filter,                    # Filter expression
    output_fields=["product_id", "metadata"]   # Fields to include in the search results
)

print(res)
```

For more information about JSON-specific operators, refer to [JSON Operators](json-operators.md).

## Next: Accelerate JSON queries

By default, queries on JSON fields without acceleration will perform a full scan of all rows, which can be slow on large datasets. To speed up JSON queries, Milvus provides advanced indexing and storage optimization features.

The table below summarizes their differences and best-use scenarios:

<table>
   <tr>
     <th><p>Technique</p></th>
     <th><p>Best For</p></th>
     <th><p>Arrays Acceleration</p></th>
     <th><p>Notes</p></th>
   </tr>
   <tr>
     <td><p>JSON Indexing</p></td>
     <td><p>Small set of frequently accessed keys, arrays on a specific array key</p></td>
     <td><p>Yes (on indexed array key)</p></td>
     <td><p>Must preselect keys, maintenance needed if schema evolves</p></td>
   </tr>
   <tr>
     <td><p>JSON Shredding</p></td>
     <td><p>General speed-up across many keys, flexible for varied queries</p></td>
     <td><p>No (does not accelerate values inside arrays)</p></td>
     <td><p>Extra storage config, arrays still need per-key index</p></td>
   </tr>
   <tr>
     <td><p>NGRAM Index</p></td>
     <td><p>Wildcard searches, substring matching in text fields</p></td>
     <td><p>N/A</p></td>
     <td><p>Not for numeric/range filters</p></td>
   </tr>
</table>

**Tip:** You can combine these approaches—for example, use JSON shredding for broad query acceleration, JSON indexing for high-frequency array keys, and NGRAM indexing for flexible text search.

For implementation details, refer to:

-  [JSON Indexing](json-indexing.md)

- [JSON Shredding](json-shredding.md)

- [NGRAM](ngram.md)

## FAQ

### Are there any limitations on the size of a JSON field?

Yes. Each JSON field is limited to 65,536 bytes.

### Does a JSON field support setting a default value?

No, JSON fields do not support default values. However, you can set `nullable=True` when defining the field to allow empty entries.

Refer to [Nullable & Default](nullable-and-default.md) for details.

### Are there any naming conventions for JSON field keys?

Yes, to ensure compatibility with queries and indexing:

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

