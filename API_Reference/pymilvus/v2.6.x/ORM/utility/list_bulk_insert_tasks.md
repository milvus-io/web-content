# list_bulk_insert_tasks()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation lists all bulk-insert tasks.

## Request Syntax

```python
list_bulk_insert_tasks(
    limit: int = 0,
    collection_name: str | None,
    timeout: float | None,
    using: str = "default",
)
```

**PARAMETERS:**

- **limit** (*int*) -

    The number of tasks to return.

    The value defaults to **0**, indicating that no limit applies. 

- **collection_name** (*str*) -

    The name of a collection.

    The value defaults to **None**, indicating that this operation lists tasks of all collections.

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*list*

**RETURNS:**
A list of **[BulkInsertState](BulkInsertState.md)** objects.

```text
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

For the fields of each **[BulkInsertState](BulkInsertState.md)** object, refer to [BulkInsertState](BulkInsertState.md).

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import connections, utility

# Connect to localhost:19530
connections.connect()

# List all bulk-insert tasks
res = utility.list_bulk_insert_tasks()
```

## Related operations

The following operations are related to `list_bulk_insert_tasks()`:

- [BulkInsertState](BulkInsertState.md)

- [do_bulk_insert()](do_bulk_insert.md)

- [get_bulk_insert_state()](get_bulk_insert_state.md)

