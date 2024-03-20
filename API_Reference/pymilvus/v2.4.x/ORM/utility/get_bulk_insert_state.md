# get_bulk_insert_state()

This operation returns the state of a specified bulk-insert task.

## Request syntax

```python
get_bulk_insert_state(
    task_id: int,
    timeout: float | None,
    using: str = "default",
    **kwargs,
)
```

```python
from pymilvus import connections, utility
connections.connect()

task_id = utility.do_bulk_insert(
    collection_name="string",
    files=["string.npy", "string.npy"],
)

# Get bulk-insert task state
res = utility.get_bulk_insert_state(task_id=task_id)
```

__PARAMETERS:__

- __task_id__ (_int_) -
__[REQUIRED]__

    A task ID returned by the do_bulk_insert() function.

- __using__ (_str_) - 

    The alias of the employed connection.

    The default value is __default__, indicating that this operation employs the default connection.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

RETURN TYPE:

_BulkInsertState_

__RETURNS:__
A __BulkInsertState__ that contains information about the state of the specified bulk-insert task.

```python
├── BulkInsertState
│   ├── task_id 
│   ├── state 
│   ├── state_name   
│   ├── row_count
│   ├── progress
│   └── infos
│       ├── files
│       ├── collection
│       ├── partition
│       ├── failed_reason
│       ├── progress_percent
│       └── persist_cost
│   ├── ids
│   ├── id_ranges
│   ├── files
│   ├── create_timestamp
│   ├── create_time_str
│   └── collection_name
```

A __BulkInsertState__ object has the following fields

- __task_id__ (_int_)

    A task ID returned by the __do_bulk_insert()__ function.

- __state__ (_int_)

    The state of the specified bulk_insert task in integers. Possible values are the following integers:

    - __0__: Indicates that the task is in a pending state

    - __1__: Indicates that the task failed.

    - __2__: Indicates that the task has already started.

    - __5__: Indicates that the data has been persisted.

    - __6__: Indicates that the task has been completed.

    - __7__: Indicates that the task failed and the data has been cleaned up.

    - __100__: Indicates that the task is in an unknown state.

- __state_name__ (_str_)

    The state of the specified bulk_insert task in integers. Possible values are the following integers:

    - __Pending__: Indicates that the task is in a pending state

    - __Failed__: Indicates that the task failed.

    - __Started__: Indicates that the task has already started.

    - __Persisted__: Indicates that the data has been persisted.

    - __Completed__: Indicates that the task has been completed.

    - __FailedAndCleaned__: Indicates that the task failed and the data has been cleaned up.

    - __Unknown__: Indicates that the task is in an unknown state.

- __row_count__ (_int_)

    The number of entities inserted in the current bulk-insert task.

- __progress__ (_int_) 

    The progress of the current bulk-insert task.

- __infos__ (_dict_)

    A dictionary containing information about the current bulk-insert task. Possible keys are as follows:

    - __files__ (_str_)

        The names of the files involved in the current bulk-insert task in a comma-separated string.

    - __collection__ (_str_)

        The name of the target collection.

    - __partition__ (_str_)

        The name of the target partition.

    - __failed_reason__ (_str_)

        The reason for any bulk-insert failures. If the task succeeds, this is an empty string.

    - __progress_percent__ (str)

        The progress of the current bulk-insert task in percentage.

    - __persist_cost__ (str)

        The persistence cost of the current bulk-insert task.

- __ids__ (_list_) 

    The IDs of the inserted entities in a list.

- __id_ranges__ (_google._upb._message.RepeatedScalarContainer_)

- The ID of the inserted entities in a range.

- __files__ (str)

    The names of the files involved in the current bulk-insert task in a comma-separated string.

- __create_timestamp__ (int)

    The timestamp at which the current bulk-insert task has been created.

- __create_time_str__ (str)

    The timestamp at which the current bulk-insert task has been created, in a human-readable string.

- __collection_name__ (str)

    The name of the target collection.

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import connections, utility

# Connect to localhost:19530
connections.connect()

# Bulk-insert data
task_id = utility.do_bulk_insert(
    collection_name="test_collection",
    files=["data/id.npy", "data/vector.npy"],
) # 446781855410077319

# Get bulk-insert task state
res = utility.get_bulk_insert_state(task_id=task_id)

# <Bulk insert state:
#     - taskID          : 446781855410077319,
#     - state           : Completed,
#     - row_count       : 10000,
#     - infos           : {'files': 'data/id.npy,data/vector.npy', 'collection': 'test_collection_2', 'partition': '_default', 'failed_reason': '', 'progress_percent': '100', 'persist_cost': '0.34'},
#     - id_ranges       : [],
#     - create_ts       : 2024-01-06 22:24:07
# >
```

## Related operations

The following operations are related to `get_bulk_insert_state()`:

- [BulkInsertState](./BulkInsertState.md)

- [do_bulk_insert()](./do_bulk_insert.md)

- [list_bulk_insert_tasks()](./list_bulk_insert_tasks.md)

