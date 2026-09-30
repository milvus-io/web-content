# CheckHealth()

Checks whether the connected Milvus server is healthy.

```rust
pub async fn check_health(&self, request: CheckHealthRequest) -> Result<CheckHealthResponse>
```

## Request Syntax

```rust
let request = CheckHealthRequest::builder()
    .build()?;
```

**REQUEST FIELDS:**

This request takes no fields.

**RETURNS:**

*Result\<CheckHealthResponse\>*

`CheckHealthResponse` exposes `is_healthy()`, `reasons()` returning any health failure reasons, and `quota_states()` returning the per-component quota states. Returns an `Error` on failure.

## Example

```rust
let request = CheckHealthRequest::builder().build()?;
let resp = client.check_health(request).await?;
assert!(resp.is_healthy());
```
