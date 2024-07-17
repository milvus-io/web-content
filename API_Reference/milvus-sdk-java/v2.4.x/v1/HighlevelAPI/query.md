# query()

The MilvusClient interface. This method queries entity(s) based on scalar field(s) filtered by boolean expression. Note that the order of the returned entities can not be guaranteed.

```java
R<QueryResponse> query(QuerySimpleParam requestParam);
```

#### QuerySimpleParam

Use the `QuerySimpleParam.Builder` to construct a `QuerySimpleParam` object.

```java
import io.milvus.param.highlevel.dml.QuerySimpleParam;
QuerySimpleParam.Builder builder = QuerySimpleParam.newBuilder();
```

Methods of `QuerySimpleParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(collectionName)</p></td>
        <td><p>Set the collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The target collection name.</p></td>
    </tr>
    <tr>
        <td><p>withOutputFields(List\<String> outputFields)</p></td>
        <td><p>Specifies output scalar fields (Optional).<br/>If output fields are specified, the QueryResults returned by query() will contains the values of these fields.</p></td>
        <td><p><br/>outputFields: The name list of fields to be outputed.</p></td>
    </tr>
    <tr>
        <td><p>withFilter(String filter)</p></td>
        <td><p>Set the expression to query entities. For more information please refer to <a href="https://milvus.io/docs/v2.1.x/boolean.md">this doc</a>.</p></td>
        <td><p>filter: The expression to query.</p></td>
    </tr>
    <tr>
        <td><p>withOffset(Long offset)</p></td>
        <td><p>Specify a position, the returned entities before this position will be ignored. Only take effect when the 'limit' value is specified.Default value is 0, start from begin.</p></td>
        <td><p>offset: A value to define the position.</p></td>
    </tr>
    <tr>
        <td><p>withLimit(Long limit)</p></td>
        <td><p>Specify a value to control the returned number of entities. Must be a positive value.Default value is 0, will return without limit.</p></td>
        <td><p>limit: A value to define the limit of returned entities.</p></td>
    </tr>
    <tr>
        <td><p>withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)</p></td>
        <td><p>Consistency level used in the query. If no level is specified, will use default consistency. Please refer to ConsistencyLevelEnum in Misc.</p></td>
        <td><p>consistencyLevel: The consistency level used in the query.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a QuerySimpleParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `QuerySimpleParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<QueryResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns valid `QueryResponse` held by the `R` template.

#### Example

```java
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

