---
id: integrate_with_langchain.md
summary: This guide demonstrates how to build a Retrieval-Augmented Generation (RAG) system using LangChain and Milvus.
title: Retrieval-Augmented Generation (RAG) with Milvus and LangChain
---

# Retrieval-Augmented Generation (RAG) with Milvus and LangChain

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_langchain.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

This guide demonstrates how to build a Retrieval-Augmented Generation (RAG) system using LangChain and Milvus.

The RAG system combines a retrieval system with a generative model to generate new text based on a given prompt. The system first retrieves relevant documents from a corpus using Milvus, and then uses a generative model to generate new text based on the retrieved documents.

[LangChain](https://www.langchain.com/) is a framework for developing applications powered by large language models (LLMs). [Milvus](https://milvus.io/) is the world's most advanced open-source vector database, built to power embedding similarity search and AI applications.



## Prerequisites

Before running this notebook, make sure you have the following dependencies installed:


```python
$ pip install --upgrade --quiet  langchain langchain-core langchain-community langchain-text-splitters langchain-milvus langchain-openai bs4
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime**. (Click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

We will use the models from OpenAI. You should prepare the [api key](https://platform.openai.com/docs/quickstart) `OPENAI_API_KEY` as an environment variable.


```python
import os

os.environ["OPENAI_API_KEY"] = "sk-***********"
```


## Prepare the data

We use the Langchain WebBaseLoader to load documents from web sources and split them into chunks using the RecursiveCharacterTextSplitter.



```python
import bs4
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Create a WebBaseLoader instance to load documents from web sources
loader = WebBaseLoader(
    web_paths=(
        "https://lilianweng.github.io/posts/2023-06-23-agent/",
        "https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/",
    ),
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




    Document(page_content='Fig. 1. Overview of a LLM-powered autonomous agent system.\nComponent One: Planning#\nA complicated task usually involves many steps. An agent needs to know what they are and plan ahead.\nTask Decomposition#\nChain of thought (CoT; Wei et al. 2022) has become a standard prompting technique for enhancing model performance on complex tasks. The model is instructed to “think step by step” to utilize more test-time computation to decompose hard tasks into smaller and simpler steps. CoT transforms big tasks into multiple manageable tasks and shed lights into an interpretation of the model’s thinking process.\nTree of Thoughts (Yao et al. 2023) extends CoT by exploring multiple reasoning possibilities at each step. It first decomposes the problem into multiple thought steps and generates multiple thoughts per step, creating a tree structure. The search process can be BFS (breadth-first search) or DFS (depth-first search) with each state evaluated by a classifier (via a prompt) or majority vote.\nTask decomposition can be done (1) by LLM with simple prompting like "Steps for XYZ.\\n1.", "What are the subgoals for achieving XYZ?", (2) by using task-specific instructions; e.g. "Write a story outline." for writing a novel, or (3) with human inputs.\nAnother quite distinct approach, LLM+P (Liu et al. 2023), involves relying on an external classical planner to do long-horizon planning. This approach utilizes the Planning Domain Definition Language (PDDL) as an intermediate interface to describe the planning problem. In this process, LLM (1) translates the problem into “Problem PDDL”, then (2) requests a classical planner to generate a PDDL plan based on an existing “Domain PDDL”, and finally (3) translates the PDDL plan back into natural language. Essentially, the planning step is outsourced to an external tool, assuming the availability of domain-specific PDDL and a suitable planner which is common in certain robotic setups but not in many other domains.\nSelf-Reflection#', metadata={'source': 'https://lilianweng.github.io/posts/2023-06-23-agent/'})



As we can see, the document is already split into chunks. And the content of the data is about the AI agent.

## Build RAG chain with Milvus Vector Store

We will initialize a Milvus vector store with the documents, which load the documents into the Milvus vector store and build an index under the hood.


```python
from langchain_milvus import Milvus, Zilliz
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()

vectorstore = Milvus.from_documents(  # or Zilliz.from_documents
    documents=docs,
    embedding=embeddings,
    connection_args={
        "uri": "./milvus_demo.db",
    },
    drop_old=True,  # Drop the old Milvus collection if it exists
)
```

<div class="alert note">

For the `connection_args`:
- Setting the `uri` as a local file, e.g.`./milvus.db`, is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.
- If you have large scale of data, you can set up a more performant Milvus server on [docker or kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server uri, e.g.`http://localhost:19530`, as your `uri`.
- If you want to use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, replace `Milvus.from_documents` with `Zilliz.from_documents`, and adjust the `uri` and `token`, which correspond to the [Public Endpoint and Api key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) in Zilliz Cloud.

</div>

Search the documents in the Milvus vector store using a test query question. Let's take a look at the top 1 document.


```python
query = "What is self-reflection of an AI Agent?"
vectorstore.similarity_search(query, k=1)
```




    [Document(page_content='Self-Reflection#\nSelf-reflection is a vital aspect that allows autonomous agents to improve iteratively by refining past action decisions and correcting previous mistakes. It plays a crucial role in real-world tasks where trial and error are inevitable.\nReAct (Yao et al. 2023) integrates reasoning and acting within LLM by extending the action space to be a combination of task-specific discrete actions and the language space. The former enables LLM to interact with the environment (e.g. use Wikipedia search API), while the latter prompting LLM to generate reasoning traces in natural language.\nThe ReAct prompt template incorporates explicit steps for LLM to think, roughly formatted as:\nThought: ...\nAction: ...\nObservation: ...\n... (Repeated many times)', metadata={'source': 'https://lilianweng.github.io/posts/2023-06-23-agent/', 'pk': 449281835035555859})]




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

Use the LCEL(LangChain Expression Language) to build a RAG chain.


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




    "Self-reflection of an AI agent involves the process of synthesizing memories into higher-level inferences over time to guide the agent's future behavior. It serves as a mechanism to create higher-level summaries of past events. One approach to self-reflection involves prompting the language model with the 100 most recent observations and asking it to generate the 3 most salient high-level questions based on those observations. This process helps the AI agent optimize believability in the current moment and over time."



Congratulations! You have built a basic RAG chain powered by Milvus and LangChain.

## Metadata filtering

We can use the [Milvus Scalar Filtering Rules](https://milvus.io/docs/boolean.md) to filter the documents based on metadata. We have loaded the documents from two different sources, and we can filter the documents by the metadata `source`.


```python
vectorstore.similarity_search(
    "What is CoT?",
    k=1,
    expr="source == 'https://lilianweng.github.io/posts/2023-06-23-agent/'",
)

# The same as:
# vectorstore.as_retriever(search_kwargs=dict(
#     k=1,
#     expr="source == 'https://lilianweng.github.io/posts/2023-06-23-agent/'",
# )).invoke("What is CoT?")
```




    [Document(page_content='Fig. 1. Overview of a LLM-powered autonomous agent system.\nComponent One: Planning#\nA complicated task usually involves many steps. An agent needs to know what they are and plan ahead.\nTask Decomposition#\nChain of thought (CoT; Wei et al. 2022) has become a standard prompting technique for enhancing model performance on complex tasks. The model is instructed to “think step by step” to utilize more test-time computation to decompose hard tasks into smaller and simpler steps. CoT transforms big tasks into multiple manageable tasks and shed lights into an interpretation of the model’s thinking process.\nTree of Thoughts (Yao et al. 2023) extends CoT by exploring multiple reasoning possibilities at each step. It first decomposes the problem into multiple thought steps and generates multiple thoughts per step, creating a tree structure. The search process can be BFS (breadth-first search) or DFS (depth-first search) with each state evaluated by a classifier (via a prompt) or majority vote.\nTask decomposition can be done (1) by LLM with simple prompting like "Steps for XYZ.\\n1.", "What are the subgoals for achieving XYZ?", (2) by using task-specific instructions; e.g. "Write a story outline." for writing a novel, or (3) with human inputs.\nAnother quite distinct approach, LLM+P (Liu et al. 2023), involves relying on an external classical planner to do long-horizon planning. This approach utilizes the Planning Domain Definition Language (PDDL) as an intermediate interface to describe the planning problem. In this process, LLM (1) translates the problem into “Problem PDDL”, then (2) requests a classical planner to generate a PDDL plan based on an existing “Domain PDDL”, and finally (3) translates the PDDL plan back into natural language. Essentially, the planning step is outsourced to an external tool, assuming the availability of domain-specific PDDL and a suitable planner which is common in certain robotic setups but not in many other domains.\nSelf-Reflection#', metadata={'source': 'https://lilianweng.github.io/posts/2023-06-23-agent/', 'pk': 449281835035555858})]



If we want to dynamically change the search parameters without rebuilding the chain, we can [configure the runtime chain internals](https://python.langchain.com/v0.2/docs/how_to/configure/) . Let's define a new retriever with this dynamically configure and use it to build a new RAG chain.


```python
from langchain_core.runnables import ConfigurableField

# Define a new retriever with a configurable field for search_kwargs
retriever2 = vectorstore.as_retriever().configurable_fields(
    search_kwargs=ConfigurableField(
        id="retriever_search_kwargs",
    )
)

# Invoke the retriever with a specific search_kwargs which filter the documents by source
retriever2.with_config(
    configurable={
        "retriever_search_kwargs": dict(
            expr="source == 'https://lilianweng.github.io/posts/2023-06-23-agent/'",
            k=1,
        )
    }
).invoke(query)
```




    [Document(page_content='Self-Reflection#\nSelf-reflection is a vital aspect that allows autonomous agents to improve iteratively by refining past action decisions and correcting previous mistakes. It plays a crucial role in real-world tasks where trial and error are inevitable.\nReAct (Yao et al. 2023) integrates reasoning and acting within LLM by extending the action space to be a combination of task-specific discrete actions and the language space. The former enables LLM to interact with the environment (e.g. use Wikipedia search API), while the latter prompting LLM to generate reasoning traces in natural language.\nThe ReAct prompt template incorporates explicit steps for LLM to think, roughly formatted as:\nThought: ...\nAction: ...\nObservation: ...\n... (Repeated many times)', metadata={'source': 'https://lilianweng.github.io/posts/2023-06-23-agent/', 'pk': 449281835035555859})]




```python
# Define a new RAG chain with this dynamically configurable retriever
rag_chain2 = (
    {"context": retriever2 | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)
```

Let's try this dynamically configurable RAG chain with different filter conditions.


```python
# Invoke this RAG chain with a specific question and config
rag_chain2.with_config(
    configurable={
        "retriever_search_kwargs": dict(
            expr="source == 'https://lilianweng.github.io/posts/2023-06-23-agent/'",
        )
    }
).invoke(query)
```




    "Self-reflection of an AI agent involves the process of synthesizing memories into higher-level inferences over time to guide the agent's future behavior. It serves as a mechanism to create higher-level summaries of past events. One approach to self-reflection involves prompting the language model with the 100 most recent observations and asking it to generate the 3 most salient high-level questions based on those observations. This process helps the AI agent optimize believability in the current moment and over time."



When we change the search condition to filter the documents by the second source, as the content of this blog source has nothing todo with the query question, we get an answer with no relevant information.


```python
rag_chain2.with_config(
    configurable={
        "retriever_search_kwargs": dict(
            expr="source == 'https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/'",
        )
    }
).invoke(query)
```




    "I'm sorry, but based on the provided context, there is no specific information or statistical data available regarding the self-reflection of an AI agent."



----
This tutorial focus the basic usage of Milvus LangChain integration and simple RAG approach. For more advanced RAG techniques, please refer to the [advanced rag bootcamp](https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/advanced_rag).
