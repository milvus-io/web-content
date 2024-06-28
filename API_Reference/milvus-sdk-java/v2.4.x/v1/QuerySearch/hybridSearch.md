# hybridSearch()

The MilvusClient interface. This method conducts an approximate nearest neighbor (ANN) search on multiple vector fields and returns search results after reranking.

```java
R<SearchResults> hybridSearch(HybridSearchParam requestParam);
```

## HybridSearchParam

Use the `HybridSearchParam.Builder` to construct a `HybridSearchParam` object.

```java
import io.milvus.param.dml.HybridSearchParam;
HybridSearchParam.Builder builder = HybridSearchParam.newBuilder();
```

Methods of `HybridSearchParam.Builder`:

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
        <td>withPartitionNames(List&lt;String&gt; partitionNames)</td>
        <td>Sets partition names list to specify search scope (Optional).</td>
        <td>partitionNames: The name list of partitions to be searched.</td>
    </tr>
    <tr>
        <td>addPartitionName(String partitionName)</td>
        <td>Adds a partition to specify search scope (Optional).</td>
        <td>partitionName: A partition name to be searched.</td>
    </tr>
    <tr>
        <td>withOutFields(List&lt;String&gt; outFields)</td>
        <td>Specifies output scalar fields (Optional).</td>
        <td><br/>outFields: The name list of fields to be outputed.</td>
    </tr>
    <tr>
        <td>addOutField(String fieldName)</td>
        <td>Specifies an output scalar field (Optional).</td>
        <td>fieldName: An output field name.</td>
    </tr>
    <tr>
        <td>withTopK(Integer topK)</td>
        <td>Set topK value of ANN search.<br/>Avaiable range: [1, 16384]</td>
        <td>topK: The topk value.</td>
    </tr>
    <tr>
        <td>withRoundDecimal(Integer decimal)</td>
        <td>Specifies the decimal place for returned distance.<br/>Avaiable range: [-1, 6]<br/>Default value is -1, return all digits.</td>
        <td>decimal: How many digits reserved after the decimal point.</td>
    </tr>
    <tr>
        <td>addSearchRequest(AnnSearchParam searchParam)</td>
        <td>Adds a vector search request for a vector field. You can add</td>
        <td>searchParam: An AnnSearchParam object.</td>
    </tr>
    <tr>
        <td>withRanker(BaseRanker ranker)</td>
        <td>Set a ranker for rearranging number of limit results.<br/>Avaiable:<br/>- RRFRanker<br/>- WeightedRanker</td>
        <td>ranker: The concrete ranker object.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a SearchParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `HybridSearchParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## AnnSearchParam

The sub-request of `hybridSearch()`.

Use the `AnnSearchParam.Builder` to construct an `AnnSearchParam` object.

```java
import io.milvus.param.dml.AnnSearchParam;
AnnSearchParam.Builder builder = AnnSearchParam.newBuilder();
```

Methods of `AnnSearchParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
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
        <td>withParams(String params)</td>
        <td>Specifies the parameters of search in JSON format. The followings are valid keys of param:<br/>1. special parameters for index, such as "nprobe", "ef", "search<em>k"<br/>2. metric type with key "metric</em>type" and a string value such as "L2", "IP".<br/>3. offset for pagination with key "offset" and an integer value</td>
        <td>params: A JSON format string for extra parameters.</td>
    </tr>
    <tr>
        <td>withFloatVectors(List&lt;List&lt;Float&gt;&gt; vectors)</td>
        <td>Set the target vectors to search FloatVector field. Up to 16384 vectors allowed.<br/>Note: this method will reset the target vectors of SearchParam. To input vectors, call it only once.</td>
        <td>vectors: The target vectors</td>
    </tr>
    <tr>
        <td>withBinaryVectors(List&lt;ByteBuffer&gt; vectors)</td>
        <td>Set the target vectors to search BinaryVector field. Up to 16384 vectors allowed.<br/>Note: this method will reset the target vectors of SearchParam. To input vectors, call it only once.</td>
        <td>vectors: The target vectors</td>
    </tr>
    <tr>
        <td>withFloat16Vectors(List&lt;ByteBuffer&gt; vectors)</td>
        <td>Set the target vectors to search Float16Vector field. Up to 16384 vectors allowed.<br/><br/>Note: this method will reset the target vectors of SearchParam. To input vectors, call it only once.</td>
        <td>vectors: The target vectors</td>
    </tr>
    <tr>
        <td>withBFloat16Vectors(List&lt;List&lt;Float&gt;&gt; vectors)</td>
        <td>Set the target vectors to search BFloat16Vector field. Up to 16384 vectors allowed.<br/><br/>Note: this method will reset the target vectors of SearchParam. To input vectors, call it only once.</td>
        <td>vectors: The target vectors</td>
    </tr>
    <tr>
        <td>withSparseFloatVectors(List&lt;SortedMap&lt;Long, Float&gt;&gt; vectors)</td>
        <td>Set the target vectors to search SparseFloatVector field. Up to 16384 vectors allowed.<br/><br/>Note: this method will reset the target vectors of SearchParam. To input vectors, call it only once.</td>
        <td>vectors: The target vectors</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a SearchParam object.</td>
        <td>N/A</td>
    </tr>
</table>

## RRFRanker

The RRF reranking strategy, which merges results from multiple searches, favoring items that consistently appear.

Use the `RRFRanker.Builder` to construct an `RRFRanker` object.

```java
import io.milvus.param.dml.ranker.RRFRanker;
RRFRanker.Builder builder = RRFRanker.newBuilder();
```

Methods of `RRFRanker.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withK(Integer k)</td>
        <td>Sets k factor for RRF. Value cannot be negative. Default value is 60.<br/>score = 1 / (k + float32(rank<em>i+1))<br/>rank</em>i is the rank in each field<br/></td>
        <td>k: The k factor value.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a RRFRanker object.</td>
        <td>N/A</td>
    </tr>
</table>

## WeightedRanker

The average weighted scoring reranking strategy, which prioritizes vectors based on relevance, averaging their significance.

Use the `WeightedRankerWeightedRanker.Builder` to construct a `WeightedRanker` object.

```java
import io.milvus.param.dml.ranker.WeightedRanker;
WeightedRanker.Builder builder = WeightedRanker.newBuilder();
```

Methods of `WeightedRanker.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withWeights(List&lt;Float&gt; weights)</td>
        <td>Assign weights for each AnnSearchParam. The length of weights must be equal to number of AnnSearchParam.<br/>You can assign any float value for weight, the sum of weight values can exceed 1.<br/>The distance/similarity values of each field will be mapped into a range of [0,1],<br/>and score = sum(weights[i] * distance<em>i</em>in_[0,1]).<br/></td>
        <td>weights: The weight values.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a WeightedRanker object.</td>
        <td>N/A</td>
    </tr>
</table>

## Returns

This method catches all the exceptions and returns an `R<SearchResults>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns valid `SearchResults` held by the `R` template. You can use `SearchResultsWrapper` to get the results.

## Example

```java
import io.milvus.param.dml.*;
import io.milvus.param.dml.ranker.*;
import io.milvus.grpc.SearchResults;

AnnSearchParam req1 = AnnSearchParam.newBuilder()
        .withVectorFieldName(FLOAT_VECTOR_FIELD)
        .withFloatVectors(floatVectors)
        .withMetricType(MetricType.IP)
        .withParams("\{\"nprobe\": 32}")
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
