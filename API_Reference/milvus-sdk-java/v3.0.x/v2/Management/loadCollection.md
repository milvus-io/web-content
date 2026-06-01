# loadCollection()

This operation loads the data of a specific collection into memory.

```java
public void loadCollection(LoadCollectionReq request)
```

## Request Syntax

```java
loadCollection(LoadCollectionReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .numReplicas(Integer numReplicas)
    .async(Boolean async)
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

- `numReplicas(Integer numReplicas)` -

    The number of replicas to load. Defaults to `1`.

- `async(Boolean async)` -

    Whether to run the operation asynchronously. Defaults to `Boolean.FALSE`.

- `sync(Boolean sync)` -

    Whether to wait synchronously until the operation completes. Defaults to `Boolean.TRUE`.

- `timeout(Long timeout)` -

    The timeout duration in milliseconds. Defaults to `60000L`.

- `refresh(Boolean refresh)` -

    Whether to refresh load to include new fields. Defaults to `Boolean.FALSE`.

- `loadFields(List<String> loadFields)` -

    A list of specific field names to load. Defaults to `new ArrayList<>()`.

- `skipLoadDynamicField(Boolean skipLoadDynamicField)` -

    Whether to skip loading the dynamic field. Defaults to `Boolean.FALSE`.

- `resourceGroups(List<String> resourceGroups)` -

    A list of resource group names for load balancing. Defaults to `new ArrayList<>()`.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.LoadCollectionReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Load collection "test"
LoadCollectionReq loadCollectionReq = LoadCollectionReq.builder()
        .collectionName("test")
        .build();
client.loadCollection(loadCollectionReq);
```
