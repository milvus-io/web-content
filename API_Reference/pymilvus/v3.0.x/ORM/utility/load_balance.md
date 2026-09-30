# load_balance()

This operation sets up a load-balancing group between two query nodes for a specific collection.

## Request Syntax

```python
load_balance(
    collection_name: str,
    src_node_id: int,
    dst_node_ids: list[int] | None,
    sealed_segment_ids: list[int] | None,
    timeout: float | None,
    using: str = "default",
)
```

**PARAMETERS:**

- **collection_name** (*str*) -
**[REQUIRED]**

    The name of an existing collection for which a load-balancing group is set up.

- **src_node_id** (*int*) -
**[REQUIRED]**

    The ID of the query node the collection currently uses.

- **dst_node_ids** (*list[int]*) -

    The IDs of the query nodes to be added to the load-balancing group.

- **sealed_segment_ids** (*list[int]*) -

    The IDs of the sealed segments to load-balance.

- **timeout** (*float*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

**RETURN TYPE:**

*NoneType*

**RETURNS:**
None

**EXCEPTIONS:**

N/A

## Examples

```python
from pymilvus import connections, utility

# Connect to localhost:19530
connections.connect()

utility.load_balance(
    collection_name="test_collection",
    src_node_id=446781855410073001,
    dst_node_ids=[478798283048914039],
    sealed_segment_ids=None,
)
```

