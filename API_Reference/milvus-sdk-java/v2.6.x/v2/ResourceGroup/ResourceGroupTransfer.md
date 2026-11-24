# ResourceGroupTransfer

Represents a transfer of redundant or missing nodes between resource groups, identified by the target resource group name.

```java
class io.milvus.common.resourcegroup.ResourceGroupTransfer
```

**PARAMETERS:**

- **resourceGroupName** (*String*)

    The name of the target resource group. Cannot be null.

**METHODS:**

- `getResourceGroupName()` (*String*) -

    The resource group name.

## Example

```java
import io.milvus.common.resourcegroup.ResourceGroupTransfer;

ResourceGroupTransfer from = new ResourceGroupTransfer("rg1");
ResourceGroupTransfer to = new ResourceGroupTransfer("rg2");
```
