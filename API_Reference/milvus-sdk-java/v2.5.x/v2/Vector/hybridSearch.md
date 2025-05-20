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
    .topK(int topK)
    .outFields(List<String> outFields)
    .roundDecimal(int roundDecimal)
    .consistencyLevel(ConsistencyLevel consistencyLevel)
    .build()
)
```

- `collectionName(String collectionName)`

    The name of an existing collection.

- `databasename(String databaseName)`

      Target database name(optional).

- `partitionNames(List<String> partitionNames)`

    A list of partition names.

- `searchRequests(List<AnnSearchReq> searchRequests)`

      A list of search requests, where each request is an **AnnSearchReq** object. Each request corresponds to a different vector field and a different set of search parameters.

- `topK(int topK)`

     The total number of entities to return.

- `outFields(List<String> outFields)`

      A list of field names to include in each entity in return. The value defaults to null. If left unspecified, only the primary field is included.

- `roundDecimal(int roundDecimal)`

      The number of decimal places that Milvus rounds the calculated distances to. The value defaults to **-1**, indicating that Milvus skips rounding the calculated distances and returns the raw value.

- `consistencyLevel(ConsistencyLevel consistencyLevel)`

      The consistency level of the target collection. The value defaults to the one specified when you create the current collection.

**RETURN TYPE:**

*SearchResp*

**RETURNS:**

A **SearchResp** object representing specific search results with the specified output fields and relevance score.

**PARAMETERS:**

- searchResults(List\<List\<SearchResult\>>)

      A list of SearchResp.SearchResult, the size of searchResults equals the number of query vectors of the search. Each List\<SearchResult\> is a topK result of a query vector. Each SearchResult represents an entity hit by the search.

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
