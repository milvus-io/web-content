# createCollection()

A MilvusClient interface. This method creates a collection with simple parameters.

```java
R<RpcStatus> createCollection(CreateSimpleCollectionParam requestParam);
```

#### CreateSimpleCollectionParam

Use the `CreateSimpleCollectionParam.Builder` to construct a `CreateSimpleCollectionParam` object.

```java
import io.milvus.param.highlevel.collection.CreateCollectionParam;
CreateSimpleCollectionParam.Builder builder = CreateSimpleCollectionParam.newBuilder();
```

Methods of `CreateSimpleCollectionParam.Builder`:

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
        <td><p>withDimension(int dimension)</p></td>
        <td><p>Sets the collection vector dimension. Dimension value must be greater than zero and less than 32768.</p></td>
        <td><p>dimension: The number of dimensions for the vector field of the collection.</p></td>
    </tr>
    <tr>
        <td><p>withMetricType(MetricType metricType)</p></td>
        <td><p>Sets the metricType of vectorField. The distance metric used for the collection.</p></td>
        <td><p>metricType: The distance metric used for the collection.</p></td>
    </tr>
    <tr>
        <td><p>withDescription(String description)</p></td>
        <td><p>Sets the collection description. The description can be empty. The default description is "".</p></td>
        <td><p>description: The description of the collection to create.</p></td>
    </tr>
    <tr>
        <td><p>withPrimaryField(String primaryField)</p></td>
        <td><p>Sets the primaryFiled name. The primaryField cannot be empty or null. The default is "id".</p></td>
        <td><p>primaryField: The primary field name of the collection.</p></td>
    </tr>
    <tr>
        <td><p>withVectorField(String vectorField)</p></td>
        <td><p>Sets the vectorField name. The vectorField cannot be empty or null. The default is "vector".</p></td>
        <td><p>vectorField: The vector field name of the collection.</p></td>
    </tr>
    <tr>
        <td><p>withAutoId(boolean autoId)</p></td>
        <td><p>Sets the autoId. The default is Boolean.False.</p></td>
        <td><p>autoId: If open autoId towards to this collection.</p></td>
    </tr>
    <tr>
        <td><p>withSyncLoad(boolean syncLoad)</p></td>
        <td><p>Sets the SyncLoad when loadCollection.The default is Boolean.True.</p></td>
        <td><p>syncLoad: If syncLoad when loadCollection.</p></td>
    </tr>
    <tr>
        <td><p>withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)</p></td>
        <td><p>Sets the consistency level. The default value is ConsistencyLevelEnum.BOUNDED</p></td>
        <td><p>consistencyLevel: The consistency level of this collection.</p></td>
    </tr>
    <tr>
        <td><p>withPrimaryFieldType(DataType primaryFieldType)</p></td>
        <td><p>Sets the primaryFiled type. The primaryField type cannot be empty or null. The default is "DataType.Int64".</p></td>
        <td><p>primaryFieldType: The type of the primary field of this collection.</p></td>
    </tr>
    <tr>
        <td><p>withMaxLength(Integer maxLength)</p></td>
        <td><p>Sets the primaryFiled maxLength.<br/>If primaryFiled is specified as varchar, this parameter maxLength needs to be specified</p></td>
        <td><p>maxLength: The max length of the primary field If primaryFiled is specified as varchar.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a CreateSimpleCollectionParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `CreateSimpleCollectionParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

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
