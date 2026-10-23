# MilvusClientV2()

The Milvus gRPC client (V2).

```csharp
public sealed partial class MilvusClientV2 : IDisposable
```

All operations take a request object (DTO) and return a typed response, following the same pattern as the Java, C++, and Rust Milvus V2 SDKs. The client connects lazily: connection (and authentication) happens on the first RPC call, or when `ConnectAsync` is called explicitly. Once constructed, RPC methods may be called concurrently on the same instance.

```csharp
public MilvusClientV2(ConnectConfig config)
```

Creates a new `MilvusClientV2`, connecting to the given Milvus instance. Dispose the client with `Dispose` to release the underlying gRPC channel.

**PARAMETERS:**

- `config` (*ConnectConfig*) -

    The connection parameters, mirroring the `ConnectParam` of the C++ SDK and the `ConnectConfig` of the Java SDK. See [ConnectConfig](ConnectConfig.md).

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
