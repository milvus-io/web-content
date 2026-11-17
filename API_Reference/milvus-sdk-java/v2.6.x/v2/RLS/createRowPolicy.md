# createRowPolicy()

Creates a row policy for the specified collection. An existing policy name is an error.

```java
public void createRowPolicy(CreateRowPolicyReq request)
```

## Request Syntax

```java
createRowPolicy(CreateRowPolicyReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .policyName(String policyName)
    .policyType(RowPolicyType policyType)
    .actions(List<RowPolicyAction> actions)
    .usingExpr(String usingExpr)
    .checkExpr(String checkExpr)
    .description(String description)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    **[REQUIRED]**

    The name of the collection to create the row policy for.

- `policyName(String policyName)` -

    **[REQUIRED]**

    The name of the row policy to create.

- `policyType(RowPolicyType policyType)` -

    **[REQUIRED]**

    The type of the row policy: permissive or restrictive. See [RowPolicyType](RowPolicyType.md).

- `actions(List<RowPolicyAction> actions)` -

    **[REQUIRED]**

    The actions governed by the policy. See [RowPolicyAction](RowPolicyAction.md).

- `usingExpr(String usingExpr)` -

    The expression used to filter the rows visible to a principal. Defaults to an empty string.

- `checkExpr(String checkExpr)` -

    The expression used to validate the rows written by a principal. Defaults to an empty string.

- `description(String description)` -

    The policy description. Defaults to an empty string.

**RETURNS:**

*void*

This operation returns no value.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    Raised when request validation fails or the server returns an error. A policy name that already exists on the collection is an error.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.RowPolicyAction;
import io.milvus.v2.common.RowPolicyType;
import io.milvus.v2.service.rls.request.CreateRowPolicyReq;
import java.util.Collections;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a row policy that lets the principal see only rows where region = "east"
client.createRowPolicy(CreateRowPolicyReq.builder()
        .collectionName("my_collection")
        .policyName("east_region_policy")
        .policyType(RowPolicyType.PERMISSIVE)
        .actions(Collections.singletonList(RowPolicyAction.QUERY))
        .usingExpr("region == \"east\"")
        .build());
```
