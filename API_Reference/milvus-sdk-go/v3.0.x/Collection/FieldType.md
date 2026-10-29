# FieldType

Enumerates supported Milvus field data types and provides helpers for identifying vector types.

```go
type FieldType int32
```

**Constants:**

- **FieldTypeNone** = 0

    zero value place holder.

- **FieldTypeBool** = 1

    Boolean field type.

- **FieldTypeInt8** = 2

    8-bit signed integer.

- **FieldTypeInt16** = 3

    16-bit signed integer.

- **FieldTypeInt32** = 4

    32-bit signed integer.

- **FieldTypeInt64** = 5

    64-bit signed integer.

- **FieldTypeFloat** = 10

    IEEE 754 32-bit floating-point number.

- **FieldTypeDouble** = 11

    IEEE 754 64-bit floating-point number.

- **FieldTypeString** = 20

    String field type.

- **FieldTypeVarChar** = 21

    Variable-length strings with a specified maximum length.

- **FieldTypeArray** = 22

    Array field type.

- **FieldTypeJSON** = 23

    JSON field type.

- **FieldTypeGeometry** = 24

    Geometry field type.

- **FieldTypeText** = 25

    Variable-length strings without a required max_length.

- **FieldTypeTimestamptz** = 26

    Time-stamped timezone-aware field type.

- **FieldTypeBinaryVector** = 100

    Binary vector field type.

- **FieldTypeFloatVector** = 101

    Float vector field type.

- **FieldTypeFloat16Vector** = 102

    Float16 vector field type.

- **FieldTypeBFloat16Vector** = 103

    BFloat16 vector field type.

- **FieldTypeSparseVector** = 104

    Sparse vector field type.

- **FieldTypeInt8Vector** = 105

    Int8 vector field type.

- **FieldTypeStruct** = 201

    Struct field type.

## Example

Demonstrates FieldType usage.

```go
import (
	"fmt"

	"github.com/milvus-io/milvus/client/v3/entity"
)

fieldType := entity.FieldTypeFloatVector
fmt.Println(fieldType.Name())
fmt.Println(fieldType.IsVectorType())
```

## Notes

- `IsVectorType()` returns true for binary, float, float16, bfloat16, sparse, and int8 vector field types.
- `FieldTypeText` is a variable-length string type that does not require a `max_length`.
