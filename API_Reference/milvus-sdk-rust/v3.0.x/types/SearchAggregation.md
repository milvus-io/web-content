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

## Example

```rust
let aggregation = SearchAggregation::new()
    .fields(["category"])
    .size(10)
    .add_metric("avg_price", MetricSpec::new().op(MetricOp::Avg).field_name("price"));
```
