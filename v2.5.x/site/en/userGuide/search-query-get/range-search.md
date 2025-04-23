---
id: range-search.md
title: "Range Search"
summary: "A range search improves search result relevancy by restricting the distance or score of the returned entities within a specific range. This page helps you understand what range search is and the procedures to conduct a range search."
---

# Range Search

A range search improves search result relevancy by restricting the distance or score of the returned entities within a specific range. This page helps you understand what range search is and the procedures to conduct a range search.

## Overview

When executing a Range Search request, Milvus uses the most similar vectors to the query vector from the ANN Search results as the center, with the **radius** specified in the Search request as the outer circle's radius, and the **range_filter** as the inner circle's radius to draw two concentric circles. All vectors with similarity scores that fall within the annular region formed by these two concentric circles will be returned. Here, the **range_filter** can be set to **0**, indicating that all entities within the specified similarity score (radius) will be returned.

![Range Search](../../../../assets/range-search.png)

The above diagram shows that a range search request carries two parameters: **radius** and **range_filter**. Upon receiving a range search request, Milvus does the following:

- Use the specified metric type (**COSINE**) to find all vector embeddings most similar to the query vector.

- Filter the vector embeddings whose **distances** or **scores** to the query vector fall within the range specified by the **radius** and **range_filter** parameters.

- Return the **top-K** entities from the filtered ones.

The way to set **radius** and **range_filter** varies with the metric type of the search. The following table lists the requirements for setting these two parameters with different metric types.

<table>
   <tr>
     <th><p>Metric Type</p></th>
     <th><p>Denotations</p></th>
     <th><p>Requirements for Setting radius and range_filter</p></th>
   </tr>
   <tr>
     <td><p><code>L2</code></p></td>
     <td><p>A smaller L2 distance indicates a higher similarity.</p></td>
     <td><p>To ignore the most similar vector embeddings, ensure that <code>range_filter</code> &lt;= distance &lt; <code>radius</code></p></td>
   </tr>
   <tr>
     <td><p><code>IP</code></p></td>
     <td><p>A greater IP distance indicates a higher similarity.</p></td>
     <td><p>To ignore the most similar vector embeddings, ensure that <code>radius</code> &lt; distance &lt;= <code>range_filter</code></p></td>
   </tr>
   <tr>
     <td><p><code>COSINE</code></p></td>
     <td><p>A greater COSINE distance indicates a higher similarity.</p></td>
     <td><p>To ignore the most similar vector embeddings, ensure that <code>radius</code> &lt; distance &lt;= <code>range_filter</code></p></td>
   </tr>
   <tr>
     <td><p><code>JACCARD</code></p></td>
     <td><p>A smaller Jaccard distance indicates a higher similarity.</p></td>
     <td><p>To ignore the most similar vector embeddings, ensure that <code>range_filter</code> &lt;= distance &lt; <code>radius</code></p></td>
   </tr>
   <tr>
     <td><p><code>HAMMING</code></p></td>
     <td><p>A smaller Hamming distance indicates a higher similarity.</p></td>
     <td><p>To ignore the most similar vector embeddings, ensure that <code>range_filter</code> &lt;= distance &lt; <code>radius</code></p></td>
   </tr>
</table>

## Examples

This section demonstrates how to conduct a range search. The search requests in the following code snippets do not carry a metric type, indicating the default metric type **COSINE** applies. In this case, ensure that the **radius** value is smaller than the **range_filter** value.

In the following code snippets, set `radius` to `0.4` and `range_filter` to `0.6` so that Milvus returns all entities whose distances or scores to the query vector fall within **0.4** to **0.6**.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = client.search(
    collection_name="my_collection",
    data=[query_vector],
    limit=3,
    search_params={
        # highlight-start
        "params": {
            "radius": 0.4,
            "range_filter": 0.6
        }
        # highlight-end
    }
)

for hits in res:
    print("TopK results:")
    for hit in hits:
        print(hit)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
 io.milvus.v2.service.vector.request.SearchReq
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build());

FloatVec queryVector = new FloatVec(new float[]{0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f});
Map<String,Object> extraParams = new HashMap<>();
extraParams.put("radius", 0.4);
extraParams.put("range_filter", 0.6);
SearchReq searchReq = SearchReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(queryVector))
        .topK(5)
        .searchParams(extraParams)
        .build();

SearchResp searchResp = client.search(searchReq);

List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (List<SearchResp.SearchResult> results : searchResults) {
    System.out.println("TopK results:");
    for (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

// Output
// TopK results:
// SearchResp.SearchResult(entity={}, score=0.5975797, id=4)
// SearchResp.SearchResult(entity={}, score=0.46704385, id=5)
```

```go
import (
    "context"
    "fmt"
    
    "github.com/milvus-io/milvus/client/v2/index"
    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "localhost:19530"
client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

annParam := index.NewCustomAnnParam()
annParam.WithRadius(0.4)
annParam.WithRangeFilter(0.6)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", // collectionName
    5,               // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField("vector").
    WithAnnParam(annParam))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
}
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const address = "http://localhost:19530";
const token = "root:Milvus";
const client = new MilvusClient({address, token});

var query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = await client.search({
    collection_name: "my_collection",
    data: [query_vector],
    limit: 5,
    // highlight-start
    params: {
        "radius": 0.4,
        "range_filter": 0.6
    }
    // highlight-end
})
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "data": [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    "annsField": "vector",
    "limit": 5,
    "searchParams": {
        "params": {
            "radius": 0.4,
            "range_filter": 0.6
        }
    }
}'
# {"code":0,"cost":0,"data":[]}
```

