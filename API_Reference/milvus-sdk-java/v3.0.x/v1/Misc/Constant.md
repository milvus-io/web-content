# Constant

Predefined constant values for quick input for interfaces.

<table>
   <tr>
     <th><p><strong>Name</strong></p></th>
     <th><p><strong>Value</strong></p></th>
     <th><p><strong>Type</strong></p></th>
     <th><p><strong>Description</strong></p></th>
   </tr>
   <tr>
     <td><p><em>TTL_SECONDS</em></p></td>
     <td><p>collection.ttl.seconds</p></td>
     <td><p>String</p></td>
     <td><p>Property key for alterCollection() and createCollection() to set the ttl value.</p></td>
   </tr>
   <tr>
     <td><p><em>MMAP_ENABLED</em></p></td>
     <td><p>mmap.enabled</p></td>
     <td><p>String</p></td>
     <td><p>Property key for alterCollection() and alterIndex() to enable mmap.</p></td>
   </tr>
   <tr>
     <td><p><em>DATABASE<em>REPLICA</em>NUMBER</em></p></td>
     <td><p>database.replica.number</p></td>
     <td><p>String</p></td>
     <td><p>Property key for createDatabase() and alterDatabase() to set default replica number.</p></td>
   </tr>
   <tr>
     <td><p><em>DATABASE<em>RESOURCE</em>GROUPS</em></p></td>
     <td><p>database.resource_groups</p></td>
     <td><p>String</p></td>
     <td><p>Property key for createDatabase() and alterDatabase() to set default resource groups.</p></td>
   </tr>
   <tr>
     <td><p><em>COLLECTION<em>REPLICA</em>NUMBER</em></p></td>
     <td><p>collection.replica.number</p></td>
     <td><p>String</p></td>
     <td><p>Property key for createCollection() and alterCollection() to set default replica number.</p></td>
   </tr>
   <tr>
     <td><p><em>COLLECTION<em>RESOURCE</em>GROUPS</em></p></td>
     <td><p>collection.resource_groups</p></td>
     <td><p>String</p></td>
     <td><p>Property key for createCollection() and alterCollection() to set default resource groups.</p></td>
   </tr>
</table>

## Example

```java
import io.milvus.grpc.DataType;
import io.milvus.param.Constant;
import io.milvus.param.CreateCollectionParam;
import io.milvus.param.R;
import io.milvus.param.RpcStatus;
import io.milvus.param.collection.CollectionSchemaParam;
import io.milvus.param.collection.FieldType;

CollectionSchemaParam schema = CollectionSchemaParam.newBuilder()
        .addFieldType(FieldType.newBuilder()
                .withName("id")
                .withDataType(DataType.Int64)
                .withPrimaryKey(true)
                .build())
        .build();

CreateCollectionParam param = CreateCollectionParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withSchema(schema)
        .withProperty(Constant.TTL_SECONDS, "100")
        .build();
R<RpcStatus> response = client.createCollection(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
