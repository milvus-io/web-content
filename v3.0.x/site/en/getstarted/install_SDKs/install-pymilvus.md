---
id: install-pymilvus.md
label: Install PyMilvus
related_key: SDK
summary: Learn how to install the Python SDK of Milvus.
title: Install Milvus Python SDK
---

# Install Milvus Python SDK

This page describes how to install PyMilvus, the Python SDK for Milvus, and choose optional dependencies for local databases or embedding models.

## Requirements

- PyMilvus 3.0.2 requires Python 3.9 or later for connecting to a remote Milvus server.
- The local Milvus Lite 3.2.2 examples require Python 3.10 or later and a supported platform. See [Run Milvus Lite Locally](milvus_lite.md).
- Install dependencies through `pip`. PyMilvus 3.0.2 requires `protobuf>=5.27.2`; do not separately pin `protobuf==3.20.0`. You do not need `grpcio-tools` to use the SDK.

## Install PyMilvus via pip

PyMilvus is available in [Python Package Index](https://pypi.org/project/pymilvus/).

<div class="alert note">
It is recommended to install a PyMilvus version that matches the version of the Milvus server you installed. For more information, see <a href="release_notes.md">Release Notes</a>.
</div>

```bash
python3 -m pip install "pymilvus==3.0.2"
```

This installs the client for a remote Milvus server. It does not install Milvus Lite or an embedding model.

For the local database used in [Quickstart](quickstart.md), install the `milvus-lite` extra and the matching Lite package:

```bash
python3 -m pip install "pymilvus[milvus-lite]==3.0.2" "milvus-lite==3.2.2"
```

For embedding helpers, install the separate `model` extra:

```bash
python3 -m pip install "pymilvus[model]==3.0.2"
```

On Windows, pip skips the `milvus-lite` extra of PyMilvus 3.0.2 because of its platform marker. The command above names `milvus-lite` explicitly, so it installs on Windows as long as wheels for `faiss-cpu` and `pyarrow` exist for your Python version.

## Verify installation

If PyMilvus is correctly installed, no exception will be raised when you run the following command.

```bash
python3 -c "from pymilvus import MilvusClient"
```

This checks the SDK import, not a server connection. Follow [Quickstart](quickstart.md) to create a local collection, insert data, and run a search.



## What's next

Having installed PyMilvus, you can:

- Learn the basic operations of Milvus:
  - [Manage Collections](manage-collections.md)
  - [Manage Partitions](manage-partitions.md)
  - [Insert, Upsert & Delete](insert-update-delete.md)
  - [Single-Vector Search](single-vector-search.md)
  - [Hybrid Search](multi-vector-search.md)

- Explore [PyMilvus API reference](/api-reference/pymilvus/v3.0.x/About.md)

