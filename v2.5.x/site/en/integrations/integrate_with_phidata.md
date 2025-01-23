---
id: integrate_with_phidata.md
title: Integrate Milvus with Phidata
summary: This page discusses vector database integration with Phidata, a powerful framework for building intelligent agents and workflows.
---

# Integrate Milvus with Phidata

[Phidata](https://github.com/phidatahq/phidata/tree/main) is a powerful framework for building intelligent agents and workflows. It allows you to create multi-modal agents that can understand text, images, audio, and video, and leverage various tools and knowledge sources to accomplish complex tasks. Phidata supports multi-agent orchestration, enabling teams of agents to collaborate and solve problems together. It also provides a beautiful Agent UI for interacting with your agents.

Milvus vector database enable efficient storage and retrieval of information as embeddings. With Milvus and Phidata, you can easily integrate your knowledge into your Agent workflows. This document is a basic guide on how to use Milvus integration with Phidata.

## Preparation
Install the necessary dependencies:


```shell
$ pip install --upgrade phidata pymilvus openai
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

We will use OpenAI as the LLM in this example. You should prepare the [api key](https://platform.openai.com/docs/quickstart) `OPENAI_API_KEY` as an environment variable.


```python
import os

os.environ["OPENAI_API_KEY"] = "sk-***********"
```

## Initalize Milvus

Import the packages and initialize the Milvus vector database instance.


```python
from phi.agent import Agent
from phi.knowledge.pdf import PDFUrlKnowledgeBase
from phi.vectordb.milvus import Milvus

# Initialize Milvus
vector_db = Milvus(
    collection="recipes",
    uri="./milvus.db",
)
```

Specify the collection name and the uri and token(optinal) for your Milvus server.

Here is how to set the uri and token:

- If you only need a local vector database for small scale data or prototyping, setting the uri as a local file, e.g.`./milvus.db`, is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.

- If you have large scale of data, say more than a million vectors, you can set up a more performant Milvus server on [Docker or Kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server address and port as your uri, e.g.`http://localhost:19530`. If you enable the authentication feature on Milvus, use "<your_username>:<your_password>" as the token, otherwise don't set the token.

- If you use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `uri` and `token`, which correspond to the [Public Endpoint and API key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details) in Zilliz Cloud.


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


<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"><span style="color: #000080; text-decoration-color: #000080">INFO    </span> Creating collection                                                                                       
</pre>




<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"><span style="color: #000080; text-decoration-color: #000080">INFO    </span> Loading knowledge base                                                                                    
</pre>




<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"><span style="color: #000080; text-decoration-color: #000080">INFO    </span> Reading: <span style="color: #0000ff; text-decoration-color: #0000ff; text-decoration: underline">https://phi-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf</span>                                      
</pre>




<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"><span style="color: #000080; text-decoration-color: #000080">INFO    </span> Added <span style="color: #008080; text-decoration-color: #008080; font-weight: bold">0</span> documents to knowledge base                                                                       
</pre>



## Use agent to response to a question
Integrate the knowledge base into an agent, then we can ask the agent a question and get a response.


```python
# Create and use the agent
agent = Agent(knowledge_base=knowledge_base, use_tools=True, show_tool_calls=True)

# Query the agent
agent.print_response("How to make Tom Kha Gai", markdown=True)
```


    Output()



<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"></pre>



        ┏━ Message ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
        ┃                                                                                                       ┃
        ┃ How to make Tom Kha Gai                                                                               ┃
        ┃                                                                                                       ┃
        ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
        ┏━ Response (6.9s) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
        ┃                                                                                                       ┃
        ┃ Running:                                                                                              ┃
        ┃                                                                                                       ┃
        ┃  • search_knowledge_base(query=Tom Kha Gai recipe)                                                    ┃
        ┃                                                                                                       ┃
        ┃ Here's a recipe for Tom Kha Gai, a delicious Thai chicken and galangal soup made with coconut milk:   ┃
        ┃                                                                                                       ┃
        ┃ Ingredients (One serving):                                                                            ┃
        ┃                                                                                                       ┃
        ┃  • 150 grams chicken, cut into bite-size pieces                                                       ┃
        ┃  • 50 grams sliced young galangal                                                                     ┃
        ┃  • 100 grams lightly crushed lemongrass, julienned                                                    ┃
        ┃  • 100 grams straw mushrooms                                                                          ┃
        ┃  • 250 grams coconut milk                                                                             ┃
        ┃  • 100 grams chicken stock                                                                            ┃
        ┃  • 3 tbsp lime juice                                                                                  ┃
        ┃  • 3 tbsp fish sauce                                                                                  ┃
        ┃  • 2 leaves kaffir lime, shredded                                                                     ┃
        ┃  • 1-2 bird’s eye chilies, pounded                                                                    ┃
        ┃  • 3 leaves coriander                                                                                 ┃
        ┃                                                                                                       ┃
        ┃ Directions:                                                                                           ┃
        ┃                                                                                                       ┃
        ┃  1 Bring the chicken stock and coconut milk to a slow boil.                                           ┃
        ┃  2 Add galangal, lemongrass, chicken, and mushrooms. Once the soup returns to a boil, season it with f┃
        ┃  3 Wait until the chicken is cooked, then add the kaffir lime leaves and bird’s eye chilies.          ┃
        ┃  4 Remove the pot from heat and add lime juice.                                                       ┃
        ┃  5 Garnish with coriander leaves.                                                                     ┃
        ┃                                                                                                       ┃
        ┃ Tips:                                                                                                 ┃
        ┃                                                                                                       ┃
        ┃  • Keep the heat low throughout the cooking process to prevent the oil in the coconut milk from separ ┃
        ┃  • If using mature galangal, reduce the amount.                                                       ┃
        ┃  • Adding lime juice after removing the pot from heat makes it more aromatic.                         ┃
        ┃  • Reduce the number of chilies for a milder taste.                                                   ┃
        ┃                                                                                                       ┃
        ┃ Enjoy making and savoring this flavorful Thai soup!                                                   ┃
        ┃                                                                                                       ┃
        ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Congratulations, you have learned the basics of using Milvus in Phidata. If you want to know more about how to use Phidata, please refer to the [official documentation](https://docs.phidata.com/introduction).

