# describeAlias()

This operation displays the details of an alias.

```java
public DescribeAliasResp describeAlias(DescribeAliasReq request)
```

## Request Syntax

```java
describeAlias(DescribeAliasReq.builder()
    .databaseName(String databaseName)
    .alias(String alias)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `alias(String alias)` -

    The alias name.

**RETURN TYPE:**

*DescribeAliasResp*

**RETURNS:**

A **DescribeAliasResp** object that contains the alias details.

- `getDatabaseName()` (*String*) -

    The name of the database.

- `getCollectionName()` (*String*) -

    The name of the collection the alias refers to.

- `getAlias()` (*String*) -

    The name of the alias.

**EXCEPTIONS