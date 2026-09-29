# UpdateUser()

Updates mutable properties of a user account.

```rust
pub async fn update_user(&self, request: UpdateUserRequest) -> Result<()>
```

## Request Syntax

```rust
let request = UpdateUserRequest::builder()
    .username("alice")
    .description("data engineer")
    .build()?;
```

**REQUEST FIELDS:**

- `username: String`

    Name of the user to update. Required.

- `description: String`

    New description of the user.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = UpdateUserRequest::builder()
    .username("alice")
    .description("data engineer")
    .build()?;
client.update_user(request).await?;
```
