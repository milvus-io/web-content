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

**PARAMETERS:**

- **alias** (*string*) -

    **[REQUIRED]**

    A connection alias.

    <div class="admonition note">

    <p><b>notes</b></p>

    <ul>
    <li><p>If the specified connection alias does not exist, a new one will be added, and the parameters specified below are added as the parameters of the connection alias.</p></li>
    <li><p>If the specified connection alias has already been added by calling <strong>add_connection()</strong>, the parameters specified below overwrite those of the connection alias.</p></li>
    </ul>

    </div>

- **user** (*string*) -

    A valid username used to connect to the specified Milvus instance.

    Use this if authentication has been enabled on the target Milvus instance. To enable authentication, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

    This should be used along with **password**.

- **password** (*string*) -

    A valid password used to connect to the specified Milvus instance.

    Use this if authentication has been enabled on the target Milvus instance. To enable authentication, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

    This should be used along with **user**.

- **db_name** (*string*) -

    The name of the database to which the target Milvus instance belongs.

- **token** (*string*) -

    A valid access token to access the specified Milvus instance. This can be used as an alternative to setting **user** and **password** separately.

    When setting this field, notice that:

    A valid token should be a pair of username and password used to access the target cluster, joined by a colon (:). For example, you can set this to `username:p@ssw0rd`.

    Use this if authentication has been enabled on the target Milvus instance. To enable authentication, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

- **kwargs** (*dict*) -

    Keyword arguments for configuring the connection. The following keys are supported:

    - **address** (*string*) -

        The actual address to connect. Example address: **localhost:19530**.

    - **uri** (*string*) -

        The URI of the Milvus instance. For example: **http://localhost:19530**.

    - **host** (*string*) -

        The host of the Milvus instance. The value defaults to **localhost**, and PyMilvus will fill in the default host if only **port** is provided.

    - **port** (*string | int*) -

        The port that Milvus instance listens to. The value defaults to **19530**, and PyMilvus will fill in the default port if only **host** is provided.

    - **secure** (*bool*) -

        A boolean value indicating whether TLS is employed in the connection.

    - **client_key_path** (*string*) -

        A path to a valid **client.key** file for the TLS certificate verification on the client side.

        This parameter is necessary when using a self-signed TLS certificate or a certificate signed by an unknown authority.

        This parameter should work with **client_pem_path**, **ca_pem_path**, **server_pem_path**, and **server_name** if applicable.

    - **client_pem_path** (*string*) -

        A path to a valid **client.pem** file for the TLS certificate verification on the client side.

        This parameter is necessary when using a self-signed TLS certificate or a certificate signed by an unknown authority.

        This parameter should work with **client_key_path**, **ca_pem_path**, **server_pem_path**, and **server_name** if applicable.

    - **ca_pem_path** (*string*) -

        A path to a valid **ca.pem** file for the TLS certificate verification.

        This parameter is necessary when using a self-signed TLS certificate or a certificate signed by an unknown authority.

        This parameter should work with **client_key_path**, **client_pem_path**, **server_pem_path**, and **server_name** if applicable.

    - **server_pem_path** (*string*) -

        A path to a valid **server.pem** file for the TLS certificate verification on the server side.

        This parameter is necessary when using a self-signed TLS certificate or a certificate signed by an unknown authority.

        This parameter should work with **client_key_path**, **client_pem_path**, **ca_pem_path**, and **server_name** if applicable.

    - **server_name** (*string*) -

        A path to a valid server name for the TLS certificate verification on the server side.

        This parameter is necessary when using a self-signed TLS certificate or a certificate signed by an unknown authority.

        This parameter should work with **client_key_path**, **client_pem_path**, **ca_pem_path**, and **server_pem_path** if applicable.

**RETURN TYPE:**

None

**RETURNS:**

None

## Exceptions

- **NotImplementedError**:

    This exception will be raised when the handler parameter value is not GRPC.

- **ParamError**: 

    This exception will be raised when an unsupported value is passed for the pool parameter.

- **Exception**: 

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

- [add_connection()](add_connection.md)

- [disconnect()](disconnect.md)

- [get_connection_addr()](get_connection_addr.md)

- [has_connection()](has_connection.md)

- [list_connections()](list_connections.md)

- [remove_connection()](remove_connection.md)

