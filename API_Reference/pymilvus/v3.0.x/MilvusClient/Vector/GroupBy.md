# GroupBy

A `GroupBy` instance defines one bucket level in a search aggregation. It specifies which fields form the bucket key, how many buckets to return, which metrics to compute for each bucket, how to order buckets, whether to return representative hits, and whether to create nested child buckets.

This draft is based on the Search Aggregation API design inputs. Verify the final constructor signature, import path, validation rules, and property names against the PyMilvus source before publishing.

```python
class pymilvus.GroupBy
```

## Constructor

Constructs a `GroupBy` object for use in `MilvusClient.search(group_by=...)`.

```python
GroupBy(
    fields: list[str],
    size: int,
    metrics: dict[str, dict] | None = None,
    order: list[dict[str, str]] | None = None,
    top_hits: TopHits | None = None,
    sub_group: GroupBy | None = None,
)
```

**PARAMETERS:**

- **fields** (*list[str]*) -

    **[REQUIRED]**

    A list of field names that form the bucket key for this aggregation level.

    A single field creates one bucket per field value. Multiple fields create a composite bucket key. For example, `fields=["brand", "color"]` creates one bucket for each `(brand, color)` combination.

- **size** (*int*) -

    **[REQUIRED]**

    The maximum number of buckets to return at this aggregation level.

    For the root `GroupBy`, this value controls the number of top-level buckets. For a nested `GroupBy`, this value controls the number of child buckets returned under each parent bucket.

- **metrics** (*dict[str, dict] | None*) -

    A dictionary that defines per-bucket metrics.

    The dictionary key is the metric alias. The dictionary value defines one metric operation and its input field.

    ```python
    metrics={
        "item_count": {"count": "*"},
        "avg_price": {"avg": "price"},
        "best_score": {"max": "_score"},
    }
    ```

    Supported Phase 1 operations are:

    - `count`

    - `sum`

    - `avg`

    - `min`

    - `max`

    The special field `_score` refers to the vector similarity score. In the current design, `_score` can be used with `avg`, `sum`, `min`, and `max`.

- **order** (*list[dict[str, str]] | None*) -

    A list of bucket ordering rules.

    Each item contains one ordering key and one direction. The direction must be `asc` or `desc`.

    ```python
    order=[{"avg_price": "desc"}, {"_count": "desc"}]
    ```

    Valid ordering keys are:

    - A metric alias defined in `metrics` on the same `GroupBy` level.

    - `_count`, which orders buckets by the number of ANN-retrieved entities in the bucket.

    - `_key`, which orders buckets by their bucket key values.

    Bucket ordering controls both which buckets appear in the top `size` results and the order in which those buckets are returned.

    Earlier design inputs used `dict[str, str]` for `order`. The current working assumption is `list[dict[str, str]]` to preserve explicit multi-criteria ordering. Verify this against the final SDK.

- **top_hits** (*[TopHits](https://TopHits.md) | None*) -

    A `TopHits` object that defines the representative hits to return from each bucket at this level.

    If this parameter is omitted, this level returns bucket keys, metrics, and sub-groups only. Omitting `top_hits` is useful for pure aggregation levels.

- **sub_group** (*GroupBy | None*) -

    A child `GroupBy` object that defines nested grouping under each bucket at this level.

    Each nested level has its own `fields`, `size`, `metrics`, `order`, and `top_hits`.

**RETURN TYPE:**

*GroupBy*

**RETURNS:**

A `GroupBy` object.

**EXCEPTIONS:**

- **ParamError**

    This exception may be raised when the `GroupBy` specification is invalid. Examples include missing required fields, non-positive `size`, an `order` key that does not reference a metric alias or a reserved key, unsupported metric operations, unsupported field types, or excessive nesting depth.

    The final exception type is pending SDK confirmation.

## Examples

```python
from pymilvus import GroupBy, TopHits

# Group by a single field and return representative hits.
group_by = GroupBy(
    fields=["brand"],
    size=10,
    top_hits=TopHits(size=3),
)

# Group by a composite key, compute metrics, and order buckets by a metric.
group_by = GroupBy(
    fields=["brand", "color"],
    size=10,
    metrics={
        "item_count": {"count": "*"},
        "avg_price": {"avg": "price"},
    },
    order=[{"avg_price": "desc"}, {"_count": "desc"}],
    top_hits=TopHits(
        size=3,
        sort=[{"field": "rating", "order": "desc"}],
    ),
)

# Create nested buckets.
group_by = GroupBy(
    fields=["category"],
    size=5,
    metrics={"total_revenue": {"sum": "price"}},
    order=[{"total_revenue": "desc"}],
    sub_group=GroupBy(
        fields=["brand"],
        size=3,
        metrics={"avg_rating": {"avg": "rating"}},
        order=[{"avg_rating": "desc"}],
        top_hits=TopHits(size=3),
    ),
)
```
