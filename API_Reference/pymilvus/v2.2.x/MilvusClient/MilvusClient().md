# MilvusClient()

This is the constructor method to create a Milvus client with the specified name.

## Invocation

```python
MilvusClient(
    collection_name: str = "ClientCollection",
    pk_field: str = None,
    vector_field: str = None,
    uri: str = "http://localhost:19530",
    num_shards: int = None,
    partitions: List[str] = None,
    consistency_level: str = "Session",
    replica_number: int = 1,
    index_params: dict = None,
    distance_metric: str = "L2",
    timeout: int = None,
    overwrite: bool = False,
)
```

## Parameters

| Parameter           | Description                                                                                                                                                                                                                                 | Type       | Required |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|----------|
| `collection_name`   | Name of the collection to operate. <br/> If specified, you do not need to reference the collection name in client operations.                                                                                                               | String     | False    |
| `pk_field`          | Name of the primary key.<br/> if not specified, a primary key named `id` is to be created with `auto-id` enabled.<br/>If specified for an existing collection and `overwrite` is set to `True`, the vector field of the collection is to be overwritten.                                                                                                                           | String     | False    |
| `vector_field`      | Name of the vector field.<br/> If not specified, a vector field named `vector` is to be created.<br/>If specified for an existing collection and `overwrite` is set to `True`, the vector field of the collection is to be overwritten.     | String     | False    |
| `uri`               | URI of the endpoint to connect to your Milvus. The default value is `http://localhost:19530`.                                                                                                                                               | String     | False    |
| `num_shards`        | Number of shards to use in the collection.<br/>Keep the default value unless you are dealing with large-scale data.<br/>The value defauls to `None`. If not specified, Milvus configuration applies.                                        | Integer    | False    |
| `partitions`        | Number of partitions to be use in the collection.<br/>The value defauls to `None`. If not specified, Milvus configuration applies.                                                                                                          | Integer    | False    |
| `consistency_level` | Consistency level to use in the collection<br/>Available options are `Strong`, `Bounded`, `Eventually`, and `Session`, and defaults to `Bounded`.                                                                                           | String     | False    |
| `replica_number`    | Number of in-memory replicas to use<br/>The value defaults to 1.                                                                                                                                                                            | Integer    | False    |
| `index_params`      | Index parameters to use in the collection.<br/>If not specified, a default set of index parameters applies.<br/>If specified for an existing collection and `overwrite` is set to `True`, the index of the collection is to be overwritten. The metric type specified also applies to `distance_metric` by default for vector searches. | Dictionary | False    |
| `distance_metric`   | Distance metric to use in the collection.<br/>Possible options are `L2` and `IP`.                                                                                                                                                           | String     | False    |
| `timeout` | Timeout duration of this operation.<br/>The value defaults to None.  | Integer | False
| `overwrite` | Boolean value indicates whether to allow the client to overwrite parameters for an existing collection.<br/>The value defaults to False. | Boolean | False |

## Returns

A MilvusClient.

## Properties

None

## Raises

None

## Examples

```python
from pymilvus import MilvusClient

# Connect to http://localhost:19530 with default settings
client = MilvusClient()

# Connect to a specific collection on http://localhost:19530
client = MilvusClient(collection_name="my_collection")

# Connect to a specific collection on http://localhost:19530 and overwrites collection settings
client = MilvusClient(collection_name="my_collection", pk_field="id", vector_field="vector", overwrite=True)

# Connect to http://localhost:19530 with a specific consistency level
client = MilvusClient(consistency_level="Session")

# Connect to http://localhost:19530 with a specific set of index parameters
index_params = {
    "index_type": "IVF_FLAT",
    "metric_type": "L2",
    "params": {"nlist": 1024}
}

client = MilvusClient(index_params=index_params)

# Connect to http://localhost:19530 with specific number of partitions and shards
client = MilvusClient(num_shards=3, partitions=5)

# Connect to Milvus at http://your-milvus-host:your-milvus-port
client = MilvusClient(uri="http://your-milvus-host:your-milvus-port")
```