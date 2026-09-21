# RemovePrivilegesFromGroup()

Removes privileges from a privilege group.

```rust
pub async fn remove_privileges_from_group(&self, request: RemovePrivilegesFromGroupRequest) -> Result<()>
```

## Request Syntax

```rust
let request = RemovePrivilegesFromGroupRequest::builder()
    .group_name("readers")
    .privileges(["Query"])
    .build()?;
```

**REQUEST FIELDS:**

- `group_name: String`

    Name of the privilege group to update. Required.

- `privileges: HashSet<String>`

    Privileges to remove from the group. At least one non-empty privilege is required.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = RemovePrivilegesFromGroupRequest::builder()
    .group_name("readers")
    .privilege("Query")
    .build()?;
client.remove_privileges_from_group(request).await?;
```
