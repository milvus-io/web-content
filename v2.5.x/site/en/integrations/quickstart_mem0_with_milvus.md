---
id: quickstart_mem0_with_milvus.md
summary: In this tutorial, we’ll cover essential Mem0 memory management operations—adding, retrieving, updating, searching, deleting, and tracking memory history—using Milvus, a high-performance, open-source vector database that powers efficient storage and retrieval. This hands-on introduction will guide you through foundational memory operations to help you build personalized AI interactions with Mem0 and Milvus.
title: Getting Started with Mem0 and Milvus
---

# Getting Started with Mem0 and Milvus

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/quickstart_mem0_with_milvus.ipynb" target="_parent">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/quickstart_mem0_with_milvus.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>


[Mem0](https://mem0.ai/) is an intelligent memory layer for AI applications, designed to deliver personalized and efficient interactions by retaining user preferences and continuously adapting over time. Ideal for chatbots and AI-driven tools, Mem0 creates seamless, context-aware experiences.

In this tutorial, we’ll cover essential Mem0 memory management operations—adding, retrieving, updating, searching, deleting, and tracking memory history—using [Milvus](https://milvus.io/), a high-performance, open-source vector database that powers efficient storage and retrieval. This hands-on introduction will guide you through foundational memory operations to help you build personalized AI interactions with Mem0 and Milvus.


## Preparation





### Download required libraries



```shell
$ pip install mem0ai pymilvus
```

> If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

### Configure Mem0 with Milvus

We will use OpenAI as the LLM in this example. You should prepare the [api key](https://platform.openai.com/docs/quickstart) `OPENAI_API_KEY` as an environment variable.



```python
import os

os.environ["OPENAI_API_KEY"] = "sk-***********"
```

Now, we can configure Mem0 to use Milvus as the vector store


```python
# Define Config
from mem0 import Memory

config = {
    "vector_store": {
        "provider": "milvus",
        "config": {
            "collection_name": "quickstart_mem0_with_milvus",
            "embedding_model_dims": "1536",
            "url": "./milvus.db",  # Use local vector database for demo purpose
        },
    },
    "version": "v1.1",
}

m = Memory.from_config(config)
```

<div class="alert note">

> - If you only need a local vector database for small scale data or prototyping, setting the uri as a local file, e.g.`./milvus.db`, is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.
> - If you have large scale of data, say more than a million vectors, you can set up a more performant Milvus server on [Docker or Kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server address and port as your uri, e.g.`http://localhost:19530`. If you enable the authentication feature on Milvus, use "<your_username>:<your_password>" as the token, otherwise don't set the token.
> - If you use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `uri` and `token`, which correspond to the [Public Endpoint and API key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details) in Zilliz Cloud.

</div>

## Managing User Memories with Mem0 and Milvus



### Adding a Memory
The `add` function stores unstructured text in Milvus as a memory, associating it with a specific user and optional metadata.

Here, we're adding Alice's memory, "working on improving my tennis skills," along with relevant metadata for context to Milvus.


```python
# Add a memory to user: Working on improving tennis skills
res = m.add(
    messages="I am working on improving my tennis skills.",
    user_id="alice",
    metadata={"category": "hobbies"},
)

res
```




    {'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
       'memory': 'Working on improving tennis skills',
       'event': 'ADD'}],
     'relations': []}



### Update a Memory

We can use the `add` function's return value to retrieve the memory ID, allowing us to update this memory with new information via `update`.


```python
# Get memory_id
memory_id = res["results"][0]["id"]

# Update this memory with new information: Likes to play tennis on weekends
m.update(memory_id=memory_id, data="Likes to play tennis on weekends")
```




    {'message': 'Memory updated successfully!'}



### Get All Memory For a User

We can use the `get_all` function to view all inserted memories or filter by `user_id` in Milvus.

Note that we can see the memory is now changed from "Working on impriving tennis skills" to "Likes to play tennis on weekends".


```python
# Get all memory for the user Alice
m.get_all(user_id="alice")
```




    {'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
       'memory': 'Likes to play tennis on weekends',
       'hash': '4c3bc9f87b78418f19df6407bc86e006',
       'metadata': None,
       'created_at': '2024-11-01T19:33:44.116920-07:00',
       'updated_at': '2024-11-01T19:33:47.619857-07:00',
       'user_id': 'alice'}]}



### View Memory Update History

We can also view the memory update history by specifying which memory_id we are interested in via `history` function.


```python
m.history(memory_id=memory_id)
```




    [{'id': '71ed3cec-5d9a-4fa6-a009-59802450c0b9',
      'memory_id': '77162018-663b-4dfa-88b1-4f029d6136ab',
      'old_memory': None,
      'new_memory': 'Working on improving tennis skills',
      'event': 'ADD',
      'created_at': '2024-11-01T19:33:44.116920-07:00',
      'updated_at': None},
     {'id': 'db2b003c-ffb7-42e4-bd8a-b9cf56a02bb9',
      'memory_id': '77162018-663b-4dfa-88b1-4f029d6136ab',
      'old_memory': 'Working on improving tennis skills',
      'new_memory': 'Likes to play tennis on weekends',
      'event': 'UPDATE',
      'created_at': '2024-11-01T19:33:44.116920-07:00',
      'updated_at': '2024-11-01T19:33:47.619857-07:00'}]



### Search Memory

We can use `search` function to look for the most related memory for the user.

Let's start by adding another memory for Alice.


```python
new_mem = m.add(
    "I have a linear algebra midterm exam on November 20",
    user_id="alice",
    metadata={"category": "task"},
)
```

Now, we call `get_all` specifying the user_id to verify that we have indeed 2 memory entries for user Alice.


```python
m.get_all(user_id="alice")
```




    {'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
       'memory': 'Likes to play tennis on weekends',
       'hash': '4c3bc9f87b78418f19df6407bc86e006',
       'metadata': None,
       'created_at': '2024-11-01T19:33:44.116920-07:00',
       'updated_at': '2024-11-01T19:33:47.619857-07:00',
       'user_id': 'alice'},
      {'id': 'aa8eaa38-74d6-4b58-8207-b881d6d93d02',
       'memory': 'Has a linear algebra midterm exam on November 20',
       'hash': '575182f46965111ca0a8279c44920ea2',
       'metadata': {'category': 'task'},
       'created_at': '2024-11-01T19:33:57.271657-07:00',
       'updated_at': None,
       'user_id': 'alice'}]}



We can perform `search` now by providing `query` and `user_id`. Note that we are by default using `L2` metric for similarity search, so a smaller `score` means greater similarity.


```python
m.search(query="What are Alice's hobbies", user_id="alice")
```




    {'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
       'memory': 'Likes to play tennis on weekends',
       'hash': '4c3bc9f87b78418f19df6407bc86e006',
       'metadata': None,
       'score': 1.2807445526123047,
       'created_at': '2024-11-01T19:33:44.116920-07:00',
       'updated_at': '2024-11-01T19:33:47.619857-07:00',
       'user_id': 'alice'},
      {'id': 'aa8eaa38-74d6-4b58-8207-b881d6d93d02',
       'memory': 'Has a linear algebra midterm exam on November 20',
       'hash': '575182f46965111ca0a8279c44920ea2',
       'metadata': {'category': 'task'},
       'score': 1.728922724723816,
       'created_at': '2024-11-01T19:33:57.271657-07:00',
       'updated_at': None,
       'user_id': 'alice'}]}



### Delete Memory

We can also `delete` a memory by providing the corresponding `memory_id`.

We will delete the memory "Likes to play tennis on weekends" as its `memory_id` has already been retrieved, and call `get_all` to verify the deletion is successful.


```python
m.delete(memory_id=memory_id)

m.get_all("alice")
```




    {'results': [{'id': 'aa8eaa38-74d6-4b58-8207-b881d6d93d02',
       'memory': 'Has a linear algebra midterm exam on November 20',
       'hash': '575182f46965111ca0a8279c44920ea2',
       'metadata': {'category': 'task'},
       'created_at': '2024-11-01T19:33:57.271657-07:00',
       'updated_at': None,
       'user_id': 'alice'}]}


