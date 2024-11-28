# listRoles()

This operation lists all custom roles.

```java
public List<String> listRoles()
```

## Request Syntax

```java
MilvusClientV2 client = new MilvusClientV2(connectConfig);

List<String> roles = client.listRoles();
```

**RETURN TYPE:**

*List\<String\>*

**RETURNS:**

A list of strings containing the role names.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
List<String> roles = client.listRoles();
```

