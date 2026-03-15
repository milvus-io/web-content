# get_replicas()

This operation gets information about the current loaded replica.

## Request Syntax

```python
get_replicas(
    timeout: float | None
)
```

**PARAMETERS:**

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*Replica*

**RETURNS:**

A **Replica** object that contains the following fields:

- **groups** (*list*)

    A list of replica groups. Each **Group** objects that contains the following fields:

    - **id** (*int*)

        The group ID.

    - **group_nodes** (*tuple*)

        A tuple containing the IDs of the involved query nodes

    - **resource_group** (*str*)

        The name of the resource group to which the above query nodes belong

    - **shards** (*list*)  

        A list of **Shard** objects that contains the following fields:

        - **channel_name** (*str*)

        - **shard_leader** (*int*)

        - **shard_nodes** (*set*)

<div class="alert note">

With replicas, Milvus can load the same segments on multiple query nodes. If one query node has failed or is busy with a current search request when another arrives, the system can send new requests to an idle query node that has a replication of the same segment. 

Replicas are organized as replica groups. Each replica group contains [shard](https://milvus.io/docs/v2.1.x/glossary.md#Sharding) replicas. Each shard replica has a streaming replica and a historical replica that correspond to the growing and sealed [segments](https://milvus.io/docs/v2.1.x/glossary.md#Segment) in the shard.

Shards can be regarded as DML channels for distributed data write operations among multiple nodes to make the most of the parallel computing potential out of a Milvus cluster.

</div>

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

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

# Get the currently loaded replicas
collection.get_replicas()
```

## Related operations

The following operations are related to `get_replicas()`:

- [describe()](https://zilliverse.feishu.cn/docx/EZwsd887JojFjLxbMByckhW0nxg)

- [drop()](https://zilliverse.feishu.cn/docx/L8UTdDNkPoeew0x6LoDcfHx4nof)

- [flush()](https://zilliverse.feishu.cn/docx/VdiwdqQ9iofbkoxcc8Kcqk5gnhZ)

- [set_properties()](https://zilliverse.feishu.cn/docx/ECmAdaYKboPTNlxqkLxcUEZ4nrh)

