# list_resource_groups()

This method has Milvus list the names of all resource groups.

## Invocation

```Python
list_resource_groups(using='default')
```

## Parameters

| Parameter            | Description                              | Type                | Required            |
| -------------------- | ---------------------------------------- | ------------------- | ------------------- |
| using                | Milvus connection used to create the collection. | String      | False               |

## Return

A list of resource group names.

## Example

```Python
import pymilvus

rgs = utility.list_resource_groups(using='default')
print(f"Resource group list: {rgs}")

# Resource group list: ['__default_resource_group', 'rg']
```

