# CreateIndex()

This operation creates indexes on vector or scalar fields of a collection, and can create multiple indexes in a single call. It runs synchronously by default, waiting until the indexes are ready before returning.

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

    Sets the target database name; the default database is used when it is left empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection whose fields are to be indexed.

- `WithIndexes(std::vector<IndexDesc>&& indexes)`

    Sets the list of index descriptions (milvus::IndexDesc) to be created; each description carries the field name, index name, index type, and metric type.

- `AddIndex(IndexDesc&& index)`

    Adds one index description (milvus::IndexDesc) to the list of indexes to be created.

- `WithSync(bool sync)`

    Sets the sync mode. When true (the default), the call waits until the indexes are ready; when false, it returns immediately regardless of index readiness. Optional.

- `WithTimeoutMs(int64_t timeout_ms)`

    Sets the timeout in milliseconds for waiting until the indexes are ready; it only applies in sync mode and defaults to 60000 ms. With zero, CreateIndex() polls DescribeIndex() until the index is fully built; with a positive value, it stops polling after the given span and returns a timeout status. Optional.

**RETURNS:**

*Status*

Returns a Status indicating whether the indexes were created successfully and, in sync mode, whether they became ready within the configured timeout.

**ERROR HANDLING:**

- **std::exception**

    When request construction, network transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Create an HNSW index with the L2 metric on a vector field after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

// Build an index description: field name, index name, index type, metric type.
milvus::IndexDesc index_desc("vector_field", "vector_index", milvus::IndexType::HNSW, milvus::MetricType::L2);
index_desc.AddExtraParam("M", "16");
index_desc.AddExtraParam("efConstruction", "200");

auto request = milvus::CreateIndexRequest()
    .WithDatabaseName("default")
    .WithCollectionName("my_collection")
    .WithSync(true)
    .AddIndex(std::move(index_desc));
status = client->CreateIndex(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
