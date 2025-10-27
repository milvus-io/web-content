---
id: decay-ranker-overview.md
title: "Decay Ranker Overview"
summary: "In traditional vector search, results are ranked purely by vector similarity—how closely vectors match in mathematical space. But in real-world applications, what makes content truly relevant often depends on more than just semantic similarity."
beta: Milvus 2.6.x
---

# Decay Ranker Overview

In traditional vector search, results are ranked purely by vector similarity—how closely vectors match in mathematical space. But in real-world applications, what makes content truly relevant often depends on more than just semantic similarity.

Consider these everyday scenarios:

- A news search where yesterday's article should rank higher than a similar article from three years ago

- A restaurant finder that prioritizes venues 5 minutes away over those requiring a 30-minute drive

- An e-commerce platform that boosts trending products even when they're slightly less similar to the search query

These scenarios all share a common need: balancing vector similarity with other numeric factors like time, distance, or popularity.

Decay rankers in Milvus address this need by adjusting search rankings based on numeric field values. They allow you to balance vector similarity with "freshness," "nearness," or other numeric properties of your data, creating more intuitive and contextually relevant search experiences.

## Usage notes

- Decay ranking cannot be used with grouping searches.

- The field used for decay ranking must be numeric (`INT8`, `INT16`, `INT32`, `INT64`, `FLOAT`, or `DOUBLE`).

- Each decay ranker can only use one numeric field.

- **Time unit consistency**: When using time-based decay ranking, the units for `origin`, `scale`, and `offset` parameters must match the units used in your collection data:

    - If your collection stores timestamps in **seconds**, use seconds for all parameters

    - If your collection stores timestamps in **milliseconds**, use milliseconds for all parameters

    - If your collection stores timestamps in **microseconds**, use microseconds for all parameters

## How it works

Decay ranking enhances traditional vector search by incorporating numeric factors like time or geo distance into the ranking process. The entire process follows these stages:

### Stage 1: Calculate normalized similarity scores

First, Milvus calculates and normalizes vector similarity scores to ensure consistent comparison:

- For **L2** and **JACCARD** distance metrics (where lower values indicate higher similarity): 

    ```plaintext
    normalized_score = 1.0 - (2 × arctan(score))/π
    ```

    This transforms distances into similarity scores between 0-1, where higher is better.

- For **IP**, **COSINE**, and **BM25** metrics (where higher scores already indicate better matches): Scores are used directly without normalization.

### Stage 2: Calculate decay scores

Next, Milvus calculates a decay score based on the numeric field value (like timestamp or distance) using your selected decay ranker:

- Each decay ranker transforms raw numeric values into normalized relevance scores between 0-1

- The decay score represents how relevant an item is based on its "distance" from the ideal point

The specific calculation formula varies depending on the decay ranker type. For details on how to calculate a decay score, refer to the dedicated pages for [Gaussian Decay](gaussian-decay.md#Formula), [Exponential Decay](exponential-decay.md#Formula), [Linear Decay](linear-decay.md#Formula).

### Stage 3: Compute final scores

Finally, Milvus combines the normalized similarity score and decay score to produce the final ranking score:

```plaintext
final_score = normalized_similarity_score × decay_score
```

In cases of hybrid search (combining multiple vector fields), Milvus takes the maximum normalized similarity score among search requests:

```plaintext
final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
```

For example, if a research paper scores 0.82 from vector similarity and 0.91 from BM25-based text retrieval in a hybrid search, Milvus uses 0.91 as the base similarity score before applying the decay factor.

### Decay ranking in action

Let's see decay ranking in a practical scenario—searching for **"AI research papers"** with time-based decay:

<div class="alert note">

In this example, decay scores reflect how relevance diminishes with time—newer papers receive scores closer to 1.0, older papers receive lower scores. These values are calculated using a specific decay ranker. For details, refer to [Choose the right decay ranker](decay-ranker-overview.md#Choose-the-right-decay-ranker).

</div>

<table>
   <tr>
     <th><p>Paper</p></th>
     <th><p>Vector Similarity</p></th>
     <th><p>Normalized Similarity Score</p></th>
     <th><p>Publication Date</p></th>
     <th><p>Decay Score</p></th>
     <th><p>Final Score</p></th>
     <th><p>Final Rank</p></th>
   </tr>
   <tr>
     <td><p>Paper A</p></td>
     <td><p>High</p></td>
     <td><p>0.85 (<code>COSINE</code>)</p></td>
     <td><p>2 weeks ago</p></td>
     <td><p>0.80</p></td>
     <td><p>0.68</p></td>
     <td>2</td>
   </tr>
   <tr>
     <td><p>Paper B</p></td>
     <td><p>Very High</p></td>
     <td><p>0.92 (<code>COSINE</code>)</p></td>
     <td><p>6 months ago</p></td>
     <td><p>0.45</p></td>
     <td><p>0.41</p></td>
     <td>3</td>
   </tr>
   <tr>
     <td><p>Paper C</p></td>
     <td><p>Medium</p></td>
     <td><p>0.75 (<code>COSINE</code>)</p></td>
     <td><p>1 day ago</p></td>
     <td><p>0.98</p></td>
     <td><p>0.74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>Paper D</p></td>
     <td><p>Medium-High</p></td>
     <td><p>0.76 (<code>COSINE</code>)</p></td>
     <td><p>3 weeks ago</p></td>
     <td><p>0.70</p></td>
     <td><p>0.53</p></td>
     <td>4</td>
   </tr>
</table>

Without decay reranking, Paper B would rank highest based on pure vector similarity (0.92). However, with decay reranking applied:

- Paper C jumps to position #1 despite medium similarity because it's very recent (published yesterday)

- Paper B drops to position #3 despite excellent similarity because it's relatively old

- Paper D uses L2 distance (where lower is better), so its score is normalized from 1.2 to 0.76 before applying decay

## Choose the right decay ranker

Milvus offers distinct decay rankers - `gauss`, `exp`, `linear`, each designed for specific use cases:

<table>
   <tr>
     <th><p>Decay Ranker</p></th>
     <th><p>Characteristics</p></th>
     <th><p>Ideal Use Cases</p></th>
     <th><p>Example Scenario</p></th>
   </tr>
   <tr>
     <td><p>Gaussian (<code>gauss</code>)</p></td>
     <td><p>Natural-feeling gradual decline that extends moderately</p></td>
     <td><ul><li><p>General searches requiring balanced results</p></li><li><p>Applications where users have an intuitive sense of distance</p></li><li><p>When moderate distance shouldn't severely penalize results</p></li></ul></td>
     <td><p>In a restaurant search, quality venues 3 km away remain discoverable, though ranked lower than nearby options</p></td>
   </tr>
   <tr>
     <td><p>Exponential (<code>exp</code>)</p></td>
     <td><p>Rapidly decreases at first but maintains a long tail</p></td>
     <td><ul><li><p>News feeds where recency is critical</p></li><li><p>Social media where fresh content should dominate</p></li><li><p>When proximity is strongly preferred but exceptional distant items should remain visible</p></li></ul></td>
     <td><p>In a news app, yesterday's stories rank much higher than week-old content, but highly relevant older articles can still appear</p></td>
   </tr>
   <tr>
     <td><p>Linear (<code>linear</code>)</p></td>
     <td><p>Consistent, predictable decline with a clear cutoff</p></td>
     <td><ul><li><p>Applications with natural boundaries</p></li><li><p>Services with distance limits</p></li><li><p>Content with expiration dates or clear thresholds</p></li></ul></td>
     <td><p>In an event finder, events beyond a two-week future window simply don't appear at all</p></td>
   </tr>
</table>

For detailed information about how each decay ranker calculates scores and specific decline patterns, refer to the dedicated documentation:

- [Gaussian Decay](gaussian-decay.md)

- [Exponential Decay](exponential-decay.md)

- [Linear Decay](linear-decay.md)

## Implementation example

Decay rankers can be applied to both standard vector search and hybrid search operations in Milvus. Below are the key code snippets for implementing this feature.

<div class="alert note">

Before using decay functions, you must first create a collection with appropriate numeric fields (like timestamps, distances, etc.) that will be used for decay calculations. For complete working examples including collection setup, schema definition, and data insertion, refer to [Tutorial: Implement Time-based Ranking in Milvus](tutorial-implement-a-time-based-ranking-in-milvus.md).

</div>

### Create a decay ranker

To implement decay ranking, first define a `Function` object with the appropriate configuration:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import Function, FunctionType

# Create a decay function for timestamp-based decay
# Note: All time parameters must use the same unit as your collection data
decay_ranker = Function(
    name="time_decay",                  # Function identifier
    input_field_names=["timestamp"],    # Numeric field to use for decay
    function_type=FunctionType.RERANK,  # Must be set to RERANK for decay rankers
    params={
        "reranker": "decay",            # Specify decay reranker. Must be "decay"
        "function": "gauss",            # Choose decay function type: "gauss", "exp", or "linear"
        "origin": int(datetime.datetime(2025, 1, 15).timestamp()),    # Reference point (seconds)
        "scale": 7 * 24 * 60 * 60,      # 7 days in seconds (must match collection data unit)
        "offset": 24 * 60 * 60,         # 1 day no-decay zone (must match collection data unit)
        "decay": 0.5                    # Half score at scale distance
    }
)
```

```java
import io.milvus.v2.service.vector.request.ranker.DecayRanker;

import java.time.ZoneId;
import java.time.ZonedDateTime;

ZonedDateTime zdt = ZonedDateTime.of(2025, 1, 25, 0, 0, 0, 0, ZoneId.systemDefault());

DecayRanker ranker = DecayRanker.builder()
        .name("time_decay")
        .inputFieldNames(Collections.singletonList("timestamp"))
        .function("gauss")
        .origin(zdt.toInstant().toEpochMilli())
        .scale(7 * 24 * 60 * 60)
        .offset(24 * 60 * 60)
        .decay(0.5)
        .build();

```

```javascript

import {FunctionType } from "@zilliz/milvus2-sdk-node";

const decayRanker = {
  name: "time_decay",
  input_field_names: ["timestamp"],
  function_type: FunctionType.RERANK,
  params: {
    reranker: "decay",
    function: "gauss",
    origin: new Date(2025, 1, 15).getTime(),
    scale: 7 * 24 * 60 * 60,
    offset: 24 * 60 * 60,
    decay: 0.5,
  },
};

```

```go
// go
```

```bash
# restful
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Required?</p></th>
     <th><p>Description</p></th>
     <th><p>Value/Example</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Identifier for your function used when executing searches. Choose a descriptive name relevant to your use case.</p></td>
     <td><p><code>"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code>input_field_names</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Numeric field for decay score calculation. Determines which data attribute will be used for calculating decay (e.g., timestamps for time-based decay, coordinates for location-based decay). </p><p>Must be a field in your collection that contains relevant numeric values. Supports INT8/16/32/64, FLOAT, DOUBLE.</p></td>
     <td><p><code>["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code>function_type</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Specifies the type of function being created.</p><p>Must be set to <code>RERANK</code> for all decay rankers.</p></td>
     <td><p><code>FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.reranker</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Specifies the reranking method to use.</p><p>Must be set to <code>"decay"</code> to enable decay ranking functionality.</p></td>
     <td><p><code>"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.function</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Specifies which mathematical decay ranker to apply. Determines the curve shape of relevance decline.</p><p>See <a href="decay-ranker-overview.md#Choose-the-right-decay-ranker">Choose the right decay ranker</a> section for guidance on selecting the appropriate function.</p></td>
     <td><p><code>"gauss"</code>, <code>"exp"</code>, or <code>"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.origin</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Reference point from which decay score is calculated. Items at this value receive maximum relevance scores.</p><p>For time-based decay, the time unit must match your collection data.</p></td>
     <td><ul><li><p>For timestamps: current time (e.g., <code>int(time.time())</code>)</p></li><li><p>For geolocation: user's current coordinates</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code>params.scale</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Distance or time at which relevance drops to the <code>decay</code> value. Controls how quickly relevance declines.</p><p>For time-based decay, the time unit must match your collection data.</p><p>Larger values create a more gradual decline in relevance; smaller values create a steeper decline.</p></td>
     <td><ul><li><p>For time: period in seconds (e.g., <code>7 * 24 * 60 * 60</code> for 7 days)</p></li><li><p>For distance: meters (e.g., <code>5000</code> for 5km)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code>params.offset</code></p></td>
     <td><p>No</p></td>
     <td><p>Creates a "no-decay zone" around the <code>origin</code> where items maintain full scores (decay score = 1.0).</p><p>For time-based decay, the time unit must match your collection data.</p><p>Items within this range of the <code>origin</code> maintain maximum relevance.</p></td>
     <td><ul><li><p>For time: period in seconds (e.g., <code>24 * 60 * 60</code> for 1 day)</p></li><li><p>For distance: meters (e.g., <code>500</code> for 500m)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code>params.decay</code></p></td>
     <td><p>No</p></td>
     <td><p>Score value at the <code>scale</code> distance, controls curve steepness. Lower values create steeper decline curves; higher values create more gradual decline curves.</p><p>Must be between 0 and 1.</p></td>
     <td><p><code>0.5</code> (default)</p></td>
   </tr>
</table>

### Apply to standard vector search

After defining your decay ranker, you can apply it during search operations by passing it to the `ranker` parameter:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Use the decay function in standard vector search
results = milvus_client.search(
    collection_name,
    data=[your_query_vector], # Replace with your query vector
    anns_field="vector_field",
    limit=10,
    output_fields=["document", "timestamp"],  # Include the decay field in outputs to see values
    #  highlight-next-line
    ranker=decay_ranker,                      # Apply the decay ranker here
    consistency_level="Strong"
)
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;
import io.milvus.v2.service.vector.request.data.EmbeddedText;

SearchReq searchReq = SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(new EmbeddedText("search query")))
        .annsField("vector_field")
        .limit(10)
        .outputFields(Arrays.asList("document", "timestamp"))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .build();
SearchResp searchResp = client.search(searchReq);
```

```javascript
const result = await milvusClient.search({
  collection_name: "collection_name",
  data: [your_query_vector], // Replace with your query vector
  anns_field: "dense",
  limit: 10,
  output_fields: ["document", "timestamp"],
  rerank: ranker,
  consistency_level: "Strong",
});
```

```go
// go
```

```bash
# restful
```

### Apply to hybrid search

Decay rankers can also be applied to hybrid search operations that combine multiple vector fields:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import AnnSearchRequest

# Define search requests for different vector fields
dense_request = AnnSearchRequest(
    data=[your_query_vector_1], # Replace with your query vector
    anns_field="dense_vector",
    param={},
    limit=20
)

sparse_request = AnnSearchRequest(
    data=[your_query_vector_2], # Replace with your query vector
    anns_field="sparse_vector",
    param={},
    limit=20
)

# Apply decay ranker to hybrid search
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
    #  highlight-next-line
    ranker=decay_ranker,                      # Same decay ranker works with hybrid search
    limit=10,
    output_fields=["document", "timestamp"]
)
```

```java
import io.milvus.v2.service.vector.request.AnnSearchReq;
import io.milvus.v2.service.vector.request.HybridSearchReq;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import io.milvus.v2.service.vector.request.data.FloatVec;
        
List<AnnSearchReq> searchRequests = new ArrayList<>();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName("dense_vector")
        .vectors(Collections.singletonList(new FloatVec(embedding)))
        .limit(20)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName("sparse_vector")
        .vectors(Collections.singletonList(new EmbeddedText("search query")))
        .limit(20)
        .build());

HybridSearchReq hybridSearchReq = HybridSearchReq.builder()
                .collectionName(COLLECTION_NAME)
                .searchRequests(searchRequests)
                .ranker(ranker)
                .limit(10)
                .outputFields(Arrays.asList("document", "timestamp"))
                .build();
SearchResp searchResp = client.hybridSearch(hybridSearchReq);
```

```javascript
const denseRequest = {
  data: [your_query_vector_1], // Replace with your query vector
  anns_field: "dense_vector",
  param: {},
  limit: 20,
};

const sparseRequest = {
  data: [your_query_vector_2], // Replace with your query vector
  anns_field: "sparse_vector",
  param: {},
  limit: 20,
};

const hybridResults = await milvusClient.hybrid_search({
  collection_name: "collection_name",
  data: [denseRequest, sparseRequest],
  ranker: decayRanker,
  limit: 10,
  output_fields: ["document", "timestamp"],
});

```

```go
// go
```

```bash
# restful
```

In hybrid search, Milvus first finds the maximum similarity score from all vector fields, then applies the decay factor to that score.