# hybridSearch()

The MilvusClient interface. This method conducts an approximate nearest neighbor (ANN) search on multiple vector fields and returns search results after reranking.

```java
R<SearchResults> hybridSearch(HybridSearchParam requestParam);
```

#### HybridSearchParam

Use the `HybridSearchParam.Builder` to construct a `HybridSearchParam` object.

```java
import io.milvus.param.dml.HybridSearchParam;
HybridSearchParam.Builder builder = HybridSearchParam.newBuilder();
```

Methods of `HybridSearchParam.Builder`:

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
        <td><p>withTopK(Integer topK)</p></td>
        <td><p>Set topK value of ANN search.<br/>Avaiable range: [1, 16384]</p></td>
        <td><p>topK: The topk value.</p></td>
    </tr>
    <tr>
        <td><p>withRoundDecimal(Integer decimal)</p></td>
        <td><p>Specifies the decimal place for returned distance.<br/>Avaiable range: [-1, 6]<br/>Default value is -1, return all digits.</p></td>
        <td><p>decimal: How many digits reserved after the decimal point.</p></td>
    </tr>
    <tr>
        <td><p>addSearchRequest(AnnSearchParam searchParam)</p></td>
        <td><p>Adds a vector search request for a vector field. You can add</p></td>
        <td><p>searchParam: An AnnSearchParam object.</p></td>
    </tr>
    <tr>
        <td><p>withRanker(BaseRanker ranker)</p></td>
        <td><p>Set a ranker for rearranging number of limit results.<br/>Avaiable:<br/>- RRFRanker<br/>- WeightedRanker</p></td>
        <td><p>ranker: The concrete ranker object.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a SearchParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `HybridSearchParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### AnnSearchParam

The sub-request of `hybridSearch()`.

Use the `AnnSearchParam.Builder` to construct an `AnnSearchParam` object.

```java
import io.milvus.param.dml.AnnSearchParam;
AnnSearchParam.Builder builder = AnnSearchParam.newBuilder();
```

Methods of `AnnSearchParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
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
        <td><p>withParams(String params)</p></td>
        <td><p>Specifies the parameters of search in JSON format. The followings are valid keys of param:<br/>1. special parameters for index, such as "nprobe", "ef", "search<em>k"<br/>2. metric type with key "metric</em>type" and a string value such as "L2", "IP".<br/>3. offset for pagination with key "offset" and an integer value</p></td>
        <td><p>params: A JSON format string for extra parameters.</p></td>
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
        <td><p>build()</p></td>
        <td><p>Construct a SearchParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

#### RRFRanker

The RRF reranking strategy, which merges results from multiple searches, favoring items that consistently appear.

Use the `RRFRanker.Builder` to construct an `RRFRanker` object.

```java
import io.milvus.param.dml.ranker.RRFRanker;
RRFRanker.Builder builder = RRFRanker.newBuilder();
```

Methods of `RRFRanker.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withK(Integer k)</p></td>
        <td><p>Sets k factor for RRF. Value cannot be negative. Default value is 60.<br/>score = 1 / (k + float32(rank<em>i+1))<br/>rank</em>i is the rank in each field</p></td>
        <td><p>k: The k factor value.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a RRFRanker object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

#### WeightedRanker

The average weighted scoring reranking strategy, which prioritizes vectors based on relevance, averaging their significance.

Use the `WeightedRankerWeightedRanker.Builder` to construct a `WeightedRanker` object.

```java
import io.milvus.param.dml.ranker.WeightedRanker;
WeightedRanker.Builder builder = WeightedRanker.newBuilder();
```

Methods of `WeightedRanker.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withWeights(List&lt;Float> weights)</p></td>
        <td><p>Assign weights for each AnnSearchParam. The length of weights must be equal to number of AnnSearchParam.<br/>You can assign any float value for weight, the sum of weight values can exceed 1.<br/>The distance/similarity values of each field will be mapped into a range of [0,1],<br/>and score = sum(weights[i] * distance<em>i</em>in_[0,1]).</p></td>
        <td><p>weights: The weight values.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a WeightedRanker object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

#### Returns

This method catches all the exceptions and returns an `R<SearchResults>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns valid `SearchResults` held by the `R` template. You can use `SearchResultsWrapper` to get the results.

#### Example

```java
import io.milvus.param.dml.*;
import io.milvus.param.dml.ranker.*;
import io.milvus.grpc.SearchResults;

AnnSearchParam req1 = AnnSearchParam.newBuilder()
        .withVectorFieldName(FLOAT_VECTOR_FIELD)
        .withFloatVectors(floatVectors)
        .withMetricType(MetricType.IP)
        .withParams("{\"nprobe\": 32}")
        .withTopK(10)
        .build();

AnnSearchParam req2 = AnnSearchParam.newBuilder()
        .withVectorFieldName(BINARY_VECTOR_FIELD)
        .withBinaryVectors(binaryVectors)
        .withMetricType(MetricType.HAMMING)
        .withTopK(15)
        .build();

HybridSearchParam searchParam = HybridSearchParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .addOutField(FLOAT_VECTOR_FIELD)
        .addSearchRequest(req1)
        .addSearchRequest(req2)
        .withTopK(5)
        .withConsistencyLevel(ConsistencyLevelEnum.STRONG)
        .withRanker(RRFRanker.newBuilder()
                .withK(2)
                .build())
        .build();

R<SearchResults> response = milvusClient.hybridSearch(searchParam);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
