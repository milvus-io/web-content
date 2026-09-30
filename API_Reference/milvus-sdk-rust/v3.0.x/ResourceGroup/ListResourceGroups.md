# ListResourceGroups()

Lists resource groups visible in the current database.

```rust
pub async fn list_resource_groups(&self, request: ListResourceGroupsRequest) -> Result<ListResourceGroupsResponse>
```

## Request Syntax

```rust
let request = ListResourceGroupsRequest::builder()
    .build()?;
```

**REQUEST FIELDS:**

This request takes no fields.

**RETURNS:**

*Result\<ListResourceGroupsResponse\>*

`ListResourceGroupsResponse` exposes `group_names()` returning the resource-group names visible in the current database. Returns an `Error` on failure.

## Example

```rust
let request = ListResourceGroupsRequest::builder().build()?;
let resp = client.list_resource_groups(request).await?;
for name in resp.group_names() {
    println!("group: {name}");
}
```
