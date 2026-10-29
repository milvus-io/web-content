# UpdateRowPolicyAsync()

Updates an existing row policy on a collection.

```csharp
public async Task UpdateRowPolicyAsync(UpdateRowPolicyReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new UpdateRowPolicyReq
{
    CollectionName = "my_collection",
    PolicyName = "policy_1",
    PolicyType = RowPolicyType.Restrictive,
    Actions = [RowPolicyAction.Query],
    UsingExpr = "age > 21",
    CheckExpr = "age > 21",
    Description = "Restricts visible rows to age > 21"
};

await client.UpdateRowPolicyAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the collection the row policy belongs to.

- `PolicyName` (*string*) -

    The name of the row policy to update.

- `PolicyType` (*RowPolicyType?*) -

    The type of the row policy: permissive or restrictive. See [RowPolicyType](RowPolicyType.md). Must be set explicitly: unlike `CreateRowPolicyReq`, the update wire contract carries no "omitted" policy type, and the server rejects an invalid type rather than defaulting it, so an unset value fails fast instead of silently re-typing the policy.

- `Actions` (*IReadOnlyList\<RowPolicyAction\>*) -

    The actions governed by the policy. See [RowPolicyAction](RowPolicyAction.md).

- `UsingExpr` (*string*) -

    The expression used to filter rows visible to a principal.

- `CheckExpr` (*string*) -

    The expression used to validate rows written by a principal.

- `Description` (*string*) -

    The policy description.

**RETURN TYPE:**

*Task*

**RETURNS:**

This method does not return a value.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Rls;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.UpdateRowPolicyAsync(new UpdateRowPolicyReq
{
    CollectionName = "my_collection",
    PolicyName = "policy_1",
    PolicyType = RowPolicyType.Restrictive,
    Actions = [RowPolicyAction.Query],
    UsingExpr = "age > 21",
    CheckExpr = "age > 21",
    Description = "Restricts visible rows to age > 21"
});
```
