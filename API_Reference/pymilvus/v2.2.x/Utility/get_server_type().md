# get_server_type()

This method checks the type of the currently connected server.

## Invocation

```python
get_server_type(using="default")
```

## Parameters

| Parameter | Description                                  | Type   | Required |
|-----------|----------------------------------------------|--------|----------|
| `using`   | Milvus Connection used to check the segments | String | False    |


## Return

The type of the currently connected server. Possible values are

- `milvus`

    Indicates that the currently connected server is a Milvus instance.

- `zilliz`

    Indicates that the currently connected server is a Zilliz Cloud cluster.

## Examples

```python
from pymilvus import connections, utility

connections.connect(host='localhost', port='19530')

print(utility.get_server_type())
# Output
# milvus
```
