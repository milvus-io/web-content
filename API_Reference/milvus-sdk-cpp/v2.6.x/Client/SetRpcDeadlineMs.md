# SetRpcDeadlineMs()

This operation changes the timeout value in milliseconds for each RPC call.

```cpp
Status SetRpcDeadlineMs(uint64_t timeout_ms)
```

**PARAMETERS:**

- **timeout_ms** (*uint64_t*)

    Sets the timeout duration in milliseconds.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](Status.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

// set timeout value for each rpc call
client->SetRpcDeadlineMs(1000);
```
