# IndexDescription

Describes an index including its type, parameters, build state, and row counts.

```go
type IndexDescription struct {
    index.Index
    State index.IndexState
    PendingIndexRows int64
    TotalRows int64
    IndexedRows int64
}
```

**FIELDS:**

- **index.Index** *(embedded)*

      Inherits methods from index.Index.

- **State** (*index.IndexState*)

      The current state.

- **PendingIndexRows** (*int64*)

      The number of rows pending indexing.

- **TotalRows** (*int64*)

      The total number of rows.

- **IndexedRows** (*int64*)

      The number of indexed rows.