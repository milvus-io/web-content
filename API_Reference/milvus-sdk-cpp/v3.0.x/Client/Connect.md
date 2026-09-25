# Connect()

This operation establishes the connection between the client and the Milvus server using the given connection parameters.

```cpp
Status Connect(const ConnectParam& connect_param)
```

**RETURNS:**

*Status*

Returns a Status indicating whether the connection was established successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

## Example

Connects to a Milvus server using a URI and token credentials, then checks the returned status.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
