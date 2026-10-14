# Get()

Retrieves entities by their primary-key values.

```rust
pub async fn get(&self, request: GetRequest) -> Result<GetResponse>
```

## Request Syntax

```rust
let request = GetRequest::builder()
    .collection_name("books")
    .ids(Ids::Int64(vec![1, 2, 3]))
    .output_fields(["id", "title"])
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to read from. Required.

- `partition_names: Vec<String>`

    Partition names to restrict the retrieval to; reads the whole collection when empty.

- `ids: Ids`

    Primary-key values of the entities to retrieve. Required. See [Ids](Ids.md).

- `output_fields: Vec<String>`

    Names of the fields returned for each entity.

- `consistency_level: Option<ConsistencyLevel>`

    Consistency guarantee for the read; the collection default is used when unset. See [ConsistencyLevel](../types/ConsistencyLevel.md).

**RETURN TYPE:**

*Result\<GetResponse\>*

**RETURNS:**

A **QueryResponse** containing the rows matched by the query. Returns an `Error` if the operation fails.

```rust
QueryResponse
    results() // -> &QueryResults
    session_timestamp() // -> u64
```

**METHODS:**

- `results()` (*&QueryResults*) -

    The rows matched by the query.

    - `get_output_fields()` (*&[FieldData]*) -

        The output field values of the returned rows. See [FieldData](FieldData.md).

    - `get_output_field_names()` (*&[String]*) -

        The names of the output fields.

    - `get_output_field()` (*Option<&FieldData>*) -

        The value of the named output field for the returned rows, when present. See [FieldData](FieldData.md).

    - `get_row_count()` (*u64*) -

        The number of rows returned.

    - `get_element_indices()` (*&[Vec<i64>]*) -

        The element indices of the matched rows.

    - `is_empty()` (*bool*) -

        Whether no rows were returned.

    - `get_output_rows()` (*Result<Vec<EntityRow>>*) -

        The returned rows as entity values. See [EntityRow](../types/EntityRow.md).

    - `get_output_row()` (*Result<EntityRow>*) -

        The row at the given index as an entity value. See [EntityRow](../types/EntityRow.md).

- `session_timestamp()` (*u64*) -

    The session timestamp of the query.

## Example

```rust
let request = GetRequest::builder()
    .collection_name("books")
    .ids(Ids::Int64(vec![1, 2, 3]))
    .output_fields(["id", "title"])
    .build()?;
let resp = client.get(request).await?;
```
