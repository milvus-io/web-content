# drop_resource_group()

This method drops a specified resource group. Note that the resource group to be dropped should not hold any query node.

## Invocation

```Python
drop_resource_group(name, using='default')
```

## Parameters

| Parameter            | Description                              | Type                | Required            |
| -------------------- | ---------------------------------------- | ------------------- | ------------------- |
| name                 | Name of the resource group to be created.| String              | True                |
| using                | Milvus connection used to create the collection. | String      | False               |

## Return

No return

## Example

```Python
import pymilvus

source = 'rg'
target = '__default_resource_group'
num_nodes = 1

try:
    utility.transfer_node(source, target, num_nodes, using="default")
    utility.drop_resource_group(source, using="default")
    print(f"Succeeded in dropping {source}.")
except Exception:
    print(f"Something went wrong while dropping {source}.")
```

