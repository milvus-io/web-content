# currentUsedDatabase()

This operation returns the name of the database currently being used by this client.

```java
public String currentUsedDatabase()
```

**RETURNS:**

*String*

The name of the currently active database.

## Example

```java
String dbName = client.currentUsedDatabase();
System.out.println("Current database: " + dbName);
```
