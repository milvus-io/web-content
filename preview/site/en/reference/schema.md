---
id: schema.md
summary: Learn how to define a schema in Milvus.
---

# Schema

This topic introduces schema in Milvus. Schema is used to define the properties of a collection and the fields within.


## Field schema

A field schema is the logical definition of a field. It is the first thing you need to define before defining a [collection schema](#Collection-schema) and [creating a collection](create_collection.md). 

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
		<td>name</td>
		<td>Name of the field in the collection to create</td>
		<td>Data type: String.<br/>Mandatory</td>
	</tr>
	<tr>
		<td>dtype</td>
		<td>Data type of the field</td>
		<td>Mandatory</td>
	</tr>
    <tr>
		<td>description</td>
		<td>Description of the field</td>
		<td>Data type: String.<br/>Optional</td>
	</tr>
    <tr>
		<td>is_primary</td>
		<td>Whether to set the field as the primary key field or not</td>
		<td>Data type: Boolean (<code>true</code> or <code>false</code>).<br/>Mandatory for the primary key field</td>
	</tr>
	<tr>
		<td>dim</td>
		<td>Dimension of the vector</td>
    <td>Data type: Integer &isin;[1, 32768].<br/>Mandatory for the vector field</td>
	</tr>
	</tbody>
</table>


### Create a field schema

```python
from pymilvus import FieldSchema
id_field = FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, description="primary id")
age_field = FieldSchema(name="age", dtype=DataType.INT64, description="age")
embedding_field = FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=128, description="vector")
```



### Supported data type

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
- Vector field supports:
  - BINARY_VECTOR: Binary vector
  - FLOAT_VECTOR: Float vector

## Collection schema

A collection schema is the logical definition of a collection. Usually you need to define the [field schema](#Field-schema) before defining a collection schema and [creating a collection](create_collection.md). 


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
		<td>field</td>
		<td>Fields in the collection to create</td>
		<td>Mandatory</td>
	</tr>
    <tr>
		<td>description</td>
		<td>Description of the collection</td>
		<td>Data type: String.<br/>Optional</td>
	</tr>
    <tr>
		<td>auto_id</td>
		<td>Whether to enable Automatic ID (primary key) allocation or not</td>
		<td>Data type: Boolean (<code>true</code> or <code>false</code>).<br/>Optional</td>
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
schema = CollectionSchema(fields=[id_field, age_field, embedding_field], auto_id=False, description="desc of a collection")
```

Create a collection with the schema specified:

```python
from pymilvus import Collection
collection_name1 = "tutorial_1"
collection1 = Collection(name=collection_name1, schema=schema, using='default', shards_num=2)
```
<div class="alert note">
  You can define the shard number with <code>shards_num</code> and in which Milvus server you wish to create a collection by specifying the alias in <code>using</code>.
  </div>
  
<br/>
You can also create a collection with <code>Collection.construct_from_dataframe</code>, which automatically generates a collection schema from DataFrame and creates a collection.

```python
import pandas as pd
df = pd.DataFrame({
        "id": [i for i in range(nb)],
        "age": [random.randint(20, 40) for i in range(nb)],
        "embedding": [[random.random() for _ in range(dim)] for _ in range(nb)]
    })
collection, ins_res = Collection.construct_from_dataframe(
                                'my_collection',
                                df,
                                primary_field='id',
                                auto_id=False
                                )
```

## What's next

- Learn how to prepare schema when [creating a collection](create_collection.md).

