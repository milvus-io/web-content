# DescribeCollection()

This operation returns the collection description, including its schema and properties.

```cpp
Status DescribeCollection(const DescribeCollectionRequest& request, DescribeCollectionResponse& response)
```

## Request Syntax

```cpp
auto request = DescribeCollectionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of the target database. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

**RETURNS:**

*Status* with *DescribeCollectionResponse*

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

milvus::DescribeCollectionResponse desc_response;
status = client->DescribeCollection(
    milvus::DescribeCollectionRequest()
        .WithDatabaseName(db_name)
        .WithCollectionName(collection_name),
    desc_response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::cout << "Collection ID: " << desc_response.Desc().ID() << std::endl;
```
