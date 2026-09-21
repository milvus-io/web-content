# GetCompactionState()

Retrieves the state of a compaction action.

```rust
pub async fn get_compaction_state(&self, request: GetCompactionStateRequest) -> Result<GetCompactionStateResponse>
```

## Request Syntax

```rust
let request = GetCompactionStateRequest::builder()
    .compaction_id(compaction_id)
    .build()?;
```

**REQUEST FIELDS:**

- `compaction_id: i64`

    Identifier of the compaction action, as returned by [Compact](Compact.md). Must be greater than zero.

**RETURNS:**

*Result\<GetCompactionStateResponse\>*

`GetCompactionStateResponse` exposes `state()` returning the `CompactionStateCode`, and `executing_plans()`, `timed_out_plans()`, `completed_plans()`, and `failed_plans()` with the per-plan tallies. Returns an `Error` on failure.

## Example

```rust
let request = GetCompactionStateRequest::builder()
    .compaction_id(compaction_id)
    .build()?;
let resp = client.get_compaction_state(request).await?;
println!("state: {:?}, failed: {}", resp.state(), resp.failed_plans());
```
