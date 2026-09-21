# UpdatePassword()

Changes an existing user's password.

```rust
pub async fn update_password(&self, request: UpdatePasswordRequest) -> Result<()>
```

When the request sets `reset_connection`, the client re-establishes its connection using the updated username/password credentials so subsequent requests authenticate with the new password. The password change is applied server-side before the connection is reset; if the reset fails, the returned error states that the password was changed but the connection could not be re-established.

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

- `description: Option<String>`

    Optional description of the user.

- `reset_connection: bool`

    Whether to re-establish the connection with the new credentials after the password update. Defaults to `false`.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = UpdatePasswordRequest::builder()
    .username("alice")
    .old_password("old_password")
    .new_password("new_password")
    .reset_connection(true)
    .build()?;
client.update_password(request).await?;
```
