# listSnapshots()

This operation lists snapshots, optionally scoped to a database and collection.

```java
public ListSnapshotsResp listSnapshots(ListSnapshotsReq request)
```

## Request Syntax

```java
listSnapshots(ListSnapshotsReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database that contains the collection. If omitted, the current database is used.

- `collectionName(String collectionName)`

    The name of the collection associated with the snapshot operation.

**RETURN TYPE:**

*ListSnapshotsResp*

**RETURNS:**

A **ListSnapshotsResp** object containing the snapshot names that match the request filter.

- `getSnapshots()` (*List\<String\>*) -

    The names of the snapshots that match the request filter.

**EXCEPTIONS