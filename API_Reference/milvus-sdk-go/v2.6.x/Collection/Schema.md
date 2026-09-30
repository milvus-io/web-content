# Schema

Defines a collection schema and validates struct-array fields before collection creation.

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

## Request Syntax

Creates an empty collection schema.

```go
entity.NewSchema()
```

**METHODS:**

- `WithName(name string) *Schema`

    This sets the collection name.

- `WithDescription(desc string) *Schema`

    This sets the collection description.

- `WithAutoID(autoID bool) *Schema`

    This sets whether Milvus automatically generates primary keys.

- `WithDynamicFieldEnabled(dynamicEnabled bool) *Schema`

    This enables or disables the dynamic field.

- `WithField(field *Field) *Schema`

    This appends a field definition to the schema.

- `WithFunction(function *Function) *Schema`

    This appends a built-in function definition to the schema.

- `Validate() error`

    This validates struct-array sub-fields and returns an error for unsupported nesting or top-level-only flags.

- `PKFieldName() string`

    This returns the primary-key field name.

- `PKField() *Field`

    This returns the primary-key field definition.

**RETURN TYPE:**

*Schema*

**RETURNS:**

Represents the schema of a collection, including field definitions, functions, and dynamic field settings.

- **CollectionName** (*string*) -

    This stores the collection name.

- **Description** (*string*) -

    This stores the collection description.

- **AutoID** (*bool*) -

    This indicates whether Milvus automatically generates primary keys.

- **Fields** (*[]*Field*) -

    This contains the collection field definitions.

- **EnableDynamicField** (*bool*) -

    This indicates whether the dynamic field is enabled.

- **Functions** (*[]*Function*) -

    This contains the built-in function definitions.

## Example

Demonstrates Schema usage.

```go
import (
	"fmt"

	"github.com/milvus-io/milvus/client/v2/entity"
)

structSchema := entity.NewStructSchema().
	WithField(entity.NewField().WithName("embedding").WithDataType(entity.FieldTypeFloatVector).WithDim(8))

schema := entity.NewSchema().
	WithField(entity.NewField().WithName("chunks").WithDataType(entity.FieldTypeArray).WithElementType(entity.FieldTypeStruct).WithStructSchema(structSchema))

err := schema.Validate()
fmt.Println(err)
```

## Notes

- Struct-array decoding restores the original scalar or vector element types, and parent `max_capacity` is propagated to sub-fields when needed.

