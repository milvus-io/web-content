# describeCollection()

Returns metadata for a collection selected by name or ID.

```java
public DescribeCollectionResp describeCollection(DescribeCollectionReq request)
```

## Request Syntax

```java
DescribeCollectionReq.builder()
    .databaseName(databaseName)
    .collectionName(collectionName)
    .collectionId(collectionId)
    .build();
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database that contains the target resource.

- `collectionName(String collectionName)`

    The name of the target collection.

- `collectionId(Long collectionId)`

    The ID of the target collection.

**RETURN TYPE:**

*DescribeCollectionResp*

**RETURNS:**


A **DescribeCollectionResp** object that contains detailed information about the specified collection.

- `getCollectionName()` (*String*) -

    The name of the current collection.

- `getCollectionID()` (*Long*) -

    The ID of the collection.

- `getDatabaseName()` (*String*) -

    The name of the database to which the current collection belongs.

- `getDescription()` (*String*) -

    The description of the current collection.

- `getNumOfPartitions()` (*Long*) -

    The number of partitions in the current collection.

- `getFieldNames()` (*List\<String\>*) -

    A list of fields in the current collection.

- `getVectorFieldNames()` (*List\<String\>*) -

    The names of the vector fields.

- `getPrimaryFieldName()` (*String*) -

    The name of the primary field.

- `getEnableDynamicField()` (*Boolean*) -

    Whether to use the reserved JSON field **&#36;meta** to save non-schema-defined fields and their values as key-value pairs.

- `getAutoID()` (*Boolean*) -

    Whether Milvus automatically generates the primary key for the collection.

- `getCollectionSchema()` (*CreateCollectionReq.CollectionSchema*) -

    The scheme of the collection. See [CollectionSchema](CollectionSchema/CollectionSchema.md).

- `getCreateTime()` (*Long*) -

    The time when the collection was created.

- `getCreateUtcTime()` (*Long*) -

    The time when the collection was created in UTC.

- `getConsistencyLevel()` (*ConsistencyLevel*) -

    The consistency level of the collection. See [ConsistencyLevel](ConsistencyLevel.md).

- `getUpdateTimestamp()` (*Long*) -

    The timestamp of the last metadata update of the collection. Available in v2.6.25 or later.

- `getConsistencyLevelName()` (*String*) -

    The name of the consistency level of the collection. Available in v2.6.25 or later.

- `getAliases()` (*List\<String\>*) -

    A list of aliases of the collection. Available in v2.6.25 or later.

- `getShardsNum()` (*Integer*) -

    The number of shards in the collection.

- `getProperties()` (*Map<String, String>*) -

    The properties of the current collection.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when any error occurs during this operation. Inspect the exception message for the exact failure reason.

## Example

Returns metadata for a collection selected by name or ID.

```java
DescribeCollectionResp collection = client.describeCollection(
    DescribeCollectionReq.builder()
        .databaseName("default")
        .collectionName("books")
        .build());
```
