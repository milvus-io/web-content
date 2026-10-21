# isEnableDynamicField()

This getter returns whether the dynamic field is enabled for the collection schema.

```java
public boolean isEnableDynamicField()
```

**RETURN TYPE:**

*boolean*

**RETURNS:**

Returns **true** if the dynamic field is enabled for the collection schema, **false** otherwise.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

// 2. Define a Collection Schema with dynamic field enabled
CreateCollectionReq.CollectionSchema schema = MilvusClientV2.CreateSchema();
schema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
schema.setEnableDynamicField(true);

// 3. Check whether dynamic field is enabled
boolean enabled = schema.isEnableDynamicField(); // true
```
