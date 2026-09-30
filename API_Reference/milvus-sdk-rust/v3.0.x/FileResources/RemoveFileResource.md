# RemoveFileResource()

Removes a registered file resource.

```rust
pub async fn remove_file_resource(
    &self,
    request: RemoveFileResourceRequest,
) -> Result<()>
```

## Request Syntax

```rust
let request = RemoveFileResourceRequest::builder()
    .name("embedding_model")
    .build()?;
```

**REQUEST FIELDS:**

- `name: String`

    Name of the resource to remove. Required.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success, or `Error` on failure.

## Example

```rust
let request = RemoveFileResourceRequest::builder()
    .name("embedding_model")
    .build()?;
client.remove_file_resource(request).await?;
```
