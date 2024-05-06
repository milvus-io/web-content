# createCollection()

A MilvusClient interface. This method creates a collection with simple parameters.

```java
R<RpcStatus> createCollection(CreateSimpleCollectionParam requestParam);
```

## CreateSimpleCollectionParam

Use the `CreateSimpleCollectionParam.Builder` to construct a `CreateSimpleCollectionParam` object.

```java
import io.milvus.param.highlevel.collection.CreateCollectionParam;
CreateSimpleCollectionParam.Builder builder = CreateSimpleCollectionParam.newBuilder();
```

Methods of `CreateSimpleCollectionParam.Builder`:

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
        <td>withDimension(int dimension)</td>
        <td>Sets the collection vector dimension. Dimension value must be greater than zero and less than 32768.</td>
        <td>dimension: The number of dimensions for the vector field of the collection.</td>
    </tr>
    <tr>
        <td>withMetricType(MetricType metricType)</td>
        <td>Sets the metricType of vectorField. The distance metric used for the collection.</td>
        <td>metricType: The distance metric used for the collection.</td>
    </tr>
    <tr>
        <td>withDescription(String description)</td>
        <td>Sets the collection description. The description can be empty. The default description is "".</td>
        <td>description: The description of the collection to create.</td>
    </tr>
    <tr>
        <td>withPrimaryField(String primaryField)</td>
        <td>Sets the primaryFiled name. The primaryField cannot be empty or null. The default is "id".</td>
        <td>primaryField: The primary field name of the collection.</td>
    </tr>
    <tr>
        <td>withVectorField(String vectorField)</td>
        <td>Sets the vectorField name. The vectorField cannot be empty or null. The default is "vector".</td>
        <td>vectorField: The vector field name of the collection.</td>
    </tr>
    <tr>
        <td>withAutoId(boolean autoId)</td>
        <td>Sets the autoId. The default is Boolean.False.</td>
        <td>autoId: If open autoId towards to this collection.</td>
    </tr>
    <tr>
        <td>withSyncLoad(boolean syncLoad)</td>
        <td>Sets the SyncLoad when loadCollection.The default is Boolean.True.</td>
        <td>syncLoad: If syncLoad when loadCollection.</td>
    </tr>
    <tr>
        <td>withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)</td>
        <td>Sets the consistency level. The default value is ConsistencyLevelEnum.BOUNDED</td>
        <td>consistencyLevel: The consistency level of this collection.</td>
    </tr>
    <tr>
        <td>withPrimaryFieldType(DataType primaryFieldType)</td>
        <td>Sets the primaryFiled type. The primaryField type cannot be empty or null. The default is "DataType.Int64".</td>
        <td>primaryFieldType: The type of the primary field of this collection.</td>
    </tr>
    <tr>
        <td>withMaxLength(Integer maxLength)</td>
        <td>Sets the primaryFiled maxLength.<br/>If primaryFiled is specified as varchar, this parameter maxLength needs to be specified</td>
        <td>maxLength: The max length of the primary field If primaryFiled is specified as varchar.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a CreateSimpleCollectionParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `CreateSimpleCollectionParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```java
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
