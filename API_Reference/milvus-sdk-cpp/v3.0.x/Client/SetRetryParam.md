# SetRetryParam()

This operation resets the retry rules for each RPC call.

```cpp
Status SetRetryParam(const RetryParam& retry_param)
```

**PARAMETERS:**

- **retry_param** (*const RetryParam&*)

    Sets the retry parameters.
    See [RetryParam](RetryParam.md).

## Request Syntax

```cpp
auto status = client->SetRetryParam(retry_param);
```

**REQUEST METHODS:**

Not applicable; this operation accepts a `RetryParam` directly and has no request builder methods.

**RETURNS:**

*[Status](Status.md)*

Check `status.IsOk()` to confirm success.

**ERROR HANDLING:**

- **[Status](Status.md)**

    Failures are reported through the returned [Status](Status.md). The SDK converts internal exceptions into a non-OK [Status](Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](Status.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::RetryParam retry_param;
retry_param.WithMaxRetryTimes(10)
           .WithInitialBackOffMs(100)
           .WithMaxBackOffMs(5000)
           .WithBackOffMultiplier(2)
           .WithRetryOnRateLimit(true);

status = client->SetRetryParam(retry_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
