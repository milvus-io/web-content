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

**RETURN TYPE:**

*Result\<GetServerVersionResponse\>*

**RETURNS:**

A **GetServerVersionResponse** containing the server version and optional build details. Returns an `Error` if the operation fails.

```rust
GetServerVersionResponse
    version() // -> &str
    build_time() // -> Option<&str>
    git_commit() // -> Option<&str>
    go_version() // -> Option<&str>
    deploy_mode() // -> Option<&str>
```

**METHODS:**

- `version()` (*&str*) -

    The server version string.

- `build_time()` (*Option<&str>*) -

    The server build time, when reported.

- `git_commit()` (*Option<&str>*) -

    The git commit of the server build, when reported.

- `go_version()` (*Option<&str>*) -

    The Go version used to build the server, when reported.

- `deploy_mode()` (*Option<&str>*) -

    The server deploy mode, when reported.

## Example

```rust
let request = GetServerVersionRequest::builder()
    .detail(true)
    .build()?;
let resp = client.server_version(request).await?;
println!("server: {}", resp.version());
```
