# getIndexState()

A MilvusClient interface. This method shows the index building state and the reason for failure, if there is any.

```Java
R<GetIndexStateResponse> getIndexState(GetIndexStateParam requestParam);
```

## GetIndexStateParam

Use the `GetIndexStateParam.Builder` to construct a` GetIndexStateParam` object.

```Java
import io.milvus.param.GetIndexStateParam;
GetIndexStateParam.Builder builder = GetIndexStateParam.newBuilder();
```

Methods of `GetIndexStateParam.Builder`:

| Method                             | Description                                                  | Parameters                             |
| ---------------------------------- | ------------------------------------------------------------ | -------------------------------------- |
| `withCollectionName(collectionName)` | Sets the collection name. The collection name cannot be empty or null. | `collectionName`: The name of the collection whose index building state needs to be checked. |
| `withIndexName(String indexName)`    | Sets the target index name. The index name cannot be empty or null. If no index name is specified, the default index name is an empty string. | `indexName`: The name of the index whose building state needs to be checked.           |
| `build()`                            | Constructs a `GetIndexStateParam` object.                        |                           N/A             |

The `GetIndexStateParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<GetIndexStateResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns a valid `GetIndexStateResponse` held by the R template.

## Example

```Java
import io.milvus.param.*;
import io.milvus.grpc.GetIndexStateResponse;

GetIndexStateParam param = GetIndexStateParam.newBuilder()
        .withCollectionName("collection1")
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
