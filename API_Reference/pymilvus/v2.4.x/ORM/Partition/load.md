# load()

This operation loads the data of the current partition into memory.

<div class="admonition note">

<p><b>notes</b></p>

<p>Using the <strong>partition_names</strong> parameter in the <strong>load()</strong> method of a <strong>Collection</strong> object is equivalent to using the <strong>load()</strong> method of corresponding <strong>Partition</strong> objects.</p>

</div>

## Request Syntax

```python
load(
    replica_number: int,
    timeout: float | None
)
```

__PARAMETERS:__

- __replica_number__ (_int_)

    The number of replicas to load in the current partition. The default value is __1__, indicating that one replica in the current partition is loaded.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

- __kwargs__ - 

    - ___resource_groups__ (_list_) -

        A specific set of resource groups into which the current collection is to be loaded.

        If left unspecified, the default resource group applies.

        <div class="admonition note">

        <p><b>what is a resource group?</b></p>

        <p>A resource group can hold several or all of the query nodes in a Milvus instance.</p>
        <p>Setting this parameter for this operation makes Milvus loads the current collection to the query nodes in the specified resource groups.</p>

        </div>

__RETURN TYPE:__

_NoneType_

__RETURNS:__

_None_

__EXCEPTIONS:__

- __MilvusException__

    This arises when any error occurs during this operation.

## Examples

```python
from pymilvus import Collection, Partition, CollectionSchema, FieldSchema, DataType

schema = CollectionSchema([
    FieldSchema("id", DataType.INT64, is_primary=True),
    FieldSchema("vector", DataType.FLOAT_VECTOR, dim=5)
])

# Create a collection
collection = Collection(
    name="test_collection",
    schema=schema
)

# Create a partition
partition = Partition(
    collection=collection,
    name="test_partition"
)

# Load a partition with one replica of the collection data
partition.load()

# Load a partition with two replicas of the collection data
partition.load(
    replica_number=2
)
```

## Related operations

The following operations are related to `load()`:

- [drop()](./drop.md)

- [get_replicas()](./get_replicas.md)

- [release()](./release.md)

