# transferReplica()

This operation reassigns the specified number of replicas from the source resource group to the target resource group.

```java
public Void transferReplica(TransferReplicaReq request)
```

## Request Syntax

```java
transferReplica(TransferReplicaReq.builder()
    .sourceGroupName(String sourceGroupName)
    .targetGroupName(String targetGroupName)
    .collectionName(String collectionName)
    .databaseName(String databaseName)
    .numberOfReplicas(Long numberOfReplicas)
    .build()
)
```

**BUILDER METHODS:**

- `sourceGroupName(String sourceGroupName)`

    Name of the source resource group of this operation.

- `targetGroupName(String targetGroupName)`

    Name of the target resource group of this operation.

- `collectionName(String collectionName)`

    Name of the collection whose replicas will be transferred.

- `databaseName(String databaseName)`

    Name of the database that holds the target collection.

- `numberOfReplicas(Long numberOfReplicas)`

    Number of replicas to transfer.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
// prepare requests    
TransferReplicaReq transferReplicaReq = TransferReplicaReq.builder()
    .sourceGroupName("DEFAULT_RESOURCE_GROUP")
    .targetGroupName("rg1")
    .collectionName("test")
    .numberOfReplicas(4)
    .build();

// transfer replicas
client.transferReplica(transferReplicaReq);
```

