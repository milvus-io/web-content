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

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection for which the alias is created.

- `WithAlias(const std::string& alias)`

    Sets the name of the alias to create for the collection.

**RETURNS:**

*Status*

Returns a Status indicating whether the alias was created successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

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
