# search()

The MilvusClient interface. This method conducts an approximate nearest neighbor (ANN) search on a vector field and pairs up with a Boolean expression to conduct filtering on scalar fields before searching.

```java
R<SearchResponse> search(SearchSimpleParam requestParam);
```

#### SearchSimpleParam

Use the `SearchSimpleParam.Builder` to construct a `SearchSimpleParam` object.

```java
import io.milvus.param.highlevel.dml.SearchSimpleParam;
SearchSimpleParam.Builder builder = SearchSimpleParam.newBuilder();
```

Methods of `SearchSimpleParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(collectionName)</td>
        <td>Set the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: target collection name</td>
    </tr>
    <tr>
        <td>withOutFields(List&lt;String> outFields)</td>
        <td>Specifies output scalar fields (Optional).</td>
        <td>outFields: The name list of fields to be outputed</td>
    </tr>
    <tr>
        <td>withFilter(String filter)</td>
        <td>[object Object],[object Object],[object Object],[object Object],[object Object]</td>
        <td>filter: The expression to filter scalar fields</td>
    </tr>
    <tr>
        <td>withVectors(List&lt;?> vectors)</td>
        <td>Set the target vector. Up to 16384 vectors allowed.</td>
        <td>vectors: - If target field type is float vector, List&lt; List&lt;Float>> is required;- If target field type is binary vector, List&lt;ByteBuffer> is required;</td>
    </tr>
    <tr>
        <td>withOffset(Long offset)</td>
        <td>Specify a position, the returned entities before this position will be ignored. Only take effect when the 'limit' value is specified.Default value is 0, start from begin.</td>
        <td>offset: A value to define the position</td>
    </tr>
    <tr>
        <td>withLimit(Long limit)</td>
        <td>Specify a value to control the returned number of entities. Must be a positive value.Default value is 10, will return without limit.</td>
        <td>limit: A value to define the limit of returned entities</td>
    </tr>
    <tr>
        <td>withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)</td>
        <td>Consistency level used in the search. If no level is specified, will use default consistency. Please refer to ConsistencyLevelEnum in Misc.</td>
        <td>consistencyLevel: The consistency level used in the search</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a SearchSimpleParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `SearchSimpleParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<SearchResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `SearchResponse` held by the `R` template.

#### Example

```java
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
