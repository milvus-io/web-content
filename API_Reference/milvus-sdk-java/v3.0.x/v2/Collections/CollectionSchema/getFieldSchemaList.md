# getFieldSchemaList()

This getter returns the list of all field schemas in the collection schema.

```java
public List<CreateCollectionReq.FieldSchema> getFieldSchemaList()
```

**RETURNS:**

*List\<CreateCollectionReq.FieldSchema\>*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import java.util.List;

// 2. Define a Collection Schema with an "id" field
CreateCollectionReq.CollectionSchema schema = MilvusClientV2.CreateSchema();
schema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());

// 3. Get the list of field schemas
List<CreateCollectionReq.FieldSchema> fields = schema.getFieldSchemaList();
```
