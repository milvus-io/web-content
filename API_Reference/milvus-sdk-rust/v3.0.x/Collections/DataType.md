# DataType

This enum specifies the data type of a collection field. Pass a `DataType` value when constructing a `FieldSchema`.

```rust
pub enum DataType {
    Unknown,
    Bool,
    Int8,
    Int16,
    Int32,
    Int64,
    Float,
    Double,
    VarChar,
    Json,
    Geometry,
    Timestamptz,
    Array,
    Struct,
    FloatVector,
    BinaryVector,
    Float16Vector,
    BFloat16Vector,
    SparseFloatVector,
    Int8Vector,
}
```

**VARIANTS:**

- `Unknown`

    Unspecified or unrecognized field type. This is the default.

- `Bool`

    Boolean value, `true` or `false`.

- `Int8`

    8-bit signed integer.

- `Int16`

    16-bit signed integer.

- `Int32`

    32-bit signed integer.

- `Int64`

    64-bit signed integer.

- `Float`

    32-bit IEEE 754 floating-point number.

- `Double`

    64-bit IEEE 754 floating-point number.

- `VarChar`

    Variable-length UTF-8 string. Constrain its size with `max_length`.

- `Json`

    JSON document stored as-is.

- `Geometry`

    Geometry value used by spatial queries (WKT-encoded).

- `Timestamptz`

    Timestamp with timezone.

- `Array`

    Array of scalar elements, all with the same element type.

- `Struct`

    Nested struct of named sub-fields.

- `FloatVector`

    Dense vector of 32-bit floats.

- `BinaryVector`

    Dense binary vector stored as packed bytes.

- `Float16Vector`

    Dense vector of IEEE 754 half-precision floats.

- `BFloat16Vector`

    Dense vector of bfloat16 values.

- `SparseFloatVector`

    Sparse vector stored as a map of dimension index to float value.

- `Int8Vector`

    Dense vector of 8-bit signed integers.

## Example

```rust
let schema = CollectionSchema::new()
    .add_field(FieldSchema::new().name("id").data_type(DataType::Int64).primary_key(true))
    .add_field(FieldSchema::new().name("embedding").data_type(DataType::FloatVector).dimension(4));
```
