# add_connection()

This operation adds connections to multiple Milvus instances for different purposes in a batch. 

## Request Syntax

```python
add_connection(
    default: dict,
    # add other connections
    # your_conn_name: dict
)
```

**PARAMETERS:**

- **kwargs** - 

    When passing keyword arguments, the name of each argument will serve as a connection alias in the **connect()** method.

    The argument value should be a dictionary with one or more of these fields:

    - **address** (*string*) -

        The actual address to connect. Example address: **localhost:19530**.

    - **uri** (*string*) -

        The URI of the Milvus instance. For example: **http://localhost:19530**.

    - **host** (*string*) -

        The host of the Milvus instance. The value defaults to **localhost**, and PyMilvus will fill in the default host if only **port** is provided.

    - **port** (*string | int*) -

        The port that Milvus instance listens to. The value defaults to **19530**, and PyMilvus will fill in the default port if only **host** is provided.

    - **user** (*string*) -

        A valid username used to connect to the specified Milvus instance.

        Use this if authentication has been enabled on the target Milvus instance. To enable authentication, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

        This should be used along with **password**.

    - **password** (*string*) -

        A valid password used to connect to the specified Milvus instance.

        Use this if authentication has been enabled on the target Milvus instance. To enable authentication, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

        This should be used along with **user**.

    - **token** (string) -

        A valid access token to access the specified Milvus instance. This can be used as an alternative to setting **user** and **password** separately.

        When setting this field, notice that:

        A valid token should be a pair of username and password used to access the target cluster, joined by a colon (:). For example, you can set this to `username:p@ssw0rd`.

        Use this if authentication has been enabled on the target Milvus instance. To enable authentication, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

**RETURN TYPE:**

None

**RETURNS:**

None

**EXCEPTIONS:**

- **ConnectionConfigException**

    This exception will be raised when the connection configuration is invalid.

## Examples

```python
from pymilvus import connections

connections.add_connection(
  default={"address": "localhost:19530"},
  dev={"host": "localhost", "port": 19543}
)
```

## Related operations

The following operations are related to `add_connection()`:

- [connect()](connect.md)

- [disconnect()](disconnect.md)

- [get_connection_addr()](get_connection_addr.md)

- [has_connection()](has_connection.md)

- [list_connections()](list_connections.md)

- [remove_connection()](remove_connection.md)

