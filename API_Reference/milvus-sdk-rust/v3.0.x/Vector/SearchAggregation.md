# SearchAggregation

This struct describes one level of hierarchical bucket aggregation for a search request, recursively nestable. Attach it to a search request with `SearchRequestBuilder::search_aggregation`. It is mutually exclusive with `group_by_field`; when set, the search `limit` is ignored and `size` controls the top-level bucket count.

```rust
pub struct SearchAggregation
```

**PARAMETERS:**

- `fields: Vec<String>`

    Group-by fields. Must contain at least one field.

- `size: i64`

    Maximum number of buckets returned at this level. Must be positive.

- `metrics: HashMap<String, MetricSpec>`

    Metric aggregations keyed by alias.

- `order: Vec<OrderSpec>`

    Ordering rules applied to the buckets at this level. Each key is a metric alias or one of the special keys `_count`/`_key`.

- `top_hits: Option<TopHitsSpec>`

    Document snapshot returned for each bucket at this level.

- `sub_aggregation: Option<Box<SearchAggregation>>`

    Nested recursive aggregation level.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `fields(value)` / `set_fields(value)` / `get_fields()` - Sets or returns the group-by fields.
- `add_field(value)` - Appends a group-by field.
- `size(value)` / `set_size(value)` / `get_size()` - Sets or returns the maximum bucket count.
- `metrics(value)` / `set_metrics(value)` / `get_metrics()` - Sets or returns the metric aggregations.
- `add_metric(alias, value)` - Adds a metric aggregation by alias.
- `order(value)` / `set_order(value)` / `get_order()` - Sets or returns the ordering rules.
- `add_order(value)` - Appends an ordering rule.
- `top_hits(value)` / `set_top_hits(value)` / `get_top_hits()` - Sets or returns the top-hits snapshot.
- `sub_aggregation(value)` / `set_sub_aggregation(value)` / `get_sub_aggregation()` - Sets or returns the nested level.
- `validate()` - Validates that the aggregation can be attached to a search request.

## MetricOp

- `Avg` - Average of the grouped values. Default operator for `MetricSpec::new()`.

- `Sum` - Sum of the grouped values.

- `Count` - Number of retained candidates in each group; `NULL` values are skipped when a field is specified.

- `Min` - Minimum of the grouped values.

- `Max` - Maximum of the grouped values.

## AggDirection

- `Asc` - Sort aggregation buckets in ascending order.

- `Desc` - Sort aggregation buckets in descending order. This is the default direction.

> `SortDirection` is a deprecated alias for `AggDirection`, retained for compatibility with Rust SDK 3.0.0.

## MetricSpec

A metric aggregation over a field, keyed by alias in `SearchAggregation`.

```rust
MetricSpec::new()
    .op(MetricOp::Avg)
    .field_name("price")
```

**METHODS:**

- `op(value)` / `set_op(value)` / `get_op()` - Sets or returns `MetricOp`.
- `field_name(value)` / `set_field_name(value)` / `get_field_name()` - Sets or returns the target field.

## OrderSpec

An ordering rule applied to buckets at an aggregation level.

```rust
OrderSpec::new()
    .key("avg_price")
    .direction(AggDirection::Desc)
    .null_first(false)
```

**METHODS:**

- `key(value)` / `set_key(value)` / `get_key()` - Sets or returns the metric alias, `"_count"`, or `"_key"`.
- `direction(value)` / `set_direction(value)` / `get_direction()` - Sets or returns `AggDirection`.
- `null_first(value)` / `set_null_first(value)` / `is_null_first()` - Sets or returns whether null values sort first.

## TopHitsSpec

A document snapshot returned for each bucket at an aggregation level.

```rust
TopHitsSpec::new()
    .size(3)
    .sort([SortSpec::new().field_name("price").direction(AggDirection::Desc)])
```

**METHODS:**

- `size(value)` / `set_size(value)` / `get_size()` - Sets or returns the number of top hits per bucket.
- `sort(values)` / `set_sort(values)` / `get_sort()` - Sets or returns `SortSpec` rules.
- `add_sort(value)` - Appends a `SortSpec` rule.

## SortSpec

A top-hits sort criterion.

```rust
SortSpec::new()
    .field_name("price")
    .direction(AggDirection::Desc)
    .null_first(false)
```

**METHODS:**

- `field_name(value)` / `set_field_name(value)` / `get_field_name()` - Sets or returns the field to sort by.
- `direction(value)` / `set_direction(value)` / `get_direction()` - Sets or returns `AggDirection`.
- `null_first(value)` / `set_null_first(value)` / `is_null_first()` - Sets or returns whether null values sort first.

## Example

```rust
let aggregation = SearchAggregation::new()
    .fields(["category"])
    .size(10)
    .add_metric("avg_price", MetricSpec::new().op(MetricOp::Avg).field_name("price"));
```
