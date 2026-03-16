# Alias

Represents a collection alias with its associated database and collection name.

```go
type Alias struct {
    DbName string
    Alias string
    CollectionName string
}
```

**FIELDS:**

- **DbName** (*string*)

    The name of the associated database.

- **Alias** (*string*)

    The alias name.

- **CollectionName** (*string*)

    The name of the associated collection.