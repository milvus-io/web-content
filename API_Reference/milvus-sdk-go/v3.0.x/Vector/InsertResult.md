# InsertResult

Contains the result of an Insert operation including the count and IDs of inserted entities.

```go
type InsertResult struct {
    InsertCount int64
    IDs column.Column
}
```

**FIELDS:**

- **InsertCount** (*int64*)

    The number of affected entities.

- **IDs** (*column.Column*)

    The IDs of the affected entities.