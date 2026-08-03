# TopHits

A `TopHits` instance configures the representative entities returned from each `SearchAggregation` bucket.

```python
class pymilvus.TopHits
```

## Constructor

```python
TopHits(
    size: int,
    sort: list[dict[str, str]] | None = None,
)
```

**PARAMETERS:**

- **size** (*int*) **[REQUIRED]** -

    The maximum number of representative entities returned from each bucket. The value must be a positive integer.

- **sort** (*list[dict[str, str]] | None*) -

    Hit ordering rules evaluated in list order. Each item is a single-key dictionary mapping a scalar field name or `_score` to `"asc"` or `"desc"`. If omitted, the server uses its default hit order.

**RETURN TYPE:**

*TopHits*

**EXCEPTIONS:**

- **ParamError** - Raised when `size` is not a positive integer or `sort` is not a list of single-key dictionaries with valid directions.

## Example

```python
from pymilvus import SearchAggregation, TopHits

aggregation = SearchAggregation(
    fields=["brand"],
    size=10,
    top_hits=TopHits(
        size=3,
        sort=[{"rating": "desc"}, {"_score": "desc"}],
    ),
)
```
