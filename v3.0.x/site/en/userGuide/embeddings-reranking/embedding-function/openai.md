---
id: openai.md
title: "OpenAI"
summary: "Use an OpenAI embedding model with Milvus by choosing a model and configuring Milvus with your OpenAI API key."
beta: Milvus 2.6.x
---

# OpenAI

Use an OpenAI embedding model with Milvus by choosing a model and configuring Milvus with your OpenAI API key.

## Choose an embedding model

Milvus supports all embedding models provided by OpenAI. Below are the currently available OpenAI embedding models for quick reference:

<table>
   <tr>
     <th><p>Model Name</p></th>
     <th><p>Dimensions</p></th>
     <th><p>Max Tokens</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p>text-embedding-3-small</p></td>
     <td><p>Default: 1,536 (can be shortened to a dimension size below 1,536)</p></td>
     <td><p>8,191</p></td>
     <td><p>Ideal for cost-sensitive and scalable semantic search—offers strong performance at a lower price point.</p></td>
   </tr>
   <tr>
     <td><p>text-embedding-3-large</p></td>
     <td><p>Default: 3,072 (can be shortened to a dimension size below 3,072)</p></td>
     <td><p>8,191</p></td>
     <td><p>Best for applications demanding enhanced retrieval accuracy and richer semantic representations.</p></td>
   </tr>
   <tr>
     <td><p>text-embedding-ada-002</p></td>
     <td><p>Fixed: 1,536 (cannot be shortened)</p></td>
     <td><p>8,191</p></td>
     <td><p>A previous-generation model suited for legacy pipelines or scenarios requiring backward compatibility.</p></td>
   </tr>
</table>

The third generation embedding models (**text-embedding-3**) support reducing the size of the embedding via a `dim` parameter. Typically larger embeddings are more expensive from a compute, memory, and storage perspective. Being able to adjust the number of dimensions allows more control over overall cost and performance. For more details about each model, refer to [Embedding models](https://platform.openai.com/docs/guides/embeddings#embedding-models) and [OpenAI announcement blog post](https://openai.com/blog/new-embedding-models-and-api-updates).

## Configure credentials

Milvus must know your OpenAI API key before it can request embeddings. Milvus provides two methods to configure credentials:

- **Configuration file (recommended):** Store the API key in `milvus.yaml` so every restart and node picks it up automatically.

- **Environment variables:** Inject the key at deploy time—ideal for Docker Compose.

Choose one of the two methods below—the configuration file is easier to maintain on bare-metal and VMs, while the env-var route fits container workflows.

<div class="alert note">

If an API key for the same provider is present in both the configuration file and an environment variable, Milvus always uses the value in `milvus.yaml` and ignores the environment variable.

</div>

### Option 1: Configuration file (recommended & higher priority)

Keep your API keys in `milvus.yaml`; Milvus reads them at startup and overrides any environment variable for the same provider.

1. **Declare your keys under `credential:`

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

1. **Tell Milvus which key to use for OpenAI calls**

    In the same file, point the OpenAI provider at the label you want it to use.

    ```yaml
    function:
      textEmbedding:
        providers:
          openai:
            credential: apikey_dev      # ← choose any label you defined above
            # url: https://api.openai.com/v1/embeddings   # (optional) custom url
    ```

    This binds a specific key to every request Milvus sends to the OpenAI embeddings endpoint.

### Option 2: Environment variable

Use this method when you run Milvus with Docker Compose and prefer to keep secrets out of files and images.

Milvus falls back to the environment variable only if no key for the provider is found in `milvus.yaml`.

<table>
   <tr>
     <th><p>Variable</p></th>
     <th><p>Required</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>MILVUSAI_OPENAI_API_KEY</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Makes the OpenAI key available inside each Milvus container <em>(ignored when a key for OpenAI exists in <code>milvus.yaml</code>)</em></p></td>
   </tr>
</table>

In your **docker-compose.yaml** file, set the `MILVUSAI_OPENAI_API_KEY` environment variable.

```yaml
# docker-compose.yaml (standalone service section)
standalone:
  # ... other configurations ...
  environment:
    # ... other environment variables ...
    # Set the environment variable pointing to the OpenAI API key inside the container
    MILVUSAI_OPENAI_API_KEY: <MILVUSAI_OPENAI_API_KEY>
```

The `environment:` block injects the key only into the Milvus container, leaving your host OS untouched. For details, refer to [Configure Milvus with Docker Compose](configure-docker.md#Configure-Milvus-with-Docker-Compose).

## Use embedding function

Once credentials are configured, follow these steps to define and use embedding functions.

### Step 1: Define schema fields

To use an embedding function, create a collection with a specific schema. This schema must include at least three necessary fields:

- The primary field that uniquely identifies each entity in a collection.

- A scalar field that stores raw data to be embedded.

- A vector field reserved to store vector embeddings that the function will generate for the scalar field.

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
# For instance, OpenAI's text-embedding-3-small model outputs 1536-dimensional vectors.
schema.add_field("dense", DataType.FLOAT_VECTOR, dim=1536)
```

### Step 2: Add embedding function to schema

The Function module in Milvus automatically converts raw data stored in a scalar field into embeddings and stores them into the explicitly defined vector field.

The example below adds a Function module (`openai_embedding`) that converts the scalar field `"document"` into embeddings, storing the resulting vectors in the `"dense"` vector field defined earlier.

Once you have defined your embedding function, add it to your collection schema. This instructs Milvus to use the specified embedding function to process and store embeddings from your text data.

```python
# Define embedding function (example: OpenAI provider)
text_embedding_function = Function(
    name="openai_embedding",                        # Unique identifier for this embedding function
    function_type=FunctionType.TEXTEMBEDDING,       # Type of embedding function
    input_field_names=["document"],                 # Scalar field to embed
    output_field_names=["dense"],                   # Vector field to store embeddings
    params={                                        # Provider-specific configuration (highest priority)
        "provider": "openai",                       # Embedding model provider
        "model_name": "text-embedding-3-small",     # Embedding model
        # Optional parameters:
        # "credential": "apikey_dev",               # Optional: Credential label specified in milvus.yaml
        # "dim": "1536",                            # Optional: Shorten the output vector dimension
        # "user": "user123"                         # Optional: identifier for API tracking
    }
)

# Add the embedding function to your schema
schema.add_function(text_embedding_function)
```

## Next steps

After configuring the embedding function, refer to the [Function Overview](embedding-function-overview.md) for additional guidance on index configuration, data insertion examples, and semantic search operations.