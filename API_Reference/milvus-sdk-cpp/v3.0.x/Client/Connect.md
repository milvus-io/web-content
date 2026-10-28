# Connect()

This operation establishes the connection between the client and the Milvus server using the given connection parameters.

```cpp
Status Connect(const ConnectParam& connect_param)
```

## Request Syntax

```cpp
auto status = client->Connect(connect_param);
```

**REQUEST METHODS:**

Not applicable; this operation accepts a `ConnectParam` directly and has no request builder methods.

**RETURNS:**

*[Status](Status.md)*

Returns a [Status](Status.md) indicating whether the connection was established successfully.

**ERROR HANDLING:**

- **[Status](Status.md)**

    Failures are reported through the returned [Status](Status.md). The SDK converts internal exceptions into a non-OK [Status](Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

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
