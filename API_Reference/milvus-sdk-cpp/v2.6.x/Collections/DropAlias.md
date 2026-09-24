# DropAlias()

This operation drops an alias; the underlying collection is unaffected and remains accessible by its own name. On success, the client also invalidates its local collection-timestamp and schema cache entries for the alias.

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

    Sets the name of the database that contains the alias. If left empty, the database of the current connection is used. Optional.

- `WithAlias(const std::string& alias)`

    Sets the name of the alias to drop.

**RETURNS:**

*Status*

Returns a Status indicating whether the alias was dropped successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, the RPC transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Drop an alias after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

const std::string db_name = "default";
const std::string alias = "product_alias";
auto request = milvus::DropAliasRequest()
    .WithDatabaseName(db_name)
    .WithAlias(alias);
status = client->DropAlias(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
