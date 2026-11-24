# ResourceGroupNodeFilter

Defines a node label filter that a resource group applies when accepting query nodes.

```java
class io.milvus.common.resourcegroup.ResourceGroupNodeFilter
```

**BUILDER METHODS:**

- `withNodeLabel(String key, String value)`

    Sets a node label filter. Both `key` and `value` cannot be null.

**METHODS:**

- `getNodeLabels()` (*Map\<String, String\>*) -

    The node labels as a key-value map.

## Example

```java
import io.milvus.common.resourcegroup.ResourceGroupNodeFilter;

ResourceGroupNodeFilter nodeFilter = ResourceGroupNodeFilter.newBuilder()
        .withNodeLabel("QUERYNODE_LOCATION", "dc1")
        .build();
```
