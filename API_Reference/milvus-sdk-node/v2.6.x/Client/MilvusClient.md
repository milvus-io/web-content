# MilvusClient

A **MilvusClient** instance represents a Node.js client that connects to a specific Milvus instance.

```javascript
new MilvusClient(options:ClientConfig)
```

## Request Syntax

```javascript
new MilvusClient(config: ClientConfig)
```

**PARAMETERS:**

- **configOrAddress** (*string*) -

    **[REQUIRED]**

    The address of the Milvus instance. For example:

    ```plaintext
    http://localhost:19530
    ```

- **configOrAddress** (*ClientConfig*)

    - **address** (*string*) -

        **[REQUIRED]**

        The cluster endpoint. For example:

        ```plaintext
        http://localhost:19530
        ```

    - **_SKIPCONNECT__** (*boolean*) -

        A boolean value indicating whether to skip the connection or not. 

    - **channelOptions** (*channelOptions*) -

        Additional channel options for gRPC.

    - **database** (*string*) -

        The name of the cluster database to connect.

    - **id** (*string*) -

        The ID of the cluster to connect.

    - **logLevel** (*string*) -

        The level of the log. Available options include: `debug`, `info`, `warn`, `error`, `panic`, and `fatal`. 

        The default value is `debug`.

        It is recommended to use `debug` level under test and development environments, and `info` level in production environment.

    - **maxRetries** (*number*) -

        The number of attempts to retry connection if the connection is not successful.

    - **password** (*string*) -

        The user password used to authenticate the connection.

    - **protoFilePath** (*protoFilePath*) -

        - **milvus** (*string*) -

        - **schema** (*string*) -

    - **retryDelay** (*number*) -

        The interval between retry attempts.

    - **ssl** (*boolean*) -

        A boolean value indicating whether to use SSL or not. Set this to `true` if you have configured Milvus to work at a TLS endpoint. For details, refer to [Encryption in Transit](https://milvus.io/docs/tls.md).

    - **timeout** (*string* | *number*) -

        The timeout duration for this operation. 

        Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

    - **tls** (*tls*) -

        - **certChainPath** (*string*) -

            The file path of the certificate chain.

        - **privateKeyPath** (*string*) -

            The file path of the private key.

        - **rootCertPath** (*string*) -

            The file path of the root certificate.

        - **serverName** (*string*) -

            The name of the server.

        - **verifyOptions** (*string*) -

            The verification options.

    - **token** (*string*) -

        The token used for connection. The token can be either an API key or a username and password pair combined with a colon in between.

    - **username** (*string*) -

        The username used for connection.

- **ssl** (*boolean*) -

    A boolean value indicating whether to use SSL or not. Set this to `true` if you have configured Milvus to work at a TLS endpoint. For details, refer to [Encryption in Transit](https://milvus.io/docs/tls.md).

- **username** (*string*) -

    A valid username used to connect to the specified Milvus instance.

    Use this if authentication has been enabled on the target Milvus instance. To enable authentication, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

    This should be used along with **password**.

- **password** (*string*) -

    A valid password used to connect to the specified Milvus instance.

    Use this if authentication has been enabled on the target Milvus instance. To enable authentication, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

    This should be used along with **username**.

- **channelOptions** (*channelOptions*) -

    Additional channel options for gRPC.

**RETURNS** *MilvusClient*

This method returns a Milvus Client instance that extends GRPC Client and handles communication with Milvus server.

## Example

```python
new MilvusClient(config: ClientConfig)
```

