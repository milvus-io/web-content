# ResourceGroupLimit

Represents the requested or limited node number of a resource group.

```java
class io.milvus.common.resourcegroup.ResourceGroupLimit
```

**PARAMETERS:**

- **nodeNum** (*Integer*)

    The query node number in this group. Cannot be null.

**METHODS:**

- `getNodeNum()` (*Integer*) -

    The node number of the limit.

## Example

```java
import io.milvus.common.resourcegroup.ResourceGroupLimit;

ResourceGroupLimit requests = new ResourceGroupLimit(1);
ResourceGroupLimit limits = new ResourceGroupLimit(1);
```
