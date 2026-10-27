# list_roles()

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

**RETURN TYPE:**

*Result\<ListRolesResponse\>*

**RETURNS:**

A **ListRolesResponse** containing the names of the roles. Returns an `Error` if the operation fails.

```rust
ListRolesResponse
    role_names() // -> &[String]
```

**METHODS:**

- `role_names()` (*&[String]*) -

    The names of the roles.

## Example

```rust
let request = ListRolesRequest::builder().build()?;
let resp = client.list_roles(request).await?;
for name in resp.role_names() {
    println!("role: {name}");
}
```
