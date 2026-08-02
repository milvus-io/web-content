# batchDescribeCollection()

Returns metadata for multiple collections selected by name or ID.

```java
public List<DescribeCollectionResp> batchDescribeCollection(BatchDescribeCollectionReq request)
```

## Request Syntax

```java
BatchDescribeCollectionReq.builder()
    .databaseName(databaseName)
    .collectionNames(collectionNames)
    .collectionIds(collectionIds)
    .build();
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database that contains the target resource.

- `collectionNames(List<String> collectionNames)`

    The names of the target collections.

- `collectionIds(List<Long> collectionIds)`

    The IDs of the target collections.

**RETURNS:**

*List<DescribeCollectionResp>*

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

- **MilvusClientExceptions**

    Raised when any error occurs during this operation. Inspect the exception message for the exact failure reason.

## Example

Returns metadata for multiple collections selected by name or ID.

```java
List<DescribeCollectionResp> collections = client.batchDescribeCollection(
    BatchDescribeCollectionReq.builder()
        .databaseName("default")
        .collectionNames(Arrays.asList("books", "articles"))
        .build());
```
