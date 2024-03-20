

# get_server_version()

This operation checks the version of the Milvus instance.

## Request syntax

```python
get_server_version(
    using: str = "default",
    timeout: float | None
)
```

```python
from pymilvus import connections, utility

# Establish a connection
connections.connect(...)

# Check the server version
server_version = utility.get_server_version()
```

__PARAMETERS:__

- __using__ (_str_) - 

    The alias of the employed connection.

    The default value is __default__, indicating that this operation employs the default connection.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_str_

__RETURNS:__

The server version.

__EXAMPLE:__

```python
from pymilvus import connections, utility

# Connection to localhost:19530
connections.connect()

# Check the server version
server_version = utility.get_server_version()
```

