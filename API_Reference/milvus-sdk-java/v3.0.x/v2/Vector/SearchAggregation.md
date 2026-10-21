# SearchAggregation

`SearchAggregation` defines a group-by aggregation for vector search. It groups matching entities by one or more fields, calculates metrics, orders groups, returns top hits, and can contain one nested sub-aggregation. Pass an instance to `SearchRequest.builder().searchAggregation()`.

```java
SearchAggregation.builder()
    .fields(List<String> fields)
    .size(long size)
    .metrics(Map<String, MetricSpec> metrics)
    .addMetric(String alias, MetricSpec metric)
    .order(List<OrderSpec> order)
    .addOrder(OrderSpec order)
    .topHits(TopHitsSpec topHits)
    .subAggregation(SearchAggregation subAggregation)
    .build();
```

**BUILDER METHODS:**

- `fields(List<String> fields)`

    Sets the group-by field names. The list cannot be empty.

- `addField(String field)`

    Adds one group-by field name.

- `size(long size)`

    Sets the number of groups to return. Must be greater than `0`.

- `metrics(Map<String, MetricSpec> metrics)`

    Sets metric aggregations, keyed by alias.

- `addMetric(String alias, MetricSpec metric)`

    Adds one metric aggregation under an alias.

- `order(List<OrderSpec> order)`

    Sets the ordering rules for returned groups.

- `addOrder(OrderSpec order)`

    Adds one ordering rule.

- `topHits(TopHitsSpec topHits)`

    Sets the top-hits aggregation for each group.

- `subAggregation(SearchAggregation subAggregation)`

    Sets a nested sub-aggregation applied within each group.

## MetricSpec

```java
MetricSpec.builder()
    .op(MetricOps op)
    .fieldName(String fieldName)
    .build();
```

- `op` (*MetricOps*) -

    The aggregation operation.

- `fieldName` (*String*) -

    The target field name. Use `"*"` with `MetricOps.COUNT` to count entities.

## OrderSpec

```java
OrderSpec.builder()
    .key(String key)
    .direction(AggDirection direction)
    .nullFirst(Boolean nullFirst)
    .build();
```

- `key` (*String*) -

    The metric alias, `"_count"`, or `"_key"`.

- `direction` (*AggDirection*) -

    The sort direction.

- `nullFirst` (*Boolean*) -

    Whether groups with a null value sort first. Default: `false`.

## TopHitsSpec

```java
TopHitsSpec.builder()
    .size(long size)
    .sort(List<SortSpec> sort)
    .addSort(SortSpec sort)
    .build();
```

- `size` (*long*) -

    The number of hits to return per group. Must be greater than `0`.

- `sort` (*List\<SortSpec\>*) -

    The sort rules applied to the hits in each group.

- `addSort(SortSpec sort)` -

    Adds one sort rule.

## SortSpec

```java
SortSpec.builder()
    .fieldName(String fieldName)
    .direction(AggDirection direction)
    .nullFirst(Boolean nullFirst)
    .build();
```

- `fieldName` (*String*) -

    The field used to sort top hits.

- `direction` (*AggDirection*) -

    The sort direction.

- `nullFirst` (*Boolean*) -

    Whether documents with a null value sort first. Default: `false`.

## AggDirection

- **ASC** - Ascending order.

- **DESC** - Descending order.

## MetricOps

- **AVG** - Average of the field values.

- **SUM** - Sum of the field values.

- **COUNT** - Count of entities. Typically use `fieldName = "*"`.

- **MIN** - Minimum field value.

- **MAX** - Maximum field value.

## Example

```java
import io.milvus.v2.service.vector.request.aggregation.AggregationDirection;
import io.milvus.v2.service.vector.request.aggregation.MetricOps;
import io.milvus.v2.service.vector.request.aggregation.OrderSpec;
import io.milvus.v2.service.vector.request.aggregation.SearchAggregation;
import io.milvus.v2.service.vector.request.aggregation.TopHitsSpec;

SearchAggregation aggregation = SearchAggregation.builder()
    .addField("category")
    .size(10)
    .addMetric("avg_price", MetricSpec.builder()
        .op(MetricOps.AVG)
        .fieldName("price")
        .build())
    .addOrder(OrderSpec.builder()
        .key("avg_price")
        .direction(AggDirection.DESC)
        .build())
    .topHits(TopHitsSpec.builder()
        .size(3)
        .build())
    .build();
```

**NOTES:**

- Supports at most four aggregation levels.
- Supports at most ten group-by fields in total.
- Cannot be combined with a non-zero offset, hybrid search, iterators, a highlighter, or grouping search.
