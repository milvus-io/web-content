# DropIndexProperties()

This operation drops the property from the specified index.

```cpp
Status DropIndexProperties(const DropIndexPropertiesRequest& request)
```

## Request Syntax

```cpp
auto request = DropIndexPropertiesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithIndexName(index_name)
    .WithPropertyKeys(keys);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithIndexName(const std::string& index_name)`

    Sets the name of the index. Use the index name in this operation, but not the field name.

- `WithPropertyKeys(std::set<std::string>&& keys)`

    Sets the name of the properties to drop from this index.

- `AddPropertyKey(const std::string& key)`

    Sets the name of a property to delete.

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

status = client->DropIndexProperties(milvus::DropIndexPropertiesRequest()
                                         .WithCollectionName(collection_name)
                                         .WithIndexName("vector_index_name")
                                         .AddPropertyKey(milvus::MMAP_ENABLED));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
