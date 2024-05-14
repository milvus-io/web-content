# createCollection()

A MilvusClient interface. This method creates a collection with the specified schema.

```java
R<RpcStatus> createCollection(CreateCollectionParam requestParam);
```

## CreateCollectionParam

Use the `CreateCollectionParam.Builder` to construct a `CreateCollectionParam` object.

```java
import io.milvus.param.CreateCollectionParam;
CreateCollectionParam.Builder builder = CreateCollectionParam.newBuilder();
```

Methods of `CreateCollectionParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Sets the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The name of the collection to create.</td>
    </tr>
    <tr>
        <td>withShardsNum(int shardsNum)</td>
        <td>Sets the shards number. The number must be greater or equal to zero.<br/>The default value is 0, which means letting the server decide the value. The server set this value to 1 if user didn't specify it.</td>
        <td>shardsNum: The number of shards to split the inserted data into. Multiple shards are processed by multiple nodes in Milvus.</td>
    </tr>
    <tr>
        <td>withDescription(String description)</td>
        <td>Sets the collection description. The description can be empty. The default description is "".</td>
        <td>description: The description of the collection to create.</td>
    </tr>
    <tr>
        <td>withFieldTypes(List\<FieldType> fieldTypes)</td>
        <td>Sets the collection schema. The collection schema cannot be empty.</td>
        <td>fieldTypes: a list of FieldType objects, each representing a field schema.</td>
    </tr>
    <tr>
        <td>addFieldType(FieldType fieldType)</td>
        <td>Adds a field schema.</td>
        <td>fieldType: The schema of a field to add in the collection.</td>
    </tr>
    <tr>
        <td>withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)</td>
        <td>Sets the consistency level. The default value is ConsistencyLevelEnum.BOUNDED</td>
        <td>consistencyLevel: the consistency level of this collection</td>
    </tr>
    <tr>
        <td>withPartitionsNum(int partitionsNum)</td>
        <td>Sets the partitions number if there is partition key field. The number must be greater than zero.<br/>The default value is 64(defined in server side). The upper limit is 4096(defined in server side).<br/>Not allow to set this value if none of field is partition key. Only one partition key field is allowed in a collection.</td>
        <td>partitionsNum: Defines the number of partition if there is a partition key field in the collection.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a CreateCollectionParam object</td>
        <td>N/A</td>
    </tr>
</table>

The `CreateCollectionParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## FieldType

A tool class to represent a field's schema. Use `FieldType.Builder` to build a `FieldType` object.

```java
import io.milvus.param.FieldType;
FieldType.Builder builder = FieldType.newBuilder();
FieldType ft = builder.build()
```

Methods of `FieldType.Builder`:

<table>
   <tr>
     <th><strong>Method</strong></th>
     <th><strong>Description</strong></th>
     <th><strong>Parameters</strong></th>
   </tr>
   <tr>
     <td>withName(String name)</td>
     <td>Sets the name of the field. The name cannot be empty or null.</td>
     <td>name: The name of the field.</td>
   </tr>
   <tr>
     <td>withPrimaryKey(boolean primaryKey)<br/></td>
     <td>Sets the field as the primary key field. Only fields whose data type is INT64 or VARCHAR can be set as the primary key field. The value is false by default.<br/></td>
     <td>primaryKey: A boolean value that defines if the field is the primary key field. The value true means that the field is the primary key field while the value false means it is not.<br/></td>
   </tr>
   <tr>
     <td>withDescription(String description)</td>
     <td>Sets the field description. The description can be empty. The default value is an empty string.</td>
     <td>description: The description of the field.</td>
   </tr>
   <tr>
     <td>withDataType(DataType dataType)</td>
     <td>Sets the data type for the field. Please refer to DataType in Misc.</td>
     <td>dataType: The data type of the field.</td>
   </tr>
   <tr>
     <td>withElementType(DataType elementType)</td>
     <td>Sets the element type for Array type field.<br/> Valid element types for Array: Int8, Int16, Int32, Int64, Varchar, Bool, Float, Double</td>
     <td>elementType: element type of the array.</td>
   </tr>
   <tr>
     <td>addTypeParam(String key, String value)<br/></td>
     <td>Adds a parameter pair for the field. This is mainly used to set extra parameters for the vector field and varchar field.</td>
     <td>key: The parameter key.<br/> value: The parameter value.</td>
   </tr>
   <tr>
     <td>withDimension(Integer dimension)</td>
     <td>Sets the dimension of a vector field. The dimension value must be greater than zero. This method internally calls addTypeParam() to store the dimension value.</td>
     <td>dimension: The dimension of the vector field.</td>
   </tr>
   <tr>
     <td>withMaxLength(Integer maxLength)</td>
     <td>Sets the maximum length of a Varchar field. The value must be greater than zero. This method internally calls the addTypeParam() to store the maximum length value.</td>
     <td>maxLength: The maximum length of the varchar field.</td>
   </tr>
   <tr>
     <td>withMaxCapacity(Integer maxCapacity)</td>
     <td>Sets the max capacity of an Array field. <br/>The valid capacity value range is [1, 4096]</td>
     <td>maxCapacity: The max capacity of the array.</td>
   </tr>
   <tr>
     <td>withAutoID(boolean autoID)<br/></td>
     <td>Enables auto-ID function for the field. Note that the auto-ID function can only be enabled on primary key field.<br/>If auto-ID function is enabled, Milvus automatically generates a unique ID for each entity so that values for the primary key field do not need to be provided during data insertion. If auto-ID is disabled, values for the primary key field need to be provided during data insertion.</td>
     <td>autoID: A boolean value that defines if the primary keys are automatically generated. The value true means that auto-ID is enabled, while the value false means it is not.<br/></td>
   </tr>
   <tr>
     <td>withPartitionKey(boolean partitionKey)<br/></td>
     <td>Sets the field to be partition key.<br/>A partition key field's values are hashed and distributed to different logic partitions.<br/>Only int64 and varchar type fields can be a partition key. The primary key field can not be a partition key.</td>
     <td>partitionKey: A boolean value that defines if this field is a partition key field. The value true is a partition key, false is not.</td>
   </tr>
   <tr>
     <td>build()</td>
     <td>Create a FieldType object.</td>
     <td>N/A</td>
   </tr>
</table>

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```java
import io.milvus.param.*;

List<FieldType> fieldsSchema = new ArrayList<>();
FieldType field_1 = FieldType.newBuilder()
        .withPrimaryKey(true)
        .withAutoID(false)
        .withDataType(DataType.Int64)
        .withName("uid")
        .withDescription("unique id")
        .build();

fieldsSchema.add(field_1);

FieldType field_2 = FieldType.newBuilder()
        .withDataType(DataType.FloatVector)
        .withName("embedding")
        .withDescription("embeddings")
        .withDimension(dimension)
        .build();
fieldsSchema.add(field_2);

// create collection
CreateCollectionParam param = CreateCollectionParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withDescription("a collection for search")
        .withFieldTypes(fieldsSchema)
        .build();

R<RpcStatus> response = client.createCollection(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
