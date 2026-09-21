# DropUser()

Drops a user account.

```rust
pub async fn drop_user(&self, request: DropUserRequest) -> Result<()>
```

## Request Syntax

```rust
let request = DropUserRequest::builder()
    .username("alice")
    .build()?;
```

**REQUEST FIELDS:**

- `username: String`

    Name of the user to drop. Required.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = DropUserRequest::builder()
    .username("alice")
    .build()?;
client.drop_user(request).await?;
```
