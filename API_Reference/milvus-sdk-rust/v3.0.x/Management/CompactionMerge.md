# CompactionMerge

Information about one compaction task or merge plan, as returned by [GetCompactionPlans](get_compaction_plans.md) and [ListCompactionTasks](list_compaction_tasks.md).

```rust
pub struct CompactionMerge
```

**METHODS:**

- `get_source_segment_ids()` (*&[i64]*) -

    The IDs of the source segments being merged.

- `get_target_segment_id()` (*i64*) -

    The legacy single-target segment ID, or `0` when the server reports multiple targets.

- `get_plan_id()` (*i64*) -

    The compaction plan ID.

- `get_trigger_id()` (*i64*) -

    The trigger ID that produced the task.

- `get_collection_id()` (*i64*) -

    The ID of the collection containing the task.

- `get_partition_id()` (*i64*) -

    The ID of the partition containing the task.

- `get_channel()` (*&str*) -

    The channel processed by the task.

- `get_compaction_type()` (*CompactionType*) -

    The type of compaction.

    This enum represents the type of a compaction task.

    ```rust
    pub enum CompactionType {
        Undefined,
        Merge,
        Mix,
        Single,
        Minor,
        Major,
        Level0Delete,
        Clustering,
        Sort,
        PartitionKeySort,
        ClusteringPartitionKeySort,
        BumpSchemaVersion,
    }
    ```

    **Constants:**

    - **Undefined**

        Unspecified or unrecognized compaction type. This is the default.

    - **Merge**

        Merge compaction over sealed segments.

    - **Mix**

        Mixed compaction.

    - **Single**

        Single-segment compaction.

    - **Minor**

        Minor compaction.

    - **Major**

        Major compaction.

    - **Level0Delete**

        Level-0 delete compaction.

    - **Clustering**

        Clustering compaction.

    - **Sort**

        Sort compaction.

    - **PartitionKeySort**

        Partition-key sort compaction.

    - **ClusteringPartitionKeySort**

        Combined clustering and partition-key sort compaction.

    - **BumpSchemaVersion**

        Compaction that bumps the schema version.

    ## Example

    ```rust
    if task.get_compaction_type() == CompactionType::Clustering {
        println!("clustering task: {}", task.get_plan_id());
    }
    ```

- `get_state()` (*CompactionTaskState*) -

    The lifecycle state of the task.

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

    - **Unknown**

        The task state is unknown. This is the default.

    - **Executing**

        The task is running.

    - **Pipelining**

        The task is waiting in the pipeline.

    - **Completed**

        The task completed.

    - **Failed**

        The task failed.

    - **Timeout**

        The task timed out.

    - **Analyzing**

        The task is analyzing segments.

    - **Indexing**

        The task is building indexes.

    - **Cleaned**

        The task has been cleaned up.

    - **MetaSaved**

        The task metadata has been saved.

    - **Statistic**

        The task is collecting statistics.

    ## Example

    ```rust
    if task.get_state() == CompactionTaskState::Failed {
        println!("failure: {}", task.get_failure_reason());
    }
    ```

- `get_failure_reason()` (*&str*) -

    The failure reason, or an empty string when the task has not failed.

- `get_target_segment_ids()` (*&[i64]*) -

    The target segment IDs produced by the task.

## Example

```rust
for task in resp.merges() {
    println!("{}: {:?}", task.get_plan_id(), task.get_state());
}
```
