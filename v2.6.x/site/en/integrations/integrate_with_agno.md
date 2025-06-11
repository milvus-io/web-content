---
id: integrate_with_agno.md
title: Integrate Milvus with Agno
summary: Milvus vector database enable efficient storage and retrieval of information as embeddings. With Milvus and Agno, you can easily integrate your knowledge into your Agent workflows. This document is a basic guide on how to use Milvus integration with Agno.
---

# Integrate Milvus with Agno

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/integrate_with_phidata.ipynb" target="_parent">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/integrate_with_phidata.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>

[Agno](https://docs.agno.com/introduction)(formerly known as Phidata) is a lightweight library for building Multimodal Agents. It allows you to create multi-modal agents that can understand text, images, audio, and video, and leverage various tools and knowledge sources to accomplish complex tasks. Agno supports multi-agent orchestration, enabling teams of agents to collaborate and solve problems together. It also provides a beautiful Agent UI for interacting with your agents.

Milvus vector database enable efficient storage and retrieval of information as embeddings. With Milvus and Agno, you can easily integrate your knowledge into your Agent workflows. This document is a basic guide on how to use Milvus integration with Agno.

## Preparation
Install the necessary dependencies:


```python
$ pip install --upgrade agno pymilvus openai
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

We will use OpenAI as the LLM in this example. You should prepare the [api key](https://platform.openai.com/docs/quickstart) `OPENAI_API_KEY` as an environment variable.


```python
import os

os.environ["OPENAI_API_KEY"] = "sk-xxxx"
```

## Initalize Milvus

Import the packages and initialize the Milvus vector database instance.


```python
from agno.agent import Agent
from agno.knowledge.pdf_url import PDFUrlKnowledgeBase
from agno.vectordb.milvus import Milvus

# Initialize Milvus
vector_db = Milvus(
    collection="recipes",
    uri="./milvus.db",
)
```

Specify the collection name and the uri and token(optinal) for your Milvus server.

<div class="alert note">

Here is how to set the uri and token:

- If you only need a local vector database for small scale data or prototyping, setting the uri as a local file, e.g.`./milvus.db`, is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.
- If you have large scale of data, say more than a million vectors, you can set up a more performant Milvus server on [Docker or Kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server address and port as your uri, e.g.`http://localhost:19530`. If you enable the authentication feature on Milvus, use "<your_username>:<your_password>" as the token, otherwise don't set the token.
- If you use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `uri` and `token`, which correspond to the [Public Endpoint and API key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details) in Zilliz Cloud.

</div>


## Load data

Create a PDF url knowledage base instance and load the data into the instance. We use a public recipe pdf data as an example.


```python
# Create knowledge base
knowledge_base = PDFUrlKnowledgeBase(
    urls=["https://phi-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf"],
    vector_db=vector_db,
)

knowledge_base.load(recreate=False)  # Comment out after first run
```

    INFO    Creating
    INFO    Loading knowledge  
    INFO    Reading: https://phi-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf       
    INFO    Added documents to knowledge base                                                                             

## Use agent to response to a question
Integrate the knowledge base into an agent, then we can ask the agent a question and get a response.


```python
# Create and use the agent
agent = Agent(knowledge=knowledge_base, show_tool_calls=True)

# Query the agent
agent.print_response("How to make Tom Kha Gai", markdown=True)
```


    Output()


    ┏━ Message ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃                                                                                                                                                             ┃
    ┃ How to make Tom Kha Gai                                                                                                                                     ┃
    ┃                                                                                                                                                             ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
    ┏━ Response (6.9s) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃                                                                                                                                                             ┃
    ┃ Running:                                                                                                                                                    ┃
    ┃                                                                                                                                                             ┃
    ┃  • search_knowledge_base(query=Tom Kha Gai recipe)                                                                                                          ┃
    ┃                                                                                                                                                             ┃
    ┃ Here's a recipe for Tom Kha Gai, a delicious Thai chicken and galangal soup made with coconut milk:                                                         ┃
    ┃                                                                                                                                                             ┃
    ┃ Ingredients (One serving):                                                                                                                                  ┃
    ┃                                                                                                                                                             ┃
    ┃  • 150 grams chicken, cut into bite-size pieces                                                                                                             ┃
    ┃  • 50 grams sliced young galangal                                                                                                                           ┃
    ┃  • 100 grams lightly crushed lemongrass, julienned                                                                                                          ┃
    ┃  • 100 grams straw mushrooms                                                                                                                                ┃
    ┃  • 250 grams coconut milk                                                                                                                                   ┃
    ┃  • 100 grams chicken stock                                                                                                                                  ┃
    ┃  • 3 tbsp lime juice                                                                                                                                        ┃
    ┃  • 3 tbsp fish sauce                                                                                                                                        ┃
    ┃  • 2 leaves kaffir lime, shredded                                                                                                                           ┃
    ┃  • 1-2 bird’s eye chilies, pounded                                                                                                                          ┃
    ┃  • 3 leaves coriander                                                                                                                                       ┃
    ┃                                                                                                                                                             ┃
    ┃ Directions:                                                                                                                                                 ┃
    ┃                                                                                                                                                             ┃
    ┃  1 Bring the chicken stock and coconut milk to a slow boil.                                                                                                 ┃
    ┃  2 Add galangal, lemongrass, chicken, and mushrooms. Once the soup returns to a boil, season it with fish sauce.                                            ┃
    ┃  3 Wait until the chicken is cooked, then add the kaffir lime leaves and bird’s eye chilies.                                                                ┃
    ┃  4 Remove the pot from heat and add lime juice.                                                                                                             ┃
    ┃  5 Garnish with coriander leaves.                                                                                                                           ┃
    ┃                                                                                                                                                             ┃
    ┃ Tips:                                                                                                                                                       ┃
    ┃                                                                                                                                                             ┃
    ┃  • Keep the heat low throughout the cooking process to prevent the oil in the coconut milk from separating.                                                 ┃
    ┃  • If using mature galangal, reduce the amount.                                                                                                             ┃
    ┃  • Adding lime juice after removing the pot from heat makes it more aromatic.                                                                               ┃
    ┃  • Reduce the number of chilies for a milder taste.                                                                                                         ┃
    ┃                                                                                                                                                             ┃
    ┃ Enjoy making and savoring this flavorful Thai soup!                                                                                                         ┃
    ┃                                                                                                                                                             ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Congratulations, you have learned the basics of using Milvus in Agno. If you want to know more about how to use Agno, please refer to the [official documentation](https://docs.agno.com/introduction).

