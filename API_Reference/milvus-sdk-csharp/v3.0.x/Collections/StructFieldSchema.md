# StructFieldSchema

Describes a struct field in a collection schema. A struct field groups a set of sub-fields (scalar or vector); each row stores a list of struct values (one per struct element).

```csharp
public sealed class StructFieldSchema
{
    public StructFieldSchema(string name, string description = "")

    public string Name { get; }
    public string Description { get; }
    public int MaxCapacity { get; set; }
    public bool Nullable { get; set; }
    public IDictionary<string, string> TypeParams { get; }
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

- `Nullable` (*bool*) -

    Whether the struct field is nullable (row-level nullability: a whole struct row may be null). A struct field added to an existing collection (via `AddCollectionStructFieldAsync`) must be nullable. The nullable flag is propagated to every sub-field's wire `nullable` flag; a sub-field's own element-level nullability travels independently on the wire `element_nullable`, see [FieldSchema](FieldSchema.md).

- `TypeParams` (*IDictionary\<string, string\>*) -

    Additional per-struct `type_params` to send on the wire, mirroring the Java SDK's `StructFieldSchema.typeParams`. Supported keys include `warmup` and `mmap.enabled`.

- `Fields` (*IList\<FieldSchema\>*) -

    The sub-fields of the struct. Sub-fields can be scalar, vector, or nested Array types. A scalar/vector sub-field uses its own `FieldSchema.Nullable` to allow null element values; a nested Array sub-field additionally uses `FieldSchema.ElementNullable` to allow null values inside each inner array and requires `FieldSchema.MaxCapacity` for the inner array capacity. Sub-fields cannot be primary/partition/clustering keys, auto-id, or have a default value. See [FieldSchema](FieldSchema.md).

**METHODS:**

- `StructFieldSchema(string name, string description = "")` -

    Initializes a new struct field schema.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});

var structField = new StructFieldSchema("book_info", "Per-book metadata");
structField.MaxCapacity = 5;
structField.Fields.Add(FieldSchema.CreateVarchar("author", maxLength: 128));
structField.Fields.Add(FieldSchema.CreateFloatVector("thumbnail", dimension: 64));

var schema = new CollectionSchema { Name = "my_collection" };
schema.Fields.Add(new FieldSchema("id", DataType.Int64, isPrimaryKey: true, autoId: true));
schema.StructFields.Add(structField);

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "my_collection",
    Schema = schema
});
```
