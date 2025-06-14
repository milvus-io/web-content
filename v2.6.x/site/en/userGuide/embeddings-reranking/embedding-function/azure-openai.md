---
id: azure-openai.md
title: "Azure OpenAI"
summary: "This topic describes how to configure and use Azure OpenAI embedding functions in Milvus."
beta: Milvus 2.6.x
---

# Azure OpenAI

This topic describes how to configure and use Azure OpenAI embedding functions in Milvus.

## Choose an embedding model

Milvus supports all embedding models provided by Azure OpenAI. Below are the currently available Azure OpenAI embedding models for quick reference:

<table>
   <tr>
     <th><p>Model</p></th>
     <th><p>Dimensions</p></th>
     <th><p>Max Tokens</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p>text-embedding-3-small</p></td>
     <td><p>Default: 1,536 (truncatable to a dimension size below 1536)</p></td>
     <td><p>8,191</p></td>
     <td><p>Ideal for cost-sensitive and scalable semantic search—offers strong performance at a lower price point.</p></td>
   </tr>
   <tr>
     <td><p>text-embedding-3-large</p></td>
     <td><p>Default: 3,072 (truncatable to a dimension size below 3072)</p></td>
     <td><p>8,191</p></td>
     <td><p>Best for applications demanding enhanced retrieval accuracy and richer semantic representations.</p></td>
   </tr>
   <tr>
     <td><p>text-embedding-ada-002</p></td>
     <td><p>Fixed: 1,536 (does not support truncation)</p></td>
     <td><p>8,191</p></td>
     <td><p>A previous-generation model suited for legacy pipelines or scenarios requiring backward compatibility.</p></td>
   </tr>
</table>

The third generation embedding models (**text-embedding-3**) support reducing the size of the embedding via a `dim` parameter. Typically larger embeddings are more expensive from a compute, memory, and storage perspective. Being able to adjust the number of dimensions allows more control over overall cost and performance. For more details about each model, refer to [Embeddings](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models?tabs=global-standard,standard-chat-completions#embeddings).

## Configure credentials

Milvus must know your Azure OpenAI API key before it can request embeddings. Milvus provides two methods to configure credentials:

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

1. **Tell Milvus which key to use for Azure OpenAI calls**

    In the same file, point the Azure OpenAI provider at the label you want it to use.

    ```yaml
    function:
      textEmbedding:
        providers:
          azure_openai:
            credential: apikey_dev      # ← choose any label you defined above
            resource_name:  # Your azure openai resource name
            # url: # Your azure openai embedding url
    ```

    This binds a specific key to every request Milvus sends to the Azure OpenAI embeddings endpoint.

### Option 2: Environment variables

Use this method when you run Milvus with Docker Compose and prefer to keep secrets out of files and images.

Milvus falls back to the environment variable only if no key for the provider is found in `milvus.yaml`.

<table>
   <tr>
     <th><p>Variable</p></th>
     <th><p>Required</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>MILVUSAI_AZURE_OPENAI_API_KEY</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Makes the Azure OpenAI key available inside each Milvus container <em>(ignored when a key for Azure OpenAI exists in <code>milvus.yaml</code>)</em></p></td>
   </tr>
   <tr>
     <td><p><code>MILVUSAI_AZURE_OPENAI_RESOURCE_NAME</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Your Azure OpenAI resource name as defined when you created your Azure OpenAI service resource.</p></td>
   </tr>
</table>

In your **docker-compose.yaml** file, set the environment variables.

```yaml
# docker-compose.yaml (standalone service section)
standalone:
  # ... other configurations ...
  environment:
    # ... other environment variables ...
    # Set the environment variable pointing to the Azure OpenAI API key inside the container
    MILVUSAI_AZURE_OPENAI_API_KEY: <MILVUSAI_AZURE_OPENAI_API_KEY>
    MILVUSAI_AZURE_OPENAI_RESOURCE_NAME: <MILVUSAI_AZURE_OPENAI_RESOURCE_NAME>
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
schema.add_field("dense", DataType.FLOAT_VECTOR, dim=1536)
```

### Step 2: Add embedding function to schema

Once you have defined your embedding function, add it to your collection schema. This instructs Milvus to use the specified embedding function to process and store embeddings from your text data.

```python
# Define embedding function specifically for Azure OpenAI provider
text_embedding_function = Function(
    name="azopenai",                                # Unique identifier for this embedding function
    function_type=FunctionType.TEXTEMBEDDING,       # Indicates a text embedding function
    input_field_names=["document"],                 # Scalar field(s) containing text data to embed
    output_field_names=["dense"],                   # Vector field(s) for storing embeddings
    params={                                        # Provider-specific embedding parameters
        "provider": "azure_openai",                 # Embedding provider name (must be "azure_openai")
        "model_name": "zilliz-text-embedding-3-small",      # Model should be set to the deployment name you chose when you deployed the embedding model
        # Optional parameters (only specify if necessary):
        # "url": "https://{resource_name}.openai.azure.com/" # Optional: Your Azure OpenAI service endpoint
        # "credential": "apikey_dev",               # Optional: Credential label specified in milvus.yaml
        # "dim": "1536",                            # Optional: Shorten the output vector dimension
        # "user": "user123",                        # Optional: identifier for API tracking
    }
)

# Add the configured embedding function to your existing collection schema
schema.add_function(text_embedding_function)
```

## Next steps

After configuring the embedding function, refer to the [Function Overview](embedding-function-overview.md) for additional guidance on index configuration, data insertion examples, and semantic search operations.