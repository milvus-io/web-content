# GetCompactionPlans()

Retrieves the execution plans produced for a compaction action.

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

- `compaction_id: i64`

    Identifier of the compaction action, as returned by [Compact](Compact.md). Must be greater than zero.

**RETURN TYPE:**

*Result\<GetCompactionPlansResponse\>*

**RETURNS:**

A **GetCompactionPlansResponse** containing the compaction state and merge plans. Returns an `Error` if the operation fails.

```rust
GetCompactionPlansResponse
    state() // -> CompactionStateCode
    merges() // -> &[CompactionMerge]
```

**METHODS:**

- `state()` (*CompactionStateCode*) -

    The state of the compaction action.

- `merges()` (*&[CompactionMerge]*) -

    The compaction merge plans produced by the action.

    - `get_source_segment_ids()` (*&[i64]*) -

        The IDs of the source segments being merged.

    - `get_target_segment_id()` (*i64*) -

        The ID of the target segment produced by the merge.

## Example

```rust
let request = GetCompactionPlansRequest::builder()
    .compaction_id(compaction_id)
    .build()?;
let resp = client.get_compaction_plans(request).await?;
println!("merges: {}", resp.merges().len());
```
