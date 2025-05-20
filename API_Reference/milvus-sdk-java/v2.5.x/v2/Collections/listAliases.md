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
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.utility.request.ListAliasesReq;
import io.milvus.v2.service.utility.response.ListAliasResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. List aliases
ListAliasesReq listAliasesReq = ListAliasesReq.builder()
        .collectionName("test")
        .build();
ListAliasResp listAliasResp = client.listAliases(listAliasesReq);
```
