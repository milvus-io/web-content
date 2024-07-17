# flush()

A MilvusClient interface. This method triggers a flush action in which all growing segments in the specified collection are marked as sealed and then flushed to storage. 

<div class="admonition note">

<p><b>notes</b></p>

<p>Typically, this method is called once all the data is ingested. You are advised not to call this method frequently since it could generate a lot of tiny segments and lead to unstable problems.</p>

</div>

```java
R<FlushResponse> flush(FlushParam requestParam);
```

#### FlushParam

Use the `FlushParam.Builder` to construct a `FlushParam` object.

```java
import io.milvus.param.FlushParam;
FlushParam.Builder builder = FlushParam.newBuilder();
```

Methods of `FlushParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionNames(List\<String> collectionNames)</p></td>
        <td><p>Sets a list of collections to be flushed.</p></td>
        <td><p>collectionNames: a list of the names of the collections to be flushed.</p></td>
    </tr>
    <tr>
        <td><p>addCollectionName(String collectionName)</p></td>
        <td><p>Adds a collection to be flushed.</p></td>
        <td><p>collectionName: The name of the collection to be flushed.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withSyncFlush(Boolean syncFlush)</p></td>
        <td><p>Sets the flush function to sync mode. With sync mode enabled, the client keeps waiting until all segments of the collection are successfully flushed. If sync mode is disabled, the client immediately returns the result after flush() is called.</p></td>
        <td><p>syncFlush: A Boolean value to indicate if sync mode is enabled. Sync mode is enabled if the value is set to True.</p></td>
    </tr>
    <tr>
        <td><p>withSyncFlushWaitingInterval(Long milliseconds)</p></td>
        <td><p>Sets the waiting interval in sync mode. With sync mode enabled, the client will check segments status at intervals. The value must be greater than zero, and cannot be greater than Constant.MAX<em>WAITING</em>FLUSHING_INTERVAL. The default value is 500 miliseconds.</p></td>
        <td><p>milliseconds: The time interval in milliseconds for checking the flush status.</p></td>
    </tr>
    <tr>
        <td><p><br/>withSyncFlushWaitingTimeout(Long seconds)</p></td>
        <td><p>Sets the timeout period for sync mode. The value must be greater than zero, and cannot be greater than Constant.MAX<em>WAITING</em>FLUSHING_TIMEOUT. The default value is 60 seconds.</p></td>
        <td><p>seconds: A during of time in seconds to wait till timeout.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a FlushParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `FlushParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<FlushResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `FlushResponse` held by the `R` template. The `FlushResponse` contains a map of the collection name and a corresponding list of flushed segments. The map is internally used by other SDK methods such as `createIndex()`.

#### Example

```java
import io.milvus.param.*;
import io.milvus.grpc.FlushResponse;

FlushParam param = FlushParam.newBuilder()
        .addCollectionName(COLLECTION_NAME)
        .build();
R<FlushResponse> response = client.flush(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
