
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

__PARAMETERS:__

- __kwargs__ - 

    When passing keyword arguments, the name of each argument will serve as a connection alias in the __connect()__ method.

    The argument value should be a dictionary with one or more of these fields:

    - __address__ (_string_) -

        The actual address to connect. Example address: __localhost:19530__.

    - __uri__ (_string_) -

        The URI of the Milvus instance. For example: __http://localhost:19530__.

    - __host__ (_string_) -

        The host of the Milvus instance. The value defaults to __localhost__, and PyMilvus will fill in the default host if only __port__ is provided.

    - __port__ (_string | int_) -

        The port that Milvus instance listens to. The value defaults to __19530__, and PyMilvus will fill in the default port if only __host__ is provided.

    - __user__ (_string_) -

        A valid username used to connect to the specified Milvus instance.

        Use this if authentication has been enabled on the target Milvus instance. To enable authentication, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

        This should be used along with __password__.

    - __password__ (_string_) -

        A valid password used to connect to the specified Milvus instance.

        Use this if authentication has been enabled on the target Milvus instance. To enable authentication, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

        This should be used along with __user__.

    - __token__ (string) -

        A valid access token to access the specified Milvus instance. This can be used as an alternative to setting __user__ and __password__ separately.

        When setting this field, notice that:

        A valid token should be a pair of username and password used to access the target cluster, joined by a colon (:). For example, you can set this to `username:p@ssw0rd`.

        Use this if authentication has been enabled on the target Milvus instance. To enable authentication, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

__RETURN TYPE:__

None

__RETURNS:__

None

__EXCEPTIONS:__

- __ConnectionConfigException__

    This exception will be raised when the connection configuration is invalid.

## Examples

```python
from pymilvus import connections

connections.add_connection(
  default={"address": "localhost:19530"},
  dev={"host": "localhost", "port": 19543}
)
```

