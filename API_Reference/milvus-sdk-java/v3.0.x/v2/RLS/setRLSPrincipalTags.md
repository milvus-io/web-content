# setRLSPrincipalTags()

Incrementally upserts a non-empty mapping of principal tags. Keys omitted from this call retain their values.

```java
public void setRLSPrincipalTags(SetRLSPrincipalTagsReq request)
```

## Request Syntax

```java
setRLSPrincipalTags(SetRLSPrincipalTagsReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .principalName(String principalName)
    .tags(Map<String, Object> tags)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    **[REQUIRED]**

    The name of the collection the principal tags belong to.

- `principalName(String principalName)` -

    **[REQUIRED]**

    The name of the principal whose tags are upserted.

- `tags(Map<String, Object> tags)` -

    **[REQUIRED]**

    The tag keys and values to upsert. The mapping must be non-empty. Values may be strings, finite numbers, or one-dimensional arrays of strings or numbers.

**RETURNS:**

*void*

This operation returns no value.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    Raised when request validation fails or the server returns an error. The tags mapping must be non-empty, and every tag value must be a string, a finite number, or an array of them.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rls.request.SetRLSPrincipalTagsReq;
import java.util.HashMap;
import java.util.Map;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Assign the region tag to the principal
Map<String, Object> tags = new HashMap<>();
tags.put("region", "east");
client.setRLSPrincipalTags(SetRLSPrincipalTagsReq.builder()
        .collectionName("my_collection")
        .principalName("alice")
        .tags(tags)
        .build());
```
