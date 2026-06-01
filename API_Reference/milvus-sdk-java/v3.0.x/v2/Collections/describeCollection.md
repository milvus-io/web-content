# describeCollection()

This operation lists detailed information about a specific collection.

```java
public DescribeCollectionResp describeCollection(DescribeCollectionReq request)
```

## Request Syntax

```java
describeCollection(DescribeCollectionReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .collectionId(Long collectionId)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    The name of the target collection.

- `collectionId(Long collectionId)` -

    The numeric ID of the collection. Use this when you need to identify a collection by ID instead of name.

**RETURNS:**

*DescribeCollectionResp*

A **DescribeCollectionResp** object that contains detailed information about the specified collection.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.DescribeCollectionReq;
import io.milvus.v2.service.collection.response.DescribeCollectionResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Get the collection detail
DescribeCollectionReq describeCollectionReq = DescribeCollectionReq.builder()
        .collectionName("test")
        .build();
DescribeCollectionResp describeCollectionResp = client.describeCollection(describeCollectionReq);

```
