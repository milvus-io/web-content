# bulk_load()

This method load a data file into Milvus.


## Invocation

```python
bulk_load(collection_name,is_row_based,files)
```

## Parameters

| Parameter         | Description                                                  | Type                            | Required |
| ----------------- | ------------------------------------------------------------ | ------------------------------- | -------- |
| `collection_name` | Name of the collection to load data in                       | String                          | True     |
| `is_row_based`    | Boolean value to indicate if the file is row-based.          | Boolean                         | True     |
| `files`           | List of file names to load into Milvus.                      | List[String]                    | True     |
| `partition_name`  | Name of the partition to insert data into                    | String                          | False    |

## Return

No return.

## Raises


## Example

```python
from pymilvus import utility
tasks = utility.bulk_load(
    collection_name="book",
    is_row_based=True,
    files=["row_based_1.json", "row_based_2.json"]
)
```