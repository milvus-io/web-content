---
id: siliconflow-ranker.md
title: "SiliconFlow Ranker"
summary: "The SiliconFlow Ranker leverages SiliconFlow's comprehensive reranking models to enhance search relevance through semantic reranking. It provides flexible document chunking capabilities and supports a wide range of specialized reranking models from various providers."
beta: Milvus 2.6.x
---

# SiliconFlow Ranker

The SiliconFlow Ranker leverages [SiliconFlow's](https://www.siliconflow.com/) comprehensive reranking models to enhance search relevance through semantic reranking. It provides flexible document chunking capabilities and supports a wide range of specialized reranking models from various providers.

SiliconFlow Ranker is particularly valuable for applications requiring:

- Advanced document chunking with configurable overlap for handling long documents

- Access to diverse reranking models including BAAI/bge-reranker series and other specialized models

- Flexible chunk-based scoring where the highest-scoring chunk represents the document score

- Cost-effective reranking with support for both standard and pro model variants

## Prerequisites

Before implementing SiliconFlow Ranker in Milvus, ensure you have:

- A Milvus collection with a `VARCHAR` field containing the text to be reranked

- A valid SiliconFlow API key with access to reranking models. Sign up at [SiliconFlow's platform](https://www.siliconflow.com/) to obtain your API credentials. You can either:

    - Set the `SILICONFLOW_API_KEY` environment variable, or

    - Specify the API key directly in the ranker configuration

## Create a SiliconFlow ranker function

To use SiliconFlow Ranker in your Milvus application, create a Function object that specifies how the reranking should operate. This function will be passed to Milvus search operations to enhance result ranking.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient, Function, FunctionType

# Connect to your Milvus server
client = MilvusClient(
    uri="http://localhost:19530"  # Replace with your Milvus server URI
)

# Configure SiliconFlow Ranker
siliconflow_ranker = Function(
    name="siliconflow_semantic_ranker",     # Unique identifier for your ranker
    input_field_names=["document"],         # VARCHAR field containing text to rerank
    function_type=FunctionType.RERANK,      # Must be RERANK for reranking functions
    params={
        "reranker": "model",                # Enables model-based reranking
        "provider": "siliconflow",          # Specifies SiliconFlow as the service provider
        "model_name": "BAAI/bge-reranker-v2-m3", # SiliconFlow reranking model to use
        "queries": ["renewable energy developments"], # Query text for relevance evaluation
        "max_client_batch_size": 128,       # Optional: batch size for model service requests (default: 128)
        "max_chunks_per_doc": 5,            # Optional: max chunks per document for supported models
        "overlap_tokens": 50,               # Optional: token overlap between chunks for supported models
        # "credential": "your-siliconflow-api-key" # Optional: if not set, uses SILICONFLOW_API_KEY env var
    }
)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.common.clientenum.FunctionType;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .build());

CreateCollectionReq.Function ranker = CreateCollectionReq.Function.builder()
                       .functionType(FunctionType.RERANK)
                       .name("siliconflow_semantic_ranker")
                       .inputFieldNames(Collections.singletonList("document"))
                       .param("reranker", "model")
                       .param("provider", "siliconflow")
                       .param("model_name", "BAAI/bge-reranker-v2-m3")
                       .param("queries", "[\"renewable energy developments\"]")
                       .param("endpoint", "http://localhost:8080")
                       .param("max_client_batch_size", "32")
                       .param("max_chunks_per_doc", "5")
                       .param("overlap_tokens", "50")
                       .build();
```

```javascript
import { MilvusClient, FunctionType } from "@zilliz/milvus2-sdk-node";

// Connect to your Milvus server
const client = new MilvusClient({
  address: "http://localhost:19530",    // Replace with your Milvus server URI
});

// Configure SiliconFlow Ranker
const siliconflow_ranker = {
  name: "siliconflow_semantic_ranker",  // Unique identifier for your ranker
  input_field_names: ["document"],      // VARCHAR field containing text to rerank
  type: FunctionType.RERANK,            // Must be RERANK for reranking functions
  params: {
    reranker: "model",                  // Enables model-based reranking
    provider: "siliconflow",            // Specifies SiliconFlow as the service provider
    model_name: "BAAI/bge-reranker-v2-m3", // SiliconFlow reranking model to use
    queries: ["renewable energy developments"], // Query text for relevance evaluation
    max_client_batch_size: 128,         // Optional: batch size for model service requests (default: 128)
    max_chunks_per_doc: 5,              // Optional: max chunks per document for supported models
    overlap_tokens: 50,                 // Optional: token overlap between chunks for supported models
    // credential: "your-siliconflow-api-key", // Optional: if not set, uses SILICONFLOW_API_KEY env var
  },
};
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "localhost:19530",
})
if err != nil {
    panic(err)
}
defer cli.Close(ctx)

ranker := entity.NewFunction().
    WithName("siliconflow_semantic_ranker").
    WithType(entity.FunctionTypeRerank).
    WithInputFields("document").
    WithParam("reranker", "model").
    WithParam("provider", "siliconflow").
    WithParam("model_name", "BAAI/bge-reranker-v2-m3").
    WithParam("queries", []string{"renewable energy developments"}).
    WithParam("max_client_batch_size", 128).
    WithParam("max_chunks_per_doc", 5).
    WithParam("overlap_tokens", 50)

schema := entity.NewSchema().
    WithName("your_collection").
    WithDynamicFieldEnabled(false).
    WithField(entity.NewField().WithName("id").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true)).
    WithField(entity.NewField().WithName("document").WithDataType(entity.FieldTypeVarChar).WithMaxLength(65535)).
    WithField(entity.NewField().WithName("dense_vector").WithDataType(entity.FieldTypeFloatVector).WithDim(768))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("your_collection", schema))
if err != nil {
    fmt.Println(err.Error())
    return
}
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "your_collection",
    "schema": {
        "autoID": false,
        "enableDynamicField": false,
        "fields": [
            {
                "fieldName": "id",
                "dataType": "Int64",
                "isPrimary": true
            },
            {
                "fieldName": "document",
                "dataType": "VarChar",
                "elementTypeParams": {
                    "max_length": 65535
                }
            },
            {
                "fieldName": "dense_vector",
                "dataType": "FloatVector",
                "elementTypeParams": {
                    "dim": 768
                }
            }
        ]
    }
}'
```

### SiliconFlow ranker-specific parameters

The following parameters are specific to the SiliconFlow ranker:

<table>
   <tr>
     <th><p><strong>Parameter</strong></p></th>
     <th><p><strong>Required?</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Value / Example</strong></p></th>
   </tr>
   <tr>
     <td><p><code>reranker</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Must be set to <code>"model"</code> to enable model reranking.</p></td>
     <td><p><code>"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code>provider</code></p></td>
     <td><p>Yes</p></td>
     <td><p>The model service provider to use for reranking.</p></td>
     <td><p><code>"siliconflow"</code></p></td>
   </tr>
   <tr>
     <td><p><code>model_name</code></p></td>
     <td><p>Yes</p></td>
     <td><p>The SiliconFlow reranking model to use from supported models on SiliconFlow platform.</p><p>For a list of rerank models available, refer to <a href="https://docs.siliconflow.cn/en/api-reference/rerank/create-rerank">SiliconFlow documentation</a>.</p></td>
     <td><p><code>"BAAI/bge-reranker-v2-m3"</code></p></td>
   </tr>
   <tr>
     <td><p><code>queries</code></p></td>
     <td><p>Yes</p></td>
     <td><p>List of query strings used by the rerank model to calculate relevance scores. The number of query strings must match exactly the number of queries in your search operation (even when using query vectors instead of text), otherwise an error will be reported.</p></td>
     <td><p><em>["search query"]</em></p></td>
   </tr>
   <tr>
     <td><p><code>max_client_batch_size</code></p></td>
     <td><p>No</p></td>
     <td><p>Since model services may not process all data at once, this sets the batch size for accessing the model service in multiple requests.</p></td>
     <td><p><code>128</code> (default)</p></td>
   </tr>
   <tr>
     <td><p><code>max_chunks_per_doc</code></p></td>
     <td><p>No</p></td>
     <td><p>Maximum number of chunks generated from within a document. Long documents are divided into multiple chunks for calculation, and the highest score among the chunks is taken as the document's score. Only supported by specific models: <code>BAAI/bge-reranker-v2-m3</code>, <code>Pro/BAAI/bge-reranker-v2-m3</code>, and <code>netease-youdao/bce-reranker-base_v1</code>.</p></td>
     <td><p><code>5</code>, <code>10</code></p></td>
   </tr>
   <tr>
     <td><p><code>overlap_tokens</code></p></td>
     <td><p>No</p></td>
     <td><p>Number of token overlaps between adjacent chunks when documents are chunked. This ensures continuity across chunk boundaries for better semantic understanding. Only supported by specific models: <code>BAAI/bge-reranker-v2-m3</code>, <code>Pro/BAAI/bge-reranker-v2-m3</code>, and <code>netease-youdao/bce-reranker-base_v1</code>.</p></td>
     <td><p><code>50</code></p></td>
   </tr>
   <tr>
     <td><p><code>credential</code></p></td>
     <td><p>No</p></td>
     <td><p>Authentication credential for accessing SiliconFlow API services. If not specified, the system will look for the <code>SILICONFLOW_API_KEY</code> environment variable.</p></td>
     <td><p><em>"your-siliconflow-api-key"</em></p></td>
   </tr>
</table>

**Model-specific feature support**: The `max_chunks_per_doc` and `overlap_tokens` parameters are only supported by specific models. When using other models, these parameters will be ignored.

<div class="alert note">

For general parameters shared across all model rankers (e.g., `provider`, `queries`), refer to [Create a model ranker](model-ranker-overview.md#Create-a-model-ranker).

</div>

## Apply to standard vector search

To apply SiliconFlow Ranker to a standard vector search:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Execute search with SiliconFlow reranking
results = client.search(
    collection_name="your_collection",
    data=[your_query_vector],  # Replace with your query vector
    anns_field="dense_vector",                   # Vector field to search
    limit=5,                                     # Number of results to return
    output_fields=["document"],                  # Include text field for reranking
    #  highlight-next-line
    ranker=siliconflow_ranker,                  # Apply SiliconFlow reranking
    consistency_level="Bounded"
)
```

```java
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;
import io.milvus.v2.service.vector.request.data.EmbeddedText;

SearchReq searchReq = SearchReq.builder()
        .collectionName("your_collection")
        .data(Arrays.asList(new EmbeddedText("AI Research Progress"), new EmbeddedText("What is AI")))
        .annsField("vector_field")
        .limit(10)
        .outputFields(Collections.singletonList("document"))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();
SearchResp searchResp = client.search(searchReq);
```

```javascript
import { ConsistencyLevelEnum } from "@zilliz/milvus2-sdk-node";

// Execute search with SiliconFlow reranking
const results = await client.search({
  collection_name: "your_collection",
  data: [your_query_vector],            // Replace with your query vector
  anns_field: "dense_vector",           // Vector field to search
  limit: 5,                             // Number of results to return
  output_fields: ["document"],          // Include text field for reranking
  // highlight-next-line
  rerank: siliconflow_ranker,           // Apply SiliconFlow reranking
  consistency_level: ConsistencyLevelEnum.Bounded,
});
```

```go
functionScore := entity.NewFunctionScore().AddFunction(ranker)

resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    "your_collection", // collection name
    5,           // limit
    []entity.Vector{entity.FloatVector(yourQueryVector)},
).WithANNSField("dense_vector").
    WithOutputFields("document").
    WithFunctionScore(functionScore).
    WithConsistencyLevel(entity.ClBounded))
if err != nil {
    fmt.Println(err.Error())
    return
}

fmt.Println(resultSets)
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

# The ranker configuration is passed with the search request
export rankerFunction='{
    "name": "siliconflow_semantic_ranker",
    "type": "Rerank",
    "inputFieldNames": [
        "document"
    ],
    "outputFieldNames": [],
    "params": {
        "reranker": "model",
        "provider": "siliconflow",
        "model_name": "BAAI/bge-reranker-v2-m3",
        "queries": [
            "renewable energy developments"
        ],
        "max_client_batch_size": 128,
        "max_chunks_per_doc": 5,
        "overlap_tokens": 50
    }
}'

# A query vector matching the collection dimension
export QUERY_VECTOR=$(jq -n '[range(768) | 0.01]')

request=$(jq -n \
--argjson vec "$QUERY_VECTOR" \
--argjson fn "$rankerFunction" \
'{
    collectionName: "your_collection",
    data: [$vec],
    annsField: "dense_vector",
    limit: 5,
    outputFields: ["document"],
    consistencyLevel: "Bounded",
    functionScore: {functions: [$fn]}
}')

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d "$request"
```
