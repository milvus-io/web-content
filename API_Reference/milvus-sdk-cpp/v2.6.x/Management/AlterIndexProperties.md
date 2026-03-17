# AlterIndexProperties()

This operation alters the properties of an index.

```cpp
Status AlterIndexProperties(const AlterIndexPropertiesRequest& request)
```

## Request Syntax

```cpp
auto request = AlterIndexPropertiesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithIndexName(index_name)
    .WithProperties(value);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithIndexName(const std::string& index_name)`

    Sets the name of the index. Use the index name in this operation, but not the field name.

- `WithProperties(std::unordered_map<std::string, std::string>&& properties)`

    Sets the properties to alter of the specified index. You can find available index properties on [this page](https://milvus.io/docs/mmap.md#Index-specific-mmap-settings).

- `AddProperty(const std::string& key, const std::string& property)`

    Adds a property to this index.

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

status = client->AlterIndexProperties(milvus::AlterIndexPropertiesRequest()
                                          .WithCollectionName(collection_name)
                                          .WithIndexName("vector_index_name")
                                          .AddProperty(milvus::MMAP_ENABLED, "true"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
