# UpdateRowPolicy()

Replaces a named row-level security policy while preserving its server-side identity.

```rust
pub async fn update_row_policy(&self, request: UpdateRowPolicyRequest) -> Result<()>
```

The policy must exist. All definition fields replace their previous values; omitted expressions and descriptions become empty strings. The caller must hold the `ManageRLS` privilege on the collection.

## Request Syntax

```rust
let request = UpdateRowPolicyRequest::builder()
    .collection_name("books")
    .policy_name("team_policy")
    .policy_type(RowPolicyType::Restrictive)
    .actions([RowPolicyAction::Query])
    .using_expr("team == $current_principal_tags['team']")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection protected by the policy. Required.

- `policy_name: String`

    Name of the policy to replace. Required.

- `policy_type: RowPolicyType`

    Required replacement policy-combination mode; it must be `Permissive` or `Restrictive`. See [RowPolicyType](RowPolicyType.md).

- `actions: Vec<RowPolicyAction>`

    Replacement operations governed by the policy. Must contain at least one unique action. See [RowPolicyAction](RowPolicyAction.md).

- `using_expr: String`

    Replacement expression that filters rows for read and delete actions. At least one of `using_expr` and `check_expr` is required.

- `check_expr: String`

    Replacement expression that validates rows for insert and upsert actions. At least one of `using_expr` and `check_expr` is required.

- `description: String`

    Replacement description.

**RETURN TYPE:**

*Result\<()\>*

**RETURNS:**

Returns an empty result indicating success. Returns an `Error` if the request is invalid or the operation fails.

## Example

```rust
let request = UpdateRowPolicyRequest::builder()
    .collection_name("books")
    .policy_name("team_policy")
    .policy_type(RowPolicyType::Restrictive)
    .actions([RowPolicyAction::Query])
    .using_expr("team == $current_principal_tags['team']")
    .build()?;
client.update_row_policy(request).await?;
```
