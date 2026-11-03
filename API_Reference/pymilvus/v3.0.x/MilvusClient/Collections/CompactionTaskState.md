# CompactionTaskState

This is an enumeration that provides the following constants. It describes the state of a compaction plan returned by `get_compaction_plans()`.

Available in PyMilvus v3.0.2 or later.

```python
class CompactionTaskState(IntEnum):
    Unknown = 0
    Executing = 1
    Pipelining = 2
    Completed = 3
    Failed = 4
    Timeout = 5
    Analyzing = 6
    Indexing = 7
    Cleaned = 8
    MetaSaved = 9
    Statistic = 10
```

**Constants:**

- **Unknown** (0)

    Indicates that the compaction task state is not set.

- **Executing** (1)

    Indicates that the compaction task is being executed.

- **Pipelining** (2)

    Indicates that the compaction task is waiting in the pipeline.

- **Completed** (3)

    Indicates that the compaction task has completed.

- **Failed** (4)

    Indicates that the compaction task has failed.

- **Timeout** (5)

    Indicates that the compaction task has timed out.

- **Analyzing** (6)

    Indicates that the compaction task is analyzing segments.

- **Indexing** (7)

    Indicates that the compaction task is building indexes.

- **Cleaned** (8)

    Indicates that the compaction task has been cleaned up.

- **MetaSaved** (9)

    Indicates that the compaction task metadata has been saved.

- **Statistic** (10)

    Indicates that the compaction task is collecting statistics.

## Example

```python
from pymilvus import MilvusClient, CompactionTaskState

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# Retrieve the compaction plans of a compaction job
plans = client.get_compaction_plans(job_id=123456789)

# Check the state of each plan against CompactionTaskState constants
for plan in plans.plans:
    if plan.state == CompactionTaskState.Completed:
        print(f"Plan {plan.plan_id} completed")
```
