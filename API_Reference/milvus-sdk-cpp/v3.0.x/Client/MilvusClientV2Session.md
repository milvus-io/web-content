# MilvusClientV2Session

A cluster-scoped view of MilvusClientV2 exposing DQL interfaces only, bound to a specific on-demand cluster.

<div class="alert note">

This type applies to Zilliz Cloud only.

</div>

```cpp
using MilvusClientV2SessionPtr = std::shared_ptr<MilvusClientV2Session>;
```

**METHODS:**

- `ClusterID()`

    Gets the target cluster identifier.

- `Search(const SearchRequest& request, SearchResponse& response)`

    Performs a vector similarity search on the target cluster.

- `SearchIterator(const SearchIteratorRequest& request, SearchIteratorPtr& iterator)`

    Creates a search iterator to fetch results in batches from the target cluster.

- `HybridSearch(const HybridSearchRequest& request, HybridSearchResponse& response)`

    Performs a hybrid (multi-vector, reranked) search on the target cluster.

- `Query(const QueryRequest& request, QueryResponse& response)`

    Queries entities on the target cluster with an expression filter.

- `Get(const GetRequest& request, GetResponse& response)`

    Queries entities by primary key on the target cluster.

- `QueryIterator(const QueryIteratorRequest& request, QueryIteratorPtr& iterator)`

    Creates a query iterator to fetch query results in batches from the target cluster.

- `Close()`

    Closes this session view without disconnecting the parent client.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    return;
}

milvus::MilvusClientV2SessionPtr session;
status = client->Session("cluster-a", session);
if (!status.IsOk()) {
    return;
}

milvus::SearchRequest request;
request.WithCollectionName("demo").WithLimit(3);
request.AddFloatVector(std::vector<float>{0.1f, 0.2f, 0.3f, 0.4f});
milvus::SearchResponse response;
session->Search(request, response);
```
