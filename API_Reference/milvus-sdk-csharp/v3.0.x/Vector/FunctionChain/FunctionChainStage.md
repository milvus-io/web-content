# FunctionChainStage

The execution stage at which a `FunctionChain` runs. Numeric values mirror `schema.proto FunctionChainStage` one-to-one.

```csharp
public enum FunctionChainStage
{
    Unspecified = 0,
    Ingestion = 1,
    PreProcess = 2,
    L0Rerank = 3,
    L1Rerank = 4,
    L2Rerank = 5,
    PostProcess = 6
}
```

**Constants:**

- **Unspecified** (0) - The stage is unspecified; the request is rejected.

- **Ingestion** (1) - The chain runs at ingestion time.

- **PreProcess** (2) - The chain runs before the vector search.

- **L0Rerank** (3) - The chain reranks L0 candidates.

- **L1Rerank** (4) - The chain reranks L1 candidates.

- **L2Rerank** (5) - The chain reranks L2 candidates.

- **PostProcess** (6) - The chain runs after all reranking.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

// A chain that reranks L2 candidates
var chain = new FunctionChain
{
    Stage = FunctionChainStage.L2Rerank,
    Name = "combine_chain"
};
```
