# createCollection()

A MilvusClient interface. This method creates a collection with a specified schema.

```Java
R<RpcStatus> createCollection(CreateCollectionParam requestParam);
```

## CreateCollectionParam

Use the `CreateCollectionParam.Builder` to construct a `CreateCollectionParam` object.

```Java
import io.milvus.param.CreateCollectionParam;
CreateCollectionParam.Builder builder = CreateCollectionParam.newBuilder();
```

Methods of `CreateCollectionParam.Builder`:

| Method                                       | Description                                                  | Parameters                                                   |
| -------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `withCollectionName(String collectionName)`  | Sets the collection name. The collection name cannot be empty or null. | `collectionName`: The name of the collection to create.      |
| `withShardsNum(int shardsNum)`               | Sets the the number of shards. The shard number must be greater than zero. The default value is 2. | `shardsNum`: The number of shards to split the inserted data into. Multiple shards are processed by multiple nodes in Milvus. |
| `withDescription(String description)`        | Sets the collection description. The description can be empty. The default description is "". | `description`: The description of the collection to create.  |
| `withFieldTypes(List<FieldType> fieldTypes)` | Sets the collection schema. The collection schema cannot be empty. | `fieldTypes`: a list of `FieldType`, each representing a field schema. |
| `addFieldType(FieldType fieldType)`          | Adds a field schema.                                         | `fieldType`: The schema of a field to add in the collection. |
| `build()`                                    | Constructs a `CreateCollectionParam` object                  | N/A                                                          |

The `CreateCollectionParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## FieldType

A tool class to represent a field's schema. Use `FieldType.Builder` to build a `FieldType` object.

```Java
import io.milvus.param.FieldType;
FieldType.Builder builder = FieldType.newBuilder();
FieldType ft = builder.build()
```

Methods of `FieldType.Builder`:

| Method                                   | Description                                                  | Parameters                                                   |
| ---------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `withName(String name)`                  | Sets the name of the field. The name cannot be empty or null. | `Name`: The name of the field.                               |
| `withPrimaryKey(
primaryKey)`     | Sets the field as the primary key field. Only the fields whose data type is `int64` or `varchar` can be set as the primary key field. The value is `false` by default. | `primaryKey`: A boolean value that indicates if the field is the primary key field. The value `true` means that the field is the primary key field while the value `false` means it is not. |
| `withDescription(String description)`    | Sets the field description. The description can be empty. The default value is "". | `Description`: The description of the field.                 |
| `withDataType(DataType dataType)`        | Sets the data type for the field. Please refer to [DataType](../Misc/DataType.md) in Misc. | `dataType`: The data type of the field.                      |
| `addTypeParam(String key, String value)` | Adds a parameter pair for the field. This is mainly used to set extra parameters for the vector field and VARCHAR field. | `key`: The parameter key.`Value`: The parameter value.       |
| `withDimension(Integer dimension)`       | Sets the dimension of a vector field. The dimension value must be greater than zero. This method internally calls `addTypeParam()` to store the dimension value. | `dimension`: The dimension of the vector field.              |
| `withMaxLength(Integer maxLength)`       | Sets the maximum length of a varchar field. The value must be greater than zero. This method internally calls the `addTypeParam()` to store the maximum length value. | `maxLength`: The maximum length of the varchar field.        |
| `withAutoID(boolean autoID)`             | Enables auto-ID function for the field. Note that the auto-ID function can only be enabled on primary key field. If auto-ID function is enabled, Milvus automatically generates a unique ID for each entity so that values for the primary key field do not need to be provided during data insertion. If auto-ID is disabled, values for the primary key field need to be provided during data insertion. | `autoID`: A boolean value that indicates if the primary keys are automatically generated. The value `true` means that auto-ID is enabled, while the value `false` means it is not. |
| `build()`                                | Create a `FieldType` object.                                 | N/A                                                          |

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
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
        .withCollectionName(collectionName)
        .withDescription("a collection for search")
        .withFieldTypes(fieldsSchema)
        .build();

R<RpcStatus> response = client.createCollection(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
