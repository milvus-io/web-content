# RefreshLoadAsync()

Refreshes the loaded data of a collection.

```csharp
public async Task RefreshLoadAsync(RefreshLoadReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new RefreshLoadReq
{
    CollectionName = "my_collection",
    Sync = true,
    TimeoutMilliseconds = 60000
};

await client.RefreshLoadAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection to refresh.

- `Sync` (*bool*) -

    Whether to wait until the collection is fully loaded again. Defaults to `true`.

- `TimeoutMilliseconds` (*long?*) -

    The timeout for waiting for the collection to be fully loaded, in milliseconds. Defaults to 60000.

**RETURN TYPE:**

*Task*

**RETURNS:**

This method does not return a value.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.RefreshLoadAsync(new RefreshLoadReq
{
    CollectionName = "my_collection",
    Sync = true,
    TimeoutMilliseconds = 60000
});
```
