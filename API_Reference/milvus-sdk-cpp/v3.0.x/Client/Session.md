# Session()

Create a cluster-scoped session exposing DQL interfaces only.

```cpp
Status Session(const std::string& cluster_id, MilvusClientV2SessionPtr& session)
```

**PARAMETERS:**

- **cluster_id** (*const std::string&*)

    Target cluster identifier.

- **session** (*MilvusClientV2SessionPtr&*)

    Output parameter that receives the cluster-scoped client view.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

### MilvusClientV2Session

A cluster-scoped client view that exposes read-only (DQL) interfaces bound to a specific cluster.

**METHODS:**

- `const std::string& ClusterID() const`

    Returns the identifier of the target cluster.

- `Status Search(const SearchRequest& request, SearchResponse& response)`

    Runs a search against the target cluster. See [Search](../Vector/Search.md).

- `Status SearchIterator(const SearchIteratorRequest& request, SearchIteratorPtr& iterator)`

    Creates a search iterator for the target cluster. See [SearchIterator](../Vector/SearchIterator.md).

- `Status HybridSearch(const HybridSearchRequest& request, HybridSearchResponse& response)`

    Runs a hybrid search against the target cluster. See [HybridSearch](../Vector/HybridSearch.md).

- `Status Query(const QueryRequest& request, QueryResponse& response)`

    Runs a query against the target cluster. See [Query](../Vector/Query.md).

- `Status Get(const GetRequest& request, GetResponse& response)`

    Runs a get-by-primary-key query against the target cluster. See [Get](../Vector/Get.md).

- `Status QueryIterator(const QueryIteratorRequest& request, QueryIteratorPtr& iterator)`

    Creates a query iterator for the target cluster. See [QueryIterator](../Vector/QueryIterator.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::MilvusClientV2SessionPtr session;
status = client->Session(cluster_id, session);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: Client; action: CREATE; addedSince: v3.0.x -->
