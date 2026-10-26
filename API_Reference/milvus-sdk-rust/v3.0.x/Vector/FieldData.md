# FieldData

Column-oriented field values used in insert and upsert requests and returned in query and search output fields.

```rust
pub enum FieldData {
    Bool { name: String, values: Vec<bool> },
    Int8 { name: String, values: Vec<i8> },
    Int16 { name: String, values: Vec<i16> },
    Int32 { name: String, values: Vec<i32> },
    Int64 { name: String, values: Vec<i64> },
    Float { name: String, values: Vec<f32> },
    Double { name: String, values: Vec<f64> },
    VarChar { name: String, values: Vec<String> },
    Json { name: String, values: Vec<serde_json::Value> },
    Geometry { name: String, values: Vec<String> },
    Timestamptz { name: String, values: Vec<String> },
    ArrayBool { name: String, values: Vec<Vec<bool>> },
    ArrayInt8 { name: String, values: Vec<Vec<i8>> },
    ArrayInt16 { name: String, values: Vec<Vec<i16>> },
    ArrayInt32 { name: String, values: Vec<Vec<i32>> },
    ArrayInt64 { name: String, values: Vec<Vec<i64>> },
    ArrayFloat { name: String, values: Vec<Vec<f32>> },
    ArrayDouble { name: String, values: Vec<Vec<f64>> },
    ArrayVarChar { name: String, values: Vec<Vec<String>> },
    Struct { name: String, values: Vec<Vec<StructValue>> },
    FloatVector { name: String, values: Vec<Vec<f32>> },
    BinaryVector { name: String, values: Vec<Vec<u8>> },
    Float16Vector { name: String, values: Vec<Vec<u16>> },
    BFloat16Vector { name: String, values: Vec<Vec<u16>> },
    SparseFloatVector { name: String, values: Vec<SparseVector> },
    Int8Vector { name: String, values: Vec<Vec<i8>> },
    Nullable { data: Box<FieldData>, valid_data: Vec<bool> },
}
```

Each variant carries the field `name` shared with the collection schema and the `values` for the field in row order.

**VARIANTS:**

- `Bool`

    Boolean values.

- `Int8`

    8-bit signed integer values.

- `Int16`

    16-bit signed integer values.

- `Int32`

    32-bit signed integer values.

- `Int64`

    64-bit signed integer values.

- `Float`

    32-bit floating-point values.

- `Double`

    64-bit floating-point values.

- `VarChar`

    Variable-length UTF-8 string values. Values for `DataType::Text` schema fields are also supplied with this variant.

- `Json`

    JSON document values.

- `Geometry`

    Geometry values encoded as WKT strings.

- `Timestamptz`

    Timestamp-with-timezone values.

- `ArrayBool`

    Array of boolean elements.

- `ArrayInt8`

    Array of 8-bit signed integer elements.

- `ArrayInt16`

    Array of 16-bit signed integer elements.

- `ArrayInt32`

    Array of 32-bit signed integer elements.

- `ArrayInt64`

    Array of 64-bit signed integer elements.

- `ArrayFloat`

    Array of 32-bit floating-point elements.

- `ArrayDouble`

    Array of 64-bit floating-point elements.

- `ArrayVarChar`

    Array of UTF-8 string elements.

- `Struct`

    Struct values, each a list of named sub-field values.

- `FloatVector`

    Dense float vectors, one vector per row.

- `BinaryVector`

    Dense binary vectors stored as packed bytes, one vector per row.

- `Float16Vector`

    Dense half-precision float vectors, one vector per row.

- `BFloat16Vector`

    Dense bfloat16 vectors, one vector per row.

- `SparseFloatVector`

    Sparse float vectors, one per row.

- `Int8Vector`

    Dense int8 vectors, one vector per row.

- `Nullable`

    A nullable field value paired with a per-row validity bitmap.

**METHODS:**

- `name()` (*&str*) -

    Returns the field name shared with the collection schema.

- `len()` (*usize*) -

    Returns the number of values in the field.

- `is_empty()` (*bool*) -

    Whether the field has no values.

- `is_null()` (*bool*) -

    Whether the field carries only null values.

- `inner()` (*&FieldData*) -

    Returns the wrapped field data of a `Nullable` field.

- `valid_data()` (*Option<&[bool]>*) -

    Returns the per-row validity bitmap of a `Nullable` field.

- `nullable()` / `with_validity()` -

    Constructs or converts to a `Nullable` field with a validity bitmap.

**TYPED ACCESSORS:**

- `as_bool()`, `as_int8()`, `as_int16()`, `as_int32()`, `as_int64()`, `as_float()`, `as_double()`, `as_varchar()`, `as_json()`, `as_geometry()`, `as_timestamptz()`, `as_struct()` -

    Each returns `Option<&[...]>` holding the scalar values when the field matches the corresponding variant, or `None` otherwise.

- `as_array_bool()`, `as_array_int8()`, `as_array_int16()`, `as_array_int32()`, `as_array_int64()`, `as_array_float()`, `as_array_double()`, `as_array_varchar()` -

    Each returns `Option<&[Vec<...>]>` holding the array values when the field matches the corresponding array variant, or `None` otherwise.

- `as_float_vectors()`, `as_binary_vectors()`, `as_float16_vectors()`, `as_bfloat16_vectors()`, `as_sparse_float_vectors()`, `as_int8_vectors()` -

    Each returns `Option<&[Vec<...>]>` holding the vectors when the field matches the corresponding vector variant, or `None` otherwise.

## Example

```rust
let columns = vec![
    FieldData::Int64 {
        name: "id".into(),
        values: vec![1, 2],
    },
    FieldData::FloatVector {
        name: "embedding".into(),
        values: vec![vec![0.1, 0.2], vec![0.3, 0.4]],
    },
];
```
