# OptimizeTask

This class represents an asynchronous optimize task that can be cancelled, awaited, and queried for progress.

```cpp
const OptimizeTaskPtr& task = optimize_task;
```

**METHODS:**

- `Status GetResult(OptimizeResponse& response, int64_t timeout_ms = 0)`

    Waits for completion and fills `response`. `timeout_ms = 0` waits indefinitely.

- `bool Cancel()`

    Requests cooperative cancellation of the task.

- `bool IsDone() const`

    Returns whether task execution has finished.

- `bool IsCancelled() const`

    Returns whether cancellation was requested and accepted.

- `std::string CurrentProgress() const`

    Returns the latest progress message.

- `std::vector<std::string> ProgressHistory() const`

    Returns all recorded progress messages.

- `Status TaskStatus() const`

    Returns the final task status when done, otherwise an OK status.

## Example

```cpp
milvus::OptimizeTaskPtr task;
status = client->Optimize(request, task);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::OptimizeResponse response;
status = task->GetResult(response, 60000);
```
