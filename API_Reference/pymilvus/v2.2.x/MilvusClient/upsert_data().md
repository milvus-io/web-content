# upsert_data()

This method upserts data into the collection.

## Invocation

```python
upsert_data(
    data,
    timeout,
    batch_size,
    partition,
    progress_bar    
    )
```

## Parameters

| Parameter          | Description                          | Type     | Required |
|--------------------|--------------------------------------|----------|----------|
| `data` | A list of dictionaries to upsert. | list[Dictionary] | True     |
| `timeout` | Maximum time that the method should wait for the operation to complete before raising an exception.| Integer | False    |
| `batch_size` | Number of entities to upsert in a batch. Default value: **100**. | Integer | False    |
| `partition` | Partition to which data is inserted. | String | False    |
| `progress_bar` | Whether to display a progress bar for the operation. Default value: **False**.| Boolean | False    |

## Raises

None

## Returns

A list of primary keys upserted are returned.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient()

client.upsert_data(data)
```