# insert()

This method inserts entities into a collection. You can insert data through either a list of rows or a list of columns.

## Invocation

```python
insert(
    collection_name,
    data,
    batch_size,
    progress_bar,
    timeout
)
```

## Parameters

| Parameter          | Description                          | Type     | Required |
|--------------------|--------------------------------------|----------|----------|
| `collection_name` | Name of the collection to which data is inserted. | String | True    |
| `data` | A list of dictionaries to insert. Each dictionary represents an entity. All fields defined in the schema are required and should be included as keys in the dictionaries. You can also add dynamic keys for any fields that are not defined in the schema.| list[Dictionary] | True     |
| `batch_size` | Size of entities to insert in a batch. | Integer | False    |
| `progress_bar` | Whether to display a progress bar. | Boolean | False    |
| `timeout` | An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs. | Float | False     |

## Return

A list of primary keys inserted.

## Raises

`DataNotMatchException`: Error if the data has misssing fields.

`MilvusException`: Error if a general Milvus error occurred.

## Example

- Insert data through a list of rows:

    ```python
    # Prepare data as a list of rows
    import json

    with open('/path/to/downloaded/dataset') as f:
        data = json.load(f)
        list_of_rows = data['rows'][0]

    # Create a MilvusClient instance
    from pymilvus import MilvusClient

    client = MilvusClient(uri, token)

    client.insert(list_of_rows)
    ```

- Insert data through a list of columns:

    ```python
    # Prepare data as a list of columns
    import json

    with open('/path/to/downloaded/dataset') as f:
        data = json.load(f)
        keys = data['rows'][0].keys()
        entity = data['rows'][0]
        list_of_columns = [ [entity.get(x)] for x in keys]

    # Create a MilvusClient instance
    from pymilvus import MilvusClient

    client = MilvusClient(uri, token)

    client.insert(list_of_columns)
    ```