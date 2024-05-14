# search()

The MilvusClient interface. This method conducts an approximate nearest neighbor (ANN) search on a vector field and pairs up with a Boolean expression to conduct filtering on scalar fields before searching.

```java
R<SearchResults> search(SearchParam requestParam);
```

## SearchParam

Use the `SearchParam.Builder` to construct a `SearchParam` object.

```java
import io.milvus.param.dml.SearchParam;
SearchParam.Builder builder = SearchParam.newBuilder();
```

Methods of `SearchParam.Builder`:

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
        <td>build()</td>
        <td>Construct a SearchParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `SearchParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<SearchResults>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns valid `SearchResults` held by the R template. You can use `SearchResultsWrapper` to get the results.

## SearchResultsWrapper

A tool class to encapsulate the `SearchResults`. 

```java
import io.milvus.response.SearchResultsWrapper;
SearchResultsWrapper wrapper = new SearchResultsWrapper(searchResults);
```

Methods of `SearchResultsWrapper`:

<table>
   <tr>
     <th><strong>Method</strong></th>
     <th><strong>Description</strong></th>
     <th><strong>Parameters</strong></th>
     <th><strong>Returns</strong></th>
   </tr>
   <tr>
     <td>getFieldData(String fieldName, int indexOfTarget)<br/></td>
     <td>Gets data for an output field which is specified by SearchParam.<br/> Throws ParamException if the field doesn't exist or indexOfTarget is illegal.<br/></td>
     <td>fieldName: A field name which is specified by the withOutFields() of SearchParam.<br/> indexOfTarget: The order number of a target vector.<br/></td>
     <td></td>
   </tr>
   <tr>
     <td>getIDScore(int indexOfTarget)</td>
     <td>Gets ID-score pairs returned by search().<br/> Throws ParamException if the indexOfTarget is illegal.<br/>Throws IllegalResponseException if the returned results are illegal.</td>
     <td>indexOfTarget: The order number of a target vector.<br/></td>
     <td>List\<IDScore></td>
   </tr>
   <tr>
     <td>getRowRecords(int indexOfTarget)</td>
     <td>Gets row records from the search result.<br/> The ID is put into a QueryResultsWrapper.RowRecord with key "id".<br/> The distance is put into a QueryResultsWrapper.RowRecord with key "distance".</td>
     <td>indexOfTarget: The order number of a target vector.</td>
     <td>List\<QueryResultsWrapper.RowRecord></td>
   </tr>
</table>

## IDScore

A tool class to hold a pair of ID and distance, along with values of the output fields.

Methods of `SearchResultsWrapper.IDScore`:

<table>
   <tr>
     <th><strong>Method</strong></th>
     <th><strong>Description</strong></th>
     <th><strong>Returns</strong></th>
   </tr>
   <tr>
     <td>getLongID()<br/></td>
     <td>Get integer ID if the primary key type is Int64.</td>
     <td>long<br/></td>
   </tr>
   <tr>
     <td>getStrID()</td>
     <td>Get string ID if the primary key type is VarChar.</td>
     <td>String</td>
   </tr>
   <tr>
     <td>getScore()</td>
     <td>Get distance value.</td>
     <td>float</td>
   </tr>
   <tr>
     <td>get(String keyName)</td>
     <td>Get a value by a key name. If the key name is a field name, return the value of this field.<br/>If the key name is in the dynamic field, return the value from the dynamic field.<br/>Throws ParamException if the key name doesn't exist.</td>
     <td>Object</td>
   </tr>
</table>

## Example

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
        .withParams("\{\"nprobe\":10,\"offset\":2, \"limit\":3}")
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

