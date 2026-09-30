---
id: yandex-cloud.md
title: "Yandex Cloud"
summary: "This topic describes how to configure and use Yandex Cloud embedding functions in Milvus."
beta: Milvus 2.6.x
---

# Yandex Cloud

This topic describes how to configure and use Yandex Cloud embedding functions in Milvus.

## Choose an embedding model

Milvus supports Yandex Cloud AI Studio text vectorization models through the `yc` provider. In the Function parameters, set `model_name` to the Yandex Cloud model URI that Milvus should call.

For example, Yandex Text Embeddings for documents use a model URI such as `emb://<folder_ID>/text-search-doc/latest` and return 256-dimensional vectors. For available model URIs and dimensions, refer to [Text vectorization models](https://aistudio.yandex.ru/docs/en/ai-studio/concepts/embeddings).

## Configure credentials

Milvus must know your Yandex Cloud API key before it can request embeddings. You can configure the API key in `milvus.yaml` or through an environment variable.

### Option 1: Configuration file

Store your API key in `milvus.yaml` and point the Yandex Cloud provider to the credential label.

```yaml
# milvus.yaml
credential:
  yandex_apikey:
    apikey: <YOUR_YC_API_KEY>

function:
  textEmbedding:
    providers:
      yc:
        credential: yandex_apikey
        # url: https://llm.api.cloud.yandex.net/foundationModels/v1/textEmbedding
```

### Option 2: Environment variable

If no matching credential is configured in `milvus.yaml`, Milvus can read the Yandex Cloud API key from the following environment variable:

<table>
   <tr>
     <th><p>Variable</p></th>
     <th><p>Required?</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>MILVUS_YC_API_KEY</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Yandex Cloud API key used by the Milvus service to call Yandex Cloud AI Studio.</p></td>
   </tr>
</table>

## Use embedding function

Once credentials are configured, define a schema with an input text field and an output vector field, then add a Yandex Cloud embedding Function to the schema.

```python
from pymilvus import MilvusClient, DataType, Function, FunctionType

client = MilvusClient(uri="http://localhost:19530")

schema = client.create_schema()
schema.add_field("id", DataType.INT64, is_primary=True, auto_id=False)
schema.add_field("document", DataType.VARCHAR, max_length=9000)
schema.add_field("dense", DataType.FLOAT_VECTOR, dim=256)

text_embedding_function = Function(
    name="yandex_cloud_embedding",
    function_type=FunctionType.TEXTEMBEDDING,
    input_field_names=["document"],
    output_field_names=["dense"],
    params={
        "provider": "yc",
        "model_name": "emb://<folder_ID>/text-search-doc/latest",
        "credential": "yandex_apikey",
        "dim": "256",
    },
)

schema.add_function(text_embedding_function)
```

### Yandex Cloud-specific parameters

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Required?</p></th>
     <th><p>Description</p></th>
     <th><p>Value / Example</p></th>
   </tr>
   <tr>
     <td><p><code>provider</code></p></td>
     <td><p>Yes</p></td>
     <td><p>The embedding model provider to use.</p></td>
     <td><p><code>"yc"</code></p></td>
   </tr>
   <tr>
     <td><p><code>model_name</code></p></td>
     <td><p>Yes</p></td>
     <td><p>The Yandex Cloud model URI to call.</p></td>
     <td><p><code>"emb://&lt;folder_ID&gt;/text-search-doc/latest"</code></p></td>
   </tr>
   <tr>
     <td><p><code>credential</code></p></td>
     <td><p>No</p></td>
     <td><p>The label of a credential defined in the top-level <code>credential:</code> section of <code>milvus.yaml</code>.</p></td>
     <td><p><code>"yandex_apikey"</code></p></td>
   </tr>
   <tr>
     <td><p><code>dim</code></p></td>
     <td><p>No</p></td>
     <td><p>The output vector dimension. If set, the value must match the dimension of the output vector field.</p></td>
     <td><p><code>"256"</code></p></td>
   </tr>
</table>

## Next steps

After configuring the embedding function, refer to [Embedding Function Overview](embedding-function-overview.md) for guidance on creating indexes, inserting data, and running semantic search.
