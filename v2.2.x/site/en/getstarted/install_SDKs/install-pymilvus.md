---
id: install-pymilvus.md
label: Install PyMilvus
related_key: SDK
summary: Learn how to install the Python SDK of Milvus.
---

# Install Milvus Python SDK

This topic describes how to install Milvus python SDK pymilvus for Milvus.

Current version of Milvus supports SDKs in Python, Node.js, GO, and Java.

## Requirements

- Python 3.7 or later is required.
- Google protobuf is installed. You can install it with the command `pip3 install protobuf==3.20.0`.
- grpcio-tools is installed. You can install it with the command `pip3 install grpcio-tools`.

## Install PyMilvus via pip

PyMilvus is available in [Python Package Index](https://pypi.org/project/pymilvus/).

<div class="alert note">
It is recommended to install a PyMilvus version that matches the version of the Milvus server you installed. For more information, see <a href="release_notes.md">Release Notes</a>.
</div>

```
$ python3 -m pip install pymilvus==2.2.7
```

## Verify installation

If PyMilvus is correctly installed, no exception will be raised when you run the following command.

```
$ python3 -c "from pymilvus import Collection"
```



## What's next

Having installed PyMilvus, you can:

- Learn the basic operations of Milvus:
  - [Connect to Milvus server](manage_connection.md)
  - [Create a collection](create_collection.md)
  - [Create a partition](create_partition.md)
  - [Insert data](insert_data.md)
  - [Conduct a vector search](search.md)

- Explore [PyMilvus API reference](/api-reference/pymilvus/v2.2.7/About.md)

