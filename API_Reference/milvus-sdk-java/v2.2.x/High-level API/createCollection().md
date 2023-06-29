# createCollection()

A MilvusClient interface. This method creates a collection with a smaller set of parameters.

```Java
R<RpcStatus> createCollection(CreateSimpleCollectionParam requestParam);
```

## CreateCollectionParam

Use the `CreateSimpleCollectionParam.Builder` to construct a `CreateSimpleCollectionParam` object.

```Java
import io.milvus.param.highlevel.collection.CreateCollectionParam;
CreateSimpleCollectionParam.Builder builder = CreateSimpleCollectionParam.newBuilder();
```

Methods of `CreateSimpleCollectionParam.Builder`:

| Method | Description | Parameters |
| --- | --- | --- |
| `withCollectionName(String collectionName)` |  Sets the collection name.<br>The value cannot be empty or null. | `collectionName`: Name of the collection to create. |
| `withDimension(int dimension)` |  Sets the collection vector dimension.<br>The value must be greater than zero and less than 32768. | `dimension`: Number of dimensions for the vector field of the collection. |
| `withMetricType(MetricType metricType)` | Sets the metric type of vector field.<br>A metric type defines how Milvus measures the distance between vectors. | `metricType`: Algorithm used to measure the distance between vectors. |
| `withDescription(String description)` | Sets the collection description.<br>The value can be an empty string. The default description is `""`. | `description`: Description of the collection. |
| `withPrimaryField(String primaryField)` | Sets the name of the primary field.<br>The value cannot be empty or null. | `primaryField`: Customized name of the primary field. |
| `withVectorField(String vectorField)` | Sets the name of the vector field.<br>The value cannot be empty or null. | `primaryField`: Customized name of the vector field. |
| `withAutoID(boolean autoId)` | Sets whether the primary field automatically increments<br>The value defaults to `false`. | `autoId`: Whether the primary field automatically increments is allowed. |
| `withSyncLoad(boolean syncLoad)` | Sets whether the collection is to be loaded upon creation.<br>The value defaults to `true`, indicating that the collection is to be loaded upon creation. | `syncLoad`: Whether the collection is to be loaded upon creation. |
| `withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)` | Sets the consistency level. <br>The default value is `ConsistencyLevelEnum.BOUNDED`. | `consistencyLevel`: The consistency level of the collection. |
| `withPrimaryFieldType(DataType primaryFieldType)` | Sets the data type of the primary field. <br>The value cannot be empty or null. The default value is `DataType.Int64`. | `primaryFieldType`: The data type of the primary field. |
| `withMaxLength(Integer maxLength)` | Sets the maximum length of the primary field if the data type of the primary field `DataType.VarChar`. <br>The value cannot be empty or null. | `maxLength`: The maximum length of the primary field if its data type is `DataType.VarChar`. |
| `build()` |  Constructs a `CreateSimpleCollectionParam` object. | N/A |

The CreateSimpleCollectionParam.Builder.build() can throw the following exceptions:

- `ParamException` is raised if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.
- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.
- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.highlevel.collection.*;

CreateSimpleCollectionParam param = CreateSimpleCollectionParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withDimension(VECTOR_DIM)
        .withPrimaryField(ID_FIELD)
        .withVectorField(VECTOR_FIELD)
        .withAutoId(true)
        .build();

R<RpcStatus> response = client.createCollection(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
