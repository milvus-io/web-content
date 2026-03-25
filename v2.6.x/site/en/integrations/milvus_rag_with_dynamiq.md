---
id: milvus_rag_with_dynamiq.md
summary: In this tutorial, we’ll explore how to seamlessly use Dynamiq with Milvus, the high-performance vector database purpose-built for RAG workflows. Milvus excels at efficient storage, indexing, and retrieval of vector embeddings, making it an indispensable component for AI systems that demand fast and precise contextual data access.
title: Getting Started with Dynamiq and Milvus
---

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/milvus_rag_with_dynamiq.ipynb" target="_parent">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/milvus_rag_with_dynamiq.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>

# Getting Started with Dynamiq and Milvus

[Dynamiq](https://www.getdynamiq.ai/) is a powerful Gen AI framework that streamlines the development of AI-powered applications. With robust support for retrieval-augmented generation (RAG) and large language model (LLM) agents, Dynamiq empowers developers to create intelligent, dynamic systems with ease and efficiency.

In this tutorial, we’ll explore how to seamlessly use Dynamiq with [Milvus](https://milvus.io/), the high-performance vector database purpose-built for RAG workflows. Milvus excels at efficient storage, indexing, and retrieval of vector embeddings, making it an indispensable component for AI systems that demand fast and precise contextual data access.

This step-by-step guide will cover two core RAG workflows:

- **Document Indexing Flow**: Learn how to process input files (e.g., PDFs), transform their content into vector embeddings, and store them in Milvus. Leveraging Milvus’s high-performance indexing capabilities ensures your data is ready for rapid retrieval.

- **Document Retrieval Flow**: Discover how to query Milvus for relevant document embeddings and use them to generate insightful, context-aware responses with Dynamiq’s LLM agents, creating a seamless AI-powered user experience.

By the end of this tutorial, you’ll gain a solid understanding of how Milvus and Dynamiq work together to build scalable, context-aware AI systems tailored to your needs.

## Preparation


### Download required libraries



```shell
$ pip install dynamiq pymilvus
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

### Configure the LLM agent

We will use OpenAI as the LLM in this example. You should prepare the [api key](https://platform.openai.com/docs/quickstart) `OPENAI_API_KEY` as an environment variable.



```python
import os

os.environ["OPENAI_API_KEY"] = "sk-***********"
```

## RAG - Document Indexing Flow

This tutorial demonstrates a Retrieval-Augmented Generation (RAG) workflow for indexing documents with Milvus as the vector database. The workflow takes input PDF files, processes them into smaller chunks, generates vector embeddings using OpenAI's embedding model, and stores the embeddings in a Milvus collection for efficient retrieval.

By the end of this workflow, you will have a scalable and efficient document indexing system that supports future RAG tasks like semantic search and question answering.

### Import Required Libraries and Initialize Workflow


```python
# Importing necessary libraries for the workflow
from io import BytesIO
from dynamiq import Workflow
from dynamiq.nodes import InputTransformer
from dynamiq.connections import (
    OpenAI as OpenAIConnection,
    Milvus as MilvusConnection,
    MilvusDeploymentType,
)
from dynamiq.nodes.converters import PyPDFConverter
from dynamiq.nodes.splitters.document import DocumentSplitter
from dynamiq.nodes.embedders import OpenAIDocumentEmbedder
from dynamiq.nodes.writers import MilvusDocumentWriter

# Initialize the workflow
rag_wf = Workflow()
```

### Define PDF Converter Node


```python
converter = PyPDFConverter(document_creation_mode="one-doc-per-page")
converter_added = rag_wf.flow.add_nodes(
    converter
)  # Add node to the DAG (Directed Acyclic Graph)
```

### Define Document Splitter Node


```python
document_splitter = DocumentSplitter(
    split_by="sentence",  # Splits documents into sentences
    split_length=10,
    split_overlap=1,
    input_transformer=InputTransformer(
        selector={
            "documents": f"${[converter.id]}.output.documents",
        },
    ),
).depends_on(
    converter
)  # Set dependency on the PDF converter
splitter_added = rag_wf.flow.add_nodes(document_splitter)  # Add to the DAG
```

### Define Embedding Node


```python
embedder = OpenAIDocumentEmbedder(
    connection=OpenAIConnection(api_key=os.environ["OPENAI_API_KEY"]),
    input_transformer=InputTransformer(
        selector={
            "documents": f"${[document_splitter.id]}.output.documents",
        },
    ),
).depends_on(
    document_splitter
)  # Set dependency on the splitter
document_embedder_added = rag_wf.flow.add_nodes(embedder)  # Add to the DAG
```

### Define Milvus Vector Store Node


```python
vector_store = (
    MilvusDocumentWriter(
        connection=MilvusConnection(
            deployment_type=MilvusDeploymentType.FILE, uri="./milvus.db"
        ),
        index_name="my_milvus_collection",
        dimension=1536,
        create_if_not_exist=True,
        metric_type="COSINE",
    )
    .inputs(documents=embedder.outputs.documents)  # Connect to embedder output
    .depends_on(embedder)  # Set dependency on the embedder
)
milvus_writer_added = rag_wf.flow.add_nodes(vector_store)  # Add to the DAG
```

    2024-11-19 22:14:03 - WARNING - Environment variable 'MILVUS_API_TOKEN' not found
    2024-11-19 22:14:03 - INFO - Pass in the local path ./milvus.db, and run it using milvus-lite
    2024-11-19 22:14:04 - DEBUG - Created new connection using: 0bef2849fdb1458a85df8bb9dd27f51d
    2024-11-19 22:14:04 - INFO - Collection my_milvus_collection does not exist. Creating a new collection.
    2024-11-19 22:14:04 - DEBUG - Successfully created collection: my_milvus_collection
    2024-11-19 22:14:05 - DEBUG - Successfully created an index on collection: my_milvus_collection
    2024-11-19 22:14:05 - DEBUG - Successfully created an index on collection: my_milvus_collection


<div class="alert note">

Milvus offers two deployment types, catering to different use cases:


1. **MilvusDeploymentType.FILE**

- Ideal for **local prototyping** or **small-scale data** storage.
- Set the `uri` to a local file path (e.g., `./milvus.db`) to leverage [Milvus Lite](https://milvus.io/docs/milvus_lite.md), which automatically stores all data in the specified file.
- This is a convenient option for **quick setup** and **experimentation**.


2. **MilvusDeploymentType.HOST**

- Designed for **large-scale data** scenarios, such as managing over a million vectors.

    **Self-Hosted Server**

    - Deploy a high-performance Milvus server using [Docker or Kubernetes](https://milvus.io/docs/quickstart.md).
    - Configure the server’s address and port as the `uri` (e.g., `http://localhost:19530`).
    - If authentication is enabled:
    - Provide `<your_username>:<your_password>` as the `token`.
    - If authentication is disabled:
    - Leave the `token` unset.

    **Zilliz Cloud (Managed Service)**

    - For a fully managed, cloud-based Milvus experience, use [Zilliz Cloud](https://zilliz.com/cloud).
    - Set the `uri` and `token` according to the [Public Endpoint and API key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details) provided in the Zilliz Cloud console.

</div>

### Define Input Data and Run the Workflow


```python
file_paths = ["./pdf_files/WhatisMilvus.pdf"]
input_data = {
    "files": [BytesIO(open(path, "rb").read()) for path in file_paths],
    "metadata": [{"filename": path} for path in file_paths],
}

# Run the workflow with the prepared input data
inserted_data = rag_wf.run(input_data=input_data)
```

    /var/folders/09/d0hx80nj35sb5hxb5cpc1q180000gn/T/ipykernel_31319/3145804345.py:4: ResourceWarning: unclosed file <_io.BufferedReader name='./pdf_files/WhatisMilvus.pdf'>
      BytesIO(open(path, "rb").read()) for path in file_paths
    ResourceWarning: Enable tracemalloc to get the object allocation traceback
    2024-11-19 22:14:09 - INFO - Workflow 87878444-6a3d-43f3-ae32-0127564a959f: execution started.
    2024-11-19 22:14:09 - INFO - Flow b30b48ec-d5d2-4e4c-8e25-d6976c8a9c17: execution started.
    2024-11-19 22:14:09 - INFO - Node PyPDF File Converter - 6eb42b1f-7637-407b-a3ac-4167bcf3b5c4: execution started.
    2024-11-19 22:14:09 - INFO - Node PyPDF File Converter - 6eb42b1f-7637-407b-a3ac-4167bcf3b5c4: execution succeeded in 58ms.
    2024-11-19 22:14:09 - INFO - Node DocumentSplitter - 5baed580-6de0-4dcd-bace-d7d947ab6c7f: execution started.
    /Users/jinhonglin/anaconda3/envs/myenv/lib/python3.11/site-packages/websockets/legacy/__init__.py:6: DeprecationWarning: websockets.legacy is deprecated; see https://websockets.readthedocs.io/en/stable/howto/upgrade.html for upgrade instructions
      warnings.warn(  # deprecated in 14.0 - 2024-11-09
    /Users/jinhonglin/anaconda3/envs/myenv/lib/python3.11/site-packages/pydantic/fields.py:804: PydanticDeprecatedSince20: Using extra keyword arguments on `Field` is deprecated and will be removed. Use `json_schema_extra` instead. (Extra keys: 'is_accessible_to_agent'). Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.7/migration/
      warn(
    2024-11-19 22:14:09 - INFO - Node DocumentSplitter - 5baed580-6de0-4dcd-bace-d7d947ab6c7f: execution succeeded in 104ms.
    2024-11-19 22:14:09 - INFO - Node OpenAIDocumentEmbedder - 91928f67-a00f-48f6-a864-f6e21672ec7e: execution started.
    2024-11-19 22:14:09 - INFO - Node OpenAIDocumentEmbedder - d30a4cdc-0fab-4aff-b2e5-6161a62cb6fd: execution started.
    2024-11-19 22:14:10 - INFO - HTTP Request: POST https://api.openai.com/v1/embeddings "HTTP/1.1 200 OK"
    2024-11-19 22:14:10 - INFO - Node OpenAIDocumentEmbedder - d30a4cdc-0fab-4aff-b2e5-6161a62cb6fd: execution succeeded in 724ms.
    2024-11-19 22:14:10 - INFO - Node MilvusDocumentWriter - dddab4cc-1dae-4e7e-9101-1ec353f530da: execution started.
    2024-11-19 22:14:10 - INFO - HTTP Request: POST https://api.openai.com/v1/embeddings "HTTP/1.1 200 OK"
    2024-11-19 22:14:10 - INFO - Node MilvusDocumentWriter - dddab4cc-1dae-4e7e-9101-1ec353f530da: execution succeeded in 66ms.
    2024-11-19 22:14:10 - INFO - Node OpenAIDocumentEmbedder - 91928f67-a00f-48f6-a864-f6e21672ec7e: execution succeeded in 961ms.
    2024-11-19 22:14:10 - INFO - Flow b30b48ec-d5d2-4e4c-8e25-d6976c8a9c17: execution succeeded in 1.3s.
    2024-11-19 22:14:10 - INFO - Workflow 87878444-6a3d-43f3-ae32-0127564a959f: execution succeeded in 1.3s.


Through this workflow, we have successfully implemented a document indexing pipeline using Milvus as the vector database and OpenAI's embedding model for semantic representation. This setup enables fast and accurate vector-based retrieval, forming the foundation for RAG workflows like semantic search, document retrieval, and contextual AI-driven interactions.

With Milvus's scalable storage capabilities and Dynamiq's orchestration, this solution is ready for both prototyping and large-scale production deployments. You can now extend this pipeline to include additional tasks like retrieval-based question answering or AI-driven content generation.

## RAG Document Retrieval Flow

In this tutorial, we implement a Retrieval-Augmented Generation (RAG) document retrieval workflow. This workflow takes a user query, generates a vector embedding for it, retrieves the most relevant documents from a Milvus vector database, and uses a large language model (LLM) to generate a detailed and context-aware answer based on the retrieved documents.

By following this workflow, you will create an end-to-end solution for semantic search and question answering, combining the power of vector-based document retrieval with the capabilities of OpenAI’s advanced LLMs. This approach enables efficient and intelligent responses to user queries by leveraging the stored knowledge in your document database.

### Import Required Libraries and Initialize Workflow


```python
from dynamiq import Workflow
from dynamiq.connections import (
    OpenAI as OpenAIConnection,
    Milvus as MilvusConnection,
    MilvusDeploymentType,
)
from dynamiq.nodes.embedders import OpenAITextEmbedder
from dynamiq.nodes.retrievers import MilvusDocumentRetriever
from dynamiq.nodes.llms import OpenAI
from dynamiq.prompts import Message, Prompt

# Initialize the workflow
retrieval_wf = Workflow()
```

### Define OpenAI Connection and Text Embedder


```python
# Establish OpenAI connection
openai_connection = OpenAIConnection(api_key=os.environ["OPENAI_API_KEY"])

# Define the text embedder node
embedder = OpenAITextEmbedder(
    connection=openai_connection,
    model="text-embedding-3-small",
)

# Add the embedder node to the workflow
embedder_added = retrieval_wf.flow.add_nodes(embedder)
```

### Define Milvus Document Retriever


```python
document_retriever = (
    MilvusDocumentRetriever(
        connection=MilvusConnection(
            deployment_type=MilvusDeploymentType.FILE, uri="./milvus.db"
        ),
        index_name="my_milvus_collection",
        dimension=1536,
        top_k=5,
    )
    .inputs(embedding=embedder.outputs.embedding)  # Connect to embedder output
    .depends_on(embedder)  # Dependency on the embedder node
)

# Add the retriever node to the workflow
milvus_retriever_added = retrieval_wf.flow.add_nodes(document_retriever)
```

    2024-11-19 22:14:19 - WARNING - Environment variable 'MILVUS_API_TOKEN' not found
    2024-11-19 22:14:19 - INFO - Pass in the local path ./milvus.db, and run it using milvus-lite
    2024-11-19 22:14:19 - DEBUG - Created new connection using: 98d1132773af4298a894ad5925845fd2
    2024-11-19 22:14:19 - INFO - Collection my_milvus_collection already exists. Skipping creation.


###  Define the Prompt Template


```python
# Define the prompt template for the LLM
prompt_template = """
Please answer the question based on the provided context.

Question: {{ query }}

Context:
{% for document in documents %}
- {{ document.content }}
{% endfor %}
"""

# Create the prompt object
prompt = Prompt(messages=[Message(content=prompt_template, role="user")])
```

### Define the Answer Generator



```python
answer_generator = (
    OpenAI(
        connection=openai_connection,
        model="gpt-4o",
        prompt=prompt,
    )
    .inputs(
        documents=document_retriever.outputs.documents,
        query=embedder.outputs.query,
    )
    .depends_on(
        [document_retriever, embedder]
    )  # Dependencies on retriever and embedder
)

# Add the answer generator node to the workflow
answer_generator_added = retrieval_wf.flow.add_nodes(answer_generator)
```

### Run the Workflow


```python
# Run the workflow with a sample query
sample_query = "What is the Advanced Search Algorithms in Milvus?"

result = retrieval_wf.run(input_data={"query": sample_query})

answer = result.output.get(answer_generator.id).get("output", {}).get("content")
print(answer)
```

    2024-11-19 22:14:22 - INFO - Workflow f4a073fb-dfb6-499c-8cac-5710a7ad6d47: execution started.
    2024-11-19 22:14:22 - INFO - Flow b30b48ec-d5d2-4e4c-8e25-d6976c8a9c17: execution started.
    2024-11-19 22:14:22 - INFO - Node OpenAITextEmbedder - 47afb0bc-cf96-429d-b58f-11b6c935fec3: execution started.
    2024-11-19 22:14:23 - INFO - HTTP Request: POST https://api.openai.com/v1/embeddings "HTTP/1.1 200 OK"
    2024-11-19 22:14:23 - INFO - Node OpenAITextEmbedder - 47afb0bc-cf96-429d-b58f-11b6c935fec3: execution succeeded in 474ms.
    2024-11-19 22:14:23 - INFO - Node MilvusDocumentRetriever - 51c8311b-4837-411f-ba42-21e28239a2ee: execution started.
    2024-11-19 22:14:23 - INFO - Node MilvusDocumentRetriever - 51c8311b-4837-411f-ba42-21e28239a2ee: execution succeeded in 23ms.
    2024-11-19 22:14:23 - INFO - Node LLM - ac722325-bece-453f-a2ed-135b0749ee7a: execution started.
    2024-11-19 22:14:24 - INFO - HTTP Request: POST https://api.openai.com/v1/chat/completions "HTTP/1.1 200 OK"
    2024-11-19 22:14:24 - INFO - Node LLM - ac722325-bece-453f-a2ed-135b0749ee7a: execution succeeded in 1.8s.
    2024-11-19 22:14:25 - INFO - Flow b30b48ec-d5d2-4e4c-8e25-d6976c8a9c17: execution succeeded in 2.4s.
    2024-11-19 22:14:25 - INFO - Workflow f4a073fb-dfb6-499c-8cac-5710a7ad6d47: execution succeeded in 2.4s.


    The advanced search algorithms in Milvus include a variety of in-memory and on-disk indexing/search algorithms such as IVF (Inverted File), HNSW (Hierarchical Navigable Small World), and DiskANN. These algorithms have been deeply optimized to enhance performance, delivering 30%-70% better performance compared to popular implementations like FAISS and HNSWLib. These optimizations are part of Milvus's design to ensure high efficiency and scalability in handling vector data.

