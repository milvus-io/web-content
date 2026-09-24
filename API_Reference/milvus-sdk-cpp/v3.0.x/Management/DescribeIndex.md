# DescribeIndex()

This operation fetches the description of an index on a collection, including its parameters.

```cpp
Status DescribeIndex(const DescribeIndexRequest& request, DescribeIndexResponse& response)
```

## Request Syntax

```cpp
auto request = DescribeIndexRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithFieldName(field_name)
    .WithIndexName(index_name)
    .WithTimestamp(ts);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database is used if this is left empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithFieldName(const std::string& field_name)`

    Sets the name of the field that the index belongs to.

- `WithIndexName(const std::string& index_name)`

    Sets the name of the index. If both field_name and index_name are specified, the index name takes precedence.

- `WithTimestamp(int64_t ts)`

    Sets a timestamp so that only segments generated before this timestamp are checked. All segments are checked if this value is zero.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. The index description is carried in the DescribeIndexResponse object passed as the response parameter, where Descs() exposes the list of IndexDesc entries.

- **response** (*DescribeIndexResponse*) -

    - **Descs** (*const std::vector<IndexDesc>&*) -

        Get index description.

        - **FieldName** (*const std::string&*) -

            Filed name which the index belong to.

        - **IndexName** (*const std::string&*) -

            Index name. Index name cannot be empty.

        - **IndexId** (*int64_t*) -

            Index ID.

        - **MetricType** (*milvus::MetricType*) -

            Metric type.

        - **IndexType** (*milvus::IndexType*) -

            Index type.

        - **ExtraParams** (*const std::unordered_map<std::string, std::string>&*) -

            Get extra param. Note: this method was redefined in v2.4, which may affect older client code.

        - **StateCode** (*milvus::IndexStateCode*) -

            Get index state.

        - **FailReason** (*std::string*) -

            Get index failed reason.

        - **IndexedRows** (*int64_t*) -

            Get number of indexed rows. Note that indexed rows could be larger than total rows, because some segments will be reindexed after compaction.

        - **TotalRows** (*int64_t*) -

            Get number of total rows.

        - **PendingRows** (*int64_t*) -

            Get number of pending unindexed rows.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Call DescribeIndex() on a connected MilvusClientV2 to fetch the description of the index built on a field.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::DescribeIndexResponse response;
auto request = milvus::DescribeIndexRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithIndexName(index_name);
status = client->DescribeIndex(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& index_desc : response.Descs()) {
    std::cout << "IndexName: " << index_desc.IndexName() << std::endl;
    std::cout << "FieldName: " << index_desc.FieldName() << std::endl;
}
```
