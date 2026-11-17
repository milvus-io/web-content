---
id: cohere-ranker.md
title: "Cohere Ranker"
summary: "The Cohere Ranker leverages Cohere's powerful rerank models to enhance search relevance through semantic reranking. It provides enterprise-grade reranking capabilities with robust API infrastructure and optimized performance for production environments."
beta: Milvus 2.6.x
---

# Cohere Ranker

The Cohere Ranker leverages [Cohere's](https://cohere.com/) powerful rerank models to enhance search relevance through semantic reranking. It provides enterprise-grade reranking capabilities with robust API infrastructure and optimized performance for production environments.

Cohere Ranker is particularly valuable for applications requiring:

- High-quality semantic understanding with state-of-the-art rerank models

- Enterprise-grade reliability and scalability for production workloads

- Multilingual reranking capabilities across diverse content types

- Consistent API performance with built-in rate limiting and error handling

## Prerequisites

Before implementing Cohere Ranker in Milvus, ensure you have:

- A Milvus collection with a `VARCHAR` field containing the text to be reranked

- A valid Cohere API key with access to reranking models. Sign up at [Cohere's platform](https://dashboard.cohere.com/) to obtain your API credentials. You can either:

    - Set the `COHERE_API_KEY` environment variable, or

    - Specify the API key directly in the `credential` of the [ranker configuration](cohere-ranker.md#Create-a-Cohere-ranker-function)

## Create a Cohere ranker function

To use Cohere Ranker in your Milvus application, create a Function object that specifies how the reranking should operate. This function will be passed to Milvus search operations to enhance result ranking.

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

# Configure Cohere Ranker
cohere_ranker = Function(
    name="cohere_semantic_ranker",          # Unique identifier for your ranker
    input_field_names=["document"],         # VARCHAR field containing text to rerank
    function_type=FunctionType.RERANK,      # Must be RERANK for reranking functions
    params={
        "reranker": "model",                # Enables model-based reranking
        "provider": "cohere",               # Specifies Cohere as the service provider
        "model_name": "rerank-english-v3.0", # Cohere rerank model to use
        "queries": ["renewable energy developments"], # Query text for relevance evaluation
        "max_client_batch_size": 128,       # Optional: batch size for model service requests (default: 128)
        "max_tokens_per_doc": 4096,         # Optional: max tokens per document (default: 4096)
        # "credential": "your-cohere-api-key" # Optional: authentication credential for Cohere API
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
                       .name("cohere_semantic_ranker")
                       .inputFieldNames(Collections.singletonList("document"))
                       .param("reranker", "model")
                       .param("provider", "cohere")
                       .param("model_name", "rerank-english-v3.0")
                       .param("queries", "[\"renewable energy developments\"]")
                       .param("endpoint", "http://localhost:8080")
                       .param("max_client_batch_size", "128")
                       .param("max_tokens_per_doc", "4096")
                       .build();
```

```javascript
// nodejs
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
    WithName("cohere_semantic_ranker").
    WithType(entity.FunctionTypeRerank).
    WithInputFields("document").
    WithParam("reranker", "model").
    WithParam("provider", "cohere").
    WithParam("model_name", "rerank-english-v3.0").
    WithParam("queries", []string{"renewable energy developments"}).
    WithParam("max_client_batch_size", 128).
    WithParam("max_tokens_per_doc", 4096)

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

### Cohere ranker-specific parameters

The following parameters are specific to the Cohere ranker:

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
     <td><p><code>"cohere"</code></p></td>
   </tr>
   <tr>
     <td><p><code>model_name</code></p></td>
     <td><p>Yes</p></td>
     <td><p>The Cohere rerank model to use from supported models on Cohere platform.</p><p>For a list of rerank models available, refer to <a href="https://docs.cohere.com/docs/rerank">Cohere documentation</a>.</p></td>
     <td><p><code>"rerank-english-v3.0"</code>, <code>"rerank-multilingual-v3.0"</code></p></td>
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
     <td><p><code>max_tokens_per_doc</code></p></td>
     <td><p>No</p></td>
     <td><p>Maximum number of tokens per document. Long documents will be automatically truncated to the specified number of tokens.</p></td>
     <td><p><code>4096</code> (default)</p></td>
   </tr>
   <tr>
     <td><p><code>credential</code></p></td>
     <td><p>No</p></td>
     <td><p>Authentication credential for accessing Cohere API services. If not specified, the system will look for the <code>COHERE_API_KEY</code> environment variable.</p></td>
     <td><p><em>"your-cohere-api-key"</em></p></td>
   </tr>
</table>

<div class="alert note">

For general parameters shared across all model rankers (e.g., `provider`, `queries`), refer to [Create a model ranker](model-ranker-overview.md#Create-a-model-ranker).

</div>

## Apply to standard vector search

To apply Cohere Ranker to a standard vector search:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Execute search with Cohere reranking
results = client.search(
    collection_name="your_collection",
    data=[your_query_vector],  # Replace with your query vector
    anns_field="dense_vector",                   # Vector field to search
    limit=5,                                     # Number of results to return
    output_fields=["document"],                  # Include text field for reranking
    #  highlight-next-line
    ranker=cohere_ranker,                       # Apply Cohere reranking
    consistency_level="Bounded"
)
```

```java
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;
import io.milvus.v2.service.vector.request.data.EmbeddedText;

SearchReq searchReq = SearchReq.builder()
        .collectionName(COLLECTION_NAME)
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
// nodejs
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
    "name": "cohere_semantic_ranker",
    "type": "Rerank",
    "inputFieldNames": [
        "document"
    ],
    "outputFieldNames": [],
    "params": {
        "reranker": "model",
        "provider": "cohere",
        "model_name": "rerank-english-v3.0",
        "queries": [
            "renewable energy developments"
        ],
        "max_client_batch_size": 128,
        "max_tokens_per_doc": 4096
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
