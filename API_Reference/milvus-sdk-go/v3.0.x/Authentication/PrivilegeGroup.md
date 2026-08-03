# PrivilegeGroup

Represents a named group of privileges that can be granted together.

```go
type PrivilegeGroup struct {
    GroupName string
    Privileges []string
}
```

**FIELDS:**

- **GroupName** (*string*)

    The name of the privilege group.

- **Privileges** (*[]string*)

    The list of granted privileges.