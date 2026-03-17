# TransferNode()

This operation transfers query nodes to another resource group.

```cpp
Status TransferNode(const TransferNodeRequest& request)
```

## Request Syntax

```cpp
auto request = TransferNodeRequest()
    .WithSourceGroup(source_group)
    .WithTargetGroup(target_group)
    .WithNumNodes(num_nodes);
```

**REQUEST METHODS:**

- `WithSourceGroup(const std::string& source_group)`

    Sets the name of the source resource group.

- `WithTargetGroup(const std::string& target_group)`

    Sets the name of the target resource group.

- `WithNumNodes(int64_t num_nodes)`

    Sets the number of nodes to transfer.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->TransferNode(
    milvus::TransferNodeRequest()
        .WithSourceGroup("source_group")
        .WithTargetGroup("target_group")
        .WithNumNodes(1));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
