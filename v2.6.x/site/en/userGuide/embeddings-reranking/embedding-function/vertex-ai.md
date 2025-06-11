---
id: vertex-ai.md
title: "Vertex AI"
summary: "Google Cloud Vertex AI is a high-performance service specifically designed for text embedding models. This guide explains how to use Google Cloud Vertex AI with Milvus for efficient text embedding generation."
beta: Milvus 2.6.x
---

# Vertex AI

Google Cloud [Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings) is a high-performance service specifically designed for text embedding models. This guide explains how to use Google Cloud Vertex AI with Milvus for efficient text embedding generation.

Vertex AI supports several embedding models for different use cases:

- text-embedding-005 (Latest text embedding model)

- text-multilingual-embedding-002 (Latest multilingual text embedding model)

For details, refer to [Vertex AI text embedding models reference](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings).

## Vertex AI deployment

Before configuring Milvus with Vertex AI function, you need to configure your Milvus instance to use your Google Cloud service account credentials. Milvus supports two main deployment approaches:

### Standard deployment (Docker Compose)

In your docker-compose.yaml file, you need to mount the credential file and set the `MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS` environment variable.

```yaml
# docker-compose.yaml (standalone service section)
standalone:
  # ... other configurations ...
  environment:
    # ... other environment variables ...
    # Set the environment variable pointing to the credential file path inside the container
    MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS: /milvus/configs/google_application_credentials.json
  volumes:
    # ... other mounts ...
    # Mount the credential file from the host to the specified path inside the container
    # Replace /path/to/your/credentials.json with the actual path
    - /path/to/your/credentials.json:/milvus/configs/google_application_credentials.json:ro

```

### Milvus Helm Chart deployment (Kubernetes)

For Kubernetes environments, it is recommended to use a Kubernetes Secret to store the credential file:

1. **Create Secret**

    ```yaml
    kubectl create secret generic vertex-ai-secret \
      --from-file=credentials.json=/path/to/your/credentials.json \
      -n <your-milvus-namespace>
    
    ```

1. **Configure values.yaml**

    Add the following under the standalone or proxy/dataNode sections:

    ```yaml
    extraEnv:
      - name: MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS
        value: /milvus/configs/credentials.json
    volumes:
      - name: vertex-ai-credentials-vol
        secret:
          secretName: vertex-ai-secret
    volumeMounts:
      - name: vertex-ai-credentials-vol
        mountPath: /milvus/configs/credentials.json
        subPath: credentials.json
        readOnly: true
    
    ```

## Configuration in Milvus

After deploying your Vertex AI credentials, you'll need to configure the embedding function. Milvus supports multiple methods to configure authentication credentials for Vertex AI, applied in the following order of precedence:

- **Milvus configuration file (milvus.yaml)** — Highest priority

- **Environment variables** — Lowest priority

**Milvus configuration file (milvus.yaml)**

For persistent, cluster-wide settings, the credential json data can be encoded in base64 format and then defined in the milvus.yaml file.
 `cat credentials.json|jq .|base64`
replace `credentials.json` to your credential file path

```yaml
credential:
  gcp1:
    credential_json:  # base64 based gcp credential data

# Any configuration related to functions
function:
  textEmbedding:
    providers:
      vertexai:
        credential:  gcp1 # The name in the crendential configuration item
        url:  # Your VertexAI embedding url

```

**Environment variables**

Environment variables offer an alternative configuration method, commonly used when setting up container environments in Docker Compose or Kubernetes deployments.

```yaml
# Example (typically set in docker-compose.yaml or Kubernetes manifest)
# docker-compose.yaml (standalone service section)
standalone:
  # ... other configurations ...
  environment:
    # ... other environment variables ...
    # Set the environment variable pointing to the credential file path inside the container
    MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS: /milvus/configs/google_application_credentials.json
    
#Add the following under the standalone or proxy/dataNode sections in values.yaml:    
extraEnv:
  - name: MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS
    value: /milvus/configs/credentials.json    
    
```

## Use embedding function

Once Vertex AI is configured, follow these steps to define and use embedding functions.

### Step 1: Define schema fields

To use an embedding function, create a collection with a specific schema. This schema must include at least three necessary fields:

- The primary field that uniquely identifies each entity in a collection.

- A scalar field that stores raw data to be embedded.

- A vector field reserved to store vector embeddings that the function will generate for the scalar field.

```python
from pymilvus import MilvusClient, DataType, Function, FunctionType, CollectionSchema, FieldSchema

# Assume you have connected to Milvus
# client = MilvusClient(uri="http://localhost:19530")

# 1. Create Schema
schema = MilvusClient.create_schema()

# 2. Add fields
schema.add_field("id", DataType.INT64, is_primary=True, auto_id=False)
schema.add_field("document", DataType.VARCHAR, max_length=9000) # Store text data
# IMPORTANT: Set dim to match the output dimension of the model and parameters
schema.add_field("dense_vector", DataType.FLOAT_VECTOR, dim=768) # Store embedding vectors (example dimension)
```

### Step 2: Add embedding function to schema

The Function module in Milvus automatically converts raw data stored in a scalar field into embeddings and stores them into the explicitly defined vector field.

```python
# 3. Define Vertex AI embedding function
text_embedding_function = Function(
    name="vert_func",                           # Unique identifier for this embedding function
    function_type=FunctionType.TEXTEMBEDDING,   # Indicates a text embedding function
    input_field_names=["document"],             # Scalar field(s) containing text data to embed
    output_field_names=["dense_vector"],        # Vector field(s) for storing embeddings
    params={                                    # Vertex AI specific parameters (function-level)
        "provider": "vertexai",                 # Must be set to "vertexai"
        "model_name": "text-embedding-005",     # Required: Specifies the Vertex AI model to use
        "projectid": "your-gcp-project-id",     # Required: Your Google Cloud project ID
        # Optional parameters (include these only if necessary):
        # "location": "us-central1",            # Optional: Vertex AI service region (default us-central1)
        # "task": "DOC_RETRIEVAL",              # Optional: Embedding task type (default DOC_RETRIEVAL)
        # "dim": 768                            # Optional: Output vector dimension (1-768)
    }
)

# Add the configured embedding function to your existing collection schema
schema.add_function(text_embedding_function)
```

<table>
   <tr>
     <th><p><strong>Parameter</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Required?</strong></p></th>
     <th><p><strong>Example Value</strong></p></th>
   </tr>
   <tr>
     <td><p><code>provider</code></p></td>
     <td><p>The embedding model provider. Set to "vertexai".</p></td>
     <td><p>Yes</p></td>
     <td><p><code>"vertexai"</code></p></td>
   </tr>
   <tr>
     <td><p><code>model_name</code></p></td>
     <td><p>Specifies which Vertex AI embedding model to use.</p></td>
     <td><p>Yes</p></td>
     <td><p><code>"text-embedding-005"</code></p></td>
   </tr>
   <tr>
     <td><p><code>projectid</code></p></td>
     <td><p>Your Google Cloud project ID.</p></td>
     <td><p>Yes</p></td>
     <td><p><code>"your-gcp-project-id"</code></p></td>
   </tr>
   <tr>
     <td><p><code>location</code></p></td>
     <td><p>The region for the Vertex AI service. Currently, Vertex AI embeddings primarily support us-central1. Defaults to us-central1.</p></td>
     <td><p>No</p></td>
     <td><p><code>"us-central1"</code></p></td>
   </tr>
   <tr>
     <td><p><code>task</code></p></td>
     <td><p>Specifies the embedding task type, affecting embedding results. Accepted values: DOC_RETRIEVAL (default), CODE_RETRIEVAL (only 005 supported), STS (Semantic Textual Similarity).</p></td>
     <td><p>No</p></td>
     <td><p><code>"DOC_RETRIEVAL"</code></p></td>
   </tr>
   <tr>
     <td><p><code>dim</code></p></td>
     <td><p>The dimension of the output embedding vectors. Accepts integers between 1 and 768. <strong>Note:</strong> If specified, ensure the dim of the vector field in the Schema matches this value.</p></td>
     <td><p>No</p></td>
     <td><p><code>768</code></p></td>
   </tr>
</table>

## Next steps

After configuring the embedding function, refer to the [Function Overview](embeddings.md) for additional guidance on index configuration, data insertion examples, and semantic search operations.