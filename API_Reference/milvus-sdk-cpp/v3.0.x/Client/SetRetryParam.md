# SetRetryParam()

This operation resets the retry rules for each RPC call.

```cpp
Status SetRetryParam(const RetryParam& retry_param)
```

**PARAMETERS:**

- **retry_param** (*const RetryParam&*)

    Sets the retry parameters.

### RetryParam

This class holds the retry parameters passed to `SetRetryParam()`. For retriable server errors such as rate-limit responses, the SDK will automatically re-issue the RPC call according to these parameters. Network errors and unrecoverable errors are not retried.

```cpp
RetryParam param;
```

**REQUEST METHODS:**

- `WithMaxRetryTimes(uint64_t max_retry_times)`

    Sets the maximum number of retry attempts. Default: `75`.

- `WithMaxRetryTimeoutMs(uint64_t max_retry_timeout_ms)`

    Sets the overall timeout in milliseconds across all retry attempts. Once this limit is exceeded, no further retries are made, regardless of the value of `WithMaxRetryTimes()`. A value of `0` means no timeout is enforced. Default: `0`.

- `WithInitialBackOffMs(uint64_t initial_backoff_ms)`

    Sets the initial wait interval in milliseconds before the first retry. Must be greater than `0`. Default: `10`.

- `WithMaxBackOffMs(uint64_t max_backoff_ms)`

    Sets the maximum wait interval in milliseconds between retries. The backoff grows by `WithBackOffMultiplier()` each attempt but is capped at this value. Must be greater than `0`. Default: `3000`.

- `WithBackOffMultiplier(uint64_t backoff_multiplier)`

    Sets the multiplier applied to the current backoff interval after each retry. For example, a multiplier of `3` triples the wait time on each successive attempt. Must be greater than `0`. Default: `3`.

- `WithRetryOnRateLimit(bool retry_on_ratelimit)`

    When `true`, rate-limit errors from the server trigger a retry. Default: `true`.

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
