---
id: integrate_with_langfuse.md
summary: This is a simple cookbook that demonstrates how to use the LlamaIndex Langfuse integration. It uses Milvus Lite to store the documents and Query.
title: Cookbook LlamaIndex & Milvus Integration
---

# Cookbook - LlamaIndex & Milvus Integration

<a target="_blank" href="https://colab.research.google.com/github/langfuse/langfuse-docs/blob/main/cookbook/integration_llama-index_milvus-lite.ipynb">
  <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>

This is a simple cookbook that demonstrates how to use the [LlamaIndex Langfuse integration](https://langfuse.com/docs/integrations/llama-index/get-started). It uses Milvus Lite to store the documents and Query. 

[Milvus Lite](https://github.com/milvus-io/milvus-lite/) is the lightweight version of Milvus, an open-source vector database that powers AI applications with vector embeddings and similarity search.

## Setup

Make sure you have both `llama-index` and `langfuse` installed.


```python
$ pip install llama-index langfuse llama-index-vector-stores-milvus --upgrade
```

Initialize the integration. Get your API keys from the [Langfuse project settings](https://cloud.langfuse.com), and replace public_key secret_key with your key values. This example uses OpenAI for embeddings and chat completions, so you also need to specify your OpenAI key in environment variable.


```python
import os

# Get keys for your project from the project settings page
# https://cloud.langfuse.com
os.environ["LANGFUSE_PUBLIC_KEY"] = ""
os.environ["LANGFUSE_SECRET_KEY"] = ""
os.environ["LANGFUSE_HOST"] = "https://cloud.langfuse.com" # 🇪🇺 EU region
# os.environ["LANGFUSE_HOST"] = "https://us.cloud.langfuse.com" # 🇺🇸 US region

# Your openai key
os.environ["OPENAI_API_KEY"] = ""
```


```python
from llama_index.core import Settings
from llama_index.core.callbacks import CallbackManager
from langfuse.llama_index import LlamaIndexCallbackHandler
 
langfuse_callback_handler = LlamaIndexCallbackHandler()
Settings.callback_manager = CallbackManager([langfuse_callback_handler])
```

## Index using Milvus Lite


```python
from llama_index.core import Document

doc1 = Document(text="""
Maxwell "Max" Silverstein, a lauded movie director, screenwriter, and producer, was born on October 25, 1978, in Boston, Massachusetts. A film enthusiast from a young age, his journey began with home movies shot on a Super 8 camera. His passion led him to the University of Southern California (USC), majoring in Film Production. Eventually, he started his career as an assistant director at Paramount Pictures. Silverstein's directorial debut, “Doors Unseen,” a psychological thriller, earned him recognition at the Sundance Film Festival and marked the beginning of a successful directing career.
""")
doc2 = Document(text="""
Throughout his career, Silverstein has been celebrated for his diverse range of filmography and unique narrative technique. He masterfully blends suspense, human emotion, and subtle humor in his storylines. Among his notable works are "Fleeting Echoes," "Halcyon Dusk," and the Academy Award-winning sci-fi epic, "Event Horizon's Brink." His contribution to cinema revolves around examining human nature, the complexity of relationships, and probing reality and perception. Off-camera, he is a dedicated philanthropist living in Los Angeles with his wife and two children.
""")
```


```python
# Example index construction + LLM query

from llama_index.core import VectorStoreIndex
from llama_index.core import StorageContext
from llama_index.vector_stores.milvus import MilvusVectorStore


vector_store = MilvusVectorStore(
    uri="tmp/milvus_demo.db", dim=1536, overwrite=False
)
storage_context = StorageContext.from_defaults(vector_store=vector_store)

index = VectorStoreIndex.from_documents(
    [doc1,doc2], storage_context=storage_context
)
```

## Query


```python
# Query
response = index.as_query_engine().query("What did he do growing up?")
print(response)
```


```python
# Chat
response = index.as_chat_engine().chat("What did he do growing up?")
print(response)
```

## Explore traces in Langfuse


```python
# As we want to immediately see result in Langfuse, we need to flush the callback handler
langfuse_callback_handler.flush()
```

Done! ✨ You see traces of your index and query in your Langfuse project.

Example traces (public links):
1. [Query](https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/2b26fc72-044f-4b0b-a3c3-485328975161)
2. [Query (chat)](https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/72503163-2b25-4693-9cc9-56190b8e32b9)

Trace in Langfuse:

![Langfuse Traces](https://static.langfuse.com/llamaindex-langfuse-docs.gif)


## Interested in more advanced features?

See the full [integration docs](https://langfuse.com/docs/integrations/llama-index/get-started) to learn more about advanced features and how to use them:

- Interoperability with Langfuse Python SDK and other integrations
- Add custom metadata and attributes to the traces
