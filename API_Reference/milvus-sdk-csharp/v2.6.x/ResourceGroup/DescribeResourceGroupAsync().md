# DescribeResourceGroupAsync()

Describes a resource group.

```csharp
public async Task<DescribeResourceGroupResp> DescribeResourceGroupAsync(DescribeResourceGroupReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DescribeResourceGroupReq
{
    ResourceGroupName = "rg1"
};

DescribeResourceGroupResp response = await client.DescribeResourceGroupAsync(request);
```

**REQUEST PARAMETERS:**

- `ResourceGroupName` (*string*) -

    The name of the resource group to describe.

**RETURN TYPE:**

*Task\<DescribeResourceGroupResp\>*

**RETURNS:**

A **DescribeResourceGroupResp** object that describes the resource group.

```csharp
DescribeResourceGroupResp
    Name                // -> string
    Capacity            // -> int
    NumAvailableNode    // -> int
    NumLoadedReplica    // -> IReadOnlyDictionary<string, int>
    NumOutgoingNode     // -> IReadOnlyDictionary<string, int>
    NumIncomingNode     // -> IReadOnlyDictionary<string, int>
    Config              // -> ResourceGroupConfigData
    Nodes               // -> IReadOnlyList<NodeInfoData>
```

**PARAMETERS:**

- **Name** (*string*) -

    The name of the resource group.

- **Capacity** (*int*) -

    The number of query nodes in the resource group.

- **NumAvailableNode** (*int*) -

    The number of available query nodes in the resource group.

- **NumLoadedReplica** (*IReadOnlyDictionary\<string, int\>*) -

    The number of loaded replicas per collection in the resource group.

- **NumOutgoingNode** (*IReadOnlyDictionary\<string, int\>*) -

    The number of nodes outgoing to other resource groups, keyed by collection name.

- **NumIncomingNode** (*IReadOnlyDictionary\<string, int\>*) -

    The number of nodes incoming from other resource groups, keyed by collection name.

- **Config** (*ResourceGroupConfigData*) -

    The configuration of the resource group, in the same shape as [ResourceGroupConfig](ResourceGroupConfig.md).

    - **RequestsNodeNum** (*int?*) -

        The requested number of query nodes for the resource group.

    - **LimitsNodeNum** (*int?*) -

        The maximum number of query nodes for the resource group.

    - **TransferFrom** (*IReadOnlyList\<string\>*) -

        The names of the resource groups that can have nodes transferred from.

    - **TransferTo** (*IReadOnlyList\<string\>*) -

        The names of the resource groups that can have nodes transferred to.

    - **NodeFilterLabels** (*IReadOnlyList\<KeyValuePair\<string, string\>\>*) -

        The node filter labels used to match query nodes for the resource group.

- **Nodes** (*IReadOnlyList\<NodeInfoData\>*) -

    The query nodes in the resource group.

    - **NodeId** (*long*) -

        The ID of the query node.

    - **Address** (*string*) -

        The address of the query node.

    - **Hostname** (*string*) -

        The hostname of the query node.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.ResourceGroup;
using Milvus.Client.V2.Responses.ResourceGroup;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

DescribeResourceGroupResp response = await client.DescribeResourceGroupAsync(new DescribeResourceGroupReq { ResourceGroupName = "rg1" });
Console.WriteLine($"capacity: {response.Capacity}, available: {response.NumAvailableNode}");
```
