# ListPrivilegeGroups()

Lists privilege groups visible to the caller.

```rust
pub async fn list_privilege_groups(&self, request: ListPrivilegeGroupsRequest) -> Result<ListPrivilegeGroupsResponse>
```

## Request Syntax

```rust
let request = ListPrivilegeGroupsRequest::builder()
    .build()?;
```

**REQUEST FIELDS:**

This request takes no fields.

**RETURN TYPE:**

*Result\<ListPrivilegeGroupsResponse\>*

**RETURNS:**

A **ListPrivilegeGroupsResponse** containing the privilege groups. Returns an `Error` if the operation fails.

```rust
ListPrivilegeGroupsResponse
    groups() // -> &[PrivilegeGroupInfo]
```

**METHODS:**

- `groups()` (*&[PrivilegeGroupInfo]*) -

    The privilege groups defined in the cluster.

    - `get_group_name()` (*&str*) -

        The name of the privilege group.

    - `get_privileges()` (*&[String]*) -

        The privileges in the group.

## Example

```rust
let request = ListPrivilegeGroupsRequest::builder().build()?;
let resp = client.list_privilege_groups(request).await?;
for group in resp.groups() {
    println!("{}: {:?}", group.get_group_name(), group.get_privileges());
}
```
