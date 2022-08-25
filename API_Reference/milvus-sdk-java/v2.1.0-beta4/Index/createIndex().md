# createIndex()

A MilvusClient interface. This method creates an index on a field in a specified collection.

```Java
R<RpcStatus> createIndex(CreateIndexParam requestParam);
```

## CreateIndexParam

Use the `CreateIndexParam.Builder` to construct a `CreateIndexParam` object.

```Java
import io.milvus.param.CreateIndexParam;
CreateIndexParam.Builder builder = CreateIndexParam.newBuilder()
```

Methods of `CreateIndexParam.Builder`:

| Method                                       | Description                                                  | Parameters                                                   |
| -------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `withCollectionName( String collectionName)` | Sets the target collection name. The collection name cannot be empty or null. | `collectionName`: The name of the collection to create an index for. |
| `withFieldName(String fieldName)`            | Sets the target field name. The field name cannot be empty or null. | `fieldName`: The name of the field to build an index on.                          |
| `withIndexType(IndexType indexType)`         | Sets the index type.                                         | `indexType`: Index type.                                     |
| `withIndexName(String indexName)`            | Sets the name of index to create. The index name can be used to check the status of index. If no index name is specified, the default index name `_default_idx` is used. The maximum length of an index name is 255 characters. | `indexName`: Name of the index to create.                |
| `withMetricType(MetricType metricType)`      | Sets the metric type.                                        | `metricType`: Metric type.                                   |
| `withExtraParam(String extraParam)`          | Sets the specific index parameters for the index type. For example, for IVF indexes, extra parameters can be `{\"nlist\":1024}`. | `extraParam`:  Extra parameters in JSON format.              |
| `withSyncMode(Boolean syncMode)`             | Enables sync mode. For sync mode, the client keeps waiting until all segments of the collection are successfully indexed. If sync mode is disabled, `createIndex()` returns the results immediately.Sync mode is enabled by default. | `syncMode`: Sync mode is enabled when the value is `true`.                 |
| `withSyncWaitingInterval(Long milliseconds)` | Sets the waiting interval in sync mode. With sync mode enabled, the client constantly checks index state at intervals. The interval value must be greater than zero, and cannot be greater than `Constant.MAX_WAITING_INDEX_INTERVAL`. Interval value is `500` milliseconds by default. | `milliseconds`: Sync mode interval value (unit: millisecond). |
| `withSyncWaitingTimeout(Long seconds)`       | Sets the timeout value for sync mode. The timeout value must be greater than zero with no upper limit. The default value is `600` seconds. | `seconds`: Sync mode timeout value (unit: second).           |
| `build()`                                    | Constructs a `CreateIndexParam` object.                      | N/A                                                          |

The `CreateIndexParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.*;

CreateIndexParam param = CreateIndexParam.newBuilder()
        .withCollectionName("collection1")
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
