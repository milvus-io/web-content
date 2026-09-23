# DescribeIndex()

Returns the configuration and build state of the indexes on a collection.

```rust
pub async fn describe_index(&self, request: DescribeIndexRequest) -> Result<DescribeIndexResponse>
```

## Request Syntax

```rust
let request = DescribeIndexRequest::builder()
    .collection_name("books")
    .index_name("embedding_idx")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection whose indexes to describe. Required.

- `field_name: String`

    Name of the indexed field; filters the result to indexes on this field.

- `index_name: String`

    Name of the index to describe. When empty, all indexes on the collection are returned.

- `timestamp: u64`

    Timestamp (in microseconds) used to locate the index metadata at a point in time.

**RETURNS:**

*Result\<DescribeIndexResponse\>*

`DescribeIndexResponse` exposes `indexes()` returning a slice of [`IndexDesc`](../types/IndexDesc.md), each describing one index's configuration and build state. Returns an `Error` on failure.

## Example

```rust
let request = DescribeIndexRequest::builder()
    .collection_name("books")
    .index_name("embedding_idx")
    .build()?;
let resp = client.describe_index(request).await?;
for desc in resp.indexes() {
    println!("state: {:?}", desc.get_state());
}
```
