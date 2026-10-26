# listRLSPrincipals()

Lists the application principal names with stored tags in the specified collection.

```java
public ListRLSPrincipalsResp listRLSPrincipals(ListRLSPrincipalsReq request)
```

## Request Syntax

```java
listRLSPrincipals(ListRLSPrincipalsReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    **[REQUIRED]**

    The name of the collection to list the RLS principals of.

**RETURN TYPE:**

*ListRLSPrincipalsResp*

**RETURNS:**

A **ListRLSPrincipalsResp** object that contains the principal names.

- `getPrincipalNames()` (*List\<String\>*) -

    The names of the RLS principals configured on the collection.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    Raised when request validation fails or the server returns an error.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rls.request.ListRLSPrincipalsReq;
import io.milvus.v2.service.rls.response.ListRLSPrincipalsResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. List the RLS principals of the collection
ListRLSPrincipalsResp resp = client.listRLSPrincipals(ListRLSPrincipalsReq.builder()
        .collectionName("my_collection")
        .build());
System.out.println(resp.getPrincipalNames());
```
