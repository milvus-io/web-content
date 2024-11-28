# queryIterator()

MilvusClient interface. This method returns an iterator for you to iterate over the query results. It is useful especially when the query result contains a large volume of data.

```java
R<QueryIterator> queryIterator(QueryIteratorParam requestParam);
```

#### QueryIteratorParam

Use the `QueryIteratorParam.Builder` to construct a `QueryIteratorParam` object.

```java
import io.milvus.param.dml.QueryIteratorParam;
QueryIteratorParam.Builder builder = QueryIteratorParam.newBuilder();
```

Methods of `QueryIteratorParam.Builder`:

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
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)</p></td>
        <td><p>Sets the search consistency level(Optional).<br/>If the level is not set, will use the default consistency level of the collection.</p></td>
        <td><p>consistencyLevel: The consistency level used in the query.</p></td>
    </tr>
    <tr>
        <td><p>withPartitionNames(List&lt;String> partitionNames)</p></td>
        <td><p>Sets partition names list to specify query scope (Optional).</p></td>
        <td><p>partitionNames: The name list of partitions to be queried.</p></td>
    </tr>
    <tr>
        <td><p>addPartitionName(String partitionName)</p></td>
        <td><p>Adds a partition to specify query scope (Optional).</p></td>
        <td><p>partitionName: A partition name to be queried.</p></td>
    </tr>
    <tr>
        <td><p>withOutFields(List&lt;String> outFields)</p></td>
        <td><p>Specifies output scalar fields (Optional).<br/>If output fields are specified, the QueryResults returned by query() will contains the values of these fields.</p></td>
        <td><p><br/>outFields: The name list of fields to be outputed.</p></td>
    </tr>
    <tr>
        <td><p>addOutField(String fieldName)</p></td>
        <td><p>Specifies an output scalar field (Optional).</p></td>
        <td><p>fieldName: An output field name.</p></td>
    </tr>
    <tr>
        <td><p>withExpr(String expr)</p></td>
        <td><p>Set the expression to query entities. For more information please refer to <a href="https://milvus.io/docs/v2.3.x/boolean.md">this doc</a>.</p></td>
        <td><p>expr: The expression to query</p></td>
    </tr>
    <tr>
        <td><p>withOffset(Long offset)</p></td>
        <td><p>Specify a position, the returned entities before this position will be ignored. Only take effect when the 'limit' value is specified. Default value is 0, start from begin.</p></td>
        <td><p>offset: A value to define the position.</p></td>
    </tr>
    <tr>
        <td><p>withLimit(Long limit)</p></td>
        <td><p>Specify a value to control the returned number of entities. Must be a positive value. Default value is -1, will return without limit.</p></td>
        <td><p>limit: A value to define the limit of returned entities.</p></td>
    </tr>
    <tr>
        <td><p>withIgnoreGrowing(Boolean ignoreGrowing)</p></td>
        <td><p>Ignore the growing segments to get best query performance. For the user case that don't require data visibility. Default value is False.</p></td>
        <td><p>ignoreGrowing: Ignore growing segments or not.</p></td>
    </tr>
    <tr>
        <td><p>withBatchSize(Long batchSize)</p></td>
        <td><p>Specify a value to control the number of entities returned per batch. Must be a positive value.<br/>Default value is 1000, will return without batchSize.</p></td>
        <td><p>batchSize: A value to define the number of entities returned per batch</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a QueryIteratorParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `QueryIteratorParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<QueryIterator>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `QueryIterator` held by the `R` template.

#### QueryIterator

Methods of `QueryIterator`:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Parameters</strong></p></th>
     <th><p><strong>Returns</strong></p></th>
   </tr>
   <tr>
     <td><p>next()</p></td>
     <td><p>Return a batch of results.</p></td>
     <td><p>N/A</p></td>
     <td><p>List&lt;QueryResultsWrapper.RowRecord></p></td>
   </tr>
   <tr>
     <td><p>close()</p></td>
     <td><p>Release the cache results.</p></td>
     <td><p>N/A</p></td>
     <td><p>N/A</p></td>
   </tr>
</table>

#### Example

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
