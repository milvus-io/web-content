# get()

This operation gets specific entities by their IDs.

```java
public GetResp get(GetReq request)
```

## Request Syntax

```java
get(GetReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .clusterId(String clusterId)
    .partitionName(String partitionName)
    .partitionNames(List<String> partitionNames)
    .ids(List<Object> ids)
    .outputFields(List<String> outputFields)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database to which the target collection belongs.

- `collectionName(String collectionName)`

    The name of an existing collection.

- `clusterId(String clusterId)`

    **Deprecated.** The ID of the cluster to query. Applies to global-cluster deployments.

- `partitionName(String partitionName)`

    The name of a partition.

- `partitionNames(List<String> partitionNames)`

    A list of partition names to query.

- `ids(List<Object> ids)`

    A specific entity ID or a list of entity IDs.

- `outputFields(List<String> outputFields)`

    A list of names of the fields to be included in the query result.

**RETURN TYPE:**

*GetResp*

**RETURNS:**

*GetResp*

A **GetResp** object representing one or more queried entities, including the operation cost (`getCost()`) and scanned-byte metrics (`getScannedRemoteBytes()`, `getScannedTotalBytes()`, `getCacheHitRatio()`) when available. The object has the following fields:

- **queryResults** (*List\<QueryResult\>*) -

    The queried entities. Each **QueryResult** has the following fields:

    - **entity** (*Map\<String, Object\>*) -

        The field values of the result.

    - **elementOffset** (*Long*) -

        For struct-array element-level queries (via `element_filter`), the index of the matched element within the array. Null for ordinary queries.

- **sessionTs** (*long*) -

    The session timestamp used for the operation.

- **cost** (*Long*) -

    The time cost of the operation, in milliseconds.

- **scannedRemoteBytes** (*Long*) -

    The number of bytes scanned from remote storage.

- **scannedTotalBytes** (*Long*) -

    The total number of bytes scanned during the operation.

- **cacheHitRatio** (*Float*) -

    The cache hit ratio of the operation.

- **getResults** (*List\<QueryResult\>*) -

    **Deprecated.** Use `getQueryResults()` instead.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.GetReq;
import io.milvus.v2.service.vector.response.GetResp;
import java.util.Collections;
import java.util.Set;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Get entity with id 0
GetReq getReq = GetReq.builder()
        .collectionName("test")
        .ids(Collections.singletonList("0"))
        .build();
GetResp getResp = client.get(getReq);
```
