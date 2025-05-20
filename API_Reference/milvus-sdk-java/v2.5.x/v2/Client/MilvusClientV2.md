# MilvusClientV2

A **MilvusClientV2** instance represents a Java client that connects to a specific Milvus instance.

```java
io.milvus.v2.client.MilvusClientV2
```

## Constructor

Constructs a client for common use cases.

<div class="admonition note">

<p><b>notes</b></p>

<p>This client serves as an easy-to-use alternative for the current set of APIs that handles Create, Read, Update, and Delete (CRUD) operations in Milvus.</p>

</div>

```java
MilvusClientV2(ConnectConfig connectConfig);
```

## ConnectConfig

**ConnectConfig** allows you to configure the connection properties in one place so that **MilvusClientV2** can reference it to create and manage the connection pool.

```java
// use either token or username/password
ConnectConfig.builder()
    .uri(String uri)
    .token(String token)
    //.username(String userName)
    //.password(String password)
    .build();
```

**BUILDER METHODS:**

- `uri(String uri)`

    The URI of the Milvus instance. For example:

    ```plaintext
    http://localhost:19530
    ```

- `token(String token)`

    A valid access token to access the specified Milvus instance. 

    This can be used as a recommended alternative to setting **user** and **password** separately.

    When setting this field, notice that:

    A valid token should be a pair of username and password used to access the target cluster, joined by a colon (:). For example, you can set this to `root:Milvus`, which is the default credential of the root user.

    Use this if authentication has been enabled on the target Milvus instance. To enable authentication, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

- `username(String userName)`

    A valid username used to connect to the specified Milvus instance.

    Use this if authentication has been enabled on the target Milvus instance. To enable authentication, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

    This should be used along with **password**.

- `password(String password)`

    A valid password used to connect to the specified Milvus instance.

    Use this if authentication has been enabled on the target Milvus instance. To enable authentication, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

    This should be used along with **user**.

- `dbName(String databaseName)`

    The name of the database to which the target Milvus instance belongs.

- `connectTimeoutMs(long connectTimeout)`

    The timeout duration for this operation, in milliseconds. 

    The value defaults to **10000**.

- `keepAliveTimeMs(long keepAliveTime)`

    The time in milliseconds between keep-alive probes sent by the client to the server.

    The value defaults to **55000**.

- `keepAliveTimeoutMs(long keepAliveTimeout)`

    The timeout duration in milliseconds for the server to respond to a keep-alive probe sent by the client.

    The value defaults to **20000**.

- `keepAliveWithoutCalls(boolean enable)`

    Whether to send keep-alive probes without making requests.

    The value defaults to **false**.

- `rpcDeadlineMs(long rpcDeadline)`

    The deadline for RPC calls (disabled).

    The value defaults to **0**, which indicates the deadline is disabled.

- `clientKeyPath(String clientKeyPath)`

    The path to the client key file for two-way authentication.

- `clientPemPath(String clientPemPath)`

    The path to the client PEM file for two-way authentication.

- `caPemPath(String caPemPath)`

    The path to the CA PEM file for two-way authentication.

- `serverPemPath(String serverPemPath)`

    The path to the server PEM file for two-way authentication.

- `serverName(String serverName)`

    The expected name of the server.

- `secure(boolean enable)`

    Whether to use TLS for the connection.

    The value defaults to **true**.

- `idleTimeoutMs(long idleTimeout)`

    The idle timeout for a connection.

## Examples

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus") // replace this with your token
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);
```

