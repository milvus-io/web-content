# CreateAlias()

This operation creates an alias for a collection so that search and query calls can address the collection by the alias in place of its name.

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

    Sets the name of the target database; the default database is used if this is left empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to alias.

- `WithAlias(const std::string& alias)`

    Sets the name of the alias to create.

**RETURNS:**

*Status*

Returns a Status indicating whether the alias was created successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Call CreateAlias() on a connected MilvusClientV2 to create an alias that references an existing collection.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::CreateAliasRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithAlias(alias);
status = client->CreateAlias(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
