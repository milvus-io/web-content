# CreateAlias()

This operation creates an alias for a collection so that search or query can address the collection by the alias instead of its name. The alias is attached to the collection named in the request within the target database; the default database is used when none is set.

```cpp
Status CreateAlias(const CreateAliasRequest& request)
```

## Request Syntax

```cpp
auto request = CreateAliasRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithAlias(alias);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name that contains the collection to alias; the default database is used when it is left empty. Optional.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection for which the alias is created.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

- `WithAlias(const std::string& alias)`

    Sets the name of the alias to create for the collection.

- `SetAlias(const std::string& alias)`

    Set name of the alias.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the alias was created successfully.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

Create an alias for a collection after connecting a MilvusClientV2; the alias can then be used in search or query in place of the collection name.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::CreateAliasRequest()
    .WithDatabaseName("default")
    .WithCollectionName("book")
    .WithAlias("publication");
status = client->CreateAlias(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
