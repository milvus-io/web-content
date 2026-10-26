# ListRLSPrincipals()

Lists application principal names with stored tags on a collection.

```rust
pub async fn list_rls_principals(&self, request: ListRLSPrincipalsRequest) -> Result<ListRLSPrincipalsResponse>
```

The caller must hold the `ViewRLS` privilege on the collection.

## Request Syntax

```rust
let request = ListRLSPrincipalsRequest::builder()
    .collection_name("books")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection whose principals are listed. Required.

**RETURN TYPE:**

*Result\<ListRLSPrincipalsResponse\>*

**RETURNS:**

A **ListRLSPrincipalsResponse** containing principal names and their target collection. Returns an `Error` if the operation fails.

```rust
ListRLSPrincipalsResponse
    principal_names() // -> &[String]
    database_name() // -> &str
    collection_name() // -> &str
```

**METHODS:**

- `principal_names()` (*&[String]*) - Names of principals with stored tags.
- `database_name()` (*&str*) - The database that contains the collection.
- `collection_name()` (*&str*) - The collection whose principals were listed.

## Example

```rust
let request = ListRLSPrincipalsRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.list_rls_principals(request).await?;
println!("principals: {:?}", resp.principal_names());
```
