# DropResourceGroup()

Drops a resource group after its resources are no longer assigned to it.

```rust
pub async fn drop_resource_group(&self, request: DropResourceGroupRequest) -> Result<()>
```

## Request Syntax

```rust
let request = DropResourceGroupRequest::builder()
    .group_name("group_1")
    .build()?;
```

**REQUEST FIELDS:**

- `group_name: String`

    Name of the resource group to drop. Required.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = DropResourceGroupRequest::builder()
    .group_name("group_1")
    .build()?;
client.drop_resource_group(request).await?;
```
