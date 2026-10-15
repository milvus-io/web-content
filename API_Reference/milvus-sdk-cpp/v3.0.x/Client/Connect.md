# Connect()

This operation establishes the connection between the client and the Milvus server using the given connection parameters.

```cpp
Status Connect(const ConnectParam& connect_param)
```

**RETURNS:**

*Status*

Returns a Status indicating whether the connection was established successfully.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

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
