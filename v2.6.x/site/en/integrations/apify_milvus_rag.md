---
id: apify_milvus_rag.md
summary: This tutorial explains how to crawl websites using Apify's Website Content Crawler and save the data into Milvus/Zilliz vector database to be later used for question answering.
title: "Retrieval-Augmented Generation: Crawling Websites with Apify and Saving Data to Milvus for Question Answering"
---


# Retrieval-Augmented Generation: Crawling Websites with Apify and Saving Data to Milvus for Question Answering

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/apify_milvus_rag.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

This tutorial explains how to crawl websites using Apify's Website Content Crawler and save the data into Milvus/Zilliz vector database to be later used for question answering.

[Apify](https://apify.com/) is a web scraping and data extraction platform that offers an app marketplace with over two thousand ready-made cloud tools, known as Actors. These tools are ideal for use cases such as extracting structured data from e-commerce websites, social media, search engines, online maps, and more.

For example, the [Website Content Crawler](https://apify.com/apify/website-content-crawler) Actor can deeply crawl websites, clean their HTML by removing a cookies modal, footer, or navigation, and then transform the HTML into Markdown.

The Apify integration for Milvus/Zilliz makes it easy to upload data from the web to the vector database.

# Before you begin

Before running this notebook, make sure you have the following:

- an Apify account and [APIFY_API_TOKEN](https://docs.apify.com/platform/integrations/api).

- an OpenAI account and [OPENAI_API_KEY](https://platform.openai.com/docs/quickstart)

- A [Zilliz Cloud account](https://cloud.zilliz.com) (a fully managed cloud service for Milvus).
- The Zilliz database URI and Token


## Install dependencies


```python
$ pip install --upgrade --quiet  apify==1.7.2 langchain-core==0.3.5 langchain-milvus==0.1.5 langchain-openai==0.2.0
```

## Set up Apify and Open API keys

```python
import os
from getpass import getpass

os.environ["APIFY_API_TOKEN"] = getpass("Enter YOUR APIFY_API_TOKEN")
os.environ["OPENAI_API_KEY"] = getpass("Enter YOUR OPENAI_API_KEY")
```

    Enter YOUR APIFY_API_TOKEN··········
    Enter YOUR OPENAI_API_KEY··········


## Set up Milvus/Zilliz URI, token and collection name

You need the URI and Token of your Milvus/Zilliz to setup the client.

- If you have self-deployed Milvus server on [Docker or Kubernetes](https://milvus.io/docs/quickstart.md), use the server address and port as your uri, e.g.`http://localhost:19530`. If you enable the authentication feature on Milvus, use "<your_username>:<your_password>" as the token, otherwise leave the token as empty string.
- If you use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `uri` and `token`, which correspond to the [Public Endpoint and API key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details) in Zilliz Cloud.

Note that the collection does not need to exist beforehand. It will be automatically created when data is uploaded to the database.

```python
os.environ["MILVUS_URI"] = getpass("Enter YOUR MILVUS_URI")
os.environ["MILVUS_TOKEN"] = getpass("Enter YOUR MILVUS_TOKEN")

MILVUS_COLLECTION_NAME = "apify"
```

    Enter YOUR MILVUS_URI··········
    Enter YOUR MILVUS_TOKEN··········


## Using the Website Content Crawler to scrape text content from Milvus.io

Next, we'll use the Website Content Crawler with the Apify Python SDK. We'll start by defining the actor_id and run_input, then specify the information that will be saved to the vector database.

The `actor_id="apify/website-content-crawler"` is the identifier for the Website Content Crawler. The crawler's behavior can be fully controlled via the run_input parameters (see the [input page](https://apify.com/apify/website-content-crawler/input-schema) for more details). In this example, we’ll be crawling the Milvus documentation, which doesn’t require JavaScript rendering. Therefore, we set `crawlerType=cheerio`, define `startUrls`, and limit the number of crawled pages by setting `maxCrawlPages=10`.


```python
from apify_client import ApifyClient

client = ApifyClient(os.getenv("APIFY_API_TOKEN"))

actor_id = "apify/website-content-crawler"
run_input = {
    "crawlerType": "cheerio",
    "maxCrawlPages": 10,
    "startUrls": [{"url": "https://milvus.io/"}, {"url": "https://zilliz.com/"}],
}

actor_call = client.actor(actor_id).call(run_input=run_input)
```

The Website Content Crawler will thoroughly crawl the site until it reaches the predefined limit set by `maxCrawlPages`. The scraped data will be stored in a `Dataset` on the Apify platform. To access and analyze this data, you can use the `defaultDatasetId`


```python
dataset_id = actor_call["defaultDatasetId"]
dataset_id
```


    'P9dLFfeJAljlePWnz'



The following code fetches the scraped data from the Apify `Dataset` and displays the first scraped website


```python
item = client.dataset(dataset_id).list_items(limit=1).items
item[0].get("text")
```


    'The High-Performance Vector Database Built for Scale\nStart running Milvus in seconds\nfrom pymilvus import MilvusClient client = MilvusClient("milvus_demo.db") client.create_collection( collection_name="demo_collection", dimension=5 )\nDeployment Options to Match Your Unique Journey\nMilvus Lite\nLightweight, easy to start\nVectorDB-as-a-library runs in notebooks/ laptops with a pip install\nBest for learning and prototyping\nMilvus Standalone\nRobust, single-machine deployment\nComplete vector database for production or testing\nIdeal for datasets with up to millions of vectors\nMilvus Distributed\nScalable, enterprise-grade solution\nHighly reliable and distributed vector database with comprehensive toolkit\nScale horizontally to handle billions of vectors\nZilliz Cloud\nFully managed with minimal operations\nAvailable in both serverless and dedicated cluster\nSaaS and BYOC options for different security and compliance requirements\nTry Free\nLearn more about different Milvus deployment models\nLoved by GenAI developers\nBased on our research, Milvus was selected as the vector database of choice (over Chroma and Pinecone). Milvus is an open-source vector database designed specifically for similarity search on massive datasets of high-dimensional vectors.\nWith its focus on efficient vector similarity search, Milvus empowers you to build robust and scalable image retrieval systems. Whether you’re managing a personal photo library or developing a commercial image search application, Milvus offers a powerful foundation for unlocking the hidden potential within your image collections.\nBhargav Mankad\nSenior Solution Architect\nMilvus is a powerful vector database tailored for processing and searching extensive vector data. It stands out for its high performance and scalability, rendering it perfect for machine learning, deep learning, similarity search tasks, and recommendation systems.\nIgor Gorbenko\nBig Data Architect\nStart building your GenAI app now\nGuided with notebooks developed by us and our community\nRAG\nTry Now\nImage Search\nTry Now\nMultimodal Search\nTry Now\nUnstructured Data Meetups\nJoin a Community of Passionate Developers and Engineers Dedicated to Gen AI.\nRSVP now\nWhy Developers Prefer Milvus for Vector Databases\nScale as needed\nElastic scaling to tens of billions of vectors with distributed architecture.\nBlazing fast\nRetrieve data quickly and accurately with Global Index, regardless of scale.\nReusable Code\nWrite once, and deploy with one line of code into the production environment.\nFeature-rich\nMetadata filtering, hybrid search, multi-vector and more.\nWant to learn more about Milvus? View our documentation\nJoin the community of developers building GenAI apps with Milvus, now with over 25 million downloads\nGet Milvus Updates\nSubscribe to get updates on the latest Milvus releases, tutorials and training from Zilliz, the creator and key maintainer of Milvus.'



To upload data into the Milvus database, we use the [Apify Milvus integration](https://apify.com/apify/milvus-integration). First, we need to set up the parameter for the Milvus database. Next, we select the fields (`datasetFields`) that we want to store in the database. In the example below, we are saving the `text` field and `metadata.title`.


```python
milvus_integration_inputs = {
    "milvusUri": os.getenv("MILVUS_URI"),
    "milvusToken": os.getenv("MILVUS_TOKEN"),
    "milvusCollectionName": MILVUS_COLLECTION_NAME,
    "datasetFields": ["text", "metadata.title"],
    "datasetId": actor_call["defaultDatasetId"],
    "performChunking": True,
    "embeddingsApiKey": os.getenv("OPENAI_API_KEY"),
    "embeddingsProvider": "OpenAI",
}
```

Now, we'll call the `apify/milvus-integration` to store the data


```python
actor_call = client.actor("apify/milvus-integration").call(
    run_input=milvus_integration_inputs
)
```

All the scraped data is now stored in the Milvus database and is ready for retrieval and question answering

# Retrieval and LLM generative pipeline

Next, we'll define the retrieval-augmented pipeline using Langchain. The pipeline works in two stages:

- Vectorstore (Milvus): Langchain retrieves relevant documents from Milvus by matching query embeddings with stored document embeddings.
- LLM Response: The retrieved documents provide context for the LLM (e.g., GPT-4) to generate an informed answer.

For more details about the RAG chain, please refer to the [Langchain documentation](https://python.langchain.com/v0.2/docs/tutorials/rag/).


```python
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_milvus.vectorstores import Milvus
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

vectorstore = Milvus(
    connection_args={
        "uri": os.getenv("MILVUS_URI"),
        "token": os.getenv("MILVUS_TOKEN"),
    },
    embedding_function=embeddings,
    collection_name=MILVUS_COLLECTION_NAME,
)

prompt = PromptTemplate(
    input_variables=["context", "question"],
    template="Use the following pieces of retrieved context to answer the question. If you don't know the answer, "
    "just say that you don't know. \nQuestion: {question} \nContext: {context} \nAnswer:",
)


def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


rag_chain = (
    {
        "context": vectorstore.as_retriever() | format_docs,
        "question": RunnablePassthrough(),
    }
    | prompt
    | ChatOpenAI(model="gpt-4o-mini")
    | StrOutputParser()
)
```

Once we have the data in the database, we can start asking questions

---




```python
question = "What is Milvus database?"

rag_chain.invoke(question)
```




    'Milvus is an open-source vector database specifically designed for billion-scale vector similarity search. It facilitates efficient management and querying of vector data, which is essential for applications involving unstructured data, such as AI and machine learning. Milvus allows users to perform operations like CRUD (Create, Read, Update, Delete) and vector searches, making it a powerful tool for handling large datasets.'



# Conclusion

In this tutorial, we demonstrated how to crawl website content using Apify, store the data in a Milvus vector database, and use a retrieval-augmented pipeline to perform question-answering tasks. By combining Apify's web scraping capabilities with Milvus/Zilliz for vector storage and Langchain for language models, you can build highly effective information retrieval systems.

To improve data collection and updates in the database, the Apify integration offers [incremental updates](https://apify.com/apify/milvus-integration#incrementally-update-database-from-the-website-content-crawler), which updates only new or modified data based on checksums. Additionally, it can automatically [remove outdated](https://apify.com/apify/milvus-integration#delete-outdated-expired-data) data that hasn't been crawled within a specified time. These features help keep your vector database optimized and ensure that your retrieval-augmented pipeline remains efficient and up-to-date with minimal manual effort.

For more details on Apify-Milvus integration, please refer to the [Apify Milvus documentation](https://docs.apify.com/platform/integrations/milvus) and the [integration README file](https://apify.com/apify/milvus-integration).

