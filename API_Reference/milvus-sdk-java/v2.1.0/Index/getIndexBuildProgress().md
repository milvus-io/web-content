# getIndexBuildProgress()

A MilvusClient interface. This method shows the index building progress, such as how many rows are indexed.

```Java
R<GetIndexBuildProgressResponse> getIndexBuildProgress(GetIndexBuildProgressParam requestParam);
```

## GetIndexBuildProgressParam

Use the `GetIndexBuildProgressParam.Builder` to construct a `GetIndexBuildProgressParam` object.

```Java
import io.milvus.param.GetIndexBuildProgressParam;
GetIndexBuildProgressParam.Builder builder = GetIndexBuildProgressParam.newBuilder();
```

Methods of `GetIndexBuildProgressParam.Builder`:

| Method                             | Description                                                  | Parameters                             |
| ---------------------------------- | ------------------------------------------------------------ | -------------------------------------- |
| `withCollectionName(collectionName)` | Sets the collection name. The collection name cannot be empty or null. | `collectionName`: The name of the collection whose index building progress needs to be checked. |
| `withIndexName(String indexName)`    | Sets the target index name. The index name cannot be empty or null. If no index name is specified, the default index name `_default_idx` is used. | `indexName`: The name of the index whose building progress needs to be checked.           |
| `build()`                          | Constructs a `GetIndexBuildProgressParam` object.                | N/A                                       |

The `GetIndexBuildProgressParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<GetIndexBuildProgressResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns a valid `GetIndexBuildProgressResponse` held by the R template.

## Example

```Java
import io.milvus.param.*;
import io.milvus.grpc.GetIndexBuildProgressResponse;

GetIndexBuildProgressParam param = GetIndexBuildProgressParam.newBuilder()
        .withCollectionName("collection1")
        .withIndexName("index1")
        .build();
R<GetIndexBuildProgressResponse> response = client.getIndexBuildProgress(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

long indexedRows = response.getData().getIndexedRows();
long totalRows = response.getData().getTotalRows();
System.out.println("indexed rows: "  + indexedRows + ", total rows: " + totalRows);
```
