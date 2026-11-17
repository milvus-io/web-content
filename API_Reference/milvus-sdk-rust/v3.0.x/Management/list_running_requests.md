# list_running_requests()

Lists the Search, HybridSearch and Query requests running on every proxy of the cluster.

```rust
pub async fn list_running_requests(&self, request: ListRunningRequestsRequest) -> Result<ListRunningRequestsResponse>
```

The call succeeds as long as at least one proxy answered; a proxy that did not answer is reported in the response's `node_results()` and its requests are missing from the result. Listing other users' requests requires the ListRunningRequests privilege; any user may list their own.

## Request Syntax

```rust
let request = ListRunningRequestsRequest::builder()
    .database_name("default")
    .collection_name("books")
    .user("alice")
    .min_elapsed_ms(100)
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Database name filter; unset does not constrain the result.

- `collection_name: Option<String>`

    Collection name filter; unset does not constrain the result.

- `user: Option<String>`

    User whose requests to list; a caller without the ListRunningRequests privilege may only see their own requests.

- `min_elapsed_ms: Option<i64>`

    Minimum elapsed time filter in milliseconds; requests running for less than this are excluded. Must not be negative.

**RETURN TYPE:**

*Result\<ListRunningRequestsResponse\>*

**RETURNS:**

A **ListRunningRequestsResponse** containing the requests running on the proxies that answered. Returns an `Error` if the operation fails.

```rust
ListRunningRequestsResponse
    requests() // -> &[RunningRequestInfo]
    node_results() // -> &[RunningRequestNodeResult]
```

**METHODS:**

- `requests()` (*&[RunningRequestInfo]*) -

    The requests running on the proxies that answered. See [RunningRequestInfo](RunningRequestInfo.md).

- `node_results()` (*&[RunningRequestNodeResult]*) -

    The outcome on each proxy; a proxy that did not answer is reported here and its requests are missing from the result. See [RunningRequestNodeResult](RunningRequestNodeResult.md).

## Example

```rust
let request = ListRunningRequestsRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.list_running_requests(request).await?;
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
for node in resp.node_results() {
    if node.is_success() {
        println!("proxy {} answered", node.get_node_id());
    }
}
```
