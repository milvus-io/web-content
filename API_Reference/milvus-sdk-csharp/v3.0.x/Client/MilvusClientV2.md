# MilvusClientV2

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

    The connection parameters, mirroring the `ConnectParam` of the C++ SDK and the `ConnectConfig` of the Java SDK. See [ConnectConfig](#connectconfig).

## ConnectConfig

The connection parameters for `MilvusClientV2`.

```csharp
public sealed class ConnectConfig
{
    public string Uri { get; set; } = "";
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? ApiKey { get; set; }
    public string? Database { get; set; }
    public TimeSpan? ConnectTimeout { get; set; }
    public TimeSpan? KeepAliveTime { get; set; }
    public TimeSpan? KeepAliveTimeout { get; set; }
    public bool? KeepAliveWithoutCalls { get; set; }
    public ILoggerFactory? LoggerFactory { get; set; }
    public GrpcChannelOptions? ChannelOptions { get; set; }
    public RetryConfig? Retry { get; set; }
}
```

**PARAMETERS:**

- `Uri` (*string*) -

    The URI to connect to. This can be a cloud instance endpoint or an address such as `"http://localhost:19530"`. If the scheme is omitted, `http://` is assumed.

- `Username` (*string?*) -

    The username to authenticate with.

- `Password` (*string?*) -

    The password to authenticate with.

- `ApiKey` (*string?*) -

    An API key to authenticate with, instead of a username and password.

- `Database` (*string?*) -

    The database to connect to. Defaults to the default Milvus database.

- `ConnectTimeout` (*TimeSpan?*) -

    An optional timeout applied to all gRPC calls made by the client. When set, it is used as the gRPC call deadline.

- `KeepAliveTime` (*TimeSpan?*) -

    The keepalive ping delay applied to the gRPC channel (default 10 seconds). Ignored when `ChannelOptions` is set.

- `KeepAliveTimeout` (*TimeSpan?*) -

    The keepalive ping timeout (default 5 seconds). Ignored when `ChannelOptions` is set.

- `KeepAliveWithoutCalls` (*bool?*) -

    Whether keepalive pings are sent even when there are no active calls (default true). Ignored when `ChannelOptions` is set.

- `LoggerFactory` (*ILoggerFactory?*) -

    An optional logger factory through which the Milvus client will log.

- `ChannelOptions` (*GrpcChannelOptions?*) -

    Optional gRPC channel options used when creating the internal channel. When unset, a default channel with keepalive pings is created.

- `Retry` (*RetryConfig?*) -

    The retry policy applied to RPC calls. When `null`, a default [RetryConfig](#retryconfig) is used.

## RetryConfig

The retry policy for RPC calls.

```csharp
public sealed class RetryConfig
{
    public int MaxRetryTimes { get; set; } = 75;
    public TimeSpan InitialBackOff { get; set; } = TimeSpan.FromMilliseconds(10);
    public TimeSpan MaxBackOff { get; set; } = TimeSpan.FromSeconds(3);
    public int BackOffMultiplier { get; set; } = 3;
    public bool RetryOnRateLimit { get; set; } = true;
    public TimeSpan? MaxRetryTimeout { get; set; }
}
```

**PARAMETERS:**

- `MaxRetryTimes` (*int*) -

    The maximum number of total attempts (the initial call plus its retries). A value of 1 disables retrying.

- `InitialBackOff` (*TimeSpan*) -

    The initial backoff before the first retry.

- `MaxBackOff` (*TimeSpan*) -

    The maximum backoff between retries.

- `BackOffMultiplier` (*int*) -

    The multiplier applied to the backoff after each attempt (exponential backoff).

- `RetryOnRateLimit` (*bool*) -

    Whether to retry on `RateLimit` server errors. Defaults to `true`.

- `MaxRetryTimeout` (*TimeSpan?*) -

    An optional overall timeout for the whole retry loop. `null` (or `TimeSpan.Zero`) means no overall cap; only `MaxRetryTimes` applies.

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
