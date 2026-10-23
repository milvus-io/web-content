# ResourceGroupConfig

The configuration of a resource group.

```csharp
public sealed class ResourceGroupConfig
{
    public int? RequestsNodeNum { get; set; }
    public int? LimitsNodeNum { get; set; }
    public IList<string> TransferFrom { get; }
    public IList<string> TransferTo { get; }
    public IDictionary<string, string> NodeFilterLabels { get; }
}
```

**PARAMETERS:**

- `RequestsNodeNum` (*int?*) -

    The number of nodes requested for the resource group.

- `LimitsNodeNum` (*int?*) -

    The maximum number of nodes the resource group may use.

- `TransferFrom` (*IList\<string\>*) -

    The resource groups from which nodes are transferred into this resource group. Entries are added via the collection-initializer syntax `TransferFrom = { ... }`.

- `TransferTo` (*IList\<string\>*) -

    The resource groups to which nodes are transferred from this resource group. Entries are added via the collection-initializer syntax `TransferTo = { ... }`.

- `NodeFilterLabels` (*IDictionary\<string, string\>*) -

    The node labels used to filter nodes when assigning them to this resource group. Entries are added via the collection-initializer syntax `NodeFilterLabels = { ... }`.
