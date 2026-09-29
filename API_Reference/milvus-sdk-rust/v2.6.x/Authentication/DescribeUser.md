# DescribeUser()

Retrieves a user and its role assignments.

```rust
pub async fn describe_user(&self, request: DescribeUserRequest) -> Result<DescribeUserResponse>
```

## Request Syntax

```rust
let request = DescribeUserRequest::builder()
    .username("alice")
    .build()?;
```

**REQUEST FIELDS:**

- `username: String`

    Name of the user to describe. Required.

- `include_roles: bool`

    Whether the response includes the roles assigned to the user. Defaults to `true`.

**RETURNS:**

*Result\<DescribeUserResponse\>*

`DescribeUserResponse` exposes `users()` returning a slice of `UserDescription`, each carrying the username, description, and the assigned roles. Returns an `Error` on failure.

## Example

```rust
let request = DescribeUserRequest::builder()
    .username("alice")
    .build()?;
let resp = client.describe_user(request).await?;
for user in resp.users() {
    println!("{}: {:?}", user.get_username(), user.get_roles());
}
```
