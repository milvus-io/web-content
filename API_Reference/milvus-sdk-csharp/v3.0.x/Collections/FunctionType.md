# FunctionType

Represents the type of a function in a collection schema.

```csharp
public enum FunctionType
{
    Unknown = 0,
    Bm25 = 1,
    TextEmbedding = 2,
    Rerank = 3,
    MinHash = 4,
    MolFingerprint = 5
}
```

**Constants:**

- **Unknown** (0)

    The function type is unknown.

- **Bm25** (1)

    A BM25 full-text-search function.

- **TextEmbedding** (2)

    A text-embedding function.

- **Rerank** (3)

    A reranking function.

- **MinHash** (4)

    A MinHash LSH function that hashes text into a binary signature.

- **MolFingerprint** (5)

    A molecular-fingerprint function.

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

var schema = new CollectionSchema { Name = "my_collection" };
schema.Fields.Add(new FieldSchema("id", DataType.Int64, isPrimaryKey: true, autoId: true));
schema.Fields.Add(FieldSchema.CreateVarchar("text", maxLength: 1024));
schema.Fields.Add(FieldSchema.CreateSparseFloatVector("sparse"));

schema.Functions.Add(new FunctionSchema(
    "bm25",
    FunctionType.Bm25,
    inputFieldNames: ["text"],
    outputFieldNames: ["sparse"]));

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "my_collection",
    Schema = schema
});
```
