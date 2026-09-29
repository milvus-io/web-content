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

**RETURNS:**

*Result\<ListAliasesResponse\>*

`ListAliasesResponse` exposes `database_name()`, `collection_name()`, and `aliases()` returning the alias list. Returns `Error` on failure.

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
