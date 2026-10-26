# RowPolicyType

This enum specifies how a row-level security policy combines with other policies attached to the same collection.

```rust
pub enum RowPolicyType {
    Unknown,
    Permissive,
    Restrictive,
}
```

**Constants:**

- `Unknown` - Unspecified or unrecognized policy type. This is the default and cannot be used to create or update a policy.
- `Permissive` - Combines policy predicates with OR across policies.
- `Restrictive` - Combines policy predicates with AND across policies.

## Example

```rust
let policy_type = RowPolicyType::Permissive;
```
