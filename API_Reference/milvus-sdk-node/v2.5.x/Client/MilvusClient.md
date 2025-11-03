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

    **&#91;REQUIRED&#93;**

    The address of the Milvus instance. For example:

    ```plaintext
    http://localhost:19530
    ```

- **configOrAddress** (*ClientConfig*)

    - **address** (*string*) -

        **&#91;REQUIRED&#93;**

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

    - **loaderOptions** (*Options*) -

        The option that converts int64 to Long format. Possible values are:

        - `{ longs: Function }`

            This should be a function that converts int64 to Long.js format.

        - `{ longs: Number }`

            This converts int64 to a number, resulting in precision loss.

        - `{ longs: String }`

            This converts int64 to a string. This is the default behavior.

    - **logLevel** (*string*) -

        The level of the log. Available options include: `debug`, `info`, `warn`, `error`, `panic`, and `fatal`. 

        The default value is `debug`.

        It is recommended to use `debug` level under test and development environments, and `info` level in the production environment.

    - **logPrefix** (*string*) -

        The prefix of each log entry.

    - **maxRetries** (*number*) -

        The number of attempts to retry the connection if the connection is not successful.

    - **password** (*string*) -

        The user password that is used to authenticate the connection.

    - **pool** (*Options*) -

        A generic poll option, which abides by the rules specified in [this repo](https://github.com/coopernurse/node-pool).

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

        - **certChain** (*Buffer*) -

            The certificate chain in the buffer.

        - **certChainPath** (*string*) -

            The file path of the certificate chain.

        - **privateKey** (*Buffer*) -

            The private key in the buffer.

        - **privateKeyPath** (*string*) -

            The file path of the private key.

        - **rootCert** (*Buffer*) -

            The root certificate in the buffer.

        - **rootCertPath** (*string*) -

            The file path of the root certificate.

        - **serverName** (*string*) -

            The name of the server.

        - **skipCertCheck** (*boolean*) -

            Whether to skip the checks against the provided certificates. Setting it `true` indicates a skip.

        - **verifyOptions** (*string*) -

            The verification options.

    - **token** (*string*) -

        The token used for connection. The token can be either an API key or a username and password pair combined with a colon in between.

    - **trace** (*boolean*) -

        Whether to enable tracing. 

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

```javascript
new MilvusClient(config: ClientConfig)
```

