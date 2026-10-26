# deleteRLSPrincipalTags()

Deletes the selected tag keys of a principal, or all tags when the tag key list is empty.

```java
public void deleteRLSPrincipalTags(DeleteRLSPrincipalTagsReq request)
```

## Request Syntax

```java
deleteRLSPrincipalTags(DeleteRLSPrincipalTagsReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .principalName(String principalName)
    .tagKeys(List<String> tagKeys)
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

    The name of the principal whose tags are deleted.

- `tagKeys(List<String> tagKeys)` -

    The tag keys to delete. When empty, all tags of the principal are deleted.

**RETURNS:**

*void*

This operation returns no value.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    Raised when request validation fails or the server returns an error.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rls.request.DeleteRLSPrincipalTagsReq;
import java.util.Collections;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Delete the "region" tag of the principal
client.deleteRLSPrincipalTags(DeleteRLSPrincipalTagsReq.builder()
        .collectionName("my_collection")
        .principalName("alice")
        .tagKeys(Collections.singletonList("region"))
        .build());
```
