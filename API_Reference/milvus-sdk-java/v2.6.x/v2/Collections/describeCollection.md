# describeCollection()

This operation lists detailed information about a specific collection. You can identify the collection by name or by collection ID.

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
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database to which the target collection belongs.

- `collectionName(String collectionName)`

    The name of an existing collection.

    Setting this to a non-existing collection results in **MilvusException**.

- `collectionId(Long collectionId)`

    The numeric ID of the collection to describe. Use this when you need to identify the collection by ID instead of name.

**RETURNS:**

*DescribeCollectionResp*

A **DescribeCollectionResp** object that contains the collection schema and metadata.

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

- **[collectionSchema](CollectionSchema/CollectionSchema.md)** (*CreateCollectionReq.CollectionSchema*)

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

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.service.collection.request.DescribeCollectionReq;
import io.milvus.v2.service.collection.response.DescribeCollectionResp;

DescribeCollectionReq request = DescribeCollectionReq.builder()
    .collectionName("book_chunks")
    .build();

DescribeCollectionResp response = client.describeCollection(request);
```
