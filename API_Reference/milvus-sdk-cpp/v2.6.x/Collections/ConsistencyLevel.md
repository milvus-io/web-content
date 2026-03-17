# ConsistencyLevel

This enum controls the data-visibility guarantee for search and query operations. You can set the consistency level per-request via `SearchRequest::WithConsistencyLevel()`, `QueryRequest::WithConsistencyLevel()`, or as the collection default via `CreateCollectionRequest::WithConsistencyLevel()`.

```cpp
enum class ConsistencyLevel {
    NONE      = -1,
    STRONG    = 0,
    SESSION   = 1,
    BOUNDED   = 2,
    EVENTUALLY = 3,
};
```

**VALUES:**

- **NONE** (-1)

    No consistency level is specified for this request. The collection-level default is used.

- **STRONG** (0)

    All reads reflect the latest committed write. This is the strictest guarantee but may have higher latency because the query node must wait for the latest data to be replicated.

- **SESSION** (1)

    Within a single client session, reads always see writes made earlier in that same session. Writes from other sessions may not be immediately visible.

- **BOUNDED** (2)

    Reads may lag behind the latest write by a configurable time window (default 5 seconds). This balances freshness with throughput and is suitable for most production workloads.

- **EVENTUALLY** (3)

    No freshness guarantee. The query node returns results from whatever data it has locally. Offers the lowest latency at the cost of potentially stale results.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
#include <milvus/MilvusClientV2.h>
#include <milvus/types/ConsistencyLevel.h>
using namespace milvus;

// Per-request: require strong consistency for a critical query
QueryRequest query;
query.WithCollectionName("my_collection")
     .WithFilter("id in [1, 2, 3]")
     .AddOutputField("vec")
     .WithConsistencyLevel(ConsistencyLevel::STRONG);

// Per-request: accept bounded staleness for a high-throughput search
SearchRequest search;
search.WithCollectionName("my_collection")
      .WithAnnsField("vec")
      .WithLimit(10)
      .WithConsistencyLevel(ConsistencyLevel::BOUNDED);

// Collection-level default: set when creating the collection
auto status = client->CreateCollection(
    CreateCollectionRequest()
        .WithCollectionName("my_collection")
        .WithCollectionSchema(schema)
        .WithConsistencyLevel(ConsistencyLevel::BOUNDED));
```
