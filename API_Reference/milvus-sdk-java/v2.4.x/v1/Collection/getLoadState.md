# getLoadState()

A MilvusClient interface. This method gets the state of loading collection progress.

```java
R<GetLoadStateResponse> getLoadState(GetLoadStateParam requestParam);
```

#### GetLoadStateParam

Use the `GetLoadStateParam.Builder` to construct a GetLoadStateParam object.

```java
import io.milvus.param.GetLoadStateParam;
GetLoadStateParam.Builder builder = GetLoadStateParam.newBuilder();
```

Methods of `GetLoadStateParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Sets the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The name of the collection to get state.</td>
    </tr>
    <tr>
        <td>withPartitionNames(List&lt;String> partitionNames)</td>
        <td>Sets partition names list to specify query scope (Optional).</td>
        <td>partitionNames: A name list of partition to get state.</td>
    </tr>
    <tr>
        <td>addPartitionName(String partitionName)</td>
        <td>Adds a partition by name. Partition name cannot be empty or null.</td>
        <td>partitionName: A partition name.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a GetLoadStateParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `GetLoadStateParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<GetLoadStateResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.*;

GetLoadStateParam param = GetLoadStateParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .build();
R<GetLoadStateResponse> response = client.getLoadState(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
System.out.println(response.getState());
```

