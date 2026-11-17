# RowPolicyAction

This enum class describes the row-bearing operation covered by a row policy. It is used by [CreateRowPolicy](CreateRowPolicy.md)() and [UpdateRowPolicy](UpdateRowPolicy.md)() through `WithActions()`, and returned by [ListRowPolicies](ListRowPolicies.md)().

```cpp
enum class RowPolicyAction {
    QUERY           = 0,
    SEARCH          = 1,
    INSERT          = 2,
    DELETE_ROWS     = 3,
    UPSERT          = 4,
    QUERY_ITERATOR  = 5,
    SEARCH_ITERATOR = 6,
    HYBRID_SEARCH   = 7,
};
```

**Constants:**

- **QUERY** (0)

    Governs the [Query](../Vector/Query.md)() operation.

- **SEARCH** (1)

    Governs the [Search](../Vector/Search.md)() operation.

- **INSERT** (2)

    Governs the [Insert](../Vector/Insert.md)() operation.

- **DELETE_ROWS** (3)

    Governs the [Delete](../Vector/Delete.md)() operation. Named DELETE_ROWS because the Windows SDK defines a `DELETE` macro that would otherwise corrupt the enumerator.

- **UPSERT** (4)

    Governs the [Upsert](../Vector/Upsert.md)() operation.

- **QUERY_ITERATOR** (5)

    Governs the [QueryIterator](../Vector/QueryIterator.md)() operation.

- **SEARCH_ITERATOR** (6)

    Governs the [SearchIterator](../Vector/SearchIterator.md)() operation.

- **HYBRID_SEARCH** (7)

    Governs the [HybridSearch](../Vector/HybridSearch.md)() operation.

## Example

Create a row policy that governs the Query operation after connecting a MilvusClientV2.

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
        .WithPolicyType(milvus::RowPolicyType::PERMISSIVE)
        .WithActions(std::vector<milvus::RowPolicyAction>{milvus::RowPolicyAction::QUERY})
        .WithUsingExpr("region == \"east\""));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
