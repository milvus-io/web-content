# Ids

Primary-key values identifying the rows of a collection, used to target rows by ID in get, query, search, and delete operations.

```rust
pub enum Ids {
    Int64(Vec<i64>),
    VarChar(Vec<String>),
}
```

**Constants:**

- **Int64**

    Integer primary-key values.

- **VarChar**

    String primary-key values.

**METHODS:**

- `len()` (*usize*) -

    Returns the number of IDs.

- `is_empty()` (*bool*) -

    Whether there are no IDs.

## Example

```rust
let ids = Ids::Int64(vec![1, 2, 3]);
```
