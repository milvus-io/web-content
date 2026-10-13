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

**RETURN TYPE:**

*Result\<DescribeCollectionResponse\>*

**RETURNS:**

A **DescribeCollectionResponse** containing the description of the specified collection. Returns an `Error` if the operation fails.

```rust
DescribeCollectionResponse
    description() // -> &CollectionDesc
```

**METHODS:**

- `description()` (*&CollectionDesc*) -

    The collection description, including its schema, shards, partitions, aliases, consistency level, and properties. See [CollectionDesc](../types/CollectionDesc.md).

## Example

```rust
let request = DescribeCollectionRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.describe_collection(request).await?;
println!("name: {}", resp.description().get_collection_name());
```
