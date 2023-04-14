# transfer_node()

This method moves a specified number of replicas from a resource group to another.

## Invocation

```Python
transfer_replica(source, target, collection_name, num_replicas, using="default")
```

## Parameters

| Parameter            | Description                              | Type                | Required            |
| -------------------- | ---------------------------------------- | ------------------- | ------------------- |
| source               | Name of the resource group from which replicas are moved | String      | True     |
| target               | Name of the resource group to which replicas are moved | String      | True       |
| collection_name      | Name of the collection whose replicas are to be moved | String      | True       |
| num_replicas         | Number of replicas to be moved | int      | True       |
| using                | Milvus connection used to create the collection. | String      | False               |

## Return

No return

## Example

```Python
source = '__default_resource_group'
target = 'rg'
collection_name = 'c'
num_replicas = 1

try:
    utility.transfer_replica(source, target, collection_name, num_replicas, using="default")
    print(f"Succeeded in moving {num_node} replica(s) of {collection_name} from {source} to {target}.")
except Exception:
    print("Something went wrong while moving replicas.")

# Succeeded in moving 1 replica(s) of c from __default_resource_group to rg.
```

