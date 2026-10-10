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

**RETURN TYPE:**

*DescribeCollectionResp*

**RETURNS:**

A **DescribeCollectionResp** object that contains detailed information about the specified collection.

- `getCollectionName()` (*String*) -

    The name of the collection.

- `getCollectionID()` (*Long*) -

    The internal ID of the collection.

- `getDatabaseName()` (*String*) -

    The name of the database the collection belongs to.

- `getDescription()` (*String*) -

    The description of the collection.

- `getNumOfPartitions()` (*Long*) -

    The number of partitions in the collection.

- `getFieldNames()` (*List\<String\>*) -

    The names of all fields in the collection.

- `getVectorFieldNames()` (*List\<String\>*) -

    The names of all vector fields in the collection.

- `getPrimaryFieldName()` (*String*) -

    The name of the primary key field.

- `getEnableDynamicField()` (*Boolean*) -

    Whether the dynamic field is enabled.

- `getAutoID()` (*Boolean*) -

    Whether primary key values are auto-generated.

- `getCollectionSchema()` (*CollectionSchema*) -

    The schema of the collection. See [CollectionSchema](CollectionSchema/CollectionSchema.md).

    - `getFieldSchemaList()` (*List\<FieldSchema\>*) -

        The field definitions of the collection. Each [FieldSchema](FieldSchema.md) has the following getters:

        - `getName()` (*String*) -

            The name of the field.

        - `getDescription()` (*String*) -

            The description of the field.

        - `getDataType()` (*DataType*) -

            The data type of the field.

        - `getMaxLength()` (*Integer*) -

            The maximum length for VarChar fields.

        - `getDimension()` (*Integer*) -

            The dimension of vector fields.

        - `getIsPrimaryKey()` (*Boolean*) -

            Whether the field is the primary key.

        - `getIsPartitionKey()` (*Boolean*) -

            Whether the field is the partition key.

        - `getIsClusteringKey()` (*Boolean*) -

            Whether the field is the clustering key.

        - `getAutoID()` (*Boolean*) -

            Whether primary key values are auto-generated.

        - `getElementType()` (*DataType*) -

            The element type of array fields.

        - `getMaxCapacity()` (*Integer*) -

            The maximum capacity of array fields.

        - `getIsNullable()` (*Boolean*) -

            Whether the field accepts null values.

        - `getDefaultValue()` (*Object*) -

            The default value of the field.

        - `getEnableAnalyzer()` (*Boolean*) -

            Whether text analysis is enabled.

        - `getAnalyzerParams()` (*Map\<String, Object\>*) -

            The analyzer configuration.

        - `getEnableMatch()` (*Boolean*) -

            Whether keyword matching is enabled.

        - `getTypeParams()` (*Map\<String, String\>*) -

            Additional type parameters.

        - `getMultiAnalyzerParams()` (*Map\<String, Object\>*) -

            The multi-language analyzer configuration.

        - `getExternalField()` (*String*) -

            The external source field this field maps to.

        - `getFieldId()` (*Long*) -

            The internal ID of the field.

        - `getIsDynamic()` (*Boolean*) -

            Whether the field is the dynamic field.

        - `getIsFunctionOutput()` (*Boolean*) -

            Whether the field is a function output field.

        - `getIndexes()` (*List\<Map\<String, Object\>\>*) -

            The indexes defined on the field.

    - `getStructFields()` (*List\<StructFieldSchema\>*) -

        The struct field definitions of the collection. See [StructFieldSchema](StructFieldSchema/StructFieldSchema.md).

    - `getEnableDynamicField()` (*boolean*) -

        Whether the dynamic field is enabled.

    - `getFunctionList()` (*List\<Function\>*) -

        The functions defined on the collection.

    - `getExternalSource()` (*String*) -

        The external source backing the collection.

    - `getExternalSpec()` (*JsonObject*) -

        The external source specification.

- `getCreateTime()` (*Long*) -

    The creation time of the collection.

- `getCreateUtcTime()` (*Long*) -

    The UTC creation time of the collection.

- `getConsistencyLevel()` (*ConsistencyLevel*) -

    The consistency level of the collection.

- `getShardsNum()` (*Integer*) -

    The number of shards in the collection.

- `getProperties()` (*Map\<String, String\>*) -

    The properties of the collection.

- `getAliases()` (*List\<String\>*) -

    The aliases of the collection.

- `getUpdateTimestamp()` (*Long*) -

    The last update timestamp of the collection.

- `getEnableNamespace()` (*Boolean*) -

    Whether namespace is enabled.

- `getSchemaVersion()` (*Integer*) -

    The schema version of the collection.

**EXCEPTIONS