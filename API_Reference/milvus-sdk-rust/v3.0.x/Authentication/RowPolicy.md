# RowPolicy

A row-level security policy attached to a collection, as returned by [ListRowPolicies](ListRowPolicies.md).

```rust
pub struct RowPolicy
```

**METHODS:**

- `get_policy_name()` (*&str*) - The policy name.
- `get_actions()` (*&[RowPolicyAction]*) - Operations governed by the policy. See [RowPolicyAction](RowPolicyAction.md).
- `get_using_expr()` (*&str*) - Expression that filters readable rows.
- `get_check_expr()` (*&str*) - Expression that checks writable rows.
- `get_description()` (*&str*) - Policy description.
- `get_created_at()` (*i64*) - Server creation timestamp; `0` means unavailable.
- `get_policy_type()` (*RowPolicyType*) - Policy combination mode. See [RowPolicyType](RowPolicyType.md).

## Example

```rust
for policy in resp.policies() {
    println!("{}: {:?}", policy.get_policy_name(), policy.get_policy_type());
}
```
