# ConnectConfig

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

    The retry policy applied to RPC calls. When `null`, a default [RetryConfig](RetryConfig.md) is used.
