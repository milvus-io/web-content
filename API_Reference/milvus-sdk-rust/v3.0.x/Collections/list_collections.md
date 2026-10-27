# list_collections()

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

**RETURN TYPE:**

*Result\<ListCollectionsResponse\>*

**RETURNS:**

A **ListCollectionsResponse** containing the names and information of the collections. Returns an `Error` if the operation fails.

```rust
ListCollectionsResponse
    collection_names() // -> &[String]
    collections() // -> &[CollectionInfo]
```

**METHODS:**

- `collection_names()` (*&[String]*) -

    The names of the collections.

- `collections()` (*&[CollectionInfo]*) -

    Detailed information about each collection.

    - `get_name()` (*&str*) -

        The name of the collection.

    - `get_id()` (*i64*) -

        The ID of the collection.

    - `get_created_timestamp()` (*u64*) -

        The creation timestamp of the collection.

    - `get_created_utc_timestamp()` (*u64*) -

        The UTC creation timestamp of the collection.

    - `get_query_service_available()` (*Option<bool>*) -

        Whether the query service is available.

    - `get_shard_count()` (*Option<i32>*) -

        The number of shards in the collection.

## Example

```rust
let request = ListCollectionsRequest::builder()
    .build()?;
let resp = client.list_collections(request).await?;
for name in resp.collection_names() {
    println!("collection: {name}");
}
```
