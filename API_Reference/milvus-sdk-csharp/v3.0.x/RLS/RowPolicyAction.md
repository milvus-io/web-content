# RowPolicyAction

This enum represents the row-policy action a row policy governs (query/search/insert/delete/upsert/iterators).

```csharp
public enum RowPolicyAction
{
    Unknown = -1,
    Query = 0,
    Search = 1,
    Insert = 2,
    Delete = 3,
    Upsert = 4,
    QueryIterator = 5,
    SearchIterator = 6,
    HybridSearch = 7
}
```

**Constants:**

- **Unknown** (-1)

    Unknown action. Returned when the server reports an action code that has no mapped value.

- **Query** (0)

    Query action.

- **Search** (1)

    Search action.

- **Insert** (2)

    Insert action.

- **Delete** (3)

    Delete action.

- **Upsert** (4)

    Upsert action.

- **QueryIterator** (5)

    Query iterator action.

- **SearchIterator** (6)

    Search iterator action.

- **HybridSearch** (7)

    Hybrid search action.
