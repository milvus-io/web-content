# Field

Defines a field in a collection schema, including its data type, constraints, and indexing properties.

```go
type Field struct {
    ID int64
    Name string
    PrimaryKey bool
    AutoID bool
    Description string
    DataType FieldType
    TypeParams map[string]string
    IndexParams map[string]string
    IsDynamic bool
    IsPartitionKey bool
    IsClusteringKey bool
    ElementType FieldType
    DefaultValue *schemapb.ValueField
    Nullable bool
    StructSchema *StructSchema
}
```

## Constructor

```go
entity.NewField().
    WithName(name).
    WithDescription(desc).
    WithDataType(dataType).
    WithIsPrimaryKey(isPrimaryKey).
    // ...
```

**BUILDER METHODS:**

- `WithName(name string)`

    Sets the name of the field.

- `WithDescription(desc string)`

    Sets the description of the field.

- `WithDataType(dataType [FieldType](FieldType.md))`

    Sets the data type of the field (e.g., Int64, VarChar, FloatVector).

- `WithIsPrimaryKey(isPrimaryKey bool)`

    Sets whether this field is the primary key.

- `WithIsAutoID(isAutoID bool)`

    Enables auto ID generation for this field.

- `WithIsDynamic(isDynamic bool)`

    Marks this as a dynamic field.

- `WithIsPartitionKey(isPartitionKey bool)`

    Sets this field as a partition key for data routing.

- `WithIsClusteringKey(isClusteringKey bool)`

    Sets this field as a clustering key for data organization.

- `WithNullable(nullable bool)`

    Sets whether this field allows null values.

- `WithDefaultValueBool(defaultValue bool)`

    Sets the default value for the field.

- `WithDefaultValueInt(defaultValue int32)`

    Sets the default value for the field.

- `WithDefaultValueLong(defaultValue int64)`

    Sets the default value for the field.

- `WithDefaultValueFloat(defaultValue float32)`

    Sets the default value for the field.

- `WithDefaultValueDouble(defaultValue float64)`

    Sets the default value for the field.

- `WithDefaultValueTimestamptz(defaultValue int64)`

    Sets the default value for the field.

- `WithDefaultValueString(defaultValue string)`

    Sets the default value for the field.

- `WithTypeParams(key string, value string)`

    Sets a type parameter key-value pair for the field.

- `WithDim(dim int64)`

    Sets the vector dimension for this field.

- `WithMaxLength(maxLen int64)`

    Sets the maximum character length for varchar fields.

- `WithElementType(eleType [FieldType](FieldType.md))`

    Sets the element type for array fields.

- `WithMaxCapacity(maxCap int64)`

    Sets the maximum capacity for array fields.

- `WithEnableAnalyzer(enable bool)`

    Enables the text analyzer for full-text search on this field.

- `WithAnalyzerParams(params map[string]any)`

    Sets the analyzer parameters for text processing.

- `WithMultiAnalyzerParams(params map[string]any)`

    Sets multiple analyzer configurations for the field.

- `WithEnableMatch(enable bool)`

    Enables text matching for this field.

- `WithStructSchema(schema *StructSchema)`

    Sets the struct schema for struct-type fields.

**METHODS:**

- `GetDim() int64, error`

    Get dim.

## Example

```go
import (
    "github.com/milvus-io/milvus/client/v2/entity"
)

// Primary key field
pkField := entity.NewField().
    WithName("id").
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(true)

// Vector field
vectorField := entity.NewField().
    WithName("embedding").
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(768)

// Scalar field with max length
varcharField := entity.NewField().
    WithName("category").
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(256)
```
