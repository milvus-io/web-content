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

    Identifier of the compaction action, as returned by [Compact](compact.md). Must be greater than zero.

**RETURN TYPE:**

*Result\<GetCompactionStateResponse\>*

**RETURNS:**

A **GetCompactionStateResponse** containing the compaction state and plan counts. Returns an `Error` if the operation fails.

```rust
GetCompactionStateResponse
    state() // -> CompactionStateCode
    executing_plans() // -> i64
    timed_out_plans() // -> i64
    completed_plans() // -> i64
    failed_plans() // -> i64
```

**METHODS:**

- `state()` (*CompactionStateCode*) -

    The state of the compaction action. See [CompactionStateCode](CompactionStateCode.md).

- `executing_plans()` (*i64*) -

    The number of compaction plans still executing.

- `timed_out_plans()` (*i64*) -

    The number of compaction plans that timed out.

- `completed_plans()` (*i64*) -

    The number of compaction plans completed.

- `failed_plans()` (*i64*) -

    The number of compaction plans that failed.

## Example

```rust
let request = GetCompactionStateRequest::builder()
    .compaction_id(compaction_id)
    .build()?;
let resp = client.get_compaction_state(request).await?;
println!("state: {:?}, failed: {}", resp.state(), resp.failed_plans());
```
