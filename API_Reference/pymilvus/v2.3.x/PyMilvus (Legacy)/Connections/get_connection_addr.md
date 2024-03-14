
# get_connection_addr()

This operation retrieves the configuration of the specified connection by alias.

## Request Syntax

```python
get_connection_addr(alias: str)
```

__PARAMETERS:__

- __alias__ (_string_) -

    __[REQUIRED]__

    A connection alias.

__RETURN TYPE:__

_Dictionary_

__RETURNS:__

A dictionary containing the connection configuration.

__EXCEPTIONS:__

- __ConnectionConfigException__

    This exception will be raised when the connection configuration is invalid.

## Examples

```python
from pymilvus import connections

connections.get_connection_addr(alias="default")

# Output
# {'address': 'localhost:19530', 'user': ''}
```

