# CompactionMerge

Information about one compaction task or merge plan, as returned by [GetCompactionPlans](GetCompactionPlans.md) and [ListCompactionTasks](ListCompactionTasks.md).

```rust
pub struct CompactionMerge
```

**METHODS:**

- `get_source_segment_ids()` (*&[i64]*) - The IDs of the source segments being merged.
- `get_target_segment_id()` (*i64*) - The legacy single-target segment ID, or `0` when the server reports multiple targets.
- `get_plan_id()` (*i64*) - The compaction plan ID.
- `get_trigger_id()` (*i64*) - The trigger ID that produced the task.
- `get_collection_id()` (*i64*) - The ID of the collection containing the task.
- `get_partition_id()` (*i64*) - The ID of the partition containing the task.
- `get_channel()` (*&str*) - The channel processed by the task.
- `get_compaction_type()` (*CompactionType*) - The type of compaction. See [CompactionType](CompactionType.md).
- `get_state()` (*CompactionTaskState*) - The lifecycle state of the task. See [CompactionTaskState](CompactionTaskState.md).
- `get_failure_reason()` (*&str*) - The failure reason, or an empty string when the task has not failed.
- `get_target_segment_ids()` (*&[i64]*) - The target segment IDs produced by the task.


CompactionType members:


CompactionTaskState members:

## Example

```rust
if task.get_state() == CompactionTaskState::Failed {
    println!("failure: {}", task.get_failure_reason());
}
```

## Example

```rust
if task.get_compaction_type() == CompactionType::Clustering {
    println!("clustering task: {}", task.get_plan_id());
}
```

## Example

```rust
for task in resp.merges() {
    println!("{}: {:?}", task.get_plan_id(), task.get_state());
}
```
