# UpdateRowPolicy

Updates an existing row policy on a collection.

```csharp
public async Task UpdateRowPolicyAsync(UpdateRowPolicyReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new UpdateRowPolicyReq
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

await client.UpdateRowPolicyAsync(new UpdateRowPolicyReq
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

    The name of the collection the row policy belongs to.

- `PolicyName` (*string*) -

    The name of the row policy to update.

- `PolicyType` (*RowPolicyType?*) -

    The type of the row policy: permissive or restrictive. Must be set explicitly: unlike <see cref="CreateRowPolicyReq" />, the update wire contract carries no "omitted" policy type, and the server rejects an invalid type rather than defaulting it, so an unset value fails fast instead of silently re-typing the policy (e.g. re-typing a Restrictive policy to Permissive).

- `Actions` (*IReadOnlyList<RowPolicyAction>*) -

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

await client.UpdateRowPolicyAsync(new UpdateRowPolicyReq
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
