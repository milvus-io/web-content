# query()

A MilvusClient interface. This method filters entities by a boolean expression. Note that the order of the returned entities can not be guaranteed.

```Java
R<QueryResponse> query(QuerySimpleParam requestParam);
```

## QuerySimpleParam

Use the `QuerySimpleParam.Builder` to construct a `QuerySimpleParam` object.

```Java
import io.milvus.param.highlevel.dml.QuerySimpleParam;
QuerySimpleParam.Builder builder = QuerySimpleParam.newBuilder();
```

Methods of `QuerySimpleParam.Builder`:

| Method | Description | Parameters |
| --- | --- | --- |
| `withCollectionName(String collectionName)` | Sets the name of the target collection.<br>The value cannot be empty or null. | `collectionName`: Name of the collection against which the query is conducted. |
| `withOutputFields(List<String> outputFields)` | Sets the names of the fields to return. If this value is set, the query result contains the values of these fields. | `outputFields`: Fields to include in the query result. |
| `withFilter(String filter)` | Sets an expression to filter entities. For more information, refer to [this doc](https://milvus.io/docs/boolean.md). | `filter`: A boolean expression to filter entities. |
| `withOffset(Long offset)` | Sets a position prior to which entities are to ignore in the query. | `offset`: A position prior to which entities are to ignore. |
| `withLimit(Long limit)` | Sets the number or entities to return.<br>The value should be 0 or a positive integer.<br>The value defaults to `0`, which lifts the limits on the number of entities to return. | `limit`: Number of entities to return. |
| `build()` | Constructs a `QuerySimpleParam` object. | N/A |

The QuerySimpleParam.Builder.build() can throw the following exceptions:

- `ParamException` is raised if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<QueryResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.
- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.
- If the API succeeds, it returns valid `QueryResponse` held by the R template. 

## Example

```Java
import io.milvus.param.*;
import io.milvus.response.QueryResultsWrapper;
import io.milvus.response.FieldDataWrapper;
import io.milvus.grpc.QueryResults;

QuerySimpleParam querySimpleParam = QuerySimpleParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withOutFields(Lists.newArrayList("*"))
        .withFilter(filter)
        .withLimit(100L)
        .withOffset(0L)
        .build();
R<QueryResponse> response = client.query(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

for (QueryResultsWrapper.RowRecord rowRecord : response.getData().getRowRecords()) {
    System.out.println(rowRecord);
}
```
