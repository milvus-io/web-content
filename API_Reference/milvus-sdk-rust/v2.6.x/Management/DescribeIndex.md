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

**RETURN TYPE:**

*Result\<DescribeIndexResponse\>*

**RETURNS:**

A **DescribeIndexResponse** containing the descriptions of the indexes. Returns an `Error` if the operation fails.

```rust
DescribeIndexResponse
    indexes() // -> &[IndexDesc]
```

**METHODS:**

- `indexes()` (*&[IndexDesc]*) -

    The index descriptions. See [IndexDesc](IndexDesc.md).

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
