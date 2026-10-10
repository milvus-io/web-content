# describeSnapshot()

This operation gets detailed metadata for a snapshot.

```java
public DescribeSnapshotResp describeSnapshot(DescribeSnapshotReq request)
```

## Request Syntax

```java
describeSnapshot(DescribeSnapshotReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .snapshotName(String snapshotName)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database that contains the collection. If omitted, the current database is used.

- `collectionName(String collectionName)`

    The name of the collection associated with the snapshot operation.

- `snapshotName(String snapshotName)`

    The name of the snapshot.

**RETURN TYPE:**

*DescribeSnapshotResp*

**RETURNS:**

A **DescribeSnapshotResp** object containing snapshot metadata.

- `getName()` (*String*) -

    The name of the snapshot.

- `getDescription()` (*String*) -

    The description of the snapshot.

- `getCollectionName()` (*String*) -

    The name of the collection the snapshot was taken from.

- `getPartitionNames()` (*List\<String\>*) -

    The names of the partitions included in the snapshot.

- `getCreateTs()` (*Long*) -

    The creation timestamp of the snapshot.

- `getS3Location()` (*String*) -

    The storage location of the snapshot.

**EXCEPTIONS