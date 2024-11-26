---
id: single-vector-search.md
order: 1
summary: This article describes how to search for vectors in a Milvus collection using a single query vector.
title: Ba​sic ANN Search
---

# Ba​sic ANN Search

Based on an index file recording the sorted order of vector embeddings, the Approximate Nearest Neighbor (ANN) search locates a subset of vector embeddings based on the query vector carried in a received search request, compares the query vector with those in the subgroup, and returns the most similar results. With ANN search, Zilliz Cloud provides an efficient search experience. This page helps you to learn how to conduct basic ANN searches.​

## Overview​

The ANN and the k-Nearest Neighbors (kNN) search are the usual methods in vector similarity searches. In a kNN search, you must compare all vectors in a vector space with the query vector carried in the search request before figuring out the most similar ones, which is time-consuming and resource-intensive.​

Unlike kNN searches, an ANN search algorithm asks for an **index** file that records the sorted order of vector embeddings. When a search request comes in, you can use the index file as a reference to quickly locate a subgroup probably containing vector embeddings most similar to the query vector. Then, you can use the specified **metric type** to measure the similarity between the query vector and those in the subgroup, sort the group members based on similarity to the query vector, and figure out the **top-K** group members.​

ANN searches depend on pre-built indexes, and the search throughput, memory usage, and search correctness may vary with the index types you choose. You need to balance search performance and correctness. ​

To reduce the learning curve, Zilliz Cloud provides **AUTOINDEX**. With **AUTOINDEX**, Zilliz Cloud can analyze the data distribution within your collection while building the index and sets the most optimized index parameters based on the analysis to strike a balance between search performance and correctness. ​

For details on AUTOINDEX and applicable metric types, refer to [​AUTOINDEX](https://milvus.io/docs/glossary.md#Auto-Index) and [​Metric Types](metric.md). In this section, you will find detailed information about the following topics:​

- [Single-vector search](#Single-Vector-Search)​

- [Bulk-vector search](#Bulk-Vector-Search)​

- [ANN search in partition](#ANN-Search-in-Partition)​

- [Use output fields](#Use-Output-Fields)​

- [Use limit and offset](#Use-Limit-and-Offset)​

- [Enhancing ANN search](#Enhance-ANN-Search)​

## Single-Vector Search​

In ANN searches, a single-vector search refers to a search that involves only one query vector. Based on the pre-built index and the metric type carried in the search request, Zilliz Cloud will find the top-K vectors most similar to the query vector.​

In this section, you will learn how to conduct a single-vector search. The code snippet assumes you have created a collection in a [quick-setup](create-collection-instantly#Quick-Setup) manner. The search request carries a single query vector and asks Zilliz Cloud to use Inner Product (IP) to calculate the similarity between query vectors and vectors in the collection and returns the three most similar ones.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
from pymilvus import MilvusClient​
​
client = MilvusClient(​
    uri="http://localhost:19530",​
    token="root:Milvus"​
)​
​
# 4. Single vector search​
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
res = client.search(​
    collection_name="my_collection",​
    anns_field="vector",​
    data=[query_vector],​
    limit=3,​
    search_params={"metric_type": "IP"}​
)​
​
for hits in res:​
    for hit in hits:​
        print(hit)​
​
# [​
#     [​
#         {​
#             "id": 551,​
#             "distance": 0.08821295201778412,​
#             "entity": {}​
#         },​
#         {​
#             "id": 296,​
#             "distance": 0.0800950899720192,​
#             "entity": {}​
#         },​
#         {​
#             "id": 43,​
#             "distance": 0.07794742286205292,​
#             "entity": {}​
#         }​
#     ]​
# ]​

```

```java
import io.milvus.v2.client.ConnectConfig;​
import io.milvus.v2.client.MilvusClientV2;​
import io.milvus.v2.service.vector.request.SearchReq;​
import io.milvus.v2.service.vector.request.data.FloatVec;​
import io.milvus.v2.service.vector.response.SearchResp;​
​
import java.util.*;​
​
MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()​
        .uri("http://localhost:19530")​
        .token("root:Milvus")​
        .build());​
    ​
FloatVec queryVector = new FloatVec(new float[]{0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f});​
SearchReq searchReq = SearchReq.builder()​
        .collectionName("my_collection")​
        .data(Collections.singletonList(queryVector))​
        .topK(3)​
        .build();​
​
SearchResp searchResp = client.search(searchReq);​
​
List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();​
for (List<SearchResp.SearchResult> results : searchResults) {​
    System.out.println("TopK results:");​
    for (SearchResp.SearchResult result : results) {​
        System.out.println(result);​
    }​
}​
​
// Output​
// TopK results:​
// SearchResp.SearchResult(entity={}, score=0.95944905, id=5)​
// SearchResp.SearchResult(entity={}, score=0.8689616, id=1)​
// SearchResp.SearchResult(entity={}, score=0.866088, id=7)​

```

```go
import (​
    "context"​
    "fmt"​
    "log"​
​
    "github.com/milvus-io/milvus/client/v2"​
    "github.com/milvus-io/milvus/client/v2/entity"​
)​
​
func ExampleClient_Search_basic() {​
    ctx, cancel := context.WithCancel(context.Background())​
    defer cancel()​
​
    milvusAddr := "127.0.0.1:19530"​
    token := "root:Milvus"​
​
    cli, err := client.New(ctx, &client.ClientConfig{​
        Address: milvusAddr,​
        APIKey:  token,​
    })​
    if err != nil {​
        log.Fatal("failed to connect to milvus server: ", err.Error())​
    }​
​
    defer cli.Close(ctx)​
​
    queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}​
​
    resultSets, err := cli.Search(ctx, client.NewSearchOption(​
        "my_collection", // collectionName​
        3,             // limit​
        []entity.Vector{entity.FloatVector(queryVector)},​
    ))​
    if err != nil {​
        log.Fatal("failed to perform basic ANN search collection: ", err.Error())​
    }​
​
    for _, resultSet := range resultSets {​
        log.Println("IDs: ", resultSet.IDs)​
        log.Println("Scores: ", resultSet.Scores)​
    }​
    // Output:​
    // IDs:​
    // Scores:​
}​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
const address = "http://localhost:19530";​
const token = "root:Milvus";​
const client = new MilvusClient({address, token});​
​
// 4. Single vector search​
var query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],​
​
res = await client.search({​
    collection_name: "my_collection",​
    data: query_vector,​
    limit: 3, // The number of results to return​
})​
​
console.log(res.results)​
​
// [​
//   { score: 0.08821295201778412, id: '551' },​
//   { score: 0.0800950899720192, id: '296' },​
//   { score: 0.07794742286205292, id: '43' }​
// ]​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "quick_setup",​
    "data": [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    "annsField": "vector",​
    "limit": 3​
}'​
​
# {​
#     "code": 0,​
#     "data": [​
#         {​
#             "distance": 0.08821295201778412,​
#             "id": 551​
#         },​
#         {​
#             "distance": 0.0800950899720192,​
#             "id": 296​
#         },​
#         {​
#             "distance": 0.07794742286205292,​
#             "id": 43​
#         }​
#     ]​
# }​

```

Milvus ranks the search results by their similarity scores to the query vector in descending order. The similarity score is also termed the distance to the query vector, and its value ranges vary with the metric types in use.​

The following table lists the applicable metric types and the corresponding distance ranges.​

<table data-block-token="CTYBd8RSbogpjGxSmRCc937Qnud"><thead><tr><th data-block-token="Mk6idXTyjokI5FxIHgzc1FmhnLf" colspan="1" rowspan="1"><p data-block-token="DT2rdNtuYoJZPwxsZMCc9zTDnZf">Metric Type​</p>

</th><th data-block-token="DlbbdGOQ8oy3DJxe57tcR4f9nee" colspan="1" rowspan="1"><p data-block-token="CnVsdS8KboXGUGx9rQFcB0G5nXb">Characteristics​</p>

</th><th data-block-token="QhwVdn1JvoCPd5x8Pxrck2QOnEf" colspan="1" rowspan="1"><p data-block-token="GQ4cdd3n4oNnjOxD9uhc5SCpnyh">Distance Range​</p>

</th></tr></thead><tbody><tr><td data-block-token="SDGPdrT6ioYrZtx0jn6chigDnRe" colspan="1" rowspan="1"><p data-block-token="BF8Wd7b57oSJxHxeMUvchxNtntg"><code>L2</code>​</p>

</td><td data-block-token="R8zodDVyco81tkxgY3Lc3eNpnDe" colspan="1" rowspan="1"><p data-block-token="WOYAdjefpojiUMxhvFxcFzYun5d">A smaller value indicates a higher similarity.​</p>

</td><td data-block-token="FDRXdODH5oFZzixRMtXcJTBbnLe" colspan="1" rowspan="1"><p data-block-token="HKPedGZntoh3hDxY587ch8F9nzg">[0, ∞)​</p>

</td></tr><tr><td data-block-token="QqHidyCE9ozC6Gxyx28cunhcnvg" colspan="1" rowspan="1"><p data-block-token="FVgcdXpbMolSpdx1ZRSc7sO1nGD"><code>IP</code>​</p>

</td><td data-block-token="Rfa8dK5VHowbyQxk1iEcZUrUn5f" colspan="1" rowspan="1"><p data-block-token="L7NTdDhmkozbcwx3ek1cWU8WnCh">A greater value indicates a higher similarity.​</p>

</td><td data-block-token="NhQ5d5F7Bo08Ocxeugicxqh2nrb" colspan="1" rowspan="1"><p data-block-token="E3Etd3rT1o2pwMxeZSdcB0Lpnlf">[-1, 1]​</p>

</td></tr><tr><td data-block-token="QasQdmuapouIonxvyNJcBp89nNU" colspan="1" rowspan="1"><p data-block-token="MqFDdgMTgo5weSxNIRJc6XLBn8S"><code>COSINE</code>​</p>

</td><td data-block-token="O7hJdRazyo2YpYxBP9AcD1h8nqe" colspan="1" rowspan="1"><p data-block-token="CbhXdgXP3o8lAhxxwchcIvp3nze">A greater value indicates a higher similarity.​</p>

</td><td data-block-token="KrMvdljV3o6KoNxghnZcBBLDnNK" colspan="1" rowspan="1"><p data-block-token="KGZVdGhL9oqfSHxOVF7cg3b4nEh">[-1, 1]​</p>

</td></tr><tr><td data-block-token="OSJAd3zrsoPBBMxvmRtc5vpunnh" colspan="1" rowspan="1"><p data-block-token="W8thd8nk3oRpLyxAKrGciKANnJe"><code>JACCARD</code> ​</p>

</td><td data-block-token="PfMKdBztaoD5e1xKowmc8bUPnOe" colspan="1" rowspan="1"><p data-block-token="ZHAPdWjEsowodbxCnVGc38Qln9f">A smaller value indicates a higher similarity.​</p>

</td><td data-block-token="FtMsd7sd4otaEQxF4d3ctRR9nFb" colspan="1" rowspan="1"><p data-block-token="ThTkdBR5roENdsxTVk4cLlTvniy">[0, 1]​</p>

</td></tr><tr><td data-block-token="BQcBdYGZWolZuTxijxmchefJnme" colspan="1" rowspan="1"><p data-block-token="Kowbdw3mRot9cAxg9yScuHlandh"><code>HAMMING</code> ​</p>

</td><td data-block-token="BNYxdVEuVoqd4jxves5cQCXdnoe" colspan="1" rowspan="1"><p data-block-token="Tvghdcmo2omlhUx39tucVUPZnEh">A smaller value indicates a higher similarity.​</p>

</td><td data-block-token="YKW8dTla0oe7xdx4Hfjc0i9tned" colspan="1" rowspan="1"><p data-block-token="CzHkdNE2yoWu5ExHtXfcY0G9n2x">[0, dim(vector)]​</p>

</td></tr></tbody></table>

## Bulk-Vector Search​

Similarly, you can include multiple query vectors in a search request. Zilliz Cloud will conduct ANN searches for the query vectors in parallel and return two sets of results.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
# 7. Search with multiple vectors​
# 7.1. Prepare query vectors​
query_vectors = [​
    [0.041732933, 0.013779674, -0.027564144, -0.013061441, 0.009748648],​
    [0.0039737443, 0.003020432, -0.0006188639, 0.03913546, -0.00089768134]​
]​
​
# 7.2. Start search​
res = client.search(​
    collection_name="my_collection",​
    data=query_vectors,​
    limit=3,​
)​
​
for hits in res:​
    print("TopK results:")​
    for hit in hits:​
        print(hit)​
​
# Output​
#​
# [​
#     [​
#         {​
#             "id": 551,​
#             "distance": 0.08821295201778412,​
#             "entity": {}​
#         },​
#         {​
#             "id": 296,​
#             "distance": 0.0800950899720192,​
#             "entity": {}​
#         },​
#         {​
#             "id": 43,​
#             "distance": 0.07794742286205292,​
#             "entity": {}​
#         }​
#     ],​
#     [​
#         {​
#             "id": 730,​
#             "distance": 0.04431751370429993,​
#             "entity": {}​
#         },​
#         {​
#             "id": 333,​
#             "distance": 0.04231833666563034,​
#             "entity": {}​
#         },​
#         {​
#             "id": 232,​
#             "distance": 0.04221535101532936,​
#             "entity": {}​
#         }​
#     ]​
# ]​
​

```

```java
import io.milvus.v2.service.vector.request.SearchReq​
import io.milvus.v2.service.vector.request.data.BaseVector;​
import io.milvus.v2.service.vector.request.data.FloatVec;​
import io.milvus.v2.service.vector.response.SearchResp​
​
List<BaseVector> queryVectors = Arrays.asList(​
        new FloatVec(new float[]{0.041732933f, 0.013779674f, -0.027564144f, -0.013061441f, 0.009748648f}),​
        new FloatVec(new float[]{0.0039737443f, 0.003020432f, -0.0006188639f, 0.03913546f, -0.00089768134f})​
);​
SearchReq searchReq = SearchReq.builder()​
        .collectionName("quick_setup")​
        .data(queryVectors)​
        .topK(3)​
        .build();​
​
SearchResp searchResp = client.search(searchReq);​
​
List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();​
for (List<SearchResp.SearchResult> results : searchResults) {​
    System.out.println("TopK results:");​
    for (SearchResp.SearchResult result : results) {​
        System.out.println(result);​
    }​
}​
​
// Output​
// TopK results:​
// SearchResp.SearchResult(entity={}, score=0.49548206, id=1)​
// SearchResp.SearchResult(entity={}, score=0.320147, id=3)​
// SearchResp.SearchResult(entity={}, score=0.107413776, id=6)​
// TopK results:​
// SearchResp.SearchResult(entity={}, score=0.5678123, id=6)​
// SearchResp.SearchResult(entity={}, score=0.32368967, id=2)​
// SearchResp.SearchResult(entity={}, score=0.24108477, id=3)​

```

```javascript
// 7. Search with multiple vectors​
const query_vectors = [​
    [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], ​
    [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]​
]​
​
res = await client.search({​
    collection_name: "quick_setup",​
    vectors: query_vectors,​
    limit: 5,​
})​
​
console.log(res.results)​
​
// Output​
// ​
// [​
//   [​
//     { score: 0.08821295201778412, id: '551' },​
//     { score: 0.0800950899720192, id: '296' },​
//     { score: 0.07794742286205292, id: '43' }​
//   ],​
//   [​
//     { score: 0.04431751370429993, id: '730' },​
//     { score: 0.04231833666563034, id: '333' },​
//     { score: 0.04221535101532936, id: '232' },​
//   ]​
// ]​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "quick_setup",​
    "data": [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],​
        [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]​
    ],​
    "annsField": "vector",​
    "limit": 3​
}'​
​
# {​
#     "code": 0,​
#     "data": [​
#         [​
#           {​
#               "distance": 0.08821295201778412,​
#               "id": 551​
#           },​
#           {​
#               "distance": 0.0800950899720192,​
#               "id": 296​
#           },​
#           {​
#               "distance": 0.07794742286205292,​
#               "id": 43​
#           }​
#         ],​
#         [​
#           {​
#               "distance": 0.04431751370429993,​
#               "id": 730​
#           },​
#           {​
#               "distance": 0.04231833666563034,​
#               "id": 333​
#           },​
#           {​
#               "distance": 0.04221535101532936,​
#               "id": 232​
#           }​
#        ]​
#     ]​
# }​

```

## ANN Search in Partition​

Suppose you have created multiple partitions in a collection, and you can narrow the search scope to a specific number of partitions. In that case, you can include the target partition names in the search request to restrict the search scope within the specified partitions. Reducing the number of partitions involved in the search improves search performance.​

The following code snippet assumes a partition named **PartitionA** in your collection.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
# 4. Single vector search​
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
res = client.search(​
    collection_name="my_collection",​
    # highlight-next-line​
    partition_names=["partitionA"],​
    data=[query_vector],​
    limit=3,​
)​
​
for hits in res:​
    print("TopK results:")​
    for hit in hits:​
        print(hit)​
​
# [​
#     [​
#         {​
#             "id": 551,​
#             "distance": 0.08821295201778412,​
#             "entity": {}​
#         },​
#         {​
#             "id": 296,​
#             "distance": 0.0800950899720192,​
#             "entity": {}​
#         },​
#         {​
#             "id": 43,​
#             "distance": 0.07794742286205292,​
#             "entity": {}​
#         }​
#     ]​
# ]​

```

```java
import io.milvus.v2.service.vector.request.SearchReq​
import io.milvus.v2.service.vector.request.data.FloatVec;​
import io.milvus.v2.service.vector.response.SearchResp​
​
FloatVec queryVector = new FloatVec(new float[]{0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f});​
SearchReq searchReq = SearchReq.builder()​
        .collectionName("quick_setup")​
        .partitionNames(Collections.singletonList("partitionA"))​
        .data(Collections.singletonList(queryVector))​
        .topK(3)​
        .build();​
​
SearchResp searchResp = client.search(searchReq);​
​
List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();​
for (List<SearchResp.SearchResult> results : searchResults) {​
    System.out.println("TopK results:");​
    for (SearchResp.SearchResult result : results) {​
        System.out.println(result);​
    }​
}​
​
// Output​
// TopK results:​
// SearchResp.SearchResult(entity={}, score=0.6395302, id=13)​
// SearchResp.SearchResult(entity={}, score=0.5408028, id=12)​
// SearchResp.SearchResult(entity={}, score=0.49696884, id=17)​

```

```javascript
// 4. Single vector search​
var query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],​
​
res = await client.search({​
    collection_name: "quick_setup",​
    // highlight-next-line​
    partition_names: ["partitionA"],​
    data: query_vector,​
    limit: 3, // The number of results to return​
})​
​
console.log(res.results)​
​
// [​
//   { score: 0.08821295201778412, id: '551' },​
//   { score: 0.0800950899720192, id: '296' },​
//   { score: 0.07794742286205292, id: '43' }​
// ]​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "quick_setup",​
    "partitionNames": ["partitionA"],​
    "data": [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    "annsField": "vector",​
    "limit": 3​
}'​
​
# {​
#     "code": 0,​
#     "data": [​
#         {​
#             "distance": 0.08821295201778412,​
#             "id": 551​
#         },​
#         {​
#             "distance": 0.0800950899720192,​
#             "id": 296​
#         },​
#         {​
#             "distance": 0.07794742286205292,​
#             "id": 43​
#         }​
#     ]​
# }​

```

## Use Output Fields​

In a search result, Zilliz Cloud includes the primary field values and similarity distances/scores of the entities that contain the top-K vector embeddings by default. You can include the target field names in a search request as the output fields to make the search results carry the values from other fields in these entities.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
# 4. Single vector search​
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],​
​
res = client.search(​
    collection_name="quick_setup",​
    data=[query_vector],​
    limit=3, # The number of results to return​
    search_params={"metric_type": "IP"}，​
    # highlight-next-line​
    output_fields=["color"]​
)​
​
print(res)​
​
# [​
#     [​
#         {​
#             "id": 551,​
#             "distance": 0.08821295201778412,​
#             "entity": {​
#                 "color": "orange_6781"​
#             }​
#         },​
#         {​
#             "id": 296,​
#             "distance": 0.0800950899720192,​
#             "entity": {​
#                 "color": "red_4794"​
#             }​
#         },​
#         {​
#             "id": 43,​
#             "distance": 0.07794742286205292,​
#             "entity": {​
#                 "color": "grey_8510"​
#             }​
#         }​
#     ]​
# ]​

```

```java
import io.milvus.v2.service.vector.request.SearchReq​
import io.milvus.v2.service.vector.request.data.FloatVec;​
import io.milvus.v2.service.vector.response.SearchResp​
​
FloatVec queryVector = new FloatVec(new float[]{0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f});​
SearchReq searchReq = SearchReq.builder()​
        .collectionName("quick_setup")​
        .data(Collections.singletonList(queryVector))​
        .topK(3)​
        .outputFields(Collections.singletonList("color"))​
        .build();​
​
SearchResp searchResp = client.search(searchReq);​
​
List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();​
for (List<SearchResp.SearchResult> results : searchResults) {​
    System.out.println("TopK results:");​
    for (SearchResp.SearchResult result : results) {​
        System.out.println(result);​
    }​
}​
​
// Output​
// TopK results:​
// SearchResp.SearchResult(entity={color=black_9955}, score=0.95944905, id=5)​
// SearchResp.SearchResult(entity={color=red_7319}, score=0.8689616, id=1)​
// SearchResp.SearchResult(entity={color=white_5015}, score=0.866088, id=7)​

```

```javascript
// 4. Single vector search​
var query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],​
​
res = await client.search({​
    collection_name: "quick_setup",​
    data: query_vector,​
    limit: 3, // The number of results to return​
    // highlight-next-line​
    output_fields: ["color"]​
})​
​
console.log(res.results)​
​
// [​
//   { score: 0.08821295201778412, id: '551', entity: {"color": "orange_6781"}},​
//   { score: 0.0800950899720192, id: '296' entity: {"color": "red_4794"}},​
//   { score: 0.07794742286205292, id: '43' entity: {"color": "grey_8510"}}​
// ]​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "quick_setup",​
    "data": [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    "annsField": "vector",​
    "limit": 3,​
    "outputFields": ["color"]​
}'​
​
# {​
#     "code": 0,​
#     "data": [​
#         {​
#             "distance": 0.08821295201778412,​
#             "id": 551,​
#             "color": "orange_6781"​
#         },​
#         {​
#             "distance": 0.0800950899720192,​
#             "id": 296,​
#             "color": "red_4794"​
#         },​
#         {​
#             "distance": 0.07794742286205292,​
#             "id": 43​
#             "color": "grey_8510"​
#         }​
#     ]​
# }​

```

## Use Limit and Offset​

You may notice that the parameter `limit` carried in the search requests determines the number of entities to include in the search results. This parameter specifies the maximum number of entities to return in a single search, and it is usually termed **top-K**.​

If you wish to perform paginated queries, you can use a loop to send multiple Search requests, with the **Limit** and **Offset** parameters carried in each query request. Specifically, you can set the **Limit** parameter to the number of Entities you want to include in the current query results, and set the **Offset** to the total number of Entities that have already been returned.​

The table below outlines how to set the **Limit** and **Offset** parameters for paginated queries when returning 100 Entities at a time.​

<table data-block-token="WHdZdkFtYol0QWxfjYzcMsyrnHd"><thead><tr><th data-block-token="YRpAdF69noO2EwxQJKkcRoB4nGp" colspan="1" rowspan="1"><p data-block-token="EhjLdXqY7op6anxCtOtc8KeKnkh">Queries​</p>

</th><th data-block-token="D6tSdFQQAouKA3xol6RcGFUCn4c" colspan="1" rowspan="1"><p data-block-token="KjGadCmVxoLmmIxjI3McBr18nFg">Entities to return per query​</p>

</th><th data-block-token="IDzvd2OCho3Qp0xMwXWcMZLlnWg" colspan="1" rowspan="1"><p data-block-token="RP69d4efqoAHXkxkY8OcBwPXn9e">Entities already been returned in total​</p>

</th></tr></thead><tbody><tr><td data-block-token="QkqCdnVafo68dGxGRmicOHEQnxe" colspan="1" rowspan="1"><p data-block-token="QyEBdwnZiolkYZxWLYPc59j6nL0">The <strong>**1st**</strong> query​</p>

</td><td data-block-token="E4vsdiNZQowy6rxIy0ecRQC4nEc" colspan="1" rowspan="1"><p data-block-token="QYfudUm7uokKlIxw2n9cxKGKnyg">100​</p>

</td><td data-block-token="KpaFdQx6qow5zcxElk4clK8dnEp" colspan="1" rowspan="1"><p data-block-token="ZwAAd3eu8oYltYxeyCzcvmkLnbh">0​</p>

</td></tr><tr><td data-block-token="D8teddAAZoM2duxDniIc2njyn6C" colspan="1" rowspan="1"><p data-block-token="CdySdMxJ2oZ0uSxNddQcByijnhb">The <strong>**2nd**</strong> query​</p>

</td><td data-block-token="EhRzdF75hoPXIsxmi4Iczj87nIc" colspan="1" rowspan="1"><p data-block-token="VAPzdkDTHogP5axuOI8c101tnAh">100​</p>

</td><td data-block-token="WZQ1dHMMPooABtxi0OfcEOC7nQe" colspan="1" rowspan="1"><p data-block-token="LQ59denn6obaw0xiNGec9uVEn7f">100​</p>

</td></tr><tr><td data-block-token="LqQcdHDM5ozahHxEiKzcOtrxn2g" colspan="1" rowspan="1"><p data-block-token="KfKjdUdK3oAt7Fx2w7icUIapnbd">The <strong>**3rd**</strong> query​</p>

</td><td data-block-token="W1TfddD7poKCKzxX83wcjvoXnXb" colspan="1" rowspan="1"><p data-block-token="ELT7dJe2Ao8L6LxZODccTjAcnKb">100​</p>

</td><td data-block-token="SDYedyTVDoSt9Pxwf2xcQtrInBb" colspan="1" rowspan="1"><p data-block-token="DmAId1cA0oOaUNxg6bzc1iIEn2I">200​</p>

</td></tr><tr><td data-block-token="EV1Sddbj4og1YnxN3pVcI4PenWe" colspan="1" rowspan="1"><p data-block-token="J1zAdtY1MosjA0xrNuycUTLln7b">The <strong>**nth**</strong> query ​</p>

</td><td data-block-token="M9EPdp9haoP5HqxfNvTcP9Non3e" colspan="1" rowspan="1"><p data-block-token="KNJfdZ7bFo9Jooxy2d2ckuf7n3c">100​</p>

</td><td data-block-token="NobhdOnAgo2DFixUrNTcmBOVnje" colspan="1" rowspan="1"><p data-block-token="DxU4dV3WpoqEDbxMIWYcumjenUb">100 x (n-1)​</p>

</td></tr></tbody></table>

Note that, the sum of `limit` and `offset` in a single ANN search should be less than 16,384.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
# 4. Single vector search​
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],​
​
res = client.search(​
    collection_name="quick_setup",​
    data=[query_vector],​
    limit=3, # The number of results to return​
    search_params={​
        "metric_type": "IP", ​
        # highlight-next-line​
        "offset": 10 # The records to skip​
    }​
)​

```

```java
import io.milvus.v2.service.vector.request.SearchReq​
import io.milvus.v2.service.vector.request.data.FloatVec;​
import io.milvus.v2.service.vector.response.SearchResp​
​
FloatVec queryVector = new FloatVec(new float[]{0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f});​
SearchReq searchReq = SearchReq.builder()​
        .collectionName("quick_setup")​
        .data(Collections.singletonList(queryVector))​
        .topK(3)​
        .offset(10)​
        .build();​
​
SearchResp searchResp = client.search(searchReq);​
​
List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();​
for (List<SearchResp.SearchResult> results : searchResults) {​
    System.out.println("TopK results:");​
    for (SearchResp.SearchResult result : results) {​
        System.out.println(result);​
    }​
}​
​
// Output​
// TopK results:​
// SearchResp.SearchResult(entity={}, score=0.24120237, id=16)​
// SearchResp.SearchResult(entity={}, score=0.22559784, id=9)​
// SearchResp.SearchResult(entity={}, score=-0.09906838, id=2)​

```

```javascript
// 4. Single vector search​
var query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],​
​
res = await client.search({​
    collection_name: "quick_setup",​
    data: query_vector,​
    limit: 3, // The number of results to return,​
    // highlight-next-line​
    offset: 10 // The record to skip.​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "quick_setup",​
    "data": [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    "annsField": "vector",​
    "limit": 3,​
    "offset": 10​
}'​

```

## Enhancing ANN Search​

AUTOINDEX considerably flattens the learning curve of ANN searches. However, the search results may not always be correct as the top-K increases. By reducing the search scope, improving search result relevancy, and diversifying the search results, Zilliz Cloud works out the following search enhancements.​

- Filtered Search​

    You can include filtering conditions in a search request so that Zilliz Cloud conducts metadata filtering before conducting ANN searches, reducing the search scope from the whole collection to only the entities matching the specified filtering conditions.​

    For more about metadata filtering and filtering conditions, refer to [​Filtered Search](filtered-search.md) and [​Metadata Filtering](boolean.md).​

- Range Search​

    You can improve search result relevancy by restricting the distance or score of the returned entities within a specific range. In Zilliz Cloud, a range search involves drawing two concentric circles with the vector embedding most similar to the query vector as the center. The search request specifies the radius of both circles, and Zilliz Cloud returns all vector embeddings that fall within the outer circle but not the inner circle.​

    For more about range search, refer to [​Range Search](range-search.md).​

- Grouping Search​

    If the returned entities hold the same value in a specific field, the search results may not represent the distribution of all vector embeddings in the vector space. To diversify the search results, consider using the grouping search.​

    For more about grouping search, refer to [​Grouping Search](grouping-search.md),​

- Hybrid Search​

    A collection can include up to four vector fields to save the vector embeddings generated using different embedding models. By doing so, you can use a hybrid search to rerank the search results from these vector fields, improving the recall rate.​

    For more about hybrid search, refer to [​Hybrid Search](multi-vector-search.md).​

- Search Iterator​

    A single ANN search returns a maximum of 16,384 entities. Consider using search iterators if you need more entities to return in a single search.​

    For details on search iterators, refer to [​Search Iterator](with-iterators.md).​

- Full-Text Search​

    Full text search is a feature that retrieves documents containing specific terms or phrases in text datasets, then ranking the results based on relevance. This feature overcomes semantic search limitations, which might overlook precise terms, ensuring you receive the most accurate and contextually relevant results. Additionally, it simplifies vector searches by accepting raw text input, automatically converting your text data into sparse embeddings without the need to manually generate vector embeddings.​

    For details on full-text search, refer to [​Full Text Search](full-text-search.md).​

- Keyword Match​

    Keyword match in Milvus enables precise document retrieval based on specific terms. This feature is primarily used for filtered search to satisfy specific conditions and can incorporate scalar filtering to refine query results, allowing similarity searches within vectors that meet scalar criteria.​

    For details on keyword match, refer to [​Keyword Match](keyword-match.md).​

- Use Partition Key​

    Involving multiple scalar fields in metadata filtering and using a rather complicated filtering condition may affect search efficiency. Once you set a scalar field as the partition key and use a filtering condition involving the partition key in the search request, it can help restrict the search scope within the partitions corresponding to the specified partition key values. ​

    For details on the partition key, refer to [​Use Partition Key](use-partition-key.md).​

- Use mmap​

    In Milvus, memory-mapped files allow for direct mapping of file contents into memory. This feature enhances memory efficiency, particularly in situations where available memory is scarce but complete data loading is infeasible. This optimization mechanism can increase data capacity while ensuring performance up to a certain limit; however, when the amount of data exceeds memory by too much, search and query performance may suffer serious degradation, so please choose to turn this feature on or off as appropriate.

    For details on mmap-settings, refer to [​Use mmap](mmap.md).​

- Clustering Compaction​

    Clustering compaction is designed to improve search performance and reduce costs in large collections. This guide will help you understand clustering compaction and how this feature can improve search performance.

    For details on clustering compactions, refer to [​Clustering Compaction](clustering-compaction.md).​

