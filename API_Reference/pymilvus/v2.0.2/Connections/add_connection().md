# add_connection()

This method adds a Milvus connection.

## Invocation

```python
add_connection(**kwargs)
```

## Parameters

| Parameter    | Description                                                  | Type                            | Required |
| ------------ | ------------------------------------------------------------ | ------------------------------- | -------- |
| `kwargs`: `alias`    | Connection alias. | String          | True   |
| `kwargs`: `host`    | IP address of the Milvus connection. | String          | True   |
| `kwargs`: `port`    | Port of the Milvus connection.| Integer          | True   |

## Return

No return.

## Raises

None.

## Example

```python
from pymilvus import connections
connections.add_connection(
  default={"host": "localhost", "port": "19530"}
)
```
