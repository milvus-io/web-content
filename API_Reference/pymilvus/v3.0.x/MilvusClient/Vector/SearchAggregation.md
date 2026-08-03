# SearchAggregation

A `SearchAggregation` instance defines one level of bucket aggregation for a vector search. It controls the bucket key, bucket limit, per-bucket metrics, bucket ordering, representative hits, and an optional nested aggregation.

```python
class pymilvus.SearchAggregation
```

## Constructor

```python
SearchAggregation(
    fields: list[str],
    size: int,
    metrics: dict[str, dict[str, str]] | None = None,
    order: list[dict[str, str]] | None = None,
    top_hits: TopHits | None = None,
    sub_aggregation: SearchAggregation | None = None,
)
```

**PARAMETERS:**

- **fields** (*list[str]*) **[REQUIRED]** -

    A non-empty list of scalar field names that form the bucket key. Multiple fields form a composite key in list order. JSON paths such as `meta["region"]` are not accepted.

- **size** (*int*) **[REQUIRED]** -

    The maximum number of buckets returned at this aggregation level. The value must be a positive integer.

- **metrics** (*dict[str, dict[str, str]] | None*) -

    Per-bucket metric definitions. Each key is a metric alias and each value is a single-key dictionary in the form `{operation: field}`. Supported operations are `count`, `sum`, `avg`, `min`, and `max`. Only `count` accepts `"*"`; the other operations require a field name or `_score`.

- **order** (*list[dict[str, str]] | None*) -

    Bucket ordering rules evaluated in list order. Each item must contain one metric alias, `_count`, or `_key`, mapped to `"asc"` or `"desc"`.

- **top_hits** (*TopHits | None*) -

    Configures representative entities returned from each bucket.

- **sub_aggregation** (*SearchAggregation | None*) -

    Defines a nested bucket level under each bucket at the current level.

**RETURN TYPE:**

*SearchAggregation*

**EXCEPTIONS:**

- **ParamError** - Raised for empty or invalid fields, a non-positive size, unsupported metric definitions, invalid ordering keys or directions, or objects of the wrong type.

## Example

```python
from pymilvus import SearchAggregation, TopHits

aggregation = SearchAggregation(
    fields=["category"],
    size=5,
    metrics={
        "product_count": {"count": "*"},
        "avg_price": {"avg": "price"},
    },
    order=[{"product_count": "desc"}, {"_key": "asc"}],
    sub_aggregation=SearchAggregation(
        fields=["brand"],
        size=3,
        top_hits=TopHits(
            size=2,
            sort=[{"rating": "desc"}, {"_score": "desc"}],
        ),
    ),
)
```
