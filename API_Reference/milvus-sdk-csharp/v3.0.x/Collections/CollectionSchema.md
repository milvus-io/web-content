# CollectionSchema

Defines the schema of a collection.

```csharp
public sealed class CollectionSchema
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public IList<FieldSchema> Fields { get; }
    public IList<FunctionSchema> Functions { get; }
    public IList<StructFieldSchema> StructFields { get; }
    public IDictionary<string, string> Properties { get; }
    public bool EnableDynamicFields { get; set; }
    public string? ExternalSource { get; set; }
    public string? ExternalSpec { get; set; }
}
```

**PARAMETERS:**

- `Name` (*string?*) -

    The name of the collection.

- `Description` (*string?*) -

    An optional description for the collection.

- `Fields` (*IList\<FieldSchema\>*) -

    The fields defined in the schema. See [FieldSchema](FieldSchema.md).

- `Functions` (*IList\<FunctionSchema\>*) -

    The functions defined in the schema (e.g. BM25 full-text search functions). See [FunctionSchema](FunctionSchema.md).

- `StructFields` (*IList\<StructFieldSchema\>*) -

    The struct fields defined in the schema. See [StructFieldSchema](StructFieldSchema.md).

- `Properties` (*IDictionary\<string, string\>*) -

    The properties of the collection, returned by describe.

- `EnableDynamicFields` (*bool*) -

    Whether to enable dynamic fields for this schema. Defaults to `false`.

- `ExternalSource` (*string?*) -

    The external data source of an external collection, e.g. `"s3://bucket/path"`. Set together with `ExternalSpec` and the external-field mappings on `FieldSchema` to create an external collection. Mirrors the Java/C++/Rust SDKs' `externalSource`.

- `ExternalSpec` (*string?*) -

    The external file specification of an external collection (a JSON string), e.g. `"{\"format\":\"parquet\"}"`. Mirrors the Java/C++/Rust SDKs' `externalSpec`.

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

var schema = new CollectionSchema
{
    Name = "my_collection",
    Description = "A collection of books",
    EnableDynamicFields = true
};
schema.Fields.Add(new FieldSchema("id", DataType.Int64, isPrimaryKey: true, autoId: true));
schema.Fields.Add(FieldSchema.CreateVarchar("title", maxLength: 256));
schema.Fields.Add(FieldSchema.CreateFloatVector("embedding", dimension: 128));

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "my_collection",
    Schema = schema
});
```
