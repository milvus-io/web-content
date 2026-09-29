# DropPrivilegeGroup()

Drops a privilege group.

```rust
pub async fn drop_privilege_group(&self, request: DropPrivilegeGroupRequest) -> Result<()>
```

## Request Syntax

```rust
let request = DropPrivilegeGroupRequest::builder()
    .group_name("readers")
    .build()?;
```

**REQUEST FIELDS:**

- `group_name: String`

    Name of the privilege group to drop. Required.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = DropPrivilegeGroupRequest::builder()
    .group_name("readers")
    .build()?;
client.drop_privilege_group(request).await?;
```
