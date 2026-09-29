# CreateIndex()

Creates an index on the specified vector field of a collection.

```rust
pub async fn create_index(&self, request: CreateIndexRequest) -> Result<()>
```

## Request Syntax

```rust
let request = CreateIndexRequest::builder()
    .collection_name("books")
    .index_params(vec![
        IndexParam::new()
            .field_name("embedding")
            .index_type(IndexType::AutoIndex)
            .metric_type(MetricType::Cosine),
    ])
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to index. Required.

- `index_params: Vec<IndexParam>`

    Index configurations, one per vector field to index. Each `IndexParam` names the field, the index implementation, the metric type, and optional extra parameters. At least one is required.

- `sync: bool`

    Whether to wait for the index build to finish before returning. Defaults to `false`.

- `timeout_ms: i64`

    Timeout in milliseconds applied to the operation. Zero means the client default is used.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success, or an `Error` on failure.

## Example

```rust
let request = CreateIndexRequest::builder()
    .collection_name("books")
    .index_params(vec![
        IndexParam::new()
            .field_name("embedding")
            .index_type(IndexType::AutoIndex)
            .metric_type(MetricType::Cosine),
    ])
    .build()?;
client.create_index(request).await?;
```
