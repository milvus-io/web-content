# delete()

This operation deletes entities by their IDs or with a boolean expression.

```java
public DeleteResp delete(DeleteReq request)
```

## Request Syntax

```java
delete(DeleteReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionName(String partitionName)
    .filter(String filter)
    .ids(List<Object> ids)
    .filterTemplateValues(Map<String, Object> filterTemplateValues)
    .consistencyLevel(ConsistencyLevel consistencyLevel)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    The name of the target collection.

- `partitionName(String partitionName)` -

    The name of the target partition.

- `filter(String filter)` -

    A boolean expression to filter results.

- `ids(List<Object> ids)` -

    A list of primary key values to identify specific entities.

- `filterTemplateValues(Map<String, Object> filterTemplateValues)` -

    A map of template variable values for parameterized filters.

- `consistencyLevel(ConsistencyLevel consistencyLevel)` -

    The consistency level for the delete operation. Defaults to the server default when omitted.

**RETURN TYPE:**

*DeleteResp*

**RETURNS:**

A **DeleteResp** object that contains the number of deleted entities and the operation cost.

- `getDeleteCnt()` (*long*) -

    The number of entities deleted.

- `getPrimaryKeys()` (*List\<Object\>*) -

    The primary keys of the deleted entities.

- `getCost()` (*Long*) -

    The time cost of the delete operation, in milliseconds.

**EXCEPTIONS