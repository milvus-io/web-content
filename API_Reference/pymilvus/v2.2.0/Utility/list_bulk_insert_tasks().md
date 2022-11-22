# list_bulk_insert_tasks()

This method lists all running bulk insert tasks of the specified connection.

## Invocation

```Python
list_bulk_insert_tasks(limit=0, collection_name=None, timeout=None, using="default", **kwargs)
```

## Parameters

| Parameter    | Description                                                  | Type                            | Required |
| ------------ | ------------------------------------------------------------ | ------------------------------- | -------- |
| `limit` | Number of records to return | Integer | False |
| `collection_name` | Name of a collection | String | False |
| `timetout` | An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs. | Integer | False |
| `using` |  Alias of the Milvus connection to be attached to | String | False |

## Returns

Returns a list of BulkInsertState objects.

## Example

```Python
from pymilvus import connections, utility, BulkInsertState
connections.connect()
tasks = utility.list_bulk_insert_tasks(collection_name=collection_name)
print(tasks)
```
