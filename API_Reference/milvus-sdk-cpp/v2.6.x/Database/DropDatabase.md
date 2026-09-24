# DropDatabase()

This operation drops the specified database and everything in it, permanently deleting the database together with all of its collections, partitions, and data on the server. After the drop succeeds, the client also invalidates its schema and collection timestamp caches for that database.

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

    Sets the name of the database to drop. If the name is empty, the database currently used by the connection (the default database unless UseDatabase() was called) is dropped.

**RETURNS:**

*Status*

Returns a Status indicating whether the database was dropped successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details, such as NOT_CONNECTED when the client is not connected to the server.

## Example

Use DropDatabase() after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

const std::string db_name = "my_temp_db";

auto request = milvus::DropDatabaseRequest()
    .WithDatabaseName(db_name);
status = client->DropDatabase(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
