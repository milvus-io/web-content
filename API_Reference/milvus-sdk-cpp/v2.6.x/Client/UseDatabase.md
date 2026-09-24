# UseDatabase()

This operation switches the client to another database by closing the current connection and reconnecting to the same server with the original connection parameters, except that the specified database is used for subsequent operations. Because it is a connection lifecycle method, it must be serialized with all other operations on the client.

```cpp
Status UseDatabase(const std::string& db_name)
```

**RETURNS:**

*Status*

Returns a Status indicating whether the switch to the target database succeeded.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Switch the client to another database after connecting.

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
