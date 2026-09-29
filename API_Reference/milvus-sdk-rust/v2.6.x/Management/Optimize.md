# Optimize()

Starts an asynchronous collection-optimization task.

```rust
pub async fn optimize(&self, request: OptimizeRequest) -> Result<OptimizeTask>
```

Use the returned `OptimizeTask` to observe progress, wait for completion, or request cooperative cancellation. Optimization may involve multiple server-side stages.

## Request Syntax

```rust
let request = OptimizeRequest::builder()
    .collection_name("books")
    .target_size("512MB")
    .async_mode(true)
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to optimize. Required.

- `target_size: String`

    Target segment size such as `512MB` or `1GB`. Empty means that no explicit target size is sent to Milvus.

- `async_mode: bool`

    Start the optimization in a Tokio task and return immediately. When `false`, the call waits for the whole optimization before returning the completed task.

- `timeout_ms: i64`

    Overall task timeout in milliseconds. A value less than or equal to zero means no overall timeout.

**RETURNS:**

*Result\<OptimizeTask\>*

Returns a handle for monitoring or cancelling the asynchronous optimization task:

- `pub async fn get_result(&self, timeout_ms: i64) -> Result<OptimizeResponse>` — waits for the optimization result; a timeout less than or equal to zero waits indefinitely.
- `pub fn cancel(&self) -> bool` — cooperatively cancels the task; in-flight RPCs are allowed to finish.
- `pub fn is_done(&self) -> bool` — returns whether the optimization task has finished.
- `pub fn is_cancelled(&self) -> bool` — returns whether cancellation has been requested.
- `pub fn current_progress(&self) -> Option<String>` — returns the latest optimization progress message.
- `pub fn progress_history(&self) -> Vec<String>` — returns all optimization progress messages recorded so far.
- `pub fn task_status(&self) -> Result<()>` — returns the final task status, or success while the task is still running.

`OptimizeResponse` exposes `status_text()`, `collection_name()`, `compaction_id()`, `target_size()`, and `progress_history()`. Returns an `Error` on failure.

## Example

```rust
let request = OptimizeRequest::builder()
    .collection_name("books")
    .target_size("512MB")
    .async_mode(true)
    .build()?;
let task = client.optimize(request).await?;
let resp = task.get_result(300_000).await?;
println!("compaction_id: {}", resp.compaction_id());
```
