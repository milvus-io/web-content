# AggregationMetricValue

This enum represents a typed metric result of an aggregation bucket.

```rust
pub enum AggregationMetricValue {
    Int(i64),
    Double(f64),
    String(String),
    Bool(bool),
}
```

**VARIANTS:**

- `Int(i64)` - Represents an integer value.
- `Double(f64)` - Represents a floating-point value.
- `String(String)` - Represents a string value.
- `Bool(bool)` - Represents a boolean value.

Related typed aggregation result enums include `AggregationBucketValue` (grouping keys) and `AggregationHitFieldValue` (hit fields).

## Example

```rust
match metric_value {
    AggregationMetricValue::Int(v) => println!("int: {v}"),
    AggregationMetricValue::Double(v) => println!("double: {v}"),
    AggregationMetricValue::String(v) => println!("string: {v}"),
    AggregationMetricValue::Bool(v) => println!("bool: {v}"),
}
```
