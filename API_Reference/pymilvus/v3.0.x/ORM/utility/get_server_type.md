# get_server_type()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation checks the type of the Milvus instance.

## Request syntax

```python
get_server_type(
    using: str = "default",
)
```

**PARAMETERS:**

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

**RETURN TYPE:**

*str*

**RETURNS:**
The server type. Possible values are as follows:

- **zilliz**

    Indicates that the current server is a Zilliz Cloud cluster.

- **milvus**

    Indicates that the current server is a Milvus instance.

**EXAMPLE:**

```python
from pymilvus import connections, utility

# Connection to localhost:19530
connections.connect()

# Check the server type
server_type = utility.get_server_type()
```

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation.

## Related operations

The following operations are related to `get_server_type()`:

- [get_server_version()](get_server_version.md)

