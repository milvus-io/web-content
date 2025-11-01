# About PyMilvus

PyMilvus is a Python SDK of Milvus. Its source code is open-sourced and hosted on [GitHub](https://github.com/milvus-io/pymilvus).

<div class="alert note">

In this release, you have the flexibility to choose MilvusClient or the original ORM module to talk with Milvus.

</div>

## Compatibility

| Milvus version | Recommended PyMilvus version |
| -------------- | ---------------------------- |
| 1.0.x	         | 1.0.1                        |
| 1.1.x	         | 1.1.2                        |
| 2.0.x	         | 2.0.2                        |
| 2.1.x	         | 2.1.3                        |
| 2.2.x          | 2.2.3                        |
| 2.3.x          | 2.3.7                        | 
| 2.4.x          | 2.4.15                       |
| 2.5.x          | 2.5.16                        |
| 2.6.x          | 2.6.3                        |

## Install & Update

You can run the following command to install the latest PyMilvus or update your PyMilvus to this version.

```shell
pip install --upgrade pymilvus==v2.6.3
```

After the installation, you can check the PyMilvus version by running the following

```python
from pymilvus import __version__

print(__version__)

# v2.6.3
```

To install the Model library for embedding operations, run the following command:

```shell
pip install pymilvus[model]
```

For details, refer to the Model library documents and examples.

## Connect to Milvus

```python
from pymilvus import MilvusClient

# Authentication not enabled
client = MilvusClient("http://localhost:19530")

# Authentication enabled with the root user
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
    db_name="default"
)

# Authentication enabled with a non-root user
client = MilvusClient(
    uri="http://localhost:19530",
    token="user:password", # replace this with your token
    db_name="default"
)
```

## Examples

In addition to the documents, you can also refer to the example sets in our GitHub repo.

## Feedback & Issues

If you are having trouble or have questions about PyMilvus, ask your question on our PyMilvus Community Forum. Once you get an answer, it’d be great if you could work it back into this documentation and contribute!

## Contributing

We are committed to building a collaborative, exuberant open-source community for PyMilvus. Therefore, contributions to PyMilvus are welcome from everyone. Refer to [Contributing Guideline](https://github.com/milvus-io/pymilvus/blob/master/CONTRIBUTING.md) before making contributions to this project. You can [file an issue](https://github.com/milvus-io/pymilvus/issues/new/choose) or contact us on [Slack](https://github.com/milvus-io/pymilvus#readme) if you need any assistance or want to propose your ideas about PyMilvus.
