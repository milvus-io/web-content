# CreateRole()

Creates a role that can receive privileges.

```rust
pub async fn create_role(&self, request: CreateRoleRequest) -> Result<()>
```

## Request Syntax

```rust
let request = CreateRoleRequest::builder()
    .role_name("analyst")
    .build()?;
```

**REQUEST FIELDS:**

- `role_name: String`

    Name of the role to create. Required.

- `description: String`

    Description of the role.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = CreateRoleRequest::builder()
    .role_name("analyst")
    .description("analytical queries")
    .build()?;
client.create_role(request).await?;
```
