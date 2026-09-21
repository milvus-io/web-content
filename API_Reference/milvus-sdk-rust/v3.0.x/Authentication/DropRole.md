# DropRole()

Drops a role.

```rust
pub async fn drop_role(&self, request: DropRoleRequest) -> Result<()>
```

## Request Syntax

```rust
let request = DropRoleRequest::builder()
    .role_name("analyst")
    .build()?;
```

**REQUEST FIELDS:**

- `role_name: String`

    Name of the role to drop. Required.

- `force: bool`

    Whether to force the drop even when the role is still assigned to users. Defaults to `false`.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = DropRoleRequest::builder()
    .role_name("analyst")
    .force(true)
    .build()?;
client.drop_role(request).await?;
```
