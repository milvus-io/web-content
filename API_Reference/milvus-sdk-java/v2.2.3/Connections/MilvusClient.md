# MilvusClient

MilvusClient is an abstract interface of the Milvus client. `MilvusServiceClient` class is the implementation.

```Java
package io.milvus.client;
MilvusServiceClient(ConnectParam connectParam)
```

Methods of `MilvusClient` for connection:

| Method                                        | Description                                              | Parameters                                              | Returns    |
| ------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------- |
| `withTimeout(long timeout, TimeUnit timeoutUnit)` | The timeout setting for RPC call.                                | <li><code>timeout</code>: The timeout period for invoking a method.</li><li><code>timeoutUnit</code>: The unit for timeout.</li> | `MilvusClient` |
| `close(long maxWaitSeconds)`                      | Disconnects from a Milvus server with configurable timeout value. Call this method before the application terminates. This method throws an `InterruptedException` exception if it is interrupted. | `maxWaitSeconds`: The timeout period to wait until the RPC channel closes. | N/A            |

## ConnectParam

Use the `ConnectParam.Builder` to construct a `ConnectParam` object for the `MilvusServiceClient`.

```Java
import io.milvus.param.ConnectParam;
ConnectParam.Builder builder = ConnectParam.newBuilder();
```

Methods of `ConnectParam.Builder`:

| Method                                                       | Description                                                  | Patameters                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `withHost(String host)`                                      | Sets the host name or address.                               | `host`: The name or address of the host.                     |
| `withPort(int port)`                                         | Sets the connection port. The value must be greater than zero and less than 65536. | `port`: The connection port.                                 |
| `withConnectTimeout(long connectTimeout, TimeUnit timeUnit)` | Sets the connection timeout value of client channel. The timeout value must be greater than zero. | `connectTimeout`: The connection timeout period. timeUnit: The unit of timeout. |
| `withKeepAliveTime(long keepAliveTime, TimeUnit timeUnit)`   | Sets the keep-alive timeout value of the client channel. The timeout value must be greater than zero. | <li><code>keepAliveTime</code>: The keep-alive timeout period.</li><li><code>timeUnit</code>: The unit of timeout.</li> |
| `keepAliveWithoutCalls(boolean enable)`                      | Enables the keep-alive function for the client channel.      | `enable`: A boolean value to indicate if the keep-alive function is enabled. The keep-alive function is enabled if the value is set to `true`. |
| `secure(boolean enable) withSecure(boolean enable)`          | Enables security for the client channel.                     | `enable`: Security is enabled if the value is set to `true`. |
| `withIdleTimeout(long idleTimeout, TimeUnit timeUnit)`       | Sets the value of idle timeout of the client channel. The timeout value must be greater than zero. | `idleTimeout`: The idle timeout period of the client channel. `timeUnit`: The unit of timeout. |
| `withAuthorization(String username, String password)`        | Sets the username and password for this connection.          | <li><code>username</code>: The username of the current user.</li><li><code>password</code>: The password corresponding to the username.</li> |
| `build()`                                                    | Constructs a `ConnectParam` object.                          | N/A                                                          |

The `ConnectParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Example

- Without timeout setting for RPC call:

```Java
import io.milvus.param.*;
import io.milvus.client.*;

ConnectParam connectParam = ConnectParam.newBuilder()
    .withHost("localhost")
    .withPort(19530)
    .withAuthorization("root", "Milvus")
    .build();
MilvusClient client = new MilvusServiceClient(connectParam);

ShowCollectionsParam param = ShowCollectionsParam.newBuilder().build()
R<ShowCollectionsResponse> response = client.showCollections(param);

client.close(1);
```

- With timeout setting for RPC call:

```Java
import io.milvus.param.*;
import io.milvus.client.*;
import java.util.concurrent.TimeUnit;

ConnectParam connectParam = ConnectParam.newBuilder()
    .withHost("localhost")
    .withPort(19530)
    .withAuthorization("root", "Milvus")
    .build();
MilvusClient client = new MilvusServiceClient(connectParam);

ShowCollectionsParam param = ShowCollectionsParam.newBuilder().build();
R<ShowCollectionsResponse> response = client.withTimeout(2, TimeUnit.SECONDS).showCollections(param);

client.close(1);
```

