# check_health()

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

**RETURN TYPE:**

*Result\<CheckHealthResponse\>*

**RETURNS:**

A **CheckHealthResponse** containing the server health and quota state. Returns an `Error` if the operation fails.

```rust
CheckHealthResponse
    is_healthy() // -> bool
    reasons() // -> &[String]
    quota_states() // -> &[String]
```

**METHODS:**

- `is_healthy()` (*bool*) -

    Whether the server is healthy.

- `reasons()` (*&[String]*) -

    The health-check reasons, including any failures.

- `quota_states()` (*&[String]*) -

    The current quota states reported by the server.

## Example

```rust
let request = CheckHealthRequest::builder().build()?;
let resp = client.check_health(request).await?;
assert!(resp.is_healthy());
```
