# GetServerVersion()

Returns the connected Milvus server version and optional build details.

```rust
pub async fn server_version(&self, request: GetServerVersionRequest) -> Result<GetServerVersionResponse>
```

## Request Syntax

```rust
let request = GetServerVersionRequest::builder()
    .build()?;
```

**REQUEST FIELDS:**

- `detail: bool`

    Whether the response includes build details such as the git commit, Go version, and deploy mode. When `false`, only the version string is returned.

**RETURNS:**

*Result\<GetServerVersionResponse\>*

`GetServerVersionResponse` exposes `version()` and, when `detail` is enabled, `build_time()`, `git_commit()`, `go_version()`, and `deploy_mode()`. Returns an `Error` on failure.

## Example

```rust
let request = GetServerVersionRequest::builder()
    .detail(true)
    .build()?;
let resp = client.server_version(request).await?;
println!("server: {}", resp.version());
```
