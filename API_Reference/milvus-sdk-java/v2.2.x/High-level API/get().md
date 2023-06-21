# get()

A MilvusClient interface. This method gets entity(s) by their primary fields. Note that the order of the returned entities can not be guaranteed.

```Java
R<GetResponse> get(GetIdsParam requestParam);
```

## GetIdsParam

Use the `GetIdsParam.Builder` to construct a `GetIdsParam` object.

```Java
import io.milvus.param.highlevel.dml.GetIdsParam;
GetIdsParam.Builder builder = GetIdsParam.newBuilder();
```

Methods of `GetIdsParam.Builder`:

| Method | Description | Parameters |
| --- | --- | --- |
| `withCollectionName(String collectionName)` | Sets the target collection name.<br>The value cannot be empty or null. | `collectionName`: Name of the collection from which entities are to be retrieved. |
| `withPrimaryIds(List<T> primaryIds)` | Sets the IDs of the entities to retrieve.<br>The value cannot be empty or null. | `primaryIds`: A list of primary keys of the entities to retrieve. |
| `addPrimaryId(T primaryId)` | Sets the ID of the entity you want to retrieve.<br>The value cannot be empty or null.<br>Use only the values of the primary key. | `primaryId`: ID of the entity you want to retrieve. |
| `withOutputFields(List<String> outputFields)` | (Optional) Sets the output fields. | `outputFields`: A list of output fields you prefer. |
| `build()` | Constructs a `GetIdsParam` object. | N/A |

The GetIdsParam.Builder.build() can throw the following exceptions:

- `ParamException` is raised if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<GetResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.
- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.
- If the API succeeds, it returns a valid `GetResponse` held by the R template. 

## Example

```Java
import io.milvus.param.*;
import io.milvus.response.QueryResultsWrapper;
import io.milvus.response.FieldDataWrapper;
import io.milvus.grpc.QueryResults;

List<String> ids = Lists.newArrayList("441966745769900131", "441966745769900133");
GetIdsParam getParam = GetIdsParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withId(ids)
        .withOutputFields(Lists.newArrayList("*"))
        .build();

R<GetResponse> response = client.get(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

for (QueryResultsWrapper.RowRecord rowRecord : response.getData().getRowRecords()) {
    System.out.println(rowRecord);
}
```
