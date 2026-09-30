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

**PARAMETERS:**

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*str*

**RETURNS:**

The server version.

**EXAMPLE:**

```python
from pymilvus import connections, utility

# Connection to localhost:19530
connections.connect()

# Check the server version
server_version = utility.get_server_version()
```

## Related operations

The following operations are related to `get_server_version()`:

- [get_server_type()](get_server_type.md)

