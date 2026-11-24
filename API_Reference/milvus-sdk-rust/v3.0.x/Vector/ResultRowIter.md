# ResultRowIter

A borrowing iterator over the rows of a search, hybrid-search, query, or get result. It is returned by `rows()` on the corresponding response and yields `ResultRow` values, reading field values directly from the column-oriented result data.

```rust
pub struct ResultRowIter<'a>
```

The iterator implements `Iterator` with `Item = ResultRow<'a>`, and also implements `ExactSizeIterator` and `FusedIterator`.

**METHODS:**

- `next()`

    Returns the next `ResultRow` in the result, or `None` when the rows are exhausted.

- `size_hint()`

    Returns the number of rows remaining in the iterator.

## Example

```rust
let resp = client.search(request).await?;
for row in resp.rows()? {
    println!("hit #{}", row.index());
}
```
