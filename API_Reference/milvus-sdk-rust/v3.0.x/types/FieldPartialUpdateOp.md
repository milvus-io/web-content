# FieldPartialUpdateOp

This struct describes how a field value is applied during an upsert. `ArrayAppend` and `ArrayRemove` apply only to array fields and implicitly enable partial-update semantics for the request. These array operations require Milvus 2.6.17 or later.

```rust
pub struct FieldPartialUpdateOp
```

**PARAMETERS:**

- `field_name: String`

    Name of the field to update.

- `op_type: FieldPartialUpdateOpType`

    Operation applied to the field, `Replace`, `ArrayAppend`, or `ArrayRemove`. Defaults to `Replace`.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `field_name(value)` / `set_field_name(value)` / `get_field_name()` - Sets or returns the field name.
- `op_type(value)` / `set_op_type(value)` / `get_op_type()` - Sets or returns the operation type.

## FieldPartialUpdateOpType

```rust
pub enum FieldPartialUpdateOpType {
    Replace,
    ArrayAppend,
    ArrayRemove,
}
```

- `Replace` - Overwrite the existing field value. This is the default.
- `ArrayAppend` - Append the supplied elements to an existing array field.
- `ArrayRemove` - Remove every occurrence of the supplied elements from an existing array field.

## Example

```rust
let op = FieldPartialUpdateOp::new()
    .field_name("tags")
    .op_type(FieldPartialUpdateOpType::ArrayAppend);
```
