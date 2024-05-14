# query()

The MilvusClient interface. This method queries entity(s) based on scalar field(s) filtered by boolean expression. Note that the order of the returned entities can not be guaranteed.

```java
R<QueryResponse> query(QuerySimpleParam requestParam);
```

## QuerySimpleParam

Use the `QuerySimpleParam.Builder` to construct a `QuerySimpleParam` object.

```java
import io.milvus.param.highlevel.dml.QuerySimpleParam;
QuerySimpleParam.Builder builder = QuerySimpleParam.newBuilder();
```

Methods of `QuerySimpleParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(collectionName)</td>
        <td>Set the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The target collection name.</td>
    </tr>
    <tr>
        <td>withOutputFields(List\<String> outputFields)</td>
        <td>Specifies output scalar fields (Optional).<br/>If output fields are specified, the QueryResults returned by query() will contains the values of these fields.</td>
        <td><br/>outputFields: The name list of fields to be outputed.</td>
    </tr>
    <tr>
        <td>withFilter(String filter)</td>
        <td>Set the expression to query entities. For more information please refer to <a href="https://milvus.io/docs/v2.1.x/boolean.md">this doc</a>.</td>
        <td>filter: The expression to query.</td>
    </tr>
    <tr>
        <td>withOffset(Long offset)</td>
        <td>Specify a position, the returned entities before this position will be ignored. Only take effect when the 'limit' value is specified.Default value is 0, start from begin.</td>
        <td>offset: A value to define the position.</td>
    </tr>
    <tr>
        <td>withLimit(Long limit)</td>
        <td>Specify a value to control the returned number of entities. Must be a positive value.Default value is 0, will return without limit.</td>
        <td>limit: A value to define the limit of returned entities.</td>
    </tr>
    <tr>
        <td>withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)</td>
        <td>Consistency level used in the query. If no level is specified, will use default consistency. Please refer to ConsistencyLevelEnum in Misc.</td>
        <td>consistencyLevel: The consistency level used in the query.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a QuerySimpleParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `QuerySimpleParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<QueryResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns valid `QueryResponse` held by the `R` template.

## Example

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

