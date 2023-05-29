# query_data()

This method queries entities in the collection.

## Invocation

```python
query_data(
    filter_expression,
    return_fields,
    partitions,
    timeout
    )
```

## Parameters

| Parameter          | Description                          | Type     | Required |
|--------------------|--------------------------------------|----------|----------|
| `filter_expression` | Filter used to query data. | String | True     |
| `return_fields` | A list of fields to return. If you leave this parameter empty, all fields excluding the vector field will be returned.| list[String] | False    | |
| `partitions` | Partitions in which data is queried. | list[String] | False    |
| `timeout` | Maximum time that the method should wait for the operation to complete before raising an exception.| Integer | False    |


## Raises

`ValueError`: Error if the collection is missing.

## Returns

A list of dictionaries are returned, excluding the vector field.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient()

client.query_data(
    filter_expression='book_id in [2,4,6,8]',
    return_fields=["book_id", "book_intro"]
)
```