# GetCollectionStats()

This operation fetches statistics of a collection, such as the row count. Currently, only the row count is returned.

```cpp
Status GetCollectionStats(const GetCollectionStatsRequest& request, GetCollectionStatsResponse& response)
```

## Request Syntax

```cpp
auto request = GetCollectionStatsRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database is used if the name is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. The collection statistics, currently the row count, are carried in the response object.

- **response** (*GetCollectionStatsResponse*) -

    - **Stats** (*const CollectionStat&*) -

        Get collection stats.

        - **RowCount** (*uint64_t*) -

            Return row count of this collection.

        - **Name** (*const std::string&*) -

            Get collection name.

        - **Statistics** (*const std::unordered_map<std::string, std::string>&*) -

            Get the raw key/value statistics map of this collection.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Call GetCollectionStats() on a connected MilvusClientV2 to fetch the statistics of a collection and read the row count from the response.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::GetCollectionStatsRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name);
milvus::GetCollectionStatsResponse response;
status = client->GetCollectionStats(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "Row count: " << response.Stats().RowCount() << std::endl;
```
