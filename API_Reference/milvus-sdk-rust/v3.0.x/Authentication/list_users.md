# list_users()

Lists user accounts visible to the caller.

```rust
pub async fn list_users(&self, request: ListUsersRequest) -> Result<ListUsersResponse>
```

## Request Syntax

```rust
let request = ListUsersRequest::builder()
    .build()?;
```

**REQUEST FIELDS:**

This request takes no fields.

**RETURN TYPE:**

*Result\<ListUsersResponse\>*

**RETURNS:**

A **ListUsersResponse** containing the names of the users. Returns an `Error` if the operation fails.

```rust
ListUsersResponse
    usernames() // -> &[String]
```

**METHODS:**

- `usernames()` (*&[String]*) -

    The names of the users.

## Example

```rust
let request = ListUsersRequest::builder().build()?;
let resp = client.list_users(request).await?;
for name in resp.usernames() {
    println!("user: {name}");
}
```
