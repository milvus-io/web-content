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

__PARAMETERS:__

- __collection_name__ (_str_) -
__[REQUIRED]__

    The name of an existing collection for which a load-balancing group is set up.

- __src_node_id__ (_int_) -
__[REQUIRED]__

    The ID of the query node the collection currently uses.

- __dst_node_ids__ (_list[int]_) -

    The IDs of the query nodes to be added to the load-balancing group.

- __sealed_segment_ids__ (_list[int]_) -

    The IDs of the sealed segments to load-balance.

- __timeout__ (_float_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

- __using__ (_str_) - 

    The alias of the employed connection.

    The default value is __default__, indicating that this operation employs the default connection.

__RETURN TYPE:__

_NoneType_

__RETURNS:__
None

__EXCEPTIONS:__

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

