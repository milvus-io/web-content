# session()

This operation creates a lightweight DQL session bound to a specific on-demand cluster. All operations performed through the session automatically include the target `cluster_id`, ensuring requests are routed to the correct cluster in a multi-cluster deployment.

## Request Syntax

```python
MilvusClient.session(
    cluster_id: str
) -> MilvusClientSession
```

**PARAMETERS:**

- **cluster_id** (*str*) -

    **[REQUIRED]**

    The identifier of the target on-demand cluster. The value must be a non-empty string.

**RETURN TYPE:**

*MilvusClientSession*

A session object that proxies search, query, and get operations to the specified on-demand cluster.

**EXCEPTIONS:**

- **ParamError**

    Raised when `cluster_id` is not a string or is empty.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="https://{proj-xxxxxxxx}.{region}.api.zillizcloud.com",
    token="YOUR_API_KEY"
)

# Create a session pinned to cluster-1
session = client.session(
    cluster_id="my_on_demand"
)

# All operations through this session automatically target my_on_demand
results = session.search(
    collection_name="my_collection",
    data=[[0.1, 0.2, 0.3, 0.4]],
    limit=5
)

# Session supports search, hybrid_search, query, query_iterator,
# search_iterator, and get
entities = session.get(
    collection_name="my_collection",
    ids=[1, 2, 3]
)
```
