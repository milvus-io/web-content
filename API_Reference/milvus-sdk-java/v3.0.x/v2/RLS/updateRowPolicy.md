# updateRowPolicy()

Replaces the definition of the named row policy, preserving its server-side identity. The policy must exist.

```java
public void updateRowPolicy(UpdateRowPolicyReq request)
```

## Request Syntax

```java
updateRowPolicy(UpdateRowPolicyReq.builder()
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

    The name of the collection the row policy belongs to.

- `policyName(String policyName)` -

    **[REQUIRED]**

    The name of the row policy to update.

- `policyType(RowPolicyType policyType)` -

    **[REQUIRED]**

    The type of the row policy: permissive or restrictive. See [RowPolicyType](RowPolicyType.md).

- `actions(List<RowPolicyAction> actions)` -

    **[REQUIRED]**

    The actions governed by the policy. See [RowPolicyAction](RowPolicyAction.md).

- `usingExpr(String usingExpr)` -

    The expression used to filter the rows visible to a principal. Omitted expressions become empty strings.

- `checkExpr(String checkExpr)` -

    The expression used to validate the rows written by a principal. Omitted expressions become empty strings.

- `description(String description)` -

    The policy description. Omitted descriptions become empty strings.

**RETURNS:**

*void*

This operation returns no value.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    Raised when request validation fails or the server returns an error. The policy must exist.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.RowPolicyAction;
import io.milvus.v2.common.RowPolicyType;
import io.milvus.v2.service.rls.request.UpdateRowPolicyReq;
import java.util.Arrays;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Replace the definition of an existing policy
client.updateRowPolicy(UpdateRowPolicyReq.builder()
        .collectionName("my_collection")
        .policyName("east_region_policy")
        .policyType(RowPolicyType.PERMISSIVE)
        .actions(Arrays.asList(RowPolicyAction.QUERY, RowPolicyAction.SEARCH))
        .usingExpr("region == \"east\"")
        .build());
```
