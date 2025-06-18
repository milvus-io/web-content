---
id: vertex-ai.md
title: "Vertex AI"
summary: "Google Cloud Vertex AI is a high-performance service specifically designed for text embedding models. This guide explains how to use Google Cloud Vertex AI with Milvus for efficient text embedding generation."
beta: Milvus 2.6.x
---

# Vertex AI

Google Cloud [Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings) is a high-performance service specifically designed for text embedding models. This guide explains how to use Google Cloud Vertex AI with Milvus for efficient text embedding generation.

Vertex AI supports several embedding models for different use cases:

- gemini-embedding-001 (State-of-the-art performance across English, multilingual and code tasks)

- text-embedding-005 (Latest text embedding model)

- text-multilingual-embedding-002 (Latest multilingual text embedding model)

For more information, refer to [Vertex AI text embedding models](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings).

## Prerequisites

Ensure you meet these requirements before configuring Vertex AI:

- **Run Milvus version 2.6 or higher** - Verify your deployment meets the minimum version requirement.

- **Create a Google Cloud service account** -  At a minimum, you'll likely need roles like "Vertex AI User" or other more specific roles. For details, refer to [Create service accounts](https://cloud.google.com/iam/docs/service-accounts-create?_gl=1*1jz33xw*_ga*MjE0NTAwMjk3Mi4xNzUwMTQwNTMw*_ga_WH2QY8WWF5*czE3NTAxNDA1MzEkbzEkZzEkdDE3NTAxNDIyOTEkajE0JGwwJGgw).

- **Download the service account's JSON key file** - Securely store this credential file on your server or local machine. For details, refer to [Create a service account key](https://cloud.google.com/iam/docs/keys-create-delete?_gl=1*ittbs8*_ga*MjE0NTAwMjk3Mi4xNzUwMTQwNTMw*_ga_WH2QY8WWF5*czE3NTAxNDA1MzEkbzEkZzEkdDE3NTAxNDI0NjMkajYwJGwwJGgw#creating).

## Configure credentials

Before Milvus can call Vertex AI, it needs access to your GCP service account JSON key. We support two methods—choose one based on your deployment and operational needs.

<table>
   <tr>
     <th><p>Option</p></th>
     <th><p>Priority</p></th>
     <th><p>Best For</p></th>
   </tr>
   <tr>
     <td><p>Configuration file (<code>milvus.yaml</code>)</p></td>
     <td><p>High</p></td>
     <td><p>Cluster-wide, persistent settings</p></td>
   </tr>
   <tr>
     <td><p>Environment variables (<code>MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</code>)</p></td>
     <td><p>Low</p></td>
     <td><p>Container workflows, quick tests</p></td>
   </tr>
</table>

### Option 1: Configuration file (recommended & higher priority)

Milvus will always prefer credentials declared in `milvus.yaml` over any environment variables for the same provider.

1. Base64-encode your JSON key

    ```bash
    cat credentials.json | jq . | base64
    ```

1. Declare credentials in `milvus.yaml`

    ```yaml
    # milvus.yaml
    credential:
      gcp_vertex:                      # arbitrary label
        credential_json: |
          <YOUR_BASE64_ENCODED_JSON>
    ```

1. Bind the credential to Vertex AI provider

    ```yaml
    # milvus.yaml
    function:
      textEmbedding:
        providers:
          vertexai:
            credential: gcp_vertex      # must match the label above
            url: <optional: custom Vertex AI endpoint>
    ```

    <div class="alert note">
    
    If you later need to rotate keys, just update the Base64 string under `credential_json` and restart Milvus—no changes to your environment or containers required.

    </div>

### Option 2: Environment variables

Use this method when you prefer injecting secrets at deploy time. Milvus falls back to env-vars only if no matching entry exists in `milvus.yaml`.

<div class="alert note">

The configuration steps depend on your Milvus deployment mode (standalone vs. distributed cluster) and orchestration platform (Docker Compose vs. Kubernetes).

</div>

<div class="filter">
  <a href="#docker">Docker Compose</a>
  <a href="#helm">Helm</a>
</div>

<div class="filter-docker">

<div class="alert note">

To obtain your Milvus configuration file (**docker-compose.yaml**), refer to [Download an installation file](configure-docker.md#Download-an-installation-file).

</div>

1. **Mount your key into the container**

    Edit your `docker-compose.yaml` file to include the credential volume mapping:

    ```yaml
    services:
      standalone:
        volumes:
          # Map host credential file to container path
          - /path/to/your/credentials.json:/milvus/configs/google_application_credentials.json:ro
    ```

    In the preceding configuration:

    - Use absolute paths for reliable file access (`/home/user/credentials.json` not `~/credentials.json`)

    - The container path must end with `.json` extension

    - `:ro` flag ensures read-only access for security

1. **Set environment variable**

    In the same `docker-compose.yaml` file, add the environment variable pointing to the credential path:

    ```yaml
    services:
      standalone:
        environment:
          # Essential for Vertex AI authentication
          MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS: /milvus/configs/google_application_credentials.json
    ```

1. **Apply changes**

    Restart your Milvus container to activate the configuration:

    ```bash
    docker-compose down && docker-compose up -d
    ```

</div>

<div class="filter-helm">

<div class="alert note">
    
  To obtain your Milvus configuration file (**values.yaml**), refer to [Configure Milvus via configuration file](configure-helm.md#Configure-Milvus-via-configuration-file).

</div>

1. **Create a Kubernetes Secret**

    Execute this on your control machine (where **kubectl** is configured):

    ```bash
    kubectl create secret generic vertex-ai-secret \
      --from-file=credentials.json=/path/to/your/credentials.json \
      -n <your-milvus-namespace>
    ```

    In the preceding command:

    - `vertex-ai-secret`: Name for your secret (customizable)

    - `/path/to/your/credentials.json`: Local filename of your GCP credential file

    - `<your-milvus-namespace>`: Kubernetes namespace hosting Milvus

1. **Configure Helm values**

    Update your `values.yaml` based on your deployment type:

    - **For standalone deployment**

        ```yaml
        standalone:
          extraEnv:
            - name: MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS
              value: /milvus/configs/credentials.json  # Container path
          
          volumes:
            - name: vertex-ai-credentials-vol
              secret:
                secretName: vertex-ai-secret  # Must match Step 1
          
          volumeMounts:
            - name: vertex-ai-credentials-vol
              mountPath: /milvus/configs/credentials.json  # Must match extraEnv value
              subPath: credentials.json  # Must match secret key name
              readOnly: true
        ```

    - **For distributed deployment (add to each component)**

        ```yaml
        proxy:
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
        
        # Repeat same configuration for dataNode, etc.
        ```

1. **Apply Helm configuration**

    Deploy the updated configuration to your cluster:

    ```bash
    helm upgrade milvus milvus/milvus -f values.yaml -n <your-milvus-namespace>
    ```

</div>

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