# RowPolicyAction

Defines the row-bearing operation covered by a row policy. Numeric values mirror the server protocol and must not be renumbered.

```cpp
enum class RowPolicyAction {
    QUERY = 0,
    SEARCH = 1,
    INSERT = 2,
    DELETE_ROWS = 3,
    UPSERT = 4,
    QUERY_ITERATOR = 5,
    SEARCH_ITERATOR = 6,
    HYBRID_SEARCH = 7,
};
```

**Constants:**

- **QUERY** (0)

    Covers row reads through query operations.

- **SEARCH** (1)

    Covers row reads through vector search operations.

- **INSERT** (2)

    Covers insertion of new rows.

- **DELETE_ROWS** (3)

    Covers deletion of existing rows. The name avoids the Windows `DELETE` macro.

- **UPSERT** (4)

    Covers partial or whole-row upsert writes.

- **QUERY_ITERATOR** (5)

    Covers paged reads through query iterators.

- **SEARCH_ITERATOR** (6)

    Covers paged reads through search iterators.

- **HYBRID_SEARCH** (7)

    Covers hybrid multi-vector search operations.
