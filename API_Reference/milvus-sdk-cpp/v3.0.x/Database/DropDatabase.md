# DropDatabase()

This operation drops a database on the connected Milvus server.

```cpp
Status DropDatabase(const DropDatabaseRequest& request)
```

## Request Syntax

```cpp
auto request = DropDatabaseRequest()
    .WithDatabaseName(db_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of the database to drop.

**RETURNS:**

*Status*

Returns a Status indicating whether the database was dropped successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Call DropDatabase() on a connected MilvusClientV2 to drop a database by name.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::DropDatabaseRequest()
    .WithDatabaseName(db_name);
status = client->DropDatabase(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
