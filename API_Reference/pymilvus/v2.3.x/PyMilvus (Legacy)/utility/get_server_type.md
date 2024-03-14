
# get_server_type()

This operation checks the type of the Milvus instance.

## Request syntax

```python
get_server_type(
    using: str = "default",
)
```

__PARAMETERS:__

- __using__ (_str_) - 

    The alias of the employed connection.

    The default value is __default__, indicating that this operation employs the default connection.

__RETURN TYPE:__

_str_

__RETURNS:__
The server type. Possible values are as follows:

- __zilliz__

    Indicates that the current server is a Zilliz Cloud cluster.

- __milvus__

    Indicates that the current server is a Milvus instance.

__EXAMPLE:__

```python
from pymilvus import connections, utility

# Connection to localhost:19530
connections.connect()

# Check the server type
server_type = utility.get_server_type()
```

