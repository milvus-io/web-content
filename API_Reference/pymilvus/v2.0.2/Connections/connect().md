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
| `kwargs`: `host`     | IP address of the Milvus connection.| String          | True  |
| `kwargs`: `port`     | Port of the Milvus connection.| Integer          | True  |

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
