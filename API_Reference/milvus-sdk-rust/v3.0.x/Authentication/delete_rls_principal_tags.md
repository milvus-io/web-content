# delete_rls_principal_tags()

Deletes selected tag keys for a principal, or all tags when `tag_keys` is empty.

```rust
pub async fn delete_rls_principal_tags(&self, request: DeleteRLSPrincipalTagsRequest) -> Result<()>
```

The caller must hold the `ManageRLS` privilege on the collection.

## Request Syntax

```rust
let request = DeleteRLSPrincipalTagsRequest::builder()
    .collection_name("books")
    .principal_name("alice")
    .tag_keys(["team"])
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection whose principal tags are updated. Required.

- `principal_name: String`

    Name of the application principal. Required.

- `tag_keys: Vec<String>`

    Tag keys to delete. An empty list deletes all tags for the principal. Entries must not be empty.

**RETURN TYPE:**

*Result\<()\>*

**RETURNS:**

Returns an empty result indicating success. Returns an `Error` if the request is invalid or the operation fails.

## Example

```rust
let request = DeleteRLSPrincipalTagsRequest::builder()
    .collection_name("books")
    .principal_name("alice")
    .tag_keys(["team"])
    .build()?;
client.delete_rls_principal_tags(request).await?;
```
