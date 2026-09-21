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

    Placeholder values referenced by the filter expression, such as `{minimum}`.

- `ids: Ids`

    Primary-key values of the entities to delete. Mutually exclusive with `filter`.

**RETURNS:**

*Result\<DeleteResponse\>*

`DeleteResponse` is an alias for `DmlResponse`, which contains the deleted primary keys (`ids`), per-row success or failure indices, the delete count, and the mutation timestamp. Returns `Error` on failure.

## Example

```rust
let request = DeleteRequest::builder()
    .collection_name("books")
    .filter("id in [1, 2, 3]")
    .build()?;
let resp = client.delete(request).await?;
```
