# DataType

The data type of a field in a collection schema.

```csharp
public enum DataType
{
    None = 0,
    Bool = 1,
    Int8 = 2,
    Int16 = 3,
    Int32 = 4,
    Int64 = 5,
    Float = 10,
    Double = 11,
    String = 20,
    VarChar = 21,
    Array = 22,
    Json = 23,
    Geometry = 24,
    Text = 25,
    Timestamptz = 26,
    BinaryVector = 100,
    FloatVector = 101,
    Float16Vector = 102,
    BFloat16Vector = 103,
    SparseFloatVector = 104,
    Int8Vector = 105,
    Struct = 201
}
```

**Constants:**

- **None** (0)

    No data type specified.

- **Bool** (1)

    A boolean data type.

- **Int8** (2)

    An 8-bit signed integer.

- **Int16** (3)

    A 16-bit signed integer.

- **Int32** (4)

    A 32-bit signed integer.

- **Int64** (5)

    A 64-bit signed integer.

- **Float** (10)

    A 32-bit floating-point number.

- **Double** (11)

    A 64-bit floating-point number.

- **String** (20)

    A string data type, alias of `VarChar`.

- **VarChar** (21)

    A variable-length string with a specified maximum length, declared via `FieldSchema.MaxLength`.

- **Array** (22)

    An array whose elements share a scalar data type, with the element type declared via `FieldSchema.ElementDataType` and the maximum number of elements per row via `FieldSchema.MaxCapacity`.

- **Json** (23)

    A JSON data type.

- **Geometry** (24)

    A geometry data type for spatial data, expressed in GeoJSON.

- **Text** (25)

    A text data type, alias of `VarChar` with analyzer support for full-text search.

- **Timestamptz** (26)

    A timezone-aware timestamp data type.

- **BinaryVector** (100)

    A binary vector whose elements are single bits.

- **FloatVector** (101)

    A float vector whose elements are 32-bit floats.

- **Float16Vector** (102)

    A float vector whose elements are 16-bit floats.

- **BFloat16Vector** (103)

    A float vector whose elements are bfloat16 values.

- **SparseFloatVector** (104)

    A sparse float vector that stores only non-zero elements.

- **Int8Vector** (105)

    A vector whose elements are 8-bit integers.

- **Struct** (201)

    A structured data type that groups multiple fields.
