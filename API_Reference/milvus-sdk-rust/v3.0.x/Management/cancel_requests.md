# cancel_requests()

Cancels running requests by the ids returned by `list_running_requests`.

```rust
pub async fn cancel_requests(&self, request: CancelRequestsRequest) -> Result<CancelRequestsResponse>
```

Cancellation is asynchronous: a canceled request stops at its next cancellation check. The client of a canceled request gets an error whose server code is 3002 (request canceled), carrying the reason given here. Canceling other users' requests requires the CancelRequests privilege; any user may cancel their own. A repeated cancel of an id that is already on its way out is answered again on the server and audited once, so retrying is safe.

## Request Syntax

```rust
let request = CancelRequestsRequest::builder()
    .request_ids(["25-to03zu-rs"])
    .reason("canceled by an operator")
    .build()?;
```

**REQUEST FIELDS:**

- `request_ids: Vec<String>`

    The ids of the requests to cancel, as returned by `list_running_requests`. At least one non-empty value is required. Use `add_request_id()` to add one.

- `reason: Option<String>`

    Free-text reason attached to the cancellation.

- `user: Option<String>`

    User whose requests to cancel; a caller without the CancelRequests privilege may only cancel their own requests.

**RETURN TYPE:**

*Result\<CancelRequestsResponse\>*

**RETURNS:**

A **CancelRequestsResponse** reporting the outcome of the cancellation. Every requested id is in exactly one of `canceled()`, `not_found()` and `undetermined()`. Returns an `Error` if the operation fails.

```rust
CancelRequestsResponse
    canceled() // -> &[RunningRequestInfo]
    not_found() // -> &[String]
    undetermined() // -> &[String]
    node_results() // -> &[RunningRequestNodeResult]
```

**METHODS:**

- `canceled()` (*&[RunningRequestInfo]*) -

    The canceled requests, each as it was at the moment it was canceled. See [RunningRequestInfo](RunningRequestInfo.md).

- `not_found()` (*&[String]*) -

    The ids no proxy holds, known because every proxy answered: the request already finished, never existed, or was issued by another user.

- `undetermined()` (*&[String]*) -

    The ids not canceled while some proxy did not answer: each may be running on that proxy or may have finished. Retry the cancel, or list again, once the proxy is back.

- `node_results()` (*&[RunningRequestNodeResult]*) -

    The outcome on each proxy. See [RunningRequestNodeResult](RunningRequestNodeResult.md).

## Example

```rust
let request = CancelRequestsRequest::builder()
    .request_ids(["25-to03zu-rs"])
    .reason("canceled by an operator")
    .build()?;
let resp = client.cancel_requests(request).await?;
for info in resp.canceled() {
    println!(
        "Canceled {} after {}ms (state before the cancel: {})",
        info.get_request_id(),
        info.get_elapsed_ms(),
        info.get_state()
    );
}
println!("Not found: {:?}", resp.not_found());
println!("Undetermined: {:?}", resp.undetermined());
```
