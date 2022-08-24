# insert()

A MilvusClient interface. This method inserts entities into a specified collection.

```Java
R<MutationResult> insert(InsertParam requestParam);
```

## InsertParam

Use the `InsertParam.Builder` to construct an `InsertParam` object.

```Java
import io.milvus.param.InsertParam;
InsertParam.Builder builder = InsertParam.newBuilder();
```

Methods of `InsertParam.Builder`:

| Method                                       | Description                                                  | Parameters                                                   |
| -------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `withCollectionName(String collectionName)`  | Sets the target collection name. Collection name cannot be empty or null. | `collectionName`: The name of the collection to insert data into. |
| `withPartitionName(String partitionName)`    | Sets the target partition name(optional).                    | `partitionName`: The name of the partition to insert data into. |
| `withFields(List<InsertParam.Field> fields)` | Sets the data to be inserted. The field list cannot be empty.  Note that no input is required for the primary key field if auto-ID is enabled. | `fields`: a list of `Field` objects, each representing a field. |
| `build()`                                    | Constructs an `InsertParam` object.                          |  N/A                                                         |

The `InsertParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Field

A tool class to hold a data field.

Methods of `InsertParam.Field`:

| **Method**                           | **Description**                                              | **Parameters**                                               |
| ------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `Field(String name, List<?> values)` | This class only provides a `Constructor`to create a `Field` object. | `name`: The name of the data field. `values`: *- If data type is* *Bool**,* *`values`* *is List of Boolean;* *- If* *data* *type is Int64,* *`values`* *is List of Long;* *- If* *data* *type is Float,* *`values`* *is List of Float;* *- If data type is Double,* *`values`* *is List of Double;* *- If* *data* *type is Varchar,* *`values`* *is List of String;* *- If* *data* *type is FloatVector,* *`values`* *is List of List Float;* *- If* *data* *type is BinaryVector,* *`values`* *is List of ByteBuffer;* |

## Returns

This method catches all the exceptions and returns an `R<MutationResult>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns a valid `MutationResult` held by the R template. You can use `MutationResultWrapper` to get the returned information.

## MutationResultWrapper

A tool class to encapsulate the `MutationResult`. 

```Java
import io.milvus.response.MutationResultWrapper;
MutationResultWrapper wrapper = new MutationResultWrapper(mutationResult);
```

Methods of `MutationResultWrapper`:

| **Method**         | **Description**                                              | **Returns**  |
| ------------------ | ------------------------------------------------------------ | ------------ |
| `getInsertCount()` | Gets the row count of the inserted entities.                 | long         |
| `getLongIDs()`     | Gets the long ID array returned by the `insert()` interface if the primary key field is int64 type. Throw `ParamException` if the primary key type is not int64. | List<Long>   |
| `getStringIDs()`   | Gets the string ID array returned by the `insert()` interface if the primary key field is varchar type. Throw `ParamException` if the primary key type is not varchar type. | List<String> |
| `getDeleteCount()` | Gets the row count of the deleted entities. Currently, this value is always equal to the input row count. | long         |
| `getOperationTs()` | Gets the timestamp of the operation marked by the server. You can use this timestamp as the guarantee timestamp of query/search APIs. Note that the timestamp is not an absolute timestamp, but rather a hybrid value combined by UTC time and internal flags. | long         |

## Example

```Java
import io.milvus.param.*;
import io.milvus.grpc.MutationResult;

List<InsertParam.Field> fields = new ArrayList<>();
int rowCount = 10000;
List<Long> ids = new ArrayList<>();
for (long i = 0L; i < rowCount; ++i) {
    ids.add(i);
}
List<List<Float>> vectors = generateFloatVectors(rowCount);

List<InsertParam.Field> fieldsInsert = new ArrayList<>();
fieldsInsert.add(new InsertParam.Field("id", ids));
fieldsInsert.add(new InsertParam.Field("vec", vectors));

InsertParam param = InsertParam.newBuilder()
        .withCollectionName(collectionName)
        .withFields(fieldsInsert)
        .build();
R<MutationResult> response = client.insert(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```

