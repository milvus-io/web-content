# AggregationBucketValue

This enum represents a typed grouping-key value of an aggregation bucket.

```rust
pub enum AggregationBucketValue {
    Int(i64),
    String(String),
    Bool(bool),
}
```

**Constants:**

- **Int(i64)**

    Represents an integer value.

- **String(String)**

    Represents a string value.

- **Bool(bool)**

    Represents a boolean value.

Related typed aggregation result enums include `AggregationMetricValue` (metrics) and `AggregationHitFieldValue` (hit fields).

## Example

```rust
match bucket_value {
    AggregationBucketValue::Int(v) => println!("int: {v}"),
    AggregationBucketValue::String(v) => println!("string: {v}"),
    AggregationBucketValue::Bool(v) => println!("bool: {v}"),
    _ => println!("unsupported aggregation bucket value"),
}
```
