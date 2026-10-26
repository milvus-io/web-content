# RowPolicyAction

This enum specifies the operation to which a row-level security policy applies.

```rust
pub enum RowPolicyAction {
    Query,
    Search,
    Insert,
    Delete,
    Upsert,
    QueryIterator,
    SearchIterator,
    HybridSearch,
}
```

**VARIANTS:**

- `Query` - Applies to query operations.
- `Search` - Applies to search operations.
- `Insert` - Applies to insert operations.
- `Delete` - Applies to delete operations.
- `Upsert` - Applies to upsert operations.
- `QueryIterator` - Applies to query-iterator operations.
- `SearchIterator` - Applies to search-iterator operations.
- `HybridSearch` - Applies to hybrid-search operations.

## Example

```rust
let actions = [RowPolicyAction::Query, RowPolicyAction::Search];
```
