---
id: dashscope.md
title: "DashScope"
summary: "This topic describes how to configure and use DashScope embedding functions in Milvus."
beta: Milvus 2.6.x
---

# DashScope

This topic describes how to configure and use DashScope embedding functions in Milvus.

## Choose an embedding model

Below are the currently available DashScope embedding models for quick reference:

<table>
   <tr>
     <th><p>Model Name</p></th>
     <th><p>Dimensions</p></th>
     <th><p>Max Tokens per Row</p></th>
     <th><p>Supported Languages</p></th>
   </tr>
   <tr>
     <td><p>text-embedding-v3</p></td>
     <td><p>1,024 (default), 768, or 512</p></td>
     <td><p>8,192</p></td>
     <td><p>Chinese, English, Spanish, French, Portuguese, Indonesian, Japanese, Korean, German, Russian, and more than 50 other languages</p></td>
   </tr>
   <tr>
     <td><p>text-embedding-v2</p></td>
     <td><p>1,536</p></td>
     <td><p>2,048</p></td>
     <td><p>Chinese, English, Spanish, French, Portuguese, Indonesian, Japanese, Korean, German, Russian</p></td>
   </tr>
   <tr>
     <td><p>text-embedding-v1</p></td>
     <td><p>1,536</p></td>
     <td><p>2,048</p></td>
     <td><p>Chinese, English, Spanish, French, Portuguese, Indonesian, Japanese, Korean, German, Russian</p></td>
   </tr>
</table>

The embedding model **text-embedding-v3** support reducing the size of the embedding via a `dim` parameter. Typically larger embeddings are more expensive from a compute, memory, and storage perspective. Being able to adjust the number of dimensions allows more control over overall cost and performance. For more details about each model, refer to [Embedding](https://help.aliyun.com/zh/model-studio/user-guide/embedding?disableWebsiteRedirect=true).

## Configure credentials

Milvus must know your DashScope API key before it can request embeddings. Milvus provides two methods to configure credentials:

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

1. **Tell Milvus which key to use for DashScope calls**

    In the same file, point the DashScope provider at the label you want it to use.

    ```yaml
    function:
      textEmbedding:
        providers:
          dashscope:
            credential: apikey_dev      # ← choose any label you defined above
            # url: https://dashscope-intl.aliyuncs.com/compatible-mode/v1   # (optional) custom url
    ```

    This binds a specific key to every request Milvus sends to the DashScope embeddings endpoint.

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
     <td><p><code>MILVUSAI_DASHSCOPE_API_KEY</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Makes the DashScope key available inside each Milvus container <em>(ignored when a key for DashScope exists in <code>milvus.yaml</code>)</em></p></td>
   </tr>
</table>

In your **docker-compose.yaml** file, set the `MILVUSAI_DASHSCOPE_API_KEY` environment variable.

```yaml
# docker-compose.yaml (standalone service section)
standalone:
  # ... other configurations ...
  environment:
    # ... other environment variables ...
    # Set the environment variable pointing to the DashScope API key inside the container
    MILVUSAI_DASHSCOPE_API_KEY: <MILVUSAI_DASHSCOPE_API_KEY>
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
schema.add_field("dense", DataType.FLOAT_VECTOR, dim=1024)
```

### Step 2: Add embedding function to schema

The Function module in Milvus automatically converts raw data stored in a scalar field into embeddings and stores them into the explicitly defined vector field.

The example below adds a Function module (`ali`) that converts the scalar field `"document"` into embeddings, storing the resulting vectors in the `"dense"` vector field defined earlier.

Once you have defined your embedding function, add it to your collection schema. This instructs Milvus to use the specified embedding function to process and store embeddings from your text data.

```python

# Define embedding function specifically for model provider
text_embedding_function = Function(
    name="ali",                                     # Unique identifier for this embedding function
    function_type=FunctionType.TEXTEMBEDDING,       # Indicates a text embedding function
    input_field_names=["document"],                 # Scalar field(s) containing text data to embed
    output_field_names=["dense"],                   # Vector field(s) for storing embeddings
    params={                                        # Provider-specific embedding parameters
        "provider": "dashscope",                    # Embedding provider name (must be "dashscope")
        "model_name": "text-embedding-v3",          # Specific embedding model used
        # Optional parameters:
        # "credential": "apikey_dev"                # Optional: Credential label specified in milvus.yaml
        # "dim": "1024",                            # Optional: Shorten the output vector dimension
    }
)

# Add the configured embedding function to your existing collection schema
schema.add_function(text_embedding_function)
```

## Next steps

After configuring the embedding function, refer to the [Function Overview](embedding-function-overview.md) for additional guidance on index configuration, data insertion examples, and semantic search operations.