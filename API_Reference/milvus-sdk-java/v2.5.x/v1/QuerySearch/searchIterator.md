# searchIterator()

MilvusClient interface. This method returns a Python iterator for you to iterate over the search results. It is useful especially when the search result contains a large volume of data.

```java
R<SearchIterator> searchIterator(SearchIteratorParam requestParam);
```

#### SearchIteratorParam

Use the `SearchIteratorParam.Builder` to construct a `SearchIteratorParam` object.

```java
import io.milvus.param.dml.SearchIteratorParam;
SearchIteratorParam.Builder builder = SearchIteratorParam.newBuilder();
```

Methods of `SearchIteratorParam.Builder`:

<table>
    <tr>
        <th><p>Methods</p></th>
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
        <td><p>consistencyLevel: The consistency level used in the search.</p></td>
    </tr>
    <tr>
        <td><p>withPartitionNames(List&lt;String> partitionNames)</p></td>
        <td><p>Sets partition names list to specify search scope (Optional).</p></td>
        <td><p>partitionNames: The name list of partitions to be searched.</p></td>
    </tr>
    <tr>
        <td><p>addPartitionName(String partitionName)</p></td>
        <td><p>Adds a partition to specify search scope (Optional).</p></td>
        <td><p>partitionName: A partition name to be searched.</p></td>
    </tr>
    <tr>
        <td><p>withOutFields(List&lt;String> outFields)</p></td>
        <td><p>Specifies output scalar fields (Optional).</p></td>
        <td><p><br/>outFields: The name list of fields to be outputed.</p></td>
    </tr>
    <tr>
        <td><p>addOutField(String fieldName)</p></td>
        <td><p>Specifies an output scalar field (Optional).</p></td>
        <td><p>fieldName: An output field name.</p></td>
    </tr>
    <tr>
        <td><p>withExpr(String expr)</p></td>
        <td><p>Set the expression to filter scalar fields before searching(Optional).For more information please refer to <a href="https://milvus.io/docs/v2.3.x/boolean.md">this doc</a>.</p></td>
        <td><p>expr: The expression to filter scalar fields.</p></td>
    </tr>
    <tr>
        <td><p>withMetricType(MetricType metricType)</p></td>
        <td><p>Set metric type of ANN search.<br/>Default value is MetricType.None, which means let the server determine the defaul metric type. Please refer to MetricType in Misc.</p></td>
        <td><p>metricType: The metric type to search.</p></td>
    </tr>
    <tr>
        <td><p>withVectorFieldName(String vectorFieldName)</p></td>
        <td><p>Set target vector field by name. Field name cannot be empty or null.</p></td>
        <td><p>vectorFieldName: The target vector field name to do ANN search.</p></td>
    </tr>
    <tr>
        <td><p>withTopK(Integer topK)</p></td>
        <td><p>Set topK value of ANN search.<br/>Avaiable range: [1, 16384]</p></td>
        <td><p>topK: The topk value.</p></td>
    </tr>
    <tr>
        <td><p>withVectors(List&lt;?> vectors)</p></td>
        <td><p>Set the target vectors. Up to 16384 vectors allowed.<br/>Note: this method works for FloatVector/BinaryVector/SparseFloatVector, but it doesn't work for Float16Vector/BFloat16Vector.<br/>It is recommended to use withFloatVectors/withBinaryVectors/withFloat16Vectors/withBFloat16Vectors/withSparseFloatVectors to input vectors expilicitly.</p></td>
        <td><p>vectors: <br/>- If target field type is FloatVector, List&lt; List&lt;Float>gt; is required.<br/>- If target field type is BinaryVector, List&lt;ByteBuffer> is required.<br/>- If target field type is SparseFloatVector, List&lt;SortedMap[Long, Float]> is required.</p></td>
    </tr>
    <tr>
        <td><p>withFloatVectors(List&lt;List&lt;Float>gt; vectors)</p></td>
        <td><p>Set the target vectors to search FloatVector field. Up to 16384 vectors allowed.<br/>Note: this method will reset the target vectors of SearchParam. To input vectors, call it only once.</p></td>
        <td><p>vectors: The target vectors</p></td>
    </tr>
    <tr>
        <td><p>withBinaryVectors(List&lt;ByteBuffer> vectors)</p></td>
        <td><p>Set the target vectors to search BinaryVector field. Up to 16384 vectors allowed.<br/>Note: this method will reset the target vectors of SearchParam. To input vectors, call it only once.</p></td>
        <td><p>vectors: The target vectors</p></td>
    </tr>
    <tr>
        <td><p>withFloat16Vectors(List&lt;ByteBuffer> vectors)</p></td>
        <td><p>Set the target vectors to search Float16Vector field. Up to 16384 vectors allowed.<br/>Note: this method will reset the target vectors of SearchParam. To input vectors, call it only once.</p></td>
        <td><p>vectors: The target vectors</p></td>
    </tr>
    <tr>
        <td><p>withBFloat16Vectors(List&lt;List&lt;Float>gt; vectors)</p></td>
        <td><p>Set the target vectors to search BFloat16Vector field. Up to 16384 vectors allowed.<br/>Note: this method will reset the target vectors of SearchParam. To input vectors, call it only once.</p></td>
        <td><p>vectors: The target vectors</p></td>
    </tr>
    <tr>
        <td><p>withSparseFloatVectors(List&lt;SortedMap&lt;Long, Float>gt; vectors)</p></td>
        <td><p>Set the target vectors to search SparseFloatVector field. Up to 16384 vectors allowed.<br/>Note: this method will reset the target vectors of SearchParam. To input vectors, call it only once.</p></td>
        <td><p>vectors: The target vectors</p></td>
    </tr>
    <tr>
        <td><p>withRoundDecimal(Integer decimal)</p></td>
        <td><p>Specifies the decimal place for returned distance.<br/>Avaiable range: [-1, 6]<br/>Default value is -1, return all digits.</p></td>
        <td><p>decimal: How many digits are reserved after the decimal point.</p></td>
    </tr>
    <tr>
        <td><p>withParams(String params)</p></td>
        <td><p>Specifies the parameters of search in JSON format. The followings are valid keys of param:<br/>1. special parameters for index, such as "nprobe", "ef", "search<em>k"<br/>2. metric type with key "metric</em>type" and a string value such as "L2", "IP".<br/>3. offset for pagination with key "offset" and an integer value</p></td>
        <td><p>params: A JSON format string for extra parameters.</p></td>
    </tr>
    <tr>
        <td><p>withIgnoreGrowing(Boolean ignoreGrowing)</p></td>
        <td><p>Ignore the growing segments to get best search performance. For the user case that don't require data visibility.<br/>Default is False.</p></td>
        <td><p>ignoreGrowing: Ignore growing segments or not.</p></td>
    </tr>
    <tr>
        <td><p>withGroupByFieldName(String groupByFieldName)</p></td>
        <td><p>Sets field name to do grouping.</p></td>
        <td><p>groupByFieldName: The name of a field to do grouping.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a SearchIteratorParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `SearchIteratorParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<SearchIterator>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `SearchIterator` held by the `R` template.

#### SearchIterator

Methods of `SearchIterator`:

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

R<SearchIterator> response = milvusClient.searchIterator(SearchIteratorParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withBatchSize(50L)
        .withVectorFieldName(VECTOR_FIELD)
        .withFloatVectors(vectors)
        .withParams(params)
        .withMetricType(MetricType.L2)
        .build());
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

SearchIterator searchIterator = response.getData();
while (true) {
    List<QueryResultsWrapper.RowRecord> batchResults = searchIterator.next();
    if (res.isEmpty()) {
        System.out.println("search iteration finished, close");
        queryIterator.close();
        break;
    }
    for (QueryResultsWrapper.RowRecord res : batchResults) {
        System.out.println(res);
    }
}
```
