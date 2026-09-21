# DescribeRole()

Retrieves a role and its assignments.

```rust
pub async fn describe_role(&self, request: DescribeRoleRequest) -> Result<DescribeRoleResponse>
```

## Request Syntax

```rust
let request = DescribeRoleRequest::builder()
    .role_name("analyst")
    .database_name("default")
    .build()?;
```

**REQUEST FIELDS:**

- `role_name: String`

    Name of the role to describe. Required.

- `database_name: String`

    Database scope used to resolve the role's grants.

**RETURNS:**

*Result\<DescribeRoleResponse\>*

`DescribeRoleResponse` exposes `description()` returning a `RoleDescription` with the role name, description, and its granted `GrantItem` list (each carrying the object type, object name, database name, privilege, and grantor). Returns an `Error` on failure.

## Example

```rust
let request = DescribeRoleRequest::builder()
    .role_name("analyst")
    .build()?;
let resp = client.describe_role(request).await?;
for grant in resp.description().get_grant_items() {
    println!("grant: {} on {}", grant.get_privilege(), grant.get_object_name());
}
```
