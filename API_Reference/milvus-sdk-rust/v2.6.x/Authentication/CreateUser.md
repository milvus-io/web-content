# CreateUser()

Creates a user account with a username and password.

```rust
pub async fn create_user(&self, request: CreateUserRequest) -> Result<()>
```

The caller must have the corresponding administrative privilege. Milvus can accept RBAC management calls with authorization disabled; enabling authorization is required when the deployment must enforce the resulting permissions for subsequent operations.

## Request Syntax

```rust
let request = CreateUserRequest::builder()
    .username("alice")
    .password("Test1234!")
    .build()?;
```

**REQUEST FIELDS:**

- `username: String`

    Name of the user to create. Required.

- `password: String`

    Password of the user. Required.

- `description: Option<String>`

    Optional description of the user.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = CreateUserRequest::builder()
    .username("alice")
    .password("Test1234!")
    .description("data engineer")
    .build()?;
client.create_user(request).await?;
```
