---
id: install-pymilvus.md
label: Install PyMilvus
related_key: SDK
order: 0
group: sdk
summary: Learn how to install the Python SDK of Milvus.
---

# Install Milvus SDK

This topic describes how to install Milvus SDK for Milvus.

Current version of Milvus supports SDKs in Python and Node.js.

<div class="tab-wrapper"><a href="install-pymilvus.md" class='active '>Install PyMilvus</a><a href="install-node.md" class=''>Install Node.js SDK</a></div>

## Requirement

Python 3 (3.6 or later) is required.

## Install PyMilvus via pip

PyMilvus is available in [Python Package Index](https://pypi.org/project/pymilvus/).

<div class="alert note">
It is recommended to install a PyMilvus version that matches the version of the Milvus server you installed. For example, install PyMilvus v2.0.0rc7 for Milvus 2.0.0-RC7.
</div>

```
$ python3 -m pip install pymilvus==2.0.0rc8
```

## Verify Installation

If PyMilvus is correctly installed, no exception will be raised when you run the following command.

```
$ python -c "from pymilvus import Collection"
```



## What's next

Having installed PyMilvus, You can:

- Learn the basic operations of Milvus:
  - [Connect to Milvus server](connect.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)

- Explore [PyMilvus API reference](/api-reference/pymilvus/v2.0.0rc8/tutorial.html)

