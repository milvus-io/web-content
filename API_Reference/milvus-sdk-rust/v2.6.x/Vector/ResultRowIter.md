# ResultRowIter

Borrowing iterator over the rows of a query or search result, returned by the `rows()` accessor. It reads values directly from the column-oriented result data and implements `Iterator` with `Item = ResultRow<'a>`.

```rust
pub struct ResultRowIter<'a>
```

**METHODS:**

The iterator implements the standard iterator trait methods:

- `next(&mut self) -> Option<ResultRow<'a>>`

    Advances the iterator and returns the next row, or `None` when exhausted.

- `size_hint(&self) -> (usize, Option<usize>)`

    Returns the exact number of remaining rows.

The iterator also implements `ExactSizeIterator` and `FusedIterator`.

### ResultRow

Each element yielded by the iterator is a borrowed, type-preserving view of one row. It exposes:

- `index()` (*usize*) -

    The row's zero-based position within its query result.

- `element_offset()` (*Option<i64>*) -

    The matched element's offset within its parent struct-array, `ArrayOfVector`, or array field, when present.

- `to_entity_row()` (*Result<EntityRow>*) -

    Materializes the row as an owned JSON object. See [EntityRow](EntityRow.md).

- `get(name)` (*Result<ResultValue<'a>>*) -

    A borrowed, type-preserving value for the named field.

- `is_null(name)` (*Result<bool>*) -

    Whether the named field is null in this row.

- `get_bool(name)` / `get_i8(name)` / `get_i16(name)` / `get_i32(name)` / `get_i64(name)` / `get_f32(name)` / `get_f64(name)` / `get_str(name)` -

    Typed scalar getters for the named field.

- `get_array_bool(name)` / `get_array_i8(name)` / `get_array_i16(name)` / `get_array_i32(name)` / `get_array_i64(name)` / `get_array_f32(name)` / `get_array_f64(name)` / `get_array_varchar(name)` -

    Typed array getters for the named field.

- `get_struct(name)` -

    Returns a struct (nested) field.

- `get_float_vector(name)` / `get_binary_vector(name)` / `get_float16_vector(name)` / `get_bfloat16_vector(name)` / `get_sparse_float_vector(name)` / `get_int8_vector(name)` -

    Typed vector getters for the named field.

- `get_geometry(name)` -

    Returns a geometry field.

- `get_timestamptz(name)` -

    Returns a timestamptz field.

- `get_json(name)` -

    Returns a JSON field.

## Example

```rust
let resp = client.query(request).await?;
for row in resp.results().rows()? {
    let id = row.get_i64("id")?;
    let title = row.get_str("title")?;
    println!("{id}: {title}");
}
```
