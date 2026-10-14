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

    Per-field operations applied during a partial update, such as `ArrayAppend` or `ArrayRemove`. Each operation requires a field name. See [FieldPartialUpdateOp](../types/FieldPartialUpdateOp.md).

**RETURN TYPE:**

*Result\<UpsertResponse\>*

**RETURNS:**

The mutation result, including the assigned primary keys and per-row status. Returns an `Error` if the operation fails.

```rust
DmlResponse
    ids() // -> &Ids
    succeeded_indices() // -> &[u32]
    failed_indices() // -> &[u32]
    is_acknowledged() // -> bool
    insert_count() // -> i64
    delete_count() // -> i64
    upsert_count() // -> i64
    timestamp() // -> u64
```

**METHODS:**

- `ids()` (*&Ids*) -

    The primary keys assigned to the mutated rows. See [Ids](Ids.md).

- `succeeded_indices()` (*&[u32]*) -

    The row indices that succeeded.

- `failed_indices()` (*&[u32]*) -

    The row indices that failed.

- `is_acknowledged()` (*bool*) -

    Whether the mutation was acknowledged by the server.

- `insert_count()` (*i64*) -

    The number of rows inserted.

- `delete_count()` (*i64*) -

    The number of rows deleted.

- `upsert_count()` (*i64*) -

    The number of rows upserted.

- `timestamp()` (*u64*) -

    The mutation timestamp.

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
