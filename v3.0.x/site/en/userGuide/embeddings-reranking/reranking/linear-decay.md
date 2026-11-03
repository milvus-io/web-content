---
id: linear-decay.md
title: "Linear Decay"
summary: "Linear decay creates a straight-line decline that terminates at an absolute zero point in your search results. Like an upcoming event countdown where relevance gradually fades until the event has passed, linear decay applies a predictable, steady reduction in relevance as items move away from your ideal point until they completely disappear. This approach is ideal when you want a consistent decay rate with a clear cutoff, ensuring that items beyond a certain boundary are completely excluded from results."
beta: Milvus 2.6.x
---

# Linear Decay

Linear decay creates a straight-line decline that terminates at an absolute zero point in your search results. Like an upcoming event countdown where relevance gradually fades until the event has passed, linear decay applies a predictable, steady reduction in relevance as items move away from your ideal point until they completely disappear. This approach is ideal when you want a consistent decay rate with a clear cutoff, ensuring that items beyond a certain boundary are completely excluded from results.

Unlike other decay functions:

- Gaussian decay follows a bell curve that gradually approaches but never reaches zero

- Exponential decay maintains a long tail of minimal relevance that extends indefinitely

Linear decay uniquely creates a definitive endpoint, making it particularly effective for applications with natural boundaries or deadlines.

## When to use linear decay

Linear decay is particularly effective for:

<table>
   <tr>
     <th><p>Use Case</p></th>
     <th><p>Example</p></th>
     <th><p>Why Linear Works Well</p></th>
   </tr>
   <tr>
     <td><p>Event listings</p></td>
     <td><p>Concert ticket platforms</p></td>
     <td><p>Creates a clear cutoff for events too far in the future</p></td>
   </tr>
   <tr>
     <td><p>Limited-time offers</p></td>
     <td><p>Flash sales, promotions</p></td>
     <td><p>Ensures expired or soon-to-expire offers don't appear</p></td>
   </tr>
   <tr>
     <td><p>Delivery radius</p></td>
     <td><p>Food delivery, courier services</p></td>
     <td><p>Enforces hard geographical boundaries</p></td>
   </tr>
   <tr>
     <td><p>Age-restricted content</p></td>
     <td><p>Dating platforms, media services</p></td>
     <td><p>Establishes firm age thresholds</p></td>
   </tr>
</table>

Choose linear decay when:

- Your application has a natural boundary, deadline, or threshold

- Items beyond a certain point should be completely excluded from results

- You need a predictable, consistent rate of decline in relevance

- Users should see a clear demarcation between relevant and irrelevant items

## Steady decline principle

Linear decay creates a straight-line drop that decreases at a constant rate until reaching exactly zero. This pattern appears in many everyday scenarios like countdown timers, inventory depletion, and deadline approaches where relevance has a clear expiration point.

<div class="alert note">

All time parameters (`origin`, `offset`, `scale`) must use the same unit as the collection data. If your collection stores timestamps in a different unit (milliseconds, microseconds), adjust all parameters accordingly.

</div>

![Linear Decay](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/linear-decay.png)

The graph above shows how linear decay would affect event listings on a ticketing platform:

- `origin` (current date): The present moment, where relevance is at its maximum (1.0).

- `offset` (1 day): The "immediate events window"—all events happening within the next day maintain full relevance scores (1.0), ensuring that very imminent events aren't penalized for slight time differences.

- `decay` (0.5): The score at the scale distance—this parameter controls the rate of decline in relevance.

- `scale` (10 days): The time period at which relevance drops to the decay value—events 10 days away have their relevance scores halved (0.5).

As you can see from the straight-line curve, events beyond approximately 16 days away have exactly zero relevance and won't appear in search results at all. This creates a clear boundary that ensures users only see relevant upcoming events within a defined time window.

This behavior mirrors how event planning typically works—imminent events are most relevant, events in the coming weeks have diminishing importance, and events too far in the future (or already past) shouldn't appear at all.

## Formula

The mathematical formula for calculating a linear decay score is:

$$
S(doc) = \max\left( \frac{s - \max(0, |fieldvalue_{doc} - origin| - offset)}{s}, 0 \right)
$$

Where:

$$
s = \frac{scale}{(1.0 - decay)}
$$

Breaking this down in plain language:

1. Calculate how far the field value is from the origin: $|fieldvalue_{doc} - origin|$

2. Subtract the offset (if any) but never go below zero: $\max(0, distance - offset)$

3. Determine the parameter $s$ from your scale and decay values.

4. Subtract the adjusted distance from $s$ and divide by $s$

5. Ensure the result never goes below zero: $\max(result, 0)$

The $s$ calculation transforms your scale and decay parameters into the point where the score reaches zero. For example, with decay=0.5 and scale=7, the score will reach exactly zero at distance=14 (twice the scale value).

## Use linear decay

Linear decay can be applied to both standard vector search and hybrid search operations in Milvus. Below are the key code snippets for implementing this feature.

<div class="alert note">

Before using decay functions, you must first create a collection with appropriate numeric fields (like timestamps, distances, etc.) that will be used for decay calculations. For complete working examples including collection setup, schema definition, and data insertion, refer to [Decay Ranker Tutorial](tutorial-implement-a-time-based-ranking-in-milvus.md).

</div>

### Create a decay ranker

After your collection is set up with a numeric field (in this example, `event_date` as seconds from now), create a linear decay ranker:

<div class="alert note">

**Time unit consistency**: When using time-based decay, ensure that `origin`, `scale`, and `offset` parameters use the same time unit as your collection data. If your collection stores timestamps in seconds, use seconds for all parameters. If it uses milliseconds, use milliseconds for all parameters.

</div>

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import Function, FunctionType
import time

# Calculate current time
current_time = int(time.time())

# Create a linear decay ranker for event listings
# Note: All time parameters must use the same unit as your collection data
rerank = Function(
    name="event_relevance",               # Function identifier
    input_field_names=["event_date"],     # Numeric field to use
    function_type=FunctionType.RERANK,    # Function type. Must be RERANK
    params={
        "reranker": "decay",              # Specify decay reranker
        "function": "linear",             # Choose linear decay
        "origin": current_time,           # Current time (seconds, matching collection data)
        "offset": 12 * 60 * 60,           # 12 hour immediate events window (seconds)
        "decay": 0.5,                     # Half score at scale distance
        "scale": 7 * 24 * 60 * 60         # 7 days (in seconds, matching collection data)
    }
)
```

```java
import io.milvus.v2.service.vector.request.ranker.DecayRanker;
import java.util.Collections;

DecayRanker rerank = DecayRanker.builder()
        .name("event_relevance")
        .inputFieldNames(Collections.singletonList("event_date"))
        .function("linear")
        .origin(System.currentTimeMillis() / 1000)  // Current time (seconds, matching collection data)
        .offset(12 * 60 * 60)            // 12 hour immediate events window (seconds)
        .decay(0.5)                      // Half score at scale distance
        .scale(7 * 24 * 60 * 60)         // 7 days (in seconds, matching collection data)
        .build();
```

```go
import (
    "time"

    "github.com/milvus-io/milvus/client/v3/entity"
)

currentTime := time.Now().Unix()

rerank := entity.NewFunction().
    WithName("event_relevance").
    WithInputFields("event_date").
    WithType(entity.FunctionTypeRerank).
    WithParam("reranker", "decay").
    WithParam("function", "linear").
    WithParam("origin", currentTime).
    WithParam("scale", 7*24*60*60).
    WithParam("offset", 12*60*60).
    WithParam("decay", 0.5)
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let rerank = DecayRerank::new()
    .function(Function::new()
        .name("event_relevance")
        .input_fields(["event_date"])
        .function_type(FunctionType::Rerank)
        .param("reranker", "decay"))
    .decay_function("linear")
    .origin(std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_secs())
    .scale(7 * 24 * 60 * 60)
    .offset(12 * 60 * 60)
    .decay(0.5);
```

```cpp
auto rerank = std::make_shared<milvus::DecayRerank>("event_relevance");
rerank->AddInputFieldName("event_date");
rerank->SetFunction("linear");
rerank->SetOrigin(1736870400);
rerank->SetScale(7 * 24 * 60 * 60);
rerank->SetOffset(12 * 60 * 60);
rerank->SetDecay(0.5);
```

```javascript
import { FunctionType } from "@zilliz/milvus2-sdk-node";

const rerank = {
  name: "event_relevance",
  input_field_names: ["event_date"],
  type: FunctionType.RERANK,
  params: {
    reranker: "decay",
    function: "linear",
    origin: Math.floor(Date.now() / 1000), // Current time (seconds)
    offset: 12 * 60 * 60,
    decay: 0.5,
    scale: 7 * 24 * 60 * 60,
  },
};
```

```csharp
using Milvus.Client.V2.Types;

// Calculate current time
long currentTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

// Create a linear decay ranker for event listings
// Note: All time parameters must use the same unit as your collection data
var rerank = new DecayRerank("event_relevance") // Function identifier
    .WithInputField("event_date") // Numeric field to use
    .WithFunction("linear") // Choose linear decay
    .WithOrigin(currentTime) // Current time (seconds, matching collection data)
    .WithOffset(12L * 60 * 60) // 12 hour immediate events window (seconds)
    .WithDecay(0.5f) // Half score at scale distance
    .WithScale(7L * 24 * 60 * 60); // 7 days (in seconds, matching collection data)
```

```bash
# Note: The RESTful API does not expose the decay/rerank operation as of Milvus v3.0.x.
```

### Apply to standard vector search

After defining your decay ranker, you can apply it during search operations by passing it to the `ranker` parameter:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
# Apply decay ranker to vector search
result = milvus_client.search(
    collection_name,
    data=[your_query_vector],              # Replace with your query vector
    anns_field="dense",                   # Vector field to search
    limit=10,                             # Number of results
    output_fields=["title", "venue", "event_date"], # Fields to return
    #  highlight-next-line
    ranker=rerank,                        # Apply the decay ranker
    consistency_level="Strong"
)
```

```java
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.service.vector.request.FunctionScore;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;
import java.util.Collections;

SearchReq searchReq = SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(new FloatVec(embedding)))
        .annsField("dense")
        .limit(10)
        .outputFields(Arrays.asList("title", "venue", "event_date"))
        .functionScore(FunctionScore.builder()
                .addFunction(rerank)
                .build())
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build();
SearchResp searchResp = client.search(searchReq);
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

functionScore := entity.NewFunctionScore().AddFunction(rerank)

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    collection_name, // collection name
    10,              // limit
    []entity.Vector{your_query_vector}, // query vector
).WithANNSField("dense").
    WithFunctionScore(functionScore).
    WithOutputFields("title", "venue", "event_date"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
use milvus::v2::prelude::*;

let function_score = FunctionScore::new().add_function(rerank);
let request = SearchRequest::builder()
    .collection_name(collection_name)
    .vectors(SearchVectors::Float(vec![your_query_vector]))
    .vector_field("dense")
    .limit(10)
    .output_fields(vec!["title", "venue", "event_date"])
    .rerank(function_score)
    .build()?;
let resp = client.search(request).await?;
```

```cpp
auto function_score = std::make_shared<milvus::FunctionScore>();
function_score->AddFunction(rerank);

auto request = milvus::SearchRequest()
                   .WithCollectionName(collection_name)
                   .WithAnnsField("dense")
                   .WithRerank(function_score)
                   .WithLimit(10)
                   .AddOutputField("title")
                   .AddOutputField("venue")
                   .AddOutputField("event_date")
                   .AddFloatVector(your_query_vector)
                   .WithConsistencyLevel(milvus::ConsistencyLevel::BOUNDED);

milvus::SearchResponse response;
status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
const result = await milvusClient.search({
  collection_name: collection_name,
  data: [your_query_vector], // Replace with your query vector
  anns_field: "dense",
  limit: 10,
  output_fields: ["title", "venue", "event_date"],
  rerank: rerank,
  consistency_level: "Strong",
});
```

```csharp
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Types;

// Apply decay ranker to vector search
var result = await client.SearchAsync(new SearchReq
{
    CollectionName = collectionName,
    VectorFieldName = "dense", // Vector field to search
    Vectors = new[] { yourQueryVector }, // Replace with your query vector
    Limit = 10, // Number of results
    Parameters = new SearchParameters
    {
        OutputFields = { "title", "venue", "event_date" }, // Fields to return
        FunctionScoreReranker = rerank, // Apply the decay ranker
        ConsistencyLevel = ConsistencyLevel.Strong
    }
});
```

```bash
# Note: The RESTful API does not expose the decay/rerank operation as of Milvus v3.0.x.
```