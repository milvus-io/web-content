# CompactionTaskState

This is an enumeration that provides the following constants. It describes the state of a compaction plan returned by `get_compaction_plans()`.

Available in PyMilvus v3.0.2 or later.

## Constants

- Unknown = 0

    Indicates that the compaction task state is not set.

- Executing = 1

    Indicates that the compaction task is being executed.

- Pipelining = 2

    Indicates that the compaction task is waiting in the pipeline.

- Completed = 3

    Indicates that the compaction task has completed.

- Failed = 4

    Indicates that the compaction task has failed.

- Timeout = 5

    Indicates that the compaction task has timed out.

- Analyzing = 6

    Indicates that the compaction task is analyzing segments.

- Indexing = 7

    Indicates that the compaction task is building indexes.

- Cleaned = 8

    Indicates that the compaction task has been cleaned up.

- MetaSaved = 9

    Indicates that the compaction task metadata has been saved.

- Statistic = 10

    Indicates that the compaction task is collecting statistics.
