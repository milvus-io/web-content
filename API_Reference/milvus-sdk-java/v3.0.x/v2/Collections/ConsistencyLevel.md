# ConsistencyLevel

This is an enumeration that provides the following constants.
```java
public enum ConsistencyLevel
```


**Constants:**

- **STRONG**

    Sets the consistency level to **Strong**, with a code value of 0.

- **SESSION**

    Sets the consistency level to **Session**, with a code value of 1.

- **BOUNDED**

    Sets the consistency level to **Bounded**, with a code value of 2.

- **EVENTUALLY**

    Sets the consistency level to **Eventually**, with a code value of 3.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus") // replace this with your token
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(2).build());
client.createCollection(CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(collectionSchema)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build());
```
