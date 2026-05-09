---
id: google-gemini.md
title: "Google Gemini"
summary: "Use a Google Gemini embedding model with Milvus by choosing a model and configuring Milvus with your Gemini API key."
---

# Google Gemini

Use a Google Gemini embedding model with Milvus by choosing a model and configuring Milvus with your Gemini API key.

## Choose an embedding model

Milvus supports embedding models provided by Google Gemini. Below are the currently available Gemini embedding models for quick reference:

<table>
   <tr>
     <th><p><strong>Model Name</strong></p></th>
     <th><p><strong>Dimensions</strong></p></th>
     <th><p><strong>Max Tokens</strong></p></th>
     <th><p><strong>Description</strong></p></th>
   </tr>
   <tr>
     <td><p>gemini-embedding-001</p></td>
     <td><p>Default: 3,072 (recommended: 768, 1,536, or 3,072)</p></td>
     <td><p>8,192</p></td>
     <td><p>Text embedding model with flexible dimensions, trained using Matryoshka Representation Learning (MRL).</p></td>
   </tr>
   <tr>
     <td><p>gemini-embedding-2</p></td>
     <td><p>Default: 3,072 (recommended: 768, 1,536, or 3,072)</p></td>
     <td><p>8,192</p></td>
     <td><p>Google's first natively multimodal embedding model, supporting text, images, video, audio, and documents in a unified embedding space.</p></td>
   </tr>
</table>

Both models are trained using the Matryoshka Representation Learning (MRL) technique, which allows for flexible output dimensions via the `dim` parameter. It is recommended to start with 768 dimensions and scale up to 1,536 or 3,072 if needed. For more details, refer to [Gemini Embedding models](https://ai.google.dev/gemini-api/docs/embeddings).

Gemini embedding models also support a **task type** parameter that optimizes embeddings for specific use cases. Milvus automatically sets the task type based on the operation:

- **Insert / Upsert:** `RETRIEVAL_DOCUMENT`

- **Search:** `RETRIEVAL_QUERY`

You can override this by explicitly specifying a `task` parameter (e.g., `SEMANTIC_SIMILARITY`, `CLASSIFICATION`, `CLUSTERING`).

## Configure credentials

Milvus must know your Gemini API key before it can request embeddings. Milvus provides two methods to configure credentials:

- **Configuration file (recommended):** Store the API key in `milvus.yaml` so every restart and node picks it up automatically.

- **Environment variables:** Inject the key at deploy time—ideal for Docker Compose.

Choose one of the two methods below—the configuration file is easier to maintain on bare-metal and VMs, while the env-var route fits container workflows.

If an API key for the same provider is present in both the configuration file and an environment variable, Milvus always uses the value in `milvus.yaml` and ignores the environment variable.

### Option 1: Configuration file (recommended & higher priority)

Keep your API keys in `milvus.yaml`; Milvus reads them at startup and overrides any environment variable for the same provider.

1. **Declare your keys under credential:**

    You may list one or many API keys—give each a label you invent and will reference later.

    ```yaml
    # milvus.yaml
    credential:
      apikey_dev:            # dev environment
        apikey: <YOUR_DEV_KEY>
      apikey_prod:           # production environment
        apikey: <YOUR_PROD_KEY>    
    ```

    Putting the API keys here makes them persistent across restarts and lets you switch keys just by changing a label.

1. **Tell Milvus which key to use for Gemini calls**

    In the same file, point the Gemini provider at the label you want it to use.

    ```yaml
    function:
      textEmbedding:
        providers:
          gemini:
            credential: apikey_dev      # ← choose any label you defined above
    ```

    This binds a specific key to every request Milvus sends to the Gemini embeddings endpoint.

### Option 2: Environment variable

Use this method when you run Milvus with Docker Compose and prefer to keep secrets out of files and images.

Milvus falls back to the environment variable only if no key for the provider is found in `milvus.yaml`.

<table>
   <tr>
     <th><p><strong>Variable</strong></p></th>
     <th><p><strong>Required</strong></p></th>
     <th><p><strong>Description</strong></p></th>
   </tr>
   <tr>
     <td><p>MILVUS_GEMINI_API_KEY</p></td>
     <td><p>Yes</p></td>
     <td><p>Makes the Gemini key available inside each Milvus container (ignored when a key for Gemini exists in milvus.yaml)</p></td>
   </tr>
</table>

In your **docker-compose.yaml** file, set the `MILVUS_GEMINI_API_KEY` environment variable.

```yaml
# docker-compose.yaml (standalone service section)
standalone:
  # ... other configurations ...
  environment:
    # ... other environment variables ...
    # Set the environment variable pointing to the Gemini API key inside the container
    MILVUS_GEMINI_API_KEY: <YOUR_GEMINI_API_KEY>
```

The `environment:` block injects the key only into the Milvus container, leaving your host OS untouched. For details, refer to [Configure Milvus with Docker Compose](http://configure-docker.md#Configure-Milvus-with-Docker-Compose).

## Step 1: Create a collection with a text embedding function

### Define schema fields

To use an embedding function, create a collection with a specific schema. This schema must include at least three necessary fields:

- The primary field that uniquely identifies each entity in a collection.

- A `VARCHAR` field that stores raw data to be embedded.

- A vector field reserved to store dense vector embeddings that the text embedding function will generate for the `VARCHAR` field.

The following example defines a schema with one scalar field `"document"` for storing textual data and one vector field `"dense"` for storing embeddings to be generated by the Function module. Remember to set the vector dimension (`dim`) to match the output of your chosen embedding model.

```python
from pymilvus import MilvusClient, DataType, Function, FunctionType

# Initialize Milvus client
client = MilvusClient(
    uri="http://localhost:19530",
)

# Create a new schema for the collection
schema = client.create_schema()

# Add primary field "id"
schema.add_field("id", DataType.INT64, is_primary=True, auto_id=False)

# Add scalar field "document" for storing textual data
schema.add_field("document", DataType.VARCHAR, max_length=9000)

# Add vector field "dense" for storing embeddings.
# IMPORTANT: Set dim to match the exact output dimension of the embedding model.
# For instance, Gemini's gemini-embedding-001 model outputs 3072-dimensional vectors by default,
# but can be shortened to 768 or 1536 dimensions.
schema.add_field("dense", DataType.FLOAT_VECTOR, dim=768)
```

### Define the text embedding function

The text embedding function automatically converts raw data stored in a `VARCHAR` field into embeddings and stores them into the explicitly defined vector field.

The example below adds a Function module (`gemini_embedding`) that converts the scalar field `"document"` into embeddings, storing the resulting vectors in the `"dense"` vector field defined earlier.

```python
# Define embedding function (example: Gemini provider)
text_embedding_function = Function(
    name="gemini_embedding",                        # Unique identifier for this embedding function
    function_type=FunctionType.TEXTEMBEDDING,       # Type of embedding function
    input_field_names=["document"],                 # Scalar field to embed
    output_field_names=["dense"],                   # Vector field to store embeddings
    params={                                        # Provider-specific configuration (highest priority)
        "provider": "gemini",                       # Embedding model provider
        "model_name": "gemini-embedding-001",       # Embedding model
        # Optional parameters:
        # "credential": "apikey_dev",               # Optional: Credential label specified in milvus.yaml
        # "dim": "768",                             # Optional: Output vector dimension (default 3072)
        # "task": "RETRIEVAL_DOCUMENT",             # Optional: Task type for embedding optimization
    }
)

# Add the embedding function to your schema
schema.add_function(text_embedding_function)
```

**Supported task types for the task parameter:**

- `RETRIEVAL_DOCUMENT` — Optimizes embeddings for document indexing (default for insert/upsert).

- `RETRIEVAL_QUERY` — Optimizes embeddings for query retrieval (default for search).

- `SEMANTIC_SIMILARITY` — Optimizes embeddings for measuring text similarity.

- `CLASSIFICATION` — Optimizes embeddings for text classification.

- `CLUSTERING` — Optimizes embeddings for clustering.

When not explicitly set, Milvus automatically uses `RETRIEVAL_DOCUMENT` during insert/upsert and `RETRIEVAL_QUERY` during search.

### Configure the index

After defining the schema with necessary fields and the built-in function, set up the index for your collection. To simplify this process, use `AUTOINDEX` as the `index_type`, an option that allows Milvus to choose and configure the most suitable index type based on the structure of your data.

```python
# Prepare index parameters
index_params = client.prepare_index_params()

# Add AUTOINDEX to automatically select optimal indexing method
index_params.add_index(
    field_name="dense",
    index_type="AUTOINDEX",
    metric_type="COSINE" 
)
```

### Create the collection

Now create the collection using the schema and index parameters defined.

```python
# Create collection named "demo"
client.create_collection(
    collection_name='demo', 
    schema=schema, 
    index_params=index_params
)
```

## Step 2: Insert data

After setting up your collection and index, you're ready to insert your raw data. In this process, you need only to provide the raw text. The Function module we defined earlier automatically generates the corresponding sparse vector for each text entry.

```python
# Insert sample documents
client.insert('demo', [
    {'id': 1, 'document': 'Milvus simplifies semantic search through embeddings.'},
    {'id': 2, 'document': 'Vector embeddings convert text into searchable numeric data.'},
    {'id': 3, 'document': 'Semantic search helps users find relevant information quickly.'},
])
```

## Step 3: Search with text

After data insertion, perform a semantic search using raw query text. Milvus automatically converts your query into an embedding vector, retrieves relevant documents based on similarity, and returns the top-matching results.

```python
# Perform semantic search
results = client.search(
    collection_name='demo', 
    data=['How does Milvus handle semantic search?'], # Use text query rather than query vector
    anns_field='dense',   # Use the vector field that stores embeddings
    limit=1,
    output_fields=['document'],
)

print(results)
```

For more information about search and query operations, refer to [Basic Vector Search](single-vector-search.md) and [Query](get-and-scalar-query.md).