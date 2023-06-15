# delete()

This method deletes one or more entities from a collection.

## Invocation

```python
delete(
    collection_name,
    pks,
    timeout
)
```

## Parameters

| Parameter           | Description                                                                          | Type    | Required |
|---------------------|--------------------------------------------------------------------------------------|---------|----------|
| `collection_name` | Name of the collection from which data is deleted. | String | True    |
| `pks` | Primary keys of the entities to delete. | Union[list, str, int] | True    |
| `timeout` | An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs. | Float | False     |

## Return

None

## Raises

None

## Example

- Delete an entity by a primary key of a string:

    ```python
    from pymilvus import MilvusClient

    client = MilvusClient(uri, token)

    client.delete(
        collection_name='my-collection1',
        pks='pk-1'
    )
    ```

- Delete an entity by a primary key of an integer:

    ```python
    from pymilvus import MilvusClient

    client = MilvusClient(uri, token)

    client.delete(
        collection_name='my-collection2',
        pks=256
    )
    ```

- Delete multiple entities by primary keys:

    ```python
    from pymilvus import MilvusClient

    client = MilvusClient(uri, token)

    client.delete(
        collection_name='my-collection3',
        pks=['pk-1', 'pk-2']
    )
    ```