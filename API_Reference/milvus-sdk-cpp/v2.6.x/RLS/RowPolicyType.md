# RowPolicyType

This enum class describes the type of a row policy. It is used by [CreateRowPolicy](CreateRowPolicy.md)() and [UpdateRowPolicy](UpdateRowPolicy.md)() through `WithPolicyType()`, and returned by [ListRowPolicies](ListRowPolicies.md)().

```cpp
enum class RowPolicyType {
    UNKNOWN     = 0,
    PERMISSIVE  = 1,
    RESTRICTIVE = 2,
};
```

**Constants:**

- **UNKNOWN** (0)

    Unknown or unset row policy type.

- **PERMISSIVE** (1)

    A permissive policy; at least one applicable permissive policy is required to admit a row.

- **RESTRICTIVE** (2)

    A restrictive policy; every applicable restrictive policy must admit a row.

## Example

Create a restrictive row policy after connecting a MilvusClientV2.

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->CreateRowPolicy(
    milvus::CreateRowPolicyRequest()
        .WithCollectionName("my_collection")
        .WithPolicyName("east_region_policy")
        .WithPolicyType(milvus::RowPolicyType::RESTRICTIVE)
        .WithActions(std::vector<milvus::RowPolicyAction>{milvus::RowPolicyAction::QUERY})
        .WithUsingExpr("region == \"east\""));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
