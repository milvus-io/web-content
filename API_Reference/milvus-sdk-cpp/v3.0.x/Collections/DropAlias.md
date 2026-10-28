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

- `SetDatabaseName(const std::string& db_name)`

    Set database name in which the collection is created.

- `WithAlias(const std::string& alias)`

    Sets the name of the alias to drop.

- `SetAlias(const std::string& alias)`

    Set name of the alias.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the alias was dropped successfully.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

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
