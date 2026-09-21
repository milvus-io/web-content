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

**RETURNS:**

*Result\<GetCompactionPlansResponse\>*

`GetCompactionPlansResponse` exposes `state()` returning the `CompactionStateCode` and `merges()` returning the list of `CompactionMerge` plans produced for the compaction. Returns an `Error` on failure.

## Example

```rust
let request = GetCompactionPlansRequest::builder()
    .compaction_id(compaction_id)
    .build()?;
let resp = client.get_compaction_plans(request).await?;
println!("merges: {}", resp.merges().len());
```
