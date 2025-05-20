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
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.response.ListCollectionsResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. List collections
ListCollectionsResp listAliasResp = client.listCollections();
```

