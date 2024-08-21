# createDatabase()

This operation creates a database with a name. 

```java
public void createDatabase(CreateDatabaseReq request)
```

## Request Syntax

```java
createDatabase(CreateDatabaseReq.builder()
    .databaseName(String databaseName)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database to create.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
CreateDatabaseReq createDatabaseReq = CreateDatabaseReq.builder()
        .databaseName(databaseName)
        .build();
client.createDatabase(createDatabaseReq);
```
