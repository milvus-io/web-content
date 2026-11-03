# CompactionTaskState

This enum represents the state of a compaction task.

```csharp
public enum CompactionTaskState
{
    Unknown = 0,
    Executing = 1,
    Pipelining = 2,
    Completed = 3,
    Failed = 4,
    Timeout = 5,
    Analyzing = 6,
    Indexing = 7,
    Cleaned = 8,
    MetaSaved = 9,
    Statistic = 10
}
```

**Constants:**

- **Unknown** (0)

    The task state is unknown.

- **Executing** (1)

    The task is being executed.

- **Pipelining** (2)

    The task is waiting in the pipeline.

- **Completed** (3)

    The task has completed.

- **Failed** (4)

    The task has failed.

- **Timeout** (5)

    The task has timed out.

- **Analyzing** (6)

    The task is analyzing.

- **Indexing** (7)

    The task is indexing.

- **Cleaned** (8)

    The task has been cleaned up.

- **MetaSaved** (9)

    The task metadata has been saved.

- **Statistic** (10)

    The task is collecting statistics.

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

GetCompactionPlansResp result = await client.GetCompactionPlansAsync(new GetCompactionPlansReq
{
    CompactionId = 450357031542
});

foreach (CompactionMergeInfo plan in result.MergeInfos)
{
    if (plan.State == CompactionTaskState.Completed)
    {
        Console.WriteLine($"Task {plan.PlanId} completed");
    }
}
```
