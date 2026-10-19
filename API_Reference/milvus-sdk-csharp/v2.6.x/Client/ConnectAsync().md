# ConnectAsync()

Connects to the Milvus server, registering the client info (SDK type/version, user, host, local time). Recommended before using other APIs so connection/authentication failures surface up front. If not called explicitly, the first API call connects lazily.

```csharp
public async Task ConnectAsync(CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
await client.ConnectAsync();
```

**RETURN TYPE:**

*Task*

**RETURNS:**

This method does not return a value.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();
```
