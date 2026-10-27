# create_row_policy()

Creates a row-level security policy on a collection.

```rust
pub async fn create_row_policy(&self, request: CreateRowPolicyRequest) -> Result<()>
```

Creating a policy with an existing name is an error. The caller must hold the `ManageRLS` privilege on the collection.

## Request Syntax

```rust
let request = CreateRowPolicyRequest::builder()
    .collection_name("books")
    .policy_name("team_policy")
    .policy_type(RowPolicyType::Permissive)
    .actions([RowPolicyAction::Query, RowPolicyAction::Search])
    .using_expr("team == $current_principal_tags['team']")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection protected by the policy. Required.

- `policy_name: String`

    Name of the policy. Required.

- `policy_type: RowPolicyType`

    How the policy combines with the collection's other policies. Must be `Permissive` or `Restrictive`. See [RowPolicyType](RowPolicyType.md).

- `actions: Vec<RowPolicyAction>`

    Operations governed by the policy. Must contain at least one unique action. See [RowPolicyAction](RowPolicyAction.md).

- `using_expr: String`

    Expression that filters rows for read and delete actions. At least one of `using_expr` and `check_expr` is required.

- `check_expr: String`

    Expression that validates rows for insert and upsert actions. At least one of `using_expr` and `check_expr` is required.

- `description: String`

    Optional description of the policy.

**RETURN TYPE:**

*Result\<()\>*

**RETURNS:**

Returns an empty result indicating success. Returns an `Error` if the request is invalid or the operation fails.

## Example

```rust
let request = CreateRowPolicyRequest::builder()
    .collection_name("books")
    .policy_name("team_policy")
    .policy_type(RowPolicyType::Permissive)
    .actions([RowPolicyAction::Query, RowPolicyAction::Search])
    .using_expr("team == $current_principal_tags['team']")
    .build()?;
client.create_row_policy(request).await?;
```
