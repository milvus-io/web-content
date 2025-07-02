# transferNode()

This operation moves a specific number of query nodes from the source resource group to the target resource group.

```java
public void transferNode(TransferNodeReq request)
```

## Request Syntax

```java
transferNode(TransferNodeReq.builder()
    .sourceGroupName(String sourceGroupName)
    .targetGroupName(String targetGroupName)
    .numOfNodes(Integer numOfNodes)
    .build()
)
```

**BUILDER METHODS:**

- `sourceGroupName(String sourceGroupName)`

    The name of the source resource group from which the query nodes are moved.

- `targetGroupName(String targetGroupName)`

    The name of the source resource group to which the query nodes are moved.

- `numOfNodes(Integer numOfNodes)`

    The number of query nodes to move between the source and target resource groups.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java

```
