# search()

A MilvusClient interface. This method conducts an approximate nearest neighbor (ANN) search on a vector field with filters in the form of a boolean expression.

```Java
R<SearchResponse> search(SearchSimpleParam requestParam);
```

## SearchSimpleParam

Use the `SearchSimpleParam.Builder` to construct a `SearchSimpleParam` object.

```Java
import io.milvus.param.highlevel.dml.SearchSimpleParam;
SearchSimpleParam.Builder builder = SearchSimpleParam.newBuilder();
```

Methods of `SearchSimpleParam.Builder`:

| Method | Description | Parameters |
| --- | --- | --- |
| `withCollectionName(String collectionName)` | Sets the name of the target collection.<br>The value cannot be empty or null. | `collectionName`: Name of the collection against which the search is conducted. |
| `withOutputFields(List<String> outputFields)` | Sets the names of the fields to return. If this value is set, the search result contains the values of these fields. | `outputFields`: Fields to include in the search result. |
| `withFilter(String filter)` | Sets an expression to filter entities. For more information, refer to [this doc](https://milvus.io/docs/boolean.md). | `filter`: A boolean expression to filter entities. |
| `withVectors(List<?> vectors)` | Sets the query vector.<br>The maximum number of vectors to include in a search should be less than 16384. | `vectors`: <ul><li>If the vector field holds float vectors, the type of `vectors` should be `List<List<Float>>`.</li><li></li>If the vector field holds binary vectors, the type of `vectors` should be `List<ByteBuffer>`.</ul> |
| `withOffset(Long offset)` | Sets a position prior to which entities are to ignore in the search. | `offset`: A position prior to which entities are to ignore. |
| `withLimit(Long limit)` | Sets the number or entities to return.<br>The value should be 0 or a positive integer.<br>The value defaults to `10`, indicates that 10 results are to return if not specified. | `limit`: Number of entities to return. |
| `withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)` | Sets the consistency level of the collection to search against. If not specified, the default consistency level is to be used. For details, please refer to `ConsistencyLevelEnum` in **Misc**. | `consistencyLevel`: The consistency level of the collection to search against. |
| `build()` | Constructs a `SearchSimpleParam` object. | N/A |

The SearchSimpleParam.Builder.build() can throw the following exceptions:

- `ParamException` is raised if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<SearchResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.
- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.
- If the API succeeds, it returns valid `SearchResponse` held by the R template.

## Example

```
import io.milvus.param.*;
import io.milvus.response.SearchResultsWrapper;
import io.milvus.grpc.SearchResults;

SearchSimpleParam param = SearchSimpleParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withVectors(generateFloatVector())
        .withOutputFields(Lists.newArrayList("*"))
        .withFilter(filter)
        .withLimit(100L)
        .withOffset(0L)
        .build();
R<SearchResponse> response = client.search(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

for (QueryResultsWrapper.RowRecord rowRecord : response.getData().getRowRecords()) {
    System.out.println(rowRecord);
}
```
