# getLoadStateV2()

This operation gets detailed load-state information for a collection or partition. Use it when you need both the current load state and loading progress.

```java
public GetLoadStateResp getLoadStateV2(GetLoadStateReq request)
```

## Request Syntax

```java
getLoadStateV2(GetLoadStateReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionName(String partitionName)
    .build());
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The database that contains the collection.

- `collectionName(String collectionName)`

    The collection whose load state is inspected.

- `partitionName(String partitionName)`

    An optional partition name. Omit it to inspect the collection-level load state.

**RETURN TYPE:**

*GetLoadStateResp*

**RETURNS:**

A **GetLoadStateResp** object that indicates the load state of the collection.

- `getState()` (*LoadState*) -

    The load state of the collection.

- `getProgress()` (*Long*) -

    The loading progress of the collection, expressed as a percentage.

**EXCEPTIONS