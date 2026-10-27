# drop_row_policy()

Drops a row-level security policy by name.

```rust
pub async fn drop_row_policy(&self, request: DropRowPolicyRequest) -> Result<()>
```

Dropping a missing policy succeeds. The caller must hold the `ManageRLS` privilege on the collection.

## Request Syntax

```rust
let request = DropRowPolicyRequest::builder()
    .collection_name("books")
    .policy_name("team_policy")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection protected by the policy. Required.

- `policy_name: String`

    Name of the policy to drop. Required.

**RETURN TYPE:**

*Result\<()\>*

**RETURNS:**

Returns an empty result indicating success. Returns an `Error` if the operation fails.

## Example

```rust
let request = DropRowPolicyRequest::builder()
    .collection_name("books")
    .policy_name("team_policy")
    .build()?;
client.drop_row_policy(request).await?;
```
