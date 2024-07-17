# createCollection()

A MilvusClient interface. This method creates a collection with the specified schema.

```java
R<RpcStatus> createCollection(CreateCollectionParam requestParam);
```

#### CreateCollectionParam

Use the `CreateCollectionParam.Builder` to construct a `CreateCollectionParam` object.

```java
import io.milvus.param.CreateCollectionParam;
CreateCollectionParam.Builder builder = CreateCollectionParam.newBuilder();
```

Methods of `CreateCollectionParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(String collectionName)</p></td>
        <td><p>Sets the collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The name of the collection to create.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withShardsNum(int shardsNum)</p></td>
        <td><p>Sets the shards number. The number must be greater or equal to zero.<br/>The default value is 0, which means letting the server decide the value. The server set this value to 1 if user didn't specify it.</p></td>
        <td><p>shardsNum: The number of shards to split the inserted data into. Multiple shards are processed by multiple nodes in Milvus.</p></td>
    </tr>
    <tr>
        <td><p>withDescription(String description)</p></td>
        <td><p>Sets the collection description. The description can be empty. The default description is "".</p></td>
        <td><p>description: The description of the collection to create.</p></td>
    </tr>
    <tr>
        <td><p>withFieldTypes(List\<FieldType> fieldTypes)</p></td>
        <td><p>Sets the collection schema. The collection schema cannot be empty.</p></td>
        <td><p>fieldTypes: a list of FieldType objects, each representing a field schema.</p></td>
    </tr>
    <tr>
        <td><p>addFieldType(FieldType fieldType)</p></td>
        <td><p>Adds a field schema.</p></td>
        <td><p>fieldType: The schema of a field to add in the collection.</p></td>
    </tr>
    <tr>
        <td><p>withSchema(CollectionSchemaParam schema)</p></td>
        <td><p>Sets the collection schema. It is recommended to use this method instead of withFieldTypes()</p></td>
        <td><p>schema: The collection schema</p></td>
    </tr>
    <tr>
        <td><p>withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)</p></td>
        <td><p>Sets the consistency level. The default value is ConsistencyLevelEnum.BOUNDED</p></td>
        <td><p>consistencyLevel: the consistency level of this collection</p></td>
    </tr>
    <tr>
        <td><p>withPartitionsNum(int partitionsNum)</p></td>
        <td><p>Sets the partitions number if there is partition key field. The number must be greater than zero.<br/>The default value is 64(defined in server side). The upper limit is 4096(defined in server side).<br/>Not allow to set this value if none of field is partition key. Only one partition key field is allowed in a collection.</p></td>
        <td><p>partitionsNum: Defines the number of partition if there is a partition key field in the collection.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a CreateCollectionParam object</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `CreateCollectionParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### FieldType

A tool class to represent a field's schema. Use `FieldType.Builder` to build a `FieldType` object.

```java
import io.milvus.param.FieldType;
FieldType.Builder builder = FieldType.newBuilder();
FieldType ft = builder.build()
```

Methods of `FieldType.Builder`:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Parameters</strong></p></th>
   </tr>
   <tr>
     <td><p>withName(String name)</p></td>
     <td><p>Sets the name of the field. The name cannot be empty or null.</p></td>
     <td><p>name: The name of the field.</p></td>
   </tr>
   <tr>
     <td><p>withPrimaryKey(boolean primaryKey)</p></td>
     <td><p>Sets the field as the primary key field. Only fields whose data type is INT64 or VARCHAR can be set as the primary key field. The value is false by default.</p></td>
     <td><p>primaryKey: A boolean value that defines if the field is the primary key field. The value true means that the field is the primary key field while the value false means it is not.</p></td>
   </tr>
   <tr>
     <td><p>withDescription(String description)</p></td>
     <td><p>Sets the field description. The description can be empty. The default value is an empty string.</p></td>
     <td><p>description: The description of the field.</p></td>
   </tr>
   <tr>
     <td><p>withDataType(DataType dataType)</p></td>
     <td><p>Sets the data type for the field. Please refer to DataType in Misc.</p></td>
     <td><p>dataType: The data type of the field.</p></td>
   </tr>
   <tr>
     <td><p>withElementType(DataType elementType)</p></td>
     <td><p>Sets the element type for Array type field.</p><p>Valid element types for Array: Int8, Int16, Int32, Int64, Varchar, Bool, Float, Double</p></td>
     <td><p>elementType: element type of the array.</p></td>
   </tr>
   <tr>
     <td><p>addTypeParam(String key, String value)</p></td>
     <td><p>Adds a parameter pair for the field. This is mainly used to set extra parameters for the vector field and varchar field.</p></td>
     <td><p>key: The parameter key.</p><p>value: The parameter value.</p></td>
   </tr>
   <tr>
     <td><p>withDimension(Integer dimension)</p></td>
     <td><p>Sets the dimension of a vector field. The dimension value must be greater than zero. This method internally calls addTypeParam() to store the dimension value.</p></td>
     <td><p>dimension: The dimension of the vector field.</p></td>
   </tr>
   <tr>
     <td><p>withMaxLength(Integer maxLength)</p></td>
     <td><p>Sets the maximum length of a Varchar field. The value must be greater than zero. This method internally calls the addTypeParam() to store the maximum length value.</p></td>
     <td><p>maxLength: The maximum length of the varchar field.</p></td>
   </tr>
   <tr>
     <td><p>withMaxCapacity(Integer maxCapacity)</p></td>
     <td><p>Sets the max capacity of an Array field. The valid capacity value range is [1, 4096]</p></td>
     <td><p>maxCapacity: The max capacity of the array.</p></td>
   </tr>
   <tr>
     <td><p>withAutoID(boolean autoID)</p></td>
     <td><p>Enables auto-ID function for the field. Note that the auto-ID function can only be enabled on primary key field.If auto-ID function is enabled, Milvus automatically generates a unique ID for each entity so that values for the primary key field do not need to be provided during data insertion. If auto-ID is disabled, values for the primary key field need to be provided during data insertion.</p></td>
     <td><p>autoID: A boolean value that defines if the primary keys are automatically generated. The value true means that auto-ID is enabled, while the value false means it is not.</p></td>
   </tr>
   <tr>
     <td><p>withPartitionKey(boolean partitionKey)</p></td>
     <td><p>Sets the field to be partition key.A partition key field's values are hashed and distributed to different logic partitions.Only int64 and varchar type fields can be a partition key. The primary key field can not be a partition key.</p></td>
     <td><p>partitionKey: A boolean value that defines if this field is a partition key field. The value true is a partition key, false is not.</p></td>
   </tr>
   <tr>
     <td><p>build()</p></td>
     <td><p>Create a FieldType object.</p></td>
     <td><p>N/A</p></td>
   </tr>
</table>

#### CollectionSchemaParam

A tool class to represent a collection's schema. Use `CollectionSchemaParam.Builder` to build a `CollectionSchemaParam` object.

```java
import io.milvus.param.collection.CollectionSchemaParam;
CollectionSchemaParam.Builder builder = CollectionSchemaParam.newBuilder();
```

Methods of `CollectionSchemaParam.Builder`:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Parameters</strong></p></th>
   </tr>
   <tr>
     <td><p>withEnableDynamicField(boolean enableDynamicField)</p></td>
     <td><p>Sets the collection if enableDynamicField.</p></td>
     <td><p>enableDynamicField: enableDynamicField of the collection</p></td>
   </tr>
   <tr>
     <td><p>withFieldTypes(List\<FieldType> fieldTypes)</p></td>
     <td><p>Sets the fieldTypes of the schema. The fieldTypes cannot be empty or null.</p></td>
     <td><p>fieldTypes: A list of FieldType to defines the fields.</p></td>
   </tr>
   <tr>
     <td><p>addFieldType( FieldType fieldType)</p></td>
     <td><p>Adds a field schema.</p></td>
     <td><p>fieldType: A field schema.</p></td>
   </tr>
   <tr>
     <td><p>build()</p></td>
     <td><p>Create a CollectionSchemaParam object.</p></td>
     <td><p>N/A</p></td>
   </tr>
</table>

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

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
