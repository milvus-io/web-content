# getRLSPrincipalTags()

Returns the decoded tags of the specified principal.

```java
public GetRLSPrincipalTagsResp getRLSPrincipalTags(GetRLSPrincipalTagsReq request)
```

## Request Syntax

```java
getRLSPrincipalTags(GetRLSPrincipalTagsReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .principalName(String principalName)
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

    The name of the principal whose tags are retrieved.

**RETURN TYPE:**

*GetRLSPrincipalTagsResp*

**RETURNS:**

A **GetRLSPrincipalTagsResp** object that contains the principal's tags.

- `getTags()` (*Map\<String, Object\>*) -

    The principal's tag keys and values.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    Raised when request validation fails or the server returns an error.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rls.request.GetRLSPrincipalTagsReq;
import io.milvus.v2.service.rls.response.GetRLSPrincipalTagsResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Get the tags of the principal
GetRLSPrincipalTagsResp resp = client.getRLSPrincipalTags(GetRLSPrincipalTagsReq.builder()
        .collectionName("my_collection")
        .principalName("alice")
        .build());
System.out.println(resp.getTags());
```
