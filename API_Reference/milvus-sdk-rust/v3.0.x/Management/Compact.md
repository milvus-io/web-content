# Compact()

Starts a compaction action for a collection.

```rust
pub async fn compact(&self, request: CompactRequest) -> Result<CompactResponse>
```

## Request Syntax

```rust
let request = CompactRequest::builder()
    .collection_name("books")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to compact. Required.

- `target_size: i64`

    Target segment size after compaction, expressed in `target_size_unit`. Zero means the server chooses its default target size.

- `target_size_unit: TargetSizeUnit`

    Unit of `target_size`; the value is converted to MB before being sent to Milvus. Defaults to `TargetSizeUnit::MB`.

- `clustering_compaction: bool`

    Whether to run a clustering compaction. Defaults to `false`.

- `is_l0: bool`

    Whether to run an L0 compaction. Defaults to `false`.

**RETURN TYPE:**

*Result\<CompactResponse\>*

**RETURNS:**

A **CompactResponse** containing the ID and plan count of the compaction action. Returns an `Error` if the operation fails.

```rust
CompactResponse
    compaction_id() // -> i64
    plan_count() // -> i64
```

**METHODS:**

- `compaction_id()` (*i64*) -

    The ID of the compaction action.

- `plan_count()` (*i64*) -

    The number of compaction plans produced.

## Example

```rust
let request = CompactRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.compact(request).await?;
println!("compaction_id: {}", resp.compaction_id());
```
