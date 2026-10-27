# list_file_resources()

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

**RETURN TYPE:**

*Result\<ListFileResourcesResponse\>*

**RETURNS:**

A **ListFileResourcesResponse** containing the file resources of the collection. Returns an `Error` if the operation fails.

```rust
ListFileResourcesResponse
    resources() // -> &[FileResourceInfo]
```

**METHODS:**

- `resources()` (*&[FileResourceInfo]*) -

    The file resources associated with the collection.

    - `get_name()` (*&str*) -

        The name of the file resource.

    - `get_path()` (*&str*) -

        The storage path of the file resource.

## Example

```rust
let request = ListFileResourcesRequest::builder().build()?;
let resp = client.list_file_resources(request).await?;
for resource in resp.resources() {
    println!("name={}, path={}", resource.get_name(), resource.get_path());
}
```
