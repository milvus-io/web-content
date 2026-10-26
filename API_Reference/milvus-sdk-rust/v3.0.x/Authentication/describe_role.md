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

**RETURN TYPE:**

*Result\<DescribeRoleResponse\>*

**RETURNS:**

A **DescribeRoleResponse** containing the role description. Returns an `Error` if the operation fails.

```rust
DescribeRoleResponse
    description() // -> &RoleDescription
```

**METHODS:**

- `description()` (*&RoleDescription*) -

    The role description, including its grants.

    - `get_role_name()` (*&str*) -

        The name of the role.

    - `get_description()` (*&str*) -

        The description of the role.

    - `get_grant_items()` (*&[GrantItem]*) -

        The privileges granted to the role.

        - `get_object_type()` (*&str*) -

            The type of the object the privilege applies to.

        - `get_object_name()` (*&str*) -

            The name of the object the privilege applies to.

        - `get_database_name()` (*&str*) -

            The database scope of the grant.

        - `get_role_name()` (*&str*) -

            The role the grant belongs to.

        - `get_privilege()` (*&str*) -

            The granted privilege.

        - `get_grantor_name()` (*&str*) -

            The user who granted the privilege.

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
