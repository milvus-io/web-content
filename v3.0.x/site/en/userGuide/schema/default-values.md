---
id: default-values.md
title: "Default Values"
summary: "Set default values for scalar fields so Milvus fills missing values during entity insertion."
---

# Default Values

Milvus allows you to set default values for scalar fields (excluding the primary field). When a field has a default value configured, Milvus automatically applies this value if no data is provided during insertion.

Default values simplify data migration from other database systems to Milvus by preserving existing default value settings. You can also use default values for fields where values might be uncertain at the time of insertion.

## Limits

- Only scalar fields support default values. The primary field and vector fields cannot have default values.

- `JSON` and `ARRAY` fields do not support default values.

- Default values can only be configured during collection creation and cannot be modified afterward.

## Set default values

When creating a collection, use the `default_value` parameter in `add_field()` to define the default value for a field.

The following example creates a collection with two scalar fields that have default values: `age` defaults to `18` and `status` defaults to `"active"`.

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
# highlight-start
schema.add_field(field_name="age", datatype=DataType.INT64, default_value=18)
schema.add_field(field_name="status", datatype=DataType.VARCHAR, default_value="active", max_length=10)
# highlight-end

# Set index params
index_params = client.prepare_index_params()
index_params.add_index(field_name="vector", index_type="AUTOINDEX", metric_type="L2")

# Create collection
client.create_collection(collection_name="my_collection", schema=schema, index_params=index_params)
```

```java
// java
```

```javascript
// js
```

```go
// go
```

```bash
# restful
```

## Insert entities

When inserting data, if you omit a field that has a default value or explicitly set it to NULL, Milvus automatically uses the configured default value.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
data = [
    # All fields provided explicitly
    {"id": 1, "vector": [0.1, 0.2, 0.3, 0.4, 0.5], "age": 30, "status": "premium"},
    # age and status omitted → both use default values (18 and "active")
    {"id": 2, "vector": [0.2, 0.3, 0.4, 0.5, 0.6]},
    # status set to None → uses default value "active"
    {"id": 3, "vector": [0.3, 0.4, 0.5, 0.6, 0.7], "age": 25, "status": None},
    # age set to None → uses default value 18
    {"id": 4, "vector": [0.4, 0.5, 0.6, 0.7, 0.8], "age": None, "status": "inactive"}
]

client.insert(collection_name="my_collection", data=data)
```

```java
// java
```

```javascript
// js
```

```go
// go
```

```bash
# restful
```

## Search and query with default values

Entities containing default values behave the same as any other entities during vector searches and scalar filtering. You can filter by default values in both `search` and `query` operations.

The following example searches for entities where `age` equals the default value `18`:

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
    filter="age == 18",
    limit=10,
    output_fields=["id", "age", "status"]
)

print("Search results (age == 18):")
for hit in res[0]:
    print(f"  id: {hit['id']}, age: {hit['entity']['age']}, status: {hit['entity']['status']}")
```

```java
// java
```

```javascript
// js
```

```go
// go
```

```bash
# restful
```

<details>

<summary>Expected output</summary>

```plaintext
Output:
Search results (age == 18):
  id: 2, age: 18, status: active
  id: 4, age: 18, status: inactive
```

</details>

You can also query entities by matching default values directly:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Query entities where age equals the default value (18)
default_age_results = client.query(
    collection_name="my_collection",
    filter="age == 18",
    output_fields=["id", "age", "status"]
)

print("\nQuery results (age == 18):")
for r in default_age_results:
    print(f"  id: {r['id']}, age: {r['age']}, status: {r['status']}")

# Query entities where status equals the default value ("active")
default_status_results = client.query(
    collection_name="my_collection",
    filter='status == "active"',
    output_fields=["id", "age", "status"]
)

print("\nQuery results (status == 'active'):")
for r in default_status_results:
    print(f"  id: {r['id']}, age: {r['age']}, status: {r['status']}")
```

```java
// java
```

```javascript
// js
```

```go
// go
```

```bash
# restful
```

<details>

<summary>Expected output</summary>

```plaintext
Query results (age == 18):
  id: 2, age: 18, status: active
  id: 4, age: 18, status: inactive

Query results (status == 'active'):
  id: 2, age: 18, status: active
  id: 3, age: 25, status: active
```

</details>

## Applicable rules

When both `nullable` and `default_value` are configured for a field, the following rules determine how Milvus handles NULL input or missing field values during insertion.

<table>
   <tr>
     <th><p>Nullable</p></th>
     <th><p>Default Value</p></th>
     <th><p>User Input</p></th>
     <th><p>Result</p></th>
   </tr>
   <tr>
     <td><p>✅</p></td>
     <td><p>✅ (non-NULL)</p></td>
     <td><p>NULL or omitted</p></td>
     <td><p>Uses the default value</p></td>
   </tr>
   <tr>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>NULL or omitted</p></td>
     <td><p>Stored as NULL</p></td>
   </tr>
   <tr>
     <td><p>❌</p></td>
     <td><p>✅ (non-NULL)</p></td>
     <td><p>NULL or omitted</p></td>
     <td><p>Uses the default value</p></td>
   </tr>
   <tr>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>NULL or omitted</p></td>
     <td><p>Throws an error</p></td>
   </tr>
   <tr>
     <td><p>❌</p></td>
     <td><p>✅ (NULL)</p></td>
     <td><p>NULL or omitted</p></td>
     <td><p>Throws an error</p></td>
   </tr>
</table>

**Key takeaways:**

- When a field has a non-NULL default value, that value is used regardless of whether `nullable` is enabled.

- When `nullable=True` but no default value is set, the field stores NULL.

- When `nullable=False` and no default value is set, insertion fails with an error.

- Setting a NULL default value on a non-nullable field is invalid and causes an error.
