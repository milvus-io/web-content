
# remove_connection()

This operation removes the connection from the registry by the given alias and disconnects if connected.

## Request Syntax

```python
remove_connection(alias: str)
```

__PARAMETERS:__

- __alias__ (_string_) -

    __[REQUIRED]__

    A connection alias

__RETURN TYPE:__

_NoneType_

__RETURNS:__

None

__EXCEPTIONS:__

- __ConnectionConfigException__

    This exception will be raised when the connection configuration is invalid.

## Examples

```python
from pymilvus import connections

connections.remove_connection(alias="default")
```

