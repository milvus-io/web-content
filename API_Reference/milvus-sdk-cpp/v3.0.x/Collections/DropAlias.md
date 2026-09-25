# DropAlias()

This operation drops an alias so that the name no longer resolves to its collection, while the underlying collection remains unaffected.

```cpp
Status DropAlias(const DropAliasRequest& request)
```

## Request Syntax

```cpp
auto request = DropAliasRequest()
    .WithDatabaseName(db_name)
    .WithAlias(alias);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of the target database; the default database is used if it is empty.

- `WithAlias(const std::string& alias)`

    Sets the name of the alias to drop.

**RETURNS:**

*Status*

Returns a Status indicating whether the alias was dropped successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Call DropAlias() on a connected MilvusClientV2 to drop an alias from a collection.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::DropAliasRequest()
    .WithDatabaseName(db_name)
    .WithAlias(alias);
status = client->DropAlias(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
