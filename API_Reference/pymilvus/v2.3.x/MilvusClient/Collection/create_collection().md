# create_collection()

This method creates a collection.

## Invocation

```python
create_collection(
    collection_name,
    dimension,
    primary_field_name,
    id_type,
    vector_field_name,
    metric_type,
    auto_id,
    timeout
)
```

## Parameters

| Parameter          | Description                          | Type     | Required |
|--------------------|--------------------------------------|----------|----------|
| `collection_name` | Name of the collection to create. | String | True     |
| `dimension` | Vector dimension. | Integer | True     |
| `primary_field_name` | Name of the primary key. Default value: **id**. | String | False     |
| `id_type` | Data type of the primary key. Valid values: **int** or **string**. | String | False     |
| `vector_field_name` | Name of the vector field. | String | False     |
| `metric_type` | Metric type for the collection. Default value: **IP**. | String | False     |
| `auto_id` | Whether to automatically generate a unique ID for each new vector inserted into the collection. Default value: **False**. | Boolean | False     |
| `timeout` | An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs. | Float | False     |

## Return

A new collection object.

## Raises

None

## Example

- Create a collection with a dynamic schema:

    ```python
    from pymilvus import MilvusClient

    client = MilvusClient(uri, token)

    client.create_collection(
        collection_name='medium_articles',
        dimension=768
    )
    ```

- Create a collection with a custom schema:

    ```python
    from pymilvus import MilvusClient

    client = MilvusClient(uri, token)

    client.create_collection(
        collection_name='medium_articles',
        dimension=768,
        primary_field_name='custom_id',
        vector_field_name='vector_title'
    )
    ```