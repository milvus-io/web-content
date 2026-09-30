# Upsert()

Inserts new entities or updates existing entities in a collection.

```rust
pub async fn upsert(&self, request: UpsertRequest) -> Result<UpsertResponse>
```

## Request Syntax

```rust
let request = UpsertRequest::builder()
    .insert(
        InsertRequest::builder()
            .collection_name("books")
            .rows(vec![EntityRow::from_iter([
                ("id".into(), json!(1)),
                ("title".into(), json!("Milvus")),
            ])])
            .build()?,
    )
    .partial_update(false)
    .build()?;
```

**REQUEST FIELDS:**

- `insert: InsertRequest`

    The `InsertRequest` that carries the collection name and the entity data. Required.

- `partial_update: bool`

    Whether the upsert applies a partial update. Implicitly enabled when any field operation uses a non-`Replace` operation type.

- `field_ops: Vec<FieldPartialUpdateOp>`

    Per-field operations applied during a partial update, such as `ArrayAppend` or `ArrayRemove`. Each operation requires a field name.

**RETURNS:**

*Result\<UpsertResponse\>*

`UpsertResponse` is an alias for `DmlResponse`, which contains the assigned primary keys (`ids`), per-row success or failure indices, the upsert count, and the mutation timestamp. Returns `Error` on failure.

## Example

```rust
let request = UpsertRequest::builder()
    .insert(
        InsertRequest::builder()
            .collection_name("books")
            .rows(vec![EntityRow::from_iter([
                ("id".into(), json!(1)),
                ("title".into(), json!("Milvus")),
            ])])
            .build()?,
    )
    .build()?;
let resp = client.upsert(request).await?;
```
