# RunningRequestInfo

One Search, HybridSearch or Query request that a proxy is executing.

```rust
pub struct RunningRequestInfo
```

**PARAMETERS:**

- `request_id: String`

    Opaque request id, such as `"25-to03zu-rs"`, passed to `cancel_requests` unchanged.

- `proxy_id: i64`

    The node id of the proxy that holds the request.

- `request_type: String`

    The request type: `Search`, `HybridSearch` or `Query`.

- `database_name: String`

    The database the request targets.

- `collection_name: String`

    The collection the request targets.

- `user: String`

    The user who issued the request.

- `client_addr: String`

    The client address seen by the proxy.

- `nq: i64`

    The number of query vectors.

- `top_k: i64`

    The top-k of the request.

- `expr: String`

    The leading part (at most 256 bytes) of the filter expression.

- `start_time_ms: i64`

    The time the request started, in milliseconds since the Unix epoch.

- `queued_ms: i64`

    How long the request's first task waited in the proxy queue, in milliseconds; `0` until that task starts.

- `elapsed_ms: i64`

    How long the request has been running, in milliseconds. In a `cancel_requests` answer it is how long the request had been running when it was canceled.

- `state: String`

    The request state: `Queued`, `Running` or `Canceling`. In a `cancel_requests` answer it is the state before the cancel, or `Canceling` when the call repeated an earlier cancel.

- `task_ids: Vec<i64>`

    The ids of the proxy tasks the request has created.

- `trace_id: String`

    The trace id of the request.

- `cancellable: bool`

    Whether the request can be canceled.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `request_id(value)` / `set_request_id(value)` / `get_request_id()` - Sets or returns the request id.
- `proxy_id(value)` / `set_proxy_id(value)` / `get_proxy_id()` - Sets or returns the node id of the proxy that holds the request.
- `request_type(value)` / `set_request_type(value)` / `get_type()` - Sets the request type or returns it (`Search`, `HybridSearch` or `Query`).
- `database_name(value)` / `set_database_name(value)` / `get_database_name()` - Sets or returns the database name.
- `collection_name(value)` / `set_collection_name(value)` / `get_collection_name()` - Sets or returns the collection name.
- `user(value)` / `set_user(value)` / `get_user()` - Sets or returns the user who issued the request.
- `client_addr(value)` / `set_client_addr(value)` / `get_client_addr()` - Sets or returns the client address.
- `nq(value)` / `set_nq(value)` / `get_nq()` - Sets or returns the number of query vectors.
- `top_k(value)` / `set_top_k(value)` / `get_top_k()` - Sets or returns the top-k.
- `expr(value)` / `set_expr(value)` / `get_expr()` - Sets or returns the leading part of the filter expression.
- `start_time_ms(value)` / `set_start_time_ms(value)` / `get_start_time_ms()` - Sets or returns the start time.
- `queued_ms(value)` / `set_queued_ms(value)` / `get_queued_ms()` - Sets or returns the queued time.
- `elapsed_ms(value)` / `set_elapsed_ms(value)` / `get_elapsed_ms()` - Sets or returns the elapsed time.
- `state(value)` / `set_state(value)` / `get_state()` - Sets or returns the request state.
- `task_ids(values)` / `set_task_ids(values)` / `get_task_ids()` - Sets or returns the task ids.
- `add_task_id(value)` - Adds one task id.
- `trace_id(value)` / `set_trace_id(value)` / `get_trace_id()` - Sets or returns the trace id.
- `cancellable(value)` / `set_cancellable(value)` / `is_cancellable()` - Sets or returns whether the request can be canceled.

## Example

```rust
let resp = client
    .list_running_requests(ListRunningRequestsRequest::builder().build()?)
    .await?;
for info in resp.requests() {
    println!(
        "{} {}: user={} nq={} state={} elapsed={}ms",
        info.get_type(),
        info.get_request_id(),
        info.get_user(),
        info.get_nq(),
        info.get_state(),
        info.get_elapsed_ms()
    );
}
```
