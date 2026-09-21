# DescribeCollection()

Describes the schema and properties of a collection.

```rust
pub async fn describe_collection(&self, request: DescribeCollectionRequest) -> Result<DescribeCollectionResponse>
```

## Request Syntax

```rust
let request = DescribeCollectionRequest::builder()
    .collection_name("books")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to describe. Required.

**RETURNS:**

*Result\<DescribeCollectionResponse\>*

`DescribeCollectionResponse` exposes `description()` returning a `CollectionDesc` with the collection name, description, schema, shard and partition counts, aliases, consistency level, and properties. Returns `Error` on failure.

## Example

```rust
let request = DescribeCollectionRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.describe_collection(request).await?;
println!("name: {}", resp.description().get_collection_name());
```
