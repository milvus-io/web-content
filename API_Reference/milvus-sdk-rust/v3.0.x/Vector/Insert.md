# Insert()

Inserts entities into a collection, returning the primary keys assigned to the new rows.

```rust
pub async fn insert(&self, request: InsertRequest) -> Result<InsertResponse>
```

## Request Syntax

```rust
let request = InsertRequest::builder()
    .collection_name("books")
    .columns(vec![
        FieldData::Int64 {
            name: "id".into(),
            values: vec![1, 2],
        },
        FieldData::FloatVector {
            name: "vector".into(),
            values: vec![vec![0.1, 0.2], vec![0.3, 0.4]],
        },
    ])
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to insert into. Required.

- `partition_name: String`

    Name of the partition to insert into. Required.

- `columns: Vec<FieldData>`

    Column-oriented field values, one `FieldData` entry per field, in row order. See [FieldData](FieldData.md).

- `rows: Vec<EntityRow>`

    Row-oriented entities as JSON objects. `columns` and `rows` cannot both be provided. See [EntityRow](EntityRow.md).

**RETURN TYPE:**

*Result\<InsertResponse\>*

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
let request = InsertRequest::builder()
    .collection_name("books")
    .columns(vec![
        FieldData::Int64 {
            name: "id".into(),
            values: vec![1, 2],
        },
        FieldData::FloatVector {
            name: "vector".into(),
            values: vec![vec![0.1, 0.2], vec![0.3, 0.4]],
        },
    ])
    .build()?;
let resp = client.insert(request).await?;
```
