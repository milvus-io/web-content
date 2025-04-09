---
id: build_RAG_with_milvus_and_feast.md
summary: In this tutorial, we will build a Retrieval-Augmented Generation (RAG) pipeline using Feast and Milvus. Feast is an open-source feature store that streamlines feature management for machine learning, enabling efficient storage and retrieval of structured data for both training and real-time inference. Milvus is a high-performance vector database designed for fast similarity search, making it ideal for retrieving relevant documents in RAG workflows. 
title: Build RAG with Milvus and Feast
---

# Build RAG with Milvus and Feast

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_with_milvus_and_feast.ipynb" target="_parent">
  <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_with_milvus_and_feast.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>

In this tutorial, we will build a Retrieval-Augmented Generation (RAG) pipeline using [Feast](https://github.com/feast-dev/feast) and [Milvus](https://milvus.io/). Feast is an open-source feature store that streamlines feature management for machine learning, enabling efficient storage and retrieval of structured data for both training and real-time inference. Milvus is a high-performance vector database designed for fast similarity search, making it ideal for retrieving relevant documents in RAG workflows. 

Essentially, we'll use Feast to inject documents and structured data (i.e., features) into the context of an LLM (Large Language Model) to power a RAG Application (Retrieval Augmented Generation) with Milvus as the online vector database.


# Why Feast? 

Feast solves several common issues in this flow:

1. **Online retrieval:** At inference time, LLMs often need access to data that isn't readily 
   available and needs to be precomputed from other data sources.
   * Feast manages deployment to a variety of online stores (e.g. Milvus, DynamoDB, Redis, Google Cloud Datastore) and 
     ensures necessary features are consistently _available_ and _freshly computed_ at inference time.
2. **Vector Search:** Feast has built support for vector similarity search that is easily configured declaritively so users can focus on their application. Milvus provides powerful and efficient vector similarity search capabilities.
3. **Richer structured data:** Along with vector search, users can query standard structured fields to inject into the LLM context for better user experiences.
4. **Feature/Context and versioning:** Different teams within an organization are often unable to reuse 
   data across projects and services, resulting in duplicate application logic. Models have data dependencies that need 
   to be versioned, for example when running A/B tests on model/prompt versions.
   * Feast enables discovery of and collaboration on previously used documents, features, and enables versioning of sets of 
     data.

We will:

1. Deploy a local feature store with a **Parquet file offline store** and **Milvus online store**.
2. Write/materialize the data (i.e., feature values) from the offline store (a parquet file) into the online store (Milvus).
3. Serve the features using the Feast SDK with Milvus's vector search capabilities
4. Inject the document into the LLM's context to answer questions

<div class="alert note">

This tutorial is based on the official Milvus integration guide from the [Feast Repository](https://github.com/feast-dev/feast/blob/master/examples/rag/milvus-quickstart.ipynb). While we strive to keep this tutorial up-to-date, if you encounter any discrepancies, please refer to the official guide and feel free to open an issue in our repository for any necessary updates.

</div>

## Preparation

### Dependencies 


```shell
$ pip install 'feast[milvus]' openai -U -q
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

We will use OpenAI as our LLM provider. You can login to its official website and prepare the [OPENAI_API_KEY](https://platform.openai.com/api-keys) as an environment variable.


```python
import os
from openai import OpenAI

os.environ["OPENAI_API_KEY"] = "sk-**************"

llm_client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)
```

## Prepare the Data

We will use the data from the following folder as our example:  
[Feast RAG Feature Repo](https://github.com/feast-dev/feast/tree/master/examples/rag/feature_repo)  

After downloading the data, you will find the following files:  

```bash
feature_repo/
│── data/                  # Contains pre-processed Wikipedia city data in Parquet format
│── example_repo.py        # Defines feature views and entities for the city data
│── feature_store.yaml     # Configures Milvus and feature store settings
│── test_workflow.py       # Example workflow for Feast operations
```


### Key Configuration Files

#### 1. feature_store.yaml

This file configures the feature store infrastructure:

```yaml
project: rag
provider: local
registry: data/registry.db

online_store:
  type: milvus            # Uses Milvus for vector storage
  path: data/online_store.db
  vector_enabled: true    # Enables vector similarity search
  embedding_dim: 384      # Dimension of our embeddings
  index_type: "FLAT"      # Vector index type
  metric_type: "COSINE"   # Similarity metric

offline_store:
  type: file              # Uses file-based offline storage
```

This configuration establishes:

- Milvus as the online store for fast vector retrieval
- File-based offline storage for historical data processing
- Vector search capabilities with COSINE similarity

#### 2. example_repo.py

Contains the feature definitions for our city data, including:

- Entity definitions for cities
- Feature views for city information and embeddings
- Schema specifications for the vector database

#### 3. Data Directory

Contains our pre-processed Wikipedia city data with:

- City descriptions and summaries
- Pre-computed embeddings (384-dimensional vectors)
- Associated metadata like city names and states

These files work together to create a feature store that combines Milvus's vector search capabilities with Feast's feature management, enabling efficient retrieval of relevant city information for our RAG application.



## Inspect the Data

The raw feature data we have in this demo is stored in a local parquet file. The dataset Wikipedia summaries of diferent cities. Let's inspect the data first.


```python
import pandas as pd

df = pd.read_parquet(
    "/path/to/feature_repo/data/city_wikipedia_summaries_with_embeddings.parquet"
)
df["vector"] = df["vector"].apply(lambda x: x.tolist())
embedding_length = len(df["vector"][0])
print(f"embedding length = {embedding_length}")
```

    embedding length = 384



```python
from IPython.display import display

display(df.head())
```


<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>id</th>
      <th>item_id</th>
      <th>event_timestamp</th>
      <th>state</th>
      <th>wiki_summary</th>
      <th>sentence_chunks</th>
      <th>vector</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>0</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>New York, New York</td>
      <td>New York, often called New York City or simply...</td>
      <td>New York, often called New York City or simply...</td>
      <td>[0.1465730518102646, -0.07317650318145752, 0.0...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>New York, New York</td>
      <td>New York, often called New York City or simply...</td>
      <td>The city comprises five boroughs, each of whic...</td>
      <td>[0.05218901485204697, -0.08449874818325043, 0....</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>2</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>New York, New York</td>
      <td>New York, often called New York City or simply...</td>
      <td>New York is a global center of finance and com...</td>
      <td>[0.06769222766160965, -0.07371102273464203, -0...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>3</td>
      <td>3</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>New York, New York</td>
      <td>New York, often called New York City or simply...</td>
      <td>New York City is the epicenter of the world's ...</td>
      <td>[0.12095861881971359, -0.04279915615916252, 0....</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4</td>
      <td>4</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>New York, New York</td>
      <td>New York, often called New York City or simply...</td>
      <td>With an estimated population in 2022 of 8,335,...</td>
      <td>[0.17943550646305084, -0.09458263963460922, 0....</td>
    </tr>
  </tbody>
</table>
</div>


## Register Feature Definitions and Deploy the Feature Store

After downloading the `feature_repo`, we need to run `feast apply` to register the feature views and entities defined in `example_repo.py`, and sets up **Milvus** as the online store tables. 

Make sure you have nagivated to the `feature_repo` directory before running the command. 

```bash
feast apply
```


## Load Features into Milvus

Now we load the features into Milvus. This step involves serializing feature values from the offline store and writing them into Milvus.


```python
from datetime import datetime
from feast import FeatureStore
import warnings

warnings.filterwarnings("ignore")

store = FeatureStore(repo_path="/path/to/feature_repo")
```


```python
store.write_to_online_store(feature_view_name="city_embeddings", df=df)
```

    Connecting to Milvus in local mode using /Users/jinhonglin/Desktop/feature_repo/data/online_store.db


Note that now there are `online_store.db` and `registry.db`, which store the materialized features and schema information, respectively. We can take a look at the `online_store.db` file.


```python
pymilvus_client = store._provider._online_store._connect(store.config)
COLLECTION_NAME = pymilvus_client.list_collections()[0]

milvus_query_result = pymilvus_client.query(
    collection_name=COLLECTION_NAME,
    filter="item_id == '0'",
)
pd.DataFrame(milvus_query_result[0]).head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>item_id_pk</th>
      <th>created_ts</th>
      <th>event_ts</th>
      <th>item_id</th>
      <th>sentence_chunks</th>
      <th>state</th>
      <th>vector</th>
      <th>wiki_summary</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>New York, often called New York City or simply...</td>
      <td>New York, New York</td>
      <td>0.146573</td>
      <td>New York, often called New York City or simply...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>New York, often called New York City or simply...</td>
      <td>New York, New York</td>
      <td>-0.073177</td>
      <td>New York, often called New York City or simply...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>New York, often called New York City or simply...</td>
      <td>New York, New York</td>
      <td>0.052114</td>
      <td>New York, often called New York City or simply...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>New York, often called New York City or simply...</td>
      <td>New York, New York</td>
      <td>0.033187</td>
      <td>New York, often called New York City or simply...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>New York, often called New York City or simply...</td>
      <td>New York, New York</td>
      <td>0.012013</td>
      <td>New York, often called New York City or simply...</td>
    </tr>
  </tbody>
</table>
</div>



## Build RAG

### 1. Embedding a Query Using PyTorch and Sentence Transformers

During inference (e.g., during when a user submits a chat message) we need to embed the input text. This can be thought of as a feature transformation of the input data. In this example, we'll do this with a small Sentence Transformer from Hugging Face.


```python
import torch
import torch.nn.functional as F
from feast import FeatureStore
from pymilvus import MilvusClient, DataType, FieldSchema
from transformers import AutoTokenizer, AutoModel
from example_repo import city_embeddings_feature_view, item

TOKENIZER = "sentence-transformers/all-MiniLM-L6-v2"
MODEL = "sentence-transformers/all-MiniLM-L6-v2"


def mean_pooling(model_output, attention_mask):
    token_embeddings = model_output[
        0
    ]  # First element of model_output contains all token embeddings
    input_mask_expanded = (
        attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    )
    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(
        input_mask_expanded.sum(1), min=1e-9
    )


def run_model(sentences, tokenizer, model):
    encoded_input = tokenizer(
        sentences, padding=True, truncation=True, return_tensors="pt"
    )
    # Compute token embeddings
    with torch.no_grad():
        model_output = model(**encoded_input)

    sentence_embeddings = mean_pooling(model_output, encoded_input["attention_mask"])
    sentence_embeddings = F.normalize(sentence_embeddings, p=2, dim=1)
    return sentence_embeddings
```

### 2. Fetching Real-time Vectors and Data for Online Inference

Once the query has been transformed into an embedding, the next step is to retrieve relevant documents from the vector store. At inference time, we leverage vector similarity search to find the most relevant document embeddings stored in the online feature store, using `retrieve_online_documents_v2()`. These feature vectors can then be fed into the context of the LLM.


```python
question = "Which city has the largest population in New York?"

tokenizer = AutoTokenizer.from_pretrained(TOKENIZER)
model = AutoModel.from_pretrained(MODEL)
query_embedding = run_model(question, tokenizer, model)
query = query_embedding.detach().cpu().numpy().tolist()[0]
```


```python
from IPython.display import display

# Retrieve top k documents
context_data = store.retrieve_online_documents_v2(
    features=[
        "city_embeddings:vector",
        "city_embeddings:item_id",
        "city_embeddings:state",
        "city_embeddings:sentence_chunks",
        "city_embeddings:wiki_summary",
    ],
    query=query,
    top_k=3,
    distance_metric="COSINE",
).to_df()
display(context_data)
```


<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>vector</th>
      <th>item_id</th>
      <th>state</th>
      <th>sentence_chunks</th>
      <th>wiki_summary</th>
      <th>distance</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>[0.15548758208751678, -0.08017724752426147, -0...</td>
      <td>0</td>
      <td>New York, New York</td>
      <td>New York, often called New York City or simply...</td>
      <td>New York, often called New York City or simply...</td>
      <td>0.743023</td>
    </tr>
    <tr>
      <th>1</th>
      <td>[0.15548758208751678, -0.08017724752426147, -0...</td>
      <td>6</td>
      <td>New York, New York</td>
      <td>New York is the geographical and demographic c...</td>
      <td>New York, often called New York City or simply...</td>
      <td>0.739733</td>
    </tr>
    <tr>
      <th>2</th>
      <td>[0.15548758208751678, -0.08017724752426147, -0...</td>
      <td>7</td>
      <td>New York, New York</td>
      <td>With more than 20.1 million people in its metr...</td>
      <td>New York, often called New York City or simply...</td>
      <td>0.728218</td>
    </tr>
  </tbody>
</table>
</div>


### 3. Formatting Retrieved Documents for RAG Context

After retrieving relevant documents, we need to format the data into a structured context that can be efficiently used in downstream applications. This step ensures that the extracted information is clean, organized, and ready for integration into the RAG pipeline.


```python
def format_documents(context_df):
    output_context = ""
    unique_documents = context_df.drop_duplicates().apply(
        lambda x: "City & State = {"
        + x["state"]
        + "}\nSummary = {"
        + x["wiki_summary"].strip()
        + "}",
        axis=1,
    )
    for i, document_text in enumerate(unique_documents):
        output_context += f"****START DOCUMENT {i}****\n{document_text.strip()}\n****END DOCUMENT {i}****"
    return output_context


RAG_CONTEXT = format_documents(context_data[["state", "wiki_summary"]])
print(RAG_CONTEXT)
```

    ****START DOCUMENT 0****
    City & State = {New York, New York}
    Summary = {New York, often called New York City or simply NYC, is the most populous city in the United States, located at the southern tip of New York State on one of the world's largest natural harbors. The city comprises five boroughs, each of which is coextensive with a respective county. New York is a global center of finance and commerce, culture and technology, entertainment and media, academics and scientific output, and the arts and fashion, and, as home to the headquarters of the United Nations, is an important center for international diplomacy. New York City is the epicenter of the world's principal metropolitan economy.
    With an estimated population in 2022 of 8,335,897 distributed over 300.46 square miles (778.2 km2), the city is the most densely populated major city in the United States. New York has more than double the population of Los Angeles, the nation's second-most populous city. New York is the geographical and demographic center of both the Northeast megalopolis and the New York metropolitan area, the largest metropolitan area in the U.S. by both population and urban area. With more than 20.1 million people in its metropolitan statistical area and 23.5 million in its combined statistical area as of 2020, New York City is one of the world's most populous megacities. The city and its metropolitan area are the premier gateway for legal immigration to the United States. As many as 800 languages are spoken in New York, making it the most linguistically diverse city in the world. In 2021, the city was home to nearly 3.1 million residents born outside the U.S., the largest foreign-born population of any city in the world.
    New York City traces its origins to Fort Amsterdam and a trading post founded on the southern tip of Manhattan Island by Dutch colonists in approximately 1624. The settlement was named New Amsterdam (Dutch: Nieuw Amsterdam) in 1626 and was chartered as a city in 1653. The city came under English control in 1664 and was temporarily renamed New York after King Charles II granted the lands to his brother, the Duke of York. before being permanently renamed New York in November 1674. New York City was the capital of the United States from 1785 until 1790. The modern city was formed by the 1898 consolidation of its five boroughs: Manhattan, Brooklyn, Queens, The Bronx, and Staten Island, and has been the largest U.S. city ever since.
    Anchored by Wall Street in the Financial District of Lower Manhattan, New York City has been called both the world's premier financial and fintech center and the most economically powerful city in the world. As of 2022, the New York metropolitan area is the largest metropolitan economy in the world with a gross metropolitan product of over US$2.16 trillion. If the New York metropolitan area were its own country, it would have the tenth-largest economy in the world. The city is home to the world's two largest stock exchanges by market capitalization of their listed companies: the New York Stock Exchange and Nasdaq. New York City is an established safe haven for global investors. As of 2023, New York City is the most expensive city in the world for expatriates to live. New York City is home to the highest number of billionaires, individuals of ultra-high net worth (greater than US$30 million), and millionaires of any city in the world.}
    ****END DOCUMENT 0****


### 4. Generating Responses Using Retrieved Context

Now that we have formatted the retrieved documents, we can integrate them into a structured prompt for response generation. This step ensures that the assistant only relies on retrieved information and avoids hallucinating responses.


```python
FULL_PROMPT = f"""
You are an assistant for answering questions about states. You will be provided documentation from Wikipedia. Provide a conversational answer.
If you don't know the answer, just say "I do not know." Don't make up an answer.

Here are document(s) you should use when answer the users question:
{RAG_CONTEXT}
"""
```


```python
response = llm_client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": FULL_PROMPT},
        {"role": "user", "content": question},
    ],
)

print("\n".join([c.message.content for c in response.choices]))
```

    The city with the largest population in New York is New York City itself, often referred to as NYC. It is the most populous city in the United States, with an estimated population of about 8.3 million in 2022.

