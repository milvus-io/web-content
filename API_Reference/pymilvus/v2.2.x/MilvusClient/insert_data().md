# insert_data()

This method insert data into a collection.

## Invocation

```python
insert_data(
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
| `data` | A list of dictionaries to pass in. Each dictionary represents an entity. All fields defined in the schema are required and should be included as keys in the dictionary. You may also add dynamic keys for any additional fields not defined in the schema.| Dictionary | True     |
| `timeout` | Maximum time that the method should wait for the operation to complete before raising an exception. | Integer | False    |
| `batch_size` | Number of entities to insert in a batch. Default value: **100**. | Integer | False    |
| `partition` | Partition to which data is inserted. | String | False    |
| `progress_bar` | Whether to display a progress bar for the operation. Default value: **False**.| Boolean | False    |

## Raises

`DataNotMatchException`: Error if the data has misssing fields.
`MilvusException`: Error if failed to insert data.

## Returns

A list of primary keys inserted are returned.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient()

client.insert_data(data)
```