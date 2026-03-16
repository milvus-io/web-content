# describe_resource_group()

This operation lists detailed information about the specified resource group.

## Request Syntax

```python
describe_resource_group(
    name: str,
    timeout: Optional[float] = None
) -> ResourceGroupInfo
```

**PARAMETERS:**

- **name** (*str*) - 

    Name of the resource group to describe.

- **timeout** (*float* | *None*) - 

    The timeout duration for this operation. Setting this to *None* indicates that it timeouts when a response arrives or an error occurs.

**RETURN TYPE:**

*ResourceGroupInfo*

**RETURNS:**

A **ResourceGroupInfo** object that contains detailed information about the specified resource group.

```python
ResourceGroupInfo:
<name:rg1>, # resource group name
<capacity:1>, # resource group capacity
<num_available_node:1>, # resource group node num
<num_loaded_replica:{'hello_milvus': 1}>, # collection loaded replica num in resource group
<num_outgoing_node:{}>, # node num which still in use by replica in other resource group
<num_incoming_node:{}>, # node num which is in use by replica but belong to other resource group 
<config:requests { # resource group config
  node_num: 1
}
limits {
  node_num: 1
}
transfer_from {
  resource_group: "__default_resource_group"
}
transfer_to {
  resource_group: "__default_resource_group"
}
>,
<nodes:[NodeInfo: # node detailed info
<node_id: 1>,
<address:ip:port>,
<hostname: hostname>]>
```

**PARAMETERS:**

- **name** (*str*) - 

    Name of the specified resource group.

- **capacity** (*number*) -

    The number of query nodes that have been transferred to this resource group.

- **num_available_replica** (*Object*) -

    An object that contains collection-specific statistics on the number of available replicas, with the collection names as the keys and their numbers of replicas as the values.

- **num_outgoing_node**: (*Object*) -

    An object that contains collection-specific statistics on the number of outgoing nodes accessed by the replicas loaded in this resource group, with the collection names as the keys and their numbers of outgoing nodes as the values.

- **num_incoming_node**: (*Object*) -

    An object that contains collection-specific statistics on the number of incoming nodes accessed by the replicas loaded in this resource group, with the collection names as the keys and their numbers of incoming nodes as the values.

- **config** (*ResourceGroupConfig*) -

    The configurations of the specified resource group in a [ResourceGroupConfig](ResourceGroupConfig.md) instance.

**EXCEPTIONS:**

- `MilvusException` - Raised if any error occurs during this operation.

## Examples

```python
from pymilvus import (
    MilvusClient,
    DataType,
)
from pymilvus.client.constants import DEFAULT_RESOURCE_GROUP

from pymilvus.client.types import (
    ResourceGroupConfig,
)

collection_name = "hello_milvus"
client = MilvusClient("http://localhost:19530")

## create resource group
print("create resource group")
client.create_resource_group("rg1", config=ResourceGroupConfig(
                requests={"node_num": 1},
                limits={"node_num": 1},
                transfer_from=[{"resource_group": DEFAULT_RESOURCE_GROUP}],
                transfer_to=[{"resource_group": DEFAULT_RESOURCE_GROUP}],
            ))

## describe resource group
print("describe rg1")
result = client.describe_resource_group("rg1")
print(result)
```
