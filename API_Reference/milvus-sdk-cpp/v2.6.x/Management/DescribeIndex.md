# DescribeIndex()

This operation fetches the index descriptions and parameters of a collection, optionally narrowed to a field name or index name. Results are written to the DescribeIndexResponse output parameter, and the returned Status reports whether the operation succeeded.

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

    Sets the target database name; the default database is used if it is empty. Optional.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection whose index descriptions are fetched.

- `WithFieldName(const std::string& field_name)`

    Sets the name of the field; when left empty, descriptions for all indexes of the collection are returned. Optional.

- `WithIndexName(const std::string& index_name)`

    Sets the name of the index; if both field name and index name are specified, the index name is used first. Optional.

- `WithTimestamp(int64_t ts)`

    Sets a timestamp so that only segments generated before it are checked; all segments are checked if the value is zero. Optional.

**RETURNS:**

*Status*

Returns a Status, with the DescribeIndexResponse output parameter populated with the index descriptions that match the request.

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

    When request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details; a field with no matching index is reported through the returned Status rather than a thrown exception.

## Example

Describe the index on a collection field after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::DescribeIndexRequest()
    .WithDatabaseName("default")
    .WithCollectionName("book")
    .WithFieldName("book_intro");
milvus::DescribeIndexResponse response;
status = client->DescribeIndex(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
} else {
    for (const auto& index_desc : response.Descs()) {
        std::cout << "index: " << index_desc.IndexName() << ", field: " << index_desc.FieldName() << std::endl;
    }
}
```
