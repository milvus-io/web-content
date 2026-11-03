# RowPolicyType

This is an enumeration that provides the following constants.
```java
public enum RowPolicyType
```


**Constants:**

- **UNKNOWN** (0)

    The row-policy type is unknown.

- **PERMISSIVE** (1)

    A permissive row policy. It filters the rows visible to a principal using the `usingExpr`, and validates the rows written by a principal using the `checkExpr`.

- **RESTRICTIVE** (2)

    A restrictive row policy. It restricts the rows visible to a principal using the `usingExpr`, and validates the rows written by a principal using the `checkExpr`.

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
        .policyType(RowPolicyType.RESTRICTIVE)
        .actions(Collections.singletonList(RowPolicyAction.QUERY))
        .usingExpr("region == \"east\"")
        .build());
```
