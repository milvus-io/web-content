# ListCollectionsV2()

This operation lists all existing collections in a specified database.

```java
public ListCollectionsResp listCollectionsV2(ListCollectionsReq request)
```

## Request Syntax

```java
listCollectionsV2(ListCollectionsReq.builder()
    .databaseName(String databaseName)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the target database. Once specified, this operation returns all collections in the specified database.

**RETURN TYPE:**

*ListCollectionsResp*

**RETURNS:**

A **ListCollectionsResp** object containing a list of collection names. If there is not any collection, an empty list will be returned.

- `getCollectionNames()` (*List<String>*) -

    A list of strings containing the names of all existing collections.

- `getCollectionInfos()` (*List<CollectionInfo>*) -

    A list of **CollectionInfo** objects. A **CollectionInfo** object exposes the following getters:

    - `getCollectionName()` (*String*) -

        The name of a collection.

    - `getShardNum()` (*Integer*) -

        The number of shards in the above collection.

**EXCEPTIONS