# RevokePrivilege()

Revokes a privilege from a role.

```rust
pub async fn revoke_privilege(&self, request: RevokePrivilegeRequest) -> Result<()>
```

Collection-scoped revokes use the v2 privilege RPC; revokes configured with the legacy `object_type`/`object_name` surface use the v1 `OperatePrivilege` RPC. The two surfaces are mutually exclusive.

## Request Syntax

```rust
let request = RevokePrivilegeRequest::builder()
    .role_name("analyst")
    .database_name("default")
    .collection_name("books")
    .privilege("Search")
    .build()?;
```

**REQUEST FIELDS:**

- `role_name: String`

    Name of the role losing the privilege. Required.

- `database_name: String`

    Database that owns the target resource. Required.

- `collection_name: String`

    Name of the collection the privilege applies to. Required unless the legacy `object_type`/`object_name` surface is used.

- `privilege: String`

    Name of the privilege to revoke, for example `Search`, `Query`, or `Insert`. Required.

- `object_type: Option<String>`

    Legacy v1 object type, for example `User` or `Global`. Must be paired with `object_name`; mutually exclusive with `collection_name`.

- `object_name: Option<String>`

    Legacy v1 object name. Must be paired with `object_type`; mutually exclusive with `collection_name`.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = RevokePrivilegeRequest::builder()
    .role_name("analyst")
    .database_name("default")
    .collection_name("books")
    .privilege("Search")
    .build()?;
client.revoke_privilege(request).await?;
```
