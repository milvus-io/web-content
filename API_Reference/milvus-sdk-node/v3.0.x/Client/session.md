# session()

This operation creates a lightweight DQL session bound to a target cluster ID. The session injects `cluster_id` into search/query/get requests.

```javascript
const session = milvusClient.session(clusterId: string)
```

## Request Syntax

```javascript
const session = milvusClient.session('cluster-a')
```

**PARAMETERS:**

- **clusterId** (*string*) -

    **[REQUIRED]**

    Target cluster ID used for routing DQL requests.

**RETURNS:**

*MilvusClientSession*

A session object providing `search`, `hybridSearch`, `searchIterator`, `query`, `queryIterator`, `get`, and `close`.

**EXCEPTIONS:**

- **Error**

    Raised when `clusterId` is empty or not a string.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const session = client.session('cluster-a');
const hits = await session.search({
    collection_name: 'products',
    data: [[0.12, 0.35, 0.77]],
    limit: 5,
});
```
