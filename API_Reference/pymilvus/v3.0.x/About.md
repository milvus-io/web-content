# About PyMilvus

PyMilvus is the Python SDK of Milvus. Its source code is open-sourced and hosted on [GitHub](https://github.com/milvus-io/pymilvus).

<div class="alert note">

In this release, you have the flexibility to choose MilvusClient or the original ORM module to talk with Milvus.

</div>

## Installation

Run the following command to install PyMilvus v3.0.2 or update an existing installation to this version:

```shell
pip install --upgrade pymilvus==v3.0.2
```

After the installation, you can check the PyMilvus version by running the following:

```python
from pymilvus import __version__

print(__version__)

# v3.0.2
```

To install the Model library for embedding operations, run the following command:

```shell
pip install pymilvus[model]
```

For details, refer to the Model library documents and examples.

## Quick Start

The following example connects to Milvus, creates a collection, inserts an entity, and runs a vector search.

```python
from pymilvus import MilvusClient, DataType, FieldSchema, CollectionSchema

# 1. Connect to Milvus
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

# 2. Create a collection with two fields: an Int64 primary key and a FloatVector
schema = CollectionSchema(
    fields=[
        FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
        FieldSchema(name="vector", dtype=DataType.FLOAT_VECTOR, dim=3),
    ],
)
client.create_collection(
    collection_name="hello_milvus",
    schema=schema,
)

# 3. Insert one row
client.insert(
    collection_name="hello_milvus",
    data=[{"id": 1, "vector": [1.0, 2.0, 3.0]}],
)

# 4. Create an index on the vector field
index_params = client.prepare_index_params()
index_params.add_index(
    field_name="vector",
    index_type="AUTOINDEX",
    metric_type="COSINE",
)
client.create_index(
    collection_name="hello_milvus",
    index_params=index_params,
)

# 5. Load the collection
client.load_collection(collection_name="hello_milvus")

# 6. Search with a consistency level of Strong
results = client.search(
    collection_name="hello_milvus",
    data=[[1.0, 2.0, 3.0]],
    limit=1,
    consistency_level="Strong",
)
print(results)

# 7. Drop the collection
client.drop_collection(collection_name="hello_milvus")

# 8. Disconnect the client
client.close()
```

## Compatibility

Milvus proto is backward compatible, so a later SDK version can work with an earlier Milvus server. The table lists the recommended PyMilvus version validated for each Milvus version.

| Milvus version | Recommended PyMilvus version |
| -------------- | ---------------------------- |
| 1.0.x	         | 1.0.1                        |
| 1.1.x	         | 1.1.2                        |
| 2.0.x	         | 2.0.2                        |
| 2.1.x	         | 2.1.3                        |
| 2.2.x          | 2.2.3                        |
| 2.3.x          | 2.3.7                        | 
| 2.4.x          | 2.4.15                       |
| 2.5.x          | 2.5.16                       |
| 2.6.x          | 2.6.17                       |
| 3.0.x          | 3.0.2                        |

## Feedback & Issues

If you are having trouble or have questions about PyMilvus, ask your question on our PyMilvus Community Forum. Once you get an answer, it'd be great if you could work it back into this documentation and contribute!

## Contributing

We are committed to building a collaborative, exuberant open-source community for PyMilvus. Therefore, contributions to PyMilvus are welcome from everyone. Refer to [Contributing Guideline](https://github.com/milvus-io/pymilvus/blob/master/CONTRIBUTING.md) before making contributions to this project. You can [file an issue](https://github.com/milvus-io/pymilvus/issues/new/choose) or contact us on [Slack](https://github.com/milvus-io/pymilvus#readme) if you need any assistance or want to propose your ideas about PyMilvus.

## License

[Apache License 2.0](LICENSE)
