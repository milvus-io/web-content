# AggregationHit

`AggregationHit` represents one entity returned as a representative hit inside an `AggregationBucket`. PyMilvus creates these objects from the server response; applications do not construct them directly.

```python
class pymilvus.AggregationHit
```

## Properties and methods

- **pk** (*int | str | None*) -

    The entity primary key.

- **score** (*float*) -

    The vector similarity score or distance returned for the entity.

- **fields** (*dict[str, Any]*) -

    The requested output fields keyed by field name.

- **field_ids()** (*dict[str, int]*) -

    Returns a mapping from each returned field name to its numeric schema field ID.

The `fields` and `field_ids()` mappings are copies. Changing them does not mutate the hit object.

## Example

```python
bucket = result.agg_buckets[0][0]

for hit in bucket.hits:
    print(hit.pk)
    print(hit.score)
    print(hit.fields)
    print(hit.field_ids())
```
