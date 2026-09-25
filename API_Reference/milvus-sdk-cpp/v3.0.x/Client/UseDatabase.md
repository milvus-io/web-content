# UseDatabase()

This operation switches the client's connection to another database on the same Milvus server.

```cpp
Status UseDatabase(const std::string& db_name)
```

**RETURNS:**

*Status*

Returns a status indicating whether the operation succeeded.

**ERROR HANDLING:**

- **std::exception**

    Thrown when the client fails to switch to the target database. Inspect the exception message or returned Status for failure details.

## Example

Call UseDatabase() on a connected MilvusClientV2 to switch the connection to another database.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->UseDatabase();
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
