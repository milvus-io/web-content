---
id: integrate_with_langchain.md
summary: This guide demonstrates how to build a Retrieval-Augmented Generation (RAG) system using LangChain and Milvus.
title: Retrieval-Augmented Generation (RAG) with Milvus and LangChain
---

# Retrieval-Augmented Generation (RAG) with Milvus and LangChain

This guide demonstrates how to build a Retrieval-Augmented Generation (RAG) system using LangChain and Milvus.

The RAG system combines a retrieval system with a generative model to generate new text based on a given prompt. The system first retrieves relevant documents from a corpus using a vector similarity search engine like Milvus, and then uses a generative model to generate new text based on the retrieved documents.

[LangChain](https://www.langchain.com/) is a framework for developing applications powered by large language models (LLMs). Milvus is the world's most advanced open-source vector database, built to power embedding similarity search and AI applications.

## Prerequisites

Before running this notebook, make sure you have the following dependencies installed:

```shell
pip install --upgrade --quiet  langchain langchain-core langchain-community langchain-text-splitters langchain-milvus langchain-openai bs4
```

We will use the models from OpenAI. You should prepare the api key OPENAI_API_KEY as an environment variable.

```python
import os
os.environ["OPENAI_API_KEY"] = "sk-***********"
```

## Prepare the data

We use the Langchain **WebBaseLoader** to load documents from web sources and split them into chunks using the **RecursiveCharacterTextSplitter**.

```python
import bs4
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Create a WebBaseLoader instance to load documents from web sources
loader = WebBaseLoader(
    web_paths=("https://lilianweng.github.io/posts/2023-06-23-agent/",),
    bs_kwargs=dict(
        parse_only=bs4.SoupStrainer(
            class_=("post-content", "post-title", "post-header")
        )
    ),
)
# Load documents from web sources using the loader
documents = loader.load()
# Initialize a RecursiveCharacterTextSplitter for splitting text into chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=200)

# Split the documents into chunks using the text_splitter
docs = text_splitter.split_documents(documents)

# Let's take a look at the first document
docs[1]
```

```python
Document(page_content='Fig. 1. Overview of a LLM-powered autonomous agent system.\nComponent One: Planning#\nA complicated task usually involves many steps. An agent needs to know what they are and plan ahead.\nTask Decomposition#\nChain of thought (CoT; Wei et al. 2022) has become a standard prompting technique for enhancing model performance on complex tasks. The model is instructed to “think step by step” to utilize more test-time computation to decompose hard tasks into smaller and simpler steps...', metadata={'source': 'https://lilianweng.github.io/posts/2023-06-23-agent/'})
```

As we can see, the document is already split into chunks. And the content of the data is about the AI agent.

## Build RAG chain with Milvus Vector Store

We will initialize a Milvus vector store with the documents, which load the documents into the Milvus vector store and build an index under the hood.

```python
from langchain_milvus import Milvus
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()

vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=embeddings,
    connection_args={
        "uri": './milvus_demo.db',
    },
    drop_old=True,  # Drop the old Milvus collection if it exists
)
```

Search the documents in the Milvus vector store using a test query question. We will get the top 3 documents.

```python
query = "What is self-reflection of an AI Agent?"
vectorstore.similarity_search(query, k=3)
```

The output will be the top 3 documents retrieved from the Milvus vector store.

```python
[Document(page_content='Self-Reflection#\nSelf-reflection is a vital aspect that allows autonomous agents to improve iteratively by refining past action decisions and correcting previous mistakes. It plays a crucial role in real-world tasks where trial and error are inevitable.\nReAct (Yao et al. 2023) integrates reasoning and acting within LLM by extending the action space to be a combination of task-specific discrete actions and the language space. The former enables LLM to interact with the environment (e.g. use Wikipedia search API), while the latter prompting LLM to generate reasoning traces in natural language.\nThe ReAct prompt template incorporates explicit steps for LLM to think, roughly formatted as:\nThought: ...\nAction: ...\nObservation: ...\n... (Repeated many times)', metadata={'source': 'https://lilianweng.github.io/posts/2023-06-23-agent/', 'pk': 449757808726900738}),
...
```

Then, we will use the retrieved documents to generate a response using a generative language model like OpenAI's GPT-3.

```python
from langchain_core.runnables import RunnablePassthrough
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI

# Initialize the OpenAI language model for response generation
llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)

# Define the prompt template for generating AI responses
PROMPT_TEMPLATE = """
Human: You are an AI assistant, and provides answers to questions by using fact based and statistical information when possible.
Use the following pieces of information to provide a concise answer to the question enclosed in <question> tags.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
<context>
{context}
</context>

<question>
{question}
</question>

The response should be specific and use statistics or numbers when possible.

Assistant:"""

# Create a PromptTemplate instance with the defined template and input variables
prompt = PromptTemplate(
    template=PROMPT_TEMPLATE, input_variables=["context", "question"]
)
# Convert the vector store to a retriever
retriever = vectorstore.as_retriever()


# Define a function to format the retrieved documents
def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)
```

Use the LangChain Expression Language (LCEL) to build a RAG chain.

```python
# Define the RAG (Retrieval-Augmented Generation) chain for AI response generation
rag_chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
)

# rag_chain.get_graph().print_ascii()

# Invoke the RAG chain with a specific question and retrieve the response
res = rag_chain.invoke(query)
res
```

The output will be a generated response based on the retrieved documents and the input question.

```python
"Self-reflection of an AI agent involves the process of synthesizing memories into higher-level inferences over time to guide the agent's future behavior. It includes recency, importance, and relevance factors to determine the salient high-level questions and optimize believability. This mechanism helps the agent improve iteratively by refining past action decisions and correcting previous mistakes."
```
