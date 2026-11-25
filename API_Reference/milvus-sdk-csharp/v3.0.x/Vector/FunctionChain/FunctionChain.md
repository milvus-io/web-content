# FunctionChain

A named chain of post-processing stages applied to search results, usable at the top level and per ANN-search leg of `SearchAsync()` and `HybridSearchAsync()`. A chain composes `Map`, `Sort`, and `Limit` operations and serializes to the gRPC `FunctionChain` message.

```csharp
public sealed class FunctionChain
{
    public FunctionChainStage Stage { get; set; }
    public string Name { get; set; } = "";
    public IList<FunctionChainOp> Ops { get; } = new List<FunctionChainOp>();
}
```

**PARAMETERS:**

- `Stage` (*FunctionChainStage*) -

    The execution stage where this function chain runs. Must be set to a non-unspecified stage (e.g. `FunctionChainStage.L2Rerank`). See [FunctionChainStage](FunctionChainStage.md).

- `Name` (*string*) -

    An optional SDK/debug name of this function chain.

- `Ops` (*IList\<FunctionChainOp\>*) -

    The ordered operations of this function chain, executed by the server in this order. See [FunctionChainOp](FunctionChainOp.md).

## Related types

- [FunctionChainStage](FunctionChainStage.md)

- [FunctionChainOp](FunctionChainOp.md)

- [FunctionChainExpr](FunctionChainExpr.md)

- [FunctionChainArg](FunctionChainArg.md)

- [FunctionParamValue](FunctionParamValue.md)

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});

var chain = new FunctionChain
{
    Stage = FunctionChainStage.L2Rerank,
    Name = "rerank_chain"
};
chain.Ops.Add(FunctionChainOp.Sort("score", desc: true));
chain.Ops.Add(FunctionChainOp.Limit(5));

SearchResp results = await client.SearchAsync(new SearchReq
{
    CollectionName = "my_collection",
    VectorFieldName = "embedding",
    Vectors = [new[] { 0.1f, 0.2f, 0.3f, 0.4f }],
    Limit = 10,
    FunctionChains = { chain }
});
```
