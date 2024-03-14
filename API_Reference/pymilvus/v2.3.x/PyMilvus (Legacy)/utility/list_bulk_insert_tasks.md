
# list_bulk_insert_tasks()

This operation lists all bulk-insert tasks.

## Request syntax

```python
list_bulk_insert_tasks(
    limit: int = 0,
    collection_name: list[str] | None,
    timeout: float | None,
    using: str = "default",
)
```

__PARAMETERS:__

- __limit__ (_int_) -

    The number of tasks to return.

    The value defaults to __0__, indicating that no limit applies. 

- __collection_name__ (_list[str]_) -

    A list of collection names.

    The value defaults to __None__, indicating that all collections are included.

- __using__ (_str_) - 

    The alias of the employed connection.

    The default value is __default__, indicating that this operation employs the default connection.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_list_

__RETURNS:__
A list of __BulkInsertState__ objects.

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

# List all bulk-insert tasks
res = utility.list_bulk_insert_tasks()
```

