# ListRowPoliciesAsync()

Lists the row policies of a collection.

```csharp
public async Task<ListRowPoliciesResp> ListRowPoliciesAsync(ListRowPoliciesReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListRowPoliciesReq
{
    CollectionName = "my_collection"
};

ListRowPoliciesResp result = await client.ListRowPoliciesAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the collection to list the row policies of.

**RETURN TYPE:**

*Task\<ListRowPoliciesResp\>*

**RETURNS:**

A **ListRowPoliciesResp** object.

- `DbName` (*string*) -

    The database the collection belongs to.

- `CollectionName` (*string*) -

    The name of the collection the row policies belong to.

- `Policies` (*IReadOnlyList\<RowPolicyInfo\>*) -

    The row policies of the collection. Each **RowPolicyInfo** exposes:

    - `PolicyName` (*string*) -

        The name of the row policy.

    - `PolicyType` (*RowPolicyType*) -

        The type of the row policy. See [RowPolicyType](RowPolicyType.md).

    - `Actions` (*IReadOnlyList\<RowPolicyAction\>*) -

        The actions governed by the policy. See [RowPolicyAction](RowPolicyAction.md).

    - `UsingExpr` (*string*) -

        The expression used to filter rows visible to a principal.

    - `CheckExpr` (*string*) -

        The expression used to validate rows written by a principal.

    - `Description` (*string*) -

        The policy description.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Rls;
using Milvus.Client.V2.Responses.Rls;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

ListRowPoliciesResp result = await client.ListRowPoliciesAsync(new ListRowPoliciesReq
{
    CollectionName = "my_collection"
});
```
