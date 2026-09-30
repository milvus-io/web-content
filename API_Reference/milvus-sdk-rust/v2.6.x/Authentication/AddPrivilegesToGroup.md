# AddPrivilegesToGroup()

Adds privileges to a privilege group.

```rust
pub async fn add_privileges_to_group(&self, request: AddPrivilegesToGroupRequest) -> Result<()>
```

## Request Syntax

```rust
let request = AddPrivilegesToGroupRequest::builder()
    .group_name("readers")
    .privileges(["Search", "Query"])
    .build()?;
```

**REQUEST FIELDS:**

- `group_name: String`

    Name of the privilege group to update. Required.

- `privileges: HashSet<String>`

    Privileges to add to the group. At least one non-empty privilege is required.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = AddPrivilegesToGroupRequest::builder()
    .group_name("readers")
    .privilege("Search")
    .privilege("Query")
    .build()?;
client.add_privileges_to_group(request).await?;
```
