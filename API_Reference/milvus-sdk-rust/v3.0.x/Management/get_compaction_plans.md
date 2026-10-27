# get_compaction_plans()

Retrieves the execution plans produced for a compaction action, or all compaction tasks still retained for a collection when the request selects by collection name.

```rust
pub async fn get_compaction_plans(&self, request: GetCompactionPlansRequest) -> Result<GetCompactionPlansResponse>
```

## Request Syntax

```rust
let request = GetCompactionPlansRequest::builder()
    .compaction_id(compaction_id)
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty. It applies only when `collection_name` selects retained tasks.

- `compaction_id: i64`

    Identifier of the compaction action, as returned by [Compact](compact.md). Must be greater than zero when `collection_name` is not set.

- `collection_name: Option<String>`

    Name of a collection whose retained compaction tasks are returned. When set, it replaces `compaction_id` as the selection criterion and must not be combined with a nonzero `compaction_id`.

**RETURN TYPE:**

*Result\<GetCompactionPlansResponse\>*

**RETURNS:**

A **GetCompactionPlansResponse** containing the compaction state and merge plans. Returns an `Error` if the operation fails.

```rust
GetCompactionPlansResponse
    compaction_id() // -> i64
    collection_name() // -> &str
    state() // -> CompactionStateCode
    merges() // -> &[CompactionMerge]
```

**METHODS:**

- `compaction_id()` (*i64*) -

    The compaction ID echoed from the request. It is `0` when retained tasks are selected by collection name.

- `collection_name()` (*&str*) -

    The collection name used to select retained tasks, or an empty string when the request selected one compaction ID.

- `state()` (*CompactionStateCode*) -

    The aggregate state of the compaction action. See [CompactionStateCode](CompactionStateCode.md).

- `merges()` (*&[CompactionMerge]*) -

    The compaction tasks or merge plans produced by the action. See [CompactionMerge](CompactionMerge.md).

## Example

```rust
let request = GetCompactionPlansRequest::builder()
    .compaction_id(compaction_id)
    .build()?;
let resp = client.get_compaction_plans(request).await?;
println!("merges: {}", resp.merges().len());
```
