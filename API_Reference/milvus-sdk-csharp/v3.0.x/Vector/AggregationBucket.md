# AggregationBucket

One bucket of a bucket-aggregation result, as returned by `SearchAsync()` when the request used [SearchAggregation](SearchAggregation.md). Related output types (`AggregationHit`, `AggregationHitField`, `AggregationBucketKey`) are documented in the sections below.

```csharp
public sealed class AggregationBucket
{
    public IReadOnlyList<AggregationBucketKey> Key { get; }
    public long Count { get; }
    public IReadOnlyDictionary<string, object> Metrics { get; }
    public IReadOnlyList<AggregationHit> Hits { get; }
    public IReadOnlyList<AggregationBucket> SubGroups { get; }
}
```

## AggregationBucket

- `Key` (*IReadOnlyList<AggregationBucketKey>*) -

    The bucket key values, aligned with the group-by fields.

- `Count` (*long*) -

    The number of documents in the bucket.

- `Metrics` (*IReadOnlyDictionary<string, object?>*) -

    The metrics value.

- `Hits` (*IReadOnlyList<AggregationHit>*) -

    The top hits of the bucket.

- `SubGroups` (*IReadOnlyList<AggregationBucket>*) -

    The nested sub-buckets.
## AggregationBucketKey

- `FieldId` (*long*) -

    The id of the field.

- `FieldName` (*string*) -

    The name of the field.

- `Value` (*object?*) -

    The field value (an `X`, `X`, `X`, `X`, `X` or `X`[]).
## AggregationHit

- `Id` (*object?*) -

    The primary key of the document.

- `Score` (*float*) -

    The relevance score of the document.

- `Fields` (*IReadOnlyList<AggregationHitField>*) -

    The field values of the document.
## AggregationHitField

- `FieldId` (*long*) -

    The id of the field.

- `FieldName` (*string*) -

    The name of the field.

- `Value` (*object?*) -

    The field value (an `X`, `X`, `X`, `X`, `X` or `X`[]).