# ListUsers()

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

**RETURNS:**

*Result\<ListUsersResponse\>*

`ListUsersResponse` exposes `usernames()` returning the user names visible to the caller. Returns an `Error` on failure.

## Example

```rust
let request = ListUsersRequest::builder().build()?;
let resp = client.list_users(request).await?;
for name in resp.usernames() {
    println!("user: {name}");
}
```
