# searchIterator()

MilvusClient interface. This method returns a Python iterator for you to iterate over the search results. It is useful especially when the search result contains a large volume of data.

```java
R<SearchIterator> searchIterator(SearchIteratorParam requestParam);
```

## SearchIteratorParam

Use the `SearchIteratorParam.Builder` to construct a `SearchIteratorParam` object.

```java
import io.milvus.param.dml.SearchIteratorParam;
SearchIteratorParam.Builder builder = SearchIteratorParam.newBuilder();
```

Methods of `SearchIteratorParam.Builder`:

<table>
    <tr>
        <th>Methods</th>
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
        <td>consistencyLevel: The consistency level used in the search.</td>
    </tr>
    <tr>
        <td>withPartitionNames(List\<String> partitionNames)</td>
        <td>Sets partition names list to specify search scope (Optional).</td>
        <td>partitionNames: The name list of partitions to be searched.</td>
    </tr>
    <tr>
        <td>addPartitionName(String partitionName)</td>
        <td>Adds a partition to specify search scope (Optional).</td>
        <td>partitionName: A partition name to be searched.</td>
    </tr>
    <tr>
        <td>withOutFields(List\<String> outFields)</td>
        <td>Specifies output scalar fields (Optional).</td>
        <td><br/>outFields: The name list of fields to be outputed.</td>
    </tr>
    <tr>
        <td>addOutField(String fieldName)</td>
        <td>Specifies an output scalar field (Optional).</td>
        <td>fieldName: An output field name.</td>
    </tr>
    <tr>
        <td>withExpr(String expr)</td>
        <td></td>
        <td>expr: The expression to filter scalar fields.</td>
    </tr>
    <tr>
        <td>withMetricType(MetricType metricType)</td>
        <td>Set metric type of ANN search.<br/>Default value is MetricType.None, which means let the server determine the defaul metric type. Please refer to MetricType in Misc.</td>
        <td>metricType: The metric type to search.</td>
    </tr>
    <tr>
        <td>withVectorFieldName(String vectorFieldName)</td>
        <td>Set target vector field by name. Field name cannot be empty or null.</td>
        <td>vectorFieldName: The target vector field name to do ANN search.</td>
    </tr>
    <tr>
        <td>withTopK(Integer topK)</td>
        <td>Set topK value of ANN search.<br/>Avaiable range: [1, 16384]</td>
        <td>topK: The topk value.</td>
    </tr>
    <tr>
        <td>withVectors(List\<?> vectors)</td>
        <td>Set the target vectors. Up to 16384 vectors allowed.</td>
        <td>vectors: <br/>- If target field type is FloatVector, List\< List\<Float>gt; is required.<br/>- If target field type is BinaryVector vector, List\<ByteBuffer> is required.</td>
    </tr>
    <tr>
        <td>withRoundDecimal(Integer decimal)</td>
        <td>Specifies the decimal place for returned distance.<br/>Avaiable range: [-1, 6]<br/>Default value is -1, return all digits.</td>
        <td>decimal: How many digits reserved after the decimal point.</td>
    </tr>
    <tr>
        <td>withParams(String params)</td>
        <td>Specifies the parameters of search in JSON format. The followings are valid keys of param:<br/>1. special parameters for index, such as "nprobe", "ef", "search<em>k"<br/>2. metric type with key "metric</em>type" and a string value such as "L2", "IP".<br/>3. offset for pagination with key "offset" and an integer value</td>
        <td>params: A JSON format string for extra parameters.</td>
    </tr>
    <tr>
        <td>withIgnoreGrowing(Boolean ignoreGrowing)</td>
        <td>Ignore the growing segments to get best search performance. For the user case that don't require data visibility.<br/>Default is False.</td>
        <td>ignoreGrowing: Ignore growing segments or not.</td>
    </tr>
    <tr>
        <td>withBatchSize(Long batchSize)</td>
        <td>Specify a value to control the number of entities returned per batch. Must be a positive value.<br/>Default value is 1000, will return without batchSize.</td>
        <td>batchSize: A value to define the number of entities returned per batch</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a SearchIteratorParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `SearchIteratorParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<SearchIterator>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `SearchIterator` held by the R template.

## SearchIterator

Methods of `SearchIterator`:

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
     <td>N/A<br/></td>
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

R<SearchIterator> response = milvusClient.searchIterator(SearchIteratorParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withBatchSize(50L)
        .withVectorFieldName(VECTOR_FIELD)
        .withVectors(vectors)
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
