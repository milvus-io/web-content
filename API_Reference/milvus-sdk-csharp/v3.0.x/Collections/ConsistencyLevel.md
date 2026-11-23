# ConsistencyLevel

The consistency level to be used by a Milvus collection.

```csharp
public enum ConsistencyLevel
{
    Strong = 0,
    Session = 1,
    Bounded = 2,
    BoundedStaleness = 2,
    Eventually = 3,
    Customized = 4
}
```

**Constants:**

- **Strong** (0)

    The highest and most strict level of consistency, ensuring that users can read the latest version of data.

- **Session** (1)

    Ensures that all data writes can be immediately perceived in reads during the same session.

- **Bounded** (2)

    Allows data inconsistency during a certain period of time, after which data is generally globally consistent.

- **BoundedStaleness** (2)

    The previous name of `Bounded`. Deprecated: renamed to `Bounded`, sharing the same numeric value (2); kept for source compatibility.

- **Eventually** (3)

    The weakest level; there is no guaranteed order of reads and writes, and replicas eventually converge to the same state.

- **Customized** (4)

    A customized consistency level with a guarantee timestamp supplied by the caller. Deprecated: prefer `Strong`, `Session`, `Bounded` or `Eventually`.

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

QueryResp results = await client.QueryAsync(new QueryReq
{
    CollectionName = "my_collection",
    Expression = "id in [1, 2, 3]",
    Parameters = new QueryParameters
    {
        ConsistencyLevel = ConsistencyLevel.Strong
    }
});
```
