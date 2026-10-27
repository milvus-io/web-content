# upsert()

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

    This struct describes how a field value is applied during an upsert. `ArrayAppend` and `ArrayRemove` apply only to array fields and implicitly enable partial-update semantics for the request. These array operations require Milvus 2.6.17 or later.

    ```rust
    pub struct FieldPartialUpdateOp
    ```

    **PARAMETERS:**

    - `field_name: String`

        Name of the field to update.

    - `op_type: FieldPartialUpdateOpType`

        Operation applied to the field, `Replace`, `ArrayAppend`, or `ArrayRemove`. Defaults to `Replace`.

    **METHODS:**

    - `new()` - Creates a value initialized with its SDK defaults.
    - `field_name(value)` / `set_field_name(value)` / `get_field_name()` - Sets or returns the field name.
    - `op_type(value)` / `set_op_type(value)` / `get_op_type()` - Sets or returns the operation type.

    ## FieldPartialUpdateOpType

    Defines the operation applied to an existing field during a partial update.

    ```rust
    pub enum FieldPartialUpdateOpType {
        Replace,
        ArrayAppend,
        ArrayRemove,
    }
    ```

    **Constants:**

    - **Replace**

        Overwrite the existing field value. This is the default.

    - **ArrayAppend**

        Append the supplied elements to an existing array field.

    - **ArrayRemove**

        Remove every occurrence of the supplied elements from an existing array field.

- `rls_principal: Option<String>`

    Principal name used to enforce row-level security. Required for requests against an RLS-enabled collection unless `skip_rls` is set.

- `skip_rls: bool`

    Whether the request explicitly bypasses row-level security. Defaults to `false`.

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
    cost() // -> i64
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

- `cost()` (*i64*) -

    The execution cost reported by the server.

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
