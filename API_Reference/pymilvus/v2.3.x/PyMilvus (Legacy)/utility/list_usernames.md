
# list_usernames()

This operation lists the names of all existing users.

## Request Syntax

```python
list_usernames(
    using: str,
    timeout: float | None
)
```

__PARAMETERS:__

- __using__ (_str_) - 

    The alias of the employed connection.

    The default value is __default__, indicating that this operation employs the default connection.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_list_

__RETURNS:__

A list that contains the names of all existing users.

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import connections, utility

# Connection to localhost:19530
connections.connect()

# List all existing usernames
users = utility.list_usernames()
```

