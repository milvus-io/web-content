# AggregationHit

A single hit inside an aggregation bucket, as returned by `search()` and `hybridSearch()` when the request used `SearchAggregation`. See [AggregationBucket](AggregationBucket.md).

```java
class io.milvus.v2.service.vector.response.aggregation.AggregationHit
```

**METHODS:**

- **getId()** (*Object*) -

    The primary key value of the hit.

- **getScore()** (*Float*) -

    The similarity score of the hit.

- **getFields()** (*Map<String, Object>*) -

    The output field values of the hit, keyed by field name.

- **getFieldIds()** (*Map<String, Long>*) -

    The field IDs corresponding to the entries in `fields`.

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
