# BulkInsertState

This is an enumeration that provides the following constants. A `BulkInsertState` instance is also returned by `get_bulk_insert_state()` and `list_bulk_insert_tasks()` to describe the state and progress of a bulk-insert task.

```python
class BulkInsertState:
    ImportPending = 0
    ImportFailed = 1
    ImportStarted = 2
    ImportPersisted = 5
    ImportCompleted = 6
    ImportFailedAndCleaned = 7
    ImportUnknownState = 100
```

**Constants:**

- **ImportPending** (0)

    Indicates that the bulk insert task is pending.

- **ImportFailed** (1)

    Indicates that the bulk insert task has failed.

- **ImportStarted** (2)

    Indicates that the bulk insert task has started.

- **ImportPersisted** (5)

    Indicates that the imported data has been persisted.

- **ImportCompleted** (6)

    Indicates that the bulk insert task has completed.

- **ImportFailedAndCleaned** (7)

    Indicates that the bulk insert task has failed and the related data has been cleaned up.

- **ImportUnknownState** (100)

    Indicates that the bulk insert task state is unknown.

**METHODS:**

- **task_id** (*int*)

    A task ID returned by the **do_bulk_insert()** function.

- **state** (*int*)

    The state of the specified bulk_insert task as a string. Possible values are the following:

    - **0**: Indicates that the task is in a pending state

    - **1**: Indicates that the task failed.

    - **2**: Indicates that the task has already started.

    - **5**: Indicates that the data has been persisted.

    - **6**: Indicates that the task has been completed.

    - **7**: Indicates that the task failed and the data has been cleaned up.

    - **100**: Indicates that the task is in an unknown state.

- **state_name** (*str*)

    The state of the specified bulk_insert task as a string. Possible values are the following:

    - **Pending**: Indicates that the task is in a pending state

    - **Failed**: Indicates that the task failed.

    - **Started**: Indicates that the task has already started.

    - **Persisted**: Indicates that the data has been persisted.

    - **Completed**: Indicates that the task has been completed.

    - **Failed and cleaned**: Indicates that the task failed and the data has been cleaned up.

    - **Unknown**: Indicates that the task is in an unknown state.

- **row_count** (*int*)

    The number of entities inserted in the current bulk-insert task.

- **progress** (*int*) 

    The progress of the current bulk-insert task.

- **infos** (*dict*)

    A dictionary containing information about the current bulk-insert task. Possible keys are as follows:

    - **files** (*str*)

        The names of the files involved in the current bulk-insert task in a comma-separated string.

    - **[collection](../Collection/Collection.md)** (*str*)

        The name of the target collection.

    - **[partition](../Partition/Partition.md)** (*str*)

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

    The ID of the inserted entities in a range.

- **files** (str)

    The names of the files involved in the current bulk-insert task in a comma-separated string.

- **create_timestamp** (int)

    The timestamp at which the current bulk-insert task has been created.

- **create_time_str** (str)

    The timestamp at which the current bulk-insert task has been created, in a human-readable string.

- **collection_name** (str)

    The name of the target collection.

## Example

```python
from pymilvus import connections, utility, BulkInsertState

# Connect to localhost:19530
connections.connect()

# Bulk-insert data
task_id = utility.do_bulk_insert(
    collection_name="test_collection",
    files=["data/id.npy", "data/vector.npy"],
)

# Get the state of the bulk-insert task
res = utility.get_bulk_insert_state(task_id=task_id)

# Check the task state against BulkInsertState constants
if res.state == BulkInsertState.ImportCompleted:
    print("Bulk insert completed")
elif res.state == BulkInsertState.ImportFailed:
    print("Bulk insert failed")
```
