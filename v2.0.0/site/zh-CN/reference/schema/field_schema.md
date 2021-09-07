---
id: field_schema.md
---

# Field Schema

A field schema is the logical definition of a field. It is the first thing you need to define before defining a [collection schema](collection_schema.md) and [creating a collection](create.md). 

A field schema defines the name, data type, and other properties of a field.

- For primary key field, you need to specfy the name, data type, primary key setting, and the description of the field.

- For scalar field,  you need to specfy the name, data type, and the description of the field.

- For vector field, you need to specfy the name, data type, vector dimension, and the description of the field.



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

