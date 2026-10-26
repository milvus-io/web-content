# CompactionTaskState

This enum represents the lifecycle state of one compaction task.

```rust
pub enum CompactionTaskState {
    Unknown,
    Executing,
    Pipelining,
    Completed,
    Failed,
    Timeout,
    Analyzing,
    Indexing,
    Cleaned,
    MetaSaved,
    Statistic,
}
```

**Constants:**

- **Unknown** - The task state is unknown. This is the default.
- **Executing** - The task is running.
- **Pipelining** - The task is waiting in the pipeline.
- **Completed** - The task completed.
- **Failed** - The task failed.
- **Timeout** - The task timed out.
- **Analyzing** - The task is analyzing segments.
- **Indexing** - The task is building indexes.
- **Cleaned** - The task has been cleaned up.
- **MetaSaved** - The task metadata has been saved.
- **Statistic** - The task is collecting statistics.

## Example

```rust
if task.get_state() == CompactionTaskState::Failed {
    println!("failure: {}", task.get_failure_reason());
}
```
