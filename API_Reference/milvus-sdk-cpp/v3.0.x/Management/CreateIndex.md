# CreateIndex()

This operation creates one or more indexes on vector or scalar fields of a collection. You can specify multiple indexes in a single call, and in sync mode the call waits until the indexes are fully built.

```cpp
Status CreateIndex(const CreateIndexRequest& request)
```

## Request Syntax

```cpp
auto request = CreateIndexRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithIndexes(indexes)
    .AddIndex(index)
    .WithSync(sync)
    .WithTimeoutMs(timeout_ms);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of the target database. The default database is used if the name is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection whose fields are to be indexed.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

- `WithIndexes(std::vector<IndexDesc>&& indexes)`

    Sets the indexes to be created. Accepts a std::vector<IndexDesc> rvalue that is moved into the request.

- `SetIndexes(std::vector<IndexDesc>&& indexes)`

    Set indexes to be created.

- `AddIndex(IndexDesc&& index)`

    Adds an index to be created. Accepts an IndexDesc rvalue that is moved into the request.

- `WithSync(bool sync)`

    Sets whether the client waits until the indexes are fully built. Defaults to true; if false, the call returns immediately regardless of index build progress.

- `SetSync(bool sync)`

    Set sync mode. Default value is true. True: wait the indexes are ready. False: return immediately no matter the indexes are ready or not.

- `WithTimeoutMs(int64_t timeout_ms)`

    Sets the timeout in milliseconds for waiting on index building. Defaults to 60000 ms and only takes effect in sync mode. A value of zero polls DescribeIndex() until the indexes are fully built; a positive value makes CreateIndex() return a timeout status once the time span elapses.

- `SetTimeoutMs(int64_t timeout_ms)`

    Set timeout in milliseconds. Default value is 60000ms. Only work when Sync() is true. If the TimeoutMs is zero, the CreateIndex() will call DescribeIndex() to loading state, until the index is fully built. If the TimeoutMs is larger than zero, the CreateIndex() will break the loop after a certain of time span and return a status saying the process is timeout.

**RETURNS:**

*Status*

Returns a Status indicating whether the index was created successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Call CreateIndex() on a connected MilvusClientV2 to build an HNSW index on a vector field and wait until it is ready.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::IndexDesc index("vector", "vector_idx", milvus::IndexType::HNSW, milvus::MetricType::L2);
index.AddExtraParam("M", "16");

status = client->CreateIndex(milvus::CreateIndexRequest()
                                 .WithCollectionName(collection_name)
                                 .WithSync(true)
                                 .AddIndex(std::move(index)));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
