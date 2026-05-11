# Schema

Represents the schema of a collection, including field definitions, functions, and dynamic field settings.

```go
type Schema struct {
    CollectionName string
    Description string
    AutoID bool
    Fields []*Field
    EnableDynamicField bool
    Functions []*Function
}
```

## Constructor

```go
entity.NewSchema().
    WithName(name).
    WithDescription(desc).
    WithAutoID(autoID).
    WithDynamicFieldEnabled(dynamicEnabled).
    // ...
```

**BUILDER METHODS:**

- `WithName(name string)`

    This sets the name value of schema, returns schema itself.

- `WithDescription(desc string)`

    This sets the description value of schema, returns schema itself.

- `WithAutoID(autoID bool)`

    This enables or disables auto ID generation for the collection. This does not apply to external collections.

- `WithDynamicFieldEnabled(dynamicEnabled bool)`

    This enables or disables dynamic field support for flexible data insertion.

- `WithField(f *[Field](Field.md))`

    This adds a field into schema and returns schema itself.

- `WithFunction(f *[Function](Function.md))`

    This adds a function definition (e.g., BM25, text embedding) to the schema. This does not apply to external collections.

**METHODS:**

- `PKFieldName() string`

    PKFieldName returns pk field name for this schemapb.

- `PKField() *[Field`](Field.md)

    PKField returns PK Field schema for this schema.

## Example

```go
import (
    "github.com/milvus-io/milvus/client/v2/entity"
)

schema := entity.NewSchema().
    WithName("my_collection").
    WithField(entity.NewField().
        WithName("id").
        WithDataType(entity.FieldTypeInt64).
        WithIsPrimaryKey(true)).
    WithField(entity.NewField().
        WithName("embedding").
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(768))
```
