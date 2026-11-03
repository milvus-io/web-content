# CompactionState

Represents the state of a compaction task.

```csharp
public enum CompactionState
{
    UndefinedState = 0,
    Executing = 1,
    Completed = 2
}
```

**Constants:**

- **UndefinedState** (0)

    The compaction state is undefined.

- **Executing** (1)

    The compaction is currently executing.

- **Completed** (2)

    The compaction has completed.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});

GetCompactionStateResp state = await client.GetCompactionStateAsync(new GetCompactionStateReq
{
    CompactionId = 450357031542
});

Console.WriteLine(state.State == CompactionState.Completed ? "Compaction done" : "Compaction running");
```
