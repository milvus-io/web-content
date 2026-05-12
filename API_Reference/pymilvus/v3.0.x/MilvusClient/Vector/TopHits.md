# TopHits

A `TopHits` instance defines the representative hits returned from each bucket in a search aggregation. It specifies how many hits to return per bucket and, optionally, how to sort hits within each bucket.

This draft is based on the Search Aggregation API design inputs. Verify the final constructor signature, import path, validation rules, and property names against the PyMilvus source before publishing.

```python
class pymilvus.TopHits
```

## Constructor

Constructs a `TopHits` object for use in a `GroupBy` object.

```python
TopHits(
    size: int,
    sort: list[dict[str, str]] | None = None,
)
```

**PARAMETERS:**

- **size** (*int*) -

    **[REQUIRED]**

    The number of representative hits to return from each bucket.

    For example, `TopHits(size=3)` returns up to 3 hits from each bucket.

- **sort** (*list[dict[str, str]] | None*) -

    A list of hit-level sorting rules.

    Each item defines a field and an ordering direction:

    ```python
    sort=[{"field": "rating", "order": "desc"}]
    ```

    The `field` value must be a document-level field or `_score`. The `order` value must be `asc` or `desc`.

    `sort` controls only the order of hits within a bucket. It does not affect which buckets are returned, how buckets are ordered, or how per-bucket metrics are computed.

    If `sort` is omitted, hits are ordered by vector similarity score.

**RETURN TYPE:**

*TopHits*

**RETURNS:**

A `TopHits` object.

**EXCEPTIONS:**

- **ParamError**

    This exception may be raised when the `TopHits` specification is invalid. Examples include non-positive `size`, unsupported sort directions, unsupported sort fields, or use of bucket-level metric aliases in `sort`.

    The final exception type is pending SDK confirmation.

## Examples

```python
from pymilvus import GroupBy, TopHits

# Return the top 3 hits from each bucket by vector similarity score.
group_by = GroupBy(
    fields=["brand"],
    size=10,
    top_hits=TopHits(size=3),
)

# Return the 3 highest-rated hits from each bucket.
group_by = GroupBy(
    fields=["brand"],
    size=10,
    top_hits=TopHits(
        size=3,
        sort=[{"field": "rating", "order": "desc"}],
    ),
)

# Return only bucket keys and metrics by omitting TopHits.
group_by = GroupBy(
    fields=["brand"],
    size=10,
    metrics={
        "item_count": {"count": "*"},
        "avg_price": {"avg": "price"},
    },
    order=[{"avg_price": "desc"}],
)
```
