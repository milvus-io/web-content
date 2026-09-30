# Create()

This operation creates a new MilvusClientV2 instance.

```cpp
static std::shared_ptr<MilvusClientV2> Create()
```

**RETURNS:**

*std::shared_ptr<milvus::MilvusClientV2>*

Returns the newly created client instance, ready to be configured with Connect().

**ERROR HANDLING:**

- **std::exception**

    Thrown when the client instance cannot be constructed. Inspect the exception message for failure details.

## Example

Creates the client instance, then connects it to a Milvus server.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
