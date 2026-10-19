# LoadPartitionsAsync()

Loads specific partitions into memory.

```csharp
public async Task LoadPartitionsAsync(LoadPartitionsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new LoadPartitionsReq
{
    CollectionName = "my_collection",
    PartitionNames = ["recent", "classic"]
};

await client.LoadPartitionsAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection that contains the partitions to load.

- `PartitionNames` (*IReadOnlyList\<string\>*) -

    The names of the partitions to load.

- `ReplicaNumber` (*int*) -

    The number of replicas to create for the loaded partitions. Defaults to 1.

- `Sync` (*bool*) -

    Whether to wait until the partitions are fully loaded. Defaults to `true`.

- `TimeoutMs` (*long*) -

    The maximum time in milliseconds to wait for the partitions to load when `Sync` is enabled. Defaults to 60000. A value of 0 means wait forever.

- `Refresh` (*bool*) -

    When true, loads with refresh enabled, causing the server to reload the partition metadata.

- `LoadFields` (*IReadOnlyList\<string\>*) -

    When set, only the listed fields are loaded into memory (field partial loading).

- `SkipLoadDynamicField` (*bool*) -

    When true, dynamic fields are not loaded even when partial loading is not otherwise requested.

- `TargetResourceGroups` (*IReadOnlyList\<string\>*) -

    The resource groups to load the partition replicas into.

- `Priority` (*string?*) -

    The load priority, e.g. `"Low"`, `"Medium"` or `"High"`. When set, it is sent to the server as the `load_priority` load parameter (normalized to lower case).

**RETURN TYPE:**

*Task*

**RETURNS:**

This method does not return a value.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Partition;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.LoadPartitionsAsync(new LoadPartitionsReq
{
    CollectionName = "my_collection",
    PartitionNames = ["recent", "classic"]
});
```
