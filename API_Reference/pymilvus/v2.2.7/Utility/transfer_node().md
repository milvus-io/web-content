# transfer_node()

This method moves a specified number of query nodes from a resource group to another.

## Invocation

```Python
transfer_node(source, target, num_nodes, using="default")
```

## Parameters

| Parameter            | Description                              | Type                | Required            |
| -------------------- | ---------------------------------------- | ------------------- | ------------------- |
| source               | Name of the resource group from which query nodes are moved | String      | True     |
| target               | Name of the resource group to which query nodes are moved | String      | True       |
| num_nodes            | Number of nodes to be moved                               | int     | True           |
| using                | Milvus connection used to create the collection. | String      | False               |

## Return

No return

## Example

```Python
source = '__default_resource_group'
target = 'rg'
num_nodes = 1

try:
    utility.transfer_node(source, target, num_nodes, using="default")
    print(f"Succeeded in moving {num_node} node(s) from {source} to {target}.")
except Exception:
    print("Something went wrong while moving nodes.")

# Succeeded in moving 1 node(s) from __default_resource_group to rg.
```

