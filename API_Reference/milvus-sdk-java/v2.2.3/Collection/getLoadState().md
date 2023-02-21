# getLoadState()

A Milvus interface. This method gets the state of the collection-loading progress.

```Java
R<GetLoadStateResponse> getLoadState(GetLoadStateParam requestParam);
```

## GetLoadStateParam

Use the `GetLoadStateParam.Builder` to construct a `GetLoadStateParam` object.

```java
import io.milvus.param.GetLoadStateParam;
GetLoadStateParam.Builder builder = GetLoadStateParam.newBuilder();
```

Methods of `GetLoadStateParam.Builder`:

| Method | Description | Parameters |
| ------ | ----------- | ---------- |
| `withCollectionName(String collectionName)` | Sets a collection name. Collection name cannot be empty or Null. | `collectionName`: Name of the collection to load. |
| `withPartitionName(List<String> partitionNames)` | (Optional) Sets a list of partition names to narrow the search scope. | `partitionNames`: List of partition names |
| `addPartitionName(String partitionName)` | Adds a partition by its name. Partition name cannot be empty or Null. | `partitionName`: Name of the partition to be added. |
| `build()` | Constructs a `GetLoadStateParam` object. | N/A |

The `GetLoadStateParam.Builder.build()` can throw the follwoing exceptions:
- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<GetLoadStateResponse>` object.
- If the API fails on the server side, it returns the error code and message from the server.
- If the API fails by RPC exception, it returns `R.Status`.Unknow and the error message of the exception.
- If the API succeeds, it returns `R.Status.Success`.

## Example

```java
import io.milvus.param.*;

GetLoadStateParam param = GetLoadStateParam.newBuilder()
        .withCollectionName(collectionName)
        .build();
R<GetLoadStateResponse> response = client.getLoadState(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
System.out.println(response.getState());
```