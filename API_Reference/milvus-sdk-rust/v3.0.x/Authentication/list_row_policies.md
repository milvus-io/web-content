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

- `policies()` (*&[RowPolicy]*) -

    The row policies attached to the collection. See [RowPolicy](RowPolicy.md).

- `database_name()` (*&str*) -

    The database that contains the collection.

- `collection_name()` (*&str*) -

    The collection whose policies were listed.

## Example

```rust
let request = ListRowPoliciesRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.list_row_policies(request).await?;
println!("policy count: {}", resp.policies().len());
```
