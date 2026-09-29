# ListCollections()

Lists the collections in the selected database.

```rust
pub async fn list_collections(&self, request: ListCollectionsRequest) -> Result<ListCollectionsResponse>
```

## Request Syntax

```rust
let request = ListCollectionsRequest::builder()
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `only_loaded: bool`

    Whether to list only the collections currently loaded into memory. Defaults to `false`, listing all collections.

**RETURNS:**

*Result\<ListCollectionsResponse\>*

`ListCollectionsResponse` exposes `collection_names()` returning the collection names and `collections()` returning one `CollectionInfo` per collection, including its ID, created timestamps, and load state. Returns `Error` on failure.

## Example

```rust
let request = ListCollectionsRequest::builder()
    .build()?;
let resp = client.list_collections(request).await?;
for name in resp.collection_names() {
    println!("collection: {name}");
}
```
