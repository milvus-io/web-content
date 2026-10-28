# CreateIndex()

This operation creates one or more indexes on vector or scalar fields of a collection. You can specify multiple indexes in a single call, and in sync mode the call waits until the indexes are fully built.

The preferred index input is [IndexParam](IndexParam.md).

```cpp
Status CreateIndex(const CreateIndexRequest& request)
```

## Request Syntax

```cpp
auto request = CreateIndexRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithIndexParams(index_params)
    .AddIndexParam(index_param)
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

- `WithIndexParams(std::vector<IndexParam>&& index_params)`

    Sets the indexes to be created. This is the preferred creation input.

- `SetIndexParams(std::vector<IndexParam>&& index_params)`

    Sets the indexes to be created. This is the preferred creation input.

- `AddIndexParam(IndexParam&& index_param)`

    Adds one index to be created. This is the preferred creation input.

- `WithIndexes(std::vector<IndexDesc>&& indexes)`

    **Deprecated.** Sets legacy index descriptors. Use `WithIndexParams()` instead.

- `SetIndexes(std::vector<IndexDesc>&& indexes)`

    **Deprecated.** Sets legacy index descriptors. Use `SetIndexParams()` instead.

- `AddIndex(IndexDesc&& index)`

    **Deprecated.** Adds a legacy index descriptor. Use `AddIndexParam()` instead.



    Sets the indexes to be created. Accepts a std::vector<[IndexDesc](IndexDesc.md)> rvalue that is moved into the request.

- `SetIndexes(std::vector<IndexDesc>&& indexes)`

    Set indexes to be created.

- `AddIndex(IndexDesc&& index)`

    Adds an index to be created. Accepts an [IndexDesc](IndexDesc.md) rvalue that is moved into the request.

- `WithSync(bool sync)`

    Sets whether the client waits until the indexes are fully built. Defaults to true; if false, the call returns immediately regardless of index build progress.

- `SetSync(bool sync)`

    Set sync mode. Default value is true. True: wait the indexes are ready. False: return immediately no matter the indexes are ready or not.

- `WithTimeoutMs(int64_t timeout_ms)`

    Sets the timeout in milliseconds for waiting on index building. Defaults to 60000 ms and only takes effect in sync mode. A value of zero polls DescribeIndex() until the indexes are fully built; a positive value makes CreateIndex() return a timeout status once the time span elapses.

- `SetTimeoutMs(int64_t timeout_ms)`

    Set timeout in milliseconds. Default value is 60000ms. Only work when Sync() is true. If the TimeoutMs is zero, the CreateIndex() will call DescribeIndex() to loading state, until the index is fully built. If the TimeoutMs is larger than zero, the CreateIndex() will break the loop after a certain of time span and return a status saying the process is timeout.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the index was created successfully.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

Call CreateIndex() on a connected MilvusClientV2 to build an HNSW index on a vector field and wait until it is ready.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::IndexParam index("vector", "vector_idx", milvus::IndexType::HNSW, milvus::MetricType::L2);
index.AddExtraParam("M", "16");

status = client->CreateIndex(milvus::CreateIndexRequest()
                                 .WithCollectionName(collection_name)
                                 .WithSync(true)
                                 .AddIndexParam(std::move(index)));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
