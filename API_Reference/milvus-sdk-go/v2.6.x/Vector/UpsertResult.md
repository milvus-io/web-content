# UpsertResult

Contains the result of an Upsert operation including the count and IDs of affected entities.

```go
type UpsertResult struct {
    UpsertCount int64
    IDs column.Column
}
```

**FIELDS:**

- **UpsertCount** (*int64*)

      The number of affected entities.

- **IDs** (*column.Column*)

      The IDs of the affected entities.