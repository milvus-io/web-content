# Delete()

Deletes entities selected by a filter expression or primary-key IDs.

```rust
pub async fn delete(&self, request: DeleteRequest) -> Result<DeleteResponse>
```

## Request Syntax

```rust
let request = DeleteRequest::builder()
    .collection_name("books")
    .filter("id in [1, 2, 3]")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to delete from. Required.

- `partition_name: String`

    Name of the partition to delete from.

- `filter: String`

    Filter expression that selects the entities to delete. Mutually exclusive with `ids`; exactly one deletion condition must be specified.

- `filter_templates: HashMap<String, FilterTemplateValue>`

    Placeholder values referenced by the filter expression, such as `{minimum}`. See [FilterTemplateValue](../types/FilterTemplateValue.md).

- `ids: Ids`

    Primary-key values of the entities to delete. Mutually exclusive with `filter`. See [Ids](Ids.md).

**RETURN TYPE:**

*Result\<DeleteResponse\>*

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
let request = DeleteRequest::builder()
    .collection_name("books")
    .filter("id in [1, 2, 3]")
    .build()?;
let resp = client.delete(request).await?;
```
