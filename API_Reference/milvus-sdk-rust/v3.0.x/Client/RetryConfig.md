# RetryConfig

Retry policy applied to V2 RPC calls.

```rust
use milvus::v2::types::RetryConfig;
```

Configured on a [ConnectConfig](ConnectConfig.md) through its `retry` field. The defaults match the SDK policy: at most 75 attempts with exponential backoff, and retries of server-side rate-limit responses enabled.

## Construction

- `RetryConfig::new() -> RetryConfig`

    Creates a value initialized with the SDK defaults: `max_attempts = 75`, `max_retry_timeout = Duration::ZERO`, `initial_backoff = 10ms`, `max_backoff = 3s`, `backoff_multiplier = 3.0`, `retry_on_rate_limit = true`.

## PARAMETERS

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `max_attempts` | `u32` | `75` | Maximum number of attempts, including the initial RPC call. |
| `max_retry_timeout` | `Duration` | `Duration::ZERO` | Maximum wall-clock time spent retrying one RPC. Zero disables this limit. |
| `initial_backoff` | `Duration` | `10ms` | Delay before the second attempt. |
| `max_backoff` | `Duration` | `3s` | Upper bound for the delay between attempts. |
| `backoff_multiplier` | `f64` | `3.0` | Multiplier applied to the delay after each failed attempt. |
| `retry_on_rate_limit` | `bool` | `true` | Whether server-side rate-limit responses may be retried. |

## METHODS

Each field has a consuming setter, a mutable setter, and a getter.

- `max_attempts(mut self, value: u32) -> Self` — sets the maximum number of attempts. `set_max_attempts(&mut self, value)` and `get_max_attempts() -> u32` are also available.
- `max_retry_timeout(mut self, value: Duration) -> Self` — sets the maximum wall-clock retry time. `set_max_retry_timeout(&mut self, value)` and `get_max_retry_timeout() -> Duration` are also available.
- `initial_backoff(mut self, value: Duration) -> Self` — sets the delay before the second attempt. `set_initial_backoff(&mut self, value)` and `get_initial_backoff() -> Duration` are also available.
- `max_backoff(mut self, value: Duration) -> Self` — sets the upper bound for the delay between attempts. `set_max_backoff(&mut self, value)` and `get_max_backoff() -> Duration` are also available.
- `backoff_multiplier(mut self, value: f64) -> Self` — sets the delay multiplier. `set_backoff_multiplier(&mut self, value)` and `get_backoff_multiplier() -> f64` are also available.
- `retry_on_rate_limit(mut self, value: bool) -> Self` — sets whether rate-limit responses are retried. `set_retry_on_rate_limit(&mut self, value)` and `get_retry_on_rate_limit() -> bool` are also available.
