# listAliases()

This operation lists all existing aliases for a specific collection.

```java
public ListAliasResp listAliases()
```

## Request Syntax

```java
MilvusClientV2.listAliases()
```

**RETURN TYPE:**

*ListAliasResp*

**RETURNS:**

A **ListAliasResp** object containing a list of aliases for the specified collection. If the collection has no aliases, an empty list will be returned.

**PARAMETERS:**

- **alias** (*List\<String\>*)

    A list of strings containing the aliases.

- **collectionName** (*String*)

    The name of the collection.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
ListAliasesReq listAliasesReq = ListAliasesReq.builder()
        .collectionName("test")
        .build();
ListAliasResp listAliasResp = client.listAliases(listAliasesReq);
```
