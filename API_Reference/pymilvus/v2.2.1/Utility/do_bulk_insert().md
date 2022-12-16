# do_bulk_insert()

This method inserts entities from files. You have to organize your data in a row-based JSON file and upload the JSON file to a MINIO or S3 bucket. For details, see [Prepare a JSON file](milvus.io/docs/v2.2.x/bulk_load.md#Prepare-a-JSON-file).

## Invocation

```Python
do_bulk_insert(collection_name, partition_name=None, files, timeout=None, using='default', kwargs)
```

## Parameters

| Parameter    | Description                                                  | Type                            | Required |
| ------------ | ------------------------------------------------------------ | ------------------------------- | -------- |
| `collection_name` | Name of a colletion | String | True |
| `partition_name` | Name of a partition | String | False |
| `files` | List of file paths. The path must be a MINIO or S3 bucket path | List[String] | True |
| `timetout` | An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs. | Integer | False |
| `using` |  Alias of the Milvus connection to be attached to | String | False |

## Raises

- `BaseException`: Thrown if `collection_name` does not exist.
- `BaseException`: Thrown if the list of files is invalid.

## Example 

```Python
from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType, utility
connections.connect()
schema = CollectionSchema([
    FieldSchema("film_id", DataType.INT64, is_primary=True),
    FieldSchema("films", dtype=DataType.FLOAT_VECTOR, dim=2)
])
collection = Collection("test_collection_bulk_insert", schema)
task_id = utility.do_bulk_insert(collection_name=collection.name, files=['data.json'])
print(task_id)
```
