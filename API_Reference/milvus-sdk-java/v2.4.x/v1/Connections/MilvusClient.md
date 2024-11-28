# MilvusClient

MilvusClient is an abstract interface of the Milvus client. MilvusServiceClient class is the implementation.

```java
package io.milvus.client;
MilvusServiceClient(ConnectParam connectParam)
```

Methods of MilvusClient for connection:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Parameters</strong></p></th>
     <th><p><strong>Returns</strong></p></th>
   </tr>
   <tr>
     <td><p>withTimeout(long timeout, TimeUnit timeoutUnit)</p></td>
     <td><p>Timeout setting for RPC call.</p></td>
     <td><p>timeout: The timeout period when invoking a method.</p><p>timeoutUnit: The unit for timeout.</p></td>
     <td><p>MilvusClient</p></td>
   </tr>
   <tr>
     <td><p>withRetry(RetryParam retryParam)</p></td>
     <td><p>Sets the parameters for retry.</p></td>
     <td><p>retryParam: Parameter for retry on failure.</p></td>
     <td><p>MilvusClient</p></td>
   </tr>
   <tr>
     <td><p>close(long maxWaitSeconds)</p></td>
     <td><p>Disconnects from a Milvus server with a configurable timeout value. Call this method before the application terminates.This method throws an <code>InterruptedException</code> exception if it is interrupted.</p></td>
     <td><p>maxWaitSeconds: The timeout period to wait for the RPC channel to close.</p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p>setLogLevel(LogLevel level)</p></td>
     <td><p>Set log level in runtime.Note: this method cannot change the log level configured by log4j configurations. It only hides some logs inside the MilvusClient class.</p></td>
     <td><p>level: A log level</p></td>
     <td><p>N/A</p></td>
   </tr>
</table>

#### ConnectParam

Use the `ConnectParam.Builder` to construct a `ConnectParam` object for the MilvusClient.

```java
import io.milvus.param.ConnectParam;
ConnectParam.Builder builder = ConnectParam.newBuilder();
```

Methods of `ConnectParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Patameters</p></th>
    </tr>
    <tr>
        <td><p>withHost(String host)</p></td>
        <td><p>Sets the host name or address.</p></td>
        <td><p>host: The name or address of the host.</p></td>
    </tr>
    <tr>
        <td><p>withPort(int port)</p></td>
        <td><p>Sets the connection port. <br/>The value must be greater than zero and less than 65536.</p></td>
        <td><p>port: The connection port.</p></td>
    </tr>
    <tr>
        <td><p>withUri(String uri)</p></td>
        <td><p>Sets the uri of remote service.</p></td>
        <td><p>uri: The uri of remote service.</p></td>
    </tr>
    <tr>
        <td><p>withToken(String token)</p></td>
        <td><p>Sets the token of remote service.</p></td>
        <td><p>token: serving as the key for identification and authentication purposes.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withConnectTimeout(long connectTimeout, TimeUnit timeUnit)</p></td>
        <td><p>Sets the connection timeout value of client channel. The timeout value must be greater than zero. The default value is 10 seconds.</p></td>
        <td><p>connectTimeout: The connection timeout period.<br/>timeUnit: The unit of timeout.</p></td>
    </tr>
    <tr>
        <td><p>withKeepAliveTime(long keepAliveTime, TimeUnit timeUnit)</p></td>
        <td><p>Sets the keep-alive time value of the client channel. The time value must be greater than zero. The default value is 55 seconds.</p></td>
        <td><p>keepAliveTime: The keep-alive time period.<br/>timeUnit: The unit of time.</p></td>
    </tr>
    <tr>
        <td><p>withKeepAliveTimeout(long keepAliveTimeout, TimeUnit timeUnit)</p></td>
        <td><p>Sets the keep-alive timeout value of client channel. The timeout value must be greater than zero. The default value is 20 seconds.</p></td>
        <td><p>keepAliveTimeout: The keep-alive timeout value.<br/>timeUnit: The unit of timeout.</p></td>
    </tr>
    <tr>
        <td><p>keepAliveWithoutCalls(boolean enable)</p></td>
        <td><p>Enables the keep-alive function for the client channel. The default value is false.</p></td>
        <td><p>enable: Boolean value to indicate if the keep-alive function is enabled. The keep-alive function is enabled if the value is set to true.</p></td>
    </tr>
    <tr>
        <td><p>secure(boolean enable)<br/>withSecure(boolean enable)</p></td>
        <td><p>Enables security for the client channel.</p></td>
        <td><p>enable: Security is enabled if the value is set to true.</p></td>
    </tr>
    <tr>
        <td><p>withIdleTimeout(long idleTimeout, TimeUnit timeUnit)</p></td>
        <td><p>Sets the value of idle timeout of the client channel. The timeout value must be greater than zero. The default value is 24 hours.</p></td>
        <td><p>idleTimeout: The idle timeout period of the client channel.<br/>timeUnit: The unit of timeout.</p></td>
    </tr>
    <tr>
        <td><p>withRpcDeadline(long deadline, TimeUnit timeUnit)</p></td>
        <td><p>Set a deadline for how long you are willing to wait for a reply from the server.<br/>With a deadline setting, the client will wait when encounter fast RPC fail caused by network fluctuations.<br/>The deadline value must be larger than or equal to zero. Default value is 0, deadline is disabled.</p></td>
        <td><p>deadline: deadline value<br/>timeUnit: deadline unit</p></td>
    </tr>
    <tr>
        <td><p>withAuthorization(String username, String password)</p></td>
        <td><p>Sets the username and password for this connection.</p></td>
        <td><p>username: The username of the current user.<br/>password: The password corresponding to the username.</p></td>
    </tr>
    <tr>
        <td><p>withClientKeyPath(String clientKeyPath)</p></td>
        <td><p>Set the client.key path for tls two-way authentication, only takes effect when "secure" is True.</p></td>
        <td><p>clientKeyPath: The local path of client.key</p></td>
    </tr>
    <tr>
        <td><p>withClientPemPath(String clientPemPath)</p></td>
        <td><p>Set the client.pem path for tls two-way authentication, only takes effect when "secure" is True.</p></td>
        <td><p>clientPemPath: The local path of client.pem</p></td>
    </tr>
    <tr>
        <td><p>withCaPemPath(String caPemPath)</p></td>
        <td><p>Set the ca.pem path for tls two-way authentication, only takes effect when "secure" is True.</p></td>
        <td><p>caPemPath: The local path of ca.pem</p></td>
    </tr>
    <tr>
        <td><p>withServerPemPath(String serverPemPath)</p></td>
        <td><p>Set the server.pem path for tls one-way authentication, only takes effect when "secure" is True.</p></td>
        <td><p>serverPemPath: The local path of server.pem</p></td>
    </tr>
    <tr>
        <td><p>withServerName(String serverName)</p></td>
        <td><p>Set target name override for SSL host name checking, only takes effect when "secure" is True.<br/>Note: this value is passed to grpc.ssl<em>target</em>name_override</p></td>
        <td><p>serverName: The override name for SSL host.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a ConnectParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `ConnectParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### RetryParam

Use the `RetryParam.Builder` to construct a RetryParam object for the `MilvusClient`.

```java
import io.milvus.param.RetryParam;
RetryParam.Builder builder = RetryParam.newBuilder();
```

Methods of `RetryParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Patameters</p></th>
    </tr>
    <tr>
        <td><p>withMaxRetryTimes(int maxRetryTimes)</p></td>
        <td><p>Sets the max retry times on failure.Default value is 75.</p></td>
        <td><p>maxRetryTimes: The maxinum times to retry.</p></td>
    </tr>
    <tr>
        <td><p>withInitialBackOffMs(long initialBackOffMs)</p></td>
        <td><p>Sets the first time interval between two retries, units: millisecond. Default value is 10ms.</p></td>
        <td><p>initialBackOffMs: Retry initial interval value in milliseconds.</p></td>
    </tr>
    <tr>
        <td><p>withMaxBackOffMs(long maxBackOffMs)</p></td>
        <td><p>Sets the maximum time interval between two retries, units: millisecond. Default value is 3000ms.</p></td>
        <td><p>maxBackOffMs: Retry maximum interval value in milliseconds.</p></td>
    </tr>
    <tr>
        <td><p>withBackOffMultiplier(int backOffMultiplier)</p></td>
        <td><p>Sets multiplier to increase time interval after each retry. Default value is 3.</p></td>
        <td><p>backOffMultiplier: The multiplier to increase time interval after each retry.</p></td>
    </tr>
    <tr>
        <td><p>withRetryOnRateLimie(boolean retryOnRateLimie)</p></td>
        <td><p>Sets whether to retry when the returned error is rate limit. Default value is true.</p></td>
        <td><p>retryOnRateLimit: Whether to retry when the returned error is rate limit.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a RetryParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `RetryParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Example

- Without timeout setting for RPC call:

```java
import io.milvus.param.*;
import io.milvus.client.*;

ConnectParam connectParam = ConnectParam.newBuilder()
    .withHost("localhost")
    .withPort(19530)
    .withAuthorization("root", "Milvus")
    .build();
RetryParam retryParam = RetryParam.newBuilder()
        .withMaxRetryTimes(10)
        .build();
MilvusClient client = new MilvusServiceClient(connectParam).withRetry(retryParam);

ShowCollectionsParam param = ShowCollectionsParam.newBuilder().build()
R<ShowCollectionsResponse> response = client.showCollections(param);

client.close(1);
```

- With timeout setting for RPC call:

```java
import io.milvus.param.*;
import io.milvus.client.*;
import java.util.concurrent.TimeUnit;

ConnectParam connectParam = ConnectParam.newBuilder()
    .withHost("localhost")
    .withPort(19530)
    .withAuthorization("root", "Milvus")
    .build();
MilvusClient client = new MilvusServiceClient(connectParam);

ShowCollectionsParam param = ShowCollectionsParam.newBuilder().build()
R<ShowCollectionsResponse> response = client.withTimeout(2, TimeUnit.SECONDS).showCollections(param);

client.close(1);
```
