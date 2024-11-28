# createSchema()

This operation creates a collection schema.

```java
public CreateCollectionReq.CollectionSchema createSchema()
```

## Request Syntax

```java
MilvusClientV2.createSchema()
```

**PARAMETERS:**

None

**RETURN TYPE:**

*CreateCollectionReq.CollectionSchema*

**RETURNS:**

A **CreateCollectionReq.CollectionSchema** object.

## Example

```java
// quickly create a collectionSchema
CreateCollectionReq.CollectionSchema collectionSchema = client.createSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).description("id").build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(dim).build());
```
