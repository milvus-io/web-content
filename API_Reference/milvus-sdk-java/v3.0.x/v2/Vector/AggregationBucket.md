# AggregationBucket

One bucket of a bucket-aggregation result, as returned by `search()` and `hybridSearch()` when the request used `SearchAggregation`. Each bucket groups the matching entities by the configured group-by fields.

```java
class io.milvus.v2.service.vector.response.aggregation.AggregationBucket
```

**METHODS:**

- **getKey()** (*List<KeyEntry>*) -

    The group-by key entries. Each **KeyEntry** (a nested class of **AggregationBucket**) exposes the following getters:

    - **getFieldId()** (*long*) -

        The ID of the group-by field.

    - **getFieldName()** (*String*) -

        The name of the group-by field.

    - **getValue()** (*Object*) -

        The group-by value shared by all hits in this bucket.

- **getCount()** (*long*) -

    The number of entities in this bucket.

- **getMetrics()** (*Map<String, Object>*) -

    The computed metric values keyed by alias (for example `avg_price`).

- **getHits()** (*List<AggregationHit>*) -

    The top hits of this bucket when `top_hits` was configured. See [AggregationHit](AggregationHit.md).

- **getSubGroups()** (*List<AggregationBucket>*) -

    The nested sub-aggregation buckets, when the request configured a `sub_aggregation`.

## Example

```java
for (List<AggregationBucket> buckets : resp.getAggregationBuckets()) {
    for (AggregationBucket bucket : buckets) {
        System.out.println(bucket.getCount());
        for (AggregationHit hit : bucket.getHits()) {
            System.out.println(hit.getId() + " -> " + hit.getScore());
        }
    }
}
```