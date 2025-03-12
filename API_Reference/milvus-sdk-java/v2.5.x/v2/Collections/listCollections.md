# listCollections()

This operation lists all existing collections.

```java
public ListCollectionsResp listCollections()
```

## Request Syntax

```java
listCollections()
```

**RETURN TYPE:**

*ListCollectionsResp*

**RETURNS:**

A **ListCollectionsResp** object containing a list of collection names. If there is not any collection, an empty list will be returned.

**PARAMETERS:**

- **collectionNames** (*List\<String\>*)

    A list of strings containing the names of all existing collections.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
ListAliasResp listAliasResp = client.listAliases();
```

