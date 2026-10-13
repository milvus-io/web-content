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

**RETURN TYPE:**

*Result\<DescribeUserResponse\>*

**RETURNS:**

A **DescribeUserResponse** containing the user descriptions. Returns an `Error` if the operation fails.

```rust
DescribeUserResponse
    users() // -> &[UserDescription]
```

**METHODS:**

- `users()` (*&[UserDescription]*) -

    The user descriptions, including their roles and privileges.

    - `get_username()` (*&str*) -

        The name of the user.

    - `get_description()` (*&str*) -

        The description of the user.

    - `get_roles()` (*&[String]*) -

        The roles assigned to the user.

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
