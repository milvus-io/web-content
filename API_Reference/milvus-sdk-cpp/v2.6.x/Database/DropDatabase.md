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

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the database was dropped successfully.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md), for example NOT_CONNECTED when the client is not connected to the server. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

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
