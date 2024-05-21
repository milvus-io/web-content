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

**PARAMETERS:**

- **limit** (*int*) -

    The number of tasks to return.

    The value defaults to **0**, indicating that no limit applies. 

- **collection_name** (*list[str]*) -

    A list of collection names.

    The value defaults to **None**, indicating that all collections are included.

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*list*

**RETURNS:**
A list of **BulkInsertState** objects.

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

- **task_id** (*int*)

    A task ID returned by the **do_bulk_insert()** function.

- **state** (*int*)

    The state of the specified bulk_insert task in integers. Possible values are the following integers:

    - **0**: Indicates that the task is in a pending state

    - **1**: Indicates that the task failed.

    - **2**: Indicates that the task has already started.

    - **5**: Indicates that the data has been persisted.

    - **6**: Indicates that the task has been completed.

    - **7**: Indicates that the task failed and the data has been cleaned up.

    - **100**: Indicates that the task is in an unknown state.

- **state_name** (*str*)

    The state of the specified bulk_insert task in integers. Possible values are the following integers:

    - **Pending**: Indicates that the task is in a pending state

    - **Failed**: Indicates that the task failed.

    - **Started**: Indicates that the task has already started.

    - **Persisted**: Indicates that the data has been persisted.

    - **Completed**: Indicates that the task has been completed.

    - **FailedAndCleaned**: Indicates that the task failed and the data has been cleaned up.

    - **Unknown**: Indicates that the task is in an unknown state.

- **row_count** (*int*)

    The number of entities inserted in the current bulk-insert task.

- **progress** (*int*) 

    The progress of the current bulk-insert task.

- **infos** (*dict*)

    A dictionary containing information about the current bulk-insert task. Possible keys are as follows:

    - **files** (*str*)

        The names of the files involved in the current bulk-insert task in a comma-separated string.

    - **collection** (*str*)

        The name of the target collection.

    - **partition** (*str*)

        The name of the target partition.

    - **failed_reason** (*str*)

        The reason for any bulk-insert failures. If the task succeeds, this is an empty string.

    - **progress_percent** (str)

        The progress of the current bulk-insert task in percentage.

    - **persist_cost** (str)

        The persistence cost of the current bulk-insert task.

- **ids** (*list*) 

    The IDs of the inserted entities in a list.

- **id_ranges** (*google._upb._message.RepeatedScalarContainer*)

- The ID of the inserted entities in a range.

- **files** (str)

    The names of the files involved in the current bulk-insert task in a comma-separated string.

- **create_timestamp** (int)

    The timestamp at which the current bulk-insert task has been created.

- **create_time_str** (str)

    The timestamp at which the current bulk-insert task has been created, in a human-readable string.

- **collection_name** (str)

    The name of the target collection.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import connections, utility

# Connect to localhost:19530
connections.connect()

# List all bulk-insert tasks
res = utility.list_bulk_insert_tasks()
```

## Related operations

The following operations are related to `list_bulk_insert_state()`:

- [BulkInsertState](BulkInsertState.md)

- [do_bulk_insert()](do_bulk_insert.md)

- [get_bulk_insert_state()](get_bulk_insert_state.md)

