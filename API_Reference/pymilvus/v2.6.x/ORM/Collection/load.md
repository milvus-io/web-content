# load()

This operation loads the data of the current collection into memory. 

## Request Syntax

```python
load(
    partition_names: list[str] | None, 
    replica_number: int, 
    timeout: float | None, 
)
```

<div class="admonition note">

<p><b>notes</b></p>

<p>This operation is non-blocking. You can call <code>utility.wait_for_loading_complete()</code> to block the current process.</p>

</div>

**PARAMETERS:**

- **partition_names** (*list(str)* | *None*) - 

    The partitions of the current collection to load. If left unspecified, all partitions are to be loaded.

- **timeout** (*float* | *None*)  -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **replica_number** (*int*) -

    The number of replicas to create. The value defaults to 1 and ranges from 1 to the number of query nodes available. Setting this to `1` indicates that segments in the current collection or any specified partitions are to be loaded onto one query node.

    <div class="admonition note">

    <p><b>what are the differences between partitions and replicas?</b></p>

    <p>Partitioning allows you to further split a collection into multiple partitions, store different data in them, and load or release each of them individually. A collection can have up to 64 partitions. </p>
    <p>Replication is a mechanism for Milvus to load the same segments on multiple query nodes. It is very useful if you have a relatively small dataset but want to increase read-throughput with extra hardware resources.</p>

    </div>

- **resource_groups** (*str[]*) **-**

    A specific set of resource groups into which the current collection is to be loaded.

    If left unspecified, the default resource group applies.

    <div class="admonition note">

    <p><b>what is a resource group?</b></p>

    <p>A resource group can hold several or all of the query nodes in a Milvus instance.</p>
    <p>Setting this parameter for this operation makes Milvus loads the current collection to the query nodes in the specified resource groups.</p>

    </div>

- **load_fields** (*str[]*) -

    The names of the fields to load. 

    If this parameter is left unspecified, Milvus loads all vector field indexes plus all scalar field data into memory. Setting this parameter makes Milvus load the data of the specified fields into memory, reducing memory usage and improving search performance.

- **skip_load_dynamic_field** (*bool*) - 

    Setting this to true makes Milvus skip loading the dynamic field, making it unavailable for filtering conditions and output fields for searches and queries.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

*None*

**EXCEPTIONS:**

- **MilvusException**

    This exception is to be raised when any error occurs during this operation.

<div class="admonition note">

<p><b>warning</b></p>

<p>If you try to load a collection that is not indexed, you will receive a <strong>MilvusException</strong>.</p>

</div>

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

# Set the index parameters
index_params = {
    "index_type": "AUTOINDEX",
    "metric_type": "COSINE",
    "params": {
        "nprobe": 10
    }
}

# Create an index on the vector field
collection.create_index(
    field_name="vector", 
    index_params=index_params, 
    timeout=None
)

# Load the entire collection with one replica of the collection data
collection.load()

# Load the entire collection with two replicas of the collection data
collection.load(
    replica_number=2
)

# Load a specific partition with two replicas of the partition data
collection.load(
    partition_names=["partitionA"],
    replica_number=2
)
```

## Related operations

The following operations are related to `load()`:

- [Partition](../Partition/Partition.md)

- [release()](release.md)

- [load_state()](../utility/load_state.md)

- [loading_progress()](../utility/loading_progress.md)

- [wait_for_loading_complete()](../utility/wait_for_loading_complete.md)

