
# disconnect()

This operation disconnects the client from the specified connection.

## Request Syntax

```python
disconnect(alias: str)
```

__PARAMETERS:__

- __alias__ (_string_) -

    __[REQUIRED]__

    A connection alias.

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

connections.disconnect(alias="default")
```

