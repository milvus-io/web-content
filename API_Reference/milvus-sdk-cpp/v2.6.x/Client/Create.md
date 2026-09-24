# Create()

This operation creates a new MilvusClientV2 instance and returns it as a std::shared_ptr<MilvusClientV2>. It is a static factory method that performs no network communication; call Connect() on the returned instance to establish a connection.

```cpp
static std::shared_ptr<MilvusClientV2> Create()
```

**RETURNS:**

*std::shared_ptr<milvus::MilvusClientV2>*

The newly created MilvusClientV2 client instance, as a std::shared_ptr<MilvusClientV2>, ready to be configured with Connect().

**ERROR HANDLING:**

- **std::exception**

    Thrown when the client instance cannot be constructed. Create() only allocates the underlying implementation object and performs no network communication; for example, memory allocation failure may throw std::bad_alloc.

## Example

Create a client instance, then connect it to the local Milvus server.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
