# RowPolicyType

Defines whether a row policy is permissive or restrictive. Numeric values mirror the server protocol and must not be renumbered.

```cpp
enum class RowPolicyType {
    UNKNOWN = 0,
    PERMISSIVE = 1,
    RESTRICTIVE = 2,
};
```

**Constants:**

- **UNKNOWN** (0)

    The policy type is unset or unknown.

- **PERMISSIVE** (1)

    At least one applicable permissive policy is required to admit a row.

- **RESTRICTIVE** (2)

    Every applicable restrictive policy must admit a row.
