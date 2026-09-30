# Database

Represents a database and its properties, returned by DescribeDatabase.

```go
type Database struct {
    Name       string
    Properties map[string]string
}
```

**FIELDS:**

- **Name** (*string*)

    The name of the database.

- **Properties** (*map[string]string*)

    The properties of the database.
