# useDatabase()

This operation changes the database in use.

```java
public void useDatabase(String dbName)
```

## Request Syntax

```java
useDatabase(String dbName)
```

**PARAMETERS**

- **dbName** (*String*) -

    The name of the target database.

**RETURNS**

*void*

**EXCEPTIONS**

- InterruptedException

    This exception will be raised when any error occurs during disconnection from Milvus.

## Example

```java
client.useDatabase("my_database")
```
