# describe_resource_group()

This method has Milvus describe the detail of a specified resource group.

## Invocation

```Python
describe_resource_group(name, using='default')
```

## Parameters

| Parameter            | Description                              | Type                | Required            |
| -------------------- | ---------------------------------------- | ------------------- | ------------------- |
| name                 | Name of the resource group to be created.| String              | True                |
| using                | Milvus connection used to create the collection. | String      | False               |

## Return

A resource group description object

## Example

```Python
import pymilvus

info = utility.describe_resource_group(name, using="default")
print(f"Resource group description: {info}")

# Resource group description: 
#        <name:"demo">,           // string, rg name
#        <capacity:1>,            // int, num_node which has been transfer to this rg
#        <num_available_node:0>,  // int, available node_num, some node may shutdown
#        <num_loaded_replica:{}>, // map[string]int, from collection_name to loaded replica of each collecion in this rg
#        <num_outgoing_node:{}>,  // map[string]int, from collection_name to outgoging accessed node num by replica loaded in this rg 
#        <num_incoming_node:{}>.  // map[string]int, from collection_name to incoming accessed node num by replica loaded in other rg
```

