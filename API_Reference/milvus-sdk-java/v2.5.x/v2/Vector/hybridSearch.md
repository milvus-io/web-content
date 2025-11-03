# hybridSearch()

This operation performs multi-vector search on a collection and returns search results after reranking.

```java
public SearchResp hybridSearch(HybridSearchReq request)
```

## Request Syntax

```java
hybridSearch(HybridSearchReq.builder()
    .collectionName(String collectionName)
    .databasename(String databaseName)
    .partitionNames(List<String> partitionNames)
    .searchRequests(List<AnnSearchReq> searchRequests)
    .ranker(BaseRanker ranker)
    .limit(long limit)
    .outFields(List<String> outFields)
    .offset(long offset)
    .roundDecimal(int roundDecimal)
    .consistencyLevel(ConsistencyLevel consistencyLevel)
    .groupByFieldName(String fieldName)
    .groupSize(Integer groupSize)
    .strictGroupSize(Boolean strictGroupSize)
    .build()
)
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of an existing collection.

- `databasename(String databaseName)`

      Target database name(optional).

- `partitionNames(List<String> partitionNames)`

    A list of partition names.

- `searchRequests(List<AnnSearchReq> searchRequests)`

    A list of search requests, where each request is an **AnnSearchReq** object. Each request corresponds to a different vector field and a different set of search parameters.

    - `AnnSearchReq`

         A class representing an ANN search request. Its builder methods are as follows:

        - `vectorFieldName(String)`: The vector field to use in the request.

        - `topK(int)`: The maximum number of results to return in the request. When performing a hybrid search with multiple ANN search requests, the top results defined by **topK** from each request will be combined and re-ranked before returning the final search results.

        - `expr(String)`:  The expression to filter the results(Optional).

        - `vectors(List<BaseVec>)`: The query vector to search in the request. **BaseVector** is a base class for abstract vector classes. The following classes are derived from BaseVector. Choose the correct class as input according to DataType of the vector field.

            <table>
               <tr>
                 <th><p><strong>Class Name</strong></p></th>
                 <th><p><strong>Constructors</strong></p></th>
                 <th><p><strong>Description</strong></p></th>
               </tr>
               <tr>
                 <td><p><code>FloatVec</code></p></td>
                 <td><p><code>FloatVec(List&lt;Float&gt; data)</code></p><p><code>FloatVec(float&#91;&#93; data)</code></p></td>
                 <td><p>For <code>DataType.FloatVector</code> type field.</p></td>
               </tr>
               <tr>
                 <td><p><code>BinaryVec</code></p></td>
                 <td><p><code>BinaryVec(ByteBuffer data)</code></p><p><code>BinaryVec(byte&#91;&#93; data)</code></p></td>
                 <td><p>For <code>DataType.BinaryVector</code> type field.</p></td>
               </tr>
               <tr>
                 <td><p><code>Float16Vec</code></p></td>
                 <td><p><code>Float16Vec(ByteBuffer data)</code></p><p><code>Float16Vec(byte&#91;&#93; data)</code></p></td>
                 <td><p>For <code>DataType.Float16Vector</code> type field.</p></td>
               </tr>
               <tr>
                 <td><p><code>BFloat16Vec</code></p></td>
                 <td><p><code>BFloat16Vec(ByteBuffer data)</code></p><p><code>BFloat16Vec(byte&#91;&#93; data)</code></p></td>
                 <td><p>For <code>DataType.BFloat16Vector</code> type field.</p></td>
               </tr>
               <tr>
                 <td><p><code>SparseFloatVec</code></p></td>
                 <td><p><code>SparseFloatVec(SortedMap&lt;Long, Float&gt; data)</code></p></td>
                 <td><p>For <code>DataType.SparseFloatVector</code> type field.</p></td>
               </tr>
            </table>

    - `params(String)`

        A JSON dictionary format string of search parameters for the request.

- `ranker(BaseRanker ranker)`

    The reranking strategy to use for hybrid search. For details, refer to [Weighted Ranker](https://milvus.io/docs/weighted-ranker.md), [RRF Ranker](https://milvus.io/docs/rrf-ranker.md).

- `limit(long limit)`

     The total number of entities to return.

- `outFields(List<String> outFields)`

    A list of field names to include in each entity in return. The value defaults to null. If left unspecified, only the primary field is included.

- `offset(long offset)`

    The number of entities to skip before the search results returns. The sum of `offset` and `limit` should be less than 16,384.

- `roundDecimal(int roundDecimal)`

    The number of decimal places to which Milvus rounds the calculated distances. The value defaults to **-1**, indicating that Milvus skips rounding the calculated distances and returns the raw value.

- `consistencyLevel(ConsistencyLevel consistencyLevel)`

    The consistency level of the target collection. The value defaults to the one specified when you create the current collection.

- `groupByFieldName(String groupByFieldName)`

    Groups search results by a specified field to ensure diversity and avoid returning multiple results from the same group. For details, refer to [Grouping Search](https://milvus.io/docs/grouping-search.md#Grouping-Search).

- `groupSize(Integer groupSize)`

    The target number of entities to return within each group in a grouping search. For details, refer to [Grouping Search](https://milvus.io/docs/grouping-search.md#Grouping-Search).

- `strictGroupSize(Boolean strictGroupSize)`

    Controls whether group_size should be strictly enforced. For details, refer to [Grouping Search](https://milvus.io/docs/grouping-search.md#Grouping-Search).

**RETURN TYPE:**

*SearchResp*

**RETURNS:**

A **SearchResp** object representing specific search results with the specified output fields and relevance score.

**PARAMETERS:**

- **searchResults** (*List\&lt;List\&lt;SearchResult\&gt;\&gt;*)

    A list of SearchResp.SearchResult, the size of searchResults equals the number of query vectors of the search. Each `List<SearchResult>` is a top-K result of a query vector. Each SearchResult represents an entity hit by the search.

      Member of SearchResult:

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.service.vector.request.AnnSearchReq;
import io.milvus.v2.service.vector.request.HybridSearchReq;
import io.milvus.v2.service.vector.request.data.BinaryVec;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.request.data.SparseFloatVec;
import io.milvus.v2.service.vector.request.ranker.RRFRanker;
import io.milvus.v2.service.vector.response.SearchResp;

import java.nio.ByteBuffer;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Setup input
List<Float> floatVector = generateFolatVector();
ByteBuffer binaryVector = generateBinaryVector();
SortedMap<Long, Float> sparseVector = generateSparseVector();

List<AnnSearchReq> searchRequests = new ArrayList<>();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName("float_vector")
        .vectors(Collections.singletonList(new FloatVec(floatVector)))
        .params("{\"nprobe\": 10}")
        .topK(10)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName("binary_vector")
        .vectors(Collections.singletonList(new BinaryVec(binaryVector)))
        .topK(50)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName("sparse_vector")
        .vectors(Collections.singletonList(new SparseFloatVec(sparseVector)))
        .topK(100)
        .build());

// 3. Hybrid search
HybridSearchReq hybridSearchReq = HybridSearchReq.builder()
        .collectionName(randomCollectionName)
        .searchRequests(searchRequests)
        .ranker(new RRFRanker(20))
        .topK(10)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();
SearchResp searchResp = client.hybridSearch(hybridSearchReq);

List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
List<SearchResp.SearchResult> results = searchResults.get(0); // nq = 1, searchResults size is 1
for (SearchResp.SearchResult result : results) {
    System.out.printf("ID: %d, Score: %f, %s\n", (long)result.getId(), result.getScore(), result.getEntity().toString());
}
```
