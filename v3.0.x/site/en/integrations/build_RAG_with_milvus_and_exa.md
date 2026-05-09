---
id: build_RAG_with_milvus_and_exa.md
summary: This tutorial demonstrates how to build an agent that searches both the public web (via Exa) and a private knowledge base (via Milvus), then synthesizes a unified answer. The agent uses OpenAI's function calling to automatically decide which source to query based on the user's question.
title: Building a Dual-Source RAG Agent with Exa and Milvus
---

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_exa.ipynb" target="_parent">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_exa.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>

# Building a Dual-Source RAG Agent with Exa and Milvus

This tutorial demonstrates how to build an agent that searches both **the public web** (via [Exa](https://exa.ai/)) and **a private knowledge base** (via [Milvus](https://milvus.io/)), then synthesizes a unified answer. The agent uses OpenAI's function calling to automatically decide which source to query based on the user's question.

[Exa](https://exa.ai/) is a search API designed for AI applications, which is proudly powered by [Zilliz Cloud](https://zilliz.com/cloud) (fully managed Milvus). Unlike traditional keyword-based search engines, Exa supports semantic (neural) search — you describe what you want in natural language and it understands your intent. It also provides content extraction, highlights, and category-based filtering. [Milvus](https://milvus.io/) is an open-source vector database built for scalable similarity search. By combining them with an LLM agent, you can build a system that retrieves both internal proprietary data and up-to-date web information in a single workflow.

## Prerequisites

Before running this notebook, make sure you have the following dependencies installed:


```shell
$ pip install exa_py pymilvus openai
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

You will need API keys from [Exa](https://dashboard.exa.ai/api-keys) and [OpenAI](https://platform.openai.com/api-keys). Set them as environment variables:


```shell
import os

os.environ["EXA_API_KEY"] = "***********"
os.environ["OPENAI_API_KEY"] = "sk-***********"
```

## Initialize Clients

Set up the Exa, OpenAI, and Milvus clients. We use OpenAI's `text-embedding-3-small` model to generate vector embeddings, and Milvus Lite for local vector storage with zero infrastructure setup.


```python
import json
from openai import OpenAI
from pymilvus import MilvusClient, DataType
from exa_py import Exa

llm = OpenAI()
exa = Exa(api_key=os.environ["EXA_API_KEY"])
milvus = MilvusClient(uri="./milvus_exa_demo.db")

EMBED_MODEL = "text-embedding-3-small"
EMBED_DIM = 1536
COLLECTION = "private_kb"
```

<div class="alert note">

As for the argument of `MilvusVectorAdapter` and `MilvusClient`:
- Setting the `uri` as a local file, e.g.`./milvus.db`, is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.
- If you have large scale of data, say more than a million vectors, you can set up a more performant Milvus server on [Docker or Kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server address and port as your uri, e.g.`http://localhost:19530`. If you enable the authentication feature on Milvus, use "<your_username>:<your_password>" as the token, otherwise don't set the token.
- If you want to use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `uri` and `token`, which correspond to the [Public Endpoint and Api key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) in Zilliz Cloud.

</div>

Define a helper function to generate embeddings. We will reuse this across the notebook for both indexing and querying:


```python
def embed_text(text: str | list[str]) -> list:
    """Generate embedding vector(s) using OpenAI."""
    resp = llm.embeddings.create(
        input=text if isinstance(text, list) else [text],
        model=EMBED_MODEL,
    )
    if isinstance(text, list):
        return [item.embedding for item in resp.data]
    return resp.data[0].embedding
```

## Build the Private Knowledge Base (Milvus)

We simulate a set of internal company documents — product specs, policies, earnings reports, and API docs — that would not appear on the public web. In a real scenario, these could come from your internal wikis, databases, or document management systems.


```python
private_docs = [
    {
        "id": 1,
        "text": (
            "Acme Widget Pro supports up to 10,000 concurrent connections. "
            "It uses a proprietary compression algorithm (AcmeZip v3) that "
            "reduces payload size by 72% compared to gzip."
        ),
        "source": "product-spec.pdf",
    },
    {
        "id": 2,
        "text": (
            "Our return policy allows customers to return any product within "
            "30 days of purchase for a full refund. After 30 days, only store "
            "credit is offered. Damaged items must be reported within 48 hours."
        ),
        "source": "return-policy.md",
    },
    {
        "id": 3,
        "text": (
            "Q3 2025 revenue was $4.2M, up 18% from Q2. The growth was "
            "primarily driven by enterprise customers adopting Widget Pro. "
            "Churn rate dropped to 3.1%."
        ),
        "source": "q3-earnings.pdf",
    },
    {
        "id": 4,
        "text": (
            "Internal API rate limits: free tier 100 req/min, pro tier "
            "5,000 req/min, enterprise tier 50,000 req/min. Rate limit "
            "headers are X-RateLimit-Remaining and X-RateLimit-Reset."
        ),
        "source": "api-docs.md",
    },
    {
        "id": 5,
        "text": (
            "Employee onboarding checklist: 1) Sign NDA, 2) Set up VPN access, "
            "3) Enroll in mandatory security training, 4) Request Jira and "
            "Confluence access from IT, 5) Schedule 1:1 with manager."
        ),
        "source": "onboarding-guide.md",
    },
]
```

Create the Milvus collection with an explicit schema, embed the documents, and insert them:


```python
if milvus.has_collection(COLLECTION):
    milvus.drop_collection(COLLECTION)

schema = milvus.create_schema(auto_id=False, enable_dynamic_field=True)
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=EMBED_DIM)
schema.add_field(field_name="text", datatype=DataType.VARCHAR, max_length=65535)
schema.add_field(field_name="source", datatype=DataType.VARCHAR, max_length=512)

index_params = milvus.prepare_index_params()
index_params.add_index(
    field_name="vector", index_type="AUTOINDEX", metric_type="COSINE"
)

milvus.create_collection(
    collection_name=COLLECTION,
    schema=schema,
    index_params=index_params,
    # consistency_level="Strong",
)

# Embed all documents in one batch call
embeddings = embed_text([doc["text"] for doc in private_docs])

milvus.insert(
    collection_name=COLLECTION,
    data=[
        {
            "id": doc["id"],
            "vector": emb,
            "text": doc["text"],
            "source": doc["source"],
        }
        for doc, emb in zip(private_docs, embeddings)
    ],
)

print(f"Inserted {len(private_docs)} documents into Milvus.")
```

    Inserted 5 documents into Milvus.


Let's verify the retrieval works with a quick test query:


```python
query = "What is the return policy?"
results = milvus.search(
    collection_name=COLLECTION,
    data=[embed_text(query)],
    limit=2,
    output_fields=["text", "source"],
)

for hit in results[0]:
    print(f"[score={hit['distance']:.3f}] ({hit['entity']['source']})")
    print(f"  {hit['entity']['text'][:120]}...")
    print()
```

    [score=0.665] (return-policy.md)
      Our return policy allows customers to return any product within 30 days of purchase for a full refund. After 30 days, on...
    
    [score=0.119] (q3-earnings.pdf)
      Q3 2025 revenue was $4.2M, up 18% from Q2. The growth was primarily driven by enterprise customers adopting Widget Pro. ...
    


## Explore Exa Search Capabilities

Before building the agent, let's explore Exa's search features. Exa supports multiple search modes that are useful for different scenarios.

**Semantic search** with content extraction — Exa can return not only links but also the article text, key highlights, and AI-generated summaries in a single request:


```python
web_results = exa.search_and_contents(
    query="latest trends in AI agents 2026",
    type="auto",
    num_results=3,
    text={"max_characters": 3000},
    highlights={"num_sentences": 3},
)

for r in web_results.results:
    print(f"[{r.title}]")
    print(f"  URL: {r.url}")
    if r.highlights:
        print(f"  Highlight: {r.highlights[0][:150]}...")
    print()
```

    [The AI Trends Shaping 2026. A month into the new year is as good a… | by ODSC - Open Data Science | Mar, 2026 | Medium]
      URL: https://odsc.medium.com/the-ai-trends-shaping-2026-34078dad4d49
      Highlight:  ahead. January brought Claude CoWork, Anthropic’s “AI coworker” that turns agents into desktop collaborators; OpenClaw (formerly Moltbot, formerly Cl...
    
    [AI agent trends 2026 report]
      URL: https://cloud.google.com/resources/content/ai-agent-trends-2026
      Highlight: >. The era of simple prompts is over. We're witnessing the agent leap—where AI orchestrates complex, end-to-end workflows semi-autonomously. For enter...
    
    [The Rise of Agentic AI: Why 2026 is the Year AI Started 'Doing']
      URL: https://www.marketdrafts.com/2026/02/rise-of-agentic-ai-2026-trends.html?m=1
      Highlight:  The era of "Generative AI" (which creates content) is being superseded by "Agentic AI" (which executes actions). We are witnessing a fundamental arch...
    


**Category-based filtering** — you can restrict results to specific content types such as `"research paper"`, `"news"`, `"company"`, or `"tweet"`. This is useful when you want high-quality sources and want to avoid noise:


```python
filtered_results = exa.search_and_contents(
    query="retrieval augmented generation real world applications",
    category="research paper",
    num_results=3,
    highlights={"num_sentences": 2},
)

for r in filtered_results.results:
    print(f"- {r.title}")
    print(f"  {r.url}\n")
```

    - 10 RAG examples and use cases from real companies
      https://www.evidentlyai.com/blog/rag-examples
    
    - Implementing Retrieval-Augmented Generation (RAG) with Real-World Constraints
      https://dev.to/dextralabs/implementing-retrieval-augmented-generation-rag-with-real-world-constraints-3ajm
    
    - 
      https://www.arxiv.org/pdf/2502.14930
    


**Find similar articles** — given a URL, Exa can find other articles with similar content. This is helpful for expanding research from a good starting point:


```python
if web_results.results:
    source_url = web_results.results[0].url
    similar = exa.find_similar_and_contents(
        url=source_url,
        num_results=3,
        highlights={"num_sentences": 2},
    )
    print(f"Articles similar to: {source_url}\n")
    for r in similar.results:
        print(f"- {r.title}")
        print(f"  {r.url}\n")
```

    Articles similar to: https://odsc.medium.com/the-ai-trends-shaping-2026-34078dad4d49
    
    - AI Trends 2026: From Agent Demos to Production Reality
      https://opendatascience.com/the-ai-trends-shaping-2026/
    
    - The Most Important AI Trends to Watch in 2026
      https://medium.com/the-ai-studio/the-most-important-ai-trends-to-watch-in-2026-54af64d45021
    


## Define the Agent Tools

Now we define the two tool functions that the agent will use. The private KB tool searches Milvus using vector similarity, while the web tool searches the public internet via Exa:


```python
def search_private_kb(query: str) -> str:
    """Search the internal knowledge base using Milvus vector search."""
    results = milvus.search(
        collection_name=COLLECTION,
        data=[embed_text(query)],
        limit=3,
        output_fields=["text", "source"],
    )
    chunks = []
    for hit in results[0]:
        chunks.append(f"[{hit['entity']['source']}] {hit['entity']['text']}")
    return "\n\n".join(chunks) if chunks else "No relevant internal documents found."


def search_web(query: str) -> str:
    """Search the public web using Exa for up-to-date information."""
    results = exa.search_and_contents(
        query=query,
        type="auto",
        num_results=3,
        highlights={"num_sentences": 3},
    )
    items = []
    for r in results.results:
        highlight = r.highlights[0] if r.highlights else "No snippet available."
        items.append(f"[{r.title}]({r.url})\n{highlight}")
    return "\n\n".join(items) if items else "No web results found."


TOOL_FNS = {
    "search_private_kb": search_private_kb,
    "search_web": search_web,
}
```

## Build the Agent

The agent uses OpenAI's [function calling](https://platform.openai.com/docs/guides/function-calling) to decide which tool(s) to invoke. It follows a simple loop: the LLM receives the user query, decides which tools to call (if any), executes them, and then synthesizes a final answer from the retrieved context.


```python
TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "search_private_kb",
            "description": (
                "Search the company's internal knowledge base (product docs, "
                "policies, earnings, API docs, HR guides). Use this for any "
                "question about internal/proprietary information."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "The search query"}
                },
                "required": ["query"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "search_web",
            "description": (
                "Search the public web for up-to-date external information - "
                "news, trends, competitor analysis, open-source projects, etc. "
                "Use this when the question is about the outside world."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "The search query"}
                },
                "required": ["query"],
            },
        },
    },
]

SYSTEM_PROMPT = """You are a helpful assistant with access to two search tools:

1. **search_private_kb** - searches the company's internal knowledge base.
2. **search_web** - searches the public internet via Exa.

Routing rules:
- Questions about internal products, policies, metrics, or processes: use search_private_kb.
- Questions about external trends, news, competitors, or general knowledge: use search_web.
- Questions that need both internal and external context: call BOTH tools, then synthesize.

Always cite your sources. For internal docs, mention the filename. For web results, include the URL."""


def run_agent(user_query: str) -> str:
    """Run the agent loop: LLM -> tool calls -> LLM -> final answer."""
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_query},
    ]

    print(f"User: {user_query}\n")

    # First LLM call - may request tool calls
    response = llm.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        tools=TOOLS,
    )
    msg = response.choices[0].message
    messages.append(msg)

    # If no tool calls, return directly
    if not msg.tool_calls:
        print(f"Agent (no tools used): {msg.content}")
        return msg.content

    # Execute each tool call
    for tc in msg.tool_calls:
        fn_name = tc.function.name
        fn_args = json.loads(tc.function.arguments)
        print(f"  -> Calling {fn_name}(query={fn_args['query']!r})")

        result = TOOL_FNS[fn_name](**fn_args)
        messages.append(
            {
                "role": "tool",
                "tool_call_id": tc.id,
                "content": result,
            }
        )

    # Second LLM call - synthesize final answer
    response = llm.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        tools=TOOLS,
    )
    answer = response.choices[0].message.content
    print(f"\nAgent:\n{answer}")
    return answer
```

## Demo

Now let's test the agent with three scenarios that demonstrate different routing behaviors.

### Scenario A: Internal question (routes to Milvus)

Ask about an internal policy — the agent should call `search_private_kb` and retrieve the answer from our private documents:


```python
run_agent("What is the return policy for Acme products?")
```

    User: What is the return policy for Acme products?
    


      -> Calling search_private_kb(query='return policy Acme products')


    
    Agent:
    The Acme products return policy allows customers to return any product within 30 days of purchase for a full refund. After 30 days, only store credit is offered. It's important to note that damaged items must be reported within 48 hours of receipt ([source: return-policy.md]).





    "The Acme products return policy allows customers to return any product within 30 days of purchase for a full refund. After 30 days, only store credit is offered. It's important to note that damaged items must be reported within 48 hours of receipt ([source: return-policy.md])."



### Scenario B: External question (routes to Exa)

Ask about external trends — the agent should call `search_web` to fetch up-to-date information from the public internet:


```python
run_agent("What are the latest AI agent frameworks trending in 2026?")
```

    User: What are the latest AI agent frameworks trending in 2026?
    


      -> Calling search_web(query='latest AI agent frameworks 2026')


    
    Agent:
    In 2026, several AI agent frameworks are trending, each offering unique features and capabilities that cater to various needs. Here are some of the most prominent ones:
    
    1. **LangChain and LangGraph**: These frameworks remain highly popular for building large language model (LLM)-powered applications. LangGraph, in particular, models agents as state graphs, which is useful for action-oriented workflows. LangChain continues to dominate due to its comprehensive feature set for production-grade control and orchestration.
    
    2. **LangSmith Agent Builder**: Released into general availability in 2026, this tool allows teams to create AI agents using natural language, simplifying the process of agent development.
    
    3. **Semantic Kernel and AutoGen**: These have been integrated into Azure AI Foundry, creating a unified framework. Semantic Kernel uses a plugin-based middleware pattern, enhancing existing applications with AI capabilities efficiently.
    
    4. **OpenClaw**: An open-source framework that operates locally, OpenClaw transforms your computer into an autonomous agent host, differing from cloud-based solutions by keeping data and operations localized. This framework supports a large community and includes extensive skills for customization.
    
    These frameworks cater to various requirements, whether it's production-grade solutions, open-source options, or frameworks focused on local deployment. Each framework has its strengths, depending on the use case and the existing ecosystem it fits into.
    
    Sources:
    - [Agentic AI Frameworks: The Complete Guide (2026)](https://aiagentskit.com/blog/agentic-ai-frameworks/)
    - [OpenClaw: The Open-Source AI Agent Framework That Runs Your Life Locally](https://www.clawbot.blog/blog/openclaw-the-open-source-ai-agent-framework-that-runs-your-life-locally)
    - [The Best AI Agent Frameworks for 2026](https://medium.com/data-science-collective/the-best-ai-agent-frameworks-for-2026-tier-list-b3a4362fac0d)





    "In 2026, several AI agent frameworks are trending, each offering unique features and capabilities that cater to various needs. Here are some of the most prominent ones:\n\n1. **LangChain and LangGraph**: These frameworks remain highly popular for building large language model (LLM)-powered applications. LangGraph, in particular, models agents as state graphs, which is useful for action-oriented workflows. LangChain continues to dominate due to its comprehensive feature set for production-grade control and orchestration.\n\n2. **LangSmith Agent Builder**: Released into general availability in 2026, this tool allows teams to create AI agents using natural language, simplifying the process of agent development.\n\n3. **Semantic Kernel and AutoGen**: These have been integrated into Azure AI Foundry, creating a unified framework. Semantic Kernel uses a plugin-based middleware pattern, enhancing existing applications with AI capabilities efficiently.\n\n4. **OpenClaw**: An open-source framework that operates locally, OpenClaw transforms your computer into an autonomous agent host, differing from cloud-based solutions by keeping data and operations localized. This framework supports a large community and includes extensive skills for customization.\n\nThese frameworks cater to various requirements, whether it's production-grade solutions, open-source options, or frameworks focused on local deployment. Each framework has its strengths, depending on the use case and the existing ecosystem it fits into.\n\nSources:\n- [Agentic AI Frameworks: The Complete Guide (2026)](https://aiagentskit.com/blog/agentic-ai-frameworks/)\n- [OpenClaw: The Open-Source AI Agent Framework That Runs Your Life Locally](https://www.clawbot.blog/blog/openclaw-the-open-source-ai-agent-framework-that-runs-your-life-locally)\n- [The Best AI Agent Frameworks for 2026](https://medium.com/data-science-collective/the-best-ai-agent-frameworks-for-2026-tier-list-b3a4362fac0d)"



### Scenario C: Hybrid question (routes to both)

Ask a question that requires both internal specs and external benchmarks — the agent should call both tools and synthesize a comparison:


```python
run_agent(
    "How does our Widget Pro's throughput compare to "
    "open-source alternatives on the market?"
)
```

    User: How does our Widget Pro's throughput compare to open-source alternatives on the market?
    


      -> Calling search_private_kb(query='Widget Pro throughput comparison')


      -> Calling search_web(query='open-source widget throughput comparison')


    
    Agent:
    The throughput of our Widget Pro is quite competitive when compared to open-source alternatives on the market. Here's a detailed comparison:
    
    ### Widget Pro
    
    - **Concurrent Connections**: Supports up to 10,000 concurrent connections.
    - **Compression**: Utilizes AcmeZip v3, a proprietary compression algorithm that reduces payload size by 72% compared to gzip (source: [product-spec.pdf]).
    - **API Rate Limits**: Offers different tiers:
      - Free tier: 100 requests/minute.
      - Pro tier: 5,000 requests/minute.
      - Enterprise tier: 50,000 requests/minute (source: [api-docs.md]).
    
    ### Open-Source Alternatives
    
    From the available resources, open-source widget solutions such as Chatwoot and Tiledesk are popular in handling customer engagement with a flexible and customizable approach (source: [ChatMaxima article](https://chatmaxima.com/blog/15-open-source-free-live-chat-widget-solutions-to-boost-your-customer-engagement-in-2024/)). However, specific throughput metrics such as maximum concurrent connections or API limits are generally not highlighted in open-source product descriptions unless directly benchmarked.
    
    These alternatives often emphasize customization, control, and integration with AI-driven capabilities but do not always specify throughput in terms comparable with Widget Pro. They might be more suited for organizations looking to tailor solutions to specific needs rather than focusing solely on throughput efficiency.
    
    In conclusion, Widget Pro appears to offer high throughput suitable for enterprises with robust API support, while open-source options offer flexibility and customization with varying degrees of performance metrics.





    "The throughput of our Widget Pro is quite competitive when compared to open-source alternatives on the market. Here's a detailed comparison:\n\n### Widget Pro\n\n- **Concurrent Connections**: Supports up to 10,000 concurrent connections.\n- **Compression**: Utilizes AcmeZip v3, a proprietary compression algorithm that reduces payload size by 72% compared to gzip (source: [product-spec.pdf]).\n- **API Rate Limits**: Offers different tiers:\n  - Free tier: 100 requests/minute.\n  - Pro tier: 5,000 requests/minute.\n  - Enterprise tier: 50,000 requests/minute (source: [api-docs.md]).\n\n### Open-Source Alternatives\n\nFrom the available resources, open-source widget solutions such as Chatwoot and Tiledesk are popular in handling customer engagement with a flexible and customizable approach (source: [ChatMaxima article](https://chatmaxima.com/blog/15-open-source-free-live-chat-widget-solutions-to-boost-your-customer-engagement-in-2024/)). However, specific throughput metrics such as maximum concurrent connections or API limits are generally not highlighted in open-source product descriptions unless directly benchmarked.\n\nThese alternatives often emphasize customization, control, and integration with AI-driven capabilities but do not always specify throughput in terms comparable with Widget Pro. They might be more suited for organizations looking to tailor solutions to specific needs rather than focusing solely on throughput efficiency.\n\nIn conclusion, Widget Pro appears to offer high throughput suitable for enterprises with robust API support, while open-source options offer flexibility and customization with varying degrees of performance metrics."



## Cleanup

When you are done, drop the collection to free resources.


```python
milvus.drop_collection(COLLECTION)
```

## Conclusion

In this tutorial, we built a dual-source RAG agent that combines Milvus for private knowledge retrieval with Exa for public web search. The key components are:

- **Milvus** stores and retrieves internal documents via vector similarity search, ensuring proprietary data stays private and searchable.
- **Exa** provides semantic web search with features like category filtering, content extraction, and similar article discovery.
- **OpenAI function calling** enables the LLM to automatically route queries to the right source — or both — based on the question's intent.

This pattern is applicable to enterprise use cases where an AI assistant needs access to both confidential internal documents and real-time external information.
