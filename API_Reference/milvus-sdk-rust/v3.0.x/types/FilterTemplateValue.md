# FilterTemplateValue

This enum represents a typed placeholder value referenced by a filter template in a search or query.

```rust
pub enum FilterTemplateValue {
    Bool(bool),
    Int64(i64),
    Float(f64),
    String(String),
    BoolArray(Vec<bool>),
    Int64Array(Vec<i64>),
    FloatArray(Vec<f64>),
    StringArray(Vec<String>),
    Bytes(Vec<u8>),
}
```

**VARIANTS:**

- `Bool(bool)` - A boolean template value.
- `Int64(i64)` - A 64-bit integer template value.
- `Float(f64)` - A floating-point template value.
- `String(String)` - A string template value.
- `BoolArray(Vec<bool>)` - A boolean-array template value.
- `Int64Array(Vec<i64>)` - An int64-array template value.
- `FloatArray(Vec<f64>)` - A float-array template value.
- `StringArray(Vec<String>)` - A string-array template value.
- `Bytes(Vec<u8>)` - A raw bytes template value, used to carry a client-built membership-filter blob (for example a `BloomFilterBuilder` or `RoaringBitmapBuilder` blob).

`FilterTemplateValue` implements `From` conversions for each scalar and array type, so a value can be built with `.into()`.

## Example

```rust
let templates: HashMap<String, FilterTemplateValue> = HashMap::from([
    ("ids".into(), FilterTemplateValue::Int64Array(vec![1, 2, 3])),
    ("tag".into(), FilterTemplateValue::String("active".into())),
]);
```
