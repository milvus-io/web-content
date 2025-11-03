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
    .build();
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database to which the target collections belong.

- `collectionNames(List<String> collectionNames)`

    The names of the target collections.

**RETURN TYPE:**

*List&lt;DescribeCollectionResp&gt;*

**RETURNS:**

A list of **DescribeCollectionResp** objects.

A **DescribeCollectionResp** object that contains detailed information about the specified collection.

**PARAMETERS:**

- **collectionName** (*String*)

- **collectionID** (*Long*)

- **databaseName** (*String*)

- **description** (*String*)

- **numOfPartitions** (*long*)

- **fieldNames** (*List\&lt;String\&gt;*)

- **vectorFieldName** (*List\&lt;String\&gt;*)

- **primaryFieldName** (*String*)

- **enableDynamicField** (*Boolean*)

- **autoID** (*Boolean*)

- **collectionSchema** (*CreateCollectionReq.CollectionSchema*)

- **createTime** (*Long*)

- **createUtcTime** (*Long*) -

- **consistencyLevel** (*ConsistencyLevel*) -

- **shardsNum** (*Integer*) -

- **properties** (*Map&lt;String, String&gt;*) -

**EXCEPTIONS:**

- **MilvusClientExceptions**

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

