# update_password()

Changes an existing user's password.

```rust
pub async fn update_password(&self, request: UpdatePasswordRequest) -> Result<()>
```

The password change is applied server-side; subsequent requests authenticate with the new password.

## Request Syntax

```rust
let request = UpdatePasswordRequest::builder()
    .username("alice")
    .old_password("old_password")
    .new_password("new_password")
    .build()?;
```

**REQUEST FIELDS:**

- `username: String`

    Name of the user whose password is changed. Required.

- `old_password: String`

    Current password of the user. Required.

- `new_password: String`

    New password of the user. Required.

**RETURN TYPE:**

*Result\<()\>*

**RETURNS:**

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = UpdatePasswordRequest::builder()
    .username("alice")
    .old_password("old_password")
    .new_password("new_password")
    .build()?;
client.update_password(request).await?;
```
