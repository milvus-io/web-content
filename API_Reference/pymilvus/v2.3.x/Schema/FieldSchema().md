# FieldSchema()

This is the constructor method to create a FieldSchema.

## Invocation

```python
FieldSchema(name, dtype, is_primary, description='', default_value, **kwargs)
```

## Return

A FieldSchema object.

### Properties

| Property             | Description                                                                  |
| -------------------- | ---------------------------------------------------------------------------- |
| `name`               | Name of the field                                                            |
| `dtype`              | Data type of the field to create                                             |
| `is_primary`         | Boolean value that indicates if the field is the primary key field           |
| `is_partition_key`   | Boolean value that indicates if the field is a partition-key field.          |
| `description`        | Description of the field to create                                           |
| `default_value`      | Default value of the field. This parameter supports only for scalar fields except array and JSON formats. You cannot specify a default value for a primary key field.                                           |

## Example

```python
from pymilvus import CollectionSchema, FieldSchema, DataType
book_id = FieldSchema(
  name="book_id", 
  dtype=DataType.INT64, 
  is_primary=True, 
)
book_name = FieldSchema(
  name="book_name", 
  dtype=DataType.VARCHAR, 
  max_length=200, #max_length must be specified to limit the max length of VARCHAR. The value should be in (0, 65535].
  # The default value will be used if this field is left empty during data inserts or upserts.
  # The data type of `default_value` must be the same as that specified in `dtype`. 
  default_value="Unknown"
)

word_count = FieldSchema(
  name="word_count", 
  dtype=DataType.INT64,
  # The default value will be used if this field is left empty during data inserts or upserts.
  # The data type of `default_value` must be the same as that specified in `dtype`.
  default_value=9999  
)

book_intro = FieldSchema(
  name="book_intro", 
  dtype=DataType.FLOAT_VECTOR, 
  dim=2
)

schema = CollectionSchema(
  fields=[book_id, word_count, book_intro], 
  description="Test book search",
  enable_dynamic_field=True
)
```

## Supported data type

`DataType` defines the kind of data a field contains. Different fields support different data types.

Primary key field supports:
- INT64: numpy.int64
- VARCHAR: VARCHAR

Scalar field supports:
- BOOL: Boolean (true or false)
- INT8: numpy.int8
- INT16: numpy.int16
- INT32: numpy.int32
- INT64: numpy.int64
- FLOAT: numpy.float32
- DOUBLE: numpy.double
- VARCHAR: VARCHAR

You can create a JSON field, comprising key-value pairs. Each key should be a string and values can be numbers, strings, boolean values, arrays, and lists. For details, read ["JSON: a new data type"](dynamic_schema#Json-a-new-data-type).

Vector field supports:
- BINARY_VECTOR: Binary vector
- FLOAT_VECTOR: Float vector
