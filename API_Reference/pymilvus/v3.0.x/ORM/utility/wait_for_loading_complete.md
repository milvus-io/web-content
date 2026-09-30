# wait_for_loading_complete()

This operation blocks the current process until the specified collection has been loaded.

## Request Syntax

```python
wait_for_loading_complete(
    collection_name: str,
    partition_names: list[str] | None,
    timeout: float | None,
    using: str = "default",
)
```

**PARAMETERS:**
**collection_name** (*str*) -

- **partition_names** (*list[str]*) -

    A list of partition names.

    If any partition names are specified, this operation blocks the current progress until the specified partitions have been loaded.

- **using** (*string*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import connections, utility

# Connect to localhost:19530
connections.connect()

# Get an existing collection
collection = Collection("test_collection")

# Load the collection data
collection.load()

# Wait until the load process completes
utility.wait_for_loading_complete(
    collection_name="test_collection",
    partition_names=["test_partition"],
    timeout=None,
    using="default",
)
```

## Related operations

The following operations are related to `wait_for_loading_complete()`:

- [Partition](../Partition/Partition.md)

- [load()](../Collection/load.md)

- [release()](../Collection/release.md)

- [load_state()](load_state.md)

- [loading_progress()](loading_progress.md)

