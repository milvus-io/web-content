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

*List<DescribeCollectionResp>*

**RETURNS:**

A list of **DescribeCollectionResp** objects.

A **DescribeCollectionResp** object that contains detailed information about the specified collection.

**PARAMETERS:**

- **collectionName** (*String*)

    The name of the current collection.

- **collectionID** (*Long*)

    The ID of the collection.

- **databaseName** (*String*)

    The name of the database to which the current collection belongs.

- **description** (*String*)

    The description of the current collection.

- **numOfPartitions** (*long*)

    The number of partitions in the current collection.

- **fieldNames** (*List\<String\>*)

    A list of fields in the current collection.

- **vectorFieldName** (*List\<String\>*)

    The name of the vector field.

- **primaryFieldName** (*String*)

    The name of the primary field.

- **enableDynamicField** (*Boolean*)

    Whether to use the reserved JSON field **&#36;meta** to save non-schema-defined fields and their values as key-value pairs.

- **autoID** (*Boolean*)

    Whether Milvus automatically generates the primary key for the collection.

- **collectionSchema** (*CreateCollectionReq.CollectionSchema*)

    The scheme of the collection.

- **createTime** (*Long*)

    The time when the collection was created.

- **createUtcTime** (*Long*) -

    The time when the collection was created in UTC.

- **[consistencyLevel](ConsistencyLevel.md)** (*[ConsistencyLevel](ConsistencyLevel.md)*) -

    The consistency level of the collection.

- **shardsNum** (*Integer*) -

    The number of shards in the collection.

- **properties** (*Map<String, String>*) -

    The properties of the current collection. 

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

