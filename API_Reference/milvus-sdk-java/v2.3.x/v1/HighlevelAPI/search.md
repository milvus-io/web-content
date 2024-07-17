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
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(collectionName)</p></td>
        <td><p>Set the collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: target collection name</p></td>
    </tr>
    <tr>
        <td><p>withOutFields(List\<String> outFields)</p></td>
        <td><p>Specifies output scalar fields (Optional).</p></td>
        <td><p><br/>outFields: The name list of fields to be outputed</p></td>
    </tr>
    <tr>
        <td><p>withFilter(String filter)</p></td>
        <td><p>Set the expression to filter scalar fields before searching(Optional).For more information please refer to <a href="https://milvus.io/docs/v2.1.x/boolean.md">this doc</a>.</p></td>
        <td><p>filter: The expression to filter scalar fields</p></td>
    </tr>
    <tr>
        <td><p>withVectors(List\<?> vectors)</p></td>
        <td><p>Set the target vector. Up to 16384 vectors allowed.</p></td>
        <td><p>vectors: <br/>- If target field type is float vector, List\< List\<Float>gt; is required;<br/>- If target field type is binary vector, List\<ByteBuffer> is required;</p></td>
    </tr>
    <tr>
        <td><p>withOffset(Long offset)</p></td>
        <td><p>Specify a position, the returned entities before this position will be ignored. Only take effect when the 'limit' value is specified.Default value is 0, start from begin.</p></td>
        <td><p>offset: A value to define the position</p></td>
    </tr>
    <tr>
        <td><p>withLimit(Long limit)</p></td>
        <td><p>Specify a value to control the returned number of entities. Must be a positive value.Default value is 10, will return without limit.</p></td>
        <td><p>limit: A value to define the limit of returned entities</p></td>
    </tr>
    <tr>
        <td><p>withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)</p></td>
        <td><p>Consistency level used in the search. If no level is specified, will use default consistency. Please refer to ConsistencyLevelEnum in Misc.</p></td>
        <td><p>consistencyLevel: The consistency level used in the search</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a SearchSimpleParam object.</p></td>
        <td><p>N/A</p></td>
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
