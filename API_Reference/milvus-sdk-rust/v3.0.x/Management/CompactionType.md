# CompactionType

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

**VARIANTS:**

- `Undefined` - Unspecified or unrecognized compaction type. This is the default.
- `Merge` - Merge compaction over sealed segments.
- `Mix` - Mixed compaction.
- `Single` - Single-segment compaction.
- `Minor` - Minor compaction.
- `Major` - Major compaction.
- `Level0Delete` - Level-0 delete compaction.
- `Clustering` - Clustering compaction.
- `Sort` - Sort compaction.
- `PartitionKeySort` - Partition-key sort compaction.
- `ClusteringPartitionKeySort` - Combined clustering and partition-key sort compaction.
- `BumpSchemaVersion` - Compaction that bumps the schema version.

## Example

```rust
if task.get_compaction_type() == CompactionType::Clustering {
    println!("clustering task: {}", task.get_plan_id());
}
```
