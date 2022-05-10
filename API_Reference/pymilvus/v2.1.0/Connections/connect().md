# connect()

This method connects the client to a Milvus connection.

## Invocation

```python
connect(alias, **kwargs)
```

## Parameters

| Parameter    | Description                                                  | Type                            | Required |
| ------------ | ------------------------------------------------------------ | ------------------------------- | -------- |
| `alias`      | Connection alias                                             | String                          | True     |
| `kwargs` <ul><li>host</li><li>port</li><li>user</li><li>password</li></ul>     | <br/><ul><li>IP address of the Milvus connection</li><li>Port of the Milvus connection</li><li>Authenticate username</li><li>Password of the authenticate user</li></ul> | <br/><ul><li>String</li><li>Integer</li><li>String</li><li>String</li></ul>                  | <br/><ul><li>True</li><li>True</li><li>False</li><li>False</li></ul>    |

## Return

No return.

## Raises

- `NotImplementedError` -- error if the handler in connection parameters is not gRPC.
- `ParamError` -- error if the parameter is invalid.
- `Exception` -- error if the server specified in parameters is not ready.

## Example

```python
from pymilvus import connections
connections.connect(
  alias="default", 
  host='localhost', 
  port='19530'
)
```