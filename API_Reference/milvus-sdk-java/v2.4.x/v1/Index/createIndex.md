# createIndex()

The MilvusClient interface. This method creates an index on a field in the specified collection.

```java
R<RpcStatus> createIndex(CreateIndexParam requestParam);
```

## CreateIndexParam

Use the `CreateIndexParam.Builder` to construct a `CreateIndexParam` object.

```java
import io.milvus.param.CreateIndexParam;
CreateIndexParam.Builder builder = CreateIndexParam.newBuilder()
```

Methods of `CreateIndexParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(<br/>String collectionName)</td>
        <td>Set the target collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The name of the target collection to create an index for.</td>
    </tr>
    <tr>
        <td>withFieldName(String fieldName)</td>
        <td>Set the target field name. Field name cannot be empty or null.</td>
        <td>fieldName: The target field name</td>
    </tr>
    <tr>
        <td>withIndexType(IndexType indexType)</td>
        <td>Set the index type. Please refer to IndexType in Misc.</td>
        <td>indexType: The index type</td>
    </tr>
    <tr>
        <td>withIndexName(String indexName)</td>
        <td>Set the name of index which will be created. Then you can use the index name to check the state of index. If no index name is specified, the default index name is empty string which means let the server determine it. The max length of index name is 255 characters.</td>
        <td>indexName: The name of the index</td>
    </tr>
    <tr>
        <td>withMetricType(MetricType metricType)</td>
        <td>Sets the metric type. Please refer to MetricType in Misc.</td>
        <td>metricType: The metric type</td>
    </tr>
    <tr>
        <td><br/>withExtraParam(String extraParam)</td>
        <td><br/>Sets the specific index parameters according to index type. For example, IVF index, the extra parameters can be "\{\"nlist\":1024}".</td>
        <td>extraParam: <br/>Extra parameters in JSON format</td>
    </tr>
    <tr>
        <td>withSyncMode(Boolean syncMode)</td>
        <td>Enable sync mode. For sync mode, the client keeps waiting until all segments of the collection are successfully indexed. If sync mode is disabled, the createIndex() returns instantly. By default sync mode is enabled.</td>
        <td>syncMode: true is sync mode</td>
    </tr>
    <tr>
        <td>withSyncWaitingInterval(Long milliseconds)</td>
        <td>Set the waiting interval in sync mode. With sync mode enabled, the client constantly checks index state by interval. Interval value must be greater than zero, and cannot be greater than Constant.MAX<em>WAITING</em>INDEX_INTERVAL. By default, interval value is 500 milliseconds.</td>
        <td><br/>milliseconds: Sync mode interval value(unit: millisecond)</td>
    </tr>
    <tr>
        <td><br/>withSyncWaitingTimeout( Long seconds)</td>
        <td>Set the timeout value for sync mode. Timeout value must be greater than zero and no upper limit. Default value is 600 seconds.</td>
        <td>seconds: Sync mode timeout value(unit: second)</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a CreateAliasParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `CreateIndexParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

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
