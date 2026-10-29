# RowPolicyType

This enum represents the row-policy type (permissive or restrictive).

```csharp
public enum RowPolicyType
{
    Unknown = 0,
    Permissive = 1,
    Restrictive = 2
}
```

**Constants:**

- **Unknown** (0)

    Unknown policy type. Returned when the server reports a type that has no mapped value.

- **Permissive** (1)

    Permissive policy type. A row matches when any permissive policy applies.

- **Restrictive** (2)

    Restrictive policy type. A row must match all restrictive policies.
