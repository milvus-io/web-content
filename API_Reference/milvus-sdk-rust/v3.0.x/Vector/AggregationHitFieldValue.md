# AggregationHitFieldValue

This enum represents a typed field value of an aggregation hit.

```rust
pub enum AggregationHitFieldValue {
    Int(i64),
    Bool(bool),
    Float(f32),
    Double(f64),
    String(String),
    Bytes(Vec<u8>),
}
```

**Constants:**

- **Int(i64)**

    Represents an integer value.

- **Bool(bool)**

    Represents a boolean value.

- **Float(f32)**

    Represents a single-precision floating-point value.

- **Double(f64)**

    Represents a double-precision floating-point value.

- **String(String)**

    Represents a string value.

- **Bytes(Vec<u8>)**

    Represents a byte string value.

Related typed aggregation result enums include `AggregationMetricValue` (metrics) and `AggregationBucketValue` (grouping keys).

## Example

```rust
match field_value {
    AggregationHitFieldValue::Int(v) => println!("int: {v}"),
    AggregationHitFieldValue::Bool(v) => println!("bool: {v}"),
    AggregationHitFieldValue::String(v) => println!("string: {v}"),
    _ => println!("unsupported aggregation hit field value"),
}
```
