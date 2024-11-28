# listUsers()

This operation lists the names of all existing users.

```java
public List<String> listUsers()
```

## Request Syntax

```java
listUsers();
```

**RETURN TYPE:**

*List\<String\>*

**RETURNS:**

A list of strings containing the user names.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
List<String> resp = client.listUsers();
```

