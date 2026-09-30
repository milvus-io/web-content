# OrderByField

This struct specifies a scalar field and direction used to order query or search results.

```rust
pub struct OrderByField
```

**PARAMETERS:**

- `field_name: String`

    Name of the scalar field to order by.

- `direction: AggDirection`

    Sort direction, `Asc` or `Desc`. Defaults to `Asc`.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `field_name(value)` / `set_field_name(value)` / `get_field_name()` - Sets or returns the field name.
- `direction(value)` / `set_direction(value)` / `get_direction()` - Sets or returns the sort direction.

## Example

```rust
let order = OrderByField::new()
    .field_name("price")
    .direction(AggDirection::Desc);
```
