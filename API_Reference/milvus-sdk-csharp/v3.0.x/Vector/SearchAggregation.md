# SearchAggregation

Hierarchical bucket-aggregation input for `SearchAsync()`: groups matching entities by fields, computes metric aggregations, orders buckets, returns top hits, and nests sub-aggregations. The output is returned as [AggregationBucket](AggregationBucket.md) entries.

```csharp
public sealed class SearchAggregation
{
    public IReadOnlyList<string> Fields { get; set; }
    public int Size { get; set; }
    public IReadOnlyDictionary<string, AggregationMetricSpec> Metrics { get; set; }
    public IReadOnlyList<AggregationOrder> Order { get; set; }
    public AggregationTopHits TopHits { get; set; }
    public SearchAggregation SubAggregation { get; set; }
}
```

**FIELDS:**

- `Fields` - The group-by field names. At least one is required.

- `Size` - The number of buckets to return.

- `Metrics` - Metric aggregations keyed by alias.

- `Order` - Ordering rules for the returned buckets; a key can be a metric alias, `_count`, or `_key`.

- `TopHits` - Top-hit documents returned per bucket.

- `SubAggregation` - A nested sub-aggregation (up to four levels).

## AggregationMetricOp

- `Avg` - Average of the grouped field values.

- `Sum` - Sum of the grouped field values.

- `Count` - Number of retained candidates per group.

- `Min` - Minimum of the grouped field values.

- `Max` - Maximum of the grouped field values.

## AggregationDirection

- `Asc` - Ascending order.

- `Desc` - Descending order (default).

## AggregationMetricSpec

- `Op` - The aggregation operator (an `AggregationMetricOp`).

- `FieldName` - The aggregated field name.

## AggregationOrder

- `Key` - A metric alias, `_count`, or `_key`.

- `Direction` - The sort direction (an `AggregationDirection`).

## AggregationTopHits

- `Size` - The number of hits to return per bucket.

- `Sort` - Optional sort rules (`AggregationSort` entries).

## AggregationSort

- `FieldName` - The field used to sort top hits.

- `Direction` - The sort direction (an `AggregationDirection`).
