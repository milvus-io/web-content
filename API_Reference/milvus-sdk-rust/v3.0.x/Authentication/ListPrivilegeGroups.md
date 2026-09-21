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

**RETURNS:**

*Result\<ListPrivilegeGroupsResponse\>*

`ListPrivilegeGroupsResponse` exposes `groups()` returning a slice of `PrivilegeGroupInfo`, each carrying a group name and its privilege list. Returns an `Error` on failure.

## Example

```rust
let request = ListPrivilegeGroupsRequest::builder().build()?;
let resp = client.list_privilege_groups(request).await?;
for group in resp.groups() {
    println!("{}: {:?}", group.get_group_name(), group.get_privileges());
}
```
