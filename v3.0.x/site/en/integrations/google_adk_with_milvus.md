---
id: google_adk_with_milvus.md
summary: In this tutorial, we will use adk-milvus to connect ADK with Milvus in two common places a retrieval toolset over a knowledge base, and a cross-session memory service for user-specific agent memory. The notebook uses Milvus Lite by default, so it can run locally or in Google Colab without a separate Milvus server.
title: Google ADK with Milvus
---

# Google ADK with Milvus

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/google_adk_with_milvus.ipynb" target="_parent">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/google_adk_with_milvus.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>

[Google Agent Development Kit (ADK)](https://adk.dev/) helps developers build agents with tools, sessions, runners, and memory services. [Milvus](https://milvus.io/) is an open-source vector database built for embedding similarity search and AI memory workloads.

In this tutorial, we will use [`adk-milvus`](https://github.com/zilliztech/adk-milvus) to connect ADK with Milvus in two common places: a retrieval toolset over a knowledge base, and a cross-session memory service for user-specific agent memory. The notebook uses Milvus Lite by default, so it can run locally or in Google Colab without a separate Milvus server.

## Prerequisites

Install the ADK Milvus integration and Milvus dependencies.


```python
%%capture
! pip install --upgrade adk-milvus google-genai pymilvus milvus-lite
```

> If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

This notebook uses Gemini for both embeddings and the final agent turn. Prepare a `GEMINI_API_KEY` or `GOOGLE_API_KEY` environment variable before running it. The examples below use `gemini-embedding-001` to generate real embeddings and `gemini-2.5-flash` for the ADK agent.

## Set up a local Milvus workspace

Create a temporary workspace, define the Milvus Lite database files, and prepare a Gemini embedding function for the demo.


```python
import os
import tempfile
import warnings
from pathlib import Path
from typing import Sequence

from adk_milvus import (
    MilvusMemoryService,
    MilvusMemoryServiceConfig,
    MilvusToolset,
    MilvusVectorStore,
    MilvusVectorStoreSettings,
)
from google.adk.agents import Agent
from google.adk.events.event import Event
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import Client, types
from pymilvus import MilvusClient

work_dir = Path(tempfile.mkdtemp(prefix="google_adk_milvus_demo_"))
rag_db_path = work_dir / "adk_rag.db"
memory_db_path = work_dir / "adk_memory.db"

GOOGLE_EMBEDDING_MODEL = "gemini-embedding-001"
google_api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
if not google_api_key:
    raise RuntimeError(
        "Set GEMINI_API_KEY or GOOGLE_API_KEY before running this notebook."
    )

embedding_client = Client(api_key=google_api_key)


def google_embedding(texts: Sequence[str]) -> list[list[float]]:
    response = embedding_client.models.embed_content(
        model=GOOGLE_EMBEDDING_MODEL,
        contents=list(texts),
    )
    return [list(embedding.values) for embedding in response.embeddings]


EMBEDDING_DIMENSION = len(google_embedding(["Milvus vector database"])[0])


print(f"Workspace: {work_dir}")
print(f"Embedding model: {GOOGLE_EMBEDDING_MODEL}")
print(f"Embedding dimension: {EMBEDDING_DIMENSION}")
```

    Workspace: /tmp/google_adk_milvus_demo__btzq981
    Embedding model: gemini-embedding-001
    Embedding dimension: 3072


> As for the argument of `MilvusClient` used by the integration:
> - Setting the `uri` as a local file, e.g.`./milvus.db`, is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.
> - If you have large scale of data, you can set up a more performant Milvus server on [docker or kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server uri, e.g.`http://localhost:19530`, as your `uri`.
> - If you want to use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `uri` and `token`, which correspond to the [Public Endpoint and Api key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) in Zilliz Cloud.

## Build an ADK retrieval toolset with Milvus

`MilvusVectorStore` stores embedded text in Milvus, while `MilvusToolset` exposes that store as an ADK retrieval tool named `milvus_similarity_search`. We will index a small knowledge base with both relevant documents and unrelated distractors.


```python
RAG_COLLECTION = "google_adk_milvus_rag"

knowledge_docs = [
    {
        "id": "adk-toolset-doc",
        "source": "adk-toolset",
        "topic": "retrieval",
        "content": (
            "MilvusToolset exposes milvus_similarity_search as an ADK retrieval "
            "tool so agents can search product docs, runbooks, and other RAG content."
        ),
    },
    {
        "id": "adk-memory-doc",
        "source": "adk-memory",
        "topic": "memory",
        "content": (
            "MilvusMemoryService implements ADK BaseMemoryService and stores "
            "cross-session user memory with app_name and user_id scope."
        ),
    },
    {
        "id": "zilliz-cloud-doc",
        "source": "zilliz-cloud",
        "topic": "production",
        "content": (
            "Zilliz Cloud provides managed Milvus for production vector search, "
            "with cloud operations, backup planning, and deployment controls."
        ),
    },
    {
        "id": "milvus-lite-doc",
        "source": "milvus-lite",
        "topic": "local-development",
        "content": (
            "Milvus Lite stores vectors in a local database file and is useful "
            "for offline ADK prototypes before moving to a server or cloud deployment."
        ),
    },
    {
        "id": "latency-runbook-doc",
        "source": "operations-runbook",
        "topic": "operations",
        "content": (
            "The production runbook tracks vector search latency, index readiness, "
            "and restore steps for Milvus-backed applications."
        ),
    },
    {
        "id": "recipe-doc",
        "source": "team-recipe",
        "topic": "distractor",
        "content": "A pasta recipe uses tomato sauce, fresh basil, and slow cooking notes.",
    },
    {
        "id": "travel-doc",
        "source": "travel-plan",
        "topic": "distractor",
        "content": "The travel plan compares hotel options, train tickets, and city walks.",
    },
    {
        "id": "payroll-doc",
        "source": "payroll-note",
        "topic": "distractor",
        "content": "The payroll note explains invoice timing and monthly expense categories.",
    },
]

vector_store = MilvusVectorStore(
    embedding_function=google_embedding,
    settings=MilvusVectorStoreSettings(
        uri=str(rag_db_path),
        collection_name=RAG_COLLECTION,
        dimension=EMBEDDING_DIMENSION,
        search_top_k=4,
        consistency_level="Strong",
    ),
)

insert_result = await vector_store.add_texts_async(
    [doc["content"] for doc in knowledge_docs],
    metadatas=[
        {"source": doc["source"], "topic": doc["topic"]} for doc in knowledge_docs
    ],
    ids=[doc["id"] for doc in knowledge_docs],
)

print(insert_result)
print("Indexed sources:", ", ".join(doc["source"] for doc in knowledge_docs))
```

    {'status': 'SUCCESS', 'inserted_count': 8}
    Indexed sources: adk-toolset, adk-memory, zilliz-cloud, milvus-lite, operations-runbook, team-recipe, travel-plan, payroll-note


Now ask the ADK toolset for tools and run the Milvus retrieval tool directly. Running the tool directly verifies the Milvus-backed retrieval path before we involve the LLM; in a full ADK app, the agent can call the same tool during a model turn.


```python
toolset = MilvusToolset(vector_store=vector_store)
tools = await toolset.get_tools_with_prefix()
print("ADK tools:", [tool.name for tool in tools])

retrieval_result = await tools[0].run_async(
    args={"query": "Which ADK tool should retrieve Milvus product docs for an agent?"},
    tool_context=None,
)

for rank, row in enumerate(retrieval_result["rows"], start=1):
    metadata = row.get("metadata") or {}
    print(f"#{rank} | source={row['source']} | topic={metadata.get('topic')}")
    print(row["content"])
    print()

assert retrieval_result["rows"], "The retrieval tool should return matching rows."
assert retrieval_result["rows"][0]["source"] == "adk-toolset"
```

    ADK tools: ['milvus_similarity_search']


    #1 | source=adk-toolset | topic=retrieval
    MilvusToolset exposes milvus_similarity_search as an ADK retrieval tool so agents can search product docs, runbooks, and other RAG content.
    
    #2 | source=milvus-lite | topic=local-development
    Milvus Lite stores vectors in a local database file and is useful for offline ADK prototypes before moving to a server or cloud deployment.
    
    #3 | source=adk-memory | topic=memory
    MilvusMemoryService implements ADK BaseMemoryService and stores cross-session user memory with app_name and user_id scope.
    
    #4 | source=operations-runbook | topic=operations
    The production runbook tracks vector search latency, index readiness, and restore steps for Milvus-backed applications.
    


Because the store is backed by Milvus, you can also use metadata filters for narrower retrieval. The next query searches for production Milvus operations and restricts results to the Zilliz Cloud source.


```python
filtered_result = await vector_store.similarity_search_async(
    "managed cloud production Milvus operations",
    top_k=3,
    filter_expr='source == "zilliz-cloud"',
)

for rank, row in enumerate(filtered_result["rows"], start=1):
    print(f"#{rank} | source={row['source']}")
    print(row["content"])

assert filtered_result["rows"]
assert all(row["source"] == "zilliz-cloud" for row in filtered_result["rows"])
```

    #1 | source=zilliz-cloud
    Zilliz Cloud provides managed Milvus for production vector search, with cloud operations, backup planning, and deployment controls.


We can inspect the same Milvus Lite database with `MilvusClient`. This confirms that the ADK integration wrote ordinary Milvus rows containing ids, content, source metadata, and embeddings.


```python
inspection_client = MilvusClient(uri=str(rag_db_path))
stats = inspection_client.get_collection_stats(RAG_COLLECTION)
sample_rows = inspection_client.query(
    collection_name=RAG_COLLECTION,
    filter='source in ["adk-toolset", "team-recipe"]',
    output_fields=["id", "source", "content"],
    limit=4,
)
inspection_client.close()

print("Collection stats:", stats)
print("Sample rows:")
for row in sample_rows:
    print(f"- {row['id']} | {row['source']} | {row['content'][:90]}")

assert stats["row_count"] == len(knowledge_docs)
```

    Collection stats: {'row_count': 8}
    Sample rows:
    - adk-toolset-doc | adk-toolset | MilvusToolset exposes milvus_similarity_search as an ADK retrieval tool so agents can sear
    - recipe-doc | team-recipe | A pasta recipe uses tomato sauce, fresh basil, and slow cooking notes.


## Store ADK memory in Milvus

Retrieval tools are useful for shared knowledge bases. Agent memory is different: it should be scoped to a specific app and user, and it should survive across sessions. `MilvusMemoryService` implements ADK's memory service interface while using Milvus as the vector store underneath.


```python
MEMORY_COLLECTION = "google_adk_milvus_memory"
APP_NAME = "google-adk-milvus-demo"

memory_service = MilvusMemoryService(
    embedding_function=google_embedding,
    config=MilvusMemoryServiceConfig(
        uri=str(memory_db_path),
        collection_name=MEMORY_COLLECTION,
        dimension=EMBEDDING_DIMENSION,
        search_top_k=2,
        consistency_level="Strong",
    ),
)

user_1_events = [
    Event(
        id="user-1-event-1",
        invocation_id="inv-user-1-1",
        author="user",
        timestamp=10001,
        content=types.Content(
            parts=[
                types.Part(
                    text=(
                        "Remember that I prefer Milvus Lite for local ADK memory "
                        "prototypes before using a shared server."
                    )
                )
            ]
        ),
    ),
    Event(
        id="user-1-event-2",
        invocation_id="inv-user-1-2",
        author="user",
        timestamp=10002,
        content=types.Content(
            parts=[
                types.Part(
                    text=(
                        "For production, remember that our ADK agent should use "
                        "Zilliz Cloud for managed Milvus vector memory."
                    )
                )
            ]
        ),
    ),
    Event(
        id="user-1-event-3",
        invocation_id="inv-user-1-3",
        author="user",
        timestamp=10003,
        content=types.Content(
            parts=[types.Part(text="I also like cooking noodles on Friday evenings.")]
        ),
    ),
]

user_2_events = [
    Event(
        id="user-2-event-1",
        invocation_id="inv-user-2-1",
        author="user",
        timestamp=20001,
        content=types.Content(
            parts=[
                types.Part(
                    text=(
                        "User two keeps travel planning notes and hotel preferences "
                        "in a separate ADK memory scope."
                    )
                )
            ]
        ),
    )
]

await memory_service.add_events_to_memory(
    app_name=APP_NAME,
    user_id="user-1",
    session_id="session-local-and-cloud",
    events=user_1_events,
)
await memory_service.add_events_to_memory(
    app_name=APP_NAME,
    user_id="user-2",
    session_id="session-other-user",
    events=user_2_events,
)

print("Stored memory events:", len(user_1_events) + len(user_2_events))
```

    Stored memory events: 4


Search memory for one user. The service automatically filters by `app_name` and `user_id`, so another user's events do not leak into the result set.


```python
memory_result = await memory_service.search_memory(
    app_name=APP_NAME,
    user_id="user-1",
    query="production Milvus memory preference for my ADK agent",
)

print("User 1 memory search:")
for rank, memory in enumerate(memory_result.memories, start=1):
    print(f"#{rank} | author={memory.author} | timestamp={memory.timestamp}")
    print(memory.content.parts[0].text)
    print()

user_2_result = await memory_service.search_memory(
    app_name=APP_NAME,
    user_id="user-2",
    query="travel planning memory",
)
empty_user_result = await memory_service.search_memory(
    app_name=APP_NAME,
    user_id="user-3",
    query="production Milvus memory preference for my ADK agent",
)
wrong_app_result = await memory_service.search_memory(
    app_name="different-adk-app",
    user_id="user-1",
    query="production Milvus memory preference for my ADK agent",
)

print("User 2 scoped result:")
for memory in user_2_result.memories:
    print(memory.content.parts[0].text)
print("User 3 result count:", len(empty_user_result.memories))
print("Different app result count:", len(wrong_app_result.memories))

user_1_texts = [memory.content.parts[0].text for memory in memory_result.memories]
assert any("Zilliz Cloud" in text for text in user_1_texts)
assert all(
    "Zilliz Cloud" not in memory.content.parts[0].text
    for memory in user_2_result.memories
)
assert empty_user_result.memories == []
assert wrong_app_result.memories == []
```

    User 1 memory search:
    #1 | author=user | timestamp=1970-01-01T02:46:42
    For production, remember that our ADK agent should use Zilliz Cloud for managed Milvus vector memory.
    
    #2 | author=user | timestamp=1970-01-01T02:46:41
    Remember that I prefer Milvus Lite for local ADK memory prototypes before using a shared server.
    


    User 2 scoped result:
    User two keeps travel planning notes and hotel preferences in a separate ADK memory scope.
    User 3 result count: 0
    Different app result count: 0


## Attach Milvus tools to an ADK agent

The previous cells executed the retrieval tool directly, which verifies the Milvus-backed tool before involving the model. The same tool list can also be attached to an ADK `Agent`. The next cell runs a live Gemini turn through ADK Runner and shows that the model calls `milvus_similarity_search` before answering.


```python
agent = Agent(
    name="milvus_research_agent",
    model="gemini-2.5-flash",
    instruction=(
        "You are a concise assistant. Use milvus_similarity_search before "
        "answering questions about ADK, Milvus deployment, or vector memory. "
        "Mention source names from retrieved rows when useful."
    ),
    tools=tools,
)

print("Agent:", agent.name)
print("Attached tools:", [tool.name for tool in agent.tools])

model_key_available = bool(os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY"))
if not model_key_available:
    print("Set GEMINI_API_KEY or GOOGLE_API_KEY to run the live LLM turn.")
else:
    session_service = InMemorySessionService()
    llm_user_id = "user-llm"
    llm_session_id = "session-llm"
    await session_service.create_session(
        app_name=APP_NAME,
        user_id=llm_user_id,
        session_id=llm_session_id,
    )
    runner = Runner(
        app_name=APP_NAME,
        agent=agent,
        session_service=session_service,
    )
    prompt = (
        "Use the Milvus retrieval tool to answer: "
        "What does the ADK Milvus integration provide for agents?"
    )

    tool_calls = []
    tool_responses = []
    final_answer = ""
    with warnings.catch_warnings():
        warnings.filterwarnings(
            "ignore",
            message=".*JSON_SCHEMA_FOR_FUNC_DECL.*",
            category=UserWarning,
        )
        async for event in runner.run_async(
            user_id=llm_user_id,
            session_id=llm_session_id,
            new_message=types.Content(
                role="user",
                parts=[types.Part(text=prompt)],
            ),
        ):
            tool_calls.extend(call.name for call in event.get_function_calls())
            tool_responses.extend(
                response.name for response in event.get_function_responses()
            )
            if event.is_final_response() and event.content and event.content.parts:
                final_answer = "".join(part.text or "" for part in event.content.parts)

    print("LLM tool calls:", tool_calls)
    print("LLM tool responses:", tool_responses)
    print("Final answer:")
    print(final_answer)

    assert "milvus_similarity_search" in tool_calls
    assert final_answer
```

    Agent: milvus_research_agent
    Attached tools: ['milvus_similarity_search']


    LLM tool calls: ['milvus_similarity_search']
    LLM tool responses: ['milvus_similarity_search']
    Final answer:
    The ADK Milvus integration provides agents with the ability to search product documentation, runbooks, and other RAG content through the `milvus_similarity_search` tool, as stated in the "adk-toolset" source. It also offers a `MilvusMemoryService` for storing cross-session user memory, as mentioned in the "adk-memory" source. For development, "milvus-lite" allows for offline prototyping by storing vectors in a local database file, and for production, "zilliz-cloud" provides managed Milvus for vector search with cloud operations and deployment controls.



```python
await toolset.close()
await memory_service.close()
print("Milvus clients closed.")
```

    Milvus clients closed.


## Conclusion

This notebook showed how Milvus can sit behind two important ADK surfaces: retrieval tools for shared knowledge and memory services for user-scoped, cross-session context. It also ran a live ADK Runner turn where Gemini called the Milvus retrieval tool before answering. With Milvus Lite, the same integration is easy to prototype in a notebook; with Milvus server or Zilliz Cloud, the same configuration shape can support larger teams and production agent workloads.

The key idea is that ADK keeps the agent interface clean while Milvus handles durable vector search, metadata filtering, and scalable memory storage underneath.
