---
id: ETL_using_vectorETL.md
summary: In this tutorial, we'll explore how to efficiently load data into Milvus using [VectorETL](https://github.com/ContextData/VectorETL), a lightweight ETL framework designed for vector databases. VectorETL simplifies the process of extracting data from various sources, transforming it into vector embeddings using AI models, and storing it in Milvus for fast and scalable retrieval. By the end of this tutorial, you'll have a working ETL pipeline that allows you to integrate and manage vector search systems with ease. Let’s dive in!
title: Efficient Data Loading into Milvus with VectorETL
---

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/ETL_using_vectorETL.ipynb" target="_parent">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/ETL_using_vectorETL.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>

# Efficient Data Loading into Milvus with VectorETL

In this tutorial, we'll explore how to efficiently load data into Milvus using [VectorETL](https://github.com/ContextData/VectorETL), a lightweight ETL framework designed for vector databases. VectorETL simplifies the process of extracting data from various sources, transforming it into vector embeddings using AI models, and storing it in Milvus for fast and scalable retrieval. By the end of this tutorial, you'll have a working ETL pipeline that allows you to integrate and manage vector search systems with ease. Let’s dive in!

## Preparation

### Dependency and Environment


```shell
$ pip install --upgrade vector-etl pymilvus
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

VectorETL supports multiple data sources, including Amazon S3, Google Cloud Storage, Local File, etc. You can check out the full list of supported sources [here](https://github.com/ContextData/VectorETL?tab=readme-ov-file#source-configuration). In this tutorial, we’ll focus on Amazon S3 as a data source example.  

We will load documents from Amazon S3. Therefore, you need to prepare `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as environment variables to securely access your S3 bucket. Additionally, we will use OpenAI's `text-embedding-ada-002` embedding model to generate embeddings for the data. You should also prepare the [api key](https://platform.openai.com/docs/quickstart) `OPENAI_API_KEY` as an environment variable.



```python
import os

os.environ["OPENAI_API_KEY"] = "your-openai-api-key"
os.environ["AWS_ACCESS_KEY_ID"] = "your-aws-access-key-id"
os.environ["AWS_SECRET_ACCESS_KEY"] = "your-aws-secret-access-key"
```

## Workflow

### Defining the Data Source (Amazon S3)

In this case, we are extracting documents from an Amazon S3 bucket. VectorETL allows us to specify the bucket name, the path to the files, and the type of data we are working with. 


```python
source = {
    "source_data_type": "Amazon S3",
    "bucket_name": "my-bucket",
    "key": "path/to/files/",
    "file_type": ".csv",
    "aws_access_key_id": os.environ["AWS_ACCESS_KEY_ID"],
    "aws_secret_access_key": os.environ["AWS_SECRET_ACCESS_KEY"],
}
```

### Configuring the Embedding Model (OpenAI)

Once we have our data source set up, we need to define the embedding model that will transform our textual data into vector embeddings. Here, we use OpenAI’s `text-embedding-ada-002` in this example.


```python
embedding = {
    "embedding_model": "OpenAI",
    "api_key": os.environ["OPENAI_API_KEY"],
    "model_name": "text-embedding-ada-002",
}
```

### Setting Up Milvus as the Target Database

We need to store the generated embeddings in Milvus. Here, we define our Milvus connection parameters using Milvus Lite. 


```python
target = {
    "target_database": "Milvus",
    "host": "./milvus.db",  # os.environ["ZILLIZ_CLOUD_PUBLIC_ENDPOINT"] if using Zilliz Cloud
    "api_key": "",  # os.environ["ZILLIZ_CLOUD_TOKEN"] if using Zilliz Cloud
    "collection_name": "my_collection",
    "vector_dim": 1536,  # 1536 for text-embedding-ada-002
}
```

<div class="alert note">

For the `host` and `api_key`:

- Setting the `host` as a local file, e.g.`./milvus.db`, and leave `api_key` empty is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.

- If you have large scale of data, you can set up a more performant Milvus server on [docker or kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server uri, e.g.`http://localhost:19530`, as your `host` and leave `api_key` empty.

- If you want to use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `host` and `api_key`, which correspond to the [Public Endpoint and Api key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) in Zilliz Cloud.

</div>

### Specifying Columns for Embedding

Now, we need to specify which columns from our CSV files should be converted into embeddings. This ensures that only the relevant text fields are processed, optimizing both efficiency and storage.


```python
embed_columns = ["col_1", "col_2", "col_3"]
```

### Creating and Executing the VectorETL Pipeline

With all configurations in place, we now initialize the ETL pipeline, set up the data flow, and execute it.


```python
from vector_etl import create_flow

flow = create_flow()
flow.set_source(source)
flow.set_embedding(embedding)
flow.set_target(target)
flow.set_embed_columns(embed_columns)

# Execute the flow
flow.execute()
```

By following this tutorial, we have successfully built an end-to-end ETL pipeline to move documents from Amazon S3 to Milvus using VectorETL. VectorETL is flexible in data sources, so you can choose whatever data sources you like based on your specific application needs. With VectorETL’s modular design, you can easily extend this pipeline to support other data sources, embedding models, making it a powerful tool for AI and data engineering workflows! 
