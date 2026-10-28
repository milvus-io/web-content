# UseDatabase()

This operation switches the client's connection to another database on the same Milvus server.

```cpp
Status UseDatabase(const std::string& db_name)
```

## Request Syntax

```cpp
auto status = client->UseDatabase(db_name);
```

**REQUEST METHODS:**

Not applicable; this operation accepts `db_name` directly and has no request builder methods.

**RETURNS:**

*[Status](Status.md)*

Returns a status indicating whether the operation succeeded.

**ERROR HANDLING:**

- **[Status](Status.md)**

    Failures are reported through the returned [Status](Status.md). The SDK converts internal exceptions into a non-OK [Status](Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

Call UseDatabase() on a connected MilvusClientV2 to switch the connection to another database.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->UseDatabase("my_database");
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
