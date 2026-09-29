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

    Primary-key values of the entities to retrieve. Required.

- `output_fields: Vec<String>`

    Names of the fields returned for each entity.

- `consistency_level: Option<ConsistencyLevel>`

    Consistency guarantee for the read; the collection default is used when unset.

**RETURNS:**

*Result\<GetResponse\>*

`GetResponse` is an alias for `QueryResponse`. It exposes `results()` returning a column-oriented `QueryResults` with the requested output fields, plus the session timestamp. Returns `Error` on failure.

## Example

```rust
let request = GetRequest::builder()
    .collection_name("books")
    .ids(Ids::Int64(vec![1, 2, 3]))
    .output_fields(["id", "title"])
    .build()?;
let resp = client.get(request).await?;
```
