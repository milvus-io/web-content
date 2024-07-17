# createIndex()

The MilvusClient interface. This method creates an index on a field in the specified collection.

```java
R<RpcStatus> createIndex(CreateIndexParam requestParam);
```

#### CreateIndexParam

Use the `CreateIndexParam.Builder` to construct a `CreateIndexParam` object.

```java
import io.milvus.param.CreateIndexParam;
CreateIndexParam.Builder builder = CreateIndexParam.newBuilder()
```

Methods of `CreateIndexParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(<br/>String collectionName)</p></td>
        <td><p>Set the target collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The name of the target collection to create an index for.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withFieldName(String fieldName)</p></td>
        <td><p>Set the target field name. Field name cannot be empty or null.</p></td>
        <td><p>fieldName: The target field name</p></td>
    </tr>
    <tr>
        <td><p>withIndexType(IndexType indexType)</p></td>
        <td><p>Set the index type. Please refer to IndexType in Misc.</p></td>
        <td><p>indexType: The index type</p></td>
    </tr>
    <tr>
        <td><p>withIndexName(String indexName)</p></td>
        <td><p>Set the name of index which will be created. Then you can use the index name to check the state of index. If no index name is specified, the default index name is empty string which means let the server determine it. The max length of index name is 255 characters.</p></td>
        <td><p>indexName: The name of the index</p></td>
    </tr>
    <tr>
        <td><p>withMetricType(MetricType metricType)</p></td>
        <td><p>Sets the metric type. Please refer to MetricType in Misc.</p></td>
        <td><p>metricType: The metric type</p></td>
    </tr>
    <tr>
        <td><p><br/>withExtraParam(String extraParam)</p></td>
        <td><p>Sets the specific index parameters according to index type. For example, IVF index, the extra parameters can be <code>{"nlist":1024}</code>.</p></td>
        <td><p>extraParam: <br/>Extra parameters in JSON format</p></td>
    </tr>
    <tr>
        <td><p>withSyncMode(Boolean syncMode)</p></td>
        <td><p>Enable sync mode. For sync mode, the client keeps waiting until all segments of the collection are successfully indexed. If sync mode is disabled, the createIndex() returns instantly. By default sync mode is enabled.</p></td>
        <td><p>syncMode: true is sync mode</p></td>
    </tr>
    <tr>
        <td><p>withSyncWaitingInterval(Long milliseconds)</p></td>
        <td><p>Set the waiting interval in sync mode. With sync mode enabled, the client constantly checks index state by interval. Interval value must be greater than zero, and cannot be greater than Constant.MAX<em>WAITING</em>INDEX_INTERVAL. By default, interval value is 500 milliseconds.</p></td>
        <td><p><br/>milliseconds: Sync mode interval value(unit: millisecond)</p></td>
    </tr>
    <tr>
        <td><p><br/>withSyncWaitingTimeout( Long seconds)</p></td>
        <td><p>Set the timeout value for sync mode. Timeout value must be greater than zero and no upper limit. Default value is 600 seconds.</p></td>
        <td><p>seconds: Sync mode timeout value(unit: second)</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a CreateAliasParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `CreateIndexParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.*;

CreateIndexParam param = CreateIndexParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withFieldName("field1")
        .withIndexType(IndexType.IVF_FLAT)
        .withMetricType(MetricType.L2)
        .withExtraParam("{\"nlist\":64}")
        .build();
R<RpcStatus> response = client.createIndex(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
