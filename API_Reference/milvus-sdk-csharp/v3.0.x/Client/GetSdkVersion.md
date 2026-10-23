# GetSdkVersion()

Gets the version of this SDK.

```csharp
public string GetSdkVersion()
```

## Request Syntax

```csharp
string sdkVersion = client.GetSdkVersion();
```

**RETURN TYPE:**

*string*

**RETURNS:**

The assembly version of the `Milvus.Client.V2` package (e.g. `2.6.1.0`).

## Example

```csharp
using Milvus.Client.V2;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

Console.WriteLine(client.GetSdkVersion());
```
