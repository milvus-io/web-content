# Iterator

This page documents both `SearchIterator` and `QueryIterator`. Both are type aliases of the `Iterator<T>` template base class, where `T` is `SingleResult` for search and `QueryResults` for query. Use these iterators when you need to retrieve more results than the `limit` of a single request allows.

## Iterator

Abstract base class. Not instantiated directly; use the concrete aliases below.

```cpp
template <typename T>
class Iterator {
 public:
    virtual Status Next(T& results) = 0;
};
```

- `virtual Status Next(T& results) = 0`

    Fetches the next batch of results into `results`. Returns a `Status` with `IsOk() == false` when there are no more results (the iterator is exhausted). Not thread-safe.

## SearchIterator

Iterates over `SingleResult` batches from a `SearchIterator()` call. Each call to `Next()` fills a `SingleResult` with the next batch of hits.

```cpp
using SearchIterator    = Iterator<SingleResult>;
using SearchIteratorPtr = std::shared_ptr<SearchIterator>;
```

Obtained via `MilvusClientV2::SearchIterator(IteratorArguments, SearchIteratorPtr&)`.

## QueryIterator

Iterates over `QueryResults` batches from a `QueryIterator()` call. Each call to `Next()` fills a `QueryResults` with the next batch of rows.

```cpp
using QueryIterator    = Iterator<QueryResults>;
using QueryIteratorPtr = std::shared_ptr<QueryIterator>;
```

Obtained via `MilvusClientV2::QueryIterator(IteratorArguments, QueryIteratorPtr&)`.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

// Query iterator — page through all rows
QueryIteratorPtr query_iter;
auto status = client->QueryIterator(
    IteratorArguments()
        .WithCollectionName("my_collection")
        .WithFilter("id >= 0")
        .AddOutputField("id")
        .WithBatchSize(100),
    query_iter);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

int64_t total = 0;
while (true) {
    QueryResults batch;
    status = query_iter->Next(batch);
    if (!status.IsOk()) break;   // exhausted or error
    total += static_cast<int64_t>(batch.GetRowCount());
}
std::cout << "Total rows retrieved: " << total << "\n";

// Search iterator — page through top-k results
SearchIteratorPtr search_iter;
status = client->SearchIterator(
    IteratorArguments()
        .WithCollectionName("my_collection")
        .WithAnnsField("vec")
        .WithBatchSize(50)
        .AddFloatVector(std::vector<float>(128, 0.1f)),
    search_iter);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

while (true) {
    SingleResult batch;
    status = search_iter->Next(batch);
    if (!status.IsOk()) break;
    std::cout << "Batch hits: " << batch.GetRowCount() << "\n";
}
```
