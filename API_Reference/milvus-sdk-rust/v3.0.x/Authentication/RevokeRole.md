# RevokeRole()

Removes a role assignment from a user.

```rust
pub async fn revoke_role(&self, request: RevokeRoleRequest) -> Result<()>
```

## Request Syntax

```rust
let request = RevokeRoleRequest::builder()
    .username("alice")
    .role_name("analyst")
    .build()?;
```

**REQUEST FIELDS:**

- `username: String`

    Name of the user to remove the role from. Required.

- `role_name: String`

    Name of the role to remove. Required.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = RevokeRoleRequest::builder()
    .username("alice")
    .role_name("analyst")
    .build()?;
client.revoke_role(request).await?;
```
