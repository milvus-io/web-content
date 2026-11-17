# SearchAggregation

Hierarchical bucket-aggregation input for `SearchAsync()`: groups matching entities by fields, computes metric aggregations, orders buckets, returns top hits, and nests sub-aggregations. The output is returned as [AggregationBucket](AggregationBucket.md) entries.

```csharp
public sealed class SearchAggregation
{
    public IList<string> Fields { get; }
    public long Size { get; set; }
    public IDictionary<string, AggregationMetricSpec> Metrics { get; }
    public IList<AggregationOrder> Order { get; }
    public AggregationTopHits? TopHits { get; set; }
    public SearchAggregation? SubAggregation { get; set; }
    public long SearchSize { get; set; }
}
```

**PARAMETERS:**

- `Fields` (*IList\<string\>*) -

    The group-by field names. At least one is required. Entries are added via the collection-initializer syntax `Fields = { ... }`.

- `Size` (*long*) -

    The number of buckets to return.

- `Metrics` (*IDictionary\<string, AggregationMetricSpec\>*) -

    Metric aggregations keyed by alias. Entries are added via the collection-initializer syntax `Metrics = { ... }`.

- `Order` (*IList\<AggregationOrder\>*) -

    Ordering rules for the returned buckets; a key can be a metric alias, `_count`, or `_key`. Entries are added via the collection-initializer syntax `Order = { ... }`.

- `TopHits` (*AggregationTopHits?*) -

    Top-hit documents returned per bucket.

- `SubAggregation` (*SearchAggregation?*) -

    A nested sub-aggregation (up to four levels).

- `SearchSize` (*long*) -

    The candidate buckets searched at this level; `0` means `Size`.

## AggregationMetricOp

The operator used by a metric aggregation.

```csharp
public enum AggregationMetricOp
{
    Avg,
    Sum,
    Count,
    Min,
    Max
}
```

**Constants:**

- **Avg**

    Average of the grouped field values.

- **Sum**

    Sum of the grouped field values.

- **Count**

    Number of retained candidates per group.

- **Min**

    Minimum of the grouped field values.

- **Max**

    Maximum of the grouped field values.

## AggregationDirection

The sort direction of an aggregation bucket.

```csharp
public enum AggregationDirection
{
    Asc,
    Desc
}
```

**Constants:**

- **Asc**

    Ascending order.

- **Desc**

    Descending order (default).

## AggregationMetricSpec

A metric aggregation specification.

```csharp
public sealed class AggregationMetricSpec
{
    public AggregationMetricOp Op { get; set; }
    public string FieldName { get; set; } = "";
}
```

**PARAMETERS:**

- `Op` (*AggregationMetricOp*) -

    The aggregation operator.

- `FieldName` (*string*) -

    The aggregated field name.

## AggregationOrder

An ordering rule for the returned buckets.

```csharp
public sealed class AggregationOrder
{
    public string Key { get; set; } = "";
    public AggregationDirection Direction { get; set; }
    public bool NullFirst { get; set; }
}
```

**PARAMETERS:**

- `Key` (*string*) -

    A metric alias, `_count`, or `_key`.

- `Direction` (*AggregationDirection*) -

    The sort direction.

- `NullFirst` (*bool*) -

    Whether buckets with a null key sort first. Defaults to `false`.

## AggregationTopHits

Top-hit documents returned per bucket.

```csharp
public sealed class AggregationTopHits
{
    public long Size { get; set; }
    public IList<AggregationSort> Sort { get; }
}
```

**PARAMETERS:**

- `Size` (*long*) -

    The number of hits to return per bucket.

- `Sort` (*IList\<AggregationSort\>*) -

    Optional sort rules for the top hits. Entries are added via the collection-initializer syntax `Sort = { ... }`.

## AggregationSort

A sort rule for top hits.

```csharp
public sealed class AggregationSort
{
    public string FieldName { get; set; } = "";
    public AggregationDirection Direction { get; set; }
    public bool NullFirst { get; set; }
}
```

**PARAMETERS:**

- `FieldName` (*string*) -

    The field used to sort top hits.

- `Direction` (*AggregationDirection*) -

    The sort direction.

- `NullFirst` (*bool*) -

    Whether hits with a null field value sort first. Defaults to `false`.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});

var aggregation = new SearchAggregation
{
    Fields = { "category" },
    Size = 10,
    Metrics =
    {
        ["avg_price"] = new AggregationMetricSpec { Op = AggregationMetricOp.Avg, FieldName = "price" }
    },
    Order = { new AggregationOrder { Key = "_count", Direction = AggregationDirection.Desc } },
    TopHits = new AggregationTopHits { Size = 3 }
};

SearchResp results = await client.SearchAsync(new SearchReq
{
    CollectionName = "my_collection",
    VectorFieldName = "embedding",
    Vectors = [new[] { 0.1f, 0.2f, 0.3f, 0.4f }],
    Limit = 5,
    SearchAggregation = aggregation
});
```
