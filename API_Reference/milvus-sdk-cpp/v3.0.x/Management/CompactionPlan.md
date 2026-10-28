# CompactionPlan

Describes one compaction task in a compaction response. `CompactionPlan` also contains the task type and task state enums.

```cpp
class CompactionPlan;
```

**METHODS:**

- `const std::vector<int64_t>& SourceSegments() const`

    Returns the source segment IDs.

- `int64_t DestinySegemnt() const`

    Returns the single destination segment ID from the legacy compaction API. For detailed tasks, prefer `Targets()`.

- `int64_t PlanId() const`

    Returns the server-side compaction task identifier.

- `int64_t TriggerId() const`

    Returns the compaction trigger ID.

- `int64_t CollectionId() const`

    Returns the collection ID.

- `int64_t PartitionId() const`

    Returns the partition ID.

- `const std::string& Channel() const`

    Returns the channel handled by this task.

- `CompactionType Type() const`

    Returns the compaction type.

- `CompactionTaskState State() const`

    Returns the task state.

- `const std::string& FailureReason() const`

    Returns the failure reason, or an empty string when the task has not failed.

- `const std::vector<int64_t>& Targets() const`

    Returns the complete output segment set.

## CompactionType

```cpp
enum class CompactionType {
    UNDEFINED = 0,
    MERGE = 2,
    MIX = 3,
    SINGLE = 4,
    MINOR = 5,
    MAJOR = 6,
    LEVEL0_DELETE = 7,
    CLUSTERING = 8,
    SORT = 9,
    PARTITION_KEY_SORT = 10,
    CLUSTERING_PARTITION_KEY_SORT = 11,
    BUMP_SCHEMA_VERSION = 12,
};
```

**Constants:**

- **UNDEFINED** (0)

    The server did not provide a type.

- **MERGE** (2)

    Merges segments.

- **MIX** (3)

    Performs a mixed compaction.

- **SINGLE** (4)

    Compacts one segment.

- **MINOR** (5)

    Performs a minor compaction.

- **MAJOR** (6)

    Performs a major compaction.

- **LEVEL0_DELETE** (7)

    Applies Level-0 delete records.

- **CLUSTERING** (8)

    Performs vector clustering compaction.

- **SORT** (9)

    Performs data sorting compaction.

- **PARTITION_KEY_SORT** (10)

    Sorts data by partition key.

- **CLUSTERING_PARTITION_KEY_SORT** (11)

    Combines clustering with partition-key sorting.

- **BUMP_SCHEMA_VERSION** (12)

    Bumps the schema version.

## CompactionTaskState

```cpp
enum class CompactionTaskState {
    UNKNOWN = 0,
    EXECUTING = 1,
    PIPELINING = 2,
    COMPLETED = 3,
    FAILED = 4,
    TIMEOUT = 5,
    ANALYZING = 6,
    INDEXING = 7,
    CLEANED = 8,
    META_SAVED = 9,
    STATISTIC = 10,
};
```

**Constants:**

- **UNKNOWN** (0)

    The server did not provide a state.

- **EXECUTING** (1)

    The task is executing.

- **PIPELINING** (2)

    The task is pipelining work.

- **COMPLETED** (3)

    The task completed successfully.

- **FAILED** (4)

    The task failed. See `FailureReason()`.

- **TIMEOUT** (5)

    The task timed out.

- **ANALYZING** (6)

    The task is analyzing input data.

- **INDEXING** (7)

    The task is building indexes.

- **CLEANED** (8)

    Temporary task resources were cleaned.

- **META_SAVED** (9)

    Task metadata was saved.

- **STATISTIC** (10)

    The task is collecting statistics.
