# CompactionType

This is an enumeration that provides the following constants. It describes the type of a compaction plan returned by `get_compaction_plans()`.

Available in PyMilvus v3.0.2 or later.

## Constants

- UndefinedCompaction = 0

    Indicates that the compaction type is not set.

- MergeCompaction = 2

    Indicates a merge compaction that combines small segments into larger ones.

- MixCompaction = 3

    Indicates a mix compaction that merges segments and compacts their data at the same time.

- SingleCompaction = 4

    Indicates a single compaction that compacts data within one segment.

- MinorCompaction = 5

    Indicates a minor compaction that merges small segments.

- MajorCompaction = 6

    Indicates a major compaction that merges segments and compacts their data.

- Level0DeleteCompaction = 7

    Indicates an L0 compaction that merges delete operations in L0 segments into existing data segments.

- ClusteringCompaction = 8

    Indicates a clustering compaction that reorganizes segments to improve query performance.

- SortCompaction = 9

    Indicates a sort compaction that sorts data within segments.

- PartitionKeySortCompaction = 10

    Indicates a compaction that sorts segments by partition key.

- ClusteringPartitionKeySortCompaction = 11

    Indicates a compaction that clusters segments and sorts them by partition key.

- BumpSchemaVersionCompaction = 12

    Indicates a compaction that bumps the schema version of a segment.
