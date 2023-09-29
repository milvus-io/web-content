# MilvusClient()

This is the constructor method to create a MilvusClient instance.

## Invocation

```python
MilvusClient(
    uri,
    user,
    password,
    db_name,
    token,
    timeout
)
```

## Parameters

| Parameter          | Description                          | Type     | Required |
|--------------------|--------------------------------------|----------|----------|
| `uri` | Address used to connect to the Milvus instance. Default value: 'http://localhost:19530'. | String | True     |
| `user` | Username used to connect to the Milvus instance. | String | True     |
| `password` | Password used to connect to the Milvus instance. | String | True     |
| `db_name` | Name of the specific database to connect. | String | False     |
| `token` | Credentials used to connect to the Milvus instance in `token='user:password'` format. | String | True     |
| `timeout` | An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs. | Float | False     |

You can use either separate parameters `user` and `password` or `token='user:password'` as credentials.

## Return

A MilvusClient instance.

## Raises

None

## Example

- Create a MilvusClient instance using `token`:

    ```python
    from pymilvus import MilvusClient

    client = MilvusClient(
    uri='http://localhost:19530',
    token='root:Milvus',
    )
    ```

- Create a MilvusClient instance using separate parameters `user` and `password`

    ```python
    from pymilvus import MilvusClient

    client = MilvusClient(
    uri='http://localhost:19530',
    user='root',
    password='Milvus'
    )
    ```
