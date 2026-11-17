# get_rls_principal_tags()

Returns the stored tags of a principal on a collection.

```rust
pub async fn get_rls_principal_tags(&self, request: GetRLSPrincipalTagsRequest) -> Result<GetRLSPrincipalTagsResponse>
```

The caller must hold the `ViewRLS` privilege on the collection.

## Request Syntax

```rust
let request = GetRLSPrincipalTagsRequest::builder()
    .collection_name("books")
    .principal_name("alice")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection whose principal tags are read. Required.

- `principal_name: String`

    Name of the application principal. Required.

**RETURN TYPE:**

*Result\<GetRLSPrincipalTagsResponse\>*

**RETURNS:**

A **GetRLSPrincipalTagsResponse** containing the decoded JSON tags and their target. Returns an `Error` if the operation fails.

```rust
GetRLSPrincipalTagsResponse
    tags() // -> &Value
    database_name() // -> &str
    collection_name() // -> &str
    principal_name() // -> &str
```

**METHODS:**

- `tags()` (*&Value*) -

    The stored tags as a JSON object.

- `database_name()` (*&str*) -

    The database that contains the collection.

- `collection_name()` (*&str*) -

    The collection associated with the tags.

- `principal_name()` (*&str*) -

    The principal whose tags were returned.

## Example

```rust
let request = GetRLSPrincipalTagsRequest::builder()
    .collection_name("books")
    .principal_name("alice")
    .build()?;
let resp = client.get_rls_principal_tags(request).await?;
println!("{}", resp.tags());
```
