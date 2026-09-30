# AlterRole()

Updates a role's mutable properties.

```rust
pub async fn alter_role(&self, request: AlterRoleRequest) -> Result<()>
```

## Request Syntax

```rust
let request = AlterRoleRequest::builder()
    .role_name("analyst")
    .description("analytical queries, read-only")
    .build()?;
```

**REQUEST FIELDS:**

- `role_name: String`

    Name of the role to update. Required.

- `description: String`

    New description of the role.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = AlterRoleRequest::builder()
    .role_name("analyst")
    .description("analytical queries, read-only")
    .build()?;
client.alter_role(request).await?;
```
