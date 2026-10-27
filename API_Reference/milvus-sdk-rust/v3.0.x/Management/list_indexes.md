# list_indexes()

Returns the names of the indexes on a collection.

```rust
pub async fn list_indexes(&self, request: ListIndexesRequest) -> Result<ListIndexesResponse>
```

## Request Syntax

```rust
let request = ListIndexesRequest::builder()
    .collection_name("books")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection whose indexes to list. Required.

- `field_name: String`

    Name of the indexed field; filters the result to indexes on this field.

- `index_name: String`

    Name of the index to locate.

- `timestamp: u64`

    Timestamp (in microseconds) used to locate the index metadata at a point in time.

**RETURN TYPE:**

*Result\<ListIndexesResponse\>*

**RETURNS:**

A **ListIndexesResponse** containing the names and descriptions of the indexes. Returns an `Error` if the operation fails.

```rust
ListIndexesResponse
    index_names() // -> &[String]
    indexes() // -> &[IndexDesc]
```

**METHODS:**

- `index_names()` (*&[String]*) -

    The names of the indexes.

- `indexes()` (*&[IndexDesc]*) -

    The index descriptions. See [IndexDesc](IndexDesc.md).

## Example

```rust
let request = ListIndexesRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.list_indexes(request).await?;
for name in resp.index_names() {
    println!("index: {}", name);
}
```
