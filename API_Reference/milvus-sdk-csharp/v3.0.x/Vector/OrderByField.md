# OrderByField

An ordering rule that sorts the returned rows by a field, either ascending or descending, carried on the wire `order_by_fields` key (serialized as `"field:asc,field:desc"`).

```csharp
public sealed class OrderByField
{
    public OrderByField(string fieldName, AggregationDirection direction = AggregationDirection.Asc)
    public string FieldName { get; }
    public AggregationDirection Direction { get; }
}
```

**PARAMETERS:**

- `FieldName` (*string*) -

    The name of the field to order by.

- `Direction` (*AggregationDirection*) -

    The sort direction. Defaults to `AggregationDirection.Asc`. See [SearchAggregation](SearchAggregation.md) for the `AggregationDirection` values.

**METHODS:**

- `OrderByField(string fieldName, AggregationDirection direction = AggregationDirection.Asc)` (*constructor*) -

    Creates a new ordering rule.

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
await client.ConnectAsync();

QueryResp results = await client.QueryAsync(new QueryReq
{
    CollectionName = "my_collection",
    Expression = "pages > 100",
    Parameters = new QueryParameters
    {
        OrderByFields = { new OrderByField("title", AggregationDirection.Desc) }
    }
});
```
