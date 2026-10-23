# GetMetricsAsync()

Gets the metrics of the Milvus server.

```csharp
public async Task<GetMetricsResp> GetMetricsAsync(GetMetricsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetMetricsReq
{
    Request = "{\"metric_type\":\"system_info\"}"
};

GetMetricsResp result = await client.GetMetricsAsync(request);
```

**REQUEST PARAMETERS:**

- `Request` (*string*) -

    The metric request string, e.g. `{"metric_type":"system_info"}` (the server requires a JSON object carrying a `metric_type` or `req_type` key).

**RETURN TYPE:**

*Task\<GetMetricsResp\>*

**RETURNS:**

A **GetMetricsResp** object that contains the metrics payload and the component that produced it.

```csharp
GetMetricsResp
    Response       // -> string
    ComponentName  // -> string
```

**PARAMETERS:**

- **Response** (*string*) -

    The metrics payload, in the server's configured metrics format.

- **ComponentName** (*string*) -

    The name of the component that produced the metrics.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

GetMetricsResp result = await client.GetMetricsAsync(new GetMetricsReq
{
    Request = "{\"metric_type\":\"system_info\"}"
});

Console.WriteLine(result.Response);
```
