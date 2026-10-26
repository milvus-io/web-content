# CreateRowPolicy

Creates a row policy on a collection. A row policy filters the rows visible to a principal (UsingExpr) and validates the rows written by a principal (CheckExpr).

```csharp
public async Task CreateRowPolicyAsync(CreateRowPolicyReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new CreateRowPolicyReq
{
    DatabaseName = null,
    CollectionName = "value",
    PolicyName = "value",
    PolicyType = "value",
    Actions = null,
    UsingExpr = "value",
    CheckExpr = "value",
    Description = "value",
};

await client.CreateRowPolicyAsync(new CreateRowPolicyReq
{
    DatabaseName = null,
    CollectionName = "value",
    PolicyName = "value",
    PolicyType = "value",
    Actions = null,
    UsingExpr = "value",
    CheckExpr = "value",
    Description = "value",
});
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the collection to create the row policy for.

- `PolicyName` (*string*) -

    The name of the row policy to create.

- `PolicyType` (*RowPolicyType*) -

    The type of the row policy: permissive or restrictive. See [RowPolicyType](RowPolicyType.md). Defaults to <see cref="RowPolicyType.Permissive" />, matching the server's default for an omitted value.

- `Actions` (*IReadOnlyList\<RowPolicyAction\>*) - See [RowPolicyAction](RowPolicyAction.md).

    The actions governed by the policy.

- `UsingExpr` (*string*) -

    The expression used to filter rows visible to a principal.

- `CheckExpr` (*string*) -

    The expression used to validate rows written by a principal.

- `Description` (*string*) -

    The policy description.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Rls;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
});

await client.CreateRowPolicyAsync(new CreateRowPolicyReq
{
    DatabaseName = null,
    CollectionName = "value",
    PolicyName = "value",
    PolicyType = "value",
    Actions = null,
    UsingExpr = "value",
    CheckExpr = "value",
    Description = "value",
});
```
