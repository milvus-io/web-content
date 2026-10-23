# StructFieldSchema

Describes a struct field in a collection schema. A struct field groups a set of sub-fields (scalar or vector); each row stores a list of struct values (one per struct element).

```csharp
public sealed class StructFieldSchema
{
    public StructFieldSchema(string name, string description = "")

    public string Name { get; }
    public string Description { get; }
    public int MaxCapacity { get; set; }
    public IList<FieldSchema> Fields { get; }
}
```

**PARAMETERS:**

- `Name` (*string*) -

    The struct field's name.

- `Description` (*string*) -

    An optional description of the struct field.

- `MaxCapacity` (*int*) -

    The maximum number of struct elements a single row may hold.

- `Fields` (*IList\<FieldSchema\>*) -

    The sub-fields of the struct. Sub-fields cannot be primary/partition/clustering keys, cannot be auto-id, nullable, or have a default value. See [FieldSchema](FieldSchema.md).

**METHODS:**

- `StructFieldSchema(string name, string description = "")` -

    Initializes a new struct field schema.
