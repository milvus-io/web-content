---
id: bedrock.md
title: "Bedrock"
summary: "This topic describes how to configure and use Amazon Bedrock embedding functions in Milvus."
beta: Milvus 2.6.x
---

# Bedrock

This topic describes how to configure and use Amazon Bedrock embedding functions in Milvus.

## Choose an embedding model

Milvus supports embedding models provided by Amazon Bedrock. Below are the currently available embedding models for quick reference:

<table>
   <tr>
     <th><p>Model Name</p></th>
     <th><p>Dimensions</p></th>
     <th><p>Max Tokens</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p>amazon.titan-embed-text-v2:0</p></td>
     <td><p>1,024 (default), 512, 256</p></td>
     <td><p>8,192</p></td>
     <td><p>RAG, document search, reranking, classification, etc.</p></td>
   </tr>
</table>

For details, refer to [Amazon Titan Text Embeddings models](https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html).

## Configure credentials

Milvus must know your Bedrock access credentials before it can request embeddings. Milvus provides two methods to configure credentials:

- **Configuration file (recommended):** Store the credentials in `milvus.yaml` so every restart and node picks it up automatically.

- **Environment variables:** Inject the credentials at deploy time—ideal for Docker Compose.

Choose one of the two methods below—the configuration file is easier to maintain on bare-metal and VMs, while the env-var route fits container workflows.

<div class="alert note">

If a credential for the same provider is present in both the configuration file and an environment variable, Milvus always uses the value in `milvus.yaml` and ignores the environment variable.

</div>

### Option 1: Configuration file (recommended & higher priority)

Keep your credentials in `milvus.yaml`; Milvus reads them at startup and overrides any environment variable for the same provider.

1. **Declare your credentials under `credential:`

    You may list one or many credentials—give each a label you invent and will reference later.

    ```yaml
    # milvus.yaml
    credential:
      aksk_dev:            # dev environment
        access_key_id: <YOUR_DEV_ACCESS_KEY_ID>
        secret_access_key: <YOUR_DEV_SECRET_ACCESS_KEY>
      aksk_prod:           # production environment
        access_key_id: <YOUR_PROD_ACCESS_KEY_ID>    
        secret_access_key: <YOUR_PROD_SECRET_ACCESS_KEY>
    ```

    Putting the credentials here makes them persistent across restarts and lets you switch credentials just by changing a label.

1. **Tell Milvus which credential to use for service calls**

    In the same file, point the Bedrock provider at the label you want it to use.

    ```yaml
    function:
      textEmbedding:
        providers:
          bedrock:
            credential: aksk_dev      # ← choose any label you defined above
    ```

    This binds a specific credential to every request Milvus sends to the Bedrock embedding service.

### Option 2: Environment variable

Use this method when you run Milvus with Docker Compose and prefer to keep secrets out of files and images.

Milvus falls back to the environment variable only if no credential for the provider is found in `milvus.yaml`.

<table>
   <tr>
     <th><p>Variable</p></th>
     <th><p>Required</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>MILVUSAI_BEDROCK_ACCESS_KEY_ID</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Your AWS access key ID used for authentication with the Bedrock service.</p></td>
   </tr>
   <tr>
     <td><p><code>MILVUSAI_BEDROCK_SECRET_ACCESS_KEY</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Your AWS secret access key corresponding to your access key ID.</p></td>
   </tr>
</table>

In your **docker-compose.yaml** file, set the `MILVUSAI_OPENAI_API_KEY` environment variable.

```yaml
# docker-compose.yaml (standalone service section)
standalone:
  # ... other configurations ...
  environment:
    # ... other environment variables ...
    # Set the environment variable pointing to the Bedrock embedding service inside the container
    MILVUSAI_BEDROCK_ACCESS_KEY_ID: <MILVUSAI_BEDROCK_ACCESS_KEY_ID>
    MILVUSAI_BEDROCK_SECRET_ACCESS_KEY: <MILVUSAI_BEDROCK_SECRET_ACCESS_KEY>
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

### Step 2: Add function to schema

The Function module in Milvus automatically converts raw data stored in a scalar field into embeddings and stores them into the explicitly defined vector field.

The example below adds a Function module (`bedrk`) that converts the scalar field `"document"` into embeddings, storing the resulting vectors in the `"dense"` vector field defined earlier.

Once you have defined your embedding function, add it to your collection schema. This instructs Milvus to use the specified embedding function to process and store embeddings from your text data.

```python
# Define embedding function specifically for OpenAI provider
text_embedding_function = Function(
    name="bedrk",                                   # Unique identifier for this embedding function
    function_type=FunctionType.TEXTEMBEDDING,       # Indicates a text embedding function
    input_field_names=["document"],                 # Scalar field(s) containing text data to embed
    output_field_names=["dense"],                   # Vector field(s) for storing embeddings
    params={                                      # Provider-specific embedding parameters (function-level)
        "provider": "bedrock",                      # Must be set to "bedrock"
        "model_name": "amazon.titan-embed-text-v2:0",    # Specifies the embedding model to use
        "region": "us-east-2",                           # Required: AWS region where the Bedrock service is hosted     
        # Optional parameters:
        # "credential": "aksk_dev",               # Optional: Credential label specified in milvus.yaml
        # "dim": "1024",                          # Output dimension of the vector embeddings after truncation
        # "normalize": "true",                    # Whether to normalize the output embeddings
    }
)

# Add the configured embedding function to your existing collection schema
schema.add_function(text_embedding_function)
```

## Next steps

After configuring the embedding function, refer to the [Function Overview](embedding-function-overview.md) for additional guidance on index configuration, data insertion examples, and semantic search operations.