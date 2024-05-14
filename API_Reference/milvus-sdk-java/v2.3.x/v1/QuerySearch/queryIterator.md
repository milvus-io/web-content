# queryIterator()

MilvusClient interface. This method returns an iterator for you to iterate over the query results. It is useful especially when the query result contains a large volume of data.

```java
R<QueryIterator> queryIterator(QueryIteratorParam requestParam);
```

## QueryIteratorParam

Use the `QueryIteratorParam.Builder` to construct a `QueryIteratorParam` object.

```java
import io.milvus.param.dml.QueryIteratorParam;
QueryIteratorParam.Builder builder = QueryIteratorParam.newBuilder();
```

Methods of `QueryIteratorParam.Builder`:

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
        <td>withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)</td>
        <td>Sets the search consistency level(Optional).<br/>If the level is not set, will use the default consistency level of the collection.</td>
        <td>consistencyLevel: The consistency level used in the query.</td>
    </tr>
    <tr>
        <td>withPartitionNames(List\<String> partitionNames)</td>
        <td>Sets partition names list to specify query scope (Optional).</td>
        <td>partitionNames: The name list of partitions to be queried.</td>
    </tr>
    <tr>
        <td>addPartitionName(String partitionName)</td>
        <td>Adds a partition to specify query scope (Optional).</td>
        <td>partitionName: A partition name to be queried.</td>
    </tr>
    <tr>
        <td>withOutFields(List\<String> outFields)</td>
        <td>Specifies output scalar fields (Optional).<br/>If output fields are specified, the QueryResults returned by query() will contains the values of these fields.</td>
        <td><br/>outFields: The name list of fields to be outputed.</td>
    </tr>
    <tr>
        <td>addOutField(String fieldName)</td>
        <td>Specifies an output scalar field (Optional).</td>
        <td>fieldName: An output field name.</td>
    </tr>
    <tr>
        <td>withExpr(String expr)</td>
        <td>Set the expression to query entities. For more information please refer to <a href="https://milvus.io/docs/v2.3.x/boolean.md">this doc</a>.</td>
        <td>expr: The expression to query</td>
    </tr>
    <tr>
        <td>withOffset(Long offset)</td>
        <td>Specify a position, the returned entities before this position will be ignored. Only take effect when the 'limit' value is specified. Default value is 0, start from begin.</td>
        <td>offset: A value to define the position.</td>
    </tr>
    <tr>
        <td>withLimit(Long limit)</td>
        <td>Specify a value to control the returned number of entities. Must be a positive value. Default value is -1, will return without limit.</td>
        <td>limit: A value to define the limit of returned entities.</td>
    </tr>
    <tr>
        <td>withIgnoreGrowing(Boolean ignoreGrowing)</td>
        <td>Ignore the growing segments to get best query performance. For the user case that don't require data visibility. Default value is False.</td>
        <td>ignoreGrowing: Ignore growing segments or not.</td>
    </tr>
    <tr>
        <td>withBatchSize(Long batchSize)</td>
        <td>Specify a value to control the number of entities returned per batch. Must be a positive value.<br/>Default value is 1000, will return without batchSize.</td>
        <td>batchSize: A value to define the number of entities returned per batch</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a QueryIteratorParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `QueryIteratorParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<QueryIterator>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `QueryIterator` held by the R template.

## QueryIterator

Methods of `QueryIterator`:

<table>
   <tr>
     <th><strong>Method</strong></th>
     <th><strong>Description</strong></th>
     <th><strong>Parameters</strong></th>
     <th><strong>Returns</strong></th>
   </tr>
   <tr>
     <td>next()</td>
     <td>Return a batch of results.</td>
     <td>N/A</td>
     <td>List\<QueryResultsWrapper.RowRecord></td>
   </tr>
   <tr>
     <td>close()</td>
     <td>Release the cache results.</td>
     <td>N/A</td>
     <td>N/A</td>
   </tr>
</table>

## Example

```java
import io.milvus.param.dml.*;
import io.milvus.orm.iterator.*;
import io.milvus.response.QueryResultsWrapper;

R<QueryIterator> response = milvusClient.queryIterator(QueryIteratorParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withExpr(expr)
        .withBatchSize(100L)
        .build());
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

QueryIterator queryIterator = response.getData();
while (true) {
    List<QueryResultsWrapper.RowRecord> batchResults = queryIterator.next();
    if (res.isEmpty()) {
        System.out.println("query iteration finished, close");
        queryIterator.close();
        break;
    }
    for (QueryResultsWrapper.RowRecord res : batchResults) {
        System.out.println(res);
    }
}
```
