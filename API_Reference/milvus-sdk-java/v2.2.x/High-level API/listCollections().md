# listCollections()

A MilvusClient interface. This method lists all the collections.

```Java
R<ListCollectionsResponse> listCollections(ListCollectionsParam requestParam);
```

## ListCollectionsParam

Use the `ListCollectionsParam.Builder` to construct a `ListCollectionsParam` object.

```Java
import io.milvus.param.highlevel.collection.ListCollectionsParam;
ListCollectionsParam.Builder builder = ListCollectionsParam.newBuilder();
```

Methods of `ListCollectionsParam.Builder`:

| Method | Description | Parameters |
| --- | --- | --- |
| `build()` | Construct a `ListCollectionsParam` object. | N/A |

The `ListCollectionsParam.Builder.build()` method can throw the following exceptions:

- `ParamException` is raised if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<ListCollectionsResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.
- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.
- If the API succeeds, it returns a valid `ListCollectionsResponse` held by the R template. 

## Example

```Java
import io.milvus.param.highlevel.collection.*;

ListCollectionsParam param = ListCollectionsParam.newBuilder()
        .build();

R<ListCollectionsResponse> response = client.listCollections(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
for (String collectionName : response.getData().collectionNames) {
    System.out.println(collectionName);
}
```
