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
import io.milvus.common.resourcegroup.ResourceGroupConfig;
import io.milvus.common.resourcegroup.ResourceGroupLimit;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.resourcegroup.request.CreateResourceGroupReq;
import io.milvus.v2.service.resourcegroup.request.TransferReplicaReq;
import java.util.Collections;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a resource group
ResourceGroupConfig config = ResourceGroupConfig.newBuilder()
    .withRequests(new ResourceGroupLimit(1))
    .withLimits(new ResourceGroupLimit(1))
    .build();
client.createResourceGroup(CreateResourceGroupReq.builder()
    .groupName("rg1")
    .config(config)
    .build());

// 3. Create a collection
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(2).build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("vector")
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("test")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

// 4. Transfer replicas to another group
TransferReplicaReq transferReplicaReq = TransferReplicaReq.builder()
    .sourceGroupName("__default_resource_group")
    .targetGroupName("rg1")
    .collectionName("test")
    .numberOfReplicas(1L)
    .build();
client.transferReplica(transferReplicaReq);
```

