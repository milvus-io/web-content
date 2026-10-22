# RefreshExternalCollection()

This operation starts a refresh job for an external collection. Use it after external data changes and the collection metadata needs to be refreshed.

```cpp
Status RefreshExternalCollection(const RefreshExternalCollectionRequest& request, RefreshExternalCollectionResponse& response)
```

## Request Syntax

```cpp
auto request = milvus::RefreshExternalCollectionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithExternalSource("s3")
    .WithExternalSpec({{"bucket", "milvus-data"}, {"path", "collections/book"}});
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the external collection to refresh.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

- `WithExternalSource(const std::string& external_source)`

    Sets the external source type.

- `SetExternalSource(const std::string& external_source)`

    Set the external data source, e.g. an S3 path.

- `WithExternalSpec(const nlohmann::json& external_spec)`

    Sets provider-specific refresh configuration as JSON.

- `SetExternalSpec(const nlohmann::json& external_spec)`

    Set the external file specification.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. The refresh job ID is carried in the response object.

- **response** (*RefreshExternalCollectionResponse*) -

    - **JobID** (*int64_t*) -

        Get the refresh job identifier.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::RefreshExternalCollectionRequest()
    .WithExternalSource("s3")
    .WithExternalSpec({{"bucket", "milvus-data"}, {"path", "collections/book"}});
milvus::RefreshExternalCollectionResponse response;
status = client->RefreshExternalCollection(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
