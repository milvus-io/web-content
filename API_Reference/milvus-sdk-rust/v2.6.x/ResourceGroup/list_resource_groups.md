# list_resource_groups()

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

**RETURN TYPE:**

*Result\<ListResourceGroupsResponse\>*

**RETURNS:**

A **ListResourceGroupsResponse** containing the names of the resource groups. Returns an `Error` if the operation fails.

```rust
ListResourceGroupsResponse
    group_names() // -> &[String]
```

**METHODS:**

- `group_names()` (*&[String]*) -

    The names of the resource groups.

## Example

```rust
let request = ListResourceGroupsRequest::builder().build()?;
let resp = client.list_resource_groups(request).await?;
for name in resp.group_names() {
    println!("group: {name}");
}
```
