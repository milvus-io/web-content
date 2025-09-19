---
id: json-indexing.md
title: "JSON Indexing"
summary: "JSON fields provide a flexible way to store structured metadata in Milvus. Without indexing, queries on JSON fields require full collection scans, which become slow as your dataset grows. JSON indexing enables fast lookups by creating indexes on within your JSON data."
---

# JSON Indexing

JSON fields provide a flexible way to store structured metadata in Milvus. Without indexing, queries on JSON fields require full collection scans, which become slow as your dataset grows. JSON indexing enables fast lookups by creating indexes on within your JSON data.

JSON indexing is ideal for:

- Structured schemas with consistent, known keys

- Equality and range queries on specific JSON paths

- Scenarios where you need precise control over which keys are indexed

- Storage-efficient acceleration of targeted queries

<div class="alert note">

For complex JSON documents with diverse query patterns, consider [JSON Shredding](json-shredding.md) as an alternative.

</div>

## JSON indexing syntax

When you create a JSON index, you specify:

- **JSON path**: The exact location of the data you want to index

- **Data cast type**: How to interpret and store the indexed values

- **Optional type conversion**: Transform data during indexing if needed

Here's the syntax to index a JSON field:

```python
# Prepare index params
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name="<json_field_name>",  # Name of the JSON field
    index_type="AUTOINDEX",  # Must be AUTOINDEX or INVERTED
    index_name="<unique_index_name>",  # Index name
    params={
        "json_path": "<path_to_json_key>",  # Specific key to be indexed within JSON data
        "json_cast_type": "<data_type>",  # Data type to use when interpreting and indexing the value
        # "json_cast_function": "<cast_function>"  # Optional: convert key values into a target type at index time
    }
)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value / Example</p></th>
   </tr>
   <tr>
     <td><p><code>field_name</code></p></td>
     <td><p>The name of your JSON field in the collection schema.</p></td>
     <td><p><code>"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code>index_type</code></p></td>
     <td><p>Must be <code>"AUTOINDEX"</code> or <code>"INVERTED"</code> for JSON indexing.</p></td>
     <td><p><code>"AUTOINDEX"</code></p></td>
   </tr>
   <tr>
     <td><p><code>index_name</code></p></td>
     <td><p>Unique identifier for this index.</p></td>
     <td><p><code>"category_index"</code></p></td>
   </tr>
   <tr>
     <td><p><code>json_path</code></p></td>
     <td><p>The path to the key you want to index within your JSON object.</p></td>
     <td><ul><li><p>Top-level key: <code>'metadata["category"]'</code></p></li><li><p>Nested key: <code>'metadata["supplier"]["contact"]["email"]'</code></p></li><li><p>Entire JSON object: <code>"metadata"</code></p></li><li><p>Sub-object: <code>'metadata["supplier"]'</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><code>json_cast_type</code></p></td>
     <td><p>The data type to use when interpreting and indexing the value. Must match the actual data type of the key.</p><p>For a list of available cast types, see <a href="json-indexing.md#Supported-cast-types">Supported cast types</a><a href="json-indexing.md#Supported-cast-types"> below</a>.</p></td>
     <td><p><code>"VARCHAR"</code></p></td>
   </tr>
   <tr>
     <td><p><code>json_cast_function</code></p></td>
     <td><p><strong>(Optional)</strong> Converts original key values to a target type at index time. This config is required only when key values are stored in a wrong format and you want to convert the data type during indexing.</p><p>For a list of available cast functions, see <a href="json-indexing.md#Supported-cast-functions">Supported cast functions below</a>.</p></td>
     <td><p><code>"STRING_TO_DOUBLE"</code></p></td>
   </tr>
</table>

### Supported cast types

Milvus supports the following data types for casting at index time. These types ensure that your data is interpreted correctly for efficient filtering.

<table>
   <tr>
     <th><p>Cast Type</p></th>
     <th><p>Description</p></th>
     <th><p>Example JSON Value</p></th>
   </tr>
   <tr>
     <td><p><code>BOOL</code> / <code>bool</code></p></td>
     <td><p>Used to index boolean values, enabling queries that filter on true/false conditions.</p></td>
     <td><p><code>true</code>, <code>false</code></p></td>
   </tr>
   <tr>
     <td><p><code>DOUBLE</code> / <code>double</code></p></td>
     <td><p>Used for numeric values, including both integers and floating-point numbers. It enables filtering based on ranges or equality (e.g., <code>&gt;</code>, <code>&lt;</code>, <code>==</code>).</p></td>
     <td><p><code>42</code>, <code>99.99</code></p></td>
   </tr>
   <tr>
     <td><p><code>VARCHAR</code> / <code>varchar</code></p></td>
     <td><p>Used to index string values, which is common for text-based data like names, categories, or IDs.</p></td>
     <td><p><code>"electronics"</code>, <code>"BrandA"</code></p></td>
   </tr>
   <tr>
     <td><p><code>ARRAY_BOOL</code> / <code>array_bool</code></p></td>
     <td><p>Used to index an array of boolean values.</p></td>
     <td><p><code>[true, false, true]</code></p></td>
   </tr>
   <tr>
     <td><p><code>ARRAY_DOUBLE</code> / <code>array_double</code></p></td>
     <td><p>Used to index an array of numeric values.</p></td>
     <td><p><code>[1.2, 3.14, 42]</code></p></td>
   </tr>
   <tr>
     <td><p><code>ARRAY_VARCHAR</code> / <code>array_varchar</code></p></td>
     <td><p>Used to index an array of strings, which is ideal for a list of tags or keywords.</p></td>
     <td><p><code>["tag1", "tag2", "tag3"]</code></p></td>
   </tr>
   <tr>
     <td><p><code>JSON</code> / <code>json</code></p></td>
     <td><p>Entire JSON objects or sub-objects with automatic type inference and flattening.</p><p>Indexing entire JSON objects increases index size. For many-key scenarios, consider <a href="json-shredding.md">JSON Shredding</a>.</p></td>
     <td><p>Any JSON object</p></td>
   </tr>
</table>

<div class="alert note">

Arrays should contain elements of the same type for optimal indexing. For more information, refer to [Array Field](array_data_type.md).

</div>

### Supported cast functions

If your JSON field key contains values in an incorrect format (e.g., numbers stored as strings), you can pass a cast function to the `json_cast_function` argument to convert these values at index time.

Cast functions are case-insensitive. The following functions are supported:

<table>
   <tr>
     <th><p>Cast Function</p></th>
     <th><p>Converts From → To</p></th>
     <th><p>Use Case</p></th>
   </tr>
   <tr>
     <td><p><code>STRING_TO_DOUBLE</code> / <code>string_to_double</code></p></td>
     <td><p>String → Numeric (double)</p></td>
     <td><p>Convert <code>"99.99"</code> to <code>99.99</code></p></td>
   </tr>
</table>

<div class="alert note">

If conversion fails (e.g., non-numeric string), the value is skipped and not indexed.

</div>

## Create JSON indexes

This section demonstrates how to create indexes on different types of JSON data using practical examples. All examples use the sample JSON structure shown below and assume you've already established a connection to **MilvusClient** with a properly defined collection schema.

### Sample JSON structure

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

### Basic setup

Before creating any JSON indexes, prepare your index parameters:

```python
# Prepare index params
index_params = MilvusClient.prepare_index_params()
```

### Example 1: Index a simple JSON key

Create an index on the `category` field to enable fast filtering by product category:

```python
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="AUTOINDEX", # Must be set to AUTOINDEX or INVERTED for JSON path indexing
    index_name="category_index",  # Unique index name
    # highlight-start
    params={
        "json_path": 'metadata["category"]', # Path to the JSON key
        "json_cast_type": "varchar" # Data cast type
    }
    # highlight-end
)
```

### Example 2: Index a nested key

Create an index on the deeply nested `email` field for supplier contact searches:

```python
# Index the nested key
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="AUTOINDEX", # Must be set to AUTOINDEX or INVERTED for JSON path indexing
    index_name="email_index", # Unique index name
    # highlight-start
    params={
        "json_path": 'metadata["supplier"]["contact"]["email"]', # Path to the nested JSON key
        "json_cast_type": "varchar" # Data cast type
    }
    # highlight-end
)
```

### Example 3: Convert data type at index time

Sometimes numeric data is mistakenly stored as strings. Use the `STRING_TO_DOUBLE` cast function to convert and index it properly:

```python
# Convert string numbers to double for indexing
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="AUTOINDEX", # Must be set to AUTOINDEX or INVERTED for JSON path indexing
    index_name="string_to_double_index", # Unique index name
    params={
        "json_path": 'metadata["string_price"]', # Path to the JSON key to be indexed
        "json_cast_type": "double", # Data cast type
        # highlight-next-line
        "json_cast_function": "STRING_TO_DOUBLE" # Cast function; case insensitive
    }
)
```

**Important**: If conversion fails for any document (e.g., a non-numeric string like `"invalid"`), that document's value will be excluded from the index and won't appear in filtered results.

### Example 4: Index entire objects

Index the complete JSON object to enable queries on any field within it. When you use `json_cast_type="JSON"`, the system automatically:

- **Flattens the JSON structure**: Nested objects are converted into flat paths for efficient indexing

- **Infers data types**: Each value is automatically categorized as numeric, string, boolean, or date based on its content

- **Creates comprehensive coverage**: All keys and nested paths within the object become searchable

For the [sample JSON structure](json-indexing.md#Sample-JSON-structure) above, index the entire `metadata` object:

```python
# Index the entire JSON object
index_params.add_index(
    field_name="metadata",
    index_type="AUTOINDEX",
    index_name="metadata_full_index",
    params={
        # highlight-start
        "json_path": "metadata",
        "json_cast_type": "JSON"
        # highlight-end
    }
)
```

You can also index only a portion of the JSON structure, such as all `supplier` information:

```python
# Index a sub-object
index_params.add_index(
    field_name="metadata",
    index_type="AUTOINDEX", 
    index_name="supplier_index",
    params={
        # highlight-start
        "json_path": 'metadata["supplier"]',
        "json_cast_type": "JSON"
        # highlight-end
    }
)
```

### Apply index configuration

After defining all your index parameters, apply them to your collection:

```python
# Apply all index configurations to the collection
MilvusClient.create_index(
    collection_name="your_collection_name",
    index_params=index_params
)
```

Once indexing completes, your JSON field queries will automatically use these indexes for faster performance.

## FAQ

### What happens if a query's filter expression uses a different type than the indexed cast type?

If your filter expression uses a different type than the index's `json_cast_type`, Milvus will not use the index and may fall back to a slower brute-force scan if the data allows. For best performance, always align your filter expression with the cast type of the index. For example, if a numeric index is created with `json_cast_type="double"`, only numeric filter conditions will leverage the index.

### When creating a JSON index, what if a JSON key has inconsistent data types across different entities?

Inconsistent types can lead to **partial indexing**. For example, if a `metadata["price"]` field is stored as both a number (`99.99`) and a string (`"99.99"`) and you create an index with `json_cast_type="double"`, only the numeric values will be indexed. The string-form entries will be skipped and will not appear in filter results.

### Can I create multiple indexes on the same JSON key?

No, each JSON key supports only one index. You must choose a single `json_cast_type` that matches your data. However, you can create an index on the entire JSON object and an index on a nested key within that object.

### Does a JSON field support setting a default value?

No, JSON fields do not support default values. However, you can set `nullable=True` when defining the field to allow for empty entries. For more information, refer to [Nullable & Default](nullable-and-default.md).