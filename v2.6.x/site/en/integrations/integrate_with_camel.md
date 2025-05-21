---
id: integrate_with_camel.md
summary: This guide demonstrates how to build a Retrieval-Augmented Generation (RAG) system using CAMEL and Milvus.
title: Retrieval-Augmented Generation (RAG) with Milvus and Camel
---

# Retrieval-Augmented Generation (RAG) with Milvus and Camel

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_camel.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_camel.ipynb" target="_blank"><img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a>

This guide demonstrates how to build a Retrieval-Augmented Generation (RAG) system using CAMEL and Milvus.

The RAG system combines a retrieval system with a generative model to generate new text based on a given prompt. The system first retrieves relevant documents from a corpus using Milvus, and then uses a generative model to generate new text based on the retrieved documents.

[CAMEL](https://www.camel-ai.org/) is a multi-agent framework. [Milvus](https://milvus.io/) is the world's most advanced open-source vector database, built to power embedding similarity search and AI applications.

In this notebook, we show the usage of CAMEL Retrieve Module in both customized way and auto way. We will also show how to combine `AutoRetriever` with `ChatAgent`, and further combine `AutoRetriever` with `RolePlaying` by using `Function Calling`.

4 main parts included:
- Customized RAG
- Auto RAG
- Single Agent with Auto RAG
- Role-playing with Auto RAG

## Load Data
Let's first load the CAMEL paper from https://arxiv.org/pdf/2303.17760.pdf. This will be our local example data.




```python
$ pip install -U "camel-ai[all]" pymilvus
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (Click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>


```python
import os
import requests

os.makedirs("local_data", exist_ok=True)

url = "https://arxiv.org/pdf/2303.17760.pdf"
response = requests.get(url)
with open("local_data/camel paper.pdf", "wb") as file:
    file.write(response.content)
```

## 1. Customized RAG
In this section we will set our customized RAG pipeline, we will take `VectorRetriever` as an example. We will set `OpenAIEmbedding` as the embeddding model and `MilvusStorage` as the storage for it.

To set OpenAI embedding, we need to set the `OPENAI_API_KEY` in below.


```python
os.environ["OPENAI_API_KEY"] = "Your Key"
```

Import and set the embedding instance:


```python
from camel.embeddings import OpenAIEmbedding

embedding_instance = OpenAIEmbedding()
```

Import and set the vector storage instance:


```python
from camel.storages import MilvusStorage

storage_instance = MilvusStorage(
    vector_dim=embedding_instance.get_output_dim(),
    url_and_api_key=(
        "./milvus_demo.db",  # Your Milvus connection URI
        "",  # Your Milvus token
    ),
    collection_name="camel_paper",
)
```

<div class="alert note">

For the `url_and_api_key`:
- Using a local file, e.g.`./milvus.db`, as the Milvus connection URI is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.
- If you have large scale of data, you can set up a more performant Milvus server on [docker or kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server uri, e.g.`http://localhost:19530`, as your url.
- If you want to use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the connection uri and token, which correspond to the [Public Endpoint and Api key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) in Zilliz Cloud.

</div>

Import and set the retriever instance:

By default, the `similarity_threshold` is set to 0.75. You can change it.


```python
from camel.retrievers import VectorRetriever

vector_retriever = VectorRetriever(
    embedding_model=embedding_instance, storage=storage_instance
)
```

We use integrated `Unstructured Module` to split the content into small chunks, the content will be splited automacitlly with its `chunk_by_title` function, the max character for each chunk is 500 characters, which is a suitable length for `OpenAIEmbedding`. All the text in the chunks will be embed and stored to the vector storage instance, it will take some time, please wait.


```python
vector_retriever.process(content_input_path="local_data/camel paper.pdf")
```

    [nltk_data] Downloading package punkt to /root/nltk_data...
    [nltk_data]   Unzipping tokenizers/punkt.zip.
    [nltk_data] Downloading package averaged_perceptron_tagger to
    [nltk_data]     /root/nltk_data...
    [nltk_data]   Unzipping taggers/averaged_perceptron_tagger.zip.



Now we can retrieve information from the vector storage by giving a query. By default it will give you back the text content from top 1 chunk with highest Cosine similarity score, and the similarity score should be higher than 0.75 to ensure the retrieved content is relevant to the query. You can also change the `top_k` value.

The returned string list includes:

- similarity score
- content path
- metadata
- text


```python
retrieved_info = vector_retriever.query(query="What is CAMEL?", top_k=1)
print(retrieved_info)
```

    [{'similarity score': '0.8321675658226013', 'content path': 'local_data/camel paper.pdf', 'metadata': {'last_modified': '2024-04-19T14:40:00', 'filetype': 'application/pdf', 'page_number': 45}, 'text': 'CAMEL Data and Code License The intended purpose and licensing of CAMEL is solely for research use. The source code is licensed under Apache 2.0. The datasets are licensed under CC BY NC 4.0, which permits only non-commercial usage. It is advised that any models trained using the dataset should not be utilized for anything other than research purposes.\n\n45'}]


Let's try an irrelevant query:


```python
retrieved_info_irrelevant = vector_retriever.query(
    query="Compared with dumpling and rice, which should I take for dinner?", top_k=1
)

print(retrieved_info_irrelevant)
```

    [{'text': 'No suitable information retrieved from local_data/camel paper.pdf                 with similarity_threshold = 0.75.'}]


## 2. Auto RAG

In this section we will run the `AutoRetriever` with default settings. It uses `OpenAIEmbedding` as default embedding model and `Milvus` as default vector storage.

What you need to do is:

- Set content input paths, which can be local paths or remote urls
- Set remote url and api key for Milvus
- Give a query

The Auto RAG pipeline would create collections for given content input paths, the collection name will be set automaticlly based on the content input path name, if the collection exists, it will do the retrieve directly.


```python
from camel.retrievers import AutoRetriever
from camel.types import StorageType

auto_retriever = AutoRetriever(
    url_and_api_key=(
        "./milvus_demo.db",  # Your Milvus connection URI
        "",  # Your Milvus token
    ),
    storage_type=StorageType.MILVUS,
    embedding_model=embedding_instance,
)

retrieved_info = auto_retriever.run_vector_retriever(
    query="What is CAMEL-AI",
    content_input_paths=[
        "local_data/camel paper.pdf",  # example local path
        "https://www.camel-ai.org/",  # example remote url
    ],
    top_k=1,
    return_detailed_info=True,
)

print(retrieved_info)
```

    Original Query:
    {What is CAMEL-AI}
    Retrieved Context:
    {'similarity score': '0.8252888321876526', 'content path': 'local_data/camel paper.pdf', 'metadata': {'last_modified': '2024-04-19T14:40:00', 'filetype': 'application/pdf', 'page_number': 7}, 'text': ' Section 3.2, to simulate assistant-user cooperation. For our analysis, we set our attention on AI Society setting. We also gathered conversational data, named CAMEL AI Society and CAMEL Code datasets and problem-solution pairs data named CAMEL Math and CAMEL Science and analyzed and evaluated their quality. Moreover, we will discuss potential extensions of our framework and highlight both the risks and opportunities that future AI society might present.'}
    {'similarity score': '0.8378663659095764', 'content path': 'https://www.camel-ai.org/', 'metadata': {'filetype': 'text/html', 'languages': ['eng'], 'page_number': 1, 'url': 'https://www.camel-ai.org/', 'link_urls': ['#h.3f4tphhd9pn8', 'https://join.slack.com/t/camel-ai/shared_invite/zt-2g7xc41gy-_7rcrNNAArIP6sLQqldkqQ', 'https://discord.gg/CNcNpquyDc'], 'link_texts': [None, None, None], 'emphasized_text_contents': ['Mission', 'CAMEL-AI.org', 'is an open-source community dedicated to the study of autonomous and communicative agents. We believe that studying these agents on a large scale offers valuable insights into their behaviors, capabilities, and potential risks. To facilitate research in this field, we provide, implement, and support various types of agents, tasks, prompts, models, datasets, and simulated environments.', 'Join us via', 'Slack', 'Discord', 'or'], 'emphasized_text_tags': ['span', 'span', 'span', 'span', 'span', 'span', 'span']}, 'text': 'Mission\n\nCAMEL-AI.org is an open-source community dedicated to the study of autonomous and communicative agents. We believe that studying these agents on a large scale offers valuable insights into their behaviors, capabilities, and potential risks. To facilitate research in this field, we provide, implement, and support various types of agents, tasks, prompts, models, datasets, and simulated environments.\n\nJoin us via\n\nSlack\n\nDiscord\n\nor'}


## 3. Single Agent with Auto RAG

In this section we will show how to combine the `AutoRetriever` with one `ChatAgent`.

Let's set an agent function, in this function we can get the response by providing a query to this agent.


```python
from camel.agents import ChatAgent
from camel.messages import BaseMessage
from camel.types import RoleType
from camel.retrievers import AutoRetriever
from camel.types import StorageType


def single_agent(query: str) -> str:
    # Set agent role
    assistant_sys_msg = BaseMessage(
        role_name="Assistant",
        role_type=RoleType.ASSISTANT,
        meta_dict=None,
        content="""You are a helpful assistant to answer question,
         I will give you the Original Query and Retrieved Context,
        answer the Original Query based on the Retrieved Context,
        if you can't answer the question just say I don't know.""",
    )

    # Add auto retriever
    auto_retriever = AutoRetriever(
        url_and_api_key=(
            "./milvus_demo.db",  # Your Milvus connection URI
            "",  # Your Milvus token
        ),
        storage_type=StorageType.MILVUS,
        embedding_model=embedding_instance,
    )

    retrieved_info = auto_retriever.run_vector_retriever(
        query=query,
        content_input_paths=[
            "local_data/camel paper.pdf",  # example local path
            "https://www.camel-ai.org/",  # example remote url
        ],
        # vector_storage_local_path="storage_default_run",
        top_k=1,
        return_detailed_info=True,
    )

    # Pass the retrieved infomation to agent
    user_msg = BaseMessage.make_user_message(role_name="User", content=retrieved_info)
    agent = ChatAgent(assistant_sys_msg)

    # Get response
    assistant_response = agent.step(user_msg)
    return assistant_response.msg.content


print(single_agent("What is CAMEL-AI"))
```

    CAMEL-AI is an open-source community dedicated to the study of autonomous and communicative agents. It provides, implements, and supports various types of agents, tasks, prompts, models, datasets, and simulated environments to facilitate research in this field.


## 4. Role-playing with Auto RAG

In this section we will show how to combine the `RETRIEVAL_FUNCS` with `RolePlaying` by applying `Function Calling`.



```python
from typing import List
from colorama import Fore

from camel.agents.chat_agent import FunctionCallingRecord
from camel.configs import ChatGPTConfig
from camel.functions import (
    MATH_FUNCS,
    RETRIEVAL_FUNCS,
)
from camel.societies import RolePlaying
from camel.types import ModelType
from camel.utils import print_text_animated


def role_playing_with_rag(
    task_prompt, model_type=ModelType.GPT_4O, chat_turn_limit=10
) -> None:
    task_prompt = task_prompt

    user_model_config = ChatGPTConfig(temperature=0.0)

    function_list = [
        *MATH_FUNCS,
        *RETRIEVAL_FUNCS,
    ]
    assistant_model_config = ChatGPTConfig(
        tools=function_list,
        temperature=0.0,
    )

    role_play_session = RolePlaying(
        assistant_role_name="Searcher",
        user_role_name="Professor",
        assistant_agent_kwargs=dict(
            model_type=model_type,
            model_config=assistant_model_config,
            tools=function_list,
        ),
        user_agent_kwargs=dict(
            model_type=model_type,
            model_config=user_model_config,
        ),
        task_prompt=task_prompt,
        with_task_specify=False,
    )

    print(
        Fore.GREEN
        + f"AI Assistant sys message:\n{role_play_session.assistant_sys_msg}\n"
    )
    print(Fore.BLUE + f"AI User sys message:\n{role_play_session.user_sys_msg}\n")

    print(Fore.YELLOW + f"Original task prompt:\n{task_prompt}\n")
    print(
        Fore.CYAN
        + f"Specified task prompt:\n{role_play_session.specified_task_prompt}\n"
    )
    print(Fore.RED + f"Final task prompt:\n{role_play_session.task_prompt}\n")

    n = 0
    input_msg = role_play_session.init_chat()
    while n < chat_turn_limit:
        n += 1
        assistant_response, user_response = role_play_session.step(input_msg)

        if assistant_response.terminated:
            print(
                Fore.GREEN
                + (
                    "AI Assistant terminated. Reason: "
                    f"{assistant_response.info['termination_reasons']}."
                )
            )
            break
        if user_response.terminated:
            print(
                Fore.GREEN
                + (
                    "AI User terminated. "
                    f"Reason: {user_response.info['termination_reasons']}."
                )
            )
            break

        # Print output from the user
        print_text_animated(Fore.BLUE + f"AI User:\n\n{user_response.msg.content}\n")

        # Print output from the assistant, including any function
        # execution information
        print_text_animated(Fore.GREEN + "AI Assistant:")
        tool_calls: List[FunctionCallingRecord] = assistant_response.info["tool_calls"]
        for func_record in tool_calls:
            print_text_animated(f"{func_record}")
        print_text_animated(f"{assistant_response.msg.content}\n")

        if "CAMEL_TASK_DONE" in user_response.msg.content:
            break

        input_msg = assistant_response.msg
```

Run the role-playing with defined retriever function:


```python
role_playing_with_rag(
    task_prompt="""What is the main termination reasons for AI Society
                   dataset, how many number of messages did camel decided to
                   limit, what's the value plus 100? You should refer to the
                   content in path camel/local_data/camel paper.pdf"""
)
```

    AI Assistant sys message:
    BaseMessage(role_name='Searcher', role_type=<RoleType.ASSISTANT: 'assistant'>, meta_dict={'task': "What is the main termination reasons for AI Society dataset, how many number of messages did camel decided to limit, what's the value plus 100?", 'assistant_role': 'Searcher', 'user_role': 'Professor'}, content="===== RULES OF ASSISTANT =====\nNever forget you are a Searcher and I am a Professor. Never flip roles! Never instruct me!\nWe share a common interest in collaborating to successfully complete a task.\nYou must help me to complete the task.\nHere is the task: What is the main termination reasons for AI Society dataset, how many number of messages did camel decided to limit, what's the value plus 100?. Never forget our task!\nI must instruct you based on your expertise and my needs to complete the task.\n\nI must give you one instruction at a time.\nYou must write a specific solution that appropriately solves the requested instruction and explain your solutions.\nYou must decline my instruction honestly if you cannot perform the instruction due to physical, moral, legal reasons or your capability and explain the reasons.\nUnless I say the task is completed, you should always start with:\n\nSolution: <YOUR_SOLUTION>\n\n<YOUR_SOLUTION> should be very specific, include detailed explanations and provide preferable detailed implementations and examples and lists for task-solving.\nAlways end <YOUR_SOLUTION> with: Next request.")
    
    AI User sys message:
    BaseMessage(role_name='Professor', role_type=<RoleType.USER: 'user'>, meta_dict={'task': "What is the main termination reasons for AI Society dataset, how many number of messages did camel decided to limit, what's the value plus 100?", 'assistant_role': 'Searcher', 'user_role': 'Professor'}, content='===== RULES OF USER =====\nNever forget you are a Professor and I am a Searcher. Never flip roles! You will always instruct me.\nWe share a common interest in collaborating to successfully complete a task.\nI must help you to complete the task.\nHere is the task: What is the main termination reasons for AI Society dataset, how many number of messages did camel decided to limit, what\'s the value plus 100?. Never forget our task!\nYou must instruct me based on my expertise and your needs to solve the task ONLY in the following two ways:\n\n1. Instruct with a necessary input:\nInstruction: <YOUR_INSTRUCTION>\nInput: <YOUR_INPUT>\n\n2. Instruct without any input:\nInstruction: <YOUR_INSTRUCTION>\nInput: None\n\nThe "Instruction" describes a task or question. The paired "Input" provides further context or information for the requested "Instruction".\n\nYou must give me one instruction at a time.\nI must write a response that appropriately solves the requested instruction.\nI must decline your instruction honestly if I cannot perform the instruction due to physical, moral, legal reasons or my capability and explain the reasons.\nYou should instruct me not ask me questions.\nNow you must start to instruct me using the two ways described above.\nDo not add anything else other than your instruction and the optional corresponding input!\nKeep giving me instructions and necessary inputs until you think the task is completed.\nWhen the task is completed, you must only reply with a single word <CAMEL_TASK_DONE>.\nNever say <CAMEL_TASK_DONE> unless my responses have solved your task.')
    
    Original task prompt:
    What is the main termination reasons for AI Society dataset, how many number of messages did camel decided to limit, what's the value plus 100?
    
    Specified task prompt:
    None
    
    Final task prompt:
    What is the main termination reasons for AI Society dataset, how many number of messages did camel decided to limit, what's the value plus 100?
    


    AI User:
    
    Instruction: Provide a summary of the main termination reasons in the AI Society dataset.
    Input: None
    
    
    AI Assistant:
    
    Function Execution: local_retriever
    	Args: {'query': 'main termination reasons for AI Society dataset'}
    	Result: Original Query:
    {main termination reasons for AI Society dataset}
    Retrieved Context:
    Next we examine the conversation termination reasons for both AI Society and Code datasets. As can be seen in Figure 8, the main termination reasons for AI Society dataset is Assistant Instruct whereas for Code it is Token Limit. The latter is expected as the since responses that contain code tend to be long. It is also interesting to note that in both datasets, the termination due to Maximum Number of Messages is low indicating that the limit of 40 maximum messages is reasonable. Our decision t
    
    Solution: The main termination reason for the AI Society dataset is "Assistant Instruct." This indicates that conversations in the AI Society dataset typically end when the assistant is instructed to terminate the conversation.
    
    Next request.
    
    
    AI User:
    
    Instruction: Identify the number of messages that the camel decided to limit in the context provided.
    Input: None
    
    
    AI Assistant:
    
    Solution: The context provided from the local retriever indicates that the camel decided to limit the number of messages to a maximum of 40 messages. This is mentioned in the retrieved context where it states that the termination due to Maximum Number of Messages is low, indicating that the limit of 40 maximum messages is reasonable.
    
    Next request.
    
    
    AI User:
    
    Instruction: Calculate the value of the message limit plus 100.
    Input: None
    
    
    AI Assistant:
    
    Function Execution: add
    	Args: {'a': 40, 'b': 100}
    	Result: 140
    
    Solution: The value of the message limit plus 100 is 140.
    
    Next request.
    
    
    AI User:
    
    CAMEL_TASK_DONE
    
    
    AI Assistant:
    
    Solution: Understood, the task is completed.
    
    Next request.
    
    

