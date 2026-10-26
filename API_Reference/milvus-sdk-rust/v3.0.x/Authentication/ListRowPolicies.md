# ListRowPolicies()

Lists the row-level security policies attached to a collection.

```rust
pub async fn list_row_policies(&self, request: ListRowPoliciesRequest) -> Result<ListRowPoliciesResponse>
```

The caller must hold the `ViewRLS` privilege on the collection.

## Request Syntax

```rust
let request = ListRowPoliciesRequest::builder()
    .collection_name("books")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection whose policies are listed. Required.

**RETURN TYPE:**

*Result\<ListRowPoliciesResponse\>*

**RETURNS:**

A **ListRowPoliciesResponse** containing the policies and their target collection. Returns an `Error` if the operation fails.

```rust
ListRowPoliciesResponse
    policies() // -> &[RowPolicy]
    database_name() // -> &str
    collection_name() // -> &str
```

**METHODS:**

- `policies()` (*&[RowPolicy]*) - The row policies attached to the collection. See [RowPolicy](RowPolicy.md).
- `database_name()` (*&str*) - The database that contains the collection.
- `collection_name()` (*&str*) - The collection whose policies were listed.


RowPolicy members:

**METHODS:**

- `get_policy_name()` (*&str*) - The policy name.
- `get_actions()` (*&[RowPolicyAction]*) - Operations governed by the policy. See [RowPolicyAction](RowPolicyAction.md).
- `get_using_expr()` (*&str*) - Expression that filters readable rows.
- `get_check_expr()` (*&str*) - Expression that checks writable rows.
- `get_description()` (*&str*) - Policy description.
- `get_created_at()` (*i64*) - Server creation timestamp; `0` means unavailable.
- `get_policy_type()` (*RowPolicyType*) - Policy combination mode. See [RowPolicyType](RowPolicyType.md).

## Example

```rust
for policy in resp.policies() {
    println!("{}: {:?}", policy.get_policy_name(), policy.get_policy_type());
}
```

## Example

```rust
let request = ListRowPoliciesRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.list_row_policies(request).await?;
println!("policy count: {}", resp.policies().len());
```
