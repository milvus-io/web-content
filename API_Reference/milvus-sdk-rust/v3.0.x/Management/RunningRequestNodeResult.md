# RunningRequestNodeResult

The outcome of a `list_running_requests` or `cancel_requests` call on one proxy.

Both calls are sent to every proxy. A proxy that did not answer contributed nothing to the result; its requests are missing from it.

```rust
pub struct RunningRequestNodeResult
```

**PARAMETERS:**

- `node_id: i64`

    The node id of the proxy.

- `error_code: i32`

    The error code of the proxy's answer; `0` means the proxy answered.

- `reason: String`

    The error message when the proxy did not answer.

- `unimplemented: bool`

    Whether the proxy is too old to serve the call, as during a rolling upgrade. Such a proxy holds no listable requests.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `node_id(value)` / `set_node_id(value)` / `get_node_id()` - Sets or returns the node id of the proxy.
- `error_code(value)` / `set_error_code(value)` / `get_error_code()` - Sets or returns the error code of the proxy's answer.
- `reason(value)` / `set_reason(value)` / `get_reason()` - Sets or returns the error message.
- `unimplemented(value)` / `set_unimplemented(value)` / `is_unimplemented()` - Sets or returns whether the proxy is too old to serve the call.
- `is_success()` - Returns whether the proxy answered the call.

## Example

```rust
let resp = client
    .list_running_requests(ListRunningRequestsRequest::builder().build()?)
    .await?;
for node in resp.node_results() {
    if node.is_success() {
        println!("proxy {} answered", node.get_node_id());
    } else {
        println!(
            "proxy {} did not answer (unimplemented={}): {}",
            node.get_node_id(),
            node.is_unimplemented(),
            node.get_reason()
        );
    }
}
```
