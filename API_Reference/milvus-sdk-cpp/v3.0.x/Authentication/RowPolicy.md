# RowPolicy

Describes one row-level security policy returned by `ListRowPolicies()`.

```cpp
class RowPolicy;
```

**METHODS:**

- `const std::string& PolicyName() const`

    Returns the policy name, unique within the collection.

- `RowPolicyType PolicyType() const`

    Returns the policy type. See [RowPolicyType](RowPolicyType.md).

- `const std::vector<RowPolicyAction>& Actions() const`

    Returns the row-bearing operations covered by the policy. See [RowPolicyAction](RowPolicyAction.md).

- `const std::string& UsingExpr() const`

    Returns the filter expression that controls which existing rows are visible.

- `const std::string& CheckExpr() const`

    Returns the expression that controls which new or changed rows may be written.

- `const std::string& Description() const`

    Returns the policy description.

- `int64_t CreatedAt() const`

    Returns the creation time in milliseconds since the Unix epoch, or zero when unavailable.
