# CompactionTaskState

This is an enumeration that provides the following constants. It describes the state of a compaction plan returned by `getCompactionPlans()` and `listCompactionTasks()`.
```java
public enum CompactionTaskState
```


**Constants:**

- **Unknown** (0)

    The compaction task state is not set.

- **Executing** (1)

    The compaction task is being executed.

- **Pipelining** (2)

    The compaction task is waiting in the pipeline.

- **Completed** (3)

    The compaction task has completed.

- **Failed** (4)

    The compaction task has failed.

- **Timeout** (5)

    The compaction task has timed out.

- **Analyzing** (6)

    The compaction task is analyzing segments.

- **Indexing** (7)

    The compaction task is building indexes.

- **Cleaned** (8)

    The compaction task has been cleaned up.

- **MetaSaved** (9)

    The compaction task metadata has been saved.

- **Statistic** (10)

    The compaction task is collecting statistics.
