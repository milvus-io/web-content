# AddFileResource()

Registers a named file resource for external-table workflows.

```rust
pub async fn add_file_resource(
    &self,
    request: AddFileResourceRequest,
) -> Result<()>
```

## Request Syntax

```rust
let request = AddFileResourceRequest::builder()
    .name("embedding_model")
    .path("/models/embedding.bin")
    .build()?;
```

**REQUEST FIELDS:**

- `name: String`

    Resource name. Required.

- `path: String`

    File path for the resource. Required.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success, or `Error` on failure.

## Example

```rust
let request = AddFileResourceRequest::builder()
    .name("embedding_model")
    .path("/models/embedding.bin")
    .build()?;
client.add_file_resource(request).await?;
```
