# listAliases()

This operation lists all existing aliases for a specific collection.

```java
public ListAliasResp listAliases()
```

## Request Syntax

```java
MilvusClientV2.listAliases(ListAliasesReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .build();
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database to which the target collection belongs.

- `collectionName(String collectionName)`

    The name of the target collection of this operation.

**RETURN TYPE:**

*ListAliasResp*

**RETURN TYPE:**

*ListAliasResp*

**RETURNS:**

A **ListAliasResp** object containing a list of aliases for the specified collection. If the collection has no aliases, an empty list will be returned.

- `getAlias()` (*List\<String\>*) -

    A list of strings containing the aliases.

- `getCollectionName()` (*String*) -

    The name of the collection.

- `getDbName()` (*String*) -

    The name of the database.

**EXCEPTIONS