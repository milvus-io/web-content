# CreatePrivilegeGroup()

Creates a named group of privileges.

```rust
pub async fn create_privilege_group(&self, request: CreatePrivilegeGroupRequest) -> Result<()>
```

## Request Syntax

```rust
let request = CreatePrivilegeGroupRequest::builder()
    .group_name("readers")
    .build()?;
```

**REQUEST FIELDS:**

- `group_name: String`

    Name of the privilege group to create. Required.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = CreatePrivilegeGroupRequest::builder()
    .group_name("readers")
    .build()?;
client.create_privilege_group(request).await?;
```
