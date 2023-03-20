# create_resource_group()

This method creates a custom resource group.

## Invocation

```Python
create_resource_group(name, using='default')
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

# A resource group name should be a string of 1 to 255 characters, starting with a letter or an underscore (_) and containing only numbers, letters, and underscores (_).
name = "rg"

try:
    utility.create_resource_group(name, using='default')
    print(f"Succeeded in creating resource group {name}.")
except Exception:
    print("Failed to create the resource group.")

# Succeeded in creating resource group rg.
```

