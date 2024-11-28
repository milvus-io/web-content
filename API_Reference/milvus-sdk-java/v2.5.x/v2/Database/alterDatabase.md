# alterDatabase()

This operation alters a database's properties. 

```java
public void alterDatabase(AlterDatabaseReq request)
```

## Request Syntax

```java
alterDatabase(AlterDatabaseReq.builder()
    .databaseName(String databaseName)
    .properties(Map<String, String> properties)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database.

- `properties(Map<String, String> properties)`

The properties of the database, such as replica number, resource groups.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
Map<String, String> properties = new HashMap<>();
properties.put(Constant.DATABASE_REPLICA_NUMBER, "1");
AlterDatabaseReq alterDatabaseReq = AlterDatabaseReq.builder()
        .databaseName(databaseName)
        .properties(properties)
        .build();
client.alterDatabase(alterDatabaseReq);
```

