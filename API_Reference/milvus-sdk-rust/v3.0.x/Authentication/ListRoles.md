# ListRoles()

Lists roles visible to the caller.

```rust
pub async fn list_roles(&self, request: ListRolesRequest) -> Result<ListRolesResponse>
```

## Request Syntax

```rust
let request = ListRolesRequest::builder()
    .build()?;
```

**REQUEST FIELDS:**

This request takes no fields.

**RETURNS:**

*Result\<ListRolesResponse\>*

`ListRolesResponse` exposes `role_names()` returning the role names visible to the caller. Returns an `Error` on failure.

## Example

```rust
let request = ListRolesRequest::builder().build()?;
let resp = client.list_roles(request).await?;
for name in resp.role_names() {
    println!("role: {name}");
}
```
