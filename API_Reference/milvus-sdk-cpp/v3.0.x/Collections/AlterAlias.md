# AlterAlias()

This operation reassigns an existing alias from its current collection to the collection specified in the request, so that search and query calls using the alias subsequently address the new collection.

```cpp
Status AlterAlias(const AlterAliasRequest& request)
```

## Request Syntax

```cpp
auto request = AlterAliasRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithAlias(alias);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of the target database; the default database is used if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to which the alias is reassigned.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

- `WithAlias(const std::string& alias)`

    Sets the name of the alias to change.

- `SetAlias(const std::string& alias)`

    Set name of the alias.

**RETURNS:**

*Status*

Returns a Status indicating whether the alias was changed successfully.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

Call AlterAlias() on a connected MilvusClientV2 to reassign an alias to another collection.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::AlterAliasRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithAlias(alias);
status = client->AlterAlias(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
