# batchDescribeCollection()

This operation gets the descriptions of multiple collections in a batch.

```java
public List<DescribeCollectionResp> batchDescribeCollection(BatchDescribeCollectionReq request)
```

## Request Syntax

```java
batchDescribeCollection(BatchDescribeCollectionReq.builder()
    .databaseName(String databaseName)
    .collectionNames(List<String> collectionNames)
    .collectionIds(List<Long> collectionIds)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -
The name of the database. Defaults to the current database if not specified.

- `collectionNames(List<String> collectionNames)` -

- `collectionIds(List<Long> collectionIds)` -
A list of collection IDs to describe in batch.

**RETURNS:**

*List<DescribeCollectionResp>*

A list of **DescribeCollectionResp** objects.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.BatchDescribeCollectionReq;
import io.milvus.v2.service.collection.response.DescribeCollectionResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Get the collection detail
BatchDescribeCollectionReq describeCollectionReq = BatchDescribeCollectionReq.builder()
        .collectionNames(Collections.singletonList("test"))
        .build();
List<DescribeCollectionResp> batchResp = client.batchDescribeCollection(describeCollectionReq);

```
