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

A **DescribeCollectionResp** object that contains detailed information about the specified collection, including its aliases, schema version, and namespace-enabling state.

**PARAMETERS:**

- **collectionName** (*String*) - The name of the collection.

- **collectionID** (*Long*) - The numeric ID of the collection.

- **databaseName** (*String*) - The name of the database to which the collection belongs.

- **description** (*String*) - The description of the collection.

- **numOfPartitions** (*Long*) - The number of partitions in the collection.

- **fieldNames** (*List\<String\>*) - The names of the fields in the collection.

- **vectorFieldNames** (*List\<String\>*) - The names of the vector fields in the collection.

- **primaryFieldName** (*String*) - The name of the primary-key field.

- **enableDynamicField** (*Boolean*) - Whether dynamic fields are enabled.

- **autoID** (*Boolean*) - Whether the primary key is auto-generated.

- **collectionSchema** (*CreateCollectionReq.CollectionSchema*) - The schema of the collection.

- **createTime** (*Long*) - The creation time of the collection.

- **createUtcTime** (*Long*) - The creation time of the collection in UTC.

- **consistencyLevel** (*ConsistencyLevel*) - The consistency level of the collection.

- **shardsNum** (*Integer*) - The number of shards in the collection.

- **properties** (*Map\<String,String\>*) - The properties of the collection.

- **aliases** (*List\<String\>*) - The aliases of the collection.

- **updateTimestamp** (*Long*) - The timestamp of the last update to the collection.

- **enableNamespace** (*Boolean*) - Whether the namespace feature is enabled.

- **schemaVersion** (*Integer*) - The version of the collection schema.

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
