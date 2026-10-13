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

**RETURN TYPE:**

*Result\<OptimizeTask\>*

**RETURNS:**

An **OptimizeTask** handle used to monitor or cancel the asynchronous optimization task. Returns an `Error` if the operation fails.

```rust
OptimizeTask
    get_result() // -> Result<response::utility::OptimizeResponse>
    cancel() // -> bool
    is_done() // -> bool
    is_cancelled() // -> bool
    current_progress() // -> Option<String>
    progress_history() // -> Vec<String>
    task_status() // -> Result<()>
```

**METHODS:**

- `get_result()` (*Result<response::utility::OptimizeResponse>*) -

    Waits for the optimization result, blocking until it completes or the timeout elapses.

    - `status_text()` (*&str*) -

        The status text of the completed optimization.

    - `collection_name()` (*&str*) -

        The name of the optimized collection.

    - `compaction_id()` (*i64*) -

        The ID of the compaction action.

    - `target_size()` (*&str*) -

        The target segment size used for the optimization.

    - `progress_history()` (*&[String]*) -

        The optimization progress messages recorded so far.

- `cancel()` (*bool*) -

    Requests cooperative cancellation of the optimization task.

- `is_done()` (*bool*) -

    Whether the optimization task has finished.

- `is_cancelled()` (*bool*) -

    Whether cancellation of the task has been requested.

- `current_progress()` (*Option<String>*) -

    The latest optimization progress message.

- `progress_history()` (*Vec<String>*) -

    All optimization progress messages recorded so far.

- `task_status()` (*Result<()>*) -

    The final task status, or success while the task is still running.

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
