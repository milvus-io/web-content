# loadCollection()

This operation loads the data of a specific collection into memory.

```java
public void loadCollection(LoadCollectionReq request)
```

<div class="admonition note">

<p><b>notes</b></p>

<p>This operation is required only if the target collection is not loaded. A collection is in the <strong>NotLoad</strong> state only if you have released it or created it without any index parameters.</p>

</div>

## Request Syntax

```java
loadCollection(LoadCollectionReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .numReplicas(Integer numReplicas)
    .async(Boolean async)
    .timeout(Long timeout)
    .refresh(Boolean refresh)
    .loadFields(List<String> loadFields)
    .skipLoadDynamicField(Boolean skipLoadDynamicField)
    .resourceGroups(List<String> resourceGroups)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database.

- `collectionName(String collectionName)`

    The name of a collection.

- `numReplicas(Integer numReplicas)`

    The number of replicas to create upon collection load.

    The value defaults to **1**, indicating that one replica is to be created upon collection load.

- `async(Boolean async)`

    Whether this operation is asynchronous.

    The value defaults to `Boolean.True`, indicating immediate return while the process may still run in the background.

- `timeout(Long timeout)`

    The timeout duration of the process. The process terminates after the specified duration expires.

    The value defaults to `60000L`, indicating the timeout duration is one minute.

- `refresh(Boolean refresh)`

    Whether to refresh after load.

- `loadFields(List<String> loadFields)`

    The names of the fields to load.

    If this parameter is left unspecified, Milvus loads all vector field indexes plus all scalar field data into memory. Setting this parameter makes Milvus load the data of the specified fields into memory, reducing memory usage and improving search performance.

- `skipLoadDynamicField(Boolean skipLoadDynamicField)`

    Setting this to true makes Milvus skip loading the dynamic field, making it unavailable for filtering conditions and output fields for searches and queries.

- `resourceGroups(List<String> resourceGroups)`

    The target resource groups of this operation.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

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

