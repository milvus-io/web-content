# AggregationBucket

One bucket of a bucket-aggregation result, as returned by `SearchAsync()` when the request used [SearchAggregation](SearchAggregation.md). Related output types (`AggregationHit`, `AggregationHitField`, `AggregationBucketKey`) are documented in the sections below.

```csharp
public sealed class AggregationBucket
{
    public IReadOnlyList<AggregationBucketKey> Key { get; }
    public long Count { get; }
    public IReadOnlyDictionary<string, object?> Metrics { get; }
    public IReadOnlyList<AggregationHit> Hits { get; }
    public IReadOnlyList<AggregationBucket> SubGroups { get; }
}
```

**PARAMETERS:**

- `Key` (*IReadOnlyList\<AggregationBucketKey\>*) -

    The bucket key values, aligned with the group-by fields.

- `Count` (*long*) -

    The number of documents in the bucket.

- `Metrics` (*IReadOnlyDictionary\<string, object?\>*) -

    The metric values keyed by metric alias. Values are a `long`, `double`, `string` or `bool`.

- `Hits` (*IReadOnlyList\<AggregationHit\>*) -

    The top hits of the bucket.

- `SubGroups` (*IReadOnlyList\<AggregationBucket\>*) -

    The nested sub-buckets.

## AggregationBucketKey

The key value of an aggregation bucket, defined by the group-by fields of one query.

```csharp
public sealed class AggregationBucketKey
{
    public long FieldId { get; }
    public string FieldName { get; }
    public object? Value { get; }
}
```

**PARAMETERS:**

- `FieldId` (*long*) -

    The ID of the field.

- `FieldName` (*string*) -

    The name of the field.

- `Value` (*object?*) -

    The group-by field value of the bucket (a `long`, `string` or `bool`).

## AggregationHit

A top-hit document of an aggregation bucket.

```csharp
public sealed class AggregationHit
{
    public object? Id { get; }
    public float Score { get; }
    public IReadOnlyList<AggregationHitField> Fields { get; }
}
```

**PARAMETERS:**

- `Id` (*object?*) -

    The primary key of the document.

- `Score` (*float*) -

    The relevance score of the document.

- `Fields` (*IReadOnlyList\<AggregationHitField\>*) -

    The field values of the document.

## AggregationHitField

A single field value of an aggregation top-hit document.

```csharp
public sealed class AggregationHitField
{
    public long FieldId { get; }
    public string FieldName { get; }
    public object? Value { get; }
}
```

**PARAMETERS:**

- `FieldId` (*long*) -

    The ID of the field.

- `FieldName` (*string*) -

    The name of the field.

- `Value` (*object?*) -

    The field value (a `long`, `bool`, `float`, `double`, `string` or `byte[]`).
