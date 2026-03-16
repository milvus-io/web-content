# FieldType

Enumerates the supported data types for collection fields.

```go
type FieldType int32
```

**VALUES:**

- **FieldTypeNone** = 0

    No type specified.

- **FieldTypeBool** = 1

    Boolean type.

- **FieldTypeInt8** = 2

    8-bit integer type.

- **FieldTypeInt16** = 3

    16-bit integer type.

- **FieldTypeInt32** = 4

    32-bit integer type.

- **FieldTypeInt64** = 5

    64-bit integer type.

- **FieldTypeFloat** = 10

    32-bit floating point type.

- **FieldTypeDouble** = 11

    64-bit floating point type.

- **FieldTypeTimestamptz** = 15

    Timezone-aware timestamp type.

- **FieldTypeString** = 20

    String type (alias for VarChar).

- **FieldTypeVarChar** = 21

    Variable-length string type.

- **FieldTypeArray** = 22

    Array type with a fixed element type.

- **FieldTypeJSON** = 23

    JSON document type.

- **FieldTypeGeometry** = 24

    Geometry spatial type.

- **FieldTypeBinaryVector** = 100

    Binary vector type.

- **FieldTypeFloatVector** = 101

    32-bit float vector type.

- **FieldTypeFloat16Vector** = 102

    16-bit float vector type.

- **FieldTypeBFloat16Vector** = 103

    Brain floating-point 16-bit vector type.

- **FieldTypeSparseVector** = 104

    Sparse vector type.

- **FieldTypeInt8Vector** = 105

    8-bit integer vector type.

- **FieldTypeStruct** = 201

    Struct type with nested fields.

## Example

```go
import (
    "github.com/milvus-io/milvus/client/v2/entity"
)

// Use FieldType when defining collection fields
vectorField := entity.NewField().
    WithName("embedding").
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(768)

pkField := entity.NewField().
    WithName("id").
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(true)

varcharField := entity.NewField().
    WithName("category").
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(256)
```
