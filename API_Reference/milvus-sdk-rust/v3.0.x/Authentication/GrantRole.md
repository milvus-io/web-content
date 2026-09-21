# GrantRole()

Assigns a role to a user.

```rust
pub async fn grant_role(&self, request: GrantRoleRequest) -> Result<()>
```

## Request Syntax

```rust
let request = GrantRoleRequest::builder()
    .username("alice")
    .role_name("analyst")
    .build()?;
```

**REQUEST FIELDS:**

- `username: String`

    Name of the user to assign the role to. Required.

- `role_name: String`

    Name of the role to assign. Required.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = GrantRoleRequest::builder()
    .username("alice")
    .role_name("analyst")
    .build()?;
client.grant_role(request).await?;
```
