# ListAliases()

Lists the aliases associated with a collection in the selected database.

```rust
pub async fn list_aliases(&self, request: ListAliasesRequest) -> Result<ListAliasesResponse>
```

## Request Syntax

```rust
let request = ListAliasesRequest::builder()
    .collection_name("books")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection whose aliases are listed.

**RETURN TYPE:**

*Result\<ListAliasesResponse\>*

**RETURNS:**

A **ListAliasesResponse** containing the aliases of the collection. Returns an `Error` if the operation fails.

```rust
ListAliasesResponse
    database_name() // -> &str
    collection_name() // -> &str
    aliases() // -> &[String]
```

**METHODS:**

- `database_name()` (*&str*) -

    The database that holds the aliased collection.

- `collection_name()` (*&str*) -

    The collection the aliases refer to.

- `aliases()` (*&[String]*) -

    The aliases of the collection.

## Example

```rust
let request = ListAliasesRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.list_aliases(request).await?;
for alias in resp.aliases() {
    println!("alias: {alias}");
}
```
