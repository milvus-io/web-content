# Role

Represents a role with its granted privileges, returned by DescribeRole.

```go
type Role struct {
    RoleName string
    Privileges []GrantItem
}
```

**FIELDS:**

- **RoleName** (*string*)

      The name of the role.

- **Privileges** (*[]GrantItem*)

      The list of granted privileges.