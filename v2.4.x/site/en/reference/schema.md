---
id: schema.md
summary: Learn how to define a schema in Milvus.
title: Manage Schema
---

# Manage Schema

This topic introduces schema in Milvus. Schema is used to define the properties of a collection and the fields within.


## Field schema

A field schema is the logical definition of a field. It is the first thing you need to define before defining a [collection schema](#Collection-schema) and [managing collections](manage-collections.md). 

Milvus supports only one primary key field in a collection.

### Field schema properties

<table class="properties">
	<thead>
	<tr>
		<th>Properties</td>
		<th>Description</th>
		<th>Note</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>name</code></td>
		<td>Name of the field in the collection to create</td>
		<td>Data type: String.<br/>Mandatory</td>
	</tr>
	<tr>
		<td><code>dtype</code></td>
		<td>Data type of the field</td>
		<td>Mandatory</td>
	</tr>
    <tr>
		<td><code>description</code></td>
		<td>Description of the field</td>
		<td>Data type: String.<br/>Optional</td>
	</tr>
    <tr>
		<td><code>is_primary</code></td>
		<td>Whether to set the field as the primary key field or not</td>
		<td>Data type: Boolean (<code>true</code> or <code>false</code>).<br/>Mandatory for the primary key field</td>
	</tr>
        <tr>
	        <td><code>auto_id</code> (Mandatory for primary key field)</td>
        	<td>Switch to enable or disable automatic ID (primary key) allocation.</td>
        	<td><code>True</code> or <code>False</code></td>
        </tr>
        <tr>
        	<td><code>max_length</code> (Mandatory for VARCHAR field)</td>
        	<td>Maximum length of strings allowed to be inserted.</td>
        	<td>[1, 65,535]</td>
        </tr>
	<tr>
		<td><code>dim</code></td>
		<td>Dimension of the vector</td>
    		<td>Data type: Integer &isin;[1, 32768].<br/>Mandatory for a dense vector field. Omit for a <a href="https://milvus.io/docs/sparse_vector.md">sparse vector</a> field.</td>
	</tr>
	<tr>
		<td><code>is_partition_key</code></td>
		<td>Whether this field is a partition-key field.</td>
		<td>Data type: Boolean (<code>true</code> or <code>false</code>).</td>
	</tr>
	</tbody>
</table>


### Create a field schema

To reduce the complexity in data inserts, Milvus allows you to specify a default value for each scalar field during field schema creation, excluding the primary key field. This indicates that if you leave a field empty when inserting data, the default value you specified for this field applies.

Create a regular field schema:

```python
from pymilvus import FieldSchema
id_field = FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, description="primary id")
age_field = FieldSchema(name="age", dtype=DataType.INT64, description="age")
embedding_field = FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=128, description="vector")

# The following creates a field and use it as the partition key
position_field = FieldSchema(name="position", dtype=DataType.VARCHAR, max_length=256, is_partition_key=True)
```

Create a field schema with default field values:

```python
from pymilvus import FieldSchema

fields = [
  FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
  # configure default value `25` for field `age`
  FieldSchema(name="age", dtype=DataType.INT64, default_value=25, description="age"),
  embedding_field = FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=128, description="vector")
]
```

### Supported data types

`DataType` defines the kind of data a field contains. Different fields support different data types.

- Primary key field supports:
  - INT64: numpy.int64
  - VARCHAR: VARCHAR
- Scalar field supports:
  - BOOL: Boolean (`true` or `false`)
  - INT8: numpy.int8
  - INT16: numpy.int16
  - INT32: numpy.int32
  - INT64: numpy.int64
  - FLOAT: numpy.float32
  - DOUBLE: numpy.double
  - VARCHAR: VARCHAR
  - JSON: [JSON](use-json-fields.md)
  - Array: [Array](array_data_type.md)

  JSON as a composite data type is available. A JSON field comprises key-value pairs. Each key is a string, and a value can be a number, string, boolean value, array, or list. For details, refer to [JSON: a new data type](use-json-fields.md).
  
- Vector field supports:
  - BINARY_VECTOR: Stores binary data as a sequence of 0s and 1s, used for compact feature representation in image processing and information retrieval.
  - FLOAT_VECTOR: Stores 32-bit floating-point numbers, commonly used in scientific computing and machine learning for representing real numbers.
  - FLOAT16_VECTOR: Stores 16-bit half-precision floating-point numbers, used in deep learning and GPU computations for memory and bandwidth efficiency.
  - BFLOAT16_VECTOR: Stores 16-bit floating-point numbers with reduced precision but the same exponent range as Float32, popular in deep learning for reducing memory and computational requirements without significantly impacting accuracy.
  - SPARSE_FLOAT_VECTOR: Stores a list of non-zero elements and their corresponding indices, used for representing sparse vectors. For more information, refer to [Sparse Vectors](sparse_vector.md).

  Milvus supports multiple vector fields in a collection. For more information, refer to [Hybrid Search](multi-vector-search.md).

## Collection schema

A collection schema is the logical definition of a collection. Usually you need to define the [field schema](#Field-schema) before defining a collection schema and [managing collections](manage-collections.md).

### Collection schema properties

<table class="properties">
	<thead>
	<tr>
		<th>Properties</td>
		<th>Description</th>
		<th>Note</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>field</code></td>
		<td>Fields in the collection to create</td>
		<td>Mandatory</td>
	</tr>
    <tr>
		<td><code>description</code></td>
		<td>Description of the collection</td>
		<td>Data type: String.<br/>Optional</td>
	</tr>
    <tr>
		<td><code>partition_key_field</code></td>
		<td>Name of a field that is designed to act as the partition key.</td>
		<td>Data type: String.<br/>Optional</td>
	</tr>
    <tr>
		<td><code>enable_dynamic_field</code></td>
		<td>Whether to enable dynamic schema or not</td>
		<td>Data type: Boolean (<code>true</code> or <code>false</code>).<br/>Optional, defaults to <code>False</code>.<br/>For details on dynamic schema, refer to <a herf="enable-dynamic-field.md">Dynamic Schema</a> and the user guides for managing collections.</td>
	</tr>
	</tbody>
</table>

### Create a collection schema

<div class="alert note">
  Define the field schemas before defining a collection schema.
</div>

```python
from pymilvus import FieldSchema, CollectionSchema
id_field = FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, description="primary id")
age_field = FieldSchema(name="age", dtype=DataType.INT64, description="age")
embedding_field = FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=128, description="vector")

# Enable partition key on a field if you need to implement multi-tenancy based on the partition-key field
position_field = FieldSchema(name="position", dtype=DataType.VARCHAR, max_length=256, is_partition_key=True)

# Set enable_dynamic_field to True if you need to use dynamic fields. 
schema = CollectionSchema(fields=[id_field, age_field, embedding_field], auto_id=False, enable_dynamic_field=True, description="desc of a collection")
```

Create a collection with the schema specified:

```python
from pymilvus import Collection
collection_name1 = "tutorial_1"
collection1 = Collection(name=collection_name1, schema=schema, using='default', shards_num=2)
```
<div class="alert note">

  - You can define the shard number with <code>shards_num</code>.
  - You can define the Milvus server on which you wish to create a collection by specifying the alias in <code>using</code>.
  - You can enable the partition key feature on a field by setting <code>is_partition_key</code> to <code>True</code> on the field if you need to implement [partition-key-based multi-tenancy](multi_tenancy.md).
  - You can enable dynamic schema by setting <code>enable_dynamic_field</code> to <code>True</code> in the collection schema if you need to [enable dynamic field](enable-dynamic-field.md).

</div>
  
<br/>
You can also create a collection with <code>Collection.construct_from_dataframe</code>, which automatically generates a collection schema from DataFrame and creates a collection.

```python
import pandas as pd
df = pd.DataFrame({
    "id": [i for i in range(nb)],
    "age": [random.randint(20, 40) for i in range(nb)],
    "embedding": [[random.random() for _ in range(dim)] for _ in range(nb)],
    "position": "test_pos"
})

collection, ins_res = Collection.construct_from_dataframe(
    'my_collection',
    df,
    primary_field='id',
    auto_id=False
    )
```

## What's next

- Learn how to prepare schema when [managing collections](manage-collections.md).
- Read more about [dynamic schema](enable-dynamic-field.md).
- Read more about partition-key in [Multi-tenancy](multi_tenancy.md).
