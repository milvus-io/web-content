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

    Column-oriented field values, one `FieldData` entry per field, in row order.

- `rows: Vec<EntityRow>`

    Row-oriented entities as JSON objects. `columns` and `rows` cannot both be provided.

**RETURNS:**

*Result\<InsertResponse\>*

`InsertResponse` is an alias for `DmlResponse`, which contains the assigned primary keys (`ids`), per-row success or failure indices, the insert count, and the mutation timestamp. Returns `Error` on failure.

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
