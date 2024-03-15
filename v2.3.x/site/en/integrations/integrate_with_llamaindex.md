---
id: integrate_with_llamaindex.md
summary: This page goes over how to search for the best answer to questions using Milvus as the Vector Database and LlamaIndex as the embedding system.
---

# Retrieval-Augmented Generation (RAG) with Milvus and LlamaIndex

This guide demonstrates how to build a Retrieval-Augmented Generation (RAG) system using LlamaIndex and Milvus.

The RAG system combines a retrieval system with a generative model to generate new text based on a given prompt. The system first retrieves relevant documents from a corpus using a vector similarity search engine like Milvus, and then uses a generative model to generate new text based on the retrieved documents.

[LlamaIndex](https://www.llamaindex.ai/) is a simple, flexible data framework for connecting custom data sources to large language models (LLMs). [Milvus](https://milvus.io/) is the world's most advanced open-source vector database, built to power embedding similarity search and AI applications.

## Before you begin

Code snippets on this page require **pymilvus** and **llamaindex** libraries. You can install them using the following commands:

```shell
python3 -m pip install --upgrade pymilvus llama-index openai
```

What's more, LlamaIndex requires an LLM model at the backend. In this article, we will use the OpenAI as the LLM backend. You can sign up for a free API key at [OpenAI](https://openai.com/).

```python
import openai

openai.api_key = "sk-**************************"
```

## Prepare data

In this section, you need to prepare the data for the RAG system. Run the following command to download the example data.

```shell
!mkdir -p 'data/paul_graham/'
!wget 'https://raw.githubusercontent.com/run-llama/llama_index/main/docs/examples/data/paul_graham/paul_graham_essay.txt' -O 'data/paul_graham/paul_graham_essay.txt'
```

The example data is a single essay from Paul Graham titled *What I Worked On*. Before you can use it for the RAG system, you need to make it accessible to LLamaIndex.

```python
from llamaindex import SimpleDirectoryReader

# load documents
documents = SimpleDirectoryReader("./data/paul_graham/").load_data()

print("Document ID:", documents[0].doc_id)

# Document ID: d33f0397-b51a-4455-9b0f-88a101254d95
```

Now can can create a Milvus collection and insert the documents into it.

```python
from llama_index.core import VectorStoreIndex, StorageContext
from llama_index.vector_stores.milvus import MilvusVectorStore

vector_store = MilvusVectorStore(dim=1536, overwrite=True)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    documents, storage_context=storage_context
)
```

<div class="alert note">

The above code will generate a Milvus collection named **llamalection** on the Milvus server with default settings. You can include the following arguments to customize the MilvusVectorStore object to your needs:

- **uri**: the URI to connect to, comes in the form of "http://address:port" and defaults to "http://localhost:19530".
- **token**: the token used to authenticate the connection. You can leave it unspecified if RBAC is not enabled. Otherwise, use the username and password of an existing user. To be authenticated as the root user with the default password, use "root:Milvus".
- **collection_name**: the name of the Milvus collection to create or use.
- **dim**: the dimension of the vector embeddings. If it is not provided, collection creation will be done upon the first insertion.
- **embedding_field**: the name of the field used to hold vector embeddings in the collection to create, defaults to `DEFAULT_EMBEDDING_KEY`.
- **doc_id_field**: the name of the field used to hold doc IDs in the collection to create, defaults to `DEFAULT_DOC_ID_KEY`.
- **similarity_metric**: the similarity metric to use. Possible options are `IP` and `L2` and defaults to `IP`.
- **consistency_level**: the consistency level to use in the collection to create. Possible options are `Strong`, `Bounded`, `Staleness`, `Eventually`, and defaults to `Strong`.
- **overwrite**: whether to overwrite the existing collection if it exists.
- **text_key**: the name of the field that holds text in an existing collection, defaults to `None`. This applies only when you want to use an existing collection instead of create a new one.
- **index_config**: the index parameters used to build an index for the specified collection, defaults to `None`.
- **search_config**: the search parameters used to prepare searches in the specified collection, defaults to `None`.

</div>


## Query the data

Now that you have our document stored in the Milvus collection, you can ask questions against the collection. The collection will use its data as the knowledge base for ChatGPT to generate answers.

```python
query_engine = index.as_query_engine()
response = query_engine.query("What did the author learn?")
print(textwrap.fill(str(response), 100))

# The author learned several things during their time at Interleaf. They learned that it's better for technology companies to be run by product people than sales people, that code edited by too many people leads to bugs, that cheap office space is not worth it if it's depressing, that planned meetings are inferior to corridor conversations, that big bureaucratic customers can be a dangerous source of money, and that there's not much overlap between conventional office hours and the optimal time for hacking. However, the most important thing the author learned is that the low end eats the high end, meaning that it's advantageous to be the "entry level" option because if you're not, someone else will be and will surpass you.
```

Let's give it another try.

```python
response = query_engine.query("What was a hard moment for the author?")
print(textwrap.fill(str(response), 100))

# The author experienced a difficult moment when their mother had a stroke and was put in a nursing home. The stroke destroyed her balance, and the author and their sister were determined to help her get out of the nursing home and back to her house.
```

## Notes on overwriting the Milvus collection

If you want to reuse an existing Milvus collection and overwrite its data, you can use the `overwrite` argument when creating the `MilvusVectorStore` object.

```python
vector_store = MilvusVectorStore(
    dim=1536,
    overwrite=True,
)
```

In such a case, when you run the following code, all the data in the Milvus collection will be erased and replaced with the new data.

```python
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    [Document(text="The number that is being searched for is ten.")], 
    storage_context=storage_context
)
```

Now when you ask the same questions again, you will receive different answers.

If you want to append additional data to an existing Milvus collection, you should not use the `overwrite` argument or set it to `False` when creating the `MilvusVectorStore` object.

```python
vector_store = MilvusVectorStore(
    dim=1536,
    overwrite=False,
)
```

In such a case, when you run the following code, the new data will be appended to the existing data in the Milvus collection.

```python
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    documents, storage_context=storage_context
)
```

## Conclusion

In this article, we demonstrated how to build a (RAG) system using LlamaIndex and Milvus. We used the OpenAI as the LLM backend and prepared the example data for the RAG system. We also demonstrated how to query the data and generate new text using the ChatGPT model.
