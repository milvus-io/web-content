---
id: build_RAG_with_milvus_and_firecrawl.md
summary: In this tutorial, we’ll show you how to build a Retrieval-Augmented Generation (RAG) pipeline using Milvus and Firecrawl. The pipeline integrates Firecrawl for web data scraping, Milvus for vector storage, and OpenAI for generating insightful, context-aware responses.
title: Building RAG with Milvus and Firecrawl
---

# Building RAG with Milvus and Firecrawl

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_with_milvus_and_firecrawl.ipynb" target="_parent">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_with_milvus_and_firecrawl.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>

[Firecrawl](https://www.firecrawl.dev/) empowers developers to build AI applications with clean data scraped from any website. With advanced scraping, crawling, and data extraction capabilities, Firecrawl simplifies the process of converting website content into clean markdown or structured data for downstream AI workflows.

In this tutorial, we’ll show you how to build a Retrieval-Augmented Generation (RAG) pipeline using Milvus and Firecrawl. The pipeline integrates Firecrawl for web data scraping, Milvus for vector storage, and OpenAI for generating insightful, context-aware responses.


## Preparation

### Dependencies and Environment

To start, install the required dependencies by running the following command:


```shell
$ pip install firecrawl-py pymilvus openai requests tqdm
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

### Setting Up API Keys

To use Firecrawl to scrape data from the specified URL, you need to obtain a [FIRECRAWL_API_KEY](https://www.firecrawl.dev/) and set it as an environment variable. Also, we will use OpenAI as the LLM in this example. You should prepare the [OPENAI_API_KEY](https://platform.openai.com/docs/quickstart) as an environment variable as well.


```python
import os

os.environ["FIRECRAWL_API_KEY"] = "fc-***********"
os.environ["OPENAI_API_KEY"] = "sk-***********"
```

### Prepare the LLM and Embedding Model

We initialize the OpenAI client to prepare the embedding model.


```python
from openai import OpenAI

openai_client = OpenAI()
```

Define a function to generate text embeddings using OpenAI client. We use the [text-embedding-3-small](https://platform.openai.com/docs/guides/embeddings) model as an example.


```python
def emb_text(text):
    return (
        openai_client.embeddings.create(input=text, model="text-embedding-3-small")
        .data[0]
        .embedding
    )
```

Generate a test embedding and print its dimension and first few elements.


```python
test_embedding = emb_text("This is a test")
embedding_dim = len(test_embedding)
print(embedding_dim)
print(test_embedding[:10])
```

    1536
    [0.009889289736747742, -0.005578675772994757, 0.00683477520942688, -0.03805781528353691, -0.01824733428657055, -0.04121600463986397, -0.007636285852640867, 0.03225184231996536, 0.018949154764413834, 9.352207416668534e-05]


## Scrape Data Using Firecrawl

### Initialize the Firecrawl Application
We will use the `firecrawl` library to scrape data from the specified URL in markdown format. Begin by initializing the Firecrawl application:


```python
from firecrawl import FirecrawlApp

app = FirecrawlApp(api_key=os.environ["FIRECRAWL_API_KEY"])
```

### Scrape the Target Website
Scrape the content from the target URL. The website [LLM-powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/) provides an in-depth exploration of autonomous agent systems built using large language models (LLMs). We will use these content building a RAG system. 



```python
# Scrape a website:
scrape_status = app.scrape_url(
    "https://lilianweng.github.io/posts/2023-06-23-agent/",
    params={"formats": ["markdown"]},
)

markdown_content = scrape_status["markdown"]
```

### Process the Scraped Content

To make the scraped content manageable for insertion into Milvus, we simply use "# " to separate the content, which can roughly separate the content of each main part of the scraped markdown file.


```python
def split_markdown_content(content):
    return [section.strip() for section in content.split("# ") if section.strip()]


# Process the scraped markdown content
sections = split_markdown_content(markdown_content)

# Print the first few sections to understand the structure
for i, section in enumerate(sections[:3]):
    print(f"Section {i+1}:")
    print(section[:300] + "...")
    print("-" * 50)
```

    Section 1:
    Table of Contents
    
    - [Agent System Overview](#agent-system-overview)
    - [Component One: Planning](#component-one-planning)  - [Task Decomposition](#task-decomposition)
      - [Self-Reflection](#self-reflection)
    - [Component Two: Memory](#component-two-memory)  - [Types of Memory](#types-of-memory)
      - [...
    --------------------------------------------------
    Section 2:
    Agent System Overview [\#](\#agent-system-overview)
    
    In a LLM-powered autonomous agent system, LLM functions as the agent’s brain, complemented by several key components:
    
    - **Planning**
      - Subgoal and decomposition: The agent breaks down large tasks into smaller, manageable subgoals, enabling effi...
    --------------------------------------------------
    Section 3:
    Component One: Planning [\#](\#component-one-planning)
    
    A complicated task usually involves many steps. An agent needs to know what they are and plan ahead.
    
    #...
    --------------------------------------------------


## Load Data into Milvus

### Create the collection


```python
from pymilvus import MilvusClient

milvus_client = MilvusClient(uri="./milvus_demo.db")
collection_name = "my_rag_collection"
```

<div class="alert note">

As for the argument of `MilvusClient`:
- Setting the `uri` as a local file, e.g.`./milvus.db`, is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.

- If you have large scale of data, you can set up a more performant Milvus server on [docker or kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server uri, e.g.`http://localhost:19530`, as your `uri`.

- If you want to use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `uri` and `token`, which correspond to the [Public Endpoint and Api key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) in Zilliz Cloud.

</div>

Check if the collection already exists and drop it if it does.


```python
if milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
```

Create a new collection with specified parameters.

If we don’t specify any field information, Milvus will automatically create a default `id` field for primary key, and a `vector` field to store the vector data. A reserved JSON field is used to store non-schema-defined fields and their values.


```python
milvus_client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type="IP",  # Inner product distance
    consistency_level="Strong",  # Supported values are (`"Strong"`, `"Session"`, `"Bounded"`, `"Eventually"`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.
)
```

### Insert data


```python
from tqdm import tqdm

data = []

for i, section in enumerate(tqdm(sections, desc="Processing sections")):
    embedding = emb_text(section)
    data.append({"id": i, "vector": embedding, "text": section})

# Insert data into Milvus
milvus_client.insert(collection_name=collection_name, data=data)
```

    Processing sections: 100%|██████████| 17/17 [00:08<00:00,  2.09it/s]





    {'insert_count': 17, 'ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 'cost': 0}



## Build RAG

### Retrieve data for a query

Let’s specify a query question about the website we just scraped.




```python
question = "What are the main components of autonomous agents?"
```

Search for the question in the collection and retrieve the semantic top-3 matches.


```python
search_res = milvus_client.search(
    collection_name=collection_name,
    data=[emb_text(question)],
    limit=3,
    search_params={"metric_type": "IP", "params": {}},
    output_fields=["text"],
)
```

Let’s take a look at the search results of the query




```python
import json

retrieved_lines_with_distances = [
    (res["entity"]["text"], res["distance"]) for res in search_res[0]
]
print(json.dumps(retrieved_lines_with_distances, indent=4))
```

    [
        [
            "Agent System Overview [\\#](\\#agent-system-overview)\n\nIn a LLM-powered autonomous agent system, LLM functions as the agent\u2019s brain, complemented by several key components:\n\n- **Planning**\n  - Subgoal and decomposition: The agent breaks down large tasks into smaller, manageable subgoals, enabling efficient handling of complex tasks.\n  - Reflection and refinement: The agent can do self-criticism and self-reflection over past actions, learn from mistakes and refine them for future steps, thereby improving the quality of final results.\n- **Memory**\n  - Short-term memory: I would consider all the in-context learning (See [Prompt Engineering](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/)) as utilizing short-term memory of the model to learn.\n  - Long-term memory: This provides the agent with the capability to retain and recall (infinite) information over extended periods, often by leveraging an external vector store and fast retrieval.\n- **Tool use**\n  - The agent learns to call external APIs for extra information that is missing from the model weights (often hard to change after pre-training), including current information, code execution capability, access to proprietary information sources and more.\n\n![](agent-overview.png)Fig. 1. Overview of a LLM-powered autonomous agent system.",
            0.6343474388122559
        ],
        [
            "Table of Contents\n\n- [Agent System Overview](#agent-system-overview)\n- [Component One: Planning](#component-one-planning)  - [Task Decomposition](#task-decomposition)\n  - [Self-Reflection](#self-reflection)\n- [Component Two: Memory](#component-two-memory)  - [Types of Memory](#types-of-memory)\n  - [Maximum Inner Product Search (MIPS)](#maximum-inner-product-search-mips)\n- [Component Three: Tool Use](#component-three-tool-use)\n- [Case Studies](#case-studies)  - [Scientific Discovery Agent](#scientific-discovery-agent)\n  - [Generative Agents Simulation](#generative-agents-simulation)\n  - [Proof-of-Concept Examples](#proof-of-concept-examples)\n- [Challenges](#challenges)\n- [Citation](#citation)\n- [References](#references)\n\nBuilding agents with LLM (large language model) as its core controller is a cool concept. Several proof-of-concepts demos, such as [AutoGPT](https://github.com/Significant-Gravitas/Auto-GPT), [GPT-Engineer](https://github.com/AntonOsika/gpt-engineer) and [BabyAGI](https://github.com/yoheinakajima/babyagi), serve as inspiring examples. The potentiality of LLM extends beyond generating well-written copies, stories, essays and programs; it can be framed as a powerful general problem solver.",
            0.5715497732162476
        ],
        [
            "Challenges [\\#](\\#challenges)\n\nAfter going through key ideas and demos of building LLM-centered agents, I start to see a couple common limitations:\n\n- **Finite context length**: The restricted context capacity limits the inclusion of historical information, detailed instructions, API call context, and responses. The design of the system has to work with this limited communication bandwidth, while mechanisms like self-reflection to learn from past mistakes would benefit a lot from long or infinite context windows. Although vector stores and retrieval can provide access to a larger knowledge pool, their representation power is not as powerful as full attention.\n\n- **Challenges in long-term planning and task decomposition**: Planning over a lengthy history and effectively exploring the solution space remain challenging. LLMs struggle to adjust plans when faced with unexpected errors, making them less robust compared to humans who learn from trial and error.\n\n- **Reliability of natural language interface**: Current agent system relies on natural language as an interface between LLMs and external components such as memory and tools. However, the reliability of model outputs is questionable, as LLMs may make formatting errors and occasionally exhibit rebellious behavior (e.g. refuse to follow an instruction). Consequently, much of the agent demo code focuses on parsing model output.",
            0.5009307265281677
        ]
    ]


### Use LLM to get a RAG response

Convert the retrieved documents into a string format.




```python
context = "\n".join(
    [line_with_distance[0] for line_with_distance in retrieved_lines_with_distances]
)
```

Define system and user prompts for the Lanage Model. This prompt is assembled with the retrieved documents from Milvus.




```python
SYSTEM_PROMPT = """
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
"""
USER_PROMPT = f"""
Use the following pieces of information enclosed in <context> tags to provide an answer to the question enclosed in <question> tags.
<context>
{context}
</context>
<question>
{question}
</question>
"""
```

Use OpenAI ChatGPT to generate a response based on the prompts.




```python
response = openai_client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": USER_PROMPT},
    ],
)
print(response.choices[0].message.content)
```

    The main components of a LLM-powered autonomous agent system are the Planning, Memory, and Tool use. 
    
    1. Planning: The agent breaks down large tasks into smaller, manageable subgoals, and can self-reflect and learn from past mistakes, refining its actions for future steps.
    
    2. Memory: This includes short-term memory, which the model uses for in-context learning, and long-term memory, which allows the agent to retain and recall information over extended periods. 
    
    3. Tool use: This component allows the agent to call external APIs for additional information that is not available in the model weights, like current information, code execution capacity, and access to proprietary information sources.

