# dropResourceGroup()

This operation drops a resource group.

```java
public Void dropResourceGroup(DropResourceGroupReq request)
```

## Request Syntax

```java
dropResourceGroup(DropResourceGroupReq.builder()
    .groupName(String groupName)
    .build()
)
```

**BUILDER METHODS:**

- `groupName(String collectionName)`

    **[REQUIRED]**

    The name of the target resource group to drop.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
// prepare requests    
DropResourceGroupReq dropResourceGroupReq = DropResourceGroupReq.builder()
    .groupName("rg1")
    .build();

// drop resource group
client.dropResourceGroup(dropResourceGroupReq);
```

