# dropRowPolicy()

Drops a row policy by name. Dropping a missing policy succeeds.

```java
public void dropRowPolicy(DropRowPolicyReq request)
```

## Request Syntax

```java
dropRowPolicy(DropRowPolicyReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .policyName(String policyName)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    **[REQUIRED]**

    The name of the collection the row policy belongs to.

- `policyName(String policyName)` -

    **[REQUIRED]**

    The name of the row policy to drop.

**RETURNS:**

*void*

This operation returns no value.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    Raised when request validation fails or the server returns an error. Dropping a missing policy succeeds.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rls.request.DropRowPolicyReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Drop the policy
client.dropRowPolicy(DropRowPolicyReq.builder()
        .collectionName("my_collection")
        .policyName("east_region_policy")
        .build());
```
