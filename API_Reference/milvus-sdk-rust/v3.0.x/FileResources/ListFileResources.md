# ListFileResources()

Lists all registered file resources.

```rust
pub async fn list_file_resources(
    &self,
    request: ListFileResourcesRequest,
) -> Result<ListFileResourcesResponse>
```

## Request Syntax

```rust
let request = ListFileResourcesRequest::builder().build()?;
```

**RETURNS:**

*Result\<ListFileResourcesResponse\>*

`ListFileResourcesResponse` exposes `resources()`, returning a slice of `FileResourceInfo`, each exposing `name()` and `path()`. Returns `Error` on failure.

## Example

```rust
let request = ListFileResourcesRequest::builder().build()?;
let resp = client.list_file_resources(request).await?;
for resource in resp.resources() {
    println!("name={}, path={}", resource.get_name(), resource.get_path());
}
```
