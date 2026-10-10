# describeDatabase()

This operation gets detailed information about a specific database.

```java
public DescribeDatabaseResp describeDatabase(DescribeDatabaseReq request)
```

## Request Syntax

```java
describeDatabase(DescribeDatabaseReq.builder()
    .databaseName(String databaseName)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database.

**RETURN TYPE**:

*DescribeDatabaseResp*

**RETURN TYPE:**

*DescribeDatabaseResp*

**RETURNS:**

A **DescribeDatabaseResp** object that contains detailed information about the specified database.

- `getDatabaseName()` (*String*) -

    The name of the database.

- `getProperties()` (*Map\<String, String\>*) -

    The properties of the database.

**EXCEPTIONS