
# set_properties()

This operation sets properties for the collection.

## Request Syntax

```python
set_properties(
    properties: dict, 
    timeout: float | None, 
    kwargs
)
```

__PARAMETERS:__

- properties (dict) -

    A set of collection properties in the form of a dictionary. Currently, you can set the following properties:

    - __collection.ttl.seconds__

        Once this property is set, data in the current collection expires in the specified time. Expired data in the collection will be cleaned up and will not be involved in searches or queries.

- __timeout__ (_float_)  -

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_NoneType_

__RETURNS:__

None

## Examples

```python
from pymilvus import Collection, CollectionSchema, FieldSchema, DataType

schema = CollectionSchema([
    FieldSchema("id", DataType.INT64, is_primary=True),
    FieldSchema("vector", DataType.FLOAT_VECTOR, dim=5)
])

# Create a collection
collection = Collection(
    name="test_collection",
    schema=schema
)

# Set the TTL for the data in the collection
collection.set_properties(
    properties={
        "collection.ttl.seconds": 60
    }
)
```

