# RowPolicyAction

This is an enumeration that provides the following constants.
```java
public enum RowPolicyAction
```


**Constants:**

- **UNKNOWN** (-1)

    The row-policy action is unknown or unrecognized.

- **QUERY** (0)

    Governs the **Query** operation.

- **SEARCH** (1)

    Governs the **Search** operation.

- **INSERT** (2)

    Governs the **Insert** operation.

- **DELETE** (3)

    Governs the **Delete** operation.

- **UPSERT** (4)

    Governs the **Upsert** operation.

- **QUERY_ITERATOR** (5)

    Governs the **QueryIterator** operation.

- **SEARCH_ITERATOR** (6)

    Governs the **SearchIterator** operation.

- **HYBRID_SEARCH** (7)

    Governs the **HybridSearch** operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.RowPolicyAction;
import io.milvus.v2.common.RowPolicyType;
import io.milvus.v2.service.rls.request.CreateRowPolicyReq;
import java.util.Collections;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus") // replace this with your token
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

client.createRowPolicy(CreateRowPolicyReq.builder()
        .collectionName("my_collection")
        .policyName("east_region_policy")
        .policyType(RowPolicyType.PERMISSIVE)
        .actions(Collections.singletonList(RowPolicyAction.QUERY))
        .usingExpr("region == \"east\"")
        .build());
```
