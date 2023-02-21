# getLoadingProgress()

A MilvusClient interface. This method gets loading collection progress.

```Java
R<GetLoadingProgressResponse> getLoadingProgress(GetLoadingProgressParam requestParam);
```

## LoadCollectionParam

Use the `GetLoadingProgressParam.Builder` to construct a `GetLoadingProgressParam` object.

```Java
import io.milvus.param.GetLoadingProgressParam;
GetLoadingProgressParam.Builder builder = GetLoadingProgressParam.newBuilder();
```

Methods of `GetLoadingProgressParam.Builder`:

| Method | Description | Parameters |
| --- | --- | --- |
| `withCollectionName(String collectionName)` | Sets the collection name. Collection name cannot be empty or null. | `collectionName`: The name of the collection to load. |
| `withPartitionNames(List<String> partitionNames)` | Sets partition names list to specify query scope (Optional). | `partitionNames`: Partition names list. |

The `GetLoadingProgressParam.Builder.build()` can throw the following exceptions:
- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<GetLoadingProgressResponse>` object.
- If the API fails on the server side, it returns the error code and message from the server.
- If the API fails by RPC exception, it returns R.Status.Unknow and the error message of the exception.
- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.*;

GetLoadingProgressParam param = GetLoadingProgressParam.newBuilder()
        .withCollectionName(collectionName)
        .build();
R<GetLoadingProgressResponse> response = client.getLoadingProgress(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
System.out.println(response.getProgress());
```