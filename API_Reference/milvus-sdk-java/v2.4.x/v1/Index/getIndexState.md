# getIndexState()

MilvusClient interface. This method shows the index building state, and the reason for failure (if any).

```java
R<GetIndexStateResponse> getIndexState(GetIndexStateParam requestParam);
```

## GetIndexStateParam

Use the `GetIndexStateParam.Builder` to construct a `GetIndexStateParam` object.

```java
import io.milvus.param.GetIndexStateParam;
GetIndexStateParam.Builder builder = GetIndexStateParam.newBuilder();
```

Methods of `GetIndexStateParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(collectionName)</td>
        <td>Set the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The target collection name.</td>
    </tr>
    <tr>
        <td>withIndexName(String indexName)</td>
        <td>Set the target index name. If no index name is specified, the default index name is empty string which means let the server determine it.</td>
        <td>indexName: The name of the index.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a GetIndexStateParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `GetIndexStateParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<GetIndexStateResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `GetIndexStateResponse` held by the R template.

## Example

```java
import io.milvus.param.*;
import io.milvus.grpc.GetIndexStateResponse;

GetIndexStateParam param = GetIndexStateParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withIndexName("index1")
        .build();
R<GetIndexStateResponse> response = client.getIndexState(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

if (response.getData().getState() == IndexState.Failed) {
    System.out.println(response.getData().getFailReason());
}
```
