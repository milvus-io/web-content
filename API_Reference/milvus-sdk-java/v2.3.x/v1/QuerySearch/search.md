# search()

The MilvusClient interface. This method conducts an approximate nearest neighbor (ANN) search on a vector field and pairs up with a Boolean expression to conduct filtering on scalar fields before searching.

```java
R<SearchResults> search(SearchParam requestParam);
```

#### SearchParam

Use the `SearchParam.Builder` to construct a `SearchParam` object.

```java
import io.milvus.param.dml.SearchParam;
SearchParam.Builder builder = SearchParam.newBuilder();
```

Methods of `SearchParam.Builder`:

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
        <td><p>Set the target vectors. Up to 16384 vectors allowed.</p></td>
        <td><p>vectors: <br/>- If target field type is FloatVector, List&lt; List&lt;Float>gt; is required.<br/>- If target field type is BinaryVector vector, List&lt;ByteBuffer> is required.</p></td>
    </tr>
    <tr>
        <td><p>withRoundDecimal(Integer decimal)</p></td>
        <td><p>Specifies the decimal place for returned distance.<br/>Avaiable range: [-1, 6]<br/>Default value is -1, return all digits.</p></td>
        <td><p>decimal: How many digits reserved after the decimal point.</p></td>
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
        <td><p>build()</p></td>
        <td><p>Construct a SearchParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `SearchParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<SearchResults>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns valid `SearchResults` held by the R template. You can use `SearchResultsWrapper` to get the results.

#### SearchResultsWrapper

A tool class to encapsulate the `SearchResults`. 

```java
import io.milvus.response.SearchResultsWrapper;
SearchResultsWrapper wrapper = new SearchResultsWrapper(searchResults);
```

Methods of `SearchResultsWrapper`:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Parameters</strong></p></th>
     <th><p><strong>Returns</strong></p></th>
   </tr>
   <tr>
     <td><p>getFieldData(String fieldName, int indexOfTarget)</p></td>
     <td><p>Gets data for an output field which is specified by SearchParam.</p><p>Throws ParamException if the field doesn't exist or indexOfTarget is illegal.</p></td>
     <td><p>fieldName: A field name which is specified by the withOutFields() of SearchParam.</p><p>indexOfTarget: The order number of a target vector.</p></td>
     <td><ul><li>Return List&lt;List&lt;Float>gt; for FloatVector field.</li><li>Return List&lt;ByteBuffer> for BinaryVector field.</li><li>Return List&lt;Long> for int64 field.</li><li>Return List&lt;Integer> for int32/int16/int8 field.</li><li>Return List&lt;Boolean> for boolean field.</li><li>Return List&lt;Float> for float field.</li><li>Return List&lt;Double> for double field.</li><li>Return List&lt;String> for varchar field.</li></ul></td>
   </tr>
   <tr>
     <td><p>getIDScore(int indexOfTarget)</p></td>
     <td><p>Gets ID-score pairs returned by search().</p><p>Throws ParamException if the indexOfTarget is illegal.Throws IllegalResponseException if the returned results are illegal.</p></td>
     <td><p>indexOfTarget: The order number of a target vector.</p></td>
     <td><p>List&lt;IDScore></p></td>
   </tr>
   <tr>
     <td><p>getRowRecords(int indexOfTarget)</p></td>
     <td><p>Gets row records from the search result.</p><p>The ID is put into a QueryResultsWrapper.RowRecord with key "id".</p><p>The distance is put into a QueryResultsWrapper.RowRecord with key "distance".</p></td>
     <td><p>indexOfTarget: The order number of a target vector.</p></td>
     <td><p>List&lt;QueryResultsWrapper.RowRecord></p></td>
   </tr>
</table>

#### IDScore

A tool class to hold a pair of ID and distance, along with values of the output fields.

Methods of `SearchResultsWrapper.IDScore`:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Returns</strong></p></th>
   </tr>
   <tr>
     <td><p>getLongID()</p></td>
     <td><p>Get integer ID if the primary key type is Int64.</p></td>
     <td><p>long</p></td>
   </tr>
   <tr>
     <td><p>getStrID()</p></td>
     <td><p>Get string ID if the primary key type is VarChar.</p></td>
     <td><p>String</p></td>
   </tr>
   <tr>
     <td><p>getScore()</p></td>
     <td><p>Get distance value.</p></td>
     <td><p>float</p></td>
   </tr>
   <tr>
     <td><p>get(String keyName)</p></td>
     <td><p>Get a value by a key name. If the key name is a field name, return the value of this field.If the key name is in the dynamic field, return the value from the dynamic field.Throws ParamException if the key name doesn't exist.</p></td>
     <td><p>Object</p></td>
   </tr>
</table>

#### Example

```java
import io.milvus.param.dml.*;
import io.milvus.response.SearchResultsWrapper;
import io.milvus.grpc.SearchResults;

SearchParam param = SearchParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withMetricType(MetricType.IP)
        .withTopK(10)
        .withVectors(targetVectors)
        .withVectorFieldName("field1")
        .withConsistencyLevel(ConsistencyLevelEnum.EVENTUALLY)
        .withParams("{\"nprobe\":10,\"offset\":2, \"limit\":3}")
        .build();
R<SearchResults> response = client.search(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

SearchResultsWrapper wrapper = new SearchResultsWrapper(response.getData().getResults());
System.out.println("Search results:");
for (int i = 0; i < targetVectors.size(); ++i) {
    List<SearchResultsWrapper.IDScore> scores = results.getIDScore(i);
    for (SearchResultsWrapper.IDScore score:scores) {
        System.out.println(score);
    }
}
```

