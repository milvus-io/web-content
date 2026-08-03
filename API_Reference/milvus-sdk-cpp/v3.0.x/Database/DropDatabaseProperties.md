# DropDatabaseProperties()

This operation drops a database's properties.

```cpp
Status DropDatabaseProperties(const DropDatabasePropertiesRequest& request)
```

## Request Syntax

```cpp
auto request = DropDatabasePropertiesRequest()
    .WithDatabaseName(db_name)
    .WithPropertyKeys(keys);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithPropertyKeys(std::set<std::string>&& keys)`

    Sets the key of the database property to delete.

- `AddPropertyKey(const std::string& key)`

    Adds a key to be deleted.

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

status = client->DropDatabaseProperties(
    milvus::DropDatabasePropertiesRequest()
        .WithDatabaseName("my_database")
        .AddPropertyKey("key"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
