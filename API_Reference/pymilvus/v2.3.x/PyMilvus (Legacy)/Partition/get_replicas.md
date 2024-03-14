
# get_replicas()

This operation gets information about the current loaded replica.

## Request Syntax

```python
get_replicas(
    timeout: float | None
)
```

__PARAMETERS:__

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_Replica_

__RETURNS:__

A __Replica__ object that contains the following fields:

- __groups__ (_list_)

    A list of replica groups. Each __Group__ objects that contains the following fields:

    - __id__ (_int_)

        The group ID.

    - __group_nodes__ (_tuple_)

        A tuple containing the IDs of the involved query nodes.

    - __resource_group__ (_str_)

        The name of the resource group to which the above query nodes belong.

    - __shards__ (_list_)  

        A list of __Shard__ objects that contains the following fields:

        - __channel_name__ (_str_)

        - __shard_leader__ (_int_)

        - __shard_nodes__ (_set_)

<div class="admonition note">

<p><b>what is a replica?</b></p>

<p>With replicas, Milvus can load the same segments on multiple query nodes. If one query node has failed or is busy with a current search request when another arrives, the system can send new requests to an idle query node that has a replication of the same segment. </p>
<p>Replicas are organized as replica groups. Each replica group contains <a href="https://milvus.io/docs/v2.1.x/glossary.md#Sharding">shard</a> replicas. Each shard replica has a streaming replica and a historical replica that correspond to the growing and sealed <a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">segments</a> in the shard.</p>
<p>Shards can be regarded as DML channels for distributed data write operations among multiple nodes to make the most of the parallel computing potential out of a Milvus cluster.</p>

</div>

__EXCEPTIONS:__

None

## Examples

```python
from pymilvus import Collection, Partition

collection = Collection(name="test_collection")

# Get an existing partition
partition = Partition(collection, name="test_partition")

# Get the information about the current loaded replicas
partition.get_replicas()
```

