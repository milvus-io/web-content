# connect()

This operation establishes a connection to a Milvus instance using the provided alias, address, and authentication parameters.

## Request Syntax

```python
connect(
    alias: str,
    user: str | "",
    password: str | "",
    db_name: str | "default",
    token: str | "",
    **kwargs
)
```

__PARAMETERS:__

- __alias__ (_string_) -

    __[REQUIRED]__

    A connection alias.

    <div class="admonition note">

    <p><b>notes</b></p>

    <ul>
    <li><p>If the specified connection alias does not exist, a new one will be added, and the parameters specified below are added as the parameters of the connection alias.</p></li>
    <li><p>If the specified connection alias has already been added by calling <strong>add_connection()</strong>, the parameters specified below overwrite those of the connection alias.</p></li>
    </ul>

    </div>

- __user__ (_string_) -

    A valid username used to connect to the specified Milvus instance.

    Use this if authentication has been enabled on the target Milvus instance. To enable authentication, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

    This should be used along with __password__.

- __password__ (_string_) -

    A valid password used to connect to the specified Milvus instance.

    Use this if authentication has been enabled on the target Milvus instance. To enable authentication, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

    This should be used along with __user__.

- __db_name__ (_string_) -

    The name of the database to which the target Milvus instance belongs.

- __token__ (_string_) -

    A valid access token to access the specified Milvus instance. This can be used as an alternative to setting __user__ and __password__ separately.

    When setting this field, notice that:

    A valid token should be a pair of username and password used to access the target cluster, joined by a colon (:). For example, you can set this to `username:p@ssw0rd`.

    Use this if authentication has been enabled on the target Milvus instance. To enable authentication, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

- __kwargs__ (_dict_) -

    Keyword arguments for configuring the connection. The following keys are supported:

    - __address__ (_string_) -

        The actual address to connect. Example address: __localhost:19530__.

    - __uri__ (_string_) -

        The URI of the Milvus instance. For example: __http://localhost:19530__.

    - __host__ (_string_) -

        The host of the Milvus instance. The value defaults to __localhost__, and PyMilvus will fill in the default host if only __port__ is provided.

    - __port__ (_string | int_) -

        The port that Milvus instance listens to. The value defaults to __19530__, and PyMilvus will fill in the default port if only __host__ is provided.

    - __secure__ (_bool_) -

        A boolean value indicating whether TLS is employed in the connection.

    - __client_key_path__ (_string_) -

        A path to a valid __client.key__ file for the TLS certificate verification on the client side.

        This parameter is necessary when using a self-signed TLS certificate or a certificate signed by an unknown authority.

        This parameter should work with __client_pem_path__,__ ca_pem_path__,__ server_pem_path__, and__ server_name__ if applicable.

    - __client_pem_path__ (_string_) -

        A path to a valid __client.pem__ file for the TLS certificate verification on the client side.

        This parameter is necessary when using a self-signed TLS certificate or a certificate signed by an unknown authority.

        This parameter should work with __client_key_path__,__ ca_pem_path__,__ server_pem_path__, and__ server_name__ if applicable.

    - __ca_pem_path__ (_string_) -

        A path to a valid __ca.pem__ file for the TLS certificate verification.

        This parameter is necessary when using a self-signed TLS certificate or a certificate signed by an unknown authority.

        This parameter should work with __client_key_path__,__ client_pem_path__,__ server_pem_path__, and__ server_name__ if applicable.

    - __server_pem_path__ (_string_) -

        A path to a valid __server.pem__ file for the TLS certificate verification on the server side.

        This parameter is necessary when using a self-signed TLS certificate or a certificate signed by an unknown authority.

        This parameter should work with __client_key_path__,__ client_pem_path__,__ ca_pem_path__, and__ server_name__ if applicable.

    - __server_name__ (_string_) -

        A path to a valid server name for the TLS certificate verification on the server side.

        This parameter is necessary when using a self-signed TLS certificate or a certificate signed by an unknown authority.

        This parameter should work with __client_key_path__,__ client_pem_path__,__ ca_pem_path__, and__ server_pem_path__ if applicable.

__RETURN TYPE:__

None

__RETURNS:__

None

## Exceptions

- __NotImplementedError__:

    This exception will be raised when the handler parameter value is not GRPC.

- __ParamError__: 

    This exception will be raised when an unsupported value is passed for the pool parameter.

- __Exception__: 

    This exception will be raised when the server specified in the connection parameters is not reachable/ready and the client cannot connect to it.

## Examples

```python
from pymilvus import connections

# Use host and port
connections.connect(
  alias="default", 
  host='localhost', 
  port='19530'
)

# Use uri
uri="http://localhost:19530"
connections.connect(uri=uri)

# Use environment variable
# The following assumes that you have already set an environment 
# variable using export MILVUS_URI=http://username:password@localhost:19530
connections.connect()

# Use environment files
# A sample file at https://github.com/milvus-io/pymilvus/blob/master/.env.example
# Rename the file to .env so that pymilvus will automatically load it.
connections.connect()

# Connect to a specific database
# Ensure the specified database exists.
connections.connect(db_name="books")
```

## Related operations

The following operations are related to `connect()`:

- [add_connection()](./add_connection.md)

- [disconnect()](./disconnect.md)

- [get_connection_addr()](./get_connection_addr.md)

- [has_connection()](./has_connection.md)

- [list_connections()](./list_connections.md)

- [remove_connection()](./remove_connection.md)

