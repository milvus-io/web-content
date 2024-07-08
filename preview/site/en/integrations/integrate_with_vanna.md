---
id: integrate_with_vanna.md
summary: This guide demonstrates how to use Vanna to generate and execute SQL queries based on your data stored in a database.
title: Write SQL with Vanna and Milvus
---

# Write SQL with Vanna and Milvus

[Vanna](https://vanna.ai/) is an open-source Python RAG (Retrieval-Augmented Generation) framework for SQL generation and related functionality. [Milvus](https://milvus.io/) is the world's most advanced open-source vector database, built to power embedding similarity search and AI applications.

Vanna works in two easy steps - train a RAG "model" on your data, and then ask questions which will return SQL queries that can be set up to run on your database. This guide demonstrates how to use Vanna to generate and execute SQL queries based on your data stored in a database.



## Prerequisites

Before running this notebook, make sure you have the following dependencies installed:


```python
$ pip install "vanna[milvus,openai]"
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (Click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

And you need set the `OPENAI_API_KEY` in your environment variables. You can get the API key from [OpenAI](https://platform.openai.com/docs/guides/production-best-practices/api-keys).


```python
import os

os.environ["OPENAI_API_KEY"] = "sk-***********"
```

## Data preparation

First, we need to inherit from the `Milvus_VectorStore` and `OpenAI_Chat` classes from Vanna and define a new class `VannaMilvus` that combines capabilities from both.


```python
from pymilvus import MilvusClient, model
from vanna.milvus import Milvus_VectorStore
from vanna.openai import OpenAI_Chat


class VannaMilvus(Milvus_VectorStore, OpenAI_Chat):
    def __init__(self, config=None):
        Milvus_VectorStore.__init__(self, config=config)
        OpenAI_Chat.__init__(self, config=config)
```

We initialize the `VannaMilvus` class with the necessary configuration parameters. We use a `milvus_client` instance to store embeddings and the `model.DefaultEmbeddingFunction()` initialized from [milvus_model](https://milvus.io/docs/embeddings.md) to generate embeddings.C

<div class="alert note">

As for the argument of `MilvusClient`:
- Setting the `uri` as a local file, e.g.`./milvus.db`, is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.
- If you have large scale of data, you can set up a more performant Milvus server on [docker or kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server uri, e.g.`http://localhost:19530`, as your `uri`.
- If you want to use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `uri` and `token`, which correspond to the [Public Endpoint and Api key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) in Zilliz Cloud.

</div>


```python
milvus_uri = "./milvus_vanna.db"

milvus_client = MilvusClient(uri=milvus_uri)

vn_milvus = VannaMilvus(
    config={
        "api_key": os.getenv("OPENAI_API_KEY"),
        "model": "gpt-3.5-turbo",
        "milvus_client": milvus_client,
        "embedding_function": model.DefaultEmbeddingFunction(),
        "n_results": 2,  # The number of results to return from Milvus semantic search.
    }
)
```

This is a simple example with only a few sample of data, so we set `n_results` to 2 to make sure we search for the top 2 most similar results.
In practice, you should set `n_results` to a higher value when dealing with larger training dataset.

We will use a sample SQLite database with few tables containing some sample data.


```python
import sqlite3

sqlite_path = "./my-database.sqlite"
sql_connect = sqlite3.connect(sqlite_path)
c = sql_connect.cursor()

init_sqls = """
CREATE TABLE IF NOT EXISTS Customer (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Company TEXT NOT NULL,
    City TEXT NOT NULL,
    Phone TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Company (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Industry TEXT NOT NULL,
    Location TEXT NOT NULL,
    EmployeeCount INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS User (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Username TEXT NOT NULL UNIQUE,
    Email TEXT NOT NULL UNIQUE
);

INSERT INTO Customer (Name, Company, City, Phone) 
VALUES ('John Doe', 'ABC Corp', 'New York', '123-456-7890');

INSERT INTO Customer (Name, Company, City, Phone) 
VALUES ('Jane Smith', 'XYZ Inc', 'Los Angeles', '098-765-4321');

INSERT INTO Company (Name, Industry, Location, EmployeeCount)
VALUES ('ABC Corp', 'cutting-edge technology', 'New York', 100);

INSERT INTO User (Username, Email)
VALUES ('johndoe123', 'johndoe123@example.com');
"""

for sql in init_sqls.split(";"):
    c.execute(sql)

sql_connect.commit()

# Connect to the SQLite database
vn_milvus.connect_to_sqlite(sqlite_path)
```

## Train with data
We can train the model on the DDL data of the SQLite database. We get the DDL data and feed it to the `train` function.


```python
# If there exists training data, we should remove it before training.
existing_training_data = vn_milvus.get_training_data()
if len(existing_training_data) > 0:
    for _, training_data in existing_training_data.iterrows():
        vn_milvus.remove_training_data(training_data["id"])

# Get the DDL of the SQLite database
df_ddl = vn_milvus.run_sql("SELECT type, sql FROM sqlite_master WHERE sql is not null")

# Train the model on the DDL data
for ddl in df_ddl["sql"].to_list():
    vn_milvus.train(ddl=ddl)
```

    Adding ddl: CREATE TABLE Customer (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL,
        Company TEXT NOT NULL,
        City TEXT NOT NULL,
        Phone TEXT NOT NULL
    )
    Adding ddl: CREATE TABLE sqlite_sequence(name,seq)
    Adding ddl: CREATE TABLE Company (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL,
        Industry TEXT NOT NULL,
        Location TEXT NOT NULL,
        EmployeeCount INTEGER NOT NULL
    )
    Adding ddl: CREATE TABLE User (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Username TEXT NOT NULL UNIQUE,
        Email TEXT NOT NULL UNIQUE
    )


Besides training on the DDL data, we can also train on the documentation and SQL queries of the database.


```python
# Add documentation about your business terminology or definitions.
vn_milvus.train(
    documentation="ABC Corp specializes in cutting-edge technology solutions and innovation."
)
vn_milvus.train(
    documentation="XYZ Inc is a global leader in manufacturing and supply chain management."
)

# You can also add SQL queries to your training data.
vn_milvus.train(sql="SELECT * FROM Customer WHERE Name = 'John Doe'")
```

    Adding documentation....
    Adding documentation....
    Using model gpt-3.5-turbo for 65.0 tokens (approx)
    Question generated with sql: What are the details of the customer named John Doe? 
    Adding SQL...





    '595b185c-e6ad-47b0-98fd-0e93ef9b6a0a-sql'



Let's take a look at the training data.


```python
training_data = vn_milvus.get_training_data()
training_data
```




<div>
<table>
  <thead>
    <tr>
      <th>#</th>
      <th>id</th>
      <th>question</th>
      <th>content</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>595b185c-e6ad-47b0-98fd-0e93ef9b6a0a-sql</td>
      <td>What are the details of the customer named Joh...</td>
      <td>SELECT * FROM Customer WHERE Name = 'John Doe'</td>
    </tr>
    <tr>
      <th>0</th>
      <td>25f4956c-e370-4097-994f-996f22d145fa-ddl</td>
      <td>None</td>
      <td>CREATE TABLE Company (\n    ID INTEGER PRIMARY...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>b95ecc66-f65b-49dc-a9f1-c1842ad230ff-ddl</td>
      <td>None</td>
      <td>CREATE TABLE Customer (\n    ID INTEGER PRIMAR...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>fcc73d15-30a5-4421-9d73-b8c3b0ed5305-ddl</td>
      <td>None</td>
      <td>CREATE TABLE sqlite_sequence(name,seq)</td>
    </tr>
    <tr>
      <th>3</th>
      <td>feae618c-5910-4f6f-8b4b-6cc3e03aec06-ddl</td>
      <td>None</td>
      <td>CREATE TABLE User (\n    ID INTEGER PRIMARY KE...</td>
    </tr>
    <tr>
      <th>0</th>
      <td>79a48db1-ba1f-4fd5-be99-74f2ca2eaeeb-doc</td>
      <td>None</td>
      <td>XYZ Inc is a global leader in manufacturing an...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>9f9df1b8-ae62-4823-ad28-d7e0f2d1f4c0-doc</td>
      <td>None</td>
      <td>ABC Corp specializes in cutting-edge technolog...</td>
    </tr>
  </tbody>
</table>
</div>



## Generate SQLs and execute them
As we have trained with the DDL data, the table structure is now available for generating SQL queries.

Let's try a simple question.


```python
sql = vn_milvus.generate_sql("what is the phone number of John Doe?")
vn_milvus.run_sql(sql)
```

    SQL Prompt: [{'role': 'system', 'content': "You are a SQLite expert. Please help to generate a SQL query to answer the question. Your response should ONLY be based on the given context and follow the response guidelines and format instructions. \n===Tables \nCREATE TABLE Customer (\n    ID INTEGER PRIMARY KEY AUTOINCREMENT,\n    Name TEXT NOT NULL,\n    Company TEXT NOT NULL,\n    City TEXT NOT NULL,\n    Phone TEXT NOT NULL\n)\n\nCREATE TABLE User (\n    ID INTEGER PRIMARY KEY AUTOINCREMENT,\n    Username TEXT NOT NULL UNIQUE,\n    Email TEXT NOT NULL UNIQUE\n)\n\n\n===Additional Context \n\nABC Corp specializes in cutting-edge technology solutions and innovation.\n\nXYZ Inc is a global leader in manufacturing and supply chain management.\n\n===Response Guidelines \n1. If the provided context is sufficient, please generate a valid SQL query without any explanations for the question. \n2. If the provided context is almost sufficient but requires knowledge of a specific string in a particular column, please generate an intermediate SQL query to find the distinct strings in that column. Prepend the query with a comment saying intermediate_sql \n3. If the provided context is insufficient, please explain why it can't be generated. \n4. Please use the most relevant table(s). \n5. If the question has been asked and answered before, please repeat the answer exactly as it was given before. \n"}, {'role': 'user', 'content': 'What are the details of the customer named John Doe?'}, {'role': 'assistant', 'content': "SELECT * FROM Customer WHERE Name = 'John Doe'"}, {'role': 'user', 'content': 'what is the phone number of John Doe?'}]
    Using model gpt-3.5-turbo for 367.25 tokens (approx)
    LLM Response: SELECT Phone FROM Customer WHERE Name = 'John Doe'





<div>
<table>
  <thead>
    <tr>
      <th>#</th>
      <th>Phone</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>123-456-7890</td>
    </tr>
  </tbody>
</table>
</div>



Here is a more complex question. The manufacturing corporation name information is in the document data, which is background information. The generated SQL query will retrieve the customer information based on the specific manufacturing corporation name.


```python
sql = vn_milvus.generate_sql("which customer works for a manufacturing corporation?")
vn_milvus.run_sql(sql)
```

    SQL Prompt: [{'role': 'system', 'content': "You are a SQLite expert. Please help to generate a SQL query to answer the question. Your response should ONLY be based on the given context and follow the response guidelines and format instructions. \n===Tables \nCREATE TABLE Company (\n    ID INTEGER PRIMARY KEY AUTOINCREMENT,\n    Name TEXT NOT NULL,\n    Industry TEXT NOT NULL,\n    Location TEXT NOT NULL,\n    EmployeeCount INTEGER NOT NULL\n)\n\nCREATE TABLE Customer (\n    ID INTEGER PRIMARY KEY AUTOINCREMENT,\n    Name TEXT NOT NULL,\n    Company TEXT NOT NULL,\n    City TEXT NOT NULL,\n    Phone TEXT NOT NULL\n)\n\n\n===Additional Context \n\nXYZ Inc is a global leader in manufacturing and supply chain management.\n\nABC Corp specializes in cutting-edge technology solutions and innovation.\n\n===Response Guidelines \n1. If the provided context is sufficient, please generate a valid SQL query without any explanations for the question. \n2. If the provided context is almost sufficient but requires knowledge of a specific string in a particular column, please generate an intermediate SQL query to find the distinct strings in that column. Prepend the query with a comment saying intermediate_sql \n3. If the provided context is insufficient, please explain why it can't be generated. \n4. Please use the most relevant table(s). \n5. If the question has been asked and answered before, please repeat the answer exactly as it was given before. \n"}, {'role': 'user', 'content': 'What are the details of the customer named John Doe?'}, {'role': 'assistant', 'content': "SELECT * FROM Customer WHERE Name = 'John Doe'"}, {'role': 'user', 'content': 'which customer works for a manufacturing corporation?'}]
    Using model gpt-3.5-turbo for 384.25 tokens (approx)
    LLM Response: SELECT * 
    FROM Customer 
    WHERE Company = 'XYZ Inc'





<div>
<table>
  <thead>
    <tr>
      <th>#</th>
      <th>ID</th>
      <th>Name</th>
      <th>Company</th>
      <th>City</th>
      <th>Phone</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2</td>
      <td>Jane Smith</td>
      <td>XYZ Inc</td>
      <td>Los Angeles</td>
      <td>098-765-4321</td>
    </tr>
  </tbody>
</table>
</div>



Disconnect from the SQLite and Milvus and remove them to free up resources.


```python
sql_connect.close()
milvus_client.close()

os.remove(sqlite_path)
if os.path.exists(milvus_uri):
    os.remove(milvus_uri)
```
