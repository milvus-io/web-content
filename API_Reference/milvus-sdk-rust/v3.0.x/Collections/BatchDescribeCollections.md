# BatchDescribeCollections()

Describes multiple collections in a single call.

```rust
pub async fn batch_describe_collections(&self, request: BatchDescribeCollectionsRequest) -> Result<BatchDescribeCollectionsResponse>
```

## Request Syntax

```rust
let request = BatchDescribeCollectionsRequest::builder()
    .collection_names(["books", "articles"])
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_names: Vec<String>`

    Names of the collections to describe. Use `collection_name()` to add one.

- `collection_ids: Vec<i64>`

    Collection IDs to describe, as an alternative to names. Use `collection_id()` to add one; each ID must be positive.

**RETURNS:**

*Result\<BatchDescribeCollectionsResponse\>*

`BatchDescribeCollectionsResponse` exposes `descriptions()` returning one `CollectionDesc` per described collection. Returns `Error` on failure.

## Example

```rust
let request = BatchDescribeCollectionsRequest::builder()
    .collection_names(["books", "articles"])
    .build()?;
let resp = client.batch_describe_collections(request).await?;
for desc in resp.descriptions() {
    println!("name: {}", desc.get_collection_name());
}
```
