# MilvusClient

MilvusClient is an abstract interface of the Milvus client. MilvusServiceClient class is the implementation.

```java
package io.milvus.client;
MilvusServiceClient(ConnectParam connectParam)
```

Methods of MilvusClient for connection:

<table>
   <tr>
     <th><strong>Method</strong></th>
     <th><strong>Description</strong></th>
     <th><strong>Parameters</strong></th>
     <th><strong>Returns</strong></th>
   </tr>
   <tr>
     <td>withTimeout(long timeout, TimeUnit timeoutUnit)<br/></td>
     <td>Timeout setting for RPC call.<br/></td>
     <td>timeout: The timeout period when invoking a method.<br/> timeoutUnit: The unit for timeout.</td>
     <td>MilvusClient<br/></td>
   </tr>
   <tr>
     <td>withRetry(RetryParam retryParam)</td>
     <td>Sets the parameters for retry.<br/></td>
     <td>retryParam: Parameter for retry on failure.</td>
     <td>MilvusClient</td>
   </tr>
   <tr>
     <td>close(long maxWaitSeconds)<br/></td>
     <td>Disconnects from a Milvus server with a configurable timeout value. Call this method before the application terminates.<br/>This method throws an <code>InterruptedException</code> exception if it is interrupted.</td>
     <td>maxWaitSeconds: The timeout period to wait for the RPC channel to close.</td>
     <td>N/A<br/></td>
   </tr>
   <tr>
     <td>setLogLevel(LogLevel level)<br/></td>
     <td>Set log level in runtime.<br/>Note: this method cannot change the log level configured by log4j configurations. It only hides some logs inside the MilvusClient class.</td>
     <td>level: A log level</td>
     <td>N/A</td>
   </tr>
</table>

## ConnectParam

Use the `ConnectParam.Builder` to construct a `ConnectParam` object for the MilvusClient.

```java
import io.milvus.param.ConnectParam;
ConnectParam.Builder builder = ConnectParam.newBuilder();
```

Methods of `ConnectParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Patameters</th>
    </tr>
    <tr>
        <td>withHost(String host)</td>
        <td>Sets the host name or address.</td>
        <td>host: The name or address of the host.</td>
    </tr>
    <tr>
        <td>withPort(int port)</td>
        <td>Sets the connection port. <br/>The value must be greater than zero and less than 65536.</td>
        <td>port: The connection port.</td>
    </tr>
    <tr>
        <td>withConnectTimeout(long connectTimeout, TimeUnit timeUnit)</td>
        <td>Sets the connection timeout value of client channel. The timeout value must be greater than zero. The default value is 10 seconds.</td>
        <td>connectTimeout: The connection timeout period.<br/>timeUnit: The unit of timeout.</td>
    </tr>
    <tr>
        <td>withKeepAliveTime(long keepAliveTime, TimeUnit timeUnit)</td>
        <td>Sets the keep-alive time value of the client channel. The time value must be greater than zero. The default value is 55 seconds.</td>
        <td>keepAliveTime: The keep-alive time period.<br/>timeUnit: The unit of time.</td>
    </tr>
    <tr>
        <td>withKeepAliveTimeout(long keepAliveTimeout, TimeUnit timeUnit)</td>
        <td>Sets the keep-alive timeout value of client channel. The timeout value must be greater than zero. The default value is 20 seconds.</td>
        <td>keepAliveTimeout: The keep-alive timeout value.<br/>timeUnit: The unit of timeout.</td>
    </tr>
    <tr>
        <td>keepAliveWithoutCalls(boolean enable)</td>
        <td>Enables the keep-alive function for the client channel. The default value is false.</td>
        <td>enable: Boolean value to indicate if the keep-alive function is enabled. The keep-alive function is enabled if the value is set to true.</td>
    </tr>
    <tr>
        <td>secure(boolean enable)<br/>withSecure(boolean enable)</td>
        <td>Enables security for the client channel.</td>
        <td>enable: Security is enabled if the value is set to true.</td>
    </tr>
    <tr>
        <td>withIdleTimeout(long idleTimeout, TimeUnit timeUnit)</td>
        <td>Sets the value of idle timeout of the client channel. The timeout value must be greater than zero. The default value is 24 hours.</td>
        <td>idleTimeout: The idle timeout period of the client channel.<br/>timeUnit: The unit of timeout.</td>
    </tr>
    <tr>
        <td>withAuthorization(String username, String password)</td>
        <td>Sets the username and password for this connection.</td>
        <td>username: The username of the current user.<br/>password: The password corresponding to the username.</td>
    </tr>
    <tr>
        <td>withClientKeyPath(String clientKeyPath)</td>
        <td>Set the client.key path for tls two-way authentication, only takes effect when "secure" is True.</td>
        <td>clientKeyPath: The local path of client.key</td>
    </tr>
    <tr>
        <td>withClientPemPath(String clientPemPath)</td>
        <td>Set the client.pem path for tls two-way authentication, only takes effect when "secure" is True.</td>
        <td>clientPemPath: The local path of client.pem</td>
    </tr>
    <tr>
        <td>withCaPemPath(String caPemPath)</td>
        <td>Set the ca.pem path for tls two-way authentication, only takes effect when "secure" is True.</td>
        <td>caPemPath: The local path of ca.pem</td>
    </tr>
    <tr>
        <td>withServerPemPath(String serverPemPath)</td>
        <td>Set the server.pem path for tls one-way authentication, only takes effect when "secure" is True.</td>
        <td>serverPemPath: The local path of server.pem</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a ConnectParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `ConnectParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## RetryParam

Use the `RetryParam.Builder` to construct a RetryParam object for the `MilvusClient`.

```java
import io.milvus.param.RetryParam;
RetryParam.Builder builder = RetryParam.newBuilder();
```

Methods of `RetryParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Patameters</th>
    </tr>
    <tr>
        <td>withMaxRetryTimes(int maxRetryTimes)</td>
        <td>Sets the max retry times on failure.Default value is 75.</td>
        <td>maxRetryTimes: The maxinum times to retry.</td>
    </tr>
    <tr>
        <td>withInitialBackOffMs(long initialBackOffMs)</td>
        <td>Sets the first time interval between two retries, units: millisecond. Default value is 10ms.</td>
        <td>initialBackOffMs: Retry initial interval value in milliseconds.</td>
    </tr>
    <tr>
        <td>withMaxBackOffMs(long maxBackOffMs)</td>
        <td>Sets the maximum time interval between two retries, units: millisecond. Default value is 3000ms.</td>
        <td>maxBackOffMs: Retry maximum interval value in milliseconds.</td>
    </tr>
    <tr>
        <td>withBackOffMultiplier(int backOffMultiplier)</td>
        <td>Sets multiplier to increase time interval after each retry. Default value is 3.</td>
        <td>backOffMultiplier: The multiplier to increase time interval after each retry.</td>
    </tr>
    <tr>
        <td>withRetryOnRateLimie(boolean retryOnRateLimie)</td>
        <td>Sets whether to retry when the returned error is rate limit. Default value is true.</td>
        <td>retryOnRateLimit: Whether to retry when the returned error is rate limit.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a RetryParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `RetryParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Example

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

