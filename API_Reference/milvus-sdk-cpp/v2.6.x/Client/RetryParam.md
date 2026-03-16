# RetryParam

This class holds the retry parameters passed to `MilvusClient::SetRetryParam()`. For retriable server errors such as rate-limit responses, the SDK will automatically re-issue the RPC call according to these parameters. Network errors and unrecoverable errors are not retried.

## Request Syntax

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

     Sets the multiplier applied to the current backoff interval after each retry. For example, a multiplier of `3` triples of the wait time on each successive attempt. Must be greater than `0`. Default: `3`.

- `WithRetryOnRateLimit(bool retry_on_ratelimit)`

     When `true`, rate-limit errors from the server trigger a retry. Default: `true`.

## Example

