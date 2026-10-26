# SetRLSPrincipalTags()

Incrementally upserts tags for an application principal on a collection.

```rust
pub async fn set_rls_principal_tags(&self, request: SetRLSPrincipalTagsRequest) -> Result<()>
```

Tag values may be strings, finite numbers, or one-dimensional arrays of strings or numbers. Keys omitted from the call retain their values. The caller must hold the `ManageRLS` privilege on the collection.

## Request Syntax

```rust
let request = SetRLSPrincipalTagsRequest::builder()
    .collection_name("books")
    .principal_name("alice")
    .tags(serde_json::json!({ "team": "engineering" }))
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection whose principal tags are updated. Required.

- `principal_name: String`

    Name of the application principal. Required.

- `tags: Value`

    Non-empty JSON object of tag values. Required.

**RETURN TYPE:**

*Result\<()\>*

**RETURNS:**

Returns an empty result indicating success. Returns an `Error` if the request is invalid or the operation fails.

## Example

```rust
let request = SetRLSPrincipalTagsRequest::builder()
    .collection_name("books")
    .principal_name("alice")
    .tags(serde_json::json!({ "team": "engineering" }))
    .build()?;
client.set_rls_principal_tags(request).await?;
```
