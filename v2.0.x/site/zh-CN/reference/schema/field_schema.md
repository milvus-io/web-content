---
id: field_schema.md
summary: Learn how to define a field schema in Milvus.
---

# Field Schema

A field schema is the logical definition of a field. It is the first thing you need to define before defining a [collection schema](collection_schema.md) and [creating a collection](create_collection.md). 

Milvus 2.0 supports only one primary key field in a collection.

## Field schema properties

<table class="properties">
	<thead>
	<tr>
		<th>Poperties</td>
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


## Create a field schema

```python
from pymilvus import FieldSchema
id_field = FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, description="primary id")
age_field = FieldSchema(name="age", dtype=DataType.INT64, description="age")
embedding_field = FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=128, description="vector")
```



## Supported data type

`DataType` defines the kind of data a field contains. Different fields support different data types.

- Primary key field supports:
  - INT8: numpy.int8
  - INT16: numpy.int16
  - INT32: numpy.int32
  - INT64: numpy.int64
- Scalar field supports:
  - BOOL: Boolean (`true` or `false`)
  - INT8: numpy.int8
  - INT16: numpy.int16
  - INT32: numpy.int32
  - INT64: numpy.int64
  - FLOAT: numpy.float32
  - DOUBLE: numpy.double
- Vector field supports:
  - BINARY_VECTOR: Binary vector
  - FLOAT_VECTOR: Float vector

