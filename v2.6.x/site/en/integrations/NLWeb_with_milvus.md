---
id: NLWeb_with_milvus.md
summary: Learn how to integrate Microsoft NLWeb with Milvus to build powerful natural language interfaces for websites. This tutorial demonstrates how to leverage Milvus' vector database capabilities for efficient semantic search, embedding storage, and context retrieval in NLWeb applications.
title: Using NLWeb with Milvus
---

# Using NLWeb with Milvus

[Microsoft's NLWeb](https://github.com/microsoft/NLWeb) is a proposed framework that enables natural language interfaces for websites, using [Schema.org](https://schema.org/), formats like RSS and the emerging MCP protocol.

[Milvus](https://milvus.io/) is supported as a vector database backend within NLWeb for embedding storage and efficient vector similarity search, enabling powerful context retrieval for natural language processing applications.

> This documentation is primarily based on the official [quick start](https://github.com/microsoft/NLWeb/blob/main/HelloWorld.md) documentation. If you find any outdated or inconsistent content, please prioritize the official documentation and feel free to raise an issue for us.

## Usage

NLWeb can be configured to use Milvus as the retrieval engine. Below is a guide on how to set up and use NLWeb with Milvus.

### Installation

Clone the repo and set up your environment:

```bash
git clone https://github.com/microsoft/NLWeb
cd NLWeb
python -m venv .venv
source .venv/bin/activate  # or `.venv\Scripts\activate` on Windows
cd code
pip install -r requirements.txt
pip install pymilvus  # Add Milvus Python client
```

### Configuring Milvus

To use **Milvus**, update your configuration.


#### Update config files in `code/config`

Open the `config_retrieval.yaml` file and add the Milvus configuration:

```yaml
preferred_endpoint: milvus_local

endpoints:
  milvus_local:
    database_path: "../data/milvus.db"
    # Set the collection name to use
    index_name: nlweb_collection
    # Specify the database type
    db_type: milvus
```

### Loading Data

Once configured, load your content using RSS feeds.

From the `code` directory:

```bash
python -m tools.db_load https://feeds.libsyn.com/121695/rss Behind-the-Tech
```

This will ingest the content into your Milvus collection, storing both the text data and vector embeddings.

### Running the Server

To start NLWeb, from the `code` directory, run:

```bash
python app-file.py
```

You can now query your content via natural language using either the web UI at http://localhost:8000/ or directly through the MCP-compatible REST API.

## Further Reading

* [Milvus Documentation](https://milvus.io/docs)
* [NLWeb Source](https://github.com/microsoft/NLWeb)
* Life of a Chat Query
* Modifying behavior by changing prompts
* Modifying control flow
* Modifying the user interface 