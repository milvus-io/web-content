# CompactionType

This enum represents the type of a compaction task.

```csharp
public enum CompactionType
{
    Undefined = 0,
    Merge = 2,
    Mix = 3,
    Single = 4,
    Minor = 5,
    Major = 6,
    Level0Delete = 7,
    Clustering = 8,
    Sort = 9,
    PartitionKeySort = 10,
    ClusteringPartitionKeySort = 11,
    BumpSchemaVersion = 12
}
```

**Constants:**

- **Undefined** (0)

    The compaction type is undefined.

- **Merge** (2)

    The compaction merges segments.

- **Mix** (3)

    The compaction mixes multiple segment operations.

- **Single** (4)

    The compaction acts on a single segment.

- **Minor** (5)

    The compaction is a minor compaction.

- **Major** (6)

    The compaction is a major compaction.

- **Level0Delete** (7)

    The compaction removes level-0 delete records.

- **Clustering** (8)

    The compaction is a clustering compaction.

- **Sort** (9)

    The compaction sorts the segment.

- **PartitionKeySort** (10)

    The compaction sorts the segment by partition key.

- **ClusteringPartitionKeySort** (11)

    The compaction is a clustering and partition-key sort compaction.

- **BumpSchemaVersion** (12)

    The compaction bumps the schema version.
