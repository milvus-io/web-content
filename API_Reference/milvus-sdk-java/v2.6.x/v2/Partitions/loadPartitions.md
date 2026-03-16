# loadPartitions()

This operation releases the partitions in a specified collection from memory.

```java
public void loadPartitions(LoadPartitionsReq request)
```

## Request Syntax

```java
loadPartitions(LoadPartitionsReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionNames(List<String> partitionNames)
    .numReplicas(Integer numReplicas)
    .sync(Boolean sync)
    .timeout(Long timeout)
    .refresh(Boolean refresh)
    .loadFields(List<String> loadFields)
    .skipLoadDynamicField(Boolean skipLoadDynamicField)
    .resourceGroups(List<String> resourceGroups)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    The name of the target collection.

- `partitionNames(List<String> partitionNames)` -

    A list of partition names to target.

- `numReplicas(Integer numReplicas)` -

    The number of replicas to load.

- `sync(Boolean sync)` -

    Whether to wait synchronously until the operation completes.

- `timeout(Long timeout)` -

    The timeout duration in milliseconds.

- `refresh(Boolean refresh)` -

    Whether to refresh load to include new fields.

- `loadFields(List<String> loadFields)` -

    A list of specific field names to load.

- `skipLoadDynamicField(Boolean skipLoadDynamicField)` -

    Whether to skip loading the dynamic field.

- `resourceGroups(List<String> resourceGroups)` -

    A list of resource group names for load balancing.

**RETURNS:**

*void*

*void*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.partition.request.LoadPartitionsReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Load partition in collection
LoadPartitionsReq loadPartitionsReq = LoadPartitionsReq.builder()
        .collectionName("test")
        .partitionNames(Collections.singletonList("test_partition"))
        .build();
client.loadPartitions(loadPartitionsReq);
```
