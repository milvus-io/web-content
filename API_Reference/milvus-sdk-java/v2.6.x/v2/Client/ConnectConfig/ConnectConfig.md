# ConnectConfig

A ConnectConfig builder holds the connection configuration used when creating a `MilvusClientV2` instance. Use the builder pattern to configure all connection parameters, including authentication, TLS, timeouts, and keepalive settings.

```java
ConnectConfig.builder()
    .uri(String uri)
    .token(String token)
    .username(String username)
    .password(String password)
    .dbName(String dbName)
    .connectTimeoutMs(long connectTimeoutMs)
    .keepAliveTimeMs(long keepAliveTimeMs)
    .keepAliveTimeoutMs(long keepAliveTimeoutMs)
    .keepAliveWithoutCalls(boolean keepAliveWithoutCalls)
    .rpcDeadlineMs(long rpcDeadlineMs)
    .secure(Boolean secure)
    .enablePrecheck(boolean enablePrecheck)
    .idleTimeoutMs(long idleTimeoutMs)
    .clientKeyPath(String clientKeyPath)
    .clientPemPath(String clientPemPath)
    .caPemPath(String caPemPath)
    .serverPemPath(String serverPemPath)
    .serverName(String serverName)
    .proxyAddress(String proxyAddress)
    .build()
```

**BUILDER METHODS:**

- `uri(String uri)` -

    **[REQUIRED]**

    The server endpoint URI. Accepts `http:*//*host:port` for a local Milvus instance or an HTTPS URL for Zilliz Cloud.

- `token(String token)` -

    API key or `"username:password"` string for authentication. Use this for Zilliz Cloud API keys or as a shorthand for username/password auth. Default: `null`.

- `username(String username)` -

    Username for authentication. Use together with `password()`. Ignored if `token()` is set. Default: `null`.

- `password(String password)` -

    Password for authentication. Use together with `username()`. Default: `null`.

- `dbName(String dbName)` -

    The default database name to use after connecting. Default: `null` (uses the server default).

- `connectTimeoutMs(long connectTimeoutMs)` -

    Timeout in milliseconds to wait for the gRPC channel to reach the READY state during connection. Default: `10000`.

- `keepAliveTimeMs(long keepAliveTimeMs)` -

    Interval in milliseconds between keepalive pings sent to the server. Default: `10000`.

- `keepAliveTimeoutMs(long keepAliveTimeoutMs)` -

    Timeout in milliseconds to wait for a keepalive ping acknowledgement before closing the connection. Default: `5000`.

- `keepAliveWithoutCalls(boolean keepAliveWithoutCalls)` -

    When `true`, keepalive pings are sent even when there are no active RPCs. Default: `true`.

- `rpcDeadlineMs(long rpcDeadlineMs)` -

    Maximum duration in milliseconds allowed for a single RPC call. A value of `0` disables the deadline. Default: `0`.

- `secure(Boolean secure)` -

    Enables TLS encryption. When the URI starts with `https`, TLS is always enabled regardless of this setting. Default: `false`.

- `enablePrecheck(boolean enablePrecheck)` -

    When `true`, performs a connectivity check before returning the client. Default: `false`.

- `idleTimeoutMs(long idleTimeoutMs)` -

    Time in milliseconds after which an idle connection is closed. Default: `86400000` (24 hours).

- `clientKeyPath(String clientKeyPath)` -

    Path to the client private key file for mutual TLS (mTLS). Default: `null`.

- `clientPemPath(String clientPemPath)` -

    Path to the client certificate file for mutual TLS (mTLS). Default: `null`.

- `caPemPath(String caPemPath)` -

    Path to the CA certificate file for TLS verification. Default: `null`.

- `serverPemPath(String serverPemPath)` -

    Path to the server certificate file for one-way TLS. Default: `null`.

- `serverName(String serverName)` -

    The server name override for TLS certificate verification. Default: `null`.

- `proxyAddress(String proxyAddress)` -

    HTTP proxy address for the gRPC connection. Default: `null`.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

// Connect to a local Milvus instance
ConnectConfig config = ConnectConfig.builder()
    .uri("http://localhost:19530")
    .build();

// Connect to Zilliz Cloud with an API key
// ConnectConfig config = ConnectConfig.builder()
//     .uri("https://your-instance.zilliz.com")
//     .token("your-api-key")
//     .build();

MilvusClientV2 client = new MilvusClientV2(config);
```
