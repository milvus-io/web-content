# User

Represents a user with their assigned roles, returned by DescribeUser.

```go
type User struct {
    UserName string
    Roles []string
}
```

**FIELDS:**

- **UserName** (*string*)

    The name of the user.

- **Roles** (*[]string*)

    The list of assigned roles.