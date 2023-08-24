# get()

This method grabs entities by primary keys. If `output_fields` is specified, this operation returns the specified field value only.

## Invocation

```python
get(
    collection_name,
    ids,
    output_fields,
    timeout
)
```

## Parameters

| Parameter          | Description                          | Type     | Required |
|--------------------|--------------------------------------|----------|----------|
| `collection_name` | Name of the collection where data is to grab. | String | True    |
| `ids` | Primary keys of the vectors to grab. | Union[list, str, int] | True     |
|`output_fields`| Fields that are specified to return. | String or INT64 | False
| `timeout` | An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs. | Float | False     |

## Return

A list of dictionaries with primary keys and vector fields.

## Raises

`ValueError`: Error if failed to grab vectors.

## Example

- Grab an entity by a primary key of a string:

    ```python
    from pymilvus import MilvusClient

    client = MilvusClient(uri, token)

    client.get(
        collection_name='my-collection1',
        ids='pk1'
    )
    ```

- Grab an entity by a primary key of an integer:

    ```python
    from pymilvus import MilvusClient

    client = MilvusClient(uri, token)

    client.get(
        collection_name='my-collection2',
        ids=256
    )
    ```

- Grab multiple entities and return specified fields:

    ```python
    from pymilvus import MilvusClient

    client = MilvusClient(uri, token)
    
    client.get(
        collection_name='my-collection3',
        ids=['pk-1', 'pk-2'],
        output_fields=['claps','reading_time']
    )
    ```