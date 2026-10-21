# getStructField()

This getter returns a struct field schema by name from the collection schema.

```java
public CreateCollectionReq.StructFieldSchema getStructField(String fieldName)
```

**PARAMETERS:**

- **fieldName** (*String*) -

    The name of the struct field.

**RETURN TYPE:**

*CreateCollectionReq.StructFieldSchema*

**RETURNS:**

The **StructFieldSchema** with the specified name, or `null` if none is found. See [StructFieldSchema](../StructFieldSchema/StructFieldSchema.md).

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

// 2. Define a Collection Schema with an "id" field
CreateCollectionReq.CollectionSchema schema = MilvusClientV2.CreateSchema();
schema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());

// 3. Get the struct field by name
CreateCollectionReq.StructFieldSchema structField = schema.getStructField("metadata");
```
